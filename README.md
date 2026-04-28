<p align="center">
  <img src="assets/title.svg" alt="Pergyl" width="600">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-v0.1%20pre--release-333333.svg" alt="v0.1 pre-release">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-5faf87.svg" alt="MIT License"></a>
  <img src="https://img.shields.io/badge/approach-HTML--first-4f6d7a.svg" alt="HTML-first">
  <img src="https://img.shields.io/badge/scope-framework--agnostic-5faf87.svg" alt="Framework agnostic">
  <img src="https://img.shields.io/badge/accessibility-WCAG%202.2%20AA%20baseline-00A3A3.svg" alt="WCAG 2.2 AA baseline">
</p>

## What It Does

Pergyl is a lean, terminal-inspired component system for modern web interfaces. v0.1 is intentionally plain-HTML first, so you can use it directly in static sites and lightweight stacks and layer in framework adapters later.

## Features

- **Terminal-inspired by default** — dense, calm, monospace-forward styling without retro CRT effects
- **HTML-first component contract** — semantic classes backed by CSS custom properties
- **Framework-agnostic baseline** — usable from plain HTML, Eleventy, and server-rendered templates
- **Optional JavaScript only** — progressive enhancement where native HTML is not enough
- **Accessibility baseline** — keyboard-first patterns and WCAG 2.2 AA contrast targets

## What Pergyl Is Not

- **Not a retro skin pack** — no scanlines, pixel-art frames, or novelty CRT effects
- **Not framework-coupled** — no React/Vue lock-in at the core layer
- **Not an everything library** — v0.1 is a focused proof of concept

## Design Principles

- **Use native HTML first** — prefer real buttons, labels, fieldsets, tables, and form states before adding ARIA or JavaScript
- **Keep the CSS contract readable** — public classes and custom properties should be easy to inspect, copy, and override
- **Make enhancement optional** — JavaScript belongs only where native browser behavior is not enough
- **Favor dense clarity** — terminal influence should improve scannability without novelty effects or decorative noise
- **Keep framework layers thin** — future adapters should preserve the same semantic markup and CSS contract

## Quick Start

Link the core CSS, set a theme on the document root, and use the semantic classes:

```html
<!doctype html>
<html data-theme="iron">
  <head>
    <link rel="stylesheet" href="path/to/pergyl/index.css" />
  </head>
  <body>
    <article class="pergyl-card pergyl-card-labeled">
      <header class="pergyl-card-header">
        <h2 class="pergyl-card-title">System</h2>
      </header>
      <p class="pergyl-card-subtitle">Current status</p>
      <button class="pergyl-button" type="button">Run</button>
    </article>
  </body>
</html>
```

Open `examples/playground.html` in a browser to see every component rendered together, or copy markup from `packages/core-patterns/snippets/index.html` into your own templates.

## v0.1 Component Scope

Button, Input, Textarea, Checkbox, Radio Group, Select, Card, Alert, Badge, System Bar, Status Label, Metrics, Meter, Data List, Data Table.

## Browser And Stability Notes

Pergyl targets modern evergreen browsers with support for CSS custom properties, cascade imports, and standard form semantics.

v0.1 is a pre-release. The current class names, data attributes, and token names define the public contract for this release, but they may still change before a future stable 1.0. Breaking contract changes should be documented in [CHANGELOG.md](CHANGELOG.md).

## Documentation

- [Plain HTML quickstart](docs/plain-html-quickstart.md)
- [Eleventy usage](docs/eleventy-usage.md)
- [Component reference](docs/component-usage.md)
- [Theming](docs/theming.md)

## Project

- [Changelog](CHANGELOG.md)
- [Roadmap](ROADMAP.md)
- [Contributing](CONTRIBUTING.md)
- [Security policy](SECURITY.md)
- [License](LICENSE)

## Repository Layout

- `packages/core-css` — design tokens, base layer, and component styles
- `packages/core-patterns` — semantic HTML snippets for copy/paste usage
- `packages/core-js` — optional, framework-neutral progressive enhancement helpers
- `examples/playground.html` — every component rendered for visual review
- `docs/` — usage and theming guides
- `tests/` — Node test runner specs that pin the public contract

## Tech Stack

| Component | Library | Description |
|---|---|---|
| **Styling** | Plain CSS + custom properties | Token-driven theming; no preprocessor |
| **Tests** | [Node test runner](https://nodejs.org/api/test.html) | Built-in `node --test`; no test framework |
| **Examples** | Static HTML | Open in any browser; no build step |

## License

Pergyl is released under the [MIT License](LICENSE).
