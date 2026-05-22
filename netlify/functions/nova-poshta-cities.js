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

  const search = (event.queryStringParameters?.search || "").trim();

  if (search.length < 2) {
    return json(200, { cities: [] });
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
        calledMethod: "getCities",
        methodProperties: {
          FindByString: search,
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

    const cities = (result.data || []).map((city) => ({
      area: city.AreaDescription || "",
      description: city.Description || "",
      ref: city.Ref,
    }));

    return json(200, { cities });
  } catch (error) {
    return json(500, {
      message: error.message || "Nova Poshta cities request failed",
    });
  }
};
