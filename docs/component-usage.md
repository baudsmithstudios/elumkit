# Component Usage

Use semantic HTML first. Add ARIA only when native semantics are not enough.

## Layout

- **Page container:** `.elum-container` on `<main>` (or any block element) — centers content, applies `--elum-container-width` max width, and pads with `--elum-container-padding-inline` / `--elum-container-padding-block`. Override the tokens to reframe the page.
- **Vertical rhythm:** `.elum-stack` on a container adds a top margin (`--elum-space-3`) to every child after the first. Compose with `.elum-container` for a complete page skeleton: `<main class="elum-container elum-stack">`.
- **Responsive Columns:** `.elum-grid` lays child items as auto-fitting columns that wrap without the need for media queries. Each column is at least `--elum-grid-min` (16rem default) wide. Children components will grow to fill the row. Rows will collapse to a single column on extra small screens. The grid element has no knowledge of what child components are being composed. 

## App Shell

- **Wrapper:** `.elum-shell` on a block that directly contains, in order, a `.elum-skip-link`, a `.elum-navbar`, a `.elum-sidebar`, a `<main>`, and a `.elum-footer`.
- **Skip link:** `.elum-skip-link` on an `<a href="#main">` pointing at an `id` on `<main>`. It stays hidden until focused, then appears over the navbar's top-left corner, so keyboard users can skip past the navbar and sidebar links.
- The navbar and footer span the full width. The sidebar sits beside main at 14rem wide. Below 48rem everything stacks in that order.
- The shell fills at least the viewport height, so the footer stays at the bottom on short pages.
- `--elum-navbar-height` sets the navbar's minimum height and the offset the sidebar sticks below. Change it if your navbar content is taller.

## Kbd / Code

- **Keys:** a native `<kbd>` per key, e.g. `<kbd>Ctrl</kbd> + <kbd>K</kbd>`. CSS draws the brackets, so it renders as `[Ctrl] + [K]`.
- **Inline code:** a native `<code>`. It renders in the accent color between CSS-drawn backticks. The backticks keep code distinct from links, which also use the accent color.
- **Code blocks:** `<code>` inside a `<pre>` gets no color or backticks.
- The drawn brackets and backticks are hidden from screen readers, so don't type them into the markup.

## Button

- **Class:** `.elum-button` on a native `<button>`
- **Variants:** the default `.elum-button` is the secondary style (bordered, no fill). Add `data-variant="primary"` for a filled accent button or `data-variant="tertiary"` for a borderless button.
- **Disabled:** native `disabled`
- **Keyboard:** native button activation (Enter / Space)

## Input / Textarea / Select

- **Wrapper:** `.elum-field` around the control, with a connected `<label class="elum-label" for="...">`
- **Prompt input:** wrap `.elum-input` in `.elum-prompt-field` and place `.elum-input-prompt` before it for a persistent prompt such as `›`
- **Invalid state:** `aria-invalid="true"`, plus an error message. The error-colored border alone signals the error by color only.
- **Error message:** `.elum-field-error` on a `<p>` after the control, with an `id` that the control references in `aria-describedby`, so screen readers read the message with the control.
- **Disabled state:** native `disabled`
- **Keyboard:** native form element behavior
- Note: the `<select>` dropdown pop-up on Linux running Chromium is rendered as a native GTK window and follows the system GTK theme regardless of `color-scheme`. On dark themes, the popup will appear light if the system GTK theme is light. This is a platform boundary. Switch to a dark system GTK theme for full consistency.

## Floating Label Field

- **Wrapper:** `.elum-field-float` around the control and its `<label for="...">`
- **Markup order:** control (`.elum-input` or `.elum-textarea`) before the `<label>`, with `placeholder=" "` on the control so the label floats on focus or content
- The float is CSS-only over a real `<label>` (no JS, no ARIA). For a label stacked above the control, use `.elum-field`.

## Checkbox / Radio Group

- **Wrapper:** `.elum-choice` label for larger click targets
- **Controls:** `.elum-checkbox` on `<input type="checkbox">`, `.elum-radio` on `<input type="radio">`
- **Radio groups:** wrap in `<fieldset>` with `<legend>`
- **Disabled:** native `disabled` on the input; optional `data-disabled="true"` on `.elum-choice` for the visual hint

