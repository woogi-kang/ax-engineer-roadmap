# LLM Foundations

## Why it matters

LLMs generate outputs probabilistically. Input formats and model names do not define quality, cost, latency, freshness, or provenance. Model behavior must become explicit workflow limits and evaluation conditions.

## What to know

- Tokenization and input/output length
- Context windows and information placement
- Generation controls and nondeterminism
- Structured output and schema validation
- Model capability, latency, cost, and data-processing terms
- Prompting, retrieval, and fine-tuning roles
- Embeddings and semantic retrieval
- RAG retrieval and generation stages
- Model-version change and regression risk

## How to decide

### Rule, classification, retrieval, or generation

- Use deterministic rules for explicit conditions.
- Consider classification for defined categories.
- Evaluate retrieval first when existing facts are needed.
- Use generation for new language or recommendations.

Separate the stages so failures can be diagnosed independently.

### RAG versus source query

RAG can support policy and manual questions. Live order, inventory, and approval status should come from source systems. Do not treat a retrieval index as the source of truth.

### Context selection and compaction

Separate execution instructions, current task state, retrieved material, and long-term memory. Retain source, retrieval time, and access scope, and include what the next decision needs. When clearing old tool results or compacting a conversation, verify that approval scope, prohibited actions, unfinished work, and source references survive. This exercise applies the compaction and structured-note guidance in [Anthropic's engineering article](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents) (published 2025-09-29; checked 2026-10-26). It is not a concept introduced in the second half of 2026.

A compacted summary is not the live source of truth. Requery order, permission, and approval state before acting. Test whether memory correction and deletion reach retrieval results and later runs.

### A larger model

Fix missing data, ambiguous instruction, bad retrieval, or unclear acceptance before changing model size. Compare quality, cost, and latency on the same evaluation set.

## Practice

1. Collect normal, edge, and failed inputs.
2. Compare a deterministic baseline with an LLM approach.
3. Evaluate retrieval and generation separately.
4. Define refusal and handoff for missing or conflicting sources.
5. Regression-test model, prompt, and context changes.
6. Test token, latency, and cost limits.
7. Run the same request before and after compaction and check preservation of approval scope, prohibited actions, and unfinished work.
8. Verify input format, tool calls, and error handling against the same criteria when the API or SDK changes.

## Evidence

- Model-selection decision and alternatives
- Model, prompt, and retrieval versions
- Evaluation set and results
- Token and latency measurements and [total cost per accepted completed workflow](production-operations.md#total-cost-per-completed-workflow)
- Context-selection, compaction, deletion policy, and constraint-preservation tests
- Source, refusal, and handoff rules
- Change approval and regression record

## Failure patterns

- Filling the whole context window because it is available
- Hiding retrieval provenance, freshness, and missingness
- Confirming quality from a few good examples
- Treating fluency as factual and workflow correctness
- Comparing model prices while ignoring integration, evaluation, and correction cost

## Collaborators

- Workflow owner: acceptable results and refusal
- Data owner: source, copy, and freshness
- Security and privacy: input, retention, and vendor terms
- Operations: cost, latency, and incident limits

## Sources

- [`PRIMARY_OFFICIAL` roadmap.sh, AI Agents Roadmap](https://roadmap.sh/ai-agents)
- [`PRIMARY_REPOSITORY` AI Agents content](https://github.com/nilbuild/developer-roadmap/tree/master/roadmaps/ai-agents/content)
