# AX Use-Case Scorecard

## Scoring

Score each item from `1 to 5`. Do not decide from the total alone. Hold a candidate if risk, data, or recoverability falls below a mandatory threshold.

| Criterion | 1 point | 3 points | 5 points | Weight |
|---|---|---|---|---:|
| Workflow value | Convenience | Team productivity or quality | Core cost, revenue, or risk | 3 |
| Frequency | Rare | Weekly or monthly | Daily or continuous | 2 |
| Problem evidence | Opinion only | Some records | Baseline and recurring evidence | 3 |
| Data readiness | Access and definitions unknown | Requires some preparation | Owner, contract, and access confirmed | 3 |
| Evaluability | Hard to adjudicate | Human review possible | Repeatable evaluation set possible | 3 |
| Recoverability | Hard to reverse | Manual correction possible | Immediate stop and recovery possible | 3 |
| Integration difficulty | Core-system change | Some integration required | Can begin with read or propose | 2 |
| Adoption readiness | No accountable owner | Bounded users | Owner, users, and operators confirmed | 3 |
| Reuse potential | One-off | Similar workflows exist | Shared pattern across workflows | 1 |

## Candidate comparison

| Candidate | Value | Frequency | Evidence | Data | Evaluation | Recovery | Integration | Adoption | Reuse | Weighted total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| A |  |  |  |  |  |  |  |  |  |  |
| B |  |  |  |  |  |  |  |  |  |  |
| C |  |  |  |  |  |  |  |  |  |  |

## Cost and workflow outcomes

For each candidate, record workflow volume and costs for the same period. Include review, rework, incident response, licenses, and integration as well as model usage. Record the allocation basis for one-time implementation costs. For unknown items, distinguish estimates and name the person who will verify them.

| Candidate | Completed workflows that passed review | Total cost | Cost per completed workflow | Manual baseline | Unknowns and owner |
|---|---:|---:|---:|---|---|
| A |  |  |  |  |  |
| B |  |  |  |  |  |
| C |  |  |  |  |  |

Count unique completions confirmed by the source system and reviewer. Include failures and retries in total cost. Do not calculate a unit cost when there are zero completions. Record the formula and before-and-after comparison in the [experiment card](experiment-card.md).

## Mandatory gates

- [ ] The process owner and users are confirmed.
- [ ] The current state can be measured or observed.
- [ ] A data owner and access path exist.
- [ ] High-risk actions can be excluded from the initial scope.
- [ ] Failures can be detected and handled manually.
- [ ] Reviewers and operators are named, and correction and rework burden can be measured.
- [ ] Cost limits and stop conditions for quality, authority, and recovery are agreed.
- [ ] A thin end-to-end slice can be built within two to four weeks.

## Decision

| Field | Content |
|---|---|
| Selected candidate |  |
| Selection reason |  |
| Hold or rejection reasons |  |
| Initial scope |  |
| Non-goals |  |
| Revisit condition |  |
