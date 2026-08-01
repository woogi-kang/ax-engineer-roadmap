# Case: From evidence packets to a source-linked regulated document draft

<!-- case-boundary:start -->
## Current scope and designed target

| Scope | Write impact | Autonomy | P stages |
|---|---|---|---|
| Current public artifact | No external write | A0 | None |
| Designed target | Draft only | A1-A2 | P1, P2, P3 |

Current values cover only what this repository can reproduce. The designed target is not yet an implemented scope or evidence of organizational outcomes.
<!-- case-boundary:end -->

This simulation reads synthetic contract, research, and product material and drafts a regulated document whose statements link to sources and separate facts from assumptions. It is not legal advice, a regulatory submission, or a clinical or product decision.

## 1. Current evidence and classification

- Evidence: `simulation-design`
- Domain / industry: data and operations / legal and life sciences
- Risk / designed autonomy: high / A1–A2
- Designed practice: P1–P3, document draft only
- Public design inputs: [G09 and G14](../../research/public-case-application-map.md)

## 2. Problem and target flow

Specialists structure clauses, facts, assumptions, omissions, and conflicts from large evidence sets. One wrong source, jurisdiction, or version can distort a legal or regulatory judgment.

```text
Receive a synthetic evidence packet
→ verify document permission, version, jurisdiction, and validity
→ extract facts, quotations, assumptions, conflicts, and omissions
→ select the valid template and rule version
→ draft with sentence-level provenance and uncertainty
→ legal, clinical, product, or other domain review
→ resolve conflicts and freeze the approved version
→ save only the draft and audit record to a sandbox
```

## 3. Source systems and controls

| Source | Control |
|---|---|
| Document vault | Exclude retired and unauthorized material. |
| Citation index | Link material statements to page, paragraph, table, and source hash. |
| Template and rule registry | Match document type, jurisdiction, and effective date. |
| Approval ledger | Any section change invalidates approval for that version. |

AI may extract, compare, cite, and draft. Domain owners make legal interpretations, safety and efficacy judgments, submission strategy, and final sign-off. External submission, delivery, and electronic signature are excluded.

## 4. Practice and evaluation

| Stage | Exercise | Exit criterion |
|---|---|---|
| P1 | Extract facts, assumptions, conflicts, and citations | 100% provenance for material statements; zero retired-version citations |
| P2 | Domain edits, approval, and rejection | Zero unresolved-conflict approvals; reapproval after changes |
| P3 | Save approved draft and audit state | Approved and stored versions match; duplicate and partial failures recover |

Measure citation correctness, fact-assumption confusion, omission and conflict detection, domain correction burden, approval invalidation, and audit reproduction time.

## 5. Failures, outputs, and limits

Inject a highly relevant retired study, conflicting values, source mutation after citation, and partial save. Reject obsolete evidence, request an owner decision, invalidate affected approval, and reconcile before retry.

Outputs are synthetic packets, document and citation contracts, fact-assumption-conflict tables, domain review, approved drafts, and recovery records. No legal quality, submission acceptance, development-speed, or compliance outcome is claimed.

## 6. Next decision

Before a runnable public simulation, pass an independent citation review, jurisdiction and template-version evaluation, confidential-material isolation check, and a full withdrawal and reapproval drill.
