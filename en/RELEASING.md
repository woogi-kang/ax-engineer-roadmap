# Release Process

A maintainer performs each release. Green automation does not replace the final human review of public claims and Korean-English scope.

## 1. Prepare

1. Confirm that the worktree contains only intended changes.
2. Set the same Semantic Version in `package.json`, `package-lock.json`, and the Korean and English README version copy.
3. Move the relevant `Unreleased` entries in `CHANGELOG.md` and `en/CHANGELOG.md` under the new version and date.
4. For a security fix, confirm the affected range and mitigation under `SECURITY.md`.
5. Check the official Node.js and Python security releases, then update `.node-version`, `.python-version`, and the contributor prerequisites together.
6. In the final release commit, replace candidate wording in the README badge and status with release wording, then point the changelog comparison at the new tag.
7. Set `version` and `date-released` in `CITATION.cff` to the final release values. Do not predeclare a release date in a candidate.

## 2. Validate

```bash
npm run verify
npm run check:external
git diff --check
```

Validation covers internal links, bilingual mirrors, case and public-source registries, version synchronization, README rendering, Python reproduction, and npm audit. A person opens sources that produced bot-blocking warnings.

## 3. Publish

1. Merge the release commit into `main`.
2. Create and push an annotated `vX.Y.Z` tag.
3. Create a matching GitHub Release with changes, compatibility, and known limits.
4. Confirm that the `Validate roadmap` workflow succeeds.
5. Open the Korean and English READMEs in the public repository and verify the version, case count, and document links.

## 4. Failure and recovery

- Validation failure: do not create a tag; fix the cause.
- Publication failure: confirm the prior release remains available, then repair with a new commit.
- Incorrect tag: a tag not yet shared may be deleted, but preserve a public tag when possible and issue a corrected release.
- Serious post-release error: record impact and temporary mitigation in an issue or Security Advisory and prepare a patch release.
