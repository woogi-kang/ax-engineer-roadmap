# Beauty/D2C VOC 승인 패킷 (P2 모의 실행)

승인자는 이 문서에서 원문, 경고, 변경 전후를 함께 확인한다. 결정과 상태는 합성 이벤트 기록을 재생한 결과이며 실제 사람이 승인한 기록이 아니다. 모의 실행 4건, 외부 쓰기 0건, 승인 우회 0건.

## req-packaging · `packaging`

- 제안: `proposal-packaging` · 현재 버전 `v1` · 내용 해시 `c42da3ff06ea7160`
- 안전 신호: `아니요` · 최종 상태: `executed`

| 근거 | 시장 | 게시 시각 | 경고 | 원문 |
|---|---|---|---|---|
| `voc-001` | KR | 2026-07-29T15:20:00+09:00 | - | 배송 상자 안에서 세럼이 새어 나왔어요. 포장이 젖어 있었습니다. |
| `voc-006` | KR | 2026-07-26T09:30:00+09:00 | missing:product_id | 펌프가 눌리지 않아 내용물을 꺼낼 수 없습니다. |
| `voc-010` | US | 누락 | missing:published_at | The dropper cap was cracked when the package arrived. |
| `voc-013` | US | 2026-07-21T13:00:00+09:00 | - | The bottle leaked inside the box and the label was soaked. |
| `voc-017` | JP | 2026-07-28T10:00:00+09:00 | - | ポンプが壊れていて中身が出ません。 |
| `voc-026` | JP | 2026-07-25T12:00:00+09:00 | mixed_language | Pumpが固くて押せないです。 |

| 구분 | 내용 |
|---|---|
| 변경 전 | 연결된 업무 없음. 이 시뮬레이션은 실제 업무 시스템을 조회하지 않는다. |
| 변경 후 (모의) | 용기·포장 불량 원인 확인 · 담당 `packaging-logistics` · 우선순위 `normal` · 근거 voc-001, voc-006, voc-010, voc-013, voc-017, voc-026 |

결정 기록:

- `approve` · ops-manager · `v1` · 사유: -

## req-irritation · `irritation`

- 제안: `proposal-irritation` · 현재 버전 `v1` · 내용 해시 `3b9022f28bac17f8`
- 안전 신호: `예` · 최종 상태: `executed`

| 근거 | 시장 | 게시 시각 | 경고 | 원문 |
|---|---|---|---|---|
| `voc-003` | US | 2026-07-28T12:00:00-07:00 | safety_review_required | My skin developed a rash and burning sensation after the first use. |
| `voc-011` | KR | 2026-07-23T14:00:00+09:00 | safety_review_required | 눈에 조금 들어갔는데 따갑고 붉어졌습니다. |
| `voc-019` | JP | 2026-07-29T21:00:00+09:00 | safety_review_required | 使用後に顔が赤くなり、かゆみが出ました。 |
| `voc-031` | US | 2024-05-02T12:00:00-07:00 | stale:published_at, safety_review_required | Burning feeling on my cheeks after applying it. |

| 구분 | 내용 |
|---|---|
| 변경 전 | 연결된 업무 없음. 이 시뮬레이션은 실제 업무 시스템을 조회하지 않는다. |
| 변경 후 (모의) | 피부 이상 반응 신고 확인 · 담당 `quality-safety` · 우선순위 `high` · 근거 voc-003, voc-011, voc-019, voc-031 |

결정 기록:

- `approve` · qa-lead · `v1` · 사유: -
- `approve` · qa-backup · `v1` · 사유: -

## req-delivery · `delivery`

- 제안: `proposal-delivery` · 현재 버전 `v2` · 내용 해시 `5b99634391fbe5fd`
- 안전 신호: `아니요` · 최종 상태: `executed`

| 근거 | 시장 | 게시 시각 | 경고 | 원문 |
|---|---|---|---|---|
| `voc-009` | KR | 2022-03-01T11:00:00+09:00 | stale:published_at | 택배가 일주일 늦게 도착했습니다. |
| `voc-014` | US | 2026-07-20T12:00:00+09:00 | - | Delivery was delayed by nine days with no tracking update. |
| `voc-018` | JP | 2026-07-27T11:00:00+09:00 | - | 配送が10日以上遅れて、追跡情報も更新されません。 |

| 구분 | 내용 |
|---|---|
| 변경 전 | 연결된 업무 없음. 이 시뮬레이션은 실제 업무 시스템을 조회하지 않는다. |
| 변경 후 (모의) | 배송 지연 구간 확인 · 담당 `logistics-cs` · 우선순위 `normal` · 근거 voc-009, voc-014, voc-018 |

결정 기록:

- `approve` · ops-manager · `v1` · 사유: -
- `approve` · ops-manager · `v2` · 사유: -

## req-scent · `scent`

- 제안: `proposal-scent` · 현재 버전 `v1` · 내용 해시 `f1bb8ec11bf80f80`
- 안전 신호: `아니요` · 최종 상태: `executed`

| 근거 | 시장 | 게시 시각 | 경고 | 원문 |
|---|---|---|---|---|
| `voc-004` | JP | 2026-07-27T20:00:00+09:00 | - | 香りが強すぎて、使用を続けにくいです。 |
| `voc-008` | KR | 2026-07-24T18:00:00+09:00 | mixed_language | 흡수는 빠른데 fragrance가 너무 strong해서 손이 잘 안 가요. |
| `voc-028` | US | 2026-07-24T12:00:00-07:00 | - | No irritation at all, and the scent is lovely. |

