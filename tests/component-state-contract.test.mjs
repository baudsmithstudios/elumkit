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

test("button supports only native disabled hook in v0.1", () => {
  assert.match(BUTTON_CSS, /\.pergyl-button:disabled/);
  assert.doesNotMatch(BUTTON_CSS, /\.pergyl-button\[aria-disabled="true"\]/);
});

test("form controls expose invalid aria hooks", () => {
  assert.match(FORM_CSS, /\.pergyl-input\[aria-invalid="true"\]/);
  assert.match(FORM_CSS, /\.pergyl-textarea\[aria-invalid="true"\]/);
  assert.match(FORM_CSS, /\.pergyl-select\[aria-invalid="true"\]/);
});

test("form controls expose disabled hooks", () => {
  assert.match(FORM_CSS, /\.pergyl-input:disabled/);
  assert.match(FORM_CSS, /\.pergyl-textarea:disabled/);
  assert.match(FORM_CSS, /\.pergyl-select:disabled/);
});

test("checkbox and radio expose disabled hooks", () => {
  assert.match(FORM_CSS, /\.pergyl-checkbox:disabled/);
  assert.match(FORM_CSS, /\.pergyl-radio:disabled/);
  assert.match(FORM_CSS, /\.pergyl-choice\[data-disabled="true"\]/);
});

test("alert supports success, warn, and error tones", () => {
  assert.match(FEEDBACK_CSS, /\.pergyl-alert\[data-tone="success"\]/);
  assert.match(FEEDBACK_CSS, /\.pergyl-alert\[data-tone="warn"\]/);
  assert.match(FEEDBACK_CSS, /\.pergyl-alert\[data-tone="error"\]/);
});
