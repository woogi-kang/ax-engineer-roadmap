# AX Engineer Roadmap Explorer

This is the bilingual interactive guide for the AX Engineer Roadmap.
It covers reusable AX engineering practices and the approval, authority,
regulation, and digital-readiness conditions often encountered in Korean
organizations. The Markdown documents remain the authoritative version; this
app helps AX Engineers and their collaborators find the relevant material.

[Open the production site](https://woogi-kang.github.io/ax-engineer-roadmap/)

## Prerequisites

- Node.js `>=22.23.1`
- Python `>=3.11.15`

## Quick start

```bash
cd site
npm ci
npm run dev
```

From the repository root, `npm run bootstrap` and `npm run dev:site` provide the same setup and start path.

## Product behavior

- Korean and English views
- role and readiness filters, plus an industry filter for the 15 applied cases
- URL-preserved filter state and language switching
- case metadata generated from the 15 authoritative `case.json` files
- explicit navigation to the 25-source public AX catalog
- full-text search across roadmap nodes
- direct links to the corresponding source documents
- keyboard-visible focus and reduced-motion support
- responsive layouts for desktop and mobile

## Validation

```bash
npm run verify
```

Run the command from the repository root. It installs the site dependencies and Playwright Chromium, then verifies the Markdown corpus, case metadata, executable Python evidence, dependency audit, Vinext rendering, browser interactions, accessibility, and the Pages export.

## Deployment

The primary deployment is a static export hosted on GitHub Pages:

```bash
npm run build:pages
```

The output is written to `out/`. The `Validate roadmap` workflow uploads and deploys the Pages artifact only after the repository, Python, security, lint, rendering, and static-export checks pass.

The existing [vinext](https://github.com/cloudflare/vinext) build remains
available for the OpenAI Sites runtime.