| 구분 | 내용 |
|---|---|
| 변경 전 | 연결된 업무 없음. 이 시뮬레이션은 실제 업무 시스템을 조회하지 않는다. |
| 변경 후 (모의) | 향 강도 피드백 검토 · 담당 `product-planning` · 우선순위 `low` · 근거 voc-004, voc-008 |

결정 기록:

- `approve_with_edits` · pm-lead · `v1` · 사유: voc-028은 향을 칭찬한 리뷰라 불만 근거에서 제외

## req-product-effect · `product_effect`

- 제안: `proposal-product_effect` · 현재 버전 `v1` · 내용 해시 `38644be494021fcc`
- 안전 신호: `아니요` · 최종 상태: `rejected`

| 근거 | 시장 | 게시 시각 | 경고 | 원문 |
|---|---|---|---|---|
| `voc-012` | US | 2026-07-22T16:00:00+09:00 | - | After four weeks I did not notice any change in dark spots. |
| `voc-029` | KR | 2026-07-23T12:00:00+09:00 | - | 4주 썼는데 효과를 잘 모르겠어요. |

| 구분 | 내용 |
|---|---|
| 변경 전 | 연결된 업무 없음. 이 시뮬레이션은 실제 업무 시스템을 조회하지 않는다. |
| 변경 후 (모의) | 제품 효과 기대치 안내 검토 · 담당 `product-planning` · 우선순위 `low` · 근거 voc-012, voc-029 |

결정 기록:

- `request_info` · pm-lead · `v1` · 사유: 사용 기간 안내 문구가 이미 있는지 확인 필요
- `reject` · pm-lead · `v1` · 사유: 상세페이지에 이미 8주 사용 기준이 있어 새 업무가 필요 없음

## req-product-effect-retry · `product_effect`

- 제안: `proposal-product_effect` · 현재 버전 `v1` · 내용 해시 `38644be494021fcc`
- 안전 신호: `아니요` · 최종 상태: `expired`

| 근거 | 시장 | 게시 시각 | 경고 | 원문 |
|---|---|---|---|---|
| `voc-012` | US | 2026-07-22T16:00:00+09:00 | - | After four weeks I did not notice any change in dark spots. |
| `voc-029` | KR | 2026-07-23T12:00:00+09:00 | - | 4주 썼는데 효과를 잘 모르겠어요. |

| 구분 | 내용 |
|---|---|
| 변경 전 | 연결된 업무 없음. 이 시뮬레이션은 실제 업무 시스템을 조회하지 않는다. |
| 변경 후 (모의) | 제품 효과 기대치 안내 검토 · 담당 `product-planning` · 우선순위 `low` · 근거 voc-012, voc-029 |

결정 기록:

- 결정 없음

## req-scent-followup · `scent`

- 제안: `proposal-scent` · 현재 버전 `v1` · 내용 해시 `f1bb8ec11bf80f80`
- 안전 신호: `아니요` · 최종 상태: `cancelled`

| 근거 | 시장 | 게시 시각 | 경고 | 원문 |
|---|---|---|---|---|
| `voc-004` | JP | 2026-07-27T20:00:00+09:00 | - | 香りが強すぎて、使用を続けにくいです。 |
| `voc-008` | KR | 2026-07-24T18:00:00+09:00 | mixed_language | 흡수는 빠른데 fragrance가 너무 strong해서 손이 잘 안 가요. |
| `voc-028` | US | 2026-07-24T12:00:00-07:00 | - | No irritation at all, and the scent is lovely. |

| 구분 | 내용 |
|---|---|
| 변경 전 | 연결된 업무 없음. 이 시뮬레이션은 실제 업무 시스템을 조회하지 않는다. |
| 변경 후 (모의) | 향 강도 피드백 검토 · 담당 `product-planning` · 우선순위 `low` · 근거 voc-004, voc-008, voc-028 |

결정 기록:

- 결정 없음

## req-delivery-followup · `delivery`

- 제안: `proposal-delivery` · 현재 버전 `v1` · 내용 해시 `5b99634391fbe5fd`
- 안전 신호: `아니요` · 최종 상태: `expired`

| 근거 | 시장 | 게시 시각 | 경고 | 원문 |
|---|---|---|---|---|
| `voc-009` | KR | 2022-03-01T11:00:00+09:00 | stale:published_at | 택배가 일주일 늦게 도착했습니다. |
| `voc-014` | US | 2026-07-20T12:00:00+09:00 | - | Delivery was delayed by nine days with no tracking update. |
| `voc-018` | JP | 2026-07-27T11:00:00+09:00 | - | 配送が10日以上遅れて、追跡情報も更新されません。 |

| 구분 | 내용 |
|---|---|
| 변경 전 | 연결된 업무 없음. 이 시뮬레이션은 실제 업무 시스템을 조회하지 않는다. |
| 변경 후 (모의) | 배송 지연 구간 확인 · 담당 `logistics-cs` · 우선순위 `normal` · 근거 voc-009, voc-014, voc-018 |

결정 기록:

- `approve` · ops-manager · `v1` · 사유: -
