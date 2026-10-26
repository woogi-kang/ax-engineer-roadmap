# Beauty/D2C VOC approval packets (P2 replay)

Approvers review source text, warnings, and before and after together in this document. Decisions and states come from replaying a synthetic event log, not from real people approving anything. Decision reasons are quoted from the Korean event log. Mock executions: 4; external writes: 0; approval bypasses: 0.

## req-packaging · `packaging`

- Proposal: `proposal-packaging` · current version `v1` · content hash `c42da3ff06ea7160`
- Safety signal: `no` · final state: `executed`

| Evidence | Market | Published | Warnings | Source text |
|---|---|---|---|---|
| `voc-001` | KR | 2026-07-29T15:20:00+09:00 | - | 배송 상자 안에서 세럼이 새어 나왔어요. 포장이 젖어 있었습니다. |
| `voc-006` | KR | 2026-07-26T09:30:00+09:00 | missing:product_id | 펌프가 눌리지 않아 내용물을 꺼낼 수 없습니다. |
| `voc-010` | US | missing | missing:published_at | The dropper cap was cracked when the package arrived. |
| `voc-013` | US | 2026-07-21T13:00:00+09:00 | - | The bottle leaked inside the box and the label was soaked. |
| `voc-017` | JP | 2026-07-28T10:00:00+09:00 | - | ポンプが壊れていて中身が出ません。 |
| `voc-026` | JP | 2026-07-25T12:00:00+09:00 | mixed_language | Pumpが固くて押せないです。 |

| Scope | Content |
|---|---|
| Before | No linked work item. This simulation does not read a real work system. |
| After (mock) | Find the cause of container and packaging defects · team `packaging-logistics` · priority `normal` · evidence voc-001, voc-006, voc-010, voc-013, voc-017, voc-026 |

Decision record:

- `approve` · ops-manager · `v1` · reason: -

## req-irritation · `irritation`

- Proposal: `proposal-irritation` · current version `v1` · content hash `3b9022f28bac17f8`
- Safety signal: `yes` · final state: `executed`

| Evidence | Market | Published | Warnings | Source text |
|---|---|---|---|---|
| `voc-003` | US | 2026-07-28T12:00:00-07:00 | safety_review_required | My skin developed a rash and burning sensation after the first use. |
| `voc-011` | KR | 2026-07-23T14:00:00+09:00 | safety_review_required | 눈에 조금 들어갔는데 따갑고 붉어졌습니다. |
| `voc-019` | JP | 2026-07-29T21:00:00+09:00 | safety_review_required | 使用後に顔が赤くなり、かゆみが出ました。 |
| `voc-031` | US | 2024-05-02T12:00:00-07:00 | stale:published_at, safety_review_required | Burning feeling on my cheeks after applying it. |

| Scope | Content |
|---|---|
| Before | No linked work item. This simulation does not read a real work system. |
| After (mock) | Check skin-reaction reports · team `quality-safety` · priority `high` · evidence voc-003, voc-011, voc-019, voc-031 |

Decision record:

- `approve` · qa-lead · `v1` · reason: -
- `approve` · qa-backup · `v1` · reason: -

## req-delivery · `delivery`

- Proposal: `proposal-delivery` · current version `v2` · content hash `5b99634391fbe5fd`
- Safety signal: `no` · final state: `executed`

| Evidence | Market | Published | Warnings | Source text |
|---|---|---|---|---|
| `voc-009` | KR | 2022-03-01T11:00:00+09:00 | stale:published_at | 택배가 일주일 늦게 도착했습니다. |
| `voc-014` | US | 2026-07-20T12:00:00+09:00 | - | Delivery was delayed by nine days with no tracking update. |
| `voc-018` | JP | 2026-07-27T11:00:00+09:00 | - | 配送が10日以上遅れて、追跡情報も更新されません。 |

| Scope | Content |
|---|---|
| Before | No linked work item. This simulation does not read a real work system. |
| After (mock) | Check delayed delivery legs · team `logistics-cs` · priority `normal` · evidence voc-009, voc-014, voc-018 |

Decision record:

- `approve` · ops-manager · `v1` · reason: -
- `approve` · ops-manager · `v2` · reason: -

## req-scent · `scent`

- Proposal: `proposal-scent` · current version `v1` · content hash `f1bb8ec11bf80f80`
- Safety signal: `no` · final state: `executed`

