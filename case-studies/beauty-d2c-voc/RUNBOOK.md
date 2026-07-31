# Beauty/D2C 합성 VOC 파이프라인 runbook

이 실행물은 Python 표준 라이브러리만 사용한다. 외부 API, 모델, 계정, 네트워크 연결이 필요하지 않다.

## 실행

저장소 루트에서 다음 명령을 실행한다.

```bash
python3 case-studies/beauty-d2c-voc/pipeline/run_pipeline.py
```

성공하면 `artifacts/`에 분류 결과, 검토 큐, 업무 제안, 평가 결과, 실행 요약, 대시보드, 입력·출력 해시가 생성된다. 기대 결과가 하나라도 맞지 않으면 프로세스는 종료 코드 `1`을 반환한다.

## 테스트

```bash
python3 -m unittest discover \
  -s case-studies/beauty-d2c-voc/tests \
  -p 'test_*.py' \
  -v
```

## 입력 교체

입력과 기대 결과 파일을 따로 지정할 수 있다.

```bash
python3 case-studies/beauty-d2c-voc/pipeline/run_pipeline.py \
  --input /path/to/voc.jsonl \
  --expected /path/to/expected.jsonl \
  --output-dir /path/to/output
```

운영 입력은 [`voc-record.schema.json`](schemas/voc-record.schema.json)의 필드를 따라야 한다. 평가 fixture에는 거절 경로를 확인하기 위해 스키마를 일부러 어긴 레코드가 포함돼 있다. 현재 구현은 `source_type=synthetic`만 허용한다. 실제 공개 데이터를 연결하려면 먼저 이용 약관, 라이선스, 개인정보, 수집 범위를 확인하고 별도 수집 어댑터를 만들어야 한다.

## 실패와 복구

| 상태 | 처리 | 복구 |
|---|---|---|
| `invalid` | 필수 필드가 비었거나 허용값·시간 형식이 맞지 않으면 분류하지 않는다. | 원본을 고치거나 제외한 뒤 같은 명령을 다시 실행한다. |
| `duplicate` | 시장·상품·채널·정규화문이 같은 첫 레코드만 남긴다. | `duplicate_of`로 보존된 첫 원문을 확인한다. |
| `spam` | 쿠폰·프로필 유도 규칙에 맞으면 분석과 제안에서 제외한다. | 오탐이면 규칙과 기대 결과를 함께 수정하고 회귀 테스트한다. |
| `review_required` | 상품·게시 시각 누락, 혼합 언어, 오래된 데이터, 미분류, 안전 신호를 수동 검토 큐로 보낸다. | 검토자가 원문과 `evidence_ref`를 확인해 보완·보류·제외한다. |
| 평가 실패 | 실제 상태·주제·안전 신호가 기대 결과와 다르면 종료 코드 `1`을 반환한다. | `evaluation.json`에서 실패 레코드를 확인하고 코드 또는 기대 결과 변경 이유를 기록한다. |

같은 입력과 코드로 다시 실행하면 같은 결과가 생성된다. `run-manifest.json`의 SHA-256으로 실행에 사용한 입력·스키마·코드와 결과 파일을 대조할 수 있다.
