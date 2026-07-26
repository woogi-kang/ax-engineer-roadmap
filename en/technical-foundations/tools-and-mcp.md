# Tool Calling and MCP

## Why it matters

A generated recommendation and an external read, send, modify, or delete action have different risk. Tool integration turns model output into workflow impact and therefore requires schemas, permissions, approval, audit, and deduplication.

## What to know

- Function and tool definitions
- Read versus write tools
- Input validation, output validation, and policy checks
- User and service-account permissions
- Sandbox versus production
- Side effects, idempotency, and partial success
- MCP Host–Client–Server architecture and capability negotiation
- Transport authorization versus workflow approval

## How to decide

### Direct API versus MCP

A direct official API may be sufficient for one integration. Consider MCP when tools and resources should be reusable across multiple AI hosts. MCP adoption is not itself workflow value or a security control.

### Read versus write

Begin with reading or recommendations. For writes, use separate tools and service accounts. Execute only requests that pass schema, policy, approval, and deduplication.

### Model versus policy

Do not let a model decide its own authority. Enforce prohibited targets, limits, and approval with deterministic policy.

## Practice

1. Define one read and one write tool separately.
2. Create allowed, denied, and approval-required schemas.
3. Inject invalid arguments, unauthorized users, prompt attacks, and duplicate requests.
4. Run write tools only in a sandbox.
5. Correlate request, approval, and result.
6. Confirm manual work continues after the integration is removed.

## Evidence

- Tool catalog and owners
- Input and output schemas
- Read, write, and approval permission matrix
- Sandbox and production separation
- Policy, approval, and action logs
- Duplicate and partial-failure tests
- Disconnect and fallback procedure

## Failure patterns

- Exposing modify and delete functions to a read-only use case
- Executing free-form strings as commands or queries
- Copying a user's broad rights into a service account
- Assuming connection alone is secure when MCP authorization can be optional
- Showing an approval button without evidence or change impact

## Collaborators

- Source-system owner: official API and side effects
- Business approver: evidence required before action
- Security: identity, authorization, service accounts
- Operations: incidents, duplicates, disconnection

## Sources

- [`PRIMARY_OFFICIAL` MCP architecture](https://modelcontextprotocol.io/specification/2025-06-18/architecture) — verified 2026-07-26
- [`PRIMARY_OFFICIAL` MCP authorization](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) — verified 2026-07-26
- [`PRIMARY_OFFICIAL` OWASP, Excessive Agency](https://owasp.org/www-project-top-10-for-large-language-model-applications/2_0_vulns/LLM06_ExcessiveAgency.html) — verified 2026-07-26
