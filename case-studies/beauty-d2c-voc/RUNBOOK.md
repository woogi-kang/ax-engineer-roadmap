# Beauty/D2C 합성 VOC 파이프라인 runbook

이 시뮬레이션 코드는 Python 표준 라이브러리만 사용한다. 외부 API, 모델, 계정이나 네트워크가 필요하지 않다.

## 실행

저장소 루트에서 다음 명령을 실행한다.

```bash
python3 case-studies/beauty-d2c-voc/pipeline/run_pipeline.py
```

기본 입력은 기존 [`voc-sample.jsonl`](data/input/voc-sample.jsonl)과 추가 개발 세트 [`voc-extension.jsonl`](data/input/voc-extension.jsonl)이다. 성공하면 `artifacts/`에 분류 결과, 검토 큐, 업무 제안, 평가 결과, 실행 요약, 대시보드, 입력·출력 해시가 생성된다. 기대 결과가 하나라도 맞지 않으면 프로세스는 종료 코드 `1`을 반환한다.

커밋된 산출물이 깨끗한 임시 디렉터리에서 재생성한 결과와 같은지 확인하려면 다음 명령을 사용한다.

```bash
python3 case-studies/beauty-d2c-voc/pipeline/run_pipeline.py --verify-committed
```

처리 지연 시간은 실행 환경마다 달라 산출물에 넣지 않는다. 같은 입력의 중앙값과 최댓값은 다음 명령으로 출력만 한다.

```bash
python3 case-studies/beauty-d2c-voc/pipeline/run_pipeline.py --benchmark 50
```

## P2 승인 모의 실행

```bash
python3 case-studies/beauty-d2c-voc/pipeline/approval_workflow.py
python3 case-studies/beauty-d2c-voc/pipeline/approval_workflow.py --verify-committed
```

P1 제안을 다시 만든 뒤 [`approvers.json`](data/approval/approvers.json)의 승인자 권한과 [`events.jsonl`](data/approval/events.jsonl)의 이벤트를 순서대로 적용한다. 결과는 `artifacts/approval/`에 감사 기록, 요청별 최종 상태, 모의 실행 기록, 승인 패킷, 평가 결과로 남는다. 이벤트 결과가 [`expected-outcomes.jsonl`](data/approval/expected-outcomes.jsonl)과 다르거나 승인 우회가 한 건이라도 있으면 종료 코드 `1`을 반환한다.

| 차단 사유 | 뜻 | 복구 |
|---|---|---|
| `topic_out_of_scope`, `safety_role_required` | 승인자에게 해당 주제나 안전 검토 권한이 없다. | 권한이 있는 승인자에게 다시 요청한다. |
| `approver_revoked` | 승인한 사람의 권한이 실행 전에 회수됐다. 요청은 `on_hold`가 된다. | 권한이 있는 다른 승인자가 현재 버전을 다시 승인한다. |
| `stale_version`, `prior_approval_invalidated` | 승인 대상과 현재 제안 버전이 다르다. | 바뀐 근거를 확인하고 새 버전으로 결정한다. |
| `request_expired`, `approval_expired` | 승인 요청 72시간 또는 승인 48시간이 지났다. | 제안을 다시 제출한다. |
| `duplicate_execution`, `already_executed` | 같은 멱등 키나 이미 실행된 요청이다. | 감사 기록의 `first_execution_id`로 첫 실행을 확인한다. |
| `reason_required` | 거절·수정 후 승인·추가 정보 요청에 사유가 없다. | 사유를 적어 다시 결정한다. |

결정·검토 시간은 상태 전이를 시험하려고 만든 합성 값이다. 실제 승인자의 판단이나 승인 부담을 나타내지 않는다.

## 테스트

```bash
python3 -m unittest discover \
  -s case-studies/beauty-d2c-voc/tests \
  -p 'test_*.py' \
  -v
```

이 검사는 기존 16건 단독 회귀, 32건 평가 세트, 산출물 재현, 승인 상태 전이, 독립 검수 키트를 확인한다. 32건은 구현자가 만든 개발 세트이므로 새 입력의 독립 검수를 대신하지 않는다.

## P1 독립 검수

P1은 구현에 참여하지 않은 검토자가 개발에 쓰지 않은 입력을 준비하고 결과를 판정해야 통과한다. 키트는 이 절차를 기록할 뿐 판정을 대신 채우지 않는다.

1. 검토자가 정상·경계·실패를 섞은 새 합성 입력과 기대 결과를 각각 JSONL로 만든다. 출처가 충돌하거나 정보가 부족한 입력도 넣는다. 기대 결과는 실행 전에 확정한다.
2. 첫 실행을 고정한다. 개발 세트의 `source_id`나 같은 문장을 다시 쓰면 실행을 거부한다.

   ```bash
   python3 case-studies/beauty-d2c-voc/pipeline/independent_review.py prepare \
     --input /path/to/reviewer-input.jsonl \
     --expected /path/to/reviewer-expected.jsonl \
     --round-dir /path/to/review-round-1
   ```

