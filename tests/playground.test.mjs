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
    "pergyl-badge",
    "pergyl-status",
    "pergyl-metrics",
    "pergyl-meter",
  ];

  for (const className of requiredClasses) {
    assert.match(html, new RegExp(className));
  }
});

test("playground uses generous preview-only spacing", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  assert.match(html, /main\.pergyl-stack\s*>\s*\*\s*\+\s*\*\s*{[^}]*margin-top:\s*2rem;/s);
  assert.match(html, /\.playground-grid\s*{[^}]*gap:\s*1\.5rem;/s);
  assert.match(html, /\.state-matrix\s*{[^}]*gap:\s*1\.25rem;/s);
});

test("playground includes telemetry primitives", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  assert.match(html, /class="pergyl-status"/);
  assert.match(html, /class="pergyl-metric"/);
  assert.match(html, /class="pergyl-meter"[^>]*role="meter"/);
  assert.match(html, /aria-valuenow="64"/);
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
