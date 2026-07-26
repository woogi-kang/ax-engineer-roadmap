# Case: From Global Beauty/D2C VOC to an Action Proposal

## Case type

This is not an internal diagnosis or consulting outcome for a specific company. It is a **learning simulation of an AX workflow transformation** based on public data and common Beauty/D2C workflow patterns.

## Problem hypothesis

Global consumer reviews and inquiries are distributed across countries, languages, and channels. Marketing, product, customer-support, and operations teams repeat similar research, but different provenance, periods, samples, and classification rules make the output difficult for another team to reuse.

Initial hypothesis:

> Preserving original text and collection scope, detecting recurring issues and opportunities, and requiring a person to verify evidence before approving an action proposal can make research and handoff more consistent.

This hypothesis does not imply improvements in time, quality, or revenue for a real company. The system's quality and operability must first be tested with public data, then re-evaluated in an environment with real business baselines.

## Users

| User | Needed outcome | Responsibility |
|---|---|---|
| VOC analyst | Recurring issues and original evidence | Review collection scope and classification |
| Marketing and product | Actionable opportunities and impact scope | Set workflow priority |
| Customer support and operations | Complaints and exception flows | Confirm response and operating impact |
| Process owner | Approvable proposal with cost and risk | Decide execution or stop |

## In scope

```text
Collect public VOC
→ Preserve original text, provenance, time, and channel
→ Normalize language, product, and topic
→ Detect recurring issues and opportunities
→ Practitioner verifies evidence
→ Generate an action proposal
→ Human approval
→ Record execution status and outcomes
```

## Initially out of scope

- Customer data that can identify an individual
- Automatic changes to pricing, discounts, inventory, or purchase orders
- Automatic publication of efficacy or regulatory claims
- Automatic external messages sent through customer accounts
- Estimating real revenue impact from public data alone

## Draft data contract

| Field | Meaning | Required | Quality check |
|---|---|---:|---|
| `source_id` | Original review or inquiry identifier | Yes | Duplicate check |
| `source_url` | Verifiable provenance | Yes | Accessibility |
| `captured_at` | Collection time | Yes | Time zone |
| `published_at` | Original publication time | Optional | Missingness distinguished |
| `market` | Country or market | Yes | Standardized code |
| `channel` | Review or inquiry channel | Yes | Allowed values |
| `product_id` | Product identifier | Optional | Mapping evidence |
| `language` | Original language | Yes | Detection confidence |
| `text_original` | Original text | Yes | Empty or truncated values |
| `text_normalized` | Normalized analysis text | Optional | Transformation version |
| `topic` | Topic classification | Optional | Model and rule version |
| `evidence_ref` | Link between proposal and source | Yes | Reverse traceability |

## Draft workflow execution rules

### Input

- Public VOC that passes the data contract
- Analysis period, market, channel, and product scope
- Topic, severity, and opportunity criteria

### Output

- Issue or opportunity title
- Original evidence and provenance
- Observed frequency and scope
- Sample, missingness, and language limitations
- Proposed action and candidate owner
- Approved, held, or rejected state

### Autonomy

- Collection, normalization, and classification: A1–A2
- Issue and opportunity proposals: A2
- Internal task creation: A3
- External publishing and price or inventory changes: outside initial scope

## Evaluation

Do not judge quality from normal cases alone.

- Duplicate reviews with the same content
- Deleted or inaccessible source text
- Mixed-language cases
- Missing or incorrectly linked product names
- High-frequency but low-impact issues
- Low-frequency but high safety or regulatory risk
- Promotional, irrelevant, or spam content
- Old data that appears to be a recent issue

Evaluation dimensions:

- Traceability to original text
- Classification accuracy and unclassified-case handling
- Rate of unsupported claims
- Types of practitioner corrections
- Processing time and rework
- Reasons for approval, hold, and rejection

## Four-week deployment plan

### Week 1

- Finalize public-data scope and collection limits.
- Document the current analysis flow and baseline.
- Prepare the data contract and evaluation cases.

### Week 2

- Implement classification and summary with source traceability.
- Create a practitioner-review interface or output contract.
- Evaluate errors, missingness, and duplicates.

### Week 3

- Connect approved proposals to internal task creation.
- Implement permissions, deduplication, audit records, and recovery.
- Inspect operating status and cost.

### Week 4

- Run user acceptance with an external reviewer or operator.
- Record correction burden, trust, and workflow completion.
- Decide which contracts to reuse and which abstractions to discard.

## Public evidence package

- Data provenance and collection scope
- Inventory of source, derived, and result files
- Data contracts and workflow execution rules
- Evaluation data and results
- Deployment architecture and runbook
- Incident and recovery records
- User acceptance
- Outcomes, limitations, and next decision

## Open questions

- How well does public data represent internal VOC?
- How should collection bias by language and market be expressed?
- What evidence shows that a proposal reached actual work?
- Who owns the final definition when departments interpret the same issue differently?
- Which contracts and components can be reused in a second workflow?
