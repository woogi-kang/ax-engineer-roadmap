"use client";

import { useEffect, useMemo, useState } from "react";
import {
  type Language,
  type Readiness,
  type Role,
  readinessLabels,
  roadmapGroups,
  roleLabels,
} from "./roadmap-data";

const repositoryUrl = "https://github.com/woogi-kang/ax-engineer-roadmap-kr";

const copy = {
  ko: {
    skip: "로드맵으로 바로가기",
    version: "공개본 v0.2.0",
    repository: "GitHub 저장소",
    docs: "Markdown 문서",
    title: "역할에서 시작해 운영 증거로 끝내는 AX 로드맵",
    intro:
      "비개발 실무자와 개발자, 리더, 데이터·보안·운영 담당자가 같은 업무 전환을 서로 다른 책임에서 탐색합니다.",
    scope: "6개 지도 · 4개 역할 · 7개 기술 기반 · 5개 증거 프로젝트",
    filterTitle: "내 시작점",
    filterHelp: "역할과 현재 업무의 준비 상태를 선택하면 관련 경로만 남습니다.",
    roleLegend: "주된 책임",
    readinessLegend: "조직 준비 상태",
    searchLabel: "로드맵 검색",
    searchPlaceholder: "예: 승인, RAG, 복구",
    reset: "선택 초기화",
    summaryTitle: "추천 시작 방식",
    roleSummary: {
      all: "전체 구조를 훑은 뒤 실제 책임과 증거가 부족한 노드부터 시작하세요.",
      practitioner: "업무 흐름과 검수 기준을 먼저 만들고 외부 실행 없는 보조 도구로 증명하세요.",
      builder: "기술 목록보다 평가·권한·복구가 포함된 얇은 업무 흐름을 먼저 배포하세요.",
      leader: "우선순위와 중단 기준을 합의하고 두 번째 업무의 재사용 전에는 전사 표준을 서두르지 마세요.",
      guardian: "데이터 사용과 실행 권한, 관측, 수동 대체를 발견 단계부터 공동 설계하세요.",
    },
    readinessSummary: {
      all: "업무마다 준비 상태가 다를 수 있습니다.",
      it: "API가 있어도 승인·복구·채택이 없으면 운영 준비가 끝난 것이 아닙니다.",
      saas: "계정 소유권, 내보내기, 식별자, 권한과 변경 기록을 먼저 맞추세요.",
      low: "AI보다 최소 업무 기록, 입력 규격, 책임자와 예외 흐름부터 만드세요.",
    },
    roadmapTitle: "전체 경로",
    resultUnit: "개 노드",
    evidence: "남길 증거",
    openDoc: "문서 열기",
    emptyTitle: "조건에 맞는 노드가 없습니다",
    emptyBody: "검색어를 지우거나 역할·준비 상태를 넓혀 보세요.",
    clearSearch: "검색어 지우기",
    principleTitle: "공통 하네스는 첫 단계가 아니라 검증된 결과입니다.",
    principleBody:
      "입력·출력·평가·승인·기록·복구 계약을 첫 업무에서 만들고, 두 번째 업무에서 실제 재사용된 부분만 공통 기반으로 올립니다.",
    footer: "Markdown이 기준 문서이며, 이 화면은 탐색을 돕는 표현 계층입니다.",
    korean: "한국어",
    english: "English",
    navLabel: "주요 링크",
    languageLabel: "언어 선택",
  },
  en: {
    skip: "Skip to roadmap",
    version: "Public release v0.2.0",
    repository: "GitHub repository",
    docs: "Markdown docs",
    title: "Start with responsibility. Finish with operating evidence.",
    intro:
      "Business practitioners, developers, leaders, and data, security, and operations owners explore the same transformation from different responsibilities.",
    scope: "6 maps · 4 roles · 7 technical foundations · 5 evidence projects",
    filterTitle: "Your starting point",
    filterHelp: "Select a role and current readiness to keep only the relevant path.",
    roleLegend: "Primary responsibility",
    readinessLegend: "Organization readiness",
    searchLabel: "Search roadmap",
    searchPlaceholder: "Try approval, RAG, recovery",
    reset: "Reset selection",
    summaryTitle: "Recommended approach",
    roleSummary: {
      all: "Scan the full structure, then begin where your responsibility lacks verifiable evidence.",
      practitioner: "Map the workflow and acceptance first, then prove it with assistance that takes no external action.",
      builder: "Deploy a thin workflow with evaluation, permissions, and recovery before collecting technologies.",
      leader: "Agree on priority and stop criteria, and wait for second-workflow reuse before standardizing.",
      guardian: "Co-design data use, action authority, observability, and fallback from discovery onward.",
    },
    readinessSummary: {
      all: "Readiness can differ by workflow.",
      it: "APIs do not replace approval, recovery, and adoption readiness.",
      saas: "Align account ownership, export, identifiers, permissions, and change history first.",
      low: "Create minimum workflow records, input rules, owners, and exception flow before AI.",
    },
    roadmapTitle: "Complete path",
    resultUnit: "nodes",
    evidence: "Evidence to leave",
    openDoc: "Open document",
    emptyTitle: "No nodes match these conditions",
    emptyBody: "Clear the search or broaden the role and readiness filters.",
    clearSearch: "Clear search",
    principleTitle: "A shared harness is validated evidence, not the first step.",
    principleBody:
      "Create input, output, evaluation, approval, record, and recovery contracts in the first workflow. Promote only what is actually reused in a second workflow.",
    footer: "Markdown is the source of truth. This interface is a navigation layer.",
    korean: "한국어",
    english: "English",
    navLabel: "Primary links",
    languageLabel: "Language",
  },
};

