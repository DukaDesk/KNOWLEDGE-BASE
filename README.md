# DUKADESK Engineering Knowledge Base

**Version:** 0.1.0
**Status:** Active
**Last Updated:** 2026-07-09

## Purpose

This repository is the canonical source of truth for DUKADESK platform architecture, engineering standards, specifications, and decisions. It governs all implementation repositories.

## Repositories Governed

| Repository | Purpose | Status |
|------------|---------|--------|
| `backend` | API services, events, queues, persistence | Active |
| `mobile` | React Native / Expo mobile app | Active |
| `builder` | Visual SDUI builder | Planned |
| `website` | Public website + docs | Planned |
| `business-dashboard` | Business admin dashboard | Planned |
| `tenant-dashboard` | Tenant admin dashboard | Planned |
| `sdk` | Integration SDK | Planned |
| `cli` | CLI tooling | Planned |

## Knowledge Base Structure

```
KNOWLEDGE-BASE/
├── README.md                  ← This file
├── PROGRESS_REGISTRY.md       ← Current platform status
├── GLOSSARY.md                ← Platform terminology
├── CORE_PRINCIPLES.md         ← Design principles
├── NAMING_STANDARDS.md        ← Naming conventions
├── ENGINEERING_STANDARDS.md   ← Engineering process standards
├── AGENT_BOOT_PROCESS.md      ← AI agent initialization protocol
├── ADRs/                      ← Architecture Decision Records
│   ├── ADR-INDEX.md
│   ├── ADR-001-*.md
│   └── ...
├── SPECIFICATIONS/            ← Domain specifications
│   ├── runtime-engine.md
│   ├── tenant-model.md
│   └── ...
├── ARCHITECTURE/              ← Architecture documentation
│   ├── overview.md
│   ├── data-flow.md
│   └── ...
├── STANDARDS/                 ← Engineering conventions
│   ├── code-style.md
│   └── ...
└── GUIDES/                    ← Implementation guides
```

## Usage

Every developer and AI agent MUST read the following before starting work:

1. **README** — this file
2. **PROGRESS_REGISTRY** — current platform status
3. **ADR INDEX** — all decisions made
4. **CORE PRINCIPLES** — design philosophy
5. **GLOSSARY** — terminology
6. **ENGINEERING STANDARDS** — process rules
7. **Target specification** — the relevant domain spec

## Version Tracking

Each governed repository references the Knowledge Base version it aligns with:

```
knowledge-base-version.md:
  Version: 0.1.0
  Verified Commit: <hash>
  Status: Compatible
```

## Updating the Knowledge Base

When architecture changes:
1. Create/update ADR first
2. Update relevant specifications
3. Update glossary if terminology changed
4. Merge to Knowledge Base
5. Only then update implementation repositories

Implementation repositories must NEVER become the primary source of architectural truth.
