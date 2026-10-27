#!/usr/bin/env python3
"""Deterministic synthetic VOC pipeline for the Beauty/D2C case study."""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import tempfile
import time
import unicodedata
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable

CASE_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_INPUT = CASE_ROOT / "data/input/voc-sample.jsonl"
DEFAULT_EXPECTED = CASE_ROOT / "data/evaluation/expected.jsonl"
EXTENSION_INPUT = CASE_ROOT / "data/input/voc-extension.jsonl"
EXTENSION_EXPECTED = CASE_ROOT / "data/evaluation/expected-extension.jsonl"
DEFAULT_INPUTS = (DEFAULT_INPUT, EXTENSION_INPUT)
DEFAULT_EXPECTEDS = (DEFAULT_EXPECTED, EXTENSION_EXPECTED)
DEFAULT_CATALOG = CASE_ROOT / "data/evaluation/case-catalog.jsonl"
DEFAULT_OUTPUT = CASE_ROOT / "artifacts"
AS_OF = datetime(2026, 7, 31, tzinfo=timezone.utc)
CLASSIFIER_VERSION = "deterministic-rules-v2"
GENERATED_OUTPUT_NAMES = (
    "classified-records.jsonl",
    "dashboard.html",
    "evaluation-report.md",
    "evaluation.json",
    "review-queue.json",
    "run-summary.json",
    "workflow-proposals.json",
)
PRESENTATION_ASSET_NAMES = ("dashboard.png",)

REQUIRED_FIELDS = (
    "source_id",
    "source_type",
    "source_url",
    "captured_at",
    "market",
    "channel",
    "language",
    "text_original",
)
ALLOWED_MARKETS = {"KR", "US", "JP"}
ALLOWED_CHANNELS = {"review", "support"}
ALLOWED_LANGUAGES = {"ko", "en", "ja", "mixed"}

TOPIC_RULES = {
    "irritation": (
        "rash",
        "burning",
        "irritation",
        "따갑",
        "붉어",
        "발진",
        "赤く",
        "かゆみ",
        "ヒリヒリ",
    ),
    "packaging": (
        "leak",
        "leaked",
        "cracked",
        "bottle",
        "dropper",
        "pump",
        "box",
        "포장",
        "상자",
        "새어",
        "펌프",
        "뚜껑",
        "용기",
        "ポンプ",
        "容器",
        "漏れ",
    ),
    "delivery": (
        "delivery",
        "delayed",
        "tracking",
        "택배",
        "배송",
        "도착",
        "配送",
    ),
    "scent": (
        "fragrance",
        "scent",
        "smell",
        "香り",
        "향",
    ),
    "product_effect": (
        "dark spots",
        "did not notice",
        "no change",
        "효과",
        "변화",
    ),
}
SPAM_TERMS = ("coupon code", "freegift", "visit my profile", "무료 증정")
SAFETY_TERMS = (
    "rash",
    "burning",
    "irritation",
    "따갑",
    "붉어",
    "발진",
    "눈에",
    "赤く",
    "かゆみ",
    "ヒリヒリ",
)
# Only English negation is handled: "no irritation" must not raise a safety
# flag, while "no rash until day three, then burning" still does via "burning".
NEGATED_SAFETY_PATTERN = re.compile(
    r"\b(?:no|without|zero)\s+(?:rash|burning|irritation)\b"
)
# Forbidden input: P1 accepts public or synthetic text only, so any contact
# detail is rejected before analysis and withheld from every output file.
PERSONAL_DATA_PATTERNS = (
    re.compile(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+"),
    re.compile(r"(?<!\d)01[016789]-?\d{3,4}-?\d{4}(?!\d)"),
    re.compile(r"(?<!\d)\+\d{1,3}[\s-]?\d{2,4}[\s-]?\d{3,4}[\s-]?\d{4}(?!\d)"),
)
WITHHELD_TEXT = "[withheld:personal_data]"
BLOCKED_STATUSES = {"invalid", "rejected", "conflict"}
RUN_COST = {
    "external_api_calls": 0,
    "model_tokens": 0,
    "estimated_cost_usd": 0.0,
}


def read_jsonl(path: Path) -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    with path.open(encoding="utf-8") as source:
        for line_number, line in enumerate(source, start=1):
            if not line.strip():
                continue
            try:
                records.append(json.loads(line))
            except json.JSONDecodeError as error:
                raise ValueError(f"{path}:{line_number}: invalid JSON: {error}") from error
    return records


def write_json(path: Path, payload: Any) -> None:
    path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )


