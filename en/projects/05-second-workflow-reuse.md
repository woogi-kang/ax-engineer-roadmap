# Project 5. Second-Workflow Reuse

## Goal

Do not declare the first project's code an enterprise standard. Identify contracts and components that actually transfer to a different workflow. Build a shared harness only after this comparison.

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

## Shared-harness candidates

- Workflow and run identifiers
- Input and output schema and version
- Evaluation execution and result format
- Approval, policy, and audit events
- Tool permission and action record
- Stop, recovery, and handoff
- Cost, quality, and adoption status

The same UI, framework, model, or database is not a mandatory shared-harness property.

## Evidence

- First and second workflow comparison
- Reuse, revise, and remove decisions
- Addition time and change scope
- Shared contracts and domain extension points
- Version, compatibility, and retirement policy
- Operating-burden comparison
- Team autonomy and central responsibility boundary

## Exit criteria

- Actual reuse is separated from assumed reuse.
- Shared rules do not overwrite domain acceptance, permission, or SOP.
- Core records remain comparable across different UI and tools.
- New workflows do not depend entirely on central-team manual work.
- Decisions not to standardize are also recorded.

## Stop conditions

- The first codebase is copied and renamed.
- Second-workflow users do not participate in acceptance.
- Domain exceptions or authority are deleted for standardization.
- Maintenance and compatibility are not measured.

## Continue to

- [Standardization and Scale](../delivery-lifecycle/08-standardization-and-scale.md)
- [Organization AX Maturity](../organization-maturity/README.md)
- [Case Study Template](../toolkit/case-study-template.md)
