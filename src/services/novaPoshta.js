const MOCK_CITIES = [
  { area: "Волинська область", description: "Луцьк", ref: "mock-lutsk" },
  { area: "Київська область", description: "Київ", ref: "mock-kyiv" },
  { area: "Львівська область", description: "Львів", ref: "mock-lviv" },
  { area: "Одеська область", description: "Одеса", ref: "mock-odesa" },
  { area: "Харківська область", description: "Харків", ref: "mock-kharkiv" },
  {
    area: "Дніпропетровська область",
    description: "Дніпро",
    ref: "mock-dnipro",
  },
];

const MOCK_WAREHOUSES = [
  {
    description: "Відділення №1: вул. Центральна, 1",
    number: "1",
    ref: "mock-warehouse-1",
    type: "Відділення",
  },
  {
    description: "Відділення №2: просп. Волі, 12",
    number: "2",
    ref: "mock-warehouse-2",
    type: "Відділення",
  },
  {
    description: "Поштомат №3: вул. Затишна, 7",
    number: "3",
    ref: "mock-warehouse-3",
    type: "Поштомат",
  },
];

function normalizeCity(city) {
  return {
    area: city.area || "",
    description: city.description || "",
    label: city.area ? `${city.description}, ${city.area}` : city.description,
    ref: city.ref,
  };
}

function normalizeWarehouse(warehouse) {
  return {
    description: warehouse.description || "",
    label: warehouse.description || "",
    number: warehouse.number || "",
    ref: warehouse.ref,
    type: warehouse.type || "",
  };
}

export async function searchCities(query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.length < 2) {
    return [];
  }

  try {
    const response = await fetch(
      `/.netlify/functions/nova-poshta-cities?search=${encodeURIComponent(
        query,
      )}`,
    );

    if (!response.ok) {
      throw new Error("Nova Poshta cities request failed");
    }

    const result = await response.json();
    return (result.cities || []).map(normalizeCity);
  } catch {
    return MOCK_CITIES.filter((city) =>
      city.description.toLowerCase().includes(normalizedQuery),
    ).map(normalizeCity);
  }
}

export async function getWarehouses(cityRef) {
  if (!cityRef) {
    return [];
  }

  try {
    const response = await fetch(
      `/.netlify/functions/nova-poshta-warehouses?cityRef=${encodeURIComponent(
        cityRef,
      )}`,
    );

    if (!response.ok) {
      throw new Error("Nova Poshta warehouses request failed");
    }

    const result = await response.json();
    return (result.warehouses || []).map(normalizeWarehouse);
  } catch {
    return MOCK_WAREHOUSES.map(normalizeWarehouse);
  }
}
