# Case: From Global Beauty/D2C VOC to an Action Proposal

<!-- case-boundary:start -->
## Current scope and designed target

| Scope | Write impact | Autonomy | Related P stages |
|---|---|---|---|
| Current public artifact | No external write | A1-A2 | P1, P2 |
| Designed target | Approved sandbox write | A1-A3 | P1, P2, P3, P5 |

Current values cover only what this repository can reproduce. A current P label identifies a stage with implemented functionality, not completion of all its exit criteria. The designed target is not yet an implemented scope or evidence of organizational outcomes.
<!-- case-boundary:end -->

> Public-case use: The [public case-to-practice table](../../research/public-case-application-map.md) applies K04's agent review to the manual review queue and owner approval. G07's editorial approval and edit-rate measures inform proposal approval and reviewer-effort evaluation.

## Case type

This is not an internal diagnosis or consulting outcome for a specific company. Public cases contribute evaluation questions only; the executable input is a synthetic fixture built around common Beauty/D2C workflow patterns.

## Current execution evidence

This case includes a P1 pipeline that processes synthetic VOC records and P2 code that replays its proposals through an approval workflow. Both use only the Python standard library and call no external API or model.

![Beauty/D2C synthetic VOC pipeline dashboard](../../../case-studies/beauty-d2c-voc/artifacts/dashboard.png)

| Check | Current result |
|---|---|
| Input | The original 16 synthetic VOC records plus a 16-case development extension (17 lines). All synthetic |
| Evaluation cases | 32: 8 normal, 13 edge, 11 failure. Per-case labels are in [`case-catalog.jsonl`](../../../case-studies/beauty-d2c-voc/data/evaluation/case-catalog.jsonl) |
| Processing | Validate → reject personal data → block source conflicts → normalize → deduplicate → rule-based topic classification → manual-review queue → proposals |
| Status | 10 ready, 11 manual review, 5 invalid, 2 rejected, 2 conflict lines (1 case), 1 duplicate, 2 spam |
| Proposals | 5 review proposals with source identifiers |
| P1 evaluation | All 32 expected status, topic, and safety outcomes match; 100% recall and precision for inputs that must be blocked; 0 personal-data patterns left in outputs |
| Cost | 0 external API calls and 0 model tokens. Latency varies by machine, so `--benchmark` measures it separately |
| P2 replay | 10 scenarios and 40 events match their expected outcomes. 4 mock executions, 0 approval bypasses, 0 external writes |

[Runbook](RUNBOOK.md) · [Evaluation report](../../../case-studies/beauty-d2c-voc/artifacts/evaluation-report.md) · [Approval packets](artifacts/approval/approval-packets.md) · [Approval evaluation](../../../case-studies/beauty-d2c-voc/artifacts/approval/approval-evaluation.json) · [Dashboard HTML](../../../case-studies/beauty-d2c-voc/artifacts/dashboard.html) · [Run manifest](../../../case-studies/beauty-d2c-voc/artifacts/run-manifest.json)

These numbers verify the code path on a synthetic evaluation set. They do not measure real VOC distribution, production classification quality, workflow adoption, or business outcomes. `traceability_rate` measures nonempty `evidence_ref` presence; it does not test source-link reachability or evidence correctness.

All 32 cases are a development set written alongside the rules during implementation. A full match shows that the rules fit these cases, not how well they classify unseen input.

### P1 exit criteria check

