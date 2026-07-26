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

## Practice

1. Collect representative real or public inputs.
2. Classify normal, edge, failure, and adversarial cases.
3. Define expected outcomes, rubrics, and raters.
4. Measure retrieval, generation, tool use, and workflow result separately.
5. Compare changes on the same set.
6. Review disagreements and revise the rubric.
7. Turn production failures into reproducible cases.

## Evidence

- Eval-set provenance and scope
- Rubric and judging role
- Baseline and changed results
- Failure taxonomy and examples
- Cost, latency, and safety comparison
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
- [`PRIMARY_REPOSITORY` AI Agents evaluation content](https://github.com/nilbuild/developer-roadmap/tree/master/src/data/roadmaps/ai-agents/content)
