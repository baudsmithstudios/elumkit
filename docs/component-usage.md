# Component Usage

Use semantic HTML first. Add ARIA only when native semantics are not enough.

## Layout

- **Page container:** `.elum-container` on `<main>` (or any block element) — centers content, applies `--elum-container-width` max width, and pads with `--elum-container-padding-inline` / `--elum-container-padding-block`. Override the tokens to reframe the page.
- **Vertical rhythm:** `.elum-stack` on a container adds a top margin (`--elum-space-3`) to every child after the first. Compose with `.elum-container` for a complete page skeleton: `<main class="elum-container elum-stack">`.

## Button

- **Class:** `.elum-button` on a native `<button>`
- **Variants:** the default `.elum-button` is the secondary style (bordered, no fill). Add `data-variant="primary"` for a filled accent button or `data-variant="tertiary"` for a borderless button.
- **Disabled:** native `disabled`
- **Keyboard:** native button activation (Enter / Space)

## Input / Textarea / Select

- **Wrapper:** `.elum-field` around the control, with a connected `<label for="...">`
- **Prompt input:** wrap `.elum-input` in `.elum-prompt-field` and place `.elum-input-prompt` before it for a persistent prompt such as `>`
- **Invalid state:** `aria-invalid="true"`
- **Disabled state:** native `disabled`
- **Keyboard:** native form element behavior
- Note: the `<select>` dropdown pop-up on Linux running Chromium is rendered as a native GTK window and follows the system GTK theme regardless of `color-scheme`. On dark themes, the popup will appear light if the system GTK theme is light. This is a platform boundary. Switch to a dark system GTK theme for full consistency.

## Checkbox / Radio Group

- **Wrapper:** `.elum-choice` label for larger click targets
- **Radio groups:** wrap in `<fieldset>` with `<legend>`
- **Disabled:** native `disabled` on the input; optional `data-disabled="true"` on `.elum-choice` for the visual hint

## Card

- **Plain card:** `<article class="elum-card">`
- **Labeled card** (title in border): `<article class="elum-card elum-card-labeled">`
- **Header region:** `<header class="elum-card-header">` with `.elum-card-title` and optional `.elum-card-subtitle`
- Subtitle defaults to card body flow, below the border label.
- **Inline subtitle** (beside the title): `<header class="elum-card-header" data-inline="true">` — only for short subtitles

## Alert

- **Class:** `.elum-alert`
- **Tones:** `data-tone="success" | "warn" | "error"`
- **Live region:** prefer `role="status"` and/or `aria-live="polite"` for status messaging
- Default themes use a compact palette, so some tones may share a color. Edit theme tokens after copying ElumKit source when your application needs stronger visual distinction.

## Badge

- **Class:** `.elum-badge`
- **Tones:** `data-tone="accent" | "success" | "warn" | "error"`
- Use for compact bracketed status text such as `[WARNING]`.
- Default themes use a compact palette, so some tones may share a color.

## Status Label

- **Class:** `.elum-status-label`
- **Tones:** `data-tone="accent" | "success" | "warn" | "error"`
- Use for compact inline status text in dense rows and tables.
- Status labels render with a same-color dot and short uppercase status text such as `READY` or `REVIEW`.
- Default themes use a compact palette, so some tones may share a color.

## System Bar

- **Class:** `.elum-system-bar`
- **Brand label:** `.elum-system-bar-brand` for the primary label
- **Compact key/value items:** group with `.elum-system-bar-group`
- Status values may use bracketed status text for terse terminal-style state.
- Keep system bar copy short enough to wrap cleanly on narrow screens.

## Navbar

- **Wrapper:** `.elum-navbar` on a `<nav>`; sticks to the top of the viewport
- **Brand:** `.elum-navbar-brand` on the wordmark label
- **Links:** `.elum-navlinks` containing `.elum-navlink` anchors
- **Current page:** `aria-current="page"` on the active link
- Use for top-level page navigation. For switching views on one page, use tabs.

## Footer

- **Wrapper:** `.elum-footer` on a `<footer>`
- **Brand:** `.elum-footer-brand`; **links:** `.elum-footer-links` wrapping `.elum-footer-link` anchors
- Shares the `--elum-container-*` frame tokens, so it aligns with the navbar and `.elum-container`.

## Tabs

