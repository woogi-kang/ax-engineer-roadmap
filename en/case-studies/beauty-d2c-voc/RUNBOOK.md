# Beauty/D2C synthetic VOC pipeline runbook

This runnable case uses only the Python standard library. It requires no external API, model, account, or network connection.

## Run

From the repository root:

```bash
python3 case-studies/beauty-d2c-voc/pipeline/run_pipeline.py
```

The command writes classified records, a review queue, workflow proposals, evaluation results, a run summary, a dashboard, and source/output hashes to `artifacts/`. It exits with code `1` when any expected result does not match.

To compare committed artifacts with results regenerated in a clean temporary directory:

```bash
python3 case-studies/beauty-d2c-voc/pipeline/run_pipeline.py --verify-committed
```

## Test

```bash
python3 -m unittest discover \
  -s case-studies/beauty-d2c-voc/tests \
  -p 'test_*.py' \
  -v
```

These checks reproduce the existing 16 synthetic records and artifacts. They do not replace P1's minimum 20 evaluation cases and independent review on new inputs. The code generates a review queue but has no function for receiving or storing human review or approval decisions.

## Replace the input

```bash
python3 case-studies/beauty-d2c-voc/pipeline/run_pipeline.py \
  --input /path/to/voc.jsonl \
  --expected /path/to/expected.jsonl \
  --output-dir /path/to/output
```

Replacement synthetic input follows [`voc-record.schema.json`](../../../case-studies/beauty-d2c-voc/schemas/voc-record.schema.json). The evaluation fixture deliberately includes records that violate the contract so the rejection path is exercised. The current implementation accepts only `source_type=synthetic`. Before adding real public data, verify the source's terms, license, privacy constraints, and collection boundary, then implement a separate collection adapter.

## Failure and recovery

| Status | Handling | Recovery |
|---|---|---|
| `invalid` | Records with missing required fields or invalid values and timestamps are not classified. | Correct or exclude the source record, then run the same command again. |
| `duplicate` | The first record for the same market, product, channel, and normalized text is retained. | Follow `duplicate_of` to review the retained source. |
| `spam` | Coupon and profile-promotion rules exclude the record from analysis and proposals. | If it is a false positive, update both the rule and expected result, then run regression tests. |
| `review_required` | Missing product/date fields, mixed language, stale data, unknown topics, and safety signals enter the manual-review queue. | A reviewer follows `evidence_ref` and decides whether to correct, hold, or exclude it. |
| Evaluation failure | The process exits with code `1` when actual status, topic, or safety output differs from the expected set. | Open `evaluation.json`, inspect failed records, and record the reason for changing code or expectations. |

The same input and code produce the same results. `run-manifest.json` lists seven pipeline-generated files under `generated_outputs`; the manually captured `dashboard.png` is separate under `presentation_assets`. `--verify-committed` compares the seven files byte-for-byte against a clean temporary run and rechecks SHA-256 hashes of inputs, schema, code, and outputs. It verifies the PNG's recorded hash and source reference, not a new visual rendering of the image.
