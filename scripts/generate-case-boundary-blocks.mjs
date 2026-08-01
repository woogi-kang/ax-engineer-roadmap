import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const checkOnly = process.argv.includes("--check");
const casesRoot = path.join(root, "case-studies");
const startMarker = "<!-- case-boundary:start -->";
const endMarker = "<!-- case-boundary:end -->";

const writeImpactLabels = {
  none: { ko: "외부 쓰기 없음", en: "No external write" },
  "draft-only": { ko: "초안 전용", en: "Draft only" },
  "approved-sandbox-write": {
    ko: "승인 후 샌드박스 쓰기",
    en: "Approved sandbox write",
  },
  "approved-limited-write": {
    ko: "승인 후 제한 쓰기",
    en: "Approved limited write",
  },
  mixed: {
    ko: "초안과 승인 후 제한 쓰기",
    en: "Draft plus approved limited write",
  },
};

function stages(values, language) {
  if (values.length === 0) return language === "ko" ? "없음" : "None";
  return values.map((value) => `P${value}`).join(", ");
}

function block(metadata, language) {
  const ko = language === "ko";
  return [
    startMarker,
    `## ${ko ? "현재 범위와 설계 목표" : "Current scope and designed target"}`,
    "",
    `| ${ko ? "구분" : "Scope"} | ${ko ? "쓰기 영향" : "Write impact"} | ${ko ? "자율성" : "Autonomy"} | ${ko ? "P 단계" : "P stages"} |`,
    "|---|---|---|---|",
    `| ${ko ? "현재 공개 실행물" : "Current public artifact"} | ${writeImpactLabels[metadata.current_write_impact][language]} | ${metadata.current_autonomy} | ${stages(metadata.implemented_project_stages, language)} |`,
    `| ${ko ? "설계 목표" : "Designed target"} | ${writeImpactLabels[metadata.designed_write_impact][language]} | ${metadata.designed_autonomy} | ${stages(metadata.designed_project_stages, language)} |`,
    "",
    ko
      ? "현재 값은 이 저장소에서 재현할 수 있는 범위만 나타낸다. 설계 목표는 아직 구현 범위나 조직 운영 성과가 아니다."
      : "Current values cover only what this repository can reproduce. The designed target is not yet an implemented scope or evidence of organizational outcomes.",
    endMarker,
  ].join("\n");
}

function withBlock(content, generatedBlock) {
  const pattern = new RegExp(
    `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
  );
  if (pattern.test(content)) return content.replace(pattern, generatedBlock);
  const titleEnd = content.indexOf("\n");
  if (titleEnd < 0 || !content.startsWith("# ")) {
    throw new Error("README must start with a level-one title");
  }
  return `${content.slice(0, titleEnd + 1)}\n${generatedBlock}\n${content.slice(titleEnd + 1)}`;
}

const failures = [];
const directories = fs
  .readdirSync(casesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== "_schema")
  .map((entry) => entry.name)
  .sort();

for (const directory of directories) {
  const metadata = JSON.parse(
    fs.readFileSync(path.join(casesRoot, directory, "case.json"), "utf8"),
  );
  for (const [language, file] of [
    ["ko", path.join(casesRoot, directory, "README.md")],
    ["en", path.join(root, "en", "case-studies", directory, "README.md")],
  ]) {
    const current = fs.readFileSync(file, "utf8");
    const expected = withBlock(current, block(metadata, language));
    if (current === expected) continue;
    if (checkOnly) failures.push(path.relative(root, file));
    else fs.writeFileSync(file, expected, "utf8");
  }
}

if (failures.length > 0) {
  console.error(`사례 경계 블록 동기화 실패 ${failures.length}건`);
  failures.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

console.log(
  checkOnly
    ? `사례 경계 블록 동기화 통과: ${directories.length * 2}개 문서`
    : `사례 경계 블록 생성 완료: ${directories.length * 2}개 문서`,
);
