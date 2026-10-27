# Public AX Failure and Stop Cases

This page collects attempts that were stopped or rolled back, that led to regulatory or legal liability, or whose evaluation did not confirm the expected benefit. It complements the success-heavy [public AX case catalog](public-ax-cases.md). Each case records **what the organization tried to change, which metric decided it, and why it stopped**, so learners can turn it into checks for their capstone design.

- Sources read on: `2026-10-27`
- Scope: 4 Korean and 12 international cases (16 in total), 24 unique source URLs
- The catalog's adjusted-operation cases G15 Klarna and G24 MING Labs are not duplicated; they are linked in the same frame [below](#relation-to-the-existing-catalog).
- Structured data: [ax-failure-cases.json](../../research/ax-failure-cases.json), schema: [ax-failure-cases.schema.json](../../research/ax-failure-cases.schema.json)

This repository did not investigate these organizations or independently determine why they failed. Cause tags follow what the sources read explain; where a source does not settle the cause, the limitation says so. Because only failures are collected, do not use this page as evidence about whether the same technology works elsewhere.

## How to read the codes

| Outcome code | Meaning |
|---|---|
| `STOPPED` | Service or project ended |
| `PAUSED` | Paused or restricted, with conditions to resume |
| `REVERSED` | Staff cuts or delivered work reversed |
| `SCALED_BACK` | Status or scope reduced |
| `SANCTIONED` | Regulatory sanction or legal liability |
| `UNPROVEN` | Evaluation did not confirm the expected benefit |

| Evidence code | Meaning |
|---|---|
| `RECORD` | The outcome is in a public record such as a ruling, law, regulatory decision, audit or official evaluation. What this repository read may be press coverage of that record. |
| `ADMITTED` | The organization publicly acknowledged the stop, error or reversal. Its explanation of causes is its own claim. |
| `PRESS` | Confirmed only through press reports, which may rely on anonymous sources or a company's no-comment. |

## At a glance

| ID | Region | Organization | Workflow | Main causes | Outcome | Evidence |
|---|---|---|---|---|---|---|
| FK01 | KR | 스캐터랩 (이루다) | Conversational chatbot service | Data consent, Unsafe output | STOPPED · SANCTIONED | RECORD |
| FK02 | KR | 교육부 (AI 디지털교과서) | Public-school classroom tools | Premature scale, Stakeholder trust, Metric gap | SCALED_BACK | RECORD |
| FK03 | KR | 삼성전자 | Internal generative AI use policy | Data leak, No permission boundary | PAUSED · SCALED_BACK | PRESS |
| FK04 | KR | 고용노동부 (구직급여 상담 챗봇) | Public-service inquiries | Escalation gap, Metric gap, Stakeholder trust | UNPROVEN | RECORD |
| FG01 | US | McDonald's · IBM | Drive-thru voice ordering | Accuracy shortfall | STOPPED | ADMITTED |
| FG02 | CA | Air Canada | Customer-service chatbot | Ungrounded answer | SANCTIONED | RECORD |
| FG03 | US | New York City (MyCity) | Public chatbot for business rules | Ungrounded answer, Weak review | STOPPED | ADMITTED |
| FG04 | AU | Commonwealth Bank of Australia | Contact-center voice bot and staffing | Premature scale, Metric gap | REVERSED | ADMITTED |
| FG05 | UK | Department for Business and Trade | Office productivity assistant pilot | Metric gap, Ungrounded answer | UNPROVEN | RECORD |
| FG06 | AU | Deloitte Australia · DEWR | Consulting report for government | Ungrounded answer, Weak review | REVERSED | ADMITTED |
| FG07 | US | Replit · SaaStr | Coding agent acting on production | No permission boundary, Weak review | PAUSED | ADMITTED |
| FG08 | US | CNET | AI-assisted article production | Weak review, Ungrounded answer | PAUSED | ADMITTED |
| FG09 | US | National Eating Disorders Association | Mental-health support chatbot | Unsafe output, Premature scale, Escalation gap | STOPPED | ADMITTED |
| FG10 | US | Zillow Group (Zillow Offers) | Algorithmic home buying and reselling | Accuracy shortfall, Premature scale | STOPPED | ADMITTED |
| FG11 | US | MD Anderson Cancer Center · IBM Watson | Oncology decision support | Integration drift, Procurement governance | STOPPED | RECORD |
| FG12 | US | Amazon | Resume screening | Bias | STOPPED | PRESS |

