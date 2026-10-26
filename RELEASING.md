# 릴리스 절차

릴리스는 maintainer가 직접 실행한다. 자동 검사가 통과해도 공개 문구가 사실에 맞는지, 한국어·영어 문서가 같은 판단과 범위를 담는지는 사람이 마지막으로 확인한다.

## 1. 준비

1. 작업 트리가 의도한 변경만 포함하는지 확인한다.
2. `package.json`, `package-lock.json`, 한국어·영어 README 버전 문구를 같은 Semantic Version으로 맞춘다.
3. `CHANGELOG.md`와 `en/CHANGELOG.md`의 `Unreleased` 내용을 새 버전과 날짜 아래로 옮긴다.
4. 보안 수정은 영향 범위와 완화 방법을 `SECURITY.md` 기준으로 확인한다.
5. Node.js와 Python 공식 보안 릴리스를 확인하고 `.node-version`, `.python-version`, 기여 문서의 최소 버전을 함께 갱신한다.
6. 정식 릴리스 커밋에서는 README badge·상태의 릴리스 후보 문구를 정식 릴리스로 바꾸고 CHANGELOG compare 링크를 새 tag로 확정한다.
7. `CITATION.cff`의 `version`과 `date-released`를 정식 릴리스 값으로 갱신한다. 릴리스 후보에는 확정된 공개일을 미리 기록하지 않는다.

## 2. 검증

```bash
npm run verify
npm run check:external
git diff --check
```

검증은 내부 링크, 한국어·영어 문서, 사례와 공개 출처 JSON 목록, 버전이 서로 맞는지 확인한다. README 렌더링, Python 재현, npm 감사도 포함한다. 외부 링크의 차단 경고는 사람이 원문을 열어 판단한다.

## 3. 공개

1. 릴리스 커밋을 `main`에 병합한다.
2. `vX.Y.Z` annotated tag를 만들고 push한다.
3. 같은 제목의 GitHub Release를 만들고 변경 기록, 호환성, 알려진 한계를 적는다.
4. GitHub Actions의 `Validate roadmap` 작업이 성공했는지 확인한다.
5. 공개 저장소의 한국어·영어 README에서 버전, 사례 수, 문서 링크를 직접 확인한다.

## 4. 실패와 복구

- 검증 실패: tag를 만들지 않고 원인을 고친다.
- 공개 실패: 이전 릴리스가 유지되는지 확인하고 새 커밋으로 복구한다.
- 잘못된 tag: 아직 공유되지 않았다면 삭제할 수 있지만, 공개된 tag는 되도록 유지하고 수정 버전을 새로 낸다.
- 공개 뒤 심각한 오류: 영향과 임시 완화를 Issue나 Security Advisory에 남기고 patch 릴리스를 준비한다.
