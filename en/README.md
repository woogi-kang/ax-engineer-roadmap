# AX Engineer Roadmap

[한국어](../README.md) · [English](README.md)

An **AX Engineer** identifies work AI can help with, integrates it with existing systems, and takes responsibility for implementation, evaluation, and operations. Together with the process owner, the engineer decides what can be automated and where human judgment must remain.

This roadmap helps aspiring AX Engineers **understand the role, develop the required skills, and build artifacts they can explain**. AX here means AI Transformation; titles and responsibilities vary across organizations.

## What you can get from this repository

### Understand roles and hiring requirements

Read how public job material divides workflow discovery, implementation, evaluation, operations, and support for business users. Compare internal AX and customer-facing technical roles to clarify **the work you want to own and the experience you need to develop**.

[Roles and responsibility boundaries](roadmap/role-model.md) · [Roles observed in job material](research/ax-engineer-role-review.md) · [Job-posting records](research/hiring-signals.md)

Job material is a dated research record. Check the original posting for current availability.

### Map the technology and skills to learn

Explore software and APIs, LLMs, agents, tools and MCP, evaluation, operations, and security. Each area covers concepts as well as **when to choose an approach and what to test**. Use the competency and proficiency frameworks to separate work you have done from responsibilities you still need to demonstrate.

[Seven technical foundations](technical-foundations/README.md) · [Competency framework](roadmap/competency-map.md) · [Proficiency criteria](roadmap/proficiency-levels.md)

### Learn the sequence for changing a workflow

Follow eight stages from goals and current-workflow discovery through redesign, data preparation, execution controls, deployment and operations, adoption, and scale. Tasks, deliverables, and pass/stop criteria help you describe **the current workflow and the one you intend to build**.

[Eight-stage workflow transformation](delivery-lifecycle/README.md) · [Organization readiness](start-here/organization-readiness.md) · [Korean organizational conditions](research/roadmap-benchmark-review.md)

### Build artifacts through projects

Choose a first task suited to your experience, then expand its scope through P1-P5. Use the organization track when you have access, or the public-simulation track when you do not. The projects explain what to retain alongside code: **evaluation, approval, failure, and recovery records**.

| Practice | Target artifact |
|---|---|
| [P1 · Safe assistant](projects/01-safe-assistant.md) | Assistance with sources, refusal conditions, and evaluation |
| [P2 · Accountable approval](projects/02-human-approved-workflow.md) | Simulated execution recording approval, rejection, and cancellation |
| [P3 · Sandbox integration](projects/03-sandbox-integration.md) | Isolated integration with duplicate and failure-test records |
| [P4 · Operating pilot](projects/04-production-pilot.md) | Acceptance and recovery records from limited operations or an executed simulation |
| [P5 · Reuse in a second workflow](projects/05-second-workflow-reuse.md) | What was reused and decisions to retain, revise, or retire it |

[Practice and exit criteria](projects/README.md) · [Entry routes by experience](learning-paths/entry-routes.md) · [12-week practice path](learning-paths/12-week-practice.md)

These are learning targets. Check each stage's exit criteria and do not present simulations as organizational operating experience.

### Find an application in familiar work

Compare systems of record, approval points, and failure handling across **15 workflow cases**, including VOC analysis, meeting follow-ups, employee access, card expenses, and inventory exceptions. Use them to choose a first task or identify conditions that differ from your own workflow.

Runnable example: **1** · Design documents: **14** · [Workflow cases and implementation scope](case-studies/README.md)

The runnable example uses synthetic data and rule-based code to implement partial P1 functionality. It does not demonstrate model calls, human approval processing, or full P1 completion. The separate [catalog of 40 Korean and international public cases](research/public-ax-cases.md) examines workflows and reported outcomes from outside organizations, with evidence and limitations.

<details>
<summary>One runnable example: why a classification can still need more information</summary>

> “The pump will not press, so I cannot get the contents out.”

This is a translation of synthetic VOC `voc-006`. It is classified as a packaging issue (`packaging`), but the missing product ID flags it for further review (`review_required`). Explaining what was classified and what information is still needed is part of AX engineering.

Write one line for why this inquiry needs further review and one for what the reviewer should confirm. Explore the [example and its artifacts](case-studies/beauty-d2c-voc/README.md#current-execution-evidence), or reproduce it with the [runbook](case-studies/beauty-d2c-voc/RUNBOOK.md). No external account or API is required.

</details>

### Take templates and collaboration criteria into your work

Use discovery cards, candidate scorecards, execution rules, experiment cards, and evidence ledgers to record **what needs agreement and which evidence to retain**. The guides also explain responsibilities shared with business, leadership, data, security, and operations partners, and what to standardize after a second workflow.

[Working templates](toolkit/README.md) · [Collaboration roles](tracks/README.md) · [Shared operating foundations and scale](delivery-lifecycle/08-standardization-and-scale.md)

## Where should you start?

- **If the role and terminology are unfamiliar:** read the [role model](roadmap/role-model.md) and [non-developer glossary](start-here/non-developer-glossary.md).
- **If you want a first task that fits your experience:** use the [entry routes](learning-paths/entry-routes.md) to identify prerequisites and an initial artifact.
- **If you want to start by running code:** reproduce the published result with the [synthetic VOC runbook](case-studies/beauty-d2c-voc/RUNBOOK.md).

## Scope and participation

Runnable examples, design targets, and outside organizations' reports are distinguished. Source verification dates and limitations are recorded in the [research documents](research/README.md), while changes appear in the [changelog](CHANGELOG.md). This roadmap does not guarantee employment or proficiency within a fixed period.

[Contribute](CONTRIBUTING.md) · [Questions and support](SUPPORT.md) · [Source policy](research/source-policy.md) · [Governance](GOVERNANCE.md) · [Security](SECURITY.md) · [Code of conduct](CODE_OF_CONDUCT.md)

Latest release: `v0.4.0` · Previous release: `v0.3.0` · [MIT License](../LICENSE)
