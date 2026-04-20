import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";

const TOKENS_CSS = readFileSync("packages/core-css/src/tokens.css", "utf8");
const BASE_CSS = readFileSync("packages/core-css/src/base.css", "utf8");
const BUTTON_CSS = readFileSync("packages/core-css/src/components/button.css", "utf8");
const CARD_CSS = readFileSync("packages/core-css/src/components/card.css", "utf8");
const FORM_CSS = readFileSync("packages/core-css/src/components/form.css", "utf8");
const FEEDBACK_CSS = readFileSync("packages/core-css/src/components/feedback.css", "utf8");
const TELEMETRY_CSS = readFileSync("packages/core-css/src/components/telemetry.css", "utf8");
const DATA_CSS = readFileSync("packages/core-css/src/components/data.css", "utf8");
const TABS_CSS = readFileSync("packages/core-css/src/components/tabs.css", "utf8");
const TOOLBAR_CSS = readFileSync("packages/core-css/src/components/toolbar.css", "utf8");
const QUERY_CSS = readFileSync("packages/core-css/src/components/query.css", "utf8");
const INDEX_CSS = readFileSync("packages/core-css/src/index.css", "utf8");
const INDEX_CSS_PATH = "packages/core-css/src/index.css";
const PUBLIC_CSS = [
  TOKENS_CSS,
  BASE_CSS,
  BUTTON_CSS,
  CARD_CSS,
  FORM_CSS,
  FEEDBACK_CSS,
  TELEMETRY_CSS,
  DATA_CSS,
  TABS_CSS,
  TOOLBAR_CSS,
  QUERY_CSS,
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

test("core CSS entrypoint imports the public bundles", () => {
  for (const bundle of ["tokens", "base", "button", "form", "card", "feedback", "telemetry", "data", "tabs", "toolbar", "query"]) {
    assert.match(INDEX_CSS, new RegExp(`@import ".+${bundle}\\.css";`));
  }
});

test("core CSS entrypoint imports resolve locally", () => {
  const imports = [...INDEX_CSS.matchAll(/@import\s+"([^"]+)";/g)].map((match) => match[1]);

  assert.ok(imports.length > 0, "expected index.css to import local CSS files");
  for (const importPath of imports) {
    assert.equal(existsSync(join(dirname(INDEX_CSS_PATH), importPath)), true, `missing CSS import: ${importPath}`);
  }
});

test("themes expose required accessible semantic tokens", () => {
  assert.doesNotMatch(TOKENS_CSS, /\[data-theme="(?:light|dark|console)"\]/);

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
  assert.match(BASE_CSS, /:focus-visible/);
  assert.match(BASE_CSS, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(FORM_CSS, /\.elum-prompt-field > \.elum-input:focus-visible\s*{[^}]*outline:\s*0;/s);
  assert.match(DATA_CSS, /\.elum-disclosure-summary:focus-visible\s*{[^}]*outline:/s);
});

test("component CSS exposes current public class surfaces", () => {
  for (const className of [
    "elum-stack",
    "elum-button",
    "elum-card",
    "elum-card-labeled",
    "elum-card-header",
    "elum-card-title",
    "elum-card-subtitle",
    "elum-input",
    "elum-prompt-field",
    "elum-badge",
    "elum-status-label",
    "elum-system-bar",
    "elum-tabs",
    "elum-tab",
    "elum-toolbar",
    "elum-toolbar-group",
    "elum-toolbar-label",
    "elum-toolbar-value",
    "elum-query",
    "elum-pagination",
    "elum-pagination-status",
    "elum-empty",
    "elum-empty-title",
    "elum-empty-message",
    "elum-disclosure",
    "elum-disclosure-summary",
    "elum-disclosure-content",
    "elum-detail-list",
    "elum-detail",
    "elum-detail-term",
    "elum-detail-value",
    "elum-meter",
    "elum-list",
    "elum-table",
  ]) {
    assert.match(PUBLIC_CSS, new RegExp(`\\.${className}\\b`));
  }

  assert.doesNotMatch(TELEMETRY_CSS, /\.elum-status\s*{/);
  assert.match(FORM_CSS, /\[aria-invalid="true"\]/);
  assert.match(FORM_CSS, /:disabled/);
  assert.match(FEEDBACK_CSS, /\[data-tone="success"\]/);
  assert.match(FEEDBACK_CSS, /\[data-tone="warn"\]/);
  assert.match(FEEDBACK_CSS, /\[data-tone="error"\]/);
});

test("public CSS contract uses only the current prefix", () => {
  assert.doesNotMatch(PUBLIC_CSS, /\.pergyl-|--pergyl-/);
});

test("table and row APIs expose responsive state hooks", () => {
  assert.match(DATA_CSS, /\.elum-row\[data-selected="true"\]/);
  assert.match(DATA_CSS, /@media \(max-width: 48rem\)/);
  assert.match(DATA_CSS, /content:\s*attr\(data-label\);/);
  assert.match(DATA_CSS, /\[data-column="status"\]/);
  assert.doesNotMatch(DATA_CSS, /\.elum-table thead\s*{[^}]*display:\s*none;/s);
  assert.match(DATA_CSS, /\.elum-table thead\s*{[^}]*clip-path:\s*inset\(50%\);/s);
});

test("tabs scroll horizontally and show focus", () => {
  assert.match(TABS_CSS, /\.elum-tabs\s*{[^}]*overflow-x:\s*auto;/s);
  assert.match(TABS_CSS, /\.elum-tab:focus-visible\s*{[^}]*outline:/s);
  assert.doesNotMatch(TABS_CSS, /\.elum-tab\[aria-current="page"\]\s*{[^}]*box-shadow:/s);
});
