import assert from "node:assert/strict";
import test from "node:test";
import { markers, renderRecords, replaceBlock } from "./render-hiring-signals.mjs";

const text = (ko, en) => ({ ko, en });

function fixture() {
  return {
    postings: [
      {
        id: "J001", company: "Example | Co", title_original: "AX Engineer", location: "서울", canonical_job_id: "role-1",
        role_scope: "internal-ax", availability: "open", temporal_class: "undated", summary: text("합성 공고다.", "A synthetic posting."),
        responsibilities: [text("업무를 찾는다.", "Find work."), text("도구를 만든다.", "Build tools.")],
        required_qualifications: [text("개발 경험을 요구한다.", "Requires development experience.")],
        preferred_qualifications: [],
        sources: [{
          id: "J001-S1", url: "https://example.com/jobs/role-1", authority: "company-official", checked_at: "2026-10-26",
          access_status: "read", availability: "open", published_at: null, closing_date: "2026-11-30", note: text("본문을 읽었다.", "The body was read."),
        }],
        related_projects: ["projects/01-safe-assistant.md", "projects/04-production-pilot.md"],
        limitations: [text("합성 기록이다.", "Synthetic record.")],
        related_sources: [
          { url: "https://example.com/old", relationship: "historical-reference", identity_confirmed: false, note: text("과거 주소다.", "An old URL."), not_found_record_url: "https://example.com/check" },
          { url: "https://example.com/repost", relationship: "possible-duplicate", identity_confirmed: false, note: text("재게시다.", "A repost.") },
        ],
      },
    ],
  };
}

test("renders the index and record sections from the registry in both languages", () => {
  const ko = renderRecords(fixture(), "ko");
  assert.match(ko, /\| \[J001\]\(#j001\) \| Example \\\| Co \| AX Engineer \| 내부 AX \| 모집 표시 확인 \|/);
  assert.match(ko, /- 구분: 내부 AX · 모집 표시 확인 · 게시일 미상\./);
  assert.match(ko, /- 핵심 책임: 업무를 찾는다\. 도구를 만든다\./);
  assert.match(ko, /- 우대 요약: 확인된 별도 목록 없음\./);
  assert.match(ko, /- 실습 연결: \[P1\]\(\.\.\/projects\/01-safe-assistant\.md\) · \[P4\]\(\.\.\/projects\/04-production-pilot\.md\)/);
  assert.match(ko, /본문 확인 · 모집 표시 확인\. 발행 미상 \/ 마감 2026-11-30 \/ 확인 2026-10-26\. 본문을 읽었다\./);
  const en = renderRecords(fixture(), "en");
  assert.match(en, /- Scope: Internal AX · Open indication observed · Publication date unknown\./);
  assert.match(en, /Published unknown \/ closes 2026-11-30 \/ checked 2026-10-26\. The body was read\./);
});

test("shows a URL confirmed as 404 as code text with its check record instead of a link", () => {
  const ko = renderRecords(fixture(), "ko");
  assert.match(ko, /- 이전 주소 · 404 확인 기록: `https:\/\/example\.com\/old`: 과거 주소다\. \[검사 기록\]\(https:\/\/example\.com\/check\)/);
  assert.match(ko, /- \[상태 집계에서 제외한 관련 자료\]\(https:\/\/example\.com\/repost\): 재게시다\./);
  assert.doesNotMatch(ko, /\]\(https:\/\/example\.com\/old\)/);
});

test("fills missing location and empty requirement lists with explicit labels", () => {
  const data = fixture();
  data.postings[0].location = null;
  data.postings[0].required_qualifications = [];
  const ko = renderRecords(data, "ko");
  assert.match(ko, /- 지역: 미확인\. 기록 ID: `role-1`\./);
  assert.match(ko, /- 필수·제시 요건: 확인된 목록 없음\./);
});

test("fails on a classification value that has no label", () => {
  const data = fixture();
  data.postings[0].role_scope = "new-scope";
  assert.throws(() => renderRecords(data, "ko"), /J001: no label for "new-scope"/);
});

test("replaces only the marked block", () => {
  const source = `앞\n${markers[0]}\n옛 내용\n${markers[1]}\n뒤\n`;
  assert.equal(replaceBlock(source, "새 내용"), `앞\n${markers[0]}\n새 내용\n${markers[1]}\n뒤\n`);
  assert.equal(replaceBlock("표시 없음", "새 내용"), null);
});
