# DUKADESK OS — Architecture Alignment

**Knowledge Base Version:** 0.1.0  
**Engineering Specification Version:** 0.1.0  
**Last Updated:** 2026-07-12  
**Status:** Active

---

## 1. Knowledge Base Version

This repository aligns with DUKADESK Knowledge Base version **0.1.0**.

## 2. Referenced KB Documents

| KB-ID | Title | Relevance |
|-------|-------|-----------|
| KB-003 | Platform Philosophy | Foundational engineering principles |
| KB-004 | Core Principles | Condensed engineering rules |
| KB-005 | Platform Overview | Platform structure |
| KB-006 | System Architecture | System-level design |
| KB-007 | Service Boundaries | Service decomposition |
| KB-008 | Runtime Overview | Runtime execution environment |
| KB-009 | Manifest Specification | Configuration artifact |
| KB-011–KB-017 | Standards | Engineering conventions |
| KB-022–KB-031 | Builder Studio Architecture | Visual authoring system |
| KB-032–KB-040 | Marketplace Architecture | Extension distribution |
| KB-041–KB-050 | Application Architecture | Application model |
| KB-051–KB-062 | Runtime Architecture | Rendering and execution |
| KB-063–KB-072 | Identity & Access Architecture | Security and identity |
| KB-073–KB-093 | Data Platform Architecture | Data and storage |
| KB-094–KB-106 | Platform Integration Architecture | Integrations and APIs |
| KB-107–KB-140 | Enterprise Platform Services | Platform services |
| KB-141 | Repository Bootstrap | Repository governance standard |

## 3. Referenced ADRs

| ADR | Title | Status |
|-----|-------|--------|
| ADR-001 | Runtime Engine Architecture | Accepted |
| ADR-002 | Data-Driven Screen System | Accepted |
| ADR-003 | Action System Design | Accepted |
| ADR-004 | Event Bus for Cross-Component Communication | Accepted |
| ADR-005 | Branded Splash Screen | Accepted |
| ADR-006 | Knowledge Base Initialization | Accepted |

## 4. Referenced Engineering Specifications

| Specification | Version | Relevance |
|---------------|---------|-----------|
| runtime-engine.md | 0.1.0 | Runtime engine behavior |
| tenant-model.md | 0.1.0 | Tenant and workspace model |
| action-system.md | 0.1.0 | Action and event handling |
| component-system.md | 0.1.0 | Component registry and composition |

## 5. Architectural Constraints

1. This repository is the authoritative source of architectural truth for DUKADESK.
2. Implementation repositories must never become the primary source of architecture.
3. All architecture changes require an ADR or RFC before implementation.
4. Terminology must remain consistent with `GLOSSARY.md`.
5. Standards must be traceable to platform principles.
6. Specifications must be verified against the Knowledge Base before implementation.

## 6. Known Deviations

| Deviation | Rationale | Review Date |
|-----------|-----------|-------------|
| No single `src/` root; knowledge domains use top-level directories | This is a knowledge monorepo, not a code monorepo | 2026-07-12 |
| `PROGRESS_REGISTRY.md` used alongside `PROGRESS.md` | Historical artifact retained for detailed tracking | 2026-07-12 |

## 7. Compliance Notes

This repository is the root governance repository. Compliance with the Repository Bootstrap standard is self-verified through the `repository-bootstrap/` package and CI validation.
