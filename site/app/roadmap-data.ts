export type Language = "ko" | "en";
export type Role = "all" | "practitioner" | "builder" | "leader" | "guardian";
export type Readiness = "all" | "it" | "saas" | "low";

type LocalizedText = { ko: string; en: string };

export type RoadmapNode = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  evidence: LocalizedText;
  doc: string;
  roles: Exclude<Role, "all">[];
  readiness: Exclude<Readiness, "all">[];
};

export type RoadmapGroup = {
  id: string;
  label: LocalizedText;
  prompt: LocalizedText;
  nodes: RoadmapNode[];
};

const everyRole: Exclude<Role, "all">[] = [
  "practitioner",
  "builder",
  "leader",
  "guardian",
];
const everyReadiness: Exclude<Readiness, "all">[] = ["it", "saas", "low"];

function node(
  id: string,
  koTitle: string,
  enTitle: string,
  koDescription: string,
  enDescription: string,
  koEvidence: string,
  enEvidence: string,
  doc: string,
  roles = everyRole,
  readiness = everyReadiness,
): RoadmapNode {
  return {
    id,
    title: { ko: koTitle, en: enTitle },
    description: { ko: koDescription, en: enDescription },
    evidence: { ko: koEvidence, en: enEvidence },
    doc,
    roles,
    readiness,
  };
}

