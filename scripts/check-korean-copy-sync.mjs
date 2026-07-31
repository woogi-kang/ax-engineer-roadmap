import fs from "node:fs";

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const readme = read("README.md");
const explorer = read("site/app/roadmap-explorer.tsx");
const roadmapData = read("site/app/roadmap-data.ts");
const metadata = read("site/app/site-metadata.ts");
const koreanSiteCopy = `${explorer}\n${roadmapData}\n${metadata}`;

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

const caseTitles = [
  "공개 VOC 반복 문제 → 개선 업무 제안",
  "Slack 회의 → 실행 항목",
  "입사·이동·퇴사 계정·권한 관리",
  "법인카드 거래·영수증 → 전표 초안",
  "전자세금계산서 발행·입금 대사",
  "거래처 등록·계좌 변경 검증",
  "파일·CSV → 검토 가능한 업무 허브(AX Hub)",
  "재고 예외 → 발주·창고 이동안",
  "메일 분류·답변 초안",
  "여러 업무 에이전트 운영",
];

for (const title of caseTitles) {
  if (!readme.includes(title)) {
    throw new Error(`README에서 사례명을 찾을 수 없습니다: ${title}`);
  }
  if (!roadmapData.includes(title)) {
    throw new Error(`인터랙티브 로드맵의 사례명이 README와 다릅니다: ${title}`);
  }
}

const staleTerms = [
  "바꿀 업무",
  "업무를 AX로 바꿔",
  "현업 조합 사례",
  "오픈 로드맵",
];

for (const term of staleTerms) {
  if (readme.includes(term) || koreanSiteCopy.includes(term)) {
    throw new Error(`이전 표현이 남아 있습니다: ${term}`);
  }
}

console.log(`한국어 카피 동기화 통과: 핵심 정의 1개, 사례명 ${caseTitles.length}개`);
