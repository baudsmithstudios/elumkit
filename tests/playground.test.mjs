import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { DOCUMENTED_CLASSES } from "./documented-classes.mjs";

const PLAYGROUND_PATH = "examples/playground.html";
const SNIPPETS_PATH = "packages/core-patterns/snippets/index.html";

function classToken(className) {
  return new RegExp(`\\bclass="(?:[^"]*\\s)?${className}(?:\\s[^"]*)?"`);
}

test("playground loads the core CSS source and demonstrates every documented class", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");

  assert.match(html, /href="\.\.\/packages\/core-css\/src\/index\.css"/);
  for (const className of DOCUMENTED_CLASSES) {
    assert.match(html, classToken(className), `playground does not demonstrate ${className}`);
  }
});

test("playground and snippets expose query and pagination landmarks", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const html = readFileSync(file, "utf8");

    assert.match(html, /class="elum-query" role="search" aria-label="Service filters"/);
    assert.match(html, /aria-label="Pagination"/);
  }
});

test("playground and snippets expose the in-page tabset pattern", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const html = readFileSync(file, "utf8");

    const tabs = html.match(/<button\b[^>]*role="tab"[^>]*>/g) ?? [];

    assert.match(html, /role="tablist"/);
    assert.ok(tabs.length > 0, `expected tabs in ${file}`);
    for (const tab of tabs) {
      const panelId = tab.match(/\baria-controls="([^"]+)"/)?.[1];
      const panel = html.match(new RegExp(`<[^>]*\\bid="${panelId}"[^>]*>`))?.[0] ?? "";

      assert.match(tab, /aria-selected="(?:true|false)"/);
      assert.match(panel, /role="tabpanel"/, `tab controls missing tabpanel #${panelId} in ${file}`);
    }
    assert.doesNotMatch(html, /class="elum-tab"[^>]*aria-current="page"/);
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

test("playground and snippets open dialogs declaratively with named, closable modals", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const html = readFileSync(file, "utf8");
    const dialogs = html.match(/<dialog\b[^>]*>/g) ?? [];

    assert.ok(dialogs.some((dialog) => /data-placement="end"/.test(dialog)), `expected a side panel dialog in ${file}`);
    for (const dialog of dialogs) {
      const id = dialog.match(/\bid="([^"]+)"/)?.[1];
      const titleId = dialog.match(/\baria-labelledby="([^"]+)"/)?.[1];

      assert.match(dialog, classToken("elum-dialog"));
      assert.match(html, new RegExp(`<button\\b[^>]*commandfor="${id}"[^>]*command="show-modal"`), `no opener for #${id} in ${file}`);
      assert.match(html, new RegExp(`<button\\b[^>]*commandfor="${id}"[^>]*command="close"`), `no close button for #${id} in ${file}`);
      assert.match(html, new RegExp(`class="elum-dialog-title"[^>]*id="${titleId}"`), `#${id} is not named by its title in ${file}`);
    }
  }
});

test("playground and snippets open action menus from a labelled popover trigger, without menu roles", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const html = readFileSync(file, "utf8");
    const menus = html.match(new RegExp(`<div\\b[^>]*${classToken("elum-menu").source}[^>]*>`, "g")) ?? [];

    assert.ok(menus.length > 0, `expected an action menu in ${file}`);
    for (const menu of menus) {
      const id = menu.match(/\bid="([^"]+)"/)?.[1];

      assert.match(menu, /\bpopover\b/);
      assert.match(html, new RegExp(`<button\\b[^>]*popovertarget="${id}"[^>]*aria-label="[^"]+"`), `no labelled trigger for #${id} in ${file}`);
    }
    // role="menu" promises arrow-key navigation that native popovers don't provide
    assert.doesNotMatch(html, /role="menu(item)?"/);
  }
});

test("playground and snippets build switches on native checkboxes exposed with the switch role", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const switches = readFileSync(file, "utf8").match(new RegExp(`<input\\b[^>]*${classToken("elum-switch").source}[^>]*>`, "g")) ?? [];

    assert.ok(switches.length > 0, `expected a switch in ${file}`);
    for (const control of switches) {
      assert.match(control, /type="checkbox"/);
      assert.match(control, /role="switch"/);
    }
  }
});

test("playground and snippets build segmented controls as named fieldsets of radios sharing one name", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const groups = readFileSync(file, "utf8").match(new RegExp(`<fieldset\\b[^>]*${classToken("elum-segmented").source}[^>]*>.*?</fieldset>`, "gs")) ?? [];

    assert.ok(groups.length > 0, `expected a segmented control in ${file}`);
    for (const group of groups) {
      const radios = group.match(/<input\b[^>]*>/g) ?? [];
      const names = new Set(radios.map((radio) => radio.match(/\bname="([^"]+)"/)?.[1]));

      assert.ok(radios.every((radio) => /type="radio"/.test(radio)), `segmented options must be radios in ${file}`);
      assert.match(group, /^<fieldset\b[^>]*aria-label="[^"]+"|<legend\b/, `segmented control has no name in ${file}`);
      assert.equal(names.size, 1, `segmented radios must share one name in ${file}`);
    }
  }
});