## Switch

- **Control:** `.elum-switch` on `<input type="checkbox" role="switch">`, wrapped in a `.elum-choice` label
- **State:** native `checked`; screen readers announce on/off, and the knob moves as well as changing color
- **Disabled:** same as Checkbox

## Segmented Control

- **Group:** `.elum-segmented` on a `<fieldset>`, named by `aria-label` or a `<legend class="elum-label">`
- **Options:** `.elum-segmented-option` labels, each wrapping an `<input type="radio">`; all radios share one `name`
- **State:** native `checked`; the radio is visually hidden but stays focusable, so Tab enters the group and arrow keys move the selection
- **Checked option:** filled with the accent color and wrapped in `[` `]`, so selection doesn't rely on color alone. Every option reserves the bracket space, so the control doesn't shift when the selection changes. Screen readers skip the brackets.
- **Disabled:** native `disabled` on the radio

## Card

- **Plain card:** `<article class="elum-card">`
- **Labeled card** (title in border): `<article class="elum-card elum-card-labeled">`
- **Header region:** `<header class="elum-card-header">` with `.elum-card-title` and optional `.elum-card-subtitle`
- Subtitle defaults to card body flow, below the border label.
- **Inline subtitle** (beside the title): `<header class="elum-card-header" data-inline="true">` — only for short subtitles

## Alert

- **Class:** `.elum-alert`
- **Tones:** `data-tone="success" | "warn" | "error"`
- **Tone in text:** the tone color alone doesn't convey state, so also state it in text, such as a leading `.elum-badge` (`[WARN]`).
- **Live region:** prefer `role="status"` and/or `aria-live="polite"` for status messaging
- Default themes use a compact palette, so some tones may share a color. Edit theme tokens after copying ElumKit source when your application needs stronger visual distinction.

## Badge

- **Class:** `.elum-badge`
- **Tones:** `data-tone="accent" | "success" | "warn" | "error"`
- Use for compact bracketed status text such as `[WARNING]`.
- Default themes use a compact palette, so some tones may share a color.

## Status Label

- **Class:** `.elum-status-label`
- **Tones:** `data-tone="accent" | "success" | "warn" | "error"`
- Use for compact inline status text in dense rows and tables.
- Status labels render with a same-color dot and short uppercase status text such as `READY` or `REVIEW`.
- Default themes use a compact palette, so some tones may share a color.

## Spinner

