# Case: From care conversations to reviewed records and risk escalation

<!-- case-boundary:start -->
## Current scope and designed target

| Scope | Write impact | Autonomy | P stages |
|---|---|---|---|
| Current public artifact | No external write | A0 | None |
| Designed target | Draft only | A1-A2 | P1, P2, P3 |

Current values cover only what this repository can reproduce. The designed target is not yet an implemented scope or evidence of organizational outcomes.
<!-- case-boundary:end -->

This high-risk simulation converts fictional care conversations into structured record drafts and routes risk signals to professionals. It provides no diagnosis, treatment, or emergency service and creates no official record without professional sign-off.

## 1. Current evidence and classification

- Evidence: `simulation-design`
- Domain / industry: data and operations / healthcare and social care
- Risk / designed autonomy: high / A1–A2
- Designed practice: P1–P3, record and escalation drafts only
- Public design inputs: [K08, K09, K10, and G08](../../research/public-case-application-map.md)

## 2. Problem and target flow

Professionals must focus on the person, document the encounter, and avoid missing urgent risk. Wrong speakers, medicines, symptoms, or omitted facts can directly affect safety.

```text
Receive synthetic consent state and conversation
→ verify allowed purpose and scope
→ transcribe while preserving speaker, time, and uncertainty
→ separate facts, observations, and reported statements in a draft
→ send risk candidates immediately through the human escalation path
→ professional compares source, edits, rejects, or signs
→ store only an approved record in a sandbox
→ confirm escalation receipt and handling state
```

## 3. Source systems and controls

| Source | Control |
|---|---|
| Consent registry | Do not process without valid purpose and scope. |
| Source conversation | Link material draft statements to exact segments. |
| Record system | Separate AI draft state from professional signature. |
| Escalation roster | Delivery is not completion; require receipt confirmation. |

AI may transcribe, structure, draft, and flag risk candidates. Professionals own diagnosis, treatment, medicine changes, risk classification, and record signature. Emergency routing runs in parallel and never waits for a generated response.

## 4. Practice and evaluation

| Stage | Exercise | Exit criterion |
|---|---|---|
| P1 | Use at least 30 fictional conversations | Material facts source-linked; zero processing without consent |
| P2 | Professional correction, rejection, sign-off, and escalation | Zero unsigned official records; zero missed required handoffs |
| P3 | Reconcile record and escalation sandboxes | Receipt confirmed; duplicates and partial failures recovered |

Measure material omissions, speaker and medicine errors, correction time, false and missed alerts, and delivery and acknowledgment time.

## 5. Failures, outputs, and limits

Inject expired consent, a confusable medicine name, failed on-call delivery, and record-store failure after escalation. Stop processing, expose uncertainty, use an alternate roster, and preserve partial-failure state without rolling back a safety handoff.

Outputs are fictional conversations, consent and record contracts, source-linked drafts, professional edits, acknowledgment, and recovery records. No clinical, safety, care-quality, or time-saving outcome is claimed.

## 6. Next decision

Before a runnable public simulation, medical or care professionals and privacy and legal reviewers must approve the synthetic evaluation set, mandatory escalation rules, retention and deletion policy, and manual fallback procedure.
