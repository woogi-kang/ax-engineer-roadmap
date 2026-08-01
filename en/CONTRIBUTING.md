# Contributing

AX Engineer Roadmap prioritizes contributions that strengthen decisions and evidence that can be validated in practice, rather than contributions that merely add more technology names.

## What you can contribute

- Missing competencies, lifecycle stages, or failure modes
- Outdated or incorrect sources
- Constraints and counterexamples from specific industries
- Deployment cases that do not identify an organization or person
- Template improvements
- Typo, broken-link, and accessibility fixes

## Before contributing

1. Read the [source policy](research/source-policy.md).
2. Search existing issues and pull requests.
3. If the change substantially alters the content, agree on the scope in an issue first.
4. Confirm that it contains no confidential information about a company, customer, or colleague.

## Local setup and full validation

Use Node.js `22.23.1` or newer and Python `3.11.15` or newer. Run the same validation as CI from a fresh clone.

```bash
npm run verify
```

`verify` installs dependencies and Chromium, then checks internal links, bilingual mirrors, case metadata, the public-case registry, version synchronization, the Beauty/D2C Python tests and committed-artifact reproduction, npm security audit, site lint, Vinext rendering, browser accessibility, and the GitHub Pages static export. Full external-link health depends on the network and therefore runs separately through `npm run check:external` and the weekly workflow.

## Roadmap item format

New roadmap items should answer the following questions whenever possible.

```markdown
## Item name

### Why it matters
### What to know
### How to decide
### What to practice
### What evidence to produce
### Failure modes
### Who must agree
### Sources
```

When adding a tool or course, do not list only its name. Explain which competency it helps practice and how.

When adding a Korean document, update the same path under `en/`. The English edition must preserve the same decisions, practice, and evidence rather than serving as a summary.

## Writing and terminology

- Write for the reader doing the work, not for the repository maintainer.
- Prefer a concrete owner such as `process owner`, `approver`, or `operator` over an unspecified `human`.
- Explain repository-specific terms when they first appear.
- Keep Korean and English semantically aligned without translating idioms word for word.
- Review AI-assisted drafts for stock transitions, inflated claims, repeated conclusions, and translationese.

## Case-study format

A case should include at least:

- problem and users;
- current workflow;
- constraints and non-goals;
- hypotheses and choices;
- implementation and deployment scope;
- evaluation and failure handling;
- adoption and handoff;
- outcomes and limitations;
- reusable patterns.

Add `case.json` to each new case directory and follow [`case.schema.json`](../case-studies/_schema/case.schema.json). Keep documentation readiness in `status` separate from the level of verified evidence in `evidence_stage`.

Do not mix current execution with the target design. Put only the scope demonstrated by published artifacts in `current_write_impact`, `current_autonomy`, and `implemented_project_stages`. Put broader designed targets in `designed_write_impact`, `designed_autonomy`, and `designed_project_stages`. After changing `case.json`, run `npm run generate:cases` and commit the generated site data.

When adding or changing a public organization case, update both language catalogs and [`public-ax-cases.json`](../research/public-ax-cases.json). Keep source provenance, deployment stage, and outcome verification in separate fields.

Any real impact metric must include its measurement method and period. If those details cannot be disclosed, remove the metric and retain only observable states.

## Pull requests

- Keep one issue or argument per pull request.
- Explain why the change is needed and how it affects readers.
- Record the verification date and source type for new links.
- Run `npm run verify`.
- Even when a draft is generated with AI, the submitter must personally review its facts and language.

## License

By contributing, you agree that your content may be distributed under the repository's [MIT License](../LICENSE). Do not reproduce another person's documents, tables, or images verbatim.
