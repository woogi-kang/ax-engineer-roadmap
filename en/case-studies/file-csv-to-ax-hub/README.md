# Case: From Scattered Files and CSVs to a Reviewable AX Hub

<!-- case-boundary:start -->
## Current scope and designed target

| Scope | Write impact | Autonomy | P stages |
|---|---|---|---|
| Current public artifact | No external write | A0 | None |
| Designed target | Draft only | A1-A2 | P1, P2, P3, P5 |

Current values cover only what this repository can reproduce. The designed target is not yet an implemented scope or evidence of organizational outcomes.
<!-- case-boundary:end -->

> Public-case link: K10, G04, and G05 contribute record integration, site-specific knowledge, and product-version constraints through the [application map](../../research/public-case-application-map.md).

This is a **learning simulation of an AX workflow transformation** that consolidates personal AI outputs, CSV files spread across multiple folders, and meeting signals about blockers and approvals into structured work records, then prepares a Slack digest draft. It is not a case of an actual company adoption, nor does it claim improvements in time, cost, or quality.

## 1. Case type and classification

| Item | Classification |
|---|---|
| Case type | Single workflow |
| Public evidence stage | Simulation design |
| Starting readiness | From teams without a separate development environment to teams already using SaaS |
| Risk | Moderate |
| Designed write impact | Draft only |
| Designed autonomy | A1–A2 |
| Designed P stages | P1, P2, P3, P5 |
| Verified on | 2026-07-27 |

`ready` means the design is ready for a simulation using public or synthetic data. It does not mean that the workflow has proved effective in production.

If the simulation is run, the publishable scope will be limited to synthetic CSV files, de-identified example outputs, schemas, evaluation results, and incident and recovery records. Real organizational documents, personal prompts, customer or employee information, and access tokens will not be used.

## 2. Problem and users

### Problem

Research, summaries, and ideas produced with personal AI tools remain in documents or chat histories, while actual work status is split across different CSV files. Signals such as the owner, due date, blocker, pending approval, and approval may exist only in meeting notes or messages.

Answering the following questions therefore requires reopening files and asking people to confirm details:

- Is the same work duplicated across files?
- What are the latest status and owner?
- What is blocking the work, and who holds the next decision?
- Who actually approved the work, and when?
- Does the Slack digest still match its source?

### Users and responsibilities

| User | Needed outcome | Responsibility |
|---|---|---|
| Practitioner | Their work, blockers, and next action | Confirm source status and owner |
| Team lead or approver | Items awaiting approval and supporting context | Explicitly record approval, hold, or rejection |
| Operations owner | A list that exposes missing, duplicate, and invalid records | Process review queues and manual recovery |
| AX engineer | Traceable structure and execution records | Maintain mappings, permissions, evaluation, and incident response |

The current baseline is recorded as a workflow state, not as an estimated processing-time metric:

- Source files and personal outputs cannot be found from one place.
- Field names and allowed values for status, owner, and due date vary by file.
- There is no rule for bringing meeting blockers and approvals back into CSV rows.
- Slack summaries do not contain identifiers that trace back to a source.
- Corrections, reruns, and duplicate handling leave no consistent record.

An incorrect merge can make an old status appear current, mistake a discussion for approval, or expose restricted information to a broader Slack channel.

## 3. Current workflow

```text
An individual researches or summarizes with AI
→ Saves the output in a personal document or chat history
→ Updates work status separately in multiple CSV files
→ Discusses blockers, owners, and approvals in a meeting
→ Someone compares files and meeting notes again
→ Writes a Slack digest manually
→ A later source change does not mark the digest as stale
```

The bottleneck is not only the absence of one place for files. The more important gaps are the lack of rules for deciding which source governs a field, who resolves conflicting values, and what event constitutes approval.

## 4. Target workflow and source-of-truth roles

### Target workflow

