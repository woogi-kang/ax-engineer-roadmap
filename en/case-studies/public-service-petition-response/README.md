# Case: From public petitions to cited response drafts and reviewable clusters

<!-- case-boundary:start -->
## Current scope and designed target

| Scope | Write impact | Autonomy | P stages |
|---|---|---|---|
| Current public artifact | No external write | A0 | None |
| Designed target | Draft only | A1-A2 | P1, P2, P3 |

Current values cover only what this repository can reproduce. The designed target is not yet an implemented scope or evidence of organizational outcomes.
<!-- case-boundary:end -->

This simulation links synthetic petitions to statutes, policies, and precedent responses, then asks a caseworker to review both the draft and clusters of similar cases. AI never sends a public response or closes a case.

## 1. Current evidence and classification

- Evidence: `simulation-design`
- Domain / industry: customer and revenue / public sector
- Risk / designed autonomy: high / A1–A2
- Designed practice: P1–P3, draft only
- Public design inputs: [K01, K04, G12, and G15](../../research/public-case-application-map.md)

## 2. Problem and target flow

Caseworkers separately search the petition, jurisdiction, law, policy, and precedent. Incorrect clustering can hide location, period, or remedy differences.

```text
Receive a synthetic petition
→ check sensitive data, jurisdiction, and urgency
→ retrieve valid law, policy, and precedent
→ draft an answer with sentence-level provenance
→ propose similar-case clusters and reasons
→ caseworker edits, splits, merges, rejects, or approves
→ record only the approved draft in a petition sandbox
```

## 3. Source systems and controls

| Source | Control |
|---|---|
| Petition sandbox | Keep original text separate from summaries and minimize personal data. |
| Law and policy corpus | Check jurisdiction, effective date, and retirement state. |
| Precedent archive | Do not assume an old response remains valid. |
| Audit ledger | Preserve draft, cluster changes, approval, rejection, and recovery. |

AI may summarize, retrieve, draft, and propose clusters. A person must handle urgent safety, appeal, child-protection, self-harm, and investigation signals. No external send, state change, or bulk closure occurs without explicit approval.

## 4. Practice and evaluation

| Stage | Exercise | Exit criterion |
|---|---|---|
| P1 | Use at least 30 synthetic petitions | Every claim cited; wrong jurisdiction and date rejected; urgent cases escalated |
| P2 | Review drafts and cluster edits | Zero unapproved sends; all split and merge changes recorded |
| P3 | Write approved drafts to a sandbox | Zero duplicates; reread actual state after timeout |

Measure missing provenance, incorrect clustering, correction burden, missed escalation, duplicate writes, and recovery time.

## 5. Failures, outputs, and limits

Inject retired policy, same-topic petitions with different addresses, prompt-like content inside documents, and write timeouts. Stop, expose the conflict, isolate untrusted material, and reread external state before retrying.

Outputs are a synthetic petition set, cited drafts, cluster reviews, approvals, and recovery records. The case provides no evidence of improved processing time, answer accuracy, or citizen satisfaction.

## 6. Next decision

Before promotion to a runnable public simulation, publish the synthetic evaluation set, cluster ground truth, and boundary cases. A separate reviewer must re-evaluate urgent escalation and the validity of every material citation.
