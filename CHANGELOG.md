# Changelog

## [Unreleased]

### Changed

- All three default themes now have distinct status colors. Status UIs can now distinguish caution, error, info, and success states without token overrides. 
- `dust` theme background lightened slightly to improve contrast ratios with the updated color palette. 

## [0.2.0] - 2026-05-25

### Added

- `.elum-container` page-frame utility (centered, max-width, responsive padding)
- Layout tokens: `--elum-container-width`, `--elum-container-padding-inline`, `--elum-container-padding-block`
- Typography scale tokens: `--elum-text-lg`, `--elum-text-xl`, `--elum-text-2xl`, `--elum-text-3xl`
- Heading scale on bare `<h1>`–`<h6>` wired to the typography tokens
- `color-scheme` declarations per theme so native form controls follow the active theme

### Changed

- Bare form controls (`button`, `input`, `select`, `textarea`, `optgroup`, `option`) inherit document font
- Bare `<p>` margin reset to 0
- `<body>`: `overflow-wrap: break-word` (long-string layout safety)
- `<html>`: `-webkit-text-size-adjust: 100%` (iOS Safari rotation)
- `<fieldset>`: `min-width: 0` (flex/grid overflow)
- Bare `<a>`: accent color, underline, hover shifts to foreground
- `<img>`, `<picture>`, `<video>`, `<canvas>`: `display: block`, `max-width: 100%`

### Fixed

- `.elum-checkbox` / `.elum-radio` reset to `margin: 0` so they align in dense form rows without inheriting UA defaults

### Breaking changes

- `<meter>` → `<div role="meter">` with `aria-valuenow`/`min`/`max`. `.elum-meter` class API unchanged; update markup only. See `docs/component-usage.md`.

## [0.1.0] - 2026-05-23

### Added

- Initial component set: Button, Input, Textarea, Checkbox, Radio Group,
  Select, Card, Alert, Badge, System Bar, Navigation Tabs, Toolbar, Query Row,
  Pagination, Empty State, Disclosure, Detail List, Status Label, Metrics,
  Meter, Data List, Data Table
- Three built-in themes: `iron` (dark terminal), `neon` (synthwave dark),
  `dust` (warm light)
- Token-driven theming via CSS custom properties (`--elum-color-*`,
  `--elum-space-*`, `--elum-text-*`)
- Owned-source distribution — copy `packages/core-css/src/` into your project
  and commit it directly
- Responsive patterns for tables, toolbars, query rows, and panels
- WCAG 2.2 AA contrast baseline across all three themes
- Plain HTML quickstart, Eleventy usage guide, component reference, and
  theming guide
- `examples/playground.html` for visual review of all components and states

[Unreleased]: https://github.com/baudsmithstudios/elumkit/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/baudsmithstudios/elumkit/releases/tag/v0.2.0
[0.1.0]: https://github.com/baudsmithstudios/elumkit/releases/tag/v0.1.0