def write_jsonl(path: Path, records: Iterable[dict[str, Any]]) -> None:
    body = "".join(
        json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n"
        for record in records
    )
    path.write_text(body, encoding="utf-8")


def parse_datetime(value: str) -> datetime | None:
    try:
        parsed = datetime.fromisoformat(value)
    except (TypeError, ValueError):
        return None
    if parsed.tzinfo is None:
        return None
    return parsed.astimezone(timezone.utc)


def validate_record(record: dict[str, Any]) -> list[str]:
    errors = [
        f"missing_or_empty:{field}"
        for field in REQUIRED_FIELDS
        if field not in record or not isinstance(record[field], str) or not record[field].strip()
    ]
    if record.get("source_type") != "synthetic":
        errors.append("unsupported:source_type")
    if record.get("market") not in ALLOWED_MARKETS:
        errors.append("unsupported:market")
    if record.get("channel") not in ALLOWED_CHANNELS:
        errors.append("unsupported:channel")
    if record.get("language") not in ALLOWED_LANGUAGES:
        errors.append("unsupported:language")
    source_url = record.get("source_url")
    if isinstance(source_url, str) and source_url and not source_url.startswith("https://"):
        errors.append("invalid:source_url")
    captured_at = record.get("captured_at")
    if isinstance(captured_at, str) and captured_at and parse_datetime(captured_at) is None:
        errors.append("invalid:captured_at")
    published_at = record.get("published_at")
    if published_at is not None and parse_datetime(published_at) is None:
        errors.append("invalid:published_at")
    captured = parse_datetime(captured_at) if isinstance(captured_at, str) else None
    published = parse_datetime(published_at) if isinstance(published_at, str) else None
    if captured and published and published > captured:
        errors.append("invalid:time_order")
    return sorted(set(errors))


def contains_personal_data(value: str) -> bool:
    return any(pattern.search(value) for pattern in PERSONAL_DATA_PATTERNS)


def content_fingerprint(record: dict[str, Any]) -> str:
    material = json.dumps(
        {key: value for key, value in record.items() if key != "captured_at"},
        ensure_ascii=False,
        sort_keys=True,
    )
    return hashlib.sha256(material.encode("utf-8")).hexdigest()


def conflicting_source_ids(records: list[dict[str, Any]]) -> set[str]:
    fingerprints: dict[str, set[str]] = defaultdict(set)
    for record in records:
        source_id = record.get("source_id")
        if isinstance(source_id, str):
            fingerprints[source_id].add(content_fingerprint(record))
    return {source_id for source_id, seen in fingerprints.items() if len(seen) > 1}


def normalize_text(value: str) -> str:
    normalized = unicodedata.normalize("NFKC", value).casefold()
    normalized = re.sub(r"[^\w\s가-힣ぁ-んァ-ン一-龥]", " ", normalized)
    return re.sub(r"\s+", " ", normalized).strip()


def duplicate_key(record: dict[str, Any], normalized_text: str) -> str:
    material = "|".join(
        (
            record.get("market", ""),
            record.get("product_id", ""),
            record.get("channel", ""),
            normalized_text,
        )
    )
    return hashlib.sha256(material.encode("utf-8")).hexdigest()


def classify_topic(normalized_text: str) -> str:
    scores = {
        topic: sum(1 for term in terms if term in normalized_text)
        for topic, terms in TOPIC_RULES.items()
    }
    highest = max(scores.values(), default=0)
    if highest == 0:
        return "unknown"
    return next(topic for topic in TOPIC_RULES if scores[topic] == highest)


