import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

import { buildCss } from "../scripts/build-css.mjs";
import { DOCUMENTED_CLASSES } from "./documented-classes.mjs";

const COMPONENTS_DIR = "packages/core-css/src/components";
const COMPONENT_FILES = readdirSync(COMPONENTS_DIR).filter((file) => file.endsWith(".css"));
const TOKENS_CSS = readFileSync("packages/core-css/src/tokens.css", "utf8");
const BASE_CSS = readFileSync("packages/core-css/src/base.css", "utf8");
const FORM_CSS = readFileSync("packages/core-css/src/components/form.css", "utf8");
const FEEDBACK_CSS = readFileSync("packages/core-css/src/components/feedback.css", "utf8");
const TELEMETRY_CSS = readFileSync("packages/core-css/src/components/telemetry.css", "utf8");
const DATA_CSS = readFileSync("packages/core-css/src/components/data.css", "utf8");
const SEPARATOR_CSS = readFileSync("packages/core-css/src/components/separator.css", "utf8");
const FEED_CSS = readFileSync("packages/core-css/src/components/feed.css", "utf8");
const OUTPUT_CSS = readFileSync("packages/core-css/src/components/output.css", "utf8");
const DIALOG_CSS = readFileSync("packages/core-css/src/components/dialog.css", "utf8");
const MENU_CSS = readFileSync("packages/core-css/src/components/menu.css", "utf8");
const NAVIGATION_CSS = readFileSync("packages/core-css/src/components/navigation.css", "utf8");
const INDEX_CSS = readFileSync("packages/core-css/src/index.css", "utf8");
const PUBLIC_CSS = [
  BASE_CSS,
  ...COMPONENT_FILES.map((file) => readFileSync(join(COMPONENTS_DIR, file), "utf8")),
].join("\n");

const THEMES = ["dust", "iron", "neon"];
const REQUIRED_TOKENS = [
  "--elum-color-bg",
  "--elum-color-surface",
  "--elum-color-fg",
  "--elum-color-muted",
  "--elum-color-border",
  "--elum-color-accent",
  "--elum-color-success",
  "--elum-color-warn",
  "--elum-color-error",
  "--elum-color-info",
  "--elum-color-focus",
];

function themeTokens(theme) {
  const block = TOKENS_CSS.match(new RegExp(`(?:^|})\\s*(?::root,\\s*)?\\[data-theme="${theme}"\\]\\s*{([^}]*)}`, "s"));
  assert.ok(block, `missing ${theme} theme block`);

  return Object.fromEntries([...block[1].matchAll(/(--elum-[\w-]+):\s*([^;]+);/g)]
    .map((match) => [match[1], match[2].trim().toLowerCase()]));
}

function relativeLuminance(hexColor) {
  const channels = hexColor.slice(1).match(/../g).map((channel) => {
    const value = parseInt(channel, 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });

  return (0.2126 * channels[0]) + (0.7152 * channels[1]) + (0.0722 * channels[2]);
}

function contrastRatio(firstColor, secondColor) {
  const first = relativeLuminance(firstColor);
  const second = relativeLuminance(secondColor);
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);

  return (lighter + 0.05) / (darker + 0.05);
}

test("core CSS entrypoint imports tokens, base, and every component file", () => {
  for (const path of ["tokens.css", "base.css", ...COMPONENT_FILES.map((file) => `components/${file}`)]) {
    assert.match(INDEX_CSS, new RegExp(`@import "\\./${path.replace(".", "\\.")}";`), `index.css does not import ${path}`);
  }
});

