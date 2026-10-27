# AX Engineer Roadmap

[한국어](README.md) · [English](en/README.md)

**AX Engineer**는 업무에서 AI가 도울 부분을 찾고 기존 시스템에 연결해 직접 구현·평가·운영하는 엔지니어입니다. 업무 책임자와 함께 무엇을 자동으로 처리하고 어디서 사람이 판단할지도 정합니다.

이 로드맵은 AX 엔지니어를 준비하는 사람이 **직무를 이해하고 필요한 역량을 익혀 설명할 수 있는 결과물을 만드는 것**을 돕습니다. 여기서 AX는 AI Transformation을 뜻하며 회사마다 직함과 책임 범위는 다릅니다.

## 이 저장소에서 얻을 수 있는 것

### 역할과 채용 요구 이해하기

공개 공고에서 업무 발굴, 시스템 구현, 평가·운영과 현업 지원이 어떻게 나뉘는지 읽습니다. 내부 AX와 고객 대상 기술 직무를 비교하면서 **내가 맡고 싶은 일과 보완할 경험**을 구체화할 수 있습니다.

[역할과 책임 범위](roadmap/role-model.md) · [공고에서 확인한 역할](research/ax-engineer-role-review.md) · [채용 공고 기록](research/hiring-signals.md)

공고는 확인일이 있는 조사 기록으로 제공합니다. 현재 모집 상태는 원문에서 다시 확인해야 합니다.

### 배울 기술과 역량 정리하기

소프트웨어·API, LLM, 에이전트, 도구 호출·MCP, 평가, 운영, 보안을 다룹니다. 각 영역에서 알아야 할 개념뿐 아니라 **어떤 조건에서 선택하고 무엇을 시험할지** 확인할 수 있습니다. 역량 체계와 숙련도 기준으로 이미 해본 일과 앞으로 입증할 일을 나눕니다.

[기술 기초 7영역](technical-foundations/README.md) · [역량 체계](roadmap/competency-map.md) · [숙련도 기준](roadmap/proficiency-levels.md)

### 실제 업무를 바꾸는 순서 익히기

목표와 현재 업무를 파악한 뒤 재설계, 데이터 준비, 실행 통제, 배포·운영, 현업 적용과 확장으로 이어지는 8단계를 살펴봅니다. 단계마다 할 일과 산출물, 통과·중단 조건을 확인하며 **현재 업무와 바꿀 업무의 흐름**을 정리할 수 있습니다.

[업무 전환 8단계](delivery-lifecycle/README.md) · [조직 준비도 진단](start-here/organization-readiness.md) · [한국 조직 적용 조건](research/roadmap-benchmark-review.md)

### 프로젝트로 결과물 만들기

경험에 맞는 첫 과제를 고르고 P1~P5를 따라 범위를 넓힙니다. 조직에 접근할 수 있다면 실전 트랙을, 그렇지 않다면 공개 시뮬레이션을 선택합니다. **코드뿐 아니라 평가·승인·실패·복구 기록**까지 무엇을 남겨야 하는지 안내합니다.

| 실습 | 목표 결과물 |
|---|---|
| [P1 · 안전한 보조 도구](projects/01-safe-assistant.md) | 출처·거절 조건과 평가가 있는 보조 기능 |
| [P2 · 담당자 승인](projects/02-human-approved-workflow.md) | 승인·거절·취소를 기록하는 모의 처리 |
| [P3 · 샌드박스 통합](projects/03-sandbox-integration.md) | 격리된 시스템 연동과 중복·실패 시험 기록 |
| [P4 · 운영 파일럿](projects/04-production-pilot.md) | 제한 운영 또는 실행한 시뮬레이션의 검수·복구 기록 |
| [P5 · 두 번째 업무 재사용](projects/05-second-workflow-reuse.md) | 재사용한 부분과 유지·수정·폐기 판단 |

[실습과 통과 기준](projects/README.md) · [경험별 진입 경로](learning-paths/entry-routes.md) · [12주 실습 경로](learning-paths/12-week-practice.md)

표는 학습 목표입니다. 단계마다 통과 기준을 확인하며 시뮬레이션 결과를 실제 조직의 운영 경험으로 표시하지 않습니다.