- **Tablist:** `.elum-tabs` with `role="tablist"` and an accessible name
- **Tab:** `.elum-tab` on a `<button role="tab">` with `aria-selected`, an `id`, and `aria-controls` for its panel
- **Panel:** `role="tabpanel"` with `aria-labelledby`; hide inactive panels with `hidden`
- **Roving focus:** active tab `tabindex="0"`, others `tabindex="-1"`
- Switches between views on one page. Requires JavaScript for panel switching and keyboard support; see `examples/playground.html`. For page navigation, use the navbar.

## Toolbar

- **Wrapper:** `.elum-toolbar`; add `role="group"` and an accessible name when the controls need an announced group
- **Groups:** `.elum-toolbar-group` for related actions or metadata
- **End alignment:** `data-align="end"` on a toolbar group
- **Metadata:** `.elum-toolbar-label` and `.elum-toolbar-value`
- Use for page actions, refresh controls, status labels, and compact metadata. Keep behavior in application code.

## Query Row

- **Wrapper:** `.elum-query` on a `<form>`
- **Search landmark:** add `role="search"` and an accessible name such as `aria-label="Service filters"` when the form filters page or table content
- Compose with existing `.elum-field`, `.elum-input`, `.elum-select`, and `.elum-button` classes.
- Keep filtering behavior in application code.

## Pagination

- **Wrapper:** `.elum-pagination` on a `<nav aria-label="Pagination">`
- **Status text:** `.elum-pagination-status` for compact page range or count text
- Use real links for navigable pages and buttons for client-side page changes.
- Disable unavailable controls with native `disabled` when using buttons.

## Empty State

- **Wrapper:** `.elum-empty` for a compact no-content message
- **Title:** `.elum-empty-title` for the short state label
- **Message:** `.elum-empty-message` for supporting detail
- Use inside cards, table cells, or list regions when there is no content to show.
- Place table empty states inside a `<td colspan="...">` so table structure stays valid.
- Add live-region semantics only when an application updates the empty state dynamically and users need the change announced.

## Disclosure

- **Wrapper:** `<details class="elum-disclosure">`
- **Summary:** `<summary class="elum-disclosure-summary">`
- **Content:** `.elum-disclosure-content` for the expanded body
- Use native `<details>` and `<summary>` so disclosure behavior works without JavaScript.
- Keep summary text specific enough to identify the content being expanded.

## Detail List

- **List:** `<dl class="elum-detail-list">`
- **Row:** `.elum-detail` around each term/value pair
- **Term:** `.elum-detail-term` on `<dt>`
- **Value:** `.elum-detail-value` on `<dd>`
- Use for stable facts such as identifiers, timestamps, statuses, and configuration values.
- Use real `<dt>` and `<dd>` elements so assistive technologies receive definition-list semantics.

## Metrics

- **List:** `.elum-metrics`
- **Row:** `.elum-metric`
- Use `.elum-metric-label`, `.elum-metric-value`, and `.elum-metric-unit` for aligned telemetry.

## Meter

- **Wrapper:** `.elum-meter` on a `<div>`
- **Track:** `.elum-meter-track` on a `<div>` with `role="meter"`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` for correct AT announcements
- **Fill width:** `style="--elum-meter-fill-width: N%"` on the track element, matching the value as a percentage of the range
- **Fill tones:** `data-tone="success" | "warn" | "error"` on the track element
- **Label:** `aria-label` on the track element, or `aria-labelledby` pointing to a visible `.elum-meter-label`
- **Why not `<meter>`:** styling `<meter>` internals requires deprecated non-standard pseudo-elements (`::-webkit-meter-bar` etc.) that MDN recommends against. `<div role="meter">` provides equivalent accessibility with full CSS control.

## Data List

- **List:** `.elum-list`
- **Row:** `.elum-row`
- Use `.elum-row-title`, `.elum-row-meta`, and `.elum-row-value` for compact aligned content.
- **Selected state:** `data-selected="true"` for the visual hook, plus the appropriate semantic state for the context. For a current link, use `aria-current="true"`.

## Data Table

- **Wrapper:** `.elum-table-wrap`
- **Table:** `.elum-table`
- **Responsive narrow rows:** `data-label` on each cell
- **Numeric columns:** `data-numeric="true"` and `data-align="end"`
- **Status column:** `data-column="status"` on header and cells to keep status output aligned
