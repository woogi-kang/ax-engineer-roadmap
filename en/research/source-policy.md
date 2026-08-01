# Source Policy

## Purpose

The AX Engineer role and its technical environment change quickly. This repository prioritizes verifiable evidence over memory or trends and distinguishes facts, experience, and hypotheses.

## Source types

| Label | Meaning | Example use |
|---|---|---|
| `PRIMARY_OFFICIAL` | Official material from a company, project, or institution | Job posting, official documentation, standard |
| `PRIMARY_REPOSITORY` | Actual files in a public repository | README, contribution rules, code |
| `PUBLIC_RESEARCH` | Papers, public reports, and verifiable research | Evaluation, security, and organization research |
| `PRACTITIONER_EVIDENCE` | Reproducible operating artifacts and records | Evaluation results, runbooks, incident records |
| `PUBLIC_SECONDARY` | Articles, blogs, and summaries | Market trends and supporting explanation |
| `HYPOTHESIS` | An application hypothesis not yet validated | Expected bottleneck in a case |
| `UNKNOWN` | Missing or conflicting information held open | Accountable owner, real baseline |

## Priority

1. For role definitions, prefer current official job and team descriptions.
2. For technical behavior, verify official documentation and actual versions.
3. When evaluating public projects, read actual files rather than only README summaries.
4. Use articles and personal writing as supporting sources.
5. Do not publish case-impact metrics without a measurement method, period, and sample.

## Links

- Place a link near the claim it supports.
- Mark change-prone material with `verified YYYY-MM-DD`.
- Do not judge a source from its title alone.
- Replace inaccessible links or downgrade the claim to `UNKNOWN`.

## Publishing cases

- Remove information that can identify a company, customer, colleague, or individual.
- Do not mix public material with confidential experience.
- When generalizing a real case, state what was changed.
- Disclose collection scope, missingness, and bias.
- A failed experiment may be included when its stop condition and learning are explicit.

## Updates

Open a `Source update` issue when a source is outdated or conflicts with current content. A pull request should state the old claim, new evidence, and effect on readers.

External links are checked weekly. A definite `404` or `410` fails the check. Other abnormal responses remain warnings for manual review, with `4xx` authentication, bot-blocking, or rate-limit responses distinguished from temporary `5xx` and network errors. [`public-ax-cases.json`](../../research/public-ax-cases.json) is the registry for 25 public cases and 26 unique source URLs, including provenance, deployment stage, and outcome-verification status.
