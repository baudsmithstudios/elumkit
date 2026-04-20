# project_tui

A modern terminal-inspired web UI component system.

This project is intentionally HTML-first for v0.1. The goal is to ship a lean, accessible baseline that works in plain HTML and static-site workflows (including Eleventy), then add thin framework adapters later (React, Vue, Rails helpers).

## v0.1 scope

- Core styling contract: CSS variables + semantic component classes
- Semantic HTML patterns for fast copy/paste use
- Optional progressive enhancement JavaScript only where native HTML is not enough

## Repository layout

- `packages/core-css`: tokens, base styles, and component styles
- `packages/core-patterns`: semantic HTML snippets and examples
- `packages/core-js`: optional framework-neutral behavior helpers
- `DEV_NOTES`: local-only planning notes (gitignored)

## Current component target (lean MVP)

- Button
- Input
- Textarea
- Checkbox
- Radio Group
- Select
- Card
- Alert
- Badge

## Design constraints

- Monospace-first, clean and dense
- No retro effects by default (no scanlines, pixel art, CRT glow)
- Keyboard-first and WCAG 2.2 AA baseline

## Status

Foundation scaffold in progress.

## Development

Run the contract tests:

```sh
node --test
```

Use the local playground for quick UI iteration:

- `examples/playground.html`
