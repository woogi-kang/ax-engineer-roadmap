import fs from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";
import { validateHiringSignals } from "./check-hiring-signals.mjs";

const schema = JSON.parse(fs.readFileSync(new URL("../research/hiring-signals.schema.json", import.meta.url), "utf8"));
const text = { ko: "검사에 사용하는 합성 기록", en: "Synthetic record used for validation" };
function fixture() {
  return {
    registry: {
      $schema: "./hiring-signals.schema.json", checked_at: "2026-10-26", recent_since: "2026-08-01", scope: text,
      postings: [{
        id: "J001", company: "Example Company", title_original: "AX Engineer", location: null,
        canonical_job_id: "role-1", role_scope: "internal-ax", added_at: "2026-10-26", availability: "open",
        temporal_class: "dated-recent", summary: text, responsibilities: [text], required_qualifications: [], preferred_qualifications: [],
        sources: [{ id: "J001-S1", url: "https://example.com/jobs/role-1", authority: "company-official", checked_at: "2026-10-26", access_status: "read", availability: "open", availability_basis: "application-route-visible", published_at: "2026-10-01", closing_date: null, note: text }],
        related_projects: ["projects/01-safe-assistant.md"], limitations: [text],
      }],
    },
    schema,
    koreanCatalog: `공고 기록 1개 2026-10-26
모집 표시 확인 1개 · 마감 표시 확인 0개 · 미확인 0개
게시일이 비교 기간에 속하는 원문: Example Company 1개. 나머지 0개는 게시일 미상.
| [J001](#j001) | Example Company | AX Engineer | 내부 AX | 모집 표시 확인 |
https://example.com/jobs/role-1`,
    englishCatalog: `1 posting records 2026-10-26
Open indications: 1 · Closed indications: 0 · Unverified: 0
One original has a verified publication date within the window: Example Company. The other 0 have unknown publication dates.
| [J001](#j001) | Example Company | AX Engineer | Internal AX | Open indication observed |
https://example.com/jobs/role-1`,
    knownProjects: new Set(["projects/01-safe-assistant.md"]),
  };
}
const source = (input) => input.registry.postings[0].sources[0];
function rejects(name, edit, pattern) {
  test(name, () => {
    const input = fixture(); edit(input);
    assert.ok(validateHiringSignals(input).some((error) => pattern.test(error)), pattern.toString());
  });
}

