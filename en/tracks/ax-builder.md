# AX Builder Track

## Audience

For people who connect workflows to software, data, LLMs, and tools and own deployment and operations. Backend, frontend, data, or automation experience helps but is not the only entry point.

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
- Connect schemas, transactions, retries, deduplication, and idempotency to workflow impact.
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

Agree through the execution contract with the [Business Practitioner](business-practitioner.md), [Leader and Governance](leader-and-governance.md), and [Data, Security, and Operations](data-security-operations.md) owners.

## Common failures

- Choosing a framework first and reshaping the problem around it
- Expanding action authority because output quality improved
- Duplicating external actions through automatic retries
- Keeping conversation history without version, approval, or action traceability
- Abstracting the first project's code into a platform

## Recommended path

1. Diagnose gaps in [Technical Foundations](../technical-foundations/README.md).
2. Implement the [Practice Projects](../projects/README.md) in order.
3. Use the [12-Week Practice Path](../learning-paths/12-week-practice.md) to connect one workflow to reuse in a second workflow.
