# AX·인접 직무 공고 기록

확인일: **2026-10-26** · 최근 게시일 비교 기준: **2026-08-01**

직무 본문을 읽은 **공고 기록 27개**다. 회사의 원 공고 ID가 연결되지 않은 채널은 별도 기록으로 두므로 고유 채용 건수나 신규 일자리 수가 아니다. `added_at`은 이 레지스트리에 넣은 날짜이며 인터넷에 처음 올라온 날이 아니다.

- 모집 표시 확인 11개 · 마감 표시 확인 8개 · 미확인 8개
- 주 출처 기준 기업·기관 공식/ATS 12개 · 채용 플랫폼 15개
- 게시일이 비교 기간에 속하는 원문: GM 1개. 나머지 26개는 게시일 미상.

공고 상태와 원문 접근 상태는 다르다. 지원 링크나 모집 표시가 있어도 지원 제출 성공을 뜻하지 않는다. 마감 표시가 있으면 미래 마감일이나 상시채용 문구보다 우선한다. 확인일은 도구가 반환한 자료를 읽은 날이며 실시간 상태를 보장하지 않는다.

## 읽는 방법

- 직함보다 실제 대상 업무와 구현·운영·지원 책임을 비교한다. 내부 AX, 고객 딜리버리, pre-sales와 혼합 역할을 구분했다.
- 필수·제시 요건과 우대는 핵심 요약이다. 인재 프로필 형식의 공고는 정식 필수·우대 구분이 없다는 한계를 함께 적었다. 우대 미확인은 우대 조건이 없다는 뜻이 아니다.
- 실습 연결은 이 로드맵의 편집 제안이다. 해당 회사가 실습을 인정하거나 채용을 보장한다는 뜻이 아니다.
- ID 대응이 확인되지 않은 관련 자료는 `related_sources`로 분리하고 이 공고의 상태 집계에서 제외했다.

[구조화된 기록](hiring-signals.json) · [역할 해석](ax-engineer-role-review.md) · [출처 정책](source-policy.md)

## 기록 목록

