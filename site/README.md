# AX Engineer Roadmap Explorer

The bilingual interactive navigation layer for the AX Engineer Roadmap.
The Markdown documents in the repository remain the source of truth; this app
helps readers choose a role, assess organizational readiness, and find the next
material to study or apply.

[Open the production site](https://ax-engineer-roadmap-korea.woogi-dev.chatgpt.site/)

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
npm run lint
```

The production build uses [vinext](https://github.com/cloudflare/vinext) and
Cloudflare Workers through the OpenAI Sites runtime.
