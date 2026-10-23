# DUKADESK OS — Progress

**Last Updated:** 2026-10-20

2026-10-20: **Admin portal Platform Messaging coverage and modal layering fix.** `DUKA-ADMIN` (branch `test/messaging-coverage`) adds deterministic coverage for the Messaging page: the inbox lists broadcasts and directs with kind badges/read counts and filters by kind, composing a broadcast asserts the exact POST payload and success toast, and threads load replies, append platform replies, and retract after confirmation. The tests exposed a real defect: `ConfirmModal` used z-index 200/201 while the shared `Modal` uses 1000, so destructive confirmations opened from inside a modal rendered behind it and were unclickable; `ConfirmModal` now layers at 1200/1201. Untitled message cards now expose `Direct message`/`Announcement` in their accessible names instead of the ambiguous `message`. Verification: six mocked specs 240/240, full run 249 passed + 6 mobile visual skips, lint/typecheck/build/bundle budgets clean. A companion hotfix removes an unused `merchantsCache` callback (the lint failure that reddened main after #25) and updates the Settings shell invariant to 8 tabs including Promo Feed. Notes updated in [business-dashboard](business-dashboard/PROGRESS.md).


2026-10-20: **Admin portal password-gated app approval coverage.** `DUKA-ADMIN` (branch `test/password-gated-app-approval`) adds deterministic coverage for the merchant review approval flow: an unverified merchant review states that approval requires password confirmation and opens a re-authentication dialog; empty and incorrect passwords render inline errors without calling the approve endpoint, and a correct password verifies via `POST /auth/verify-password` then completes the approval with a success toast. Submitted previews render the merchant screens with working screen navigation. `apiClient` maps a 401 from `/auth/verify-password` to "Incorrect password. Please try again." instead of the session-expired copy. Verification: six mocked specs 240/240, full run 249 passed + 6 mobile visual skips, lint/typecheck/build/bundle budgets clean. Notes updated in [business-dashboard](business-dashboard/PROGRESS.md).


2026-10-20: **Admin portal Marketplace and Subscriptions coverage.** `DUKA-ADMIN` (branch `test/marketplace-subscriptions-invariants`) extends `tests/new-modules.spec.ts` with deterministic, live-shaped coverage: Marketplace listings render authoritative records with category/status formatting, category filtering, an empty search state, toast-confirmed inline moderation, and a bulk-action toolbar after row selection; Subscriptions render the platform management note, currency-formatted amounts, distinct per-row action labels, and the `/admin/plans` capability drawer, with plan changes gated by confirmation. The shared table's menu-trigger label now falls back to `merchantName` so menu-style tables keep distinct accessible names. Seeding now includes listings, plans, and major-unit subscription amounts. Verification: six mocked specs 215/215 across the five projects, full run 224 passed + 6 mobile visual skips, lint/typecheck/build/bundle budgets clean. Notes updated in [business-dashboard](business-dashboard/PROGRESS.md).

2026-10-20: **Backend direct-API authorization e2e coverage.** `DUKA-BACKEND` (branch `test/direct-api-authorization-e2e`, PR #9) adds HTTP-level supertest coverage for the platform admin API: `test/admin-authorization.e2e-spec.ts` boots the real `AdminController` and `PlatformRoleGuard` with a header auth stub, the production global prefix/versioning/exception filter/transform interceptor, and a role-aware Prisma mock (no database). Nine cases verify 401 for unauthenticated calls, 403 with an `access.denied` audit row for missing roles, `platform_operator` access to merchant routes, `operations` denied on `platform_operator` routes (and vice versa on app-review approval), `super_admin`-only invite management, and immediate access loss when the role assignment is removed. `test/jest-e2e.json` now maps the ESM `uuid` package to the existing CJS mock and forces exit; `tsconfig.eslint.json` includes `test/**/*`; CI runs `npm run test:e2e` after the 201-test unit suite. Verification: e2e 9/9, unit 201/201, lint 0 errors, build 0 issues. Notes updated in [backend](backend/PROGRESS.md) and [business-dashboard](business-dashboard/PROGRESS.md).

2026-10-19: **Admin portal acceptance tests, rate-limit UX, bundle-size guard, and a 403 deep-link fix.** `DUKA-ADMIN` (branch `feat/acceptance-perf-rate-limit`) adds `tests/acceptance.spec.ts` covering operator behaviours with mocked live-shaped data: throttled requests surface `Retry-After` guidance without silent retry, successful merchant mutations confirm with a success toast, failed mutations surface an error toast and no success confirmation, the `operations` role receives app-review-only merchant actions, a role without page access is denied with 403, and dashboard metric cards reflect the live payload. `apiClient` now detects HTTP `429`, returns friendly copy with `Retry-After` seconds (and marks it non-retryable so the operator sees the limit immediately) instead of retrying silently. A dependency-free `scripts/check-bundle-size.mjs` (`npm run perf`) enforces gzip budgets in the CI build job (largest JS chunk 140 kB, total JS 320 kB, total CSS 45 kB, total raw 900 kB; recorded baseline 226 kB JS / 15 kB CSS). The acceptance work surfaced and fixed a real P0 access-control gap: a hard deep-link to a forbidden page rendered it because `App.jsx`'s initial route state skipped the permission guard — the initial page and forbidden state are now permission-validated. The deterministic suite is 165/165 across chromium, firefox, webkit, Mobile Chrome, and Mobile Safari; portal build + lint + typecheck clean. A follow-up adds `tests/shell-visual.spec.ts` (`@visual`, desktop-only) asserting the shell/sidebar/settings structural hierarchy per UI-0003: a 260px navy sidebar pinned beside the content with `aria-current="page"`, a 68px icon rail after collapse, and a 7-tab Settings `tablist` with switching panels — verified on chromium, firefox, and webkit; a further expansion adds mocked coverage for a revoked session returning to sign-in, cross-merchant request scoping (opening a review only fetches that merchant's records), and audit-log actor/action/outcome visibility; the Settings tablist now follows the ARIA tabs keyboard pattern (roving tabindex, ArrowLeft/ArrowRight, Home/End) with a keyboard test; row action menus now implement the ARIA menu-button pattern (Arrow keys open/move, Home/End, Escape closes and returns focus to the trigger, `aria-expanded`/`aria-controls`, roving `tabindex`), and background auto-refresh keeps rows stable instead of unmounting an open menu (the table's blocking loading state now shows only before the first page of rows arrives); the destructive-action `ConfirmModal` now manages focus (safe-action/field initial focus, Tab trap, Escape close, `aria-labelledby`/`aria-describedby`, associated confirmation label, focus restored to the invoking trigger) (the six mocked E2E specs are 195/195; the full run including desktop-only visual invariants is 204 passed with six mobile visual skips). Notes updated in [business-dashboard](business-dashboard/PROGRESS.md).

2026-10-18: **Admin portal accessibility, stale-response hardening, and deterministic E2E.** `DUKA-ADMIN` (branch `test/deterministic-e2e`) fixes verified accessibility gaps in the shared shell: `EnhancedRemoteTablePage` sortable headers are now keyboard-operable buttons with `aria-sort` state and "Sort by …" names, the table exposes a visually-hidden `<caption>` and `aria-busy`, `Toast` announces with `role="status"`/`role="alert"` + `aria-live`, and `Field` associates its label (`htmlFor`/`id`) and surfaces `aria-invalid`/`aria-describedby` errors. The same table now guards against out-of-order responses with a monotonic request sequence so only the newest in-flight fetch may write rows/total/error or clear loading. The Playwright suite is now fully deterministic and CI-ready: `tests/utils/mocks.ts` seeds the admin session and intercepts all `/api/v1/**` requests so `authenticatedPage` runs without a live backend or OTP (`E2E_LIVE=1` opts back into the live-credential login); `smoke`, `new-modules`, `support-policies-export`, `admin-login`, and `visual-regression` specs pass across chromium, firefox, webkit, Mobile Chrome, and Mobile Safari (135/135); the CI E2E job runs all five projects, building the mocked artifact with a non-routable `VITE_API_URL` (`https://api.ci.invalid`) because the app hard-fails when the API base is unset. Enabling the mobile emulations surfaced a responsive bug fixed in the same work: on ≤480px viewports the full-width drawer was hidden with a fixed `left:-300px`, leaving ~93px on-screen and intercepting taps, so it is now offset by its own width (`left:-100%`). Portal build + lint clean. Notes updated in [business-dashboard](business-dashboard/PROGRESS.md).

2026-10-18: **Admin portal: support/policy workflows, subscriptions capability visibility, report exports, and platform-role separation.** `DUKA-ADMIN` (branch `fix/admin-authz-and-prd`) adds a Support Tickets page (sidebar `Tickets` now routes there) with case timeline, comments, assignment, escalation, and required-resolution, governed platform policies in Settings (`draft → in_review → published → archived`, `super_admin` publish/archive), a permission-gated CSV `ExportButton` (`reports:read`, confirm-before-export) on Subscriptions/Support/Policies, subscription capability visibility with an unavailable fallback and read-only notice, an Escape/focus-managed `SlideOver`, and removal of dead client methods plus the empty `Customers/` page. `DUKA-BACKEND` (branch `fix/platform-role-authorization`) makes `platform_operator` and `operations` distinct roles (migration + backfill + `merchant-apps:review` grant), and adds `SupportTicket`/`SupportTicketEvent`/`PlatformPolicy` models with guarded `/api/v1/admin/support-tickets`, governed `/api/v1/admin/policies`, and audited `GET /api/v1/admin/reports/:report/export` (allow-listed, cap 5000, CSV-injection guard). Backend build 0 issues, 188/188 tests; portal build + lint clean. KB notes updated in [business-dashboard](business-dashboard/PROGRESS.md) and [backend](backend/PROGRESS.md) progress.

2026-09-27: **Backend B7 compatibility contract live** (deploy `717d7d8d`) — `GET /api/v1/compatibility` serves machine-readable contract `dukadesk.published-app-runtime` 1.0.0 (supported manifest versions, 35 component types, 10 action types, 16 capabilities, asset kinds, limits); `POST /api/v1/merchants/:id/publishing/preflight` dry-runs a manifest or the compiled drafts without publishing; publishing now asserts the contract before activation and returns 422 `INCOMPATIBLE_RUNTIME` for anything the shell cannot render (unknown component, unresolvable/cross-tenant asset, unknown required capability, unsupported schema version, limits), with unknown action types reported as warnings on the receipt. Discovery lists only activated tenants and projects the active release identity (`release {id, version, checksum, channel, publishedAt}`) — empty until merchants re-publish. Catalogs verified against the KB shared fixtures and production template types; 58 tests, lint clean, tsc clean.

2026-09-27: **Backend B4 applied in production.** The `20260924000000_add_active_release` migration is live on `duka-backend-production` (deploy `a00865ae`): the failed first attempt was recovered by baselining seven earlier migrations with `prisma migrate resolve --applied`, removing the stale rolled-back ledger row, and fixing `20260827120000_seed_admin` (`users.updatedAt`). Backfill updated 0 rows (no releases exist yet). Two deploy-path defects fixed: `preDeployCommand` now runs `npm run predeploy` (the raw `&&` string only executed `migrate deploy`, so the seed never ran), and `tsconfig.json` ships to the runner image (seed previously died on `ERR_UNKNOWN_FILE_EXTENSION`). Seed now creates 3 templates + `acme-store`; read-only audit `scripts/audit-active-release.js` reports 0 errors; `/api/v1/health` 200. Evidence: DUKA-BACKEND `docs/B4_MIGRATION_RUNBOOK.md`. Remaining: B8 merchant re-publish + live integration evidence (B7 completed later the same day — see the entry above).

2026-09-24: **Backend published-app delivery B1–B6 implemented** on `DUKA-BACKEND` main — canonical `ActiveReleaseService` shared by definition + BFF, `ManifestValidator` for PublishedApp 1.0.0 object screens (no compiler fall-through), atomic release activation with `tenant.activeReleaseId` + Idempotency-Key, owner/manager authz on publish/rollback/history, media `folderId` find-or-create + StorageService URL retention (`.webp` self-delete guard), default non-empty app seed on merchant create, `ApiQuotaGuard` wired. Unit suites added. B4 migration file written (not applied); B7 compatibility contract and B8 live integration evidence remain open. Tasks: [PUBLISHED_APP_DELIVERY_BACKEND_TODO.md](backend/PUBLISHED_APP_DELIVERY_BACKEND_TODO.md). Status: code complete / live verify pending.

2026-09-19: Mobile now uses one shell and the complete published snapshot, with explicit errors for incompatible definitions. Merchant compilation preserves section/splash/chrome data and checks complete read-back. [Implementation report](mobile/PUBLISHED_APP_RECONSTRUCTION_2026-09-19.md) | [Execution plan](mobile/PUBLISHED_APP_RECONSTRUCTION_TODO.md) | [Remaining parity TODO](mobile/PUBLISHED_APP_PARITY_VERIFICATION_TODO.md).


2026-09-19: Fixed complete nested PublishedApp resolution on mobile and merchant false publish success/image stripping. Live BFF still exposes Storefront v0.0.7 and the referenced logo returns 404; backend publication and public media delivery remain unresolved. Evidence: [Published logo/release mismatch](backend/PUBLISHED_LOGO_RELEASE_MISMATCH_2026-09-19.md). Agent tasks: [Dedicated TODO file](backend/PUBLISHED_LOGO_RELEASE_MISMATCH_TODO.md).


Merchant and app identities are separated: the merchant remains the owner identity, while the customer-facing app uses an explicitly edited app name or defaults to its slug. Published dashboard app data reads the manifest identity and logo.

Explore app icons now resolve published logos from `meta.logo`, `theme.brand.logo`, `branding.logo`, and equivalent nested manifest fields.

Merchant publishing now preserves the uploaded image MIME type and extension when materializing data URLs instead of hardcoding every asset as JPEG. The deployed logo currently returns a relative `/uploads/*.webp` URL that responds 404 on the deployed backend, so backend media delivery must expose a valid public/CDN URL before mobile can render that asset.

The merchant editor's splash **Change logo** and Settings app-logo controls now upload the original file immediately through `/api/v1/app/media/upload`, resolve an authenticated CDN delivery URL when the upload response only contains an internal path, and then persist that URL in design state. A local preview remains visible while the upload completes.

If media upload succeeds but the backend returns only an inaccessible relative `/uploads/...` path, the editor now keeps the local preview and reports the delivery problem instead of replacing the working splash icon with a broken image.

The media upload flow now explicitly changes uploaded app logos to `visibility: "public"` through the media update endpoint before resolving CDN delivery. This is required for unauthenticated mobile app icons; an existing private/broken asset must be re-uploaded after this change.

Demo editor sessions (`tenant_demo_*`) do not call the backend media service. They now store selected logos as local data URLs instead of fabricated `cdn.dukadesk.com` URLs, preventing broken previews while preserving the production upload path for real merchants.

Media URL extraction also accepts CDN response strings and common delivery fields (`signedUrl`, `fileUrl`, and `location`), while relative public paths are resolved against the API host instead of being rejected as missing URLs.

## Status Key

- ✅ Complete — Production ready
- 🔧 In Progress — Actively being built
- ⏳ Planned — Not yet started
- ❌ Blocked — Has dependencies not yet met

## Current Status

**Overall:** Backend implementation complete (~437 endpoints, 32 modules + `rejected` status). Knowledge Base architecture specs complete. Mobile app: live endpoint sync complete (328 paths), slug derived from display name, demo data removed from identity/nearby/order-history paths, hybridClient live-only; current client fixes cover deterministic manifest fallback IDs, the no-`Alert.alert` permission flow, API response narrowing, stable async permission test behavior, live authentication/profile/discovery calls, live order history/detail reads, deployed BFF runtime-config screen resolution, flexible runtime layout styles, and an Explore app-launcher view that resolves identity from the nested published manifest (`identity.slug`, `displayName`, and manifest logo) rather than the merchant-level discovery envelope, with a compact phone-style icon grid. Relative uploaded logo paths are resolved against the API base URL. Saved addresses and payment methods now show an explicit unavailable state instead of fabricated records until backend endpoints exist. Merchant portal: Vite production build passes; the complete Vitest suite passes; dashboard, builder, app configuration persistence, published definition reads, and BFF manifest parity checks are wired to the current App/Mobile contract. Publishing now reuses one release-history read for both versioning and persistence and preserves supported screen layout settings instead of unconditionally replacing them with a fixed scroll layout. **Admin Portal (Business Dashboard + Platform Admin): live complete — zero mocks, RBAC strict, tenant correlation, responsive drawer, pending approval with role, 6 new modules live (Orders/Products/Customers/Analytics/Marketing/Infrastructure), Bell icon, counts fix, per-merchant tenant users, invite-only signup (`AdminInvite`), two-stage merchant approval with phone-preview review (`81fb6fd`/`84fd7a2`); `Admin-portal` `https://github.com/DukaDesk/DUKA-ADMIN` at `84fd7a2`, live Railway `https://duka-backend-production.up.railway.app`, Vercel `duka-admin-477r.vercel.app`.**

**Admin Portal review updates (2026-10-16):** Platform bookings KPI and Booking Analytics removed without removing booking features inside merchant apps; Infrastructure Overview now visualizes deployment, backup, and health summaries; merchant title help and compact row actions added. Merchant app review is limited to global `super_admin` and `operations`; Operations receives app-only data and cannot manage merchants or access credential/compliance or subscription data. Backend allows app review while merchant credentials are pending, provided the app is `in_review` and has a submitted design. Implementation PRs DUKA-ADMIN #2 and DUKA-BACKEND #2 are merged; follow-ups DUKA-ADMIN #3 (Playwright preview-server reuse) and #4 (tagged visual test coverage) are also merged. On #4, Visual Regression, Build, and Lint/TypeCheck passed; E2E was still running when this status was recorded. Local focused visual test, Admin lint/typecheck, and backend build/focused authorization/service tests passed. An earlier broad Admin Playwright run had 30 cases time out in the shared auth fixture before `/dashboard` while all five role-test browser cases passed. See [Business Dashboard Progress](business-dashboard/PROGRESS.md).

## Constitution & Governance

| Component | Status | Notes |
|-----------|--------|-------|
| Platform Constitution | ✅ Complete | KB-C001–KB-C009 created in `dukadesk-constitution/` |
| Mission | ✅ Complete | `dukadesk-constitution/MISSION.md` |
| Vision | ✅ Complete | `dukadesk-constitution/VISION.md` |
| Engineering Philosophy | ✅ Complete | `dukadesk-constitution/ENGINEERING_PHILOSOPHY.md` |
| Architectural Laws | ✅ Complete | `dukadesk-constitution/ARCHITECTURAL_LAWS.md` |
| Engineering Laws | ✅ Complete | `dukadesk-constitution/ENGINEERING_LAWS.md` |
| AI Laws | ✅ Complete | `dukadesk-constitution/AI_LAWS.md` |
| Change Control | ✅ Complete | `dukadesk-constitution/CHANGE_CONTROL.md` |
| Decision Framework | ✅ Complete | `dukadesk-constitution/DECISION_FRAMEWORK.md` |
| Governance Model | ✅ Complete | `dukadesk-constitution/GOVERNANCE_MODEL.md` |
| Engineering Governance Consolidation | ✅ Complete | `engineering-governance/repository-governance/`, `engineering-governance/developer-experience/`, `engineering-governance/repository-bootstrap/`, `engineering-governance/execution-governance/` merged into `engineering-governance/` |
| Engineering Specifications | ✅ Complete | `engineering-specifications/` with templates, lifecycle, traceability |
| Engineering Work Management | ✅ Complete | `engineering-work/` with epic/feature/task/bug/spike model |
| Platform Operations | ✅ Complete | `platform-operations/` with service catalog, incident, DR, SLOs |
| Execution Governance | ✅ Complete | `engineering-governance/execution-governance/` with RACI, authority, compliance, metrics |
| Master Plan | ✅ Complete | `master-plan/` with waves, dependencies, teams, releases |
| Enterprise Reference Model | ✅ Complete | `enterprise-reference/` with domain/service/component/API/event/database catalogs |
| Product Definition | ✅ Complete | `product-definition/` with platform, products, applications, modules, features, users, permissions, editions, marketplace, roadmap, and usage guides |
| UI Specifications | ✅ Complete | `ui-specifications/` with principles, design tokens, standards, shared components/patterns/layouts/flows, application directories, and templates |
| Implementation Planning | ✅ Complete | `implementation/` with strategy, sequence, phases, repository plans, milestones, dependencies, risks, and verification |

## Platform Definition

| Component | Status | Notes |
|-----------|--------|-------|
| Platform Definition Package | ✅ Complete | `platform-definition/` created with PD-001 through PD-013 |
| Platform Overview | ✅ Complete | PD-001 |
| Product Model | ✅ Complete | PD-002 |
| Capability Model | ✅ Complete | PD-003 |
| Application Model | ✅ Complete | PD-004 |
| Module Model | ✅ Complete | PD-005 |
| Service Model | ✅ Complete | PD-006 |
| Feature Model | ✅ Complete | PD-007 |
| Edition Model | ✅ Complete | PD-008 |
| Licensing Model | ✅ Complete | PD-009 |
| Monetization Model | ✅ Complete | PD-010 |
| Marketplace Model | ✅ Complete | PD-011 |
| Tenant Model | ✅ Complete | PD-012 |
| Extensibility Model | ✅ Complete | PD-013 |

## Repository Bootstrap Compliance

| Component | Status | Notes |
|-----------|--------|-------|
| Repository Bootstrap Applied | ✅ Complete | KB-141 standard and templates added under `engineering-governance/repository-bootstrap/` |
| README.md Metadata | ✅ Complete | Required declarations present |
| AGENT_CONTEXT.md | ✅ Complete | AI boot sequence defined; Constitution added |
| ARCHITECTURE_ALIGNMENT.md | ✅ Complete | KB, spec, ADR, and Constitution references listed |
| CONTRIBUTING.md | ✅ Complete | Contribution guidelines defined |
| CHANGELOG.md | ✅ Complete | Initialized with version 0.1.0 |
| CODEOWNERS | ✅ Complete | Ownership assigned |
| LICENSE | ✅ Complete | MIT placeholder license added |
| docs/ | ✅ Complete | Documentation directory created |
| tests/ | ✅ Complete | Tests directory created |
| scripts/ | ✅ Complete | Scripts directory created |
| .github/ | ✅ Complete | Workflows and templates created |
| CI Pipeline | ⏳ Planned | Placeholder workflow created; needs runner configuration |

## Knowledge Base Progress

For detailed component-level progress across all platform domains, see [PROGRESS_REGISTRY.md](./PROGRESS_REGISTRY.md).

High-level summary:

| Domain | Status |
|--------|--------|
| Platform Runtime Architecture (KB-005–020) | ✅ Complete |
| Builder Studio Architecture (KB-022–031) | ✅ Complete |
| Marketplace Architecture (KB-032–040) | ✅ Complete |
| Application Architecture (KB-041–050) | ✅ Complete |
| Runtime Architecture (KB-051–062) | ✅ Complete |
| Identity & Access Architecture (KB-063–072) | ✅ Complete |
| Data Platform Architecture (KB-073–093) | 🔧 In Progress |
| Platform Integration Architecture (KB-094–106) | 🔧 In Progress |
| Enterprise Platform Services (KB-107–140) | 🔧 In Progress |

The merchant editor now exposes per-screen runtime layout controls (container kind, gap, directional padding, alignment, flex sizing, minimum height, scrolling, and container background) and persists them into the published manifest. Terminology is explicit: merchants own apps, and mobile users are the customers of those apps; app-owner editor requests use `/api/v1/app/*` rather than tenant-scoped endpoints.

Mobile runtime compatibility now includes the merchant builder's `promotion_list` component, so published storefront screens no longer fall back to an unsupported-component placeholder.

## Known Gaps

1. CI pipeline is a placeholder and requires runner configuration.
2. Repository validation script needs to be implemented.
3. Issue and PR templates are basic and may be expanded.
4. Saved consumer addresses and payment methods remain backend dependencies; mobile screens must not use demo data in live flows.
5. Backend automated test coverage remains pending despite endpoint implementation being complete.

## Roadmap

### Completed

1. ✅ DUKADESK Constitution
2. ✅ Engineering Governance (repository, bootstrap, developer experience, execution)
3. ✅ Engineering Specifications
4. ✅ Engineering Work Management
5. ✅ Platform Operations
6. ✅ Execution Governance
7. ✅ Master Plan
8. ✅ Enterprise Reference Model

### Next: Wave 1 Implementation

1. ✅ Infrastructure (Team A) — backend infrastructure complete
2. ✅ Identity (Team B) — auth, IAM, RBAC implemented
3. ✅ Backend Foundation (Team E) — 32 modules, ~428 endpoints, three-tier architecture
4. CI/CD (Team A / DevEx) — placeholder created, needs runner configuration
5. Developer Platform (DevEx) — developer apps, webhooks implemented

### Wave 1 Foundation Specifications Created

- SEC-0001 Authentication Architecture and User Identity
- SEC-0002 Authorization and RBAC — **implemented strict platform roles `super_admin`/`platform_operator`/`support_agent` in `DUKA-ADMIN/src/services/permissions.js:12`**
- FEAT-0001 User Registration and Login — **implemented `Register.jsx:8` role tab-toggle required + `POST /auth/register {role}` pending + `DUKA-BACKEND RegisterDto`**
- FEAT-0002 Tenant Lifecycle and Isolation — **implemented `normalizeMerchantStatus` + `getMerchantEnriched` isolation**
- API-0001 Authentication API
- API-0002 Tenant Management API — **`GET /admin/merchants` + BFF `GET /bff/admin/merchants` in `businessDashboard.js`; no `/tenants` backend route exists**
- DB-0001 User and Identity Schema
- DB-0002 Tenant Schema
- EVT-0001 User Authentication Events
- EVT-0002 Tenant Lifecycle Events
- UI-0001 Public Website Foundation and Authentication Flows
- UI-0002 Mobile App Foundation and Authentication Flows
- UI-0003 Business Dashboard Foundation and Shell — **implemented `DUKA-ADMIN` shell `App.jsx`, `AdminSidebar`, `AdminDashboard`, `PendingAdmins`, `Settings` live**
- UI-0004 Tenant Dashboard Foundation and Shell

### Wave 1 Work Items Created

- EPIC-0001 Wave 1 — Platform Foundation
- FEAT-0001..FEAT-0007 Foundation Features
- TASK-0001..TASK-0023 Implementation Tasks

### Future Waves

- Wave 2: Runtime, Builder, SDK, CLI
- Wave 3: Mobile, Website, Dashboards
- Wave 4: Commerce, Payments, Orders, Media, Notifications
- Wave 5: AI, Analytics, Integrations, Automation
- Wave 6: Production Hardening, Performance, Security, Observability, Scale


2026-09-20: Backend checkout inspected; live read paths still expose an unversioned definition and nested v0.0.7. Confirmed array-only publish validation, duplicate-release path, cache/rollback and WebP deletion defects. [Cross-stack fix plan](ARCHITECTURE/PUBLISHED_APP_DELIVERY_FIX_PLAN_2026-09-20.md); separate stack TODOs linked there. Status: planned, implementation open.

2026-09-20: Mobile release revalidation/staged adoption and merchant verified publish/rollback implemented. Local tests and web/Android/iOS bundle builds passed. [Client delivery report](mobile/PUBLISHED_APP_DELIVERY_CLIENT_IMPLEMENTATION_2026-09-20.md). Backend and device release gates remain open.

2026-09-20: Fixed manifest root-tab rendering and tenant splash lifecycle; removed injected operational text. [Splash/tab ownership report](mobile/SPLASH_AND_MANIFEST_TABS_2026-09-20.md); separate verification TODO linked there.
