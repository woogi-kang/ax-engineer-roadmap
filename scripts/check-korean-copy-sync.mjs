import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { marked } from "marked";

const root = fileURLToPath(new URL("..", import.meta.url));
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const navigation = [
  "roadmap/role-model.md",
  "learning-paths/entry-routes.md",
  "case-studies/beauty-d2c-voc/RUNBOOK.md",
  "research/ax-engineer-role-review.md",
  "case-studies/README.md",
  "projects/README.md",
];
const staleTerms = [
  "업무를 AX로 바꿔",
  "현업 조합 사례",
  "오픈 로드맵",
  "공개 실행·평가",
];

function localLinks(source, file) {
  const links = new Set();
  marked.walkTokens(marked.lexer(source, { gfm: true }), (token) => {
    if (token.type !== "link" || /^(?:[a-z][a-z\d+.-]*:|#|\/\/)/i.test(token.href)) return;
    const target = token.href.split("#")[0];
    links.add(path.resolve(root, path.dirname(file), decodeURIComponent(target)));
  });
  return links;
}

function hasOpeningDefinition(source) {
  for (const token of marked.lexer(source, { gfm: true })) {
    if (token.type === "heading" && token.depth === 2) break;
    if (token.type !== "paragraph") continue;
    const text = marked.parseInline(token.text).replace(/<[^>]*>/g, "").trim();
    const roleName = /^(?:An?\s+)?AX\s+(?:Engineer|엔지니어)(?![A-Za-z])/i;
    if (roleName.test(text) && text.replace(roleName, "").trim().length > 0) return true;
  }
  return false;
}

export function validateReadmeCopy({ readmes, indexes, cases, koreanSources }) {
  const failures = [];
  const runnable = cases.filter((item) => item.evidence_stage === "public-simulation").length;
  const designs = cases.filter((item) => item.evidence_stage === "simulation-design").length;
  if (!cases.length) failures.push("검사할 사례 메타데이터가 없습니다.");
  if (runnable + designs !== cases.length) {
    failures.push("현재 사례에는 README의 두 요약 분류에 없는 근거 단계가 있습니다. 요약 범위를 확인하세요.");
  }

  for (const [language, file] of [["ko", "README.md"], ["en", "en/README.md"]]) {
    const source = readmes[language];
    const links = localLinks(source, file);
    const languageRoot = language === "en" ? "en" : "";
    for (const target of navigation) {
      if (!links.has(path.resolve(root, languageRoot, target))) {
        failures.push(`${file}: 핵심 탐색 링크가 없습니다: ${target}`);
      }
    }
    if (!hasOpeningDefinition(source)) {
      failures.push(`${file}: 첫 안내 부분에 AX Engineer 설명 문단이 없습니다.`);
    }
    const summary = language === "ko"
      ? /실행 예제\s*\*\*(\d+)개\*\*\s*·\s*설계 문서\s*\*\*(\d+)개\*\*/g
      : /Runnable example:\s*\*\*(\d+)\*\*\s*·\s*Design documents:\s*\*\*(\d+)\*\*/g;
    const summaries = [...source.matchAll(summary)];
    if (summaries.length !== 1 || Number(summaries[0][1]) !== runnable || Number(summaries[0][2]) !== designs) {
      failures.push(`${file}: 사례 요약이 메타데이터와 다릅니다. 실행 예제 ${runnable}개, 설계 문서 ${designs}개여야 합니다.`);
    }
    const indexFile = `${languageRoot ? `${languageRoot}/` : ""}case-studies/README.md`;
    const indexLinks = localLinks(indexes[language], indexFile);
    for (const item of cases) {
      if (!indexLinks.has(path.resolve(root, languageRoot, "case-studies", item.id, "README.md"))) {
        failures.push(`${indexFile}: 사례 링크가 없습니다: ${item.id}`);
      }
    }
  }

  for (const { file, source } of koreanSources) {
    for (const term of staleTerms) {
      if (source.includes(term)) failures.push(`${file}: 이전 표현이 남아 있습니다: ${term}`);
    }
  }
  return failures;
}

export function loadReadmeCopyInputs() {
  const cases = fs.readdirSync(path.join(root, "case-studies"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== "_schema")
    .sort((left, right) => left.name.localeCompare(right.name))
    .map((entry) => JSON.parse(read(`case-studies/${entry.name}/case.json`)));
  const koreanSources = [];
  const ignored = new Set([".claude", ".git", ".design-runs", "en", "node_modules", ".next", "dist", "out"]);
  function collect(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (ignored.has(entry.name)) continue;
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) collect(target);
      else if (entry.name.endsWith(".md")) koreanSources.push({ file: path.relative(root, target), source: fs.readFileSync(target, "utf8") });
    }
  }
  collect(root);
  return {
    readmes: { ko: read("README.md"), en: read("en/README.md") },
    indexes: { ko: read("case-studies/README.md"), en: read("en/case-studies/README.md") },
    cases,
    koreanSources,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const inputs = loadReadmeCopyInputs();
  const failures = validateReadmeCopy(inputs);
  if (failures.length) {
    console.error(`문서 요약·탐색 검사 실패 ${failures.length}건`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
  } else {
    console.log(`문서 요약·탐색 통과: 한영 README 2개, 한영 사례 목록 ${inputs.cases.length}개씩`);
  }
}
