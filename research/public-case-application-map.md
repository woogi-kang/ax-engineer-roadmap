# 공개 AX 사례 적용 맵

이 문서는 [공개 AX 사례 카탈로그](public-ax-cases.md)의 25개 사례를 로드맵에서 어떻게 사용하는지 추적한다. 공개 조직의 구현을 복제하거나 성과를 재현했다고 주장하지 않는다. 각 사례에서 **설계 질문과 통제 패턴만 추출**하고, 실습은 합성 데이터와 샌드박스로 다시 정의한다.

- 확인일: `2026-08-01`
- 공개 근거: `K01~K10`, `G01~G15`
- 로드맵 적용: 기존 사례 10개 보강, 신규 시뮬레이션 사례 5개

## 적용 원칙

1. 공개 자료에서 확인한 사실과 로드맵이 제안하는 설계를 분리한다.
2. 기업 발표 수치는 배경 근거로만 사용하고 실습의 성공 지표로 복사하지 않는다.
3. 회사명이나 제품명이 아니라 시작 사건, 원본 시스템, 승인, 실행, 평가, 복구를 옮긴다.
4. 실제 데이터와 권한이 없으면 `simulation-design` 또는 `public-simulation`보다 높은 근거 단계를 쓰지 않는다.
5. 같은 패턴이 여러 산업에 나타나면 업무 기능은 `primary_domain`, 산업 조건은 `industry`로 나눠 기록한다.

## 25개 사례의 적용 위치

| 공개 ID | 추출한 운영 패턴 | 로드맵 적용 위치 | 적용 방식 |
|---|---|---|---|
| K01 | 출처가 있는 답변 초안, 의미 기반 군집, 담당자 일괄 처리 승인 | [민원 답변 사례](../case-studies/public-service-petition-response/README.md) | 신규 실습 |
| K02 | 재무·산업 자료 통합, 분석과 승인 분리 | [여신·인수심사 사례](../case-studies/credit-underwriting-review/README.md) | 신규 실습 |
| K03 | 생성형 추천과 결정론적 상품 규칙 분리 | [여신·인수심사 사례](../case-studies/credit-underwriting-review/README.md) | 신규 실습 |
| K04 | 실시간 지식 추천, 상담사 예외 처리, 후처리 기록 | [메일 보조](../case-studies/centralized-mail-assist/README.md), [민원 답변](../case-studies/public-service-petition-response/README.md) | 기존 보강·신규 실습 |
| K05 | 회의 요약, 결정·제안 구분, 외부 발송 전 확인 | [회의 실행 항목](../case-studies/slack-meeting-actions/README.md) | 기존 보강 |
| K06 | 센서·영상 이상 탐지, 작업자 경고, 수동 조치 | [설비 이상 사례](../case-studies/equipment-anomaly-maintenance/README.md) | 신규 실습 |
| K07 | 품질 예측과 실제 시험 결과의 차이, 출시 승인 | [설비 이상 사례](../case-studies/equipment-anomaly-maintenance/README.md) | 신규 실습의 평가 패턴 |
| K08 | 반복 연락, 위험 신호, 사람 상담·현장 지원 이관 | [상담·진료 기록 사례](../case-studies/care-conversation-record/README.md) | 신규 실습 |
| K09 | 행동 이벤트 기록, 민감 영상, 담당자 맥락 검토 | [상담·진료 기록 사례](../case-studies/care-conversation-record/README.md) | 신규 실습의 데이터 통제 |
| K10 | 여러 교육 기록 통합, 교사 수정·승인 | [AX Hub](../case-studies/file-csv-to-ax-hub/README.md), [상담·진료 기록](../case-studies/care-conversation-record/README.md) | 기존 보강·신규 실습 |
| G01 | 고객 동의, 미팅 기록, CRM 쓰기 전 전문가 검토, 회귀 평가 | [회의 실행 항목](../case-studies/slack-meeting-actions/README.md) | 기존 보강 |
| G02 | HR 질의에서 트랜잭션으로 단계적 확장, 사람 이관 | [직원 계정·권한](../case-studies/employee-lifecycle-access/README.md) | 기존 보강 |
| G03 | 자동화 코드·설정 초안, 안전 인터록, 배포 승인 | [설비 이상 사례](../case-studies/equipment-anomaly-maintenance/README.md) | 신규 실습 |
| G04 | 현장 지식 검색, 공장별 차이, 위험 작업 이관 | [AX Hub](../case-studies/file-csv-to-ax-hub/README.md), [설비 이상](../case-studies/equipment-anomaly-maintenance/README.md) | 기존 보강·신규 실습 |
| G05 | 제품·버전·설치 환경을 포함한 기술지원 검색 | [AX Hub](../case-studies/file-csv-to-ax-hub/README.md) | 기존 보강 |
| G06 | 상품 상태 재조회, 원인 후보, 운영 티켓 생성 | [재고 예외](../case-studies/inventory-exception-replenishment/README.md) | 기존 보강 |
| G07 | 대규모 초안, 편집 승인, 수정률과 게시 취소 | [Beauty/D2C VOC](../case-studies/beauty-d2c-voc/README.md) | 기존 보강 |
| G08 | 대화에서 임상 기록 초안, 의료진 승인, EHR 반영 | [상담·진료 기록 사례](../case-studies/care-conversation-record/README.md) | 신규 실습 |
| G09 | 문서별 인용, 법역·권한·비밀유지, 전문가 최종 검토 | [규제 문서 사례](../case-studies/regulated-evidence-document/README.md) | 신규 실습 |
| G10 | 코드 초안보다 결함·재작업·보안·변경 실패 평가 | [회사 에이전트 운영 계층](../case-studies/company-agent-operating-layer/README.md) | 기존 보강 |
| G11 | OCR, 민감정보 제거, 근거 문서와 심사자 승인 | [여신·인수심사 사례](../case-studies/credit-underwriting-review/README.md) | 신규 실습 |
| G12 | 낮은 민감도부터 시작, 공식 정보 원본, 다국어 일관성 | [민원 답변 사례](../case-studies/public-service-petition-response/README.md) | 신규 실습 |
| G13 | 고객 조사, CRM 최신성, 후속 메시지 검수 | [메일 보조](../case-studies/centralized-mail-assist/README.md) | 기존 보강 |
| G14 | 근거와 가정 분리, 문장별 출처, 분야별 승인 | [규제 문서 사례](../case-studies/regulated-evidence-document/README.md) | 신규 실습 |
| G15 | 자동화율보다 복잡 민원 이관, 재문의와 사람 선택권 | [메일 보조](../case-studies/centralized-mail-assist/README.md), [민원 답변](../case-studies/public-service-petition-response/README.md) | 기존 보강·신규 실습 |

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

- `public-simulation`: 실행 가능한 합성 데이터, 평가 세트, 실행 기록을 공개했다.
- `anonymized-practice`: 실제 업무를 식별 불가능하게 만든 실행 근거가 있다.
- `limited-pilot`: 제한 사용자·범위·기간, 승인 경계와 중단 조건을 갖춘 파일럿 근거가 있다.
- `operating-evidence`: 운영 책임, 장애·복구, 품질과 업무 결과를 지속적으로 확인한 근거가 있다.
