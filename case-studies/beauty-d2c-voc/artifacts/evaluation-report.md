# Beauty/D2C 합성 VOC 평가 결과

- 기준 시각: `2026-07-31T00:00:00+00:00`
- 입력: `33`줄, 평가 사례: `32`건
- 규칙 버전: `deterministic-rules-v2`
- 기대 결과 전체 통과: `예`
- 외부 API 호출: `0`회, 모델 토큰: `0`, 추정 비용: `$0.00`
- 출력에 남은 개인정보 패턴: `0`건

## 사례 유형

| 유형 | 사례 | 통과 |
|---|---:|---:|
| `edge` | 13 | 13 |
| `failure` | 11 | 11 |
| `normal` | 8 | 8 |

기대 결과와 다른 사례:

- 없음

## 처리 상태

| 상태 | 건수 |
|---|---:|
| `conflict` | 2 |
| `duplicate` | 1 |
| `invalid` | 5 |
| `ready` | 10 |
| `rejected` | 2 |
| `review_required` | 11 |
| `spam` | 2 |

## 평가 지표

| 지표 | 결과 |
|---|---:|
| `record_exact_match` | 100.0% |
| `status_accuracy` | 100.0% |
| `topic_accuracy` | 100.0% |
| `duplicate_precision` | 100.0% |
| `duplicate_recall` | 100.0% |
| `safety_recall` | 100.0% |
| `blocked_input_recall` | 100.0% |
| `blocked_input_precision` | 100.0% |
| `traceability_rate` | 100.0% |

## 해석 범위

`record_exact_match`는 기대 상태·주제·안전 신호가 모두 일치한 레코드의 비율이다. `blocked_input_*`은 `invalid`·`rejected`·`conflict`로 막아야 할 입력을 제대로 막았는지 본다. 지연 시간은 실행 환경마다 달라 이 파일에 넣지 않고 `--benchmark`로 따로 잰다. `traceability_rate`는 처리 레코드에 비어 있지 않은 `evidence_ref`가 있는 비율이며 원문 링크의 도달 여부나 연결 정확성을 검증하지 않는다.

평가 사례는 구현자가 개발 중에 만든 개발 세트다. 구현에 참여하지 않은 검토자가 준비한 새 입력의 독립 검수는 이 파일에 포함되지 않는다.

이 평가는 의도적으로 만든 합성 데이터에서 정해진 실패·중복·분류·안전 신호가 코드대로 처리되는지 확인한다. 실제 고객 VOC 분포, 다국어 모델의 일반화 성능, 현업 사용성 또는 사업 성과를 검증한 결과가 아니다.
