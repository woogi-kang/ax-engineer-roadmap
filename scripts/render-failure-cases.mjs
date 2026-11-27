import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const registryPath = path.join(root, "research/ax-failure-cases.json");
const outputs = { ko: "research/ax-failure-cases.md", en: "en/research/ax-failure-cases.md" };

export const markers = {
  index: ["<!-- failure-case-index:start -->", "<!-- failure-case-index:end -->"],
  records: ["<!-- failure-case-records:start -->", "<!-- failure-case-records:end -->"],
};

const evidenceCodes = { "official-record": "RECORD", "self-acknowledged": "ADMITTED", "press-reported": "PRESS" };

const labels = {
  ko: {
    indexHeader: "| ID | 지역 | 조직 | 업무 | 주요 원인 | 결과 | 근거 |",
    korea: "국내 사례",
    international: "해외 사례",
    heading: (item, domain) => `#### ${item.id}. ${item.organization}: ${domain}`,
    attempted: "바꾸려던 일",
    metric: "판단 지표",
    happened: "일어난 일",
    classification: (causes, outcome, evidence, disclosed) => `- **원인 분류**: ${causes} · 결과 \`${outcome}\` · 근거 \`${evidence}\` · 결과 공개 ${disclosed}`,
    capstone: "캡스톤 점검",
    links: "연결",
    practice: "관련 실습",
    publicCases: "비교할 공개 사례",
    limitations: "한계",
    sources: "출처",
    sourceDates: (published, checked) => `게시 ${published}, 확인 ${checked}`,
    unknownDate: "미상",
    unavailable: "본문 확인 불가",
    sourceType: { ORG: "조직 공식", GOV: "정부 공식", COURT: "판결·결정", UNION: "노조 발표", PRESS: "언론 보도" },
    cause: {
      accuracy: "정확도 미달",
      "ungrounded-answer": "근거 없는 답변",
      "unsafe-output": "유해 출력",
      bias: "편향",
      "data-consent": "데이터 동의 위반",
      "data-leak": "내부 정보 유출",
      "no-permission-boundary": "권한 경계 부재",
      "weak-review": "형식적 검토",
      "escalation-gap": "사람 연결 공백",
      "metric-gap": "지표 공백",
      "premature-scale": "검증 전 확대",
      "integration-drift": "연동 시스템 변경",
      governance: "조달·예산 거버넌스",
      "stakeholder-trust": "이해관계자 수용 실패",
    },
  },
  en: {
    indexHeader: "| ID | Region | Organization | Workflow | Main causes | Outcome | Evidence |",
    korea: "Korean cases",
    international: "International cases",
    heading: (item, domain) => `#### ${item.id}. ${item.organization} — ${domain}`,
    attempted: "What they tried to change",
    metric: "Deciding metric",
    happened: "What happened",
    classification: (causes, outcome, evidence, disclosed) => `- **Classification**: ${causes} · outcome \`${outcome}\` · evidence \`${evidence}\` · outcome public ${disclosed}`,
    capstone: "Capstone check",
    links: "Links",
    practice: "Related practice",
    publicCases: "Public cases to compare",
    limitations: "Limitations",
    sources: "Sources",
    sourceDates: (published, checked) => `published ${published}, checked ${checked}`,
    unknownDate: "unknown",
    unavailable: "body unavailable",
    sourceType: { ORG: "organization", GOV: "government", COURT: "court/tribunal", UNION: "union", PRESS: "press" },
    cause: {
      accuracy: "Accuracy shortfall",
      "ungrounded-answer": "Ungrounded answer",
      "unsafe-output": "Unsafe output",
      bias: "Bias",
      "data-consent": "Data consent",
      "data-leak": "Data leak",
      "no-permission-boundary": "No permission boundary",
      "weak-review": "Weak review",
      "escalation-gap": "Escalation gap",
      "metric-gap": "Metric gap",
      "premature-scale": "Premature scale",
      "integration-drift": "Integration drift",
      governance: "Procurement governance",
      "stakeholder-trust": "Stakeholder trust",
    },
  },
};

const cell = (value) => String(value).replaceAll("|", "\\|");

function label(group, key, context) {
  const value = group[key];
  if (value === undefined) throw new Error(`${context}: no label for "${key}"`);
  return value;
}

const causeNames = (item, l) => item.failure_causes.map((cause) => label(l.cause, cause, item.id)).join(", ");

export function renderIndex(registry, language) {
  const l = labels[language];
  const lines = [l.indexHeader, "|---|---|---|---|---|---|---|"];
  for (const item of registry.cases) {
    lines.push(`| ${[
      item.id,
      item.region,
      cell(item.organization),
      cell(item.domain[language]),
      causeNames(item, l),
      item.outcome.join(" · "),
      label(evidenceCodes, item.failure_evidence, item.id),
    ].join(" | ")} |`);
  }
  return lines.join("\n");
}