- **Class:** `.elum-spinner` on a `<span>` with a visible label, inside an element with `role="status"`.
- **Announcements:** keep the `role="status"` element in the page and add or remove the spinner inside it. Screen readers often miss a status region that is inserted with its text already inside.
- Draws a cycling `|` `/` `-` `\` before the label. Screen readers skip the frames and announce the label.
- Under `prefers-reduced-motion` the animation stops and the spinner shows a still `|`.
- **Motion:** remove the spinner when the work ends. WCAG 2.2.2 requires a way to stop motion that runs longer than 5 seconds beside usable content, so for work that can take longer, show determinate Progress or give users a way to stop it.

## Skeleton

- **Class:** `.elum-skeleton` on an empty element, inside a region marked `aria-busy="true"` while its content loads
- Fills one line with a pulsing `░` shade that screen readers skip. Stack several for a paragraph or block, and set `width` to shorten a line.
- The fill spans a full `--elum-container-width` at the base text size. Wider skeletons end short.
- Under `prefers-reduced-motion` the pulse stops.
- **Motion:** replace skeletons with content as soon as it loads. WCAG 2.2.2 requires a way to stop motion that runs longer than 5 seconds beside usable content, so a region that can stay loading longer needs a way to stop the pulse.

## System Bar

- **Class:** `.elum-system-bar` on a `<section>` with an `aria-label`
- **Brand label:** `.elum-system-bar-brand` for the primary label
- **Compact key/value items:** group with `.elum-system-bar-group`; each `.elum-system-bar-item` holds a `.elum-system-bar-key` and `.elum-system-bar-value`
- Status values may use bracketed status text for terse terminal-style state.
- Keep system bar copy short enough to wrap cleanly on narrow screens.

## Navbar

- **Wrapper:** `.elum-navbar` on a `<nav>`; sticks to the top of the viewport and wraps on narrow screens
- **Brand:** `.elum-navbar-brand` on the wordmark label
- **Links:** `.elum-navlinks` containing `.elum-navlink` anchors
- **Status:** a `.elum-system-bar-group` may sit between the brand and the links
- **Current page:** `aria-current="page"` on the active link
- Use for top-level page navigation. For switching views on one page, use tabs.

## Breadcrumb

- **Wrapper:** `.elum-breadcrumb` on a `<nav aria-label="Breadcrumb">` wrapping an `<ol>` with one `<li>` per level
- **Current page:** `aria-current="page"` on the last item's link
- **Separators:** CSS draws a `›` between items and hides it from screen readers, so don't type separators into the markup
- Long trails wrap onto further lines on narrow screens.

## Sidebar

- **Wrapper:** `.elum-sidebar` on a `<nav>` with an `aria-label`, holding one `<ul>`.
- **Links:** `.elum-navlink` anchors in `<li>` items, with `aria-current="page"` on the current one.
- **Groups:** an `<li>` holding an `<h2>` and a nested `<ul>` of links. The heading trails a rule, like a labeled separator, so groups stand apart from links even where a theme's muted and accent colors are close.
- Beside main, the list sticks below the navbar and scrolls on its own when it is taller than the viewport. Stacked on narrow screens, it scrolls with the page.

## Footer

- **Wrapper:** `.elum-footer` on a `<footer>`
- **Brand:** `.elum-footer-brand`; **links:** `.elum-footer-links` wrapping `.elum-footer-link` anchors
- Shares the `--elum-container-*` frame tokens, so it aligns with the navbar and `.elum-container`.

## Tabs

- **Tablist:** `.elum-tabs` with `role="tablist"`, an accessible name, and `hidden`
- **Tab:** `.elum-tab` on a `<button role="tab">` with `aria-selected`, an `id`, and `aria-controls`
- **Panel:** a plain element with the `id` its tab's `aria-controls` names. The script adds `role="tabpanel"`, `aria-labelledby`, and `tabindex="0"` so keyboard users can reach a panel with no focusable content.
- **Initial selection:** mark the starting tab `aria-selected="true"`
- **Behavior:** load `packages/core-js/src/tabs.js` (`<script defer>`) to reveal the tablist and add roving focus, arrow/Home/End keys, and manual activation (Enter/Space or click)
- **Without the script:** the tablist stays hidden and all panels stay visible, so no control announces tab behavior that nothing provides. Give each panel a heading so the stacked panels still say what they are.
- One-page view switching. For page navigation, use the navbar.

## Toolbar

- **Wrapper:** `.elum-toolbar`; add `role="group"` and an accessible name when the controls need an announced group
- **Groups:** `.elum-toolbar-group` for related actions or metadata
- **End alignment:** `data-align="end"` on a toolbar group
- **Metadata:** `.elum-toolbar-label` and `.elum-toolbar-value`
- Use for page actions, refresh controls, status labels, and compact metadata. Keep behavior in application code.

## Query Row

- **Wrapper:** `.elum-query` on a `<form>`
- **Search landmark:** add `role="search"` and an accessible name such as `aria-label="Service filters"` when the form filters page or table content
- Compose with existing `.elum-field`, `.elum-input`, `.elum-select`, and `.elum-button` classes.
- Keep filtering behavior in application code.

## Pagination

- **Wrapper:** `.elum-pagination` on a `<nav aria-label="Pagination">`
- **Status text:** `.elum-pagination-status` for compact page range or count text
- Use real links for navigable pages and buttons for client-side page changes.
- Disable unavailable controls with native `disabled` when using buttons.

## Empty State

- **Wrapper:** `.elum-empty` for a compact no-content message
- **Title:** `.elum-empty-title` for the short state label
- **Message:** `.elum-empty-message` for supporting detail
- Use inside cards, table cells, or list regions when there is no content to show.
- Place table empty states inside a `<td colspan="...">` so table structure stays valid.
- Add live-region semantics only when an application updates the empty state dynamically and users need the change announced.

## Disclosure

- **Wrapper:** `<details class="elum-disclosure">`
- **Summary:** `<summary class="elum-disclosure-summary">`
- **Content:** `.elum-disclosure-content` for the expanded body
- Use native `<details>` and `<summary>` so disclosure behavior works without JavaScript.
- Keep summary text specific enough to identify the content being expanded.

## Detail List

- **List:** `<dl class="elum-detail-list">`
- **Row:** `.elum-detail` around each term/value pair
- **Term:** `.elum-detail-term` on `<dt>`
- **Value:** `.elum-detail-value` on `<dd>`
- Use for stable facts such as identifiers, timestamps, statuses, and configuration values.
- Use real `<dt>` and `<dd>` elements so assistive technologies receive definition-list semantics.

## Metrics

- **List:** `.elum-metrics`; add `role="group"` when you give it an accessible name, since a name on a plain `<div>` is ignored
- **Row:** `.elum-metric`
- Use `.elum-metric-label`, `.elum-metric-value`, and `.elum-metric-unit` for aligned telemetry.
- **Tile row:** `data-layout="tiles"` on the list, same child markup.
- **Value tone:** `data-tone="success" | "warn" | "error"` on the row.
- **Tone in text:** the value color alone doesn't convey state, so also state it in text, such as a `.elum-badge` (`[OK]`) inside `.elum-metric-label`.

## Meter

- **Wrapper:** `.elum-meter` on a `<div>`
- **Track:** `.elum-meter-track` on a `<div>` with `role="meter"`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` for correct AT announcements
- **Fill width:** `style="--elum-meter-fill-width: N%"` on the track element, matching the value as a percentage of the range
- **Fill tones:** `data-tone="success" | "warn" | "error"` on the track element
- **Tone in text:** the fill color alone doesn't convey state, so also state it in text, such as a `.elum-badge` (`[WARN]`) inside `.elum-meter-label`.
- **Header:** optional `.elum-meter-header` above the track, holding `.elum-meter-label` and a readout in `.elum-meter-value`
- **Label:** `aria-label` on the track element, or `aria-labelledby` pointing to a visible `.elum-meter-label`
- **Why not `<meter>`:** styling `<meter>` internals requires deprecated non-standard pseudo-elements (`::-webkit-meter-bar` etc.) that MDN recommends against. `<div role="meter">` provides equivalent accessibility with full CSS control.

