import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const PLAYGROUND_PATH = "examples/playground.html";
const SNIPPETS_PATH = "packages/core-patterns/snippets/index.html";

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
    "pergyl-card",
    "pergyl-button",
    "pergyl-badge",
    "pergyl-input",
    "pergyl-textarea",
    "pergyl-select",
    "pergyl-alert",
    "pergyl-system-bar",
    "pergyl-metrics",
    "pergyl-meter",
    "pergyl-list",
    "pergyl-table",
  ];

  for (const className of requiredClasses) {
    assert.match(html, new RegExp(className));
  }
});

test("playground includes telemetry primitives", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  assert.match(html, /class="pergyl-system-bar"/);
  assert.doesNotMatch(html, /class="pergyl-status"/);
  assert.match(html, /class="pergyl-metric"/);
  assert.match(html, /class="pergyl-meter"[^>]*role="meter"/);
  assert.match(html, /aria-valuenow="64"/);
});

test("playground header uses the simple preview intro", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  assert.match(html, /<header class="pergyl-stack">/);
  assert.match(html, /<h1>Pergyl Playground<\/h1>/);
  assert.match(html, /Local preview page for fast visual and accessibility checks\./);
  assert.match(html, /<button class="pergyl-button" id="theme-dark" type="button">Dark<\/button>/);
  assert.match(html, /<button class="pergyl-button" id="theme-light" type="button">Light<\/button>/);
  assert.doesNotMatch(html, /playground-hero/);
  assert.doesNotMatch(html, /playground-brand/);
});

test("playground includes data list and table primitives", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  assert.match(html, /class="pergyl-list"/);
  assert.match(html, /class="pergyl-row"[^>]*data-selected="true"/);
  assert.match(html, /edge cluster :: \[HEALTHY\]/);
  assert.match(html, /class="pergyl-table-wrap"/);
  assert.match(html, /class="pergyl-table"/);
  assert.match(html, /data-label="Status"/);
  assert.match(html, /data-column="status"/);
  assert.match(html, /<td data-label="Status" data-column="status"><span class="pergyl-badge"/);
  assert.match(html, /\[HEALTHY\]/);
  assert.match(html, /\[DELAYED\]/);
  assert.match(html, /\[WARM\]/);
});

test("playground system status uses borderless status text", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  assert.match(html, /System status <span class="pergyl-status-label" data-tone="success">ready<\/span>/);
  assert.doesNotMatch(html, /System status <span class="pergyl-status-label"[^>]*>\[/);
});

test("playground includes bracketed badge states", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  assert.match(html, /<span class="pergyl-badge" data-tone="warn">\[WARNING\]<\/span>/);
});

test("preview inputs show the terminal prompt text", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  assert.match(html, /<span class="pergyl-input-prompt" aria-hidden="true">&gt;<\/span>/);
  assert.match(html, /<input class="pergyl-input"[^>]*placeholder="input_"/);
  assert.doesNotMatch(html, /placeholder="> input_"/);
});

test("snippets include the terminal prompt input text", () => {
  const html = readFileSync(SNIPPETS_PATH, "utf8");
  assert.match(html, /<span class="pergyl-input-prompt" aria-hidden="true">&gt;<\/span>/);
  assert.match(html, /<input class="pergyl-input"[^>]*placeholder="input_"/);
  assert.doesNotMatch(html, /placeholder="> input_"/);
});

test("playground updates theme status text when theme changes", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  assert.match(html, /<span class="pergyl-system-bar-value" id="theme-status">\[DARK\]<\/span>/);
  assert.match(html, /themeStatus\.textContent = "\[DARK\]";/);
  assert.match(html, /themeStatus\.textContent = "\[LIGHT\]";/);
});

test("playground status avoids terminal help prompts", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  assert.doesNotMatch(html, /<span class="pergyl-system-bar-key">help<\/span>/);
  assert.doesNotMatch(html, /<span class="pergyl-system-bar-value">\?<\/span>/);
  assert.match(html, /<span class="pergyl-system-bar-value" id="theme-status">\[DARK\]<\/span>/);
  assert.match(html, /<span class="pergyl-system-bar-value">\[13\]<\/span>/);
});

test("playground includes state matrix samples", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  assert.match(html, /aria-label="State matrix"/);
  assert.match(html, /aria-invalid="true"/);
  assert.match(html, /<button[^>]*class="pergyl-button"[^>]*\sdisabled(?:\s|>)/);
  assert.match(html, /<input[^>]*class="pergyl-input"[^>]*\sdisabled(?:\s|\/?>)/);
  assert.match(html, /<select[^>]*class="pergyl-select"[^>]*\sdisabled(?:\s|>)/);
  assert.match(html, /<input[^>]*class="pergyl-checkbox"[^>]*\sdisabled(?:\s|\/?>)/);
  assert.match(html, /<input[^>]*class="pergyl-radio"[^>]*\sdisabled(?:\s|\/?>)/);
  assert.match(html, /class="pergyl-choice"[^>]*data-disabled="true"/);
  assert.doesNotMatch(html, /aria-disabled="true"/);
});
