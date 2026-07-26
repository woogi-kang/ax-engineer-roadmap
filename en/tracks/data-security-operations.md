# Data, Security, and Operations Collaboration Guide

## Audience

For owners of data, privacy, information security, platform operations, SRE, audit, and incident response.

## Goal

Participate from workflow discovery instead of issuing late-stage review comments. Co-design data use, permissions, observability, and recovery conditions across the lifecycle.

## 1. Data and meaning

Confirm:

- Source systems and data owners for current truth
- Purpose, provenance, legal basis, retention, and deletion
- Missingness, duplication, freshness, and sampling bias
- Business terms and metric definitions
- Lineage across source, derivative, model input, model output, and action result

Do not treat a vector store or conversation history as the source of truth. Define update and deletion relationships between retrieval copies and source systems.

Evidence:

- Data, owner, and lineage map
- Data classification and processing purpose
- Glossary and quality report
- Retention, deletion, and correction process

## 2. Access and action controls

Separate the permissions of people, service accounts, and model tools.

- Separate read, recommend, request approval, write, and delete.
- Separate production and test accounts.
- Combine workflow approval with technical control for high-impact actions.
- Audit permission changes and approval bypasses.
- Confirm vendor and external-service access.

Evidence:

- Role and service-account permission matrix
- Approval and delegation rules
- Permission change and revocation records

## 3. Privacy and security threats

Address the full lifecycle:

- Purpose and data minimization
- Source verification and pseudonymization or anonymization
- Prompt attack, leakage, tool misuse, and privilege escalation
- Input and output filtering, isolation, and acceptable-use policy
- Pre-deployment testing, vulnerability review, and data-subject rights
- Internal governance and reporting

Do not generalize legal applicability. Privacy, legal, and security owners should evaluate the actual workflow, data, users, and region.

Detail: [Security and Privacy](../technical-foundations/security-and-privacy.md)

## 4. Observability and audit

Do not store every conversation by default. Define the minimum structure needed for diagnosis and the data that must not be stored.

Correlate with a run identifier:

- User and service role
- Input reference and data version
- Model, prompt, and tool version
- Policy decision and approval
- External action and result
- Error, retry, stop, and recovery
- Cost and latency

Detail: [Production Operations](../technical-foundations/production-operations.md)

## 5. Incident and recovery

Inject:

- Source-system delay and failure
- Stale and missing data
- Wrong tool selection
- Permission denial
- Model-quality degradation
- Cost or iteration-limit breach
- Partial success and duplicate action

Classify each failure as automatic retry, human handoff, or immediate stop. Manual fallback must define owner, input, response time, and post-recovery reconciliation.

Evidence:

- Threat model
- Failure classification and response table
- Stop, recovery, and fallback drill
- Incident review and improvement decision

## 6. Operating handoff

Without the implementer, an operator should be able to:

- Identify current state and impact
- Trace representative errors
- Stop automated action
- Switch to manual work
- Reconcile missing and duplicate results after recovery

## Common failures

- Performing security review only before launch
- Treating indefinite conversation storage as audit
- Copying a human account's broad rights into an agent service account
- Assuming a connection protocol solves authorization and approval
- Failing to test retries and deduplication together
- Writing “a human handles it” without a recovery drill

## Recommended path

1. [Data and Context](../delivery-lifecycle/04-data-and-context.md)
2. [Execution Rules and Controls](../delivery-lifecycle/05-execution-contracts.md)
3. [Sandbox Integration](../projects/03-sandbox-integration.md)
4. [Production Pilot](../projects/04-production-pilot.md)
