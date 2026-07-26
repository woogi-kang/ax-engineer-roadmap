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
  assert.match(html, /범용 AX 코어 · 한국 조직 맥락/);
  assert.match(html, /다른 환경에서도 재사용할 수 있는 AX 업무 전환 원칙/);
  assert.match(html, /역할에서 시작해 운영 증거로 끝내는 AX 로드맵/);
  assert.match(html, /전체 경로/);
  assert.match(html, /조직 준비도/);
  assert.match(html, /aria-live="polite"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the English edition from the language query", async () => {
  const response = await render("/?lang=en");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Universal AX core · Korean organizational context/);
  assert.match(html, /reuse across markets/);
  assert.match(html, /Start with responsibility\. Finish with operating evidence\./);
  assert.match(html, /Complete path/);
  assert.match(html, /Organization readiness/);
});
