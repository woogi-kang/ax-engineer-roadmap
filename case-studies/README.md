# 업무별 적용 사례

사례는 로드맵의 원칙을 한 업무 흐름에 끝까지 적용해 보는 실습이다. 어떤 도구를 설치했는지가 아니라 원본 시스템, 승인, 실행, 평가, 복구를 어떻게 연결했는지 확인한다.

모든 사례는 [다섯 개 실습 프로젝트](../projects/README.md)의 통과 기준을 사용한다. `ready`는 문서가 실습에 사용할 수 있는 상태라는 뜻이며, 실제 조직에서 운영 성과를 검증했다는 뜻이 아니다.

현재 공개 근거는 **재현 가능한 공개 시뮬레이션 1개와 실행 설계 14개**다. 현재 공개한 실행물은 모두 외부 시스템을 바꾸지 않는다. 아래 `설계 목표 경계`와 `설계 P단계`는 앞으로 연습하도록 문서화한 최대 범위이며, 구현 완료나 조직 운영을 뜻하지 않는다.

## 업무별 사례 목록

| 업무·산업 | 사례 | 난이도·위험 | 준비 상태 | 설계 목표 경계 | 설계 P단계 | 현재 근거·바로가기 |
|---|---|---|---|---|---|---|
| 고객·매출 · 소비자/리테일 | [Beauty/D2C 글로벌 VOC → 업무 제안](beauty-d2c-voc/README.md) | 1 · 보통 | 메신저·파일, SaaS | 읽기·제안 뒤 승인된 샌드박스 쓰기 | P1·P2·P3·P5 | [재현 가능한 공개 시뮬레이션](beauty-d2c-voc/README.md#현재-실행물과-근거) |
| 고객·매출 · 공공 | [공공 민원 → 근거 답변·중복 묶음](public-service-petition-response/README.md) | 2 · 높음 | 메신저·파일, SaaS | 초안 전용 | P1~P3 | [시뮬레이션 설계](public-service-petition-response/README.md#현재-실행물과-근거) |
| 사람·협업 · 공통 | [Slack 회의 신호 → 승인 가능한 실행 항목](slack-meeting-actions/README.md) | 2 · 보통 | SaaS, 사내 API | 승인 후 샌드박스 쓰기 | P1~P5 | [시뮬레이션 설계](slack-meeting-actions/README.md#현재-실행물과-근거) |
| 사람·협업 · 공통 | [입사·이동·퇴사 → 계정·권한 운영](employee-lifecycle-access/README.md) | 3 · 높음 | SaaS, 사내 API | 역할별 승인 후 샌드박스 쓰기 | P1~P5 | [시뮬레이션 설계](employee-lifecycle-access/README.md#현재-실행물과-근거) |
| 재무·구매 · 공통 | [법인카드·경비 증빙 → 전표 초안](corporate-card-expense/README.md) | 2 · 보통 | 메신저·파일, SaaS | 초안 전용 | P1~P3 | [시뮬레이션 설계](corporate-card-expense/README.md#현재-실행물과-근거) |
| 재무·구매 · 공통 | [매출 근거 → 전자세금계산서 발행·입금 대사](electronic-tax-invoice-reconciliation/README.md) | 4 · 높음 | SaaS, 사내 API | 승인 후 샌드박스 쓰기 | P1~P4 | [시뮬레이션 설계](electronic-tax-invoice-reconciliation/README.md#현재-실행물과-근거) |
| 재무·구매 · 공통 | [거래처 등록·계좌 변경 → 검증 가능한 승인](vendor-master-account-change/README.md) | 4 · 높음 | SaaS, 사내 API | 이중 승인 후 샌드박스 쓰기 | P1~P4 | [시뮬레이션 설계](vendor-master-account-change/README.md#현재-실행물과-근거) |
| 재무·구매 · 금융 | [기업 자료 → 여신·인수심사 검토 초안](credit-underwriting-review/README.md) | 4 · 높음 | 메신저·파일, SaaS, 사내 API | 초안 전용 | P1~P3 | [시뮬레이션 설계](credit-underwriting-review/README.md#현재-실행물과-근거) |
| 데이터·운영 · 공통 | [흩어진 파일·CSV → 검토 가능한 업무 허브(AX Hub)](file-csv-to-ax-hub/README.md) | 1 · 보통 | 메신저·파일, SaaS | 초안 전용 | P1·P2·P3·P5 | [시뮬레이션 설계](file-csv-to-ax-hub/README.md#현재-실행물과-근거) |
| 데이터·운영 · 법무/생명과학 | [근거 자료 → 출처 연결 규제 문서 초안](regulated-evidence-document/README.md) | 4 · 높음 | 메신저·파일, SaaS, 사내 API | 초안 전용 | P1~P3 | [시뮬레이션 설계](regulated-evidence-document/README.md#현재-실행물과-근거) |
| 데이터·운영 · 소비자/리테일 | [재고 예외 → 발주·창고 이동 제안](inventory-exception-replenishment/README.md) | 4 · 높음 | SaaS, 사내 API | 승인 후 제안 기록 | P1~P4 | [시뮬레이션 설계](inventory-exception-replenishment/README.md#현재-실행물과-근거) |
| 데이터·운영 · 제조 | [설비 이상 → 정비 제안](equipment-anomaly-maintenance/README.md) | 4 · 높음 | 사내 API | 승인 후 샌드박스 쓰기 | P1~P4 | [시뮬레이션 설계](equipment-anomaly-maintenance/README.md#현재-실행물과-근거) |
| 데이터·운영 · 의료/복지 | [상담·진료 대화 → 기록·위험 이관](care-conversation-record/README.md) | 5 · 높음 | 메신저·파일, SaaS, 사내 API | 초안 전용 | P1~P3 | [시뮬레이션 설계](care-conversation-record/README.md#현재-실행물과-근거) |
| 공통 통합·운영 · 공통 | [중앙 메일 업무 보조 통합](centralized-mail-assist/README.md) | 4 · 높음 | SaaS, 사내 API | 발송 전 승인 | P1~P5 | [시뮬레이션 설계](centralized-mail-assist/README.md#현재-실행물과-근거) |
| 공통 통합·운영 · 공통 | [회사 에이전트 운영 계층](company-agent-operating-layer/README.md) | 5 · 높음 | SaaS, 사내 API | 업무별로 제한 | P2~P5 | [시뮬레이션 설계](company-agent-operating-layer/README.md#현재-실행물과-근거) |

사례명과 근거 단계만으로 특정 회사의 내부 상태나 현업 정착 여부, 생산성·비용·매출 개선 효과를 추정해서는 안 된다.

## 추천 학습 순서

1. [흩어진 파일·CSV → 검토 가능한 업무 허브(AX Hub)](file-csv-to-ax-hub/README.md)
2. [Beauty/D2C 글로벌 VOC → 업무 제안](beauty-d2c-voc/README.md)
3. [공공 민원 → 근거 답변·중복 묶음](public-service-petition-response/README.md)
4. [Slack 회의 신호 → 승인 가능한 실행 항목](slack-meeting-actions/README.md)
5. [법인카드·경비 증빙 → 전표 초안](corporate-card-expense/README.md)
6. [근거 자료 → 출처 연결 규제 문서 초안](regulated-evidence-document/README.md)
7. [입사·이동·퇴사 → 계정·권한 운영](employee-lifecycle-access/README.md)
8. [중앙 메일 업무 보조 통합](centralized-mail-assist/README.md)
9. [매출 근거 → 전자세금계산서 발행·입금 대사](electronic-tax-invoice-reconciliation/README.md)
10. [거래처 등록·계좌 변경 → 검증 가능한 승인](vendor-master-account-change/README.md)
11. [기업 자료 → 여신·인수심사 검토 초안](credit-underwriting-review/README.md)
12. [재고 예외 → 발주·창고 이동 제안](inventory-exception-replenishment/README.md)
13. [설비 이상 → 정비 제안](equipment-anomaly-maintenance/README.md)
14. [상담·진료 대화 → 기록·위험 이관](care-conversation-record/README.md)
15. [회사 에이전트 운영 계층](company-agent-operating-layer/README.md)

앞 순서는 사례의 우열이 아니라 책임이 커지는 순서다. 사례 안의 P1~P5는 같은 업무를 어디까지 운영할지 나타내며, 위 순서와 역할이 다르다.

## 사례 범위 구분

- **업무 흐름**: 한 팀이 시작과 완료를 확인할 수 있는 구체적인 업무를 다룬다.
- **공용 통합**: 여러 업무가 함께 쓰는 커넥터와 권한·감사 방식을 검증한다.
- **조직 캡스톤**: 두 번째 업무 재사용을 확인한 뒤 공통 운영 기반의 경계를 시험한다.

기존 SaaS를 그대로 쓰면서 AI를 연결하는 방식은 하나의 제품 사례가 아니라 여러 사례가 공유하는 구현 패턴이다. 메신저는 진입점, 업무·문서 시스템은 최신 상태를 확인할 원본, 에이전트 런타임은 교체 가능한 실행 구성 요소로 구분한다.

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
| `type` | 업무 흐름, 공용 통합, 조직 캡스톤 |
| `primary_domain` | 고객·매출, 사람·협업, 재무·구매, 데이터·운영, 공통 통합·운영 |
| `industry` | 공통, 소비자·리테일, 공공, 금융, 제조, 의료·복지, 법무·생명과학 |
| `difficulty` | 사례 사이의 추천 난이도 1~5 |
| `capabilities` | 사례에서 주로 연습할 AX 역량 |
| `recommended_after` | 먼저 연습하면 좋은 사례 ID |
| `learning_order` | 책임이 커지는 기본 학습 순서 |
| `status` | 문서 준비 상태 |
| `evidence_stage` | 시뮬레이션 설계부터 운영 근거까지의 현재 수준 |
| `readiness` | 메신저·파일, SaaS, 사내 시스템·API 준비 상태 |
| `risk` | 사례의 기본 위험 수준 |
| `current_write_impact` / `designed_write_impact` | 현재 실행물이 증명한 외부 쓰기 영향 / 사례가 설계한 최대 목표 |
| `current_autonomy` / `designed_autonomy` | 현재 실행물이 증명한 자율성 / 사례가 설계한 최대 범위 |
| `implemented_project_stages` / `designed_project_stages` | 현재 증명한 P1~P5 / 문서가 연결한 목표 프로젝트 |
| `verified_at` | 문서와 외부 기술 자료를 마지막으로 확인한 날짜 |
| `limitations` | 아직 확인하지 못했거나 주장하지 않는 내용 |

메타데이터 규격은 [`case.schema.json`](_schema/case.schema.json)에 있다. 사례를 추가할 때는 [사례 작성 템플릿](../toolkit/case-study-template.md)과 [출처 정책](../research/source-policy.md)을 함께 따른다.
