# Case: From Slack Meeting Signals to Human-Approved Actions

This is a **learning simulation of an AX workflow transformation** that receives a request in Slack, connects knowledge in Notion, Google Workspace artifacts, and work state in monday.com, then prepares a meeting pre-read and action items. Only human-approved items are written to a monday.com sandbox, with a Friday follow-up on current state. It does not claim adoption or actual workflow outcomes at a specific company.

## 1. Case type and classification

| Item | Classification |
|---|---|
| Case type | Single workflow |
| Public evidence stage | Simulation design |
| Starting readiness | Environment with SaaS accounts and internal IT support |
| Risk | Moderate |
| Write impact | Approved sandbox write |
| Autonomy | A1–A3 |
| Related projects | P1, P2, P3, P4, P5 |
| Verified on | 2026-07-27 |

`ready` means the simulation can begin with synthetic materials and test accounts. It does not mean that P4 production piloting or real organizational outcomes have been completed.

## 2. Problem and users

A meeting request starts in Slack, but background knowledge lives in Notion, working documents live in Google Workspace, and actual work state lives in monday.com. Participants search for the same material before the meeting, and someone must re-enter decisions and owners afterward. Friday follow-up can easily depend on memory and message search.

| User | Needed outcome | Responsibility |
|---|---|---|
| Meeting requester | Pre-read with purpose, issues, and needed decisions | Confirm request scope and participants |
| Participant or knowledge owner | Current context with linked sources | Review Notion knowledge and Workspace artifacts |
| Action owner | Action, completion condition, and due date | Edit and accept the proposal |
| Approver | Approval decision that considers cost, risk, and priority | Explicitly record approval, hold, or rejection |
| Operator or AX engineer | Traceable and recoverable flow without duplicates | Maintain permissions, writes, evaluation, and incident response |

The current baseline is recorded as these workflow conditions:

- The source and latest version for a pre-read are difficult to inspect together.
- Meeting discussion is not reliably separated from a final decision.
- Actions in Slack and monday.com can be duplicated or carry different states.
- Approver, approval time, and approved wording are not recorded consistently.
- Friday follow-up may read an old meeting note instead of current monday.com state.

## 3. Current and target workflows

### Current workflow

```text
Meeting request arrives in Slack
→ Participants search Notion, Google Workspace, and monday.com separately
→ Meeting starts without a pre-read or with different materials
→ Someone extracts actions from the notes
→ Actions are copied manually into Slack and monday.com
→ On Friday, only remembered items receive follow-up
```

### Target workflow

```text
Start a run from an authorized Slack request
→ Read authorized Notion knowledge, Google Workspace artifacts, and monday.com state
→ Draft a pre-read with provenance and versions
→ Requester and knowledge owner review it
→ Hold the meeting
→ Propose actions separately from decisions
→ Owner and approver verify wording, owner, due date, and completion condition
→ Human gives explicit approval
→ Check permission, schema, and duplicates
→ Create a task in the monday.com sandbox
→ Verify the returned task ID and actual state
→ On Friday, reread current monday.com state and draft follow-up
→ A person reviews, posts, closes, or replans it
```

## 4. Existing SaaS and source-of-truth roles

This case is a thin overlay that connects provenance, approval, and execution records. It is not a replacement platform for existing SaaS.

| System | Source-of-truth role | Allowed action | Prohibited action |
|---|---|---|---|
| Slack | Request entry point and conversation or notification channel | Receive authorized requests and display drafts or state | Do not use as the source of truth for long-term knowledge or task state |
| Notion | Source of truth for workflow knowledge and procedures | Read authorized pages while preserving provenance and modification time | Do not let the model modify knowledge |
| Google Workspace | Source of truth for artifacts such as documents, sheets, and slides | Read authorized files while preserving version and link | Do not copy everything into a new store or edit automatically |
| monday.com | Source of truth for task state after creation | Write one approved action to a sandbox and read the result | Do not write to production boards or overwrite state from Slack |
| Workflow execution ledger | Source of truth for run, approval, and external-write state | Record `run_id`, approval event, execution key, errors, and recovery | Do not collect complete source documents into a new repository |

