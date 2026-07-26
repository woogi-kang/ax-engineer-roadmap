# Organization Readiness

Readiness is not a score for company size or industry. It helps determine how a specific workflow should start now. Customer support and settlement workflows can have different readiness inside the same company.

## Three starting conditions

| Condition | Observable state | First approach |
|---|---|---|
| IT-native | Source systems and APIs exist; permission, deployment, and log owners are known. | Select one narrow workflow and connect evaluation, approval, and operations quickly. |
| SaaS-centered | Data exists in collaboration, finance, or CRM SaaS, but configuration and terminology differ by team. | Align account ownership, export, identifiers, permissions, and change history first. |
| Low-digital | Messaging, email, files, and manual records dominate; current state or ownership is unclear. | Establish workflow records, minimum input rules, owners, and exception flow before AI. |

These are not maturity levels. Low-digital workflows can start with safe assistance, while an IT-native workflow without accountability or recovery is not production-ready.

## Check six areas

Mark every item as `confirmed`, `partly confirmed`, or `unknown`.

### 1. Workflow

- Trigger and completion state are clear.
- Owners, wait time, exceptions, and handoffs reflect actual work.
- A baseline exists for time, cost, errors, and corrections.

### 2. Data

- A source system or official document defines current truth.
- Data owners and business terms are known.
- Missing, duplicated, and stale data are understood.

### 3. Systems

- Access uses organizational rather than personal accounts.
- There is an official way to read and write required data.
- A test environment or no-side-effect simulation is available.

### 4. Permission and risk

- Prohibited AI actions are written down.
- Data use, result approval, deployment, and stop owners are known.
- Privacy, confidentiality, and customer-impact reviewers are available.

### 5. Operations

- Logs or records can reveal failures.
- Stop, recovery, and manual fallback paths exist.
- Someone other than the implementer can own operations.

### 6. Adoption

- Real users participate in design and validation.
- Effects on official SOPs and KPIs are understood.
- Parallel operation and retirement criteria can be defined.

## Choose the starting point

### Unknowns cluster in workflow and data

Complete a [Workflow Discovery Card](../toolkit/workflow-discovery-card.md) before selecting an AI tool. Review a week of real cases and confirm triggers, completion, and exceptions.

### Unknowns cluster in systems and permissions

Block external actions and use public or synthetic data. Start with the [Safe Assistant Project](../projects/01-safe-assistant.md).

### Unknowns cluster in operations and adoption

Improve approval, logs, recovery, user acceptance, and SOPs before adding features. Move to the [Human-Approved Workflow](../projects/02-human-approved-workflow.md).

### Most items are confirmed

You may consider a [Production Pilot](../projects/04-production-pilot.md). Keep the scope to one low-risk workflow and agree on stop conditions before deployment.

## Readiness versus AX maturity

[Organization AX Maturity](../organization-maturity/README.md) asks whether shared delivery and operating capabilities repeat across workflows. This document asks whether one workflow can start now. High readiness does not imply high maturity, and a mature organization must reassess readiness in a new domain.
