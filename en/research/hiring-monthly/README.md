# Monthly hiring snapshot and collection criteria

> Read this page to see how many Korean AX, AI Agent, and FDE postings are out now and what kinds they are. A full title-level list is rebuilt every month. To understand the role by reading individual responsibilities and requirements, see [AX roles explained through job postings](../hiring-signals.md).

Postings are collected the same way each month. Monthly lists, criteria, and procedure follow below.

## Monthly lists

- [October 2026](2026-10.md): applications opened 2026-09-27 to 2026-10-27, 138 JobKorea postings.

## Collection scope

- Period: postings whose applications opened in the 30 days ending on the run date. A run on 2026-11-27 covers 2026-10-28 to 2026-11-27.
- Region: jobs located in Korea. Overseas jobs and remote-only roles at foreign companies are not included.
- A posting already in a previous month is not added again. If a company reposts under a new posting number, the new posting is added with `possible_duplicate_of` pointing to the earlier number.

## Role scope

Included:

- Engineers, developers, PMs, planners, and operators responsible for AX or AI transformation.
- Roles that build or operate AI Agent, 에이전트, or agentic systems.
- FDE (Forward Deployed Engineer) roles and AI engineers placed at customer sites.
- SI project placements and freelance postings, tagged `project-or-freelance`.

Excluded, with a recorded reason:

- Postings where AX appears only in the company name (for example, general roles at SK㈜ AX).
- Sales, consulting, instructor or training operations, marketing, design, and accounting roles.
- General recruiting without a specific role.
- Agents unrelated to work automation (such as game NPCs) and roles centered on security testing.
- Postings whose applications opened before the window.

Borderline postings stay in the excluded list with their reason so the next month can apply the same judgment.

## Classification and status

- Type: `fde` if the title has FDE, Forward Deployed, or FD 엔지니어; otherwise `ai-agent` if it has Agent, 에이전트, or Agentic; otherwise `ax`.
- Open (`open`): the deadline is on or after the check date, or the posting is rolling, and no closed notice appears.
- Closed (`closed`): the page shows a closed notice (`closed-notice`) or the deadline has passed (`deadline-passed`).
- Unverified (`unknown`): the detail page was read but its status could not be judged. A posting whose page could not be read is held (`held`) instead of listed.
- If a posting page returns 404, set the held reason to `removed` and its `url` to `null` so the external link check (`npm run check:external`) does not fail on a dead link.
- Remaining-time counters can be cached and are not used to judge status.
- Tags: `project-or-freelance`, `company-undisclosed` (for example, headhunter postings), and `training-matching` (postings matched through a training program).

## Platform methods

| Platform | Method | October 2026 result |
| --- | --- | --- |
| JobKorea | Search `https://www.jobkorea.co.kr/Search/?stext=<query>&tabType=recruit&Page_No=<n>`, detail `https://www.jobkorea.co.kr/Recruit/GI_Read/<number>` | Collected |
| Saramin | Detail pages attempted | Metadata only, not collected |
| Wanted | Posting pages attempted | Client error, not collected |
| LinkedIn | Not attempted | Robots rules, not collected |

JobKorea search results are sorted by relevance and show no dates. Posting numbers increase over time, so candidates are first filtered by number. In October 2026, numbers from 50053000 opened on or after 2026-09-27, and postings opened on 2026-10-27 were around 50250000. Next month, recalibrate the starting number near the last number in the previous list (50252108 this time).

The queries are AX, AX 엔지니어, AX 개발자, AI 전환, AI Agent, AI 에이전트, 에이전트, Agentic, FDE, and Forward Deployed. If Saramin, Wanted, or LinkedIn become readable, use the same queries and add their postings to the same file with a different `platform` value.

## Procedure

1. For each query, page through JobKorea search results and record `number | company | title`. Move to the next query when pages keep showing only numbers below the window's lower bound.
2. Remove duplicate numbers, numbers below the lower bound, and numbers already in a previous month.
3. Judge role scope from titles and record exclusions with reasons.
4. On each remaining detail page, check the application start date, deadline, closed notice, apply method, employment type, location, and experience. Move postings that opened outside the window to the excluded list.
5. Write `research/hiring-monthly/YYYY-MM.json`. Posting IDs start at `MYYMM-001` in platform-number order.
6. Run `npm run generate:hiring-monthly` to produce the Korean and English lists, and link the new month above. The same command updates the last-month summary between the `hiring-monthly` markers in both root READMEs to the latest month.
7. Pass `npm run check` and `npm run test:hiring`. The check covers the window, status rules, ID order, duplicates, and whether generated documents and the README summary are current.
8. In the PR body, report candidate, excluded, and held counts and platform access results.

A few postings whose bodies show clear responsibilities and requirements can also be added to the detailed sample in [AX roles explained through job postings](../hiring-signals.md). That step is optional and reviewed separately from the monthly list.

## Data fields

| Field | Meaning |
| --- | --- |
| `month`, `window`, `checked_at` | List month, application start window, check date |
| `queries`, `platforms` | Queries used and per-platform collection results |
| `postings[].role_type` | `ax`, `ai-agent`, `fde` |
| `postings[].start_date`, `start_basis` | Start date shown on the page, or `null` with `id-range` |
| `postings[].deadline` | Deadline or `rolling` |
| `postings[].status`, `status_basis` | Status and its basis |
| `postings[].tags`, `possible_duplicate_of`, `note` | Tags, possible duplicate's posting number, Korean note |
| `held[]`, `excluded[]` | Held and excluded postings with reason codes |

## Limits

- Only JobKorea was collected, so postings found only on other platforms are missing.
- Search results are sorted by relevance, so postings deep in the results may have been missed.
- Postings without a start date were placed in the window by posting-number range.
- Counts mix reposts and project postings, so they do not represent unique vacancies or market change.