### 익숙한 업무에서 적용 사례 찾기

VOC 분석, 회의 후속 업무, 입퇴사 권한 관리, 법인카드 정산, 재고 예외 등 **15개 업무 사례**에서 원본 시스템, 승인 지점과 실패 대응을 비교합니다. 어떤 업무를 첫 과제로 삼을지 고르거나 자신의 업무와 다른 조건을 찾을 때 사용할 수 있습니다.

실행 예제 **1개** · 설계 문서 **14개** · [업무별 사례와 구현 범위](case-studies/README.md)

실행 예제는 합성 데이터·규칙 기반 코드로 P1의 일부 기능을 구현했습니다. 모델 호출·사람 승인 처리나 P1 전체 통과를 입증한 예제는 아닙니다. 별도의 [국내외 공개 사례 40개](research/public-ax-cases.md)에서는 외부 조직이 발표한 업무 흐름과 성과의 근거·한계를 살펴볼 수 있습니다.

<details>
<summary>실행 예제 한 장면: 분류한 뒤에도 확인할 정보가 남는 이유</summary>

> “펌프가 눌리지 않아 내용물을 꺼낼 수 없습니다.”

합성 VOC `voc-006`은 포장 문제(`packaging`)로 분류되지만 제품 ID가 없어 추가 확인 필요(`review_required`)로 표시됩니다. 무엇을 분류했고 어떤 정보가 더 필요한지 설명하는 일도 AX 엔지니어의 몫입니다.

위 문의에 추가 확인이 필요한 이유와 담당자가 확인할 정보를 한 줄씩 적어 보세요. [예제 설명과 산출물](case-studies/beauty-d2c-voc/README.md#현재-공개-결과와-근거)을 살펴보거나 [실행 안내](case-studies/beauty-d2c-voc/RUNBOOK.md)에서 재현할 수 있습니다. 외부 계정·API는 필요하지 않습니다.

</details>

### 실무에 가져다 쓸 양식과 협업 기준 찾기

업무 발굴 카드, 후보 평가표, 실행 규칙, 실험 카드와 근거 기록을 제공합니다. **무엇을 합의하고 어떤 근거를 남길지** 양식에 맞춰 정리할 수 있습니다. 현업·리더·데이터·보안·운영 담당자와 책임을 나누는 방법, 두 번째 업무에서 공통화할 범위도 함께 다룹니다.

[실무 템플릿](toolkit/README.md) · [협업 역할 안내](tracks/README.md) · [공통 운영 기반과 확장](delivery-lifecycle/08-standardization-and-scale.md)

## 어디서 시작하면 좋을까요?

- **직무와 용어가 낯설다면:** [역할 모델](roadmap/role-model.md)과 [비개발자를 위한 용어 안내](start-here/non-developer-glossary.md)부터 읽어 보세요.
- **내 경험으로 첫 과제를 고르고 싶다면:** [경험별 진입 경로](learning-paths/entry-routes.md)에서 필요한 준비와 첫 결과물을 확인하세요.
- **코드를 실행하며 시작하고 싶다면:** [합성 VOC 실행 안내](case-studies/beauty-d2c-voc/RUNBOOK.md)로 현재 공개된 결과를 재현해 보세요.

## 자료의 범위와 참여 방법

실행 예제, 설계 목표, 외부 조직의 발표는 서로 구분합니다. 출처별 확인일과 한계는 [조사 자료](research/README.md)에 기록하며, 달라진 내용은 [변경 기록](CHANGELOG.md)에서 확인할 수 있습니다. 이 로드맵은 채용이나 일정 기간 안의 숙련도 도달을 보장하지 않습니다.

[기여 안내](CONTRIBUTING.md) · [질문과 지원](SUPPORT.md) · [출처 정책](research/source-policy.md) · [프로젝트 운영](GOVERNANCE.md) · [보안](SECURITY.md) · [행동강령](CODE_OF_CONDUCT.md)

최신 릴리스: `v0.4.0` · 이전 릴리스: `v0.3.0` · [MIT License](LICENSE)