export const roadmapGroups: RoadmapGroup[] = [
  {
    id: "start",
    label: { ko: "시작점", en: "Starting point" },
    prompt: {
      ko: "직함보다 이번 업무에서 맡은 결정과 현재 준비 상태를 먼저 확인한다.",
      en: "Begin with the decisions you own and the workflow's readiness, not your title.",
    },
    nodes: [
      node(
        "persona",
        "역할 선택",
        "Persona selection",
        "업무 정의·구현·투자·통제 중 실제 책임을 기준으로 주 트랙을 고른다.",
        "Choose a primary track by actual responsibility for work, build, investment, or control.",
        "역할별 결정권과 대체 책임자",
        "Decision rights and backup owners",
        "start-here/persona-selector.md",
      ),
      node(
        "readiness",
        "조직 준비도",
        "Organization readiness",
        "업무·데이터·시스템·권한·운영·채택의 확인 상태로 첫 실행 범위를 정한다.",
        "Bound the first action by workflow, data, systems, permissions, operations, and adoption.",
        "확인됨·일부 확인·미확인 진단",
        "Confirmed, partial, and unknown diagnosis",
        "start-here/organization-readiness.md",
      ),
      node(
        "glossary",
        "비개발자 용어 안내",
        "Non-developer glossary",
        "LLM, RAG, Agent, MCP, 평가, 로그를 업무의 결정과 위험으로 이해한다.",
        "Understand LLMs, RAG, agents, MCP, evaluation, and logs as workflow decisions and risks.",
        "기술 경계와 협업 질문",
        "Technical boundaries and collaboration questions",
        "start-here/non-developer-glossary.md",
        ["practitioner", "leader", "guardian"],
        ["saas", "low"],
      ),
    ],
  },
  {
    id: "roles",
    label: { ko: "역량과 역할", en: "Competencies and roles" },
    prompt: {
      ko: "공통 소양과 역할별 배포 책임을 구분하고 하나의 실행 계약에서 만난다.",
      en: "Separate common literacy and role-specific delivery responsibility, then meet in one contract.",
    },
    nodes: [
      node(
        "competency",
        "8개 역량 지도",
        "Eight-area competency map",
        "사업 판단, 업무, 데이터, 통합, AI, 운영, 채택, 조직 학습의 공백을 찾는다.",
        "Find gaps across business, workflow, data, integration, AI, operations, adoption, and learning.",
        "영역별 산출물과 실패 패턴",
        "Artifacts and failure patterns by area",
        "roadmap/competency-map.md",
      ),
      node(
        "business-track",
        "비개발 실무자 트랙",
        "Business Practitioner track",
        "현재·목표 업무, 검수, 예외, SOP, 채택과 기존 절차 종료를 책임진다.",
        "Own current and target flows, acceptance, exceptions, SOP, adoption, and retirement.",
        "업무 흐름·검수·UAT·SOP",
        "Flow, rubric, UAT, and SOP",
        "tracks/business-practitioner.md",
        ["practitioner"],
      ),
      node(
        "builder-track",
        "AX Builder 트랙",
        "AX Builder track",
        "소프트웨어·AI·통합·평가·배포·복구를 운영 가능한 시스템으로 연결한다.",
        "Connect software, AI, integration, evaluation, deployment, and recovery.",
        "코드·계약·평가·운영 기록",
        "Code, contracts, evaluation, and operating records",
        "tracks/ax-builder.md",
        ["builder"],
      ),
      node(
        "leader-track",
        "리더·거버넌스 트랙",
        "Leader and Governance track",
        "포트폴리오, 투자, 책임, 조달, 공급자 종료와 확장 기준을 운영한다.",
        "Operate portfolio, investment, accountability, procurement, vendor exit, and scale.",
        "결정 이력·책임표·중단 기준",
        "Decision history, ownership matrix, and stop criteria",
        "tracks/leader-and-governance.md",
        ["leader"],
      ),
      node(
        "guardian-track",
        "데이터·보안·운영 트랙",
        "Data, Security, and Operations track",
        "데이터 수명주기, 접근 권한, 관측, 장애와 감사를 처음부터 공동 설계한다.",
        "Co-design data lifecycle, access, observability, incidents, and audit from the start.",
        "데이터 지도·권한표·위협 모델·복구",
        "Data map, permissions, threat model, and recovery",
        "tracks/data-security-operations.md",
        ["guardian"],
      ),
    ],
  },
  {
    id: "technical",
    label: { ko: "기술 기반", en: "Technical foundations" },
    prompt: {
      ko: "더 복잡한 Agent보다 성공 기준을 충족하는 가장 단순한 구조를 선택한다.",
      en: "Choose the simplest design that meets the success criteria before adding agent complexity.",
    },
    nodes: [
      node(
        "software-api",
        "소프트웨어와 API",
        "Software and APIs",
        "상태·권한·중복·부분 실패를 보존하며 기존 시스템을 연결한다.",
        "Connect source systems while preserving state, permissions, duplicates, and partial failure.",
        "API·상태·오류 계약과 테스트",
        "API, state, error contracts, and tests",
        "technical-foundations/software-and-api.md",
        ["builder", "guardian"],
        ["it", "saas"],
      ),
      node(
        "llm",
        "LLM 기초",
        "LLM foundations",
        "토큰, 컨텍스트, 검색, 구조화 출력, 비용과 모델 변경 위험을 다룬다.",
        "Handle tokens, context, retrieval, structured output, cost, and model-change risk.",
        "기준선·평가·비용·버전 비교",
        "Baseline, evaluation, cost, and version comparison",
        "technical-foundations/llm-foundations.md",
        ["practitioner", "builder", "guardian"],
      ),
      node(
        "agent",
        "에이전트 시스템",
        "Agent systems",
        "Agent Loop가 필요한 조건과 상태·중단·메모리·사람 인계 경계를 정한다.",
        "Justify Agent Loops and define state, stopping, memory, and human handoff.",
        "단순 대안 비교와 실패 주입",
        "Simpler-alternative comparison and failure injection",
        "technical-foundations/agent-systems.md",
        ["builder", "guardian"],
        ["it", "saas"],
      ),
      node(
        "tools-mcp",
        "도구 호출과 MCP",
        "Tool calling and MCP",
        "모델 제안과 실제 실행 사이에 스키마, 정책, 권한, 승인을 둔다.",
        "Place schema, policy, permission, and approval between model output and action.",
        "도구 카탈로그·권한·실행 로그",
        "Tool catalog, permissions, and action logs",
        "technical-foundations/tools-and-mcp.md",
        ["builder", "guardian"],
        ["it", "saas"],
      ),
      node(
        "evaluation",
        "평가와 테스트",
        "Evaluation and testing",
        "정상·경계·실패·공격 사례로 검색, 생성, 도구, 업무 결과를 나눠 판정한다.",
        "Judge retrieval, generation, tools, and outcomes with normal, edge, failure, and attack cases.",
        "평가 세트·판정 기준·회귀 결과",
        "Evaluation set, rubric, and regression results",
        "technical-foundations/evaluation-and-testing.md",
      ),
      node(
        "operations",
        "운영과 관측성",
        "Operations and observability",
        "품질·비용·지연·승인·장애를 추적하고 중단·복구·수동 대체한다.",
        "Trace quality, cost, latency, approval, and incidents and support stop and recovery.",
        "SLO·경보·복구 훈련·인수인계",
        "SLO, alerts, recovery drill, and handoff",
        "technical-foundations/production-operations.md",
        ["builder", "leader", "guardian"],
        ["it", "saas"],
      ),
      node(
        "security",
        "보안과 개인정보",
        "Security and privacy",
        "처리 목적, 최소 권한, 프롬프트 공격, 데이터 보유와 사고 대응을 설계한다.",
        "Design purpose, least privilege, prompt-attack defense, retention, and incident response.",
        "데이터 흐름·위협 모델·보안 시험",
        "Data flow, threat model, and security tests",
        "technical-foundations/security-and-privacy.md",
      ),
    ],
  },
  {
    id: "lifecycle",
    label: { ko: "8단계 업무 전환", en: "Eight-stage transformation" },
    prompt: {
      ko: "한 번 통과하는 절차가 아니라 운영 증거에 따라 앞 단계로 돌아가는 반복 모델이다.",
      en: "An iterative model that returns to earlier stages when operating evidence changes.",
    },
    nodes: [
      node("stage-1", "목표와 경계", "Outcomes and boundaries", "무엇을 바꾸고 AI가 하지 않을 일을 정한다.", "Define what changes and what AI must not do.", "기준선·비목표·중단 조건", "Baseline, non-goals, and stop conditions", "delivery-lifecycle/01-outcomes-and-boundaries.md"),
      node("stage-2", "업무 지도", "Workflow discovery", "실제 흐름, 대기, 예외와 인수인계를 관찰한다.", "Observe actual flow, waiting, exceptions, and handoffs.", "현재 흐름·예외·병목", "Current flow, exceptions, and bottlenecks", "delivery-lifecycle/02-workflow-discovery.md"),
      node("stage-3", "프로세스 재설계", "Process redesign", "제거·통합·표준화·보조·승인·자동 실행을 구분한다.", "Separate removal, standardization, assistance, approval, and action.", "목표 흐름·책임 배분", "Target flow and responsibility", "delivery-lifecycle/03-process-redesign.md"),
      node("stage-4", "데이터와 맥락", "Data and context", "사실의 기준, 출처, 용어, 누락과 소유자를 정한다.", "Define source of truth, provenance, terms, missingness, and owners.", "데이터 계약·용어집·계보", "Data contract, glossary, and lineage", "delivery-lifecycle/04-data-and-context.md"),
      node("stage-5", "실행 계약과 통제", "Execution contracts and controls", "입력·출력·평가·권한·승인·기록·복구를 합의한다.", "Agree on input, output, evaluation, permission, approval, records, and recovery.", "실행 계약·승인표·위협 모델", "Execution contract, approval matrix, and threat model", "delivery-lifecycle/05-execution-contracts.md"),
      node("stage-6", "배포와 운영", "Production deployment", "제한 배포, 관측, 장애, 롤백과 수동 대체를 운영한다.", "Operate bounded deployment, observability, incidents, rollback, and fallback.", "배포·SLO·복구 기록", "Deployment, SLO, and recovery records", "delivery-lifecycle/06-production-deployment.md", everyRole, ["it", "saas"]),
      node("stage-7", "채택과 역할 전환", "Adoption and role change", "사용자 검수, SOP, 지원, 이중 운영과 기존 절차 종료를 다룬다.", "Handle UAT, SOP, support, parallel operation, and retirement.", "UAT·SOP·채택·종료 결정", "UAT, SOP, adoption, and retirement decision", "delivery-lifecycle/07-adoption-and-change.md"),
      node("stage-8", "표준화와 확장", "Standardization and scale", "두 번째 업무에서 검증된 계약만 공통 기반 후보로 올린다.", "Promote only contracts validated in a second workflow.", "재사용 비교·버전·폐기 정책", "Reuse comparison, version, and retirement policy", "delivery-lifecycle/08-standardization-and-scale.md"),
    ],
  },
  {
    id: "projects",
    label: { ko: "증거 프로젝트", en: "Evidence projects" },
    prompt: {
      ko: "기능 수보다 외부 영향과 배포 책임을 한 단계씩 늘린다.",
      en: "Increase external impact and delivery responsibility one step at a time.",
    },
    nodes: [
      node("project-1", "안전한 보조 도구", "Safe assistant", "공개·합성 데이터로 출처, 거절, 평가를 검증한다.", "Validate provenance, refusal, and evaluation with public or synthetic data.", "20개 이상 평가 사례와 독립 판정", "At least 20 eval cases and independent judgment", "projects/01-safe-assistant.md"),
      node("project-2", "사람 승인 워크플로우", "Human-approved workflow", "근거와 변경 전후를 보고 승인·수정·거절한다.", "Approve, edit, or reject after reviewing evidence and before-and-after state.", "승인 기준·우회 시험·수정 부담", "Approval rubric, bypass tests, and correction burden", "projects/02-human-approved-workflow.md"),
      node("project-3", "샌드박스 통합", "Sandbox integration", "테스트 시스템에서 권한, 중복, 부분 실패와 복구를 시험한다.", "Test permissions, duplicates, partial failure, and recovery in test systems.", "격리·중복 방지·복구 훈련", "Isolation, deduplication, and recovery drill", "projects/03-sandbox-integration.md", ["builder", "guardian"], ["it", "saas"]),
      node("project-4", "운영 파일럿", "Production pilot", "낮은 위험의 한 업무를 제한된 사용자와 범위에서 운영한다.", "Operate one low-risk workflow with bounded users and scope.", "SLO·UAT·장애·인수인계", "SLO, UAT, incidents, and handoff", "projects/04-production-pilot.md", everyRole, ["it", "saas"]),
      node("project-5", "두 번째 업무 재사용", "Second-workflow reuse", "실제 재사용된 계약과 도메인별 확장 지점을 구분한다.", "Separate contracts actually reused from domain-specific extensions.", "업무 비교·추가 비용·공통화 결정", "Workflow comparison, addition cost, and standardization decision", "projects/05-second-workflow-reuse.md", ["builder", "leader", "guardian"]),
    ],
  },
  {
    id: "scale",
    label: { ko: "운영과 조직 학습", en: "Operations and organizational learning" },
    prompt: {
      ko: "새 업무를 안전하게 추가·개선·중단하는 능력을 남긴다.",
      en: "Leave the capability to add, improve, and stop workflows safely.",
    },
    nodes: [
      node("maturity", "조직 AX 성숙도", "Organization AX maturity", "개인 실험에서 공통 운영 기반과 현업 자립까지 반복 능력을 진단한다.", "Assess repeatable capability from individual experiments to shared operations.", "M0~M4 차원별 운영 상태", "M0–M4 operating state by dimension", "organization-maturity/README.md"),
      node("practice", "12주 실습 경로", "12-week practice path", "한 업무의 발견·배포 뒤 두 번째 업무에서 재사용을 검증한다.", "Discover and deploy one workflow, then test reuse in a second.", "주차별 결정·실패·산출물", "Weekly decisions, failures, and artifacts", "learning-paths/12-week-practice.md"),
      node("toolkit", "공통 도구함", "Shared toolkit", "업무 발굴, 평가, 실행 계약, 실험, 근거 기록 템플릿을 재사용한다.", "Reuse workflow discovery, evaluation, execution, experiment, and evidence templates.", "다른 사람이 이어 쓰는 작업 규격", "Working contracts another person can continue", "toolkit/README.md"),
    ],
  },
];

export const roleLabels: Record<Role, LocalizedText> = {
  all: { ko: "모든 역할", en: "All roles" },
  practitioner: { ko: "비개발 실무자", en: "Business practitioner" },
  builder: { ko: "AX Builder", en: "AX Builder" },
  leader: { ko: "리더·거버넌스", en: "Leader and governance" },
  guardian: { ko: "데이터·보안·운영", en: "Data, security, operations" },
};

export const readinessLabels: Record<Readiness, LocalizedText> = {
  all: { ko: "모든 준비 상태", en: "All readiness states" },
  it: { ko: "IT 기반형", en: "IT-native" },
  saas: { ko: "SaaS 중심형", en: "SaaS-centered" },
  low: { ko: "저디지털형", en: "Low-digital" },
};
