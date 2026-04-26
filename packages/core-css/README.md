# core-css

Framework-agnostic style contract for Pergylkit.

## Contents

- `src/tokens.css`: theme tokens and design variables
- `src/base.css`: minimal reset and base element styles
- `src/components/*.css`: semantic component class styles
- `src/index.css`: import entrypoint

## Usage

```html
<link rel="stylesheet" href="./src/index.css" />
```

Use semantic classes such as `pergyl-button`, `pergyl-input`, `pergyl-card`, `pergyl-alert`, and `pergyl-meter`.

Theme switching is controlled with a `data-theme` attribute on `html` or `body`:

```html
<html data-theme="dark">
```
