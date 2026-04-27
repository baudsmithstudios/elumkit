# Component Usage (v0.1)

Use semantic HTML first. Add ARIA only when native semantics are not enough.

## Button

- **Class:** `.pergyl-button` on a native `<button>`
- **Variants:** `data-variant="primary"` for the accent style
- **Disabled:** native `disabled`
- **Keyboard:** native button activation (Enter / Space)

## Input / Textarea / Select

- **Class:** `.pergyl-field` on the input, with a connected `<label for="...">`
- **Invalid state:** `aria-invalid="true"`
- **Disabled state:** native `disabled`
- **Keyboard:** native form element behavior

## Checkbox / Radio Group

- **Wrapper:** `.pergyl-choice` label for larger click targets
- **Radio groups:** wrap in `<fieldset>` with `<legend>`
- **Disabled:** native `disabled` on the input; optional `data-disabled="true"` on `.pergyl-choice` for the visual hint

## Card

- **Plain card:** `<article class="pergyl-card">`
- **Labeled card** (title in border): `<article class="pergyl-card pergyl-card-labeled">`
- **Header region:** `<header class="pergyl-card-header">` with `.pergyl-card-title` and optional `.pergyl-card-subtitle`
- Subtitle defaults to card body flow, below the border label.
- **Inline subtitle** (beside the title): `<header class="pergyl-card-header" data-inline="true">` — only for short subtitles

## Alert

- **Class:** `.pergyl-alert`
- **Tones:** `data-tone="success" | "warn" | "error"`
- **Live region:** prefer `role="status"` and/or `aria-live="polite"` for status messaging

## Status Label

- **Class:** `.pergyl-status-label`
- **Tones:** `data-tone="accent" | "success" | "warn" | "error"`
- Use for compact inline status text in dense rows and tables.
- Prefer short uppercase status text such as `READY` or `REVIEW` so copy/paste and assistive technology match the rendered UI.

## Status Bar

- **Class:** `.pergyl-status`
- **Brand label:** `.pergyl-status-brand` for the primary label
- **Compact key/value items:** group with `.pergyl-status-group`
- Status values may use bracketed status text for terse terminal-style state.
- Keep status bar copy short enough to wrap cleanly on narrow screens.

## Metrics

- **List:** `.pergyl-metrics`
- **Row:** `.pergyl-metric`
- Use `.pergyl-metric-label`, `.pergyl-metric-value`, and `.pergyl-metric-unit` for aligned telemetry.

## Meter

- **Class:** `.pergyl-meter` with `role="meter"` and `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- **Visual bar:** `.pergyl-meter-track` and `.pergyl-meter-fill`
- **Fill tones:** `data-tone="success" | "warn" | "error"`

## Data List

- **List:** `.pergyl-list`
- **Row:** `.pergyl-row`
- Use `.pergyl-row-title`, `.pergyl-row-meta`, and `.pergyl-row-value` for compact aligned content.
- **Selected state:** `data-selected="true"`

## Data Table

- **Wrapper:** `.pergyl-table-wrap`
- **Table:** `.pergyl-table`
- **Responsive narrow rows:** `data-label` on each cell
- **Numeric columns:** `data-numeric="true"` and `data-align="end"`
- **Status column:** `data-column="status"` on header and cells to keep status output aligned
