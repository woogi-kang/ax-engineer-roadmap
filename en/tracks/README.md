# Collaboration Role Guides for AX Engineers

This roadmap is primarily for AX Engineers, but transforming one workflow requires business, leadership, data, security, and operations partners to define workflow outcomes, approvals, data use, deployment, and stop criteria together. This directory separates the AX Engineer's execution path from the responsibilities of three collaboration groups.

## Decisions every role helps make

Every role should be able to:

1. distinguish a workflow problem from an AI problem;
2. inspect the current flow, waiting, exceptions, and handoffs;
3. separate removal, simplification, standardization, accountable judgment, AI assistance, and automatic action;
4. identify source data, provenance, missingness, terminology, and ownership;
5. define normal, edge, and failure outcomes and name the judge;
6. define prohibited actions, approval, stop, recovery, and manual fallback;
7. measure usage separately from workflow outcomes;
8. retain decisions, changes, approvals, and failure records.

If these questions are unclear, begin with [Start Here](../start-here/README.md) and the [Eight-Stage AX Transformation Lifecycle](../delivery-lifecycle/README.md).

## AX Engineer and collaboration roles

| Guide | Primary responsibility | Representative deliverables |
|---|---|---|
| [AX Engineer](ax-builder.md) | Build, integration, evaluation, deployment, operations | Code, execution rules, eval results, logs, recovery drills |
| [Business practitioner](business-practitioner.md) | Workflow definition, acceptance, exceptions, SOP, production use | Current and target flows, acceptance criteria, UAT, SOP |
| [Leader and decision owner](leader-and-governance.md) | Priority, investment, accountability, procurement, scale | Portfolio decisions, ownership matrix, investment and stop criteria |
| [Data, security, and operations partner](data-security-operations.md) | Data, privacy, permissions, incidents, audit | Data provenance, ownership, lineage, permission matrix, threat model, incident-response records |

## Separate review responsibilities

The implementer submits execution records and failures. Actual users assess workflow quality and correction burden, while operators directly exercise stop, recovery, and handoff. Managers or workflow owners review value, total cost, and acceptable risk before deciding to expand, retain, revise, or stop.

Record when one person fills multiple roles. A reviewer other than the implementer must adjudicate a new scenario; self-checks alone do not establish a pass when no reviewer is available. Hand off disagreements between roles and unresolved items as well as completed work.

## How the roles work together

```mermaid
flowchart LR
    B["Business practitioner<br/>Problem, acceptance, production use"] --> X["Shared execution rules"]
    A["AX Engineer<br/>Build, evaluation, deployment"] --> X
    L["Leader and decision owner<br/>Priority, accountability"] --> X
    D["Data, security, operations<br/>Data, controls, recovery"] --> X
    X --> E["Operating records and next decision"]
```

Shared execution rules should cover outcomes, input and output, source data, permissions, evaluation, approval, stop, recovery, records, and named owners. The [Workflow Execution Rules Template](../toolkit/execution-contract.md) provides a starting point.

## How to use these guides

Recommended reading orders highlight each partner's responsibilities; they do not change the P1–P4 gate sequence.

These are not four separate career roadmaps. The AX Engineer uses them to understand what each partner decides, while each partner prepares the criteria and deliverables within their responsibility. Not every role writes code, but every deployment, operating, and stopping decision still needs accountable evidence.
