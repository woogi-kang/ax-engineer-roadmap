# Start Here

Begin by confirming the AX Engineer's responsibility and the workflow's current readiness. Then identify the technical gaps and the partners who own business, leadership, data, security, and operations decisions.

```mermaid
flowchart TD
    A["What responsibility do I own?"] --> B["How ready is this workflow?"]
    B --> C["Check eight questions before changing the workflow"]
    C --> D["AX Engineer execution path"]
    D --> E{"Who shares the decisions?"}
    E -->|"Problem, acceptance, regular use"| F["Business practitioner"]
    E -->|"Priority, investment, accountability"| G["Leader and decision owner"]
    E -->|"Data, security, reliability"| H["Data, security, operations"]
```

## 1. Confirm the responsibility

[Persona Selector](persona-selector.md) uses the decisions made in the current workflow rather than job titles. One person may carry several responsibilities in a small organization, but each decision still needs an explicit owner.

## 2. Assess workflow readiness

[Organization Readiness](organization-readiness.md) checks workflow records, authoritative systems, permissions, and operating ownership. Readiness is not a score of organizational quality and may differ across workflows in the same company.

## 3. Check eight questions before changing the workflow

Every role should be able to answer:

- Is this a workflow problem or an AI problem?
- Can we map the current flow, waiting, exceptions, and handoffs?
- Which steps should be removed or standardized, and which still require accountable judgment?
- Where is current state authoritative, and what data, missingness, and terminology differences exist?
- Who judges acceptable and failed outcomes, using what criteria?
- Are prohibited actions, approval points, stop, recovery, and manual fallback defined?
- Are usage and workflow outcomes measured separately?
- Can another person inspect decisions, changes, approvals, and failures?

If many answers are unclear, begin with [Outcomes and boundaries](../delivery-lifecycle/01-outcomes-and-boundaries.md), [Workflow discovery](../delivery-lifecycle/02-workflow-discovery.md), and [Data and workflow context](../delivery-lifecycle/04-data-and-context.md).

## 4. Follow the AX Engineer path and collaboration guides

| Primary responsibility | Recommended document |
|---|---|
| Software, AI, integration, deployment | [AX Engineer execution path](../tracks/ax-builder.md) |
| Workflow definition, acceptance, SOP, production use | [Business practitioner guide](../tracks/business-practitioner.md) |
| Portfolio, investment, accountability | [Leader and decision-owner guide](../tracks/leader-and-governance.md) |
| Data, privacy, security, incident response | [Data, security, and operations guide](../tracks/data-security-operations.md) |

## 5. Validate the work through a small project

[Practice projects](../projects/README.md) progress from a safe assistant to reuse in a second workflow. Without an organizational development environment, use documents, tables, sandbox simulation, and independent review while making the simulation boundary explicit.

## 6. Scope the first step for your current experience

The [entry routes by background](../learning-paths/entry-routes.md) identify gaps and first artifacts for early-career developers, experienced developers, and domain experts. Each route also checks data, authority, independent review, and progression criteria. Domain experts distinguish collaboration as a business practitioner from directly owning implementation and operations.

Prior technical experience does not waive P1–P4 pass criteria. Record document/table-based decision practice separately from verified executable code or operations.

## If the terminology is unfamiliar

The [non-developer glossary](non-developer-glossary.md) explains APIs, RAG, agents, MCP, evaluation, logs, and manual fallback through workflow decisions and risks.
