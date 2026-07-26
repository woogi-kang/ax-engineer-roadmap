# Persona Selector

Confirm responsibility from the decisions you make in the current workflow, not your job title.

## Quick selection

Start with the row that best matches your work.

| Decisions you often make | Read first |
|---|---|
| Connect systems, implement and evaluate AI, and deploy to production | [AX Engineer execution path](../tracks/ax-builder.md) |
| Define the problem, accept results, and help colleagues adopt a new procedure | [Business practitioner guide](../tracks/business-practitioner.md) |
| Set priorities and budget and define approval, accountability, and procurement | [Leader and decision-owner guide](../tracks/leader-and-governance.md) |
| Authorize data use and operate access, privacy, incidents, and audit | [Data, security, and operations guide](../tracks/data-security-operations.md) |

## Roles can overlap

One person may own both business and AX implementation responsibilities in a small organization. Keep the decisions explicit:

```text
Workflow outcome approval: Customer Support Owner
Data-use approval: Privacy Officer
Deployment and rollback: Service Operations Owner
Model and prompt changes: AX Engineer
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

Existing web, backend, or data experience does not replace workflow discovery, approval ownership, adoption, and retirement of the old process. Read the acceptance and SOP sections of the [Business Practitioner Guide](../tracks/business-practitioner.md) alongside the [AX Engineer Execution Path](../tracks/ax-builder.md).

## What should leaders produce?

The strategy document should include a baseline, stop conditions, ownership, a support model, and reuse results from a second workflow. The [Leader and Decision-Owner Guide](../tracks/leader-and-governance.md) addresses organizational delivery capacity rather than technology procurement alone.
