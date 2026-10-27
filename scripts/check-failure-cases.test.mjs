import assert from "node:assert/strict";
import test from "node:test";
import { loadFailureCaseInputs, validateFailureCases } from "./check-failure-cases.mjs";

const fixture = loadFailureCaseInputs();
const copy = () => structuredClone(fixture);
const find = (input, id) => input.registry.cases.find((item) => item.id === id);
function rejects(name, mutate, expected) {
  test(name, () => {
    const input = copy();
    mutate(input);
    assert.ok(validateFailureCases(input).some((error) => expected.test(error)), expected.toString());
  });
}

test("accepts the committed failure registry and bilingual documents", () => {
  assert.deepEqual(validateFailureCases(fixture), []);
});
rejects("rejects a source published after it was checked", (input) => {
  find(input, "FG01").sources[0].published_at = "2026-12-01";
}, /게시일이 확인일보다 늦음/);
rejects("rejects a case backed only by an unread source", (input) => {
  find(input, "FG02").sources[0].access_status = "unavailable";
}, /직접 읽은 출처가 없음/);
rejects("rejects an outcome code that differs from the summary table", (input) => {
  find(input, "FK02").outcome = ["STOPPED"];
}, /FK02: 한국어 문서 결과 코드가 registry와 다름/);
rejects("rejects a source URL missing from the English document", (input) => {
  input.englishDoc = input.englishDoc.replaceAll("https://decisions.civilresolutionbc.ca/crt/crtd/en/525448/1/document.do", "https://example.com/");
}, /FG02: 영문 문서에 출처 URL 누락/);
rejects("rejects a reference to an existing catalog case that is not an adjusted operation", (input) => {
  input.registry.existing_catalog_cases.push("G01");
}, /G01: 기존 사례가 운영 조정/);
rejects("rejects a stale regional count", (input) => {
  input.registry.cases.pop();
}, /지역별 사례 수 표기 불일치/);
