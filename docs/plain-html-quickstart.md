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

Use `data-theme="light"` for light mode.

## 3) Copy component markup

Start from:

- `packages/core-patterns/snippets/index.html`
- `examples/playground.html`

Example:

```html
<article class="tui-card tui-stack">
  <h2 class="tui-card-title">System</h2>
  <p class="tui-card-subtitle">Current status</p>
  <button class="tui-button" type="button">Run</button>
</article>
```

## 4) Verify critical states

For v0.1, check these states in your page:

- focus-visible
- disabled
- invalid (`aria-invalid="true"`)
