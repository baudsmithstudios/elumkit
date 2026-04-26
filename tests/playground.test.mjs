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
    "pergyl-card",
    "pergyl-button",
    "pergyl-input",
    "pergyl-textarea",
    "pergyl-select",
    "pergyl-alert",
    "pergyl-status",
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
  assert.match(html, /class="pergyl-status"/);
  assert.match(html, /class="pergyl-metric"/);
  assert.match(html, /class="pergyl-meter"[^>]*role="meter"/);
  assert.match(html, /aria-valuenow="64"/);
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
  assert.match(html, /<td data-label="Status" data-column="status"><span class="pergyl-status-label"/);
  assert.match(html, /\[HEALTHY\]/);
  assert.match(html, /\[DELAYED\]/);
  assert.match(html, /\[WARM\]/);
});

test("playground system status uses borderless status text", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  assert.match(html, /System status <span class="pergyl-status-label"/);
});

test("playground updates theme status text when theme changes", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  assert.match(html, /id="theme-status">\[DARK\]<\/span>/);
  assert.match(html, /themeStatus\.textContent = "\[DARK\]";/);
  assert.match(html, /themeStatus\.textContent = "\[LIGHT\]";/);
});

test("playground status avoids terminal help prompts", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  assert.doesNotMatch(html, /<span class="pergyl-status-key">help<\/span>/);
  assert.doesNotMatch(html, /<span class="pergyl-status-value">\?<\/span>/);
  assert.match(html, /<span class="pergyl-status-value" id="theme-status">\[DARK\]<\/span>/);
  assert.match(html, /<span class="pergyl-status-value">\[12\]<\/span>/);
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
