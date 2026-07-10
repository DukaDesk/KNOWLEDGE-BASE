# DUKADESK Engineering Knowledge Base

**Version:** 0.1.0
**Status:** Drafting
**Last Updated:** 2026-07-10

## What This Is

This is the **Engineering Knowledge Base** for the DUKADESK platform.

It is the single source of truth for all architectural decisions, engineering standards, platform conventions, and governance processes across the entire DUKADESK ecosystem.

> **The Knowledge Base is the product's memory.** Specifications describe how the platform is built. Implementations produce the software. If a conflict exists, the conflict is resolved through the Knowledge Base — not through code or conversation.

## Repository Structure

```
KNOWLEDGE-BASE/
├── README.md                     ← This file
├── PROGRESS_REGISTRY.md          ← Current platform status
├── GLOSSARY.md                   ← Platform terminology
├── CORE_PRINCIPLES.md            ← Design principles
├── NAMING_STANDARDS.md           ← Naming conventions
├── ENGINEERING_STANDARDS.md      ← Engineering process standards
├── AGENT_BOOT_PROCESS.md         ← AI agent initialization protocol
├── ADRs/                         ← Architecture Decision Records
│   ├── ADR-INDEX.md
│   ├── ADR-000-template.md
│   ├── ADR-001-runtime-engine-architecture.md
│   └── ...
├── SPECIFICATIONS/               ← Domain specifications
│   ├── runtime-engine.md
│   ├── tenant-model.md
│   └── ...
├── ARCHITECTURE/                 ← Architecture documentation
│   ├── overview.md                ← KB-005 Platform Overview
│   ├── system-architecture.md     ← KB-006 System Architecture
│   ├── service-boundaries.md      ← KB-007 Service Boundaries
│   ├── runtime-overview.md        ← KB-008 Runtime Overview
│   ├── manifest-specification.md  ← KB-009 Manifest Specification
│   ├── capability-system.md       ← KB-010 Capability System
│   ├── component-registry.md      ← KB-012 Component Registry
│   ├── layout-system.md           ← KB-014 Layout System
│   ├── navigation-engine.md       ← KB-016 Navigation Engine
│   ├── state-management.md        ← KB-018 State Management
│   ├── offline-synchronization.md ← KB-020 Offline & Synchronization
│   ├── builder-studio.md          ← KB-022 Builder Studio Architecture
│   ├── desk-builder.md            ← KB-023 Desk Builder
│   ├── screen-layout-builder.md   ← KB-024 Screen & Layout Builder
│   ├── workflow-builder.md        ← KB-025 Workflow Builder
│   ├── form-builder.md            ← KB-026 Form Builder
│   ├── theme-builder.md           ← KB-027 Theme Builder
│   ├── data-model-builder.md      ← KB-028 Data Model Builder
│   ├── preview-runtime.md         ← KB-029 Preview Runtime
│   ├── validation-engine.md       ← KB-030 Validation Engine
│   ├── publishing-pipeline.md     ← KB-031 Publishing Pipeline
│   ├── marketplace-architecture.md ← KB-032 Marketplace Architecture
│   ├── package-artifact-specification.md ← KB-033 Package & Artifact Specification
│   ├── extension-plugin-framework.md ← KB-034 Extension & Plugin Framework
│   └── capability-marketplace.md    ← KB-035 Capability Marketplace
├── STANDARDS/                    ← Engineering conventions
│   ├── code-style.md
│   └── ...
├── GUIDES/                       ← Implementation guides (future)
└── project-management/           ← Roadmap, RFCs, planning artifacts
    ├── roadmap/
    ├── milestones/
    ├── backlog/
    ├── rfc/
    ├── meeting-notes/
    ├── release-plans/
    └── sprint-plans/
```

## Usage

Every developer and AI agent MUST read the following before starting work:

1. **README** — this file
2. **PROGRESS_REGISTRY** — current platform status
3. **ADR INDEX** — all decisions made
4. **CORE_PRINCIPLES** — design philosophy
5. **GLOSSARY** — terminology
6. **ENGINEERING STANDARDS** — process rules
7. **Target specification** — the relevant domain spec
8. **ARCHITECTURE** — system architecture, component registry, and related documents

## Platform Status

| Surface | Status |
|---------|--------|
| Knowledge Base | Drafting |
| Mobile Specification | Implemented |
| Backend Specification | Planned |
| Business Dashboard | Planned |
| Tenant Dashboard | Planned |
| Website | Planned |

## Core Principles

| # | Principle | Meaning |
|---|-----------|---------|
| 1 | **One concept has one definition.** | Every term has a single, authoritative definition. No synonyms. No redefinitions. |
| 2 | **Architecture precedes implementation.** | Architecture decisions are made before code is written. Implementation validates architecture; it does not define it. |
| 3 | **Alignment precedes verification.** | A specification must be reviewed against the Knowledge Base before it can be marked Verified. |
| 4 | **Verified specifications precede implementation.** | Code is written from Verified specifications. Implementation that deviates is a defect. |
| 5 | **The Knowledge Base is the product's memory.** | If a conflict exists, it is resolved through the Knowledge Base — not through code or conversation. |

## Version Tracking

Each governed repository references the Knowledge Base version it aligns with. The Knowledge Base as a whole follows semantic versioning (MAJOR.MINOR.PATCH).

## Updating the Knowledge Base

When architecture changes:
1. Write an RFC or ADR first
2. Update relevant specifications
3. Update glossary if terminology changed
4. Update the Knowledge Base
5. Only then update implementation repositories

Implementation repositories must NEVER become the primary source of architectural truth.
