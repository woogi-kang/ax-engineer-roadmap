# 공개 사례-실습 연결표

이 문서는 [공개 AX 사례 카탈로그](public-ax-cases.md)의 25개 사례가 어떤 실습 설계에 반영됐는지 보여 준다. 공개 조직의 구현을 복제하거나 성과를 재현했다고 주장하지 않는다. 각 사례에서 **설계에 참고할 질문과 통제 방식만 골라** 합성 데이터와 샌드박스로 새 실습을 구성한다.

- 기존 연결표 기준일: `2026-08-01`
- 일부 근거 보강일: `2026-10-26` (K04·K05·K07·K08·K09·G02·G07·G08·G10만 확인)
- 공개 근거: `K01~K10`, `G01~G15`
- 로드맵 반영: 기존 사례 10개 보완, 신규 시뮬레이션 사례 5개

## 반영 원칙

1. 공개 자료에서 확인한 사실과 로드맵이 제안하는 설계를 분리한다.
2. 기업 발표 수치는 배경 근거로만 사용하고 실습의 성공 지표로 복사하지 않는다.
3. 회사명이나 제품명은 복사하지 않는다. 시작 사건, 원본 시스템, 승인, 실행, 평가, 복구 방식만 실습에 반영한다.
4. 실제 데이터와 권한이 없으면 `simulation-design` 또는 `public-simulation`보다 높은 근거 단계를 쓰지 않는다.
5. 같은 패턴이 여러 산업에 나타나면 업무 기능은 `primary_domain`, 산업 조건은 `industry`로 나눠 기록한다.

## 25개 사례를 반영한 위치

| 공개 ID | 사례에서 확인한 운영 방식 | 로드맵 실습 | 반영 방법 |
|---|---|---|---|
| K01 | 출처가 있는 답변 초안, 의미 기반 군집, 담당자 일괄 처리 승인 | [민원 답변 사례](../case-studies/public-service-petition-response/README.md) | 신규 실습 |
| K02 | 재무·산업 자료 통합, 분석과 승인 분리 | [여신·인수심사 사례](../case-studies/credit-underwriting-review/README.md) | 신규 실습 |
| K03 | 생성형 추천과 결정론적 상품 규칙 분리 | [여신·인수심사 사례](../case-studies/credit-underwriting-review/README.md) | 신규 실습 |
| K04 | 실시간 지식 추천, 상담사 예외 처리, 후처리 기록 | [메일 보조](../case-studies/centralized-mail-assist/README.md), [민원 답변](../case-studies/public-service-petition-response/README.md) | 기존 보강·신규 실습 |
| K05 | 회의 요약, 결정·제안 구분, 외부 발송 전 확인 | [회의 후속 업무](../case-studies/slack-meeting-actions/README.md) | 기존 실습 보완 |
| K06 | 센서·영상 이상 탐지, 작업자 경고, 수동 조치 | [설비 이상 사례](../case-studies/equipment-anomaly-maintenance/README.md) | 신규 실습 |
| K07 | 품질 예측과 실제 시험 결과의 차이, 출시 승인 | [설비 이상 사례](../case-studies/equipment-anomaly-maintenance/README.md) | 신규 실습의 평가 패턴 |
| K08 | 반복 연락, 위험 신호, 사람 상담·현장 지원 이관 | [상담·진료 기록 사례](../case-studies/care-conversation-record/README.md) | 신규 실습 |
| K09 | 행동 이벤트 기록, 민감 영상, 담당자 맥락 검토 | [상담·진료 기록 사례](../case-studies/care-conversation-record/README.md) | 신규 실습의 데이터 통제 |
| K10 | 여러 교육 기록 통합, 교사 수정·승인 | [AX Hub](../case-studies/file-csv-to-ax-hub/README.md), [상담·진료 기록](../case-studies/care-conversation-record/README.md) | 기존 보강·신규 실습 |
| G01 | 고객 동의, 미팅 기록, CRM 쓰기 전 전문가 검토, 회귀 평가 | [회의 후속 업무](../case-studies/slack-meeting-actions/README.md) | 기존 실습 보완 |
| G02 | HR 문의에서 증명서 발급·휴가 처리로 단계적 확장, 담당자 인계 | [직원 계정·권한](../case-studies/employee-lifecycle-access/README.md) | 기존 실습 보완 |
| G03 | 자동화 코드·설정 초안, 안전 인터록, 배포 승인 | [설비 이상 사례](../case-studies/equipment-anomaly-maintenance/README.md) | 신규 실습 |
| G04 | 현장 지식 검색, 공장별 차이, 위험 작업 이관 | [AX Hub](../case-studies/file-csv-to-ax-hub/README.md), [설비 이상](../case-studies/equipment-anomaly-maintenance/README.md) | 기존 보강·신규 실습 |
| G05 | 제품·버전·설치 환경을 포함한 기술지원 검색 | [AX Hub](../case-studies/file-csv-to-ax-hub/README.md) | 기존 보강 |
| G06 | 상품 상태 재조회, 원인 후보, 운영 티켓 생성 | [재고 예외](../case-studies/inventory-exception-replenishment/README.md) | 기존 보강 |
| G07 | 대규모 초안, 편집 승인, 수정률과 게시 취소 | [Beauty/D2C VOC](../case-studies/beauty-d2c-voc/README.md) | 기존 보강 |
| G08 | 대화에서 임상 기록 초안, 의료진 승인, EHR 반영 | [상담·진료 기록 사례](../case-studies/care-conversation-record/README.md) | 신규 실습 |
| G09 | 문서별 인용, 법역·권한·비밀유지, 전문가 최종 검토 | [규제 문서 사례](../case-studies/regulated-evidence-document/README.md) | 신규 실습 |
| G10 | 코드 초안과 함께 결함·재작업·보안·변경 실패 평가 | [여러 업무를 위한 에이전트 운영 기반](../case-studies/company-agent-operating-layer/README.md) | 기존 실습 보완 |
| G11 | OCR, 민감정보 제거, 근거 문서와 심사자 승인 | [여신·인수심사 사례](../case-studies/credit-underwriting-review/README.md) | 신규 실습 |
| G12 | 낮은 민감도부터 시작, 공식 정보 원본, 다국어 일관성 | [민원 답변 사례](../case-studies/public-service-petition-response/README.md) | 신규 실습 |
| G13 | 고객 조사, CRM 최신성, 후속 메시지 검수 | [메일 보조](../case-studies/centralized-mail-assist/README.md) | 기존 보강 |
| G14 | 근거와 가정 분리, 문장별 출처, 분야별 승인 | [규제 문서 사례](../case-studies/regulated-evidence-document/README.md) | 신규 실습 |
| G15 | 자동화율보다 복잡 민원 이관, 재문의와 사람 선택권 | [메일 보조](../case-studies/centralized-mail-assist/README.md), [민원 답변](../case-studies/public-service-petition-response/README.md) | 기존 보강·신규 실습 |

