import fs from 'node:fs';
import { marked } from 'marked';

const source = fs.readFileSync(new URL('../../README.md', import.meta.url), 'utf8');
const html = marked.parse(source, { gfm: true });
const failures = [];

const leakedMarkdown = [
  ['굵은 글씨', /\*\*[^*\n]+\*\*/g],
  ['이미지', /!\[[^\]\n]*]\([^\n)]+\)/g],
  ['링크', /(?<!!)\[[^\]\n]+]\([^\n)]+\)/g]
];

for (const [label, pattern] of leakedMarkdown) {
  const matches = html.match(pattern) ?? [];
  for (const match of matches) {
    failures.push(`${label} 구문이 HTML에 그대로 남음: ${match}`);
  }
}

if (!html.includes('<strong>공통 운영 기반(harness)</strong>:')) {
  failures.push('공통 운영 기반(harness) 강조 렌더링 실패');
}

if (!html.includes('>Markdown 시작 안내</a>')) {
  failures.push('Markdown 시작 안내 링크 렌더링 실패');
}

if (failures.length > 0) {
  console.error(`README 렌더링 검사 실패 ${failures.length}건`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('README 렌더링 통과: 굵은 글씨·이미지·링크');
