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

External links are checked weekly. A definite `404` or `410` fails the check. Other abnormal responses remain warnings for manual review, with `4xx` authentication, bot-blocking, or rate-limit responses distinguished from temporary `5xx` and network errors. [`public-ax-cases.json`](../../research/public-ax-cases.json) records provenance, deployment stage, and outcome-verification status. As of 2026-10-26 it contains 40 cases and 54 unique URLs, preserving the original 25 cases and 26 sources. Reading new evidence and updating content are separate from link-health checks.

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

In [`public-ax-cases.json`](../../research/public-ax-cases.json), `verified_at` preserves the original 25-case baseline of `2026-08-01`. `review_scope.baseline_case_ids` fixes that original list; `updated_at` and `review_scope` record the new review scope. All 25 existing cases were attempted on 2026-10-26. Main bodies were read for 24; K06 remains on hold because access failed. Rereading a source does not independently verify current operations or reported outcomes.

An added case uses `introduced_at` and an `initial-review` claim to record its first review. It requires directly read evidence and must not invent a historical `baseline-summary`. Existing cases use `source-confirmation` for rechecks and supported correction claims for changes.

Each `claims` entry records its statement, source URLs, publication/check dates, access status, temporal category, observation period, sample, method, and limitations. Unknown dates and sample sizes remain `null`, with missing conditions explained in text. `source-reported` means that the source makes the claim; `study-reported` means a study reports it for its stated sample and method. Neither automatically upgrades independent outcome verification. An unread follow-up stays `unknown`.

The original 26 URLs remain in case `source_urls` and baseline claims. Additions and follow-up claims bring the total to 54 unique URLs. Validation checks real calendar dates, publication/observation chronology, review scope, and bilingual claim IDs, links, and classifications. A successful link check does not verify source content or outcomes.

`baseline_deployment_stage` preserves an existing case's baseline classification or an added case's initial classification. Correct source-inconsistent classifications with `deployment_correction`, retaining `from` (the baseline), `to` (the corrected value), bilingual reasons, and evidence. A classification that differs from its baseline requires a read correction claim, and earlier corrections remain preserved. `not-rechecked` means no follow-up claim was added in this review. `selected-claims-reviewed` and `initial-claims-reviewed` likewise cover only the recorded claims.

## Job availability and duplicates

[`hiring-signals.json`](../../research/hiring-signals.json) records job content, source accessibility, recruitment signals, and publication dates separately. `added_at` is the date a record entered the registry. Unknown publication dates remain `null` and do not qualify as recent postings.

- `open`: a directly read source shows an application route for that role or an explicit open state. This does not establish a successful submission.
- `closed`: an explicit closed state or expired deadline was observed. A closed state takes precedence over rolling-recruitment wording or a future deadline.
- `unknown`: the application route is unclear or the source cannot be read, so availability is unresolved.
- `conflicting`: sources confirmed to describe the same vacancy show incompatible recruitment states.

Group sources when their original job ID confirms identity. If only the company and title match, record the relationship and limits in `related_sources` and exclude it from availability aggregation. Record counts therefore do not equal unique vacancies or new jobs. The [refresh record](evidence-refresh-2026-10-26.md) retains search scope, exclusions, held candidates, and access failures.