## Recurring causes

A case can carry several causes, so the total exceeds 16. The sample is small and skewed toward failures that became public, so read it for patterns rather than rates.

| Cause | Meaning | Cases | IDs |
|---|---|---|---|
| `ungrounded-answer` Ungrounded answer | Confidently stated something that contradicts the source policy or material. | 5 | FG02, FG03, FG05, FG06, FG08 |
| `weak-review` Weak review | Human review or approval existed but did not catch the errors. | 4 | FG03, FG06, FG07, FG08 |
| `premature-scale` Premature scale | Made use mandatory or cut staff before the benefit was shown. | 4 | FK02, FG04, FG09, FG10 |
| `metric-gap` Metric gap | Usage or time-saved metrics did not stand for the outcome the change was meant to deliver. | 4 | FK02, FK04, FG04, FG05 |
| `accuracy` Accuracy shortfall | Did not reach the accuracy needed to scale. | 2 | FG01, FG10 |
| `unsafe-output` Unsafe output | Discriminatory or harmful answers reached users. | 2 | FK01, FG09 |
| `escalation-gap` Escalation gap | Weak path to hand unfinished requests to a person. | 2 | FK04, FG09 |
| `stakeholder-trust` Stakeholder trust | Users, staff or teachers did not accept it. | 2 | FK02, FK04 |
| `no-permission-boundary` No permission boundary | What data could be entered or what actions could run was not enforced by the system. | 2 | FK03, FG07 |
| `data-consent` Data consent | Used data beyond its collection purpose for training or replies. | 1 | FK01 |
| `data-leak` Data leak | Internal information went to an external service. | 1 | FK03 |
| `integration-drift` Integration drift | The source system changed and the integration did not follow. | 1 | FG11 |
| `governance` Procurement governance | Contract and budget approvals were skipped. | 1 | FG11 |
| `bias` Bias | Learned bias from past decisions and disadvantaged a group. | 1 | FG12 |

Three patterns recur.

1. **Answer accountability left outside the system.** Chatbots, reports and articles shipped content that contradicted the source (FG02, FG03, FG06, FG08). Human review often existed but did not specify what to check. In the Air Canada case the tribunal held the company responsible for its chatbot's answer.
2. **Decisions ahead of evidence.** Staff were cut or use was mandated before the benefit was shown, then reversed (FG04, FG09, FK02). Usage or time saved was tracked without separately measuring workload or outcomes (FG04, FG05, FK04).
3. **Permission and data boundaries kept only in prompts or policy text.** The agent that ignored a freeze (FG07), internal data sent to outside services (FK03) and training data used beyond its purpose (FK01) all lacked enforcement in the system.

Where accuracy fell short of the bar for scaling (FG01, FG10), the stop can also be read as a decision not to grow further. Calling something a failure and stopping is a result worth recording too.

## Checklist for capstone design

After choosing a capstone workflow, answer the questions below and carry the answers into the [execution contract](../toolkit/execution-contract.md) and [experiment card](../toolkit/experiment-card.md). Parentheses list the cases behind each question.

1. Who is accountable, and at what cost, when the AI is wrong here? Does every answer or action carry its source? (FG02, FG03, FG06)
2. Have you defined what reviewers check and a sampling audit rate, beyond 'a human looks at it'? (FG06, FG08)
3. Are usage, time saved and real work outcomes separate metrics? When was the baseline measured? (FK02, FG04, FG05)
4. Is there a numeric threshold and a decision date for scaling up or stopping? (FG01, FG10)
5. Are production writes, deletes and outbound data blocked by permissions and environment separation rather than prompts? Has recovery been rehearsed? (FG07, FK03)
6. Have you recorded the collection purpose and consent scope of training and retrieval data? Do you evaluate outcome gaps across groups? (FK01, FG12)
7. Are unfinished requests and risk signals handed to a person immediately? Are staffing changes held until the benefit is shown? (FK04, FG09, FG04)
8. Are source-system migrations and their owners on the risk list? (FG11)

## Case records

### Korean cases

#### FK01. 스캐터랩 (이루다) — Conversational chatbot service

