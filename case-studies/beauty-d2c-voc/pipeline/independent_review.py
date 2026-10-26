#!/usr/bin/env python3
"""P1 independent review kit for the Beauty/D2C VOC case study.

The reviewer, not the implementer, prepares new inputs and expected labels.
`prepare` freezes the pipeline version and keeps the first result; `rerun`
records later attempts next to it; `score` turns the reviewer's filled record
into a pass, fail, or incomplete result. The kit never fills in a verdict.
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

CASE_ROOT = Path(__file__).resolve().parents[1]
VERDICTS = {"pass", "fail"}


def load_pipeline() -> Any:
    spec = importlib.util.spec_from_file_location(
        "beauty_voc_pipeline", CASE_ROOT / "pipeline/run_pipeline.py"
    )
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


pipeline = load_pipeline()


def development_overlap(records: list[dict[str, Any]]) -> list[str]:
    development = pipeline.read_many(pipeline.DEFAULT_INPUTS)
    ids = {record.get("source_id") for record in development}
    texts = {pipeline.normalize_text(record.get("text_original") or "") for record in development}
    texts.discard("")
    overlaps = []
    for record in records:
        if record.get("source_id") in ids:
            overlaps.append(f"{record.get('source_id')}: development source_id")
        elif pipeline.normalize_text(record.get("text_original") or "") in texts:
            overlaps.append(f"{record.get('source_id')}: development text")
    return overlaps


def run_once(input_path: Path, expected_path: Path, output_dir: Path) -> dict[str, Any]:
    records = pipeline.read_jsonl(input_path)
    processed = pipeline.process_records(records)
    evaluation = pipeline.evaluate(processed, pipeline.read_jsonl(expected_path))
    output_dir.mkdir(parents=True)
    pipeline.write_jsonl(output_dir / "classified-records.jsonl", processed)
    pipeline.write_json(output_dir / "evaluation.json", evaluation)
    pipeline.write_json(
        output_dir / "frozen-versions.json",
        {
            "run_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
            "classifier": pipeline.CLASSIFIER_VERSION,
            "pipeline_sha256": pipeline.sha256(CASE_ROOT / "pipeline/run_pipeline.py"),
            "input_sha256": pipeline.sha256(input_path),
            "expected_sha256": pipeline.sha256(expected_path),
        },
    )
    return {"processed": processed, "evaluation": evaluation}


def render_sheet(processed: list[dict[str, Any]], expected: list[dict[str, Any]]) -> str:
    expected_by_id = {item["source_id"]: item for item in expected}
    rows = []
    for record in processed:
        expectation = expected_by_id.get(record["source_id"], {})
        text = (record.get("text_original") or "").replace("|", "\\|")
        rows.append(
            f"| `{record['source_id']}` | {text} | `{record['status']}` · `{record.get('topic')}` · "
            f"안전 `{record['safety_flag']}` | {', '.join(record['warnings'] + record['validation_errors']) or '-'} | "
            f"`{expectation.get('expected_status')}` · `{expectation.get('expected_topic')}` · "
            f"안전 `{expectation.get('expected_safety_flag')}` |"
        )
    return (
        "# P1 독립 검수표\n\n"
        "원문과 시스템 결과를 비교하고 `review-record.json`의 `verdicts`에 레코드별 `pass` 또는 `fail`과 이유를 적는다. "
        "기대값은 검토자가 실행 전에 적은 값이다. 구현자의 설명 없이 판정한다.\n\n"
        "| ID | 원문 | 시스템 결과 | 경고·오류 | 검토자 기대값 |\n|---|---|---|---|---|\n"
        + "\n".join(rows)
        + "\n"
    )


def prepare(input_path: Path, expected_path: Path, round_dir: Path) -> dict[str, Any]:
    if round_dir.exists():
        raise SystemExit(f"{round_dir} already exists; the first result is never overwritten.")
    records = pipeline.read_jsonl(input_path)
    overlaps = development_overlap(records)
    if overlaps:
        raise SystemExit("Inputs reuse the development set: " + "; ".join(overlaps))
    expected = pipeline.read_jsonl(expected_path)
    result = run_once(input_path, expected_path, round_dir / "first-run")
    (round_dir / "review-sheet.md").write_text(
        render_sheet(result["processed"], expected), encoding="utf-8"
    )
    pipeline.write_json(
        round_dir / "review-record.json",
        {
            "reviewer": {
                "name": "",
                "role": "",
                "involved_in_implementation": None,
                "prepared_inputs": None,
                "expected_labels_fixed_before_run": None,
            },
            "verdicts": {
                record["source_id"]: {"verdict": None, "reason": ""}
                for record in result["processed"]
            },
            "overall": {"verdict": None, "limitations": ""},
        },
    )
    return {
        "round_dir": str(round_dir),
        "records": len(records),
        "first_run_passed": result["evaluation"]["all_expectations_passed"],
    }


def rerun(input_path: Path, expected_path: Path, round_dir: Path) -> dict[str, Any]:
    first = json.loads((round_dir / "first-run/evaluation.json").read_text(encoding="utf-8"))
    attempt = 1 + sum(1 for path in round_dir.glob("rerun-*") if path.is_dir())
    result = run_once(input_path, expected_path, round_dir / f"rerun-{attempt}")
    before = {row["source_id"]: row["passed"] for row in first["rows"]}
    changed = [
        {"source_id": row["source_id"], "first_run": before.get(row["source_id"]), "rerun": row["passed"]}
        for row in result["evaluation"]["rows"]
        if before.get(row["source_id"]) != row["passed"]
    ]
    pipeline.write_json(round_dir / f"rerun-{attempt}/changes-from-first-run.json", changed)
    return {"attempt": attempt, "changed": changed}


def score(round_dir: Path) -> dict[str, Any]:
    record = json.loads((round_dir / "review-record.json").read_text(encoding="utf-8"))
    reviewer = record["reviewer"]
    problems = []
    if not reviewer.get("name", "").strip() or not reviewer.get("role", "").strip():
        problems.append("reviewer name and role are required")
    if reviewer.get("involved_in_implementation") is not False:
        problems.append("reviewer must not have been involved in implementation")
    if reviewer.get("prepared_inputs") is not True:
        problems.append("reviewer must prepare the inputs")
    if reviewer.get("expected_labels_fixed_before_run") is not True:
        problems.append("expected labels must be fixed before the first run")
    for source_id, item in record["verdicts"].items():
        if item.get("verdict") not in VERDICTS:
            problems.append(f"{source_id}: verdict missing")
        elif item["verdict"] == "fail" and not item.get("reason", "").strip():
            problems.append(f"{source_id}: failure reason missing")
    if record["overall"].get("verdict") not in VERDICTS:
        problems.append("overall verdict missing")

    verdicts = [item.get("verdict") for item in record["verdicts"].values()]
    result = {
        "status": "incomplete" if problems else (
            "passed" if record["overall"]["verdict"] == "pass" else "failed"
        ),
        "problems": problems,
        "records": len(verdicts),
        "record_passes": verdicts.count("pass"),
        "record_failures": verdicts.count("fail"),
        "reviewer_role": reviewer.get("role"),
        "limitations": record["overall"].get("limitations", ""),
    }
    pipeline.write_json(round_dir / "review-result.json", result)
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    for name in ("prepare", "rerun"):
        command = commands.add_parser(name)
        command.add_argument("--input", type=Path, required=True)
        command.add_argument("--expected", type=Path, required=True)
        command.add_argument("--round-dir", type=Path, required=True)
    commands.add_parser("score").add_argument("--round-dir", type=Path, required=True)
    arguments = parser.parse_args()
    if arguments.command == "prepare":
        output = prepare(arguments.input, arguments.expected, arguments.round_dir)
    elif arguments.command == "rerun":
        output = rerun(arguments.input, arguments.expected, arguments.round_dir)
    else:
        output = score(arguments.round_dir)
    print(json.dumps(output, ensure_ascii=False, indent=2, sort_keys=True))
    sys.exit(0 if output.get("status", "passed") != "incomplete" else 2)
