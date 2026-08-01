# Review of Developer and AI Agent Roadmaps

> Verified: 2026-07-26

## A distinction to make first

[`nilbuild/developer-roadmap`](https://github.com/nilbuild/developer-roadmap) is the public repository behind [`roadmap.sh`](https://roadmap.sh/). They are not two independent roadmaps. This review reads the repository files, contribution rules, and the [`AI Agents Roadmap`](https://roadmap.sh/ai-agents) together to decide what this AX Engineer roadmap should adopt and what it must add.

This roadmap does not claim to be a standard only for Korean companies. It keeps common AX principles as the core and treats Korean approval, authority, regulation, and digital foundations as explicit application conditions.

## Structures worth adopting

### Show the whole path, then let readers enter where needed

roadmap.sh presents a complete path as clickable nodes with concise explanations and learning resources. Beginner paths, related roadmaps, projects, and questions are linked separately. Readers do not have to read one long document in order to locate their current position or next topic.

This repository adopts the following:

- Show the full structure before linking to detailed documents.
- Vary the starting point by role and organizational readiness.
- Connect concepts to practice projects and verifiable evidence.
- Keep the overview concise while preserving decisions, practice, and failure conditions in source documents.

### Curate current essentials instead of building the largest list

The developer-roadmap contribution guide explicitly says that listing everything is not the goal. It asks contributors to select what a current entrant needs, keep each topic explanation to roughly one paragraph, and limit and classify learning resources.

The same rule fits AX. A growing list of framework names becomes stale quickly and obscures selection criteria. This roadmap therefore treats product names as current implementation examples or sources, not core competencies.

## What the AI Agents Roadmap covers well

The public [`ai-agents` content directory](https://github.com/nilbuild/developer-roadmap/tree/master/roadmaps/ai-agents/content) covers:

1. Backend basics, Git and terminal use, and REST APIs
2. LLMs, tokens, context windows, generation controls, and model cost
3. Agents and the Agent Loop
4. Prompt engineering
5. Tool use, function calling, and MCP
6. Short- and long-term memory
7. Architectures such as RAG, ReAct, Planner–Executor, and DAGs
8. Manual, native-model, and framework-based implementation
9. Unit and integration evaluation, human review, and metrics
10. Structured logging, tracing, and observability
11. Privacy, sandboxing, prompt attacks, and safety testing

This is a useful technical scope for AX Engineers, especially because it reaches beyond model usage into evaluation, operations, and security.

## What an AX Engineer roadmap must add

Building an AI agent does not by itself change an organization's work. A technical learning list does not fully answer the following:

| Missing question | Why AX needs it |
|---|---|
| Which workflow should change first? | A valuable workflow may still be unfit for production if data, permissions, or recovery are not ready. |
| What should be removed or simplified? | Waste in the current process should not be automated as-is. |
| Which source defines the current truth? | Document retrieval and live order, inventory, or approval status are not the same kind of fact. |
| Who approves and remains accountable? | “A human reviews it” does not define authority or responsibility. |
| Where does failure stop? | Work affecting customers, money, employment, or safety needs recovery and manual fallback. |
| How does it become official work? | A new tool without changes to SOPs, KPIs, roles, and support leaves duplicate work behind. |
| What is reused in the second workflow? | The first implementation cannot be declared an enterprise standard without reuse evidence. |

This roadmap therefore connects technical foundations to an eight-stage workflow transformation. Technology is a means to change work safely, not a separate destination.

## Additional conditions for Korean organizations

This roadmap does not reduce Korean companies to one culture. It does make the following conditions explicit based on public policy and practical adoption constraints.

### Uneven digital foundations

A 2024 survey cited by Korea's Ministry of SMEs and Startups reported gaps in AI usage between SMEs and large enterprises and between non-capital and capital-region firms. A separate survey of manufacturing SMEs cited initial cost, lack of staff, and lack of strategy as leading barriers. A roadmap that assumes every reader already has APIs and governed data excludes low-digital organizations at the first step.

This repository classifies starting points by actual workflow records, source systems, access, and operating ownership—not by industry or company size.

### Approval lines and actual decision rights

Record who can scope the workflow, authorize data, approve deployment, stop operations, and retire the old process. Use role names rather than personal names so accountability survives staff changes.

### Privacy and AI governance

Korea's Personal Information Protection Commission guidance addresses the full generative-AI lifecycle: purpose, source verification, access control, pre-deployment testing, transparency, and internal governance led by the privacy officer. Security and privacy should not be a final paperwork step.

The Enforcement Decree of the AI Basic Act has been in effect since July 21, 2026. It includes transparency duties for high-impact and generative AI products and services and an exception for internal-only use. Legal applicability must be rechecked with legal, privacy, and security owners against current law. This roadmap is not legal advice.

### Official workflow change, not just adoption

Seats, logins, and generations are not enough. Measure completion time, correction burden, exceptions, support demand, and whether the old procedure was retired. Frontline users and local champions should participate in validation and support design.

### Vendor dependence and exit planning

Procurement should cover service-account ownership, data export, log retention, model or vendor replacement, deletion after contract termination, and return to manual work. Purchase and recovery decisions belong in the same operating model.

## Decisions reflected in this repository

```mermaid
flowchart LR
    A["Confirm the role and readiness"] --> B["Transform one workflow through eight stages"]
    B --> C["Build the technical capabilities required by that workflow"]
    C --> D["Practice through five projects"]
    D --> E["Operate, reuse, and expand across the organization"]
```

- [Start Here](../start-here/README.md) comes before developer prerequisites.
- [Collaboration role guides](../tracks/README.md) include non-developers and shared accountability.
- [Technical capabilities](../technical-foundations/README.md) provide implementation depth for AX Engineers.
- [Practice projects](../projects/README.md) require reviewable results, not feature completion alone.
- The interactive map is a navigation layer; Markdown remains the source of truth.

## Sources

- [`PRIMARY_REPOSITORY` nilbuild/developer-roadmap](https://github.com/nilbuild/developer-roadmap) — verified 2026-07-26
- [`PRIMARY_OFFICIAL` roadmap.sh, AI Agents Roadmap](https://roadmap.sh/ai-agents) — verified 2026-07-26
- [`PRIMARY_REPOSITORY` AI Agents roadmap source](https://github.com/nilbuild/developer-roadmap/tree/master/roadmaps/ai-agents) — verified 2026-07-26
- [`PRIMARY_REPOSITORY` developer-roadmap contribution guidelines](https://github.com/nilbuild/developer-roadmap/blob/master/contributing.md) — verified 2026-07-26
- [`PRIMARY_OFFICIAL` Ministry of SMEs and Startups, regional AI transformation program](https://www.mss.go.kr/site/smba/ex/bbs/View.do?bcIdx=1060505&cbIdx=86) — verified 2026-07-26
- [`PRIMARY_OFFICIAL` Ministry of SMEs and Startups, Smart Manufacturing Innovation 3.0](https://www.mss.go.kr/site/smba/ex/bbs/View.do?bcIdx=1062738&cbIdx=86) — verified 2026-07-26
- [`PRIMARY_OFFICIAL` PIPC, generative AI privacy guidance summary](https://m.pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS212&mCode=C040030000&nttId=11360) — verified 2026-07-26
- [`PRIMARY_OFFICIAL` Korean Law Information Center, AI Basic Act Enforcement Decree Article 23](https://www.law.go.kr/lsLinkCommonInfo.do?lspttninfSeq=198075) — verified 2026-07-26
