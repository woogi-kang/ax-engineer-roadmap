import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registryPath = path.join(root, "research", "public-ax-cases.json");
const schemaPath = path.join(root, "research", "public-ax-cases.schema.json");
const koreanCatalog = fs.readFileSync(
  path.join(root, "research", "public-ax-cases.md"),
  "utf8",
);
const englishCatalog = fs.readFileSync(
  path.join(root, "en", "research", "public-ax-cases.md"),
  "utf8",
);
const applicationMap = fs.readFileSync(
  path.join(root, "research", "public-case-application-map.md"),
  "utf8",
);
const failures = [];

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const itemProperties = schema.properties.cases.items.properties;
const required = new Set(schema.properties.cases.items.required);
const allowed = new Set(Object.keys(itemProperties));
const enumValues = (field) => new Set(itemProperties[field].enum ?? []);
const sourceTypes = enumValues("source_type");
const deploymentStages = enumValues("deployment_stage");
const outcomeVerification = enumValues("outcome_verification");
const catalogCodes = {
  source_type: {
    ORG: "organization-official",
    JOINT: "joint-official",
    VENDOR: "vendor-customer-case",
    MIXED: "mixed-official-independent",
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
const knownCaseIds = new Set(
  fs
    .readdirSync(path.join(root, "case-studies"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== "_schema")
    .map((entry) => entry.name),
);

function catalogRows(content) {
  const rows = new Map();
  for (const line of content.split("\n")) {
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((value) => value.trim());
    if (!/^[KG]\d{2}$/.test(cells[0] ?? "")) continue;
    rows.set(cells[0], {
      source_type: cells[4],
      deployment_stage: cells[5],
      outcome_verification: cells[6],
    });
  }
  return rows;
}

const koreanRows = catalogRows(koreanCatalog);
const englishRows = catalogRows(englishCatalog);

if (registry.$schema !== "./public-ax-cases.schema.json") {
  failures.push("공개 사례 registry의 $schema 경로가 올바르지 않음");
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(registry.verified_at ?? "")) {
  failures.push("공개 사례 registry의 verified_at 형식 오류");
}
if (!Array.isArray(registry.cases) || registry.cases.length !== 25) {
  failures.push("공개 사례 registry는 국내 10개와 해외 15개, 모두 25개여야 함");
}

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
  ]) {
    if (!content.includes(item.id)) failures.push(`${item.id}: ${name}에서 찾을 수 없음`);
  }
  for (const url of item.source_urls ?? []) {
    sourceUrls.add(url);
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

if (sourceUrls.size !== 26) {
  failures.push(`공개 사례 고유 source URL은 26개여야 함 (현재 ${sourceUrls.size}개)`);
}
for (const [name, content, marker] of [
  ["한국어 카탈로그", koreanCatalog, "26개 고유 원문 URL"],
  ["영문 카탈로그", englishCatalog, "26 unique source URLs"],
]) {
  if (!content.includes(marker)) failures.push(`${name}: 고유 URL 26개 표기 누락`);
  if (/PRIMARY_OFFICIAL|partially_verified/.test(content)) {
    failures.push(`${name}: 폐기한 근거 분류 코드가 남아 있음`);
  }
}

if (failures.length > 0) {
  console.error(`공개 사례 registry 검사 실패 ${failures.length}건`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("공개 사례 registry 통과: 국내 10개, 해외 15개");
