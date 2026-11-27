import assert from "node:assert/strict";
import test from "node:test";
import { markers, renderIndex, renderRecords, replaceBlock } from "./render-public-cases.mjs";

const text = (ko, en) => ({ ko, en });

function fixture() {
  const claim = (id, kind, extra = {}) => ({
    id, kind, statement: text("원문에서 흐름을 확인했다.", "The source confirms the workflow."),
    source_urls: ["https://example.com/a"], published_at: "2026-02-05", checked_at: "2026-10-26",
    limitations: [text("표본은 미공개다.", "The sample is unreported.")], ...extra,
  });
  const base = { source_type: "organization-official", deployment_stage: "limited-operation", outcome_verification: "none" };
  return {
    cases: [
      { ...base, id: "K01", region: "KR", organization: "예시 기관", workflow: text("민원 | 답변", "Petition replies"),
        claims: [
          claim("K01-baseline", "baseline-summary"),
          claim("K01-source-confirmation", "source-confirmation"),
          claim("K01-followup", "outcome", { published_at: null, source_urls: ["https://example.com/a", "https://example.com/b"] }),
        ],
        catalog: {
          layout: "detailed", heading: text("예시 기관 — 민원 답변", "Example agency — petition replies"),
          points: {
            evidence: text("처리 시간은 미공개다.", "Handling time is not public."),
            operating_boundary: { ko: "일부 기관에만 적용했다." },
            problem: text("담당자가 자료를 따로 찾는다.", "Caseworkers search each source separately."),
          },
          notes: [
            { claim: "K01-source-confirmation", style: "source-check" },
            { text: text("직접 쓴 단락이다.", "A hand-written paragraph.") },
            { claim: "K01-followup", style: "review" },
            { claim: "K01-followup", style: "plain" },
          ],
        } },
      { ...base, id: "K02", region: "KR", organization: "예시 회사", workflow: text("리뷰 답변", "Review replies"), outcome_verification: "self-reported",
        claims: [claim("K02-initial-review", "initial-review"), claim("K02-later", "operating-boundary", { checked_at: "2026-11-02" })],
        catalog: {
          layout: "summary", heading: text("예시 회사: 리뷰 답변", "Example company: review replies"),
          points: { workflow: text("초안을 담당자가 검토한다.", "Staff review each draft."), practice: text("수정 기록을 대조한다.", "Compare edit records."), evidence: text("표본은 미공개다.", "The sample is unreported.") },
        } },
      { ...base, id: "G01", region: "US", organization: "Example Co", workflow: text("경보 조사", "Alert investigation"), source_type: "vendor-customer-case", deployment_stage: "operation",
        claims: [claim("G01-initial-review", "initial-review", { published_at: null })],
        catalog: { layout: "brief" } },
    ],
  };
}

test("renders the overview table with classification codes", () => {
  assert.match(renderIndex(fixture(), "ko"), /\| K01 \| KR \| 민원 \\\| 답변 \| 예시 기관 \| ORG \| LIMITED \| NONE \|/);
  const en = renderIndex(fixture(), "en");
  assert.match(en, /\| K02 \| KR \| Review replies \| 예시 회사 \| ORG \| LIMITED \| SELF \|/);
  assert.match(en, /\| G01 \| US \| Alert investigation \| Example Co \| VENDOR \| LIVE \| NONE \|/);
});

