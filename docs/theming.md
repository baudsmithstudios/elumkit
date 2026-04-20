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

- Color tokens (`--tui-color-*`)
- Typography tokens (`--tui-text-*`, `--tui-lh-*`, `--tui-font-family`)
- Spacing tokens (`--tui-space-*`)
- Radius/border tokens (`--tui-radius-*`, `--tui-border-width`)
- Motion token (`--tui-motion-fast`)

## Override example

```css
:root,
[data-theme="light"] {
  --tui-color-accent: #005f73;
  --tui-focus-ring: #005f73;
}
```

## Component behavior notes

- Button primary variant uses `--tui-color-accent`.
- Invalid form states use `--tui-color-error`.
- Alert tones use `--tui-color-success`, `--tui-color-warn`, `--tui-color-error`.

## Reduced motion

Reduced motion is already implemented in `base.css` using `prefers-reduced-motion`.
