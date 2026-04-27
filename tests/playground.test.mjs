import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const PLAYGROUND_PATH = "examples/playground.html";
const SNIPPETS_PATH = "packages/core-patterns/snippets/index.html";

test("playground loads core CSS and renders current component set", () => {
  assert.equal(existsSync(PLAYGROUND_PATH), true, "expected examples/playground.html to exist");
  const html = readFileSync(PLAYGROUND_PATH, "utf8");

  assert.match(html, /href="\.\.\/packages\/core-css\/src\/index\.css"/);
  for (const className of [
    "pergyl-card",
    "pergyl-button",
    "pergyl-badge",
    "pergyl-input",
    "pergyl-alert",
    "pergyl-system-bar",
    "pergyl-meter",
    "pergyl-list",
    "pergyl-table",
  ]) {
    assert.match(html, new RegExp(className));
  }
});

test("playground exposes the supported theme values", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");

  assert.match(html, /data-theme="iron"/);
  for (const theme of ["clerestory", "iron", "forge"]) {
    assert.match(html, new RegExp(`data-theme", "${theme}"`));
    assert.match(html, new RegExp(`theme-${theme}`));
  }
  assert.doesNotMatch(html, /data-theme", "(light|dark|console)"/);
});

test("prompt input markup is present in examples and snippets", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const html = readFileSync(file, "utf8");

    assert.match(html, /class="pergyl-prompt-field"/);
    assert.match(html, /class="pergyl-input-prompt"[^>]*>&gt;<\/span>/);
    assert.match(html, /class="pergyl-input"[^>]*placeholder="input_"/);
    assert.doesNotMatch(html, /placeholder="> input_"/);
  }
});

test("playground covers critical form states", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");

  assert.match(html, /aria-label="State matrix"/);
  assert.match(html, /aria-invalid="true"/);
  assert.match(html, /<button[^>]*class="pergyl-button"[^>]*\sdisabled(?:\s|>)/);
  assert.match(html, /<input[^>]*class="pergyl-input"[^>]*\sdisabled(?:\s|\/?>)/);
  assert.match(html, /class="pergyl-choice"[^>]*data-disabled="true"/);
});
