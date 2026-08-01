import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const readme = read("README.md");
const explorer = read("site/app/roadmap-explorer.tsx");
const roadmapData = read("site/app/roadmap-data.ts");
const generatedCases = read("site/app/case-metadata.generated.ts");
const caseIndex = read("case-studies/README.md");
const metadataFiles = fs
  .readdirSync(path.join(root, "case-studies"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== "_schema")
  .map((entry) => `case-studies/${entry.name}/case.json`)
  .sort();

const sharedDefinition =
  "자동화하거나 AI로 보조할 업무를 찾고, 사람이 판단할 지점을 남겨 흐름을 다시 설계";

for (const [name, source] of [
  ["README", readme],
  ["interactive roadmap", explorer],
]) {
  if (!source.includes(sharedDefinition)) {
    throw new Error(`${name}에서 AX Engineer 핵심 정의가 달라졌습니다.`);
  }
}

for (const metadataFile of metadataFiles) {
  const metadata = JSON.parse(read(metadataFile));
  const casePath = `${metadata.id}/README.md`;
  if (!readme.includes(`case-studies/${casePath}`)) {
    throw new Error(`README에서 사례 링크를 찾을 수 없습니다: ${metadata.id}`);
  }
  if (!caseIndex.includes(`(${casePath})`)) {
    throw new Error(`사례 인덱스에서 링크를 찾을 수 없습니다: ${metadata.id}`);
  }
  if (!roadmapData.includes(`"case-${metadata.id}"`)) {
    throw new Error(`인터랙티브 로드맵에서 사례 ID를 찾을 수 없습니다: ${metadata.id}`);
  }
  for (const title of [metadata.title.ko, metadata.title.en]) {
    if (!generatedCases.includes(title)) {
      throw new Error(`생성된 사이트 데이터에서 사례 제목을 찾을 수 없습니다: ${title}`);
    }
  }
}

const staleTerms = [
  "업무를 AX로 바꿔",
  "현업 조합 사례",
  "오픈 로드맵",
  "공개 실행·평가",
];

const koreanSources = [readme, explorer, roadmapData];
function collectKoreanMarkdown(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if ([".claude", ".git", ".design-runs", "en", "node_modules", ".next", "dist", "out"].includes(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) collectKoreanMarkdown(target);
    else if (entry.name.endsWith(".md")) koreanSources.push(fs.readFileSync(target, "utf8"));
  }
}
collectKoreanMarkdown(root);

for (const term of staleTerms) {
  if (koreanSources.some((source) => source.includes(term))) {
    throw new Error(`이전 표현이 남아 있습니다: ${term}`);
  }
}

if (
  !/재현 가능한 공개 시뮬레이션\s*\|\s*1개/.test(readme) ||
  !/실행 설계\s*\|\s*14개/.test(readme)
) {
  throw new Error("README의 사례 근거 분포가 현재 metadata와 다릅니다.");
}

console.log(`한국어 카피 동기화 통과: 핵심 정의 1개, 사례 ${metadataFiles.length}개`);
