# 5. Execution Rules and Controls

## Purpose

Define the input, output, evaluation, permission, approval, record, and recovery rules for an AI-enabled workflow in one place. This repository calls the resulting document an `execution contract`.

## Minimum execution rules

| Area | What to define |
|---|---|
| Purpose | Whose workflow outcome changes, and how |
| Input | Required fields, provenance, freshness, and missing-data handling |
| Output | Schema, format, quality criteria, and evidence |
| Evaluation | Normal, edge, and failure cases with adjudication criteria |
| Permissions | Allowed read, propose, create, change, and external-send actions |
| Approval | Approver, approval conditions, expiry, and delegation |
| Records | Execution, model, prompt, tool, and result versions |
| Recovery | Stop, retry, reversal, and manual handling |
| Cost | Per-run and period limits, plus over-limit behavior |
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

## Key activities

1. Complete the [workflow execution rules template](../toolkit/execution-contract.md).
2. Connect normal, edge, and failure evaluation cases.
3. Define role-based permissions and approval expiry.
4. Record execution and outcome under the same identifier.
5. Define stop, retry, and recovery by failure type.
6. Define rule versions and compatibility policy.

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
- Successful execution is still connected to outcome review.
- The same external action cannot run twice unintentionally.
- Failures can be reproduced and recovered manually.

## Stop signals

- A prompt substitutes for the workflow contract.
- Approval is recorded without the basis for approval.
- The system can execute but cannot stop or reverse.
- Model or tool changes reach production without evaluation.
