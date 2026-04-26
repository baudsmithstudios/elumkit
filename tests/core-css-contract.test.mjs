import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const TOKENS_CSS = readFileSync("packages/core-css/src/tokens.css", "utf8");
const BASE_CSS = readFileSync("packages/core-css/src/base.css", "utf8");
const CARD_CSS = readFileSync("packages/core-css/src/components/card.css", "utf8");
const FORM_CSS = readFileSync("packages/core-css/src/components/form.css", "utf8");
const BUTTON_CSS = readFileSync("packages/core-css/src/components/button.css", "utf8");
const FEEDBACK_CSS = readFileSync("packages/core-css/src/components/feedback.css", "utf8");
const DATA_CSS = readFileSync("packages/core-css/src/components/data.css", "utf8");
const INDEX_CSS = readFileSync("packages/core-css/src/index.css", "utf8");

function tokenValues(tokenName) {
  return [...TOKENS_CSS.matchAll(new RegExp(`${tokenName}:\\s*(#[0-9a-fA-F]{6});`, "g"))]
    .map((match) => match[1].toLowerCase());
}

function isGrayscale(hexColor) {
  const [, red, green, blue] = hexColor.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/);
  return red === green && green === blue;
}

test("index.css imports the component bundles", () => {
  assert.match(INDEX_CSS, /@import "\.\/components\/button\.css";/);
  assert.match(INDEX_CSS, /@import "\.\/components\/form\.css";/);
  assert.match(INDEX_CSS, /@import "\.\/components\/card\.css";/);
  assert.match(INDEX_CSS, /@import "\.\/components\/feedback\.css";/);
  assert.match(INDEX_CSS, /@import "\.\/components\/telemetry\.css";/);
  assert.match(INDEX_CSS, /@import "\.\/components\/data\.css";/);
});

test("tokens include required semantic color and motion variables", () => {
  const requiredTokens = [
    "--pergyl-color-bg",
    "--pergyl-color-surface",
    "--pergyl-color-fg",
    "--pergyl-color-border",
    "--pergyl-color-accent",
    "--pergyl-color-success",
    "--pergyl-color-warn",
    "--pergyl-color-error",
    "--pergyl-color-info",
    "--pergyl-motion-fast",
  ];

  for (const token of requiredTokens) {
    assert.match(TOKENS_CSS, new RegExp(`${token}:`));
  }
});

test("theme colors use Aponis rust accents and grayscale semantics", () => {
  assert.deepEqual(tokenValues("--pergyl-color-accent"), ["#8b4a2a", "#c47a5a"]);
  assert.deepEqual(tokenValues("--pergyl-focus-ring"), ["#8b4a2a", "#c47a5a"]);

  const grayscaleTokens = [
    "--pergyl-color-bg",
    "--pergyl-color-surface",
    "--pergyl-color-fg",
    "--pergyl-color-muted",
    "--pergyl-color-border",
    "--pergyl-color-success",
    "--pergyl-color-warn",
    "--pergyl-color-error",
    "--pergyl-color-info",
  ];

  for (const token of grayscaleTokens) {
    for (const value of tokenValues(token)) {
      assert.equal(isGrayscale(value), true, `${token} should be grayscale, got ${value}`);
    }
  }
});

test("semantic tone colors remain distinct from foreground text", () => {
  const foregroundColors = tokenValues("--pergyl-color-fg");
  const toneTokens = [
    "--pergyl-color-success",
    "--pergyl-color-warn",
    "--pergyl-color-error",
    "--pergyl-color-info",
  ];

  for (const token of toneTokens) {
    const values = tokenValues(token);

    for (const [index, value] of values.entries()) {
      assert.notEqual(value, foregroundColors[index], `${token} should differ from foreground text`);
    }
  }
});

