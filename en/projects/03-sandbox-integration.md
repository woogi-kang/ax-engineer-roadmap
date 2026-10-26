# Project 3. Sandbox Integration

## Goal

Integrate with test systems and validate read, write, permissions, duplicates, partial failure, and recovery without affecting customers, money, or live data.

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

## Test changing state and permissions

| Situation | Expected behavior | Evidence |
|---|---|---|
| Restart during approval wait or execution | Resume persisted state without repeating completed external actions | Run IDs and external action IDs before and after restart |
| Lose the response after an external action succeeds | Inspect the system of record before deciding whether to retry | Readback result and deduplication record |
| Succeed in only some actions | Separate succeeded, failed, and unstarted actions and decide how to handle the remainder | Per-step status and compensation or handoff record |
| Revoke service permissions after approval | Decide using current permissions and block remaining changes | Revocation and blocking timestamps |
| Request cancellation during execution | Block new actions and inspect actions already in flight | Cancellation request, in-flight work, and completion, compensation, or handoff results |

Do not label an external action as cancelled when it cannot be cancelled. Hand off its actual state and required follow-up. Passing requires an operator to read these records and recover from the same failure without help from the implementer.

## UI practice for workflows without an API

If an official API or MCP tool cannot perform the required action, record the selection rationale and owner-permitted scope in the [UI integration checklist](../toolkit/ui-integration-checklist.md). Use synthetic data in an existing test system. Without a test environment, review failure scenarios and decisions on paper and do not claim a verified integration.

1. Verify the test account, organization, target ID, and state before the change.
2. Freeze the content, recipients, target, permitted action, and request version, then link them to approval.
3. Act within that scope and verify persisted results and processing history in the source system.
4. Test login expiry, UI changes, incorrect targets, malicious instructions, duplicate submission, partial success, and reconnection from the checklist separately.
5. Exercise cancellation, recovery, and handoff, then have an operator other than the implementer review the masked evidence.

A successful click or completion message is insufficient for a pass. Hold when the target or result is uncertain, and stop automation at human-handled steps such as CAPTCHA, 2FA, or signatures. These are additional practice instructions; they do not establish implemented UI automation in any existing case.

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

- Test and production accounts are not separated.
- Action is marked successful without result confirmation.
- Rollback overwrites valid changes.
- Missing and duplicate actions cannot be found from records.

## Before moving on

After passing P3, consider an [organizational P4 pilot](04-production-pilot.md) if workflow owners and users have agreed on scope, SLOs, incidents, and the old procedure. Without organizational conditions, use the public-simulation requirements in that document. Without test-execution evidence, defer verification of the next stage and retain design work only.
