import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const registryPath = path.join(root, "research/public-ax-cases.json");
const outputs = { ko: "research/public-ax-cases.md", en: "en/research/public-ax-cases.md" };

export const markers = {
  index: ["<!-- public-case-index:start -->", "<!-- public-case-index:end -->"],
  records: ["<!-- public-case-records:start -->", "<!-- public-case-records:end -->"],
};

const codes = {
  source_type: {
    "organization-official": "ORG",
    "joint-official": "JOINT",
    "vendor-customer-case": "VENDOR",
    "mixed-official-independent": "MIXED",
    "government-report": "GOV",
  },
  deployment_stage: {
    pilot: "PILOT",
    "limited-operation": "LIMITED",
    operation: "LIVE",
    "expanding-operation": "EXPANDING",
    "adjusted-operation": "ADJUSTED",
    unknown: "UNKNOWN",
  },
  outcome_verification: { none: "NONE", "self-reported": "SELF", "cross-checked": "CROSS", "independently-evaluated": "INDEPENDENT" },
};

// Points print in this order. A layout accepts only the points listed for it.
const pointOrder = {
  detailed: [
    "problem", "verified_workflow", "recorded_workflow", "initial_workflow", "later_change", "ai_role", "human_judgment",
    "operating_boundary", "reported_result", "operating_control", "evaluation_method", "roadmap_lesson", "evidence",
  ],
  summary: ["workflow", "practice", "evidence"],
  brief: ["workflow", "evidence"],
};

const labels = {
  ko: {
    indexHeader: "| 번호 | 지역 | 업무·산업 | 공개 조직 | 출처 | 도입 | 성과 |",
    korea: "국내 사례",
    international: "해외 사례",
    points: {
      detailed: {
        problem: "문제",
        verified_workflow: "확인된 흐름",
        recorded_workflow: "기존 기록의 흐름",
        initial_workflow: "초기 흐름과 발표",
        later_change: "이후 확인된 변화",
        ai_role: "AI의 역할",
        human_judgment: "사람의 판단",
        operating_boundary: "운영 경계",
        reported_result: "공개 결과",
        operating_control: "운영 통제",
        evaluation_method: "평가 방식",
        roadmap_lesson: "로드맵에서 배울 점",
        evidence: "근거와 한계",
      },
      summary: { workflow: "공개된 업무", practice: "실습에서 물을 점", evidence: "근거와 한계" },
      brief: { workflow: "업무와 판단", evidence: "근거와 한계" },
    },
    claimRecords: (ids, checked) => `- **주장 기록**: ${ids}. 확인 ${checked}. 세부 기간·표본·방법은 JSON에 기록했다.`,
    briefEvidence: (claim) => `\`${claim.id}\`, 발행 ${claim.published_at ?? "미상"}, 확인 ${claim.checked_at}.`,
    notePrefix: {
      "source-check": (claim) => `원문 대조 \`${claim.id}\` (발행 ${claim.published_at ?? "게시일 미상"}, 확인 ${claim.checked_at}):`,
      review: (claim) => `추가 확인 \`${claim.id}\` (확인 ${claim.checked_at}):`,
      plain: (claim) => `\`${claim.id}\`:`,
    },
    source: "원문",
  },
  en: {
    indexHeader: "| ID | Region | Workflow / industry | Organization | Source | Deployment | Outcome |",
    korea: "Korean cases",
    international: "International cases",
    points: {
      // The English catalog has no operating-boundary, operating-control, or evaluation-method lines.
      detailed: {
        problem: "Problem",
        verified_workflow: "Verified workflow",
        recorded_workflow: "Previously recorded workflow",
        initial_workflow: "Initial workflow and claim",
        later_change: "Later change",
        ai_role: "AI role",
        human_judgment: "Human judgment",
        reported_result: "Reported result",
        roadmap_lesson: "Roadmap lesson",
        evidence: "Evidence limit",
      },
      summary: { workflow: "Reported workflow", practice: "Practice questions", evidence: "Evidence limits" },
      brief: { workflow: "Workflow and judgment", evidence: "Evidence and limits" },
    },
    claimRecords: (ids, checked) => `- **Claim records**: ${ids}. Checked ${checked}; dates, samples, and methods are recorded in JSON.`,
    briefEvidence: (claim) => `\`${claim.id}\`, published ${claim.published_at ?? "unknown"}, checked ${claim.checked_at}.`,
    notePrefix: {
      "source-check": (claim) => `Source check \`${claim.id}\` (${claim.published_at ? `published ${claim.published_at}` : "publication date unknown"}; checked ${claim.checked_at}):`,
      review: (claim) => `Review \`${claim.id}\` (checked ${claim.checked_at}):`,
      plain: (claim) => `\`${claim.id}\`:`,
    },
    source: "Source",
  },
};

