# Plain HTML Quickstart

Use this path when you want v0.1 components in a plain HTML project.

## 1) Include the core CSS

```html
<link rel="stylesheet" href="../packages/core-css/src/index.css" />
```

## 2) Set the theme root

```html
<html data-theme="dark">
```

Use `data-theme="light"` for light mode or `data-theme="console"` for a warmer operational console palette.

## 3) Copy component markup

Start from:

- `packages/core-patterns/snippets/index.html`
- `examples/playground.html`

Example:

```html
<article class="pergyl-card pergyl-card-labeled pergyl-stack">
  <header class="pergyl-card-header">
    <h2 class="pergyl-card-title">System</h2>
  </header>
  <p class="pergyl-card-subtitle">Current status</p>
  <button class="pergyl-button" type="button">Run</button>
</article>
```

## 4) Verify critical states

For v0.1, check these states in your page:

- focus-visible
- disabled
- invalid (`aria-invalid="true"`)
