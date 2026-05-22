/* global process */

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  const apiKey = process.env.NOVA_POSHTA_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Nova Poshta env variable is missing" }),
    };
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    const requestBody =
      payload.type === "warehouses"
        ? {
            apiKey,
            modelName: "AddressGeneral",
            calledMethod: "getWarehouses",
            methodProperties: {
              CityRef: payload.cityRef,
              CityName: payload.cityName,
            },
          }
        : {
            apiKey,
            modelName: "Address",
            calledMethod: "getCities",
            methodProperties: {
              FindByString: payload.query,
              Limit: "20",
            },
          };

    const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Nova Poshta request failed");
    }

    const result = await response.json();
    const items = (result.data || []).map((item) =>
      payload.type === "warehouses"
        ? {
            label: item.Description,
            ref: item.Ref,
          }
        : {
            label: item.Description,
            ref: item.Ref,
          },
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ items }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message || "Nova Poshta request failed",
      }),
    };
  }
};
