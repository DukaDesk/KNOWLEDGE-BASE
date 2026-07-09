# KB-021 — AI Context Guide

**Part IV — Governance | AI Context Guide**

| Metadata | Value |
|----------|-------|
| KB-ID | KB-021 |
| Title | AI Context Guide |
| Version | 0.1.0 |
| Status | Drafting |
| Owner | Engineering |
| Review Status | Not Reviewed |
| Last Updated | 2026-07-09 |
| Depends On | KB-001, KB-017, KB-018, KB-019 |
| Required By | All AI agents working on DUKADESK |

## 1. Purpose

This document defines how AI assistants operate within the DUKADESK engineering workflow. Every AI agent must comply with these guidelines before generating any output.

## 2. AI Boot Sequence

Every AI agent MUST execute this sequence before performing any task. Skipping any step is a process violation.

```
Initialize Workspace
    │
    ▼
Synchronize Knowledge Base
    │
    ▼
Read README (KB-001)
    │
    ▼
Read Progress Registry (KB-020)
    │
    ▼
Read ADR Index
    │
    ▼
Read Core Principles (KB-004)
    │
    ▼
Read Platform Glossary (KB-005)
    │
    ▼
Read Engineering Standards (KB-011–KB-017)
    │
    ▼
Read Target Specification
    │
    ▼
Determine Requested Task
    │
    ▼
Perform Task
    │
    ▼
Run Self Review
    │
    ▼
Generate Summary
```

### Workspace Structure

AI agents should expect this repository layout:
```
DUKADESK OS/
├── README.md                  ← KB-001
├── knowledge-base/            ← Architecture, standards, governance
├── specifications/            ← Domain specifications
├── adr/                       ← Architecture Decision Records
├── project-management/        ← Roadmap, RFCs, planning
└── docs/                      ← Developer documentation
```

## 3. Required Reading

Before generating any output related to DUKADESK, an AI assistant must read:

| Minimum Required | Strongly Recommended |
|------------------|---------------------|
| KB-001 (README) | All KB documents |
| KB-004 (Core Principles) | |
| KB-005 (Glossary) | |
| KB-011–KB-017 (Engineering Standards) | |
| KB-019 (Review & Alignment Process) | |
| KB-021 (AI Context Guide) | |

## 4. Behavioral Rules

1. **Read before writing.** The Knowledge Base must be consulted before generating specifications, code, documentation, or alignment reports.
2. **Treat the Knowledge Base as authoritative.** In any conflict, the Knowledge Base prevails over general best practices or conversation history.
3. **Do not redefine existing concepts.** Use KB-005 as the definitive reference for all terminology.
4. **Extend, do not replace.** When adding new functionality, extend existing patterns rather than replacing them.
5. **Flag contradictions.** If you discover a contradiction, flag it explicitly — do not silently choose one interpretation.
6. **Follow established terminology.** Inconsistent terminology is a source of architectural drift.
7. **Respect ADRs.** Architecture Decision Records are immutable once accepted.
8. **Maintain document status.** Check the status header before referencing or modifying any document.
9. **Cite your sources.** Reference specific KB document numbers and versions.
10. **Do not guess.** If uncertain, state the uncertainty rather than inventing an answer.

## 5. Agent Responsibilities

| Agent | Domain | Primary KB References |
|-------|--------|-----------------------|
| Architecture Agent | Cross-cutting architecture decisions | KB-001, KB-004, KB-006–KB-010, KB-018 |
| Mobile Agent | React Native, Expo, renderer, offline, state | KB-006–KB-010, KB-011–KB-017 |
| Backend Agent | Services, APIs, events, queues, persistence | KB-006–KB-010, KB-011–KB-016 |
| Builder Agent | Visual SDUI builder, authoring, publishing | KB-006–KB-010, KB-011–KB-017 |
| Dashboard Agent | Dashboard specifications | KB-006–KB-010, KB-011–KB-017 |
| Website Agent | Website specifications | KB-006–KB-010, KB-011–KB-017 |
| Documentation Agent | Knowledge Base, developer docs, tutorials | KB-017, KB-021 |
| Review Agent | Alignment reports, specification verification | KB-019 |
| Security Agent | Security standards compliance | KB-016 |
| Naming Agent | Naming convention compliance | KB-005, KB-011 |
| Database Agent | Database schema and migration compliance | KB-011, KB-014 |
| API Agent | API design and contract compliance | KB-011, KB-013 |

## 6. Task Lifecycle

1. **Receive Task** — Understand the goal
2. **Load Knowledge Base** — Re-sync, read relevant docs
3. **Identify Relevant Documents** — Which ADRs, specs, standards apply?
4. **Review Architecture** — Confirm current architecture supports the task
5. **Review Standards** — Confirm approach follows standards
6. **Implement** — Write code
7. **Self Review** — Check against Knowledge Base and standards
8. **Architecture Review** — Report alignment/discrepancies
9. **Update Documentation** — If architecture changed, update Knowledge Base first
10. **Update Progress Registry** — Mark completion
11. **Complete** — Return summary

## 7. Conflict Resolution

When conflicts between the Knowledge Base and implementation are discovered:
1. Report the conflict
2. Identify the affected documents
3. Recommend an alignment review
4. Do not silently modify architecture

## 8. AI Memory Index

| Concept | KB Document | Specification | ADR | Implementation |
|---------|-------------|---------------|-----|----------------|
| Runtime Engine | KB-007 §2 | SPEC-001 | ADR-001 | Mobile — ScreenRenderer |
| Action System | KB-007 §2, KB-004 §2.2 | SPEC-004 | ADR-003 | Mobile — ActionEngine |
| Component System | KB-007 §1 | SPEC-003 | ADR-002 | Mobile — ComponentRegistry |
| Event Bus | KB-007 §4 | SPEC-004 §6 | ADR-004 | Mobile — EventBus |
| Tenant Model | KB-007 §5 | SPEC-002 | — | Mobile — ManifestResolver |
| Module System | KB-007 §3 | SPEC-002 §5 | — | Mobile — ModuleRegistry |
| Manifest | KB-007 §5 | SPEC-002 | — | Mobile — MockClient |
| Capability | KB-005 §1 | SPEC-002 | — | Mobile — Manifest.capabilities |
| Theme | KB-005 §1 | SPEC-003 §6 | — | Mobile — BrandThemeProvider |
| Navigation | KB-007 §5 | SPEC-002 | — | Mobile — TabBar |
| Splash Screen | — | — | ADR-005 | Mobile — SplashScreen |

## 9. Violation Handling

If an AI assistant is found to have generated output that contradicts the Knowledge Base:
1. The violation is documented in KB-020 (Progress Registry).
2. The affected output is flagged for review.
3. The AI assistant's context is corrected with the relevant Knowledge Base references.
4. Repeated or systematic violations may result in exclusion from the engineering workflow.

---

**Parent:** KB-001 — README
**See also:** KB-001 §11 (AI Usage Guidelines), KB-001 §12 (AI Boot Sequence), KB-001 §13 (Review Agents), KB-017 (Documentation Standards), KB-019 (Review & Alignment Process)
