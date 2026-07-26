# AX Engineer Roadmap Explorer

This is the bilingual interactive guide for the AX Engineer Roadmap.
It covers reusable AX engineering practices and the approval, authority,
regulation, and digital-readiness conditions often encountered in Korean
organizations. The Markdown documents remain the authoritative version; this
app helps AX Engineers and their collaborators find the relevant material.

[Open the production site](https://woogi-kang.github.io/ax-engineer-roadmap/)

## Prerequisites

- Node.js `>=22.13.0`

## Quick start

```bash
npm install
npm run dev
```

## Product behavior

- Korean and English views
- role and readiness filters
- full-text search across roadmap nodes
- direct links to the corresponding source documents
- keyboard-visible focus and reduced-motion support
- responsive layouts for desktop and mobile

## Validation

```bash
npm test
npm run test:pages
npm run lint
```

## Deployment

The primary deployment is a static export hosted on GitHub Pages:

```bash
npm run build:pages
```

The output is written to `out/`. Pushes to `main` deploy it through
`.github/workflows/deploy-pages.yml`.

The existing [vinext](https://github.com/cloudflare/vinext) build remains
available for the OpenAI Sites runtime.