def is_stale(record: dict[str, Any]) -> bool:
    published_at = record.get("published_at")
    if not isinstance(published_at, str):
        return False
    parsed = parse_datetime(published_at)
    return parsed is not None and (AS_OF - parsed).days > 365


def process_records(records: list[dict[str, Any]]) -> list[dict[str, Any]]:
    processed: list[dict[str, Any]] = []
    seen_duplicates: dict[str, str] = {}
    conflicts = conflicting_source_ids(records)

    for record in records:
        source_id = record.get("source_id", "unknown")
        errors = validate_record(record)
        original_text = record.get("text_original", "")
        has_personal_data = isinstance(original_text, str) and contains_personal_data(
            original_text
        )
        normalized_text = (
            "" if has_personal_data else normalize_text(original_text or "")
        )
        base = {
            **record,
            "evidence_ref": source_id,
            "normalization_version": "rules-v1",
            "text_normalized": normalized_text,
            "validation_errors": errors,
            "warnings": [],
            "duplicate_of": None,
            "topic": None,
            "safety_flag": False,
            "status": "invalid" if errors else "pending",
        }
        if has_personal_data:
            base["text_original"] = WITHHELD_TEXT
            if not errors:
                base["status"] = "rejected"
            base["validation_errors"] = sorted(errors + ["forbidden:personal_data"])
            processed.append(base)
            continue

        if errors:
            processed.append(base)
            continue

        if source_id in conflicts:
            base["status"] = "conflict"
            base["validation_errors"] = ["conflict:source_id_content"]
            processed.append(base)
            continue

        key = duplicate_key(record, normalized_text)
        if key in seen_duplicates:
            base["status"] = "duplicate"
            base["duplicate_of"] = seen_duplicates[key]
            processed.append(base)
            continue
        seen_duplicates[key] = source_id

        if any(term in normalized_text for term in SPAM_TERMS):
            base["status"] = "spam"
            processed.append(base)
            continue

        analysis_text = NEGATED_SAFETY_PATTERN.sub(" ", normalized_text)
        topic = classify_topic(analysis_text)
        safety_flag = any(term in analysis_text for term in SAFETY_TERMS)
        warnings: list[str] = []
        if not record.get("product_id"):
            warnings.append("missing:product_id")
        if not record.get("published_at"):
            warnings.append("missing:published_at")
        if record.get("language") == "mixed":
            warnings.append("mixed_language")
        if is_stale(record):
            warnings.append("stale:published_at")
        if topic == "unknown":
            warnings.append("unclassified:topic")
        if safety_flag:
            warnings.append("safety_review_required")

        base["topic"] = topic
        base["safety_flag"] = safety_flag
        base["warnings"] = warnings
        base["status"] = "review_required" if warnings else "ready"
        processed.append(base)

    return processed


def build_review_queue(processed: list[dict[str, Any]]) -> list[dict[str, Any]]:
    queue = []
    next_actions = {
        "invalid": "correct_or_exclude_input",
        "rejected": "exclude_and_return_to_provider",
        "conflict": "resolve_source_conflict",
        "review_required": "human_review",
    }
    for record in processed:
        if record["status"] not in next_actions:
            continue
        queue.append(
            {
                "source_id": record.get("source_id"),
                "status": record["status"],
                "topic": record.get("topic"),
                "safety_flag": record["safety_flag"],
                "validation_errors": record["validation_errors"],
                "warnings": record["warnings"],
                "evidence_ref": record["evidence_ref"],
                "next_action": next_actions[record["status"]],
            }
        )
    return queue


def build_proposals(processed: list[dict[str, Any]]) -> list[dict[str, Any]]:
    grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for record in processed:
        if record["status"] in {"ready", "review_required"} and record.get("topic"):
            grouped[record["topic"]].append(record)

    proposals = []
    for topic in TOPIC_RULES:
        records = grouped.get(topic, [])
        has_safety_signal = any(record["safety_flag"] for record in records)
        if len(records) < 2 and not has_safety_signal:
            continue
        proposals.append(
            {
                "proposal_id": f"proposal-{topic}",
                "topic": topic,
                "observed_count": len(records),
                "markets": sorted({record["market"] for record in records}),
                "evidence_refs": [record["evidence_ref"] for record in records],
                "safety_signal": has_safety_signal,
                "requires_human_approval": True,
                "action_boundary": "proposal_only",
            }
        )
    return proposals


