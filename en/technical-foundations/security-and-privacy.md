# Security and Privacy

## Why it matters

LLM systems use natural language at the boundary between instruction and data. Untrusted documents can induce tool calls, while broad permissions and excessive retention can turn small model errors into serious workflow incidents. Security and privacy begin at purpose definition and continue through retirement.

## What to know

- Data classification, purpose, minimization, retention, and deletion
- Authentication, authorization, least privilege, and service accounts
- Direct and indirect prompt attacks
- Sensitive-data disclosure and unsafe output handling
- Excessive functionality, permission, and autonomy
- Supply-chain and external-model or tool risk
- Sandbox, allowlists, rate and cost limits
- Threat modeling, security testing, and incident response
- Data-subject rights, transparency, and governance

## How to decide

### Can this data be sent?

Check purpose, data category, legal basis, contract, storage location, retention and training terms, and deletion before convenience. Consider anonymization, pseudonymization, and minimum-field source queries.

### Which permissions are needed?

Separate read, recommend, request approval, write, and delete. Limit available tools and arguments. Do not directly delegate the user's full permissions.

### How should prompt attacks be addressed?

Do not rely on one instruction telling the model to ignore hostile content. Mark trust boundaries, separate content from commands, validate tool arguments, and require deterministic policy and approval for high-impact actions.

## Practice

1. Draw data flows and trust boundaries.
2. Identify assets, attackers, misuse, and impact.
3. Place hidden instructions in external documents or email.
4. Test privilege escalation, sensitive-data requests, and prohibited targets.
5. Reproduce attacks with least-privilege accounts and a sandbox.
6. Verify masking, retention, deletion, and log access.
7. Drill action shutdown and incident reporting.

## Evidence

- Data flow and processing purpose
- Threat model and risk owner
- Role and service-account permission matrix
- Adversarial evaluation set and results
- Sandbox, allowlist, and limits
- Retention, deletion, correction, and access process
- Incident response and improvement record

## Failure patterns

- Treating prompt wording as a security boundary
- Exposing unused tool functions
- Using a personal account for automation
- Retaining every input and output indefinitely
- Assuming protocol or vendor identity replaces workflow approval
- Generalizing legal text instead of checking applicability

## Collaborators

- Workflow owner: prohibited actions and risk tolerance
- Data and privacy owners: purpose and lifecycle
- Security: threats, permissions, and testing
- Legal: current law and contract applicability
- Operations: shutdown, recovery, and incident reporting

## Sources

- [`PRIMARY_OFFICIAL` PIPC generative AI privacy guidance summary](https://m.pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS212&mCode=C040030000&nttId=11360) — verified 2026-07-26
- [`PRIMARY_OFFICIAL` Korean Law Information Center, AI Basic Act Enforcement Decree Article 23](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lspttninfSeq=198075) — verified 2026-07-26
- [`PRIMARY_OFFICIAL` OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) — verified 2026-07-26
- [`PRIMARY_OFFICIAL` NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) — verified 2026-07-26
