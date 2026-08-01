# Project Governance

## Current operating model

During the `v0.x` period, [@woogi-kang](https://github.com/woogi-kang) serves as lead maintainer and release manager, with final responsibility for merging, releases, security advisories, and Code of Conduct enforcement.

| Role | Responsibility | Qualification |
|---|---|---|
| Contributor | Improve content and artifacts through issues, pull requests, and review | Open to everyone |
| Reviewer | Repeatedly review evidence, scope, writing, and validation in a domain | Consistent review across at least three separate pull requests and understanding of project rules |
| Maintainer | Merge, triage, decide roadmap direction, and handle security | At least three months of sustained contribution, conflict disclosure, and a public proposal approved by existing maintainers |
| Release manager | Verify version, changelog, tag, deployment, and recovery | A maintainer who has reproduced the release process |

Role grants and inactive-status changes are recorded in a Discussion or issue with their rationale and scope. After six months of inactivity, the project first checks in rather than removing access automatically, then reduces privileges only when there is no response and operations require it.

## Decision criteria

Roadmap changes are evaluated in this order:

1. What problem does this create or solve for readers and workflow outcomes?
2. What evidence supports the current content?
3. How does new evidence change the existing judgment?
4. Is the change specific to one company or tool, or is it a shared competency?
5. What must change in the learning, practice, or evidence requirements?

When a disagreement cannot be resolved, the project may document conditional options and unknowns instead of forcing one universal answer.

Normal changes require maintainer review before merge. Security policy, CI, permission, and Code of Conduct changes require CODEOWNERS review. Maintainer-authored changes must pass the same checks and should wait for independent review when one is available.

A person with a conflict of interest delegates decisions about the relevant organization, product, person, or conduct report to another maintainer or independent reviewer. If no substitute exists, the conflict and facts are disclosed and only the smallest reversible decision is taken.

## Versioning

- Patch: link fixes, typos, and clarifications
- Minor: new competencies, cases, templates, and backward-compatible structural changes
- Major: changes to core contracts such as proficiency levels, the lifecycle, or organizational maturity

## Review cadence

- Official role definitions and core external links: quarterly
- Technical, security, and regulatory content: when a change signal appears
- Cases and templates: when usage or contribution feedback arrives
- Overall information architecture: before a minor release

## Response and release

- The project aims to triage a new issue or pull request, or state when a response is possible, within 7 days.
- Merge decisions require more than green CI: claim boundaries, bilingual parity, and public safety are reviewed.
- Releases follow [Semantic Versioning](https://semver.org/) and `CHANGELOG.md`; the public site is checked after the tag and GitHub Release.
- A serious regression is repaired with a new commit, with cause, impact, and prevention recorded in an issue or release note.

These are targets for a single-maintainer project, not a service-level agreement.

## Absence and succession

If the lead maintainer expects to be unavailable for more than 30 days, an issue records the status and interim contact. After more than 90 days without a response, active maintainers may appoint a new lead by consensus after reviewing recent contribution, review, and security responsibility. If no active maintainer exists, the repository remains readable but does not claim new official releases or a security-response guarantee.

## Public scope

Cases containing confidential information about a person, company, or customer will not be merged. If de-identification cannot sufficiently reduce re-identification risk, only the generalized structure and decisions may be published.

Use the [support guide](SUPPORT.md) for normal questions, the [security policy](SECURITY.md) for vulnerabilities unsafe to disclose publicly, and the [Code of Conduct](CODE_OF_CONDUCT.md) for participant behavior.
