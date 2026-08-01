# Case: From Global Beauty/D2C VOC to an Action Proposal

<!-- case-boundary:start -->
## Current scope and designed target

| Scope | Write impact | Autonomy | P stages |
|---|---|---|---|
| Current public artifact | No external write | A1-A2 | P1 |
| Designed target | Approved sandbox write | A1-A3 | P1, P2, P3, P5 |

Current values cover only what this repository can reproduce. The designed target is not yet an implemented scope or evidence of organizational outcomes.
<!-- case-boundary:end -->

> Public-case link: K04 agent review and G07 editorial approval and edit-rate questions are mapped into this case through the [application map](../../research/public-case-application-map.md).

## Case type

This is not an internal diagnosis or consulting outcome for a specific company. Public cases contribute evaluation questions only; the executable input is a synthetic fixture built around common Beauty/D2C workflow patterns.

## Current execution evidence

This case now includes a reproducible pipeline that processes 16 synthetic VOC records with the Python standard library and no external API or model call. The dataset deliberately includes duplicates, missing required fields, spam, mixed language, stale records, and safety signals.

![Beauty/D2C synthetic VOC pipeline dashboard](../../../case-studies/beauty-d2c-voc/artifacts/dashboard.png)

The current run produced 5 ready records, 7 manual-review records, 2 invalid records, 1 duplicate, and 1 spam record. It generated four proposal artifacts with source identifiers and no external write. All 16 expected status, topic, and safety outcomes matched, with a 100% traceability rate.

[Runbook](../../../case-studies/beauty-d2c-voc/RUNBOOK.md) · [Evaluation report](../../../case-studies/beauty-d2c-voc/artifacts/evaluation-report.md) · [Dashboard HTML](../../../case-studies/beauty-d2c-voc/artifacts/dashboard.html) · [Run manifest](../../../case-studies/beauty-d2c-voc/artifacts/run-manifest.json)

These numbers verify the code path on a synthetic evaluation set. They do not measure real VOC distribution, production classification quality, workflow adoption, or business outcomes.

The demonstrated boundary is `current_autonomy=A1-A2`, `current_write_impact=none`, and `implemented_project_stages=[1]`. A3 sandbox writes and P2, P3, and P5 are designed next steps, not implemented evidence.

## Problem hypothesis

Global consumer reviews and inquiries are distributed across countries, languages, and channels. Marketing, product, customer-support, and operations teams repeat similar research, but different provenance, periods, samples, and classification rules make the output difficult for another team to reuse.

Initial hypothesis:

> Preserving original text and collection scope, detecting recurring issues and opportunities, and requiring a person to verify evidence before approving an action proposal can make research and handoff more consistent.

This hypothesis does not imply improvements in time, quality, or revenue for a real company. The system's quality and operability must first be tested with public data, then re-evaluated in an environment with real business baselines.

## Users

| User | Needed outcome | Responsibility |
|---|---|---|
| VOC analyst | Recurring issues and original evidence | Review collection scope and classification |
| Marketing and product | Actionable opportunities and impact scope | Set workflow priority |
| Customer support and operations | Complaints and exception flows | Confirm response and operating impact |
| Process owner | Approvable proposal with cost and risk | Decide execution or stop |

## In scope

```text
Load the synthetic VOC fixture
→ Preserve original text, provenance, time, and channel
→ Normalize language, product, and topic
→ Detect recurring issues and opportunities
→ Practitioner verifies evidence
→ Generate an action proposal
→ Human approval
→ Record execution status and outcomes
```

The current code stops at `Generate an action proposal`. Human approval and internal task creation would change another system, so the published output records `requires_human_approval=true` and `action_boundary=proposal_only` instead.

## Initially out of scope

- Customer data that can identify an individual
- Automatic changes to pricing, discounts, inventory, or purchase orders
- Automatic publication of efficacy or regulatory claims
- Automatic external messages sent through customer accounts
- Estimating real revenue impact from public data alone

## Draft data contract

| Field | Meaning | Required | Quality check |
|---|---|---:|---|
| `source_id` | Original review or inquiry identifier | Yes | Duplicate check |
| `source_type` | Synthetic or other allowed input provenance | Yes | Allowed collection path |
| `source_url` | Source location or synthetic fixture URL | Yes | HTTPS and `source_type` consistency |
| `captured_at` | Collection time | Yes | Time zone |
| `published_at` | Original publication time | Optional | Missingness distinguished |
| `market` | Country or market | Yes | Standardized code |
| `channel` | Review or inquiry channel | Yes | Allowed values |
| `product_id` | Product identifier | Optional | Mapping evidence |
| `language` | Original language | Yes | Detection confidence |
| `text_original` | Original text | Yes | Empty or truncated values |
| `text_normalized` | Normalized analysis text | Optional | Transformation version |
| `topic` | Topic classification | Optional | Model and rule version |
| `evidence_ref` | Link between proposal and source | Created in output | Reverse traceability |

