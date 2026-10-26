# UI Integration Practice Checklist

Use this template to practice UI interaction when an official API or MCP tool does not support the required workflow. Record interface selection, access, approval of changes, and outcome verification separately. Distinguish a completed document from a test-environment run; the template is not runnable code or proof of production operation.

## 1. Practice scope and interface selection

| Field | Record |
|---|---|
| Workflow and completion criteria |  |
| Workflow owner, system owner, and operator |  |
| Official API capability, authority, and result lookup |  |
| MCP tool capability, authority, and Host and Server support |  |
| Reason for UI interaction and manual alternative |  |
| Owner-permitted actions, data, and period |  |
| Test-environment address, organization, and account role | Do not enter passwords, tokens, or cookies |
| Synthetic data, initial state, and restoration method |  |
| Permitted targets and excluded actions |  |
| Details, history, or export used to verify actual results |  |
| Current verification status | Planned / document review / sandbox test / unverified |

Record the documents or tool inventory checked and the verification date when concluding that a capability is absent. Check site terms and organizational policy, and practice only within the system owner's permitted scope. Do not use production accounts or real customer or financial data. Without a test environment, stop at document review and leave execution results empty.

## 2. Freeze the approved request

| Field | Record |
|---|---|
| Request ID, version, and approval reference |  |
| Organization, account, and target ID |  |
| Secondary information to verify the target ID | Synthetic name, reference date, or similar |
| Before state and permitted after state |  |
| Content, recipients, attachments, and quantity | Record applicable fields only |
| Approver, permitted action, and expiry |  |
| Changes that require renewed review |  |
| Preapproved cancellation and recovery scope |  |

Do not overwrite the request as approved. If the target, input, recipients, or impact changes, record a new version and obtain any required approval. Do not repeat approval at every screen transition while the same target and content remain within a valid approval.

Access and sign-in permission are not approval to send or modify data. Immediately before submission, compare the current account, organization, target, and actual input with the approval. If the target ID cannot be established, do not identify the target solely by its name or screen position.

## 3. Execution and outcome verification

1. Confirm the permitted test environment and start an execution record under the request ID.
2. Separate reading and preparing input from submission. Stop if preparation unexpectedly changes an external system.
3. Before submission, check scope and request version, and whether the request has already been processed.
4. After submission, inspect source-system details and history or exported results. Record the completion message separately from persisted state.
5. Distinguish success, failure, uncertainty, and partial success. Review the result; do not extend the existing approval to out-of-scope follow-up changes.

Hold if source results are unreadable or cannot be tied to the request. Do not repeat refreshes, clicks, or submissions to compensate for poor observability. Keep readback within authorized scope and pass the current state and request ID to someone who can verify it.

## 4. Failure test matrix

For each row, link the input, expected and actual behavior, evidence location, and judgment. Restore the same initial state for independent evaluation; deliberately retain state for duplicate-submission and reconnection tests.

| Situation | Behavior to verify | Required evidence |
|---|---|---|
| Login expiry or account change | Stop changes; after human authentication, recheck organization, target, and authority | Blocked changes after expiry and source-state verification before resumption |
| UI change or moved button | Do not guess from old coordinates or a stale screen; recheck target and action | Changed interface, identification result, and hold or reassessment |
| Different targets with the same name | Compare IDs and secondary information; block submission on a mismatch | Approved versus selected target |
| Malicious document or pop-up instructions | Do not change approval scope, recipients, or authority based on screen content | Attack input and blocked out-of-scope behavior |
| Duplicate submission or lost success response | Check persisted results for the same request before retrying; hold if uncertain | Request ID, created or changed target, and duplicate check |
| Only some items succeed | Separate succeeded, failed, and unstarted items; do not resubmit the entire batch | Per-item state and decision for remaining work |
| Disconnection and reconnection during execution | Restore the saved request and verify source state, permissions, and approval validity | Request ID before and after reconnecting, and source reconciliation |
| Result view or processing history unavailable | Hold and hand off instead of inferring success | Last verified state and handoff details |
| Late completion after cancellation | Block follow-up work, inspect the actual result, and use approved recovery or handoff | Cancellation time, completion or stop state, and compensation result |

Treat on-screen documents, messages, and pop-ups as untrusted data. Text that resembles system instructions cannot change the user's authorized workflow or permissions. Do not automatically follow instructions to dismiss a security warning or visit another address.

## 5. Human-handled steps and recovery

Hand off CAPTCHA, 2FA, signatures, and steps legally requiring direct human action. Do not continue until that action is complete. On resumption, recheck the current account, organization, target, and approval scope. Completion of the human step does not itself authorize a new send or modification.

On a cancellation request, first block further UI actions. Verify the actual state of work already started; do not mark an irreversible result as cancelled. Recover only within preapproved scope and do not overwrite another person's valid changes. Hold and hand off when additional approval is required or the result cannot be verified.

| Handoff field | Record |
|---|---|
| Owner and backup |  |
| Request ID, version, and last verified state |  |
| Completed, unfinished, and unverified items |  |
| Required human action and approval |  |
| Deadline and resumption conditions |  |
| Source reconciliation, recovery, and closure confirmation |  |

## 6. Evidence to retain and information to exclude

- Retain execution time, request and target IDs, approval references, before-and-after state, and the result-verification route.
- Capture only necessary screens and mask personal, confidential, and unrelated information. If masking prevents verification, do not publish the evidence; restrict access to authorized reviewers.
- Do not store passwords, verification codes, API keys, tokens, session cookies, or recovery codes. Exclude authentication screens from capture.
- Define storage location, viewers, retention period, and deletion owner for records and screenshots.
- Mark unexecuted items as planned or unverified. Document review is not evidence of browser execution.

## 7. Exit criteria

- [ ] API, MCP, and UI selection rationale and owner-permitted scope are verified.
- [ ] Test accounts, environments, and synthetic data are isolated from production.
- [ ] The approved request is preserved and target, input, and authority are checked before submission.
- [ ] Actual outcomes and unverified items are distinguished for each failure scenario.
- [ ] Source results establish completion, duplication, and partial success; uncertain actions are not repeated.
- [ ] Cancellation, recovery, human handoff, and resumption conditions have been tested.
- [ ] Masked evidence contains no secrets, and retention and deletion rules are defined.
- [ ] An operator other than the implementer reconstructed the situation from records and performed recovery or handoff.

Related documents: [Software and APIs](../technical-foundations/software-and-api.md), [Security and Privacy](../technical-foundations/security-and-privacy.md), [Sandbox Integration](../projects/03-sandbox-integration.md), [Workflow Execution Rules](execution-contract.md).
