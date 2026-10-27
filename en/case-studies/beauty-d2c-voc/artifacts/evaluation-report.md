# Beauty/D2C synthetic VOC evaluation result

- Evaluation time: `2026-07-31T00:00:00+00:00`
- Input: `33` lines, evaluation cases: `32`
- Rules version: `deterministic-rules-v2`
- All expected outcomes passed: `yes`
- External API calls: `0`, model tokens: `0`, estimated cost: `$0.00`
- Personal-data patterns left in outputs: `0`

## Case types

| Type | Cases | Passed |
|---|---:|---:|
| `edge` | 13 | 13 |
| `failure` | 11 | 11 |
| `normal` | 8 | 8 |

Cases that differ from the expected result:

- None

## Processing status

| Status | Records |
|---|---:|
| `conflict` | 2 |
| `duplicate` | 1 |
| `invalid` | 5 |
| `ready` | 10 |
| `rejected` | 2 |
| `review_required` | 11 |
| `spam` | 2 |

## Evaluation metrics

| Metric | Result |
|---|---:|
| `blocked_input_precision` | 100.0% |
| `blocked_input_recall` | 100.0% |
| `duplicate_precision` | 100.0% |
| `duplicate_recall` | 100.0% |
| `record_exact_match` | 100.0% |
| `safety_recall` | 100.0% |
| `status_accuracy` | 100.0% |
| `topic_accuracy` | 100.0% |
| `traceability_rate` | 100.0% |

## Interpretation boundary

`record_exact_match` is the proportion of records whose expected status, topic, and safety flag all match. `blocked_input_*` checks whether inputs that must be stopped as `invalid`, `rejected`, or `conflict` were stopped. Latency varies by machine, so it is measured separately with `--benchmark` and not stored here. `traceability_rate` measures the presence of a non-empty `evidence_ref` in processed records; it does not verify source-link reachability or the correctness of the connection.

The evaluation cases are a development set the implementer wrote during development. Independent review on new inputs prepared by a reviewer who did not take part in the implementation is not part of this file.

This evaluation verifies that the code handles the deliberately constructed failures, duplicates, classifications, and safety signals in a synthetic dataset. It does not establish real customer VOC distribution, multilingual model generalization, production usability, or business outcomes.