## 2026-10-26 후속 근거를 적용하는 방법

| 공개 ID | 이번에 추가할 시험 | 옮겨 주장하지 않을 내용 |
|---|---|---|
| K04 | 사람 상담 선택, 예외 이관, AI 평가 결과를 검토한 뒤 코칭에 반영하는 흐름 | 서로 다른 발표의 19%와 16%를 같은 지표의 추세로 읽지 않는다. |
| K05 | 조직별 권한·문서 범위·담당자 승인과 도입 계획/실제 사용을 구분한 확인표 | 정부 부처의 도입 확정을 운영 성과로 바꾸거나 사내 시간 절감률을 적용하지 않는다. |
| G02 | 전후 수치의 지표명·산식·분모가 같은지 확인하고 다른 지표는 따로 보고 | NPS -35와 CSAT +74를 같은 지표의 상승 추세로 읽지 않는다. |
| G08 | 같은 대화에서 관계상 중요 사건의 누락, 의료진 추가 기록과 수정 부담을 비교하는 평가 세트 | 47건 단일기관 연구를 모든 의료 기록이나 최신 모델의 정확도로 일반화하지 않는다. |

이 표는 [카탈로그의 후속 주장](public-ax-cases.md)을 실습 요구로 옮긴다. 실습 결과 자체를 새로 검증한 것은 아니다. 실행 가능한 공개 시뮬레이션 1개와 실행 전 설계 14개의 근거 단계는 그대로 유지한다.

## 신규 사례를 선택한 이유

기존 10개 사례에 없던 통제 문제를 우선했다.

| 신규 사례 | 새로 추가되는 핵심 학습 |
|---|---|
| 공공 민원 답변 | 법령·정책 출처, 잘못 묶인 민원 분리, 대외 답변 승인 |
| 여신·인수심사 검토 | 재무 원본, 규칙 버전, 추천과 결정의 분리, 고위험 거절 |
| 설비 이상·정비 | 시계열 상태, 경고 임계값, 오탐·누락 비용, 물리 작업 승인 |
| 상담·진료 기록 | 민감 대화, 전문직 기록 승인, 위험 신호의 긴급 이관 |
| 규제 근거 문서 | 문장별 인용, 사실·가정 분리, 분야별 승인과 버전 영향 |

## 승격 기준

신규 사례는 모두 문서 기준의 `ready`이며 근거 단계는 `simulation-design`이다. 아래 근거가 생길 때만 다음 단계로 바꾼다.

- `public-simulation`: 합성 입력, 다시 실행할 수 있는 코드, 평가 세트와 실행 기록을 공개했다.
- `anonymized-practice`: 실제 업무 기록에서 식별 정보를 제거하고 다시 실행한 근거가 있다.
- `limited-pilot`: 제한된 사용자·범위·기간, 승인 조건과 중단 조건을 갖춘 소규모 운영 시험 기록이 있다.
- `operating-evidence`: 운영 책임, 장애·복구, 품질과 업무 결과를 계속 확인한 실제 운영 기록이 있다.
