# Merchant Dashboard Architecture Alignment

> Naming per ADR-016: **Merchant Dashboard** (product); `tenant-dashboard/`,
> `bff/tenant` are code names.

This document records the architectural constraints and decisions that guide merchant dashboard development.

## Approved ADRs

| ADR | Title | Status |
|-----|-------|--------|
| ADR-013 | Builder Template Gallery and Section Editor Redesign | Accepted |
| ADR-014 | Vertical-Adaptive Business Dashboard | Accepted |
| ADR-016 | Tenant → Merchant/App Rename | Accepted |

## Design Principles

- Merchant isolation (backend `TenantResolver`, code name)
- Simple and responsive workflows
- Consistent user experience
- Secure by default

## Patterns

- Shared UI components (`dukaDesk` shell + pages)
- Service layer for API access (`services/api.js` + `httpClient.js`)
- Role-based feature visibility (`usePermission.js`, `tenant_owner` role value is live)
- Optimistic updates where appropriate

## Constraints

- All data operations must respect merchant boundaries.
- User roles determine available features.
- Settings changes must be auditable.

## Alignment Verification

Before merging, confirm:

- [ ] Changes align with approved ADRs.
- [ ] Changes follow repository patterns.
- [ ] Changes respect listed constraints.