const roleKeys: Role[] = ["all", "practitioner", "builder", "leader", "guardian"];
const readinessKeys: Readiness[] = ["all", "it", "saas", "low"];

function localized(value: { ko: string; en: string }, language: Language) {
  return value[language];
}

export function RoadmapExplorer({
  initialLanguage,
}: {
  initialLanguage: Language;
}) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [role, setRole] = useState<Role>("all");
  const [readiness, setReadiness] = useState<Readiness>("all");
  const [query, setQuery] = useState("");
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const filteredGroups = useMemo(() => {
    const locale = language === "ko" ? "ko-KR" : "en-US";
    const normalizedQuery = query.trim().toLocaleLowerCase(locale);

    return roadmapGroups
      .map((group) => ({
        ...group,
        nodes: group.nodes.filter((roadmapNode) => {
          const roleMatches =
            role === "all" || roadmapNode.roles.includes(role);
          const readinessMatches =
            readiness === "all" || roadmapNode.readiness.includes(readiness);
          const searchableText = [
            localized(roadmapNode.title, language),
            localized(roadmapNode.description, language),
            localized(roadmapNode.evidence, language),
            localized(group.label, language),
          ]
            .join(" ")
            .toLocaleLowerCase(locale);

          return (
            roleMatches &&
            readinessMatches &&
            (normalizedQuery.length === 0 ||
              searchableText.includes(normalizedQuery))
          );
        }),
      }))
      .filter((group) => group.nodes.length > 0);
  }, [language, query, readiness, role]);

  const resultCount = filteredGroups.reduce(
    (total, group) => total + group.nodes.length,
    0,
  );
  const hasSelection = role !== "all" || readiness !== "all" || query !== "";

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    const url = new URL(window.location.href);
    if (nextLanguage === "en") {
      url.searchParams.set("lang", "en");
    } else {
      url.searchParams.delete("lang");
    }
    window.history.replaceState({}, "", url);
  }

  function reset() {
    setRole("all");
    setReadiness("all");
    setQuery("");
  }

  function documentUrl(path: string) {
    return `${repositoryUrl}/blob/main/${language === "en" ? `en/${path}` : path}`;
  }

  return (
    <>
      <a className="skip-link" href="#roadmap">
        {t.skip}
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="AX Engineer Roadmap Korea">
          <span aria-hidden="true">AX/RM</span>
          <span className="wordmark-text">Engineer Roadmap Korea</span>
        </a>
        <nav className="header-actions" aria-label={t.navLabel}>
          <span className="version">{t.version}</span>
          <a href={repositoryUrl}>{t.repository}</a>
          <a
            href={`${repositoryUrl}/blob/main/${language === "en" ? "en/README.md" : "README.md"}`}
          >
            {t.docs}
          </a>
          <div className="language-switch" aria-label={t.languageLabel}>
            <button
              type="button"
              aria-pressed={language === "ko"}
              onClick={() => changeLanguage("ko")}
            >
              {t.korean}
            </button>
            <button
              type="button"
              aria-pressed={language === "en"}
              onClick={() => changeLanguage("en")}
            >
              {t.english}
            </button>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="intro" aria-labelledby="page-title">
          <div>
            <p className="eyebrow">AX Engineer Roadmap Korea</p>
            <h1 id="page-title">{t.title}</h1>
          </div>
          <div className="intro-copy">
            <p>{t.intro}</p>
            <p className="scope-line">{t.scope}</p>
          </div>
        </section>

        <div className="workspace">
          <aside className="filters" aria-labelledby="filter-title">
            <div className="filter-heading">
              <h2 id="filter-title">{t.filterTitle}</h2>
              <p>{t.filterHelp}</p>
            </div>

            <fieldset>
              <legend>{t.roleLegend}</legend>
              <div className="choice-list">
                {roleKeys.map((roleKey) => (
                  <button
                    className="choice"
                    type="button"
                    key={roleKey}
                    aria-pressed={role === roleKey}
                    onClick={() => setRole(roleKey)}
                  >
                    {localized(roleLabels[roleKey], language)}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>{t.readinessLegend}</legend>
              <div className="choice-list">
                {readinessKeys.map((readinessKey) => (
                  <button
                    className="choice"
                    type="button"
                    key={readinessKey}
                    aria-pressed={readiness === readinessKey}
                    onClick={() => setReadiness(readinessKey)}
                  >
                    {localized(readinessLabels[readinessKey], language)}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="search-field">
              <label htmlFor="roadmap-search">{t.searchLabel}</label>
              <input
                id="roadmap-search"
                type="search"
                value={query}
                placeholder={t.searchPlaceholder}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            <button
              className="reset-button"
              type="button"
              disabled={!hasSelection}
              onClick={reset}
            >
              {t.reset}
            </button>

            <div className="recommendation" aria-labelledby="recommendation-title">
              <h3 id="recommendation-title">{t.summaryTitle}</h3>
              <p>{t.roleSummary[role]}</p>
              <p>{t.readinessSummary[readiness]}</p>
            </div>
          </aside>

          <section className="roadmap" id="roadmap" aria-labelledby="roadmap-title">
            <div className="roadmap-heading">
              <h2 id="roadmap-title">{t.roadmapTitle}</h2>
              <p aria-live="polite" aria-atomic="true">
                <strong>{resultCount}</strong> {t.resultUnit}
              </p>
            </div>

            {resultCount === 0 ? (
              <div className="empty-state" id="empty-state" role="status">
                <h3>{t.emptyTitle}</h3>
                <p>{t.emptyBody}</p>
                <button type="button" onClick={() => setQuery("")}>
                  {t.clearSearch}
                </button>
              </div>
            ) : (
              <div className="roadmap-sections">
                {filteredGroups.map((group, groupIndex) => (
                  <section className="roadmap-group" key={group.id}>
                    <div className="group-heading">
                      <span className="group-index" aria-hidden="true">
                        {String(groupIndex + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3>{localized(group.label, language)}</h3>
                        <p>{localized(group.prompt, language)}</p>
                      </div>
                    </div>

                    <ol className="node-list">
                      {group.nodes.map((roadmapNode) => (
                        <li key={roadmapNode.id}>
                          <article className="roadmap-node">
                            <div className="node-marker" aria-hidden="true" />
                            <div className="node-content">
                              <div className="node-meta">
                                {roadmapNode.roles.map((nodeRole) => (
                                  <span key={nodeRole}>
                                    {localized(roleLabels[nodeRole], language)}
                                  </span>
                                ))}
                              </div>
                              <h4>{localized(roadmapNode.title, language)}</h4>
                              <p>{localized(roadmapNode.description, language)}</p>
                              <div className="node-footer">
                                <p>
                                  <span>{t.evidence}</span>
                                  {localized(roadmapNode.evidence, language)}
                                </p>
                                <a href={documentUrl(roadmapNode.doc)}>
                                  {t.openDoc}
                                  <span aria-hidden="true"> ↗</span>
                                </a>
                              </div>
                            </div>
                          </article>
                        </li>
                      ))}
                    </ol>
                  </section>
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="principle" aria-labelledby="principle-title">
          <p className="principle-label">HARNESS</p>
          <div>
            <h2 id="principle-title">{t.principleTitle}</h2>
            <p>{t.principleBody}</p>
          </div>
        </section>
      </main>

      <footer>
        <p>{t.footer}</p>
        <a href={repositoryUrl}>MIT · GitHub</a>
      </footer>
    </>
  );
}
