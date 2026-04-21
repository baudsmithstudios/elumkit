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

- Use `<article class="pergyl-card">`
- Title class: `.pergyl-card-title`
- Subtitle class: `.pergyl-card-subtitle`

## Alert

- Base: `.pergyl-alert`
- Tones: `data-tone="success" | "warn" | "error"`
- For status messaging, prefer `role="status"` and/or `aria-live="polite"` where appropriate

## Badge

- Base: `.pergyl-badge`
- Accent tone: `data-tone="accent"`
