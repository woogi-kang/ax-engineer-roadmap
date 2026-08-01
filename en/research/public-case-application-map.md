# Public AX Case Application Map

This document traces how the 25 entries in the [public AX case catalog](public-ax-cases.md) affect the roadmap. It extracts **design questions and control patterns** rather than copying a named organization's implementation or claiming its results.

- Checked: `2026-08-01`
- Public evidence: `K01–K10`, `G01–G15`
- Roadmap application: reinforce 10 existing cases and add five simulation cases

## Application rules

1. Separate verified public facts from the roadmap's proposed design.
2. Keep reported company metrics as background evidence, not practice success targets.
3. Transfer triggers, source systems, approvals, actions, evaluation, and recovery—not product names.
4. Without real data and permissions, do not assign evidence above `simulation-design` or `public-simulation`.
5. Keep work function in `primary_domain` and operating context in `industry`.

## Placement of all 25 cases

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
| G02 | Gradual expansion from HR answers to transactions and human escalation | [Employee access](../case-studies/employee-lifecycle-access/README.md) | Reinforce |
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

## Why these five new cases

| New case | New learning surface |
|---|---|
| Public petitions | Legal and policy provenance, cluster correction, public-response approval |
| Credit and underwriting | Financial sources, rule versions, recommendation-versus-decision boundary |
| Equipment anomalies | Time-series state, alert thresholds, miss and false-alert cost, physical-work approval |
| Care conversation records | Sensitive speech, professional sign-off, urgent risk escalation |
| Regulated evidence documents | Sentence-level citations, fact and assumption separation, multi-domain approval |

All five are documentation-ready `simulation-design` cases. Advance their evidence stage only after publishing executable synthetic evaluation, obtaining de-identified practice evidence, or completing a bounded pilot with operating and recovery proof.
