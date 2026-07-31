from __future__ import annotations

import importlib.util
import tempfile
import unittest
from pathlib import Path

CASE_ROOT = Path(__file__).resolve().parents[1]
MODULE_PATH = CASE_ROOT / "pipeline/run_pipeline.py"
SPEC = importlib.util.spec_from_file_location("beauty_voc_pipeline", MODULE_PATH)
assert SPEC and SPEC.loader
pipeline = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(pipeline)


class PipelineTest(unittest.TestCase):
    def test_normalize_text_is_stable_for_case_and_punctuation(self) -> None:
        self.assertEqual(
            pipeline.normalize_text("  Delivery, DELAYED!!  "),
            "delivery delayed",
        )

    def test_invalid_and_duplicate_records_are_not_classified(self) -> None:
        records = pipeline.read_jsonl(pipeline.DEFAULT_INPUT)
        processed = {
            record["source_id"]: record
            for record in pipeline.process_records(records)
        }
        self.assertEqual(processed["voc-002"]["status"], "duplicate")
        self.assertEqual(processed["voc-002"]["duplicate_of"], "voc-001")
        self.assertEqual(processed["voc-005"]["status"], "invalid")
        self.assertIsNone(processed["voc-005"]["topic"])
        self.assertEqual(processed["voc-016"]["status"], "invalid")

    def test_safety_and_missing_fields_enter_review_queue(self) -> None:
        records = pipeline.read_jsonl(pipeline.DEFAULT_INPUT)
        processed = {
            record["source_id"]: record
            for record in pipeline.process_records(records)
        }
        self.assertTrue(processed["voc-003"]["safety_flag"])
        self.assertEqual(processed["voc-003"]["status"], "review_required")
        self.assertIn("missing:product_id", processed["voc-006"]["warnings"])
        self.assertIn("missing:published_at", processed["voc-010"]["warnings"])

    def test_fixture_matches_all_expected_outcomes(self) -> None:
        records = pipeline.read_jsonl(pipeline.DEFAULT_INPUT)
        expected = pipeline.read_jsonl(pipeline.DEFAULT_EXPECTED)
        processed = pipeline.process_records(records)
        evaluation = pipeline.evaluate(processed, expected)
        self.assertTrue(evaluation["all_expectations_passed"])
        self.assertEqual(evaluation["metrics"]["record_exact_match"], 1.0)
        self.assertEqual(evaluation["metrics"]["traceability_rate"], 1.0)

    def test_run_writes_reproducible_result_set(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            output = Path(temporary_directory)
            summary = pipeline.run(
                pipeline.DEFAULT_INPUT,
                pipeline.DEFAULT_EXPECTED,
                output,
            )
            self.assertTrue(summary["evaluation_passed"])
            self.assertEqual(summary["input_count"], 16)
            self.assertTrue((output / "dashboard.html").exists())
            self.assertTrue((output / "run-manifest.json").exists())
            self.assertIn(
                "실행 결과를 원문까지 추적합니다.",
                (output / "dashboard.html").read_text(encoding="utf-8"),
            )


if __name__ == "__main__":
    unittest.main()
