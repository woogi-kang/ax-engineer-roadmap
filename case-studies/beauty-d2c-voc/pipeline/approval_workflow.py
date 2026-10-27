#!/usr/bin/env python3
"""P2 approval workflow simulation for the Beauty/D2C VOC case study.

Replays a synthetic event log against the P1 proposals. Every approval is bound
to a proposal version, approver authority is re-checked at execution time, and
an approved request only produces a mock execution record. Nothing is written
to an external work system.
"""

from __future__ import annotations

import argparse
import hashlib
import html
import importlib.util
import json
import sys
import tempfile
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any

CASE_ROOT = Path(__file__).resolve().parents[1]
APPROVAL_DATA = CASE_ROOT / "data/approval"
DEFAULT_APPROVERS = APPROVAL_DATA / "approvers.json"
DEFAULT_EVENTS = APPROVAL_DATA / "events.jsonl"
DEFAULT_EXPECTED = APPROVAL_DATA / "expected-outcomes.jsonl"
DEFAULT_OUTPUT = CASE_ROOT / "artifacts/approval"
EN_PACKETS = CASE_ROOT.parents[1] / "en/case-studies/beauty-d2c-voc/artifacts/approval/approval-packets.md"
GENERATED_OUTPUT_NAMES = (
    "approval-audit-log.jsonl",
    "approval-evaluation.json",
    "approval-packets.md",
    "approval-requests.json",
    "mock-executions.jsonl",
)

REQUEST_TTL = timedelta(hours=72)
APPROVAL_VALIDITY = timedelta(hours=48)
DECISIONS = {"approve", "approve_with_edits", "reject", "request_info"}
REASON_REQUIRED = {"approve_with_edits", "reject", "request_info"}
SAFETY_ROLE = "safety_reviewer"
WORK_ITEM_TEMPLATES = {
    "irritation": {"team": "quality-safety", "priority": "high", "title": "피부 이상 반응 신고 확인"},
    "packaging": {"team": "packaging-logistics", "priority": "normal", "title": "용기·포장 불량 원인 확인"},
    "delivery": {"team": "logistics-cs", "priority": "normal", "title": "배송 지연 구간 확인"},
    "scent": {"team": "product-planning", "priority": "low", "title": "향 강도 피드백 검토"},
    "product_effect": {"team": "product-planning", "priority": "low", "title": "제품 효과 기대치 안내 검토"},
}
WORK_ITEM_TITLES_EN = {
    "irritation": "Check skin-reaction reports",
    "packaging": "Find the cause of container and packaging defects",
    "delivery": "Check delayed delivery legs",
    "scent": "Review scent-strength feedback",
    "product_effect": "Review guidance on expected product effects",
}


def load_pipeline() -> Any:
    spec = importlib.util.spec_from_file_location(
        "beauty_voc_pipeline", CASE_ROOT / "pipeline/run_pipeline.py"
    )
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


pipeline = load_pipeline()


def parse_time(value: str) -> datetime:
    parsed = pipeline.parse_datetime(value)
    if parsed is None:
        raise ValueError(f"invalid timestamp: {value}")
    return parsed


def content_hash(proposal: dict[str, Any]) -> str:
    material = json.dumps(proposal, ensure_ascii=False, sort_keys=True)
    return hashlib.sha256(material.encode("utf-8")).hexdigest()[:16]


def draft_work_item(proposal: dict[str, Any]) -> dict[str, Any]:
    template = WORK_ITEM_TEMPLATES[proposal["topic"]]
    return {
        "title": template["title"],
        "team": template["team"],
        "priority": template["priority"],
        "evidence_refs": list(proposal["evidence_refs"]),
        "markets": list(proposal["markets"]),
    }


