# Case: From sales evidence to electronic tax invoice and payment reconciliation

<!-- case-boundary:start -->
## Current scope and designed target

| Scope | Write impact | Autonomy | P stages |
|---|---|---|---|
| Current public artifact | No external write | A0 | None |
| Designed target | Approved sandbox write | A1-A3 | P1, P2, P3, P4 |

Current values cover only what this repository can reproduce. The designed target is not yet an implemented scope or evidence of organizational outcomes.
<!-- case-boundary:end -->

> Public-case link: K03's separation of generative recommendation and deterministic rules informs tax-rule, approval, and issuance controls in the [application map](../../research/public-case-application-map.md).

Electronic tax invoice work does not end when one document is created. Contract, order, acceptance, and accounting state must be checked; an accountable person must approve issuance; and issuance, transmission, and payment results must be reconciled. This case practices that full flow with synthetic data and test systems.

## 1. Case type and current evidence

- Type: workflow
- Domain: finance and procurement
- Current stage: simulation design
- Designed practice path: P1–P4
- Designed external impact: sandbox issuance only after accountable approval

The case does not issue, correct, cancel, or transmit a real tax invoice. Taxability, exemption, document date, correction reason, and filing treatment remain decisions for an accountable tax professional.

## 2. Problem and users

| Item | Description |
|---|---|
| Trigger | Contract billing condition met, delivery or acceptance completed, accounting issuance request |
| Primary users | Sales operations, finance and accounting, tax owner, accounts receivable |
| Owners | Sales and operations own transaction evidence; finance and tax own issuance and accounting; AR owns collection status |
| Common problems | Amount or supply-date mismatch, duplicate issuance, incorrect customer information, missing result, unreconciled payment |
| Failure impact | Incorrect evidence, correction work, inconsistent accounting state, delayed collection |

## 3. Target flow

```text
Collect contract, order, and acceptance evidence
→ check customer, supply date, amounts, tax, and duplicates
→ create an evidence-linked issuance draft
→ obtain finance or tax approval
→ send an issuance request to a provider sandbox
→ reconcile issuance and transmission results with ERP state
→ reconcile bank receipts with receivables
→ route mismatches, missing payments, and partial failures to review
```

## 4. Authoritative information by system

| System | Authoritative information | Boundary |
|---|---|---|
| Contract, order, acceptance | Evidence for the transaction and billing condition | Does not autonomously decide tax treatment |
| ERP or accounting | Sales, receivable, and accounting state | Does not replace the issuance result |
| Provider and result store | Issuance request and actual processing result | A timeout is not proof of failure |
| Bank statement | Payment state | Similar amounts are not automatically the same receivable |
| Slack or email | Approval request and notification | Not authoritative for transaction, issuance, or payment |

Korea's National Tax Service describes electronic tax invoice issuance through Hometax and publishes rules for registered system providers. This case recommends no provider; verify current rules and provider documentation before a real integration. ([NTS business authentication notice](https://s.nts.go.kr/yeoksam/na/ntt/selectNttInfo.do?mi=5913&nttSn=1352014), [NTS system-provider notice](https://s.nts.go.kr/nts/na/ntt/selectNttInfo.do?mi=2205&nttSn=1351085), checked 2026-07-31)

## 5. Execution rules

Every candidate carries `transaction_id`, `customer_id`, `evidence_version`, `supply_date`, `supply_amount`, `tax_amount`, and `issue_key`.

- Reuse of an `issue_key` retrieves the earlier request and result instead of creating a new issuance.
- A changed amount, date, customer, or evidence version invalidates the earlier approval.
- AI may flag missing data and prepare a draft; it does not decide taxability, exemption, or a correction reason.
- Issuance, correction, cancellation, filing, and payment never run without accountable approval.
- Payment matching uses payer, date, reference, and tolerance, not amount alone.

## 6. P1–P4 practice path

| Stage | Practice | Exit criterion |
|---|---|---|
| P1 | Find issuance candidates and errors in synthetic transactions | Pass duplicate, amount, date, and customer evaluations |
| P2 | Show evidence, draft, and before-and-after state | Record edits, rejection reasons, and approval |
| P3 | Integrate provider and ERP sandboxes | Test duplicate requests, timeout, partial failure, and status lookup |
| P4 | Plan a bounded production pilot | Prepare tax-owner approval, manual issuance, stop, and recovery criteria |

## 7. Failure injection and recovery

| Injected failure | What to verify | Recovery |
|---|---|---|
| Duplicate transaction arrives | Block a second issuance with `issue_key` | Link the existing request and result |
| Amount changes after approval | Invalidate stale approval | Review the new version |
| Provider response times out | Query actual state before retry | Retry only if no request was processed |
| Issuance succeeds but ERP update fails | Preserve partial success | Create an ERP correction queue from the issuance result |
| One payment resembles several receivables | Stop automatic matching | Route to AR review |

## 8. Deliverables and limits

Public deliverables are synthetic contract, sales, receivable, and bank data; issuance drafts; approval rules; deduplication tests; and partial-failure recovery records.

This design is not tax advice or a filing procedure. Current law, company tax status, issuance obligations, corrections, retention, and filing treatment require accountable review. No operating outcome has been verified.

## 9. Reuse decision

Transaction identifiers, evidence versions, approval invalidation, idempotent issue keys, provider-result lookup, and receivable matching can be tested in other billing workflows. Share only what a second transaction workflow actually reuses.
