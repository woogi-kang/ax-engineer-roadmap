# Applied AX Cases

Cases are vertical practices that apply the roadmap to one workflow. The goal is not to demonstrate how many tools were installed, but to show how source systems, approval, action, evaluation, and recovery fit together.

Every case uses the exit criteria from the [five practice projects](../projects/README.md). A `ready` status means the document is ready for practice. It does not mean the case has produced verified outcomes in a live organization.

The current public evidence consists of **one reproducible public simulation and 14 design blueprints**. None of the published artifacts changes an external system. The `designed target boundary` and `designed P stages` below describe the maximum practice scope, not completed implementation or organizational operation.

## Cases by work area

| Work function / industry | Case | Difficulty | Starting condition | Designed target boundary | Designed P stages | Current evidence |
|---|---|---:|---|---|---|---|
| Customer and revenue / consumer retail | [Beauty/D2C global VOC → workflow proposal](beauty-d2c-voc/README.md) | 1 | File-and-message, SaaS | Read and propose, then approved sandbox write | P1, P2, P3, P5 | Reproducible public simulation |
| Customer and revenue / public sector | [Public petitions → cited drafts and clusters](public-service-petition-response/README.md) | 2 | File-and-message, SaaS | Draft only | P1–P3 | Simulation design |
| People and collaboration / cross-industry | [Slack meeting signals → approved actions](slack-meeting-actions/README.md) | 2 | SaaS, internal APIs | Approved sandbox write | P1–P5 | Simulation design |
| People and collaboration / cross-industry | [Employee lifecycle → account and access operations](employee-lifecycle-access/README.md) | 3 | SaaS, internal APIs | Role-based approval | P1–P5 | Simulation design |
| Finance and procurement / cross-industry | [Corporate-card evidence → journal-entry draft](corporate-card-expense/README.md) | 2 | File-and-message, SaaS | Draft only | P1–P3 | Simulation design |
| Finance and procurement / cross-industry | [Sales evidence → electronic tax invoice and payment reconciliation](electronic-tax-invoice-reconciliation/README.md) | 4 | SaaS, internal APIs | Approved sandbox write | P1–P4 | Simulation design |
| Finance and procurement / cross-industry | [Vendor onboarding and bank-account change → verifiable approval](vendor-master-account-change/README.md) | 4 | SaaS, internal APIs | Dual-approved sandbox write | P1–P4 | Simulation design |
| Finance and procurement / financial services | [Company evidence → credit and underwriting review draft](credit-underwriting-review/README.md) | 4 | File-and-message, SaaS, internal APIs | Draft only | P1–P3 | Simulation design |
| Data and operations / cross-industry | [Scattered files and CSVs → reviewable work hub (AX Hub)](file-csv-to-ax-hub/README.md) | 1 | File-and-message, SaaS | Draft only | P1, P2, P3, P5 | Simulation design |
| Data and operations / legal and life sciences | [Evidence → source-linked regulated document](regulated-evidence-document/README.md) | 4 | File-and-message, SaaS, internal APIs | Draft only | P1–P3 | Simulation design |
| Data and operations / consumer retail | [Inventory exceptions → purchase and transfer proposals](inventory-exception-replenishment/README.md) | 4 | SaaS, internal APIs | Record approved proposals | P1–P4 | Simulation design |
| Data and operations / manufacturing | [Equipment anomaly → maintenance proposal](equipment-anomaly-maintenance/README.md) | 4 | Internal APIs | Approved sandbox write | P1–P4 | Simulation design |
| Data and operations / healthcare and social care | [Care conversation → record and risk escalation](care-conversation-record/README.md) | 5 | File-and-message, SaaS, internal APIs | Draft only | P1–P3 | Simulation design |
| Shared integration and operations / cross-industry | [Centralized Mail Assistance Integration](centralized-mail-assist/README.md) | 4 | SaaS, internal APIs | Approval before sending | P1–P5 | Simulation design |
| Shared integration and operations / cross-industry | [Company Agent Operating Layer](company-agent-operating-layer/README.md) | 5 | SaaS, internal APIs | Bounded by workflow | P2–P5 | Simulation design |

