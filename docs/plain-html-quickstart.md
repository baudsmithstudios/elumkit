# Plain HTML Quickstart

Use this path when you want components in your project and want to own the copied source. You can either copy the source code directly or install from npm.

## 1) Install from npm

Install ElumKit as a dev dependency:

```sh
npm install -D @baudsmithstudios/elumkit
```

Copy the CSS source into your app:

```sh
mkdir -p public/assets/elumkit
cp -R node_modules/@baudsmithstudios/elumkit/packages/core-css/src/* public/assets/elumkit/
```

Copy the HTML snippets as a local reference (optional):

```sh
cp node_modules/@baudsmithstudios/elumkit/packages/core-patterns/snippets/index.html ./elumkit-snippets.html

```
> [!IMPORTANT]
> Do not edit the files in `node_modules`. Copy them into your app, commit them, and modify the source directly.

## OR copy the core CSS

Copy the full CSS source directory into your project:

```text
packages/core-css/src/
```

Preserve the directory structure so `index.css` can keep importing `tokens.css`, `base.css`, and `components/*.css`.

For example:

```text
public/assets/elumkit/
  index.css
  tokens.css
  base.css
  components/
    button.css
    card.css
    data.css
    feedback.css
    footer.css
    form.css
    navigation.css
    query.css
    tabs.css
    telemetry.css
    toolbar.css
```

## 2) Include the copied CSS

```html
<link rel="stylesheet" href="/assets/elumkit/index.css" />
```

## 3) Set the theme root

```html
<html data-theme="iron">
```

Use `data-theme="dust"` for a warm earthy light palette or `data-theme="neon"` for a synthwave-inspired dark palette.

## 4) Copy component markup

Start from:

- `packages/core-patterns/snippets/index.html`
- `examples/playground.html`

Example:

```html
<main class="elum-container elum-stack">
  <article class="elum-card elum-card-labeled elum-stack">
    <header class="elum-card-header">
      <h2 class="elum-card-title">System</h2>
    </header>
    <p class="elum-card-subtitle">Current status</p>
    <button class="elum-button" type="button">Run</button>
  </article>
</main>
```

`.elum-container` provides a centered, max-width-bounded page frame. `.elum-stack` adds consistent vertical rhythm between children. See `docs/theming.md` for the layout tokens that drive both.

Copied CSS and markup are application code. Edit them to fit your project.

## 5) Verify critical states

- focus-visible
- disabled
- invalid (`aria-invalid="true"`)
