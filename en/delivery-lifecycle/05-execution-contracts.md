# 5. Execution Rules and Controls

## Purpose

Define the input, output, evaluation, permission, approval, record, and recovery rules for an AI-enabled workflow in one place. This repository calls the resulting document an `execution contract`.

## Minimum execution rules

| Area | What to define |
|---|---|
| Purpose | Whose workflow outcome changes, and how |
| Input | Required fields, provenance, freshness, and missing-data handling |
| Output | Schema, format, quality criteria, and evidence |
| Evaluation | Normal, edge, failure, and adversarial cases, trial counts, final source state, and adjudication |
| Permissions | Allowed read, propose, create, change, and external-send actions |
| Approval | Approver, approved target, arguments and version, expiry, and delegation |
| Identity | Owners of people, agent, and service-account identities; credential expiry and revocation |
| Policy outage | Blocking, manual handling, and recovery when the policy server is unavailable |
| Records | Workflow, parent-run, subagent, external-result IDs, and configuration versions |
| Long-running work | Additional input, approval waits, reconnection, cancellation requests, and confirmed stopping |
| Recovery | Stop, retry, reversal, and manual handling |
| Cost | Per-run and period limits, total cost per accepted completed workflow, and over-limit behavior |
| Accountability | Workflow, data, technical, and security owners |

## Autonomy levels

| Level | AI role | Execution |
|---|---|---|
| A0 | No search or drafting | A person performs everything |
| A1 | Search, summary, and drafting | A person decides and executes |
| A2 | Options with supporting evidence | A person selects and executes |
| A3 | Generates an execution plan | The system executes after human approval |
| A4 | Bounded automatic execution | Executes within policy, monitoring, and recovery boundaries |

Do not increase autonomy based only on model performance. Consider potential harm, detectability, reversibility, and accountability together.

## Approval and resumption

Persist approval with its target, arguments, and action scope. Before resuming, recheck changed data or plans and expired approval or credentials. Delegation to a subagent retains the same approval boundary.

Distinguish receipt of a cancellation request from actual stopping. Reconcile external changes already made, then recover or hand off. MCP Tasks cancellation also does not guarantee immediate stopping. [Official Tasks guide](https://modelcontextprotocol.io/extensions/tasks/overview) (moved to an official extension on 2026-07-28; checked 2026-10-26). See the state table in [Agent Systems](../technical-foundations/agent-systems.md#long-running-work-and-resumption).

## Key activities

1. Complete the [workflow execution rules template](../toolkit/execution-contract.md).
2. Assign evaluation criteria to each normal, edge, and failure case.
3. Define role-based permissions and approval expiry.
4. Record execution and outcome under the same identifier.
5. Define stop, retry, and recovery by failure type.
6. Define rule versions and compatibility policy.
7. Record model, API, SDK, prompt, tool, harness, context-policy, and evaluation-set versions.
8. Test policy outages, approval expiry, reconnection, and external results after cancellation.

## Deliverables

- Execution contract
- Evaluation data and adjudication criteria
- Role-based permission and approval matrix
- Audit-event schema
- Failure and recovery procedure
- Version and compatibility policy

## Exit criteria

- Both permitted and prohibited AI actions are explicit.
- Approvers know what evidence to inspect.
- Even executions recorded as successful are checked against the workflow outcome, and the review is recorded.
- The same external action cannot run twice unintentionally.
- Failures can be reproduced and recovered manually.
- Targets and authority are rechecked after approval waits or reconnection, preventing duplicate action.
- A policy-server outage does not authorize prohibited writes.
- Cancellation acknowledgment is distinguished from stopping, and partial success is reconciled.
- Completed-workflow counts and costs including failures, review, and rework use the same scope.

## Stop signals

- A prompt substitutes for the workflow contract.
- Approval is recorded without the basis for approval.
- The system can execute but cannot stop or reverse.
- Model, API, SDK, tool, harness, or context-policy changes reach production without evaluation.