test("themes expose required accessible semantic tokens", () => {
  for (const theme of THEMES) {
    const tokens = themeTokens(theme);

    for (const token of REQUIRED_TOKENS) {
      assert.match(tokens[token], /^#[0-9a-f]{6}$/, `${theme} ${token} should be a hex color`);
    }

    for (const token of ["--elum-color-fg", "--elum-color-muted", "--elum-color-accent", "--elum-color-success", "--elum-color-warn", "--elum-color-error", "--elum-color-info"]) {
      assert.ok(contrastRatio(tokens[token], tokens["--elum-color-bg"]) >= 4.5, `${theme} ${token} should meet contrast`);
    }
  }
});

test("core CSS exposes accessible focus and motion behavior", () => {
  const reducedMotion = BASE_CSS.match(/@media \(prefers-reduced-motion: reduce\)\s*{([^}]*)}/s)?.[1];

  assert.match(BASE_CSS, /:focus-visible\s*{[^}]*outline:\s*2px solid/s);
  assert.match(reducedMotion, /animation-duration:\s*0\.01ms !important;/);
  assert.match(reducedMotion, /transition-duration:\s*0\.01ms !important;/);
  assert.match(FORM_CSS, /\.elum-prompt-field > \.elum-input:focus-visible\s*{[^}]*outline:\s*0;/s);
  assert.match(FORM_CSS, /\.elum-prompt-field:focus-within\s*{[^}]*outline:\s*2px solid/s, "prompt field must draw the focus ring its input suppresses");
});

test("component CSS defines exactly the documented public classes", () => {
  const definedClasses = new Set([...PUBLIC_CSS.matchAll(/\.(elum-[a-z0-9-]+)/g)].map((match) => match[1]));

  assert.deepEqual([...DOCUMENTED_CLASSES].filter((className) => !definedClasses.has(className)), [], "documented classes missing from CSS");
  assert.deepEqual([...definedClasses].filter((className) => !DOCUMENTED_CLASSES.has(className)), [], "CSS classes missing from docs");
});

test("form and feedback CSS honor the documented state hooks", () => {
  assert.match(FORM_CSS, /\[aria-invalid="true"\]/);
  assert.match(FORM_CSS, /:disabled/);
  assert.match(FEEDBACK_CSS, /\[data-tone="success"\]/);
  assert.match(FEEDBACK_CSS, /\[data-tone="warn"\]/);
  assert.match(FEEDBACK_CSS, /\[data-tone="error"\]/);
});

test("component CSS uses only defined tokens or supplies a fallback", () => {
  const defined = new Set([...`${TOKENS_CSS}\n${PUBLIC_CSS}`.matchAll(/(--elum-[\w-]+)\s*:/g)].map((match) => match[1]));
  const undefinedTokens = [...PUBLIC_CSS.matchAll(/var\((--elum-[\w-]+)\)/g)]
    .map((match) => match[1])
    .filter((token) => !defined.has(token));

  assert.deepEqual([...new Set(undefinedTokens)], [], "a var() without a fallback must reference a defined token");
});

