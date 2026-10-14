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
    const queries = html.match(new RegExp(`<form\\b[^>]*${classToken("elum-query").source}[^>]*>`, "g")) ?? [];
    const paginations = html.match(new RegExp(`<nav\\b[^>]*${classToken("elum-pagination").source}[^>]*>`, "g")) ?? [];

    assert.ok(queries.length > 0 && paginations.length > 0, `expected a query row and pagination in ${file}`);
    for (const query of queries) {
      assert.match(query, /role="search"/);
      assert.match(query, /aria-label="[^"]+"/);
    }
    for (const pagination of paginations) {
      assert.match(pagination, /aria-label="[^"]+"/);
    }
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

  assert.match(html, /aria-invalid="true"/);
  assert.match(html, /<button[^>]*class="elum-button"[^>]*\sdisabled(?:\s|>)/);
  assert.match(html, /<input[^>]*class="elum-input"[^>]*\sdisabled(?:\s|\/?>)/);
  assert.match(html, new RegExp(`${classToken("elum-choice").source}[^>]*data-disabled="true"`));
});

test("playground and snippets describe every invalid control with a visible error message, so the error isn't color-only", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const html = readFileSync(file, "utf8");
    const invalid = html.match(/<(?:input|select|textarea)\b[^>]*aria-invalid="true"[^>]*>/g) ?? [];

    assert.ok(invalid.length > 0, `expected an invalid control in ${file}`);
    for (const control of invalid) {
      const ids = control.match(/\baria-describedby="([^"]+)"/)?.[1].split(" ") ?? [];

      assert.ok(ids.some((id) => new RegExp(`<[^>]*${classToken("elum-field-error").source}[^>]*\\bid="${id}"`).test(html)), `invalid control has no error message in ${file}: ${control}`);
    }
  }
});

test("playground and snippets state the tone of every toned alert, feed item and metric in a badge, so it isn't color-only", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const html = readFileSync(file, "utf8");
    const toned = [...html.matchAll(/<(aside|li|div)\b([^>]*)>(?=(.*?)<\/\1>)/gs)]
      .filter(([, , attributes]) => /\bclass="elum-(?:alert|feed-item|metric)"/.test(attributes) && /\bdata-tone=/.test(attributes));

    assert.ok(toned.length > 0, `expected toned components in ${file}`);
    for (const [element, , , content] of toned) {
      assert.match(content, classToken("elum-badge"), `tone is color-only in ${file}: ${element.split("\n")[0]}`);
    }
  }
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

test("playground and snippets give tables explicit roles, which survive the narrow-screen display change that drops native table semantics in some browsers", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const tables = readFileSync(file, "utf8").match(new RegExp(`<table\\b[^>]*${classToken("elum-table").source}[^>]*>.*?</table>`, "gs")) ?? [];

    assert.ok(tables.length > 0, `expected a data table in ${file}`);
    for (const table of tables) {
      assert.match(table, /^<table\b[^>]*role="table"/);
      for (const [tag, roles] of [["thead", "rowgroup"], ["tbody", "rowgroup"], ["tr", "row"], ["th", "columnheader|rowheader"], ["td", "cell"]]) {
        for (const element of table.match(new RegExp(`<${tag}\\b[^>]*>`, "g")) ?? []) {
          assert.match(element, new RegExp(`role="(?:${roles})"`), `missing role in ${file}: ${element}`);
        }
      }
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

test("playground and snippets mark breadcrumbs as a named ordered list ending at the current page", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const trails = readFileSync(file, "utf8").match(new RegExp(`<nav\\b[^>]*${classToken("elum-breadcrumb").source}[^>]*>.*?</nav>`, "gs")) ?? [];

    assert.ok(trails.length > 0, `expected a breadcrumb in ${file}`);
    for (const trail of trails) {
      const items = trail.match(/<li\b.*?<\/li>/gs) ?? [];

      assert.match(trail, /^<nav\b[^>]*aria-label="Breadcrumb"/);
      assert.match(trail, /<ol\b/);
      assert.match(items.at(-1), /aria-current="page"/, `last breadcrumb item must be the current page in ${file}`);
      assert.equal(trail.match(/aria-current=/g).length, 1, `breadcrumb has more than one current item in ${file}`);
    }
  }
});

