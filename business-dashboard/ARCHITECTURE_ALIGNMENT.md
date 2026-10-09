# Business Dashboard Architecture Alignment

This document records the architectural constraints and decisions that guide business dashboard development.

## Approved ADRs

| ADR | Title | Status |
|-----|-------|--------|
| ADR-009 | JWT + Refresh Token Authentication | Accepted — admin login via JWT + OTP (`AdminLogin.jsx`) |
| ADR-011 | Tenant Resolution Strategy | Accepted — merchant isolation via `TenantResolverService` (code name) + `normalizeMerchantStatus` + `getMerchantEnriched` |
| ADR-016 | Tenant → Merchant/App Rename | Accepted — product language merchant/merchant app; code identifiers stay |

## Design Principles

- Role-based access control — implemented strict `SEC-0002` with `Super Admin` full `*`, `Platform Operator` `tenant:manage/marketplace:manage/system:monitor`, `Support Agent` `support:access` read-only per `permissions.js:12`
- Data-heavy views optimized for performance — `EnhancedRemoteTablePage.jsx:5` paginated `10/25/50/100`, `Promise.allSettled` degraded rendering (`AdminDashboard.jsx:156`, `Settings.jsx:56`), `recharts` SVG charts
- Consistent admin patterns — `Breadcrumbs.jsx:1` per `NAVIGATION_STANDARD`, `SlideOver.jsx:1` + `ConfirmModal.jsx:1` with `pointer-events:auto` `z-index`, `profileSection` logout directly under profile
- Secure privileged operations — `PendingAdmins.jsx:52` approve `POST /admin/users/:id/approve` + reject with `{reason,comment}` Modal, `recordAuditEvent`, investor `maskEmail`

## Patterns

- Shared component library — `components/UI` (`EnhancedRemoteTablePage`, `SlideOver`, `ConfirmModal`, `AccessibleToggle`, `Field`, `PrimaryBtn`)
- Service layer for API access — `services/businessDashboard.js:6` live BFF (`/bff/admin/overview`, `/bff/admin/analytics`, `/bff/tenant/:id/*`) + `services/apiClient.ts:44` envelope + `x-railway-request-id`
- Table and form abstractions — `EnhancedRemoteTablePage.jsx:28` `recordsFrom` handling `users`/`data` envelope + `meta.total`, `RemoteTablePage.jsx:3` same, `Register.jsx:8` role tab-toggle required
- Audit logging integration — `services/audit.js` + `recordAuditEvent` per approve/reject, `AuditLog.jsx:27` `GET /bff/admin/audit`

## Constraints

- Admin actions require appropriate authorization — enforced via `JwtAuthGuard` + `RbacGuard` (`DUKA-BACKEND`) and `canPerform` front-end hides nav/actions per `SEC-0002` SR-05/SR-06.
- Billing and pricing changes require explicit approval — `SubscriptionManagement.jsx:116` `updateSubscription` gated by `subscriptions:manage`.
- Tenant isolation must be maintained — merchant data separated per merchant scope; the merchant portal (site builder) and the consumer merchant app (mobile `PublishedApp`) correlate only when the merchant id/slug is linked (`getMerchantEnriched:43`).

## Alignment Verification

Before merging, confirm:

- [x] Changes align with approved ADRs — `ADR-001/002/003` applied in `auth.service.ts`, `TenantResolver`, Vite BFF
- [x] Changes follow repository patterns — shared `components/UI`, `services/businessDashboard`, table abstractions, audit integration
- [x] Changes respect listed constraints — authorization gated, pricing explicit, isolation via `normalizeMerchantStatus`

Verified: `npm run build` `1889 modules ✓`, `npm run lint` `0`, `npm run typecheck` `0`, live `https://duka-backend-production.up.railway.app` + Vercel `duka-admin-477r.vercel.app`.
