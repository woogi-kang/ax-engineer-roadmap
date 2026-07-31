# Applied AX Cases

Cases are vertical practices that apply the roadmap to one workflow. The goal is not to demonstrate how many tools were installed, but to show how source systems, approval, action, evaluation, and recovery fit together.

Every case uses the exit criteria from the [five practice projects](../projects/README.md). A `ready` status means the document is ready for practice. It does not mean the case has produced verified outcomes in a live organization.

## Cases by work area

| Work area | Case | Difficulty | Starting condition | Action boundary | P path | Evidence |
|---|---|---:|---|---|---|---|
| Customer and revenue | [Beauty/D2C global VOC → workflow proposal](beauty-d2c-voc/README.md) | 1 | File-and-message, SaaS | Read and propose | P1, P2, P3, P5 | Synthetic-data run and evaluation |
| People and collaboration | [Slack meeting signals → approved actions](slack-meeting-actions/README.md) | 2 | SaaS, internal APIs | Approved sandbox write | P1–P5 | Simulation design |
| People and collaboration | [Employee lifecycle → account and access operations](employee-lifecycle-access/README.md) | 3 | SaaS, internal APIs | Role-based approval | P1–P5 | Simulation design |
| Finance and procurement | [Corporate-card evidence → journal-entry draft](corporate-card-expense/README.md) | 2 | File-and-message, SaaS | Draft only | P1–P3 | Simulation design |
| Finance and procurement | [Sales evidence → electronic tax invoice and payment reconciliation](electronic-tax-invoice-reconciliation/README.md) | 4 | SaaS, internal APIs | Approved sandbox write | P1–P4 | Simulation design |
| Finance and procurement | [Vendor onboarding and bank-account change → verifiable approval](vendor-master-account-change/README.md) | 4 | SaaS, internal APIs | Dual-approved sandbox write | P1–P4 | Simulation design |
| Data and operations | [Scattered files and CSVs → reviewable work hub (AX Hub)](file-csv-to-ax-hub/README.md) | 1 | File-and-message, SaaS | Draft only | P1, P2, P3, P5 | Simulation design |
| Data and operations | [Inventory exceptions → purchase and transfer proposals](inventory-exception-replenishment/README.md) | 4 | SaaS, internal APIs | Record approved proposals | P1–P4 | Simulation design |
| Shared integration and operations | [Centralized Mail Assistance Integration](centralized-mail-assist/README.md) | 4 | SaaS, internal APIs | Approval before sending | P1–P5 | Simulation design |
| Shared integration and operations | [Company Agent Operating Layer](company-agent-operating-layer/README.md) | 5 | SaaS, internal APIs | Bounded by workflow | P2–P5 | Simulation design |

## Recommended learning order

1. [Scattered files and CSVs → reviewable work hub (AX Hub)](file-csv-to-ax-hub/README.md)
2. [Beauty/D2C global VOC → workflow proposal](beauty-d2c-voc/README.md)
3. [Slack meeting signals → approved actions](slack-meeting-actions/README.md)
4. [Corporate-card evidence → journal-entry draft](corporate-card-expense/README.md)
5. [Employee lifecycle → account and access operations](employee-lifecycle-access/README.md)
6. [Centralized Mail Assistance Integration](centralized-mail-assist/README.md)
7. [Sales evidence → electronic tax invoice and payment reconciliation](electronic-tax-invoice-reconciliation/README.md)
8. [Vendor onboarding and bank-account change → verifiable approval](vendor-master-account-change/README.md)
9. [Inventory exceptions → purchase and transfer proposals](inventory-exception-replenishment/README.md)
10. [Company Agent Operating Layer](company-agent-operating-layer/README.md)

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
| `difficulty` | Recommended cross-case difficulty from 1 to 5 |
| `capabilities` | Primary AX capabilities practiced by the case |
| `recommended_after` | Case IDs that are useful preparation |
| `status` | Documentation readiness |
| `evidence_stage` | Current stage from simulation design through operating evidence |
| `readiness` | File-and-message, SaaS-centered, or IT-native readiness |
| `risk` | Baseline risk of the case |
| `write_impact` | Write impact on external systems |
| `autonomy` | Allowed autonomy range |
| `project_stages` | Connected P1–P5 projects |
| `verified_at` | Date the document and external technical sources were last checked |
| `limitations` | Conditions not verified and claims not made |

The metadata contract is defined in [`case.schema.json`](../../case-studies/_schema/case.schema.json). Follow the [case-study template](../toolkit/case-study-template.md) and [source policy](../research/source-policy.md) when adding a case.