class Simulation:
    def __init__(
        self,
        proposals: list[dict[str, Any]],
        records: dict[str, dict[str, Any]],
        approvers: list[dict[str, Any]],
    ) -> None:
        self.proposals = {item["proposal_id"]: dict(item) for item in proposals}
        self.records = records
        self.approvers = {item["approver_id"]: dict(item) for item in approvers}
        self.requests: dict[str, dict[str, Any]] = {}
        self.audit: list[dict[str, Any]] = []
        self.executions: list[dict[str, Any]] = []
        self.executed_keys: dict[str, str] = {}

    # Authority is evaluated at the moment of each action, never cached.
    def authority_error(self, actor: str, proposal: dict[str, Any], at: datetime) -> str | None:
        approver = self.approvers.get(actor)
        if approver is None:
            return "unknown_approver"
        revoked_at = approver.get("revoked_at")
        if revoked_at and parse_time(revoked_at) <= at:
            return "approver_revoked"
        if proposal["topic"] not in approver["topics"]:
            return "topic_out_of_scope"
        if proposal["safety_signal"] and approver["role"] != SAFETY_ROLE:
            return "safety_role_required"
        return None

    def expire_if_due(self, request: dict[str, Any], at: datetime) -> None:
        if request["state"] in {"pending", "info_requested"} and at > parse_time(
            request["expires_at"]
        ):
            request["state"] = "expired"

    def record(self, event: dict[str, Any], outcome: str, reason: str | None, **extra: Any) -> dict[str, Any]:
        entry = {
            "event_id": event["event_id"],
            "at": event["at"],
            "type": event["type"],
            "request_id": event.get("request_id"),
            "actor": event.get("actor"),
            "outcome": outcome,
            "reason": reason,
            **extra,
        }
        self.audit.append(entry)
        return entry

    def apply(self, event: dict[str, Any]) -> dict[str, Any]:
        at = parse_time(event["at"])
        handler = getattr(self, f"on_{event['type']}", None)
        if handler is None:
            return self.record(event, "blocked", "unknown_event_type")
        request = self.requests.get(event.get("request_id", ""))
        if event["type"] != "submit":
            if request is None:
                return self.record(event, "blocked", "unknown_request")
            self.expire_if_due(request, at)
        return handler(event, request, at)

    def on_submit(self, event: dict[str, Any], _: Any, at: datetime) -> dict[str, Any]:
        proposal = self.proposals.get(event["proposal_id"])
        if proposal is None:
            return self.record(event, "blocked", "unknown_proposal")
        if event["request_id"] in self.requests:
            return self.record(event, "blocked", "duplicate_request")
        self.requests[event["request_id"]] = {
            "request_id": event["request_id"],
            "proposal_id": proposal["proposal_id"],
            "topic": proposal["topic"],
            "safety_signal": proposal["safety_signal"],
            "version": 1,
            "version_history": [{"version": 1, "content_hash": content_hash(proposal)}],
            "state": "pending",
            "submitted_at": event["at"],
            "expires_at": (at + REQUEST_TTL).isoformat(),
            "decisions": [],
            "work_item": draft_work_item(proposal),
            "execution_id": None,
        }
        return self.record(event, "accepted", None, version=1)

    def on_update_proposal(self, event: dict[str, Any], request: dict[str, Any], at: datetime) -> dict[str, Any]:
        if request["state"] in {"executed", "rejected", "cancelled", "expired"}:
            return self.record(event, "blocked", f"request_{request['state']}")
        proposal = self.proposals[request["proposal_id"]]
        added = event.get("add_evidence_refs", [])
        removed = set(event.get("remove_evidence_refs", []))
        if any(
            self.records.get(ref, {}).get("status") not in {"ready", "review_required"}
            for ref in added
        ):
            return self.record(event, "blocked", "unusable_evidence")
        refs = [ref for ref in proposal["evidence_refs"] if ref not in removed]
        refs += [ref for ref in added if ref not in refs]
        if not refs:
            return self.record(event, "blocked", "no_evidence_left")
        proposal["evidence_refs"] = refs
        proposal["observed_count"] = len(refs)
        proposal["markets"] = sorted({self.records[ref]["market"] for ref in refs})
        proposal["safety_signal"] = any(self.records[ref]["safety_flag"] for ref in refs)
        version = request["version"] + 1
        invalidated = request["state"] in {"approved", "approved_with_edits"}
        request.update(
            safety_signal=proposal["safety_signal"],
            version=version,
            state="pending",
            work_item=draft_work_item(proposal),
            expires_at=(at + REQUEST_TTL).isoformat(),
        )
        request["version_history"].append(
            {"version": version, "content_hash": content_hash(proposal), "reason": event.get("reason")}
        )
        return self.record(
            event,
            "accepted",
            "prior_approval_invalidated" if invalidated else None,
            version=version,
        )

    def on_decide(self, event: dict[str, Any], request: dict[str, Any], at: datetime) -> dict[str, Any]:
        decision = event.get("decision")
        if decision not in DECISIONS:
            return self.record(event, "blocked", "unknown_decision")
        if request["state"] not in {"pending", "info_requested", "on_hold"}:
            return self.record(event, "blocked", f"request_{request['state']}")
        if event.get("version") != request["version"]:
            return self.record(event, "blocked", "stale_version", current_version=request["version"])
        proposal = self.proposals[request["proposal_id"]]
        authority = self.authority_error(event["actor"], proposal, at)
        if authority:
            return self.record(event, "blocked", authority)
        if decision in REASON_REQUIRED and not event.get("reason"):
            return self.record(event, "blocked", "reason_required")

        work_item = dict(request["work_item"])
        if decision == "approve_with_edits":
            edits = event.get("edits", {})
            removed = set(edits.get("remove_evidence_refs", []))
            work_item.update({k: v for k, v in edits.items() if k != "remove_evidence_refs"})
            work_item["evidence_refs"] = [
                ref for ref in work_item["evidence_refs"] if ref not in removed
            ]
            if not work_item["evidence_refs"]:
                return self.record(event, "blocked", "no_evidence_left")
        request["work_item"] = work_item
        request["state"] = {
            "approve": "approved",
            "approve_with_edits": "approved_with_edits",
            "reject": "rejected",
            "request_info": "info_requested",
        }[decision]
        request["decisions"].append(
            {
                "event_id": event["event_id"],
                "actor": event["actor"],
                "decision": decision,
                "version": request["version"],
                "at": event["at"],
                "reason": event.get("reason"),
                "review_minutes": event.get("review_minutes"),
                "wait_minutes": int((at - parse_time(request["submitted_at"])).total_seconds() // 60),
            }
        )
        if decision in {"approve", "approve_with_edits"}:
            request["approval_valid_until"] = (at + APPROVAL_VALIDITY).isoformat()
        return self.record(event, "accepted", None, decision=decision, version=request["version"])

    def on_revoke_approver(self, event: dict[str, Any], request: dict[str, Any], at: datetime) -> dict[str, Any]:
        approver = self.approvers.get(event["approver_id"])
        if approver is None:
            return self.record(event, "blocked", "unknown_approver")
        approver["revoked_at"] = event["at"]
        return self.record(event, "accepted", None, approver_id=event["approver_id"])

    def on_cancel(self, event: dict[str, Any], request: dict[str, Any], at: datetime) -> dict[str, Any]:
        if request["state"] in {"executed", "rejected", "cancelled", "expired"}:
            return self.record(event, "blocked", f"request_{request['state']}")
        request["state"] = "cancelled"
        return self.record(event, "accepted", event.get("reason"))

    def on_execute(self, event: dict[str, Any], request: dict[str, Any], at: datetime) -> dict[str, Any]:
        key = event["idempotency_key"]
        if key in self.executed_keys:
            return self.record(
                event, "blocked", "duplicate_execution", first_execution_id=self.executed_keys[key]
            )
        if request["state"] == "executed":
            return self.record(
                event, "blocked", "already_executed", first_execution_id=request["execution_id"]
            )
        if request["state"] not in {"approved", "approved_with_edits"}:
            return self.record(event, "blocked", f"not_approved:{request['state']}")
        if at > parse_time(request["approval_valid_until"]):
            request["state"] = "expired"
            return self.record(event, "blocked", "approval_expired")
        last = request["decisions"][-1]
        if last["version"] != request["version"]:
            return self.record(event, "blocked", "stale_version")
        authority = self.authority_error(last["actor"], self.proposals[request["proposal_id"]], at)
        if authority:
            request["state"] = "on_hold"
            return self.record(event, "blocked", authority)

        execution_id = f"mock-exec-{len(self.executions) + 1:03d}"
        self.executions.append(
            {
                "execution_id": execution_id,
                "request_id": request["request_id"],
                "proposal_id": request["proposal_id"],
                "version": request["version"],
                "approved_by": last["actor"],
                "decision_event_id": last["event_id"],
                "idempotency_key": key,
                "executed_at": event["at"],
                "work_item": request["work_item"],
                "mock": True,
                "external_write": False,
            }
        )
        self.executed_keys[key] = execution_id
        request["state"] = "executed"
        request["execution_id"] = execution_id
        return self.record(event, "accepted", None, execution_id=execution_id)


def evaluate(sim: Simulation, expected: list[dict[str, Any]]) -> dict[str, Any]:
    by_event = {entry["event_id"]: entry for entry in sim.audit}
    rows = []
    for item in expected:
        actual = by_event.get(item["event_id"])
        passed = (
            actual is not None
            and actual["outcome"] == item["expected_outcome"]
            and actual["reason"] == item.get("expected_reason")
        )
        rows.append(
            {
                "event_id": item["event_id"],
                "scenario": item["scenario"],
                "expected": [item["expected_outcome"], item.get("expected_reason")],
                "actual": [actual["outcome"], actual["reason"]] if actual else None,
                "passed": passed,
            }
        )

    # A bypass is any mock execution not backed by a valid, current approval.
    decision_events = {entry["event_id"]: entry for entry in sim.audit if entry["type"] == "decide"}
    bypasses = [
        execution["execution_id"]
        for execution in sim.executions
        if decision_events.get(execution["decision_event_id"], {}).get("outcome") != "accepted"
        or decision_events[execution["decision_event_id"]].get("version") != execution["version"]
    ]
    decisions = [d for request in sim.requests.values() for d in request["decisions"]]
    counts: dict[str, int] = {}
    for decision in decisions:
        counts[decision["decision"]] = counts.get(decision["decision"], 0) + 1
    reviewed = [d["review_minutes"] for d in decisions if d["review_minutes"] is not None]
    waits = [d["wait_minutes"] for d in decisions]
    blocked_reasons: dict[str, int] = {}
    for entry in sim.audit:
        if entry["outcome"] == "blocked":
            blocked_reasons[entry["reason"]] = blocked_reasons.get(entry["reason"], 0) + 1
    return {
        "all_expectations_passed": all(row["passed"] for row in rows) and not bypasses,
        "scenario_count": len({row["scenario"] for row in rows}),
        "event_count": len(sim.audit),
        "approval_bypass_count": len(bypasses),
        "mock_execution_count": len(sim.executions),
        "external_write_count": sum(e["external_write"] for e in sim.executions),
        "decision_counts": dict(sorted(counts.items())),
        "edit_rate": round(counts.get("approve_with_edits", 0) / len(decisions), 4) if decisions else 0.0,
        "review_minutes_total": sum(reviewed),
        "wait_minutes_median": sorted(waits)[len(waits) // 2] if waits else None,
        "blocked_reasons": dict(sorted(blocked_reasons.items())),
        "rows": rows,
    }


PACKET_LABELS = {
    "ko": {
        "title": "# Beauty/D2C VOC 승인 패킷 (P2 모의 실행)",
        "intro": "승인자는 이 문서에서 원문, 경고, 변경 전후를 함께 확인한다. "
        "결정과 상태는 합성 이벤트 기록을 재생한 결과이며 실제 사람이 승인한 기록이 아니다. "
        "모의 실행 {executions}건, 외부 쓰기 {writes}건, 승인 우회 {bypasses}건.",
        "proposal": "제안", "version": "현재 버전", "hash": "내용 해시",
        "safety": "안전 신호", "state": "최종 상태", "yes": "예", "no": "아니요",
        "evidence_header": "| 근거 | 시장 | 게시 시각 | 경고 | 원문 |",
        "missing": "누락", "scope": "| 구분 | 내용 |",
        "before": "| 변경 전 | 연결된 업무 없음. 이 시뮬레이션은 실제 업무 시스템을 조회하지 않는다. |",
        "after": "| 변경 후 (모의) | {title} · 담당 `{team}` · 우선순위 `{priority}` · 근거 {refs} |",
        "decisions": "결정 기록:", "reason": "사유", "none": "- 결정 없음",
    },
    "en": {
        "title": "# Beauty/D2C VOC approval packets (P2 replay)",
        "intro": "Approvers review source text, warnings, and before and after together in this document. "
        "Decisions and states come from replaying a synthetic event log, not from real people approving anything. "
        "Decision reasons are quoted from the Korean event log. "
        "Mock executions: {executions}; external writes: {writes}; approval bypasses: {bypasses}.",
        "proposal": "Proposal", "version": "current version", "hash": "content hash",
        "safety": "Safety signal", "state": "final state", "yes": "yes", "no": "no",
        "evidence_header": "| Evidence | Market | Published | Warnings | Source text |",
        "missing": "missing", "scope": "| Scope | Content |",
        "before": "| Before | No linked work item. This simulation does not read a real work system. |",
        "after": "| After (mock) | {title} · team `{team}` · priority `{priority}` · evidence {refs} |",
        "decisions": "Decision record:", "reason": "reason", "none": "- No decision",
    },
}


def render_packets(sim: Simulation, evaluation: dict[str, Any], language: str = "ko") -> str:
    labels = PACKET_LABELS[language]
    sections = []
    for request in sim.requests.values():
        proposal = sim.proposals[request["proposal_id"]]
        evidence_rows = "\n".join(
            "| `{id}` | {market} | {published} | {warnings} | {text} |".format(
                id=ref,
                market=sim.records[ref]["market"],
                published=sim.records[ref].get("published_at") or labels["missing"],
                warnings=", ".join(sim.records[ref]["warnings"]) or "-",
                text=html.escape(sim.records[ref]["text_original"]).replace("|", "\\|"),
            )
            for ref in proposal["evidence_refs"]
        )
        work_item = request["work_item"]
        title = WORK_ITEM_TITLES_EN[proposal["topic"]] if language == "en" else work_item["title"]
        decisions = "\n".join(
            f"- `{d['decision']}` · {d['actor']} · `v{d['version']}` · {labels['reason']}: {d['reason'] or '-'}"
            for d in request["decisions"]
        ) or labels["none"]
        after = labels["after"].format(
            title=title,
            team=work_item["team"],
            priority=work_item["priority"],
            refs=", ".join(work_item["evidence_refs"]),
        )
        sections.append(
            f"""## {request['request_id']} · `{proposal['topic']}`

- {labels['proposal']}: `{proposal['proposal_id']}` · {labels['version']} `v{request['version']}` · {labels['hash']} `{request['version_history'][-1]['content_hash']}`
- {labels['safety']}: `{labels['yes'] if proposal['safety_signal'] else labels['no']}` · {labels['state']}: `{request['state']}`

{labels['evidence_header']}
|---|---|---|---|---|
{evidence_rows}

{labels['scope']}
|---|---|
{labels['before']}
{after}

{labels['decisions']}

{decisions}
"""
        )
    intro = labels["intro"].format(
        executions=evaluation["mock_execution_count"],
        writes=evaluation["external_write_count"],
        bypasses=evaluation["approval_bypass_count"],
    )
    return f"{labels['title']}\n\n{intro}\n\n" + "\n".join(sections)


def write_json(path: Path, payload: Any) -> None:
    pipeline.write_json(path, payload)


def run(
    approvers_path: Path = DEFAULT_APPROVERS,
    events_path: Path = DEFAULT_EVENTS,
    expected_path: Path = DEFAULT_EXPECTED,
    output_dir: Path = DEFAULT_OUTPUT,
    english_packets_path: Path | None = None,
) -> dict[str, Any]:
    records = pipeline.process_records(pipeline.read_many(pipeline.DEFAULT_INPUTS))
    proposals = pipeline.build_proposals(records)
    sim = Simulation(
        proposals,
        {record["source_id"]: record for record in records},
        json.loads(approvers_path.read_text(encoding="utf-8")),
    )
    for event in pipeline.read_jsonl(events_path):
        sim.apply(event)
    evaluation = evaluate(sim, pipeline.read_jsonl(expected_path))

    output_dir.mkdir(parents=True, exist_ok=True)
    pipeline.write_jsonl(output_dir / "approval-audit-log.jsonl", sim.audit)
    pipeline.write_jsonl(output_dir / "mock-executions.jsonl", sim.executions)
    write_json(output_dir / "approval-requests.json", list(sim.requests.values()))
    write_json(output_dir / "approval-evaluation.json", evaluation)
    (output_dir / "approval-packets.md").write_text(
        render_packets(sim, evaluation), encoding="utf-8"
    )
    if english_packets_path is None and output_dir.resolve() == DEFAULT_OUTPUT.resolve():
        english_packets_path = EN_PACKETS
    if english_packets_path is not None:
        english_packets_path.parent.mkdir(parents=True, exist_ok=True)
        english_packets_path.write_text(
            render_packets(sim, evaluation, "en"), encoding="utf-8"
        )
    write_json(
        output_dir / "run-manifest.json",
        {
            "schema": "beauty-d2c-voc-approval-manifest-v1",
            "sources": [
                {"path": pipeline.manifest_path(path), "sha256": pipeline.sha256(path)}
                for path in (
                    approvers_path,
                    events_path,
                    expected_path,
                    *pipeline.DEFAULT_INPUTS,
                    CASE_ROOT / "pipeline/run_pipeline.py",
                    Path(__file__).resolve(),
                )
            ],
            "generated_outputs": [
                {
                    "path": pipeline.manifest_path(output_dir / name, output=True),
                    "sha256": pipeline.sha256(output_dir / name),
                }
                for name in GENERATED_OUTPUT_NAMES
            ],
        },
    )
    return {
        "evaluation_passed": evaluation["all_expectations_passed"],
        "scenario_count": evaluation["scenario_count"],
        "event_count": evaluation["event_count"],
        "mock_execution_count": evaluation["mock_execution_count"],
        "approval_bypass_count": evaluation["approval_bypass_count"],
        "external_write_count": evaluation["external_write_count"],
    }


def verify_committed(output_dir: Path = DEFAULT_OUTPUT) -> dict[str, Any]:
    mismatches = []
    with tempfile.TemporaryDirectory(prefix="beauty-voc-approval-") as directory:
        english = Path(directory) / "en/approval-packets.md"
        summary = run(output_dir=Path(directory), english_packets_path=english)
        for name in (*GENERATED_OUTPUT_NAMES, "run-manifest.json"):
            committed = output_dir / name
            regenerated = Path(directory) / name
            if not committed.is_file():
                mismatches.append(f"missing committed output: {name}")
            elif name == "run-manifest.json":
                # Output paths differ between directories; compare hashes only.
                left = json.loads(committed.read_text(encoding="utf-8"))
                right = json.loads(regenerated.read_text(encoding="utf-8"))
                if left["sources"] != right["sources"] or [
                    item["sha256"] for item in left["generated_outputs"]
                ] != [item["sha256"] for item in right["generated_outputs"]]:
                    mismatches.append("committed approval manifest differs")
            elif committed.read_bytes() != regenerated.read_bytes():
                mismatches.append(f"committed output differs: {name}")
        if not EN_PACKETS.is_file() or EN_PACKETS.read_bytes() != english.read_bytes():
            mismatches.append("English approval packets differ")
    if mismatches:
        raise RuntimeError("; ".join(mismatches))
    return {"verified": True, **summary}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--approvers", type=Path, default=DEFAULT_APPROVERS)
    parser.add_argument("--events", type=Path, default=DEFAULT_EVENTS)
    parser.add_argument("--expected", type=Path, default=DEFAULT_EXPECTED)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--verify-committed", action="store_true")
    arguments = parser.parse_args()
    result = (
        verify_committed(arguments.output_dir)
        if arguments.verify_committed
        else run(arguments.approvers, arguments.events, arguments.expected, arguments.output_dir)
    )
    print(json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True))
    sys.exit(0 if result["evaluation_passed"] else 1)
