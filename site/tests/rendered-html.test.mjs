import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Korean roadmap explorer", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="ko"/i);
  assert.match(html, /<title>AX Engineer Roadmap<\/title>/i);
  assert.match(html, /AX 엔지니어를 위한 오픈 로드맵/);
  assert.match(html, /업무를 고르고 운영까지 이어 가는 AX 엔지니어 로드맵/);
  assert.match(html, /업무 전환 8단계 · 기술 역량 7개 · 실습 프로젝트 5개/);
  assert.match(html, /AX 엔지니어 실행 경로/);
  assert.match(html, /전체 경로/);
  assert.match(html, /조직 준비도/);
  assert.match(html, /aria-live="polite"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the English edition from the language query", async () => {
  const response = await render("/?lang=en");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /An open roadmap for AX Engineers/);
  assert.match(html, /Choose the workflow\. Carry it into operations\./);
  assert.match(html, /8 transformation stages · 7 technical capabilities · 5 practice projects/);
  assert.match(html, /AX Engineer path/);
  assert.match(html, /Complete path/);
  assert.match(html, /Organization readiness/);
});