| Evidence | Market | Published | Warnings | Source text |
|---|---|---|---|---|
| `voc-004` | JP | 2026-07-27T20:00:00+09:00 | - | 香りが強すぎて、使用を続けにくいです。 |
| `voc-008` | KR | 2026-07-24T18:00:00+09:00 | mixed_language | 흡수는 빠른데 fragrance가 너무 strong해서 손이 잘 안 가요. |
| `voc-028` | US | 2026-07-24T12:00:00-07:00 | - | No irritation at all, and the scent is lovely. |

| Scope | Content |
|---|---|
| Before | No linked work item. This simulation does not read a real work system. |
| After (mock) | Review scent-strength feedback · team `product-planning` · priority `low` · evidence voc-004, voc-008 |

Decision record:

- `approve_with_edits` · pm-lead · `v1` · reason: voc-028은 향을 칭찬한 리뷰라 불만 근거에서 제외

## req-product-effect · `product_effect`

- Proposal: `proposal-product_effect` · current version `v1` · content hash `38644be494021fcc`
- Safety signal: `no` · final state: `rejected`

| Evidence | Market | Published | Warnings | Source text |
|---|---|---|---|---|
| `voc-012` | US | 2026-07-22T16:00:00+09:00 | - | After four weeks I did not notice any change in dark spots. |
| `voc-029` | KR | 2026-07-23T12:00:00+09:00 | - | 4주 썼는데 효과를 잘 모르겠어요. |

| Scope | Content |
|---|---|
| Before | No linked work item. This simulation does not read a real work system. |
| After (mock) | Review guidance on expected product effects · team `product-planning` · priority `low` · evidence voc-012, voc-029 |

Decision record:

- `request_info` · pm-lead · `v1` · reason: 사용 기간 안내 문구가 이미 있는지 확인 필요
- `reject` · pm-lead · `v1` · reason: 상세페이지에 이미 8주 사용 기준이 있어 새 업무가 필요 없음

## req-product-effect-retry · `product_effect`

- Proposal: `proposal-product_effect` · current version `v1` · content hash `38644be494021fcc`
- Safety signal: `no` · final state: `expired`

| Evidence | Market | Published | Warnings | Source text |
|---|---|---|---|---|
| `voc-012` | US | 2026-07-22T16:00:00+09:00 | - | After four weeks I did not notice any change in dark spots. |
| `voc-029` | KR | 2026-07-23T12:00:00+09:00 | - | 4주 썼는데 효과를 잘 모르겠어요. |

| Scope | Content |
|---|---|
| Before | No linked work item. This simulation does not read a real work system. |
| After (mock) | Review guidance on expected product effects · team `product-planning` · priority `low` · evidence voc-012, voc-029 |

Decision record:

- No decision

## req-scent-followup · `scent`

- Proposal: `proposal-scent` · current version `v1` · content hash `f1bb8ec11bf80f80`
- Safety signal: `no` · final state: `cancelled`

| Evidence | Market | Published | Warnings | Source text |
|---|---|---|---|---|
| `voc-004` | JP | 2026-07-27T20:00:00+09:00 | - | 香りが強すぎて、使用を続けにくいです。 |
| `voc-008` | KR | 2026-07-24T18:00:00+09:00 | mixed_language | 흡수는 빠른데 fragrance가 너무 strong해서 손이 잘 안 가요. |
| `voc-028` | US | 2026-07-24T12:00:00-07:00 | - | No irritation at all, and the scent is lovely. |

| Scope | Content |
|---|---|
| Before | No linked work item. This simulation does not read a real work system. |
| After (mock) | Review scent-strength feedback · team `product-planning` · priority `low` · evidence voc-004, voc-008, voc-028 |

Decision record:

- No decision

## req-delivery-followup · `delivery`

- Proposal: `proposal-delivery` · current version `v1` · content hash `5b99634391fbe5fd`
- Safety signal: `no` · final state: `expired`

| Evidence | Market | Published | Warnings | Source text |
|---|---|---|---|---|
| `voc-009` | KR | 2022-03-01T11:00:00+09:00 | stale:published_at | 택배가 일주일 늦게 도착했습니다. |
| `voc-014` | US | 2026-07-20T12:00:00+09:00 | - | Delivery was delayed by nine days with no tracking update. |
| `voc-018` | JP | 2026-07-27T11:00:00+09:00 | - | 配送が10日以上遅れて、追跡情報も更新されません。 |

| Scope | Content |
|---|---|
| Before | No linked work item. This simulation does not read a real work system. |
| After (mock) | Check delayed delivery legs · team `logistics-cs` · priority `normal` · evidence voc-009, voc-014, voc-018 |

Decision record:

- `approve` · ops-manager · `v1` · reason: -
