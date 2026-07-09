# KB-020 — Progress Registry

**Part IV — Governance | Progress Registry**

| Metadata | Value |
|----------|-------|
| KB-ID | KB-020 |
| Title | Progress Registry |
| Version | 0.1.0 |
| Status | Drafting |
| Owner | Engineering |
| Review Status | Not Reviewed |
| Last Updated | 2026-07-09 |
| Depends On | KB-001, KB-017, KB-018, KB-019 |
| Required By | All engineering work |

## 1. Purpose

The Progress Registry is the central tracking system for the DUKADESK platform. It records the status of every KB document, specification, ADR, and alignment report. It is the single source of truth for project progress.

## 2. KB Document Status Tracking

| KB-ID | Title | Version | Status | Owner | Review Status | Last Updated |
|-------|-------|---------|--------|-------|---------------|--------------|
| KB-001 | README | 0.1.0 | Drafting | Engineering | Not Reviewed | 2026-07-09 |
| KB-002 | Vision & Mission | — | Planned | — | Not Reviewed | — |
| KB-003 | Platform Philosophy | — | Planned | — | Not Reviewed | — |
| KB-004 | Core Principles | — | Planned | — | Not Reviewed | — |
| KB-005 | Terminology & Glossary | — | Planned | — | Not Reviewed | — |
| KB-006 | Platform Overview | — | Planned | — | Not Reviewed | — |
| KB-007 | System Architecture | — | Planned | — | Not Reviewed | — |
| KB-008 | Service Boundaries | — | Planned | — | Not Reviewed | — |
| KB-009 | Runtime Overview | — | Planned | — | Not Reviewed | — |
| KB-010 | Technology Stack | — | Planned | — | Not Reviewed | — |
| KB-011 | Naming Standards | — | Planned | — | Not Reviewed | — |
| KB-012 | Coding Standards | — | Planned | — | Not Reviewed | — |
| KB-013 | API Standards | — | Planned | — | Not Reviewed | — |
| KB-014 | Database Standards | — | Planned | — | Not Reviewed | — |
| KB-015 | Event Standards | — | Planned | — | Not Reviewed | — |
| KB-016 | Security Standards | — | Planned | — | Not Reviewed | — |
| KB-017 | Documentation Standards | 0.1.0 | Drafting | Engineering | Not Reviewed | 2026-07-09 |
| KB-018 | Architecture Decision Records | 0.1.0 | Drafting | Engineering | Not Reviewed | 2026-07-09 |
| KB-019 | Review & Alignment Process | — | Planned | — | Not Reviewed | — |
| KB-020 | Progress Registry | 0.1.0 | Drafting | Engineering | Not Reviewed | 2026-07-09 |
| KB-021 | AI Context Guide | — | Planned | — | Not Reviewed | — |

## 3. Specification Status Tracking

| SPEC-ID | Title | Domain | Version | Status | Aligned Against | Last Updated |
|---------|-------|--------|---------|--------|----------------|--------------|
| — | Backend Specification | Backend | — | Implemented | — | — |
| — | Mobile Specification | Mobile | — | Implemented | — | — |
| — | Business Dashboard | Dashboard | — | Planned | — | — |
| — | Tenant Dashboard | Dashboard | — | Planned | — | — |
| — | Website | Website | — | Planned | — | — |

Specifications must be assigned SPEC-IDs and registered here once they move from Implemented to Under Review status.

## 4. ADR Registry

| ADR-ID | Title | Status | Date | Author | Supersedes | Superseded By |
|--------|-------|--------|------|--------|------------|---------------|
| — | — | — | — | — | — | — |

No ADRs have been created yet. ADR-000-template.md is available in `adr/`.

## 5. RFC Registry

| RFC-ID | Title | Status | Date | Author | Related ADR |
|--------|-------|--------|------|--------|-------------|
| — | — | — | — | — | — |

RFCs are stored in `project-management/rfc/`.

## 6. Knowledge Base Version History

| KB Version | Date | Status | Changes |
|------------|------|--------|---------|
| 0.1.0 | 2026-07-07 | Drafting | Initial Knowledge Base structure created |

The Knowledge Base follows semantic versioning (MAJOR.MINOR.PATCH) as defined in KB-001 §15.

## 7. Alignment Report Index

| Report | Domain | Knowledge Base Version | Specification Version | Verdict | Last Updated |
|--------|--------|----------------------|----------------------|---------|--------------|
| AR-mobile | Mobile | — | — | Not Started | — |
| AR-backend | Backend | — | — | Not Started | — |
| AR-dashboard | Dashboard | — | — | Not Started | — |
| AR-website | Website | — | — | Not Started | — |
| AR-builder | Builder | — | — | Not Started | — |

## 8. Traceability Matrix

The traceability matrix maps requirements from vision through to implementation and testing. Each row represents a traceable artifact.

### Platform Traceability

```
Vision (KB-002)
  │
  ▼
Core Principles (KB-004)
  │
  ▼
Architecture (KB-006–KB-010)
  │
  ├──► Backend Specification
  │       │
  │       ▼
  │     Implementation → Testing
  │
  ├──► Mobile Specification
  │       │
  │       ▼
  │     Implementation → Testing
  │
  ├──► Dashboard Specification
  │       │
  │       ▼
  │     Implementation → Testing
  │
  └──► Website Specification
          │
          ▼
        Implementation → Testing
```

