import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dataDir = path.join(root, "research/hiring-monthly");
const outputs = { ko: "research/hiring-monthly", en: "en/research/hiring-monthly" };

const roleTypes = ["ax", "ai-agent", "fde"];
const statuses = ["open", "closed", "unknown"];
const statusBases = ["deadline-and-no-closed-notice", "closed-notice", "deadline-passed", "unreadable"];
const tagNames = ["project-or-freelance", "company-undisclosed", "training-matching"];

const labels = {
  ko: {
    role: { ax: "AX", "ai-agent": "AI Agent", fde: "FDE" },
    status: { open: "모집 중", closed: "마감", unknown: "미확인" },
    basis: { "deadline-and-no-closed-notice": "", "closed-notice": "마감 표시", "deadline-passed": "마감일 경과", unreadable: "본문 미확인" },
    tag: { "project-or-freelance": "프로젝트·프리랜서", "company-undisclosed": "기업명 비공개", "training-matching": "교육기관 매칭" },
    reason: {
      "company-name-only": "회사명에만 AX가 들어감",
      consulting: "컨설팅 직무",
      "business-delivery": "사업 이행 관리 직무",
      "generic-recruiting": "직무를 특정하지 않은 공개 채용",
      "education-operations": "교육 운영 직무",
      "generic-digital": "AI 전환 범위가 드러나지 않는 디지털 업무",
      "non-work-agent": "업무 자동화가 아닌 게임 에이전트",
      "security-testing": "보안 진단 중심 직무",
      "design-branding": "디자인·브랜딩 중심 직무",
      "marketing-crm": "CRM·마케팅 조직장",
      "adjacent-subtrack": "검색 랭킹·데이터 모델링 하위 직무",
      "outside-window": "접수 시작일이 수집 기간 이전",
      unreadable: "상세 페이지를 읽지 못함",
    },
    platform: { collected: "수집", "not-collected": "미수집" },
    platformName: { jobkorea: "잡코리아", saramin: "사람인", wanted: "원티드", linkedin: "링크드인" },
    rolling: "상시",
    unknownDate: "미확인",
    duplicate: (id) => `${id}와 중복 가능`,
  },
  en: {
    role: { ax: "AX", "ai-agent": "AI Agent", fde: "FDE" },
    status: { open: "Open", closed: "Closed", unknown: "Unverified" },
    basis: { "deadline-and-no-closed-notice": "", "closed-notice": "closed notice", "deadline-passed": "deadline passed", unreadable: "body unread" },
    tag: { "project-or-freelance": "Project/freelance", "company-undisclosed": "Company undisclosed", "training-matching": "Training-program match" },
    reason: {
      "company-name-only": "AX appears only in the company name",
      consulting: "Consulting role",
      "business-delivery": "Business delivery management",
      "generic-recruiting": "General recruiting without a specific role",
      "education-operations": "Training operations",
      "generic-digital": "Digital work with no visible AI transformation scope",
      "non-work-agent": "Game agents, not work automation",
      "security-testing": "Security testing role",
      "design-branding": "Design and branding role",
      "marketing-crm": "CRM and marketing lead",
      "adjacent-subtrack": "Search ranking or data modeling subtrack",
      "outside-window": "Application opened before the window",
      unreadable: "Detail page could not be read",
    },
    platform: { collected: "Collected", "not-collected": "Not collected" },
    platformName: { jobkorea: "JobKorea", saramin: "Saramin", wanted: "Wanted", linkedin: "LinkedIn" },
    rolling: "Rolling",
    unknownDate: "Unknown",
    duplicate: (id) => `possible duplicate of ${id}`,
  },
};

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export function validateMonth(data) {
  const failures = [];
  const seen = new Set();
  const byPlatformId = new Map();
  if (!/^\d{4}-\d{2}$/.test(data.month)) failures.push("month must be YYYY-MM");
  if (!datePattern.test(data.window?.from) || !datePattern.test(data.window?.to)) failures.push("window dates must be YYYY-MM-DD");
  if (!datePattern.test(data.checked_at)) failures.push("checked_at must be YYYY-MM-DD");
  const prefix = `M${data.month.slice(2, 4)}${data.month.slice(5, 7)}-`;
  data.postings.forEach((posting, index) => {
    const label = posting.id ?? `postings[${index}]`;
    if (posting.id !== `${prefix}${String(index + 1).padStart(3, "0")}`) failures.push(`${label}: ids must be sequential from ${prefix}001`);
    if (!roleTypes.includes(posting.role_type)) failures.push(`${label}: unknown role_type`);
    if (!statuses.includes(posting.status)) failures.push(`${label}: unknown status`);
    if (!statusBases.includes(posting.status_basis)) failures.push(`${label}: unknown status_basis`);
    for (const tag of posting.tags) if (!tagNames.includes(tag)) failures.push(`${label}: unknown tag ${tag}`);
    if (posting.start_date !== null) {
      if (!datePattern.test(posting.start_date)) failures.push(`${label}: start_date must be a date or null`);
      if (posting.start_date < data.window.from || posting.start_date > data.window.to) failures.push(`${label}: start_date is outside the window`);
      if (posting.start_basis !== "page") failures.push(`${label}: a known start_date needs start_basis page`);
    } else if (posting.start_basis !== "id-range") failures.push(`${label}: an unknown start_date needs start_basis id-range`);
    if (posting.deadline !== "rolling" && !datePattern.test(posting.deadline)) failures.push(`${label}: deadline must be a date or rolling`);
    const passed = posting.deadline !== "rolling" && posting.deadline < data.checked_at;
    if (posting.status_basis === "deadline-passed" && (!passed || posting.status !== "closed")) failures.push(`${label}: deadline-passed needs a past deadline and closed status`);
    if (posting.status === "open" && (passed || posting.status_basis !== "deadline-and-no-closed-notice")) failures.push(`${label}: open needs a current deadline and no closed notice`);
    if (posting.status_basis === "closed-notice" && posting.status !== "closed") failures.push(`${label}: closed-notice needs closed status`);
    byPlatformId.set(posting.platform_id, posting.id);
  });
  for (const item of [...data.postings, ...data.held, ...data.excluded]) {
    const key = `${item.platform ?? "jobkorea"}:${item.platform_id}`;
    if (seen.has(key)) failures.push(`${item.platform_id}: listed more than once`);
    seen.add(key);
  }
  for (const posting of data.postings) {
    if (posting.possible_duplicate_of && !byPlatformId.has(posting.possible_duplicate_of)) {
      failures.push(`${posting.id}: possible_duplicate_of must point to a listed posting`);
    }
  }
  for (const platform of data.platforms) {
    if (!labels.ko.platformName[platform.name]) failures.push(`unknown platform ${platform.name}`);
  }
  for (const item of [...data.held, ...data.excluded]) {
    if (!labels.ko.reason[item.reason]) failures.push(`${item.platform_id}: unknown reason ${item.reason}`);
  }
  return failures;
}

