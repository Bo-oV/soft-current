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

function formatOrderItems(items) {
  return items
    .map((item, index) =>
      [
        `${index + 1}. ${item.title || "Товар"}`,
        `   Категорія: ${item.category || "-"}`,
        `   Розмір: ${item.selectedSize || "-"}`,
        `   Кількість: ${item.quantity || 1}`,
        `   Ціна: ${formatPrice(item.price, item.currency || "грн")}`,
      ].join("\n"),
    )
    .join("\n\n");
}

function validatePayload(payload) {
  const requiredFields = [
    "customerName",
    "customerPhone",
    "deliveryCity",
    "deliveryWarehouse",
  ];

  const missingFields = requiredFields.filter(
    (field) => !String(payload[field] || "").trim(),
  );

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    missingFields.push("items");
  }

  return missingFields;
}

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { message: "Method not allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return json(500, { message: "Telegram env variables are missing" });
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

    const message = [
      "🧶 Нове замовлення SoftCurrent",
      "",
      "🛒 Товари:",
      formatOrderItems(payload.items),
      "",
      `💰 Загальна сума: ${formatPrice(payload.totalPrice, "грн")}`,
      "",
      "👤 Покупець:",
      `Ім'я: ${payload.customerName}`,
      `Телефон: ${payload.customerPhone}`,
      "",
      "🚚 Доставка Новою поштою:",
      `Місто: ${payload.deliveryCity}`,
      `Відділення: ${payload.deliveryWarehouse}`,
      "",
      "💬 Коментар:",
      payload.customerComment || "Без коментаря",
    ].join("\n");

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Telegram request failed");
    }

    return json(200, { ok: true });
  } catch (error) {
    return json(500, {
      message: error.message || "Order submit failed",
    });
  }
};
