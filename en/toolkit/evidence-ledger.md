# Evidence Ledger

## Evidence types

| Type | Meaning |
|---|---|
| `PRIMARY_OFFICIAL` | Official material from a company, project, or institution |
| `PRIMARY_REPOSITORY` | Actual files in a public repository |
| `PUBLIC_RESEARCH` | Papers, public reports, and verifiable research |
| `PRACTITIONER_EVIDENCE` | Reproducible execution and operating records |
| `PUBLIC_SECONDARY` | Articles, blogs, and summaries |
| `HYPOTHESIS` | A hypothesis not yet validated |
| `UNKNOWN` | Missing or conflicting information held open |

## Claim records

| ID | Claim | Evidence type | Source or file | Verified date | Scope and limitations | State |
|---|---|---|---|---|---|---|
| E-001 |  |  |  |  |  | active |

Record the following for each claim. Use `unknown` rather than estimating missing values.

| Field | What to record |
|---|---|
| Publication date | Date stated in the source, separate from a search engine's crawl date |
| Observation period | When the survey, experiment, or operational outcomes were observed |
| Verification date and access | Date the source was read; accessible, ended, blocked, or unverified |
| Sample and denominator | Respondents, organizations, or workflow count, sampling method, and exclusions |
| Measurement method | Self-report, logs, controlled experiment, or an explicit note that no method is provided |
| Outcome verification | Self-reported, cross-checked against independent material, or independently evaluated |
| Relation to the prior claim | New change, newly published earlier observation, prior omission, correction, or historical record |
| Application | Documents, exercises, and exit criteria to change, and content to retain |

A recent publication based on earlier observations describes that earlier period. An ended job listing can remain evidence of a historical role, but does not count as current hiring demand. If retaining the source is permitted, record its storage location and hash. Otherwise, retain the URL and the scope that was read.

States:

- `active`: currently in use
- `needs_review`: requires reverification
- `superseded`: replaced by new evidence
- `rejected`: unsupported or falsified

## Execution evidence

| ID | Workflow or experiment | Evidence | Location | Validation method | Result | Verified date |
|---|---|---|---|---|---|---|
| R-001 |  |  |  |  |  |  |

## Quantitative claims

| Metric | Period | Denominator or sample | Baseline | Calculation | Exclusions | Evidence |
|---:|---|---|---:|---|---|---|
|  |  |  |  |  |  |  |

Record usage, documents generated, completed workflows, and organizational cost or revenue as separate metrics. Correlation in a self-reported survey does not establish causation. Sources from the same institution do not form one continuous experiment if their customers, environments, or periods differ.

## Change history

| Date | Claim or evidence | Change | Reason | Impact |
|---|---|---|---|---|
|  |  |  |  |  |
