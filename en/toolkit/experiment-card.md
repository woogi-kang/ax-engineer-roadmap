# Experiment Card

## Basic information

| Field | Content |
|---|---|
| Experiment name |  |
| Period |  |
| Owner |  |
| Related workflow |  |
| Related workflow execution rules |  |
| Current state | planned / running / complete / stopped |

## Hypothesis

> If [target users] use [new flow], [observable change] will occur relative to [baseline].

## Falsification condition

The hypothesis is considered false when:

-

## Scope

### Included

-

### Excluded

-

## Baseline and metrics

| Metric | Baseline | Target or adjudication threshold | Measurement method |
|---|---:|---:|---|
|  |  |  |  |

Separate model and system metrics from workflow-outcome metrics.

## Cost per completed workflow

Add the following costs for the same period and workflow scope. Separate estimates from actual spending. Record the allocation period and method for one-time implementation costs.

| Cost item | Amount or time | Unit rate or allocation basis | Estimated/measured |
|---|---:|---|---|
| Model and tool usage, including failures and retries |  |  |  |
| Review, corrections, and rework |  |  |  |
| Incident response, manual fallback, and operations |  |  |  |
| Licenses, infrastructure, and implementation costs allocated to the period |  |  |  |

`Cost per completed workflow = total cost for the period / unique completed workflows that passed review`

Do not use the number of model completion messages as the denominator. Confirm completion through the source system and the designated reviewer. If no workflow passes review, report unit cost as `N/A` and retain total spending and failure costs. Measure the manual baseline over the same scope. Track time savings and revenue effects separately.

## Before-and-after evaluation

| Comparison | Before | After | Acceptance criterion and evidence |
|---|---|---|---|
| Model, API, and SDK versions |  |  |  |
| Prompt, tool schema, and runtime |  |  |  |
| Context selection, compaction, and memory policy |  |  |  |
| Repeated runs on the same evaluation set |  |  |  |
| Preserved approvals and prohibitions, and actual system outcomes |  |  |  |
| Cost, latency, review time, and rework time |  |  |  |

Record the evaluation-set and adjudication-rule versions as well. If the criteria change, retain a separate comparison using the prior criteria. Distinguish initial-state restoration for independent trials from retained state for duplicate and reconnection tests, following the [evaluation criteria](../technical-foundations/evaluation-and-testing.md#final-state-and-repeated-runs). Define the rollback version and stop conditions before deployment.

## Execution

| Date | Change | Reason | Version | Result |
|---|---|---|---|---|
|  |  |  |  |  |

## Failures and exceptions

| Case | Expected | Actual | Impact | Handling | Prevention |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## User acceptance

| User role | Workflow performed | Success or failure | Correction or inquiry | Observation |
|---|---|---|---|---|
|  |  |  |  |  |

Managers review objectives and investment decisions, users review correction burden and exceptions, and operators review incident handling and handoff. Name the reviewers for each role and record their results separately when they differ. Simulations without actual users identify the assumed roles and review limitations.

## Decision

- [ ] Scale
- [ ] Improve and rerun
- [ ] Maintain current scope
- [ ] Stop

Decision rationale:

Record scale and stop conditions separately. Lower costs do not justify expansion when quality, authority, or recovery criteria fail. Link each policy exception to its approver, rationale, expiration date, and follow-up action.

Next review date:
