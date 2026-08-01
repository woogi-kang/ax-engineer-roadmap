# Case: Company Agent Operating Layer

<!-- case-boundary:start -->
## Current scope and designed target

| Scope | Write impact | Autonomy | P stages |
|---|---|---|---|
| Current public artifact | No external write | A0 | None |
| Designed target | Draft plus approved limited write | A1-A3 | P2, P3, P4, P5 |

Current values cover only what this repository can reproduce. The designed target is not yet an implemented scope or evidence of organizational outcomes.
<!-- case-boundary:end -->

> Public-case link: G02's gradual transaction expansion and G10's defect and rework measures shape the scale gates in the [application map](../../research/public-case-application-map.md).

## Case type

This is not a company-wide agent deployed at a real organization or evidence of operating outcomes. It is a **learning and reference organizational-capstone simulation design** that assumes common execution rules have already been reused in two different workflows, then asks what should be shared at organization scale.

“Company agent” does not mean one agent with every source and permission. Slack and Microsoft Teams entry points and common operating rules may be shared, while trust boundaries, credentials, memory, tools, sandboxes, and operating responsibility remain separate for each workflow.

`ready` means that the capstone design can be used for an exercise. It does not mean that OpenClaw, Hermes, or this architecture has been shown to be suitable for enterprise operation.

## Entry gate: reuse in a second workflow

Do not turn the first workflow's code directly into an organizational standard. Begin this capstone only after confirming the following results in another workflow:

- A second workflow with different users, domain, and exceptions has been implemented or simulated to the same level.
- The team recorded which execution identifiers, input and output schemas, approval and policy events, audit format, and stop and recovery methods were reused unchanged.
- Workflow-specific permissions, review criteria, and manual SOPs that were not shared are also recorded.
- The team measured configuration, code, evaluation, and operating effort changed while adding the second workflow.
- Owners of both workflows and the security and operations owners reviewed the reuse result and residual risks.

If this gate is not met, the company agent operating layer remains a design review. An implementation tuned only for the first workflow is not called an organizational standard.

## Problem and users

Employees want to request help once from Slack or Teams. However, combining the data, credentials, memory, and tools of different workflows into one runtime boundary merely because they share a channel allows requester confusion or a prompt attack to spread across workflows.

| User | Needed outcome | Responsibility |
|---|---|---|
| Business practitioner | Request work and inspect state in a familiar channel | Confirm source, review result, and approve |
| Workflow owner | Workflow-specific quality, permission, and stop rules | Set allowed actions and manual SOP |
| AX platform team | Shared entry, policy, audit, and observability | Operate workflow cells and runtime adapters |
| Source SaaS owner | Accurate current state and change records | Approve API, service account, and state meaning |
| Security and privacy owner | Separated trust boundaries and secret lifecycle | Review permission, retention, and incident response |
| Operator | SLOs, incidents, upgrades, and recovery | Execute stop, rollback, and manual fallback |

The default risk is `high`: one incorrect policy, shared credential, contaminated memory, or missing audit record can affect multiple workflows at once.

## Current and target workflows

Distributed initial state:

```text
Slack or Teams request
→ Different bot, script, or personal account for each team
→ Each one reads or changes SaaS
→ Runtime-specific memory and logs
→ Incident and approval state tracked manually
```

Target state:

```text
Shared Slack and Teams entry
→ Verify requester, workflow_id, and request purpose
→ External policy and approval broker
→ Workflow-isolated execution cell
   ├─ Trust boundary
   ├─ Credentials
   ├─ Memory
   ├─ Tools
   └─ Sandbox
→ Read or make an approved change in the workflow's source SaaS
→ Confirm the actual result in source SaaS
→ Record execution state in independent audit and observability layer
```

Slack and Teams are shared entry points only. A CRM, document or work-management tool, ticketing system, or other **source SaaS remains the source of truth** for current workflow state and final changes. Chat history, model responses, and runtime memory do not replace the source SaaS.

## Goals and goals excluded from this scope

### Goals

- Test a common Slack and Teams entry together with separate workflow execution boundaries.
- Perform policy and approval decisions in a broker outside the runtime and apply the same decision to every runtime.
- Use source SaaS state to verify read and write outcomes.
- Compare execution, approval, cost, quality, and incidents in an audit and observability layer separated from the runtime.
- Compare OpenClaw and Hermes as replaceable reference runtime adapters connected to one fixed workflow.

### Goals excluded from this scope

- Serving company-wide users through one agent, gateway, memory store, or service account
- Using a runtime session identifier or model judgment as business authorization
- Promoting Slack or Teams conversation into the authoritative workflow record
- Deciding enterprise suitability, regulatory compliance, or security from a vendor feature list
- Claiming actual organizational outcomes, productivity, cost savings, or adoption

