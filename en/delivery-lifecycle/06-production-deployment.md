# 6. Production Deployment

## Purpose

Move a thin prototype into an operating system with authentication, permissions, observability, recovery, and cost controls.

## Key activities

1. Separate production and development environments, configuration, and secrets.
2. Implement authentication, authorization, and least privilege.
3. Implement input validation, deduplication, timeouts, and retries.
4. Connect logs, metrics, traces, and audit events.
5. Define alerts for quality, latency, error, and cost.
6. Exercise rollback and manual fallback paths.
7. Document deployment, incident, recovery, and operating procedures.
8. Test additional input, reconnection, and cancellation for long-running work, then verify final source-system state.
9. Reproduce credential expiry, revocation, and policy-server outages.
10. Calculate total cost per accepted completed workflow for the same scope.

## Minimum observability

- Workflow, parent-run, subagent, tool-call, and external-job identifiers
- User or system actor
- Input and output contract versions
- Model, API, SDK, prompt, tool, harness, and context-policy versions
- Start time, end time, and state
- Approval, execution, and recovery events
- Error type and retry count
- Latency, approval wait, review and rework time, and cost
- Cancellation request, confirmed stop, final source state, and reconciliation

Do not log sensitive source text and output by default. Design for both traceability and data minimization.

## Cost and change decisions

Use the [total-cost definition](../technical-foundations/production-operations.md#total-cost-per-completed-workflow). Include failures, retries, review, rework, operations, and fixed costs allocated to the period in the numerator. Count accepted completed workflows, excluding duplicates, in the denominator. If none completes, report `N/A` and defer efficiency conclusions.

Before and after deployment, compare final state, critical failures, and repeated outcomes on the same evaluation set and authority. An operator other than the implementer must be able to diagnose, stop, reconcile, and recover. Apply the [evaluation criteria](../technical-foundations/evaluation-and-testing.md#final-state-and-repeated-runs) and [operations exercises](../technical-foundations/production-operations.md#practice).

## Deliverables

- Deployed thin vertical slice
- CI/CD and environment configuration
- Operating dashboard or status report
- Runbook and incident procedure
- Rollback and recovery exercise record
- Completed-workflow counts, total cost, allocation method, and before/after comparison
- Reconnection, cancellation, revocation, and policy-outage tests

## Exit criteria

- Another developer can reproduce the deployment.
- Unauthorized users and system calls are blocked.
- Cause and impact are traceable with the same identifier.
- External-system outages are distinguishable from model failures.
- Rollback or manual fallback works in practice.
- Source results are reconciled for duplicates and omissions after reconnection or cancellation.
- Credential expiry, revocation, and policy-outage rules affect actual calls.
- A workflow ID locates child runs and external results without excessive sensitive-data storage.
- The cost numerator, completed-workflow denominator, and missing costs are explainable.

## Stop signals

- Production depends on a personal account or local environment.
- Incidents are detected only when a user reports them.
- Every error is retried automatically in the same way.
- There is no cost limit or stop criterion.
- Data and security owners have not confirmed operating boundaries.