## Recommended learning order

1. [Scattered files and CSVs → reviewable work hub (AX Hub)](file-csv-to-ax-hub/README.md)
2. [Beauty/D2C global VOC → workflow proposal](beauty-d2c-voc/README.md)
3. [Public petitions → cited drafts and clusters](public-service-petition-response/README.md)
4. [Slack meeting signals → approved actions](slack-meeting-actions/README.md)
5. [Corporate-card evidence → journal-entry draft](corporate-card-expense/README.md)
6. [Evidence → source-linked regulated document](regulated-evidence-document/README.md)
7. [Employee lifecycle → account and access operations](employee-lifecycle-access/README.md)
8. [Centralized Mail Assistance Integration](centralized-mail-assist/README.md)
9. [Sales evidence → electronic tax invoice and payment reconciliation](electronic-tax-invoice-reconciliation/README.md)
10. [Vendor onboarding and bank-account change → verifiable approval](vendor-master-account-change/README.md)
11. [Company evidence → credit and underwriting review draft](credit-underwriting-review/README.md)
12. [Inventory exceptions → purchase and transfer proposals](inventory-exception-replenishment/README.md)
13. [Equipment anomaly → maintenance proposal](equipment-anomaly-maintenance/README.md)
14. [Care conversation → record and risk escalation](care-conversation-record/README.md)
15. [Company Agent Operating Layer](company-agent-operating-layer/README.md)

This is a progression of responsibility, not a ranking. P1–P5 describes how far one workflow is taken toward operations and serves a different purpose.

## Scope types

- **Workflow**: a concrete unit of work whose start and completion one team can verify.
- **Shared integration**: a connector and its permission and audit model used by multiple workflows.
- **Organizational capstone**: a test of shared operations after reuse has been verified in a second workflow.

Connecting AI to existing SaaS is a reusable implementation pattern, not a standalone product case. Treat messaging as the entry point, workflow and document systems as sources of truth, and agent runtimes as replaceable execution components.

## How to choose a case

1. Confirm the data and test accounts you can actually access.
2. Begin with P1 without changing an external system.
3. Move to P2 only after accountable approval criteria exist.
4. Consider P3 or greater impact only when test accounts, permissions, and recovery are available.
5. Do not turn the first case into a shared platform; test P5 reuse in a different workflow.

When an organization environment is unavailable, use public or synthetic data and a sandbox. Do not claim live adoption, official process change, or organizational outcomes.

## Case metadata

Each case stores the following machine-readable information in `case.json`.

| Field | Meaning |
|---|---|
| `type` | Workflow, shared integration, or organizational capstone |
| `primary_domain` | Customer and revenue, people and collaboration, finance and procurement, data and operations, or shared operations |
| `industry` | Cross-industry, consumer retail, public sector, financial services, manufacturing, healthcare and social care, or legal and life sciences |
| `difficulty` | Recommended cross-case difficulty from 1 to 5 |
| `capabilities` | Primary AX capabilities practiced by the case |
| `recommended_after` | Case IDs that are useful preparation |
| `learning_order` | Default learning order as responsibility increases |
| `status` | Documentation readiness |
| `evidence_stage` | Current stage from simulation design through operating evidence |
| `readiness` | File-and-message, SaaS-centered, or IT-native readiness |
| `risk` | Baseline risk of the case |
| `current_write_impact` / `designed_write_impact` | External write impact demonstrated now / maximum target covered by the design |
| `current_autonomy` / `designed_autonomy` | Autonomy demonstrated now / maximum range covered by the design |
| `implemented_project_stages` / `designed_project_stages` | P1–P5 stages demonstrated now / target projects connected by the design |
| `verified_at` | Date the document and external technical sources were last checked |
| `limitations` | Conditions not verified and claims not made |

The metadata contract is defined in [`case.schema.json`](../../case-studies/_schema/case.schema.json). Follow the [case-study template](../toolkit/case-study-template.md) and [source policy](../research/source-policy.md) when adding a case.
