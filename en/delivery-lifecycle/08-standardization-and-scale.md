# 8. Standardization and Scale

## Purpose

Apply patterns validated in one workflow to another, while separating shared assets from workflow-specific exceptions.

## Key activities

1. Inventory contracts, components, and operating procedures from the first case.
2. In a second workflow, classify each item as reused unchanged, configured, or newly implemented.
3. Extract common input, output, evaluation, approval, and record contracts.
4. Set the boundary between team technology choices and shared operating criteria.
5. Define version, compatibility, and retirement policies.
6. Turn operational failures into reproducible shared-foundation or platform feedback.
7. Decide whether the next investment should scale, improve, maintain, or stop.

## Changing a reusable procedure

Assign a maintainer and the workflows to review whether the procedure is stored as documentation, shared code, or a Skill. For a Skill, use [P5's A/B comparison](../projects/05-second-workflow-reuse.md#if-skill-reuse-is-selected) and the [review card](../toolkit/reusable-skill-card.md). Record applicable and inapplicable conditions, provenance, license, dependencies, and installation review; retain workflow-specific execution authority.

When shared procedures change, identify all consumers and run their regression evaluations. A pass in one workflow does not replace another's acceptance. Assign responsibility for stale references, release-deferral conditions, prior-version restoration, and in-flight work. Keep change and installation records separate from reconciliation of actual external results.

## Minimum shared-harness scope

A shared harness does not force one framework or UI.

- Locations of systems of record and documents
- Input and output contracts
- Completion and quality validation
- Human approval points
- Permission and execution policies
- Audit, change, and version history
- Failure detection and recovery
- Cost and operating-status visibility

## Deliverables

- Cross-case reuse comparison
- Shared contracts and extension points
- Version and compatibility policy
- Playbooks and reusable modules
- Shared-foundation or platform feedback
- Next-workflow investment decision
- Reusable-procedure owner, supported workflows, versions, sources, license, and change-impact list
- If Skills are considered: adoption or non-adoption rationale. If adopted and execution is tested: per-workflow applicable, inapplicable, failure, regression, and rollback records

## Exit criteria

- Reuse in a second workflow is explained with evidence.
- Non-shared exceptions and their reasons are recorded.
- Adding a workflow does not depend only on manual copying by the central team.
- Business teams can adjust configuration, evaluation, and operations within permitted boundaries.
- The effect of shared-foundation changes on existing workflows is evaluated.
- Inapplicability conditions and workflow-specific exceptions remain explicit.
- Sources, dependencies, and licenses are reviewed, with owners for changes, retirement, and restoration.
- Adopted Skills have mistaken-activation, conflict, and excess-authority tests, plus regression and rollback results from both workflows.

## Stop signals

- The first case is used to declare an enterprise standard.
- Abstraction costs more than reuse saves.
- Every exception is added to the shared core.
- The foundation team becomes distant from workflow problems and user feedback.
- Existing assets are the main reason to scale, rather than a demonstrated need.
- Procedure versions used by each workflow are unknown or cannot be restored.
