# Project 2. Human-Approved Workflow

## Goal

Create a flow where AI proposes a workflow change and an authorized person approves, edits, rejects, or requests information after seeing evidence and before-and-after state. Evaluate approval quality, not just an approval button.

## Suggested workflows

- Customer-response draft approval
- Inventory or purchase-change recommendation
- Campaign-setting change recommendation
- Document classification and follow-up assignment
- Settlement-exception recommendation

Actual execution is optional. Approved actions can remain simulated records.

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

## By role

- Business practitioner: approval criteria, exceptions, workflow impact
- AX Builder: policy, approval state, audit events
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
- No live action occurs without approval.

## Stop conditions

- Approvers see output without evidence.
- Approval state and action state diverge.
- Stale input appears current.
- Approval bypass cannot be detected.

## Before moving on

Can partial or duplicate execution be recovered? If yes, move to [Sandbox Integration](03-sandbox-integration.md).
