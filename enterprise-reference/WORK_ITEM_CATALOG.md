# Work Item Catalog

This document catalogs engineering work items across DUKADESK OS.

## Work Items

| ID | Type | Title | Domain | Specification | Repository | Status | Owner |
|----|------|-------|--------|---------------|------------|--------|-------|
| TASK-001 | Task | Implement authentication controller | DOM-001 Identity | SPEC-001 | REP-001 Backend | Backlog | Team B |
| TASK-002 | Task | Implement tenant database schema | DOM-002 Tenant | SPEC-002 | REP-001 Backend | Backlog | Team E |
| TASK-003 | Task | Create SDK core client | DOM-009 Builder | SPEC-001 | REP-007 SDK | Backlog | Team D |
| TASK-004 | Task | Build login screen | DOM-001 Identity | SPEC-001 | REP-005 Business Dashboard | Backlog | Team H |

## Work Item Relationships

| Work Item | Depends On |
|-----------|------------|
| TASK-002 | TASK-001 |
| TASK-003 | TASK-001 |
| TASK-004 | TASK-001, TASK-003 |

## Source of Truth

Authoritative work items live in [engineering-work](../engineering-work/).

## Maintenance

This catalog is regenerated from the engineering-work registry.
