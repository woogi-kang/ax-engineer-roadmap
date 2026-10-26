from __future__ import annotations

import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

CASE_ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "beauty_voc_review", CASE_ROOT / "pipeline/independent_review.py"
)
assert SPEC and SPEC.loader
review = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(review)

RECORD = {
    "source_id": "voc-901",
    "source_type": "synthetic",
    "source_url": "https://example.invalid/voc/voc-901",
    "captured_at": "2026-08-01T09:00:00+09:00",
    "published_at": "2026-07-30T09:00:00+09:00",
    "market": "KR",
    "channel": "review",
    "product_id": "serum-a",
    "language": "ko",
    "text_original": "뚜껑이 헐거워서 가방 안에서 샜어요.",
}
EXPECTED = {
    "source_id": "voc-901",
    "expected_status": "ready",
    "expected_topic": "packaging",
    "expected_safety_flag": False,
}


class IndependentReviewTest(unittest.TestCase):
    def setUp(self) -> None:
        self.directory = tempfile.TemporaryDirectory()
        root = Path(self.directory.name)
        self.input = root / "input.jsonl"
        self.expected = root / "expected.jsonl"
        self.round = root / "round-1"
        self.input.write_text(json.dumps(RECORD, ensure_ascii=False) + "\n", encoding="utf-8")
        self.expected.write_text(json.dumps(EXPECTED) + "\n", encoding="utf-8")

    def tearDown(self) -> None:
        self.directory.cleanup()

    def test_first_run_is_kept_and_unfilled_record_is_incomplete(self) -> None:
        review.prepare(self.input, self.expected, self.round)
        with self.assertRaises(SystemExit):
            review.prepare(self.input, self.expected, self.round)
        self.assertEqual(review.score(self.round)["status"], "incomplete")
        self.assertEqual(review.rerun(self.input, self.expected, self.round)["changed"], [])
        self.assertTrue((self.round / "first-run/evaluation.json").is_file())

    def test_implementer_cannot_be_the_reviewer(self) -> None:
        review.prepare(self.input, self.expected, self.round)
        record_path = self.round / "review-record.json"
        record = json.loads(record_path.read_text(encoding="utf-8"))
        record["reviewer"] = {
            "name": "reviewer",
            "role": "cs-operator",
            "involved_in_implementation": True,
            "prepared_inputs": True,
            "expected_labels_fixed_before_run": True,
        }
        record["verdicts"]["voc-901"] = {"verdict": "pass", "reason": ""}
        record["overall"]["verdict"] = "pass"
        record_path.write_text(json.dumps(record), encoding="utf-8")
        self.assertEqual(review.score(self.round)["status"], "incomplete")

        record["reviewer"]["involved_in_implementation"] = False
        record_path.write_text(json.dumps(record), encoding="utf-8")
        self.assertEqual(review.score(self.round)["status"], "passed")

    def test_development_inputs_are_refused(self) -> None:
        reused = dict(RECORD, source_id="voc-001")
        self.input.write_text(json.dumps(reused, ensure_ascii=False) + "\n", encoding="utf-8")
        with self.assertRaises(SystemExit):
            review.prepare(self.input, self.expected, self.round)


if __name__ == "__main__":
    unittest.main()
