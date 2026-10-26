# Evidence review for operations and adoption

Checked: `2026-10-26`

This document connects recently published organizational surveys to cost, policy-compliance, and acceptance criteria. Read publication dates separately from observation periods. Respondents' self-reports are neither direct measurements of workflow systems nor evidence of causation.

## Survey scope

| Source | Publication | Actual fieldwork | Sample and scope |
|---|---|---|---|
| KPMG Global AI Pulse Q3 | 2026-09-24 | 2026-07-23 to 2026-08-26 | 2,131 senior leaders across 20 countries and jurisdictions |
| EY AI Risk and Governance | 2026-09-15 | 2026-05-28 to 2026-06-15 | 202 AI oversight leaders in US public companies with at least USD 1 billion in revenue |
| Wharton and GBK AI Adoption | 2026-10-13 | 2026-07-09 to 2026-07-29 | Full-time employees in US private-sector companies meeting size thresholds: 1,007 managers and above, and 409 junior or mid-level staff |

KPMG fieldwork spans the 2026-08-01 case-review baseline. EY and Wharton published after that date, but their fieldwork ended earlier. None of these studies establishes August-to-October growth or demand for Korean AX jobs.

## Costs and workflow outcomes

KPMG examines AI management controls and the connection between costs and value. Organizations reporting established ROI more often report formal management arrangements; this does not demonstrate that establishing those arrangements causes ROI. [Official results and methodology](https://kpmg.com/xx/en/our-insights/ai-and-technology/ai-pulse.html), [publication announcement](https://kpmg.com/xx/en/media/press-releases/2026/09/new-kpmg-ai-pulse-survey-as-ai-maturity-converges-leading-organizations-show-what-ai-at-scale-requires.html).

The roadmap separates token or document volume from reviewed workflow completion. [Operations](../technical-foundations/production-operations.md) and the [experiment card](../toolkit/experiment-card.md) total failures, retries, review, rework, operations, and allocated fixed costs, then divide by completed workflows in the same period. Do not count one workflow repeatedly or omit failure costs. This is the repository's practice criterion, not an official formula from the survey.

## Actual policy compliance

In EY's survey, 98% reported governance policies, but 47% reported experience bypassing governance processes for urgent deployments. The sample consists of responsible leaders at large US public companies; it does not measure violations across all organizations. [Official survey and methodology](https://www.ey.com/en_us/newsroom/2026/09/ey-survey-finds-that-autonomous-ai-implementation-outpaces-oversight-yielding-an-ai-governance-gap).

[Deployment and operations](../delivery-lifecycle/06-production-deployment.md) compares approvals with actual execution and tests policy-service outages, authority revocation, and exception expiry. [Organizational maturity](../organization-maturity/README.md) distinguishes policy documents from observed compliance and stop records. Record the approver, deadline, and follow-up for any permitted exception.

## Acceptance by role

Wharton and GBK separately surveyed managers' and staff members' perceptions of AI use and organizational change. Eligible companies have at least 1,000 employees and more than USD 50 million in revenue. Respondents' reported relationship between autonomy and ROI does not justify removing human approval. [Announcement](https://knowledge.wharton.upenn.edu/special-report/2026-ai-adoption-report/), [full report and methodology](https://knowledge.wharton.upenn.edu/wp-content/uploads/2026/10/Wharton-GBK-AI-Adoption-Report-2026.pdf).

In [adoption](../delivery-lifecycle/07-adoption-and-change.md), managers review goals and investment decisions, users review correction burden and exceptions, and operators review incident handling and handoff. Record differing acceptance results by role and examine their reasons. Exercises without organizational access identify assumed roles and review limitations.

## Limits of application

Survey findings are not outcomes achieved by this repository. The implementation status remains one public simulation and 14 design documents. Judge completion from the particular workflow's execution records and acceptance results, not survey figures. Record claim-level dates, samples, measurement methods, and limitations in the [evidence ledger](../toolkit/evidence-ledger.md).
