# Plain HTML Quickstart

Use this path when you want v0.1 components in a plain HTML project and want to own the copied source.

## 1) Copy the core CSS

Copy the full CSS source directory into your project:

```text
packages/core-css/src/
```

Preserve the directory structure so `index.css` can keep importing `tokens.css`, `base.css`, and `components/*.css`.

For example:

```text
public/assets/elumkit/
  index.css
  tokens.css
  base.css
  components/
    button.css
    card.css
    data.css
    feedback.css
    form.css
    query.css
    tabs.css
    telemetry.css
    toolbar.css
```

## 2) Include the copied CSS

```html
<link rel="stylesheet" href="/assets/elumkit/index.css" />
```

## 3) Set the theme root

```html
<html data-theme="iron">
```

Use `data-theme="dust"` for a warm earthy light palette or `data-theme="neon"` for a synthwave-inspired dark palette.

## 4) Copy component markup

Start from:

- `packages/core-patterns/snippets/index.html`
- `examples/playground.html`

Example:

```html
<article class="elum-card elum-card-labeled elum-stack">
  <header class="elum-card-header">
    <h2 class="elum-card-title">System</h2>
  </header>
  <p class="elum-card-subtitle">Current status</p>
  <button class="elum-button" type="button">Run</button>
</article>
```

Copied CSS and markup are application code. Edit them to fit your project.

## 5) Verify critical states

For v0.1, check these states in your page:

- focus-visible
- disabled
- invalid (`aria-invalid="true"`)
