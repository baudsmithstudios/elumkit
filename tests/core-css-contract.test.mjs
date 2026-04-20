import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const TOKENS_CSS = readFileSync("packages/core-css/src/tokens.css", "utf8");
const BASE_CSS = readFileSync("packages/core-css/src/base.css", "utf8");
const INDEX_CSS = readFileSync("packages/core-css/src/index.css", "utf8");

test("index.css imports the component bundles", () => {
  assert.match(INDEX_CSS, /@import "\.\/components\/button\.css";/);
  assert.match(INDEX_CSS, /@import "\.\/components\/form\.css";/);
  assert.match(INDEX_CSS, /@import "\.\/components\/card\.css";/);
  assert.match(INDEX_CSS, /@import "\.\/components\/feedback\.css";/);
});

test("tokens include required semantic color and motion variables", () => {
  const requiredTokens = [
    "--tui-color-bg",
    "--tui-color-surface",
    "--tui-color-fg",
    "--tui-color-border",
    "--tui-color-accent",
    "--tui-color-success",
    "--tui-color-warn",
    "--tui-color-error",
    "--tui-color-info",
    "--tui-motion-fast",
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
