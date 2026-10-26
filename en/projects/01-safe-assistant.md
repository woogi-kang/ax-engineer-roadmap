# Project 1. Safe Assistant

## Goal

Build an assistant that uses only public or synthetic data and makes no external business-system changes. Prove provenance, refusal, evaluation, and limits before optimizing generation.

## Suggested workflows

- Public policy or manual Q&A
- Public VOC classification and summary
- Action-item drafts from synthetic meeting notes
- Draft comparison tables from public product data

Do not use customer or employee personal data, confidential business data, or production business accounts. In P1, `no external action` means no customer-facing sends, publication, or writes to business systems.

Sending public or synthetic inputs to an authorized local model or model API to obtain inference responses is a processing request, distinct from performing business actions. Before using an API, verify authority to use the test account and model, data-transfer/retention/training conditions, and cost limits. A model API connection does not permit adding send or write authority for business tools. Compare rule-based and LLM approaches within this processing scope.

## Flow

```text
Question or document
→ input-scope check
→ retrieval, classification, or generation
→ source and uncertainty shown
→ human acceptance
→ result and correction reason recorded
```

## Tasks

1. Define user and completion without naming a tool.
2. Compare a deterministic baseline with an LLM approach.
3. Record public or synthetic data provenance and missingness.
4. Build at least 20 normal, edge, and failure cases.
5. Refuse unsupported, conflicting, and prohibited requests.
6. Record quality, cost, and latency per run.
7. Have another person apply the rubric.

## By role

- Business practitioner: cases, rubric, prohibited questions, corrections
- AX Engineer: retrieval, generation, structured output, evaluation
- Leader and governance: scope, stop, and publication approval
- Data, security, operations: provenance, prohibited storage, records

## Evidence

- Current and target flow
- Data provenance and use scope
- Evaluation set and rubric
- Baseline comparison
- Source, refusal, and uncertainty output
- Quality, cost, and latency results
- Failures and next decision

## Exit criteria

- No external business system is modified, and no customer-facing sending or publication occurs.
- Users can inspect source and scope.
- At least 20 evaluation cases cover normal, edge, and failure conditions. Their sources, refusals, and failure behavior are checked, not just the case count.
- Unknown and prohibited questions are not guessed.
- A reviewer other than the implementer confirms outcomes and limits.

## Independent review of unseen inputs

A reviewer prepares normal, edge, and failure inputs not used in development, including conflicting sources and missing information. Evaluate both the response and the decision to refuse. The reviewer must be able to compare the result with its sources without an explanation from the implementer.

Preserve the first assessment before making changes, then retest previous failures and unseen inputs. Record pass decisions, reasons for corrections, and unresolved limits separately. Adding assessment requirements does not raise a case's implementation stage.

## Stop conditions

- Non-public data enters the system.
- Unsupported answers are repeatedly presented as facts.
- Failed evaluation cases are hidden.
- Cost or latency cannot be measured.

## Before moving on

Can a person detect when the output is wrong? If so, add action through a [Human-Approved Workflow](02-human-approved-workflow.md), not immediate automation.
