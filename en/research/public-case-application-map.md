# Public Case-to-Practice Table

This document shows where the original 25 entries in the [public AX case catalog](public-ax-cases.md) inform practice designs and suggests questions from 15 added cases. It selects **design questions and control methods** rather than copying a named organization's implementation or claiming its results.

- Original mapping baseline: `2026-08-01`
- Source refresh: `2026-10-26`. All 25 baseline cases were attempted; access failures and limits are recorded separately.
- Public evidence: `K01-K16`, `G01-G24`
- Roadmap application: reinforce 10 existing cases and add five simulation cases

## Application rules

1. Separate verified public facts from the roadmap's proposed design.
2. Keep reported company metrics as background evidence, not practice success targets.
3. Transfer triggers, source systems, approvals, actions, evaluation, and recovery—not product names.
4. Without real data and permissions, do not assign evidence above `simulation-design` or `public-simulation`.
5. Keep work function in `primary_domain` and operating context in `industry`.

## Placement of the original 25 cases

| Public ID | Extracted operating pattern | Roadmap target | Use |
|---|---|---|---|
| K01 | Cited drafts, semantic clustering, caseworker approval | [Public petitions](../case-studies/public-service-petition-response/README.md) | New practice |
| K02 | Integrated financial and industry evidence; analysis separated from approval | [Credit and underwriting](../case-studies/credit-underwriting-review/README.md) | New practice |
| K03 | Generative recommendation separated from deterministic product rules | [Credit and underwriting](../case-studies/credit-underwriting-review/README.md) | New practice |
| K04 | Live knowledge recommendation, agent exception handling, after-call records | [Mail assist](../case-studies/centralized-mail-assist/README.md), [public petitions](../case-studies/public-service-petition-response/README.md) | Reinforce and add |
| K05 | Meeting summaries, decision-versus-suggestion labels, review before sending | [Meeting actions](../case-studies/slack-meeting-actions/README.md) | Reinforce |
| K06 | Sensor and vision anomalies, operator warnings, manual action | [Equipment anomalies](../case-studies/equipment-anomaly-maintenance/README.md) | New practice |
| K07 | Prediction-versus-test variance and release approval | [Equipment anomalies](../case-studies/equipment-anomaly-maintenance/README.md) | Evaluation pattern |
| K08 | Repeated contact, risk signals, human and field escalation | [Care records](../case-studies/care-conversation-record/README.md) | New practice |
| K09 | Behavioral events, sensitive video, contextual review | [Care records](../case-studies/care-conversation-record/README.md) | Data-control pattern |
| K10 | Integrated education records and teacher correction | [AX Hub](../case-studies/file-csv-to-ax-hub/README.md), [care records](../case-studies/care-conversation-record/README.md) | Reinforce and add |
| G01 | Consent, meeting records, expert CRM review, regression evaluation | [Meeting actions](../case-studies/slack-meeting-actions/README.md) | Reinforce |
| G02 | Expansion from HR answers to transfers and employment verification, with human escalation | [Employee access](../case-studies/employee-lifecycle-access/README.md) | Reinforce |
| G03 | Automation drafts, safety interlocks, deployment approval | [Equipment anomalies](../case-studies/equipment-anomaly-maintenance/README.md) | New practice |
| G04 | Shop-floor retrieval, site differences, dangerous-work escalation | [AX Hub](../case-studies/file-csv-to-ax-hub/README.md), [equipment anomalies](../case-studies/equipment-anomaly-maintenance/README.md) | Reinforce and add |
| G05 | Technical retrieval constrained by product, version, and installation | [AX Hub](../case-studies/file-csv-to-ax-hub/README.md) | Reinforce |
| G06 | State refresh, cause candidates, operations tickets | [Inventory exceptions](../case-studies/inventory-exception-replenishment/README.md) | Reinforce |
| G07 | Large-scale drafting, editorial approval, edit and unpublish measures | [Beauty/D2C VOC](../case-studies/beauty-d2c-voc/README.md) | Reinforce |
| G08 | Clinical-note drafts, clinician approval, EHR write | [Care records](../case-studies/care-conversation-record/README.md) | New practice |
| G09 | Document citations, jurisdiction and confidentiality, expert sign-off | [Regulated documents](../case-studies/regulated-evidence-document/README.md) | New practice |
| G10 | Defects, rework, security, and change failure over code volume | [Agent operating layer](../case-studies/company-agent-operating-layer/README.md) | Reinforce |
| G11 | OCR, sensitive-data controls, evidence and underwriter approval | [Credit and underwriting](../case-studies/credit-underwriting-review/README.md) | New practice |
| G12 | Low-sensitivity start, authoritative information, multilingual consistency | [Public petitions](../case-studies/public-service-petition-response/README.md) | New practice |
| G13 | Account research, CRM freshness, message review | [Mail assist](../case-studies/centralized-mail-assist/README.md) | Reinforce |
| G14 | Evidence-versus-assumption labels, sentence citations, domain approvals | [Regulated documents](../case-studies/regulated-evidence-document/README.md) | New practice |
| G15 | Complex-case escalation, repeat contact, and human choice over automation rate | [Mail assist](../case-studies/centralized-mail-assist/README.md), [public petitions](../case-studies/public-service-petition-response/README.md) | Reinforce and add |

