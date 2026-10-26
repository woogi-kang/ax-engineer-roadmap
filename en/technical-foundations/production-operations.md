# Production Operations and Observability

## Why it matters

A prototype demonstrates successful runs. Operations must detect failed runs, identify impact, and keep work moving. Observe model quality, system reliability, cost, approval wait, and correction burden together.

## What to know

- Logs, metrics, and traces
- Workflow and run identifiers
- SLIs, SLOs, and error budgets
- Quality, latency, and cost limits
- Alerts and ownership
- Deployment, feature disablement, and rollback
- Retries, queues, partial success, and reconciliation
- Incident response, postmortem, and manual fallback

## How to decide

### What to record

Prefer structured diagnostic fields over complete conversation storage:

```text
Workflow and run identifier
User and service role
Input reference and data version
Model, API, SDK, prompt, tool, harness, and context-policy versions
Policy decision and approval
External action result
Error, retry, stop, and recovery
Cost and latency
```

Minimize personal and confidential data and define retention and access.

Connect the workflow ID to parent runs, subagents, tool calls, and external job IDs. Deduplicate redelivered records and flag missing links. Claude's OpenTelemetry export entered beta on 2026-10-14 and defaults to metadata-only collection. Check release status and the chosen provider's collection and retention terms separately. [Official guide](https://platform.claude.com/docs/en/manage-claude/opentelemetry), [release record](https://platform.claude.com/docs/en/release-notes/overview) (checked 2026-10-26).

### Total cost per completed workflow

Define the comparison period and workflow scope, then calculate:

```text
Total cost per accepted completed workflow
= total cost for the scope / accepted completed workflows, excluding duplicates
```

Include model, tool, infrastructure, failed-attempt, and retry costs; human review, rework, and operations; and fixed costs allocated to the same period and scope. Record labor rates and the fixed-cost allocation method. Disclose time not yet converted to cost and any excluded items separately.

Do not add failed-attempt or retry costs again if they are already included in usage charges. Record what each cost category includes to check for omissions and double counting.

The denominator is not API calls or drafts. If no workflow passes acceptance, report `N/A` and defer cost-efficiency conclusions. Compare the same workflow scope and acceptance criteria and disclose missing costs.

### Automatic retry

Retry automatically only when failure is transient and side-effect-free or deduplication is guaranteed. Reconcile action status before retrying money, messaging, or order changes.

### Stopping

Reduce or stop automation on prohibited outcomes, permission anomalies, quality degradation, cost-limit breaches, and source-system inconsistency. Define stop authority and user communication before deployment.

## Practice

1. Trace one run across service boundaries.
2. Measure quality, cost, latency, errors, and approval wait.
3. Inject API failure, model failure, stale data, and permission denial.
4. Trigger an alert and disable automation.
5. Switch to a prior version or manual workflow.
6. Reconcile missing and duplicate results.
7. Have an operator perform the procedure without the implementer.
8. Reproduce approval waits, reconnection, cancellation requests, and late tool results, then reconcile external state.
9. Calculate total cost per accepted completed workflow for the same scope. Check the effect of duplicate records and failed attempts on the calculation.

## Evidence

- Observability fields and retention policy
- Dashboard or status report
- Workflow-to-child-run and external-result mapping, cost numerator, denominator, and allocation basis
- SLO and alert thresholds
- Failure, stop, and recovery drill
- Manual fallback and reconciliation
- Incident review and prevention decision
- Operating handoff

## Failure patterns

- Treating full conversation storage as audit and observability
- Monitoring only model errors
- Alerts without an owner and recovery procedure
- A rollback document that has never been executed
- Retrying already successful external actions

## Collaborators

- Workflow owner: business impact and manual priority
- Privacy and security: recording, retention, and access
- System owner: incident and reconciliation
- Leader: SLO, cost cap, and stop authority

## Sources

- [`PRIMARY_OFFICIAL` OpenTelemetry concepts](https://opentelemetry.io/docs/concepts/) — verified 2026-07-26
- [`PRIMARY_OFFICIAL` OpenTelemetry signals](https://opentelemetry.io/docs/concepts/signals/) — verified 2026-07-26
- [`PRIMARY_REPOSITORY` AI Agents logging and tracing content](https://github.com/nilbuild/developer-roadmap/tree/master/roadmaps/ai-agents/content)
