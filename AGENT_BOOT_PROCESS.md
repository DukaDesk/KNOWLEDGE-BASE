# DUKADESK AI Agent Boot Process

**Last Updated:** 2026-07-09

Every AI engineering agent MUST execute this sequence before performing any task.

## Boot Sequence

```
Initialize Workspace
    │
    ▼
Synchronize Knowledge Base
    │
    ▼
Read README
    │
    ▼
Read Progress Registry
    │
    ▼
Read ADR Index
    │
    ▼
Read Core Principles
    │
    ▼
Read Platform Glossary
    │
    ▼
Read Engineering Standards
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

## Required Reading

| Minimum Required | Strongly Recommended |
|------------------|---------------------|
| README | All KB documents |
| CORE_PRINCIPLES.md | |
| GLOSSARY.md | |
| ENGINEERING_STANDARDS.md | |
| AGENT_BOOT_PROCESS.md | |

## Behavioral Rules
1. Read before writing
2. Treat the Knowledge Base as authoritative — it prevails over conversation history or general best practices
3. Do not redefine existing concepts; use GLOSSARY.md as the definitive reference
4. Extend, do not replace existing patterns
5. Flag contradictions — do not silently choose one interpretation
6. Respect ADRs — they are immutable once accepted
7. Cite your sources with specific document names
8. Do not guess — state uncertainty rather than inventing

## Agent Responsibilities

| Agent | Domain |
|-------|--------|
| Architecture Agent | Cross-cutting architecture decisions |
| Mobile Agent | React Native, Expo, renderer, offline, state |
| Backend Agent | Services, APIs, events, queues, persistence |
| Builder Agent | Visual SDUI builder, authoring, publishing |
| Dashboard Agent | Dashboard specifications |
| Website Agent | Website specifications |
| Documentation Agent | Knowledge Base, developer docs |
| Review Agent | Alignment reports, specification verification |

## Task Lifecycle
1. Receive Task → 2. Load Knowledge Base → 3. Identify Relevant Documents → 4. Review Architecture → 5. Review Standards → 6. Implement → 7. Self Review → 8. Architecture Review → 9. Update Documentation → 10. Update Progress Registry → 11. Complete

## Conflict Resolution
When conflicts are discovered: report the conflict, identify affected documents, recommend alignment review, do not silently modify architecture.

## AI Memory Index

| Concept | Document | Specification | ADR | Implementation |
|---------|----------|---------------|-----|----------------|
| Runtime Engine | ARCHITECTURE/overview.md | SPECIFICATIONS/runtime-engine.md | ADR-001 | Mobile — ScreenRenderer |
| Action System | CORE_PRINCIPLES.md | SPECIFICATIONS/action-system.md | ADR-003 | Mobile — ActionEngine |
| Component System | ARCHITECTURE/overview.md | SPECIFICATIONS/component-system.md | ADR-002 | Mobile — ComponentRegistry |
| Event Bus | ARCHITECTURE/overview.md | SPECIFICATIONS/action-system.md | ADR-004 | Mobile — EventBus |
| Tenant Model | ARCHITECTURE/overview.md | SPECIFICATIONS/tenant-model.md | — | Mobile — ManifestResolver |
| Module System | ARCHITECTURE/overview.md | SPECIFICATIONS/tenant-model.md | — | Mobile — ModuleRegistry |
| Manifest | GLOSSARY.md | SPECIFICATIONS/tenant-model.md | — | Mobile — MockClient |
| Capability | GLOSSARY.md | SPECIFICATIONS/tenant-model.md | — | Mobile — Manifest |
| Theme | GLOSSARY.md | SPECIFICATIONS/component-system.md | — | Mobile — BrandThemeProvider |
| Splash Screen | — | — | ADR-005 | Mobile — SplashScreen |
