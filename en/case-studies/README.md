# Applied AX Cases

Cases are vertical practices that apply the roadmap to one workflow. The goal is not to demonstrate how many tools were installed, but to show how source systems, approval, action, evaluation, and recovery fit together.

Every case uses the exit criteria from the [five practice projects](../projects/README.md). A `ready` status means the document is ready for practice. It does not mean the case has produced verified outcomes in a live organization.

## Case catalog

| Case | Scope | Readiness | Project path | Current evidence stage |
|---|---|---|---|---|
| [Beauty/D2C global VOC → workflow proposal](beauty-d2c-voc/README.md) | Workflow | File-and-message, SaaS-centered | P1, P2, P3, P5 | Public-data simulation |
| [From Scattered Files and CSVs to a Reviewable AX Hub](file-csv-to-ax-hub/README.md) | Workflow | File-and-message, SaaS-centered | P1, P2, P3, P5 | Simulation design |
| [From Slack Meeting Signals to Human-Approved Actions](slack-meeting-actions/README.md) | Workflow | SaaS-centered, IT-native | P1–P5 | Simulation design |
| [Centralized Mail Assistance Integration](centralized-mail-assist/README.md) | Shared integration | SaaS-centered, IT-native | P1–P5 | Simulation design |
| [Company Agent Operating Layer](company-agent-operating-layer/README.md) | Organizational capstone | SaaS-centered, IT-native | P2–P5 | Reference simulation design |

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