test("base CSS hardens against known cross-browser layout pitfalls", () => {
  assert.match(BASE_CSS, /html\s*\{[^}]*-webkit-text-size-adjust:\s*100%/s);
  assert.match(BASE_CSS, /body\s*\{[^}]*overflow-wrap:\s*break-word/s);
  assert.match(BASE_CSS, /fieldset\s*\{[^}]*min-width:\s*0/s);
  assert.match(BASE_CSS, /button,\s*input,\s*select,\s*textarea[^{]*\{[^}]*font:\s*inherit/s);
});

test("table and row APIs expose responsive state hooks", () => {
  assert.match(DATA_CSS, /\.elum-row\[data-selected="true"\]/);
  assert.match(DATA_CSS, /content:\s*attr\(data-label\);/);
  assert.match(DATA_CSS, /\[data-column="status"\]/);
  assert.doesNotMatch(DATA_CSS, /\.elum-table thead\s*{[^}]*display:\s*none;/s);
  assert.match(DATA_CSS, /\.elum-table thead\s*{[^}]*clip-path:\s*inset\(50%\);/s);
});

test("floating label field overlays a real label and floats it on focus or content", () => {
  assert.match(FORM_CSS, /\.elum-field-float\s*>\s*\.elum-input:focus\s*\+\s*\.elum-label/);
  assert.match(FORM_CSS, /\.elum-field-float\s*>\s*\.elum-input:not\(:placeholder-shown\)\s*\+\s*\.elum-label/);
  assert.match(FORM_CSS, /\.elum-field-float\s*>\s*\.elum-textarea:not\(:placeholder-shown\)\s*\+\s*\.elum-label/);
});

test("separator turns vertical via orientation hook and fills its labeled rule with a flex pseudo-element", () => {
  assert.match(SEPARATOR_CSS, /\.elum-separator\[data-orientation="vertical"\]\s*{[^}]*border-inline-start:/s);
  assert.match(SEPARATOR_CSS, /\.elum-separator-labeled::after\s*{[^}]*flex:\s*1;/s);
});

test("metrics tile layout lays metrics out as a wrapping row", () => {
  assert.match(TELEMETRY_CSS, /\.elum-metrics\[data-layout="tiles"\]\s*{[^}]*grid-template-columns:\s*repeat\(auto-fit,/s);
});

test("feed rows carry a tone-coded accent bar and pin their meta to the trailing edge", () => {
  assert.match(FEED_CSS, /\.elum-feed-item\s*{[^}]*box-shadow:\s*inset[^}]*var\(--elum-feed-tone,\s*var\(--elum-color-info\)\)/s);
  assert.match(FEED_CSS, /\.elum-feed-item\[data-tone="error"\]\s*{[^}]*--elum-feed-tone:\s*var\(--elum-color-error\)/s);
  assert.match(FEED_CSS, /\.elum-feed-meta\s*{[^}]*margin-inline-start:\s*auto/s);
});

test("output body wraps preformatted text so raw dumps don't force horizontal scroll", () => {
  assert.match(OUTPUT_CSS, /\.elum-output-body\s*{[^}]*white-space:\s*pre-wrap;/s);
});

test("dialog docks to the inline-end edge as a side panel", () => {
  assert.match(DIALOG_CSS, /\.elum-dialog\[data-placement="end"\]\s*{[^}]*margin-inline-start:\s*auto;/s);
  assert.match(DIALOG_CSS, /\.elum-dialog\[data-placement="end"\]\s*{[^}]*max-height:\s*none;/s);
});

test("open dialog keeps its centering margin when placed inside a layout that spaces children", () => {
  assert.match(DIALOG_CSS, /\.elum-dialog:modal\s*{[^}]*margin:\s*auto;/s);
});

test("action menu anchors below its trigger and flips on either axis when there's no room, only where anchoring is supported", () => {
  const anchored = MENU_CSS.match(/@supports \(position-area:[^)]*\)\s*{\s*\.elum-menu\s*{([^}]*)}/s)?.[1];

  assert.ok(anchored, "anchoring must sit inside @supports so other browsers keep the centered popover");
  assert.match(anchored, /position-area:\s*block-end/);
  assert.match(anchored, /position-try-fallbacks:\s*flip-block,\s*flip-inline,\s*flip-block flip-inline;/, "menu must flip on both axes so start-aligned narrow-screen triggers keep it in view");
});

test("switch replaces the native checkbox look and moves its knob when checked, so state isn't color-only", () => {
  const unchecked = FORM_CSS.match(/\.elum-switch\s*{([^}]*)}/s)?.[1] ?? "";
  const checked = FORM_CSS.match(/\.elum-switch:checked\s*{([^}]*)}/s)?.[1] ?? "";

  assert.match(unchecked, /appearance:\s*none/);
  assert.match(checked, /background-position:/);
});

test("switch keeps its knob visible in forced colors, which otherwise strip the drawn knob and leave on and off identical", () => {
  const forced = FORM_CSS.match(/@media \(forced-colors: active\)\s*{\s*\.elum-switch,\s*\.elum-switch:checked\s*{([^}]*)}/s)?.[1] ?? "";

  assert.match(forced, /forced-color-adjust:\s*none/);
  assert.match(forced, /linear-gradient\(CanvasText, CanvasText\)/);
});