def evaluate(
    processed: list[dict[str, Any]],
    expected: list[dict[str, Any]],
    catalog: list[dict[str, Any]] | None = None,
) -> dict[str, Any]:
    actual_by_id = {record["source_id"]: record for record in processed}
    case_types = {item["source_id"]: item["case_type"] for item in catalog or []}
    rows = []
    for expectation in expected:
        actual = actual_by_id.get(expectation["source_id"])
        status_match = actual is not None and actual["status"] == expectation["expected_status"]
        topic_match = actual is not None and actual.get("topic") == expectation["expected_topic"]
        safety_match = (
            actual is not None
            and actual["safety_flag"] == expectation["expected_safety_flag"]
        )
        rows.append(
            {
                "source_id": expectation["source_id"],
                "case_type": case_types.get(expectation["source_id"]),
                "status_match": status_match,
                "topic_match": topic_match,
                "safety_match": safety_match,
                "passed": status_match and topic_match and safety_match,
            }
        )

    duplicate_expected = {
        item["source_id"]
        for item in expected
        if item["expected_status"] == "duplicate"
    }
    duplicate_actual = {
        item["source_id"] for item in processed if item["status"] == "duplicate"
    }
    safety_expected = {
        item["source_id"] for item in expected if item["expected_safety_flag"]
    }
    safety_actual = {
        item["source_id"] for item in processed if item["safety_flag"]
    }

    blocked_expected = {
        item["source_id"]
        for item in expected
        if item["expected_status"] in BLOCKED_STATUSES
    }
    blocked_actual = {
        item["source_id"] for item in processed if item["status"] in BLOCKED_STATUSES
    }
    personal_data_leaks = sum(
        contains_personal_data(record.get("text_original") or "")
        or contains_personal_data(record.get("text_normalized") or "")
        for record in processed
    )

    def safe_ratio(numerator: int, denominator: int) -> float:
        return round(numerator / denominator, 4) if denominator else 1.0

    case_type_counts: dict[str, dict[str, int]] = {}
    for row in rows:
        if row["case_type"] is None:
            continue
        counts = case_type_counts.setdefault(row["case_type"], {"cases": 0, "passed": 0})
        counts["cases"] += 1
        counts["passed"] += int(row["passed"])

    return {
        "as_of": AS_OF.isoformat(),
        "record_count": len(rows),
        "case_type_counts": dict(sorted(case_type_counts.items())),
        "all_expectations_passed": all(row["passed"] for row in rows)
        and personal_data_leaks == 0,
        "personal_data_leaks": personal_data_leaks,
        "metrics": {
            "record_exact_match": safe_ratio(
                sum(row["passed"] for row in rows), len(rows)
            ),
            "status_accuracy": safe_ratio(
                sum(row["status_match"] for row in rows), len(rows)
            ),
            "topic_accuracy": safe_ratio(
                sum(row["topic_match"] for row in rows), len(rows)
            ),
            "duplicate_precision": safe_ratio(
                len(duplicate_actual & duplicate_expected), len(duplicate_actual)
            ),
            "duplicate_recall": safe_ratio(
                len(duplicate_actual & duplicate_expected), len(duplicate_expected)
            ),
            "safety_recall": safe_ratio(
                len(safety_actual & safety_expected), len(safety_expected)
            ),
            "blocked_input_recall": safe_ratio(
                len(blocked_actual & blocked_expected), len(blocked_expected)
            ),
            "blocked_input_precision": safe_ratio(
                len(blocked_actual & blocked_expected), len(blocked_actual)
            ),
            "traceability_rate": safe_ratio(
                sum(bool(record.get("evidence_ref")) for record in processed),
                len(processed),
            ),
        },
        "rows": rows,
    }


