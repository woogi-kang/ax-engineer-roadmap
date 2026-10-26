# Project 2. Human-Approved Workflow

## Goal

Create a flow where AI proposes a workflow change and an authorized person approves, edits, rejects, or requests information after seeing evidence and before-and-after state. Evaluate approval quality, not just an approval button.

## Suggested workflows

- Customer-response draft approval
- Inventory or purchase-change recommendation
- Campaign-setting change recommendation
- Document classification and follow-up assignment
- Settlement-exception recommendation

At this stage, record approval decisions as simulated actions. Test system writes in P3's isolated environment; production changes require the organizational P4 conditions and approval.

## Flow

```text
Workflow input
→ proposal and evidence
→ policy and schema check
→ approver reviews before, after, and impact
→ approve, edit, reject, or request information
→ decision and reason recorded
→ simulated action or handoff
```

## Tasks

1. Define workflow impact and approval authority.
2. Show source, proposal, before and after, evidence, and risk together.
3. Define `approve`, `approve after edit`, `reject`, and `need more information`.
4. Test approver absence, unauthorized approval, stale data, and duplicate requests.
5. Correlate proposal, approval, correction, and reason.
6. Measure approval wait and correction burden.
7. Have the approver process representative cases without explanation.

## Test while approval is pending

Bind approval to the request content and version. Do not reuse an approval unchanged after its proposal, source data, or authority changes. These tests may use simulated execution.

| Situation | Expected behavior | Evidence |
|---|---|---|
| Close the interface and reconnect while waiting | Restore the saved request and approval state; reconnecting is not approval | Stable request ID and restored state |
| Replace the approver or revoke authority | Recheck authority immediately before execution and hold if it is absent | Revocation time, authorization decision, and hold reason |
| Change the proposal, source data, or policy | Show the change and request any required new approval | Approved version and change comparison |
| Deliver duplicate approval or execution requests | Do not create another action from the same approval | Duplicate requests linked to the first decision |
| Cancel the request or let approval expire | Close the pending request and prevent later execution | Cancellation or expiry state and blocked action |

Separate active review time from time spent waiting for an approver. Use recurring hold reasons to decide whether proposal quality, ownership, or the authorization process needs repair. Do not advance if these tests expose an approval bypass.

## By role

- Business practitioner: approval criteria, exceptions, workflow impact
- AX Engineer: policy, approval state, audit events
- Leader and governance: delegation, backup approver, stop authority
- Data, security, operations: access, retention, approval records

## Evidence

- Responsibility and approval matrix
- Approval state, input, and output contract
- Accepted, rejected, and insufficient-information cases
- Before-and-after evidence
- Approval, edit, and rejection log
- Approval wait and correction burden
- Approval-bypass tests

## Exit criteria

- The approver can see what changes and its impact.
- Unauthorized people and expired requests cannot approve.
- Corrections and rejections feed future evaluation.
- Records reconstruct who allowed what.
- Approval is required even for a simulated action, and no real system is changed at this stage.

## Stop conditions

- Approvers see output without evidence.
- Approval state and action state diverge.
- Stale input appears current.
- Approval bypass cannot be detected.

## Before moving on

Can partial or duplicate execution be recovered? If yes, move to [Sandbox Integration](03-sandbox-integration.md).
