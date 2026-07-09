# KB-011 — Naming Standards

**Part III — Engineering Standards | Naming Standards**

| Metadata | Value |
|----------|-------|
| KB-ID | KB-011 |
| Title | Naming Standards |
| Version | 0.1.0 |
| Status | Drafting |
| Owner | Engineering |
| Review Status | Not Reviewed |
| Last Updated | 2026-07-09 |
| Depends On | KB-005 |
| Required By | KB-012, KB-013, all specifications |

## 1. Scope

This document defines naming conventions for all DUKADESK platform artifacts: source code, files, APIs, databases, events, configuration, and services.

## 2. Source Code Naming

### General Conventions
- React components: PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Types: PascalCase
- RuntimeNode `key` field: kebab-case, descriptive (e.g., `category-pills`, `menu-items`)
- RuntimeNode `type` field: snake_case, matches registered component name (e.g., `category_pills`, `menu_grid`)
- Action keys: camelCase (e.g., `addItem`, `selectOrder`)

### Action Types
snake_case (e.g., `add_to_cart`, `switch_screen`, `api_request`, `submit_form`)

### Event Names
Namespaced with colon separator: `{domain}:{action}`
Examples: `navigation:switch_screen`, `filter:changed`, `form:submit`

## 3. File & Directory Naming

| Artifact | Convention | Examples |
|----------|------------|----------|
| KB documents | `kb-{nnn}-{kebab-case-title}.md` | kb-005-terminology-glossary.md |
| Specifications | `spec-{nnn}-{kebab-case-title}.md` | spec-001-runtime-engine.md |
| ADRs | `ADR-{nnn}-{kebab-case-title}.md` | ADR-001-runtime-engine-architecture.md |
| Screen JSON files | `{screenId}-screen.json` | menu-screen.json, orders-screen.json |
| Component files | PascalCase | CategoryPillsSection.tsx, DynamicCard.tsx |
| Store files | camelCase | tenantStore.ts, cartStore.ts |
| Type files | camelCase | types.ts, runtimeContext.ts |
| Utility files | camelCase | image.ts, EventBus.ts |

## 4. API Naming

- Lowercase, forward-slash separated
- Examples: `/orders`, `/notifications/n1/dismiss`, `/bookings`

Screen IDs use lowercase, singular nouns, hyphen-separated: `menu`, `orders`, `notifications`, `checkout`, `products`.

## 5. Event Naming

Event names follow the pattern `{domain}:{action}`:
- `navigation:switch_screen`
- `filter:changed`
- `form:submit`

## 6. Database Naming

*To be defined when the backend data model is specified.*

## 7. Configuration & Environment Naming

*To be defined as the platform expands.*

## 8. Service & Component Naming

Stable IDs follow the pattern `[DOMAIN]-[TYPE]-[NNN]` as defined in KB-017 (Documentation Standards).

## 9. Git Branches

- Feature branches: lowercase, hyphen-separated
- No personal namespaces in branch names
- Examples: `feat/splash-screen`, `fix/action-type`, `docs/knowledge-base`

## 10. Tenant IDs

- kebab-case, matches directory name
- Examples: `mamas-kitchen`, `grace-pharmacy`

---

**Parent:** KB-001 — README
**See also:** KB-005 — Terminology & Glossary, KB-012 — Coding Standards, KB-013 — API Standards, KB-017 — Documentation Standards
