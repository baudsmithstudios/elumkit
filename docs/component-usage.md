# Component Usage (v0.1)

Use semantic HTML first. Add ARIA only when native semantics are not enough.

## Button

- Markup: `<button class="pergyl-button" type="button">...`
- Variant: `data-variant="primary"`
- Disabled: native `disabled`
- Keyboard: Enter/Space activate native button behavior

## Input / Textarea / Select

- Use `.pergyl-field` with a connected `<label for="...">`
- Invalid state: `aria-invalid="true"`
- Disabled state: native `disabled`
- Keyboard: native form element behavior

## Checkbox / Radio Group

- Wrap with `.pergyl-choice` labels for larger click targets
- Radio groups should use `fieldset` + `legend`
- Disabled inputs should use native `disabled`
- Optional visual label hint for disabled choice: `data-disabled="true"` on `.pergyl-choice`

## Card

- Use `<article class="pergyl-card">` for a plain card
- Use `<article class="pergyl-card pergyl-card-labeled">` when the title should sit in the card border
- Use `<header class="pergyl-card-header">` for the card title region
- Title class: `.pergyl-card-title`
- Subtitle class: `.pergyl-card-subtitle`
- Subtitle defaults to card body flow, below the border label
- Use `<header class="pergyl-card-header" data-inline="true">` only for short subtitles that should sit beside the title

## Alert

- Base: `.pergyl-alert`
- Tones: `data-tone="success" | "warn" | "error"`
- For status messaging, prefer `role="status"` and/or `aria-live="polite"` where appropriate

## Badge

- Base: `.pergyl-badge`
- Accent tone: `data-tone="accent"`

## Status Label

- Base: `.pergyl-status-label`
- Tones: `data-tone="accent" | "success" | "warn" | "error"`
- Use for compact inline status text in dense rows and tables

## Status Bar

- Base: `.pergyl-status`
- Use `.pergyl-status-brand` for the primary label
- Group compact key/value items with `.pergyl-status-group`
- Keep status bar copy short enough to wrap cleanly on narrow screens

## Metrics

- Base list: `.pergyl-metrics`
- Row: `.pergyl-metric`
- Use `.pergyl-metric-label`, `.pergyl-metric-value`, and `.pergyl-metric-unit` for aligned telemetry

## Meter

- Base: `.pergyl-meter`
- Use `role="meter"` with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`
- Use `.pergyl-meter-track` and `.pergyl-meter-fill` for the visual bar
- Fill tones: `data-tone="success" | "warn" | "error"`

## Data List

- Base: `.pergyl-list`
- Row: `.pergyl-row`
- Use `.pergyl-row-title`, `.pergyl-row-meta`, and `.pergyl-row-value` for compact aligned content
- Use `data-selected="true"` for visual selection state

## Data Table

- Wrapper: `.pergyl-table-wrap`
- Table: `.pergyl-table`
- Use `data-label` on each cell so rows remain readable on narrow screens
- Use `data-numeric="true"` and `data-align="end"` for tabular numeric columns
