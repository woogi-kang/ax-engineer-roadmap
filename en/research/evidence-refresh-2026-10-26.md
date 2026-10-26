# Evidence refresh on 2026-10-26

This refresh reread company cases, follow-up sources, and job-posting bodies. The ongoing README redesign and local practice implementation scope were preserved. Collection, held candidates, and corrections are recorded in the [research JSON](../../research/evidence-refresh-2026-10-26.json).

## Coverage and results

| Item | Result |
|---|---|
| Existing company/institution cases | All 25 attempted; main bodies read for 24, with access failure for K06 |
| Case catalog | Expanded from 25 to 40 workflows; several workflows at one company are not several companies |
| Source URLs | Original 26 retained; 54 unique URLs now support recorded claims |
| Hiring | 27 posting records with readable bodies; possible channel duplicates mean these are not unique vacancies |
| Availability displays | 11 open signals, 8 explicit closed signals, 8 unknown |
| Publication dates | 1 posting has a source-verified date since 2026-08-01; the rest are undated |

[Company cases](public-ax-cases.md) · [Hiring records](hiring-signals.md) · [Role interpretation](ax-engineer-role-review.md)

## Added workflows

Korean additions cover consumer research, app-review replies, maintenance retrieval, production reconciliation, global collaboration, and manufacturing quality analysis. International additions cover customer-journey research, lead QA, public-call handoff, clinical evidence retrieval, insurance documents, development operations, internal tools, factory operations, and retirement of an agent role.

Separate recently published material from older material newly discovered here. Do not turn plans into completed operation, or potential gains and estimated manual effort into measured outcomes. Each claim records dates, sample, method, and limitations.

## Corrected interpretations

- K03: added the LICO 2.0 speed comparison as a company report, distinguishing previously absent outcomes from the new self-report.
- K10: feature descriptions and a pilot plan did not establish actual launch, so deployment is corrected to `UNKNOWN`.
- G02: aligned examples with transfers and employment verification directly stated in the current source.
- G03: separated actual use from planned expansion, and the TIA Portal user base from Copilot users.
- G11: recorded early-customer onboarding as limited operation, while retaining the 80% figure as a potential estimate, not observed underwriting-cost savings.
- G12: separated overall Boti inquiry volume from the generative tourism experience.
- G14: did not extend a self-reported weeks-to-hours comparison for an analysis step to an entire document or organization.

Classification corrections refer to the scope described by the source, not an audit of live operation on this check date. Prior classifications and new evidence are retained.

## Unresolved or excluded material

Both the original and follow-up POSCO sources for K06 were inaccessible; only search excerpts were available. New figures from those excerpts were not promoted into verified claims. Candidates with incomplete official detail, including SK Square, or strategy/product descriptions without a bounded operational workflow were retained separately.

Hiring candidates consisting only of images or JavaScript notices, uncertain repost identities, education programs, and generic development roles were separated from the main list. FuriosaAI's self-returning application link and POSTECH's route to a different role did not establish application availability, so their status remains unknown. Explicit closure in the body takes precedence over a displayed deadline.

## Validation rules after the refresh

Track hiring availability separately from source access. Do not substitute a check date for an unknown publication date. Record new cases as initial reviews at introduction, without backdating them into the 2026-08-01 baseline. The [source policy](source-policy.md) and validation enforce these boundaries.

This is a one-time refresh; no recurring collection or automatic publication job was configured.

## Additional status observed during PR validation

The former FuriosaAI Ashby URL and Miridih Greeting URL returned 404 during the 2026-10-26 PR check. Original URLs and earlier observations remain in the data; the documents label them as historical addresses and direct readers to the readable company page or Wanted body. Recruitment-state counts are unchanged. [Check record](https://github.com/woogi-kang/ax-engineer-roadmap/actions/runs/40319785897)