test("segmented option hides its radio without taking it out of the tab order or arrow-key navigation", () => {
  const radio = FORM_CSS.match(/\.elum-segmented-option > input\s*{([^}]*)}/s)?.[1] ?? "";

  assert.match(radio, /clip-path:\s*inset\(50%\)/);
  assert.match(radio, /position:\s*absolute/);
  assert.doesNotMatch(radio, /display:\s*none|visibility:\s*hidden/);
});

test("segmented option shows focus and selection on its label, since the radio itself is hidden", () => {
  assert.match(FORM_CSS, /\.elum-segmented-option:has\(:focus-visible\)\s*{[^}]*outline:\s*2px solid/s);
  assert.match(FORM_CSS, /\.elum-segmented-option:has\(:checked\)\s*{[^}]*background:/s);
});

test("segmented control marks the checked option with system colors in forced colors, which otherwise strip its fill", () => {
  const forced = FORM_CSS.match(/@media \(forced-colors: active\)\s*{\s*\.elum-segmented-option:has\(:checked\)\s*{([^}]*)}/s)?.[1] ?? "";

  assert.match(forced, /background:\s*Highlight/);
  assert.match(forced, /border-color:\s*Highlight/);
  assert.match(forced, /color:\s*HighlightText/);
});

test("breadcrumb draws chevrons between items with empty alt text so screen readers skip them", () => {
  assert.match(NAVIGATION_CSS, /\.elum-breadcrumb li \+ li::before\s*{[^}]*content:\s*"›"\s*\/\s*"";/s);
});

test("nav links keep the base focus ring that buttons and inputs use", () => {
  assert.doesNotMatch(NAVIGATION_CSS, /\.elum-navlink:focus-visible/);
});

test("current nav link is marked with the breadcrumb chevron, which screen readers skip since aria-current already names it", () => {
  assert.match(NAVIGATION_CSS, /\.elum-navlink\[aria-current="page"\]::before\s*{[^}]*content:\s*"›"\s*\/\s*"";/s);
});

test("spinner cycles the | / - \\ frames with empty alt text so screen readers read only its label", () => {
  const keyframes = FEEDBACK_CSS.match(/@keyframes elum-spinner\s*{(.*?)}\s*}/s)?.[1] ?? "";
  const frames = [...keyframes.matchAll(/content:\s*"([^"]*)"\s*\/\s*"";/g)].map((match) => match[1]);

  assert.deepEqual(frames, ["|", "/", "-", "\\\\"]);
});

test("spinner rests on a silent frame when the reduced-motion rule stops its animation", () => {
  assert.match(FEEDBACK_CSS, /\.elum-spinner::before\s*{[^}]*animation:[^;]*\belum-spinner\b[^}]*content:\s*"\|"\s*\/\s*"";/s);
});

test("skeleton draws a ░ fill that screen readers skip and clips it at its own edge", () => {
  assert.match(FEEDBACK_CSS, /\.elum-skeleton\s*{[^}]*overflow:\s*hidden;[^}]*white-space:\s*nowrap;/s);
  assert.match(FEEDBACK_CSS, /\.elum-skeleton::before\s*{[^}]*content:\s*"░+"\s*\/\s*"";/s);
});

test("skeleton fill is long enough to span a full-width container at the base text size", () => {
  const cells = FEEDBACK_CSS.match(/\.elum-skeleton::before\s*{[^}]*content:\s*"(░+)"/s)?.[1].length ?? 0;
  const containerWidth = parseFloat(TOKENS_CSS.match(/--elum-container-width:\s*([\d.]+)rem;/)[1]);
  const textSize = parseFloat(TOKENS_CSS.match(/--elum-text-md:\s*([\d.]+)rem;/)[1]);

  // 0.55em is the narrowest cell in the font stack (Consolas)
  assert.ok(cells * 0.55 * textSize >= containerWidth, `${cells} cells fall short of a ${containerWidth}rem container`);
});

