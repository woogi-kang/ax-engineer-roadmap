# Workflow Execution Rules

Use this template to define the input, output, evaluation, permission, approval, record, and recovery rules for one AI-enabled workflow. It complements data and API contracts; it does not replace them.

Mark whether each item is planned, tested in a sandbox, or verified in actual operation. Leave result fields empty for tests not yet run. Use [Execution Rules and Controls](../delivery-lifecycle/05-execution-contracts.md) for state, authority, and recovery criteria.

Answer the [capstone design checklist](../research/ax-failure-cases.md#checklist-for-capstone-design) before filling this in. Record answer liability, review items, permission blocks, and human handoff conditions in the matching sections of this document.

## 1. Purpose and ownership

| Field | Content |
|---|---|
| Document name and version |  |
| Workflow purpose |  |
| Primary users |  |
| Process owner |  |
| Data owner |  |
| Technical operator |  |
| Approver |  |
| Security or policy owner |  |

## 2. Input conditions

| Input | Source | Required | Freshness | Missing or error handling | Sensitivity |
|---|---|---:|---|---|---|
|  |  |  |  |  |  |

- Source state to requery immediately before action:
- Context-selection and compaction-policy version:
- Approval scope, prohibited actions, unfinished work, and source references to preserve:
- Memory owner, correction, deletion, and verification of propagation:

## 3. Output conditions

| Output | Format or schema | Quality criteria | Evidence | Next user or system |
|---|---|---|---|---|
|  |  |  |  |  |

- Source fields and external-job IDs that establish completion:
- Handling when a completion claim differs from final state:
- Workflow identifier used to exclude duplicate completions:

## 4. Evaluation criteria

| Dimension | Criteria | Data | Adjudicator | Action on failure |
|---|---|---|---|---|
| Correctness |  |  |  |  |
| Groundedness |  |  |  |  |
| Safety |  |  |  |  |
| Latency |  |  |  |  |
| Cost |  |  |  |  |
| Workflow outcome |  |  |  |  |

- Evaluation-set version, provenance, and coverage gaps:
- Per-case trials, successes, and critical failures:
- Grader validation against known correct and failed outcomes:
- Final state, cost, and latency for before/after comparison:
- Separate blocking failures, such as missing approval, duplicate writes, or unauthorized new work after a cancellation request:

## 5. Permissions and autonomy

| Action | AI permission | Human role | Approval condition | Prohibited condition |
|---|---|---|---|---|
| Read |  |  |  |  |
| Analyze or classify |  |  |  |  |
| Draft or propose |  |  |  |  |
| Create internal work |  |  |  |  |
| Change state |  |  |  |  |
| Send externally |  |  |  |  |

Initial autonomy: `A0 / A1 / A2 / A3 / A4` ([autonomy definitions](../delivery-lifecycle/05-execution-contracts.md#autonomy-levels))

| Actor | Owner | Allowed workflows and tools | Credential expiry and rotation | Revocation and verified result |
|---|---|---|---|---|
| User |  |  |  |  |
| Agent or service account |  |  |  |  |
| Subagent |  |  |  |  |

- Approved target, arguments, version, and identifier for the approved content:
- Reapproval conditions after expiry or target changes:
- Delegation scope and owner of final acceptance:
- Blocking, permitted scope, and manual handling on policy-server timeouts or errors:
- Credential-revocation and policy-outage test results:

## 6. Records

- Workflow, parent-run, subagent, tool-call, and external-job identifiers:
- User or system actor:
- Input and output contract version:
- Model, API, SDK, prompt, tool, harness, context-policy, and evaluation-set versions:
- Approval, execution, recovery, and additional-input waits:
- Cancellation request, confirmed stop, and final source state:
- Log deduplication, missing-trace handling, and masking:
- Sensitive information not to store:
- Retention and deletion period:

## 7. Failure and recovery

| Failure type | Detection | Automatic action | Human handoff | Recovery or rollback |
|---|---|---|---|---|
| Missing input |  |  |  |  |
| Permission failure |  |  |  |  |
| Quality threshold failure |  |  |  |  |
| External-system outage |  |  |  |  |
| Duplicate execution |  |  |  |  |
| Cost limit exceeded |  |  |  |  |
| Approval or credential expiry |  |  |  |  |
| Policy-server outage |  |  |  |  |
| Disconnection or late result |  |  |  |  |
| Partial success or late result after a cancellation request |  |  |  |  |

| Workflow state | Persisted values | Condition for the next state | Verification evidence |
|---|---|---|---|
| Working |  |  |  |
| Input or approval required |  |  |  |
| Completed |  |  |  |
| Failed |  |  |  |
| Cancelled |  |  |  |

- Task ID to query after reconnection and its expiry policy:
- Cancellation-request record and method for confirming stopping:
- Source-result reconciliation before retry:
- Owner of recovery or handoff for external changes already made:

Do not mark the workflow cancelled solely because its cancellation request was accepted. Record the chosen API's actual states separately from this workflow-state table.

## 8. Change and compatibility

- Change approver:
- Configuration-version changes and regression evaluation with the same inputs and authority:
- Host, Server, and SDK specification and extension support with verification dates:
- Repeated outcomes for normal, edge, failure, and adversarial cases:
- Previous-version support:
- Retirement and migration:
- Rollback criteria:

## 9. Operating decision

### Total cost per accepted completed workflow

| Field | Record |
|---|---|
| Comparison period, workflow scope, acceptance criteria |  |
| Accepted completed workflows, excluding duplicates |  |
| Model, tool, and infrastructure cost |  |
| Failed-attempt and retry cost |  |
| Human review, rework, and operations time and labor rates |  |
| Fixed costs allocated to the period and scope, with method |  |
| Excluded or missing costs and unconverted time |  |
| Total cost / accepted completed workflows |  |

Mark whether failed-attempt and retry costs are included in model, tool, and infrastructure costs or additional, so they are not counted twice. If none completes, record `N/A` and defer efficiency conclusions. Use the [calculation definition](../technical-foundations/production-operations.md#total-cost-per-completed-workflow).

| Decision | Condition |
|---|---|
| Scale |  |
| Improve |  |
| Maintain |  |
| Stop |  |
