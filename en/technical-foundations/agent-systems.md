# Agent Systems

## Why it matters

An agent observes state, selects actions, calls tools, and reviews results. Iteration can help with open-ended workflows, but it increases cost, latency, unpredictability, and permission risk.

## What to know

- Agent Loop: observe, decide, act, review
- Tool selection and tool-result interpretation
- State, checkpoints, and stop conditions
- Planner–Executor, ReAct, DAG, and related patterns
- Single and multi-agent systems
- Short-term task state and long-term memory
- Step, time, and cost limits
- Human handoff and approval

## How to decide

Before using an Agent Loop, ask:

- Are the steps and branches not known in advance?
- Does each next action depend on the previous result?
- Would a deterministic workflow require unmanageable exceptions?
- Can every action be independently validated and reversed?
- Can steps, cost, time, and tools be bounded?

If not, prefer fixed workflows, retrieval and classification, or draft and approval.

### Multiple agents

Use them only when separation clarifies ownership and evaluation. Avoid assigning names to duplicate model calls or creating a graph that obscures root causes.

### Memory

Separate source systems from agent memory. Long-term memory needs purpose, provenance, update, correction, deletion, and access policies. Do not store model summaries as verified facts.

## Practice

1. Implement the same problem as a fixed workflow and an Agent Loop.
2. Compare success, cost, latency, reproducibility, and diagnosis.
3. Bound steps, time, cost, and tools.
4. Inject tool errors, conflicting results, loops, and bad plans.
5. Stop and resume at checkpoints and hand off to a person.
6. Test memory correction and deletion.

## Evidence

- Agent decision and simpler alternative comparison
- State, step, and stop schema
- Tool allowlist and step-level permissions
- Step, cost, and time limits
- Failure injection and handoff record
- Memory provenance, update, and deletion policy

## Failure patterns

- Choosing agents because they appear autonomous
- Letting the model decide completion without external stop rules
- Letting multiple agents store conflicting summaries as facts
- Mixing task state, long-term memory, and source data
- Treating a plan explanation as execution evidence

## Collaborators

- Workflow owner: permitted autonomous judgment
- Security: tool, data, and action authority
- Operations: limits, stop, resume, and handoff
- Data owner: memory provenance and lifecycle

## Sources

- [`PRIMARY_REPOSITORY` AI Agents content: loop and architectures](https://github.com/nilbuild/developer-roadmap/tree/master/roadmaps/ai-agents/content)
- [`PRIMARY_OFFICIAL` NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)
