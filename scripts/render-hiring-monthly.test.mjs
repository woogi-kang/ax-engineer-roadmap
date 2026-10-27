import assert from "node:assert/strict";
import test from "node:test";
import { renderMonth, validateMonth } from "./render-hiring-monthly.mjs";

function fixture() {
  const note = { ko: "합성 기록", en: "Synthetic record" };
  return {
    month: "2026-10", window: { from: "2026-09-27", to: "2026-10-27" }, checked_at: "2026-10-27",
    queries: ["AX"], platforms: [{ name: "jobkorea", status: "collected", note }],
    postings: [
      {
        id: "M2610-001", platform: "jobkorea", platform_id: "1", url: "https://example.com/1", company: "A",
        title_original: "AX Engineer", role_type: "ax", start_date: "2026-10-01", start_basis: "page",
        deadline: "2026-11-01", status: "open", status_basis: "deadline-and-no-closed-notice",
        employment: "정규직", location: "서울", experience: "경력", tags: [],
      },
      {
        id: "M2610-002", platform: "jobkorea", platform_id: "2", url: "https://example.com/2", company: "B",
        title_original: "FDE", role_type: "fde", start_date: null, start_basis: "id-range",
        deadline: "2026-10-20", status: "closed", status_basis: "deadline-passed",
        employment: "정규직", location: "서울", experience: "경력", tags: ["company-undisclosed"], possible_duplicate_of: "1",
      },
    ],
    held: [],
    excluded: [{ platform_id: "3", url: "https://example.com/3", company: "C", title_original: "AX 컨설턴트", reason: "consulting" }],
  };
}

test("accepts a consistent monthly list and renders both languages", () => {
  const data = fixture();
  assert.deepEqual(validateMonth(data), []);
  assert.match(renderMonth(data, "ko"), /목록 2건: 모집 중 1건 · 마감 1건/);
  assert.match(renderMonth(data, "en"), /possible duplicate of M2610-001/);
});

test("rejects an open posting whose deadline has passed", () => {
  const data = fixture();
  data.postings[1].status = "open";
  data.postings[1].status_basis = "deadline-and-no-closed-notice";
  assert.ok(validateMonth(data).some((failure) => failure.includes("open needs a current deadline")));
});

test("rejects start dates outside the window and repeated platform ids", () => {
  const data = fixture();
  data.postings[0].start_date = "2026-09-20";
  data.excluded[0].platform_id = "2";
  const failures = validateMonth(data);
  assert.ok(failures.some((failure) => failure.includes("outside the window")));
  assert.ok(failures.some((failure) => failure.includes("listed more than once")));
});
