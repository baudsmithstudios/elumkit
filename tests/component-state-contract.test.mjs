import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const BASE_CSS = readFileSync("packages/core-css/src/base.css", "utf8");
const BUTTON_CSS = readFileSync("packages/core-css/src/components/button.css", "utf8");
const FORM_CSS = readFileSync("packages/core-css/src/components/form.css", "utf8");
const FEEDBACK_CSS = readFileSync("packages/core-css/src/components/feedback.css", "utf8");

test("global focus-visible ring is defined", () => {
  assert.match(BASE_CSS, /:focus-visible/);
  assert.match(BASE_CSS, /outline:/);
});

test("button supports native and aria disabled hooks", () => {
  assert.match(BUTTON_CSS, /\.tui-button:disabled/);
  assert.match(BUTTON_CSS, /\.tui-button\[aria-disabled="true"\]/);
});

test("form controls expose invalid aria hooks", () => {
  assert.match(FORM_CSS, /\.tui-input\[aria-invalid="true"\]/);
  assert.match(FORM_CSS, /\.tui-textarea\[aria-invalid="true"\]/);
  assert.match(FORM_CSS, /\.tui-select\[aria-invalid="true"\]/);
});

test("form controls expose disabled hooks", () => {
  assert.match(FORM_CSS, /\.tui-input:disabled/);
  assert.match(FORM_CSS, /\.tui-textarea:disabled/);
  assert.match(FORM_CSS, /\.tui-select:disabled/);
});

test("alert supports success, warn, and error tones", () => {
  assert.match(FEEDBACK_CSS, /\.tui-alert\[data-tone="success"\]/);
  assert.match(FEEDBACK_CSS, /\.tui-alert\[data-tone="warn"\]/);
  assert.match(FEEDBACK_CSS, /\.tui-alert\[data-tone="error"\]/);
});
