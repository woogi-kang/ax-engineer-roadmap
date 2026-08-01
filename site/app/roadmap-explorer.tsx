"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  evidenceStageLabels,
  type Industry,
  type Language,
  type Readiness,
  type Role,
  industryLabels,
  readinessLabels,
  riskLabels,
  roadmapGroups,
  roleLabels,
} from "./roadmap-data";

const repositoryUrl = "https://github.com/woogi-kang/ax-engineer-roadmap";

const copy = {
  ko: {
    skip: "로드맵으로 바로가기",
    contextLabel: "AX 엔지니어를 위한 공개 로드맵",
    version: "릴리스 준비본 v0.4.0",
    repository: "GitHub 저장소",
    repositoryShort: "GitHub",
    docs: "Markdown 문서",
    title: "자동화와 AI 보조를 실제 운영까지 이어 가는 AX Engineer 로드맵",
    intro:
      "AX Engineer는 자동화하거나 AI로 보조할 업무를 찾고, 사람이 판단할 지점을 남겨 흐름을 다시 설계합니다. 이 로드맵은 AI를 기존 데이터·시스템·권한 구조에 연결해 배포하고 실제 업무에서 운영하는 데 필요한 판단과 기술을 다룹니다. 현업 적용과 복구, 두 번째 업무에서 재사용할 규칙도 다룹니다. 한국 조직에서 자주 마주치는 결재·권한·규제와 업무 기록·시스템 연동 조건도 함께 살핍니다.",
    scope:
      "업무 전환 8단계 · 실습 5개 · 사례 15개(재현 가능한 공개 시뮬레이션 1개, 실행 설계 14개) · 공개 근거 25개",
    startRoadmap: "로드맵 시작하기",
    startCases: "사례 15개 보기",
    publicCases: "공개 AX 사례 25개",
    filterTitle: "내 시작점",
    filterHelp:
      "역할과 준비 상태는 전체 로드맵에, 산업은 사례 15개에만 적용됩니다.",
    roleLegend: "주된 책임",
    readinessLegend: "조직 준비 상태",
    industryLegend: "사례 산업",
    searchLabel: "로드맵 검색",
    searchPlaceholder: "예: 승인, RAG, 복구",
    reset: "선택 초기화",
    summaryTitle: "먼저 확인할 것",
    roleSummary: {
      all: "전체 구조를 훑고, 내가 맡을 일 가운데 결과물이나 운영 기록으로 확인되지 않는 부분부터 시작하세요.",
      practitioner: "업무 흐름과 검수 기준을 먼저 정하고, 외부 시스템을 바꾸지 않는 보조 도구로 검증하세요.",
      builder: "범위가 작은 업무 하나를 골라 평가·권한·복구까지 갖춘 뒤 실제 환경에 배포하세요.",
      leader: "우선순위와 중단 기준을 합의하되, 두 번째 업무에서도 재사용하기 전에는 전사 표준으로 만들지 마세요.",
      guardian: "데이터 사용, 실행 권한, 운영 상태 확인, 수동 처리 절차를 자동화하거나 보조할 업무를 고르는 단계부터 함께 설계하세요.",
    },
    readinessSummary: {
      all: "업무마다 준비 상태를 따로 확인하세요.",
      it: "API가 있어도 승인·복구 방법과 현업 적용 기준이 없으면 운영 준비는 끝나지 않습니다.",
      saas: "계정 소유자, 데이터 내보내기 방법, 식별자·권한·변경 기록부터 확인하세요.",
      low: "AI를 도입하기 전에 업무 기록 방식, 입력 형식, 책임자, 예외 처리부터 정하세요.",
    },
    roadmapTitle: "전체 로드맵",
    resultUnit: "개 항목",
    evidence: "확인할 결과물",
    openDoc: "문서 보기",
    emptyTitle: "조건에 맞는 항목이 없습니다",
    emptyBody: "검색어를 지우거나 선택 조건을 넓혀 보세요.",
    clearSearch: "모든 조건 초기화",
    expandGroup: "항목 펼치기",
    collapseGroup: "항목 접기",
    principleTitle: "공통 운영 기반(harness)은 언제 만드는가",
    principleBody:
      "첫 업무에서 입력·출력·평가·승인·기록·복구 규칙을 정합니다. 이 가운데 두 번째 업무에서도 실제로 재사용한 규칙과 도구만 여러 팀이 함께 쓰는 기반으로 삼습니다.",
    footer: "Markdown 문서가 세부 내용의 기준입니다. 이 화면에서는 역할과 준비 상태에 맞는 문서를 빠르게 찾아볼 수 있습니다.",
    contribute: "기여하기",
    sourcePolicy: "출처 정책",
    korean: "한국어",
    english: "English",
    navLabel: "주요 링크",
    languageLabel: "언어 선택",
  },
  en: {
    skip: "Skip to roadmap",
    contextLabel: "An open roadmap for AX Engineers",
    version: "v0.4.0 release candidate",
    repository: "GitHub repository",
    repositoryShort: "GitHub",
    docs: "Markdown docs",
    title: "Choose the workflow. Carry it into operations.",
    intro:
      "A practical path from workflow discovery and redesign through AI integration, deployment, adoption, and reuse, including approval, authority, regulation, and digital-readiness conditions common in Korean organizations.",
    scope:
      "8 transformation stages · 5 projects · 15 cases (1 reproducible public simulation, 14 design blueprints) · 25 public references",
    startRoadmap: "Start the roadmap",
    startCases: "Explore 15 cases",
    publicCases: "25 public AX cases",
    filterTitle: "Your starting point",
    filterHelp:
      "Role and readiness filter the roadmap; industry filters only the 15 cases.",
    roleLegend: "Primary responsibility",
    readinessLegend: "Organization readiness",
    industryLegend: "Case industry",
    searchLabel: "Search roadmap",
    searchPlaceholder: "Try approval, RAG, recovery",
    reset: "Reset selection",
    summaryTitle: "Recommended approach",
    roleSummary: {
      all: "Scan the full structure, then begin where your responsibility lacks a verifiable result.",
      practitioner: "Map the workflow and acceptance first, then prove it with assistance that takes no external action.",
      builder: "Deploy a small end-to-end workflow with evaluation, permissions, and recovery before adding more tools.",
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
    resultUnit: "items",
    evidence: "Result to verify",
    openDoc: "Open document",
    emptyTitle: "No items match these conditions",
    emptyBody: "Clear the search or broaden the selected conditions.",
    clearSearch: "Reset all filters",
    expandGroup: "Expand group",
    collapseGroup: "Collapse group",
    principleTitle: "A shared harness takes shape in the second workflow.",
    principleBody:
      "Define input, output, evaluation, approval, record, and recovery rules in the first workflow. Share only the rules and tools that are actually reused in a second workflow.",
    footer: "The Markdown documents are the source. This interface helps readers find the right one.",
    contribute: "Contribute",
    sourcePolicy: "Source policy",
    korean: "한국어",
    english: "English",
    navLabel: "Primary links",
    languageLabel: "Language",
  },
};

const roleKeys: Role[] = ["all", "practitioner", "builder", "leader", "guardian"];
const readinessKeys: Readiness[] = ["all", "it", "saas", "low"];
const industryKeys: Industry[] = [
  "all",
  "cross-industry",
  "consumer-retail",
  "public-sector",
  "financial-services",
  "manufacturing",
  "healthcare-social-care",
  "legal-life-sciences",
];
const allGroupIds = roadmapGroups.map((group) => group.id);

function localized(value: { ko: string; en: string }, language: Language) {
  return value[language];
}

export function RoadmapExplorer({
  language,
}: {
  language: Language;
}) {
  const [role, setRole] = useState<Role>("all");
  const [readiness, setReadiness] = useState<Readiness>("all");
  const [industry, setIndustry] = useState<Industry>("all");
  const [query, setQuery] = useState("");
  const [filtersHydrated, setFiltersHydrated] = useState(false);
  const [expandedGroupIds, setExpandedGroupIds] = useState(
    () => new Set(allGroupIds.slice(0, 1)),
  );
  const t = copy[language];
  const pageUrl =
    language === "en"
      ? "https://woogi-kang.github.io/ax-engineer-roadmap/en/"
      : "https://woogi-kang.github.io/ax-engineer-roadmap/";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["CollectionPage", "LearningResource"],
    name: "AX Engineer Roadmap",
    url: pageUrl,
    inLanguage: language === "ko" ? "ko-KR" : "en-US",
    isAccessibleForFree: true,
    learningResourceType: "Roadmap and practice case collection",
    numberOfItems: 15,
    about: [
      "AI Transformation",
      "workflow redesign",
      "AI operations",
      "human approval",
      "evaluation and recovery",
    ],
    sameAs: repositoryUrl,
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const requestedRole = url.searchParams.get("role");
    const requestedReadiness = url.searchParams.get("readiness");
    const requestedIndustry = url.searchParams.get("industry");
    const requestedQuery = url.searchParams.get("q") ?? "";
    const validRequestedRole =
      requestedRole !== null && roleKeys.includes(requestedRole as Role);
    const validRequestedReadiness =
      requestedReadiness !== null &&
      readinessKeys.includes(requestedReadiness as Readiness);
    const validRequestedIndustry =
      requestedIndustry !== null &&
      industryKeys.includes(requestedIndustry as Industry);
    const hasGlobalFilter =
      validRequestedRole ||
      validRequestedReadiness ||
      requestedQuery !== "";

    queueMicrotask(() => {
      if (validRequestedRole) {
        setRole(requestedRole as Role);
      }
      if (validRequestedReadiness) {
        setReadiness(requestedReadiness as Readiness);
      }
      if (validRequestedIndustry) {
        setIndustry(requestedIndustry as Industry);
      }
      setQuery(requestedQuery);

      if (hasGlobalFilter) {
        setExpandedGroupIds(new Set(allGroupIds));
      } else if (validRequestedIndustry) {
        setExpandedGroupIds(new Set(["cases"]));
      }
      setFiltersHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!filtersHydrated) return;

    const url = new URL(window.location.href);
    if (role === "all") url.searchParams.delete("role");
    else url.searchParams.set("role", role);
    if (readiness === "all") url.searchParams.delete("readiness");
    else url.searchParams.set("readiness", readiness);
    if (industry === "all") url.searchParams.delete("industry");
    else url.searchParams.set("industry", industry);
    if (query === "") url.searchParams.delete("q");
    else url.searchParams.set("q", query);

    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }, [filtersHydrated, industry, query, readiness, role]);

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
          const industryMatches =
            industry === "all" ||
            group.id !== "cases" ||
            roadmapNode.case?.industry === industry;
          const searchableText = [
            localized(roadmapNode.title, language),
            localized(roadmapNode.description, language),
            localized(roadmapNode.evidence, language),
            localized(group.label, language),
            roadmapNode.case
              ? localized(roadmapNode.case.title, language)
              : "",
            roadmapNode.case
              ? localized(industryLabels[roadmapNode.case.industry], language)
              : "",
          ]
            .join(" ")
            .toLocaleLowerCase(locale);

          return (
            roleMatches &&
            readinessMatches &&
            industryMatches &&
            (normalizedQuery.length === 0 ||
              searchableText.includes(normalizedQuery))
          );
        }),
      }))
      .filter((group) => group.nodes.length > 0);
  }, [industry, language, query, readiness, role]);

  const resultCount = filteredGroups.reduce(
    (total, group) => total + group.nodes.length,
    0,
  );
  const hasSelection =
    role !== "all" || readiness !== "all" || industry !== "all" || query !== "";

  function restoreCompactGroups() {
    setExpandedGroupIds(new Set(allGroupIds.slice(0, 1)));
  }

  function reset() {
    setRole("all");
    setReadiness("all");
    setIndustry("all");
    setQuery("");
    restoreCompactGroups();
  }

  function documentUrl(path: string) {
    return `${repositoryUrl}/blob/main/${language === "en" ? `en/${path}` : path}`;
  }

  function languageHref(targetLanguage: Language) {
    const params = new URLSearchParams();
    if (role !== "all") params.set("role", role);
    if (readiness !== "all") params.set("readiness", readiness);
    if (industry !== "all") params.set("industry", industry);
    if (query !== "") params.set("q", query);
    const path = targetLanguage === "en" ? "/en/" : "/";
    const search = params.toString();
    return search ? `${path}?${search}` : path;
  }

  function toggleGroup(groupId: string) {
    setExpandedGroupIds((current) => {
      const next = new Set(current);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  }

  function expandAllGroups() {
    setExpandedGroupIds(new Set(allGroupIds));
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <a className="skip-link" href="#roadmap">
        {t.skip}
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="AX Engineer Roadmap">
          <span aria-hidden="true">AX/RM</span>
          <span className="wordmark-text">Engineer Roadmap</span>
        </a>
        <nav className="header-actions" aria-label={t.navLabel}>
          <span className="version">{t.version}</span>
          <a className="repository-link" href={repositoryUrl}>
            <span className="repository-label-long">{t.repository}</span>
            <span className="repository-label-short">{t.repositoryShort}</span>
          </a>
          <a
            className="docs-link"
            href={`${repositoryUrl}/blob/main/${language === "en" ? "en/README.md" : "README.md"}`}
          >
            {t.docs}
          </a>
          <div className="language-switch" aria-label={t.languageLabel}>
            <Link
              href={languageHref("ko")}
              hrefLang="ko"
              lang="ko"
              aria-current={language === "ko" ? "page" : undefined}
            >
              {t.korean}
            </Link>
            <Link
              href={languageHref("en")}
              hrefLang="en"
              lang="en"
              aria-current={language === "en" ? "page" : undefined}
            >
              {t.english}
            </Link>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="intro" aria-labelledby="page-title">
          <div>
            <p className="eyebrow">{t.contextLabel}</p>
            <h1 id="page-title">{t.title}</h1>
          </div>
          <div className="intro-copy">
            <p>{t.intro}</p>
            <div className="hero-actions">
              <a className="hero-cta" href="#roadmap">
                {t.startRoadmap}
                <span aria-hidden="true"> ↓</span>
              </a>
              <a
                className="hero-secondary"
                href="#roadmap-group-cases"
                onClick={() => setExpandedGroupIds(new Set(allGroupIds))}
              >
                {t.startCases}
              </a>
              <a
                className="hero-secondary"
                href={documentUrl("research/public-ax-cases.md")}
              >
                {t.publicCases}
                <span aria-hidden="true"> ↗</span>
              </a>
            </div>
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
                    onClick={() => {
                      setRole(roleKey);
                      expandAllGroups();
                    }}
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
                    onClick={() => {
                      setReadiness(readinessKey);
                      expandAllGroups();
                    }}
                  >
                    {localized(readinessLabels[readinessKey], language)}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>{t.industryLegend}</legend>
              <div className="choice-list">
                {industryKeys.map((industryKey) => (
                  <button
                    className="choice"
                    type="button"
                    key={industryKey}
                    aria-pressed={industry === industryKey}
                    onClick={() => {
                      setIndustry(industryKey);
                      setExpandedGroupIds(new Set(["cases"]));
                    }}
                  >
                    {localized(industryLabels[industryKey], language)}
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
                onChange={(event) => {
                  setQuery(event.target.value);
                  expandAllGroups();
                }}
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

          <section
            className="roadmap"
            id="roadmap"
            aria-labelledby="roadmap-title"
            tabIndex={-1}
          >
            <div className="roadmap-heading">
              <h2 id="roadmap-title">{t.roadmapTitle}</h2>
              <p aria-live="polite" aria-atomic="true">
                <strong>{resultCount}</strong>
                {language === "ko" ? t.resultUnit : ` ${t.resultUnit}`}
              </p>
            </div>

            {resultCount === 0 ? (
              <div className="empty-state" id="empty-state" role="status">
                <h3>{t.emptyTitle}</h3>
                <p>{t.emptyBody}</p>
                <button
                  type="button"
                  onClick={reset}
                >
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
                      <h3 className="group-copy">
                        <button
                          className="group-toggle"
                          type="button"
                          aria-expanded={expandedGroupIds.has(group.id)}
                          aria-controls={`roadmap-group-${group.id}`}
                          onClick={() => toggleGroup(group.id)}
                        >
                          <span className="group-title">
                            {localized(group.label, language)}
                          </span>
                          <span className="group-prompt">
                            {localized(group.prompt, language)}
                          </span>
                          <span className="group-toggle-label">
                            {expandedGroupIds.has(group.id)
                              ? t.collapseGroup
                              : t.expandGroup}
                            <span aria-hidden="true">
                              {expandedGroupIds.has(group.id) ? "−" : "+"}
                            </span>
                          </span>
                        </button>
                      </h3>
                    </div>

                    <ol
                      className="node-list"
                      id={`roadmap-group-${group.id}`}
                      hidden={!expandedGroupIds.has(group.id)}
                    >
                      {group.nodes.map((roadmapNode) => (
                        <li key={roadmapNode.id}>
                          <article className="roadmap-node">
                            <div className="node-marker" aria-hidden="true" />
                            <div className="node-content">
                              <div className="node-meta">
                                {roadmapNode.case ? (
                                  <>
                                    <span>
                                      {localized(
                                        industryLabels[
                                          roadmapNode.case.industry
                                        ],
                                        language,
                                      )}
                                    </span>
                                    <span>
                                      {localized(
                                        evidenceStageLabels[
                                          roadmapNode.case.evidenceStage
                                        ],
                                        language,
                                      )}
                                    </span>
                                    <span>
                                      {language === "ko"
                                        ? `난이도 ${roadmapNode.case.difficulty}`
                                        : `Difficulty ${roadmapNode.case.difficulty}`}
                                    </span>
                                    <span>
                                      {localized(
                                        riskLabels[roadmapNode.case.risk],
                                        language,
                                      )}
                                    </span>
                                  </>
                                ) : null}
                                {roadmapNode.roles.map((nodeRole) => (
                                  <span key={nodeRole}>
                                    {localized(roleLabels[nodeRole], language)}
                                  </span>
                                ))}
                              </div>
                              <h4>{localized(roadmapNode.title, language)}</h4>
                              <p>
                                {localized(roadmapNode.description, language)}
                              </p>
                              <div className="node-footer">
                                <p>
                                  <span>{t.evidence}</span>
                                  {localized(roadmapNode.evidence, language)}
                                </p>
                                <a
                                  href={documentUrl(roadmapNode.doc)}
                                  aria-label={`${t.openDoc}: ${localized(
                                    roadmapNode.title,
                                    language,
                                  )}`}
                                >
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
        <div className="footer-links">
          <a href={repositoryUrl}>MIT · GitHub</a>
          <a href={documentUrl("CONTRIBUTING.md")}>{t.contribute}</a>
          <a href={documentUrl("research/source-policy.md")}>
            {t.sourcePolicy}
          </a>
          <a href={documentUrl("research/public-ax-cases.md")}>
            {t.publicCases}
          </a>
        </div>
      </footer>
    </>
  );
}