test("base styles respect reduced-motion preferences", () => {
  assert.match(BASE_CSS, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(BASE_CSS, /animation-duration/);
  assert.match(BASE_CSS, /transition-duration/);
});

test("default panels and form controls inherit page backgrounds", () => {
  assert.match(CARD_CSS, /\.pergyl-card\s*{[^}]*background:\s*transparent;/s);
  assert.match(FORM_CSS, /\.pergyl-input,[^}]*background:\s*transparent;/s);
});

test("buttons and alerts keep explicit surface backgrounds", () => {
  assert.match(BUTTON_CSS, /\.pergyl-button\s*{[^}]*background:\s*var\(--pergyl-color-surface\);/s);
  assert.match(FEEDBACK_CSS, /\.pergyl-alert\s*{[^}]*background:\s*var\(--pergyl-color-surface\);/s);
});

test("radius tokens use tight corners", () => {
  assert.match(TOKENS_CSS, /--pergyl-radius-sm:\s*0\.0625rem;/);
  assert.match(TOKENS_CSS, /--pergyl-radius-md:\s*0\.1875rem;/);
});

test("border token gives elements a stronger outline", () => {
  assert.match(TOKENS_CSS, /--pergyl-border-width:\s*2px;/);
});

test("card and data components expose explicit state hooks", () => {
  assert.match(CARD_CSS, /\.pergyl-card-labeled/);
  assert.match(CARD_CSS, /\.pergyl-card-header\[data-inline="true"\]/);
  assert.doesNotMatch(CARD_CSS, /:has\(/);
  assert.match(DATA_CSS, /\.pergyl-row\[data-selected="true"\]/);
  assert.doesNotMatch(DATA_CSS, /\.pergyl-row\[aria-selected="true"\]/);
});

test("card titles and subtitles expose customization properties", () => {
  assert.match(CARD_CSS, /padding:\s*var\(--pergyl-card-padding,\s*var\(--pergyl-space-4\)\);/);
  assert.match(CARD_CSS, /color:\s*var\(--pergyl-card-title-color,\s*var\(--pergyl-color-accent\)\);/);
  assert.match(CARD_CSS, /font-size:\s*var\(--pergyl-card-title-size,\s*var\(--pergyl-text-sm\)\);/);
  assert.match(CARD_CSS, /color:\s*var\(--pergyl-card-subtitle-color,\s*var\(--pergyl-color-muted\)\);/);
  assert.match(CARD_CSS, /font-size:\s*var\(--pergyl-card-subtitle-size,\s*var\(--pergyl-text-xs\)\);/);
});

test("feedback exposes inline status labels", () => {
  assert.match(FEEDBACK_CSS, /\.pergyl-status-label\s*{/);
  assert.match(FEEDBACK_CSS, /\.pergyl-status-label\[data-tone="success"\]/);
  assert.match(FEEDBACK_CSS, /\.pergyl-status-label\[data-tone="warn"\]/);
});

test("data rows use keyboard and selected accent bars", () => {
  assert.match(DATA_CSS, /\.pergyl-row:focus-visible,[\s\n]*\.pergyl-row\[data-selected="true"\]\s*{/);
  assert.match(DATA_CSS, /\.pergyl-row:focus-visible,[\s\n]*\.pergyl-row\[data-selected="true"\]\s*{[^}]*box-shadow:/s);
  assert.doesNotMatch(DATA_CSS, /\.pergyl-row:hover,[\s\n]*\.pergyl-row:focus-visible,[\s\n]*\.pergyl-row\[data-selected="true"\]/);
});

test("data tables keep compact responsive spacing", () => {
  assert.match(DATA_CSS, /@media \(max-width: 48rem\)/);
  assert.match(DATA_CSS, /\.pergyl-table td::before\s*{[^}]*content:\s*attr\(data-label\);/s);
});

test("data tables keep status columns responsive", () => {
  assert.match(DATA_CSS, /@media \(min-width: 48\.001rem\)\s*{[^}]*\.pergyl-table \[data-column="status"\]/s);
  assert.match(DATA_CSS, /\.pergyl-table td\[data-column="status"\]\s*{[^}]*white-space:\s*nowrap;/s);
});
