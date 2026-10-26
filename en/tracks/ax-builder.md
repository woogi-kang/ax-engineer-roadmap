# AX Engineer Execution Path

## Audience

For people who implement workflows in software and data, integrate LLMs and tools, and own deployment and operations. Backend, frontend, data, or automation experience helps but is not the only entry point.

## Choose the initial scope

Use the [entry routes by background](../learning-paths/entry-routes.md) to define the first artifact and review conditions. Early-career developers start with a small capability using public or synthetic inputs; experienced developers first check the workflow baseline and gaps in approval and integration. Domain experts distinguish business collaboration from an engineering transition and choose the implementation they will own.

This choice scopes learning; it does not grant proficiency or execution authority. Every route verifies P1 evidence first, then checks the authority and responsibility required for P2, P3, and P4 in order.

## Goal

Build a workflow system another person can accept, operate, stop, and continue improving—not just a working demo.

## Selection order before implementation

Do not make a complex agent the default.

```text
Deterministic rule
→ retrieval or classification
→ draft or recommendation
→ action after human approval
→ bounded automatic action
→ Agent Loop only when prior approaches are insufficient
```

Compare quality, cost, latency, permission, and recoverability at each level. Keep the simpler approach when it meets the success criteria.

## 1. Software and APIs

- Understand HTTP, REST APIs, authentication, authorization, webhooks, batch, and queues.
- Explain how schemas, transactions, retries, deduplication, and idempotency affect workflow errors and external-system changes.
- Keep secrets and configuration out of code.
- Build unit, integration, end-to-end tests, and a delivery pipeline.

Detail: [Software and APIs](../technical-foundations/software-and-api.md)

## 2. LLM and agent systems

- Understand tokens, context, generation controls, cost, and model-selection conditions.
- Evaluate structured output, retrieval, and tool calling independently.
- Explain when Agent Loops or Planner–Executor designs are justified.
- Separate agent memory from source-of-truth systems and define update and deletion.

Detail: [LLM Foundations](../technical-foundations/llm-foundations.md), [Agent Systems](../technical-foundations/agent-systems.md)

## 3. Tools and integration

- Separate read and write tools and apply least privilege.
- Place schema validation, policy, and approval between model output and action.
- Treat MCP as a connection protocol, not a replacement for authentication, approval, or audit.
- Reproduce side effects and duplicate actions in a test environment.

Detail: [Tool Calling and MCP](../technical-foundations/tools-and-mcp.md)

## 4. Evaluation and safety

- Build normal, edge, failure, and adversarial evaluation cases.
- Evaluate retrieval, generation, tool selection, and final workflow results separately.
- Operate regression evaluation and human review.
- Test that prohibited actions and approval bypasses are actually blocked.

Detail: [Evaluation and Testing](../technical-foundations/evaluation-and-testing.md), [Security and Privacy](../technical-foundations/security-and-privacy.md)

## 5. Operations and handoff

- Correlate input, model, prompt, tool versions, approval, action, and failure with a run identifier.
- Design SLOs, budgets, alerts, stopping, rollback, and manual fallback.
- Have an operator other than the implementer diagnose and recover representative failures.
- Remove dependence on personal accounts, local environments, and undocumented knowledge.

Detail: [Production Operations](../technical-foundations/production-operations.md)

## Validate unseen scenarios and operational changes

- Take an assessment on inputs not used during development and preserve the first run before repairs.
- Test reconnection during approval waits, permission revocation, duplicate and partially successful actions, actual cancellation, and policy service outages using the [practice projects](../projects/README.md).
- Freeze model, prompt, tool, and policy versions; rerun regression evaluation and required reviews by role after changes.
- Include failures, retries, review, and rework in [cost per completed workflow](../projects/04-production-pilot.md).
- Verify that an operator can stop, recover, and handle remaining exceptions without the implementer's help.

## Evidence to produce

- Runnable code and reproduction steps
- Input, output, API, and event contracts
- Evaluation data, rubrics, and regression results
- Threat model and permission matrix
- Logs, metrics, traces, or equivalent run records
- Deployment, stop, recovery, and fallback records
- Operator and developer handoff

## Collaboration boundary

Builders should not decide these alone:

- Workflow outcomes and completion
- Legality and ownership of data use
- Authority to approve results
- Risk tolerance and retirement of the old procedure
- Business priority during incidents

Agree through the [Workflow Execution Rules](../toolkit/execution-contract.md) with the [Business Practitioner](business-practitioner.md), [Leader and Decision Owner](leader-and-governance.md), and [Data, Security, and Operations](data-security-operations.md) partners.

## Common failures

- Choosing a framework first and reshaping the problem around it
- Expanding action authority because output quality improved
- Duplicating external actions through automatic retries
- Keeping conversation history without version, approval, or action traceability
- Abstracting the first project's code into a platform

## Recommended path

1. Diagnose gaps in [Technical Foundations](../technical-foundations/README.md).
2. Implement the [Practice Projects](../projects/README.md) in order.
3. Use the [12-Week Practice Path](../learning-paths/12-week-practice.md) to record operating results for one workflow and verified reuse in a second workflow.
