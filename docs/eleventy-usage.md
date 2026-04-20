# Eleventy Usage

Use this guide to consume v0.1 components in Eleventy without a frontend framework.

## 1) Add core CSS in your base layout

```html
<link rel="stylesheet" href="/assets/gloamkit.css" />
```

You can copy `packages/core-css/src/*.css` into your Eleventy asset pipeline and bundle as `gloamkit.css`.

## 2) Set theme at document root

```html
<html data-theme="{{ theme or 'dark' }}">
```

## 3) Create a reusable Nunjucks partial

`_includes/components/card.njk`:

```njk
<article class="tui-card tui-stack">
  <h2 class="tui-card-title">{{ title }}</h2>
  {% if subtitle %}
  <p class="tui-card-subtitle">{{ subtitle }}</p>
  {% endif %}
  {{ content | safe }}
</article>
```

## 4) Use the partial

```njk
{% from "components/card.njk" import card %}
{{ card("Ops Status", "Last 5 minutes", "<button class='tui-button' type='button'>Refresh</button>") }}
```

## 5) Form state hooks

Use native and semantic state hooks:

- disabled: `disabled`
- invalid: `aria-invalid="true"`
