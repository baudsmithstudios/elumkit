# Changelog

## [Unreleased]

### Added

- Dialog component: `.elum-dialog` on a native `<dialog>`,
- Action Menu component: `.elum-menu` on a native popover opened by a `popovertarget` button.
- Switch component: `.elum-switch` on a native checkbox with `role="switch"`.
- Segmented Control component: `.elum-segmented` fieldset of radios styled as joined options.
- Breadcrumb component: `.elum-breadcrumb` on a `<nav>` wrapping an ordered list of links.
- App Shell layout: `.elum-shell` grid with a full-width navbar and footer around a sidebar and main.
- Sidebar component: `.elum-sidebar` on a `<nav>`, sticky beside main, with optional grouped links.
- Navbar can hold `.elum-system-bar-group` status items between the brand and links.
- `--elum-navbar-height` token for the navbar's minimum height and the sidebar's sticky offset.
- Base styles for `<kbd>` (bracketed keys) and inline `<code>` (accent, backticked).

### Changed

- The current nav link is marked with a larger, centered `›` chevron (matching the breadcrumb) instead of `>`, and screen readers skip it since `aria-current` already names the link.
- Navbar links are spaced 1.5rem apart so the current-link chevron clears the link before it.
- Nav links use the same 2px focus ring as buttons, inputs, and other links instead of a thinner 1px ring, and every link's focus ring has slightly rounded corners.

### Fixed

- Navbar wraps instead of scrolling sideways, so the current-link marker no longer overlaps the brand on narrow screens.
- `<code>`, `<kbd>`, and `<pre>` use the theme font instead of the browser's generic monospace.

## [0.3.1] - 2026-07-12

### Fixed

- Publish `packages/core-js/src/tabs.js`.

## [0.3.0] - 2026-07-12

### Added

- Navbar component snippet and classes.
- Footer component snippet and classes.
- Floating label field snippet and classes (`.elum-field-float`), for input and textarea.
- `elum-grid` primitive with tunable `--elum-grid-min` token. 
- Separator component: `.elum-separator` (horizontal rule, `data-orientation="vertical"` for inline dividers) and `.elum-separator-labeled` for labeled section dividers.
- Feed component: `.elum-feed` list of tone-coded `.elum-feed-item` rows (`data-tone`) with a right-pinned `.elum-feed-meta`.
- Output component: `.elum-output` block that wraps preformatted command and log output, with a scope line and copy control.
- Single-file bundle `dist/elumkit.css` (flattened `src/index.css` with no `@import`s) for consumers with no CSS build step, such as single-binary embeds. Build with `npm run build:css`.
- Metrics tile row: `data-layout="tiles"` on `.elum-metrics` lays metrics out as bordered KPI tiles in a wrapping row.
- Metric value tones: `data-tone="success" | "warn" | "error"` on `.elum-metric` colors the value, in both list and tile layouts.
- `core-js/tabs.js`: optional script that drives the tabset (roving focus, arrow/Home/End keys, manual activation). Without it, all panels stay visible.
- Forced-colors (Windows High Contrast Mode) fallbacks for row selection/focus and the meter fill.

### Changed

- Default page width (`--elum-container-width`) widened to 90rem (1440px).
- Navbar and footer now share the same `--elum-container-*` token. 
- All three default themes now have distinct status colors. Status UIs can now distinguish caution, error, info, and success states without token overrides. 
- `dust` theme background lightened slightly to improve contrast ratios with the updated color palette. 
- Navbar and footer link separators now use layout `gap`; the current navbar link is marked with a `>` indicator.
- Copy control hit target enlarged without layout shift; prompt field gains a focus outline.
- `--elum-color-border` adjusted for contrast.

### Breaking changes

- Tabs are now a formal tabset based on the `<button>`, not `<a>`. Tabs can now be used to display one panel of content at a time. Navigation responsibility belongs to the navbar.
- Data List markup is now `<ul>`/`<li>` with the row element inside each `<li>`, replacing `<div role="list">` with `role="listitem"` rows.
- System Bar is now a `<section>` with an `aria-label`, not a `<nav>`.

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

[Unreleased]: https://github.com/baudsmithstudios/elumkit/compare/v0.3.1...HEAD
[0.3.1]: https://github.com/baudsmithstudios/elumkit/releases/tag/v0.3.1
[0.3.0]: https://github.com/baudsmithstudios/elumkit/releases/tag/v0.3.0
[0.2.0]: https://github.com/baudsmithstudios/elumkit/releases/tag/v0.2.0
[0.1.0]: https://github.com/baudsmithstudios/elumkit/releases/tag/v0.1.0