const cell = (value) => String(value).replaceAll("|", "\\|");

function label(group, key, context) {
  const value = group[key];
  if (value === undefined) throw new Error(`${context}: no label for "${key}"`);
  return value;
}

export function renderIndex(registry, language) {
  const l = labels[language];
  const lines = [l.indexHeader, "|---|---|---|---|---|---|---|"];
  for (const item of registry.cases) {
    lines.push(`| ${[
      item.id,
      item.region,
      cell(item.workflow[language]),
      cell(item.organization),
      ...Object.keys(codes).map((field) => label(codes[field], item[field], item.id)),
    ].join(" | ")} |`);
  }
  return lines.join("\n");
}

const limitations = (claim, language) => claim.limitations.map((entry) => entry[language]).join(" ");
const sources = (claim, l) => claim.source_urls.map((url, index) => `[${l.source} ${index + 1}](${url})`).join(" · ");
const statement = (claim, language) => claim.statement[language];
const statementWithEvidence = (claim, language, l) => `${statement(claim, language)} ${limitations(claim, language)} ${sources(claim, l)}`;

// A note that names a claim is assembled from that claim, so the claim text is written once.
const noteBody = { "source-check": statement, review: statementWithEvidence, plain: statementWithEvidence };

function renderNote(item, note, language) {
  const l = labels[language];
  const given = ["text", "claim", "style"].filter((key) => note[key] !== undefined).join("+");
  if (given !== "text" && given !== "claim+style") throw new Error(`${item.id}: a note takes either text or a claim with a style`);
  if (note.text) return note.text[language];
  const claim = item.claims.find((entry) => entry.id === note.claim);
  if (!claim) throw new Error(`${item.id}: note refers to unknown claim "${note.claim}"`);
  return `${label(l.notePrefix, note.style, item.id)(claim)} ${label(noteBody, note.style, item.id)(claim, language, l)}`;
}

// The brief layout prints the initial-review claim. A stored point replaces the generated line.
function briefPoint(item, key, language) {
  const l = labels[language];
  const claim = item.claims.find((entry) => entry.kind === "initial-review");
  if (!claim) throw new Error(`${item.id}: the brief layout needs an initial-review claim`);
  return key === "workflow" ? statement(claim, language) : `${l.briefEvidence(claim)} ${limitations(claim, language)} ${sources(claim, l)}`;
}

function renderPoints(item, language) {
  const l = labels[language];
  const { layout, points = {} } = item.catalog;
  const order = label(pointOrder, layout, item.id);
  const unknown = Object.keys(points).find((key) => !order.includes(key));
  if (unknown) throw new Error(`${item.id}: no label for "${unknown}"`);
  const lines = [];
  for (const key of order) {
    const text = points[key] ? points[key][language] : layout === "brief" ? briefPoint(item, key, language) : undefined;
    if (text !== undefined) lines.push(`- **${label(l.points[layout], key, item.id)}**: ${text}`);
  }
  if (layout === "summary") {
    const checked = [...new Set(item.claims.map((claim) => claim.checked_at))].sort().join(", ");
    lines.push(l.claimRecords(item.claims.map((claim) => `\`${claim.id}\``).join(" · "), checked));
  }
  return lines.join("\n");
}

function renderCase(item, language) {
  if (!item.catalog) throw new Error(`${item.id}: no catalog entry`);
  return [
    `### ${item.id}. ${item.catalog.heading?.[language] ?? item.organization}`,
    renderPoints(item, language),
    ...(item.catalog.notes ?? []).map((note) => renderNote(item, note, language)),
  ].join("\n\n");
}

export function renderRecords(registry, language) {
  const l = labels[language];
  const korea = registry.cases.filter((item) => item.region === "KR");
  const international = registry.cases.filter((item) => item.region !== "KR");
  const section = (title, items) => [`## ${title}`, ...items.map((item) => renderCase(item, language))].join("\n\n");
  return [section(l.korea, korea), section(l.international, international)].join("\n\n");
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
    if (updated === null) failures.push(`${file} has no public-case markers`);
    else if (check && updated !== source) failures.push(`${file} is out of date; run npm run generate:public-cases`);
    else if (!check && updated !== source) fs.writeFileSync(target, updated);
  }
  if (failures.length) {
    for (const failure of failures) console.error(failure);
    process.exit(1);
  }
  console.log(`${check ? "Checked" : "Rendered"} ${registry.cases.length} public cases in ${Object.keys(outputs).length} catalogs.`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run(process.argv.includes("--check"));
