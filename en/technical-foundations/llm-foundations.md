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

### A larger model

Fix missing data, ambiguous instruction, bad retrieval, or unclear acceptance before changing model size. Compare quality, cost, and latency on the same evaluation set.

## Practice

1. Collect normal, edge, and failed inputs.
2. Compare a deterministic baseline with an LLM approach.
3. Evaluate retrieval and generation separately.
4. Define refusal and handoff for missing or conflicting sources.
5. Regression-test model, prompt, and context changes.
6. Test token, latency, and cost limits.

## Evidence

- Model-selection decision and alternatives
- Model, prompt, and retrieval versions
- Evaluation set and results
- Token, cost, and latency measurements
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
- [`PRIMARY_REPOSITORY` AI Agents content](https://github.com/nilbuild/developer-roadmap/tree/master/src/data/roadmaps/ai-agents/content)
