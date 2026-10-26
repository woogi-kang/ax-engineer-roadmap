import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

function schemaErrors(value, rule, schema, label, failures) {
  if (rule.$ref) {
    const target = rule.$ref.split("/").slice(1).reduce((node, key) => node?.[key], schema);
    if (!target) { failures.push(`${label}: unresolved schema reference`); return; }
    schemaErrors(value, target, schema, label, failures);
    return;
  }
  if (rule.const !== undefined && value !== rule.const) failures.push(`${label}: unexpected constant`);
  if (rule.enum && !rule.enum.includes(value)) failures.push(`${label}: invalid enum value`);
  const types = rule.type ? [rule.type].flat() : [];
  const isType = (type) => type === "null" ? value === null
    : type === "array" ? Array.isArray(value)
    : type === "object" ? value !== null && typeof value === "object" && !Array.isArray(value)
    : type === "integer" ? Number.isInteger(value)
    : typeof value === type;
  if (types.length && !types.some(isType)) { failures.push(`${label}: invalid type`); return; }
  if (typeof value === "string") {
    if (rule.minLength && value.trim().length < rule.minLength) failures.push(`${label}: empty text`);
    if (rule.pattern && !new RegExp(rule.pattern).test(value)) failures.push(`${label}: invalid pattern`);
    if (rule.format === "date" && !validDate(value)) failures.push(`${label}: invalid calendar date`);
    if (rule.format === "uri") {
      try { const url = new URL(value); if (url.protocol !== "https:" || !url.hostname) throw new Error(); }
      catch { failures.push(`${label}: invalid HTTPS URL`); }
    }
  }
  if (typeof value === "number" && rule.minimum !== undefined && value < rule.minimum) failures.push(`${label}: below minimum`);
  if (Array.isArray(value)) {
    if (rule.minItems && value.length < rule.minItems) failures.push(`${label}: empty array`);
    if (rule.uniqueItems && new Set(value.map((item) => JSON.stringify(item))).size !== value.length) failures.push(`${label}: duplicate value`);
    value.forEach((item, index) => schemaErrors(item, rule.items ?? {}, schema, `${label}[${index}]`, failures));
  } else if (value !== null && typeof value === "object") {
    for (const key of rule.required ?? []) if (!(key in value)) failures.push(`${label}.${key}: required field missing`);
    for (const [key, item] of Object.entries(value)) {
      if (rule.properties?.[key]) schemaErrors(item, rule.properties[key], schema, `${label}.${key}`, failures);
      else if (rule.additionalProperties === false) failures.push(`${label}.${key}: unexpected field`);
    }
  }
}

function validDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

const catalogCodes = {
  source_type: {
    ORG: "organization-official",
    JOINT: "joint-official",
    VENDOR: "vendor-customer-case",
    MIXED: "mixed-official-independent",
    GOV: "government-report",
  },
  deployment_stage: {
    PILOT: "pilot",
    LIMITED: "limited-operation",
    LIVE: "operation",
    EXPANDING: "expanding-operation",
    ADJUSTED: "adjusted-operation",
    UNKNOWN: "unknown",
  },
  outcome_verification: {
    NONE: "none",
    SELF: "self-reported",
    CROSS: "cross-checked",
    INDEPENDENT: "independently-evaluated",
  },
};
function catalogRows(content) {
  const rows = new Map();
  for (const line of content.split("\n")) {
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((value) => value.trim());
    if (cells.length !== 7 || !/^[KG]\d{2}$/.test(cells[0] ?? "")) continue;
    rows.set(cells[0], {
      source_type: cells[4],
      deployment_stage: cells[5],
      outcome_verification: cells[6],
    });
  }
  return rows;
}

export function validateSchemaValue(value, schema, label = "data") {
  const failures = [];
  schemaErrors(value, schema, schema, label, failures);
  return failures;
}

