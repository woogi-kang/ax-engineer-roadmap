from __future__ import annotations

import importlib.util
import tempfile
import unittest
from pathlib import Path

CASE_ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "beauty_voc_approval", CASE_ROOT / "pipeline/approval_workflow.py"
)
assert SPEC and SPEC.loader
approval = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(approval)


def simulation() -> approval.Simulation:
    records = approval.pipeline.process_records(
        approval.pipeline.read_many(approval.pipeline.DEFAULT_INPUTS)
    )
    return approval.Simulation(
        approval.pipeline.build_proposals(records),
        {record["source_id"]: record for record in records},
        [
            {"approver_id": "ops", "role": "operations_manager", "topics": ["packaging"], "revoked_at": None},
            {"approver_id": "qa", "role": "safety_reviewer", "topics": ["irritation"], "revoked_at": None},
        ],
    )


def event(event_id: str, at: str, kind: str, **fields: object) -> dict:
    return {"event_id": event_id, "at": f"2026-08-03T{at}:00+09:00", "type": kind, **fields}


class ApprovalWorkflowTest(unittest.TestCase):
    def test_execution_requires_a_current_approval(self) -> None:
        sim = simulation()
        sim.apply(event("a", "09:00", "submit", request_id="r", proposal_id="proposal-packaging"))
        blocked = sim.apply(event("b", "09:05", "execute", request_id="r", idempotency_key="k1"))
        self.assertEqual(blocked["reason"], "not_approved:pending")
        sim.apply(event("c", "09:10", "decide", request_id="r", actor="ops", decision="approve", version=1))
        sim.apply(event("d", "09:15", "update_proposal", request_id="r", remove_evidence_refs=["voc-001"]))
        self.assertEqual(
            sim.apply(event("e", "09:20", "execute", request_id="r", idempotency_key="k1"))["reason"],
            "not_approved:pending",
        )
        self.assertEqual(
            sim.apply(event("f", "09:25", "decide", request_id="r", actor="ops", decision="approve", version=1))["reason"],
            "stale_version",
        )
        self.assertEqual(sim.executions, [])

    def test_safety_proposals_need_safety_role_and_live_authority(self) -> None:
        sim = simulation()
        sim.apply(event("a", "09:00", "submit", request_id="r", proposal_id="proposal-irritation"))
        sim.apply(event("b", "09:05", "decide", request_id="r", actor="qa", decision="approve", version=1))
        sim.apply(event("c", "09:10", "revoke_approver", request_id="r", approver_id="qa"))
        result = sim.apply(event("d", "09:15", "execute", request_id="r", idempotency_key="k1"))
        self.assertEqual(result["reason"], "approver_revoked")
        self.assertEqual(sim.requests["r"]["state"], "on_hold")

    def test_same_idempotency_key_does_not_execute_twice(self) -> None:
        sim = simulation()
        sim.apply(event("a", "09:00", "submit", request_id="r", proposal_id="proposal-packaging"))
        sim.apply(event("b", "09:05", "decide", request_id="r", actor="ops", decision="approve", version=1))
        first = sim.apply(event("c", "09:10", "execute", request_id="r", idempotency_key="k1"))
        second = sim.apply(event("d", "09:11", "execute", request_id="r", idempotency_key="k1"))
        self.assertEqual(first["outcome"], "accepted")
        self.assertEqual(second["reason"], "duplicate_execution")
        self.assertEqual(len(sim.executions), 1)
        self.assertFalse(sim.executions[0]["external_write"])

    def test_committed_scenarios_pass_without_bypass(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            summary = approval.run(output_dir=Path(directory))
        self.assertTrue(summary["evaluation_passed"])
        self.assertEqual(summary["approval_bypass_count"], 0)
        self.assertEqual(summary["external_write_count"], 0)
        self.assertGreaterEqual(summary["scenario_count"], 10)


if __name__ == "__main__":
    unittest.main()
