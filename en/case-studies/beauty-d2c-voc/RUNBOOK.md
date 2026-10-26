# Beauty/D2C synthetic VOC pipeline runbook

This runnable case uses only the Python standard library. It requires no external API, model, account, or network connection.

## Run

From the repository root:

```bash
python3 case-studies/beauty-d2c-voc/pipeline/run_pipeline.py
```

The default inputs are the original [`voc-sample.jsonl`](../../../case-studies/beauty-d2c-voc/data/input/voc-sample.jsonl) and the development extension [`voc-extension.jsonl`](../../../case-studies/beauty-d2c-voc/data/input/voc-extension.jsonl). The command writes classified records, a review queue, workflow proposals, evaluation results, a run summary, a dashboard, and source/output hashes to `artifacts/`. It exits with code `1` when any expected result does not match.

To compare committed artifacts with results regenerated in a clean temporary directory:

```bash
python3 case-studies/beauty-d2c-voc/pipeline/run_pipeline.py --verify-committed
```

Processing latency depends on the machine, so it is not stored in the artifacts. Print the median and maximum for the same input with:

```bash
python3 case-studies/beauty-d2c-voc/pipeline/run_pipeline.py --benchmark 50
```

## P2 approval replay

```bash
python3 case-studies/beauty-d2c-voc/pipeline/approval_workflow.py
python3 case-studies/beauty-d2c-voc/pipeline/approval_workflow.py --verify-committed
```

The command rebuilds the P1 proposals, then applies approver authority from [`approvers.json`](../../../case-studies/beauty-d2c-voc/data/approval/approvers.json) and the events in [`events.jsonl`](../../../case-studies/beauty-d2c-voc/data/approval/events.jsonl) in order. It writes the audit log, final state per request, mock executions, approval packets, and evaluation to `artifacts/approval/`. It exits with code `1` if any event outcome differs from [`expected-outcomes.jsonl`](../../../case-studies/beauty-d2c-voc/data/approval/expected-outcomes.jsonl) or any approval bypass occurs.

| Block reason | Meaning | Recovery |
|---|---|---|
| `topic_out_of_scope`, `safety_role_required` | The approver lacks authority for the topic or for safety review. | Ask an approver who has that authority. |
| `approver_revoked` | The approver's authority was revoked before execution. The request moves to `on_hold`. | Another authorized approver approves the current version again. |
| `stale_version`, `prior_approval_invalidated` | The approved version differs from the current proposal. | Review the changed evidence and decide on the new version. |
| `request_expired`, `approval_expired` | The 72-hour request window or 48-hour approval window has passed. | Resubmit the proposal. |
| `duplicate_execution`, `already_executed` | The idempotency key or request was already executed. | Use `first_execution_id` in the audit log to find the first execution. |
| `reason_required` | A rejection, approval with edits, or information request has no reason. | Decide again with a reason. |

Decision and review times are synthetic values for testing state transitions. They do not represent real approver judgment or approval effort.

## Test

```bash
python3 -m unittest discover \
  -s case-studies/beauty-d2c-voc/tests \
  -p 'test_*.py' \
  -v
```

These checks cover the original 16 records on their own, the 32-case evaluation set, artifact reproduction, approval state transitions, and the independent review kit. The 32 cases are a development set written by the implementer, so they do not replace independent review on new inputs.

## P1 independent review

P1 passes only when a reviewer who did not take part in the implementation prepares inputs not used in development and judges the results. The kit records that procedure; it never fills in a verdict.

1. The reviewer writes new synthetic input and expected results as separate JSONL files, mixing normal, edge, and failure cases, including conflicting sources and missing information. Expected results are fixed before the run.
2. Freeze the first run. The kit refuses inputs that reuse a development-set `source_id` or sentence.

   ```bash
   python3 case-studies/beauty-d2c-voc/pipeline/independent_review.py prepare \
     --input /path/to/reviewer-input.jsonl \
     --expected /path/to/reviewer-expected.jsonl \
     --round-dir /path/to/review-round-1
   ```

3. The reviewer compares source text with system output in `review-sheet.md` and records `pass` or `fail` with a reason for each record, plus an overall verdict and limitations, in `review-record.json`. The record also states the reviewer's name and role, whether they took part in the implementation, whether they prepared the inputs, and whether expected results were fixed before the run.
4. Score the verdicts. Any blank field, or a reviewer who took part in the implementation, ends as `incomplete` with exit code `2`.

   ```bash
   python3 case-studies/beauty-d2c-voc/pipeline/independent_review.py score \
     --round-dir /path/to/review-round-1
   ```

5. After fixing failures, run the same input again with `rerun`. `first-run/` is never overwritten; `rerun-N/` and a list of changes from the first run are stored beside it. Add new inputs of the same failure type in the next round.

Publish a review record only with the reviewer's consent; a role without a name is enough. The repository does not yet contain an independent review record.

## Replace the input

```bash
python3 case-studies/beauty-d2c-voc/pipeline/run_pipeline.py \
  --input /path/to/voc.jsonl \
  --expected /path/to/expected.jsonl \
  --output-dir /path/to/output
```

`--input` and `--expected` can be repeated. Add `--no-catalog` when there is no case-label file. Replacement synthetic input follows [`voc-record.schema.json`](../../../case-studies/beauty-d2c-voc/schemas/voc-record.schema.json). The evaluation fixture deliberately includes records that violate the contract so the rejection path is exercised. The current implementation accepts only `source_type=synthetic`. Before adding real public data, verify the source's terms, license, privacy constraints, and collection boundary, then implement a separate collection adapter.

## Failure and recovery

| Status | Handling | Recovery |
|---|---|---|
| `invalid` | Records with missing required fields, invalid values or timestamps, or a publication time later than the collection time are not classified. | Correct or exclude the source record, then run the same command again. |
| `rejected` | Text containing an email address or phone number is not analyzed, and outputs replace it with `[withheld:personal_data]`. | Return it to the provider and obtain the text without personal data. |
| `conflict` | When one `source_id` appears with different content, every version is excluded from analysis. | Confirm the correct content in the source system and keep one record. |
| `duplicate` | The first record for the same market, product, channel, and normalized text is retained. | Follow `duplicate_of` to review the retained source. |
| `spam` | Coupon and profile-promotion rules exclude the record from analysis and proposals. | If it is a false positive, update both the rule and expected result, then run regression tests. |
| `review_required` | Missing product/date fields, mixed language, stale data, unknown topics, and safety signals enter the manual-review queue. | A reviewer follows `evidence_ref` and decides whether to correct, hold, or exclude it. |
| Evaluation failure | The process exits with code `1` when actual status, topic, or safety output differs from the expected set. | Open `evaluation.json`, inspect failed records, and record the reason for changing code or expectations. |

The same input and code produce the same results. `run-manifest.json` lists seven files generated by the P1 pipeline under `generated_outputs`; the manually captured `dashboard.png` is separate under `presentation_assets`. `--verify-committed` compares the seven files byte-for-byte against a clean temporary run and rechecks SHA-256 hashes of inputs, schema, code, and outputs. It verifies the PNG's recorded hash and source reference, not a new visual rendering of the image. `artifacts/approval/run-manifest.json` records input, code, and output hashes for the approval replay separately.