The machine-readable contract is [`voc-record.schema.json`](../../../case-studies/beauty-d2c-voc/schemas/voc-record.schema.json), and the executable fixture is [`voc-sample.jsonl`](../../../case-studies/beauty-d2c-voc/data/input/voc-sample.jsonl). No public-site collection adapter is included. Before adding one, verify the source's terms, license, privacy conditions, and collection scope.

## Pipeline

Run from the repository root:

```bash
python3 case-studies/beauty-d2c-voc/pipeline/run_pipeline.py
```

The deterministic baseline validates input, normalizes text while preserving the original, marks duplicates, classifies a declared keyword set, sends missing, mixed-language, stale, unclassified, and safety cases to review, then creates only source-linked proposals. It is a reproducible control-flow baseline, not a production multilingual model.

## Draft workflow execution rules

### Input

- Public VOC that passes the data contract
- Analysis period, market, channel, and product scope
- Topic, severity, and opportunity criteria

### Output

- Issue or opportunity title
- Original evidence and provenance
- Observed frequency and scope
- Sample, missingness, and language limitations
- Proposed action and candidate owner
- Approved, held, or rejected state

### Autonomy

- Current fixture loading, normalization, and classification: A1–A2
- Current issue and opportunity proposals: A2
- Designed next step for approved internal task creation: A3
- External publishing and price or inventory changes: outside initial scope

## Evaluation

Do not judge quality from normal cases alone.

- Duplicate reviews with the same content
- Deleted or inaccessible source text
- Mixed-language cases
- Missing or incorrectly linked product names
- High-frequency but low-impact issues
- Low-frequency but high safety or regulatory risk
- Promotional, irrelevant, or spam content
- Old data that appears to be a recent issue

Evaluation dimensions:

- Traceability to original text
- Classification accuracy and unclassified-case handling
- Rate of unsupported claims
- Types of practitioner corrections
- Processing time and rework
- Reasons for approval, hold, and rejection

The expected outcomes are fixed in [`expected.jsonl`](../../../case-studies/beauty-d2c-voc/data/evaluation/expected.jsonl). Run the regression suite with:

```bash
python3 -m unittest discover \
  -s case-studies/beauty-d2c-voc/tests \
  -p 'test_*.py' \
  -v
```

## Four-week next-stage validation plan

### Week 1

- Finalize public-data scope and collection limits.
- Document the current analysis flow and baseline.
- Prepare the data contract and evaluation cases.

### Week 2

- Implement classification and summary with source traceability.
- Create a practitioner-review interface or output contract.
- Evaluate errors, missingness, and duplicates.

### Week 3

- Connect approved proposals to internal task creation.
- Implement permissions, deduplication, audit records, and recovery.
- Inspect operating status and cost.

### Week 4

- Run user acceptance with an external reviewer or operator.
- Record correction burden, trust, and workflow completion.
- Decide which contracts to reuse and which abstractions to discard.

## Published artifacts

- [Synthetic input and collection boundary](../../../case-studies/beauty-d2c-voc/data/input/voc-sample.jsonl)
- [Data schema](../../../case-studies/beauty-d2c-voc/schemas/voc-record.schema.json)
- [Normalization and classification code](../../../case-studies/beauty-d2c-voc/pipeline/run_pipeline.py)
- [Classified records](../../../case-studies/beauty-d2c-voc/artifacts/classified-records.jsonl)
- [Manual review queue](../../../case-studies/beauty-d2c-voc/artifacts/review-queue.json)
- [Source-linked workflow proposals](../../../case-studies/beauty-d2c-voc/artifacts/workflow-proposals.json)
- [Evaluation report](../../../case-studies/beauty-d2c-voc/artifacts/evaluation-report.md)
- [Run and recovery instructions](../../../case-studies/beauty-d2c-voc/RUNBOOK.md)
- [Result dashboard](../../../case-studies/beauty-d2c-voc/artifacts/dashboard.html)
- [Hashes separating generated outputs from the manual preview asset](../../../case-studies/beauty-d2c-voc/artifacts/run-manifest.json)

## Results and limitations

The current evidence shows that the same code can replay the synthetic fixture, separate failures, duplicates, and missing data, and trace each proposal to its source identifier. It does not verify public-site collection, a multilingual model, accountable approval, task-system integration, long-running operations, or user acceptance. It therefore supports no claim about real complaint mix, generalization quality, time saved, product improvement, or revenue effect.

## Open questions

- How well does public data represent internal VOC?
- How should collection bias by language and market be expressed?
- What evidence shows that a proposal reached actual work?
- Who owns the final definition when departments interpret the same issue differently?
- Which contracts and components can be reused in a second workflow?
