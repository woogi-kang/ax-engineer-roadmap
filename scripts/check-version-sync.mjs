import fs from "node:fs";

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const rootPackage = readJson("package.json");
const sitePackage = readJson("site/package.json");
const siteLock = readJson("site/package-lock.json");
const version = rootPackage.version;
const failures = [];

for (const [name, value] of [
  ["site/package.json", sitePackage.version],
  ["site/package-lock.json", siteLock.version],
  ["site/package-lock.json root package", siteLock.packages?.[""]?.version],
]) {
  if (value !== version) failures.push(`${name}: ${value ?? "missing"} (expected ${version})`);
}

for (const file of ["README.md", "en/README.md", "site/app/roadmap-explorer.tsx"]) {
  if (!fs.readFileSync(file, "utf8").includes(`v${version}`)) {
    failures.push(`${file}: v${version} 표기 누락`);
  }
}

for (const file of ["CHANGELOG.md", "en/CHANGELOG.md"]) {
  if (!fs.readFileSync(file, "utf8").includes(`## [${version}]`)) {
    failures.push(`${file}: ${version} 릴리스 항목 누락`);
  }
}

const koreanChangelog = fs.readFileSync("CHANGELOG.md", "utf8");
const englishChangelog = fs.readFileSync("en/CHANGELOG.md", "utf8");
const escapedVersion = version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const isKoreanCandidate = new RegExp(
  `^## \\[${escapedVersion}\\] - \\d{4}-\\d{2}-\\d{2} \\(릴리스 후보\\)$`,
  "m",
).test(koreanChangelog);
const isEnglishCandidate = new RegExp(
  `^## \\[${escapedVersion}\\] - \\d{4}-\\d{2}-\\d{2} \\(release candidate\\)$`,
  "m",
).test(englishChangelog);
if (isKoreanCandidate !== isEnglishCandidate) {
  failures.push("CHANGELOG 후보 상태가 한영 문서에서 다름");
}
if (isKoreanCandidate) {
  for (const [file, marker] of [
    ["README.md", `다음 릴리스 후보: \`v${version}\``],
    ["en/README.md", `Next release candidate: \`v${version}\``],
    ["site/app/roadmap-explorer.tsx", `v${version} release candidate`],
  ]) {
    if (!fs.readFileSync(file, "utf8").includes(marker)) {
      failures.push(`${file}: 후보 상태 표기 누락`);
    }
  }
}

if (failures.length > 0) {
  console.error(`버전 동기화 실패 ${failures.length}건`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`버전 동기화 통과: v${version}`);
