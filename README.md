# Soft Current

React + Vite + SCSS storefront for a handmade knitwear shop.

## Local Netlify Functions Test

1. Create `.env` in the project root. Do not commit it.

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
NOVA_POSHTA_API_KEY=
TEST_MODE=true
```

2. Start Netlify Dev:

```bash
netlify dev
```

If Netlify CLI is not installed globally, run:

```bash
npx netlify-cli dev
```

3. Open:

```text
http://localhost:8888
```

4. Add a product to the cart, fill the checkout form, and submit the order.

5. With `TEST_MODE=true`, the order is not sent to Telegram. Check the Netlify Dev terminal for `Soft Current test order payload`.

6. With `TEST_MODE=false`, the function sends the order to Telegram using `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.

Frontend requests must stay relative:

```js
fetch('/.netlify/functions/send-order', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})
```

Nova Poshta requests also go through Netlify Functions:

- `/.netlify/functions/nova-poshta-cities`
- `/.netlify/functions/nova-poshta-warehouses`
