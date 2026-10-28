# Case: From care conversations to reviewed records and risk escalation

<!-- case-boundary:start -->
## Current scope and designed target

| Scope | Write impact | Autonomy | Related P stages |
|---|---|---|---|
| Current public artifact | No external write | A0 | None |
| Designed target | Draft only | A1-A2 | P1, P2, P3 |

Current values cover only what this repository can reproduce. A current P label identifies a stage with implemented functionality, not completion of all its exit criteria. The designed target is not yet an implemented scope or evidence of organizational outcomes.
<!-- case-boundary:end -->

The published assets are design documentation and metadata. The problem and current workflow below are exercise assumptions; no input set, executable code, execution logs, or acceptance results are published for this case yet. Target flows, evaluations, and deliverables describe work still to implement and verify.

The case-specific P-stage tables supplement the [common project exit criteria](../../projects/README.md). They do not waive P1's minimum evaluation count or independent review, and a P4 plan or readiness document does not establish a passed production pilot.

This high-risk simulation converts fictional care conversations into structured record drafts and routes risk signals to professionals. It provides no diagnosis, treatment, or emergency service and creates no official record without professional sign-off.

<!-- failure-cases:start -->
> Failure-case check: These records from the [public AX failure and stop cases](../../research/ax-failure-cases.md) are linked to this workflow. Check the items below before turning this design into practice, and use the [capstone design checklist](../../research/ax-failure-cases.md#checklist-for-capstone-design) for the rest.
>
> - FK01 스캐터랩 (이루다) (`STOPPED · SANCTIONED`): Record the collection purpose and consent scope for every training or retrieval dataset, and make a discriminatory/harmful-output test set a pre-launch gate.
> - FG09 National Eating Disorders Association (`STOPPED`): Where vulnerable users are involved, decouple staff reduction from the AI launch, and pass harmful-answer blocking tests and immediate human handoff first.
> - FG11 MD Anderson Cancer Center · IBM Watson (`STOPPED`): List source-system migrations and owners as risks, and tie each stage's budget approval to a 'ready for real use' decision.
<!-- failure-cases:end -->

## 1. Current evidence and classification

- Evidence: `simulation-design`
- Domain / industry: data and operations / healthcare and social care
- Risk / designed autonomy: high / A1–A2
- Designed practice: P1–P3, record and escalation drafts only
- Planned inputs: fictional conversations with different consent states, confusable medicine names, urgent risk signals, and routine consultations; no real patient or care-recipient data
- Public design inputs: The [public case-to-practice table](../../research/public-case-application-map.md) applies K08 to immediate on-call notification and receipt confirmation, K09 to consent and sensitive-record controls, K10 to professional correction, and G08 to sign-off before the record-system write.

## 2. Problem and target flow

Professionals must focus on the person, document the encounter, and avoid missing urgent risk. Wrong speakers, medicines, symptoms, or omitted facts can directly affect safety.

The professional finalizes the official record. A separate on-call or monitoring owner decides urgent handoff and verifies that the responsible person received it and that its handling state is known.

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

Stop record generation when consent is absent, the subject does not match, speakers are confused, or a critical passage could not be transcribed. An alert sent without confirmed human receipt does not complete the handoff.

## 4. Practice and evaluation

| Stage | Exercise | Exit criterion |
|---|---|---|
| P1 | Use at least 30 fictional conversations | Material facts source-linked; zero processing without consent |
| P2 | Professional correction, rejection, sign-off, and escalation | Zero unsigned official records; zero missed required handoffs |
| P3 | Reconcile record and escalation sandboxes | Receipt confirmed; duplicates and partial failures recovered |

Measure word error rate alongside material omissions, speaker, medicine and numeric errors, correction time, false and missed alerts, and delivery and acknowledgment time.

### Evaluating missing context

The [supplementary G08 evidence](../../research/public-ax-cases.md) includes a single-institution conference abstract published on 2026-06-29. It is a previously omitted counterexample, not a change that occurred after the last review. Its small sample does not establish the clinical accuracy of all models.

Include fictional examples where family relationships, bereavement, or care circumstances could change a professional's judgment if omitted. A qualified reviewer compares source and draft, recording consequential omissions, unsupported additions, and correction time. Faster processing does not pass review when important context is missing. Use fictional conversations so the procedure can be practiced without actual patient data.

## 5. Failures, outputs, and limits

Inject expired consent, a confusable medicine name, failed on-call delivery, and record-store failure after escalation. Stop processing, expose uncertainty, use an alternate roster, and preserve partial-failure state without rolling back a safety handoff.

Planned outputs are fictional conversations, consent and record contracts, source-linked drafts, professional edits, acknowledgment, and recovery records. No clinical, safety, care-quality, or time-saving outcome is claimed.

## 6. Next decision

Before a runnable public simulation, medical or care professionals and privacy and legal reviewers must approve the synthetic evaluation set, mandatory escalation rules, retention and deletion policy, and manual fallback procedure.
