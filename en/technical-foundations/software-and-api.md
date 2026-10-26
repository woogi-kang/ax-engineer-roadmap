# Software and APIs

## Why it matters

An AX system must connect users, source systems, approval, external actions, and records. A demo can work while a real workflow fails if state, permission, duplication, and partial failure are not handled.

## What to know

- HTTP, REST requests, responses, and status codes
- Authentication versus authorization
- Synchronous requests, asynchronous jobs, batch, events, and webhooks
- Relational data, transactions, and state transitions
- Schemas and version compatibility
- Timeouts, retries, deduplication, and idempotency
- Configuration, secrets, and organizational accounts
- Unit, integration, end-to-end testing, and CI/CD

## How to decide

### API versus UI automation

Prefer an official API when it supports required behavior and audit. Consider UI automation when official interfaces cannot support the required workflow and workflow value is already validated. Include UI changes, session expiry, personal-account dependence, and limited auditability in operating risk.

Browser agents also need separate handling for site access, sign-in, and approval of actual changes. Computer use in the OpenAI Agents API is one implementation that assigns this handling to the application. [Official guide](https://developers.openai.com/api/docs/guides/agents-api/tools/computer-use), [release record](https://developers.openai.com/api/docs/changelog) (added 2026-09-29; checked 2026-10-26). Verify completion from source-system state rather than a click or submission message.

### Workflows without a suitable official interface

Compare an official API, an MCP integration, and UI interaction for the same workflow, then record the reason for the choice.

| Route | Verify before choosing |
|---|---|
| Official API | Required reads and changes, authentication, target IDs, result lookup, and deduplication |
| MCP integration | Actual tool capabilities, source-system authority, Host and Server support, and result verification |
| UI interaction | Why official interfaces are insufficient, the system owner's permitted scope, a test environment, and a way to verify results |
| Direct human handling | Automation is not permitted, or the target or outcome cannot be established reliably |

An MCP connection does not itself establish the required workflow capability or authority. Begin UI practice with test accounts and synthetic data. Verify the account, organization, and target ID, and compare actual input with the approved request before submitting. Without an API, source-system details, history, or exported results must still establish persisted state.

If the outcome cannot be verified, hold rather than clicking the button again. Use the [UI integration checklist](../toolkit/ui-integration-checklist.md) for login expiry, UI changes, malicious on-screen instructions, duplicate submission, partial success, and reconnection. A product's computer-use capability is an implementation option, not the origin of UI automation or an industry-wide standard.

### Synchronous versus asynchronous

Use synchronous work when users need an immediate short response. Consider asynchronous jobs and explicit status when external systems are slow, work is long, or retries are required.

### API and SDK changes

The same model name does not guarantee unchanged requests or authentication when API, SDK, or tool-schema versions change. For example, Claude API `2026-10-21` removes sampling parameters, and the corresponding major SDK releases change authentication headers and some context-compaction behavior. This is a vendor example, not a common rule for all providers. [Official migration guide](https://platform.claude.com/docs/en/api/migration-2026-10-21) (API revision 2026-10-21; checked 2026-10-26).

Pin the model, API, SDK, and tool versions to retain a baseline. Compare authentication denial, invalid inputs, timeouts, and partial success as well as successful responses. Do not place provider-specific parameters in a shared request without checking support.

### Build versus existing SaaS

Do not build a new service only because a custom UI is attractive. Check whether existing workflow tools can satisfy approval, state, and audit requirements.

## Practice

1. Connect two test systems.
2. Separate read and write permissions.
3. Define input and output schemas and state transitions.
4. Inject timeout, permission denial, partial success, and duplicate requests.
5. Use an execution key to prevent duplicate side effects.
6. Have another developer reproduce the environment.
7. Run the same contract checks before and after SDK or API changes and exercise rollback.
8. If using UI automation, test login expiry, UI changes, incorrect targets, and duplicate submission.

Validate behavior and failures for the selected integration route. Implementing API, MCP, and UI routes together is not required. Mark unused route-specific items as `not applicable` with the selection rationale; permissions, approval, outcome verification, and recovery remain required.

## Evidence

- Input, output, and state contracts for the selected route, such as API, MCP, event, or UI interaction
- State transitions and error classification
- Runnable code and tests
- Secret-free configuration example
- Deployment and rollback
- Reproduction and handoff record

## Failure patterns

- Handling only successful responses
- Duplicating messages, payments, or updates through retries
- Depending on a personal account or browser session
- Sending unvalidated free-form model output into an API
- Performing the first integration test against production

## Collaborators

- Workflow owner: state and completion meaning
- Source-system owner: official interfaces and limits
- Security owner: authentication, authorization, and secrets
- Operations owner: retries, alerts, and recovery

## Sources

- [`PRIMARY_OFFICIAL` MDN, HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)
- [`PRIMARY_REPOSITORY` roadmap.sh AI Agents prerequisites](https://github.com/nilbuild/developer-roadmap/tree/master/roadmaps/ai-agents/content)
