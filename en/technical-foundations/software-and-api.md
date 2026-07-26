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

Prefer an official API when it supports required behavior and audit. Consider UI automation only when no official interface exists and workflow value is already validated. Include UI changes, session expiry, personal-account dependence, and limited auditability in operating risk.

### Synchronous versus asynchronous

Use synchronous work when users need an immediate short response. Consider asynchronous jobs and explicit status when external systems are slow, work is long, or retries are required.

### Build versus existing SaaS

Do not build a new service only because a custom UI is attractive. Check whether existing workflow tools can satisfy approval, state, and audit requirements.

## Practice

1. Connect two test systems.
2. Separate read and write permissions.
3. Define input and output schemas and state transitions.
4. Inject timeout, permission denial, partial success, and duplicate requests.
5. Use an execution key to prevent duplicate side effects.
6. Have another developer reproduce the environment.

## Evidence

- API, event, and schema contracts
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
- [`PRIMARY_REPOSITORY` roadmap.sh AI Agents prerequisites](https://github.com/nilbuild/developer-roadmap/tree/master/src/data/roadmaps/ai-agents/content)
