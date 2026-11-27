import assert from "node:assert/strict";
import test from "node:test";
import { causeTableFailures, markers, renderIndex, renderRecords, replaceBlock } from "./render-failure-cases.mjs";

const text = (ko, en) => ({ ko, en });

function fixture() {
  const source = (url, extra = {}) => ({
    url, publisher: "Example News", source_type: "PRESS", published_at: "2026-01-02", checked_at: "2026-10-27", access_status: "read",
    supports: text("중단 시점.", "Stop date."), ...extra,
  });
  const base = {
    attempted_change: text("상담을 자동화하려 했다.", "Tried to automate support."), decision_metric: text("응답률을 봤다.", "Watched response rate."),
    what_happened: text("서비스를 멈췄다.", "The service was stopped."), capstone_check: text("근거를 확인한다.", "Check the evidence."),
    limitations: [text("보도만 읽었다.", "Only press was read.")],
  };
  return {
    cases: [
      { ...base, id: "FK01", region: "KR", organization: "예시 기관", domain: text("민원 상담", "Public inquiries"), outcome: ["STOPPED", "SANCTIONED"],
        outcome_disclosed_at: "2026-02-01", failure_causes: ["ungrounded-answer", "weak-review"], failure_evidence: "official-record",
        related_public_cases: ["K01"], related_case_studies: ["public-service-petition-response"], sources: [source("https://example.com/a")] },
      { ...base, id: "FG01", region: "US", organization: "Example Co", domain: text("주문 접수", "Order taking"), outcome: ["PAUSED"],
        outcome_disclosed_at: null, failure_causes: ["ungrounded-answer"], failure_evidence: "press-reported",
        related_public_cases: [], related_case_studies: [], sources: [source("https://example.com/b", { published_at: null, access_status: "unavailable" })] },
    ],
  };
}

test("renders the summary table with cause names, outcome codes, and evidence codes", () => {
  const ko = renderIndex(fixture(), "ko");
  assert.match(ko, /\| FK01 \| KR \| 예시 기관 \| 민원 상담 \| 근거 없는 답변, 형식적 검토 \| STOPPED · SANCTIONED \| RECORD \|/);
  assert.match(renderIndex(fixture(), "en"), /\| FG01 \| US \| Example Co \| Order taking \| Ungrounded answer \| PAUSED \| PRESS \|/);
});

test("groups case records by region and renders each field in both languages", () => {
  const ko = renderRecords(fixture(), "ko");
  assert.ok(ko.indexOf("### 국내 사례") < ko.indexOf("#### FK01. 예시 기관: 민원 상담"));
  assert.ok(ko.indexOf("### 해외 사례") < ko.indexOf("#### FG01. Example Co: 주문 접수"));
  assert.match(ko, /- \*\*원인 분류\*\*: 근거 없는 답변, 형식적 검토 · 결과 `STOPPED · SANCTIONED` · 근거 `RECORD` · 결과 공개 2026-02-01/);
  assert.match(ko, /- \*\*연결\*\*: 관련 실습: \[public-service-petition-response\]\(\.\.\/case-studies\/public-service-petition-response\/README\.md\) · 비교할 공개 사례: K01/);
  assert.match(ko, /  - \[Example News\]\(https:\/\/example\.com\/a\) \(언론 보도, 게시 2026-01-02, 확인 2026-10-27\): 중단 시점\./);
  const en = renderRecords(fixture(), "en");
  assert.match(en, /#### FK01\. 예시 기관 — Public inquiries/);
  assert.match(en, /- \*\*Classification\*\*: Ungrounded answer · outcome `PAUSED` · evidence `PRESS` · outcome public unknown/);
});

test("marks unknown dates and unread sources, and omits the link line when nothing is linked", () => {
  const ko = renderRecords(fixture(), "ko");
  assert.match(ko, /\(언론 보도, 게시 미상, 확인 2026-10-27, 본문 확인 불가\)/);
  const second = ko.slice(ko.indexOf("#### FG01"));
  assert.doesNotMatch(second, /\*\*연결\*\*/);
});

test("compares the hand-written cause table with the registry", () => {
  const good = "| `ungrounded-answer` 근거 없는 답변 | 설명 | 2 | FK01, FG01 |\n| `weak-review` 형식적 검토 | 설명 | 1 | FK01 |";
  assert.deepEqual(causeTableFailures(fixture(), good, "ko"), []);
  const stale = "| `ungrounded-answer` 근거 없는 답변 | 설명 | 1 | FK01 |";
  const failures = causeTableFailures(fixture(), stale, "ko");
  assert.ok(failures.some((failure) => failure.includes("row for ungrounded-answer does not match")));
  assert.ok(failures.some((failure) => failure.includes("no row for weak-review")));
});

test("fails on a cause that has no label and replaces only the marked block", () => {
  const data = fixture();
  data.cases[0].failure_causes = ["new-cause"];
  assert.throws(() => renderIndex(data, "ko"), /FK01: no label for "new-cause"/);
  const source = `앞\n${markers.index[0]}\n옛 표\n${markers.index[1]}\n뒤\n`;
  assert.equal(replaceBlock(source, markers.index, "새 표"), `앞\n${markers.index[0]}\n새 표\n${markers.index[1]}\n뒤\n`);
  assert.equal(replaceBlock("표시 없음", markers.index, "새 표"), null);
});
