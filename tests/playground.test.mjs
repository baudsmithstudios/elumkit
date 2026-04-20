import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const PLAYGROUND_PATH = "examples/playground.html";
const SNIPPETS_PATH = "packages/core-patterns/snippets/index.html";

function classToken(className) {
  return new RegExp(`\\bclass="(?:[^"]*\\s)?${className}(?:\\s[^"]*)?"`);
}

test("playground loads core CSS and renders current component set", () => {
  assert.equal(existsSync(PLAYGROUND_PATH), true, "expected examples/playground.html to exist");
  const html = readFileSync(PLAYGROUND_PATH, "utf8");

  assert.match(html, /href="\.\.\/packages\/core-css\/src\/index\.css"/);
  for (const className of [
    "elum-card",
    "elum-button",
    "elum-badge",
    "elum-input",
    "elum-alert",
    "elum-system-bar",
    "elum-meter",
    "elum-list",
    "elum-table",
    "elum-tabs",
    "elum-tab",
    "elum-toolbar",
    "elum-toolbar-group",
    "elum-query",
    "elum-pagination",
    "elum-pagination-status",
    "elum-empty",
    "elum-disclosure",
    "elum-detail-list",
  ]) {
    assert.match(html, classToken(className));
  }
});

test("playground and snippets expose query and pagination primitives", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const html = readFileSync(file, "utf8");

    assert.match(html, /class="elum-query" role="search" aria-label="Service filters"/);
    assert.match(html, /type="search"/);
    assert.match(html, classToken("elum-pagination"));
    assert.match(html, /aria-label="Pagination"/);
    assert.match(html, classToken("elum-pagination-status"));
    assert.doesNotMatch(html, classToken("elum-table-controls"));
  }
});

test("playground and snippets expose empty, disclosure, and detail list primitives", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const html = readFileSync(file, "utf8");

    assert.match(html, classToken("elum-empty"));
    assert.match(html, classToken("elum-empty-title"));
    assert.match(html, classToken("elum-empty-message"));
    assert.match(html, /<details class="elum-disclosure"/);
    assert.match(html, /<summary class="elum-disclosure-summary"/);
    assert.match(html, classToken("elum-disclosure-content"));
    assert.match(html, /<dl class="elum-detail-list"/);
    assert.match(html, classToken("elum-detail"));
    assert.match(html, classToken("elum-detail-term"));
    assert.match(html, classToken("elum-detail-value"));
  }
});

test("playground and snippets expose toolbar groups semantically", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const html = readFileSync(file, "utf8");

    assert.match(html, classToken("elum-toolbar"));
    assert.match(html, classToken("elum-toolbar-group"));
    assert.match(html, classToken("elum-toolbar-label"));
    assert.match(html, classToken("elum-toolbar-value"));
    assert.match(html, /data-align="end"/);
  }
});

test("playground and snippets expose navigation tabs semantically", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const html = readFileSync(file, "utf8");

    assert.match(html, classToken("elum-tabs"));
    assert.match(html, classToken("elum-tab"));
    assert.match(html, /aria-current="page"/);
    assert.doesNotMatch(html, /role="tablist"/);
    assert.doesNotMatch(html, /role="tab"/);
  }
});

test("playground exposes the supported theme values", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  const themes = {
    dust: "DUST",
    iron: "IRON",
    neon: "NEON",
  };

  assert.match(html, /data-theme="(?:dust|iron|neon)"/);
  for (const [theme, label] of Object.entries(themes)) {
    assert.match(html, new RegExp(`theme-${theme}`));
    assert.match(html, new RegExp(`setTheme\\("${theme}", "\\[${label}\\]"\\)`));
  }
  assert.doesNotMatch(html, /setTheme\("(light|dark|console)"/);
});

test("prompt input markup is present in examples and snippets", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const html = readFileSync(file, "utf8");

    assert.match(html, classToken("elum-prompt-field"));
    assert.match(html, /class="elum-input-prompt"[^>]*>&gt;<\/span>/);
    assert.doesNotMatch(html, /placeholder="> input_"/);
  }
});

test("playground covers critical form states", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");

  assert.match(html, /aria-label="State matrix"/);
  assert.match(html, /aria-invalid="true"/);
  assert.match(html, /<button[^>]*class="elum-button"[^>]*\sdisabled(?:\s|>)/);
  assert.match(html, /<input[^>]*class="elum-input"[^>]*\sdisabled(?:\s|\/?>)/);
  assert.match(html, new RegExp(`${classToken("elum-choice").source}[^>]*data-disabled="true"`));
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
    const selectedRows = html.match(new RegExp(`<a\\b[^>]*${classToken("elum-row").source}[^>]*data-selected="true"[^>]*>`, "g")) ?? [];

    assert.ok(selectedRows.length > 0, `expected selected row example in ${file}`);
    for (const row of selectedRows) {
      assert.match(row, /\baria-current="true"/);
    }
  }
});
