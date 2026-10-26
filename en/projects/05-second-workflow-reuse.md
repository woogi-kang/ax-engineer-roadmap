# Project 5. Second-Workflow Reuse

## Goal

Do not declare the first project's code an enterprise standard. Identify contracts and components that actually transfer to a different workflow. Build a shared harness only after this comparison.

## Entry conditions and claim scope

Verify P1–P3 passing evidence and an [organizational P4 pass or verified P4 simulation](04-production-pilot.md). Both routes require failure, recovery, and independent-review records. A case without P4 can be supplemented by separate operating practice or simulation. For P4 evidence from another workflow, identify its original workflow, environment, and versions, and have a reviewer assess transfer to the present data, permissions, exceptions, and recovery conditions. Test unmatched mandatory conditions anew; do not transfer prior approval. Without P4 evidence, you may design reuse candidates but must not claim completed P5 execution verification.

Verify the second workflow's data, authority, approval, and evaluation conditions. Do not transfer the first workflow's approval or pass record unchanged. The simulation route claims only the reuse of code and procedures actually tested; organizational scale and production outcomes remain unverified.

## Select the second workflow

Choose a workflow that differs from the first but shares some of:

- Source system
- Approval structure
- Evaluation execution
- External action and recovery
- A different department, user, or domain vocabulary

Difference is necessary to reveal a bad abstraction.

## Compare

| Area | Question |
|---|---|
| Outcome and workflow | Did the first workflow's success criteria become an unwanted constraint? |
| Data | Are shared identifiers and provenance contracts reusable? |
| Input and output | Which schema fields are common versus domain extensions? |
| Evaluation | Can execution be shared while the rubric remains domain-specific? |
| Approval and permission | Are common events separate from role-specific authority? |
| Records and observability | Can the same run and state model trace both workflows? |
| Recovery | Are shared stop and handoff mechanics separate from domain fallback? |
| UI and tools | Do contracts remain compatible across different implementations? |

## Tasks

1. Classify first-workflow components as contract, domain rule, or product choice.
2. Select reuse, extension, and replacement candidates.
3. Implement or simulate a thin second workflow.
4. Measure addition time, changed files or settings, and evaluation and operating burden.
5. Record what was not reused and why.
6. Define version, compatibility, extension, and retirement.
7. Decide shared, domain-specific, revise, or remove.

## If Skill reuse is selected

Consider a Skill when packaging repeated procedures and references for an agent. Keep deterministic code or a checklist when it is sufficient. This optional exercise does not require every workflow to install a Skill. Record decisions and results in the [Reusable Skill Review Card](../toolkit/reusable-skill-card.md).

1. Describe the repeated procedure in A and differences in B. Separate shared steps from workflow-specific material, approval, and acceptance.
2. Select applicable and inapplicable requests first. Define required material, inputs, outputs, failure handling, and human handoff.
3. Draft a Skill as documentation with `name`, `description`, and a body. Keep provenance, versions, dependencies, license, and installation review in the separate card. These are not additional mandatory frontmatter fields.
4. Review instructions, references, bundled scripts, and dependencies. Any installation or execution trial needs an authorized environment and scope; do not immediately run unreviewed code.
5. In both workflows, test applicable and inapplicable requests, mistaken activation, conflicting or stale procedures, malicious material, excess authority, and dependency failure. Retain activation, actual tool use, output, and handoff results.
6. Compare each workflow with its earlier approach, recording reused parts, changes, review, rework, and operating burden. Do not combine success rates for different workflows.
7. When shared procedures change, run regression evaluation for both A and B. After restoring an earlier version, verify the active version and representative results. Reconcile and recover external changes separately.
8. Choose shared use, workflow-specific separation, revision, non-adoption, or retirement, with an owner and remaining conditions.

Use [Agent Systems](../technical-foundations/agent-systems.md#reusing-procedures-through-skills) for format and `allowed-tools` limitations. Completing this guide or card does not establish installation, execution, or operational reuse.

## Shared-harness candidates

- Workflow and run identifiers
- Input and output schema and version
- Evaluation execution and result format
- Approval, policy, and audit events
- Tool permission and action record
- Stop, recovery, and handoff
- Cost, quality, and actual-use status

The same UI, framework, model, or database is not a mandatory shared-harness property.

## Evidence

- First and second workflow comparison
- Reuse, revise, and remove decisions
- Addition time and change scope
- Shared contracts and domain extension points
- Version, compatibility, and retirement policy
- Operating-burden comparison
- Team autonomy and central responsibility boundary
- If a Skill is considered: its A/B review card, source/license/dependency review, and adoption or non-adoption rationale. If adopted and execution is tested: its draft and failure, regression, and rollback records

## Exit criteria

- Actual reuse is separated from assumed reuse.
- Shared rules do not overwrite domain acceptance, permission, or SOP.
- Core records remain comparable across different UI and tools.
- New workflows do not depend entirely on central-team manual work.
- Decisions not to standardize are also recorded.
- If adopted, the Skill does not run for inapplicable requests and preserves each workflow's approval and acceptance criteria.
- If a Skill is adopted and execution is tested, verify changes and restoration of prior versions in both workflows. Keep designed scope and unperformed tests explicit. If rejected before installation, record alternatives and the rationale, marking those execution tests as `not applicable`.

## Reassess after reuse

Use new scenarios in the second workflow to test approval waits, permission revocation, duplicate and partially successful actions, cancellation, and recovery. The first workflow's pass record does not replace acceptance of the second. When a shared rule changes, run regression evaluations for both workflows and have users and operators review the affected scope.

Include review, rework, and operating burden as well as the time to add a workflow. Keep components workflow-specific when maintenance outweighs the benefit of sharing them.

## Stop conditions

- The first codebase is copied and renamed.
- Second-workflow users in the organization track, or independent reviewers in simulation, do not participate in acceptance.
- Domain exceptions or authority are deleted for standardization.
- Maintenance and compatibility are not measured.
- Skill provenance, license, or bundled code is unreviewed, or a tool declaration is mistaken for execution authority.
- Inapplicability conditions, domain exceptions, or human handoff are removed to enable reuse.

## Continue to

- [Standardization and Scale](../delivery-lifecycle/08-standardization-and-scale.md)
- [Organization AX Maturity](../organization-maturity/README.md)
- [Case Study Template](../toolkit/case-study-template.md)
