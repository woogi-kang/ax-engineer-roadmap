import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { validateSchemaValue } from "./check-public-cases.mjs";

function tableRows(content) {
  const rows = new Map();
  for (const line of content.split("\n")) {
    const cells = line.split("|").slice(1, -1).map((value) => value.trim());
    if (cells.length !== 7 || !/^F[KG]\d{2}$/.test(cells[0] ?? "")) continue;
    rows.set(cells[0], { outcome: cells[5], evidence: cells[6] });
  }
  return rows;
}

const evidenceCodes = {
  "official-record": "RECORD",
  "self-acknowledged": "ADMITTED",
  "press-reported": "PRESS",
};

export function validateFailureCases({ registry, schema, publicCases, koreanDoc, englishDoc, knownCaseIds }) {
  const failures = validateSchemaValue(registry, schema, "registry");
  if (failures.length) return failures;
  const publicById = new Map(publicCases.cases.map((item) => [item.id, item]));
  const koreanRows = tableRows(koreanDoc);
  const englishRows = tableRows(englishDoc);
  const ids = new Set();

  for (const id of registry.existing_catalog_cases) {
    const item = publicById.get(id);
    if (!item) failures.push(`${id}: 공개 사례 카탈로그에 없는 기존 사례`);
    else if (item.deployment_stage !== "adjusted-operation") failures.push(`${id}: 기존 사례가 운영 조정(ADJUSTED)으로 분류되지 않음`);
    for (const [name, content] of [["한국어 문서", koreanDoc], ["영문 문서", englishDoc]]) {
      if (!content.includes(id)) failures.push(`${id}: ${name}에서 기존 사례 참조 누락`);
    }
  }

  for (const item of registry.cases) {
    if (ids.has(item.id)) failures.push(`${item.id}: 중복 ID`);
    ids.add(item.id);
    if (item.id.startsWith("FK") !== (item.region === "KR")) failures.push(`${item.id}: ID와 지역이 다름`);
    if (item.outcome_disclosed_at && item.outcome_disclosed_at > registry.checked_at) failures.push(`${item.id}: 결과 공개일이 확인일보다 늦음`);
    if (!item.sources.some((source) => source.access_status === "read")) failures.push(`${item.id}: 직접 읽은 출처가 없음`);
    for (const id of item.related_public_cases) {
      if (!publicById.has(id)) failures.push(`${item.id}: 존재하지 않는 공개 사례 ${id}`);
    }
    for (const caseId of item.related_case_studies) {
      if (!knownCaseIds.has(caseId)) failures.push(`${item.id}: 존재하지 않는 실습 사례 ${caseId}`);
    }
    const urls = new Set();
    for (const source of item.sources) {
      if (urls.has(source.url)) failures.push(`${item.id}: 출처 URL 중복`);
      urls.add(source.url);
      if (source.checked_at > registry.checked_at) failures.push(`${item.id}: 출처 확인일이 레지스트리 확인일보다 늦음`);
      if (source.published_at && source.published_at > source.checked_at) failures.push(`${item.id}: 게시일이 확인일보다 늦음`);
      if (source.access_status !== "read" && item.sources.length === 1) failures.push(`${item.id}: 읽지 못한 출처만으로 사례를 기록함`);
      for (const [name, content] of [["한국어 문서", koreanDoc], ["영문 문서", englishDoc]]) {
        if (!content.includes(source.url)) failures.push(`${item.id}: ${name}에 출처 URL 누락`);
      }
    }
    const expectedOutcome = item.outcome.join(" · ");
    for (const [name, rows] of [["한국어 문서", koreanRows], ["영문 문서", englishRows]]) {
      const row = rows.get(item.id);
      if (!row) { failures.push(`${item.id}: ${name} 요약표 행 누락`); continue; }
      if (row.outcome !== expectedOutcome) failures.push(`${item.id}: ${name} 결과 코드가 registry와 다름`);
      if (row.evidence !== evidenceCodes[item.failure_evidence]) failures.push(`${item.id}: ${name} 근거 코드가 registry와 다름`);
    }
  }

  const korea = registry.cases.filter((item) => item.region === "KR").length;
  const international = registry.cases.length - korea;
  if (!koreanDoc.includes(`국내 ${korea}건, 해외 ${international}건`)) failures.push("한국어 문서: 지역별 사례 수 표기 불일치");
  if (!englishDoc.includes(`${korea} Korean and ${international} international cases`)) failures.push("영문 문서: 지역별 사례 수 표기 불일치");
  for (const [name, content] of [["한국어 문서", koreanDoc], ["영문 문서", englishDoc]]) {
    if (!content.includes(registry.checked_at)) failures.push(`${name}: 확인일 표기 누락`);
    for (const row of tableRows(content).keys()) if (!ids.has(row)) failures.push(`${name}: registry에 없는 사례 ${row}`);
  }
  return failures;
}

export function loadFailureCaseInputs(root = process.cwd()) {
  const read = (...parts) => fs.readFileSync(path.join(root, ...parts), "utf8");
  return {
    registry: JSON.parse(read("research", "ax-failure-cases.json")),
    schema: JSON.parse(read("research", "ax-failure-cases.schema.json")),
    publicCases: JSON.parse(read("research", "public-ax-cases.json")),
    koreanDoc: read("research", "ax-failure-cases.md"),
    englishDoc: read("en", "research", "ax-failure-cases.md"),
    knownCaseIds: new Set(fs.readdirSync(path.join(root, "case-studies"), { withFileTypes: true }).filter((entry) => entry.isDirectory() && entry.name !== "_schema").map((entry) => entry.name)),
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const inputs = loadFailureCaseInputs();
  const failures = validateFailureCases(inputs);
  if (failures.length) {
    console.error(`실패·중단 사례 registry 검사 실패 ${failures.length}건`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
  } else {
    const kr = inputs.registry.cases.filter((item) => item.region === "KR").length;
    const urls = new Set(inputs.registry.cases.flatMap((item) => item.sources.map((source) => source.url)));
    console.log(`실패·중단 사례 registry 통과: 국내 ${kr}건, 해외 ${inputs.registry.cases.length - kr}건; 출처 ${urls.size}개; 기존 카탈로그 참조 ${inputs.registry.existing_catalog_cases.join(", ")}`);
  }
}
