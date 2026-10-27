# Case: Employee lifecycle account and access operations

<!-- case-boundary:start -->
## Current scope and designed target

| Scope | Write impact | Autonomy | Related P stages |
|---|---|---|---|
| Current public artifact | No external write | A0 | None |
| Designed target | Approved sandbox write | A1-A3 | P1, P2, P3, P4, P5 |

Current values cover only what this repository can reproduce. A current P label identifies a stage with implemented functionality, not completion of all its exit criteria. The designed target is not yet an implemented scope or evidence of organizational outcomes.
<!-- case-boundary:end -->

The published assets are design documentation and metadata. The problem and current workflow below are exercise assumptions; no input set, executable code, execution logs, or acceptance results are published for this case yet. Target flows, evaluations, and deliverables describe work still to implement and verify.

The case-specific P-stage tables supplement the [common project exit criteria](../../projects/README.md). They do not waive P1's minimum evaluation count or independent review, and a P4 plan or readiness document does not establish a passed production pilot.

> Public-case use: The [public case-to-practice table](../../research/public-case-application-map.md) applies G02's move from HR guidance to transfers and employment verification. This case practices task drafts and approval first, permits only approved account and access changes in a sandbox, and hands conflicts or high-risk requests to IT and security.

When an employee's status changes, accounts, permissions, devices, and initial work should change with it. This case goes beyond generating onboarding instructions. It prepares the required changes, allows only approved actions in test systems, and keeps cancellation and offboarding recoverable.

<!-- failure-cases:start -->
> Failure-case check: These records from the [public AX failure and stop cases](../../research/ax-failure-cases.md) are linked to this workflow. Check the items below before turning this design into practice, and use the [capstone design checklist](../../research/ax-failure-cases.md#checklist-for-capstone-design) for the rest.
>
> - FG12 Amazon (`STOPPED`): When past decisions are the training labels, add group-level outcome gaps as an evaluation metric and never use the ranking for automatic rejection.
<!-- failure-cases:end -->

## 1. Case type and current evidence

- Type: workflow
- Domain: people and collaboration
- Current stage: simulation design
- Practice path: P1–P5
- External impact: approved account and permission changes in sandboxes

A `ready` status means the document is ready for practice. It does not mean the workflow has provisioned or revoked live access or improved onboarding time or security outcomes.

## 2. Problem and users

| Item | Description |
|---|---|
| Trigger | Confirmed hire, role or department transfer, leave or return, confirmed departure |
| Primary users | People Ops, recruiters, managers, IT and security, new employees |
| Owners | People Ops owns employee status; managers and data owners own work access; IT and security execute account changes |
| Common problems | Missing requests, excessive access, accounts left after a canceled hire, delayed offboarding, unclear completion |
| Failure impact | Delayed work, sensitive-data exposure, wasted licenses, incomplete audit evidence |

## 3. Current and target flow

```text
Current
Send employee changes through email or chat
→ re-enter the same information in each system
→ process approvals and account creation separately
→ rely on memory to find missing work

Target
Receive a confirmed lifecycle event
→ verify identity, role, effective date, and version
→ draft required accounts, access, devices, and initial work
→ obtain manager, data-owner, and IT approval
→ apply approved changes idempotently in sandboxes
→ reconcile actual state and record completion
```

A canceled hire, role change, or revised departure date does not overwrite the earlier request. The workflow keeps the relationship between versions and prepares compensation or revocation for work that already ran.

## 4. Authoritative information by system

| System | Authoritative information | Decision it does not own |
|---|---|---|
| HRIS or recruiting system | Employee identifier, employment status, organization, start and end dates | Need for work access |
| Identity provider | Actual account, group, session, and MFA state | Employment status |
| Work SaaS | Workspace, project access, and licenses | Employment status |
| ITSM and MDM | Device and support-request state | Access approval |
| Slack or email | Approval requests and notifications | Employee source record |
| Audit store | Request, approval, action, and revocation events | Replacement for source systems |

## 5. Execution rules

Every request carries `employee_id`, `lifecycle_event`, `effective_at`, `role_version`, and `request_id`. Before action, the workflow checks whether the request already ran and whether employee state changed after the request was created.

- AI drafts work and flags missing or conflicting information.
- The manager approves work-role and project access.
- A data owner or security owner separately approves sensitive systems.
- IT applies only approved changes in sandboxes.
- Privileged administrator access and live production accounts are never granted automatically.

## 6. P1–P5 practice path

| Stage | Practice | Exit criterion |
|---|---|---|
| P1 | Draft work from synthetic employee events | Pass missing, duplicate, and role-conflict evaluations |
| P2 | Review before-and-after state by approver | Record approval, edits, rejection, and reasons |
| P3 | Provision and revoke in IdP and SaaS sandboxes | Test duplicates, partial failure, and canceled-hire recovery |
| P4 | Design a bounded low-privilege pilot | Prepare manual fallback, stop, and handoff criteria Planning gate only, not a complete P4 pass. |
| P5 | Reuse rules in a second access workflow | Separate reused contracts from new exceptions |

## 7. Evaluation and recovery

| Injected failure | What to verify | Recovery |
|---|---|---|
| Duplicate employee identity | Block action before identity resolution | Send to review and merge manually |
| Hire canceled just before start | Find created accounts and device requests | Disable accounts, cancel requests, revoke tokens |
| Role changes during approval | Block stale approval | Reapprove the new role version |
| Only some SaaS actions succeed | Expose partial success | Decide which successes remain and retry the rest |
| Offboarding revocation fails | Block high-risk access first | Revoke sessions and tokens, then follow the manual runbook |

Measure approval delay, correction effort, partial failures, residual access after departure, and recovery time rather than account count alone.

## 8. Deliverables and limits

Planned deliverables are synthetic lifecycle events, a role-access matrix, approval records, sandbox action logs, failure-injection results, and revocation-drill records.

The case has not connected to a live organization's accounts or devices. Roles, approvers, account structures, licenses, labor processes, and security controls must be confirmed locally.

## 9. Reuse decision

Employee-event schemas, approval matrices, idempotency keys, partial-failure states, and revocation procedures are reuse candidates. Promote them only after a second access workflow uses them successfully.