const cell = (value) => String(value).replaceAll("|", "\\|");
const count = (items, predicate) => items.filter(predicate).length;

function monthName(month, language) {
  const [year, number] = month.split("-");
  if (language === "ko") return `${year}년 ${Number(number)}월`;
  return new Date(`${month}-01T00:00:00Z`).toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

export function renderMonth(data, language) {
  const l = labels[language];
  const ko = language === "ko";
  const p = data.postings;
  const idOf = new Map(p.map((posting) => [posting.platform_id, posting.id]));
  const open = count(p, (x) => x.status === "open");
  const closed = count(p, (x) => x.status === "closed");
  const unknown = count(p, (x) => x.status === "unknown");
  const roles = Object.fromEntries(roleTypes.map((role) => [role, count(p, (x) => x.role_type === role)]));
  const knownStart = count(p, (x) => x.start_date);
  const tagCount = Object.fromEntries(tagNames.map((tag) => [tag, count(p, (x) => x.tags.includes(tag))]));
  const duplicates = count(p, (x) => x.possible_duplicate_of);
  const collected = data.platforms.filter((x) => x.status === "collected").map((x) => l.platformName[x.name]).join(", ");
  const lines = [];

  if (ko) {
    lines.push(
      `# ${monthName(data.month, "ko")} 국내 AX·AI Agent·FDE 채용 공고 목록`,
      "",
      `접수 시작일이 ${data.window.from}부터 ${data.window.to}까지인 국내 공고를 제목 수준에서 모은 월간 목록이다. 확인일은 ${data.checked_at}이다. 수집 기준과 절차는 [월간 수집 기준](README.md)에 있고, 책임과 요건을 자세히 정리한 표본은 [채용 공고 기록](../hiring-signals.md)에 따로 둔다.`,
      "",
      "## 요약",
      "",
      `- 목록 ${p.length}건: 모집 중 ${open}건 · 마감 ${closed}건 · 미확인 ${unknown}건.`,
      `- 직무 유형: AX ${roles.ax}건 · AI Agent ${roles["ai-agent"]}건 · FDE ${roles.fde}건. 제목에 FDE가 있으면 FDE, 그다음 Agent·에이전트가 있으면 AI Agent로 분류했다.`,
      `- 접수 시작일을 페이지에서 확인한 공고는 ${knownStart}건이다. 나머지 ${p.length - knownStart}건은 시작일이 표시되지 않아 공고 번호 범위로 기간 포함 여부를 판단했다.`,
      `- 프로젝트·프리랜서 ${tagCount["project-or-freelance"]}건, 기업명 비공개 ${tagCount["company-undisclosed"]}건, 교육기관 매칭 ${tagCount["training-matching"]}건, 중복 가능 ${duplicates}건이 포함돼 있다. 건수는 고유 채용 수가 아니다.`,
      `- 보류 ${data.held.length}건과 범위 밖으로 제외한 ${data.excluded.length}건은 아래에 따로 적었다.`,
      `- 수집 플랫폼은 ${collected}뿐이다. 다른 플랫폼에만 올라온 공고는 빠져 있으므로 이 목록으로 시장 전체 규모나 증감을 추정하지 않는다.`,
      "",
      "## 공고 목록",
      "",
      "| 번호 | 기업 | 공고 제목 | 유형 | 접수 시작 | 마감 | 상태 | 고용 형태 | 근무지 | 경력 | 비고 |",
      "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    );
  } else {
    lines.push(
      `# Korean AX, AI Agent, and FDE job postings: ${monthName(data.month, "en")}`,
      "",
      `This monthly list records, at title level, Korean postings whose applications opened between ${data.window.from} and ${data.window.to}. Checked on ${data.checked_at}. The collection criteria and procedure are in [Monthly collection criteria](README.md); the detailed sample of responsibilities and requirements stays in [Job-posting records](../hiring-signals.md). Company, title, employment, location, and experience cells keep the original Korean text.`,
      "",
      "## Summary",
      "",
      `- ${p.length} listings: open ${open} · closed ${closed} · unverified ${unknown}.`,
      `- Role types: AX ${roles.ax} · AI Agent ${roles["ai-agent"]} · FDE ${roles.fde}. A title with FDE is classified as FDE first, then a title with Agent or 에이전트 as AI Agent.`,
      `- ${knownStart} postings show an application start date. For the other ${p.length - knownStart}, inclusion was judged from the posting-number range because no start date was shown.`,
      `- The list includes ${tagCount["project-or-freelance"]} project or freelance postings, ${tagCount["company-undisclosed"]} with undisclosed companies, ${tagCount["training-matching"]} training-program matches, and ${duplicates} possible duplicates. Counts are not unique vacancies.`,
      `- ${data.held.length} held and ${data.excluded.length} out-of-scope postings are listed separately below.`,
      `- Only ${collected} was collected. Postings that appear only on other platforms are missing, so this list does not estimate market size or change.`,
      "",
      "## Postings",
      "",
      "| No. | Company | Title | Type | Opened | Deadline | Status | Employment | Location | Experience | Notes |",
      "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    );
  }

  for (const posting of p) {
    const notes = posting.tags.map((tag) => l.tag[tag]);
    if (posting.possible_duplicate_of) notes.push(l.duplicate(idOf.get(posting.possible_duplicate_of)));
    if (posting.note && ko) notes.push(posting.note);
    const basis = l.basis[posting.status_basis];
    const status = basis ? `${l.status[posting.status]} (${basis})` : l.status[posting.status];
    lines.push(`| ${[
      posting.id,
      cell(posting.company),
      `[${cell(posting.title_original)}](${posting.url})`,
      l.role[posting.role_type],
      posting.start_date ?? l.unknownDate,
      posting.deadline === "rolling" ? l.rolling : posting.deadline,
      status,
      cell(posting.employment),
      cell(posting.location),
      cell(posting.experience),
      cell(notes.join(", ")),
    ].join(" | ")} |`);
  }

  const side = (title, items) => {
    lines.push("", `## ${title}`, "");
    if (!items.length) {
      lines.push(ko ? "없음." : "None.");
      return;
    }
    for (const item of items) {
      const extra = item.start_date ? (ko ? ` (접수 시작 ${item.start_date})` : ` (opened ${item.start_date})`) : "";
      lines.push(`- [${item.company} / ${item.title_original}](${item.url}): ${l.reason[item.reason]}${extra}.`);
    }
  };
  side(ko ? "보류" : "Held", data.held);
  side(ko ? "범위 밖으로 제외" : "Excluded as out of scope", data.excluded);

  lines.push("", ko ? "## 플랫폼별 수집 상태" : "## Platform coverage", "");
  lines.push(ko ? `검색어: ${data.queries.join(", ")}.` : `Queries: ${data.queries.join(", ")}.`, "");
  for (const platform of data.platforms) {
    lines.push(`- ${l.platformName[platform.name]}: ${l.platform[platform.status]}. ${platform.note[language]}`);
  }
  return `${lines.join("\n")}\n`;
}

export function monthFiles() {
  return fs.readdirSync(dataDir).filter((name) => /^\d{4}-\d{2}\.json$/.test(name)).sort();
}

function run(check) {
  const failures = [];
  for (const name of monthFiles()) {
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, name), "utf8"));
    for (const failure of validateMonth(data)) failures.push(`${name}: ${failure}`);
    for (const [language, dir] of Object.entries(outputs)) {
      const target = path.join(root, dir, name.replace(/\.json$/, ".md"));
      const content = renderMonth(data, language);
      if (check) {
        if (!fs.existsSync(target) || fs.readFileSync(target, "utf8") !== content) {
          failures.push(`${path.relative(root, target)} is out of date; run npm run generate:hiring-monthly`);
        }
      } else {
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, content);
      }
    }
  }
  if (failures.length) {
    console.error(failures.join("\n"));
    process.exit(1);
  }
  console.log(`${check ? "Checked" : "Rendered"} ${monthFiles().length} monthly hiring list(s).`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run(process.argv.includes("--check"));
