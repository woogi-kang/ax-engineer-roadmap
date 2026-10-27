import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const checkOnly = process.argv.includes("--check");
const casesRoot = path.join(root, "case-studies");
const startMarker = "<!-- failure-cases:start -->";
const endMarker = "<!-- failure-cases:end -->";
const boundaryEnd = "<!-- case-boundary:end -->";

const registry = JSON.parse(
  fs.readFileSync(path.join(root, "research", "ax-failure-cases.json"), "utf8"),
);

const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const pattern = new RegExp(`${escape(startMarker)}[\\s\\S]*?${escape(endMarker)}`);

function relatedFailures(caseId) {
  return registry.cases.filter((item) => item.related_case_studies.includes(caseId));
}

function caseBlock(caseId, language) {
  const ko = language === "ko";
  const related = relatedFailures(caseId);
  const link = "../../research/ax-failure-cases.md";
  const lines = [startMarker];
  if (related.length === 0) {
    lines.push(
      ko
        ? `> 실패 사례 점검: [공개 AX 실패·중단 사례](${link})에 이 업무와 직접 연결한 기록은 아직 없다. 설계를 실습으로 옮기기 전에 [캡스톤 설계 점검표](${link}#캡스톤-설계에-쓰는-점검표)의 여덟 질문에 답한다.`
        : `> Failure-case check: The [public AX failure and stop cases](${link}) do not yet link a record directly to this workflow. Before turning this design into practice, answer the eight questions in the [capstone design checklist](${link}#checklist-for-capstone-design).`,
    );
  } else {
    lines.push(
      ko
        ? `> 실패 사례 점검: [공개 AX 실패·중단 사례](${link})에서 이 업무와 연결한 기록이다. 설계를 실습으로 옮기기 전에 아래 항목을 확인하고 나머지는 [캡스톤 설계 점검표](${link}#캡스톤-설계에-쓰는-점검표)로 점검한다.`
        : `> Failure-case check: These records from the [public AX failure and stop cases](${link}) are linked to this workflow. Check the items below before turning this design into practice, and use the [capstone design checklist](${link}#checklist-for-capstone-design) for the rest.`,
      ">",
    );
    for (const item of related) {
      lines.push(
        `> - ${item.id} ${item.organization} (\`${item.outcome.join(" · ")}\`): ${item.capstone_check[language]}`,
      );
    }
  }
  lines.push(endMarker);
  return lines.join("\n");
}

function indexBlock(caseIds, titles, language) {
  const ko = language === "ko";
  const lines = [
    startMarker,
    ko ? "| 사례 | 연결한 실패·중단 사례 |" : "| Case | Linked failure and stop cases |",
    "|---|---|",
  ];
  for (const caseId of caseIds) {
    const related = relatedFailures(caseId);
    const value = related.length
      ? related.map((item) => `${item.id} ${item.organization}`).join(", ")
      : ko
        ? "없음. 공통 점검표 사용"
        : "None yet; use the common checklist";
    lines.push(`| [${titles[caseId]}](${caseId}/README.md) | ${value} |`);
  }
  lines.push(endMarker);
  return lines.join("\n");
}

function withCaseBlock(content, generated, file) {
  if (pattern.test(content)) return content.replace(pattern, generated);
  const boundary = content.indexOf(boundaryEnd);
  if (boundary < 0) throw new Error(`${file}: case-boundary block not found`);
  const nextHeading = content.indexOf("\n## ", boundary);
  if (nextHeading < 0) throw new Error(`${file}: no section after case-boundary block`);
  return `${content.slice(0, nextHeading + 1)}${generated}\n\n${content.slice(nextHeading + 1)}`;
}

function indexTitles(content) {
  const titles = {};
  for (const match of content.matchAll(/^\d+\. \[([^\]]+)\]\(([^/]+)\/README\.md\)$/gm)) {
    titles[match[2]] = match[1];
  }
  return titles;
}

const failures = [];
const write = (file, current, expected) => {
  if (current === expected) return;
  if (checkOnly) failures.push(path.relative(root, file));
  else fs.writeFileSync(file, expected, "utf8");
};

const caseIds = fs
  .readdirSync(casesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== "_schema")
  .map((entry) => entry.name)
  .sort();

for (const caseId of caseIds) {
  for (const [language, file] of [
    ["ko", path.join(casesRoot, caseId, "README.md")],
    ["en", path.join(root, "en", "case-studies", caseId, "README.md")],
  ]) {
    const current = fs.readFileSync(file, "utf8");
    write(file, current, withCaseBlock(current, caseBlock(caseId, language), file));
  }
}

for (const [language, file] of [
  ["ko", path.join(casesRoot, "README.md")],
  ["en", path.join(root, "en", "case-studies", "README.md")],
]) {
  const current = fs.readFileSync(file, "utf8");
  if (!pattern.test(current)) {
    failures.push(`${path.relative(root, file)}: ${startMarker} 블록 없음`);
    continue;
  }
  const titles = indexTitles(current);
  const ordered = caseIds
    .filter((caseId) => titles[caseId])
    .sort((a, b) => current.indexOf(`](${a}/README.md)`) - current.indexOf(`](${b}/README.md)`));
  const missing = caseIds.filter((caseId) => !titles[caseId]);
  if (missing.length) failures.push(`${path.relative(root, file)}: 학습 순서에 없는 사례 ${missing.join(", ")}`);
  write(file, current, current.replace(pattern, indexBlock(ordered, titles, language)));
}

if (failures.length > 0) {
  console.error(`실패 사례 연결 블록 동기화 실패 ${failures.length}건`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  checkOnly
    ? `실패 사례 연결 블록 동기화 통과: ${caseIds.length * 2 + 2}개 문서`
    : `실패 사례 연결 블록 생성 완료: ${caseIds.length * 2 + 2}개 문서`,
);
