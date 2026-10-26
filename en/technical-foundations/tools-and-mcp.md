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

### Specification version and implementation support

The baseline is the final MCP `2026-07-28` specification. It removes protocol sessions and the `initialize` exchange, carrying version and capability information on each request. Servers must implement `server/discover`; clients may call it up front. Persist workflow state under separate identifiers. [Official specification](https://modelcontextprotocol.io/specification/2026-07-28) (revision 2026-07-28; checked 2026-10-26).

| Category | Check before implementation |
|---|---|
| Final `2026-07-28` specification | Per-request capabilities, MRTR additional input, new requests after disconnection, and deduplication |
| Older versions such as `2025-06-18` | Existing Host and Server versions and compatibility paths; a new revision does not require immediate retirement of working integrations |
| Optional extensions such as Tasks | Support on both client and server, task state, result retrieval, and additional input |
| Future proposals | Record status and review triggers in the [review list](../research/standards-watchlist.md); do not make them requirements for a current implementation |

Roots, Sampling, Logging, and DCR are deprecated in the new revision, not immediately removed. Check authorization-server issuer validation and credential separation as well. Use the [changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog) for changes and deprecation periods (revision 2026-07-28; checked 2026-10-26).

Specification publication and product support may have different dates. For each connection, record Host, Server, SDK, transport, authorization, extensions, and verification date.

### Read versus write

Begin with reading or recommendations. For writes, use separate tools and service accounts. Execute only requests that pass schema, policy, approval, and deduplication.

### Model versus policy

Do not let a model decide its own authority. Enforce prohibited targets, limits, and approval with deterministic policy.

If MCP is not adopted, mark MCP specification, extension, Host, and Server support checks as `not applicable` and record why a direct integration was selected. Tool permissions, approval, outcome verification, and deduplication still apply regardless of the connection method.

## Practice

1. Define one read and one write tool separately.
2. Create allowed, denied, and approval-required schemas.
3. Inject invalid arguments, unauthorized users, prompt attacks, and duplicate requests.
4. Run write tools only in a sandbox.
5. Correlate request, approval, and result.
6. Confirm manual work continues after the integration is removed.
7. Test connection and rejection across supported-version combinations. Query the source result after disconnection to prevent duplicate writes.
8. Verify that a change to the target, arguments, or authority while awaiting input or approval invalidates the earlier approval.

## Evidence

- Tool catalog, owners, and connection-version support matrix
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

- [`PRIMARY_OFFICIAL` MCP architecture](https://modelcontextprotocol.io/specification/2025-06-18/architecture) (older-version compatibility reference; checked 2026-07-26)
- [`PRIMARY_OFFICIAL` MCP authorization](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) (older-version compatibility reference; checked 2026-07-26)
- [`PRIMARY_OFFICIAL` OWASP, Excessive Agency](https://owasp.org/www-project-top-10-for-large-language-model-applications/2_0_vulns/LLM06_ExcessiveAgency.html) — verified 2026-07-26
