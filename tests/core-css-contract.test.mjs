import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const TOKENS_CSS = readFileSync("packages/core-css/src/tokens.css", "utf8");
const BASE_CSS = readFileSync("packages/core-css/src/base.css", "utf8");
const FORM_CSS = readFileSync("packages/core-css/src/components/form.css", "utf8");
const FEEDBACK_CSS = readFileSync("packages/core-css/src/components/feedback.css", "utf8");
const TELEMETRY_CSS = readFileSync("packages/core-css/src/components/telemetry.css", "utf8");
const DATA_CSS = readFileSync("packages/core-css/src/components/data.css", "utf8");
const INDEX_CSS = readFileSync("packages/core-css/src/index.css", "utf8");

const THEMES = ["clerestory", "iron", "forge"];
const REQUIRED_TOKENS = [
  "--pergyl-color-bg",
  "--pergyl-color-surface",
  "--pergyl-color-fg",
  "--pergyl-color-muted",
  "--pergyl-color-border",
  "--pergyl-color-accent",
  "--pergyl-color-success",
  "--pergyl-color-warn",
  "--pergyl-color-error",
  "--pergyl-color-info",
  "--pergyl-focus-ring",
];

function themeTokens(theme) {
  const block = TOKENS_CSS.match(new RegExp(`(?:^|})\\s*(?::root,\\s*)?\\[data-theme="${theme}"\\]\\s*{([^}]*)}`, "s"));
  assert.ok(block, `missing ${theme} theme block`);

  return Object.fromEntries([...block[1].matchAll(/(--pergyl-[\w-]+):\s*([^;]+);/g)]
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
  for (const bundle of ["tokens", "base", "button", "form", "card", "feedback", "telemetry", "data"]) {
    assert.match(INDEX_CSS, new RegExp(`@import ".+${bundle}\\.css";`));
  }
});

test("themes expose required accessible semantic tokens", () => {
  assert.doesNotMatch(TOKENS_CSS, /\[data-theme="(?:light|dark|console)"\]/);

  for (const theme of THEMES) {
    const tokens = themeTokens(theme);

    for (const token of REQUIRED_TOKENS) {
      assert.match(tokens[token], /^#[0-9a-f]{6}$/, `${theme} ${token} should be a hex color`);
    }

    assert.ok(contrastRatio(tokens["--pergyl-color-fg"], tokens["--pergyl-color-bg"]) >= 4.5);
    for (const token of ["--pergyl-color-success", "--pergyl-color-warn", "--pergyl-color-error", "--pergyl-color-info"]) {
      assert.ok(contrastRatio(tokens[token], tokens["--pergyl-color-bg"]) >= 4.5, `${theme} ${token} should meet contrast`);
    }
  }
});

test("base and form styles keep accessible focus behavior", () => {
  assert.match(BASE_CSS, /:focus-visible/);
  assert.match(BASE_CSS, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(FORM_CSS, /\.pergyl-prompt-field > \.pergyl-input:focus-visible\s*{[^}]*outline:\s*0;/s);
  assert.match(FORM_CSS, /\.pergyl-prompt-field:focus-within/);
});

test("component CSS exposes current public class surfaces", () => {
  for (const className of [
    "pergyl-input",
    "pergyl-prompt-field",
    "pergyl-badge",
    "pergyl-status-label",
    "pergyl-system-bar",
    "pergyl-meter",
    "pergyl-list",
    "pergyl-table",
  ]) {
    assert.match(`${FORM_CSS}\n${FEEDBACK_CSS}\n${TELEMETRY_CSS}\n${DATA_CSS}`, new RegExp(`\\.${className}\\b`));
  }

  assert.doesNotMatch(TELEMETRY_CSS, /\.pergyl-status\s*{/);
  assert.match(FORM_CSS, /\[aria-invalid="true"\]/);
  assert.match(FORM_CSS, /:disabled/);
  assert.match(FEEDBACK_CSS, /\[data-tone="success"\]/);
  assert.match(FEEDBACK_CSS, /\[data-tone="warn"\]/);
  assert.match(FEEDBACK_CSS, /\[data-tone="error"\]/);
});

test("table and row APIs expose responsive state hooks", () => {
  assert.match(DATA_CSS, /\.pergyl-row\[data-selected="true"\]/);
  assert.match(DATA_CSS, /@media \(max-width: 48rem\)/);
  assert.match(DATA_CSS, /content:\s*attr\(data-label\);/);
  assert.match(DATA_CSS, /\[data-column="status"\]/);
});