## Applying the follow-up evidence checked on 2026-10-26

| Public ID | Tests to add | Claims that do not transfer |
|---|---|---|
| K04 | Human-channel choice, exception escalation, and review of AI evaluation findings before coaching | The 19% and 16% figures from different announcements are not a matched trend. |
| K05 | Organization-specific permissions, document scope, approvals, and separate checks for a rollout plan and actual use | Selection by ministries is not an operating outcome, and internal time savings do not transfer. |
| G02 | Check metric names, calculations, and denominators before comparison; report different metrics separately | NPS -35 and CSAT +74 are not an improvement trend on one measure. |
| G08 | Compare omitted relationship-significant events, clinician additions, and correction burden on the same conversation | A 47-visit single-institution study does not establish accuracy for all medical records or current models. |

This table translates [follow-up claims in the catalog](public-ax-cases.md) into practice requirements. It does not newly verify practice outcomes. Evidence levels remain one runnable public simulation and 14 designs without execution evidence.

## Why these five new cases

| New case | New learning surface |
|---|---|
| Public petitions | Legal and policy provenance, cluster correction, public-response approval |
| Credit and underwriting | Financial sources, rule versions, recommendation-versus-decision boundary |
| Equipment anomalies | Time-series state, alert thresholds, miss and false-alert cost, physical-work approval |
| Care conversation records | Sensitive speech, professional sign-off, urgent risk escalation |
| Regulated evidence documents | Sentence-level citations, fact and assumption separation, multi-domain approval |

All five are documentation-ready `simulation-design` cases. Advance their evidence stage only after publishing executable synthetic evaluation, obtaining de-identified practice evidence, or completing a bounded pilot with operating and recovery proof.

## Learning connections for added cases

These are questions to consider in the existing 15 exercises, not new executable implementations or organizational outcomes.

| Public ID | Learning question | Related practice | Application scope |
|---|---|---|---|
| K11 | Comparability after question branching and analysis review | [VOC case](../case-studies/beauty-d2c-voc/README.md) | Proposed questions for existing designs; no implementation or outcome validation |
| K12 | Linking evidence, staff review, and actual delivery | [Mail assist](../case-studies/centralized-mail-assist/README.md) | Proposed questions for existing designs; no implementation or outcome validation |
| K13 | Manual-version/model mismatch and hazardous-work escalation | [Equipment anomalies](../case-studies/equipment-anomaly-maintenance/README.md) | Proposed questions for existing designs; no implementation or outcome validation |
| K14 | Unreadable identifiers, stale records, and manual restart | [Equipment anomalies](../case-studies/equipment-anomaly-maintenance/README.md) | Proposed questions for existing designs; no implementation or outcome validation |
| K15 | Translation accuracy, speaker attribution, and sharing checks | [Meeting actions](../case-studies/slack-meeting-actions/README.md) | Proposed questions for existing designs; no implementation or outcome validation |
| K16 | Material/equipment changes and approval of production conditions | [Equipment anomalies](../case-studies/equipment-anomaly-maintenance/README.md) | Proposed questions for existing designs; no implementation or outcome validation |
| G16 | Review of research and scoped access | [AX Hub](../case-studies/file-csv-to-ax-hub/README.md), [VOC proposals](../case-studies/beauty-d2c-voc/README.md) | Review criteria for existing practices, not new implementations |
| G17 | Lead checks and separation of pipeline from revenue | [VOC proposals](../case-studies/beauty-d2c-voc/README.md), [Meeting actions](../case-studies/slack-meeting-actions/README.md) | Review criteria for existing practices, not new implementations |
| G18 | Contextual handoff and decision authority | [Petition response](../case-studies/public-service-petition-response/README.md), [Care records](../case-studies/care-conversation-record/README.md) | Review criteria for existing practices, not new implementations |
| G19 | Patient context, sources, and professional judgment | [Care records](../case-studies/care-conversation-record/README.md), [Evidence documents](../case-studies/regulated-evidence-document/README.md) | Review criteria for existing practices, not new implementations |
| G20 | Document routing, exceptions, and decision audit | [Underwriting review](../case-studies/credit-underwriting-review/README.md), [Evidence documents](../case-studies/regulated-evidence-document/README.md) | Review criteria for existing practices, not new implementations |
| G21 | Team scopes, human review, and release comparisons | [Shared operations](../case-studies/company-agent-operating-layer/README.md), [Meeting actions](../case-studies/slack-meeting-actions/README.md) | Review criteria for existing practices, not new implementations |
| G22 | Separate access and training from outcomes; verify rules | [Evidence documents](../case-studies/regulated-evidence-document/README.md), [Access lifecycle](../case-studies/employee-lifecycle-access/README.md) | Review criteria for existing practices, not new implementations |
| G23 | Supplier status, replies, and metric periods | [Maintenance](../case-studies/equipment-anomaly-maintenance/README.md), [Inventory exceptions](../case-studies/inventory-exception-replenishment/README.md) | Review criteria for existing practices, not new implementations |
| G24 | Separate message volume from value; decide when to stop | [Shared operations](../case-studies/company-agent-operating-layer/README.md), [Meeting actions](../case-studies/slack-meeting-actions/README.md) | Review criteria for existing practices, not new implementations |
