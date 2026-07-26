# Project 3. Sandbox Integration

## Goal

Connect to test systems and validate read, write, permissions, duplicates, partial failure, and recovery without affecting customers, money, or live data.

## Suggested setups

- Read customer state and add a note in a test CRM
- Change shipping state in a test order system
- Send an approved message in a collaboration sandbox
- Create and update tasks in a synthetic database

## Flow

```text
Approved request
→ permission, schema, and duplicate check
→ sandbox action
→ result confirmation
→ partial-success reconciliation
→ complete or human handoff
```

## Tasks

1. Separate test and production accounts, data, and secrets.
2. Separate read and write tools.
3. Define execution keys and state transitions.
4. Inject timeout, permission denial, partial success, duplicate request, and outage.
5. Classify failures into retry, handoff, and stop.
6. Restore prior state and execute manual fallback.
7. Have an operator diagnose from records without the implementer.

## By role

- Business practitioner: business meaning of partial success and manual priority
- AX Engineer: integration, state, deduplication, recovery
- Leader and governance: criteria for live production
- Data, security, operations: isolation, permission, records, incident drills

## Evidence

- Sandbox isolation explanation
- API, event, and state contract
- Role and service-account permission matrix
- Duplicate and partial-failure tests
- Logs, metrics, traces, or equivalent
- Rollback, fallback, and reconciliation
- Operating handoff

## Exit criteria

- Test requests cannot reach production.
- Repeated execution keys do not duplicate side effects.
- Partial success is visible and reconcilable.
- Retry and stop conditions differ.
- A non-implementer diagnoses and recovers a representative incident.

## Stop conditions

- Test and production boundaries are unclear.
- Action is marked successful without result confirmation.
- Rollback overwrites valid changes.
- Missing and duplicate actions cannot be found from records.

## Before moving on

Have workflow owners and users agreed on scope, SLOs, incidents, and the old procedure? Then consider a [Production Pilot](04-production-pilot.md).
