/* global process */

function json(statusCode, payload) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
}

function formatPrice(price, currency = "грн") {
  return `${price || 0} ${currency}`;
}

function validatePayload(payload) {
  const customer = payload.customer || {};
  const order = payload.order || {};
  const missingFields = [];

  if (!String(customer.name || "").trim()) missingFields.push("customer.name");
  if (!String(customer.phone || "").trim()) missingFields.push("customer.phone");
  if (!String(customer.cityName || "").trim()) {
    missingFields.push("customer.cityName");
  }
  if (!String(customer.warehouse || "").trim()) {
    missingFields.push("customer.warehouse");
  }
  if (!Array.isArray(order.items) || order.items.length === 0) {
    missingFields.push("order.items");
  }
  if (order.totalPrice === undefined || order.totalPrice === null) {
    missingFields.push("order.totalPrice");
  }

  return missingFields;
}

function formatOrderItems(items) {
  return items
    .map(
      (item, index) =>
        `${index + 1}. ${item.title || "Товар"} — ${formatPrice(
          item.price,
          item.currency || "грн",
        )}`,
    )
    .join("\n");
}

function createTelegramMessage(payload) {
  const customer = payload.customer;
  const order = payload.order;

  return [
    "🧶 Нове замовлення Soft Current",
    "",
    `👤 Ім'я: ${customer.name}`,
    `📞 Телефон: ${customer.phone}`,
    `🏙️ Місто: ${customer.cityName}`,
    `📦 Відділення: ${customer.warehouse}`,
    `💬 Повідомлення: ${customer.message || "Без коментаря"}`,
    "",
    "🛍️ Товари:",
    formatOrderItems(order.items),
    "",
    `💰 Сума: ${formatPrice(order.totalPrice, "грн")}`,
  ].join("\n");
}

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { message: "Method not allowed" });
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    const missingFields = validatePayload(payload);

    if (missingFields.length > 0) {
      return json(400, {
        message: "Required order fields are missing",
        fields: missingFields,
      });
    }

    if (process.env.TEST_MODE === "true") {
      console.log("Soft Current test order payload:", payload);
      return json(200, { ok: true, test: true });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return json(500, { message: "Telegram env variables are missing" });
    }

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: createTelegramMessage(payload),
        }),
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Telegram request failed:", errorBody);
      return json(500, { message: "Telegram request failed" });
    }

    return json(200, { ok: true });
  } catch (error) {
    return json(500, {
      message: error.message || "Order submit failed",
    });
  }
};
