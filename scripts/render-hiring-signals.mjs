import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const registryPath = path.join(root, "research/hiring-signals.json");
const outputs = { ko: "research/hiring-signals.md", en: "en/research/hiring-signals.md" };

export const markers = ["<!-- hiring-signals:start -->", "<!-- hiring-signals:end -->"];

const labels = {
  ko: {
    indexHeader: "| ID | 회사 | 원문 직함 | 역할 범위 | 페이지의 모집 표시 |",
    scope: { "internal-ax": "내부 AX", "customer-delivery": "고객 딜리버리", "pre-sales": "Pre-sales", hybrid: "혼합", unknown: "미분류" },
    availability: { open: "모집 표시 확인", closed: "마감 표시 확인", unknown: "미확인", conflicting: "상충" },
    temporal: {
      "dated-recent": "게시일 확인된 최근 공고",
      "newly-found-older": "게시일이 비교 기준일 이전인 공고",
      undated: "게시일 미상",
      historical: "과거 기록",
    },
    authority: { "company-official": "기업·기관 공식 또는 ATS", "employer-platform": "채용 플랫폼", secondary: "2차 자료" },
    access: { read: "본문 확인", blocked: "접근 차단", unavailable: "본문 확인 불가", "search-only": "검색 결과만 확인" },
    location: (place, recordId) => `- 지역: ${place}. 기록 ID: \`${recordId}\`.`,
    unknownLocation: "미확인",
    classification: "구분",
    responsibilities: "핵심 책임",
    required: "필수·제시 요건",
    preferred: "우대 요약",
    noRequired: "확인된 목록 없음.",
    noPreferred: "확인된 별도 목록 없음.",
    limitations: "한계",
    projects: "실습 연결",
    dates: (source, unknown) => `발행 ${source.published_at ?? unknown} / 마감 ${source.closing_date ?? unknown} / 확인 ${source.checked_at}`,
    unknownDate: "미상",
    related: "상태 집계에서 제외한 관련 자료",
    notFound: "이전 주소 · 404 확인 기록",
    notFoundRecord: "검사 기록",
  },
  en: {
    indexHeader: "| ID | Employer | Original title | Role scope | Observed availability |",
    scope: { "internal-ax": "Internal AX", "customer-delivery": "Customer delivery", "pre-sales": "Pre-sales", hybrid: "Hybrid", unknown: "Unclassified" },
    availability: { open: "Open indication observed", closed: "Closed indication observed", unknown: "Unverified", conflicting: "Conflicting" },
    temporal: {
      "dated-recent": "Dated publication in the window",
      "newly-found-older": "Dated publication before the window",
      undated: "Publication date unknown",
      historical: "Historical record",
    },
    authority: { "company-official": "Company/institution or official ATS", "employer-platform": "Recruitment platform", secondary: "Secondary source" },
    access: { read: "Body read", blocked: "Access blocked", unavailable: "Body unavailable", "search-only": "Search result only" },
    location: (place, recordId) => `- Location: ${place}. Record ID: \`${recordId}\`.`,
    unknownLocation: "unverified",
    classification: "Scope",
    responsibilities: "Responsibilities",
    required: "Required or listed qualifications",
    preferred: "Preferences",
    noRequired: "No list verified.",
    noPreferred: "No separate list verified.",
    limitations: "Limits",
    projects: "Practice links",
    dates: (source, unknown) => `Published ${source.published_at ?? unknown} / closes ${source.closing_date ?? unknown} / checked ${source.checked_at}`,
    unknownDate: "unknown",
    related: "Related material excluded from availability aggregation",
    notFound: "Historical URL · observed 404",
    notFoundRecord: "Check record",
  },
};

const cell = (value) => String(value).replaceAll("|", "\\|");

function label(group, key, context) {
  const value = group[key];
  if (value === undefined) throw new Error(`${context}: no label for "${key}"`);
  return value;
}

function projectLink(projectPath) {
  const number = path.basename(projectPath).match(/^(\d+)-/)?.[1];
  if (!number) throw new Error(`${projectPath}: project files must start with a number`);
  return `[P${Number(number)}](../${projectPath})`;
}

export function renderRecords(registry, language) {
  const l = labels[language];
  const text = (items) => items.map((item) => item[language]).join(" ");
  const lines = [l.indexHeader, "|---|---|---|---|---|"];
  for (const posting of registry.postings) {
    lines.push(`| ${[
      `[${posting.id}](#${posting.id.toLowerCase()})`,
      cell(posting.company),
      cell(posting.title_original),
      label(l.scope, posting.role_scope, posting.id),
      label(l.availability, posting.availability, posting.id),
    ].join(" | ")} |`);
  }
  for (const posting of registry.postings) {
    lines.push(
      "",
      `### ${posting.id}`,
      "",
      `**${posting.company} / ${posting.title_original}**`,
      "",
      posting.summary[language],
      "",
      l.location(posting.location ?? l.unknownLocation, posting.canonical_job_id),
      `- ${l.classification}: ${[
        label(l.scope, posting.role_scope, posting.id),
        label(l.availability, posting.availability, posting.id),
        label(l.temporal, posting.temporal_class, posting.id),
      ].join(" · ")}.`,
      `- ${l.responsibilities}: ${text(posting.responsibilities)}`,
      `- ${l.required}: ${posting.required_qualifications.length ? text(posting.required_qualifications) : l.noRequired}`,
      `- ${l.preferred}: ${posting.preferred_qualifications.length ? text(posting.preferred_qualifications) : l.noPreferred}`,
      `- ${l.limitations}: ${text(posting.limitations)}`,
      `- ${l.projects}: ${posting.related_projects.map(projectLink).join(" · ")}`,
      "",
    );
    for (const source of posting.sources) {
      lines.push(
        `- \`${source.id}\` [${label(l.authority, source.authority, source.id)}](${source.url}): ${[
          label(l.access, source.access_status, source.id),
          label(l.availability, source.availability, source.id),
        ].join(" · ")}. ${l.dates(source, l.unknownDate)}. ${source.note[language]}`,
      );
    }
    for (const related of posting.related_sources ?? []) {
      lines.push(
        related.not_found_record_url
          ? `- ${l.notFound}: \`${related.url}\`: ${related.note[language]} [${l.notFoundRecord}](${related.not_found_record_url})`
          : `- [${l.related}](${related.url}): ${related.note[language]}`,
      );
    }
  }
  return lines.join("\n");
}

export function replaceBlock(source, block) {
  const start = source.indexOf(markers[0]);
  const end = source.indexOf(markers[1]);
  if (start === -1 || end === -1 || end < start) return null;
  return `${source.slice(0, start)}${markers[0]}\n${block}\n${markers[1]}${source.slice(end + markers[1].length)}`;
}

function run(check) {
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const failures = [];
  for (const [language, file] of Object.entries(outputs)) {
    const target = path.join(root, file);
    const source = fs.readFileSync(target, "utf8");
    const updated = replaceBlock(source, renderRecords(registry, language));
    if (updated === null) failures.push(`${file} has no hiring-signals markers`);
    else if (check && updated !== source) failures.push(`${file} is out of date; run npm run generate:hiring-signals`);
    else if (!check && updated !== source) fs.writeFileSync(target, updated);
  }
  if (failures.length) {
    for (const failure of failures) console.error(failure);
    process.exit(1);
  }
  console.log(`${check ? "Checked" : "Rendered"} ${registry.postings.length} hiring records in ${Object.keys(outputs).length} catalogs.`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run(process.argv.includes("--check"));
