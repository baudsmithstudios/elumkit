# Eleventy Usage

Use this guide to consume v0.1 components in Eleventy without a frontend framework.

## 1) Add core CSS in your base layout

```html
<link rel="stylesheet" href="/assets/pergylkit.css" />
```

You can copy `packages/core-css/src/*.css` into your Eleventy asset pipeline and bundle as `pergylkit.css`.

## 2) Set theme at document root

```html
<html data-theme="{{ theme or 'dark' }}">
```

## 3) Create a reusable Nunjucks partial

`_includes/components/card.njk`:

```njk
<article class="pergyl-card pergyl-stack">
  <h2 class="pergyl-card-title">{{ title }}</h2>
  {% if subtitle %}
  <p class="pergyl-card-subtitle">{{ subtitle }}</p>
  {% endif %}
  {{ content | safe }}
</article>
```

## 4) Use the partial

```njk
{% from "components/card.njk" import card %}
{{ card("Ops Status", "Last 5 minutes", "<button class='pergyl-button' type='button'>Refresh</button>") }}
```

## 5) Form state hooks

Use native and semantic state hooks:

- disabled: `disabled`
- invalid: `aria-invalid="true"`
