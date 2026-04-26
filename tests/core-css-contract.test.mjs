import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const TOKENS_CSS = readFileSync("packages/core-css/src/tokens.css", "utf8");
const BASE_CSS = readFileSync("packages/core-css/src/base.css", "utf8");
const CARD_CSS = readFileSync("packages/core-css/src/components/card.css", "utf8");
const FORM_CSS = readFileSync("packages/core-css/src/components/form.css", "utf8");
const BUTTON_CSS = readFileSync("packages/core-css/src/components/button.css", "utf8");
const FEEDBACK_CSS = readFileSync("packages/core-css/src/components/feedback.css", "utf8");
const INDEX_CSS = readFileSync("packages/core-css/src/index.css", "utf8");

test("index.css imports the component bundles", () => {
  assert.match(INDEX_CSS, /@import "\.\/components\/button\.css";/);
  assert.match(INDEX_CSS, /@import "\.\/components\/form\.css";/);
  assert.match(INDEX_CSS, /@import "\.\/components\/card\.css";/);
  assert.match(INDEX_CSS, /@import "\.\/components\/feedback\.css";/);
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

test("base styles respect reduced-motion preferences", () => {
  assert.match(BASE_CSS, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(BASE_CSS, /animation-duration/);
  assert.match(BASE_CSS, /transition-duration/);
});

test("default panels and form controls inherit page backgrounds", () => {
  assert.match(CARD_CSS, /\.pergyl-card\s*{[^}]*background:\s*transparent;/s);
  assert.match(FORM_CSS, /\.pergyl-input,\n\.pergyl-textarea,\n\.pergyl-select\s*{[^}]*background:\s*transparent;/s);
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

test("card headings use a border label pattern", () => {
  assert.match(CARD_CSS, /\.pergyl-card:has\(>\s*header:first-child\s*>\s*\.pergyl-card-title:first-child\)/);
  assert.match(CARD_CSS, /\.pergyl-card-title\s*{[^}]*color:\s*var\(--pergyl-color-accent\);/s);
  assert.match(CARD_CSS, /\.pergyl-card-title\s*{[^}]*letter-spacing:\s*0\.08em;/s);
  assert.match(CARD_CSS, /\.pergyl-card-title\s*{[^}]*text-transform:\s*uppercase;/s);
  assert.match(CARD_CSS, /\.pergyl-card-subtitle\s*{[^}]*color:\s*var\(--pergyl-color-muted\);/s);
});
