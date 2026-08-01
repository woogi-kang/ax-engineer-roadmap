import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const markdownFiles = [];
const ignored = new Set([
  ".claude",
  ".git",
  ".design-runs",
  ".next",
  ".orchestration",
  ".vinext",
  "dist",
  "node_modules",
  "out",
]);

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target);
    else if (entry.name.endsWith(".md")) markdownFiles.push(target);
  }
}

walk(root);

const references = new Map();
const imagePattern = /!\[[^\]]*]\((https?:\/\/[^)\s]+)\)/g;
const linkPattern = /\[[^\]]*]\((https?:\/\/[^)\s]+)\)/g;
for (const file of markdownFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(imagePattern)) {
    const url = match[1].replace(/\\([()])/g, "$1");
    const files = references.get(url) ?? new Set();
    files.add(path.relative(root, file));
    references.set(url, files);
  }
  const contentWithoutImages = content.replace(imagePattern, "image");
  for (const match of contentWithoutImages.matchAll(linkPattern)) {
    const url = match[1].replace(/\\([()])/g, "$1");
    const files = references.get(url) ?? new Set();
    files.add(path.relative(root, file));
    references.set(url, files);
  }
}

const userAgent =
  "AX-Engineer-Roadmap-Link-Check/1.0 (+https://github.com/woogi-kang/ax-engineer-roadmap)";

async function request(url, method) {
  return fetch(url, {
    method,
    redirect: "follow",
    signal: AbortSignal.timeout(15_000),
    headers: {
      "user-agent": userAgent,
      accept: "text/html,application/xhtml+xml,application/json;q=0.8,*/*;q=0.5",
      ...(method === "GET" ? { range: "bytes=0-2047" } : {}),
    },
  });
}

async function check(url) {
  try {
    let response = await request(url, "HEAD");
    if ([400, 403, 404, 405, 406, 410, 429].includes(response.status)) {
      response = await request(url, "GET");
    }
    return { url, status: response.status, finalUrl: response.url };
  } catch (error) {
    return { url, status: null, error: error instanceof Error ? error.message : String(error) };
  }
}

const urls = [...references.keys()].sort();
const results = [];
const concurrency = 6;
for (let index = 0; index < urls.length; index += concurrency) {
  results.push(...(await Promise.all(urls.slice(index, index + concurrency).map(check))));
}

const broken = results.filter((result) => result.status === 404 || result.status === 410);
function referencesPendingLocalWorkflow(result) {
  try {
    const { hostname, pathname } = new URL(result.url);
    if (hostname !== "github.com") return false;
    const match = pathname.match(
      /^\/woogi-kang\/ax-engineer-roadmap\/actions\/workflows\/([^/]+)(?:\/badge\.svg)?$/,
    );
    return Boolean(
      match && fs.existsSync(path.join(root, ".github", "workflows", decodeURIComponent(match[1]))),
    );
  } catch {
    return false;
  }
}
const allowPendingLocalWorkflow =
  process.env.GITHUB_ACTIONS !== "true" || process.env.GITHUB_EVENT_NAME === "pull_request";
const pending = allowPendingLocalWorkflow ? broken.filter(referencesPendingLocalWorkflow) : [];
const fatalBroken = broken.filter((result) => !pending.includes(result));
const blocked = results.filter(
  (result) =>
    !broken.includes(result) &&
    (result.status === null || result.status < 200 || result.status >= 400),
);
const healthy = results.filter(
  (result) => result.status !== null && result.status >= 200 && result.status < 400,
).length;

for (const result of fatalBroken) {
  console.error(`BROKEN ${result.status} ${result.url}`);
  for (const file of references.get(result.url) ?? []) console.error(`  - ${file}`);
}
for (const result of pending) {
  console.warn(`PENDING ${result.status} ${result.url} (로컬 workflow가 아직 기본 브랜치에 없음)`);
}
for (const result of blocked) {
  console.warn(
    `WARN ${result.status ?? "network"} ${result.url}${result.error ? ` (${result.error})` : ""}`,
  );
}

const summary = `외부 링크 검사: 전체 ${results.length}, 정상 2xx·3xx ${healthy}, 경고 응답 ${blocked.length}, 게시 전 workflow ${pending.length}, 실패 404·410 ${fatalBroken.length}`;
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    `## External link health\n\n${summary}\n\n404·410을 제외한 비정상 응답은 경고로 남기고 수동 검토하며, 명확한 404·410만 실패 처리합니다.\n`,
  );
}
if (fatalBroken.length > 0) process.exit(1);
