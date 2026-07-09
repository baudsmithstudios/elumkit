# core-css

Framework-agnostic style contract for ElumKit. Copy this source into your project when you want to use and own the CSS directly.

## Contents

- `src/tokens.css`: theme tokens and design variables
- `src/base.css`: minimal reset and base element styles
- `src/components/*.css`: semantic component class styles
- `src/index.css`: import entrypoint

## Usage

Copy the full `src/` directory into your app while preserving the directory structure:

```text
assets/elumkit/
  index.css
  tokens.css
  base.css
  components/*.css
```

Then link the copied entrypoint:

```html
<link rel="stylesheet" href="/assets/elumkit/index.css" />
```

Use semantic classes such as `elum-button`, `elum-input`, `elum-card`, and `elum-table`. See [`docs/component-usage.md`](../../docs/component-usage.md) for the full component reference.

Theme switching is controlled with a `data-theme` attribute on `html` or `body`:

```html
<html data-theme="iron">
```

Supported default values are `dust`, `iron`, and `neon`. See [`docs/theming.md`](../../docs/theming.md).

## Single-file bundle

`dist/elumkit.css` is the `src/index.css` import chain flattened into one file with no `@import`s. Use it when you have no CSS build step (single-binary embeds, server-rendered apps). If you have a bundler (Vite, Eleventy, etc.), point at `src/index.css` instead.

It is not tracked in git; build it from source:

```sh
npm run build:css
```

Embed the single file:

```go
//go:embed elumkit.css
var elumkitCSS string
```

```rust
const ELUMKIT_CSS: &str = include_str!("elumkit.css");
```

```zig
const elumkit_css = @embedFile("elumkit.css");
```

Rails: copy `elumkit.css` into `app/assets/stylesheets/` and link it with `stylesheet_link_tag "elumkit"`.