test("playground and snippets give each spinner a visible label", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const spinners = readFileSync(file, "utf8").match(new RegExp(`<span\\b[^>]*${classToken("elum-spinner").source}[^>]*>.*?</span>`, "gs")) ?? [];

    assert.ok(spinners.length > 0, `expected a spinner in ${file}`);
    for (const spinner of spinners) {
      assert.match(spinner, />[^<]*\S[^<]*<\/span>$/, `spinner has no label in ${file}`);
    }
  }
});

test("playground and snippets show named determinate and indeterminate progress bars", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const bars = readFileSync(file, "utf8").match(/<div\b[^>]*role="progressbar"[^>]*>/g) ?? [];
    const determinate = bars.filter((bar) => /\baria-valuenow=/.test(bar));

    assert.ok(determinate.length > 0 && determinate.length < bars.length, `expected determinate and indeterminate progress in ${file}`);
    for (const bar of bars) {
      assert.match(bar, classToken("elum-meter-track"));
      assert.match(bar, /\baria-label(?:ledby)?="[^"]+"/, `progress bar has no name in ${file}`);
    }
  }
});

const VOID_ELEMENTS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);

function insideRegions(html, className, regionAttribute) {
  const openElements = [];
  const matches = [];

  for (const [tag, closing, name] of html.matchAll(/<(\/?)([a-z][\w-]*)\b[^>]*>/g)) {
    if (closing) {
      openElements.pop();
    } else if (!VOID_ELEMENTS.has(name)) {
      if (classToken(className).test(tag)) {
        matches.push(openElements.includes(true));
      }
      openElements.push(regionAttribute.test(tag));
    }
  }

  return matches;
}

test("playground and snippets place every skeleton inside a region marked busy", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const skeletons = insideRegions(readFileSync(file, "utf8"), "elum-skeleton", /\baria-busy="true"/);

    assert.ok(skeletons.length > 0, `expected a skeleton in ${file}`);
    assert.ok(skeletons.every(Boolean), `skeleton outside an aria-busy region in ${file}`);
  }
});

test("playground and snippets place every spinner inside a status region that outlives it, so screen readers announce it", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const html = readFileSync(file, "utf8");
    const spinners = insideRegions(html, "elum-spinner", /\brole="status"/);

    assert.ok(spinners.every(Boolean), `spinner outside a role="status" region in ${file}`);
    assert.doesNotMatch(html, new RegExp(`<[^>]*${classToken("elum-spinner").source}[^>]*role="status"|<[^>]*role="status"[^>]*${classToken("elum-spinner").source}`), `spinner carries its own status role in ${file}`);
  }
});

test("playground and snippets open the app shell with a skip link to main", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const html = readFileSync(file, "utf8");
    const target = html.match(new RegExp(`${classToken("elum-shell").source}[^>]*>\\s*<a\\b[^>]*${classToken("elum-skip-link").source}[^>]*href="#([^"]+)"`))?.[1];

    assert.ok(target, `app shell does not open with a skip link in ${file}`);
    assert.match(html, new RegExp(`<main\\b[^>]*\\bid="${target}"`), `skip link does not point at main in ${file}`);
  }
});

function sidebars(html) {
  return html.match(new RegExp(`<nav\\b[^>]*${classToken("elum-sidebar").source}[^>]*>.*?</nav>`, "gs")) ?? [];
}

test("playground and snippets name the sidebar and mark exactly one current page in it", () => {
  for (const file of [PLAYGROUND_PATH, SNIPPETS_PATH]) {
    const navs = sidebars(readFileSync(file, "utf8"));

    assert.ok(navs.length > 0, `expected a sidebar in ${file}`);
    for (const nav of navs) {
      assert.match(nav, /^<nav\b[^>]*aria-label="[^"]+"/);
      assert.equal(nav.match(/aria-current="page"/g)?.length, 1, `sidebar needs exactly one current page in ${file}`);
    }
  }
});

test("playground sidebar links all land on a section of the page", () => {
  const html = readFileSync(PLAYGROUND_PATH, "utf8");
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  const targets = [...sidebars(html)[0].matchAll(/href="#([^"]*)"/g)].map((match) => match[1]);

  assert.ok(targets.length > 0, "playground sidebar has no section links");
  assert.deepEqual(targets.filter((target) => !ids.has(target)), [], "sidebar links point at missing ids");
});
