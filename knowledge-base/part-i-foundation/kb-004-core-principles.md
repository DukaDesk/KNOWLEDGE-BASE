# KB-004 — Core Principles

**Part I — Foundation | Core Principles**

| Metadata | Value |
|----------|-------|
| KB-ID | KB-004 |
| Title | Core Principles |
| Version | 0.1.0 |
| Status | Drafting |
| Owner | Engineering |
| Review Status | Not Reviewed |
| Last Updated | 2026-07-09 |
| Depends On | KB-001, KB-003 |
| Required By | All KB documents, all specifications |

## 1. Meta-Principles

These principles govern how the Knowledge Base and engineering process operate. They are defined in KB-001 and reproduced here for reference.

| # | Principle | Meaning |
|---|-----------|---------|
| 1 | **One concept has one definition.** | Every term has a single, authoritative definition in KB-005. No synonyms. No redefinitions. |
| 2 | **Architecture precedes implementation.** | Architecture decisions are made before code is written. Implementation validates architecture; it does not define it. |
| 3 | **Alignment precedes verification.** | A specification must be reviewed against the Knowledge Base before it can be marked Verified. |
| 4 | **Verified specifications precede implementation.** | Code is written from Verified specifications. Implementation that deviates is a defect. |
| 5 | **The Knowledge Base is the product's memory.** | If a conflict exists, it is resolved through the Knowledge Base — not through code or conversation. |

## 2. Platform Design Principles

These principles govern the design of the DUKADESK platform itself.

### 2.1 Server-Driven UI (SDUI) First

The client renders what the server defines. JSON is the source of truth for screen structure, component composition, and action definitions. The client should never hardcode screen layouts or navigation flows.

### 2.2 Data-Driven Actions

All interactive behavior is expressed through the Action System. Components dispatch named actions from their RuntimeNode. Handlers are registered in ActionEngine. This keeps behavior declarative and server-configurable.

### 2.3 Decoupled Components

Components are independent and communicate only through:
- Props (from JSON data via RegistryRenderer)
- EventBus (for cross-component communication)
- Action System (for user-triggered behavior)

Components never import or reference each other directly.

### 2.4 Backend-Compatible Data

JSON data files mirror what a real backend would serve. The mock client can be swapped for an HTTP client without data format changes. No format transformations occur at the client boundary.

### 2.5 Progressive Enhancement

Capabilities are declared in the manifest. Module default screens provide baseline functionality. Tenant-specific screens override module defaults. The client renders whatever combination is provided.

### 2.6 Architecture Consistency over Convenience

When implementation convenience conflicts with architectural consistency, the architecture wins. Patterns (EventBus, Action System, Component Registry) are applied universally, even when a simpler direct solution exists.

### 2.7 Traceability

Every architectural decision has an ADR. The Knowledge Base is the primary source of truth. All implementation repositories reference the Knowledge Base version they align with.

---

**Parent:** KB-001 — README
**See also:** KB-003 — Platform Philosophy, KB-005 — Terminology & Glossary