### Stop conditions

- The system cannot determine the `workflow_id` and trust boundary for a request.
- Two workflows share credentials, a memory store, or change tools.
- A runtime can bypass the external policy and approval broker to change source SaaS.
- A mismatch between source SaaS state and the audit record cannot be detected.
- Work cannot continue through the manual SOP when the runtime is stopped.
- A failed upgrade cannot be returned to the prior version, configuration, and schema.

## Trust boundaries and separated responsibility

| Layer | Shared | Separate by workflow |
|---|---|---|
| Slack and Teams entry | Authenticated request format, `workflow_id`, execution-state display | Allowed channels, users, and domain vocabulary |
| Policy and approval broker | Policy-decision schema, approval events, expiry and revocation handling | Roles, limits, prohibited actions, and approvers |
| Workflow execution cell | Adapter interface and state and error format | Trust boundary, credentials, memory, tools, and sandbox |
| Source SaaS | Execution identifier and result-reconciliation rule | API, data owner, completion state, and recovery method |
| Audit and observability | Common event schema and correlation ID | Sensitive-data masking, retention, and workflow SLO |

Separating workflow execution cells means more than splitting chat sessions. Where users with different trust can influence one another, apply the required separate process, container, OS user, host, or gateway boundary, and separate credentials and memory stores with it.

The policy and approval broker takes requester, workflow, target, action, before-and-after state, risk level, and approval state as input and returns `allow`, `deny`, or `require_approval`. A runtime cannot widen its own authority or infer that approval has completed.

The independent audit and observability layer does not merely copy runtime conversation logs. It connects request, policy decision, human approval, tool call, source SaaS result, and recovery state with one execution identifier, and assigns access and retention responsibility separately from runtime administration.

## Comparing runtime adapters against a fixed workflow

Do not compare different demos for the two runtimes. Design the comparison so that both run the following fixed workflow against the same synthetic data and sandbox:

```text
Registered workflow request from Slack or Teams
→ Read a synthetic record from source SaaS
→ Draft an evidence-linked change
→ External policy decision and human approval
→ Perform approved sandbox change
→ Re-read source SaaS result
→ Emit independent audit and observability events
→ Stop, recover, and hand off manually after failure
```

### OpenClaw reference adapter

