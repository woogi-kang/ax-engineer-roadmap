# Workflow Execution Rules

Use this template to define the input, output, evaluation, permission, approval, record, and recovery rules for one AI-enabled workflow. It complements data and API contracts; it does not replace them.

## 1. Purpose and ownership

| Field | Content |
|---|---|
| Document name and version |  |
| Workflow purpose |  |
| Primary users |  |
| Process owner |  |
| Data owner |  |
| Technical operator |  |
| Approver |  |
| Security or policy owner |  |

## 2. Input conditions

| Input | Source | Required | Freshness | Missing or error handling | Sensitivity |
|---|---|---:|---|---|---|
|  |  |  |  |  |  |

## 3. Output conditions

| Output | Format or schema | Quality criteria | Evidence | Next user or system |
|---|---|---|---|---|
|  |  |  |  |  |

## 4. Evaluation criteria

| Dimension | Criteria | Data | Adjudicator | Action on failure |
|---|---|---|---|---|
| Correctness |  |  |  |  |
| Groundedness |  |  |  |  |
| Safety |  |  |  |  |
| Latency |  |  |  |  |
| Cost |  |  |  |  |
| Workflow outcome |  |  |  |  |

## 5. Permissions and autonomy

| Action | AI permission | Human role | Approval condition | Prohibited condition |
|---|---|---|---|---|
| Read |  |  |  |  |
| Analyze or classify |  |  |  |  |
| Draft or propose |  |  |  |  |
| Create internal work |  |  |  |  |
| Change state |  |  |  |  |
| Send externally |  |  |  |  |

Initial autonomy: `A0 / A1 / A2 / A3 / A4`

## 6. Records

- Workflow and execution identifier:
- User or system actor:
- Input and output contract version:
- Model, prompt, and tool version:
- Approval, execution, and recovery events:
- Sensitive information not to store:
- Retention and deletion period:

## 7. Failure and recovery

| Failure type | Detection | Automatic action | Human handoff | Recovery or rollback |
|---|---|---|---|---|
| Missing input |  |  |  |  |
| Permission failure |  |  |  |  |
| Quality threshold failure |  |  |  |  |
| External-system outage |  |  |  |  |
| Duplicate execution |  |  |  |  |
| Cost limit exceeded |  |  |  |  |

## 8. Change and compatibility

- Change approver:
- Regression evaluation:
- Previous-version support:
- Retirement and migration:
- Rollback criteria:

## 9. Operating decision

| Decision | Condition |
|---|---|
| Scale |  |
| Improve |  |
| Maintain |  |
| Stop |  |
