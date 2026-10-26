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
5. Attach the publisher, observation period, sample/denominator, method, and limitations to outcome figures. Mark missing conditions as unreported; do not turn self-reports into verified effects.

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

External links are checked weekly. A definite `404` or `410` fails the check. Other abnormal responses remain warnings for manual review, with `4xx` authentication, bot-blocking, or rate-limit responses distinguished from temporary `5xx` and network errors. [`public-ax-cases.json`](../../research/public-ax-cases.json) is the registry for 25 public cases, 26 original source URLs, and three follow-up sources, including provenance, deployment stage, and outcome-verification status.

## Dates and claim-level records

Distinguish proposals, drafts, optional extensions, released specifications, and deprecated features. A published specification does not establish support in the Host, Server, or SDK being used. Follow [standards and proposals to review](standards-watchlist.md) to keep plans separate from verified implementation.

Publication, verification, and observation dates are separate. Reading a source on `2026-10-26` does not establish an August–October market change. If a later publication reports an earlier study period, record that period too.

| Category | Recording rule |
|---|---|
| Published after the baseline | Verify that the publication date is later than the comparison baseline; record the observation period separately. |
| Current signal without a date | The source was read, but its publication date is unknown. It does not establish creation, growth, or decline. |
| Previously missing evidence | Publication predates the baseline; use it to reconsider the earlier conclusion separately from new changes. |
| Historical material | Preserve the previous reading and original source without claiming current recruitment, operation, or outcomes. |
| `unknown` | The original was unreadable or evidence conflicts; do not fill gaps by inference. |

In [`public-ax-cases.json`](../../research/public-ax-cases.json), `verified_at` preserves the last full-catalog check, `2026-08-01`. `updated_at` and `review_scope` describe the selected-claim review of K04, K05, K07, K08, K09, G02, G07, G08, and G10 on `2026-10-26`. They do not redate all 25 cases as freshly verified.

Each `claims` entry records its statement, source URLs, publication/check dates, access status, temporal category, observation period, sample, method, and limitations. Unknown dates and sample sizes remain `null`, with missing conditions explained in text. `source-reported` means that the source makes the claim; `study-reported` means a study reports it for its stated sample and method. Neither automatically upgrades independent outcome verification. An unread follow-up stays `unknown`.

The original 26 URLs remain in case `source_urls` and baseline claims. Three follow-up sources bring the total to 29 unique URLs. Validation checks real calendar dates, publication/observation chronology, partial-review scope, and bilingual claim IDs, links, and classifications. A successful link check does not verify source content or outcomes.

`baseline_deployment_stage` preserves the classification from the last full review. Correct source-inconsistent values with a `deployment_correction` containing `from` (the preserved baseline), `to` (the supported correction), bilingual reasons, and evidence. A current classification differing from the baseline needs a read correction claim supporting it; preserve prior correction history as well. `not-rechecked` means the original case-wide evidence was not reverified, not that no original figure was spot-checked.