An approval event must include approver, time, and target action version. A Slack reaction, meeting atmosphere, or model confidence is not approval.

The minimum execution fields are:

| Field | Role |
|---|---|
| `run_id`, `schema_version` | Identify one run and rule version |
| `slack_thread_ref` | Locate the original request |
| `knowledge_refs`, `artifact_refs`, `task_refs` | Preserve Notion, Workspace, and monday.com provenance and versions |
| `proposed_action_id`, `action_version` | Identify the action being approved |
| `owner`, `due_at`, `done_condition` | Record owner, due date, and completion condition |
| `approval_state`, `approved_by`, `approved_at` | Record the explicit approval event |
| `write_key`, `external_task_id`, `write_state` | Prevent duplicates and confirm the external write |
| `follow_up_at`, `follow_up_state` | Record Friday follow-up state |

## 5. Scope, non-goals, and stop conditions

### In scope

- Structured meeting requests received in a test Slack channel
- Read access to authorized Notion pages, Google Workspace files, and monday.com sandbox tasks
- Pre-read and action-item drafts with linked sources
- Owner edits and explicit human approval
- Creation of one approved task in a monday.com sandbox
- Friday current-state lookup and follow-up draft
- Deduplication, permission denial, partial failure, recovery, and audit records

### Out of scope

- Replacing or consolidating Slack, Notion, Google Workspace, or monday.com across an organization
- Continuous collection of every channel, document, or meeting
- Long-term storage of complete meeting recordings or transcripts
- Letting AI finalize decisions, owners, due dates, or approval
- Writes to production monday.com boards or customer-facing messages
- Employee performance or participation scoring
- Claims about adoption effects or meeting-time reduction

### Stop conditions

- Participant and source permissions cannot be checked before a run.
- Sources conflict or are stale, but the pre-read presents one answer as fact.
- An action without an owner, completion condition, or approver reaches the write step.
- The approved version differs from the payload being written.
- After a timeout, actual task creation cannot be verified.
- A test account can reach a production board.
- The existing manual meeting process cannot resume after failure or cancellation.

## 6. Implementation and validation mapped to P1–P5

| Project | Work in this case | Pass condition |
|---|---|---|
| P1 Safe assistant | Build a pre-read from a synthetic request and read-only sources. | Every claim has provenance, and inaccessible or stale material is labeled. |
| P2 Human-approved workflow | Propose post-meeting actions for the owner and approver to edit, approve, or reject. | No external write tool can run before approval. |
| P3 Sandbox integration | Write the approved version to a monday.com sandbox and test duplicates, partial failure, and recovery. | The same `write_key` creates one task, and the returned ID is verified on the actual board. |
| P4 Limited production | Design the scope and entry gate for a pilot using a small group of consenting users, a test channel, and permitted material. | This document stops at design and does not present actual use or outcomes as evidence. |
| P5 Reuse in a second workflow | Compare provenance, approval, state, and recovery rules with the [file and CSV AX Hub case](../file-csv-to-ax-hub/README.md). | Separate rules actually shared from SaaS-specific exceptions, without prematurely building a common platform. |

## 7. Evaluation and failure injection

Evaluation covers pre-read traceability, action fidelity, approval invariants, duplicate-free writes, external-result verification, freshness of Friday follow-up, and human correction burden.