The [official OpenClaw overview](https://docs.openclaw.ai/) describes a self-hosted gateway that connects multiple messaging channels to agents, with sessions, tools, and multi-agent routing. This case uses those capabilities only as a candidate Slack and Teams entry adapter. — `PRIMARY_OFFICIAL`, verified 2026-07-27

Most importantly, the [official OpenClaw security documentation](https://docs.openclaw.ai/gateway/security) **assumes one trusted operator boundary per gateway**. For different trust boundaries, it requires separate gateways and credentials and recommends separate OS users or hosts where possible. Session separation inside one gateway is not an authorization boundary for hostile multi-user isolation. — `PRIMARY_OFFICIAL`, verified 2026-07-27

An OpenClaw adapter therefore uses separate gateway, credential, and host boundaries when workflows have different trust. It does not present one shared gateway as a company-wide multi-tenant boundary.

### Hermes reference adapter

The [official Hermes overview](https://hermes-agent.nousresearch.com/docs/) describes an agent runtime with a messaging gateway, tools, persistent memory, and multiple execution backends. This case uses it only as a second reference adapter for the same fixed workflow. — `PRIMARY_OFFICIAL`, verified 2026-07-27

The [official Hermes security documentation](https://hermes-agent.nousresearch.com/docs/user-guide/security/) describes layers such as user allowlists and DM pairing, dangerous-command approval, file-write protection, container isolation, MCP credential filtering, and context-file scanning. These controls are inputs to runtime risk reduction, but **they do not replace business authorization and approval policy**. Who may change which customer, project, or record is decided again by the external policy and approval broker and by source SaaS permissions. — `PRIMARY_OFFICIAL`, verified 2026-07-27

### Comparison decision

| Comparison dimension | Common passing condition |
|---|---|
| Adapter replacement | Replace the runtime without changing policy, approval, and audit schemas or the source SaaS contract. |
| Boundary isolation | Prevent access to another workflow's credentials, memory, tools, files, and sessions. |
| Approval bypass | A broker `deny` or unapproved request cannot produce a source SaaS write. |
| Result verification | Use actual source SaaS state, not the runtime response, as completion evidence. |
| Audit completeness | Trace request, policy, approval, tool, result, and recovery with one execution identifier. |
| Failure handling | Stop and recover safely after process termination, timeout, partial success, and duplicate requests. |

Even if a future run passes this comparison, that result will not justify saying “OpenClaw is enterprise-ready” or “Hermes is enterprise-ready.” The evidence would remain limited to a fixed sandbox workflow under the stated operating conditions. Organization-specific security, regulation, support, performance, and procurement remain separate evaluations.

## Operating requirements

| Area | Design and verification |
|---|---|
| Service supervision | A `systemd` unit, container orchestrator, or equivalent service manager owns start, restart, and shutdown. Record process owner, restart limit, dependencies, and queue handling on termination. |
| Health and SLO | Observe liveness, readiness, messaging connection, policy broker, source SaaS, queue age, approval latency, write confirmation, and audit ingestion separately. Workflow owners agree numeric targets; this document does not invent them. |
| Secrets | Separate service accounts and secrets by workflow and inject them from a dedicated store. Keep secrets out of memory, prompts, logs, and profile exports, and exercise rotation, revocation, and expiry. |
| Sandbox | Separate test and production accounts and data, and limit file, network, tool, and resource access per workflow. A container alone does not provide business authorization. |
| Upgrade and rollback | Pin runtime, adapter, policy, and schema versions. Test compatibility in one workflow cell first, and retain a procedure and reconciliation record for returning to the prior image, configuration, and memory-migration state. |
| Kill switch and manual SOP | Separate per-workflow write-tool and credential revocation, global entry shutdown, queue freeze, and read-only mode. The operator reconciles partial success against source SaaS and continues through the established manual process. |

A restarted service is not considered healthy merely because its process exists. Send a representative request and verify policy decision, approval, source SaaS result, and audit events before declaring it ready.

## Failure injection

Normal requests are not sufficient evidence of organizational operability.

- Duplicate Slack or Teams events, invalid `workflow_id`, and requester-identity mapping failure
- Prompt attack that attempts to load another workflow's memory, tools, or credentials
- Forced runtime termination and repeated restart
- Policy-broker latency, outage, and stale policy version
- Race that changes target, body, or tool arguments after approval
- Source SaaS timeout, rate limit, partial success, and lost success response
- Audit-store outage, out-of-order events, and duplicate ingestion
- Request in flight during secret revocation or rotation, and expired credentials
- Schema or tool incompatibility after upgrade and subsequent rollback
- Per-workflow kill switch, global stop, read-only transition, and manual SOP exercise

If the policy broker or audit store is unavailable before a high-risk write, fail closed and block the write. When source SaaS outcome is unknown, do not re-execute automatically; route it to a reconciliation queue and responsible operator.

## Evaluation and handoff

Evaluation dimensions:

- Rules and tools actually reused in the second workflow, plus modified and discarded parts
- Incorrect workflow routing and blocked cross-boundary access
- Writes without external policy and human approval: passing criterion is zero
- Agreement between source SaaS state and audit records
- Runtime-specific error rate, latency, cost, resource use, and operating intervention
- Detection time, recovery time, and duplicate and missing-event reconciliation
- Upgrade and rollback success and memory and schema compatibility
- Ability to execute the kill switch and manual SOP without the implementer

The handoff names the workflow-cell owner, source SaaS owner, policy approver, secret administrator, runtime operator, audit-access owner, and their backups. It also assigns the final decision for incidents, approval disputes, data deletion, and provider replacement.

## Results and limitations

### Current result

- An organizational capstone design that combines common entry points with workflow-specific trust boundaries
- Separated responsibilities for an external policy and approval broker, source SaaS truth, and independent audit and observability
- Decision criteria for comparing OpenClaw and Hermes reference adapters against the same workflow
- An operating and failure-injection checklist from service supervision through kill switch and manual SOP

### Conditions not yet verified

- Actual reuse of common rules and components in a second live workflow
- Identity, permission, and channel operation with real Slack and Teams users and organization accounts
- Effective isolation of gateway, credentials, memory, and tools by workflow
- Operation of an external policy and approval broker and independent audit and observability
- Agreed SLOs and records of incident response, secret rotation, upgrade, and rollback
- OpenClaw and Hermes comparison results on pinned versions
- Organization-specific security, privacy, legal, procurement, and support requirements
- Actual adoption, productivity, quality, cost, or revenue outcomes

While these items remain unverified, do not use this document as evidence of completed deployment or enterprise readiness.

## Reuse and next decision

The default conclusion after the capstone is not to mandate one runtime. Classify each item as `shared`, `workflow-specific`, `revise`, or `discard`:

- Messaging entry and request-identification rules
- Policy, approval, and audit event schemas
- Source SaaS reconciliation and duplicate prevention
- Workflow-cell isolation and secret, memory, and tool boundaries
- Service supervision, health checks, SLOs, and incident response
- Runtime adapter interface and provider-replacement procedure

Before expanding to a third workflow, an independent reviewer checks the second-workflow reuse result, operating burden, remaining exceptions, and stop conditions again.
