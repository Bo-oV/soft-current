/* global process */

const NOVA_POSHTA_URL = "https://api.novaposhta.ua/v2.0/json/";

function json(statusCode, payload) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
}

export const handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return json(405, { message: "Method not allowed" });
  }

  const cityRef = (event.queryStringParameters?.cityRef || "").trim();

  if (!cityRef) {
    return json(400, { message: "cityRef is required" });
  }

  const apiKey = process.env.NOVA_POSHTA_API_KEY;

  if (!apiKey) {
    return json(500, { message: "Nova Poshta env variable is missing" });
  }

  try {
    const response = await fetch(NOVA_POSHTA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityRef: cityRef,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Nova Poshta request failed");
    }

    const result = await response.json();

    if (result.success === false) {
      throw new Error(result.errors?.join(", ") || "Nova Poshta API error");
    }

    const warehouses = (result.data || []).map((warehouse) => ({
      description: warehouse.Description || "",
      number: warehouse.Number || "",
      ref: warehouse.Ref,
      type: warehouse.TypeOfWarehouse || warehouse.CategoryOfWarehouse || "",
    }));

    return json(200, { warehouses });
  } catch (error) {
    return json(500, {
      message: error.message || "Nova Poshta warehouses request failed",
    });
  }
};
