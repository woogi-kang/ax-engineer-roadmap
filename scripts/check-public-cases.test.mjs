import assert from "node:assert/strict";
import test from "node:test";
import { loadPublicCaseInputs, validatePublicCases } from "./check-public-cases.mjs";

const fixture = loadPublicCaseInputs();
const copy = () => structuredClone(fixture);
const claim = (input, id) => input.registry.cases.flatMap((item) => item.claims).find((item) => item.id === id);
function rejects(name, mutate, expected) {
  test(name, () => {
    const input = copy();
    mutate(input);
    assert.ok(validatePublicCases(input).some((error) => expected.test(error)), expected.toString());
  });
}

test("preserves original sources and baseline review date while validating selected corrections", () => {
  assert.deepEqual(validatePublicCases(fixture), []);
  assert.equal(fixture.registry.verified_at, "2026-08-01");
  const baselineIds = new Set(fixture.registry.review_scope.baseline_case_ids);
  assert.equal(new Set(fixture.registry.cases.filter((item) => baselineIds.has(item.id)).flatMap((item) => item.source_urls)).size, 26);
  assert.equal(fixture.registry.review_scope.baseline_case_ids.length, 25);
  assert.ok(new Set(fixture.registry.cases.flatMap((item) => item.claims.flatMap((entry) => entry.source_urls))).size >= 26);
});
rejects("blocks a changed deployment classification without a correction record", (input) => {
  delete claim(input, "K07-platform-plan-correction").deployment_correction;
}, /classification changed without a matching correction/);
rejects("requires a classification correction to identify the baseline classification", (input) => {
  claim(input, "K09-deployment-scope-correction").deployment_correction.from = "operation";
}, /does not reference the baseline classification/);
rejects("requires the current classification to match the corrected result", (input) => {
  input.registry.cases.find((item) => item.id === "G10").deployment_stage = "expanding-operation";
}, /classification changed without a matching correction/);
rejects("does not apply a classification correction from an unread source", (input) => {
  Object.assign(claim(input, "K07-platform-plan-correction"), { access_status: "unavailable", status: "unknown" });
}, /classification changed without a matching correction/);
rejects("detects a catalog table that retains a corrected case's old classification", (input) => {
  input.englishCatalog = input.englishCatalog.split("\n").map((line) => line.startsWith("| K07 |") ? line.replace("| UNKNOWN |", "| LIMITED |") : line).join("\n");
}, /K07: 영문 카탈로그 deployment_stage가 registry와 다름/);
test("preserves earlier correction history when a read claim supports the current classification", () => {
  const input = copy();
  const earlier = structuredClone(claim(input, "K07-platform-plan-correction"));
  earlier.id = "K07-earlier-scope-correction";
  earlier.checked_at = "2026-10-25";
  earlier.deployment_correction.to = "pilot";
  input.registry.cases.find((item) => item.id === "K07").claims.push(earlier);
  input.koreanCatalog += `\n${earlier.id}\n`;
  input.englishCatalog += `\n${earlier.id}\n`;
  assert.deepEqual(validatePublicCases(input), []);
});
test("separate source-check tables do not overwrite the classification table", () => {
  const input = copy();
  input.koreanCatalog += "\n| G02 | 지표명만 원문 대조 |\n";
  input.englishCatalog += "\n| G02 | Metric wording checked only |\n";
  assert.deepEqual(validatePublicCases(input), []);
});
rejects("rejects impossible dates rather than only checking date shape", (input) => {
  claim(input, "K04-followup-metrics").published_at = "2026-02-30";
}, /invalid calendar date/);
rejects("does not allow a partial review to redate all baseline claims", (input) => {
  input.registry.verified_at = "2026-10-26";
}, /baseline cannot claim a fresh verification/);
rejects("does not label an older quality study as a new market change", (input) => {
  claim(input, "G08-relationship-events-study").temporal_relation = "post-baseline";
}, /not a post-baseline publication/);
rejects("does not infer a publication date from the check date", (input) => {
  claim(input, "K04-followup-metrics").published_at = null;
}, /unknown publication date needs/);
test("permits an undated unread source only as an explicit unknown", () => {
  const input = copy();
  Object.assign(claim(input, "K04-followup-metrics"), {
    published_at: null, temporal_relation: "current-undated", access_status: "unavailable", status: "unknown",
  });
  assert.deepEqual(validatePublicCases(input), []);
});
rejects("unread follow-up content cannot be reported as verified from a source", (input) => {
  claim(input, "K04-followup-metrics").access_status = "unavailable";
}, /unread follow-up must remain unknown/);
rejects("rejects publication dates later than the check", (input) => {
  claim(input, "K04-followup-metrics").published_at = "2026-11-01";
}, /publication after check/);
rejects("rejects observations after the publication", (input) => {
  claim(input, "K04-followup-metrics").observation_period.end = "2026-10-01";
}, /observed period after publication/);
rejects("rejects reversed observation periods", (input) => {
  claim(input, "K04-followup-metrics").observation_period = {
    start: "2026-09-15", end: "2026-09-01", description: { ko: "잘못된 기간", en: "Invalid period" },
  };
}, /reversed observation period/);
rejects("requires a study's sample instead of silently dropping its denominator", (input) => {
  claim(input, "G08-relationship-events-study").sample.size = null;
}, /study requires a reported sample/);
rejects("requires a study's reported method", (input) => {
  claim(input, "G08-relationship-events-study").method.status = "not-reported";
}, /study requires a reported sample and method/);
rejects("rejects duplicate claim identifiers across cases", (input) => {
  claim(input, "K04-followup-human-choice").id = "K04-followup-metrics";
}, /duplicate claim ID/);
rejects("keeps the review scope consistent with case-level status", (input) => {
  input.registry.review_scope.reviewed_case_ids.pop();
}, /review scope mismatch/);
rejects("preserves the original source set in its baseline claim", (input) => {
  claim(input, "K04-baseline").source_urls = ["https://lg.co.kr/media/release/30616"];
}, /original source set changed/);
rejects("requires claim-level limitations", (input) => {
  claim(input, "K04-followup-metrics").limitations = [];
}, /empty array/);
rejects("requires both language versions for the claim", (input) => {
  delete claim(input, "K04-followup-metrics").statement.en;
}, /statement.en: required field missing/);
rejects("keeps follow-up citations in the English catalog", (input) => {
  input.englishCatalog = input.englishCatalog.replaceAll("https://lg.co.kr/media/release/30616", "https://example.com/removed");
}, /claim source missing from bilingual catalog/);
rejects("requires bilingual practice mappings", (input) => {
  input.englishApplicationMap = input.englishApplicationMap.replaceAll("G08", "REMOVED");
}, /G08: 영문 적용 맵에서 찾을 수 없음/);

