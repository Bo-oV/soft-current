/* global process */

function json(statusCode, payload) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }
}

function createTelegramMessage(payload) {
  return [
    '💬 Нове повідомлення з сайту SoftCurrent',
    '',
    `👤 Ім'я: ${payload.name}`,
    `📞 Телефон: ${payload.phone}`,
    '',
    '📝 Повідомлення:',
    payload.message || 'Без повідомлення',
  ].join('\n')
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { message: 'Method not allowed' })
  }

  try {
    const payload = JSON.parse(event.body || '{}')
    const name = String(payload.name || '').trim()
    const phone = String(payload.phone || '').trim()
    const message = String(payload.message || '').trim()

    if (!name || !phone) {
      return json(400, { message: 'Name and phone are required' })
    }

    const contactPayload = { name, phone, message }

    if (process.env.TEST_MODE === 'true') {
      console.log('Soft Current test contact payload:', contactPayload)
      return json(200, { ok: true, test: true })
    }

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      return json(500, { message: 'Telegram env variables are missing' })
    }

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: createTelegramMessage(contactPayload),
        }),
      },
    )

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('Telegram contact request failed:', errorBody)
      return json(500, { message: 'Telegram request failed' })
    }

    return json(200, { ok: true })
  } catch (error) {
    return json(500, {
      message: error.message || 'Contact submit failed',
    })
  }
}
