import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { marked } from "marked";

const root = fileURLToPath(new URL("..", import.meta.url));
const leakedMarkdown = [
  ["굵은 글씨", /\*\*[^*\n]+\*\*/g],
  ["이미지", /!\[[^\]\n]*]\([^\n)]+\)/g],
  ["링크", /(?<!!)\[[^\]\n]+]\([^\n)]+\)/g],
];
function normalizedTarget(value) {
  const entities = { "&amp;": "&", "&quot;": '"', "&#39;": "'", "&lt;": "<", "&gt;": ">" };
  const decoded = value.replace(/&(?:amp|quot|lt|gt);|&#39;/g, (entity) => entities[entity]);
  try {
    return new URL(decoded, "https://readme.invalid/").href;
  } catch {
    return null;
  }
}

export function validateReadmeRendering(source, file) {
  const html = marked.parse(source, { gfm: true });
  const failures = [];
  for (const [label, pattern] of leakedMarkdown) {
    for (const match of html.match(pattern) ?? []) {
      failures.push(`${file}: ${label} 구문이 HTML에 그대로 남았습니다: ${match}`);
    }
  }

  const links = [];
  const images = [];
  const strong = [];
  marked.walkTokens(marked.lexer(source, { gfm: true }), (token) => {
    if (token.type === "link") links.push(token);
    if (token.type === "image") images.push(token);
    if (token.type === "strong") strong.push(token);
  });
  if ((html.match(/<h1(?:\s|>)/g) ?? []).length !== 1) failures.push(`${file}: 문서 제목이 하나로 표시되지 않습니다.`);
  if (!/<p>[\s\S]*?<\/p>/.test(html)) failures.push(`${file}: 본문 문단이 표시되지 않습니다.`);
  if (!links.length) failures.push(`${file}: 탐색 링크가 없습니다.`);
  if (!strong.length) failures.push(`${file}: 요약의 강조 표시가 없습니다.`);

  const renderedLinks = new Set([...html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)].map((match) => normalizedTarget(match[1])));
  const renderedImages = new Set([...html.matchAll(/<img\b[^>]*\bsrc="([^"]*)"/g)].map((match) => normalizedTarget(match[1])));
  for (const link of links) {
    const target = normalizedTarget(link.href);
    if (!target || !renderedLinks.has(target)) failures.push(`${file}: 링크가 표시되지 않습니다: ${link.href}`);
  }
  for (const image of images) {
    const target = normalizedTarget(image.href);
    if (!target || !renderedImages.has(target)) failures.push(`${file}: 이미지가 표시되지 않습니다: ${image.href}`);
  }
  for (const token of strong) {
    if (!html.includes(`<strong>${marked.parseInline(token.text)}</strong>`)) failures.push(`${file}: 강조 표시가 렌더링되지 않았습니다: ${token.text}`);
  }
  return failures;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const failures = ["README.md", "en/README.md"].flatMap((file) =>
    validateReadmeRendering(fs.readFileSync(path.join(root, file), "utf8"), file),
  );
  if (failures.length) {
    console.error(`README 렌더링 검사 실패 ${failures.length}건`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
  } else {
    console.log("한영 README 렌더링 통과: 본문·탐색 링크·굵은 글씨·이미지");
  }
}