test("groups cases by region and prints detailed points in a fixed order", () => {
  const ko = renderRecords(fixture(), "ko");
  assert.ok(ko.indexOf("## 국내 사례") < ko.indexOf("### K01. 예시 기관 — 민원 답변"));
  assert.ok(ko.indexOf("## 해외 사례") < ko.indexOf("### G01. Example Co"));
  assert.match(ko, /- \*\*문제\*\*: 담당자가 자료를 따로 찾는다\.\n- \*\*운영 경계\*\*: 일부 기관에만 적용했다\.\n- \*\*근거와 한계\*\*: 처리 시간은 미공개다\./);
  const en = renderRecords(fixture(), "en");
  assert.match(en, /### K01\. Example agency — petition replies\n\n- \*\*Problem\*\*: Caseworkers search each source separately\.\n- \*\*Evidence limit\*\*: Handling time is not public\./);
});

test("assembles a claim note from the claim and keeps a written note as it is", () => {
  const ko = renderRecords(fixture(), "ko");
  assert.match(ko, /\n\n원문 대조 `K01-source-confirmation` \(발행 2026-02-05, 확인 2026-10-26\): 원문에서 흐름을 확인했다\.\n\n직접 쓴 단락이다\.\n\n/);
  assert.match(ko, /추가 확인 `K01-followup` \(확인 2026-10-26\): 원문에서 흐름을 확인했다\. 표본은 미공개다\. \[원문 1\]\(https:\/\/example\.com\/a\) · \[원문 2\]\(https:\/\/example\.com\/b\)/);
  assert.match(ko, /\n\n`K01-followup`: 원문에서 흐름을 확인했다\. 표본은 미공개다\. \[원문 1\]/);
  const en = renderRecords(fixture(), "en");
  assert.match(en, /Source check `K01-source-confirmation` \(published 2026-02-05; checked 2026-10-26\): The source confirms the workflow\.\n\nA hand-written paragraph\./);
  assert.match(en, /Review `K01-followup` \(checked 2026-10-26\): The source confirms the workflow\. The sample is unreported\. \[Source 1\]\(https:\/\/example\.com\/a\) · \[Source 2\]/);
  const undated = fixture();
  undated.cases[0].claims[1].published_at = null;
  assert.match(renderRecords(undated, "ko"), /원문 대조 `K01-source-confirmation` \(발행 게시일 미상, 확인 2026-10-26\)/);
  assert.match(renderRecords(undated, "en"), /Source check `K01-source-confirmation` \(publication date unknown; checked 2026-10-26\)/);
});

test("adds a claim-record line with every claim and check date to the summary layout", () => {
  const ko = renderRecords(fixture(), "ko");
  assert.match(ko, /### K02\. 예시 회사: 리뷰 답변\n\n- \*\*공개된 업무\*\*: 초안을 담당자가 검토한다\.\n- \*\*실습에서 물을 점\*\*: 수정 기록을 대조한다\.\n- \*\*근거와 한계\*\*: 표본은 미공개다\.\n- \*\*주장 기록\*\*: `K02-initial-review` · `K02-later`\. 확인 2026-10-26, 2026-11-02\. 세부 기간·표본·방법은 JSON에 기록했다\./);
  assert.match(renderRecords(fixture(), "en"), /- \*\*Evidence limits\*\*: The sample is unreported\.\n- \*\*Claim records\*\*: `K02-initial-review` · `K02-later`\. Checked 2026-10-26, 2026-11-02; dates, samples, and methods are recorded in JSON\./);
});

test("prints the brief layout from the initial-review claim unless a point is stored", () => {
  const ko = renderRecords(fixture(), "ko");
  assert.match(ko, /### G01\. Example Co\n\n- \*\*업무와 판단\*\*: 원문에서 흐름을 확인했다\.\n- \*\*근거와 한계\*\*: `G01-initial-review`, 발행 미상, 확인 2026-10-26\. 표본은 미공개다\. \[원문 1\]\(https:\/\/example\.com\/a\)$/);
  assert.match(renderRecords(fixture(), "en"), /- \*\*Workflow and judgment\*\*: The source confirms the workflow\.\n- \*\*Evidence and limits\*\*: `G01-initial-review`, published unknown, checked 2026-10-26\. The sample is unreported\. \[Source 1\]/);
  const data = fixture();
  data.cases[2].catalog.points = { workflow: text("경보를 조사해 PR을 제안한다.", "Alerts lead to investigated PRs.") };
  const stored = renderRecords(data, "ko");
  assert.match(stored, /- \*\*업무와 판단\*\*: 경보를 조사해 PR을 제안한다\.\n- \*\*근거와 한계\*\*: `G01-initial-review`, 발행 미상/);
  data.cases[2].claims[0].kind = "operating-boundary";
  assert.throws(() => renderRecords(data, "ko"), /G01: the brief layout needs an initial-review claim/);
});

test("fails on a classification, layout, point, or note style that has no label", () => {
  const change = (mutate) => { const data = fixture(); mutate(data.cases); return data; };
  assert.throws(() => renderIndex(change((cases) => { cases[0].deployment_stage = "new-stage"; }), "ko"), /K01: no label for "new-stage"/);
  assert.throws(() => renderRecords(change((cases) => { cases[1].catalog.layout = "new-layout"; }), "ko"), /K02: no label for "new-layout"/);
  assert.throws(() => renderRecords(change((cases) => { cases[1].catalog.points.problem = text("문제", "Problem"); }), "ko"), /K02: no label for "problem"/);
  assert.throws(() => renderRecords(change((cases) => { cases[0].catalog.points.operating_boundary.en = "Selected agencies only."; }), "en"), /K01: no label for "operating_boundary"/);
  assert.throws(() => renderRecords(change((cases) => { cases[0].catalog.notes[0].style = "new-style"; }), "ko"), /K01: no label for "new-style"/);
});

test("rejects a note that mixes text with a claim or names a claim from another case", () => {
  const change = (mutate) => { const data = fixture(); mutate(data.cases[0].catalog.notes); return data; };
  assert.throws(() => renderRecords(change((notes) => { notes[0].text = text("겹친 단락", "Overlapping paragraph"); }), "ko"), /K01: a note takes either text or a claim with a style/);
  assert.throws(() => renderRecords(change((notes) => { notes[1] = {}; }), "ko"), /K01: a note takes either text or a claim with a style/);
  assert.throws(() => renderRecords(change((notes) => { delete notes[0].style; }), "ko"), /K01: a note takes either text or a claim with a style/);
  assert.throws(() => renderRecords(change((notes) => { notes[0].claim = "K02-initial-review"; }), "ko"), /K01: note refers to unknown claim "K02-initial-review"/);
});

test("replaces only the marked block", () => {
  const source = `앞\n${markers.index[0]}\n옛 표\n${markers.index[1]}\n뒤\n`;
  assert.equal(replaceBlock(source, markers.index, "새 표"), `앞\n${markers.index[0]}\n새 표\n${markers.index[1]}\n뒤\n`);
  assert.equal(replaceBlock("표시 없음", markers.index, "새 표"), null);
});
