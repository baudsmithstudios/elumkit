# Eleventy Usage

[Eleventy](https://www.11ty.dev/) is a fantastic, light-weight static HTML generator. Use this guide to consume ELumKit components in Eleventy without a frontend framework. ElumKit source is copied into your project so you can commit and modify it directly.

## 1) Copy the core CSS into your assets

Copy the full CSS source directory into your Eleventy asset pipeline:

```text
packages/core-css/src/
```

For example:

```text
public/assets/elumkit/
  index.css
  tokens.css
  base.css
  components/*.css
```

Preserve the directory structure so `index.css` can keep importing `tokens.css`, `base.css`, and `components/*.css`.

## 2) Include the copied CSS in your base layout

```html
<link rel="stylesheet" href="/assets/elumkit/index.css" />
```

## 3) Set the theme at the document root

```html
<html data-theme="{{ theme or 'iron' }}">
```

## 4) Define a Nunjucks macro for repeated markup

`_includes/components/card.njk`:

```njk
{% macro card(title, subtitle="", content="") %}
<article class="elum-card elum-card-labeled elum-stack">
  <header class="elum-card-header">
    <h2 class="elum-card-title">{{ title }}</h2>
  </header>
  {% if subtitle %}<p class="elum-card-subtitle">{{ subtitle }}</p>{% endif %}
  {{ content | safe }}
</article>
{% endmacro %}
```

## 5) Call the macro from a page or layout

Wrap page content in `<main class="elum-container elum-stack">` for a centered, max-width-bounded frame with consistent vertical rhythm:

```njk
{% from "components/card.njk" import card %}
<main class="elum-container elum-stack">
  {{ card("Ops Status", "Last 5 minutes", '<button class="elum-button" type="button">Refresh</button>') }}
</main>
```

Copy broader examples from `packages/core-patterns/snippets/index.html` when you want markup for additional components.

## 6) Form state hooks

Use native and semantic state hooks:

- disabled: `disabled`
- invalid: `aria-invalid="true"`
