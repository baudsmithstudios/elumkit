# Roadmap

Last updated: April 28, 2026

Pergyl is a focused component system. This roadmap is a snapshot of possible project direction, not a delivery contract or committed backlog.

Priorities may change as the project matures. Items may ship, change shape, move between releases, or be removed entirely.

## Shipped

v0.1 establishes the plain HTML core:

- Semantic component class contract
- Token-driven CSS themes
- Copyable snippets and static playground
- Plain HTML, Eleventy, component, and theming documentation
- Contract tests for core CSS, docs, examples, and image assets

---

## Potential v0.2 - Frontend Framework Support

Add framework support without forking the core design system.

### Framework mapping rules

- Document React, Vue, and server-template usage patterns
- Keep framework APIs thin over the same HTML and CSS contract
- Avoid component behavior that native HTML already provides

### Starter adapters

- Provide minimal examples for common frontend stacks
- Keep adapter code small enough to audit against the plain HTML snippets
- Preserve semantic markup as the source of truth

### Accessibility notes

- Expand component guidance where framework wrappers can accidentally hide native semantics
- Keep examples small and directly testable

---

## Potential v0.3 - Distribution Options

Make Pergyl easier to consume from real projects after the framework support shape is clear.

### Asset pipeline integrations

- Add minimal examples for copying or bundling Pergyl CSS into common static-site pipelines
- Keep examples focused on usage, not framework-specific abstractions

### Optional npm package

- Decide whether publishing to npm is useful for the project
- If adopted, define the package export shape for core CSS and any adapter entrypoints
- Document installation and version pinning

### Playground polish

- Keep snippets and playground coverage aligned
- Add a README screenshot once the public visual language stabilizes

---

## Not Planned For The Core

- JavaScript behavior for native form controls
- Large overlay/navigation systems
- Framework-coupled styling APIs
- Screenshot-based visual regression as a v0.x requirement
