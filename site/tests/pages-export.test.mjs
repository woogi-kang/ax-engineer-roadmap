import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const outputDirectory = new URL("../out/", import.meta.url);

test("exports a static GitHub Pages site", () => {
  assert.equal(fs.existsSync(new URL("index.html", outputDirectory)), true);
  assert.equal(fs.existsSync(new URL("en/index.html", outputDirectory)), true);
  assert.equal(fs.existsSync(new URL("404.html", outputDirectory)), true);

  const koreanHtml = fs.readFileSync(
    new URL("index.html", outputDirectory),
    "utf8",
  );
  const englishHtml = fs.readFileSync(
    new URL("en/index.html", outputDirectory),
    "utf8",
  );

  assert.match(koreanHtml, /<html lang="ko"/i);
  assert.match(
    koreanHtml,
    /자동화와 AI 보조를 실제 운영까지 이어 가는 AX Engineer 로드맵/,
  );
  assert.match(koreanHtml, /업무별 적용 사례/);
  assert.match(koreanHtml, /여러 업무 에이전트 운영/);
  assert.match(koreanHtml, /property="og:locale" content="ko_KR"/);
  assert.match(koreanHtml, /href="\/ax-engineer-roadmap\/en\/"/);

  assert.match(englishHtml, /<html lang="en"/i);
  assert.match(
    englishHtml,
    /Choose the workflow\. Carry it into operations\./,
  );
  assert.match(
    englishHtml,
    /An open roadmap for AX Engineers to choose workflows, connect AI to existing systems, carry the work into operations, and explore applied AX cases\./,
  );
  assert.match(englishHtml, /Applied AX cases/);
  assert.match(englishHtml, /Company Agent Operating Layer/);
  assert.match(englishHtml, /property="og:locale" content="en_US"/);
  assert.match(englishHtml, /href="\/ax-engineer-roadmap\/"/);
  assert.doesNotMatch(
    englishHtml,
    /자동화와 AI 보조를 실제 운영까지 이어 가는 AX Engineer 로드맵/,
  );

  for (const html of [koreanHtml, englishHtml]) {
    assert.match(html, /AX Engineer Roadmap/);
    assert.match(html, /\/ax-engineer-roadmap\/_next\/static\//);
    assert.match(html, /href="\/ax-engineer-roadmap\/favicon\.svg"/);
    assert.doesNotMatch(html, /src="\/_next\/static\//);
    assert.doesNotMatch(html, /href="\/_next\/static\//);
  }

  assert.match(
    koreanHtml,
    /content="https:\/\/woogi-kang\.github\.io\/ax-engineer-roadmap\/og-roadmap\.png"/,
  );
});
