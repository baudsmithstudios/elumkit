import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const PLAYGROUND_PATH = "examples/playground.html";

test("playground example exists", () => {
  assert.equal(existsSync(PLAYGROUND_PATH), true, "expected examples/playground.html to exist");
});

test("playground references core-css entrypoint", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  assert.match(html, /href="\.\.\/packages\/core-css\/src\/index\.css"/);
});

test("playground includes core MVP component previews", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  const requiredClasses = [
    "tui-card",
    "tui-button",
    "tui-input",
    "tui-textarea",
    "tui-select",
    "tui-alert",
    "tui-badge",
  ];

  for (const className of requiredClasses) {
    assert.match(html, new RegExp(className));
  }
});

test("playground includes state matrix samples", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  assert.match(html, /aria-label="State matrix"/);
  assert.match(html, /aria-invalid="true"/);
  assert.match(html, /<button class="tui-button" type="button" disabled>/);
  assert.match(html, /<input class="tui-input" type="text" value="disabled input" disabled \/>/);
  assert.doesNotMatch(html, /aria-disabled="true"/);
});