export function validatePublicCases({ registry, schema, koreanCatalog, englishCatalog, applicationMap, englishApplicationMap, knownCaseIds }) {
const failures = [];
schemaErrors(registry, schema, schema, "registry", failures);
if (failures.length) return failures;
const itemProperties = schema.properties.cases.items.properties;
const required = new Set(schema.properties.cases.items.required);
const allowed = new Set(Object.keys(itemProperties));
const sourceTypes = new Set(itemProperties.source_type.enum);
const deploymentStages = new Set(itemProperties.deployment_stage.enum);
const outcomeVerification = new Set(itemProperties.outcome_verification.enum);
const koreanRows = catalogRows(koreanCatalog);
const englishRows = catalogRows(englishCatalog);

if (registry.$schema !== "./public-ax-cases.schema.json") {
  failures.push("공개 사례 registry의 $schema 경로가 올바르지 않음");
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(registry.verified_at ?? "")) {
  failures.push("공개 사례 registry의 verified_at 형식 오류");
}
const baselineIds = new Set(registry.review_scope.baseline_case_ids);
const baselineSourceUrls = new Set();
const koreaCount = registry.cases.filter((item) => item.region === "KR").length;
const internationalCount = registry.cases.length - koreaCount;

const ids = new Set();
const sourceUrls = new Set();
for (const item of registry.cases ?? []) {
  for (const field of required) {
    if (!(field in item)) failures.push(`${item.id ?? "unknown"}: ${field} 누락`);
  }
  for (const field of Object.keys(item)) {
    if (!allowed.has(field)) failures.push(`${item.id}: 허용되지 않은 필드 ${field}`);
  }
  if (!/^[KG]\d{2}$/.test(item.id ?? "")) failures.push(`${item.id}: ID 형식 오류`);
  if (ids.has(item.id)) failures.push(`${item.id}: 중복 ID`);
  if ((item.id.startsWith("K")) !== (item.region === "KR")) failures.push(`${item.id}: case ID and region disagree`);
  ids.add(item.id);
  if (!sourceTypes.has(item.source_type)) failures.push(`${item.id}: source_type 오류`);
  if (!deploymentStages.has(item.deployment_stage)) failures.push(`${item.id}: deployment_stage 오류`);
  if (!outcomeVerification.has(item.outcome_verification)) failures.push(`${item.id}: outcome_verification 오류`);
  if (
    !item.workflow ||
    typeof item.workflow.ko !== "string" ||
    !item.workflow.ko ||
    typeof item.workflow.en !== "string" ||
    !item.workflow.en
  ) {
    failures.push(`${item.id}: workflow.ko/en 오류`);
  }
  if (
    !Array.isArray(item.source_urls) ||
    item.source_urls.length === 0 ||
    item.source_urls.some((url) => !/^https:\/\//.test(url))
  ) {
    failures.push(`${item.id}: source_urls 오류`);
  }
  for (const caseId of item.related_cases ?? []) {
    if (!knownCaseIds.has(caseId)) failures.push(`${item.id}: 존재하지 않는 related case ${caseId}`);
  }
  for (const [name, content] of [
    ["한국어 카탈로그", koreanCatalog],
    ["영문 카탈로그", englishCatalog],
    ["적용 맵", applicationMap],
    ["영문 적용 맵", englishApplicationMap],
  ]) {
    if (!content.includes(item.id)) failures.push(`${item.id}: ${name}에서 찾을 수 없음`);
  }
  for (const url of item.source_urls ?? []) {
    sourceUrls.add(url);
    if (baselineIds.has(item.id)) baselineSourceUrls.add(url);
    if (!koreanCatalog.includes(url)) failures.push(`${item.id}: 한국어 카탈로그에 출처 URL 누락`);
    if (!englishCatalog.includes(url)) failures.push(`${item.id}: 영문 카탈로그에 출처 URL 누락`);
  }
  for (const [name, rows] of [
    ["한국어 카탈로그", koreanRows],
    ["영문 카탈로그", englishRows],
  ]) {
    const row = rows.get(item.id);
    if (!row) {
      failures.push(`${item.id}: ${name} 비교표 행 누락`);
      continue;
    }
    for (const field of ["source_type", "deployment_stage", "outcome_verification"]) {
      if (catalogCodes[field][row[field]] !== item[field]) {
        failures.push(`${item.id}: ${name} ${field}가 registry와 다름`);
      }
    }
  }
}

for (const id of baselineIds) if (!ids.has(id)) failures.push(`${id}: preserved baseline case missing`);
if (baselineSourceUrls.size !== registry.review_scope.baseline_source_count) {
  failures.push(`기존 카탈로그의 원문 URL 수가 기준과 다릅니다 (${baselineSourceUrls.size}/${registry.review_scope.baseline_source_count}).`);
}
for (const [name, content, marker, countMarker] of [
  ["한국어 카탈로그", koreanCatalog, `${registry.review_scope.baseline_source_count}개 고유 원문 URL`, `국내 ${koreaCount}개, 해외 ${internationalCount}개`],
  ["영문 카탈로그", englishCatalog, `${registry.review_scope.baseline_source_count} unique source URLs`, `${koreaCount} Korean and ${internationalCount} international cases`],
]) {
  if (!content.includes(marker)) failures.push(`${name}: 기존 원문 수 표기 누락`);
  if (!content.includes(countMarker)) failures.push(`${name}: 현재 지역별 사례 수 표기 불일치`);
  if (/PRIMARY_OFFICIAL|partially_verified/.test(content)) failures.push(`${name}: 폐기한 근거 분류 코드가 남아 있음`);
}


const reviewedIds = new Set(registry.review_scope.reviewed_case_ids);
const claimIds = new Set();
if (registry.verified_at > registry.updated_at) failures.push("baseline review cannot be after update date");
for (const id of reviewedIds) if (!ids.has(id)) failures.push(`${id}: unknown reviewed case`);
for (const item of registry.cases) {
  let hasMatchingCorrection = item.deployment_stage === item.baseline_deployment_stage;
  for (const claim of item.claims) {
    const correction = claim.deployment_correction;
    if (!correction) continue;
    if (claim.kind === "baseline-summary" || correction.from !== item.baseline_deployment_stage || correction.from === correction.to) {
      failures.push(`${claim.id}: deployment correction does not reference the baseline classification`);
    }
    if (claim.kind !== "baseline-summary" && claim.access_status === "read" && ["source-reported", "study-reported"].includes(claim.status) && correction.from === item.baseline_deployment_stage && correction.to === item.deployment_stage) {
      hasMatchingCorrection = true;
    }
  }
  if (!hasMatchingCorrection) {
    failures.push(`${item.id}: deployment classification changed without a matching correction`);
  }
  const isBaseline = baselineIds.has(item.id);
  const isReviewed = ["selected-claims-reviewed", "initial-claims-reviewed"].includes(item.review_status);
  if (isReviewed !== reviewedIds.has(item.id)) failures.push(`${item.id}: review scope mismatch`);
  const baselines = item.claims.filter((claim) => claim.kind === "baseline-summary");
  const initial = item.claims.filter((claim) => claim.kind === "initial-review");
  if (isBaseline) {
    if (baselines.length !== 1) failures.push(`${item.id}: exactly one preserved baseline claim required`);
    if (initial.length || item.review_status === "initial-claims-reviewed") failures.push(`${item.id}: baseline case cannot be relabeled as newly introduced`);
    if (isReviewed && item.claims.length < 2) failures.push(`${item.id}: reviewed case needs a follow-up claim`);
    if (!isReviewed && item.claims.length !== 1) failures.push(`${item.id}: follow-up outside review scope`);
  } else {
    if (!validDate(item.introduced_at) || item.introduced_at <= registry.verified_at || item.introduced_at > registry.updated_at) failures.push(`${item.id}: new case requires a valid introduction date after the baseline`);
    if (baselines.length || initial.length !== 1 || item.review_status !== "initial-claims-reviewed") failures.push(`${item.id}: new case requires one initial review and no historical baseline claim`);
    if (initial.length === 1 && (initial[0].access_status !== "read" || !["source-reported", "study-reported"].includes(initial[0].status))) failures.push(`${item.id}: new cases require a directly read initial source`);
    if (initial.length === 1 && JSON.stringify([...initial[0].source_urls].sort()) !== JSON.stringify([...item.source_urls].sort())) failures.push(`${item.id}: initial source set mismatch`);
  }
  for (const claim of item.claims) {
    if (claimIds.has(claim.id)) failures.push(`${claim.id}: duplicate claim ID`);
    claimIds.add(claim.id);
    if (!claim.id.startsWith(`${item.id}-`)) failures.push(`${claim.id}: claim belongs to another case`);
    if (!isBaseline && item.introduced_at && claim.checked_at < item.introduced_at) failures.push(`${claim.id}: claim check predates case introduction`);
    if (claim.checked_at > registry.updated_at) failures.push(`${claim.id}: check date after registry update`);
    if (claim.published_at && claim.published_at > claim.checked_at) failures.push(`${claim.id}: publication after check`);
    if (claim.observation_period.start && claim.observation_period.end && claim.observation_period.start > claim.observation_period.end) failures.push(`${claim.id}: reversed observation period`);
    for (const date of [claim.observation_period.start, claim.observation_period.end]) {
      if (date && claim.published_at && date > claim.published_at) failures.push(`${claim.id}: observed period after publication`);
      if (date && date > claim.checked_at) failures.push(`${claim.id}: observed period after check`);
    }
    if (claim.kind === "baseline-summary") {
      if (claim.temporal_relation !== "baseline" || claim.status !== "historical-unrechecked" || claim.access_status !== "not-rechecked" || claim.checked_at !== registry.verified_at) failures.push(`${claim.id}: baseline cannot claim a fresh verification`);
      if (JSON.stringify([...claim.source_urls].sort()) !== JSON.stringify([...item.source_urls].sort())) failures.push(`${claim.id}: original source set changed`);
    } else {
      if (claim.checked_at <= registry.verified_at) failures.push(`${claim.id}: follow-up must have a later check date`);
      if (claim.temporal_relation === "baseline") failures.push(`${claim.id}: follow-up mislabeled as baseline`);
      if (claim.access_status !== "read" && claim.status !== "unknown") failures.push(`${claim.id}: unread follow-up must remain unknown`);
      if (claim.status === "historical-unrechecked") failures.push(`${claim.id}: follow-up has baseline status`);
      if (!claim.published_at && claim.temporal_relation !== "current-undated") failures.push(`${claim.id}: unknown publication date needs current-undated classification`);
      if (claim.temporal_relation === "current-undated" && claim.published_at !== null) failures.push(`${claim.id}: dated source marked undated`);
      if (claim.temporal_relation === "post-baseline" && (!claim.published_at || claim.published_at <= registry.verified_at)) failures.push(`${claim.id}: not a post-baseline publication`);
      if (claim.temporal_relation === "pre-baseline-new-evidence" && (!claim.published_at || claim.published_at > registry.verified_at)) failures.push(`${claim.id}: not pre-baseline evidence`);
      if (claim.status === "study-reported" && (claim.sample.size === null || claim.method.status !== "reported")) failures.push(`${claim.id}: study requires a reported sample and method`);
      for (const [name, content] of [["한국어 카탈로그", koreanCatalog], ["영문 카탈로그", englishCatalog]]) {
        if (!content.includes(claim.id)) failures.push(`${claim.id}: missing from ${name}`);
      }
    }
    for (const url of claim.source_urls) {
      if (!koreanCatalog.includes(url) || !englishCatalog.includes(url)) failures.push(`${claim.id}: claim source missing from bilingual catalog`);
    }
  }
}
for (const [name, content] of [["한국어 카탈로그", koreanCatalog], ["영문 카탈로그", englishCatalog], ["적용 맵", applicationMap], ["영문 적용 맵", englishApplicationMap]]) {
  if (!content.includes(registry.verified_at) || !content.includes(registry.updated_at)) failures.push(`${name}: baseline or partial-review date missing`);
}
return failures;
}

export function loadPublicCaseInputs(root = process.cwd()) {
  const read = (...parts) => fs.readFileSync(path.join(root, ...parts), "utf8");
  return {
    registry: JSON.parse(read("research", "public-ax-cases.json")),
    schema: JSON.parse(read("research", "public-ax-cases.schema.json")),
    koreanCatalog: read("research", "public-ax-cases.md"),
    englishCatalog: read("en", "research", "public-ax-cases.md"),
    applicationMap: read("research", "public-case-application-map.md"),
    englishApplicationMap: read("en", "research", "public-case-application-map.md"),
    knownCaseIds: new Set(fs.readdirSync(path.join(root, "case-studies"), { withFileTypes: true }).filter((entry) => entry.isDirectory() && entry.name !== "_schema").map((entry) => entry.name)),
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const inputs = loadPublicCaseInputs();
  const failures = validatePublicCases(inputs);
  if (failures.length) {
    console.error(`공개 사례 registry 검사 실패 ${failures.length}건`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
  } else {
    const urls = new Set(inputs.registry.cases.flatMap((item) => item.claims.flatMap((claim) => claim.source_urls)));
    const kr = inputs.registry.cases.filter((item) => item.region === "KR").length;
    console.log(`공개 사례 registry 통과: 국내 ${kr}개, 해외 ${inputs.registry.cases.length - kr}개; 기준 출처 ${inputs.registry.review_scope.baseline_source_count}개, 전체 ${urls.size}개; 주장 기록 ${inputs.registry.review_scope.reviewed_case_ids.length}개 사례`);
  }
}