test("accepts a read posting with a dated source and application evidence", () => assert.deepEqual(validateHiringSignals(fixture()), []));
rejects("search results do not establish an open application", (i) => { source(i).access_status = "search-only"; }, /unread source cannot establish/);
rejects("HTTP or content access alone does not establish open recruitment", (i) => { source(i).availability_basis = "undetermined"; }, /open availability requires/);
rejects("an unavailable page is not proof of closure", (i) => { Object.assign(source(i), { access_status: "unavailable", availability: "closed", availability_basis: "explicit-closed" }); i.registry.postings[0].availability = "closed"; }, /unread source cannot establish/);
rejects("first discovery cannot substitute for a recent publication date", (i) => { source(i).published_at = null; }, /recent posting needs/);
rejects("impossible calendar dates are invalid", (i) => { source(i).published_at = "2026-02-30"; }, /invalid calendar date/);
rejects("publication cannot be after the source check", (i) => { source(i).published_at = "2026-11-01"; }, /publication is after/);
rejects("future deadlines cannot justify a deadline-passed state", (i) => { Object.assign(source(i), { availability: "closed", availability_basis: "deadline-passed", closing_date: "2026-11-02" }); i.registry.postings[0].availability = "closed"; }, /deadline must be strictly before/);
test("explicit closure takes precedence over a future displayed deadline", () => {
  const input = fixture(); Object.assign(source(input), { availability: "closed", availability_basis: "explicit-closed", closing_date: "2026-11-02" }); input.registry.postings[0].availability = "closed";
  input.koreanCatalog = input.koreanCatalog.replace("모집 표시 확인 1개 · 마감 표시 확인 0개", "모집 표시 확인 0개 · 마감 표시 확인 1개").replace("| 모집 표시 확인 |", "| 마감 표시 확인 |");
  input.englishCatalog = input.englishCatalog.replace("Open indications: 1 · Closed indications: 0", "Open indications: 0 · Closed indications: 1").replace("| Open indication observed |", "| Closed indication observed |");
  assert.deepEqual(validateHiringSignals(input), []);
});
test("a source disagreement remains conflicting", () => {
  const input = fixture(); const second = { ...source(input), id: "J001-S2", url: "https://example.com/other/role-1", availability: "closed", availability_basis: "explicit-closed" };
  input.registry.postings[0].sources.push(second); input.registry.postings[0].availability = "conflicting";
  input.koreanCatalog = input.koreanCatalog.replace("모집 표시 확인 1개 · 마감 표시 확인 0개 · 미확인 0개", "모집 표시 확인 0개 · 마감 표시 확인 0개 · 미확인 0개 · 상충 1개").replace("| 모집 표시 확인 |", "| 상충 |");
  input.englishCatalog = input.englishCatalog.replace("Open indications: 1 · Closed indications: 0 · Unverified: 0", "Open indications: 0 · Closed indications: 0 · Unverified: 0 · Conflicting: 1").replace("| Open indication observed |", "| Conflicting |");
  input.koreanCatalog += ` ${second.url}`; input.englishCatalog += ` ${second.url}`;
  assert.deepEqual(validateHiringSignals(input), []);
  input.registry.postings[0].availability = "open";
  assert.ok(validateHiringSignals(input).some((e) => /does not match/.test(e)));
});
rejects("missing English sources are caught", (i) => { i.englishCatalog = i.englishCatalog.replace("https://example.com/jobs/role-1", ""); }, /source missing from/);
rejects("unknown practice links are caught", (i) => { i.registry.postings[0].related_projects = ["projects/missing.md"]; }, /unknown project/);
rejects("newly unavailable material is not promoted as current content", (i) => { Object.assign(source(i), { access_status: "unavailable", availability: "unknown", availability_basis: "undetermined", published_at: null }); Object.assign(i.registry.postings[0], { availability: "unknown", temporal_class: "undated" }); }, /unread content must remain historical/);
rejects("duplicate canonical employer roles are caught", (i) => { const duplicate = structuredClone(i.registry.postings[0]); duplicate.id = "J002"; duplicate.sources[0].id = "J002-S1"; duplicate.sources[0].url = "https://example.com/jobs/another-url"; i.registry.postings.push(duplicate); }, /duplicate company and canonical job ID/);
rejects("stale displayed record counts are caught", (i) => { i.koreanCatalog = i.koreanCatalog.replace("공고 기록 1개", "공고 기록 0개"); }, /posting count is stale/);
rejects("availability totals cannot disagree with source-derived record states", (i) => { i.koreanCatalog = i.koreanCatalog.replace("모집 표시 확인 1개 · 마감 표시 확인 0개", "모집 표시 확인 0개 · 마감 표시 확인 1개"); }, /availability summary counts/);
rejects("recent-publication totals are checked against dated records", (i) => { i.englishCatalog = i.englishCatalog.replace("One original has", "2 originals have"); }, /recent-publication summary count/);
rejects("unknown-publication totals are checked separately from recent totals", (i) => { i.koreanCatalog = i.koreanCatalog.replace("나머지 0개는 게시일 미상", "나머지 1개는 게시일 미상"); }, /unknown-publication summary count/);
rejects("an index row cannot contradict its record even when aggregate counts match", (i) => { i.koreanCatalog = i.koreanCatalog.replace("| 모집 표시 확인 |", "| 미확인 |"); }, /index availability/);

function addRelatedSource(input) {
  const related = { url: "https://example.com/closed-possible-duplicate", relationship: "possible-duplicate", identity_confirmed: false, note: { ko: "다른 채널에서 마감 표시를 봤지만 같은 공고인지는 확인하지 못했다.", en: "The closed record on another channel has no confirmed original-ID match." } };
  input.registry.postings[0].related_sources = [related];
  input.koreanCatalog += `\n${related.url}`;
  input.englishCatalog += `\n${related.url}`;
  return related;
}
test("unmatched related material does not alter availability or publication counts", () => {
  const input = fixture(); addRelatedSource(input);
  assert.deepEqual(validateHiringSignals(input), []);
});
rejects("related source links must appear in both language editions", (i) => {
  const related = addRelatedSource(i);
  i.englishCatalog = i.englishCatalog.replace(related.url, "https://example.com/unrelated");
}, /related source missing/);
