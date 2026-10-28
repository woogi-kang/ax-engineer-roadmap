# 업무별 적용 사례

사례는 로드맵의 원칙을 한 업무에 끝까지 적용해 보는 실습이다. 각 사례에서 원본 시스템을 확인하고 승인, 실행, 평가, 복구를 어떤 순서로 처리하는지 살펴본다.

모든 사례는 [다섯 개 실습 프로젝트](../projects/README.md)의 통과 기준을 사용한다. `ready`는 문서가 실습에 사용할 수 있는 상태라는 뜻이며, 실제 조직에서 운영 성과를 검증했다는 뜻이 아니다.

현재 공개 근거는 **재현 가능한 공개 시뮬레이션 1개와 실행 전 설계 문서 14개**다. 현재 공개 결과는 모두 외부 시스템을 바꾸지 않는다. 아래 `목표 실행 범위`와 `설계 P단계`는 앞으로 연습할 최대 범위이며, 구현 완료나 조직 운영을 뜻하지 않는다.

Beauty/D2C VOC의 16건은 기존 데모를 재현하는 합성 평가 세트다. P1의 일부 기능이 구현됐지만 최소 20개 평가와 개발에 쓰지 않은 새 입력의 독립 검수까지 통과했다는 근거는 아니다. 설계 사례의 P 단계 표도 공통 통과 기준을 대체하지 않는다.

## 업무별 사례 목록

