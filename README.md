![AX Engineer Roadmap 운영 콘솔 배너](assets/banners/readme/operating-console.png)

# AX Engineer Roadmap

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Bilingual: KO/EN](https://img.shields.io/badge/Bilingual-KO%2FEN-0f766e.svg)](README.md)
[![Status: v0.3.0](https://img.shields.io/badge/Status-v0.3.0-7c3aed.svg)](CHANGELOG.md)

[한국어](README.md) | [English](en/README.md)

AX 엔지니어가 바꿀 업무를 고르고, AI를 기존 데이터와 시스템에 연결하고, 실제 운영까지 이어 가는 데 필요한 로드맵이다. 한국 조직에서 자주 마주치는 결재·권한·규제와 업무 기록·시스템 연동 조건도 함께 다룬다.

주 독자는 현직 AX 엔지니어와 이 직무를 준비하는 사람이다. 현업 실무자, 리더, 데이터·보안·운영 담당자는 AX 엔지니어와 무엇을 함께 결정해야 하는지 자신의 역할에서 참고할 수 있다.

> AX 엔지니어의 일은 데모가 동작할 때 끝나지 않는다.
>
> 실제 사용자가 업무에 적용하고, 문제가 생기면 멈추거나 복구하며, 다른 사람이 이어서 운영할 수 있어야 한다.

## 어떤 업무를 AX로 바꿔 볼 수 있나

익숙한 업무 영역에서 사례를 하나 골라 시작한다. 사례 이름을 누르면 원본 시스템, 담당자 승인, 외부 시스템에 미치는 영향, 실패했을 때 복구하는 방법을 확인할 수 있다.

| 업무 영역 | 사례 | 시작 조건 | 실행 범위 |
|---|---|---|---|
| 고객·매출 | [공개 VOC 반복 문제 → 개선 업무 제안](case-studies/beauty-d2c-voc/README.md) | 공개 데이터 | 읽기·제안 |
| 고객·매출 | [전자세금계산서 발행·입금 대사](case-studies/electronic-tax-invoice-reconciliation/README.md) | 회계·ERP 샌드박스 | 승인 후 테스트 발행 |
| 사람·협업 | [Slack 회의 → 실행 항목](case-studies/slack-meeting-actions/README.md) | SaaS 샌드박스 | 승인 후 기록 |
| 사람·협업 | [입사·이동·퇴사 계정·권한 관리](case-studies/employee-lifecycle-access/README.md) | HR·계정 샌드박스 | 역할별 승인 후 반영 |
| 재무·구매 | [법인카드 거래·영수증 → 전표 초안](case-studies/corporate-card-expense/README.md) | 합성 거래·증빙 | 초안 전용 |
| 재무·구매 | [거래처 등록·계좌 변경 검증](case-studies/vendor-master-account-change/README.md) | 거래처 마스터 샌드박스 | 이중 승인 후 반영 |
| 데이터·운영 | [파일·CSV → 검토 가능한 AX Hub](case-studies/file-csv-to-ax-hub/README.md) | 파일·메신저 | 초안 전용 |
| 데이터·운영 | [재고 예외 → 발주·창고 이동안](case-studies/inventory-exception-replenishment/README.md) | ERP·WMS 샌드박스 | 승인 후 제안 기록 |
| 공통 운영 | [메일 분류·답변 초안](case-studies/centralized-mail-assist/README.md) | 메일 샌드박스 | 발송 전 승인 |
| 공통 운영 | [여러 업무 에이전트 운영](case-studies/company-agent-operating-layer/README.md) | 두 번째 업무·사내 API | 업무별로 제한 |

모든 사례는 공개·합성 데이터 시뮬레이션 또는 시뮬레이션 설계다. `준비 상태`, 위험, P1~P5, 현재 근거 수준은 [전체 사례 비교표](case-studies/README.md)에서 확인할 수 있다.

## 왜 지금 AX Engineer인가

`AX Engineer`는 아직 업계에서 하나로 표준화된 직함이 아니다. 그러나 최근 국내 기업들은 업무를 다시 설계하고, 기존 SaaS·데이터에 AI를 연결하며, 에이전트를 평가·운영하고, 현업이 실제로 쓰도록 정착시키는 사람을 실제로 모집했다. 직함은 달라도 이 일을 맡길 채용 수요는 확인된다.

| 채용 맥락 | 최근 공고 | 역할에서 확인되는 일 |
|---|---|---|
| 대기업 환경 | [한화시스템 — 2026 방산부문 AX 대규모 채용 (AI/ML 엔지니어)](https://www.saramin.co.kr/zf_user/jobs/view?rec_idx=53927637) | RAG·AI Agent, 평가·MLOps, 보안이 필요한 온프레미스 서비스 |
| 성장·제품 조직 | [Lunit — Senior AX Engineer](https://www.wanted.co.kr/wd/368564), [Liner — AX Engineer (Internal)](https://www.wanted.co.kr/wd/353689) | SaaS·데이터 통합과 승인 흐름, 에이전트 하네스·평가·배포·관측 |
| 현업 확산·운영 | [미리디 — AX 엔지니어 (AX Engineer)](https://www.wanted.co.kr/wd/366267), [대웅·WELDA — AX Engineer (3~8년)](https://www.wanted.co.kr/wd/364116) | 현업 자동화·에이전트 구축 지원, 운영·문서화·플레이북과 업무 정착 |

> **2026-07-26 스냅샷.** 채용 공고는 수시로 바뀌거나 종료되며, 위 사례 중 일부도 이미 마감됐다. 비슷한 책임은 `AX Engineer`, `AI/ML Engineer`, `AI Product Engineer`, `FDE`, `DX Engineer`처럼 서로 다른 직함으로 나타난다.

## AX 엔지니어는 어떤 일을 하는가

이 저장소에서 **AX Engineer**는 조직의 업무 문제를 찾고, 업무 흐름을 다시 설계하며, AI를 기존 데이터·시스템·권한 구조에 연결하는 엔지니어를 뜻한다. 직함과 세부 범위는 회사마다 다르지만 다음 책임을 공통으로 다룬다.

- 가치가 큰 업무와 실제 병목을 찾는다.
- 없애거나 단순화할 단계와 AI가 도울 단계를 구분한다.
- 데이터, 소프트웨어, 모델, 권한, 담당자 승인을 하나의 업무 흐름으로 연결한다.
- 품질·비용·보안·장애와 현업 정착 상태를 지속해서 점검하고 관리한다.
- 한 업무에서 확인한 규칙과 도구를 다른 업무에서도 쓸 수 있는지 검증한다.

[역할과 책임 범위 자세히 보기](roadmap/role-model.md)

## 로드맵 구성

```mermaid
flowchart LR
    A["역할과 준비 상태 확인"] --> B["AX 업무 전환 8단계"]
    B --> C["필요한 기술 역량 학습"]
    C --> D["실습 프로젝트"]
    D --> E["현업 조합 사례"]
    E --> F["운영·재사용·조직 확장"]
    F -->|"운영 결과와 새 과제"| A
```

1. [시작점 안내](start-here/README.md): 현재 맡은 책임과 업무 준비 상태를 확인한다.
2. [AX 업무 전환 8단계](delivery-lifecycle/README.md): 한 업무를 발견하고 재설계해 운영까지 연결한다.
3. [AX 엔지니어의 기술 역량](technical-foundations/README.md): 소프트웨어·LLM·에이전트·평가·운영·보안을 학습한다.
4. [실습 프로젝트](projects/README.md): 안전한 보조 도구를 만들고, 두 번째 업무에서 재사용할 부분까지 검증한다.
5. [현업 조합 사례](case-studies/README.md): 준비 상태와 위험에 맞는 사례를 골라 P1~P5를 한 흐름으로 연습한다.
6. [운영과 조직 확장](organization-maturity/README.md): 여러 업무에서 같은 운영 능력을 반복할 수 있는지 확인한다.

[인터랙티브 로드맵 열기](https://woogi-kang.github.io/ax-engineer-roadmap/) · [사이트 실행 안내](site/README.md)

## AX 업무 전환 8단계

8단계를 순서대로 밟되, 운영 결과나 새로운 제약이 발견되면 앞 단계로 돌아가 다시 확인한다.

| 단계 | 핵심 질문 | 문서 |
|---|---|---|
| 1. 목표와 경계 | 무엇을 바꾸고, 무엇은 AI에게 맡기지 않는가? | [보기](delivery-lifecycle/01-outcomes-and-boundaries.md) |
| 2. 현재 업무 파악 | 실제 흐름과 병목은 어디에 있는가? | [보기](delivery-lifecycle/02-workflow-discovery.md) |
| 3. 업무 흐름 재설계 | 없애거나 단순화할 일을 그대로 자동화하고 있지 않은가? | [보기](delivery-lifecycle/03-process-redesign.md) |
| 4. 데이터와 업무 맥락 | 최신 상태를 어디에서 확인하며, 팀마다 용어를 같은 뜻으로 쓰는가? | [보기](delivery-lifecycle/04-data-and-context.md) |
| 5. 실행 규칙과 통제 | 입력·출력·권한·승인·기록·복구 기준은 무엇인가? | [보기](delivery-lifecycle/05-execution-contracts.md) |
| 6. 배포와 운영 | 프로토타입을 어떻게 안정적인 업무 시스템으로 옮기는가? | [보기](delivery-lifecycle/06-production-deployment.md) |
| 7. 현업 적용과 역할 전환 | 새 방식이 공식 업무로 자리 잡으려면 무엇이 바뀌어야 하는가? | [보기](delivery-lifecycle/07-adoption-and-change.md) |
| 8. 표준화와 확장 | 두 번째 업무에서도 실제로 재사용할 수 있는 것은 무엇인가? | [보기](delivery-lifecycle/08-standardization-and-scale.md) |

## 역량을 확인하는 다섯 질문

개념을 아는 것만으로는 역량을 확인하기 어렵다. 각 역량은 아래 질문에 답하고, 그 답을 결과물과 운영 기록으로 보여 줄 수 있는지 확인한다.

1. **이해** — 개념과 원리를 자신의 말로 설명할 수 있는가?
2. **선택** — 조건과 위험을 비교해 이 방법을 선택한 이유를 설명할 수 있는가?
3. **적용** — 실제 업무와 비슷한 데이터·권한·예외 조건에서 직접 적용했는가?
4. **검증** — 다른 사람이 검토하거나 재현할 수 있는 결과물과 기록을 남겼는가?
5. **실패 대응** — 자주 발생하는 오판과 실패를 발견하고, 필요할 때 중단하거나 복구할 수 있는가?

숙련도는 연차나 사용해 본 도구의 수보다 맡을 수 있는 배포·운영 책임으로 구분한다.

- **Foundation(기초)**: 업무를 구조화하고 제한된 프로토타입을 검증한다.
- **Builder(구현)**: 한 업무를 실제 운영 환경에 배포한다.
- **Operator(운영)**: 품질·비용·장애·권한과 현업 정착 상태를 계속 관리한다.
- **Lead(확장)**: 여러 업무에서 반복되는 규칙을 찾아 조직의 공통 운영 방식으로 만든다.

[역량 지도](roadmap/competency-map.md) · [숙련도 기준](roadmap/proficiency-levels.md)

## 어디서 시작할까

### AX 엔지니어 또는 이 직무를 준비하는 사람

1. [역할 모델](roadmap/role-model.md)에서 직무의 책임과 경계를 확인한다.
2. [조직 준비도 진단](start-here/organization-readiness.md)으로 첫 업무에서 가능한 범위를 정한다.
3. [기술 역량](technical-foundations/README.md)에서 부족한 영역을 찾는다.
4. [12주 실습 경로](learning-paths/12-week-practice.md)로 한 업무의 배포와 두 번째 업무의 재사용까지 연결한다.

### 함께 일하는 현업·리더·데이터·보안·운영 담당자

[협업 역할 안내](tracks/README.md)에서 자신이 결정하거나 제공해야 할 내용을 찾는다. 코드를 직접 작성하지 않더라도 업무 기준, 데이터 사용, 승인, 운영, 중단에 대한 책임은 역할별로 나뉜다.

### 기술 용어가 낯선 사람

[비개발자를 위한 AX 용어 안내](start-here/non-developer-glossary.md)에서 LLM, RAG, 에이전트(Agent), MCP, 평가, 로그, 수동 대체를 실제 업무 장면에 맞춰 설명한다.

## 공통 하네스는 언제 만드는가

팀마다 같은 모델·프레임워크·화면을 쓸 필요는 없다. 대신 여러 업무가 함께 지켜야 할 최소 규칙은 맞춰야 한다.

- 최신 데이터를 확인할 원본 시스템
- 입력·출력 형식과 업무 식별자
- 품질 기준과 담당자 승인
- 권한·변경·버전·감사 기록
- 실패 감지, 중단, 복구, 수동 처리
- 비용·품질·업무 결과 확인 방법

첫 업무의 구현을 곧바로 전사 표준으로 만들지는 않는다. 두 번째 업무에서도 실제로 재사용한 규칙과 도구만 공통 하네스에 포함한다.

## 다루지 않는 범위

- 특정 모델·클라우드·에이전트 프레임워크의 순위
- 모든 업무를 AI가 처리하는 조직 설계
- 하나의 에이전트에 전사 데이터와 권한을 집중하는 구조
- 확인되지 않은 생산성·비용·매출 개선 수치
- 자격증 과정이나 채용 보장

## 한국 조직의 맥락을 다루는 방법

업무 발굴, 재설계, 데이터 통합, 평가, 운영 원칙은 지역과 업종에 관계없이 적용할 수 있다. 이 저장소는 여기에 한국 조직에서 자주 확인해야 할 조건을 더한다.

- 문서상의 결재선과 실제 의사결정권이 다른가?
- 개인정보와 AI 관련 현재 법령을 누가 확인하는가?
- 회사와 부서마다 데이터·API·조직 계정의 준비 정도가 얼마나 다른가?
- 도구 구매 뒤 공식 업무 절차와 책임까지 바뀌는가?
- 공급자를 바꾸거나 계약을 종료할 때 데이터와 업무를 되돌릴 수 있는가?

한국 기업 전체가 같은 방식으로 일한다고 가정하지 않는다. 다른 지역의 독자는 법률·조달·노사관계·조직 구조에 해당하는 조건을 현지 상황에 맞게 바꿔 적용할 수 있다.

## 사례를 읽는 방법

위의 빠른 목록은 익숙한 업무에서 시작하기 위한 안내다. [사례 카탈로그](case-studies/README.md)에서는 난이도, 준비 상태, 위험, 외부 쓰기 영향, P1~P5, 현재 근거 수준을 비교할 수 있다.

특정 회사의 내부 진단, 실제 현업 정착, 생산성·비용·매출 개선을 사례 제목만으로 추정하지 않는다. 각 문서의 `결과와 한계`에서 현재 확인한 범위를 따로 밝힌다.

## 기여하기

[AX Engineer 공개 역할 검토](research/ax-engineer-role-review.md)는 현재 채용·현장 자료에서 반복되는 책임을 설명한다. [개발자·AI Agent 로드맵 검토](research/roadmap-benchmark-review.md)는 roadmap.sh에서 참고한 구조와 AX 관점에서 추가한 내용을 기록한다.

- 잘못되거나 오래된 내용은 `Source update` Issue로 제안한다.
- 빠진 역량이나 단계를 발견하면 `Roadmap gap` Issue를 연다.
- 실제 사례는 조직과 개인을 식별할 수 없게 정리한 뒤 `Case study proposal`로 제안한다.
- 모든 기여는 [기여 안내](CONTRIBUTING.md)와 [출처 정책](research/source-policy.md)을 따른다.

## 상태와 라이선스

- 현재 버전: `v0.3.0`
- 기준일: `2026-07-31`
- 상태: AX 엔지니어의 역할·업무 전환·기술 학습·실습·현업 조합 사례를 포함한 공개본
- 적용 범위: 여러 조직에 적용할 AX 원칙과 한국 조직에서 확인할 조건
- 라이선스: [MIT](LICENSE)
