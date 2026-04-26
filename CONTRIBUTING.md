# Contributing to Pergylkit

Thanks for your interest in contributing. Pergylkit is a small project and focused contributions are welcome.

## Getting Started

1. Fork the repo and clone your fork
2. Make sure you have Node.js 20+ installed
3. Run `npm test` (or `node --test`) to verify everything passes
4. Create a branch for your change

## Local Preview

The component playground is a single static HTML file. Serve the repo from a local web server and open the playground in a browser:

```sh
npm run preview          # serves on http://localhost:4173
```

Then open `http://localhost:4173/examples/playground.html`. Every v0.1 component is rendered together so you can review styles and states visually.

## Submitting Changes

- Open a pull request against `main`
- Keep changes focused — one feature or fix per PR
- Add or update tests in `tests/` for new behavior or contract changes
- Make sure `npm test` passes before submitting

## Reporting Bugs

Open an issue with:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Your environment (browser, Node.js version)

## Code Style

- Match the style of surrounding code
- Keep markup semantic and minimal — add ARIA only when native semantics are not enough
- Keep CSS token-driven — prefer custom properties over hard-coded values

## Questions?

Open an issue.
