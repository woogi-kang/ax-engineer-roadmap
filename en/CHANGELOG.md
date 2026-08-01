# Changelog

This project follows the intent of [Semantic Versioning](https://semver.org/) to record changes to the structure and compatibility of its public content.

## [Unreleased]

## [0.4.0] - 2026-08-01 (release candidate)

### Added

- A public AX catalog covering 10 Korean and 15 international cases, plus an application map for all 25
- Simulation cases for public petitions, credit and underwriting, equipment anomalies, care records, and regulated evidence documents
- An `industry` metadata axis for cross-industry, retail, public sector, finance, manufacturing, healthcare and social care, and legal and life-science contexts
- A JSON registry for all 25 public cases with source provenance, deployment stage, outcome verification, source URLs, and internal-case links
- `SECURITY.md`, `SUPPORT.md`, `CITATION.cff`, CODEOWNERS, a bug form, Dependabot, and CodeQL
- A case-industry filter with URL state and case metadata for industry, difficulty, risk, and evidence stage
- Weekly external-link health checks and one-command fresh-clone validation (`npm run verify`)

### Changed

- Expanded applied cases from 10 to 15 and synchronized the README, English edition, and interactive roadmap
- Connected the 10 existing practices to relevant public-case design questions and control patterns
- Aligned the Korean README and interactive roadmap around one AX definition, case-title set, and editorial voice
- Added a copy-sync check for the shared definition and 15 case titles
- Linked each Korean case's evidence stage to a standard evidence section and added validation for those links
- Added a GFM rendering check for unresolved emphasis, links, and images in the root README
- Generated site case data from the `case.json` files and added a drift check
- Separated current execution from the designed target for write impact, autonomy, and P1–P5 stages
- Separated generated outputs from presentation assets in the Beauty/D2C manifest and added clean-run byte verification
- Gated Pages deployment on documentation, case, Python, and site validation
- Patched the Next.js, React, Vite, Cloudflare, and Wrangler dependency set and reduced the npm audit result to zero

### Security

- Pinned GitHub Actions to full commit SHAs and added pull-request dependency review
- Documented private vulnerability reporting and a good-faith security research policy

## [0.3.0] - 2026-07-31

### Added

- A case catalog with a machine-validated `case.json` metadata contract
- Cases for files and CSV to AX Hub, Slack meetings to actions, centralized Mail Assist, and a shared agent operating layer
- An applied AX case group in the interactive roadmap
- A synthetic Beauty/D2C VOC data contract, normalization and classification pipeline, regression evaluation, runbook, and result dashboard

### Changed

- Unified the primary repository and site name as `AX Engineer Roadmap`
- Clarified the scope as a universal AX core with Korean organizational conditions
- Made AX Engineers the primary readers and reframed the other groups as collaborators
- Replaced internal shorthand in the Korean edition with terms used in day-to-day work
- Aligned the Korean and English entry paths, eight-stage structure, projects, and interactive site
- Reduced the mobile hero, kept a GitHub link visible, added a primary start action, and made roadmap groups collapsible
- Synchronized role, readiness, and search filters with the URL for sharing
- Reordered the README around the role definition, quick start, applied cases, roadmap structure, and hiring signals
- Reclassified electronic tax invoice reconciliation under finance and procurement
- Removed four unused banner candidates and their generation prompts

## [0.2.0] - 2026-07-26

### Added

- Starting-point diagnosis by role and organization readiness
- AX Engineer execution guidance and collaboration guides for business practitioners, leaders, and data, security, and operations owners
- Technical foundations for software and APIs, LLMs, agents, tools and MCP, evaluation, operations, and security
- Five practice projects from safe assistance through reuse in a second workflow
- Review of roadmap.sh and the AI Agents roadmap, its AX gaps, and Korean adoption conditions
- Korean and English interactive roadmap

### Changed

- Expanded the developer-oriented entry path into a multi-role structure
- Required real reuse in a second workflow before defining a shared harness
- Reframed contribution nodes around decisions, practice, and evidence

## [0.1.0] - 2026-07-23

### Added

- Role model and responsibility boundaries for internal AX Engineers
- Competency map across eight areas
- Four proficiency levels based on deployment responsibility
- Eight-stage workflow transformation lifecycle
- Five-level organizational AX maturity model
- Twelve-week practice path with organization and public-simulation tracks
- De-identified Beauty/D2C VOC case
- Templates for workflow discovery, prioritization, execution, experiments, and evidence
- Role review and source policy based on public job and practitioner materials
- Public contribution rules and GitHub issue and pull-request templates
- Complete English edition of the roadmap, lifecycle, maturity model, practice path, case, and toolkit

[Unreleased]: https://github.com/woogi-kang/ax-engineer-roadmap/compare/v0.3.0...HEAD
[0.4.0]: https://github.com/woogi-kang/ax-engineer-roadmap/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/woogi-kang/ax-engineer-roadmap/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/woogi-kang/ax-engineer-roadmap/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/woogi-kang/ax-engineer-roadmap/releases/tag/v0.1.0
