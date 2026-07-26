# AX Technical Foundations

This directory is not a list of technologies for building AI agents. It covers the technical judgments AX Builders need to deploy and operate workflow systems safely.

## Apply this principle first

Complexity is not proficiency.

```text
Deterministic rule
→ retrieval or classification
→ draft or recommendation
→ action after human approval
→ bounded automatic action
→ Agent Loop only when necessary
```

Keep the simpler design if it meets success criteria. Model, framework, and cloud names are current implementation choices rather than core competencies.

## Seven areas

| Area | Core question |
|---|---|
| [Software and APIs](software-and-api.md) | Can existing systems be connected without losing state, permissions, and failure handling? |
| [LLM Foundations](llm-foundations.md) | Can model nondeterminism, context, cost, and limits be translated into workflow conditions? |
| [Agent Systems](agent-systems.md) | Can you justify iterative reasoning and define stop and memory boundaries? |
| [Tool Calling and MCP](tools-and-mcp.md) | Can validation, policy, permission, and approval sit between model output and action? |
| [Evaluation and Testing](evaluation-and-testing.md) | Can normal, edge, and failure cases judge changes consistently? |
| [Production Operations](production-operations.md) | Can quality, cost, latency, and failure be detected, stopped, and recovered? |
| [Security and Privacy](security-and-privacy.md) | Can data and action authority be controlled across the lifecycle? |

## Depth by role

- **Business practitioner:** explain risks and approval boundaries.
- **AX Builder:** implement, test, and produce operating evidence.
- **Leader and governance:** ask the questions needed for investment, accountability, vendor, and stop decisions.
- **Data, security, and operations:** co-design data use, access, observability, and incident response.

## Technical node completion

Each document answers:

```text
Why it matters
What to know
How to decide
What to practice
What evidence to produce
Which failures to avoid
Who must agree
Which sources were checked
```

Reading is not completion. Reproduce workflow constraints and failures in the [Practice Projects](../projects/README.md).