## Progress

- **Markup:** the Meter markup with `role="progressbar"` on `.elum-meter-track`. Use Meter for a gauge (disk usage) and Progress for task completion.
- **Determinate:** `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `--elum-meter-fill-width`, as on Meter. Tones apply the same way.
- **Indeterminate:** leave out `aria-valuenow` when the remaining work is unknown. An accent block slides across the track instead of a fill, and stays still at the track's start under reduced motion.
- **Motion:** WCAG 2.2.2 requires a way to stop motion that runs longer than 5 seconds beside usable content. Switch an indeterminate bar to determinate once the remaining work is known, and remove it when the work ends.
- **Label:** `aria-label` on the track element, or `aria-labelledby` pointing to a visible `.elum-meter-label`

## Data List

- **List:** `.elum-list` on a `<ul>`
- **Row:** `.elum-row` on any element inside each `<li>` — `<a>`, `<div>`, `<p>`
- Use `.elum-row-title`, `.elum-row-meta`, and `.elum-row-value` for compact aligned content.
- **Stacked title and meta:** wrap them in `.elum-row-main` so long titles truncate instead of pushing `.elum-row-value` off the row.
- **Truncated text:** the row grows to show the full title and meta on hover or keyboard focus. Only focusable rows (`<a>`) reveal it from the keyboard, so put long text on a link row.
- **Selected state:** `data-selected="true"` for the visual hook, plus the appropriate semantic state for the context. For a current link, use `aria-current="true"`.

## Data Table

- **Wrapper:** `.elum-table-wrap`
- **Keyboard scrolling:** give the wrapper `tabindex="0"`, `role="region"`, and an `aria-label` naming the table. Safari does not focus scroll containers, so without these, keyboard users cannot scroll a table wider than the screen. The region role and label tell screen reader users what they focused.
- **Table:** `.elum-table`
- **Responsive narrow rows:** `data-label` on each cell
- On narrow screens the table linearizes. The `data-label` text is drawn as a visual label that screen readers skip, since they announce the column header instead.
- **Roles:** add `role="table"` to the table, `role="rowgroup"` to `<thead>` and `<tbody>`, `role="row"` to each `<tr>`, `role="columnheader"` (or `rowheader`) to each `<th>`, and `role="cell"` to each `<td>`. Some browsers, notably Safari, drop native table semantics when the narrow layout changes the table's `display`. Explicit roles keep the headers announced.
- **Numeric columns:** `data-numeric="true"` and `data-align="end"`
- **Status column:** `data-column="status"` on header and cells to keep status output aligned

## Separator

- **Horizontal rule:** `.elum-separator` on `<hr>`
- **Vertical rule:** add `data-orientation="vertical"` for an inline divider in a flex row, plus `aria-orientation="vertical"` so screen readers announce it as vertical
- **Labeled divider:** `.elum-separator-labeled` on a heading (`<h2>`/`<h3>`) — label plus a rule filling the rest. Choose the heading level for the outline; the class only styles.

## Feed

- **Container:** `.elum-feed` on a `<ul>`
- **Row:** `.elum-feed-item` on a `<li>`, `data-tone="success" | "warn" | "error"` for the left accent (defaults to info).
- **Tone in text:** the accent color alone doesn't convey state, so also state it in text, such as a leading `.elum-badge` (`[ERROR]`).
- **Trailing meta:** `.elum-feed-meta` for a right-pinned timestamp. The rest of the row is freeform.

## Output

- **Container:** `.elum-output` on a native `<figure>` element.
- **Scope line:** `.elum-output-meta` on a `<figcaption>` element. Command/scope text with the copy control on the trailing edge.
- **Copy control:** `.elum-output-copy` on a native `<button>`. The class styles the button; clipboard wiring belongs to the app.
- **Body:** `.elum-output-body` on a `<pre>`. Preserves whitespace and wraps long lines instead of adding a horizontal scroll.  

## Action Menu

- **Trigger:** a native `<button>` with `popovertarget="menu-id"` and an `aria-label` naming the row, such as `aria-label="Actions for api-gateway"`. In table rows, use a tertiary `.elum-button` with `.elum-menu-trigger`, which enlarges the `⋯` glyph.
- **Menu:** `.elum-menu` on an element with an `id` and the `popover` attribute
- **Items:** `.elum-menu-item` on each `<a>` or `<button>` inside the menu. Use a `<form>` around a button that submits to the server.
- **Placement:** the menu opens below its trigger, aligned to the trigger's end edge, and flips above or to the other side when there's no room. Browsers without CSS anchor positioning open it centered in the viewport.
- **Keyboard:** Tab moves from the trigger into the items. Escape or a click outside closes the menu.
- Don't add `role="menu"`. It promises arrow-key navigation that the native popover doesn't provide.
- No JavaScript.

## Dialog

- **Container:** `.elum-dialog` on a native `<dialog>` with an `id` and `aria-labelledby` pointing to its title
- **Title:** `.elum-dialog-title` on a heading inside the dialog
- **Actions:** `.elum-dialog-actions` on the button row, end-aligned. Use a `<form>` when the confirm button submits to the server.
- **Open:** `<button command="show-modal" commandfor="dialog-id">`. **Close:** `<button command="close" commandfor="dialog-id">`. Escape also closes it.
- **Browser support:** `command` and `commandfor` work in Chrome and Edge 135+, Firefox 144+, and Safari 26.2+ (Baseline since December 2025). Older browsers ignore them, so the dialog never opens. To support those browsers, load an invoker commands polyfill or call `showModal()` and `close()` from click handlers.
- **Side panel:** `data-placement="end"` docks the dialog full height against the inline-end edge.
- **Focus:** opening moves focus to the first focusable control inside the dialog. In a destructive confirm, put Cancel first so it receives focus.
- No JavaScript.
