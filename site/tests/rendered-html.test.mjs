import assert from "node:assert/strict";
import fs from "node:fs";
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
  assert.match(
    html,
    /AX 업무 전환 8단계 · 기술 역량 7개 · 실습 프로젝트 5개 · 업무별 적용 사례 10개/,
  );
  assert.match(html, /<strong>41<\/strong>(?:<!-- -->)?개 항목/);
  assert.match(html, /AX 엔지니어 실행 경로/);
  assert.match(html, /회의 전후 Slack 신호를 승인 가능한 실행 항목으로/);
  assert.match(html, /매출 근거에서 전자세금계산서 발행·입금 대사까지/);
  assert.match(html, /전체 경로/);
  assert.match(html, /조직 준비도/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, />로드맵 시작하기</);
  assert.match(html, />GitHub 저장소</);
  assert.match(html, /aria-expanded="true"/);
  assert.match(html, /그룹 접기/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the English edition from its static route", async () => {
  const response = await render("/en/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<html lang="en"/i);
  assert.match(
    html,
    /An open roadmap for AX Engineers to choose workflows, connect AI to existing systems, carry the work into operations, and explore applied AX cases\./,
  );
  assert.match(html, /An open roadmap for AX Engineers/);
  assert.match(html, /Choose the workflow\. Carry it into operations\./);
  assert.match(
    html,
    /8 transformation stages · 7 technical capabilities · 5 practice projects · 10 applied AX cases/,
  );
  assert.match(html, /AX Engineer path/);
  assert.match(html, /From Slack Meeting Signals to Human-Approved Actions/);
  assert.match(
    html,
    /From sales evidence to electronic tax invoice and payment reconciliation/,
  );
  assert.match(html, /Complete path/);
  assert.match(html, /Organization readiness/);
  assert.doesNotMatch(
    html,
    /업무를 고르고 운영까지 이어 가는 AX 엔지니어 로드맵/,
  );
});

test("keeps Korean words intact and scopes long-token wrapping to code", () => {
  const styles = fs.readFileSync(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(styles, /body\s*\{[^}]*overflow-wrap:\s*normal/s);
  assert.match(
    styles,
    /html:lang\(ko\) body\s*\{[^}]*word-break:\s*keep-all/s,
  );
  assert.match(
    styles,
    /code,\s*pre\s*\{[^}]*overflow-wrap:\s*anywhere/s,
  );
});
