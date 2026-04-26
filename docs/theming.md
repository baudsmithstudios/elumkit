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

Override one or more tokens after loading Pergyl's CSS. For example, to swap the accent and focus ring to a different color:

```css
:root {
  --pergyl-color-accent: #5faf87;
  --pergyl-focus-ring: #5faf87;
}
```

## Customization protocol

Load Pergyl first, then load application CSS after it. Override global tokens when the whole system should change, and override component custom properties when one component needs a supported adjustment.

```html
<link rel="stylesheet" href="../packages/core-css/src/index.css" />
<link rel="stylesheet" href="./app.css" />
```

## Card custom properties

Card custom properties keep the default card behavior unless they are set globally or on a scoped parent.

```css
:root {
  --pergyl-card-title-size: var(--pergyl-text-md);
  --pergyl-card-title-color: #8b4a2a;
}

.status-card {
  --pergyl-card-padding: var(--pergyl-space-3);
  --pergyl-card-subtitle-color: var(--pergyl-color-fg);
  --pergyl-card-subtitle-size: var(--pergyl-text-sm);
}
```

Supported card properties:

- `--pergyl-card-padding`
- `--pergyl-card-label-bg`
- `--pergyl-card-title-color`
- `--pergyl-card-title-size`
- `--pergyl-card-subtitle-color`
- `--pergyl-card-subtitle-size`

## Component behavior notes

- Button primary variant uses `--pergyl-color-accent`.
- Invalid form states use `--pergyl-color-error`.
- Alert tones use `--pergyl-color-success`, `--pergyl-color-warn`, and `--pergyl-color-error`. Each theme defines its own values to meet contrast targets against the theme background.

## Reduced motion

Reduced motion is already implemented in `base.css` using `prefers-reduced-motion`.
