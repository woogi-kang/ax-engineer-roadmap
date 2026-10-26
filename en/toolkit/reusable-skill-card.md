# Reusable Skill Review Card

Use this card to decide whether a repeated procedure belongs in a Skill and to record results across two workflows. It supports the optional exercise in [Project 5](../projects/05-second-workflow-reuse.md). Record a decision not to adopt when documentation or deterministic code is the better option.

This is a documentation template. It does not install a Skill or provide executable integration code. Mark results as `planned / sandbox-tested / verified in operation`; leave unperformed checks as `not run`.

## 1. Adoption decision and scope

| Field | Record |
|---|---|
| Repeated procedure and current problem |  |
| Owners of workflows A and B |  |
| Reason for choosing over documentation, a checklist, or deterministic code |  |
| Applicable requests |  |
| Inapplicable requests and human-handoff conditions |  |
| Decisions retained by people |  |
| Adopt / defer / do not adopt, with rationale |  |

Keep procedures workflow-specific when they change too often to establish a baseline or their approval and acceptance rules cannot be described together. Do not broaden authority or remove distinct exceptions to enable reuse.

## 2. Standard format and separate review record

An Agent Skills `SKILL.md` contains YAML frontmatter and a body; `name` and `description` are the required frontmatter fields. The following is a documentation example of the format, not a deployed executable Skill. [Official specification](https://agentskills.io/specification) (checked 2026-10-26).

```markdown
---
name: review-work-request
description: Identify required information and human review items in a workflow request. Do not use for requests to send externally or change system state.
---

1. Identify the workflow and required material.
2. When material is missing or conflicting, prepare questions for its owner.
3. Return a sourced review draft separately from unresolved review items.
```

The following tables are this roadmap's review records, not required Agent Skills frontmatter fields. The specification marks `allowed-tools` as experimental, with support varying by implementation. Naming a tool does not grant actual execution authority. Check execution-environment permissions and workflow approval separately.

| Review field | Record |
|---|---|
| Reviewed files, change version, and content identifier |  |
| Original URLs and check dates for procedures and references |  |
| License and reuse, modification, and distribution conditions |  |
| Maintainer and workflow reviewer |  |
| Required documents, data, and access scope |  |
| Script, package, Host, and other dependencies with versions |  |
| Network, file, and tool access and potential external changes |  |
| Pre-installation review, reviewer, and unresolved items |  |
| Supported and unsupported environments |  |

Review bundled scripts and references as well as instructions before installation. Do not redistribute material whose provenance or license is unresolved. Keep credentials out of the card and Skill body.

## 3. Differences between workflows A and B

For example, customer-inquiry drafts and internal IT-support drafts may share a material-review procedure. Keep customer-response policy, internal permissions, and approvers specific to each workflow. This is a design example, not a verified reuse result.

| Comparison | Workflow A | Workflow B | Shared / specific / not adopted |
|---|---|---|---|
| Request and expected outcome |  |  |  |
| Required source material and freshness |  |  |  |
| Input and output formats |  |  |  |
| Applicable and inapplicable conditions |  |  |  |
| Tool and data authority and approval |  |  |  |
| Failure, uncertainty, and human handoff |  |  |  |
| Acceptance criteria and evaluation set |  |  |  |
| Shared procedure and workflow-specific configuration or references |  |  |  |
| Unchanged files and modified parts |  |  |  |

## 4. Activation and failure tests

Define expected behavior before testing synthetic inputs in a restricted environment. Restore initial state between ordinary repeated quality trials. For deduplication or resumption tests that need previous state, record why state is retained and the starting conditions. Follow [Evaluation and Testing](../technical-foundations/evaluation-and-testing.md).

| Test | Input conditions | Expected behavior | A result | B result | Evidence location |
|---|---|---|---|---|---|
| Applicable request | In-scope request with valid material | Return the defined output and sources |  |  |  |
| Inapplicable or mistaken activation | Similar wording for a different workflow | Do not apply the Skill; route to the appropriate procedure or owner |  |  |  |
| Missing material or stale procedure | Missing required material or retired rules | Request an update or confirmation without inventing missing facts |  |  |  |
| Conflicting procedures | Conflicting instructions from two Skills or references | Record the conflict and seek a decision from the designated owner |  |  |  |
| Malicious material | Execution instructions hidden in external content | Do not obey source content as instructions; block prohibited actions |  |  |  |
| Authority expansion | Tool or data access beyond approval | Reject or hand off without expanding its own authority |  |  |  |
| Dependency failure | Unavailable tool, package, or material | Report incomplete scope and hand off to manual processing |  |  |  |
| Change and rollback | New version and restoration of the prior version | Meet A and B regression criteria and record the version used |  |  |  |

Review the reason for non-activation, actual tool use, output, and handoff as well as activation. A good draft does not pass if the Skill ran outside its scope or exceeded authority.

## 5. Before-and-after reuse comparison

| Measure | A before / after | B before / after | Conditions and gaps |
|---|---|---|---|
| Accepted completed workflows |  |  |  |
| Mistaken activation, omissions, and critical failures |  |  |  |
| Review and rework time |  |  |  |
| Time to add the workflow and change scope |  |  |  |
| Maintenance and operating burden |  |  |  |
| Total cost per accepted completed workflow |  |  |  |

Compare each workflow before and after with the same inputs, authority, and acceptance conditions. Do not combine different A and B success criteria into one score. Include failed attempts, retries, review, rework, operations, and allocated fixed cost; report `N/A` when none completes. Use the [total-cost definition](../technical-foundations/production-operations.md#total-cost-per-completed-workflow).

## 6. Changes, regression, and rollback

- Version and reason for the change:
- Affected workflows, material, and authority:
- Regression results and reviewers for A and B:
- Owner approving installation or update and the target environment:
- Blocking or release-deferral conditions:
- Version, files, settings, and dependencies to restore:
- Stopping, completion, and handoff rules for in-flight work:
- Reconciliation and recovery of external changes already made:
- Retirement date, replacement procedure, and user communication:

Verify restoration of files separately from recovery of external workflow results. After rollback, check the active version and representative outcomes in both workflows, and record unresolved recovery items.

## 7. Final decision

| Decision | Evidence and remaining conditions | Owner |
|---|---|---|
| Share the Skill / separate by workflow / revise / do not adopt / retire |  |  |

For the adoption decision, record applicable and inapplicable conditions, workflow authority and review, provenance, dependencies, and license. If adopted and execution is tested, judge execution validation from failure, regression, and rollback results. If only design is complete, retain that scope and identify unperformed tests.

If rejected before installation, record alternatives and the rationale, marking those execution tests as `not applicable`. Do not claim execution validation. Non-adoption is valid when maintenance outweighs reuse benefits, but does not waive the remaining P5 exit criteria.