| ID | 회사 | 원문 직함 | 역할 범위 | 페이지의 모집 표시 |
|---|---|---|---|---|
| [J001](#j001) | FuriosaAI | Software Engineer, Compiler (AX Engineer) | 내부 AX | 미확인 |
| [J002](#j002) | Lunit | [영어 우대] Senior AX Engineer | 내부 AX | 마감 표시 확인 |
| [J003](#j003) | 미리디 | AX 엔지니어 (AX Engineer) | 내부 AX | 마감 표시 확인 |
| [J004](#j004) | POSTECH AIR센터 | AX 엔지니어 (채용 중) | 내부 AX | 미확인 |
| [J005](#j005) | 대웅 | AX Engineer | 내부 AX | 미확인 |
| [J006](#j006) | 대웅 | Senior AX Engineer | 내부 AX | 미확인 |
| [J007](#j007) | 대웅 | AX Product Manager | 내부 AX | 미확인 |
| [J008](#j008) | 윗유 | AX Engineer | 내부 AX | 미확인 |
| [J009](#j009) | 라이넨스 | [세탁공장] AX Engineer (풀스택, Forward Deployed) | 내부 AX | 미확인 |
| [J010](#j010) | 바잉스퀘어 | AX Engineer | 내부 AX | 마감 표시 확인 |
| [J011](#j011) | 대웅 / 웰다 | [웰다] AX Engineer (3~8년) | 내부 AX | 마감 표시 확인 |
| [J012](#j012) | 라이너(Liner) | AX Engineer (Enterprise) | 고객 딜리버리 | 마감 표시 확인 |
| [J013](#j013) | Anthropic | Staff Software Engineer, GTM AI Engineering | 내부 AX | 모집 표시 확인 |
| [J014](#j014) | Anthropic | AI Operations Engineer, Partnerships | 내부 AX | 모집 표시 확인 |
| [J015](#j015) | Anthropic | Staff Forward Deployed Engineer | 고객 딜리버리 | 모집 표시 확인 |
| [J016](#j016) | Anthropic | Applied AI Architect | Pre-sales | 모집 표시 확인 |
| [J017](#j017) | General Motors | Sr. AI/Automation Engineer - HR Technology (Remote India - Night Shift) | 내부 AX | 모집 표시 확인 |
| [J018](#j018) | OneSpan | AI Automation Engineer | 내부 AX | 미확인 |
| [J019](#j019) | OpenAI | Forward Deployed Engineer - Seoul | 고객 딜리버리 | 모집 표시 확인 |
| [J020](#j020) | OpenAI | Applied AI Engineer | 고객 딜리버리 | 모집 표시 확인 |
| [J021](#j021) | OpenAI | Enablement Lead, Knowledge Work | 고객 딜리버리 | 모집 표시 확인 |
| [J022](#j022) | OpenAI | Applied AI Architect | 혼합 | 모집 표시 확인 |
| [J023](#j023) | 뉴셀렉트(주) | AX Product Manager | 내부 AX | 마감 표시 확인 |
| [J024](#j024) | 인딥에이아이 | AX Engineer / FDE (신입·경력 / 연차 무관) | 혼합 | 모집 표시 확인 |
| [J025](#j025) | 대웅 | [대웅] AX Engineer | 내부 AX | 마감 표시 확인 |
| [J026](#j026) | 대웅 | [대웅] Senior AX Engineer | 내부 AX | 마감 표시 확인 |
| [J027](#j027) | 윗유 | [윗유] AX Engineer | 내부 AX | 모집 표시 확인 |

### J001

**FuriosaAI / Software Engineer, Compiler (AX Engineer)**

컴파일러 팀의 개발 흐름을 개선하는 내부 AX 공고다.

- 지역: Seoul, South Korea. 기록 ID: `furiosa-career:4005376201`.
- 구분: 내부 AX · 미확인 · 게시일 미상.
- 핵심 책임: 개발·리뷰·CI의 병목을 찾고 도구를 실제 업무로 비교한다. 템플릿·가이드·온보딩을 운영하고 PR 주기와 CI 지표를 확인한다.
- 필수·제시 요건: 관련 분야 학사, LLM 코딩 도구 경험과 소프트웨어 개발 흐름 이해를 요구한다. 도구 평가를 팀이 쓸 가이드로 옮길 수 있어야 한다.
- 우대 요약: 개발 3년 이상 또는 관련 석사·박사, 컴파일러·시스템 배경을 우대한다. LLM API 도구 구현, 내부 도구 확산과 기술 문서화 경험을 우대한다.
- 한계: Apply Here가 같은 페이지로 돌아가 접수 경로를 확인하지 못했다. 모집 상태는 미확인으로 둔다. 3년 이상은 우대 조건이다. 이전 Ashby와 현재 회사 페이지의 원 공고 ID 대응은 미확인이다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P1](../projects/01-safe-assistant.md) · [P4](../projects/04-production-pilot.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J001-S1` [기업·기관 공식 또는 ATS](https://furiosa.ai/career/software-engineer-compiler-ax-engineer-4005376201): 본문 확인 · 미확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직무 본문을 읽었다. Apply Here가 자기 페이지로 돌아가 모집 상태는 미확인이다.
- 이전 주소 · 404 확인 기록: `https://jobs.ashbyhq.com/furiosa-ai/11eafd2e-d89b-4c61-bb64-b38cf0748536/`: 기존 Ashby 주소는 JavaScript 안내만 반환했다. 현재 회사 페이지와 원 공고 ID 대응은 미확인이다. 2026-10-26 PR 외부 링크 검사에서는 404가 확인됐다. 과거 주소로 보존하며 현재 역할 본문은 위 회사 페이지를 따른다. 이 응답만으로 모집 마감을 판단하지 않는다. [검사 기록](https://github.com/woogi-kang/ax-engineer-roadmap/actions/runs/40319785897)

### J002

**Lunit / [영어 우대] Senior AX Engineer**

사내 승인·정책·데이터 기반을 설계하는 과거 공고다.

- 지역: 서울 강남구. 기록 ID: `wanted:368564`.
- 구분: 내부 AX · 마감 표시 확인 · 게시일 미상.
- 핵심 책임: Slack 승인과 정책 에이전트, 데이터 커넥터를 만든다. SDK·런타임을 제공해 현업의 워크플로우 제작을 지원한다.
- 필수·제시 요건: 풀스택 개발 6년 이상, LLM API 운영 적용과 RAG 경험을 요구한다. 승인 워크플로우, Python 또는 TypeScript 운영 경험과 비개발 부서 협업을 요구한다.
- 우대 요약: 확인된 별도 목록 없음.
- 한계: 원티드는 마감 표시와 상시채용 문구를 함께 보여 준다. 명시적 마감 표시를 따른다. 기존 Workable 본문은 접근하지 못했고 원 공고 ID 대응도 미확인이다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P2](../projects/02-human-approved-workflow.md) · [P3](../projects/03-sandbox-integration.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J002-S1` [채용 플랫폼](https://recruit.wanted.co.kr/wd/368564): 본문 확인 · 마감 표시 확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 마감된 공고라고 명시한다. 상시채용 문구도 남아 있다.
- [상태 집계에서 제외한 관련 자료](https://apply.workable.com/lunit/j/E3C22F589F/): 기존 Workable 주소는 not_found=true로 이동했다. 현재 Wanted 기록과 원 공고 ID 대응은 미확인이다.

### J003

**미리디 / AX 엔지니어 (AX Engineer)**

경력 초반의 사내 Agent·인프라 운영 지원 공고다.

- 지역: 서울 구로구. 기록 ID: `wanted:384409`.
- 구분: 내부 AX · 마감 표시 확인 · 게시일 미상.
- 핵심 책임: Cloudflare·n8n·사내 Agent를 운영하고 작은 연동·배포·런북을 개선한다. AX Manager·DevOps·정보보호 검토 아래 작업한다.
- 필수·제시 요건: Python 또는 TypeScript/Node.js로 프로그램·API를 만들고 Git 피드백을 반영한 경험을 요구한다. 작은 서비스 배포, 로그 기반 문제 해결과 자동화 도구 또는 LLM API 프로젝트 경험을 요구한다.
- 우대 요약: 확인된 별도 목록 없음.
- 한계: 2026-11-02 마감일이 남아 있어도 본문은 마감됐다고 표시한다. 1년 계약직이며 상단은 신입~3년으로 표시한다. 중요한 인프라·보안 판단이나 고객 서비스 온콜을 혼자 맡는 역할은 아니다. Greeting 주소와 원티드 공고의 ID 대응은 확인하지 못했다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P1](../projects/01-safe-assistant.md) · [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md)

- `J003-S1` [채용 플랫폼](https://recruit.wanted.co.kr/wd/384409): 본문 확인 · 마감 표시 확인. 발행 미상 / 마감 2026-11-02 / 확인 2026-10-26. 마감 표시를 확인했다. 남아 있는 마감일은 2026-11-02다.
- 이전 주소 · 404 확인 기록: `https://miridih.career.greetinghr.com/ko/o/220034`: Greeting 주소는 접근하지 못해 본문과 원 공고 ID 대응을 확인하지 못했다. 2026-10-26 PR 외부 링크 검사에서 404를 확인했다. 과거 주소로 보존하며 현재 읽을 수 있는 본문은 위 Wanted 기록을 따른다. 같은 공고라는 근거가 없어 모집 상태를 합치지 않는다. [검사 기록](https://github.com/woogi-kang/ax-engineer-roadmap/actions/runs/40319785897)

### J004

**POSTECH AIR센터 / AX 엔지니어 (채용 중)**

학내 행정부서를 대상으로 한 사내 FDE 모델을 설명한다.

- 지역: 경북 포항, 포항공과대학교. 기록 ID: `postechair:recruit/ax-engineer`.
- 구분: 내부 AX · 미확인 · 게시일 미상.
- 핵심 책임: 현장의 문제를 정의하고 폐쇄망 등 제약 안에서 솔루션을 배포한다. 현업 정착을 지원하고 부서 간 재사용 패턴과 설계 결정을 기록한다.
- 필수·제시 요건: 풀스택 개발, LLM/RAG/agent 앱, 비개발 조직 협업과 Linux·Docker 배포 역량을 요구한다.
- 우대 요약: 온프레미스·GPU 운영, 평가·관측, ELT·벡터 검색과 행정·공공 도메인 경험을 우대한다.
- 한계: 제목에는 채용 중이라고 적혀 있지만 접수 링크가 종료된 다른 직무를 가리킨다. 같은 AX 공고의 접수 가능 여부를 확인하지 못해 모집 상태를 미확인으로 둔다. 게시일이 없어 최근 신설이나 모집 증가의 근거로 쓰지 않는다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J004-S1` [기업·기관 공식 또는 ATS](https://postechair.github.io/recruit/ax-engineer/): 본문 확인 · 미확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 제목은 채용 중이지만 같은 AX 공고의 접수 경로를 확인하지 못했다.
- [상태 집계에서 제외한 관련 자료](https://www.saramin.co.kr/zf_user/jobs/view?rec_idx=54573987): 연결된 사람인 공고는 마감 표시가 있고 세부 직무가 platform-lead를 가리킨다. 같은 AX 공고의 접수·마감 근거로 쓰지 않는다.

### J005

**대웅 / AX Engineer**

현업 요구부터 구현·평가·운영 전환까지 맡는 AX TF 공고다.

- 지역: 서울 강남구. 기록 ID: `wanted:390449`.
- 구분: 내부 AX · 미확인 · 게시일 미상.
- 핵심 책임: 정답 데이터로 품질을 확인하고 사내 시스템과 AI를 연결한다. 공용 구성요소를 운영하고 실행 방법과 한계를 운영자에게 넘긴다.
- 필수·제시 요건: 학사와 소프트웨어 개발 3년 이상, LLM 기능을 실제 사용자에게 제공한 경험을 요구한다. Python 또는 TypeScript와 불명확한 요구를 구체화한 경험을 요구한다.
- 우대 요약: 확인된 별도 목록 없음.
- 한계: 상시채용 문구만으로 현재 지원 가능 여부를 확인하지 못했다. 리멤버와 내용이 유사하지만 원 공고 ID 대응이 없어 상태·날짜를 합치지 않는다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P1](../projects/01-safe-assistant.md) · [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md)

- `J005-S1` [채용 플랫폼](https://recruit.wanted.co.kr/wd/390449): 본문 확인 · 미확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직무 본문과 상시채용 문구는 읽었지만 현재 지원 경로는 확인하지 못했다.
- [상태 집계에서 제외한 관련 자료](https://career.rememberapp.co.kr/job/posting/344925): 같은 회사·직함 또는 유사한 설명이지만 원 공고 ID 대응은 확인되지 않았다. 이 URL의 상태·날짜는 위 공고에 합치지 않는다.

### J006

**대웅 / Senior AX Engineer**

AX 과제의 기술 선택·공용 기반·코칭을 맡는 선임 공고다.

- 지역: 서울 강남구. 기록 ID: `wanted:390450`.
- 구분: 내부 AX · 미확인 · 게시일 미상.
- 핵심 책임: 구축·도입·비구축을 판단하고 과제의 기술 방향과 품질을 관리한다. 게이트웨이·커넥터·평가 기반을 설계하고 코드·보안 리뷰와 코칭을 맡는다.
- 필수·제시 요건: 학사와 개발 5년 이상, 엔터프라이즈 AI 시스템의 설계·운영 경험을 요구한다. 기술 선택과 여러 엔지니어의 출시·운영을 이끈 경험을 요구한다.
- 우대 요약: 확인된 별도 목록 없음.
- 한계: 상시채용 문구만으로 현재 지원 가능 여부를 확인하지 못했다. 리멤버와 원 공고 ID 대응이 확인되지 않아 별도 기록으로 둔다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P4](../projects/04-production-pilot.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J006-S1` [채용 플랫폼](https://recruit.wanted.co.kr/wd/390450): 본문 확인 · 미확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직무 본문과 상시채용 문구는 읽었지만 현재 지원 경로는 확인하지 못했다.
- [상태 집계에서 제외한 관련 자료](https://career.rememberapp.co.kr/job/posting/344926): 같은 회사·직함 또는 유사한 설명이지만 원 공고 ID 대응은 확인되지 않았다. 이 URL의 상태·날짜는 위 공고에 합치지 않는다.

### J007

**대웅 / AX Product Manager**

사내 AI 제품의 문제·KPI·직접 프로토타입·실제 사용을 맡는 PM 공고다.

- 지역: 서울 강남구. 기록 ID: `wanted:390448`.
- 구분: 내부 AX · 미확인 · 게시일 미상.
- 핵심 책임: 업무 기준선·KPI·중단 기준을 정하고 현업과 가설을 검증한다. AI 도구로 프로토타입을 만들고 사용 결과에 따라 제품을 개선하거나 중단한다.
- 필수·제시 요건: 학사와 PM/PO 또는 제품 기획 5년 이상, 사내 시스템·B2B 제품 개선 경험을 요구한다. AI 프로토타입 제작, LLM 제품 기획과 가설 검증·중단 판단 경험을 요구한다.
- 우대 요약: 확인된 별도 목록 없음.
- 한계: 게시일과 실제 지원 경로는 미확인이다. 집계사이트의 2026-10-06을 원문 게시일로 옮기지 않았다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P1](../projects/01-safe-assistant.md) · [P2](../projects/02-human-approved-workflow.md) · [P4](../projects/04-production-pilot.md)

- `J007-S1` [채용 플랫폼](https://recruit.wanted.co.kr/wd/390448): 본문 확인 · 미확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직무 본문과 상시채용 문구는 읽었지만 현재 지원 경로는 확인하지 못했다.

### J008

**윗유 / AX Engineer**

기존 사내 플랫폼을 개선하고 업무 자동화를 운영하는 공고다.

- 지역: 서울 강남구. 기록 ID: `wanted:392673`.
- 구분: 내부 AX · 미확인 · 게시일 미상.
- 핵심 책임: 기존 코드·테스트·관측을 개선하고 현업 자동화 과제를 구현한다. SaaS·데이터를 연결하고 처리 시간·오류·사용 현황을 측정한다.
- 필수·제시 요건: 서비스 운영, 타인 코드의 분석·유지보수와 Git·테스트·리뷰 경험을 요구한다. 웹·자동화 개발, REST·인증·장애 처리와 AI 코딩 결과 검증을 요구한다.
- 우대 요약: 확인된 별도 목록 없음.
- 한계: 지원 버튼은 확인하지 못했다. 상단의 경력 2년 이상 표시는 다른 채널의 요약과 다를 수 있다. 리멤버·사람인과 원 공고 ID 대응이 없어 각 채널의 날짜·상태를 이전하지 않는다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P1](../projects/01-safe-assistant.md) · [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md)

- `J008-S1` [채용 플랫폼](https://recruit.wanted.co.kr/wd/392673): 본문 확인 · 미확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직무 본문과 상시채용 문구는 읽었지만 현재 지원 경로는 확인하지 못했다.
- [상태 집계에서 제외한 관련 자료](https://career.rememberapp.co.kr/job/posting/347613): 같은 회사·직함 또는 유사한 설명이지만 원 공고 ID 대응은 확인되지 않았다. 이 URL의 상태·날짜는 위 공고에 합치지 않는다.
- [상태 집계에서 제외한 관련 자료](https://m.saramin.co.kr/job-search/view?rec_idx=55308192): 사람인 동명 기록은 본문 대신 메타데이터만 확인했고 2026-10-16 마감을 표시한다. 원 공고 ID 대응이 없어 상태·날짜를 합치지 않는다.

### J009

**라이넨스 / [세탁공장] AX Engineer (풀스택, Forward Deployed)**

자사 세탁공장 현장에서 문제를 찾고 배포하는 내부 FDE 공고다.

- 지역: 서울 강서구, 직영 공장 현장. 기록 ID: `wanted:379254`.
- 구분: 내부 AX · 미확인 · 게시일 미상.
- 핵심 책임: 생산·품질·수배송·설비 흐름을 관찰해 도구와 데이터 연결을 만든다. 현장 사용과 운영 지표를 확인하고 공장별 차이를 남겨 재사용한다.
- 필수·제시 요건: 현장 문제 정의, 사용자 소통과 웹·자동화 구현·배포 경험을 요구한다. Python·TypeScript·JavaScript·SQL 등 한 기술과 API·DB·클라우드 활용을 요구한다.
- 우대 요약: 확인된 별도 목록 없음.
- 한계: Forward Deployed라는 제목이지만 대상은 자사 직영 공장이다. 게시일과 현재 지원 경로는 확인하지 못했다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J009-S1` [채용 플랫폼](https://recruit.wanted.co.kr/wd/379254): 본문 확인 · 미확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직무 본문과 상시채용 문구는 읽었지만 현재 지원 경로는 확인하지 못했다.

### J010

**바잉스퀘어 / AX Engineer**

홀세일의 상품·주문·재고·정산을 다루는 사내 AX 공고다.

- 지역: 서울 강남구. 기록 ID: `wanted:372625`.
- 구분: 내부 AX · 마감 표시 확인 · 게시일 미상.
- 핵심 책임: 현업 흐름을 분석해 Agent·RAG와 내부 도구를 만든다. Slack·ERP·CRM 등을 연결하고 AWS에서 운영하며 피드백을 반영한다.
- 필수·제시 요건: Python 또는 TypeScript 제품 개발, LLM API 서비스와 현업 요구 구조화 경험을 제시한다.
- 우대 요약: Prompt/Agent/RAG, Docker, REST 연동과 현장 문제 분해는 우대형 문구로 제시한다.
- 한계: 원티드에서 마감 표시를 확인했다. 자격요건 절에는 필수형 문장과 우대형 문구가 섞여 있다. 상단의 경력 5~10년은 플랫폼 요약이며 별도 우대 섹션은 확인되지 않았다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P1](../projects/01-safe-assistant.md) · [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md)

- `J010-S1` [채용 플랫폼](https://recruit.wanted.co.kr/wd/372625): 본문 확인 · 마감 표시 확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 마감된 공고라고 명시한다.

### J011

**대웅 / 웰다 / [웰다] AX Engineer (3~8년)**

웰다의 제품·비즈니스·개발 업무 자동화 공고다.

- 지역: 서울 강남구. 기록 ID: `wanted:364116`.
- 구분: 내부 AX · 마감 표시 확인 · 게시일 미상.
- 핵심 책임: AI 워크플로우와 멀티에이전트를 구현해 팀 업무에 적용한다. 성능·안정성·비용을 관찰하며 사용자의 피드백을 반영한다.
- 필수·제시 요건: 학사와 AI 서비스·자동화 개발 3년 이상, 팀 업무에 Agentic AI를 적용한 경험을 요구한다. Skills/Hooks/Plugins·MCP 또는 유사 도구, 프롬프트·하네스 개선과 Python/TypeScript/Go 중 한 언어를 요구한다.
- 우대 요약: 확인된 별도 목록 없음.
- 한계: 마감 표시가 있으며 상시채용 문구도 남아 있다. 대웅 AX TF 공고와 팀·직무·기록 ID가 다르다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P1](../projects/01-safe-assistant.md) · [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md)

- `J011-S1` [채용 플랫폼](https://recruit.wanted.co.kr/wd/364116): 본문 확인 · 마감 표시 확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 마감된 공고라고 명시한다.

### J012

**라이너(Liner) / AX Engineer (Enterprise)**

기업 고객의 AI 업무를 구현하고 재사용하는 딜리버리 공고다.

- 지역: 서울 마포구. 기록 ID: `wanted:351750`.
- 구분: 고객 딜리버리 · 마감 표시 확인 · 게시일 미상.
- 핵심 책임: 고객 업무를 RAG·에이전트 흐름으로 재설계하고 평가·관측·가드레일을 만든다. 여러 고객에서 반복되는 구조를 플랫폼 구성요소로 옮긴다.
- 필수·제시 요건: 본문은 소프트웨어·ML 3년 이상 또는 동등 경험과 LLM 앱의 운영 적용을 요구한다. 고객·비개발 조직과 문제를 정의하고 구현을 이끈 경험을 요구한다.
- 우대 요약: 확인된 별도 목록 없음.
- 한계: 상단은 5년 이상, 본문은 3년 이상 또는 동등 경험으로 다르다. 하나의 연차 조건으로 합치지 않는다. 마감된 고객 딜리버리 공고이며 내부 AX 역할과 구분한다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J012-S1` [채용 플랫폼](https://recruit.wanted.co.kr/wd/351750): 본문 확인 · 마감 표시 확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 마감된 공고라고 명시한다.

### J013

**Anthropic / Staff Software Engineer, GTM AI Engineering**

자사 영업 업무의 에이전트·평가·공유 도구를 만드는 공고다.

- 지역: Remote-Friendly (Travel-Required) | San Francisco, CA | Seattle, WA. 기록 ID: `greenhouse:5390966008`.
- 구분: 내부 AX · 모집 표시 확인 · 게시일 미상.
- 핵심 책임: 사내 영업 에이전트를 구현하고 승인·인계·운영 평가와 관측을 설계한다. CRM·데이터와 연결하고 여러 빌더가 쓰는 코드와 도구를 관리한다.
- 필수·제시 요건: Python 또는 TypeScript 운영 앱, LLM·컨텍스트·MCP·평가 경험과 SQL을 요구한다. 평가와 대화 기록으로 실제 결함을 찾고 고친 경험을 요구한다.
- 우대 요약: 소프트웨어·ML·FDE 8년 이상, Claude Code·Agent SDK와 GTM 시스템 경험을 우대한다. 공유 코드 운영과 실험·인과 분석 경험을 우대한다.
- 한계: 8년 이상은 우대 조건이다. 이전 검색 제목 GTM Claudification은 별칭으로만 참고하며 제목이 바뀐 날짜는 모른다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J013-S1` [기업·기관 공식 또는 ATS](https://job-boards.greenhouse.io/anthropic/jobs/5390966008): 본문 확인 · 모집 표시 확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직무 본문과 지원 링크 또는 버튼을 확인했다. 실제 지원 제출은 하지 않았다.

### J014

**Anthropic / AI Operations Engineer, Partnerships**

파트너 운영 시스템 위에 업무 자동화를 만드는 공고다.

- 지역: San Francisco, CA. 기록 ID: `greenhouse:5391151008`.
- 구분: 내부 AX · 모집 표시 확인 · 게시일 미상.
- 핵심 책임: 파트너 온보딩·등록·연락을 원본 시스템과 연결해 자동화한다. 위험 단계의 검토·오류·이관을 운영하고 재사용 패턴을 남긴다.
- 필수·제시 요건: LLM·도구 호출·MCP·평가와 업무 API 연동 경험을 요구한다. Python/JavaScript, 자동화 위험 판단, 업무 재설계와 문서화를 요구한다.
- 우대 요약: 운영엔지니어링·RevOps 등 5년 이상, 파트너 도메인과 운영 중인 사내 AI 경험을 우대한다. Claude API·Code·에이전트 프레임워크 경험을 우대한다.
- 한계: 5년 이상은 우대 조건이다. 시스템 기반 담당자와 그 위의 업무 자동화 담당자를 구분한다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J014-S1` [기업·기관 공식 또는 ATS](https://job-boards.greenhouse.io/anthropic/jobs/5391151008): 본문 확인 · 모집 표시 확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직무 본문과 지원 링크 또는 버튼을 확인했다. 실제 지원 제출은 하지 않았다.

### J015

**Anthropic / Staff Forward Deployed Engineer**

기업 고객의 기술 전략과 구현·인수인계를 이끄는 Staff FDE 공고다.

- 지역: New York City, NY; San Francisco, CA; Seattle, WA. 기록 ID: `greenhouse:5449229008`.
- 구분: 고객 딜리버리 · 모집 표시 확인 · 게시일 미상.
- 핵심 책임: 여러 고객 과제의 설계와 직접 구현을 보안·조달 조건에 맞춰 이끈다. 고객이 운영할 수 있도록 넘기고 반복 배포 패턴을 정리한다.
- 필수·제시 요건: 기업 시스템 설계와 고객 기술 리딩, 운영 소프트웨어 경험을 제시한다. Python, LLM·에이전트 실습과 AI 코딩 결과 검토를 기대한다.
- 우대 요약: 금융·의료 등 산업 배경과 Python 외 추가 언어를 우대한다.
- 한계: 정식 필수·우대 목록 대신 인재 프로필을 제시한다. 에이전트의 운영 배포 이력은 필수가 아니지만 운영 소프트웨어 경험과 에이전트 실습은 기대한다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J015-S1` [기업·기관 공식 또는 ATS](https://job-boards.greenhouse.io/anthropic/jobs/5449229008): 본문 확인 · 모집 표시 확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직무 본문과 지원 링크 또는 버튼을 확인했다. 실제 지원 제출은 하지 않았다.

### J016

**Anthropic / Applied AI Architect**

한국 기업의 기술 평가와 설계를 지원하는 pre-sales 공고다.

- 지역: Seoul, South Korea. 기록 ID: `greenhouse:5390735008`.
- 구분: Pre-sales · 모집 표시 확인 · 게시일 미상.
- 핵심 책임: 기업의 기술 도입을 자문하고 업무별 평가·아키텍처를 안내한다. 공통 통합 패턴과 고객 피드백을 제품 조직에 전달한다.
- 필수·제시 요건: 고객 기술 역할, 기업 구매 절차 대응과 기술·사업 소통 경험을 요구한다. 원어민 수준 한국어와 비즈니스 영어를 요구한다.
- 우대 요약: 관련 경력 5년 이상, 클라우드·기업 통합, Python과 LLM/ML 배경을 우대한다.
- 한계: 5년 이상은 우대 조건이며 본문은 pre-sales라고 명시한다. 직접 구현·운영 소유와 같은 역할로 묶지 않는다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J016-S1` [기업·기관 공식 또는 ATS](https://job-boards.greenhouse.io/anthropic/jobs/5390735008): 본문 확인 · 모집 표시 확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직무 본문과 지원 링크 또는 버튼을 확인했다. 실제 지원 제출은 하지 않았다.

### J017

**General Motors / Sr. AI/Automation Engineer - HR Technology (Remote India - Night Shift)**

HR 플랫폼의 AI·자동화 통합을 맡는 내부 역할이다.

- 지역: Remote, India. 기록 ID: `gm:JR-202605425`.
- 구분: 내부 AX · 모집 표시 확인 · 게시일 확인된 최근 공고.
- 핵심 책임: ServiceNow·Workday를 연결하고 HR 자동화 로드맵을 구현한다. 요구 분석, 테스트·배포, 보안·데이터 무결성과 문서화를 맡는다.
- 필수·제시 요건: 관련 학사·석사, HR 플랫폼 통합 6년 이상과 백엔드 개발 3년 이상을 요구한다. API 역량과 HR·IT·PM·현업 협업을 요구한다.
- 우대 요약: Workday·ServiceNow·자동화 자격과 Azure/AWS/GCP 경험을 우대한다.
- 한계: 2026-09-21은 공식 페이지 게시일이다. 직무가 처음 생긴 날이나 시장 증가를 뜻하지 않는다. Apply Now가 보이지만 연결된 Workday 본문은 추출하지 못했다. 지원 제출은 시도하지 않았다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J017-S1` [기업·기관 공식 또는 ATS](https://search-careers.gm.com/en/jobs/jr-202605425/sr-ai-automation-engineer-hr-technology-remote-india-night-shift/): 본문 확인 · 모집 표시 확인. 발행 2026-09-21 / 마감 미상 / 확인 2026-10-26. 공식 게시일 2026-09-21과 Apply Now를 확인했다.
- `J017-S2` [기업·기관 공식 또는 ATS](https://generalmotors.wd5.myworkdayjobs.com/Careers_GM/job/Remote---India/Sr-AI-Automation-Engineer----HR-Technology--Remote-India---Night-Shift-_JR-202605425/apply): 본문 확인 불가 · 미확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 회사 페이지의 지원 링크 대상이지만 본문은 추출하지 못했다. 모집 상태는 미확인이다.

### J018

**OneSpan / AI Automation Engineer**

R&D 팀의 수작업을 줄이고 팀에 운영을 넘기는 공고다.

- 지역: Barcelona. 기록 ID: `onespan:8278879`.
- 구분: 내부 AX · 미확인 · 게시일 미상.
- 핵심 책임: 반복 작업의 빈도·비용을 살펴 에이전트나 스크립트를 선택한다. 팀과 함께 구현하고 유지할 수 있는 문서·도구를 넘긴다.
- 필수·제시 요건: Agentic AI 이해, 백엔드·스크립팅·CI/CD 구현과 협업을 인재 프로필로 제시한다. 유창한 영어는 필수로 명시한다.
- 우대 요약: 스페인어를 우대하며 리더십은 필수가 아니라고 설명한다.
- 한계: 직무 본문은 읽었으나 지원 버튼·명시적 모집 상태·마감일을 확인하지 못했다. 정식 필수·우대 구획 없이 인재 프로필을 설명하며 영어를 필수로 표시한다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J018-S1` [기업·기관 공식 또는 ATS](https://www.onespan.com/about/careers/job/ai-automation-engineer-8278879?gh_jid=8278879&langcode=en): 본문 확인 · 미확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직무 본문은 있지만 지원 버튼·현재 모집 표시·마감일은 미확인이다.

### J019

**OpenAI / Forward Deployed Engineer - Seoul**

서울에서 고객 AI 과제를 운영 배포까지 맡는 FDE 공고다.

- 지역: Seoul, South Korea. 기록 ID: `ashby:b43339a1-e830-4761-a193-3438f34f9ebb`.
- 구분: 고객 딜리버리 · 모집 표시 확인 · 게시일 미상.
- 핵심 책임: 고객 과제 발견·범위·설계·구현·배포를 맡는다. 채택·업무 영향·평가 피드백을 확인하고 반복 패턴을 남긴다.
- 필수·제시 요건: 고객 대응을 포함한 엔지니어링·배포 5년 이상을 인재 프로필로 제시한다. 운영 코드 작성·리뷰, LLM 시스템 배포와 이해관계자 소통을 기대한다.
- 우대 요약: 확인된 별도 목록 없음.
- 한계: 인재 프로필 형태의 조건이다. 공식 페이지의 Apply now를 확인했지만 연결 ATS는 JavaScript 안내만 반환했다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J019-S1` [기업·기관 공식 또는 ATS](https://openai.com/careers/forward-deployed-engineer-seoul-seoul-south-korea/): 본문 확인 · 모집 표시 확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직무 본문과 지원 링크 또는 버튼을 확인했다. 실제 지원 제출은 하지 않았다.
- `J019-S2` [기업·기관 공식 또는 ATS](https://jobs.ashbyhq.com/openai/b43339a1-e830-4761-a193-3438f34f9ebb/application): 본문 확인 불가 · 미확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 회사 페이지의 지원 링크 대상이지만 본문은 추출하지 못했다. 모집 상태는 미확인이다.

### J020

**OpenAI / Applied AI Engineer**

서울에서 기업 고객의 AI 시스템을 직접 구현하는 공고다.

- 지역: Seoul, South Korea. 기록 ID: `ashby:04435c05-7a05-4802-894d-c173327fbac8`.
- 구분: 고객 딜리버리 · 모집 표시 확인 · 게시일 미상.
- 핵심 책임: 과제 선정부터 평가·통합·운영 출시까지 직접 구현한다. 실패를 재현하고 참조 구현·도구·플레이북을 재사용한다.
- 필수·제시 요건: 기업 AI·ML의 운영 적용과 코드·평가·디버깅의 직접 기여를 제시한다. Python, 체계적 평가와 기업 통합·보안·비용 조건 이해를 기대한다.
- 우대 요약: JavaScript·TypeScript 등 추가 언어는 가치 있는 경험으로 제시한다.
- 한계: 인재 프로필 형태이며 특정 산업이나 OpenAI 제품 경험은 필수가 아니라고 설명한다. 회사 페이지의 지원 링크를 확인했지만 연결 ATS 본문은 추출하지 못했다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J020-S1` [기업·기관 공식 또는 ATS](https://openai.com/careers/applied-ai-engineer-seoul-south-korea/): 본문 확인 · 모집 표시 확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직무 본문과 지원 링크 또는 버튼을 확인했다. 실제 지원 제출은 하지 않았다.
- `J020-S2` [기업·기관 공식 또는 ATS](https://jobs.ashbyhq.com/openai/04435c05-7a05-4802-894d-c173327fbac8/application): 본문 확인 불가 · 미확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 회사 페이지의 지원 링크 대상이지만 본문은 추출하지 못했다. 모집 상태는 미확인이다.

### J021

**OpenAI / Enablement Lead, Knowledge Work**

서울에서 판매 이후 교육·활용 정착을 맡는 역할이다.

- 지역: Seoul, South Korea. 기록 ID: `ashby:8842f4d5-dabb-4b15-a339-36ab13a6db11`.
- 구분: 고객 딜리버리 · 모집 표시 확인 · 게시일 미상.
- 핵심 책임: 고객 온보딩·워크숍·교육 여정을 설계한다. 활성화·지속 사용을 확인하고 교육 자료와 제품 피드백을 개선한다.
- 필수·제시 요건: 고객 대응·교육·enablement 6년 이상을 인재 프로필로 제시한다. 제품 이해, 워크숍 설계와 AI 기능을 업무 결과에 연결하는 소통을 기대한다.
- 우대 요약: 확인된 별도 목록 없음.
- 한계: 인재 프로필 형태의 조건이다. 직접 소프트웨어 구현을 요구하는 엔지니어 공고와 구분한다. 지원 링크가 보이지만 연결 ATS 본문은 추출하지 못했다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P2](../projects/02-human-approved-workflow.md) · [P4](../projects/04-production-pilot.md)

- `J021-S1` [기업·기관 공식 또는 ATS](https://openai.com/careers/enablement-lead-knowledge-work-seoul-south-korea/): 본문 확인 · 모집 표시 확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직무 본문과 지원 링크 또는 버튼을 확인했다. 실제 지원 제출은 하지 않았다.
- `J021-S2` [기업·기관 공식 또는 ATS](https://jobs.ashbyhq.com/openai/8842f4d5-dabb-4b15-a339-36ab13a6db11/application): 본문 확인 불가 · 미확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 회사 페이지의 지원 링크 대상이지만 본문은 추출하지 못했다. 모집 상태는 미확인이다.

### J022

**OpenAI / Applied AI Architect**

서울에서 판매 전후의 기술 계정과 도입 경로를 맡는 역할이다.

- 지역: Seoul, South Korea. 기록 ID: `ashby:ad06299f-d4e2-4de6-a925-b2e94b3c1d0b`.
- 구분: 혼합 · 모집 표시 확인 · 게시일 미상.
- 핵심 책임: 고객의 과제 포트폴리오·설계·평가·채택 계획을 이끈다. 구현·교육 전문가를 연결하고 실행 책임과 인수인계를 나눈다.
- 필수·제시 요건: 고객 기술 역할과 기업 기술 평가·운영 채택 경험을 제시한다. 클라우드·API·보안·AI 평가, 프로토타입과 기술 계정 계획 역량을 기대한다.
- 우대 요약: 확인된 별도 목록 없음.
- 한계: 판매 전후의 기술 계정 책임이며 구현 실행은 참여한 전문 팀이 맡는다고 설명한다. 조건은 인재 프로필 형태이며 지원 링크 이후 ATS 본문은 추출하지 못했다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J022-S1` [기업·기관 공식 또는 ATS](https://openai.com/careers/applied-ai-architect-seoul-south-korea/): 본문 확인 · 모집 표시 확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직무 본문과 지원 링크 또는 버튼을 확인했다. 실제 지원 제출은 하지 않았다.
- `J022-S2` [기업·기관 공식 또는 ATS](https://jobs.ashbyhq.com/openai/ad06299f-d4e2-4de6-a925-b2e94b3c1d0b/application): 본문 확인 불가 · 미확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 회사 페이지의 지원 링크 대상이지만 본문은 추출하지 못했다. 모집 상태는 미확인이다.

### J023

**뉴셀렉트(주) / AX Product Manager**

전사 업무 문제를 정의하고 에이전트를 직접 만드는 AX PM 공고다.

- 지역: 서울 성동구. 기록 ID: `remember:325079`.
- 구분: 내부 AX · 마감 표시 확인 · 게시일 미상.
- 핵심 책임: 현업 병목·입출력·성공 기준을 정한다. 엔지니어가 만든 기반 위에 프로토타입을 배포하고 현업 피드백으로 개선한다.
- 필수·제시 요건: PM·사업개발·컨설팅·기획 등 2년 이상과 문제를 해결책으로 구체화한 경험을 요구한다. AI 코딩 도구로 결과물을 만들고 이해관계자와 협업한 경험을 요구한다.
- 우대 요약: 마케팅·SCM·재무 도메인, 부서 간 리딩과 SQL 분석을 우대한다.
- 한계: 검색 요약에는 지원 가능으로 보였지만 직접 연 본문은 마감된 공고였다. 본문은 유관 경험 2년 이상을 요구하며 상단은 2~7년·학사 이상으로 요약한다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P1](../projects/01-safe-assistant.md) · [P4](../projects/04-production-pilot.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J023-S1` [채용 플랫폼](https://career.rememberapp.co.kr/job/posting/325079): 본문 확인 · 마감 표시 확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직접 연 본문에 마감된 공고 버튼이 있다.

### J024

**인딥에이아이 / AX Engineer / FDE (신입·경력 / 연차 무관)**

고객 AX 딜리버리와 사내 KB·플랫폼 개발을 함께 제시한다.

- 지역: 서울 서초구 양재대로 12길 56 (페이지 분류는 서울 강남구). 기록 ID: `groupby:13339`.
- 구분: 혼합 · 모집 표시 확인 · 게시일 미상.
- 핵심 책임: 고객 업무를 분석하고 Agent·RAG·API 연동을 구현한다. 사내 KB·공통 도구를 만들고 실제 시나리오로 품질을 확인한다.
- 필수·제시 요건: 신입·경력 모두 지원 가능하며 연차 제한이 없다고 명시한다. 한 프로그래밍 언어, API·DB·웹 앱 기초와 비개발 동료·고객 소통을 요구한다.
- 우대 요약: LLM API·LangChain/LangGraph, RAG·벡터DB, MCP·Tool Calling 경험을 우대한다. 서비스 개발, 고객 PoC·AX 프로젝트와 AI 평가 경험을 우대한다.
- 한계: 연차 제한이 없는 단일 공고를 신입 수요 증가나 채용 보장으로 일반화하지 않는다. 본문 주소는 서초구인데 플랫폼 분류는 강남구다. 실제 근무지는 원문 담당자에게 재확인이 필요하다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P1](../projects/01-safe-assistant.md) · [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md)

- `J024-S1` [채용 플랫폼](https://groupby.kr/positions/13339): 본문 확인 · 모집 표시 확인. 발행 미상 / 마감 미상 / 확인 2026-10-26. 직무 본문과 지원하기 액션을 확인했다.

### J025

**대웅 / [대웅] AX Engineer**

현업 요구부터 구현·평가·운영 전환까지 맡는 AX TF 공고다.

- 지역: 서울 강남구. 기록 ID: `remember:344925`.
- 구분: 내부 AX · 마감 표시 확인 · 게시일 미상.
- 핵심 책임: 정답 데이터로 품질을 확인하고 사내 시스템과 AI를 연결한다. 공용 구성요소를 운영하고 실행 방법과 한계를 운영자에게 넘긴다.
- 필수·제시 요건: 학사와 소프트웨어 개발 3년 이상, LLM 기능을 실제 사용자에게 제공한 경험을 요구한다. Python 또는 TypeScript와 불명확한 요구를 구체화한 경험을 요구한다.
- 우대 요약: RAG·벡터 검색, 에이전트·MCP, OCR와 정량 평가를 우대한다. GCP·SSO/OAuth·게이트웨이 운영 경험을 우대한다.
- 한계: 2026-10-25 마감일과 마감된 공고 버튼을 확인했다. Wanted 기록과 원 공고 ID가 연결되지 않아 별도로 유지한다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P1](../projects/01-safe-assistant.md) · [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md)

- `J025-S1` [채용 플랫폼](https://career.rememberapp.co.kr/job/posting/344925): 본문 확인 · 마감 표시 확인. 발행 미상 / 마감 2026-10-25 / 확인 2026-10-26. 2026-10-25 마감일과 마감된 공고 버튼을 확인했다.
- [상태 집계에서 제외한 관련 자료](https://recruit.wanted.co.kr/wd/390449): 같은 회사·직함 또는 유사한 설명이지만 원 공고 ID 대응은 확인되지 않았다. 이 URL의 상태·날짜는 위 공고에 합치지 않는다.

### J026

**대웅 / [대웅] Senior AX Engineer**

AX 과제의 기술 선택·공용 기반·코칭을 맡는 선임 공고다.

- 지역: 서울 강남구. 기록 ID: `remember:344926`.
- 구분: 내부 AX · 마감 표시 확인 · 게시일 미상.
- 핵심 책임: 구축·도입·비구축을 판단하고 과제의 기술 방향과 품질을 관리한다. 게이트웨이·커넥터·평가 기반을 설계하고 코드·보안 리뷰와 코칭을 맡는다.
- 필수·제시 요건: 학사와 개발 5년 이상, 엔터프라이즈 AI 시스템의 설계·운영 경험을 요구한다. 기술 선택과 여러 엔지니어의 출시·운영을 이끈 경험을 요구한다.
- 우대 요약: MCP·게이트웨이·평가 운영, 기업 권한·감사·보안 경험을 우대한다. 클라우드·SSO·CI/CD와 규제 산업 경험을 우대한다.
- 한계: 2026-10-25 마감일과 마감된 공고 버튼을 확인했다. Wanted의 상시 문구를 이 기록의 상태에 적용하지 않는다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P4](../projects/04-production-pilot.md) · [P5](../projects/05-second-workflow-reuse.md)

- `J026-S1` [채용 플랫폼](https://career.rememberapp.co.kr/job/posting/344926): 본문 확인 · 마감 표시 확인. 발행 미상 / 마감 2026-10-25 / 확인 2026-10-26. 2026-10-25 마감일과 마감된 공고 버튼을 확인했다.
- [상태 집계에서 제외한 관련 자료](https://recruit.wanted.co.kr/wd/390450): 같은 회사·직함 또는 유사한 설명이지만 원 공고 ID 대응은 확인되지 않았다. 이 URL의 상태·날짜는 위 공고에 합치지 않는다.

### J027

**윗유 / [윗유] AX Engineer**

기존 사내 플랫폼을 개선하고 업무 자동화를 운영하는 공고다.

- 지역: 서울 강남구. 기록 ID: `remember:347613`.
- 구분: 내부 AX · 모집 표시 확인 · 게시일 미상.
- 핵심 책임: 기존 코드·테스트·관측을 개선하고 현업 자동화 과제를 구현한다. SaaS·데이터를 연결하고 처리 시간·오류·사용 현황을 측정한다.
- 필수·제시 요건: 서비스 운영, 타인 코드의 분석·유지보수와 Git·테스트·리뷰 경험을 요구한다. 웹·자동화 개발, REST·인증·장애 처리와 AI 코딩 결과 검증을 요구한다.
- 우대 요약: Agent/RAG 운영, 이커머스·SaaS 연결과 운영 중 레거시 개선을 우대한다. 커머스 데이터·SQL/Python과 영문 기술문서 경험을 우대한다.
- 한계: 2026-11-09 마감일과 지원 버튼을 확인했다. 실제 지원 제출은 시도하지 않았다. 상단은 경력무관이다. 다른 채널과 원 공고 ID 대응이 확인되지 않아 연차·상태·날짜를 합치지 않는다. 요건은 확인한 본문의 핵심 요약이다. 빈 우대 목록은 우대 조건이 없다는 뜻이 아니라 확인된 별도 목록이 없다는 뜻이다.
- 실습 연결: [P1](../projects/01-safe-assistant.md) · [P3](../projects/03-sandbox-integration.md) · [P4](../projects/04-production-pilot.md)

- `J027-S1` [채용 플랫폼](https://career.rememberapp.co.kr/job/posting/347613): 본문 확인 · 모집 표시 확인. 발행 미상 / 마감 2026-11-09 / 확인 2026-10-26. 2026-11-09 마감일과 간편 지원하기 버튼을 확인했다.
- [상태 집계에서 제외한 관련 자료](https://recruit.wanted.co.kr/wd/392673): 같은 회사·직함 또는 유사한 설명이지만 원 공고 ID 대응은 확인되지 않았다. 이 URL의 상태·날짜는 위 공고에 합치지 않는다.

## 탐색 범위와 보류한 후보

21개 검색어로 공식 채용·기업 페이지와 채용 플랫폼을 탐색하고 기존 역할 문서의 URL 15개를 다시 열었다. 주 목록은 직접 읽은 직무 본문으로 제한했다. 아래 자료 9개는 본문·원문 대응·직무 범위 등의 한계 때문에 별도로 남겼다. 결과 수와 플랫폼 검색 총수로 채용 증가율·평균 연봉을 계산하지 않는다.

- [셀트리온 / AX Engineer (SW Development)](https://www.bzpp.co.kr/biz/businessDetailView/BR260807A00443): 플랫폼이 외부 공고를 선별 게재한다고 명시. 본문은 읽었으나 공식 원문·원 공고 ID와 회사별 지원 상태를 못 확인해 주 레지스트리 승격 보류.
- [뉴셀렉트(주) / AX Engineer](https://www.saramin.co.kr/zf_user/jobs/view?rec_idx=54393341): 직무 세부 내용이 이미지로만 표시되어 원문 자격·책임을 검증하지 못함. 날짜·마감 메타데이터만 확인.
- [QueryPie / AX Engineer(실무형 인턴)](https://cse.cau.ac.kr/sub05/sub0502.php?code=oktomato_bbs07&keyword=&nmode=view&offset=1&search=&temp1=&uid=5172): 대학 재게시 검색 결과에는 날짜가 있으나 직접 열기는 timeout. 원 회사 공고·현재 모집 상태 미확인.
- [카카오 / Data Scientist (경력)](https://careers.kakao.com/jobs/P-14324): 검색 요약에는 내부 업무 혁신 한 항목이 있지만 직접 원문은 JavaScript 안내뿐. 주 업무도 광고/데이터 제품이어서 AX 직무로 승격하지 않음.
- [카카오헬스케어 / Data Engineer(Healthcare)](https://careers.kakao.com/jobs/S-4689): 직접 열기는 JavaScript 안내뿐. 검색 요약의 AI 자동화 한 항목만으로 AX 역할로 승격하지 않음.
- [미리디 / [미리디] AX 엔지니어 (AX Engineer)](https://recruit.wanted.co.kr/wd/366267): 이전 모집·역할 자료로 별도 보존. Enablement·라이선스·오피스아워·가이드 중심이고 384409와 원 공식 ID 대응이 미확인이라 새로운 채용 수요로 중복 집계하지 않음.
- [윗유 / [AX] AX Engineer](https://www.jobkorea.co.kr/Recruit/GI_Read/50180801): 직접 본문에는 역할·접수일·활성 지원 상태가 추출되지 않음. 검색 요약의 10/16 등록·11/14 마감은 주 레코드 날짜에 대입하지 않음.
- [SK AX 등 / AX 문자열 일반 검색 결과](https://www.saramin.co.kr/zf_user/search?searchword=AX): 회사명·사업부명·일반 개발직이 섞인 검색 총수를 AX Engineer 채용 건수로 사용하지 않음.
- [윗유 / AX Engineer](https://m.saramin.co.kr/job-search/view?rec_idx=55308192): 직무 세부 본문은 확인하지 못함. 마감 상태와 접수일만 확인했으며 Wanted/Remember의 공식 원 공고 ID 대응이 불명확해 상태·날짜를 병합하지 않음.

<details>
<summary>사용한 검색어</summary>

```text
"AX Engineer" 채용 공식 2026
"AX 엔지니어" 채용 "greetinghr"
"AX Product Manager" 채용
"AI Automation" "Korea" careers
"AX Engineer" site:recruit.wanted.co.kr/wd
"AX 엔지니어" site:career.greetinghr.com
"AX Product Manager" "대웅" "wanted"
"AI Enablement" "Engineer" "Seoul" careers
"대웅" "AX Product Manager" site:recruit.wanted.co.kr
"AX Engineer" "뉴셀렉트" 채용
"AX Product Manager" "뉴셀렉트" 채용
"AX Engineer" "윗유" 채용 공식
"AX Engineer" site:careers.kakao.com
"AI Enablement" site:toss.im/career
"AX Engineer" "윗유" "채용" -site:wanted.co.kr -site:zighang.com -site:saramin.co.kr
"AX Product Manager" "뉴셀렉트" "greetinghr"
site:career.rememberapp.co.kr "뉴셀렉트" "AX Product Manager"
site:recruit.wanted.co.kr "뉴셀렉트" "AX Engineer"
"AX Engineer" site:jobs.smartrecruiters.com Korea
"AX" "Engineer" site:careers.krafton.com
"AI" "업무 자동화" site:careers.kakao.com
```

</details>

라포랩스의 2026-04-10 현장 글과 Anthropic의 2026-10-02 교육 발표는 [역할 검토](ax-engineer-role-review.md)에 남겼다. 채용 공고가 아니므로 위 27개에 포함하지 않는다. 직무명과 검색 노출의 차이, 접근 실패와 게시일 누락 때문에 이 자료가 전체 시장을 포괄한다고 볼 수 없다.
