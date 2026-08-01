# Case: From equipment anomaly signals to a reviewable maintenance proposal

<!-- case-boundary:start -->
## Current scope and designed target

| Scope | Write impact | Autonomy | P stages |
|---|---|---|---|
| Current public artifact | No external write | A0 | None |
| Designed target | Approved sandbox write | A1-A3 | P1, P2, P3, P4 |

Current values cover only what this repository can reproduce. The designed target is not yet an implemented scope or evidence of organizational outcomes.
<!-- case-boundary:end -->

This manufacturing simulation finds anomaly candidates in synthetic sensor streams and links them to equipment history and safety procedures before drafting a maintenance ticket. AI never starts, stops, controls, or changes physical equipment or safety interlocks.

## 1. Current evidence and classification

- Evidence: `simulation-design`
- Domain / industry: data and operations / manufacturing
- Risk / designed autonomy: high / A1–A3
- Designed practice: P1–P4, approved CMMS sandbox proposal
- Public design inputs: [K06, K07, G03, and G04](../../research/public-case-application-map.md)

## 2. Problem and target flow

Low thresholds create alert fatigue; high thresholds miss failure. Maintenance staff need current operating context and safety procedures before acting.

```text
Receive synthetic sensor events
→ verify sensor health, time, unit, and equipment ID
→ compare baseline, recent work, and operating state
→ show anomaly evidence and uncertainty
→ retrieve safety procedure, planned stop, and part state
→ maintainer investigates, holds, rejects, or approves a ticket draft
→ write only an approved proposal to a CMMS sandbox
→ reconcile ticket state with later sensor events
```

## 3. Source systems and controls

| Source | Control |
|---|---|
| Historian | Distinguish sensor failure from equipment failure. |
| Equipment registry | Do not apply another asset's baseline. |
| CMMS | Detect open work and prevent duplicate tickets. |
| Safety procedures | Existing permits, isolation, and emergency controls remain authoritative. |

The existing safety layer handles emergency thresholds. AI only proposes evidence and investigation order. Missing sensor quality, asset identity, or baseline blocks a failure claim.

## 4. Practice and evaluation

| Stage | Exercise | Exit criterion |
|---|---|---|
| P1 | Classify normal, anomaly, and sensor-fault streams | Distinguish sensor fault and cite the time window |
| P2 | Maintainer investigation and approval | Zero automatic dangerous-work approvals |
| P3 | Write a CMMS sandbox draft | Zero duplicates; state refresh and partial-failure recovery |
| P4 | Plan one-equipment-family pilot | Miss and false-alert stop thresholds and manual fallback ready |

Measure miss cost, review time per alert, duplicate work, sensor-fault separation, planned-stop conflict, and recovery time.

## 5. Failures, outputs, and limits

Inject a frozen sensor, an anomaly during open maintenance, operating-state change during approval, and CMMS timeout. Separate sensor work, merge only by maintainer decision, invalidate stale approval, and query idempotency before retry.

Outputs are synthetic streams, data contracts, anomaly evidence, approvals, sandbox tickets, and recovery records. No downtime, yield, failure-rate, or maintenance-cost improvement is claimed.

## 6. Next decision

Before a runnable public simulation, an equipment specialist must review the synthetic incidents and thresholds and confirm that the existing non-model alarms and manual maintenance procedure remain fully available.
