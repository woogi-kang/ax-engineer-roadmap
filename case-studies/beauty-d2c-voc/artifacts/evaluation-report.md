# Beauty/D2C 합성 VOC 평가 결과

- 기준 시각: `2026-07-31T00:00:00+00:00`
- 입력: `16`건
- 규칙 버전: `deterministic-rules-v1`
- 기대 결과 전체 통과: `예`

## 처리 상태

| 상태 | 건수 |
|---|---:|
| `duplicate` | 1 |
| `invalid` | 2 |
| `ready` | 5 |
| `review_required` | 7 |
| `spam` | 1 |

## 평가 지표

| 지표 | 결과 |
|---|---:|
| `record_exact_match` | 100.0% |
| `status_accuracy` | 100.0% |
| `topic_accuracy` | 100.0% |
| `duplicate_precision` | 100.0% |
| `duplicate_recall` | 100.0% |
| `safety_recall` | 100.0% |
| `traceability_rate` | 100.0% |

## 해석 범위

이 평가는 의도적으로 만든 합성 데이터에서 정해진 실패·중복·분류·안전 신호가 코드대로 처리되는지 확인한다. 실제 고객 VOC 분포, 다국어 모델의 일반화 성능, 현업 사용성 또는 사업 성과를 검증한 결과가 아니다.