```text
Register permitted personal AI outputs, CSV files, and meeting signals
→ Record source hash, modification time, and owner
→ Validate field mappings and formats
→ Quarantine duplicates, conflicts, and suspected sensitive information
→ Create review drafts in the AX Hub structured database v0
→ Practitioner compares each draft with its source, then merges, edits, or rejects it
→ Explicitly confirm blocker and approval states
→ Include only reviewed records in the Slack digest draft
→ A person performs the final review and publishes it
→ Record the published message together with its Hub record identifiers
```

The system never infers an approval state from context. Even if a meeting note says that something “looks good,” `approval_state` does not change until an identified approver performs an explicit approval action.

### Systems and sources of truth

| System or material | Source-of-truth role | Role in this workflow | What it does not do |
|---|---|---|---|
| Personal AI output | Original source for an idea or analysis draft | Registers candidate material with provenance and creation time | Does not automatically promote a draft to a fact or final decision |
| Distributed CSV | Original record formerly maintained by each workflow owner | Imports a read-only snapshot and maps its fields | Does not overwrite the source file or silently merge columns with different meanings |
| Meeting notes and blocker signals | Source for decision context and exceptions | Preserves source location and time to create a review candidate | Does not infer and confirm the cause, owner, or approval |
| Explicit approval event | Only source of truth for approval state | Records approver, time, and target version | Does not derive approval from a model response or emoji alone |
| Notion-style AX Hub / structured database v0 | Source of truth for reviewed, consolidated status | Connects work, provenance, owner, blocker, approval, and review state | Does not discard every source file or copy every source in full |
| Slack | Channel for reading notifications and digests | Displays a digest draft built from reviewed records | Is not the source of truth for approval, work state, or long-term records |

The AX Hub is not a new enterprise database that takes ownership away from existing sources. In v0, it is a thin coordination layer that records which source each record refers to and who reviewed it.

### Minimum fields for structured database v0

| Field | Meaning | Write rule |
|---|---|---|
| `record_id` | Stable identifier inside the Hub | Remains unchanged across reruns for the same source and version |
| `record_type` | Record type, such as research, task, decision, or blocker | Quarantine values outside the allowed set |
| `title` | Short human-readable title | Mark AI-generated text as a draft until review |
| `source_type` | Source type, such as AI output, CSV, or meeting note | Required |
| `source_ref` | Location or identifier that can locate the source again | Exclude secrets and full private conversations |
| `source_hash` | Hash of the imported source version | Used to detect source changes |
| `source_updated_at` | Time the source last changed | Store its time zone |
| `owner` | Person who can confirm work status | Set `needs_review` when missing |
| `status` | Work status | Apply only allowed state transitions |
| `blocker` | Blocker description and resolution condition | Do not create without provenance |
| `approval_state` | `not_requested`, `requested`, `approved`, or `rejected` | Only an explicit human event can set `approved` |
| `approved_by`, `approved_at` | Approver and approval time | Both required for an approved state |
| `review_state` | `needs_review`, `reviewed`, or `quarantined` | Only `reviewed` records can enter the Slack draft |
| `schema_version` | Mapping and field-rule version | Record for every import run |
| `run_id` | Identifier for one collection and transformation run | Connects logs, recovery, and reruns |

## 5. Scope, non-goals, and stop conditions

### In scope

- Inventory of provenance for synthetic or publicly shareable personal AI outputs and CSV files
- Rules for field mapping, missingness, allowed values, and freshness for each CSV
- A review queue that finds blocker and approval **candidates** in meeting notes but requires human confirmation
- Structured database v0 linked to source versions
- Slack digest drafts built only from reviewed items
- Execution identifiers, change records, quarantine, rerun, and manual recovery procedures
- Reuse-candidate records for comparison with a second workflow

### Out of scope

- Migrating real company materials into one place
- Bidirectional synchronization that automatically edits or deletes source CSV files
- Letting AI make final decisions about owners, priorities, due dates, or approval
- Publishing Slack digests without review
- Evaluating the performance of customers, employees, or individuals
- A search system that stores every document and complete conversation
- Claims that the tool alone improved time, cost, or quality
- P4 limited production

