# Case: From inventory exceptions to purchase and transfer proposals

Reordering whenever inventory crosses a threshold can create excess stock or duplicate orders. This case combines current stock, committed orders, inbound supply, stock in other locations, and supplier constraints to present accountable operators with bounded options.

## 1. Case type and current evidence

- Type: workflow
- Domain: data and operations
- Current stage: simulation design
- Practice path: P1–P4
- External impact: approved proposals written only to procurement and warehouse sandboxes

The case uses synthetic inventory, order, and supplier data. It does not place a real purchase order or warehouse transfer.

## 2. Problem and users

| Item | Description |
|---|---|
| Trigger | Stock below threshold, demand spike, inbound delay, location-level stockout risk |
| Primary users | Inventory operators, procurement, warehouse operations, sales and demand planning |
| Owners | Operations owns stock state; procurement owns supplier terms; sales and operations owners set customer and channel priorities |
| Common problems | Stale snapshots, missing in-transit stock, duplicate orders, changed lead times, missing substitution rules |
| Failure impact | Stockouts, excess inventory, expedite cost, location imbalance, canceled supplier orders |

## 3. Target flow

```text
Receive an inventory exception
→ reread stock, reservations, transfers, orders, and inbound supply
→ verify data time and item identifiers
→ compare purchase, transfer, and hold options
→ show evidence and expected impact to an operator
→ obtain amount, quantity, and item-level approval
→ record the proposal in a sandbox
→ verify actual state and follow-up events
```

## 4. Authoritative information by system

| System | Authoritative information | Boundary |
|---|---|---|
| ERP | Item, purchase order, accounting stock | May differ from real-time warehouse state |
| WMS | Available, reserved, and in-transfer stock by location | Requires aligned item identifiers |
| Order system | Confirmed order and cancellation state | Keep forecast separate from actual orders |
| Supplier and procurement system | Lead time, minimum quantity, existing orders | Verify that conditions are current |
| Operations ledger | Proposal, approval, action, and reconciliation events | Does not replace source-system quantity |

## 5. Control boundary

- AI explains the exception and compares purchase, transfer, and hold options.
- If data age exceeds the allowed threshold, refresh it instead of producing a proposal.
- Account for open purchase orders and stock in transit to prevent duplicates.
- High amount, quantity, or safety impact requires an additional approver.
- Automatic purchasing, supplier replacement, item substitution, and customer-order cancellation are excluded.
- If source state changes after approval, recalculate and reapprove before action.

## 6. P1–P4 practice path

| Stage | Practice | Exit criterion |
|---|---|---|
| P1 | Find exceptions and candidates in synthetic snapshots | Pass stale-data, negative-stock, and duplicate-order tests |
| P2 | Compare evidence and options in approval | Record edits, hold, and rejection reasons |
| P3 | Record proposals in procurement and WMS sandboxes | Test idempotency, state refresh, and partial-failure recovery |
| P4 | Plan a bounded item-family pilot | Prepare stop thresholds, manual purchasing, and reconciliation |

## 7. Failure injection and recovery

| Injected failure | What to verify | Recovery |
|---|---|---|
| Inventory snapshot is stale | Stop the proposal | Reread source state |
| Purchase order already exists | Prevent a duplicate | Link the existing order |
| Demand spikes during approval | Discard stale calculation | Recalculate and reapprove |
| Only the transfer record succeeds | Expose partial action | Hold the purchase proposal for operator review |
| Supplier lead time changes | Re-evaluate the proposal | Procurement decides on alternatives |

Measure stale-data blocks, duplicate proposals, operator edits, partial failures, recovery time, and post-action mismatch rather than recommendation acceptance alone.

## 8. Deliverables and limits

Public deliverables are synthetic inventory events, data contracts, option comparisons, approval records, sandbox writes, and failure and recovery records.

There is no evidence of improved stockout rate, inventory turns, service level, or purchasing cost. Safety stock, lead time, substitution, and allocation rules require local definition.

## 9. Reuse decision

State refresh, snapshot time, idempotent proposals, amount and quantity approvals, and a partial-failure ledger can be reused in other operations workflows only after second-workflow validation.
