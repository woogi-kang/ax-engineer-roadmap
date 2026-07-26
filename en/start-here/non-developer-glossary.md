# AX Glossary for Non-Developers

The goal is not memorizing technical terms. Understand the decision or risk each term represents.

| Term | Meaning in a workflow | Question to ask |
|---|---|---|
| LLM | A model that reads and generates language; output can vary for the same input. | Who detects an incorrect result, and how? |
| Prompt | Instructions and context sent to a model; not a replacement for the entire workflow policy. | Who updates and tests it when rules change? |
| Token | A unit used to process text and calculate model cost; not identical to characters. | How are long-input cost and latency bounded? |
| Context | Instructions, documents, conversation, and state available to the current run. | Could stale or unauthorized information enter it? |
| RAG | Retrieval of relevant documents before generation; retrieved content is not automatically the source of truth. | Are source, freshness, and missingness visible? |
| Agent | A system that chooses steps and calls tools toward a goal; autonomy depends on design. | Which actions and stop conditions are allowed? |
| Agent Loop | Repeated observation, action selection, execution, and result review. | Where are step, cost, and permission limits enforced? |
| Tool call | A model request to search, read, send, or modify data. | Are read and write permissions separated? |
| API | A defined interface for systems to exchange data or execute functions. | Is it official, and are failures and duplicates handled? |
| MCP | A protocol for standardizing connections between AI applications and external tools or data. | Are connection, access control, and business approval kept separate? |
| Schema | A contract describing fields and types in inputs or outputs. | Are required fields, allowed values, and versions defined? |
| Evaluation set | Normal, edge, and failure cases with expected judgments. | Does it include difficult real cases and prohibited outcomes? |
| Regression evaluation | Retesting after model, prompt, or tool changes. | Are before and after results compared on the same criteria? |
| Human approval | An authorized person allows a proposed action after reviewing evidence and criteria. | What does the approver inspect, and when must they reject? |
| Least privilege | Granting only the read and write permissions required for the task. | Does a read-only step have modification rights? |
| Sandbox | An isolated environment that cannot affect customers, money, or live systems. | Are test and production data clearly separated? |
| Log | A record of who ran what, with which versions, and what happened. | Can causes be traced without storing excessive personal data? |
| Rollback | Returning to a prior version or procedure after failure. | Has the rollback actually been rehearsed? |
| Manual fallback | The official procedure people use when automation stops. | Are owner, required input, and response time defined? |
| Harness | A shared foundation for inputs, outputs, evaluation, approval, records, and recovery. | Does it reuse validated contracts or force the first project's stack? |

## Recommended reading order

1. [Persona Selector](persona-selector.md)
2. [Business Practitioner Track](../tracks/business-practitioner.md)
3. [Outcomes and Boundaries](../delivery-lifecycle/01-outcomes-and-boundaries.md)
4. [Workflow Discovery](../delivery-lifecycle/02-workflow-discovery.md)
5. [Safe Assistant Project](../projects/01-safe-assistant.md)
