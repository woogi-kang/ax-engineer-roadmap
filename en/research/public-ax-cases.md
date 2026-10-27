# Public AX case catalog

Compare workflows, human decisions, and outcome evidence published by companies and institutions. This repository has not audited their operations or reproduced their outcomes.

- Preserved initial-catalog baseline: `2026-08-01` (25 cases)
- Current source review: `2026-10-26`
- Current scope: 16 Korean and 24 international cases (40 workflows)
- All 25 existing cases were attempted. Main source bodies were read for 24; K06 remains historical because access failed.
- Fifteen workflows were added. Recently published, previously omitted, and undated material are separated; different workflows at one organization do not count as different companies.

The original 26 unique source URLs are preserved. There are 54 unique URLs including additions and follow-ups. The [JSON registry](../../research/public-ax-cases.json) records claim-level dates, samples, methods, and limits. See the [refresh record](evidence-refresh-2026-10-26.md) for searches, access failures, and held candidates.

## Three evidence axes

| Axis | Codes | Meaning |
|---|---|---|
| Source | `ORG` / `JOINT` / `VENDOR` / `MIXED` / `GOV` | Organization / joint announcement / vendor customer case / official and independent reporting / government account of a company case |
| Deployment | `PILOT` / `LIMITED` / `LIVE` / `EXPANDING` / `ADJUSTED` / `UNKNOWN` | Pilot / limited operation / operation / expanding / adjusted / unresolved |
| Outcome | `NONE` / `SELF` / `CROSS` / `INDEPENDENT` | No public outcome / self-report / independent directional cross-check / independent evaluation |

Deployment labels describe the time and scope stated by the source, not guaranteed current operation. Neither `LIVE` nor `SELF` establishes independent outcome validation. Separate targets, potential gains, and estimated manual effort from observed results. New outside evidence does not upgrade the implementation status of local exercises. No company outcome is currently classified as independently evaluated (`INDEPENDENT`).

Practice questions are editorial design proposals, not implemented or validated results.

Stopped, reversed, sanctioned and unproven cases are collected separately in [Public AX failure and stop cases](ax-failure-cases.md). That page only references G15 and G24 from this catalog and does not count them again.

## Overview

| ID | Region | Workflow / industry | Organization | Source | Deployment | Outcome |
|---|---|---|---|---|---|---|
| K01 | KR | Petition response drafts and duplicate clustering | 국민권익위원회 외 | ORG | LIMITED | NONE |
| K02 | KR | Corporate credit analysis and opinion drafting | 신한은행 | ORG | LIMITED | NONE |
| K03 | KR | Conversational policy design and automated checks | 신한라이프 | ORG | LIMITED | SELF |
| K04 | KR | In-call answer suggestions and after-call support | LG유플러스 | ORG | LIVE | SELF |
| K05 | KR | Meeting notes, assigned follow-up work, and email drafts | 삼성SDS | ORG | PILOT | SELF |
| K06 | KR | Sensor- and vision-based predictive maintenance alerts | 포스코 | ORG | LIVE | NONE |
| K07 | KR | Finished-product quality prediction during development | LG전자 | ORG | UNKNOWN | SELF |
| K08 | KR | Welfare check-ins and counselor escalation | SK텔레콤 | ORG | LIVE | SELF |
| K09 | KR | Behavior-record support for people with developmental disabilities | SK텔레콤 | ORG | LIMITED | SELF |
| K10 | KR | Attendance, counseling, and activity record integration | LG유플러스 | ORG | UNKNOWN | NONE |
| K11 | KR | Conversational consumer research and analysis | HSAD | ORG | LIVE | SELF |
| K12 | KR | App-review classification and reply drafts | 현대자동차그룹 | ORG | LIVE | SELF |
| K13 | KR | Manual-grounded maintenance assistance | 현대자동차그룹 | ORG | LIVE | SELF |
| K14 | KR | VIN-based production-sequence checks | 현대자동차그룹 | ORG | LIVE | NONE |
| K15 | KR | Translation and minutes for global collaboration | 동원그룹 | VENDOR | LIMITED | NONE |
| K16 | KR | Sheet-metal defect and production-condition analysis | LG전자 | GOV | LIMITED | NONE |
| G01 | US | CRM records and follow-up drafts from client meetings | Morgan Stanley | VENDOR | LIVE | SELF |
| G02 | GLOBAL | From HR questions to employee transfers and employment verification | IBM | ORG | LIVE | SELF |
| G03 | DE | Automation code, sensor setup, and inspection documents | Siemens·thyssenkrupp | JOINT | LIVE | SELF |
| G04 | US | Shop-floor troubleshooting and procurement research | Jabil | VENDOR | LIVE | SELF |
| G05 | DE | Technical-support search across a large product range | Bosch Rexroth | VENDOR | LIVE | NONE |
| G06 | US | Merchandise analysis and operations tickets | Walmart | ORG | LIMITED | NONE |
| G07 | US | Review summaries and product-page content | CarMax | VENDOR | LIVE | SELF |
| G08 | US | Clinical-note drafts from care conversations | Corewell Health | VENDOR | PILOT | SELF |
| G09 | US | M&A diligence and litigation document drafts | Foley Hoag | VENDOR | LIVE | SELF |
| G10 | GLOBAL | Testing, legacy understanding, and technical debt | Accenture | VENDOR | LIVE | SELF |
| G11 | IN_GLOBAL | Underwriting-document extraction and review support | EXL | VENDOR | LIMITED | NONE |
| G12 | AR | Unified government information and tourism queries | 부에노스아이레스시 | VENDOR | LIMITED | SELF |
| G13 | US | Account research and outreach preparation | Lumen Technologies | VENDOR | LIVE | SELF |
| G14 | GLOBAL | Development-document drafts from evidence | Moderna | VENDOR | LIMITED | SELF |
| G15 | SE | Automated service with agent handoff for complex cases | Klarna | MIXED | ADJUSTED | CROSS |
| G16 | UK | Customer-journey research, product planning, and data consolidation | Virgin Atlantic | VENDOR | LIVE | SELF |
| G17 | US | Lead-quality checks, campaign preparation, and recurring reporting | Zapier | VENDOR | LIVE | SELF |
| G18 | DE | Telephone intake, routine answers, and contextual human handoff | Bundesagentur für Arbeit | ORG | PILOT | NONE |
| G19 | US | Evidence lookup contextualized to the patient conversation and chart | Deaconess Health | VENDOR | LIMITED | SELF |
| G20 | US_GLOBAL | Insurance document intake, review routing, and decision audit | DXC Technology | ORG | LIVE | SELF |
| G21 | US | Slack incident investigation through pull requests and post-release checks | Carvana | VENDOR | LIVE | SELF |
| G22 | CH | Internal policy comparison and role-scoped workflow tooling | Pictet | VENDOR | LIMITED | SELF |
| G23 | US | Supplier order-status inquiries and parts operations | GE Appliances | ORG | LIVE | SELF |
| G24 | GLOBAL | Retirement of an agent-coordination role and redesign of accountability | MING Labs | ORG | ADJUSTED | SELF |

