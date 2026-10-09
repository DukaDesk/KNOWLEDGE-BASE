# Merchant Dashboard Agent Context

> **Naming (ADR-016):** the product surface is the **Merchant Dashboard**. The
> folder `tenant-dashboard/` and backend path `bff/tenant` are code names.
> There is no standalone tenant-dashboard repository.

## Overview

The merchant-facing dashboard is implemented in the merchant portal
(`DUKA-MERCHANT/dukaDesk`): `DashboardShell` layout + `components/pages/*`
(Dashboard, Products, Orders, Customers, Inventory, Analytics, Marketing,
Messages, Integrations, Billing, Team, Settings, Notifications, Compliance,
DeskDesign, MyApp) + `components/pages/sector/*` (Attendance, Giving, Fees,
AppointmentsToday, Reservations, Memberships, Tickets, Classes).

The backend serves it through `DUKA-BACKEND/src/bff/tenant-dashboard/`
(controller path `bff/tenant` — code name) over Users+Releases.

## Responsibilities

- Merchant user interface (dashboard shell + sector-adaptive pages)
- Business, product, order, customer, and team management for one merchant
- Merchant-specific settings and preferences
- Operational workflows and notifications

## Non-Responsibilities

- Platform administration (Admin Portal / `bff/admin` owns that)
- Core business logic execution (backend modules own that)
- Infrastructure provisioning

## Technology Stack

- Framework: React 18.2 + Vite 8.2 + react-router-dom 7.18 (in `DUKA-MERCHANT/dukaDesk`)
- State: `AuthContext` (`dd_merchant`, dual `merchantId || tenantId`) + runtime providers
- API Client: axios `httpClient.js` (`VITE_API_URL` → `/api/v1`), self-service `/app/*` + public `/merchants/*`
- Testing: Vitest

## Repository Structure

```text
DUKA-MERCHANT/dukaDesk/src/components/
  layout/DashboardShell.jsx   # Authenticated shell
  pages/*                     # Business domains + DeskDesign + MyApp
  pages/sector/*              # Vertical pages (church, school, booking, …)
DUKA-BACKEND/src/bff/tenant-dashboard/   # bff/tenant aggregator (code name)
```

## Build and Test

```bash
cd DUKA-MERCHANT/dukaDesk
npm run dev     # :3000
npm test        # vitest run
npm run build
```

## Specification Traceability

| Specification | Title | State |
|---------------|-------|-------|
| ADR-014 | Vertical-Adaptive Business Dashboard | Accepted |
| ADR-016 | Tenant → Merchant/App Rename | Accepted |
| VERTICALS.md | Sector presets, KPIs, navigation fallback | Active |

## Agent Conventions

- Reference engineering specifications by ID in commits and pull requests.
- Enforce merchant isolation in all data-fetching and mutations (backend `TenantResolver`, code name).
- Reuse shared UI components where applicable.
- Keep workflows simple and responsive.
- Update this context when responsibilities or structure change.

## Common Tasks

- Implement a merchant screen: follow UI specs + `/app/*` or `/merchants/*` API contracts.
- Add a sector page: add under `components/pages/sector/` + vertical preset in `config/verticals.js` + `moduleGate` flag.
- Update settings: follow security guidance; merchant config via `GET/PUT /api/v1/app/merchants/config`.

## Escalation

Stop and ask for human input when:

- A change crosses merchant boundaries.
- A security-critical decision is required.
- A decision impacts subscription tiers or entitlements.
