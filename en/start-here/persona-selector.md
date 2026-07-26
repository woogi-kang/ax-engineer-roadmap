# Persona Selector

Choose a track based on the decisions you make in the current workflow, not your job title.

## Quick selection

Start with the row that best matches your work.

| Decisions you often make | Starting track |
|---|---|
| Define the problem, accept results, and help colleagues adopt a new procedure | [Business Practitioner](../tracks/business-practitioner.md) |
| Connect systems, implement and evaluate AI, and deploy to production | [AX Builder](../tracks/ax-builder.md) |
| Set priorities and budget and define approval, accountability, and procurement | [Leader and Governance](../tracks/leader-and-governance.md) |
| Authorize data use and operate access, privacy, incidents, and audit | [Data, Security, and Operations](../tracks/data-security-operations.md) |

## Roles can overlap

One person may be both the workflow owner and Builder in a small organization. Keep the responsibilities explicit:

```text
Workflow outcome approval: Customer Support Owner
Data-use approval: Privacy Officer
Deployment and rollback: Service Operations Owner
Model and prompt changes: AX Builder
Retirement of old procedure: Business Owner
```

Use role names rather than personal names so accountability survives staff changes.

## How much technology should a non-developer learn?

You do not need to write code, but you should understand these boundaries:

- An AI proposal is different from an external system action.
- Retrieved documents may not represent the current state of a workflow.
- A model may return different outputs for the same input.
- An approval button is not a control if the approver lacks evidence and criteria.
- A formal fallback is required when automation stops.

Begin with the [Non-Developer Glossary](non-developer-glossary.md) and [Safe Assistant Project](../projects/01-safe-assistant.md).

## What should developers add?

Existing web, backend, or data experience does not replace workflow discovery, approval ownership, adoption, and retirement of the old process. Read the acceptance and SOP sections of the [Business Practitioner track](../tracks/business-practitioner.md) alongside the [AX Builder track](../tracks/ax-builder.md).

## What should leaders produce?

Do not stop at a strategy document. Require a baseline, stop conditions, ownership, support model, and reuse evidence from a second workflow. The [Leader and Governance track](../tracks/leader-and-governance.md) addresses organizational delivery capacity rather than technology procurement alone.