| Injected failure | Expected behavior |
|---|---|
| Notion page permission is missing or its link is deleted | Label the missing source and do not fill the gap by guessing. |
| A Notion procedure conflicts with a Workspace document | Show both sources and modification times, then hand off to the knowledge owner. |
| A document contains a malicious string that resembles an instruction | Treat it only as source data; do not execute it as a tool or policy command. |
| Owner, due date, or completion condition is ambiguous | Do not promote the action to an approvable state. |
| Approver loses permission or wording changes after approval | Invalidate the approval and require review of the new version. |
| Approval button is clicked more than once | Do not duplicate the approval event or `write_key`. |
| Task creation times out before a response | Query monday.com for actual creation before attempting another write. |
| monday.com applies only some fields | Record partial success and do not mark the action complete. |
| A task moves, closes, or is deleted before Friday | Reread current state and display the exception with the source link. |

Required invariants are zero writes without approval, zero duplicate tasks from retries, zero unverified success records, and provenance for every pre-read and follow-up item. Do not present accuracy, time savings, or usability figures before measuring them in the simulation.

## 8. Operations and handoff

| Role | Operating responsibility |
|---|---|
| Workflow owner | Define request form, approver, completion condition, and pilot entry decision |
| Knowledge or artifact owner | Confirm freshness and disclosure scope for Notion and Workspace sources |
| Approver and action owner | Verify action version, approve, accept, or change it |
| SaaS administrator | Separate test and production accounts, enforce least privilege, retain audit logs |
| AX engineer | Maintain execution state, deduplication, evaluation, alerts, and recovery |
| Operator | Process error queues and Friday exceptions, then confirm manual disposition and closure |

Operating records include `run_id`, source references and versions, pre-read reviewer, meeting time, action change history, approval event, `write_key`, returned monday.com ID, Friday result, and error, retry, and manual-processing states.

Before handoff, an operator must handle permission denial, verification after a task-creation timeout, and partial field application without the implementer. When the automated flow is disabled, the team must be able to return to its existing Slack request, manual pre-read, and manual task-creation process.

## 9. Deliverables

- Synthetic bundle of a Slack request, Notion knowledge, Workspace artifacts, and monday.com tasks
- Permission and source-of-truth matrix for each system
- Schemas for pre-read, action, approval, and write state
- Review interface or equivalent approval record
- Sandbox-write and deduplication execution records
- Normal, boundary, and failure evaluation sets and results
- Friday follow-up draft linked to source tasks
- Runbook, incident and recovery records, and user acceptance
- Reuse, modification, and retirement decision table against the first case

## 10. Current result and limitations

The current result is a simulation design that connects pre-read, meeting, approval, sandbox write, and Friday follow-up while preserving existing SaaS roles. There are no evaluation results from real accounts or organizational outcomes.

Limitations:

- Synthetic material and sandboxes do not represent every real permission structure, source-quality issue, or API limit.
- Meeting remarks alone cannot fully reconstruct decision intent and accountability.
- Conflicts between Notion and Workspace require a knowledge owner, not a model, to resolve them.
- Friday follow-up does not prove the quality of task completion or a business outcome.
- P4 is an entry-gate design, not evidence that limited production occurred.

This case does not claim adoption by a specific organization, shorter meetings, fewer missed tasks, successful monday.com rollout, or return on investment.

## 11. Reuse and next decision

| Category | Candidate decision |
|---|---|
| Reuse unchanged | `run_id`, provenance and version references, approval event, `write_key`, external-result verification, failure state |
| Reuse with changes | Pre-read format, action fields, Friday follow-up rules |
| Keep system-specific | Slack request pattern, Notion knowledge structure, Workspace file rules, monday.com board fields |
| Do not standardize | A platform that forces one meeting format, approver structure, or due-date policy on every team |

The next step is a **P1–P3 simulation that retains the existing SaaS overlay**. P4 limited piloting requires separate approval only after the workflow passes approval invariants, sandbox isolation, deduplication, recovery, and operator handoff.

In P5, retain only execution records actually shared with the file and CSV case as common-harness candidates. If SaaS-specific exceptions outnumber common rules or operating burden does not improve, do not expand; keep workflow-specific configurations or stop the experiment.