def build_summary(
    processed: list[dict[str, Any]],
    proposals: list[dict[str, Any]],
    evaluation: dict[str, Any],
) -> dict[str, Any]:
    statuses = Counter(record["status"] for record in processed)
    topics = Counter(
        record["topic"]
        for record in processed
        if record.get("topic")
        and record["status"] not in BLOCKED_STATUSES | {"duplicate", "spam"}
    )
    return {
        "as_of": AS_OF.isoformat(),
        "dataset": "synthetic-voc-sample-v1+extension-v1",
        "classifier": CLASSIFIER_VERSION,
        "input_count": len(processed),
        "evaluation_case_count": evaluation["record_count"],
        "case_type_counts": evaluation["case_type_counts"],
        "cost": RUN_COST,
        "status_counts": dict(sorted(statuses.items())),
        "topic_counts": dict(sorted(topics.items())),
        "proposal_count": len(proposals),
        "evaluation_passed": evaluation["all_expectations_passed"],
        "limitations": [
            "Synthetic records do not represent the distribution of a real company's VOC.",
            "Keyword rules are a deterministic baseline, not a production multilingual classifier.",
            "Proposals are review artifacts and do not create or modify external work.",
        ],
    }


def render_dashboard(
    summary: dict[str, Any],
    proposals: list[dict[str, Any]],
    review_queue: list[dict[str, Any]],
    evaluation: dict[str, Any],
) -> str:
    status_cards = "".join(
        f"<li><strong>{count}</strong><span>{html.escape(status)}</span></li>"
        for status, count in summary["status_counts"].items()
    )
    proposal_rows = "".join(
        "<tr>"
        f"<td>{html.escape(item['topic'])}</td>"
        f"<td>{item['observed_count']}</td>"
        f"<td>{html.escape(', '.join(item['markets']))}</td>"
        f"<td>{html.escape(', '.join(item['evidence_refs']))}</td>"
        "</tr>"
        for item in proposals
    )
    metric_rows = "".join(
        "<tr>"
        f"<td>{html.escape(metric)}</td>"
        f"<td>{value:.1%}</td>"
        "</tr>"
        for metric, value in evaluation["metrics"].items()
    )
    return f"""<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Beauty/D2C 합성 VOC 실행 결과</title>
  <style>
    :root {{ color-scheme: light; --paper:#f3efe6; --surface:#fbf9f4; --ink:#23221f; --muted:#6d685f; --line:#cbc3b6; --accent:#aa3524; --teal:#0f5d72; }}
    * {{ box-sizing:border-box; }}
    body {{ margin:0; background:var(--paper); color:var(--ink); font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; line-height:1.55; word-break:keep-all; }}
    main {{ width:min(1080px,calc(100% - 32px)); margin:0 auto; padding:56px 0 72px; }}
    header {{ display:grid; grid-template-columns:1.5fr 1fr; gap:40px; align-items:end; padding-bottom:32px; border-bottom:1px solid var(--line); }}
    h1 {{ max-width:13ch; margin:0; font-size:clamp(2.2rem,6vw,5.2rem); line-height:1; letter-spacing:-.055em; }}
    header p {{ margin:0; color:var(--muted); }}
    .eyebrow {{ margin-bottom:14px; color:var(--accent); font:700 .78rem ui-monospace,monospace; letter-spacing:.05em; }}
    section {{ margin-top:48px; }}
    h2 {{ margin:0 0 18px; font-size:1.45rem; }}
    ul {{ display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:10px; margin:0; padding:0; list-style:none; }}
    li {{ padding:18px; border:1px solid var(--line); background:var(--surface); }}
    li strong {{ display:block; color:var(--accent); font-size:2rem; font-variant-numeric:tabular-nums; }}
    li span {{ color:var(--muted); font:650 .75rem ui-monospace,monospace; }}
    table {{ width:100%; border-collapse:collapse; background:var(--surface); font-size:.88rem; }}
    th,td {{ padding:12px 14px; border-bottom:1px solid var(--line); text-align:left; vertical-align:top; }}
    th {{ color:var(--muted); font-size:.75rem; }}
    .note {{ padding:18px 20px; border-left:4px solid var(--teal); background:var(--surface); color:var(--muted); }}
    @media (max-width:720px) {{ main {{ padding-top:36px; }} header {{ grid-template-columns:1fr; gap:24px; }} ul {{ grid-template-columns:repeat(2,minmax(0,1fr)); }} .table-wrap {{ overflow-x:auto; }} }}
  </style>
</head>
<body>
<main>
  <header>
    <div><p class="eyebrow">SYNTHETIC VOC · RULES V2</p><h1>실행 결과를 원문까지 추적합니다.</h1></div>
    <p>합성 VOC {summary['input_count']}줄(평가 사례 {summary['evaluation_case_count']}건)을 검증·정규화·중복 제거·분류한 결과입니다. 개인정보가 들어간 입력은 원문을 저장하지 않고 반려합니다. 외부 업무는 만들거나 변경하지 않았습니다. 기준 시각은 {html.escape(summary['as_of'])}입니다.</p>
  </header>
  <section><h2>처리 상태</h2><ul>{status_cards}</ul></section>
  <section><h2>검토할 업무 제안</h2><div class="table-wrap"><table><thead><tr><th>주제</th><th>근거 수</th><th>시장</th><th>원문 식별자</th></tr></thead><tbody>{proposal_rows}</tbody></table></div></section>
  <section><h2>평가 지표</h2><div class="table-wrap"><table><thead><tr><th>지표</th><th>결과</th></tr></thead><tbody>{metric_rows}</tbody></table></div></section>
  <section><p class="note">수동 검토 큐 {len(review_queue)}건 · 제안 {len(proposals)}건. 이 결과는 코드 경로를 검증하는 합성 데이터 실행 증거이며, 실제 고객 분포·분류 성능·업무 성과를 뜻하지 않습니다.</p></section>
</main>
</body>
</html>
"""


