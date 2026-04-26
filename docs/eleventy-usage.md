# Eleventy Usage

Use this guide to consume v0.1 components in Eleventy without a frontend framework.

## 1) Include the core CSS in your base layout

```html
<link rel="stylesheet" href="/assets/pergyl.css" />
```

Either copy `packages/core-css/src/*.css` into your asset pipeline and bundle as `pergyl.css`, or serve `packages/core-css/src/index.css` directly.

## 2) Set the theme at the document root

```html
<html data-theme="{{ theme or 'dark' }}">
```

## 3) Define a Nunjucks macro for repeated markup

`_includes/components/card.njk`:

```njk
{% macro card(title, subtitle="", content="") %}
<article class="pergyl-card pergyl-card-labeled pergyl-stack">
  <header class="pergyl-card-header">
    <h2 class="pergyl-card-title">{{ title }}</h2>
  </header>
  {% if subtitle %}<p class="pergyl-card-subtitle">{{ subtitle }}</p>{% endif %}
  {{ content | safe }}
</article>
{% endmacro %}
```

## 4) Call the macro from a page or layout

```njk
{% from "components/card.njk" import card %}
{{ card("Ops Status", "Last 5 minutes", '<button class="pergyl-button" type="button">Refresh</button>') }}
```

## 5) Form state hooks

Use native and semantic state hooks:

- disabled: `disabled`
- invalid: `aria-invalid="true"`
