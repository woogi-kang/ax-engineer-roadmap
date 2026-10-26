# Proficiency Levels

## 1. Use scope of responsibility, not tenure

AX Engineer proficiency is judged by the following questions, not by how long someone has used a particular technology.

Foundation through Lead are not validated industry standards or hiring grades. They are a working model proposed by this repository to help people choose their next learning and responsibility scope.

- What ambiguity can you resolve independently?
- How far can you deploy and operate directly?
- How do you control failure and risk?
- Can another person or organization take over the outcome?
- How far can learning from one case be reused?

## 2. Four levels

### Foundation

Analyze a workflow with bounded users, permissions, and outputs, then validate a safe prototype.

- Identify users, inputs, outputs, and success criteria for a given problem.
- Build a thin feature with public or non-sensitive data.
- Evaluate normal cases and basic failure cases.
- Do not yet own production permissions or workflow procedure changes independently.

Representative evidence:

- workflow discovery card;
- bounded prototype;
- evaluation cases and results;
- explicit hypotheses, constraints, and non-goals.

### Builder

Integrate one workflow with existing systems and deploy it into an operable state.

- Agree on scope, priorities, and stop conditions with the business team.
- Deploy with authentication, authorization, failure handling, and audit records.
- Complete user acceptance and operational handoff.
- Measure workflow metrics separately from model metrics.

Representative evidence:

- production deployment and reproducible code;
- execution and data contracts;
- evaluation and recovery records;
- user acceptance and handoff documentation.

### Operator

Continuously manage quality, cost, reliability, and actual use for deployed workflows.

- Detect and recover from incidents and quality degradation.
- Manage changes to permissions, cost limits, and evaluation criteria.
- Separate areas the business team may adjust from areas requiring engineering changes.
- Support the decision to retire or retain the old manual process.
- Reuse validated contracts and components in an adjacent second workflow and manage compatibility.

Representative evidence:

- operational metrics and SLOs;
- incident, recovery, and regression-evaluation records;
- actual-use and workflow-outcome reviews;
- change, version, and permission history;
- reuse and compatibility records across cases.

### Lead

Turn execution rules validated across workflows and teams into shared organizational capability.

- Manage the workflow portfolio and investment order.
- Set the boundary between a shared harness and team autonomy.
- Establish how security, data, business, and platform owners decide and act together.
- Feed recurring failure causes and operational feedback into the shared-foundation roadmap.
- Design an operating model in which the central team is not a bottleneck.

Representative evidence:

- comparisons and reuse rates across multiple cases;
- organization-level completion criteria;
- shared execution, evaluation, and audit foundations;
- evidence that business teams operate the workflow directly, plus role-transition records.

## 3. Expected levels by competency

| Competency | Foundation | Builder | Operator | Lead |
|---|---|---|---|---|
| Problem discovery | Structure a given problem | Agree on one workflow's scope with the business team | Improve or stop an operating workflow | Design portfolio and investment criteria |
| Workflow design | Map the current flow | Implement target and exception flows | Change official procedures and roles | Define shared contracts across teams |
| Data | Define a bounded data contract | Trace relationships and lineage across source, derived, and result data | Operate quality, freshness, and lineage | Define shared business terms, metrics, and ownership |
| Software | Build a tested prototype | Deploy and integrate one workflow | Operate reliability, cost, change, and compatibility | Build reusable foundations and scale policy |
| Applied AI | Perform basic evaluation | Add regression, safety, and human handoff | Run production evaluation and quality improvement | Define evaluation standards and model strategy |
| Security and operations | Identify risk | Implement permissions, logs, and recovery | Operate incidents, SLOs, and cost | Define organizational controls |
| Production use | Gather user feedback | Complete acceptance, training, and handoff | Manage regular use and retirement of the old process | Enable business teams to operate and improve directly |
| Standardization | Record reuse candidates | Template within one workflow | Reuse and version across a second workflow | Feed a shared-foundation roadmap |

### Records required to judge a level

| Level | Additional evidence |
|---|---|
| Foundation | Evaluation on unseen inputs, review outside implementation, and reasons for refusal or hold |
| Builder | Approval wait, permission revocation, duplicate and partial-success tests; actual-user acceptance and operating handoff |
| Operator | Reconnection, actual cancellation, policy service outage, and rollback exercises; total cost per completed workflow; regression and renewed acceptance after changes |
| Lead | Workflow-specific expand or stop decisions, policy exceptions and expiry, business-led operations and role changes, and change impact across workflows |

Completing a course or writing an assessment checklist does not raise a proficiency level. Present the environment, reviewer roles, first assessment, and reassessment results together. If work is limited to public simulation, leave production and organizational operating responsibility unverified. Use a new scenario when advancing and rerun existing regression evaluations after repairs.

## 4. Growth, not promotion

Moving to the next level does not require learning every technology again. Add the missing **responsibility and evidence** one piece at a time.

Examples:

```text
Foundation → Builder
Add authentication, permissions, failure handling, deployment, and user acceptance to a prototype.

Builder → Operator
Operate one deployment for at least four weeks and record changes in quality, cost, incidents, and actual use.

Operator → Lead
Turn a contract validated in two or more workflows into a foundation and operating model used across teams.
```

Someone may hold a senior title without the evidence above, while another person may carry Lead-level responsibility without the title. Use this model to choose learning and practice—not to rank people.