test("code, kbd, and pre keep the theme font instead of the browser's generic monospace", () => {
  assert.match(BASE_CSS, /code,\s*kbd,\s*pre\s*{[^}]*font-family:\s*inherit;/s);
});

test("inline code is wrapped in backticks that screen readers skip, leaving code blocks bare", () => {
  assert.match(BASE_CSS, /:not\(pre\) > code::before,\s*:not\(pre\) > code::after\s*{[^}]*content:\s*"`"\s*\/\s*"";/s);
});

test("kbd wraps keys in brackets that screen readers skip", () => {
  assert.match(BASE_CSS, /kbd::before\s*{[^}]*content:\s*"\["\s*\/\s*"";/s);
  assert.match(BASE_CSS, /kbd::after\s*{[^}]*content:\s*"\]"\s*\/\s*"";/s);
});

test("app shell sets the sidebar beside main in a column its content can't widen", () => {
  assert.match(BASE_CSS, /\.elum-shell\s*{[^}]*grid-template-columns:\s*\S+ minmax\(0, 1fr\);/s);
});

test("app shell spans the navbar and footer edge to edge across both columns", () => {
  const spanning = BASE_CSS.match(/\.elum-shell > \.elum-navbar,\s*\.elum-shell > \.elum-footer\s*{([^}]*)}/s)?.[1];

  assert.match(spanning, /grid-column:\s*1 \/ -1;/);
  assert.match(spanning, /max-width:\s*none;/);
});

test("app shell stacks into one column on narrow screens", () => {
  assert.match(BASE_CSS, /@media \(max-width: 48rem\)\s*{\s*\.elum-shell\s*{[^}]*grid-template-columns:\s*minmax\(0, 1fr\);/s);
});

test("sidebar list sticks below the navbar beside main and scrolls itself when taller than the viewport", () => {
  assert.match(NAVIGATION_CSS, /\.elum-navbar\s*{[^}]*min-height:\s*var\(--elum-navbar-height\);/s);
  const sticky = NAVIGATION_CSS.match(/@media \(min-width: 48\.001rem\)\s*{.*?\.elum-sidebar > ul\s*{([^}]*)}/s)?.[1];

  assert.match(sticky, /position:\s*sticky;/);
  assert.match(sticky, /top:\s*var\(--elum-navbar-height\);/);
  assert.match(sticky, /max-height:\s*calc\(100vh - var\(--elum-navbar-height\)\);/);
  assert.match(sticky, /overflow-y:\s*auto;/);
});

test("sidebar group headings trail a rule, since the neon theme's muted and accent colors don't tell them apart from links", () => {
  const rule = NAVIGATION_CSS.match(/\.elum-sidebar h2::after\s*{([^}]*)}/s)?.[1];

  assert.match(NAVIGATION_CSS, /\.elum-sidebar h2\s*{[^}]*display:\s*flex;/s);
  assert.match(rule, /border-top:/);
  assert.match(rule, /flex:\s*1;/);
});

test("navbar wraps onto new lines with a gap between items instead of scrolling sideways", () => {
  assert.match(NAVIGATION_CSS, /\.elum-navbar\s*{[^}]*flex-wrap:\s*wrap;/s);
  assert.match(NAVIGATION_CSS, /\.elum-navbar\s*{[^}]*gap:/s);
});

test("navbar brand pushes status items and links to the inline end", () => {
  assert.match(NAVIGATION_CSS, /\.elum-navbar-brand\s*{[^}]*margin-inline-end:\s*auto;/s);
});

test("CSS bundle inlines the whole import chain into one standalone file", () => {
  const bundle = buildCss();

  assert.doesNotMatch(bundle, /@import/, "bundle must inline all imports so it stands alone");
  assert.match(bundle, /\.elum-footer\b/, "bundle must inline the chain through the last import");
});