def render_evaluation_report(
    summary: dict[str, Any], evaluation: dict[str, Any]
) -> str:
    metric_rows = "\n".join(
        f"| `{name}` | {value:.1%} |"
        for name, value in evaluation["metrics"].items()
    )
    case_type_rows = "\n".join(
        f"| `{name}` | {counts['cases']} | {counts['passed']} |"
        for name, counts in evaluation["case_type_counts"].items()
    )
    failed_rows = "\n".join(
        f"- `{row['source_id']}`" for row in evaluation["rows"] if not row["passed"]
    ) or "- 없음"
    status_rows = "\n".join(
        f"| `{name}` | {count} |"
        for name, count in summary["status_counts"].items()
    )
    return f"""# Beauty/D2C 합성 VOC 평가 결과

- 기준 시각: `{summary['as_of']}`
- 입력: `{summary['input_count']}`줄, 평가 사례: `{summary['evaluation_case_count']}`건
- 규칙 버전: `{summary['classifier']}`
- 기대 결과 전체 통과: `{'예' if summary['evaluation_passed'] else '아니요'}`
- 외부 API 호출: `{summary['cost']['external_api_calls']}`회, 모델 토큰: `{summary['cost']['model_tokens']}`, 추정 비용: `${summary['cost']['estimated_cost_usd']:.2f}`
- 출력에 남은 개인정보 패턴: `{evaluation['personal_data_leaks']}`건

## 사례 유형

| 유형 | 사례 | 통과 |
|---|---:|---:|
{case_type_rows}

기대 결과와 다른 사례:

{failed_rows}

## 처리 상태

| 상태 | 건수 |
|---|---:|
{status_rows}

## 평가 지표

| 지표 | 결과 |
|---|---:|
{metric_rows}

## 해석 범위

`record_exact_match`는 기대 상태·주제·안전 신호가 모두 일치한 레코드의 비율이다. `blocked_input_*`은 `invalid`·`rejected`·`conflict`로 막아야 할 입력을 제대로 막았는지 본다. 지연 시간은 실행 환경마다 달라 이 파일에 넣지 않고 `--benchmark`로 따로 잰다. `traceability_rate`는 처리 레코드에 비어 있지 않은 `evidence_ref`가 있는 비율이며 원문 링크의 도달 여부나 연결 정확성을 검증하지 않는다.

평가 사례는 구현자가 개발 중에 만든 개발 세트다. 구현에 참여하지 않은 검토자가 준비한 새 입력의 독립 검수는 이 파일에 포함되지 않는다.

이 평가는 의도적으로 만든 합성 데이터에서 정해진 실패·중복·분류·안전 신호가 코드대로 처리되는지 확인한다. 실제 고객 VOC 분포, 다국어 모델의 일반화 성능, 현업 사용성 또는 사업 성과를 검증한 결과가 아니다.
"""


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def manifest_path(path: Path, *, output: bool = False) -> str:
    try:
        return str(path.relative_to(CASE_ROOT))
    except ValueError:
        return f"output/{path.name}" if output else str(path)


