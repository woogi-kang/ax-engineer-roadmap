import assert from "node:assert/strict";
import test from "node:test";
import { hasOpeningDefinition } from "./check-korean-copy-sync.mjs";

test("finds the Korean and English opening definitions with Markdown emphasis", () => {
  assert.equal(hasOpeningDefinition("# Roadmap\n\n**AX Engineer**는 업무를 구현합니다."), true);
  assert.equal(hasOpeningDefinition("# Roadmap\n\nAn **AX Engineer** implements workflows."), true);
});

test("reads nested inline formatting and link labels without rendering HTML", () => {
  assert.equal(hasOpeningDefinition("**AX [*Engineer*](role.md)** implements workflows."), true);
});

test("requires explanatory text beyond the role name", () => {
  assert.equal(hasOpeningDefinition("**AX Engineer**"), false);
  assert.equal(hasOpeningDefinition("AX Engineering implements workflows."), false);
});

test("does not accept definitions that appear only after the first section", () => {
  assert.equal(hasOpeningDefinition("# Roadmap\n\nStart here.\n\n## Roles\n\n**AX Engineer** implements workflows."), false);
});

test("HTML blocks and image descriptions are not opening definitions", () => {
  assert.equal(hasOpeningDefinition("<script>AX Engineer implements workflows.</script>"), false);
  assert.equal(hasOpeningDefinition("![AX Engineer implements workflows.](example.png)"), false);
});

test("HTML attribute values do not become the visible role name", () => {
  assert.equal(hasOpeningDefinition('<span title="AX Engineer">Start here.</span>'), false);
  assert.equal(hasOpeningDefinition('<span title="example">**AX Engineer**</span> implements workflows.'), true);
});
