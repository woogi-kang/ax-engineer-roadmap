# Case: From corporate-card evidence to an approvable journal-entry draft

Collecting card transactions and receipts is relatively easy to automate. The harder work is deciding which evidence is missing, which expense conflicts with company policy, and who confirms the account and cost allocation.

## 1. Case type and current evidence

- Type: workflow
- Domain: finance and procurement
- Current stage: simulation design
- Practice path: P1–P3
- External impact: draft journal entries only

The case uses synthetic transactions and receipts. It does not post entries to a live accounting system or decide tax treatment.

## 2. Problem and users

| Item | Description |
|---|---|
| Trigger | Card transaction received, personal expense submitted, receipt uploaded |
| Primary users | Spender, team approver, finance and accounting |
| Owners | The spender owns purpose; the team owner approves budget and policy; finance confirms account and accounting treatment |
| Common problems | Missing evidence, amount mismatch, duplicate submission, incorrect cost allocation, corrections concentrated near close |
| Failure impact | Incorrect entries, finance rework, delayed close, broken audit trail |

## 3. Target flow

```text
Collect card transactions and expense requests
→ match receipts to candidate transactions
→ flag missing evidence, duplicates, and amount differences
→ check policy and budget with visible evidence
→ request clarification from the spender
→ obtain team approval
→ let finance confirm account and treatment
→ produce a sandbox journal-entry draft and audit record
```

## 4. Data and authoritative sources

| Information | Source | Quality checks |
|---|---|---|
| Card transaction | Card export or expense SaaS | Authorization, cancellation, partial cancellation, currency, merchant |
| Receipt and evidence | Evidence store | Amount, date, business identifier, original link |
| Purpose and allocation | Expense request | Project, team, attendees, explanation |
| Company policy | Approved policy document | Version, effective date, exception approver |
| Entry state | Accounting sandbox | Separate draft, approved, and posted states |

## 5. Control boundary

- AI extracts fields, proposes matches, and flags missing evidence and policy exceptions.
- A case not covered by policy goes to finance review instead of being guessed.
- An accountable person confirms the account, deductibility, and expense eligibility.
- Transaction and document identifiers prevent one receipt or card charge from funding two entries.
- Preserve original evidence, extracted values, human corrections, and final approved values separately.

## 6. P1–P3 practice path

| Stage | Practice | Exit criterion |
|---|---|---|
| P1 | Extract fields and match synthetic receipts | Pass missing, duplicate, cancellation, and foreign-currency tests |
| P2 | Run spender clarification and team and finance approval | Measure correction effort and approval reasons |
| P3 | Create accounting-sandbox drafts | Preserve provenance and test duplicate prevention and recovery |

## 7. Failure injection and recovery

| Injected failure | What to verify | Recovery |
|---|---|---|
| Receipt and card amounts differ | Block automatic completion | Ask the spender for clarification |
| A cancellation arrives late | Find and update the earlier draft | Cancel before posting or send to finance review |
| The same receipt is submitted twice | Detect document and transaction duplicates | Keep one record and link the duplicate |
| Policy changes | Use version and effective date | Re-evaluate under the policy that applied |
| Sandbox write fails | Avoid creating another draft | Check existing state before retry |

## 8. Deliverables and limits

Deliverables are synthetic transactions and receipts, extraction and matching evaluations, a policy-exception queue, approval records, entry drafts, and recovery records.

Expense policy and accounting and tax treatment differ by organization. The case does not prescribe a correct account or deduction rule and makes no claim about close time or expense leakage.

## 9. Reuse decision

Evidence provenance, duplicate prevention, policy versioning, and approval correction history are reuse candidates for tax invoice and vendor onboarding workflows. Share only contracts actually reused in a second finance workflow.
