<p align="center">
  <strong>Gloamkit</strong>
</p>

<p align="center">
  <em>HTML-first web UI primitives with a clean terminal feel.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-v0.1%20pre--release-333333.svg" alt="v0.1 pre-release">
  <img src="https://img.shields.io/badge/approach-HTML--first-4f6d7a.svg" alt="HTML-first">
  <img src="https://img.shields.io/badge/scope-framework--agnostic-5faf87.svg" alt="Framework agnostic">
  <img src="https://img.shields.io/badge/accessibility-WCAG%202.2%20AA%20baseline-00A3A3.svg" alt="WCAG 2.2 AA baseline">
</p>

## What It Does

Gloamkit is a lean, terminal-inspired component system for modern web interfaces. v0.1 is intentionally plain-HTML first so you can use it directly in static sites and lightweight stacks, then layer in framework adapters later.

## Features

- **Terminal-inspired by default** - dense, calm, monospace-forward styling without retro CRT effects
- **HTML-first component contract** - semantic classes backed by CSS tokens
- **Framework-agnostic baseline** - usable from plain HTML, Eleventy, and server-rendered templates
- **Optional JavaScript only** - progressive enhancement where native HTML is not enough
- **Accessibility baseline** - keyboard-first patterns and WCAG 2.2 AA token targets

## What Gloamkit Is Not

- **Not a retro skin pack** - no scanlines, pixel-art frames, or novelty effects
- **Not framework-coupled** - no React/Vue lock-in at the core layer
- **Not an everything library** - v0.1 is a focused proof of concept

## Quick Start

```sh
cd gloamkit
node --test
```

Open `examples/playground.html` in a browser for local iteration.

## Repository Layout

- `packages/core-css` - design tokens, base layer, and component styles
- `packages/core-patterns` - semantic HTML snippets for copy/paste usage
- `packages/core-js` - optional, framework-neutral progressive enhancement helpers
- `docs` - usage, theming, and acceptance docs
- `DEV_NOTES` - local planning notes (gitignored)

## v0.1 Component Scope

- Button
- Input
- Textarea
- Checkbox
- Radio Group
- Select
- Card
- Alert
- Badge

## Documentation

- `docs/plain-html-quickstart.md`
- `docs/eleventy-usage.md`
- `docs/component-usage.md`
- `docs/theming.md`
- `docs/v0.1-acceptance-checklist.md`

## Naming

Canonical project name is `Gloamkit`. `GloamkitUI` can remain an optional naming alias for package or org namespace if needed.