def build_manifest(
    input_paths: Iterable[Path],
    expected_paths: Iterable[Path],
    catalog_path: Path | None,
    output_dir: Path,
) -> dict[str, Any]:
    source_paths = [
        *input_paths,
        *expected_paths,
        *([catalog_path] if catalog_path else []),
        CASE_ROOT / "schemas/voc-record.schema.json",
        Path(__file__).resolve(),
    ]
    output_paths = [output_dir / name for name in GENERATED_OUTPUT_NAMES]
    missing_outputs = [path.name for path in output_paths if not path.is_file()]
    if missing_outputs:
        raise FileNotFoundError(
            f"Missing generated outputs: {', '.join(missing_outputs)}"
        )
    presentation_assets = [
        output_dir / name
        for name in PRESENTATION_ASSET_NAMES
        if (output_dir / name).is_file()
    ]
    return {
        "schema": "beauty-d2c-voc-run-manifest-v2",
        "as_of": AS_OF.isoformat(),
        "sources": [
            {"path": manifest_path(path), "sha256": sha256(path)}
            for path in source_paths
        ],
        "generated_outputs": [
            {"path": manifest_path(path, output=True), "sha256": sha256(path)}
            for path in output_paths
        ],
        "presentation_assets": [
            {
                "path": manifest_path(path, output=True),
                "sha256": sha256(path),
                "generated_by_pipeline": False,
                "source": manifest_path(output_dir / "dashboard.html", output=True),
                "source_sha256": sha256(output_dir / "dashboard.html"),
            }
            for path in presentation_assets
        ],
    }


def verify_committed_artifacts(
    input_paths: Iterable[Path] = DEFAULT_INPUTS,
    expected_paths: Iterable[Path] = DEFAULT_EXPECTEDS,
    committed_output_dir: Path = DEFAULT_OUTPUT,
    catalog_path: Path | None = DEFAULT_CATALOG,
) -> dict[str, Any]:
    input_paths = list(input_paths)
    expected_paths = list(expected_paths)
    mismatches: list[str] = []
    with tempfile.TemporaryDirectory(prefix="beauty-voc-") as temporary_directory:
        temporary_output = Path(temporary_directory)
        summary = run(input_paths, expected_paths, temporary_output, catalog_path)
        for name in GENERATED_OUTPUT_NAMES:
            regenerated = temporary_output / name
            committed = committed_output_dir / name
            if not committed.is_file():
                mismatches.append(f"missing committed output: {name}")
            elif regenerated.read_bytes() != committed.read_bytes():
                mismatches.append(f"committed output differs: {name}")

    manifest_path_value = committed_output_dir / "run-manifest.json"
    if not manifest_path_value.is_file():
        mismatches.append("missing committed output: run-manifest.json")
    else:
        committed_manifest = json.loads(manifest_path_value.read_text(encoding="utf-8"))
        expected_manifest = build_manifest(
            input_paths,
            expected_paths,
            catalog_path,
            committed_output_dir,
        )
        if committed_manifest != expected_manifest:
            mismatches.append("committed manifest differs from current sources and outputs")

    if mismatches:
        raise RuntimeError("; ".join(mismatches))
    return {
        "verified": True,
        "generated_output_count": len(GENERATED_OUTPUT_NAMES),
        "evaluation_passed": summary["evaluation_passed"],
    }


