# core-css

Framework-agnostic style contract for project_tui.

## Contents

- `src/tokens.css`: theme tokens and design variables
- `src/base.css`: minimal reset and base element styles
- `src/components/*.css`: semantic component class styles
- `src/index.css`: import entrypoint

## Usage

```html
<link rel="stylesheet" href="./src/index.css" />
```

Use semantic classes such as `tui-button`, `tui-input`, `tui-card`, and `tui-alert`.

Theme switching is controlled with a `data-theme` attribute on `html` or `body`:

```html
<html data-theme="dark">
```
