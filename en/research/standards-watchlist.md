# Standards and proposals to review

Checked: `2026-10-26`

This list identifies standards and product support to revisit. Reading a planning document does not verify adoption of each proposal or support in a product. Learners can use supported approaches now without waiting for proposals to be accepted.

## Plans reviewed

| Item | What the source establishes | Question for the roadmap |
|---|---|---|
| Agent identity and delegation | The MCP plan dated 2026-08-22 includes agent identity, narrower delegated authority, and integration with existing authentication standards | Which specification and product combinations let us verify caller identity, ownership, delegation scope, and revocation records? |
| Tool discovery and result representation | The same plan proposes progressive discovery and result-handling improvements | Do tool-selection errors and context costs actually decrease as the catalog grows? |
| Long-running work and events | The same plan describes improving how Tasks, events, and other execution mechanisms compose | What must change in the existing state-query, reconnection, and duplicate-prevention exercises? |
| Skills governance | The AAIF donation announcement dated 2026-10-22 proposes versioned releases, a proposal process, and security guidance | What needs reverification in distribution, installation review, compatibility, and retirement? |

Sources: [MCP plan, 2026-08-22](https://blog.modelcontextprotocol.io/posts/mcp-roadmap/), [Agent Skills donation, 2026-10-22](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation). Both were read on 2026-10-26. This is not a review of the latest adoption status of each proposal or support across all products.

Distinguish existing standards such as DPoP and token exchange, identity features already offered by vendors, and shared integration conventions being developed by MCP. Use [tools and MCP](../technical-foundations/tools-and-mcp.md) for the current baseline and optional extensions. Check the [Agent Skills specification](https://agentskills.io/specification) for the current file format. This list does not relax existing authority, evaluation, or recovery criteria.

## Criteria for inclusion in the core curriculum

The following are repository editorial criteria, not fields required by an external standard.

| Check | Record |
|---|---|
| Document status | Evidence for proposal, draft, optional extension, released specification, or deprecation status |
| Actual support | Tested Host, Server, SDK, and product versions, configuration, and check date |
| Workflow impact | Changes to inputs, outputs, authority, state, and cost, plus unaffected scope |
| Validation | Comparison with the prior approach using the same inputs and initial state; failures, revocation, duplicates, and recovery records |
| Migration and recovery | Compatibility window, rollback version, owner, and retain-or-retire decision for the prior approach |

A released specification is not a mandatory exercise requirement when the chosen product does not support it. Label beta features and proposals as optional experiments. A new feature alone does not justify deleting existing acceptance criteria or evaluation results.

## When to review again

Revisit an item after an official release or deprecation notice, a change in the product or SDK being used, or a problem the existing approach cannot solve. If the source is inaccessible, mark it unverified and retain the last successful reading date.

| Review date | Item, source, and version | Prior status | Verified change | Retain, experiment, adopt, or hold | Affected documents and evaluation records |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

Keep sources in the [evidence ledger](../toolkit/evidence-ledger.md) and before-and-after comparisons in the [experiment card](../toolkit/experiment-card.md).
