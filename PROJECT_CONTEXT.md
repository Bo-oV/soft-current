# Soft Current Project Context

Use this file as context for continuing work on the project in another ChatGPT/Codex session.

## Project

Soft Current is a React + Vite landing page for a handmade / knitwear shop.

Current branch: `develop`

Repository:
`https://github.com/Bo-oV/soft-current.git`

The project was scaffolded as a landing architecture first. Detailed pixel-perfect section work is intended to happen screen by screen later.

## Tech Stack

- React
- Vite
- SCSS
- BEM class naming
- CSS Grid
- Media queries
- No Tailwind
- No UI component libraries
- `lucide-react` is used only for icons

Package manager:
- Use `npm`, not `pnpm`
- Main commands:

```bash
npm install
npm run dev
npm run build
npm run lint
```

Local dev URL should normally be:

```txt
http://localhost:5173/
```

If Vite says `Port 5173 is in use, trying another one`, use the URL Vite prints, for example `http://localhost:5174/`, or stop the old process holding `5173`.

## Fonts

Fonts are connected in `index.html` through Google Fonts:

- `Source Serif 4` for large titles / decorative text
- `Mulish` for body text, menu, buttons, forms

Mulish includes light weight because inactive menu items use `font-weight: 300`.

## Global SCSS Variables

File:
`src/styles/utils/_variables.scss`

Important variables:

```scss
:root {
  --color-bg: #f0e9e2;
  --color-bg-light: #fbf8f4;
  --color-text: #4d4038;
  --color-muted: #8c7b70;
  --color-accent: #946d4e;
  --color-active: #946d4e;
  --color-accent-dark: #7f5d42;
  --color-white: #ffffff;
  --color-border: #e2d6cc;

  --font-title: 'Source Serif 4', serif;
  --font-main: 'Mulish', sans-serif;

  --transition: 180ms ease;
  --border-radius: 8px;
  --shadow: 0 18px 45px rgba(77, 64, 56, 0.1);
}
```

`--color-active` is used for active menu text, icons, counters, highlighted text, and future buttons.

## Layout / Grid

File:
`src/styles/utils/_grid.scss`

Base layout:

- Desktop: 12 columns, `margin-inline: 240px`, gutter `24px`
- Tablet: 8 columns, `margin-inline: 48px`, gutter `20px`
- Mobile: 4 columns, `margin-inline: 16px`, gutter `16px`

Classes:

- `.page-grid`
- `.container`
- `.section`

The header uses its own layout because it must align logo, nav, and icons cleanly.

## Current File Structure

```txt
src/
  App.jsx
  main.jsx
  components/
    Header/
      Header.jsx
      Header.scss
    Hero/
      Hero.jsx
      Hero.scss
    Products/
      Products.jsx
      Products.scss
      ProductCard.jsx
    HowToOrder/
      HowToOrder.jsx
      HowToOrder.scss
    CustomOrder/
      CustomOrder.jsx
      CustomOrder.scss
    Care/
      Care.jsx
      Care.scss
    About/
      About.jsx
      About.scss
    Contacts/
      Contacts.jsx
      Contacts.scss
    Footer/
      Footer.jsx
      Footer.scss
    UI/
      Button/
        Button.jsx
        Button.scss
      Input/
        Input.jsx
        Input.scss
      Textarea/
        Textarea.jsx
        Textarea.scss
      Modal/
        Modal.jsx
        Modal.scss
  data/
    products.js
    careItems.js
    orderSteps.js
  styles/
    main.scss
    utils/
      _variables.scss
      _mixins.scss
      _media.scss
      _reset.scss
      _typography.scss
      _grid.scss
    blocks/
      _section.scss
```

Static assets:

```txt
public/images/logo.png
```

## App Composition

`src/App.jsx` only composes sections:

1. Header
2. Hero
3. Products
4. HowToOrder
5. CustomOrder
6. Care
7. About
8. Contacts
9. Footer

## Header Current Requirements / State

Files:

- `src/components/Header/Header.jsx`
- `src/components/Header/Header.scss`

Header behavior:

- Fixed to the top of the viewport.
- Does not disappear on scroll.
- Uses logo image from `/images/logo.png`.
- Desktop menu items:
  - Font: Mulish
  - Size: `16px`
  - Line height: `120%`
  - Active item: `font-weight: 500`, color `--color-active`
  - Inactive items: `font-weight: 300`
- Mobile:
  - Nav becomes hamburger menu.
  - Menu opens/closes with React state.
  - Menu closes after clicking a link.
- Active section is detected with `IntersectionObserver`.
- Icons are from `lucide-react`:
  - `ShoppingBag`
  - `Heart`
  - `size={32}`
  - `strokeWidth={1.5}`
  - color via `currentColor`, styled as `--color-active`
- Icons have circular counters:
  - cart: `2`
  - favorites: `1`

Important header layout decision:

The header should avoid menu text overlapping icons at responsive widths.
The current intended structure is:

```txt
logo | nav | icons
```

With a real grid gap between nav and icons, not a fake margin that still allows nav overflow.

Current relevant SCSS idea:

```scss
.header__inner {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  column-gap: 60px;
}

.header__nav {
  display: flex;
  justify-self: end;
  justify-content: flex-end;
}
```

If menu overlaps icons again, fix layout by preserving a real grid/flex gap between nav and actions. Do not solve it only with `margin-right` on nav if nav text can overflow.

## UI Components

Reusable components already exist:

- `Button`
  - props: `variant`, `children`, `onClick`, `type`, `className`
  - variants: `primary`, `secondary`
- `Input`
  - props: `label`, `name`, `placeholder`, `value`, `onChange`, `type`
- `Textarea`
  - props: `label`, `name`, `placeholder`, `value`, `onChange`
- `Modal`
  - props: `isOpen`, `onClose`, `children`
  - closes by close button and overlay click

Contacts form currently opens modal on submit:

```txt
Дякуємо, заявку отримано!
```

No real form submission yet.

## Data Files

Use data arrays instead of hardcoding repeated content:

- `src/data/products.js`
- `src/data/orderSteps.js`
- `src/data/careItems.js`

## Current Work Status

There are local uncommitted changes from header work:

- `index.html`
- `package.json`
- `package-lock.json`
- `src/components/Header/Header.jsx`
- `src/components/Header/Header.scss`
- `src/styles/utils/_grid.scss`
- `src/styles/utils/_variables.scss`
- `public/images/logo.png`

Recent verified commands:

```bash
npm run build
npm run lint
```

Both pass.

## Important Workflow Notes

- Use `npm`, not `pnpm`.
- Do not reintroduce `pnpm-lock.yaml`.
- Do not remove `lucide-react`; Header icons depend on it.
- Do not use Tailwind or UI libraries.
- Keep SCSS per component plus shared global SCSS in `src/styles`.
- Use BEM classes.
- Keep the project as a clean scaffold; do not over-design sections unless asked screen by screen.
- Preserve existing user changes and do not reset/revert unrelated files.

## Suggested Prompt For Continuing

```txt
Continue work on this React + Vite + SCSS landing page for a handmade knitwear shop.
Use PROJECT_CONTEXT.md as the source of truth.
Work screen by screen, keep BEM naming, no Tailwind, no UI libraries.
Use npm.
Before changing layout, inspect the relevant component and SCSS.
After changes, run npm run build and npm run lint.
```