rejects("undated sources cannot claim observations after the check", (input) => {
  Object.assign(claim(input, "K04-followup-metrics"), {
    published_at: null, temporal_relation: "current-undated",
    observation_period: { start: null, end: "2030-01-01", description: { ko: "미래 관측일", en: "Future observation date" } },
  });
}, /observed period after check/);

function withNewCase() {
  const input = copy();
  const added = structuredClone(input.registry.cases.find((item) => item.id === "K07"));
  added.id = "K99";
  added.introduced_at = "2026-10-26";
  added.baseline_deployment_stage = added.deployment_stage;
  added.review_status = "initial-claims-reviewed";
  const initial = structuredClone(claim(input, "K07-platform-plan-correction"));
  Object.assign(initial, { id: "K99-initial", kind: "initial-review", source_urls: added.source_urls });
  delete initial.deployment_correction;
  added.claims = [initial];
  input.registry.cases.push(added);
  input.registry.review_scope.reviewed_case_ids.push(added.id);
  const kr = input.registry.cases.filter((item) => item.region === "KR").length;
  const intl = input.registry.cases.length - kr;
  input.koreanCatalog = input.koreanCatalog.replace(/국내 \d+개, 해외 \d+개/g, `국내 ${kr}개, 해외 ${intl}개`);
  input.englishCatalog = input.englishCatalog.replace(/\d+ Korean and \d+ international cases/g, `${kr} Korean and ${intl} international cases`);
  input.koreanCatalog += "\n| K99 | KR | Example | Example | ORG | UNKNOWN | SELF |\nK99-initial\n";
  input.englishCatalog += "\n| K99 | KR | Example | Example | ORG | UNKNOWN | SELF |\nK99-initial\n";
  input.applicationMap += "\nK99\n";
  input.englishApplicationMap += "\nK99\n";
  return input;
}

test("admits a newly reviewed case without fabricating an old baseline claim", () => {
  assert.deepEqual(validatePublicCases(withNewCase()), []);
});
for (const field of ["introduced_at"]) {
  test(`new cases require ${field}`, () => {
    const input = withNewCase(); delete input.registry.cases.at(-1)[field];
    assert.ok(validatePublicCases(input).some((e) => /introduction date/.test(e)));
  });
}
test("does not admit a new case from an unread source", () => {
  const input = withNewCase(); Object.assign(input.registry.cases.at(-1).claims[0], { access_status: "unavailable", status: "unknown" });
  assert.ok(validatePublicCases(input).some((e) => /directly read initial source/.test(e)));
});
test("does not backdate a new case into the preserved baseline", () => {
  const input = withNewCase(); input.registry.cases.at(-1).introduced_at = input.registry.verified_at;
  assert.ok(validatePublicCases(input).some((e) => /introduction date/.test(e)));
});
test("detects stale bilingual totals after an addition", () => {
  const input = withNewCase(); input.englishCatalog = input.englishCatalog.replace(/\d+ Korean and \d+ international cases/g, "0 Korean and 0 international cases");
  assert.ok(validatePublicCases(input).some((e) => /지역별 사례 수/.test(e)));
});
test("preserved baseline IDs cannot silently disappear", () => {
  const input = copy(); input.registry.cases = input.registry.cases.filter((item) => item.id !== "K01");
  assert.ok(validatePublicCases(input).some((e) => /preserved baseline case missing/.test(e)));
});