| 업무·산업 | 사례 | 난이도·위험 | 준비 상태 | 목표 실행 범위 | 설계 P단계 | 현재 근거·바로가기 |
|---|---|---|---|---|---|---|
| 고객·매출 · 소비자/리테일 | [Beauty/D2C 글로벌 VOC → 업무 제안](beauty-d2c-voc/README.md) | 1 · 보통 | 메신저·파일, SaaS | 읽기·제안 뒤 승인된 샌드박스 쓰기 | P1·P2·P3·P5 | [재현 가능한 공개 시뮬레이션](beauty-d2c-voc/README.md#현재-공개-결과와-근거) |
| 고객·매출 · 공공 | [공공 민원 → 근거 답변·중복 묶음](public-service-petition-response/README.md) | 2 · 높음 | 메신저·파일, SaaS | 초안 전용 | P1~P3 | [실행 전 설계 문서](public-service-petition-response/README.md#현재-공개-결과와-근거) |
| 사람·협업 · 공통 | [Slack 회의 기록에서 승인할 후속 업무 찾기](slack-meeting-actions/README.md) | 2 · 보통 | SaaS, 사내 API | 승인 후 샌드박스 쓰기 | P1~P5 | [실행 전 설계 문서](slack-meeting-actions/README.md#현재-공개-결과와-근거) |
| 사람·협업 · 공통 | [입사·이동·퇴사 → 계정·권한 운영](employee-lifecycle-access/README.md) | 3 · 높음 | SaaS, 사내 API | 역할별 승인 후 샌드박스 쓰기 | P1~P5 | [실행 전 설계 문서](employee-lifecycle-access/README.md#현재-공개-결과와-근거) |
| 재무·구매 · 공통 | [법인카드·경비 증빙 → 전표 초안](corporate-card-expense/README.md) | 2 · 보통 | 메신저·파일, SaaS | 초안 전용 | P1~P3 | [실행 전 설계 문서](corporate-card-expense/README.md#현재-공개-결과와-근거) |
| 재무·구매 · 공통 | [매출 근거 → 전자세금계산서 발행·입금 대사](electronic-tax-invoice-reconciliation/README.md) | 4 · 높음 | SaaS, 사내 API | 승인 후 샌드박스 쓰기 | P1~P4 | [실행 전 설계 문서](electronic-tax-invoice-reconciliation/README.md#현재-공개-결과와-근거) |
| 재무·구매 · 공통 | [거래처 등록·계좌 변경 → 검증 가능한 승인](vendor-master-account-change/README.md) | 4 · 높음 | SaaS, 사내 API | 이중 승인 후 샌드박스 쓰기 | P1~P4 | [실행 전 설계 문서](vendor-master-account-change/README.md#현재-공개-결과와-근거) |
| 재무·구매 · 금융 | [기업 자료 → 여신·인수심사 검토 초안](credit-underwriting-review/README.md) | 4 · 높음 | 메신저·파일, SaaS, 사내 API | 초안 전용 | P1~P3 | [실행 전 설계 문서](credit-underwriting-review/README.md#현재-공개-결과와-근거) |
| 데이터·운영 · 공통 | [흩어진 파일·CSV → 검토 가능한 업무 허브(AX Hub)](file-csv-to-ax-hub/README.md) | 1 · 보통 | 메신저·파일, SaaS | 초안 전용 | P1·P2·P3·P5 | [실행 전 설계 문서](file-csv-to-ax-hub/README.md#현재-공개-결과와-근거) |
| 데이터·운영 · 법무/생명과학 | [근거 자료 → 출처 연결 규제 문서 초안](regulated-evidence-document/README.md) | 4 · 높음 | 메신저·파일, SaaS, 사내 API | 초안 전용 | P1~P3 | [실행 전 설계 문서](regulated-evidence-document/README.md#현재-공개-결과와-근거) |
| 데이터·운영 · 소비자/리테일 | [재고 예외 → 발주·창고 이동 제안](inventory-exception-replenishment/README.md) | 4 · 높음 | SaaS, 사내 API | 승인 후 제안 기록 | P1~P4 | [실행 전 설계 문서](inventory-exception-replenishment/README.md#현재-공개-결과와-근거) |
| 데이터·운영 · 제조 | [설비 이상 → 정비 제안](equipment-anomaly-maintenance/README.md) | 4 · 높음 | 사내 API | 승인 후 샌드박스 쓰기 | P1~P4 | [실행 전 설계 문서](equipment-anomaly-maintenance/README.md#현재-공개-결과와-근거) |
| 데이터·운영 · 의료/복지 | [상담·진료 대화 → 기록·위험 이관](care-conversation-record/README.md) | 5 · 높음 | 메신저·파일, SaaS, 사내 API | 초안 전용 | P1~P3 | [실행 전 설계 문서](care-conversation-record/README.md#현재-공개-결과와-근거) |
| 공통 기능·운영 · 공통 | [여러 업무가 함께 쓰는 메일 보조](centralized-mail-assist/README.md) | 4 · 높음 | SaaS, 사내 API | 발송 전 승인 | P1~P5 | [실행 전 설계 문서](centralized-mail-assist/README.md#현재-공개-결과와-근거) |
| 공통 기능·운영 · 공통 | [여러 업무를 위한 에이전트 운영 기반](company-agent-operating-layer/README.md) | 5 · 높음 | SaaS, 사내 API | 업무별로 제한 | P2~P5 | [실행 전 설계 문서](company-agent-operating-layer/README.md#현재-공개-결과와-근거) |

사례명과 근거 단계만으로 특정 회사의 내부 상태, 실제 사용 여부, 공식 절차 전환이나 생산성·비용·매출 개선 효과를 추정해서는 안 된다.

## 공개 사례·실패 사례와의 연결

각 사례 문서는 두 종류의 외부 근거와 연결된다. [공개 사례-실습 연결표](../research/public-case-application-map.md)는 외부 조직이 발표한 업무 흐름에서 어떤 통제 방식을 설계에 가져왔는지 보여 준다. [공개 AX 실패·중단 사례](../research/ax-failure-cases.md)는 비슷한 업무가 왜 멈추거나 되돌려졌는지 기록한다. 관련 점검 항목은 각 사례 문서의 `실패 사례 점검`에 옮겨 두었다.

두 자료 모두 외부 조직의 발표·보도·공적 기록이며 이 저장소 사례의 실행 결과가 아니다. 아래 표는 [`ax-failure-cases.json`](../research/ax-failure-cases.json)의 `related_case_studies`에서 생성한다. 연결한 기록이 없는 사례에도 [캡스톤 설계 점검표](../research/ax-failure-cases.md#캡스톤-설계에-쓰는-점검표)의 여덟 질문을 그대로 적용한다.

<!-- failure-cases:start -->
| 사례 | 연결한 실패·중단 사례 |
|---|---|
| [Beauty/D2C 글로벌 VOC → 업무 제안](beauty-d2c-voc/README.md) | FG08 CNET |
| [공공 민원 → 근거 답변·중복 묶음](public-service-petition-response/README.md) | FK04 고용노동부 (구직급여 상담 챗봇), FG02 Air Canada, FG03 New York City (MyCity) |
| [Slack 회의 기록에서 승인할 후속 업무 찾기](slack-meeting-actions/README.md) | FG05 Department for Business and Trade |
| [입사·이동·퇴사 → 계정·권한 운영](employee-lifecycle-access/README.md) | FG12 Amazon |
| [법인카드·경비 증빙 → 전표 초안](corporate-card-expense/README.md) | 없음. 공통 점검표 사용 |
| [매출 근거 → 전자세금계산서 발행·입금 대사](electronic-tax-invoice-reconciliation/README.md) | 없음. 공통 점검표 사용 |
| [거래처 등록·계좌 변경 → 검증 가능한 승인](vendor-master-account-change/README.md) | 없음. 공통 점검표 사용 |
| [기업 자료 → 여신·인수심사 검토 초안](credit-underwriting-review/README.md) | FG10 Zillow Group (Zillow Offers) |
| [흩어진 파일·CSV → 검토 가능한 업무 허브(AX Hub)](file-csv-to-ax-hub/README.md) | FK02 교육부 (AI 디지털교과서) |
| [근거 자료 → 출처 연결 규제 문서 초안](regulated-evidence-document/README.md) | FG06 Deloitte Australia · DEWR |
| [재고 예외 → 발주·창고 이동 제안](inventory-exception-replenishment/README.md) | FG10 Zillow Group (Zillow Offers) |
| [설비 이상 → 정비 제안](equipment-anomaly-maintenance/README.md) | 없음. 공통 점검표 사용 |
| [상담·진료 대화 → 기록·위험 이관](care-conversation-record/README.md) | FK01 스캐터랩 (이루다), FG09 National Eating Disorders Association, FG11 MD Anderson Cancer Center · IBM Watson |
| [여러 업무가 함께 쓰는 메일 보조](centralized-mail-assist/README.md) | FG01 McDonald's · IBM, FG02 Air Canada, FG04 Commonwealth Bank of Australia |
| [여러 업무를 위한 에이전트 운영 기반](company-agent-operating-layer/README.md) | FK03 삼성전자, FG07 Replit · SaaStr |
<!-- failure-cases:end -->

## 추천 학습 순서

1. [흩어진 파일·CSV → 검토 가능한 업무 허브(AX Hub)](file-csv-to-ax-hub/README.md)
2. [Beauty/D2C 글로벌 VOC → 업무 제안](beauty-d2c-voc/README.md)
3. [공공 민원 → 근거 답변·중복 묶음](public-service-petition-response/README.md)
4. [Slack 회의 기록에서 승인할 후속 업무 찾기](slack-meeting-actions/README.md)
5. [법인카드·경비 증빙 → 전표 초안](corporate-card-expense/README.md)
6. [근거 자료 → 출처 연결 규제 문서 초안](regulated-evidence-document/README.md)
7. [입사·이동·퇴사 → 계정·권한 운영](employee-lifecycle-access/README.md)
8. [여러 업무가 함께 쓰는 메일 보조](centralized-mail-assist/README.md)
9. [매출 근거 → 전자세금계산서 발행·입금 대사](electronic-tax-invoice-reconciliation/README.md)
10. [거래처 등록·계좌 변경 → 검증 가능한 승인](vendor-master-account-change/README.md)
11. [기업 자료 → 여신·인수심사 검토 초안](credit-underwriting-review/README.md)
12. [재고 예외 → 발주·창고 이동 제안](inventory-exception-replenishment/README.md)
13. [설비 이상 → 정비 제안](equipment-anomaly-maintenance/README.md)
14. [상담·진료 대화 → 기록·위험 이관](care-conversation-record/README.md)
15. [여러 업무를 위한 에이전트 운영 기반](company-agent-operating-layer/README.md)

앞 순서는 사례의 우열이 아니라 책임이 커지는 순서다. 사례 안의 P1~P5는 같은 업무를 어디까지 운영할지 나타내며, 위 순서와 역할이 다르다.

## 사례 범위 구분

- **업무 흐름**: 한 팀이 시작과 완료를 확인할 수 있는 구체적인 업무를 다룬다.
- **여러 업무 공통 기능**: 여러 업무가 함께 쓰는 커넥터와 권한·감사 방식을 검증한다.
- **조직 단위 종합 실습**: 두 번째 업무에서 재사용한 결과를 확인한 뒤, 조직이 함께 쓸 운영 기반의 범위를 시험한다.

여러 사례는 기존 SaaS를 유지한 채 AI가 필요한 정보만 읽거나 승인된 작업만 수행하도록 구성한다. 메신저는 요청을 받는 곳, 업무·문서 시스템은 최신 상태를 확인할 기준 시스템, 에이전트 런타임은 교체할 수 있는 실행 도구로 구분한다.

## 사례를 고르는 순서

1. 실제로 접근할 수 있는 데이터와 테스트 계정을 확인한다.
2. 외부 시스템을 바꾸지 않는 P1부터 시작한다.
3. 담당자 승인 기준이 준비되면 P2로 이동한다.
4. 테스트 계정·권한·복구 절차가 있을 때만 P3 이상의 실행을 검토한다.
5. 첫 사례를 공통 플랫폼으로 만들지 말고 다른 업무에서 P5 재사용을 시험한다.

조직 환경이 없다면 공개·합성 데이터와 샌드박스로 진행하고 실제 사용, 공식 절차 변경, 조직 성과를 주장하지 않는다.

## 사례 메타데이터

각 사례의 `case.json`은 다음 정보를 기계가 읽을 수 있는 형식으로 기록한다.

| 필드 | 의미 |
|---|---|
| `type` | 업무 흐름, 여러 업무 공통 기능, 조직 단위 종합 실습 |
| `primary_domain` | 고객·매출, 사람·협업, 재무·구매, 데이터·운영, 공통 통합·운영 |
| `industry` | 공통, 소비자·리테일, 공공, 금융, 제조, 의료·복지, 법무·생명과학 |
| `difficulty` | 사례 사이의 추천 난이도 1~5 |
| `capabilities` | 사례에서 주로 연습할 AX 역량 |
| `recommended_after` | 먼저 연습하면 좋은 사례 ID |
| `learning_order` | 책임이 커지는 기본 학습 순서 |
| `status` | 문서 준비 상태 |
| `evidence_stage` | 실행 전 설계 문서부터 실제 운영 기록까지의 현재 수준 |
| `readiness` | 메신저·파일, SaaS, 사내 시스템·API 준비 상태 |
| `risk` | 사례의 기본 위험 수준 |
| `current_write_impact` / `designed_write_impact` | 현재 공개 결과가 증명한 외부 시스템 변경 범위 / 사례가 설계한 최대 목표 |
| `current_autonomy` / `designed_autonomy` | 현재 공개 결과가 증명한 자율성 / 사례가 설계한 최대 범위 |
| `implemented_project_stages` / `designed_project_stages` | 일부 기능의 구현이 있는 단계(전체 통과를 뜻하지 않음) / 문서가 다루는 목표 프로젝트 |
| `verified_at` | 문서와 외부 기술 자료를 마지막으로 확인한 날짜 |
| `limitations` | 아직 확인하지 못했거나 주장하지 않는 내용 |

메타데이터 규격은 [`case.schema.json`](_schema/case.schema.json)에 있다. 사례를 추가할 때는 [사례 작성 템플릿](../toolkit/case-study-template.md)과 [출처 정책](../research/source-policy.md)을 함께 따른다.