| [P1 exit criterion](../../projects/01-safe-assistant.md) | Status | Evidence |
|---|---|---|
| No external system change, send, or publication | Met | All outputs are files in this repository. `current_write_impact=none` |
| Users can see sources and scope | Met | `evidence_ref` on each processed record and source identifiers on each proposal |
| At least 20 normal, edge, and failure cases | Met | 32 development cases with per-case labels |
| Forbidden or unverified input is not filled in by guessing | Met | Personal data is rejected; source conflicts, reversed timestamps, and unsupported markets are blocked; unclassified text goes to review |
| Cost, latency, and quality recorded per run | Partial | Cost and quality are in the [run summary](../../../case-studies/beauty-d2c-voc/artifacts/run-summary.json). Latency is not committed |
| Rule-based versus LLM comparison | Not run | No model API run has been recorded |
| Review by a judge other than the implementer | Pending | Only the [independent review kit](RUNBOOK.md#p1-independent-review) exists. No verdict is recorded |

This is therefore not a full P1 pass. Until the remaining items are recorded, `1` in `implemented_project_stages` means some P1 functionality is implemented.

### P2 approval replay

[`approval_workflow.py`](../../../case-studies/beauty-d2c-voc/pipeline/approval_workflow.py) turns P1 proposals into approval requests and replays a [synthetic event log](../../../case-studies/beauty-d2c-voc/data/approval/events.jsonl) in order.

- An approval is bound to a proposal version. If the evidence changes after approval, the earlier approval is invalidated and the new version needs its own approval.
- At decision time and again just before execution, the code checks the approver's topic scope, the safety-reviewer role for proposals with a safety signal, and whether authority was revoked.
- Requests expire after 72 hours and approvals after 48 hours.
- A repeated idempotency key or an already executed request never creates another mock execution.
- Rejection, approval with edits, and requests for more information need a reason.
- Only approved requests leave a work-item draft in [`mock-executions.jsonl`](../../../case-studies/beauty-d2c-voc/artifacts/approval/mock-executions.jsonl). `external_write=false`; nothing is written to a real work system.

The [approval packets](artifacts/approval/approval-packets.md) show each request's source text, warnings, before and after, and decision record. Scenario decisions and review times are values made up to test state transitions, not records of real people approving anything. Waiting time and review time are recorded separately, but they are not used to estimate real approval effort.

Of the [P2 exit criteria](../../projects/02-human-approved-workflow.md), blocking unauthorized approvals and expired requests, blocking mock execution without approval, and reconstructing decisions from the record were tested with scenarios. Whether a real approver can handle representative cases from the packet alone, and whether edit and rejection reasons feed the next evaluation, need records of human use and have not been checked.

The demonstrated boundary is `current_autonomy=A1-A2`, `current_write_impact=none`, and `implemented_project_stages=[1, 2]`. `[1, 2]` means functionality belonging to P1 and P2 is implemented, not that either stage passed. A3 sandbox writes, P3, and P5 remain unimplemented design targets.

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

## Designed end-to-end flow

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

The current code validates and classifies synthetic inputs, generates review queues and proposals, and in the P2 replay records approval requests, decisions, and mock executions. Synthetic events stand in for the practitioner's evidence check and approval; they are not decisions by real people. No internal task is created. `requires_human_approval=true` and `action_boundary=proposal_only` describe the proposal boundary; they are not records of actual approval or review.

## Initially out of scope

- Customer data that can identify an individual
- Automatic changes to pricing, discounts, inventory, or purchase orders
- Automatic publication of efficacy or regulatory claims
- Automatic external messages sent through customer accounts
- Estimating real revenue impact from public data alone

## Draft data contract

| Field | Meaning | Required | Quality check |
|---|---|---:|---|
| `source_id` | Original review or inquiry identifier | Yes | Duplicate check; conflicting content under the same identifier |
| `source_type` | Input provenance | Yes | Current code accepts only `synthetic` |
| `source_url` | Source location or synthetic fixture URL | Yes | Current code checks only the `https://` prefix |
| `captured_at` | Collection time | Yes | Time zone; not earlier than publication |
| `published_at` | Original publication time | Optional | Missingness distinguished |
| `market` | Country or market | Yes | Standardized code |
| `channel` | Review or inquiry channel | Yes | Allowed values |
| `product_id` | Product identifier | Optional | Mapping evidence |
| `language` | Original language | Yes | Allowed-code check; automatic language detection is not implemented |
| `text_original` | Original text | Yes | Empty or truncated values; rejected if it contains contact details |
| `text_normalized` | Normalized analysis text | Optional | Transformation version |
| `topic` | Topic classification | Optional | Model and rule version |
| `evidence_ref` | Link between proposal and source | Created in output | Reverse traceability |

The machine-readable contract is [`voc-record.schema.json`](../../../case-studies/beauty-d2c-voc/schemas/voc-record.schema.json), and the executable fixtures are [`voc-sample.jsonl`](../../../case-studies/beauty-d2c-voc/data/input/voc-sample.jsonl) and [`voc-extension.jsonl`](../../../case-studies/beauty-d2c-voc/data/input/voc-extension.jsonl). The email address and phone number in the extension are fake values that exercise the rejection path. No public-site collection adapter is included. Before adding one, verify the source's terms, license, privacy conditions, and collection scope.

## Pipeline

Run from the repository root:

```bash
python3 case-studies/beauty-d2c-voc/pipeline/run_pipeline.py
python3 case-studies/beauty-d2c-voc/pipeline/approval_workflow.py
```

The deterministic baseline validates input, including the order of publication and collection times; rejects text containing an email address or phone number and writes `[withheld:personal_data]` instead of the original; blocks every record whose `source_id` appears with different content; normalizes text while preserving the original; marks duplicates; classifies a declared Korean, English, and Japanese keyword set, ignoring safety words in English negations such as `no irritation`; sends missing, mixed-language, stale, unclassified, and safety cases to review, then creates only source-linked proposals. It is a reproducible control-flow baseline, not a production multilingual model.

## Draft workflow execution rules

### Input

- Current implementation: synthetic VOC that passes the contract. Real public VOC is an extension requiring separate collection and review
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

The original 16 expected outcomes in [`expected.jsonl`](../../../case-studies/beauty-d2c-voc/data/evaluation/expected.jsonl) are unchanged; 16 more are in [`expected-extension.jsonl`](../../../case-studies/beauty-d2c-voc/data/evaluation/expected-extension.jsonl). [`case-catalog.jsonl`](../../../case-studies/beauty-d2c-voc/data/evaluation/case-catalog.jsonl) labels each case as normal, edge, or failure and names the condition it checks. Run the regression suite with:

```bash
python3 -m unittest discover \
  -s case-studies/beauty-d2c-voc/tests \
  -p 'test_*.py' \
  -v
```

The tests cover normalization, invalid input, duplicates, safety signals, missing fields, personal-data rejection, source conflicts, reversed timestamps, negation, the original 16 records on their own, the 32-case evaluation, and artifact generation. Approval state transitions and the review kit's first-run preservation and reviewer conditions are tested separately.

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

## Exit criteria for the next extension

These criteria apply when adding a model or extending the exercise to P3. The published code makes no model call and no workflow-system write, and approvals are replayed from synthetic events.

1. Preserve the original 16 records, the 16-case extension, and their expected results. Evaluate any added model in a separate run against the rule-based baseline, recording model, API, SDK, prompt, and evaluation-set versions. This development set alone does not establish generalization quality.
2. Restore initial state between repeated quality trials and compare topics, safety signals, source links, and review time on the same inputs. Record retained state and starting conditions separately for duplicate and reconnection tests. Do not supply evaluation answers to the model or change the baseline answers to match its output.
3. Apply the version binding and authority re-check tested in the P2 replay just before writing to a test work system as well. Record the approved version and execution identifier.
4. Disconnect immediately after saving in a test task system, then reconnect. Check whether the same task already exists before retrying. Evaluate the proposal's completion message separately from the saved system state.
5. Calculate [cost per completed workflow](../../toolkit/experiment-card.md), including failures, retries, review, and rework. If there are no completions, leave unit cost unavailable and record failure costs and the reason to hold.

Use the [K04 follow-up evidence](../../research/public-ax-cases.md) to decide what work reviewers will take on when repetitive checking decreases. Record review time, correction reasons, holds, rejections, and handoffs in this exercise. Do not transfer the external contact center's outcome figures into an expected benefit for this VOC exercise.

## Published artifacts

- [Synthetic input and collection boundary](../../../case-studies/beauty-d2c-voc/data/input/voc-sample.jsonl), [development extension](../../../case-studies/beauty-d2c-voc/data/input/voc-extension.jsonl)
- [Evaluation case labels](../../../case-studies/beauty-d2c-voc/data/evaluation/case-catalog.jsonl)
- [Data schema](../../../case-studies/beauty-d2c-voc/schemas/voc-record.schema.json)
- [Normalization and classification code](../../../case-studies/beauty-d2c-voc/pipeline/run_pipeline.py)
- [Classified records](../../../case-studies/beauty-d2c-voc/artifacts/classified-records.jsonl)
- [Manual review queue](../../../case-studies/beauty-d2c-voc/artifacts/review-queue.json)
- [Source-linked workflow proposals](../../../case-studies/beauty-d2c-voc/artifacts/workflow-proposals.json)
- [Evaluation report](../../../case-studies/beauty-d2c-voc/artifacts/evaluation-report.md)
- [P2 approval replay code](../../../case-studies/beauty-d2c-voc/pipeline/approval_workflow.py), [approver and event scenarios](../../../case-studies/beauty-d2c-voc/data/approval/events.jsonl), [approval packets](artifacts/approval/approval-packets.md), [audit log](../../../case-studies/beauty-d2c-voc/artifacts/approval/approval-audit-log.jsonl)
- [P1 independent review kit](../../../case-studies/beauty-d2c-voc/pipeline/independent_review.py)
- [Run and recovery instructions](RUNBOOK.md)
- [Result dashboard](../../../case-studies/beauty-d2c-voc/artifacts/dashboard.html)
- [Hashes separating generated outputs from the manual preview asset](../../../case-studies/beauty-d2c-voc/artifacts/run-manifest.json)

## Results and limitations

The current evidence shows that the same code can replay the synthetic fixtures, separate failures, duplicates, missing data, and forbidden input, and trace each proposal to its source identifier. It also shows that mock execution is blocked when the approved version changes, authority is revoked, or a request expires. It does not verify public-site collection, a multilingual model, approval by real owners, task-system integration, long-running operations, user acceptance, or independent review by someone outside the implementation. It therefore supports no claim about real complaint mix, generalization quality, time saved, product improvement, or revenue effect.

The next step is an [independent review](RUNBOOK.md#p1-independent-review) on new inputs by a reviewer who did not take part in the implementation. After that, test the same contract on public data whose terms have been checked, and add correction types and hold or rejection reasons from real reviewers to the evaluation set.

## Open questions

- How well does public data represent internal VOC?
- How should collection bias by language and market be expressed?
- What evidence shows that a proposal reached actual work?
- Who owns the final definition when departments interpret the same issue differently?
- Which contracts and components can be reused in a second workflow?
