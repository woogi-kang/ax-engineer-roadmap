# Evaluation and Testing

## Why it matters

Inputs, retrieval, models, prompts, tools, policies, and external systems jointly produce workflow outcomes. A few good examples cannot reveal change impact. Without evaluation, model and workflow failures cannot be separated and versions cannot change safely.

## What to know

- Workflow success versus model-quality metrics
- Normal, edge, failure, and adversarial cases
- Deterministic, human, and model-assisted judgments
- Stage-level evaluation of retrieval, generation, tool choice, and action
- Offline and production evaluation
- Regression evaluation and change approval
- Sampling, missingness, bias, and rater agreement
- Cost, latency, and safety metrics

## How to decide

### Automated versus human judgment

Use deterministic checks for format, required values, prohibited content, and exact answers. Use a written rubric and representative examples for meaning, tone, and workflow fit. Treat model judging as assistance and compare it with human decisions.

### Offline versus production

Offline evaluation supports fast pre-change comparison. Production evaluation reveals real input distribution, corrections, exceptions, latency, and cost. Confirm privacy and usage rights before adding production data to eval sets.

### Final state and repeated runs

Judge completion claims separately from actual workflow results. For a booking task, check the reservation and duplicates in the source system as well as the response. Run each case repeatedly and retain trial counts, successes, critical failures, and cost and latency distributions. Distinguish the proportion of cases that succeed at least once across repeated trials from the proportion that succeed on every trial. [Anthropic's agent evaluation guide](https://www.anthropic.com/research/demystifying-evals-for-ai-agents) explains these distinctions (published 2026-01-09; checked 2026-10-26).

For independent trials, restore the same initial data before each attempt and isolate prior records, caches, and external changes. Keep duplicate-request and reconnection tests as separate scenarios that deliberately retain state.

Choose repetition counts and samples for the workflow's risk and cost. First verify that graders distinguish known correct and failed results, then retain per-case traces. Do not translate synthetic-data results into organizational productivity claims.

### What makes a version?

Record model, API, SDK, prompt, tool, execution-code (harness), context-policy, and evaluation-set versions together. When one changes, compare under identical inputs and authority. Give missing approval, duplicate writes, and unauthorized new work started after a cancellation request their own critical-failure gates, separate from average quality scores. Distinguish these from late completion of external work started before the request. Reconcile that result with the source system and recover within approved scope or hand it off.

## Practice

1. Collect representative real or public inputs.
2. Classify normal, edge, failure, and adversarial cases.
3. Define expected outcomes, rubrics, and raters.
4. Measure retrieval, generation, tool use, and workflow result separately.
5. Compare changes on the same set.
6. Review disagreements and revise the rubric.
7. Turn production failures into reproducible cases.
8. Repeat runs with lost constraints after compaction, expired approval, disconnection, partial success, and cancellation requests. Record final state and human correction time.

## Evidence

- Eval-set provenance and scope
- Rubric and judging role
- Baseline and changed results
- Failure taxonomy and examples
- [Total cost per accepted completed workflow](production-operations.md#total-cost-per-completed-workflow), latency, and safety comparison
- Per-case trial counts, final source state, and grader-validation results
- Regression block or exception approval
- Production-to-evaluation feedback history

## Failure patterns

- Hiding severe failures behind an average
- Selecting only easy normal cases
- Treating model-judge scores as absolute truth
- Combining retrieval and generation failure
- Ignoring user correction burden
- Using evaluation data without privacy and publication rights

## Collaborators

- Workflow owner: success, refusal, and human-judgment criteria
- Users: representative cases and correction burden
- Data and security: eval-data use
- Operations: regression blocks and emergency exceptions

## Sources

- [`PRIMARY_REPOSITORY` OpenAI Evals](https://github.com/openai/evals) — verified 2026-07-26
- [`PRIMARY_OFFICIAL` NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) — verified 2026-07-26
- [`PRIMARY_REPOSITORY` AI Agents evaluation content](https://github.com/nilbuild/developer-roadmap/tree/master/roadmaps/ai-agents/content)
