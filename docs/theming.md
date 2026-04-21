# Theming Guide (v0.1)

v0.1 theming is token-driven through CSS variables.

## Theme root

Set theme via `data-theme`:

```html
<html data-theme="dark">
```

Supported values:

- `dark`
- `light`

## Core token groups

Defined in `packages/core-css/src/tokens.css`:

- Color tokens (`--pergyl-color-*`)
- Typography tokens (`--pergyl-text-*`, `--pergyl-lh-*`, `--pergyl-font-family`)
- Spacing tokens (`--pergyl-space-*`)
- Radius/border tokens (`--pergyl-radius-*`, `--pergyl-border-width`)
- Motion token (`--pergyl-motion-fast`)

## Override example

```css
:root,
[data-theme="light"] {
  --pergyl-color-accent: #005f73;
  --pergyl-focus-ring: #005f73;
}
```

## Component behavior notes

- Button primary variant uses `--pergyl-color-accent`.
- Invalid form states use `--pergyl-color-error`.
- Alert tones use `--pergyl-color-success`, `--pergyl-color-warn`, `--pergyl-color-error`.

## Reduced motion

Reduced motion is already implemented in `base.css` using `prefers-reduced-motion`.
