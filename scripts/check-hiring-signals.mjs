import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { validateSchemaValue } from "./check-public-cases.mjs";

const availabilityLabels = {
  ko: { open: "모집 표시 확인", closed: "마감 표시 확인", unknown: "미확인", conflicting: "상충" },
  en: { open: "Open indication observed", closed: "Closed indication observed", unknown: "Unverified", conflicting: "Conflicting" },
};

function indexAvailability(content) {
  const rows = new Map();
  for (const line of content.split("\n")) {
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    const id = cells[0]?.match(/^\[(J\d{3})\]\(#j\d{3}\)$/)?.[1];
    if (id && cells.length === 5) rows.set(id, cells[4]);
  }
  return rows;
}

function validateDisplayedCounts(registry, catalog, language, failures) {
  const expected = { open: 0, closed: 0, unknown: 0, conflicting: 0 };
  for (const posting of registry.postings) expected[posting.availability] += 1;
  const statePattern = language === "ko"
    ? /모집 표시 확인\s+(\d+)개\s*·\s*마감 표시 확인\s+(\d+)개\s*·\s*미확인\s+(\d+)개(?:\s*·\s*상충\s+(\d+)개)?/
    : /Open indications:\s*(\d+)\s*·\s*Closed indications:\s*(\d+)\s*·\s*Unverified:\s*(\d+)(?:\s*·\s*Conflicting:\s*(\d+))?/;
  const states = catalog.match(statePattern);
  if (!states || ["open", "closed", "unknown", "conflicting"].some((state, index) => Number(states[index + 1] ?? 0) !== expected[state])) {
    failures.push(`${language}: availability summary counts do not match the registry`);
  }
  const recent = registry.postings.filter((posting) => posting.temporal_class === "dated-recent").length;
  const undated = registry.postings.filter((posting) => !posting.sources.some((source) => source.access_status === "read" && source.published_at)).length;
  const recentPattern = language === "ko"
    ? /게시일이 비교 기간에 속하는 원문:\s*[^\n]*?\b(\d+)개\./
    : /\b(One|\d+) originals? (?:has|have) a verified publication date within the window:/;
  const undatedPattern = language === "ko"
    ? /나머지\s+(\d+)개는 게시일 미상/
    : /The other\s+(\d+) have unknown publication dates/;
  const recentMatch = catalog.match(recentPattern);
  const undatedMatch = catalog.match(undatedPattern);
  if (!recentMatch || (recentMatch[1] === "One" ? 1 : Number(recentMatch[1])) !== recent) {
    failures.push(`${language}: recent-publication summary count does not match the registry`);
  }
  if (!undatedMatch || Number(undatedMatch[1]) !== undated) {
    failures.push(`${language}: unknown-publication summary count does not match the registry`);
  }
}

export function validateHiringSignals({ registry, schema, koreanCatalog, englishCatalog, knownProjects }) {
  const failures = validateSchemaValue(registry, schema, "hiring");
  if (failures.length) return failures;
  if (registry.recent_since > registry.checked_at) failures.push("Recent window starts after the check date.");
  const ids = new Set();
  const canonical = new Set();
  const sourceIds = new Set();
  const sourceUrls = new Map();
  const indexes = { ko: indexAvailability(koreanCatalog), en: indexAvailability(englishCatalog) };
  for (const posting of registry.postings) {
    if (ids.has(posting.id)) failures.push(`${posting.id}: duplicate posting ID`);
    ids.add(posting.id);
    if (posting.added_at > registry.checked_at) failures.push(`${posting.id}: addition date is after the registry check`);
    if (posting.canonical_job_id) {
      const key = `${posting.company.toLowerCase()}::${posting.canonical_job_id}`;
      if (canonical.has(key)) failures.push(`${posting.id}: duplicate company and canonical job ID`);
      canonical.add(key);
    }
    const verifiedStates = new Set();
    const datedSources = [];
    let directlyRead = false;
    for (const source of posting.sources) {
      if (!source.id.startsWith(`${posting.id}-`)) failures.push(`${source.id}: source belongs to another posting`);
      if (sourceIds.has(source.id)) failures.push(`${source.id}: duplicate source ID`);
      sourceIds.add(source.id);
      const identity = `${posting.company.toLowerCase()}::${posting.title_original.toLowerCase()}::${source.url}`;
      if (sourceUrls.has(identity) && sourceUrls.get(identity) !== posting.id) failures.push(`${posting.id}: the same employer, title, and source are duplicated`);
      sourceUrls.set(identity, posting.id);
      if (source.checked_at > registry.checked_at) failures.push(`${source.id}: source check is after the registry check`);
      if (source.published_at && source.published_at > source.checked_at) failures.push(`${source.id}: publication is after the source check`);
      if (source.published_at && source.closing_date && source.closing_date < source.published_at) failures.push(`${source.id}: closing date precedes publication`);
      if (source.access_status !== "read" && (source.availability !== "unknown" || source.availability_basis !== "undetermined")) failures.push(`${source.id}: unread source cannot establish hiring availability`);
      if (source.availability === "unknown" && source.availability_basis !== "undetermined") failures.push(`${source.id}: unknown availability needs an undetermined basis`);
      if (source.availability === "open" && !["application-route-visible", "explicit-open"].includes(source.availability_basis)) failures.push(`${source.id}: open availability requires application evidence`);
      if (source.availability === "closed" && !["explicit-closed", "deadline-passed"].includes(source.availability_basis)) failures.push(`${source.id}: closed availability requires explicit evidence`);
      if (source.availability_basis === "deadline-passed" && (!source.closing_date || source.closing_date >= source.checked_at)) failures.push(`${source.id}: deadline must be strictly before the check date`);
      if (source.availability === "open" && source.closing_date && source.closing_date < source.checked_at) failures.push(`${source.id}: an expired deadline cannot support an open listing`);
      if (source.access_status === "read") {
        directlyRead = true;
        if (source.availability !== "unknown") verifiedStates.add(source.availability);
        if (source.published_at) datedSources.push(source.published_at);
      }
      if (!koreanCatalog.includes(source.url) || !englishCatalog.includes(source.url)) failures.push(`${source.id}: source missing from a language edition`);
    }
    // Related records provide context only; they cannot establish this posting's state or date.
    for (const source of posting.related_sources ?? []) {
      if (!koreanCatalog.includes(source.url) || !englishCatalog.includes(source.url)) failures.push(`${posting.id}: related source missing from a language edition`);
    }
    const derived = verifiedStates.size > 1 ? "conflicting" : verifiedStates.size === 1 ? [...verifiedStates][0] : "unknown";
    if (posting.availability !== derived) failures.push(`${posting.id}: availability does not match the source observations`);
    if (!directlyRead && posting.temporal_class !== "historical") failures.push(`${posting.id}: unread content must remain historical rather than a new hiring signal`);
    if (posting.temporal_class === "dated-recent" && !datedSources.some((date) => date >= registry.recent_since)) failures.push(`${posting.id}: recent posting needs a verified publication date in the window`);
    if (posting.temporal_class === "newly-found-older" && (!datedSources.length || datedSources.some((date) => date >= registry.recent_since))) failures.push(`${posting.id}: older posting must have a verified date before the recent window`);
    if (posting.temporal_class === "undated" && datedSources.length) failures.push(`${posting.id}: dated content cannot be labeled undated`);
    for (const project of posting.related_projects) if (!knownProjects.has(project)) failures.push(`${posting.id}: unknown project ${project}`);
    for (const [language, catalog] of [["ko", koreanCatalog], ["en", englishCatalog]]) {
      if (!catalog.includes(posting.id) || !catalog.includes(posting.title_original)) failures.push(`${posting.id}: ID or original title missing from ${language}`);
      if (indexes[language].get(posting.id) !== availabilityLabels[language][posting.availability]) failures.push(`${posting.id}: ${language} index availability does not match the registry`);
    }
  }
  for (const [language, catalog] of [["ko", koreanCatalog], ["en", englishCatalog]]) {
    if (!catalog.includes(registry.checked_at)) failures.push(`${language}: check date missing`);
    const marker = language === "ko" ? `공고 기록 ${registry.postings.length}개` : `${registry.postings.length} posting records`;
    if (!catalog.includes(marker)) failures.push(`${language}: posting count is stale`);
    validateDisplayedCounts(registry, catalog, language, failures);
  }
  return failures;
}

export function loadHiringInputs(root = process.cwd()) {
  const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
  return {
    registry: JSON.parse(read("research/hiring-signals.json")),
    schema: JSON.parse(read("research/hiring-signals.schema.json")),
    koreanCatalog: read("research/hiring-signals.md"),
    englishCatalog: read("en/research/hiring-signals.md"),
    knownProjects: new Set(fs.readdirSync(path.join(root, "projects")).filter((name) => name.endsWith(".md")).map((name) => `projects/${name}`)),
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const input = loadHiringInputs();
  const failures = validateHiringSignals(input);
  if (failures.length) {
    console.error(`채용 자료 검사 실패 ${failures.length}건`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
  } else {
    console.log(`채용 자료 통과: 공고 ${input.registry.postings.length}개, 한영 출처·날짜·모집 상태 확인`);
  }
}
