# Beauty/D2C synthetic VOC evaluation result

- Evaluation time: `2026-07-31T00:00:00+00:00`
- Input: `16` records
- Rules version: `deterministic-rules-v1`
- All expected outcomes passed: `yes`

## Processing status

| Status | Records |
|---|---:|
| `duplicate` | 1 |
| `invalid` | 2 |
| `ready` | 5 |
| `review_required` | 7 |
| `spam` | 1 |

## Evaluation metrics

| Metric | Result |
|---|---:|
| `record_exact_match` | 100.0% |
| `status_accuracy` | 100.0% |
| `topic_accuracy` | 100.0% |
| `duplicate_precision` | 100.0% |
| `duplicate_recall` | 100.0% |
| `safety_recall` | 100.0% |
| `traceability_rate` | 100.0% |

## Interpretation boundary

This evaluation verifies that the code handles the deliberately constructed failures, duplicates, classifications, and safety signals in a synthetic dataset. It does not establish real customer VOC distribution, multilingual model generalization, production usability, or business outcomes.