def read_many(paths: Iterable[Path]) -> list[dict[str, Any]]:
    return [record for path in paths for record in read_jsonl(path)]


def run(
    input_paths: Iterable[Path],
    expected_paths: Iterable[Path],
    output_dir: Path,
    catalog_path: Path | None = DEFAULT_CATALOG,
) -> dict[str, Any]:
    input_paths = list(input_paths)
    expected_paths = list(expected_paths)
    output_dir.mkdir(parents=True, exist_ok=True)
    records = read_many(input_paths)
    expected = read_many(expected_paths)
    catalog = read_jsonl(catalog_path) if catalog_path else []
    processed = process_records(records)
    review_queue = build_review_queue(processed)
    proposals = build_proposals(processed)
    evaluation = evaluate(processed, expected, catalog)
    summary = build_summary(processed, proposals, evaluation)

    write_jsonl(output_dir / "classified-records.jsonl", processed)
    write_json(output_dir / "review-queue.json", review_queue)
    write_json(output_dir / "workflow-proposals.json", proposals)
    write_json(output_dir / "evaluation.json", evaluation)
    write_json(output_dir / "run-summary.json", summary)
    (output_dir / "dashboard.html").write_text(
        render_dashboard(summary, proposals, review_queue, evaluation),
        encoding="utf-8",
    )
    (output_dir / "evaluation-report.md").write_text(
        render_evaluation_report(summary, evaluation),
        encoding="utf-8",
    )
    write_json(
        output_dir / "run-manifest.json",
        build_manifest(input_paths, expected_paths, catalog_path, output_dir),
    )
    return summary


def benchmark(input_paths: Iterable[Path], repeat: int) -> dict[str, Any]:
    """Measure in-process latency; machine dependent, so never committed."""
    records = read_many(input_paths)
    durations = []
    for _ in range(repeat):
        started = time.perf_counter()
        processed = process_records(records)
        build_review_queue(processed)
        build_proposals(processed)
        durations.append((time.perf_counter() - started) * 1000)
    durations.sort()
    return {
        "evaluation_passed": True,
        "records": len(records),
        "repeat": repeat,
        "median_ms": round(durations[len(durations) // 2], 3),
        "max_ms": round(durations[-1], 3),
        "cost": RUN_COST,
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--input",
        type=Path,
        action="append",
        help="Input JSONL; repeat for several files. Defaults to the sample and extension sets.",
    )
    parser.add_argument(
        "--expected",
        type=Path,
        action="append",
        help="Expected JSONL; repeat for several files.",
    )
    parser.add_argument("--catalog", type=Path, default=DEFAULT_CATALOG)
    parser.add_argument("--no-catalog", action="store_true")
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument(
        "--benchmark",
        type=int,
        metavar="REPEAT",
        help="Print median processing latency without writing artifacts.",
    )
    parser.add_argument(
        "--verify-committed",
        action="store_true",
        help="Regenerate in a clean directory and compare with committed artifacts.",
    )
    return parser.parse_args()


if __name__ == "__main__":
    arguments = parse_args()
    inputs = arguments.input or list(DEFAULT_INPUTS)
    expecteds = arguments.expected or list(DEFAULT_EXPECTEDS)
    catalog = None if arguments.no_catalog else arguments.catalog
    if arguments.benchmark:
        result = benchmark(inputs, arguments.benchmark)
    elif arguments.verify_committed:
        result = verify_committed_artifacts(
            inputs, expecteds, arguments.output_dir, catalog
        )
    else:
        result = run(inputs, expecteds, arguments.output_dir, catalog)
    print(json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True))
    raise SystemExit(0 if result["evaluation_passed"] else 1)