### Capability Traceability

```
Capability System (KB-007 §4)
  │
  ├──► Architecture (KB-006, KB-008)
  │       │
  │       ├──► Backend  →  Implementation
  │       ├──► Mobile   →  Implementation
  │       └──► Builder  →  Implementation
  │
  └──► Documentation
```

This matrix is expanded as specifications are written, aligned, and implemented.

## 9. Engineering Dictionary

The Engineering Dictionary defines ownership and relationships for every platform entity. Unlike the Glossary (KB-005), which explains what terms mean, the Dictionary defines who owns what and where entities appear.

### Entity Registry

| Entity | Owner | Appears In | Related |
|--------|-------|------------|---------|
| Desk | Platform | Mobile, Backend, Builder, Website, Dashboard | Manifest, Capability, Theme |
| Workspace | Platform | Mobile, Backend, Builder, Website | Desk, Manifest |
| Manifest | Platform | Backend, Builder, Mobile | Desk, Capability, Theme |
| Capability | Platform | Backend, Mobile, Builder, Website | Manifest, Role, Permission |
| Theme | Platform | Mobile, Builder, Website, Dashboard | Manifest, Component |
| User | Platform | All surfaces | Tenant, Role, Profile |
| Tenant | Platform | All surfaces | User, Desk, Configuration |
| Notification | Platform | Backend, Mobile, Website, Dashboard | Event, Template |
| Event | Platform | Backend, All surfaces | Notification, Audit |
| Order | Platform | Backend, Mobile, Website | Booking, Payment, Invoice |
| Booking | Platform | Backend, Mobile, Website | Order, Desk, Schedule |
| Payment | Platform | Backend, Mobile, Website | Order, Invoice, Provider |
| Module | Platform | Builder, Backend | Component, Capability, Theme |
| Component | Platform | Mobile, Builder, Website | UI, Module, Theme |

### Dictionary Maintenance

- New entities must be added to the registry when introduced.
- Entity ownership may change only through an ADR.
- The Appears In field must be updated when a new surface implements the entity.

## 10. Alignment Scores

Alignment scores measure how well each domain specification aligns with the Knowledge Base. Scores are calculated during alignment review (KB-019) and updated when specifications are revised.

### Current Scores

| Domain | Architecture | Terminology | API | Events | Security | Overall |
|--------|-------------|-------------|-----|--------|----------|---------|
| Mobile | — | — | — | — | — | — |
| Backend | — | — | — | — | — | — |
| Dashboard | — | — | — | — | — | — |
| Website | — | — | — | — | — | — |
| Builder | — | — | — | — | — | — |

Scores are populated after the first alignment review cycle. Each dimension is scored as a percentage (0-100%).

### Score Calculation

Each finding during alignment review reduces the score for the affected dimension:

- Critical finding: -15%
- Major finding: -8%
- Minor finding: -3%
- Observation: No score impact

A dimension scoring below 80% is considered non-compliant and must be remediated before the specification can be marked Verified.

## 11. Canonical Data Model

The Canonical Data Model defines every entity in the DUKADESK platform. All specifications reference this model. No specification may introduce an entity that contradicts this model without an ADR.

### Entity Catalog

| Entity | Description | Key Attributes | Defined In |
|--------|-------------|----------------|------------|
| User | A person who interacts with the platform | id, email, name, roles, tenantId | KB-007 |
| Tenant | An organization that uses the platform | id, name, domain, config | KB-007 |
| Desk | A bookable desk resource | id, label, location, capabilities, themeId | KB-007 |
| Workspace | A collection of desks assigned to a user or team | id, name, desks, userId | KB-007 |
| Manifest | The configuration document that defines a desk's behavior | id, version, capabilities, theme, modules | KB-007 |
| Publication | A published version of a Manifest | id, manifestId, status, timestamp | KB-007 |
| Capability | A feature or permission gated by the capability system | id, name, description, constraints | KB-007 |
| Theme | A set of visual and behavioral customizations | id, name, palette, typography, components | KB-007 |
| Component | A UI building block | id, type, props, slots, theme | KB-007 |
| Module | A composable unit of functionality | id, name, capabilities, components | KB-007 |
| Event | A signal emitted when something happens | id, type, payload, source, timestamp | KB-015 |
| Notification | A message delivered to a user | id, type, recipient, channel, content | KB-015 |
| Order | A request for a desk or service | id, userId, deskId, status, paymentId | TBD |
| Booking | A confirmed reservation for a desk | id, orderId, deskId, start, end | TBD |
| Payment | A financial transaction | id, orderId, amount, status, provider | TBD |

This model is expanded as new entities are identified. Each entity must link to the KB document where it is formally defined.

---

**Parent:** KB-001 — README
**See also:** KB-001 §7 (Engineering Workflow), KB-001 §15 (Versioning), KB-005 (Terminology), KB-017 (Documentation Standards), KB-018 (ADR), KB-019 (Review & Alignment Process)