### Stop conditions

- The source owner or permitted disclosure scope cannot be confirmed.
- Suspected sensitive information cannot be quarantined.
- CSV values conflict and no person can decide their precedence.
- An unapproved item enters an approved state or published Slack message.
- Repeating the same input creates duplicate records.
- After a partial failure, the team cannot identify or reverse what changed.
- A growing review queue has neither an owner nor a processing deadline.

## 6. Implementation and validation mapped to P1–P5

This table defines the simulation sequence and gates, not completed delivery evidence.

| Project | Work in this case | Evidence to inspect | Gate for the next stage |
|---|---|---|---|
| P1 Safe assistant | Read synthetic files and propose field mappings, missing values, duplicates, and status candidates. Write to no external system. | Source inventory, schema v0, evaluation set, quarantine results | Every output traces to a source version, and unknown values remain empty. |
| P2 Human-approved workflow | A person edits, approves, or rejects merge, status, blocker, and approval candidates. | Before and after values, reviewer, decision reason, approval event | Neither model output nor meeting language alone changes approval state. |
| P3 Sandbox integration | An operator applies a reviewed import batch to an isolated structured database v0 and creates a Slack digest preview. | Permission matrix, deduplication, partial failure, rollback, preview | Write impact remains draft-only; the workflow does not automatically modify sources or Slack. |
| P4 Limited production | Not performed in this case. | Not applicable | Requires separate approval after real users, a baseline, data policy, and operating ownership exist. |
| P5 Reuse in a second workflow | Compare provenance, review, approval, and execution records with the [Slack meeting action case](../slack-meeting-actions/README.md). | Reuse, modify, and retire table; version decision | Separate workflow-specific rules such as CSV mappings from shared execution rules. |

## 7. Evaluation and failure injection

### Evaluation questions

- Can every Hub record be traced to its source file and imported version?
- When a field is absent or meanings conflict, does the system leave the value unset and route it for review?
- Does approval state include approver, time, and target version?
- Does repeating the same input and `run_id` avoid duplicate records and digest items?
- Does each Slack draft item link to a reviewed Hub record?
- Can an operator recover from errors by reading logs and sources without relying on an AI explanation?
- Can the team measure which fields people correct and how often?

At minimum, the gate includes these invariants:

- Zero approvals without provenance
- Zero unapproved items in a published message
- Zero duplicate side effects caused by reruns
- Zero silently overwritten conflicts
- A recorded `run_id` and manual disposition for every quarantined or partially failed item

Do not invent targets for field accuracy, review time, or correction burden before observing a real baseline. Use the simulation results to agree with the workflow owner on acceptable thresholds for the next experiment.

### Failure-injection matrix

| Injected failure | Expected behavior | Evidence to retain |
|---|---|---|
| CSV encoding, delimiter, or column name changes | Do not report full success; quarantine the affected file. | Error location, schema version, reprocessing result |
| The same work appears in multiple CSVs with different states | Do not choose the latest value silently; create a conflict group. | Candidate sources, selected value, decision owner and reason |
| Source AI output changes after import | Display the hash difference and do not inherit prior review automatically. | Previous and current versions, rereview state |
| A meeting note contains ambiguous language that merely resembles approval | Do not confirm approval; leave it `requested` or requiring review. | Source location, review result |
| Owner, due date, or time zone is missing | Do not infer a value; expose the missing field. | Missingness rate, correction type |
| A string resembles a secret or personal information | Exclude it from the Slack draft and general review view, then route it to a restricted queue. | Detection rule, access record, retention decision |
| Only some records are applied before an import failure | Separate applied and unapplied records, then resume safely with the same execution key. | Commit point, rerun result, duplicate check |
| Slack draft generation or publication fails | Do not mark the Hub state as delivered; switch to draft regeneration or manual publication. | Failure state, retry count, manual action |

Do not build the evaluation set from normal cases alone. Separate normal, boundary, failure, and permission-denied cases, and retain source, expected state, actual result, and human correction together.

