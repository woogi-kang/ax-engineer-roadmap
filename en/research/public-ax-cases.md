# Public AX Case Catalog

This document reframes publicly reported AI and AX deployments through the lens of **workflow and operational control**. It does not rank products or claim that this repository reproduced the reported outcomes.

- Last checked: `2026-08-01`
- Scope: 10 Korean and 15 international cases
- Main sources: government and company announcements, vendor customer stories, and selected major-news follow-up
- Excluded: unsourced summaries, product-only demos, and broad AI strategies that do not expose a workflow

## Three evidence axes

Source provenance, deployment stage, and outcome verification are not collapsed into one label. For example, `ORG · LIVE · SELF` means an organization officially confirms operation, while the outcome figure remains self-reported. The machine-readable [`public-ax-cases.json`](../../research/public-ax-cases.json) records all 26 unique source URLs and links to the internal practice cases.

| Axis | Codes | Meaning |
|---|---|---|
| Source | `ORG` / `JOINT` / `VENDOR` / `MIXED` | Organization official / joint official statement / vendor customer story / official material plus independent reporting |
| Deployment | `PILOT` / `LIMITED` / `LIVE` / `EXPANDING` / `ADJUSTED` / `UNKNOWN` | Pilot / limited operation / operation / expanding operation / adjusted operating model / not established publicly |
| Outcome | `NONE` / `SELF` / `CROSS` / `INDEPENDENT` | No public outcome / self-reported / direction cross-checked independently / independently evaluated |

`LIVE` confirms use, not independent validation of every outcome claim. Time, cost, and satisfaction figures without a public method, period, sample, or raw data remain `SELF`. None of the current 25 cases reaches `INDEPENDENT` outcome verification.

## At a glance

| ID | Region | Work / industry | Public organization | Source | Deployment | Outcome |
|---:|---|---|---|---|---|---|
| K01 | Korea | Public service | ACRC and others | ORG | LIMITED | NONE |
| K02 | Korea | Corporate lending | Shinhan Bank | ORG | LIMITED | NONE |
| K03 | Korea | Insurance sales | Shinhan Life | ORG | LIMITED | NONE |
| K04 | Korea | Contact center | LG Uplus | ORG | LIVE | SELF |
| K05 | Korea | Collaboration | Samsung SDS | ORG | PILOT | SELF |
| K06 | Korea | Manufacturing | POSCO | ORG | LIVE | NONE |
| K07 | Korea | Product quality | LG Electronics | ORG | LIMITED | SELF |
| K08 | Korea | Social care | SK Telecom | ORG | LIVE | SELF |
| K09 | Korea | Field care | SK Telecom | ORG | PILOT | SELF |
| K10 | Korea | Education admin | LG Uplus | ORG | PILOT | NONE |
| G01 | United States | Wealth management | Morgan Stanley | VENDOR | LIVE | SELF |
| G02 | Global | HR | IBM | ORG | LIVE | SELF |
| G03 | Germany | Industrial engineering | Siemens / thyssenkrupp | JOINT | EXPANDING | SELF |
| G04 | United States | Manufacturing | Jabil | VENDOR | LIVE | SELF |
| G05 | Germany | Industrial service | Bosch Rexroth | VENDOR | LIVE | NONE |
| G06 | United States | Retail | Walmart | ORG | LIMITED | NONE |
| G07 | United States | Retail content | CarMax | VENDOR | LIVE | SELF |
| G08 | United States | Healthcare | Corewell Health | VENDOR | PILOT | SELF |
| G09 | United States | Legal | Foley Hoag | VENDOR | LIVE | SELF |
| G10 | Global | Software | Accenture | VENDOR | PILOT | SELF |
| G11 | India / global | Insurance | EXL | VENDOR | UNKNOWN | SELF |
| G12 | Argentina | Citizen services | City of Buenos Aires | VENDOR | LIMITED | NONE |
| G13 | United States | B2B sales | Lumen Technologies | VENDOR | LIVE | SELF |
| G14 | Global | Pharma R&D | Moderna | VENDOR | LIMITED | NONE |
| G15 | Sweden | Contact center | Klarna | MIXED | ADJUSTED | CROSS |

## Korean cases

### K01. ACRC and participating agencies — draft responses and duplicate-petition clustering

