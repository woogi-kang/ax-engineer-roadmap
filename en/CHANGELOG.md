# Changelog

This project follows the intent of [Semantic Versioning](https://semver.org/) to record changes to the structure and compatibility of its public content.

## [Unreleased]

### Added

- Added 12 AX, AI agent, and FDE posting records (J028–J039), bringing the hiring registry to 39, and recorded per-platform access results and held candidates from 2026-10-27
- Added a monthly title-level list of every Korean AX, AI Agent, and FDE posting (October 2026: 138 JobKorea postings), with collection criteria, procedure, and a generator and check script

## [0.4.0] - 2026-10-27

### Added

- Added 15 company/institution workflow cases, bringing the catalog to 16 Korean and 24 international entries, with recheck results, corrections, and access failures for the original 25
- Added 27 bilingual job-posting records with responsibilities, requirements, recruitment signals, publication/check dates, structured data, and status/date validation
- Added the 2026-10-26 evidence refresh record covering collection scope, held material, source access, and limitations
- Entry routes for early-career, software-experienced, and domain-experienced learners with initial deliverables and review gates
- A P3 UI integration checklist and P5 reusable skill card, with failure tests and adopt, hold, and retire criteria
- A standards review list separating proposals, specifications, and product support, with criteria for core-curriculum inclusion
- Role comparisons reviewed on 2026-10-26 and follow-up evidence for public cases K04, K05, and G08
- Claim-level publication, observation, and verification dates, sample, method, access status, limitations, and validation for public cases
- Project and contribution instructions requiring `korean-humanizer` for added or revised Korean content
- A public AX catalog covering 10 Korean and 15 international cases, plus an application map for all 25
- Simulation cases for public petitions, credit and underwriting, equipment anomalies, care records, and regulated evidence documents
- An `industry` metadata axis for cross-industry, retail, public sector, finance, manufacturing, healthcare and social care, and legal and life-science contexts
- A JSON registry for all 25 public cases with source provenance, deployment stage, outcome verification, source URLs, and internal-case links
- `SECURITY.md`, `SUPPORT.md`, `CITATION.cff`, CODEOWNERS, a bug form, Dependabot, and CodeQL
- A case-industry filter with URL state and case metadata for industry, difficulty, risk, and evidence stage
- Weekly external-link health checks and one-command fresh-clone validation (`npm run verify`)

### Changed

- Aligned P1 input boundaries, P4 simulation and P5 entry criteria, and the order of failure tests before production deployment in the final review
- Distinguished partial VOC functionality from full P1 completion and stated the actual scope of its traceability metric
- Corrected IBM's NPS/CSAT conflation, people-versus-usage units in a care case, and planned/pilot/operating classifications, recording follow-up or corrected claims for nine cases
- Restored missing bilingual case controls and review conditions, consolidated repeated guidance, and aligned rules for directly measured and externally reported outcomes
- Updated the MCP baseline to the 2026-07-28 specification with legacy compatibility and long-running task resumption, cancellation, and outcome reconciliation
- Strengthened authority revocation, policy-outage handling, version-change evaluation, repeated trials, and role-specific acceptance in both language editions
- Added total cost per completed workflow, review and rework burden, and scale and stop conditions to experiment and candidate templates
- Retained one published implementation and 14 design documents, distinguishing partial source updates from full reverification
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

### Removed

- Removed the existing web project, site links, and deployment configuration while retaining independent documentation, case, and practice validation

### Security

- Pinned GitHub Actions to full commit SHAs and added pull-request dependency review
- Documented private vulnerability reporting and a good-faith security research policy

## [0.3.0] - 2026-07-31

### Added

- A case catalog with a machine-validated `case.json` metadata contract
- Cases for files and CSV to AX Hub, identifying follow-up actions for approval from Slack meeting records, shared mail assistance across workflows, and a shared agent operations foundation
- Cases for employee access, tax-invoice/payment reconciliation, card expenses, vendor/account changes, and inventory exceptions
- Case metadata distinguishing domains, difficulty, competencies, and prerequisite cases
- An applied AX case group in the interactive roadmap
- A synthetic Beauty/D2C VOC data contract, normalization and classification pipeline, regression evaluation, runbook, and result dashboard

### Changed

- Unified the primary repository and site name as `AX Engineer Roadmap`
- Reworked the README case overview around available workflows, starting conditions, and execution scope
- Expanded applied cases from five to ten and synchronized the site and both language editions
- Clarified the scope as a universal AX core with Korean organizational conditions
- Made AX Engineers the primary readers and reframed the other groups as collaborators
- Replaced internal shorthand in the Korean edition with terms used in day-to-day work
- Aligned the Korean and English entry paths, eight-stage structure, projects, and interactive site
- Renamed the Korean lifecycle to the eight-stage AX workflow transformation and aligned stage names and order
- Configured the interactive roadmap as a static GitHub Pages export and preserved Korean word boundaries on mobile
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
- Competency framework across eight areas
- Four proficiency levels based on deployment responsibility
- Eight-stage workflow transformation lifecycle
- Five-level organizational AX maturity model
- Twelve-week practice path with organization and public-simulation tracks
- De-identified Beauty/D2C VOC case
- Templates for workflow discovery, prioritization, execution, experiments, and evidence
- Role review and source policy based on public job and practitioner materials
- Public contribution rules and GitHub issue and pull-request templates
- Complete English edition of the roadmap, lifecycle, maturity model, practice path, case, and toolkit

[Unreleased]: https://github.com/woogi-kang/ax-engineer-roadmap/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/woogi-kang/ax-engineer-roadmap/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/woogi-kang/ax-engineer-roadmap/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/woogi-kang/ax-engineer-roadmap/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/woogi-kang/ax-engineer-roadmap/releases/tag/v0.1.0
