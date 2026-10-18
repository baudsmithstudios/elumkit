# Changelog

## [Unreleased]

### Added

- Dialog component: `.elum-dialog` on a native `<dialog>`,
- Action Menu component: `.elum-menu` on a native popover opened by a `popovertarget` button.
- Switch component: `.elum-switch` on a native checkbox with `role="switch"`.
- Segmented Control component: `.elum-segmented` fieldset of radios styled as joined options; the checked one is bracketed.
- Breadcrumb component: `.elum-breadcrumb` on a `<nav>` wrapping an ordered list of links.
- App Shell layout: `.elum-shell` grid with a full-width navbar and footer around a sidebar and main.
- Sidebar component: `.elum-sidebar` on a `<nav>`, sticky beside main, with optional grouped links.
- Navbar can hold `.elum-system-bar-group` status items after the links.
- `--elum-navbar-height` token for the navbar's minimum height and the sidebar's sticky offset.
- Spinner component: `.elum-spinner` cycles a `|/-\` before a visible label, inside a `role="status"` region.
- Field error message: `.elum-field-error`, linked to an invalid control with `aria-describedby`.
- App Shell skip link: `.elum-skip-link`, hidden until focused, jumps to `<main>`.
- Skeleton component: `.elum-skeleton` placeholder line with a pulsing `░` fill, for regions marked `aria-busy`.
- Progress component: `role="progressbar"` on `.elum-meter-track`, with a sliding block when `aria-valuenow` is absent.
- Bundled JetBrains Mono (`src/fonts/`, SIL OFL 1.1): a 39KB Latin subset, weights 100–800, no ligatures. `dist/elumkit.css` inlines it, so strict CSPs need `data:` in `font-src`.
- Base styles for `<kbd>` (bracketed keys) and inline `<code>` (accent, backticked).

### Changed

- README claims WCAG 2.0 AA for the library side (was an unaudited 2.2 AA) and lists what apps must supply.
- Truncated Data List row text wraps in full on hover or keyboard focus.
- Labelled Metrics examples carry `role="group"`, and vertical Separator examples carry `aria-orientation="vertical"`.
- Tabs ship with the tablist `hidden` and plain panels; `tabs.js` reveals the tablist and adds the panel roles, so nothing announces tab behavior without the script.
- Data Table wrapper examples are focusable, named regions, so keyboard users can scroll wide tables in Safari.
- Data Table markup carries explicit table roles, so narrow-screen rows keep their header semantics. Screen readers skip the drawn `data-label` text.
- The current nav link is marked with a small `▶` (was `>`), hidden from screen readers.
- Prompt input examples use a small `▶` (was `>`), set closer to the input.
- Navbar links are centered above 48rem. At 48rem and below the brand hides; at 42rem and below the status group collapses into a popover behind `.elum-navbar-status-trigger`.
- Navbar links are spaced 1.5rem apart so the current-link marker clears the previous link.
- Nav links use the shared 2px focus ring (was 1px), and link focus rings have slightly rounded corners.

### Removed

- `--elum-button-baseline-shift`. The bundled font centers button labels on its own; for another font, override `.elum-button`'s `padding-block`.

### Fixed

- Navbar wraps instead of scrolling sideways, so the current-link marker no longer overlaps the brand on narrow screens.
- Separators, Data Lists, Feeds, fieldset fields, and field errors get the `.elum-stack` gap. Base styles now zero `<hr>`, `<ul>`, `<ol>`, and `<fieldset>` margins, like `<p>` and headings.
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