- **Problem**: Caseworkers separately search the petition, law, precedents, and manuals, then repeatedly handle similar submissions.
- **Verified workflow**: AI finds relevant law and proposes a response. It also clusters semantically similar petitions within a selected period; a caseworker confirms the group before bulk handling.
- **AI role**: Retrieval, summarization, response drafting, semantic clustering, and issue-trend analysis.
- **Human judgment**: Caseworkers edit or rewrite the draft and approve each cluster and bulk-processing target.
- **Roadmap lesson**: Expose citations, preserve edit history, support splitting a bad cluster, and require approval and reprocessing controls.
- **Evidence limit**: Launch at selected agencies is confirmed, but accuracy, handling time, and edit rate are not public. [Korea Policy Briefing](https://www.korea.kr/news/policyNewsView.do?newsId=156743148)

### K02. Shinhan Bank — corporate borrower analysis and credit-opinion support

- **Problem**: Branch staff gather company, financial, industry, transaction, collateral, and technology data to write a corporate credit opinion.
- **Verified workflow**: The system integrates company information and applies analysis logic tailored to 12 major industries.
- **AI role**: Data organization, industry-aware financial interpretation, and evidence integration for an opinion.
- **Human judgment**: Staff review the analysis and own the company-specific credit judgment and proposal.
- **Roadmap lesson**: Separate source financials, industry-rule versions, analysis rights, approval rights, and cited evidence.
- **Evidence limit**: Deployment is confirmed; review time, decision quality, and error rate are not public. [Shinhan Financial Group](https://www.shinhangroup.com/kr/archive/press/detail/679)

### K03. Shinhan Life — conversational insurance-plan design and screening

- **Problem**: Planners move across screens to align customer conditions, coverage limits, and rider rules, then repeatedly revise a plan.
- **Verified workflow**: With customer consent, the system analyzes customer and coverage data, proposes a plan and explanation, accepts conversational edits, and runs computerized screening.
- **AI role**: Direction and alternative recommendations, rule-aware edits, and explanation drafts.
- **Human judgment**: The planner changes the recommendation and confirms the choice with the customer.
- **Roadmap lesson**: Separate deterministic product-rule checks from generative recommendations and join consent, changes, and screening results in one audit trail.
- **Evidence limit**: System launch is confirmed; time savings and design-quality measures are not public. [Shinhan Financial Group](https://shinhangroup.com/kr/archive/press/detail/637)

### K04. LG Uplus — in-call answer recommendation and after-call support

- **Problem**: Agents must understand a caller, search internal procedures, respond, and classify the outcome.
- **Verified workflow**: AI analyzes the conversation, retrieves internal information, recommends a contextual answer, and supports after-call classification.
- **AI role**: Conversation understanding, knowledge retrieval, answer generation, and classification.
- **Human judgment**: The agent chooses what to tell the customer and handles exceptions.
- **Reported result**: LG reported a 19% average reduction in total consultation time, about 1.17 million minutes per month.
- **Evidence limit**: Live use is confirmed, but the sample, comparator, and calculation method are not public. [LG](https://www.lg.co.kr/media/release/29014)

### K05. Samsung SDS — minutes, action items, and communication drafts

- **Problem**: People repeatedly create captions, translations, minutes, action items, summaries, and email drafts.
- **Verified workflow**: Brity Works creates these artifacts across meetings, mail, messaging, and documents.
- **AI role**: Speech recognition, translation, summarization, action-item extraction, and drafting.
- **Human judgment**: Users verify the output and decide whether to share, send, or apply it.
- **Roadmap lesson**: Separate attendee consent, decision-versus-suggestion labeling, action-owner confirmation, and external-send approval.
- **Evidence limit**: Samsung reported over 75% less minutes-writing time and over 66% less email work in an internal pilot of about 10,000 people; methods and error rates are not public. [Samsung SDS](https://www.samsungsds.com/kr/news/sds-genai-mediaday.html)

### K06. POSCO — sensor- and vision-based predictive maintenance

- **Problem**: Experience-led inspection and reactive maintenance can miss subtle equipment anomalies or delay operator awareness.
- **Verified workflow**: PIMS integrates equipment data; rolling-process and vision models detect coil-width mismatch and plate drift and warn operators.
- **AI role**: Sensor and video anomaly detection, state comparison, and early warning.
- **Human judgment**: Operators confirm the warning and decide maintenance or operating action.
- **Roadmap lesson**: Normal baselines, alert thresholds, false-positive and false-negative cost, sensor failure, manual operation, and emergency stop come before model fluency.
- **Evidence limit**: Field use is confirmed, but failure reduction and false-alert rates are not public. [POSCO Newsroom](https://newsroom.posco.com/kr/%ED%8F%AC%EC%8A%A4%EC%BD%94-%ED%8F%AC%ED%95%AD%EC%A0%9C%EC%B2%A0%EC%86%8C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A1%9C-%EC%84%A4%EB%B9%84%EB%A5%BC-%EC%9D%BD%EB%8B%A4-data-ai-%EA%B8%B0%EB%B0%98/)

### K07. LG Electronics — finished-product quality prediction during development

- **Problem**: Comparing design and test conditions to predict finished-product quality is slow.
- **Verified workflow**: AI models analyze development data, and developers use results through the web-based `Eng.AI` system.
- **AI role**: Development-condition analysis and finished-product quality prediction.
- **Human judgment**: Developers decide additional tests, design changes, and release implications.
- **Roadmap lesson**: Track model-versus-test variance, product-family data drift, safety criteria, and release approval separately.
- **Evidence limit**: LG reported up to 99% less prediction time, but product scope, sample, and measurement method are not public. [LG](https://www.lg.co.kr/media/release/28789)

### K08. SK Telecom — check-in calls and escalation for vulnerable people

- **Problem**: Care workers and local governments must contact many households regularly without missing risk signals.
- **Verified workflow**: AI calls weekly, detects concerning statements, and connects the case to human counseling or support such as a hospital visit.
- **AI role**: Repetitive calls, response classification, and risk-signal detection.
- **Human judgment**: Monitoring and counseling staff decide counseling, visits, hospital accompaniment, or emergency support.
- **Roadmap lesson**: Measure missed risks, false alerts, completed handoffs, retry policy, and emergency response time—not call volume alone.
- **Evidence limit**: SKT reported more than 110,000 check-ins and 4,063 counseling handoffs in one year; independent sensitivity and specificity are not public. [SK Telecom Newsroom](https://news.sktelecom.com/200115)

### K09. SK Telecom — behavioral-record support for people with developmental disabilities

- **Problem**: Care staff cannot easily observe sudden behavior and record its frequency and pattern at the same time.
- **Verified workflow**: Vision AI uses existing CCTV infrastructure to identify behavioral events and create records for care-worker review.
- **AI role**: Behavior recognition, event classification, and observation-record generation.
- **Human judgment**: Care staff validate context and decide how records affect support plans.
- **Roadmap lesson**: Separate video consent and retention, identity-related bias, immediate safety response, and later recordkeeping.
- **Evidence limit**: SKT reported up to 90% less record work in a pilot; sample and clinical impact are not public. [SK Telecom Newsroom](https://news.sktelecom.com/214674)

### K10. LG Uplus — unified attendance, counseling, and activity records

- **Problem**: Teachers manage attendance, learning activity, counseling, and schedules across different screens and documents.
- **Verified workflow**: The product connects student-information, learning-management, and counseling data to provide attendance, student cards, AI-supported activity records, and counseling material.
- **AI role**: Record integration and analysis, student-level activity and counseling material, and suggested learning activities.
- **Human judgment**: Teachers verify records and decide their use in counseling, evaluation, and teaching.
- **Roadmap lesson**: Require data minimization, teacher correction rights, evidence for generated records, and approval and correction before official student-record use.
- **Evidence limit**: Product scope and a Jeju education-office pilot are confirmed; quantitative results are not public. [LG Uplus](https://www.lguplus.com/biz/all/product-service/metaverse/superschool/B000000140)

## International cases

### G01. Morgan Stanley — meeting notes, CRM records, and follow-up drafts

- **Problem**: Financial advisers search a large internal corpus and document meetings and follow-up work.
- **Verified workflow**: An internal knowledge assistant retrieves documents. With client consent, `Debrief` turns Zoom recordings into client notes and follow-up drafts connected to CRM.
- **AI role**: Internal search, research and meeting summaries, action items, and follow-up drafts.
- **Human judgment**: Advisers edit and approve the record and any client communication.
- **Roadmap lesson**: High-risk knowledge work needs expert scoring, regression evaluation, customer consent, and review before CRM writes—not RAG alone.
- **Evidence limit**: Adoption figures, including 98% team usage, come from a joint vendor/customer story and are not independently verified. [OpenAI](https://openai.com/index/morgan-stanley/)

### G02. IBM — from HR questions to transactions

- **Problem**: Fragmented HR bots and channels make policy search and repetitive requests difficult.
- **Verified workflow**: `AskHR` grew from a single policy-answering entry point to backend transactions such as employment verification, leave, and employee transfer.
- **AI role**: Intent classification, policy retrieval and answers, domain routing, and structured execution.
- **Human judgment**: HR specialists take complex cases; established permissions still govern manager actions.
- **Roadmap lesson**: Pilot small workflows, keep fast human escalation, and retain feedback instead of closing all channels in one migration.
- **Evidence limit**: IBM reports internal CSAT first falling to -35 and later rising to +74 after changing the support model, but the metric method is limited. [IBM](https://www.ibm.com/case-studies/ibm-transformation/ask-hr)

### G03. Siemens and thyssenkrupp — automation code, sensor setup, and inspection documents

- **Problem**: Automated assembly lines repeatedly require control code, sensor configuration, inspection steps, and documentation.
- **Verified workflow**: Industrial Copilot supports data management, sensor setup, code, visualizations, and inspection-report drafting.
- **AI role**: Automation-code generation, panel visualization, setup and document drafts, and troubleshooting answers.
- **Human judgment**: Engineers edit code, confirm equipment safety and inspection requirements, and authorize deployment.
- **Roadmap lesson**: Completion requires PLC and sensor state, safety interlocks, simulation, change approval, and rollback—not generation speed alone.
- **Evidence limit**: Siemens reported 30-second visualizations and about 20% code modification; these are vendor-reported measures. [Siemens](https://press.siemens.com/global/en/pressrelease/siemens-and-microsoft-scale-industrial-ai)

### G04. Jabil — shop-floor troubleshooting and procurement research

- **Problem**: Operators search documents, tickets, and knowledge bases for diagnostics while procurement and account teams repeat separate research.
- **Verified workflow**: A shop-floor assistant searches multiple knowledge sources and was extended to procurement and customer research.
- **AI role**: Manufacturing-knowledge retrieval, diagnostic information, and research support.
- **Human judgment**: Operators decide physical action; procurement staff validate proposals.
- **Roadmap lesson**: Document freshness, site-specific equipment, language, ticket state, dangerous-work escalation, and floor feedback matter more than prototype speed.
- **Evidence limit**: This is an AWS customer story, and published deployment and time figures do not isolate the assistant's effect. [AWS](https://aws.amazon.com/solutions/case-studies/jabil-manufacturing-transformation-generative-ai/)

### G05. Bosch Rexroth — technical-support search across a large product range

- **Problem**: Service staff must find correct answers among technical material for more than 500,000 hydraulic products.
- **Verified workflow**: Hydraulic Hub's Smart Assistant retrieves product data to support service questions and troubleshooting.
- **AI role**: Product and technical-document retrieval, answers, and troubleshooting guidance.
- **Human judgment**: Service staff confirm product and site conditions before advising or acting.
- **Roadmap lesson**: Make part number, version, and installation environment an input contract; return source text and applicable products with every answer.
- **Evidence limit**: Purpose and deployment are public, but handling time, resolution rate, and error rate are not. [AWS](https://aws.amazon.com/solutions/case-studies/bosch-rexroth-generativeai/)

### G06. Walmart — merchandise-performance analysis and operations tickets

- **Problem**: Merchants combine reports and spreadsheets to explain over- or under-performance and resolve operational issues.
- **Verified workflow**: `Wally` uses a semantic layer over merchandise data for data entry, analysis, root-cause candidates, operational questions, and unresolved-ticket creation.
- **AI role**: Complex data interpretation, cause candidates, usage guidance, and ticket creation.
- **Human judgment**: Merchants decide pricing, inventory, promotion, and execution.
- **Roadmap lesson**: Distinguish correlation from cause and separate state refresh, recommendation evidence, strategy, and tactical execution authority.
- **Evidence limit**: Internal deployment and capabilities are official; quantitative outcomes are not public, and future autonomy remains a plan. [Walmart](https://corporate.walmart.com/news/2025/03/18/walmart-develops-genai-powered-assistant-for-walmart-merchants)

### G07. CarMax — review summaries and product-page content

- **Problem**: Keeping thousands of vehicle pages consistent and current requires extensive editorial work.
- **Verified workflow**: AI summarizes customer reviews and vehicle information; editors verify context, accuracy, and brand voice.
- **AI role**: Review summaries and model, trim, and related-content drafts.
- **Human judgment**: Editors approve each page before publishing.
- **Roadmap lesson**: Track edit rate, factual error, stale vehicle data, page-level evidence, and unpublishing—not generation volume alone.
- **Evidence limit**: Microsoft reports 5,000 pages produced in months and an 80% editorial approval rate, but comparison and long-term quality are not public. [Microsoft](https://www.microsoft.com/en/customers/story/1501304071775762777-carmax-retailer-azure-openai-service)

### G08. Corewell Health — clinical-note drafts from care conversations

- **Problem**: Clinicians must converse with patients and later complete structured clinical documentation.
- **Verified workflow**: The system turns the care conversation into a draft for clinician review before entry into the electronic health record.
- **AI role**: Conversation recognition, clinical-note structuring, and drafting.
- **Human judgment**: Clinicians fix omissions and errors and sign the final note.
- **Roadmap lesson**: Require patient consent, source-conversation traceability, specialty-specific evaluation, edit-burden measurement, and approval before EHR write.
- **Evidence limit**: Abridge reported planned expansion after a 90-day pilot to 4,000 clinicians across 21 hospitals and more than 300 sites; this is a vendor pilot story, not an independent clinical-outcome study. [Abridge](https://www.abridge.com/case-study/corewell-health)

### G09. Foley Hoag — M&A diligence tables and litigation drafts

- **Problem**: Lawyers structure clauses, issues, facts, and disclosure items from large deal rooms and litigation records.
- **Verified workflow**: The system builds contract tables, flags issues with citations, drafts disclosure schedules, and identifies candidate facts in court documents.
- **AI role**: Contract analysis, clause and issue extraction, tables and schedules, and litigation-fact organization.
- **Human judgment**: Lawyers verify quoted sources, make legal judgments, and approve client work.
- **Roadmap lesson**: Tie each conclusion to source text and enforce confidentiality, jurisdiction, document version, access control, and lawyer sign-off.
- **Evidence limit**: Harvey reports at least a one-third reduction in some M&A review cycles and 8–10 hours saved in a litigation experiment; case comparability and quality methods are not public. [Harvey](https://www.harvey.ai/customers/foley-hoag)

### G10. Accenture — tests, legacy-code understanding, and technical debt

- **Problem**: Developers spend time on tests, legacy-code comprehension, repetitive implementation, and accumulated technical debt.
- **Verified workflow**: Copilot is used for unit, functional, and performance tests, legacy explanation and refactoring, and reuse of common code.
- **AI role**: Code and test drafts, explanations, and refactoring suggestions.
- **Human judgment**: Developers own architecture, review, test outcomes, security checks, and deployment.
- **Roadmap lesson**: Compare successful builds, defects, change-failure rate, review burden, security findings, and rework—not accepted code volume.
- **Evidence limit**: GitHub describes a 20-person pilot and an internal study with 450 users and 200 controls, but the full method and effect size are not public. [GitHub](https://github.com/customer-stories/accenture)

### G11. EXL — underwriting-document extraction and review support

- **Problem**: Insurance underwriters read hundreds of pages of medical and application records to structure an initial assessment.
- **Verified workflow**: OCR and text analysis extract documents, remove personal information, and feed a RAG assistant for review support.
- **AI role**: Scan extraction, sensitive-data removal, document retrieval, and initial-assessment support.
- **Human judgment**: Underwriters verify the evidence and own risk and enrollment decisions.
- **Roadmap lesson**: Separate OCR completeness, health-data protection, source linkage, product rules, and final-underwriter approval.
- **Evidence limit**: EXL estimates a shift from days to hours and potential cost reduction up to 80%, but the insurer and methodology are not disclosed. [AWS](https://aws.amazon.com/solutions/case-studies/exl-case-study/)

### G12. City of Buenos Aires — unified government information and tourism questions

- **Problem**: Fragmented public-service channels make government information hard to find.
- **Verified workflow**: `Boti` provides a single channel, while generative AI starts in lower-sensitivity tourism and culture queries with personalized Spanish and English responses.
- **AI role**: Government-knowledge retrieval, natural-language questions, and tourism information and itinerary personalization.
- **Human judgment**: Government teams manage the corpus, language and political sensitivity, allowed scope, and expansion.
- **Roadmap lesson**: Begin with low-sensitivity work and evaluate authoritative sources, multilingual consistency, political neutrality, privacy, and channel parity.
- **Evidence limit**: Do not attribute Boti's overall two million monthly interactions to its limited generative feature. The Microsoft story partially blends the two. [Microsoft](https://www.microsoft.com/en/customers/story/21596-government-of-the-city-of-buenos-aires-azure-open-ai-service)

### G13. Lumen Technologies — account research and outreach preparation

- **Problem**: B2B sellers combine company, contract, relationship, and meeting data across systems before outreach.
- **Verified workflow**: Copilot and Salesforce integration support account research, notes, administrative work, and alignment of sales data with interaction history.
- **AI role**: Account-research summaries, meeting notes, outreach material, and follow-up drafts.
- **Human judgment**: Sellers choose the customer context, message, and sales action.
- **Roadmap lesson**: Measure CRM freshness, wrong account facts, message review, duplicate contact, and actual sales outcomes alongside research time.
- **Evidence limit**: Lumen reports reducing account research from four hours to 15 minutes, but sample and calculation are not public. [Microsoft](https://www.microsoft.com/en/customers/story/1771760434465986810-lumen-microsoft-copilot-telecommunications-en-united-states/)

### G14. Moderna — development-document drafts from evidence

- **Problem**: Clinical, product, and marketing teams jointly review hundreds of pages to create a Target Product Profile.
- **Verified workflow**: The system extracts facts and assumptions from up to about 300 pages, creates structured section drafts, and flags possible errors for cross-functional review.
- **AI role**: Large-corpus summarization, fact and assumption extraction, document structuring, and error candidates.
- **Human judgment**: Domain specialists validate assumptions and trade-offs and decide the development direction.
- **Roadmap lesson**: Explicitly separate evidence from assumptions and track sentence-level sources, domain approvals, versions, and change impact.
- **Evidence limit**: This is a vendor report; specific cycle-time reductions and independent validation are not public. [OpenAI](https://openai.com/business/guides-and-resources/the-state-of-enterprise-ai-2025-report/)

### G15. Klarna — automated service with human escalation for complex cases

- **Problem**: A multilingual payments service must run around the clock while handling refunds, returns, financial habits, identity theft, and disputes.
- **Initial workflow and claim**: Klarna reported human-level satisfaction, 25% fewer repeat inquiries, and resolution time falling from 11 minutes to under two.
- **Later change**: AP reported that, alongside cost savings, Klarna restored some staffing because complex cases such as identity theft require experienced people.
- **AI role**: High-volume, repetitive, multilingual support and structured actions.
- **Human judgment**: Skilled staff take identity, dispute, and exception cases and unresolved AI conversations.
- **Roadmap lesson**: Do not optimize automation rate alone; design escalation accuracy, complex-case quality, repeat contact, the right to choose a human, and retention of expert service skills.
- **Evidence limit**: Initial metrics are company and vendor claims; the operating adjustment is independently reported. This is better read as rebalancing human and AI roles than a complete reversal. [Initial official story](https://openai.com/index/klarna/) · [AP follow-up](https://apnews.com/article/artificial-intelligence-chatbot-customer-service-call-center-ca87ae77d7c6797ebb2628bd1b532929)

## Turning a public example into a roadmap case candidate

Do not copy an external case directly. Re-specify these elements for the new organization before proposing it for `case-studies/`:

1. Trigger event and completion state
2. Source system used to refresh current state
3. What AI may read, recommend, and execute
4. Where a person must approve, edit, or reject
5. Normal, boundary, failure, and adversarial evaluation cases
6. Recovery for duplicates, partial failure, permission errors, and external-system failure
7. Metrics for user correction burden and real workflow outcomes
8. Separation between verified public facts and local adoption hypotheses

## Classification suggestion

The existing `primary_domain` represents a work function. To show industry diversity, first consider a separate `industry` axis instead of stretching the domain taxonomy.

- Work-function examples: customer and revenue, people and collaboration, finance and procurement, data and operations, shared integration and operations
- Industry examples: manufacturing, finance, insurance, healthcare, public service, education, social care, retail, legal, software, and pharmaceuticals

Work function locates responsibility and system flow. Industry is a secondary axis for comparing regulation, data, and physical operating conditions.