## 8. Operations and handoff

### Roles

| Role | Operating responsibility |
|---|---|
| Workflow owner | Define status and approval, set review deadlines, decide whether to continue or stop |
| Source owner | Confirm file meaning, column mapping, freshness, and retention period |
| Review operator | Process quarantine and conflict queues, perform final Slack draft review |
| AX engineer | Maintain import, state transitions, permissions, logs, evaluation, and recovery |
| Security and privacy owner | Review permitted materials, masking, access, retention, and deletion rules |

### Operating records

Retain the following for every simulation run:

- `run_id`, start and end times, schema and mapping versions
- Number of sources read and candidates created, reviewed, quarantined, and rejected
- Number and disposition of duplicates, conflicts, and suspected sensitive records
- Fields corrected by people and their correction reasons
- Slack draft version, reviewer, publication state, and linked `record_id` values
- Errors, retries, manual fallback, and recovery result

An alert must not collapse a partial run into a one-line “success.” If only some files were processed or reviews remain, label the run as partially successful and identify the next owner.

### Handoff checks

- Can a non-developer operator locate an error in an existing mapping without adding a new CSV mapping?
- Is the procedure for excluding or reimporting one source file documented?
- When an approval event is corrected, does the workflow append a new event instead of deleting history?
- Can the team operate the Hub without publishing to Slack, or stop the automation and return to the existing manual digest?
- Can an operator diagnose and handle three representative failures without the implementer?

## 9. Deliverables

After running the simulation, the following artifacts should be publishable under the same `run_id`:

- Source inventory separated into permitted and excluded material
- Synthetic examples of AI outputs, CSV files, and meeting signals
- Field mappings for each CSV and the structured database v0 schema
- State-transition, approval, review, and quarantine rules
- Provenance, version, and change records
- Normal, boundary, and failure evaluation sets and run results
- Hub list, detail, and review-queue screens or equivalent artifacts
- Slack digest draft with source-link examples
- Permission matrix, runbook, and incident and recovery records
- User acceptance and reuse decision

## 10. Current result and limitations

### Current result

The current public result is a pre-implementation design. It defines reviewable roles for each source of truth, minimum fields for structured database v0, P1–P5 mapping, failure injection, and operating-handoff conditions. There are no evaluation run results or organizational outcomes yet.

### Limitations

- This case does not represent a real company's file structure, approval process, or data distribution.
- “Notion-style” describes relational views and review screens, not the measured effect of adopting a specific product.
- CSV column meaning and freshness cannot be fully reconstructed without a source owner's explanation.
- Personal AI outputs may mix facts and ideas and require separate comparison with their original materials.
- Manual-review capacity and fatigue must be measured in the simulation before making a decision.
- This design has not validated real Slack publication, production APIs, personal-data processing, or organizational permissions.

### What this case does not claim

- That a real organization uses this Hub
- That processing time, cost, quality, or collaboration satisfaction improved
- That every distributed file was consolidated or a source system was replaced
- That AI can judge approval or work priority accurately

## 11. Reuse and next decision

| Category | Candidate decision |
|---|---|
| Reuse unchanged | `run_id`, provenance and version fields, review state, explicit approval event, deduplication, evaluation result format |
| Reuse with changes | Slack digest format, owner and status values, review-queue priority |
| Keep workflow-specific | CSV column mapping, file ownership, meeting terminology, retention periods |
| Do not standardize | Notion-style screens, a particular folder structure, or one mandatory status set for every team |

The next step is a **P1–P3 synthetic-data simulation**. It tests traceability, approval invariants, deduplication, recovery, and manual-review burden. In P5, retain as shared execution-rule candidates only the parts that are actually reused in the Slack meeting workflow, which has a different input structure.

Moving to P4 limited production requires a real workflow owner to define the baseline and permitted data, an operator who can process review queues and incidents, and security and privacy approval for access and retention rules. If any condition is missing, keep the existing manual process, reduce scope, or stop the experiment.
