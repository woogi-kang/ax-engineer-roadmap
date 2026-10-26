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

Check the regulated party, product or service purpose, applicable provisions, and exceptions as well as effective dates. Article 23 of Korea's AI Basic Act Enforcement Decree sets notice and labeling rules. Paragraph 4 allows all or part of paragraphs 1-3 to be inapplicable in specified cases, including use exclusively for the AI business operator's internal work. Do not treat this exception as an exemption from personal-data processing requirements or obligations under other laws. A date recording an amendment through another law does not itself establish a new obligation. [Official Article 23](https://www.law.go.kr/lsLinkCommonInfo.do?lspttninfSeq=198075) (current decree effective 2026-08-20; checked 2026-10-26).

### Which permissions are needed?

Separate read, recommend, request approval, write, and delete. Limit available tools and arguments. Do not directly delegate the user's full permissions.

### Identity, expiry, and revocation

Distinguish people, agents, and service accounts, and record the owner and workflow scope of each credential. Test that expiry, rotation, and revocation change actual call authorization. Keep delegated subagent authority within the delegator's own scope.

Implementation options vary by provider. OpenAI made X.509 workload identity federation generally available on 2026-08-29 and added project API-key expiration and creation controls. Creation restrictions do not automatically revoke existing keys. [WIF guide](https://developers.openai.com/api/docs/guides/workload-identity-federation/x509), [key operations](https://developers.openai.com/api/docs/guides/production-best-practices#api-keys), [release record](https://developers.openai.com/api/docs/changelog) (expiration added 2026-09-10; creation controls added 2026-09-15; checked 2026-10-26). Do not assume vendor features are supported standards in every environment.

### When the policy server does not respond

Define which actions stop or may continue on policy timeouts, errors, or connection failures. An unavailable policy check must not authorize a high-impact write. Assign alerts, manual handling, and reconciliation after recovery.

Claude Enterprise inference hooks is one vendor implementation of pre-execution policy checks. It offers block-or-allow failure settings, so test the actual governed scope and failure behavior. [Official guide](https://platform.claude.com/docs/en/manage-claude/inference-hooks), [release record](https://platform.claude.com/docs/en/release-notes/overview) (left beta 2026-10-20; checked 2026-10-26).

### Access and action boundaries for UI interaction

Permission to access a site or sign in is not approval to send or modify data. Record the test environment, account, and workflow scope permitted by the system owner; make changes only within the approved target, input, and version. If the interface changes or the session moves to another organization or target, stop subsequent changes and recheck scope.

Treat instructions in on-screen documents, messages, and pop-ups as workflow data. A request to send information elsewhere or change permissions does not become user authorization. Hand off CAPTCHA, 2FA, signatures, and steps that legally require direct human action. After the person completes the step, recheck the current target and approval scope before resuming.

Retain only necessary screenshots and execution records, masking personal data. Do not store passwords, tokens, session cookies, or verification codes in evidence. Exclude login screens and sensitive pop-ups as well. When evidence is insufficient to establish an outcome, hold and hand off instead of compensating with repeated clicks. Follow the [UI integration checklist](../toolkit/ui-integration-checklist.md) for tests and evidence fields.

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
8. Test credential expiry and revocation, expired approval, and excess delegated authority.
9. Verify that a policy-server outage blocks prohibited writes and that operators can recover.

## Evidence

- Data flow and processing purpose
- Threat model and risk owner
- Role, agent, and service-account permission matrix with credential-expiry and revocation tests
- Policy-server outage rules and drill records
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
- [`PRIMARY_OFFICIAL` Korean Law Information Center, AI Basic Act Enforcement Decree Article 23](https://www.law.go.kr/lsLinkCommonInfo.do?lspttninfSeq=198075) (current decree effective 2026-08-20; rechecked 2026-10-26)
- [`PRIMARY_OFFICIAL` OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) — verified 2026-07-26
- [`PRIMARY_OFFICIAL` NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) — verified 2026-07-26