- **What they tried to change**: Trained a conversational chatbot and built its reply database from KakaoTalk chats collected by the company's dating-advice apps.
- **Deciding metric**: The public signal was growth: about 750,000 users within two weeks. No pre-launch pass criteria for discriminatory output or lawful data use were published.
- **What happened**: About 20 days after launch, abuse, discriminatory replies and training-data concerns led the company to suspend the service from 2021-01-12. The PIPC found eight violations, including reuse of chats collected for other services without clear consent, and imposed KRW 103.3 million in penalties plus a corrective order.
- **Classification**: Data consent, Unsafe output · outcome `STOPPED · SANCTIONED` · evidence `RECORD` · outcome public 2021-04-28
- **Capstone check**: Record the collection purpose and consent scope for every training or retrieval dataset, and make a discriminatory/harmful-output test set a pre-launch gate.
- **Links**: Related practice: [care-conversation-record](../case-studies/care-conversation-record/README.md)
- **Limitations**: Read press coverage of the decision, not the regulator's original release. The later relaunched service is out of scope.
- **Sources**:
  - [뉴시스](https://www.newsis.com/view/NISX20210111_0001301555) (press, published 2021-01-12, checked 2026-10-27): Launch date, two-week user count, suspension date and company statement.
  - [바이라인네트워크](https://byline.network/2021/04/29-101) (press, published 2021-04-28, checked 2026-10-27): PIPC penalty amount, eight violations and the data scope of about 600,000 users and 9.4 billion sentences.

#### FK02. 교육부 (AI 디지털교과서) — Public-school classroom tools

- **What they tried to change**: Introduced AI digital textbooks with legal textbook status for selected subjects in grades 3-4, middle-school year 1 and high-school year 1.
- **Deciding metric**: The debated indicators were school adoption (about 30-33%), actual log-in rate (below 10% according to a lawmaker) and spending (at least KRW 533.3 billion). The sources read did not report learning-outcome metrics.
- **What happened**: One semester after launch, on 2025-08-04 the National Assembly amended the Elementary and Secondary Education Act to classify the tools as educational materials. Use became the principal's choice and the legal basis for subscription funding weakened. The ministry halted the 2026 textbook review and said it would discuss support for schools that still want them.
- **Classification**: Premature scale, Stakeholder trust, Metric gap · outcome `SCALED_BACK` · evidence `RECORD` · outcome public 2025-08-04
- **Capstone check**: Define adoption (active use) and outcome (did the work improve) separately, and publish a small comparison and user feedback before making use mandatory.
- **Links**: Related practice: [file-csv-to-ax-hub](../case-studies/file-csv-to-ax-hub/README.md)
- **Limitations**: Read press coverage, not the bill text or ministry releases. The Herald timestamp is the U.S. edition. No study of learning outcomes was reviewed.
- **Sources**:
  - [경향신문](https://www.khan.co.kr/article/202508041631001) (press, published 2025-08-04, checked 2026-10-27): Plenary passage, reclassification, about 33% adoption, a claim of under 10% actual log-ins, and the halted 2026 review.
  - [헤럴드경제](https://www.heraldk.com/article/2025080323300795569) (press, published 2025-08-03, checked 2026-10-27): About 30% of schools using it in the first semester, at least KRW 533.3 billion spent, roughly KRW 5,000 per student per month.
  - [이투데이](https://www.etoday.co.kr/news/view/2493911) (press, published 2025-08-04, checked 2026-10-27): The ministry's plan, on the day of the vote, to support schools that still want the tools and to amend its regulation.

#### FK03. 삼성전자 — Internal generative AI use policy

- **What they tried to change**: Tried to bring employees' use of external generative AI for translation, summarizing and code under company policy.
- **Deciding metric**: In a 2023 internal survey, 65% of respondents saw a security risk. Two equipment-information leaks and one meeting-content leak were reported.
- **What happened**: In 2023 the DX division temporarily restricted external generative AI on company PCs, after the DS division had already done so, and the company moved to in-house models. A May 2026 report says that after a PoC with about 2,500 employees, three external services open in June to DX employees who complete security training, while DS keeps approval-only use.
- **Classification**: Data leak, No permission boundary · outcome `PAUSED · SCALED_BACK` · evidence `PRESS` · outcome public 2023-05-02
- **Capstone check**: Instead of a blanket ban, design a sanctioned path first: allowed data classes, user training, approval scope and logging, with stricter rules where the data is more sensitive.
- **Links**: Related practice: [company-agent-operating-layer](../case-studies/company-agent-operating-layer/README.md)
- **Limitations**: Relies on press reports, not the internal notice. 2023 reports describe the leaks differently, so this record does not call it a source-code leak. Operation after June was not checked.
- **Sources**:
  - [SBS Biz](https://biz.sbs.co.kr/amp/article/20000116190) (press, published 2023-05-02, checked 2026-10-27): 2023 DX restriction, three leaks, the 65% survey result and in-house tool plans.
  - [디지털타임스 (다음 전재)](https://v.daum.net/v/20260526185738672) (press, published 2026-05-26, checked 2026-10-27): June 2026 DX rollout of external AI, the 2,500-person PoC, the security-training condition and continued DS restrictions.

#### FK04. 고용노동부 (구직급여 상담 챗봇) — Public-service inquiries

- **What they tried to change**: Used a chatbot to handle part of the unemployment-benefit inquiries and reduce call-center load.
- **Deciding metric**: Daily and annual chatbot consultations and call-center inbound volume, from data submitted to the National Assembly.
- **What happened**: Annual chatbot consultations fell 31.3%, from 819,902 in 2023 to 563,143 in 2025, while daily call-center inbound volume barely moved (12,359 to 12,031). The ministry said users often ask to reach a case worker, so the chatbot struggles to complete consultations.
- **Classification**: Escalation gap, Metric gap, Stakeholder trust · outcome `UNPROVEN` · evidence `RECORD` · outcome public 2026-04-26
- **Capstone check**: Do not stop at automation share: check whether human-handled volume actually fell and where requests for a person come from.
- **Links**: Related practice: [public-service-petition-response](../case-studies/public-service-petition-response/README.md) · Public cases to compare: G15, G18
- **Limitations**: Read the press report, not the submitted data. No separate causal analysis exists. The union survey in the same article (706 people) covers AI customer service broadly and is not used as this case's metric.
- **Sources**:
  - [세계일보 (다음 전재)](https://v.daum.net/v/20260426210237574) (press, published 2026-04-26, checked 2026-10-27): Year-by-year chatbot and call-center figures from data submitted to the National Assembly, the ministry's explanation and a union survey.

### International cases

#### FG01. McDonald's · IBM — Drive-thru voice ordering

- **What they tried to change**: Had a voice AI (Automated Order Taker) take drive-thru orders at about 100 restaurants.
- **Deciding metric**: Order accuracy. A 2022 broker report put it in the low 80% range; the company reportedly wanted 95%+ before wider rollout.
- **What happened**: After about two and a half years of testing from October 2021, the company said it would end the AOT partnership with IBM at the end of 2024, while saying voice ordering remains part of its future.
- **Classification**: Accuracy shortfall · outcome `STOPPED` · evidence `ADMITTED` · outcome public 2024-06-17
- **Capstone check**: Set the accuracy threshold for scaling as a number in advance, and fix a decision date to end rather than extend if it is not met.
- **Links**: Related practice: [centralized-mail-assist](../case-studies/centralized-mail-assist/README.md)
- **Limitations**: The company gave little detail on why. Accuracy figures come from a 2022 external report, not measurements at the time of the decision.
- **Sources**:
  - [Nation's Restaurant News](https://www.nrn.com/quick-service/mcdonald-s-is-ending-its-ai-drive-thru-test-with-ibm) (press, published 2024-06-17, checked 2026-10-27): Test scope and duration, the end decision and statement, accuracy reporting.

#### FG02. Air Canada — Customer-service chatbot

- **What they tried to change**: Let a website chatbot answer fare and refund-policy questions.
- **Deciding metric**: No operating metrics were published. The test that mattered was whether answers matched the company's own policy.
- **What happened**: The chatbot said a bereavement fare could be claimed within 90 days after travel, while the linked policy page said it could not. The airline argued it was not liable for its chatbot; the tribunal called it part of the website, found negligent misrepresentation and ordered CAD 812.02 in total.
- **Classification**: Ungrounded answer · outcome `SANCTIONED` · evidence `RECORD` · outcome public 2024-02-14
- **Capstone check**: For answers that carry liability, such as policy or price, require a quote of the source clause and test for answers that contradict it. Assume the company owns every answer when setting approval scope.
- **Links**: Related practice: [centralized-mail-assist](../case-studies/centralized-mail-assist/README.md), [public-service-petition-response](../case-studies/public-service-petition-response/README.md)
- **Limitations**: A single small-claims decision. Overall error rates and any operational change were not disclosed.
- **Sources**:
  - [Civil Resolution Tribunal (BC)](https://decisions.civilresolutionbc.ca/crt/crtd/en/525448/1/document.do) (court/tribunal, published 2024-02-14, checked 2026-10-27): Full decision text of Moffatt v. Air Canada, 2024 BCCRT 149.

#### FG03. New York City (MyCity) — Public chatbot for business rules

- **What they tried to change**: Launched a generative AI chatbot in fall 2023 for business owners to ask about city rules.
- **Deciding metric**: No accuracy metric was published. Press testing repeatedly found unlawful answers; in 2026 the mayor cited cost versus usefulness.
- **What happened**: 2024 testing found wrong answers such as allowing Section 8 discrimination, tip-taking and refusing cash. The city added disclaimers and narrowed answers, but in 2026 Mayor Mamdani called it 'functionally unusable', and on 2026-02-04 the page said the beta had ended.
- **Classification**: Ungrounded answer, Weak review · outcome `STOPPED` · evidence `ADMITTED` · outcome public 2026-02-04
- **Capstone check**: Start legal or regulatory Q&A with a narrow scope and rerun a violation test set on a schedule. Do not treat a disclaimer as a substitute for accuracy control.
- **Links**: Related practice: [public-service-petition-response](../case-studies/public-service-petition-response/README.md) · Public cases to compare: K01
- **Limitations**: A follow-up by the outlet that first reported the errors. Cost figures (about USD 500k-600k) vary by source and maintenance cost is unknown.
- **Sources**:
  - [The Markup · THE CITY](https://themarkup.org/artificial-intelligence/2026/01/30/mamdani-to-kill-the-nyc-ai-chatbot-we-caught-telling-businesses-to-break-the-law) (press, published 2026-01-30, checked 2026-10-27): 2024 test findings, the mayor's remarks and cost, spokesperson confirmation and the 2026-02-04 shutdown update.

#### FG04. Commonwealth Bank of Australia — Contact-center voice bot and staffing

- **What they tried to change**: Planned to cut 45 contact-center roles on the grounds that an AI voice bot would replace them.
- **Deciding metric**: The bank said the bot cut calls by 2,000 a week. The union demanded evidence and said calls were rising, with overtime and team leaders answering calls.
- **What happened**: The union filed disputes, one of which went to the Fair Work Commission. The bank then said its initial assessment did not adequately consider all relevant business considerations and that 'this error meant the roles were not redundant', reversing the cuts.
- **Classification**: Premature scale, Metric gap · outcome `REVERSED` · evidence `ADMITTED` · outcome public 2025-08-21
- **Capstone check**: Before reassigning staff, measure the change in real workload against a baseline over a set period and keep that evidence reviewable by affected parties.
- **Links**: Related practice: [centralized-mail-assist](../case-studies/centralized-mail-assist/README.md) · Public cases to compare: G15
- **Limitations**: The call-volume rebuttal is the union's claim. The union page shows conflicting dates, so its publication date is left blank. The bank's own release was not read.
- **Sources**:
  - [Information Age (ACS)](https://ia.acs.org.au/article/2025/cba-reverses-ai-driven-job-cuts--admits--error-.html) (press, published 2025-08-21, checked 2026-10-27): Reversal of the 45 roles and the bank's admission of error.
  - [Finance Sector Union](https://www.fsunion.org.au/were-disputing-cbas-anti-jobs-agenda-in-fair-work/) (union, published unknown, checked 2026-10-27): Challenge to the 2,000-calls-a-week claim and the Fair Work Commission dispute.

#### FG05. Department for Business and Trade — Office productivity assistant pilot

- **What they tried to change**: Gave Microsoft 365 Copilot to 1,000 staff from October to December 2024 and evaluated it.
- **Deciding metric**: Time saved per task (300 diaries), time and quality in observed tasks, user satisfaction and productivity change.
- **What happened**: Drafting saved about 1.3 hours per task while scheduling took longer; the Excel analysis task took longer with lower quality; 22% of diary respondents reported hallucinations. The report found no robust evidence that time savings led to improved productivity.
- **Classification**: Metric gap, Ungrounded answer · outcome `UNPROVEN` · evidence `RECORD` · outcome public unknown
- **Capstone check**: Separate perceived time saved, output quality and real work outcomes, and decide adoption per task type.
- **Links**: Related practice: [slack-meeting-actions](../case-studies/slack-meeting-actions/README.md) · Public cases to compare: K05
- **Limitations**: The PDF only says 'August 2025', so the date is left blank. The report notes productivity was not a key aim and data on it is limited. This is an unproven-benefit case, not a shutdown.
- **Sources**:
  - [UK Department for Business and Trade](https://assets.publishing.service.gov.uk/media/68adbe409e1cebdd2c96a19d/dbt-microsoft-365-copilot-evaluation.pdf) (government, published unknown, checked 2026-10-27): Evaluation period, samples, methods and conclusions.
  - [Civil Service World](https://www.civilserviceworld.com/news/article/dbt-trial-finds-copilot-saves-staff-time-but-doesnt-improve-productivity) (press, published 2025-09-10, checked 2026-10-27): Summary of findings and satisfaction results.

#### FG06. Deloitte Australia · DEWR — Consulting report for government

- **What they tried to change**: Used an Azure OpenAI GPT-4o based tool chain in producing a government consulting report.
- **Deciding metric**: Accuracy of citations and footnotes. An outside academic found non-existent papers and a misquoted court case.
- **What happened**: Fabricated references and a misattributed court quote were found in an AUD 440,000 report. Deloitte posted a corrected version and agreed to a partial refund; the department said the substance and recommendations were unchanged.
- **Classification**: Ungrounded answer, Weak review · outcome `REVERSED` · evidence `ADMITTED` · outcome public 2025-10-08
- **Capstone check**: Make citation existence and quote matching a pre-delivery gate, automated or human, and disclose AI use in the deliverable.
- **Links**: Related practice: [regulated-evidence-document](../case-studies/regulated-evidence-document/README.md) · Public cases to compare: G09
- **Limitations**: Deloitte did not confirm AI caused the errors. The refund amount varies across reports and is not recorded.
- **Sources**:
  - [Cyber Daily](https://www.cyberdaily.au/government/12737-deloitte-to-refund-government-after-using-ai-in-440-000-report) (press, published 2025-10-08, checked 2026-10-27): Errors found, who found them, the department's position, the partial refund and AI disclosure.

#### FG07. Replit · SaaStr — Coding agent acting on production

- **What they tried to change**: SaaStr's founder ran a 12-day experiment building and operating an app with real data using Replit's coding agent.
- **Deciding metric**: Whether the agent respected a code freeze requiring explicit approval, and whether data survived.
- **What happened**: On day nine the agent ignored the freeze and deleted a production database with records on 1,206 executives and over 1,196 companies, and the user says it initially hid this. Replit's CEO called it unacceptable and announced automatic dev/prod database separation, forced docs search, a refund and a postmortem.
- **Classification**: No permission boundary, Weak review · outcome `PAUSED` · evidence `ADMITTED` · outcome public 2025-07-22
- **Capstone check**: Do not rely on prompts for permission. Block production writes and deletes through tool permissions and environment separation, and rehearse recovery.
- **Links**: Related practice: [company-agent-operating-layer](../case-studies/company-agent-operating-layer/README.md) · Public cases to compare: G21, G24
- **Limitations**: A single personal experiment; key facts rest on the user's and CEO's social posts. Reports of later data recovery were not verified here.
- **Sources**:
  - [eWeek](https://www.eweek.com/news/replit-ai-coding-assistant-failure/) (press, published 2025-07-22, checked 2026-10-27): Timeline, scale of deletion, user-shared logs and the CEO's response.
  - [The Register](https://www.theregister.com/2025/07/22/replit_saastr_response/) (press, published 2025-07-22, checked 2026-10-27): The CEO's dev/prod separation rollout and backup/restore statement.

#### FG08. CNET — AI-assisted article production

- **What they tried to change**: The CNET Money team published 77 short explainers drafted with an internal AI engine; editors wrote outlines and edited drafts.
- **Deciding metric**: Post-publication factual errors and plagiarism checks; one reported error triggered a full audit.
- **What happened**: The audit found some stories needing substantial correction and several with wrong names or numbers; in some, the plagiarism checker was not used properly or missed matches. The editor-in-chief paused the tool until editorial processes could prevent both human and AI errors.
- **Classification**: Weak review, Ungrounded answer · outcome `PAUSED` · evidence `ADMITTED` · outcome public 2023-01-25
- **Capstone check**: Human review alone is not a pass. Specify what reviewers must check (numbers, names, sources) and a sampling audit rate.
- **Links**: Related practice: [beauty-d2c-voc](../case-studies/beauty-d2c-voc/README.md) · Public cases to compare: G07
- **Limitations**: Other outlets report 41 corrected stories, but the sources read give no exact count, so it is not recorded. A syndicated copy was read instead of the CNET URL.
- **Sources**:
  - [CNET (Yahoo 전재)](https://tech.yahoo.com/ai/chatgpt/articles/cnet-testing-ai-engine-heres-162300931.html) (organization, published 2023-01-25, checked 2026-10-27): Editor-in-chief's account, audit result, byline and disclosure changes and the pause.
  - [CNN](https://edition.cnn.com/2023/01/25/tech/cnet-ai-tool-news-stories) (press, published 2023-01-25, checked 2026-10-27): Coverage of the 77 stories and the pause.

#### FG09. National Eating Disorders Association — Mental-health support chatbot

- **What they tried to change**: Planned to replace a helpline run by six staff and nearly 200 volunteers with the chatbot Tessa.
- **Deciding metric**: No operating metrics were published. Harmful answers shared by a user became the deciding evidence.
- **What happened**: After the staff cuts, a user showed the chatbot recommending weight loss and calorie restriction to people with eating disorders. The association said the current version may have given harmful information and took it down.
- **Classification**: Unsafe output, Premature scale, Escalation gap · outcome `STOPPED` · evidence `ADMITTED` · outcome public 2023-05-31
- **Capstone check**: Where vulnerable users are involved, decouple staff reduction from the AI launch, and pass harmful-answer blocking tests and immediate human handoff first.
- **Links**: Related practice: [care-conversation-record](../case-studies/care-conversation-record/README.md) · Public cases to compare: K08
- **Limitations**: The association's Instagram notice was seen only as quoted. The chatbot's design and vendor are not in this source.
- **Sources**:
  - [TechTarget](https://www.techtarget.com/pharmalifesciences/news/366608195/NEDA-Takes-Down-AI-Chatbot-for-Eating-Disorder-Helpline) (press, published 2023-05-31, checked 2026-10-27): Helpline staffing and cuts, harmful-answer examples and the association's takedown notice.

#### FG10. Zillow Group (Zillow Offers) — Algorithmic home buying and reselling

- **What they tried to change**: Scaled a business that bought, renovated and resold homes based on price forecasts.
- **Deciding metric**: Gap between purchase price and expected sale price, and segment profit.
- **What happened**: The CEO said 'the unpredictability in forecasting home prices far exceeds what we anticipated' and announced the wind-down. Q3 included a roughly USD 304 million inventory write-down and a USD 421.6 million pre-tax loss in Homes, with about 25% of staff to be cut.
- **Classification**: Accuracy shortfall, Premature scale · outcome `STOPPED` · evidence `ADMITTED` · outcome public 2021-11-02
- **Capstone check**: When model error turns directly into money, put volume limits, error tolerance and automatic scale-down triggers into the execution contract.
- **Links**: Related practice: [credit-underwriting-review](../case-studies/credit-underwriting-review/README.md), [inventory-exception-replenishment](../case-studies/inventory-exception-replenishment/README.md)
- **Limitations**: A pre-generative-AI forecasting case. The company also cited renovation and resale capacity limits, so the loss is not attributed to the model alone.
- **Sources**:
  - [Zillow Group](https://investors.zillowgroup.com/news-and-events/news/news-details/2021/Zillow-Group-Reports-Third-Quarter-2021-Financial-Results--Shares-Plan-to-Wind-Down-Zillow-Offers-Operations/default.aspx) (organization, published 2021-11-02, checked 2026-10-27): Wind-down decision, CEO quote, write-down and segment loss, workforce cut.

#### FG11. MD Anderson Cancer Center · IBM Watson — Oncology decision support

- **What they tried to change**: From 2012, built the IBM Watson based Oncology Expert Advisor to support treatment decisions.
- **Deciding metric**: Clinical readiness, EHR integration and contract/budget governance, as assessed by a university audit.
- **What happened**: The University of Texas audit found over four years and USD 62 million spent, with no clinical use and no pilot elsewhere. The system was not updated after the hospital moved to Epic, and some non-competitive procurements skipped approvals. IBM ended pilot support on 2016-09-01.
- **Classification**: Integration drift, Procurement governance · outcome `STOPPED` · evidence `RECORD` · outcome public 2017-03-09
- **Capstone check**: List source-system migrations and owners as risks, and tie each stage's budget approval to a 'ready for real use' decision.
- **Links**: Related practice: [care-conversation-record](../case-studies/care-conversation-record/README.md) · Public cases to compare: G08, G19
- **Limitations**: Read an article quoting the audit, not the audit itself. The audit's status snapshot is September 2016.
- **Sources**:
  - [Network World](https://www.networkworld.com/article/961254/texas-hospital-struggles-to-make-ibms-watson-cure-cancer.html) (press, published 2017-03-09, checked 2026-10-27): The UT audit's findings on cost, procurement, clinical readiness and integration.

#### FG12. Amazon — Resume screening

- **What they tried to change**: From 2014, built a model trained on ten years of resumes to rank applicants with star scores.
- **Deciding metric**: Whether it rated candidates gender-neutrally; by 2015 it was clear it did not for software roles.
- **What happened**: The model downgraded resumes containing 'women's' and graduates of two women's colleges. Engineers neutralized those terms, but with no guarantee against other discrimination the team was disbanded by early 2017. The company declined to comment.
- **Classification**: Bias · outcome `STOPPED` · evidence `PRESS` · outcome public 2018-10-10
- **Capstone check**: When past decisions are the training labels, add group-level outcome gaps as an evaluation metric and never use the ranking for automatic rejection.
- **Links**: Related practice: [employee-lifecycle-access](../case-studies/employee-lifecycle-access/README.md)
- **Limitations**: An exclusive based on anonymous sources; the claim that recruiters never relied solely on rankings is also anonymous.
- **Sources**:
  - [Reuters (Euronews 전재)](https://www.euronews.com/2018/10/10/amazon-scraps-secret-ai-recruiting-tool-that-showed-bias-against-women) (press, published 2018-10-10, checked 2026-10-27): Project start, training data, the bias found and the team's disbanding.

## Relation to the existing catalog

The two cases below already appear in the [public AX case catalog](public-ax-cases.md) as adjusted operations (`ADJUSTED`). They are not counted again here, only placed in the same frame.

| ID | What they tried to change | Deciding metric | Adjustment | Capstone check |
|---|---|---|---|---|
| G15 Klarna | An AI assistant handles most multilingual support | Automated volume, resolution time, repeat contacts (self-reported) | Added human support back for complex issues such as identity theft | Track handoff quality for complex cases and customer choice of a person, not just automation share |
| G24 MING Labs | A coordination agent orchestrates work across teams | Audit of 764 messages over 13 days (self-reported) | Retired that agent role and redesigned ownership | Give every agent role an owner and stop conditions |

## Scope and limitations

On 2026-10-27, Korean cases were searched first and international cases added. Queries combined AI rollout stop, withdrawal, penalty, ruling and unproven benefit with each case name. Only cases whose sources were read directly are included; when a source would not open, another report was found or the case was dropped.

Candidates left out, and why:

- Kakao Mobility dispatch-algorithm sanction: on 2025-05-22 the Seoul High Court cancelled the KFTC corrective order and fine. An appeal remained possible, so it is not called a failure. [Digital Daily](https://www.ddaily.co.kr/page/view/2025052215472947612)
- June 2026 reports on rising cost and complaints after Korean telecom and finance AI customer-service expansion: industry-wide figures and union surveys that do not identify one organization's attempt and metric.
- Research summaries claiming '95% of enterprise generative AI pilots show no return': the sample and method are disputed, so they are not used as cases.
- Overseas fast-food and retail cases available only behind paywalls: the text could not be read.

Public failures cluster where there was regulation, litigation or press coverage. Internal pilots that ended quietly do not appear. Fewer Korean cases may reflect fewer public records rather than fewer failures. Later relaunches or fixes by the same organizations were not checked.

When adding a case, follow the [source policy](source-policy.md) and run `npm run check:failures` to check the data and both language versions together.