## Korean cases

### K01. ACRC and participating agencies — draft responses and duplicate-petition clustering

- **Problem**: Caseworkers separately search the petition, law, precedents, and manuals, then repeatedly handle similar submissions.
- **Verified workflow**: AI finds relevant law and proposes a response. It also clusters semantically similar petitions within a selected period; a caseworker confirms the group before bulk handling.
- **AI role**: Retrieval, summarization, response drafting, semantic clustering, and issue-trend analysis.
- **Human judgment**: Caseworkers edit or rewrite the draft and approve each cluster and bulk-processing target.
- **Roadmap lesson**: Expose citations, preserve edit history, support splitting a bad cluster, and require approval and reprocessing controls.
- **Evidence limit**: Launch at selected agencies is confirmed, but accuracy, handling time, and edit rate are not public. [Korea Policy Briefing](https://www.korea.kr/news/policyNewsView.do?newsId=156743148)

Source check `K01-source-confirmation` (published 2026-02-05; checked 2026-10-26): The source confirms a pilot at selected agencies and caseworker control over drafts and petition groups.

### K02. Shinhan Bank — corporate borrower analysis and credit-opinion support

- **Problem**: Branch staff gather company, financial, industry, transaction, collateral, and technology data to write a corporate credit opinion.
- **Verified workflow**: The system integrates company information and applies analysis logic tailored to 12 major industries.
- **AI role**: Data organization, industry-aware financial interpretation, and evidence integration for an opinion.
- **Human judgment**: Staff review the analysis and own the company-specific credit judgment and proposal.
- **Roadmap lesson**: Separate source financials, industry-rule versions, analysis rights, approval rights, and cited evidence.
- **Evidence limit**: Deployment is confirmed; review time, decision quality, and error rate are not public. [Shinhan Financial Group](https://www.shinhangroup.com/kr/archive/press/detail/679)

Source check `K02-source-confirmation` (published 2026-03-27; checked 2026-10-26): Deployment supports credit review; twelve industries describe coverage, not an evaluation sample or autonomous approval.

### K03. Shinhan Life — conversational insurance-plan design and screening

- **Problem**: Planners move across screens to align customer conditions, coverage limits, and rider rules, then repeatedly revise a plan.
- **Verified workflow**: With customer consent, the system analyzes customer and coverage data, proposes a plan and explanation, accepts conversational edits, and runs computerized screening.
- **AI role**: Direction and alternative recommendations, rule-aware edits, and explanation drafts.
- **Human judgment**: The planner changes the recommendation and confirms the choice with the customer.
- **Roadmap lesson**: Separate deterministic product-rule checks from generative recommendations and join consent, changes, and screening results in one audit trail.
- **Evidence limit**: The February source describes launch without outcome measures; the follow-up below adds self-reported timing evidence (`ORG · LIMITED · SELF`). [Shinhan Financial Group](https://shinhangroup.com/kr/archive/press/detail/637)

Source check `K03-source-confirmation` (published 2026-02-12; checked 2026-10-26): The source describes planners using consented customer data and product rules for design and computerized checks.

Additional check `K03-lico2-speed` (published 2026-10-16; checked 2026-10-26): LICO 2.0 reports about 35% faster recommendations; sample, dates, and speed definition are missing, and this is not design-quality evidence. [Source](https://shinhangroup.com/kr/archive/press/detail/993)

### K04. LG Uplus — in-call answer recommendation and after-call support

- **Problem**: Agents must understand a caller, search internal procedures, respond, and classify the outcome.
- **Verified workflow**: AI analyzes the conversation, retrieves internal information, recommends a contextual answer, and supports after-call classification.
- **AI role**: Conversation understanding, knowledge retrieval, answer generation, and classification.
- **Human judgment**: The agent chooses what to tell the customer and handles exceptions.
- **Reported result**: LG reported a 19% average reduction in total consultation time, about 1.17 million minutes per month.
- **Evidence limit**: Live use is confirmed, but the monthly extrapolation assumptions are public, while the evaluation sample, separate control group, and raw observations are not. [LG](https://www.lg.co.kr/media/release/29014)

Follow-up `K04-followup-metrics` (published 2026-09-30; checked 2026-10-26): LG Uplus reported 16% less consultation time in 2026 than in 2024, waits falling from 47 to 5 seconds, and about 8 million AI-handled inquiries annually. It describes 17 centers without metric-specific observation dates, samples, or denominators; no separately reported control group or detailed calculation method is provided. The earlier 19% figure has not been matched to these conditions; the two figures do not establish a trend. Outcome evidence remains `SELF`. [LG follow-up](https://lg.co.kr/media/release/30616)

Follow-up `K04-followup-human-choice`: the same announcement describes customer choice of consultation mode, human-agent priority for customers aged 65 and above, and coaching informed by AI Auto QA. This is not an independent operational audit. Practice should test human-channel choice, exception escalation, and how review findings inform coaching.

Calculation correction `K04-baseline-calculation-clarification` (published 2025-05-27; checked 2026-10-26): the [original LG release](https://www.lg.co.kr/media/release/29014) gives savings of 17 waiting seconds and 30 talk seconds, about 75,000 daily calls, and 20 workdays as its basis for roughly 1.17 million minutes monthly. The claim that no calculation basis was public is corrected. These assumptions do not establish independent effects or comparability with the 2026 figure.

Source check `K04-source-confirmation` (published 2025-05-27; checked 2026-10-26): The original per-call savings and monthly extrapolation assumptions were checked again.

### K05. Samsung SDS — minutes, assigned follow-up work, and communication drafts

- **Problem**: People repeatedly create captions, translations, minutes, follow-up work with owners and deadlines, summaries, and email drafts.
- **Verified workflow**: Brity Works creates these artifacts across meetings, mail, messaging, and documents.
- **AI role**: Speech recognition, translation, summarization, follow-up-work extraction, and drafting.
- **Human judgment**: Users verify the output and decide whether to share, send, or apply it.
- **Roadmap lesson**: Separate attendee consent, decision-versus-suggestion labeling, follow-up owner and deadline confirmation, and external-send approval.
- **Evidence limit**: Samsung reported over 75% less minutes-writing time and over 66% less email work in an internal pilot of about 10,000 people; methods and error rates are not public. [Samsung SDS](https://www.samsungsds.com/kr/news/sds-genai-mediaday.html)

Follow-up `K05-followup-public-sector` (published 2026-08-13; checked 2026-10-26): Samsung SDS announced that nine central-government ministries had selected Brity Works, with staged service starts planned by August 2026. Nine is a count of selecting institutions, not an outcome-evaluation sample. This source does not verify operation or results in all institutions. Their population differs from the earlier internal pilot of about 10,000 people; the original `PILOT` classification and outcome scope are preserved. [Samsung SDS follow-up](https://www.samsungsds.com/kr/news/sds-2608013.html)

Source check `K05-source-confirmation` (published 2024-05-02; checked 2026-10-26): The original time-saving claims concern a self-reported internal pilot of about 10,000 people.

Additional check `K05-public-service-launch` (published 2026-04-30; checked 2026-10-26): Separate the OnAI launch from Drive use at about 70 agencies and August’s nine ministries; internal savings do not transfer. [Source](https://www.samsungsds.com/kr/news/bw-260430.html)

### K06. POSCO — sensor- and vision-based predictive maintenance

- **Problem**: Experience-led inspection and reactive maintenance can miss subtle equipment anomalies or delay operator awareness.
- **Previously recorded workflow**: PIMS integrates equipment data; rolling-process and vision models detect coil-width mismatch and plate drift and warn operators.
- **AI role**: Sensor and video anomaly detection, state comparison, and early warning.
- **Human judgment**: Operators confirm the warning and decide maintenance or operating action.
- **Roadmap lesson**: Normal baselines, alert thresholds, false-positive and false-negative cost, sensor failure, manual operation, and emergency stop come before model fluency.
- **Evidence limit**: The earlier source described field use without failure-reduction or false-alert measures. [POSCO Newsroom](https://newsroom.posco.com/kr/%ED%8F%AC%EC%8A%A4%EC%BD%94-%ED%8F%AC%ED%95%AD%EC%A0%9C%EC%B2%A0%EC%86%8C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A1%9C-%EC%84%A4%EB%B9%84%EB%A5%BC-%EC%9D%BD%EB%8B%A4-data-ai-%EA%B8%B0%EB%B0%98/)

Access check on 2026-10-26: the original and a follow-up found in search returned 502. Search excerpts do not support a new verified claim; the description and `LIVE · NONE` retain their earlier evidence scope.

### K07. LG Electronics — finished-product quality prediction during development

- **Problem**: Comparing design and test conditions to predict finished-product quality is slow.
- **Verified workflow**: LG announced development of AI quality-prediction technology; the web-based `Eng.AI` interface and staged product-design use were plans at publication.
- **AI role**: Development-condition analysis and finished-product quality prediction.
- **Human judgment**: Developers decide additional tests, design changes, and release implications.
- **Roadmap lesson**: Track model-versus-test variance, product-family data drift, safety criteria, and release approval separately.
- **Evidence limit**: LG reported up to 99% less prediction time, but product scope, sample, and measurement method are not public. [LG](https://www.lg.co.kr/media/release/28789)

Operating-boundary correction `K07-platform-plan-correction` (published 2025-03-27; checked 2026-10-26): Eng.AI was a planned platform. Existing developer use and the earlier `LIMITED` classification were not established, so deployment is corrected to `UNKNOWN`. The maximum 99% remains a company technology claim, not a platform-operating outcome.

Source check `K07-source-confirmation` (published 2025-03-27; checked 2026-10-26): The source supports the existing distinction between developed technology and planned Eng.AI deployment.

### K08. SK Telecom — check-in calls and escalation for vulnerable people

- **Problem**: Care workers and local governments must contact many households regularly without missing risk signals.
- **Verified workflow**: AI calls weekly, detects concerning statements, and connects the case to human counseling or support such as a hospital visit.
- **AI role**: Repetitive calls, response classification, and risk-signal detection.
- **Human judgment**: Monitoring and counseling staff decide counseling, visits, hospital accompaniment, or emergency support.
- **Roadmap lesson**: Measure missed risks, false alerts, completed handoffs, retry policy, and emergency response time—not call volume alone.
- **Evidence limit**: SKT reported check-ins covering more than 110,000 people and 4,063 counseling handoffs in one year; independent sensitivity and specificity are not public. [SK Telecom Newsroom](https://news.sktelecom.com/200115)

Unit correction `K08-people-unit-correction` (published 2023-11-28; checked 2026-10-26): the source distinguishes 110,538 people from about 1.76 million calls. English wording implying 110,000 check-in events is corrected to more than 110,000 people. The 4,063 counseling connections also count people, not verified safety effects.

Source check `K08-source-confirmation` (published 2023-11-28; checked 2026-10-26): The source supports the existing distinction among people reached, calls, and people referred to counseling.

### K09. SK Telecom — behavioral-record support for people with developmental disabilities

- **Problem**: Care staff cannot easily observe sudden behavior and record its frequency and pattern at the same time.
- **Verified workflow**: Vision AI uses existing CCTV infrastructure to identify behavioral events and create records for care-worker review.
- **AI role**: Behavior recognition, event classification, and observation-record generation.
- **Human judgment**: Care staff validate context and decide how records affect support plans.
- **Roadmap lesson**: Separate video consent and retention, identity-related bias, immediate safety response, and later recordkeeping.
- **Evidence limit**: SKT describes use at 12 facilities and reports up to 90% less record work; metric-level samples and clinical impact are not public. Deployment is corrected to limited operation. [SK Telecom Newsroom](https://news.sktelecom.com/214674)

Deployment-scope correction `K09-deployment-scope-correction` (published 2025-08-28; checked 2026-10-26): the source explicitly describes 12 sites in use, correcting the earlier `PILOT` label to `LIMITED`. Site count is not the sample for the 90% measure; publication-time scope does not verify current operation.

Source check `K09-source-confirmation` (published 2025-08-28; checked 2026-10-26): The source supports the existing correction to use at twelve sites at publication.

Additional check `K09-expert-intervention-boundary` (published 2026-06-10; checked 2026-10-26): Experts review records for intervention; the care LLM and guardian AI remain development/plans, without verified clinical effects. [Source](https://news.sktelecom.com/226306)

### K10. LG Uplus — unified attendance, counseling, and activity records

- **Problem**: Teachers manage attendance, learning activity, counseling, and schedules across different screens and documents.
- **Verified workflow**: The product connects student-information, learning-management, and counseling data to provide attendance, student cards, AI-supported activity records, and counseling material.
- **AI role**: Record integration and analysis, student-level activity and counseling material, and suggested learning activities.
- **Human judgment**: Teachers verify records and decide their use in counseling, evaluation, and teaching.
- **Roadmap lesson**: Require data minimization, teacher correction rights, evidence for generated records, and approval and correction before official student-record use.
- **Evidence limit**: Product scope and a planned Jeju pilot are documented; actual pilot operation is not established, so the classification is corrected to `ORG · UNKNOWN · NONE`. [LG Uplus](https://www.lguplus.com/biz/all/product-service/metaverse/superschool/B000000140)

Source check `K10-source-confirmation` (publication date unknown; checked 2026-10-26): The undated product page describes teacher-administration functions without a pilot start date.

Additional check `K10-pilot-plan-correction` (published 2025-12-12; checked 2026-10-26): The 2025-12-12 agreement plans ten schools and 2026 service; without launch evidence, `PILOT` becomes `UNKNOWN`, preserving the prior classification in history. [Source](https://news.lguplus.com/20952)

### K11. HSAD: consumer research

- **Reported workflow**: Adaptive questions support research. The company reports research time falling from more than four weeks to about two and research/analysis costs falling by roughly 70%. Project count and included costs are undisclosed.
- **Practice questions**: Test comparability after branching, consent, source retention, and analysis review.
- **Evidence limits**: Research quality, representativeness, consent procedures, and final approval controls were not established. `ORG · LIVE · SELF`. [Source 2026-09-30](https://lg.co.kr/media/release/30615)
- **Claim records**: `K11-initial-review`. Checked 2026-10-26; dates, samples, and methods are recorded in JSON.

### K12. Hyundai Motor Group: app-review replies

- **Reported workflow**: Classify reviews, draft from source knowledge, then obtain staff review before delivery. The reported average handling-time change from 35 to five minutes is a company comparison with an undisclosed sample and calculation.
- **Practice questions**: Compare approval, correction, and send records when evidence changes or replies are wrong.
- **Evidence limits**: 85% is coverage; September automation was planned. `ORG · LIVE · SELF`. [Source 2026-08-12](https://www.hyundaimotorgroup.com/ko/news/hyundai-motor-group-dx-ax-ai-innovation)
- **Claim records**: `K12-initial-review`. Checked 2026-10-26; dates, samples, and methods are recorded in JSON.

### K13. Hyundai Motor Group: maintenance assistance

- **Reported workflow**: Technicians retrieve manuals and maintenance records and verify official evidence. The reported response-time reduction of roughly 42% is a company comparison with undisclosed task definitions and evaluation sample.
- **Practice questions**: Test rejection of wrong-model or obsolete evidence and human escalation for hazardous work.
- **Evidence limits**: Not evidence of diagnostic accuracy or autonomous repair. `ORG · LIVE · SELF`. [Source 2026-08-12](https://www.hyundaimotorgroup.com/ko/news/hyundai-motor-group-dx-ax-ai-innovation) [Source 2026-10-22](https://hyundaimotorgroup.co.kr/ko/news/hyundai-motor-group-softeer-tech-talk-off-day)
- **Claim records**: `K13-initial-review` · `K13-manual-evidence-review`. Checked 2026-10-26; dates, samples, and methods are recorded in JSON.

### K14. Hyundai Motor Group: VIN checks

- **Reported workflow**: VIN recognition checks production sequence; 73 processes describes deployment scope.
- **Practice questions**: Test unreadable identifiers, stale records, and manual-restart authority separately.
- **Evidence limits**: Action authority is undisclosed; process and location counts are not comparable. `ORG · LIVE · NONE`. [Source 2026-10-22](https://hyundaimotorgroup.co.kr/ko/news/hyundai-motor-group-softeer-tech-talk-off-day)
- **Claim records**: `K14-initial-review`. Checked 2026-10-26; dates, samples, and methods are recorded in JSON.

### K15. Dongwon Group: global collaboration

- **Reported workflow**: A vendor account describes translation, minutes, schedules, and internal lookup.
- **Practice questions**: Check speaker, decision, and proposal translation errors and sharing permissions.
- **Evidence limits**: User coverage and send approvals are undisclosed; this does not establish use of Cowork, shown at the same event. `VENDOR · LIMITED · NONE`. [Source 2026-09-08](https://www.samsungsds.com/kr/news/sds20260908.html)
- **Claim records**: `K15-initial-review`. Checked 2026-10-26; dates, samples, and methods are recorded in JSON.

### K16. LG Electronics: sheet-metal analysis

- **Reported workflow**: A government account describes linking manufacturing data to analyze defects and conditions.
- **Practice questions**: Compare predictions with inspections after material or equipment changes and check change approval.
- **Evidence limits**: Individual outcomes and approval authority are undisclosed; aggregated results across about 170 sites are not LG’s effect. This differs from K07. `GOV · LIMITED · NONE`. [Source 2026-09-11](https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/172187/view)
- **Claim records**: `K16-initial-review`. Checked 2026-10-26; dates, samples, and methods are recorded in JSON.

## International cases

### G01. Morgan Stanley — meeting notes, CRM records, and follow-up drafts

- **Problem**: Financial advisers search a large internal corpus and document meetings and follow-up work.
- **Verified workflow**: An internal knowledge assistant retrieves documents. With client consent, `Debrief` turns Zoom recordings into client notes and follow-up drafts connected to CRM.
- **AI role**: Internal search, research and meeting summaries, follow-up work, and communication drafts.
- **Human judgment**: Advisers edit and approve the record and any client communication.
- **Roadmap lesson**: High-risk knowledge work needs expert scoring, regression evaluation, customer consent, and review before CRM writes—not RAG alone.
- **Evidence limit**: Adoption figures, including 98% team usage, come from a joint vendor/customer story and are not independently verified. [OpenAI](https://openai.com/index/morgan-stanley/)

Review `G01-source-confirmation-20261026` (checked 2026-10-26): The 98% figure concerns adviser teams using Assistant, not Debrief accuracy or adoption. Source review, not a live operating audit or independent outcome validation. [Source 1](https://openai.com/index/morgan-stanley/)

Review `G01-finance-design-partnership` (checked 2026-10-26): Investment-banking and equity-research design work is separate from Debrief. Do not combine a product partnership with verified deployment outcomes. [Source 1](https://openai.com/index/introducing-chatgpt-financial-services/)

### G02. IBM — from HR questions to employee transfers and employment verification

- **Problem**: Fragmented HR bots and channels make policy search and repetitive requests difficult.
- **Verified workflow**: `AskHR` grew from a single policy-answering entry point to HR operations such as employment verification and employee transfers.
- **AI role**: Intent classification, policy retrieval and answers, domain routing, and structured execution.
- **Human judgment**: HR specialists take complex cases; established permissions still govern manager actions.
- **Roadmap lesson**: Pilot small workflows, hand complex requests to HR specialists quickly, and retain feedback instead of closing all channels in one migration.
- **Evidence limit**: IBM reports an early NPS of -35, then a CSAT score of +74 after changing the metric. These do not establish improvement on one consistent measure; the CSAT calculation and samples are not public. [IBM](https://www.ibm.com/case-studies/ibm-transformation/ask-hr)

Metric correction `G02-metric-correction` (publication date unknown; checked 2026-10-26): the [IBM source](https://www.ibm.com/case-studies/ibm-transformation/ask-hr) explicitly switches from NPS to CSAT. The earlier catalog's CSAT -35 to +74 description was incorrect. Fieldwork periods, samples, and the CSAT calculation are unreported; the case remains self-reported `SELF`. This check is limited to metric wording and establishes neither a new market change nor a causal effect.

Review `G02-source-confirmation-20261026` (checked 2026-10-26): NPS -35 and CSAT +74 are different metrics; the current source names transfers and employment verification. This does not establish absence of leave functions; metric periods and samples are unreported. [Source 1](https://www.ibm.com/case-studies/ibm-transformation/ask-hr)

### G03. Siemens and thyssenkrupp — automation code, sensor setup, and inspection documents

- **Problem**: Automated assembly lines repeatedly require control code, sensor configuration, inspection steps, and documentation.
- **Verified workflow**: Industrial Copilot supports data management, sensor setup, code, visualizations, and inspection-report drafting.
- **AI role**: Automation-code generation, panel visualization, setup and document drafts, and troubleshooting answers.
- **Human judgment**: Engineers edit code, confirm equipment safety and inspection requirements, and authorize deployment.
- **Roadmap lesson**: Completion requires PLC and sensor state, safety interlocks, simulation, change approval, and rollback—not generation speed alone.
- **Evidence limit**: Siemens reported 30-second visualizations and about 20% code modification; these are vendor-reported measures. [Siemens](https://press.siemens.com/global/en/pressrelease/siemens-and-microsoft-scale-industrial-ai)

Review `G03-source-confirmation-20261026` (checked 2026-10-26): Separate use reported in 2024 from planned global rollout in 2025; 120,000 refers to the TIA Portal user base. Source review, not a live operating audit or independent outcome validation. [Source 1](https://press.siemens.com/global/en/pressrelease/siemens-and-microsoft-scale-industrial-ai)

### G04. Jabil — shop-floor troubleshooting and procurement research

- **Problem**: Operators search documents, tickets, and knowledge bases for diagnostics while procurement and account teams repeat separate research.
- **Verified workflow**: A shop-floor assistant searches multiple knowledge sources and was extended to procurement and customer research.
- **AI role**: Manufacturing-knowledge retrieval, diagnostic information, and research support.
- **Human judgment**: Operators decide physical action; procurement staff validate proposals.
- **Roadmap lesson**: Document freshness, site-specific equipment, language, ticket state, dangerous-work escalation, and floor feedback matter more than prototype speed.
- **Evidence limit**: This is an AWS customer story, and published deployment and time figures do not isolate the assistant's effect. [AWS](https://aws.amazon.com/solutions/case-studies/jabil-manufacturing-transformation-generative-ai/)

Review `G04-source-confirmation-20261026` (checked 2026-10-26): Deployment 67–83%, processing 74%, and cost 23% improvements concern cloud modernization, not the assistant alone. Source review, not a live operating audit or independent outcome validation. [Source 1](https://aws.amazon.com/solutions/case-studies/jabil-manufacturing-transformation-generative-ai/)

### G05. Bosch Rexroth — technical-support search across a large product range

- **Problem**: Service staff must find correct answers among technical material for more than 500,000 hydraulic products.
- **Verified workflow**: Hydraulic Hub's Smart Assistant retrieves product data to support service questions and troubleshooting.
- **AI role**: Product and technical-document retrieval, answers, and troubleshooting guidance.
- **Human judgment**: Service staff confirm product and site conditions before advising or acting.
- **Roadmap lesson**: Make part number, version, and installation environment an input contract; return source text and applicable products with every answer.
- **Evidence limit**: Purpose and deployment are public, but handling time, resolution rate, and error rate are not. [AWS](https://aws.amazon.com/solutions/case-studies/bosch-rexroth-generativeai/)

Review `G05-source-confirmation-20261026` (checked 2026-10-26): Smart Assistant supports retrieval across over 500,000 products; an outcome-evaluation sample is not reported. Source review, not a live operating audit or independent outcome validation. [Source 1](https://aws.amazon.com/solutions/case-studies/bosch-rexroth-generativeai/)

Review `G05-hydraulic-hub-workflow` (checked 2026-10-26): The product connects identification, technical documents, maintenance checklists, and service requests. Samples, periods, and methods behind advertised maximum improvements are unreported; not a new measured outcome. [Source 1](https://www.boschrexroth.com/en/gb/connected-hydraulics/products/hydraulic-hub/)

### G06. Walmart — merchandise-performance analysis and operations tickets

- **Problem**: Merchants combine reports and spreadsheets to explain over- or under-performance and resolve operational issues.
- **Verified workflow**: `Wally` uses a semantic layer over merchandise data for data entry, analysis, root-cause candidates, operational questions, and unresolved-ticket creation.
- **AI role**: Complex data interpretation, cause candidates, usage guidance, and ticket creation.
- **Human judgment**: Merchants decide pricing, inventory, promotion, and execution.
- **Roadmap lesson**: Distinguish correlation from cause and separate state refresh, recommendation evidence, strategy, and tactical execution authority.
- **Evidence limit**: Internal deployment and capabilities are official; quantitative outcomes are not public, and future autonomy remains a plan. [Walmart](https://corporate.walmart.com/news/2025/03/18/walmart-develops-genai-powered-assistant-for-walmart-merchants)

Review `G06-source-confirmation-20261026` (checked 2026-10-26): Separate Wally’s query, analysis, and ticket support from its future autonomous-action objective. Source review, not a live operating audit or independent outcome validation. [Source 1](https://corporate.walmart.com/news/2025/03/18/walmart-develops-genai-powered-assistant-for-walmart-merchants)

Review `G06-agent-profiles-plan` (checked 2026-10-26): Consumer Agent Profiles were planned for the following month and are separate from Wally. Approval and spending-limit designs are not completed adoption or merchant-workflow outcomes. [Source 1](https://corporate.walmart.com/news/2026/10/Making-It-Possible-for-Agents-to-Shop-on-Behalf-of-Customers)

### G07. CarMax — review summaries and product-page content

- **Problem**: Keeping thousands of vehicle pages consistent and current requires extensive editorial work.
- **Verified workflow**: AI summarizes customer reviews and vehicle information; editors verify context, accuracy, and brand voice.
- **AI role**: Review summaries and model, trim, and related-content drafts.
- **Human judgment**: Editors approve each page before publishing.
- **Roadmap lesson**: Track edit rate, factual error, stale vehicle data, page-level evidence, and unpublishing—not generation volume alone.
- **Evidence limit**: Microsoft reports 5,000 pages produced in months and an 80% editorial approval rate, against a company estimate of 11 manual years; detailed measurement design and long-term quality are not public. [Microsoft](https://www.microsoft.com/en/customers/story/1501304071775762777-carmax-retailer-azure-openai-service)

Comparison correction `G07-comparison-basis-clarification` (published 2022-05-24; checked 2026-10-26): the company disclosed an estimate of roughly 11 manual years as its comparator, not a concurrent control or 11 years of observed work. Distinguish the 5,000 production pages from the evaluation denominator for the 80% approval rate.

Review `G07-source-confirmation-20261026` (checked 2026-10-26): Eleven manual years for 5,000 pages is an estimate; 80% editorial approval is not factual accuracy. Source review, not a live operating audit or independent outcome validation. [Source 1](https://www.microsoft.com/en/customers/story/1501304071775762777-carmax-retailer-azure-openai-service)

Review `G07-customer-app-boundary` (checked 2026-10-26): The vehicle-search and offer-tool app launch is separate from editorial production. Pre-baseline publication; app availability does not establish editorial outcomes. [Source 1](https://media.carmax.com/press-releases/news-release/2026/CarMax-Launches-First-of-Its-Kind-Car-Shopping-and-Selling-Experience-in-ChatGPT-App-Store/default.aspx)

### G08. Corewell Health — clinical-note drafts from care conversations

- **Problem**: Clinicians must converse with patients and later complete structured clinical documentation.
- **Verified workflow**: The system turns the care conversation into a draft for clinician review before entry into the electronic health record.
- **AI role**: Conversation recognition, clinical-note structuring, and drafting.
- **Human judgment**: Clinicians fix omissions and errors and sign the final note.
- **Roadmap lesson**: Require patient consent, source-conversation traceability, specialty-specific evaluation, edit-burden measurement, and approval before EHR write.
- **Evidence limit**: Abridge reported planned expansion after a 90-day pilot to 4,000 clinicians across 21 hospitals and more than 300 sites; this is a vendor pilot story, not an independent clinical-outcome study. [Abridge](https://www.abridge.com/case-study/corewell-health)

Follow-up `G08-relationship-events-study` (published 2026-06-29; checked 2026-10-26): a single-residency conference abstract compared the 26 of 47 visits containing relationship-significant events. A panel scored clinician-dictated and AI notes against a transcript from the same visit on a 0–2 scale. Clinician notes scored higher in 14 cases; AI notes in two. Collection dates and model version are unreported. This small study does not generalize to all clinical documentation or current models. It is missing pre-baseline evidence, separate from the vendor's expansion plan. [Corewell Health, Human Relationships and AI Hype](https://scholarlyworks.corewellhealth.org/family_medicine_confabstract/34/)

Practice should evaluate omitted relationship events, clinician additions, and correction burden alongside recording time. The original case remains `PILOT · SELF`.

Review `G08-source-confirmation-20261026` (checked 2026-10-26): Separate the 90-day pilot from planned access for 4,000 clinicians; the residency study is a different sample. Source review, not a live operating audit or independent outcome validation. [Source 1](https://www.abridge.com/case-study/corewell-health)

Review `G08-clinician-assistant-interview` (checked 2026-10-26): A clinician describes chart and evidence lookup and sending reviewed replies. An edited interview with one clinician; not the same cohort as the pilot or residency study. [Source 1](https://www.abridge.com/blog/corewell-kristin-jacob-abridge-assistant)

### G09. Foley Hoag — M&A diligence tables and litigation drafts

- **Problem**: Lawyers structure clauses, issues, facts, and disclosure items from large deal rooms and litigation records.
- **Verified workflow**: The system builds contract tables, flags issues with citations, drafts disclosure schedules, and identifies candidate facts in court documents.
- **AI role**: Contract analysis, clause and issue extraction, tables and schedules, and litigation-fact organization.
- **Human judgment**: Lawyers verify quoted sources, make legal judgments, and approve client work.
- **Roadmap lesson**: Tie each conclusion to source text and enforce confidentiality, jurisdiction, document version, access control, and lawyer sign-off.
- **Evidence limit**: Harvey reports at least a one-third reduction in some M&A review cycles and 8–10 hours saved in a litigation experiment; case comparability and quality methods are not public. [Harvey](https://www.harvey.ai/customers/foley-hoag)

Review `G09-source-confirmation-20261026` (checked 2026-10-26): The time-saving survey is self-report from 55 lawyers; matter-specific figures are not firmwide outcomes. Source review, not a live operating audit or independent outcome validation. [Source 1](https://www.harvey.ai/customers/foley-hoag)

### G10. Accenture — tests, legacy-code understanding, and technical debt

- **Problem**: Developers spend time on tests, legacy-code comprehension, repetitive implementation, and accumulated technical debt.
- **Verified workflow**: Copilot is used for unit, functional, and performance tests, legacy explanation and refactoring, and reuse of common code.
- **AI role**: Code and test drafts, explanations, and refactoring suggestions.
- **Human judgment**: Developers own architecture, review, test outcomes, security checks, and deployment.
- **Roadmap lesson**: Compare successful builds, defects, change-failure rate, review burden, security findings, and rework—not accepted code volume.
- **Evidence limit**: GitHub describes a 20-person pilot, a randomized controlled trial with 450 users and 200 controls, and subsequent rollout to thousands. The full method and effect size are not public; deployment is corrected from pilot to operation. [GitHub](https://github.com/customer-stories/accenture)

Deployment-scope correction `G10-rollout-scope-correction` (publication date unknown; checked 2026-10-26): the earlier `PILOT` label omitted the source-reported rollout to thousands after the trial and is corrected to `LIVE`. The 450 and 200 are trial groups, not current users. Vendor reporting and unknown dates do not establish recent hiring or adoption growth or independent outcomes.

Review `G10-source-confirmation-20261026` (checked 2026-10-26): Separate the 20-person pilot, 450-user/200-control trial, and later rollout; 12,000 seats describes access. Source review, not a live operating audit or independent outcome validation. [Source 1](https://github.com/customer-stories/accenture)

### G11. EXL — underwriting-document extraction and review support

- **Problem**: Insurance underwriters read hundreds of pages of medical and application records to structure an initial assessment.
- **Verified workflow**: OCR and text analysis extract documents, remove personal information, and feed a RAG assistant for review support.
- **AI role**: Scan extraction, sensitive-data removal, document retrieval, and initial-assessment support.
- **Human judgment**: Underwriters verify the evidence and own risk and enrollment decisions.
- **Roadmap lesson**: Separate OCR completeness, health-data protection, source linkage, product rules, and final-underwriter approval.
- **Evidence limit**: EXL estimates a shift from days to hours and potential cost reduction up to 80%, but the insurer and methodology are not disclosed. [AWS](https://aws.amazon.com/solutions/case-studies/exl-case-study/)

Review `G11-source-confirmation-20261026` (checked 2026-10-26): Initial customers onboarded after the August 2024 launch. Up to 80% is EXL’s estimated savings potential. Correct prior SELF to NONE: underwriting savings are potential; 60-day development is separate. [Source 1](https://aws.amazon.com/solutions/case-studies/exl-case-study/)

### G12. City of Buenos Aires — unified government information and tourism questions

- **Problem**: Fragmented public-service channels make government information hard to find.
- **Verified workflow**: `Boti` provides a single channel, while generative AI starts in lower-sensitivity tourism and culture queries with personalized Spanish and English responses.
- **AI role**: Government-knowledge retrieval, natural-language questions, and tourism information and itinerary personalization.
- **Human judgment**: Government teams manage the corpus, language and political sensitivity, allowed scope, and expansion.
- **Roadmap lesson**: Begin with low-sensitivity work and evaluate authoritative sources, multilingual consistency, political neutrality, privacy, and channel parity.
- **Evidence limit**: Do not attribute Boti's overall two million monthly interactions to its limited generative feature. The Microsoft story partially blends the two. [Microsoft](https://www.microsoft.com/en/customers/story/21596-government-of-the-city-of-buenos-aires-azure-open-ai-service)

Review `G12-source-confirmation-20261026` (checked 2026-10-26): Separate Boti’s two million monthly queries from 17,000 generative-tourism queries; the latter reports 50% lower workload. Correct prior NONE to SELF because a self-report exists; this is not independent verification. [Source 1](https://www.microsoft.com/en/customers/story/21596-government-of-the-city-of-buenos-aires-azure-open-ai-service)

### G13. Lumen Technologies — account research and outreach preparation

- **Problem**: B2B sellers combine company, contract, relationship, and meeting data across systems before outreach.
- **Verified workflow**: Copilot and Salesforce integration support account research, notes, administrative work, and alignment of sales data with interaction history.
- **AI role**: Account-research summaries, meeting notes, outreach material, and follow-up drafts.
- **Human judgment**: Sellers choose the customer context, message, and sales action.
- **Roadmap lesson**: Measure CRM freshness, wrong account facts, message review, duplicate contact, and actual sales outcomes alongside research time.
- **Evidence limit**: Lumen reports reducing account research from four hours to 15 minutes, but sample and calculation are not public. [Microsoft](https://www.microsoft.com/en/customers/story/1771760434465986810-lumen-microsoft-copilot-telecommunications-en-united-states/)

Review `G13-source-confirmation-20261026` (checked 2026-10-26): Four-hour to 15-minute research and $50 million annual value are company claims, not verified realized revenue. Source review, not a live operating audit or independent outcome validation. [Source 1](https://www.microsoft.com/en/customers/story/1771760434465986810-lumen-microsoft-copilot-telecommunications-en-united-states/)

### G14. Moderna — development-document drafts from evidence

- **Problem**: Clinical, product, and marketing teams jointly review hundreds of pages to create a Target Product Profile.
- **Verified workflow**: The system extracts facts and assumptions from up to about 300 pages, creates structured section drafts, and flags possible errors for cross-functional review.
- **AI role**: Large-corpus summarization, fact and assumption extraction, document structuring, and error candidates.
- **Human judgment**: Domain specialists validate assumptions and trade-offs and decide the development direction.
- **Roadmap lesson**: Explicitly separate evidence from assumptions and track sentence-level sources, domain approvals, versions, and change impact.
- **Evidence limit**: This is a vendor report; Moderna reports weeks-to-hours changes for a core analytical step in some cases, not the entire TPP. Detailed measurement and independent validation are not public. [OpenAI](https://openai.com/business/guides-and-resources/the-state-of-enterprise-ai-2025-report/)

Review `G14-source-confirmation-20261026` (checked 2026-10-26): The reported weeks-to-hours change concerns a core analytical step in some cases, not the entire TPP. Correct prior NONE to SELF because a self-report exists; this is not independent verification. [Source 1](https://openai.com/business/guides-and-resources/the-state-of-enterprise-ai-2025-report/)

### G15. Klarna — automated service with agent handoff for complex cases

- **Problem**: A multilingual payments service must run around the clock while handling refunds, returns, financial habits, identity theft, and disputes.
- **Initial workflow and claim**: Klarna reported human-level satisfaction, 25% fewer repeat inquiries, and resolution time falling from 11 minutes to under two.
- **Later change**: AP reported that, alongside cost savings, Klarna restored some staffing because complex cases such as identity theft require experienced people.
- **AI role**: High-volume, repetitive, multilingual support and structured actions.
- **Human judgment**: Skilled staff take identity, dispute, and exception cases and unresolved AI conversations.
- **Roadmap lesson**: Do not optimize automation rate alone; design escalation accuracy, complex-case quality, repeat contact, the right to choose a human, and retention of expert service skills.
- **Evidence limit**: Initial metrics are company and vendor claims; the operating adjustment is independently reported. This is better read as rebalancing human and AI roles than a complete reversal. [Initial official story](https://openai.com/index/klarna/) · [AP follow-up](https://apnews.com/article/artificial-intelligence-chatbot-customer-service-call-center-ca87ae77d7c6797ebb2628bd1b532929)

Review `G15-source-confirmation-20261026` (checked 2026-10-26): Initial service metrics are company and vendor self-reports. Work equivalent to 700 agents is not an actual layoff count. [Source 1](https://openai.com/index/klarna/)

Review `G15-operating-adjustment-confirmation` (checked 2026-10-26): AP reports additional human support for complex cases. Only the operating direction is cross-checked, not the initial metrics. [Source 1](https://apnews.com/article/artificial-intelligence-chatbot-customer-service-call-center-ca87ae77d7c6797ebb2628bd1b532929)


### G16. Virgin Atlantic

- **Workflow and judgment**: Teams assemble journey evidence; product staff review findings and choose actions.
- **Evidence and limits**: `G16-initial-review`, published 2026-08-10, checked 2026-10-26. Firmwide ROI and customer outcomes were not validated. [Source 1](https://openai.com/index/virgin-atlantic/chatgpt-work/)

### G17. Zapier

- **Workflow and judgment**: Lead checks, campaign preparation, and reporting are connected, with team review.
- **Evidence and limits**: `G17-initial-review`, published 2026-08-10, checked 2026-10-26. Seven-figure pipeline value is not realized revenue; a persistent shared-context system remains a plan. [Source 1](https://openai.com/index/zapier/)

### G18. Bundesagentur für Arbeit

- **Workflow and judgment**: Routine calls are assisted; complex cases and legally binding decisions remain with staff.
- **Evidence and limits**: `G18-initial-review`, published 2026-09-23, checked 2026-10-26. AI throughput and time savings are unreported; personal-record use is a later plan. [Source 1](https://www.arbeitsagentur.de/en/press/2026-36-more-service-and-shorter-waiting-times-federal-employment-agency-starts-test-phase-with-ai-voice-assistance)

### G19. Deaconess Health

- **Workflow and judgment**: Evidence lookup uses the conversation and chart; the clinician decides.
- **Evidence and limits**: `G19-initial-review`, published 2026-09-29, checked 2026-10-26. Not a diagnostic or clinical-outcome study; 300 systems is not the evaluation sample. [Source 1](https://www.abridge.com/blog/deaconess-olivia-taylor-abridge-assistant)

### G20. DXC Technology

- **Workflow and judgment**: Insurance documents are structured and routed to people for consequential decisions with audit records.
- **Evidence and limits**: `G20-initial-review`, published 2026-10-15, checked 2026-10-26. The 80% first draft is not overall accuracy; 1,100 customers and total policy volume are not Claude usage denominators. [Source 1](https://dxc.com/insights/customer-stories/dxc-claude-insurance-backbone)

### G21. Carvana

- **Workflow and judgment**: Slack alerts lead to investigated PRs for human review.
- **Evidence and limits**: `G21-initial-review`, publication unknown, checked 2026-10-26. The two-week/five-case investigation test is separate. Samples and measurement periods for 56% fewer alerts and 65% faster answers are unreported. [Source](https://claude.com/customers/carvana)

### G22. Pictet

- **Workflow and judgment**: Internal policy comparison and tooling are supported within risk-reviewed use and data boundaries.
- **Evidence and limits**: `G22-initial-review`, published unknown, checked 2026-10-26. Body publication date and full quality evaluation unreported; access and training are not outcomes. [Source 1](https://claude.com/customers/pictet)

### G23. GE Appliances

- **Workflow and judgment**: Supplier order-status inquiries are automated within the parts team’s workflow.
- **Evidence and limits**: `G23-initial-review`, published 2026-04-22, checked 2026-10-26. Formula, controls, and detailed approval procedures unreported; pre-baseline evidence. [Source 1](https://pressroom.geappliances.com/news/ge-appliances-reinvents-manufacturing-operations-at-scale-with-google-clouds-gemini-enterprise)

`G23-later-recap`: The September vendor article repeats outcomes in the April company release. Not a new observation or independent validation; do not double-count the figures. [Source 1](https://cloud.google.com/transform/agentic-factory-manufacturing-new-age-of-autonomy-industrial-ai)

### G24. MING Labs

- **Workflow and judgment**: MING retired coordination agent Major Tom and redesigned workflow ownership.
- **Evidence and limits**: `G24-initial-review`, published 2026-04-02, checked 2026-10-26. Self-report of one role retired after 13 days, not other agents’ outcomes or companywide AI withdrawal. [Source 1](https://www.minglabs.com/insights/articles/we-fired-an-ai-agent) · [Source 2](https://www.minglabs.com/insights/articles/we-fired-an-ai-agent.json)
