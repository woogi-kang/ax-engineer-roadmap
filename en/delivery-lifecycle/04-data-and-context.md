# 4. Data and Context

## Purpose

Define the provenance, semantics, freshness, and permissions of information used by AI. Make each workflow outcome traceable to its sources and processing steps.

## Information types

| Type | Examples | Operating principle |
|---|---|---|
| Source data | Orders, contracts, customer inquiries, inventory | Preserve the system of record and owner |
| Derived data | Cleaned, joined, or classified results | Record transformation rules and versions |
| Document knowledge | Policies, manuals, meeting notes | Mark scope and freshness |
| Workflow state | Awaiting approval, in progress, complete | Read from the live system of record |
| AI output | Classification, summary, draft, proposal | Record the input, model, evaluation, and approval together |
| Execution result | Created tasks or changed states | Record an audit identifier and reversal information |
| Task context | Instructions, current constraints, unfinished work | Preserve sources and versions; check constraints after compaction |
| Long-term memory | Prior-task summaries and reusable knowledge | Define purpose, owner, retention, and propagation of correction and deletion |

## When compacting or restoring context

Losing approval scope, prohibited actions, or unfinished work in a summary can change execution. Keep source references for these constraints and compare the same cases before and after compaction. Requery saved approval or order state immediately before acting. Test that deleted memory does not reappear from an index or summary.

Compaction and structured notes were publicly described in 2025. Use [Anthropic's engineering article](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents) (published 2025-09-29; checked 2026-10-26) and apply the [LLM Foundations verification criteria](../technical-foundations/llm-foundations.md#context-selection-and-compaction).

## Key activities

1. Identify systems of record and data owners.
2. Define fields, identifiers, units, time zones, and missing-value meaning in a data contract.
3. Align workflow terminology and metric definitions.
4. Separate source, derived, AI-output, and execution-result data.
5. Define freshness, retention, access, and deletion rules.
6. Include missing, duplicate, stale, and conflicting values in evaluation data.
7. Version context selection, compaction, and memory-update policies and test constraint preservation.

## Deliverables

- Data contract
- Systems of record and their owners
- Glossary and metric definitions
- Data lineage
- Quality, freshness, and permission rules
- Context and memory policies with compaction, correction, and deletion test records

## Exit criteria

- Important outcomes are traceable to their source.
- The design distinguishes live workflow state from document retrieval.
- Missingness and sampling bias can be represented.
- Data owners and access approvers are confirmed.
- AI output does not overwrite source facts.
- Approval scope, prohibited actions, unfinished work, and source references survive compaction.
- Corrections and deletion reach later retrieval and execution, and current state is checked before acting.

## Stop signals

- Decisions are automated on replicated data whose system of record is unknown.
- Teams use the same term differently and defer its definition.
- Accuracy is calculated while collection scope and missingness are hidden.
- There is no realistic path to obtain the required data access.