3. 검토자는 `review-sheet.md`에서 원문과 시스템 결과를 비교하고 `review-record.json`에 레코드별 `pass`·`fail`과 이유, 전체 판정, 한계를 적는다. 검토자의 이름·역할, 구현 참여 여부, 입력 직접 준비 여부, 기대 결과를 실행 전에 확정했는지도 적는다.
4. 판정을 집계한다. 빈 칸이 있거나 검토자가 구현에 참여했다면 `incomplete`로 끝나고 종료 코드 `2`를 반환한다.

   ```bash
   python3 case-studies/beauty-d2c-voc/pipeline/independent_review.py score \
     --round-dir /path/to/review-round-1
   ```

5. 실패를 고친 뒤에는 `rerun`으로 같은 입력을 다시 실행한다. `first-run/`은 덮어쓰지 않고 `rerun-N/`과 첫 결과 대비 변경 목록을 따로 남긴다. 같은 실패 유형의 새 입력도 다음 회차에 추가한다.

검수 기록을 공개할 때는 검토자 동의를 받고, 이름 대신 역할만 남겨도 된다. 저장소에는 아직 독립 검수 기록이 없다.

## 입력 교체

입력과 기대 결과 파일을 따로 지정할 수 있다.

```bash
python3 case-studies/beauty-d2c-voc/pipeline/run_pipeline.py \
  --input /path/to/voc.jsonl \
  --expected /path/to/expected.jsonl \
  --output-dir /path/to/output
```

입력과 기대 결과는 `--input`, `--expected`를 여러 번 지정할 수 있다. 사례 구분 파일이 없으면 `--no-catalog`를 붙인다. 교체할 합성 입력은 [`voc-record.schema.json`](schemas/voc-record.schema.json)의 필드를 따라야 한다. 평가 fixture에는 거절 경로를 확인하기 위해 스키마를 일부러 어긴 레코드가 포함돼 있다. 현재 구현은 `source_type=synthetic`만 허용한다. 실제 공개 데이터를 연결하려면 먼저 이용 약관, 라이선스, 개인정보, 수집 범위를 확인하고 별도 수집 어댑터를 만들어야 한다.

## 실패와 복구

| 상태 | 처리 | 복구 |
|---|---|---|
| `invalid` | 필수 필드가 비었거나 허용값·시간 형식이 맞지 않거나 게시 시각이 수집 시각보다 늦으면 분류하지 않는다. | 원본을 고치거나 제외한 뒤 같은 명령을 다시 실행한다. |
| `rejected` | 원문에 이메일이나 전화번호가 있으면 분석하지 않고 출력에서 원문을 `[withheld:personal_data]`로 바꾼다. | 입력 제공자에게 반려하고 개인정보를 뺀 원문을 다시 받는다. |
| `conflict` | 같은 `source_id`에 내용이 다른 레코드가 있으면 모두 분석에서 뺀다. | 원본 시스템에서 어느 내용이 맞는지 확인한 뒤 한 레코드만 남긴다. |
| `duplicate` | 시장·상품·채널·정규화문이 같은 첫 레코드만 남긴다. | `duplicate_of`로 보존된 첫 원문을 확인한다. |
| `spam` | 쿠폰·프로필 유도 규칙에 맞으면 분석과 제안에서 제외한다. | 오탐이면 규칙과 기대 결과를 함께 수정하고 회귀 테스트한다. |
| `review_required` | 상품·게시 시각 누락, 혼합 언어, 오래된 데이터, 미분류, 안전 신호를 수동 검토 큐로 보낸다. | 검토자가 원문과 `evidence_ref`를 확인해 보완·보류·제외한다. |
| 평가 실패 | 실제 상태·주제·안전 신호가 기대 결과와 다르면 종료 코드 `1`을 반환한다. | `evaluation.json`에서 실패 레코드를 확인하고 코드 또는 기대 결과 변경 이유를 기록한다. |

같은 입력과 코드로 다시 실행하면 같은 결과가 생성된다. `run-manifest.json`은 P1 코드가 만든 일곱 파일을 `generated_outputs`에 고정해 기록하고, 수동으로 캡처한 `dashboard.png`는 `presentation_assets`로 분리한다. `--verify-committed`는 깨끗한 임시 디렉터리의 일곱 파일을 byte 단위로 비교하고 입력·스키마·코드·결과 SHA-256도 다시 확인한다. PNG는 기록된 해시와 원본 참조를 확인하며 이미지를 새로 렌더링해 비교하지는 않는다. `artifacts/approval/run-manifest.json`은 승인 모의 실행의 입력·코드·결과 해시를 따로 기록한다.
