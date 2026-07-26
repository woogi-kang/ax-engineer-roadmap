# Project 4. Production Pilot

## Goal

In an organization, run a low-risk workflow with limited users. In a public simulation, reproduce production conditions and incidents without claiming live adoption or organizational impact.

## Entry conditions

- Workflow, data, deployment, and stop owners are known.
- Baseline and success and stop conditions exist.
- Evaluation, approval, permissions, records, recovery, and fallback passed sandbox tests.
- Privacy, security, and legal applicability were checked by responsible roles.
- Real users agreed on parallel operation and SOP.

Return to a previous project if any condition is missing.

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
2. Increase users and volume gradually.
3. Observe quality, latency, cost, incidents, approval wait, and corrections.
4. Have real users perform acceptance and exceptions.
5. Drill action shutdown, rollback, and manual fallback.
6. Operate the new SOP, support, training, and handoff.
7. Decide expand, maintain, modify, or stop.
8. Record whether the old procedure remains or retires.

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
- Real users complete normal and exceptional cases.
- Incidents preserve workflow continuity and allow reconciliation.
- Operations do not depend on the implementer.
- The next decision follows prior criteria and evidence.

## Public simulation alternative

Publish:

- Assumptions and simulated roles
- Synthetic load and incident scope
- Independent review replacing live UAT
- Unverified adoption, security, legal, and organizational conditions
- Why no production impact is claimed

## Stop conditions

- A severe prohibited result or permission anomaly occurs.
- Baseline comparison becomes impossible.
- Manual fallback cannot handle the workload.
- Corrections or support exceed the threshold.
- The pilot continues without an operating owner.

## Before moving on

Do not guess which parts are reusable. Test them in [Second-Workflow Reuse](05-second-workflow-reuse.md).
