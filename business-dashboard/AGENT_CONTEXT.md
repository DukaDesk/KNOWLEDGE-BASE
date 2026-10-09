# Business Dashboard Agent Context

## Overview

The `business-dashboard/` repository contains the administrative dashboard used by business administrators to manage tenants, users, billing, and platform configuration.

## Responsibilities

- Business admin user interface
- Tenant and user management
- Billing and subscription views
- Platform configuration screens
- Reports and analytics presentation

## Non-Responsibilities

- End-customer-facing features
- Core business logic execution
- Infrastructure provisioning

## Technology Stack

- Framework: React 18.2 + Vite 5 + React Router 6.20 (see `DUKA-ADMIN/package.json`)
- State Management: React Context (`AuthContext.jsx`) + hooks (`useToast.js`) + localStorage (`admin_token`, `dukadesk_admin`)
- API Client: `apiClient.ts:44` `fetch` with `VITE_API_URL=https://duka-backend-production.up.railway.app` + `/api/v1`, JWT `Authorization: Bearer`, `retry:3` exponential backoff, `TransformInterceptor` envelope `success` handling, `x-railway-request-id` trace
- UI: lucide-react 1.39, custom CSS vars (`index.css:1` KB tokens `color-primary-500 #2563EB`), `recharts` 2.10 available but charts use custom SVG `RevenueChart:83`/`MerchantGrowthChart:113`
- Testing: Playwright 1.40 (`tests/smoke.spec.ts` covers UI-0003 AC-01–04: shell renders, role-aware nav, invite, settings); `vite build` 1889 modules ✓

## Repository Structure (DUKA-ADMIN)

```text
DUKA-ADMIN/
  src/
    App.jsx                # State-driven router (PAGE_ROUTES + canAccessPage RBAC)
    main.jsx               # BrowserRouter + AuthProvider + ErrorBoundary
    components/
      Auth/AdminLogin.jsx
      Layout/AdminSidebar.jsx, AdminTopbar.jsx
      UI/                  # Toast, Breadcrumbs, ErrorBoundary, RemoteTablePage, …
    context/AuthContext.jsx  # Sole global (admin + token, localStorage dukadesk_admin)
    hooks/useToast.js
    pages/                 # Dashboard, Merchants/*, Marketplace, Audit, Subscriptions,
                           # Analytics, Marketing, Infrastructure, Settings, PendingAdmins,
                           # Auth/Register, Forbidden, NotFound
    services/              # apiClient.ts (typed fetch + retry), api.js (legacy),
                           # businessDashboard.js (domain APIs), audit.js, permissions.js
    utils/                 # badgeTones, maskEmail, unwrapAuth
  tests/                   # Playwright (smoke, new-modules, pages/*, utils/auth)
  playwright.config.ts  vite.config.ts  vercel.json
```

## Build and Test

```bash
cd DUKA-ADMIN
npm install
npm run dev        # Vite, :5173
npm run typecheck  # tsc --noEmit
npm run lint
npm test           # playwright (also test:ui / test:headed / test:debug)
npm run build
```

## Engineering Standards

- [Repository Standard](../engineering-governance/repository-governance/REPOSITORY_STANDARD.md)
- [Branching Standard](../engineering-governance/repository-governance/BRANCHING_STANDARD.md)
- [Versioning Standard](../engineering-governance/repository-governance/VERSIONING_STANDARD.md)
- [Pull Request Standard](../engineering-governance/repository-governance/PR_STANDARD.md)
- [Review Standard](../engineering-governance/repository-governance/REVIEW_STANDARD.md)
- [Release Standard](../engineering-governance/repository-governance/RELEASE_STANDARD.md)
- [AI Context Standard](../engineering-governance/repository-governance/AI_CONTEXT_STANDARD.md)
- [Boot Process Standard](../engineering-governance/repository-governance/BOOT_PROCESS_STANDARD.md)

## Specification Traceability

Specifications that target this repository:

| Specification | Title | State |
|---------------|-------|-------|
| UI-0003 | Business Dashboard Foundation and Shell | Complete — shell `App.jsx:128`, sidebar `AdminSidebar`, dashboard `AdminDashboard`, users `PendingAdmins`, settings `Settings` live |
| SEC-0002 | Authorization and RBAC | Complete — `permissions.js:12` `super_admin/platform_operator/support_agent` + `AuthContext` heal + `Forbidden.jsx` |
| FEAT-0002 | Tenant Foundation | Complete — merchant lifecycle via `getMerchants` `normalizeMerchantStatus` `pending→draft`/`active→published` + `getMerchantEnriched` |
| API-0002 | Tenant Management API | Complete — `GET /admin/merchants` + BFF `GET /bff/admin/merchants` (+ `/:id/analytics`); no `/tenants` route exists on the backend (admin `GET /tenants` caller is stale — do not add callers); `suspend` per spec; `POST /auth/register {role}` via invite flow |
Platform coverage (no ADM spec exists — tracked here, not as a specification): Platform Config, Audit Logs (`GET /bff/admin/audit`), Monitoring (`/health`, `/infra/status`), Feature Flags (`/admin/feature-flags`), System Health.

## Agent Conventions

- Reference engineering specifications by ID in commits and pull requests.
- Implement role-based access control for all admin actions.
- Keep dashboards responsive and data-heavy views performant.
- Reuse UI components across dashboards where possible.
- Update this context when responsibilities or structure change.

## Common Tasks

- Add an admin screen: follow UI-XXXX and API-XXXX.
- Implement a report: follow FEAT-XXXX and data contract.
- Update billing views: follow INT-XXXX and security guidance.

## Escalation

Stop and ask for human input when:

- A change affects billing, pricing, or legal compliance.
- A privileged operation lacks proper authorization.
- A decision impacts tenant isolation or data access.
