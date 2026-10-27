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

Use Node.js `22.23.4` or newer and Python `3.11.18` or newer. Run the same validation as CI from a fresh clone.

```bash
npm run verify
```

`verify` installs the dependency used for README rendering checks, then checks internal links, bilingual mirrors, case metadata, the public-case, failure-case, and hiring registries, version synchronization, README rendering, source-record validation regression tests, the Beauty/D2C Python tests and committed-artifact reproduction, and npm security audit. Full external-link health depends on the network and therefore runs separately through `npm run check:external` and the weekly workflow.

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

Apply the `korean-humanizer` skill whenever adding Korean content or revising Korean sentences. Verify the evidence and write a draft first, then identify and polish awkward passages in the changed text and reread it for preserved meaning. Follow the [project working instructions](AGENTS.md).

- Do not change facts, numbers, dates, proper names, quotations, technical abbreviations, or evidence links for stylistic reasons.
- Keep technical documentation plain and do not replace sound existing prose in bulk.
- Compare responsibilities and validation criteria with the English edition. Automation alone does not establish semantic parity.
- Write primarily for AX Engineers, presenting other roles through their collaboration responsibilities.
- Name the role or owner responsible for approval, review, and operations rather than writing only 'human'.
- Reduce translationese and abstract wording by describing concrete workflow actions. Retain established terms such as data contracts and API contracts.
- Do not translate code identifiers, state values, file paths, or commands.
- Explain new terms at first use and update the related Korean and English documents together.

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

Do not mix current execution with the target design. Put only the scope demonstrated by published artifacts in `current_write_impact`, `current_autonomy`, and `implemented_project_stages`. `implemented_project_stages` identifies stages with implemented functionality, not completion of all exit criteria such as the minimum evaluation count and independent review. Put broader designed targets in `designed_write_impact`, `designed_autonomy`, and `designed_project_stages`. After changing `case.json`, run `npm run generate:cases` and commit the regenerated current-scope and design-target tables in the Korean and English case documents.

When adding or changing a public organization case, update both language catalogs and [`public-ax-cases.json`](../research/public-ax-cases.json). Keep source provenance, deployment stage, and outcome verification in separate fields.

Add failure and stop cases separately from the success catalog, to [`ax-failure-cases.json`](../research/ax-failure-cases.json) and both language documents. After changing `related_case_studies`, run `npm run generate:failure-links` to regenerate each case's `Failure-case check` and the link table in the case index.

Add posting records to [`hiring-signals.json`](../research/hiring-signals.json) and both language explainers. For the monthly list, build the JSON by following the [collection criteria](research/hiring-monthly/README.md), then run `npm run generate:hiring-monthly` to update the list and the README summary.

To claim an outcome measured by the contributor, provide its period, sample, and calculation method. If those details cannot be disclosed, remove the figure and retain only observable states. When citing an outside organization's reported metric, identify the reporting party and unreported conditions, and distinguish self-report from independent verification. Follow the [source policy](research/source-policy.md).

## Pull requests

- Keep one issue or argument per pull request.
- Explain why the change is needed and how it affects readers.
- Record the verification date and source type for new links.
- Run `npm run verify`.
- Even when a draft is generated with AI, the submitter must personally review its facts and language.
- Apply `korean-humanizer` to added or revised Korean passages and verify that their meaning is preserved.

## License

By contributing, you agree that your content may be distributed under the repository's [MIT License](../LICENSE). Do not reproduce another person's documents, tables, or images verbatim.
