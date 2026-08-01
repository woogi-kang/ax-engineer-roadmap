# Case: From company evidence to a credit and underwriting review draft

<!-- case-boundary:start -->
## Current scope and designed target

| Scope | Write impact | Autonomy | P stages |
|---|---|---|---|
| Current public artifact | No external write | A0 | None |
| Designed target | Draft only | A1-A2 | P1, P2, P3 |

Current values cover only what this repository can reproduce. The designed target is not yet an implemented scope or evidence of organizational outcomes.
<!-- case-boundary:end -->

This high-risk simulation combines synthetic applications, financial statements, transaction and collateral evidence, and policy rules into a review draft. AI never approves, rejects, prices, or sets a limit.

## 1. Current evidence and classification

- Evidence: `simulation-design`
- Domain / industry: finance and procurement / financial services
- Risk / designed autonomy: high / A1–A2
- Designed practice: P1–P3, review draft only
- Public design inputs: [K02, K03, and G11](../../research/public-case-application-map.md)

## 2. Problem and target flow

Reviewers reconcile documents and numbers, apply product and industry rules, and write questions and opinions. OCR errors and stale rules can create unexplained or unfair decisions.

```text
Receive a synthetic application packet
→ verify document, company, period, unit, and OCR quality
→ reconcile financial values with source pages
→ select the valid product and industry rule version
→ separate facts, rule results, and assumptions in a draft
→ propose missing evidence and questions
→ reviewer edits, rejects, or confirms
→ record only the draft and provenance in a sandbox
```

## 3. Source systems and controls

| Source | Control |
|---|---|
| Document vault | Link every material value to page and source. |
| Financial snapshot | Stop on mixed periods, units, or consolidated status. |
| Rule registry | The model cannot create or bypass policy rules. |
| Review ledger | Separate recommendations from the actual decision. |

AI may extract, calculate, execute deterministic rules, and propose questions. A reviewer owns approval, rejection, price, limit, product choice, and customer notice. Stop on missing documents, unresolved value differences, missing rule versions, or low OCR quality.

## 4. Practice and evaluation

| Stage | Exercise | Exit criterion |
|---|---|---|
| P1 | Process synthetic documents and rules | Values linked to sources; unit and missing-data errors rejected; rules reproducible |
| P2 | Reviewer edits, holds, and rejects | Zero automated final decisions; zero fact-assumption mixing |
| P3 | Record a review draft | Block pre-approval writes; verify version and idempotency |

Measure source correctness, wrong-rule use, correction burden, uncertainty refusal, group-level error differences, and audit reproducibility.

## 5. Failures, outputs, and limits

Inject mixed currency units, prior-year policy, a missing signature, and post-approval edits. Stop calculation, request evidence, invalidate old approval, and require a new review.

Outputs are synthetic packets, data and rule contracts, rule results, review drafts, edits, and audit records. There is no evidence of improved approval quality, loss rate, conversion, or review time.

## 6. Next decision

Before a runnable public simulation, provide synthetic ground truth, reproducible calculation tests, a bias and proxy-variable review, and an independent underwriter evaluation. Any real use also requires separate legal, compliance, and model-risk approval.
