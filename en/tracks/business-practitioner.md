# Business Practitioner Collaboration Guide

## Audience

For people in customer support, sales, marketing, logistics, manufacturing, finance, HR, legal, and other functions who understand the work and use or approve its results. No development experience is assumed.

## Goal

Explain which workflow should change, why it should change, and which judgments must remain human-led. Own acceptance, exceptions, adoption, and retirement of the old procedure rather than stopping at requirements handoff.

## 1. Make actual work visible

Learn:

- Trigger, input, owner, judgment, output, waiting, exception, and handoff
- The difference between documented and actual procedures
- Common cases and rare but high-impact cases

Practice:

- Map 5–20 recent cases and record flow and elapsed time.
- Replace “usually” with case-level differences.
- Identify who declares the work complete and by which criteria.

Evidence:

- [Workflow Discovery Card](../toolkit/workflow-discovery-card.md)
- Current workflow
- Exception list and baseline

## 2. Design the target flow and human judgment

Reclassify each step as remove, combine, standardize, AI-assist, human-approve, or bounded automation. Do not automate judgments whose basis cannot be explained.

Ask:

- Why does this step exist?
- Is it required by rule or contract, or only by habit?
- What happens to customers, money, safety, or rights when it fails?
- Which judgments require human accountability?

Evidence:

- Target workflow
- Human judgment and approval criteria
- Scope and non-goals

## 3. Clarify data and terminology

Record where current truth lives and who owns it. Resolve conflicting business terms before attempting to fix them in prompts.

Practice:

- Separate source systems, official documents, and personal files.
- Identify required and frequently missing inputs.
- Define core terms and metrics with examples.
- Define what happens when sources are missing or disagree.

Evidence:

- Source and ownership map
- Business glossary
- Missing and conflicting examples

## 4. Build acceptance criteria

Do not select good output by intuition. Collect normal, edge, and prohibited cases. Judge results as `pass`, `pass after edit`, `reject`, or `human judgment required`.

Check:

- Is it factually correct and traceable to a source?
- Does it meet format and required-field rules?
- Does it avoid privacy, confidentiality, discrimination, and overclaiming risk?
- Is the next action allowed, or should this remain a proposal?

Evidence:

- Workflow-based evaluation set
- Rubric and named judging role
- Correction reasons

## 5. Run acceptance and change the official process

Ask real users to complete work without the implementer's explanation. Separate non-use into access, trust, input burden, exception handling, training, and KPI conflicts.

Practice:

- Run user acceptance testing.
- Update the SOP with normal, support, and manual fallback flows.
- Define parallel operation and retirement criteria.
- Measure completion, correction burden, exceptions, and support—not just logins.

Evidence:

- UAT record
- Updated SOP and training materials
- Keep or retire decision for the old process
- Adoption and workflow outcome metrics

## Boundaries to agree with developers

- Proposal versus external action
- Read versus write permission
- Evaluation-set scope and change approval
- Automatic retry, human handoff, and immediate stop by failure type
- Required logs versus personal data that must not be stored

## Common failures

- Selecting visible repetitive work without a baseline
- Automating unnecessary steps in the current process
- Writing “human review” without criteria and authority
- Testing only good examples
- Treating tool training as adoption
- Leaving duplicate work because the old procedure was not retired

## Recommended path

1. [Organization Readiness](../start-here/organization-readiness.md)
2. [Safe Assistant](../projects/01-safe-assistant.md)
3. [Human-Approved Workflow](../projects/02-human-approved-workflow.md)
4. [Eight-Stage AX Transformation](../delivery-lifecycle/README.md)
