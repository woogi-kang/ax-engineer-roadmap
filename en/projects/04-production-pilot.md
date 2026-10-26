# Project 4. Production Pilot

## Goal

In an organization, run a low-risk workflow with limited users. In a public simulation, reproduce production conditions and incidents without claiming real workflow use or organizational impact.

## Entry conditions

Both settings require P1–P3 passing evidence, a baseline, and success/stop conditions. Evaluation, approvals, permissions, records, recovery, and fallback must be executed in a sandbox and checked by a reviewer other than the implementer. Address missing shared conditions in the earlier project.

| Item | Organization track | Public simulation |
|---|---|---|
| Accountability and approval | Actual workflow, data, deployment, and stop owners with target-specific approval | Named test operator and reviewer, with simulated decision scope recorded; this is not real organizational approval |
| Environment and data | Authorized bounded production environment and permitted data | Execution environment isolated from production, public/synthetic data, and synthetic traffic |
| Privacy, security, and legal review | Responsible owners verify actual applicability and conditions | Verify data and authority conditions for the test environment; leave real organizational applicability unverified |
| Users and procedures | Real users agree on parallel operation and SOP | An independent reviewer performs simulated user/operator roles and actually tests the assumed SOP and fallback |

Hold production deployment if organizational conditions are missing. Proceed only within a separately prepared public-simulation scope. Without an isolated execution environment or independent reviewer, retain design and self-check results and defer the pass decision.

## Bound the pilot

Specify:

- Users and organizational scope
- Included and excluded workflow types
- Data and source systems
- Read and write permissions
- Daily or weekly volume
- Model and tool budget
- Pilot duration
- Automatic versus approved action

## Tasks

1. Remeasure baseline and representative failures.
2. Increase users and volume gradually within the approved scope; simulations increase synthetic traffic.
3. Observe quality, latency, cost, incidents, approval wait, and corrections.
4. Have actual users perform representative work and exceptions in the organization track, or independent reviewers in simulated roles for the simulation.
5. Drill action shutdown, rollback, and manual fallback.
6. Operate the new SOP, support, training, and handoff in the organization track. In simulation, rehearse them with documentation and the test environment, recording unverified organizational conditions.
7. Decide expand, maintain, modify, or stop.
8. Record the old procedure's retention or retirement in the organization track, or assumed transition conditions in simulation.

## Required operational scenarios

Reproduce hazardous failures in an isolated validation environment. In an organizational pilot, exercise stop and recovery only within the approved scope.

| Situation | Pass criterion |
|---|---|
| Disconnect and reconnect | Restore pending and executing state and check the system of record for duplicate external changes |
| Cancel during execution | Block subsequent actions and verify actual cancellation or completion of in-flight work, beyond the interface label |
| Policy service outage | Do not permit changes requiring approval; record the hold, deadline, and owner handoff |
| Change a model, tool, or policy | Apply only versions that pass before-and-after regression evaluation and workflow review |
| Exceed quality or cost limits | Reduce scope or stop under the agreed criteria and switch to a prior version or manual procedure |

Do not immediately resume unfinished work when the policy service recovers. Check current permissions and request state, and obtain any required new approval. Rollback must account for prompt, tool, and policy versions as well as the model. Reconcile completed external actions with the system of record and compensate or hand them off separately.

## Cost per completed workflow and review by role

For the same measurement period, include failed and retried work when summing model and tool charges, review, rework, and operating costs, plus fixed costs allocated to that period. Divide by the number of accepted, completed workflow items, excluding duplicates. If no workflow item was completed, mark the metric as unavailable and report spend and failure causes separately.

Managers review workflow value and acceptable risk; actual users review quality and correction burden; operators review incident handling and handoff. Public simulations disclose the independent reviewer's simulated roles and do not report them as actual organizational decisions or outcomes. Record disagreements and who decided to expand, retain, revise, or stop, with the evidence used. Record each policy exception's reason, approver, expiry, and compensating measures, then reassess at expiry.

## Evidence

- Pilot scope and approval
- Pre-deployment baseline and evaluation
- Operating status and SLO
- UAT, corrections, and support
- Incident, stop, and recovery drill
- SOP and handoff
- Old-procedure decision
- Outcome, limits, and decision record

## Exit criteria

- Model quality and workflow outcome are explained separately.
- Actual users complete normal and exceptional cases in the organization track; independent reviewers do so in the public simulation.
- Incidents preserve workflow continuity and allow reconciliation.
- The organization track has an owner who accepted operating responsibility; in simulation, a non-implementer performs stop, recovery, and fallback using only the documentation.
- The team reviews the observed results against prior criteria before deciding to expand, maintain, modify, or stop.

## Public simulation alternative

Record `P4 simulation verified` only after meeting the shared tests and simulation entry/review criteria. Distinguish it from an organizational P4 pass or production experience, and publish:

- Assumptions and simulated roles
- Synthetic load and incident scope
- Independent review replacing live UAT
- Unverified production-use, security, legal, and organizational conditions
- Why no production impact is claimed

## Stop conditions

- A severe prohibited result or permission anomaly occurs.
- Baseline comparison becomes impossible.
- Manual fallback cannot handle the workload.
- Corrections or support exceed the threshold.
- The pilot continues without an operating owner.

## Before moving on

First verify an organizational P4 pass or a verified P4 simulation, with its remaining limitations. Then test reusable elements in [Second-Workflow Reuse](05-second-workflow-reuse.md). Documents alone or failed shared tests do not permit progression to P5 execution verification. Continuing from simulation to P5 does not establish organizational operating outcomes.
