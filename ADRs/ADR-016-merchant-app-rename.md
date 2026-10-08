# ADR-016: Tenant → Merchant/App Rename (Product & API Language)

| Field | Value |
|-------|-------|
| ADR-ID | ADR-016 |
| Title | Tenant → Merchant/App Rename (Product & API Language) |
| Status | Accepted |
| Date | 2026-10-08 |
| Author | Architecture Team |
| Supersedes | Terminology only — does not supersede ADR-011 (resolution pipeline still applies) |
| Superseded By | — |

## Context

The platform was originally specified with generic multi-tenancy language:
every business customer was a **Tenant** with a **Tenant Application** managed
from a **Tenant Dashboard** (`SPECIFICATIONS/tenant-model.md`,
`SPECIFICATIONS/backend-tenants.md`, `GLOSSARY.md KB-002`, ADR-011).

The backend (`DUKA-BACKEND`) and the consumer mobile app (`DukaDesk`) have
since renamed the product- and API-facing language:

- Public REST surface uses **merchants** (`/api/v1/merchants/{id}/…`,
  `/api/v1/app/merchants/…`, `merchants/:slug/manifest`,
  `merchants/:merchantId/catalog`). No live `/api/v1/tenants/*` route exists.
- Authenticated consumer commerce/booking lives under **app**
  (`/api/v1/app/commerce/*`, `/api/v1/app/booking/*`).
- The consumer runtime renders a merchant's **PublishedApp** (live route
  `desk/[id]`), not a "tenant application".
- The merchant portal brands the operator as **merchant** (`dd_merchant`,
  `merchantId` with `tenantId` fallback).

The Knowledge Base, specifications, and documentation still say "tenant"
throughout, contradicting the shipped API and product. Per GLOSSARY §2, a
terminology change requires an ADR — this record.

## Decision

1. **Product language is merchant / merchant app from now on.**
   - "Tenant" (operator) → **Merchant**.
   - "Tenant Application" / consumer "Desk" instance → **Merchant App**
     (the live `PublishedApp`).
   - "Tenant Dashboard" (merchant-facing) → **Merchant Dashboard**.
     The platform-ops surface stays **Admin Portal**.
2. **API language follows the shipped routes**: `merchants`, `app/commerce`,
   `app/booking`, `bff/mobile/merchants`. Never document or add
   `/tenants/*`, `/cart/*`, `/orders/*`, or `/profile` routes.
3. **Code-internal identifiers are NOT renamed by this ADR** and remain valid
   references. The rename is product/API-facing only:

   | Still `tenant` in code | Maps to product term |
   |---|---|
   | Prisma `Tenant`, `TenantUser`, `TenantConfig`, `TenantDomain`, `TenantPaymentAccount`, enums `TenantStatus`, `TenantUserRole` | Merchant, membership, config… |
   | `tenantId` FKs/columns, `x-tenant-id` / `x-tenant-slug` headers, `:tenantId` params | `merchantId` at the API boundary |
   | `shared/tenant`, `shared/context` tenant-context, `TenantResolver` + middleware | Merchant resolution (ADR-011 pipeline unchanged) |
   | Mobile `store/tenantStore.ts`, `data/runtime/tenants/`, `mockClient` tenant dict | Merchant store / sample merchant data (demo, unhooked) |
   | SDUI action `exit_tenant`, `switch_screen` payloads | Keep verbatim in screen JSON |
   | Portal `tenant_owner` role value, `tenantId` fields (with `merchantId` fallback) | Keep verbatim — they are live values |
   | `bff/tenant` dashboard controller path | Keep verbatim until a code migration ADR renames it |

4. **"Multi-tenant" stays** as the architecture adjective (data isolation,
   ADR-011 pipeline). It describes the pattern, not the customer.

## Consequences

### Positive

- KB, specs, and docs match the shipped API — no more `/tenants` confusion.
- New engineers learn one product term (merchant) with an explicit map to the
  legacy code identifiers they will still read in Prisma/services/stores.

### Negative

- The KB now carries dual vocabulary during transition; every "tenant" in
  older documents must be read through this ADR's mapping table until those
  documents are revised.
- A future code-level rename (Prisma models, stores, folders) is a separate,
  breaking migration — explicitly out of scope here.

## Compliance

- New KB entries, specs, and docs use merchant / merchant app; `tenant`
  appears only for code identifiers listed above.
- API reviews reject `/tenants/*` and non-canonical prefixes
  (see `DUKA-DEV-DOCS/architecture/api-conventions`).
- `GLOSSARY.md (KB-002)`: Merchant + Merchant App entries added; Tenant
  entry annotated with this rename.

## Affected Documents

| Document | Impact |
|----------|--------|
| GLOSSARY.md (KB-002) | Merchant / Merchant App added; Tenant annotated |
| SPECIFICATIONS/tenant-model.md | Rename banner → this ADR (body describes live `tenantId`/manifest mechanics) |
| SPECIFICATIONS/backend-tenants.md | Rename banner → this ADR (lifecycle/subscription text now reads as merchant) |
| ADR-011 | Unchanged (immutable); pipeline applies to merchants |
| DUKA-DEV-DOCS | Product language updated to merchant/app throughout |

## Notes

Verified against code 2026-10-08: `merchants.controller.ts`,
`merchants-app.controller.ts`, `mobile-bff.controller.ts` (backend);
`endpoints/tenant.ts|commerce.ts|booking.ts`, `openPublishedApp.ts`
(`desk/[id]`), `PublishedAppShell.tsx` (mobile). Residual `tenant` symbols
listed above confirmed live in the same tree.
