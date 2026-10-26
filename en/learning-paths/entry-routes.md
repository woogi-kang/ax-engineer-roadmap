# AX Entry Routes for Different Backgrounds

Use your current experience to scope the first practice. Years of experience do not assign Foundation, Builder, Operator, or Lead. [Proficiency](../roadmap/proficiency-levels.md) depends on responsibility and verified results; these routes are not hiring qualifications or employment guarantees.

The [public role review](../research/ax-engineer-role-review.md) describes different responsibilities, including internal workflow implementation, shared foundations, and business-team support. These routes are learning recommendations based on those distinctions. They do not claim that early-career hiring is growing or that every vacancy requires the same preparation.

## Check before starting

Choose your responsibility with the [persona selector](../start-here/persona-selector.md) and assess [workflow readiness](../start-here/organization-readiness.md). Record the following for every route:

- What you will implement and which decisions belong to process, security, and operations owners
- Data sources and permitted use, test accounts, and execution authority
- A person who did not implement the work and can judge its results
- Stop conditions and a way back to the original workflow

The first P1 practice uses only public or synthetic data and makes no external business-system changes. The external-action restriction covers customer-facing sends, publication, and business-system writes. Input processing by an authorized local model or model API is checked separately under [P1's data, account, and cost conditions](../projects/01-safe-assistant.md). Without organizational data or production authority, simulation remains possible, but it does not establish real adoption or organizational outcomes. Without an independent reviewer, record self-check results and defer the pass decision.

## Choose the closest starting point

| Current experience | Gap to check first | Starting practice | Example first artifact |
|---|---|---|---|
| Little or no development experience | Inputs, outputs, running code, reading errors, and reproducing evaluation | Implement a small P1 assistant | Answers from a public manual, with sources and refusals |
| Web, backend, data, or automation development experience | Workflow baseline, AI evaluation, approvals, and operational handoff | Verify P1, then P2 and P3 integration | A synthetic-request classification service and evaluation record |
| Strong domain experience with limited development experience | Decisions as a collaborator versus implementation owned as an engineer | Collaborate on P1/P2, or begin the engineering transition by implementing P1 | Missing-evidence and review-rationale table for synthetic expense requests |

Every route begins with P1. Existing code and experience may be reused, but they do not waive P1–P4 pass criteria. P4 follows the requirements and decision labels of its organizational or public-simulation setting; both require execution, recovery, and independent-review records. For prior practice, a reviewer must confirm that its evidence remains valid for the present data, permissions, versions, and workflow conditions.

## 1. Little or no development experience

| Item | Action |
|---|---|
| Check before starting | Can you read input, produce a defined output, and investigate an error message? If not, learn file reading, function writing, and test execution as separate prerequisites. [Software and APIs](../technical-foundations/software-and-api.md) then provides integration, authority, and failure-handling criteria. |
| Data and authority | Choose one usable public manual and record its source and version. Do not use real customer or employee data, business-system accounts, or send/modify tools. |
| Small first artifact | Build a P1 assistant that answers with a supporting passage or explicitly declines to answer. Compare a rule-based baseline and record how to run it, cost, latency, and failures. |
| Review and stopping | Prepare at least 20 normal, boundary, and failure cases as required by [P1](../projects/01-safe-assistant.md). Another person checks sources and refusals with new inputs. Stop for private inputs, repeated unsupported answers, or unverified cost/latency limits. |
| Next step | After passing P1, build P2 so an approver can judge evidence and before/after changes. Record P2 decisions as simulated execution. Test actual writes in P3's isolated environment; production writes require organizational P4 conditions and separate approval. |

Even when a coding tool helps, you must explain inputs, outputs, and failure causes and rerun the evaluation. If you practiced decisions in documents or tables, label that scope rather than claiming verified executable implementation.

## 2. Existing developers moving into AX work

| Item | Action |
|---|---|
| Check before starting | Apart from API or deployment experience, can you explain the workflow's current completion time, error/correction burden, and final approver? Separate AI-output evaluation from workflow-completion judgment when they differ. |
| Data and authority | Begin P1 with synthetic requests and test inputs. Prepare separate test accounts and least privilege for the systems you will connect in P3. Do not bring business-system production credentials or existing personal accounts into practice. |
| Small first artifact | Build a P1 service that classifies synthetic support requests and returns reasons and hold conditions. Reusing a service skeleton does not remove P1's minimum 20 evaluation cases or review on new inputs. |
| Review and stopping | A process owner reviews classification and hold criteria; an independent reviewer checks execution and failure records. Do not expand authority if later P2/P3 work cannot distinguish approval bypass, duplicate execution, or partial success. |
| Next step | After passing P1, use P2 to verify request IDs, approval-target versions, and cancellation state; then test integration and recovery across two test systems in P3. Consider organizational P4 when real operators and users, deployment approval, and stop authority are ready; otherwise check the P4 public-simulation requirements. |

Do not treat a familiar framework as the answer to the new workflow. Compare simplifying the work and using existing capabilities. Prior production experience does not replace evaluation, approval, or handoff evidence for this workflow.

## 3. People with domain expertise

A domain expert can contribute as a collaborator who owns workflow judgment. An engineering transition separately requires readiness to own implementation and failure handling. Domain knowledge alone does not grant data-use or deployment authority in either route.

| Item | Collaborate as a business practitioner | Prepare for an engineering transition |
|---|---|---|
| Check before starting | Explain normal handling, exceptions, supporting evidence, and the impact of a wrong decision. | Also check code execution, error repair, and test reproduction. Practice software fundamentals where needed. |
| Data and authority | Create public rules and synthetic expense requests instead of copying real cases. Name data and approval owners separately. | Use the same data to build a P1 without external actions. Real organizational data belongs to a later step after permitted use is confirmed. |
| Small first artifact | Create a review table covering missing evidence, reasons to hold, and escalation conditions, plus normal, boundary, and failure evaluation inputs. | Build code that returns missing evidence and its basis for those inputs, with run instructions and evaluation records. |
| Review and stopping | The implementer explains how outputs relate to the criteria; another domain reviewer checks the criteria. Do not finalize an action when source rules conflict or an approver is missing. | Complete P1's minimum 20 evaluation cases and review on new inputs. Stop for unsupported judgments, private inputs, or failures that cannot be reproduced. |
| Next step | Validate P2 approval criteria, correction reasons, and manual fallback with an engineer. Explicitly name the owner of P3 implementation, deployment, and recovery. | Pass P1, then perform P2 and P3 in order. Move to P4 when real operational conditions are ready, or perform an operational simulation when they are not. |

Record acceptance and SOP artifacts as contributions to the [business-practitioner path](../tracks/business-practitioner.md). They do not by themselves verify engineering implementation or deployment responsibility. If you choose the transition, use the [AX Engineer execution path](../tracks/ax-builder.md) to identify technical areas you will own and people whose help you need.

## Evidence needed before progressing

| Stage | Evidence needed for the next stage |
|---|---|
| [P1 Safe assistant](../projects/01-safe-assistant.md) | Sources, refusals, normal/boundary/failure evaluation, and independent review. No external actions. |
| [P2 Human-approved workflow](../projects/02-human-approved-workflow.md) | Approval target/version, approver authority, rejection/cancellation/expiry records, and blocked approval bypass. |
| [P3 Sandbox integration](../projects/03-sandbox-integration.md) | Isolated accounts, duplicate/partial-success handling, and executed stop, recovery, and manual-fallback records. |
| [P4 Production pilot](../projects/04-production-pilot.md) | Real users and operators, authorized scope, operational/cost/workflow measures, incident response, and handoff. Label simulation separately. |

This table summarizes rather than replaces the [project pass criteria](../projects/README.md). When organizational data or authority is missing, defer live operation and check whether an authorized test environment can meet P4 simulation requirements. Without a test environment or independent reviewer, retain design work and defer P5 execution verification. A P4 simulation is not production operating experience.

After checking this evidence, connect the plan to the [12-week practice path](12-week-practice.md). Twelve weeks organizes the work; it does not guarantee a proficiency level or employment within that period.