function renderCase(item, language) {
  const l = labels[language];
  const links = [];
  if (item.related_case_studies.length) {
    links.push(`${l.practice}: ${item.related_case_studies.map((id) => `[${id}](../case-studies/${id}/README.md)`).join(", ")}`);
  }
  if (item.related_public_cases.length) links.push(`${l.publicCases}: ${item.related_public_cases.join(", ")}`);
  const lines = [
    l.heading(item, item.domain[language]),
    "",
    `- **${l.attempted}**: ${item.attempted_change[language]}`,
    `- **${l.metric}**: ${item.decision_metric[language]}`,
    `- **${l.happened}**: ${item.what_happened[language]}`,
    l.classification(causeNames(item, l), item.outcome.join(" · "), label(evidenceCodes, item.failure_evidence, item.id), item.outcome_disclosed_at ?? l.unknownDate),
    `- **${l.capstone}**: ${item.capstone_check[language]}`,
  ];
  if (links.length) lines.push(`- **${l.links}**: ${links.join(" · ")}`);
  lines.push(`- **${l.limitations}**: ${item.limitations.map((entry) => entry[language]).join(" ")}`, `- **${l.sources}**:`);
  for (const source of item.sources) {
    const details = [label(l.sourceType, source.source_type, item.id), l.sourceDates(source.published_at ?? l.unknownDate, source.checked_at)];
    if (source.access_status !== "read") details.push(l.unavailable);
    lines.push(`  - [${source.publisher}](${source.url}) (${details.join(", ")}): ${source.supports[language]}`);
  }
  return lines.join("\n");
}

export function renderRecords(registry, language) {
  const l = labels[language];
  const korea = registry.cases.filter((item) => item.region === "KR");
  const international = registry.cases.filter((item) => item.region !== "KR");
  const section = (title, items) => [`### ${title}`, ...items.map((item) => renderCase(item, language))].join("\n\n");
  return [section(l.korea, korea), section(l.international, international)].join("\n\n");
}

// The cause table keeps hand-written definitions, so only its labels, counts, and case lists are compared with the registry.
export function causeTableFailures(registry, document, language) {
  const l = labels[language];
  const failures = [];
  const expected = new Map();
  for (const item of registry.cases) {
    for (const cause of item.failure_causes) expected.set(cause, [...(expected.get(cause) ?? []), item.id]);
  }
  const seen = new Set();
  for (const line of document.split("\n")) {
    const cells = line.split("|").slice(1, -1).map((value) => value.trim());
    const match = cells[0]?.match(/^`([a-z-]+)` (.+)$/);
    if (!match || cells.length !== 4) continue;
    const [, cause, name] = match;
    seen.add(cause);
    const ids = expected.get(cause) ?? [];
    if (name !== l.cause[cause]) failures.push(`${language}: cause table label for ${cause} differs from the generator label`);
    if (Number(cells[2]) !== ids.length || cells[3] !== ids.join(", ")) failures.push(`${language}: cause table row for ${cause} does not match the registry (${ids.length}: ${ids.join(", ")})`);
  }
  for (const cause of expected.keys()) if (!seen.has(cause)) failures.push(`${language}: cause table has no row for ${cause}`);
  return failures;
}

export function replaceBlock(source, [startMarker, endMarker], block) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker);
  if (start === -1 || end === -1 || end < start) return null;
  return `${source.slice(0, start)}${startMarker}\n${block}\n${endMarker}${source.slice(end + endMarker.length)}`;
}

function run(check) {
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const failures = [];
  for (const [language, file] of Object.entries(outputs)) {
    const target = path.join(root, file);
    const source = fs.readFileSync(target, "utf8");
    let updated = replaceBlock(source, markers.index, renderIndex(registry, language));
    if (updated !== null) updated = replaceBlock(updated, markers.records, renderRecords(registry, language));
    if (updated === null) failures.push(`${file} has no failure-case markers`);
    else if (check && updated !== source) failures.push(`${file} is out of date; run npm run generate:failure-cases`);
    else if (!check && updated !== source) fs.writeFileSync(target, updated);
    failures.push(...causeTableFailures(registry, updated ?? source, language));
  }
  if (failures.length) {
    for (const failure of failures) console.error(failure);
    process.exit(1);
  }
  console.log(`${check ? "Checked" : "Rendered"} ${registry.cases.length} failure cases in ${Object.keys(outputs).length} catalogs.`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run(process.argv.includes("--check"));
