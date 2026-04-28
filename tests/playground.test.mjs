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

test("playground uses the branded header and collage layout", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");

  assert.match(html, /<header class="pergyl-card pergyl-card-labeled playground-header">/);
  assert.match(html, /<div class="pergyl-card-header" data-inline="true">/);
  assert.match(html, /<div class="pergyl-card-title">Component system · v0\.1<\/div>/);
  assert.match(html, /<h1 class="playground-title-text">pergyl\.<\/h1>/);
  assert.match(html, /class="pergyl-card-subtitle playground-title-status"/);
  assert.match(html, /theme <span id="theme-status">\[IRON\]<\/span> components \[13\]/);
  assert.doesNotMatch(html, /<img class="playground-title"/);
  assert.match(html, /class="playground-board"/);
  for (const area of [
    "playground-card-preview",
    "playground-telemetry-preview",
    "playground-form-preview",
    "playground-rows-preview",
    "playground-table-preview",
    "playground-states-preview",
  ]) {
    assert.match(html, new RegExp(area));
  }
  assert.match(html, /grid-template-areas:/);
  assert.match(html, /@media \(max-width: 64rem\)/);
  assert.match(html, /@media \(max-width: 42rem\)/);
});

test("playground exposes the supported theme values", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  const themes = {
    clerestory: "CLERESTORY",
    iron: "IRON",
    forge: "FORGE",
  };

  assert.match(html, /data-theme="iron"/);
  for (const [theme, label] of Object.entries(themes)) {
    assert.match(html, new RegExp(`theme-${theme}`));
    assert.match(html, new RegExp(`setTheme\\("${theme}", "\\[${label}\\]"\\)`));
  }
  assert.doesNotMatch(html, /setTheme\("(light|dark|console)"/);
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

test("example form controls expose accessible names", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const html = readFileSync(file, "utf8");
    const labels = new Set([...html.matchAll(/<label\b[^>]*\bfor="([^"]+)"/g)].map((match) => match[1]));
    const controls = html.match(/<(?:input|select|textarea)\b[^>]*>/g) ?? [];

    for (const control of controls) {
      const id = control.match(/\bid="([^"]+)"/)?.[1];
      const hasExplicitLabel = id && labels.has(id);
      const hasAriaLabel = /\baria-label="[^"]+"/.test(control);
      const hasAriaLabelledBy = /\baria-labelledby="[^"]+"/.test(control);

      assert.ok(hasExplicitLabel || hasAriaLabel || hasAriaLabelledBy, `missing accessible name in ${file}: ${control}`);
    }
  }
});

test("selected row examples expose semantic state", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const html = readFileSync(file, "utf8");
    const selectedRows = html.match(/<a\b[^>]*class="pergyl-row"[^>]*data-selected="true"[^>]*>/g) ?? [];

    assert.ok(selectedRows.length > 0, `expected selected row example in ${file}`);
    for (const row of selectedRows) {
      assert.match(row, /\baria-current="true"/);
    }
  }
});
