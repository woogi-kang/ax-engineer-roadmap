# Case: Vendor onboarding and bank-account change with verifiable approval

<!-- case-boundary:start -->
## Current scope and designed target

| Scope | Write impact | Autonomy | P stages |
|---|---|---|---|
| Current public artifact | No external write | A0 | None |
| Designed target | Approved sandbox write | A1-A3 | P1, P2, P3, P4 |

Current values cover only what this repository can reproduce. The designed target is not yet an implemented scope or evidence of organizational outcomes.
<!-- case-boundary:end -->

> Public-case link: G11's sensitive-document extraction and expert-review pattern informs bank evidence and dual approval through the [application map](../../research/public-case-application-map.md).

Vendor and payment-account changes affect many future payments. This case focuses less on document extraction and more on separating requester, verifier, approver, and executor while keeping evidence and the actual master-data result traceable.

## 1. Case type and current evidence

- Type: workflow
- Domain: finance and procurement
- Current stage: simulation design
- Practice path: P1–P4
- External impact: vendor-master sandbox write after dual approval

The case does not verify a real bank-account owner or change a production ERP.

## 2. Problem and users

| Item | Description |
|---|---|
| Trigger | New vendor, business or tax-data change, payment-account change |
| Primary users | Procurement, business requester, finance, security and audit |
| Owners | Procurement and business own the need; finance verifies evidence and payment information; an authorized executor changes the master |
| Common problems | Change by email alone, invalid business number, unclear document version, same approver and executor, no post-change reconciliation |
| Failure impact | Misdirected payment, fraud, delayed payment, duplicate vendors, incomplete audit trail |

## 3. Target flow

```text
Receive registration or change request
→ confirm requester and business purpose
→ compare business data, documents, and existing master
→ re-verify account changes through an independent channel
→ obtain separate verification and approval
→ apply only approved fields in the ERP sandbox
→ reconcile before-and-after data with actual state
→ monitor high-risk payments for a bounded period
```

## 4. Data and authoritative sources

| Information | Source | Automation boundary |
|---|---|---|
| Business purpose and requester | Procurement request system | AI does not approve need or budget |
| Business-registration status | Official status service | Active status does not prove counterparty suitability |
| Vendor master | ERP or procurement system | Preserve before-and-after versions |
| Account evidence | Restricted evidence store | A document alone does not prove ownership |
| Approval and action | Independent audit store | Do not rely on ERP logs alone |

Korea's [National Tax Service business-registration validation and status API](https://www.data.go.kr/data/15081808/openapi.do) can contribute a registration-status check. It does not replace due diligence or bank-account ownership verification. (checked 2026-07-31)

## 5. Control boundary

- Do not create an account change from an email body alone.
- Separate requester, verifier, approver, and executor.
- Reconfirm an account change through a known independent contact or contractual channel.
- AI organizes fields and inconsistencies; it does not decide legitimacy or fraud.
- A changed document or account after approval invalidates that approval.
- Apply an additional hold or approval rule to high-value payments after a change.

## 6. P1–P4 practice path

| Stage | Practice | Exit criterion |
|---|---|---|
| P1 | Find missing and conflicting data in synthetic requests | Pass duplicate vendor, invalid identifier, and stale-document tests |
| P2 | Separate verification and approval queues | Block bypass and self-approval |
| P3 | Change the vendor-master sandbox | Test versioning, idempotent writes, and partial-failure recovery |
| P4 | Plan a bounded pilot | Prepare independent confirmation, payment hold, and manual handling |

## 7. Failure injection and recovery

| Injected failure | What to verify | Recovery |
|---|---|---|
| Business number matches an existing vendor | Block a duplicate | Review merge with the existing master |
| Account-change email is spoofed | Block action before independent confirmation | Reject and hand off to security |
| Account changes after approval | Invalidate the earlier approval | Run dual approval on the new version |
| Only some ERP fields change | Detect partial success | Restore the snapshot or correct manually |
| Action log says success but actual value differs | Read the source system again | Hold payment and correct the value |

## 8. Deliverables and limits

Public deliverables are synthetic vendor records, evidence, and change requests; a separation-of-duties matrix; mismatch evaluations; approval records; sandbox before-and-after data; and recovery-drill results.

The case does not verify real account ownership, credit, sanctions, contract suitability, fraud reduction, or payment accuracy.

## 9. Reuse decision

Master-data versions, independent confirmation, dual approval, post-change holds, and actual-state reconciliation can be tested for customer refunds or employee payroll-account changes.
