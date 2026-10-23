# Backend Progress

This file tracks the current state of the backend implementation repository. **Terminology:** an **app** is the published experience owned by a **merchant**; **users** are mobile customers. Legacy backend paths may still contain `tenant`, but app-owner reads and writes use the `/api/v1/app/*` scope.

**KB Version:** 0.3.8
**Last Updated:** 2026-10-23

## Active Work

Primary open plan: [Published app delivery backend TODO](PUBLISHED_APP_DELIVERY_BACKEND_TODO.md) (B1–B6 implemented 2026-09-24; **B4 migration applied in production 2026-09-26/27**; **B7 runtime compatibility contract + merchant preflight live 2026-09-27**; B8 live integration evidence remains). Incident checklist: [Published logo and release mismatch TODO](PUBLISHED_LOGO_RELEASE_MISMATCH_TODO.md). Media/folder checklist: [Builder Media API backend TODO](BUILDER_MEDIA_API_BACKEND_TODO.md). Recovery evidence: DUKA-BACKEND `docs/B4_MIGRATION_RUNBOOK.md`.

| Task | Specification | Status | Owner |
|------|---------------|--------|-------|
| Mobile endpoint sync to live OpenAPI 3.0.0 (328 paths) | `GET /api/docs-json` | Complete | Engineering |
| Mobile slug derived from display name | `ManifestResolver.ts` + `DesignStore.js` | Complete | Engineering |
| Demo data unhooked from UI screens | `nearbyStores`, `deskCategories`, `promoAds`, `runtime/tenants/**` | Complete | Engineering |
| `hybridClient.ts` — live-only client replacing mock | `src/services/api/hybridClient.ts` | Complete | Engineering |
| Builder slug field in Splash Screen card | `DesignStore.js` + `SectionPanel.jsx` | Complete | Engineering |
| Client contract alignment after live API migration | `DukaDesk` + `DUKA-MERCHANT/dukadesk` | In Progress | Engineering |
| Published-definition parity verification | App config + mobile manifest | Complete | Engineering |
| Flexible published screen layouts | Merchant layout preservation + mobile layout style support | Complete | Engineering |
| Published app delivery B1–B6 backend | `PUBLISHED_APP_DELIVERY_BACKEND_TODO.md` | Complete (code) / Live verify pending | Backend |
| B4 active-release migration applied in production | `prisma/migrations/20260924000000_add_active_release` | Complete | Backend |
| B7 runtime compatibility contract + merchant preflight | `GET /api/v1/compatibility`, `POST /merchants/:id/publishing/preflight` | Complete (deployed 2026-09-27) | Backend |
| Media folderId FK fix + storage URL retention | `media.service.ts` | Complete | Backend |
| E2E integration tests for all modules | KB v0.2.0 | In Progress (platform admin e2e: 22 supertest cases across 3 suites — authorization, messaging, plan quota; other modules pending) | Engineering |
| Rate limiting and throttling configuration | KB v0.2.0 | In Progress | Backend |

## Completed Milestones

| Date | Milestone | Notes |
|------|-----------|-------|
| 2026-10-23 | Platform messaging + plan quota e2e | 13 new supertest cases: `AdminMessagingController` (401, audited role denials, operator inbox filters, broadcast payload, DTO validation before service, thread/reply/retract, immediate revocation) and `PlatformAdminController` plan routes (401, audited `operations` denial, operator `limits.dailyPromoPosts` save, plan reads). E2E 22/22 across 3 suites; unit 230/230 across 30 suites; lint 0 errors / 60 warnings; build 0 issues. `npx prisma generate` required after announcement models |
| 2026-10-20 | Direct-API authorization e2e | 9 supertest cases against the real `AdminController` + `PlatformRoleGuard`: 401, 403 + `access.denied` audit, missing/revoked roles, `operations` vs `platform_operator`, app-review approval, super-admin-only invites; CI runs `npm run test:e2e` after 201 unit tests |
| 2026-07 | Phase 2 — Core Platform | Auth, IAM, Tenants, Builder, Commerce, Media |
| 2026-07 | Phase 2.5 — Notification Platform | Templates, campaigns, SMS, push, analytics |
| 2026-07 | Phase 3a — Gap Filling | Theme module, Commerce unified catalog + inventory, Booking locations/reminders/cancellation policies |
| 2026-07 | Phase 3b — Adapters & Connectors | Email/Push/Stripe adapters, Anthropic provider, SendGrid & Google Calendar connectors |
| 2026-07 | Deployment Readiness | Dockerfile, CI/CD pipeline, health checks, Railway config |
| 2026-07 | Profile Deactivation & Deletion | 30-day soft deactivation flow, hard delete for GDPR/Apple/Google, admin cleanup endpoint, BFF mobile endpoints |
| 2026-09 | Three-tier API Architecture | Website (Platform) / App (Tenant Self-Service) / Mobile (Consumer) split; "tenant" → "merchant" terminology |
| 2026-09 | App/Public Controller Split | All 13 tenant modules split into App + Public controllers |
| 2026-09 | Publish Permission Fix | Allow owner + manager roles (was owner only); NOT_OWNER error code |
| 2026-09 | TASK-0025: Customizable Dashboard | Widget data resolution, BFF business dashboard wired, DTOs, widget type registry |
| 2026-09 | Mobile endpoint sync | All 328 live OpenAPI paths verified; `/tenants`→`/merchants`, `/app/*` for authenticated mobile, `unwrap()` on all endpoints; demo data unhooked; `hybridClient.ts` live-only; slug derived from displayName |
| 2026-09 | Draft/Published Split | Private drafts (DraftPage/DraftSection/DraftComponent), immutable releases, manifest-first reads, template versioning, media MIME validation, shared asset pool |
| 2026-09 | P0 Admin Dashboard Fixes | Status enum validation, Number() pagination, POST users approve/reject, DELETE merchants soft-delete, analytics optional tenantId |
| 2026-09 | P0 Admin Fixes v2 | UserStatus enum +pending/+rejected, case-insensitive status filter, GET /admin/users/tenant/:tenantId alias, body+query invite, Swagger @ApiQuery decorators |
| 2026-09 | P0 tenantUsers Prisma Fix | Fixed tenantUsers→tenants (correct Prisma relation), dropped invalid role include (enum), added admin maintenance/policies stubs |
| 2026-09 | Merchant reject + stats | TenantStatus +rejected, POST /admin/merchants/:id/reject with rejectionReason, GET /admin/merchants/stats by status |
| 2026-09 | Published logo/release mismatch fix | S3-compatible StorageService, manifest body on publish, body limits, publish creates new Release directly |
| 2026-09 | Publishing defect fixes | Screen format normalization (array/object/string), duplicate release prevention, rollback cache invalidation, WebP self-delete guard |
| 2026-09 | Admin Portal live integration | Unblocked `Admin-portal` `https://github.com/DukaDesk/DUKA-ADMIN` — fixed `UsersService.listUsers` `tenantUsers→tenants` (`users.service.ts:59`), added `admin/maintenance` + `admin/policies` stubs 404→empty, `RegisterDto` required `role` + `AuthService` sets `status:'pending'` + `UserRole`, envelope `TransformInterceptor` handling, `EnhancedRemoteTablePage` `users` envelope + `pending→draft` mapping (`3ece1cd`) |
| 2026-09 | Orders/Products/Customers live | `317a549` — Commerce `GET /app/commerce/orders|products` + `adjust-stock`, `GET /admin/users/merchant/:id` tenant users, `da83369` customers per-merchant filter |
| 2026-09 | Merchant decline + counts + Bell | `47f61e2` `totalTenants→totalMerchants` + `GET /marketplace/stats`; `bb05d76` `Bell` icon; `6588a6a` `TenantStatus` `+rejected`, `AdminService:40` `rejectTenant` with `config.rejectionReason`, `POST /admin/merchants/:id/reject` review card |
| 2026-09-24 | Published app delivery B1–B6 | Canonical `ActiveReleaseService`, `ManifestValidator` (1.0.0 object screens), atomic release/activation + `activeReleaseId`, Idempotency-Key, owner/manager authz on publish/rollback, media `folderId` resolve + storage URLs, default merchant app seed, `ApiQuotaGuard`, unit suites (`manifest-validator`, `publishing`, `active-release`, `media`, press-action round-trip). B4 migration file written (not yet applied). |
| 2026-09-27 | B4 applied + B7 contract live | `20260924000000_add_active_release` applied on deploy `a00865ae` (backfill 0 rows — `releases` empty) after baseline recovery (7× `migrate resolve --applied`, stale rolled-back row removed); `preDeployCommand` now `npm run predeploy` and `tsconfig.json` ships to the runner so the seed runs (3 templates, `acme-store`). **B7** (deploy `717d7d8d`): `GET /api/v1/compatibility` serves contract `dukadesk.published-app-runtime` 1.0.0 (35 components / 10 actions / 16 capabilities / limits), `POST /merchants/:id/publishing/preflight` dry-runs a manifest or the compiled drafts, publish enforces the contract (422 `INCOMPATIBLE_RUNTIME`), discovery filters to activated tenants and projects the active release identity. Evidence: DUKA-BACKEND `docs/B4_MIGRATION_RUNBOOK.md`. |
| 2026-10-01 | Two-stage approval backend | `81fb6fd` — separate `verificationStatus/appStatus` (legacy `TenantStatus` untouched), `KycSubmission` + migration, merchant KYC submit + app submit-review, admin verify/review/preview/approve-app (via `publishAsAdmin` owner-guard bypass) + review bundle + queue filters |
| 2026-09-30 | Invite-only admin signup | `ef05547` — `AdminInvite` model + migration (unique token, 7-day expiry, used/revoked tracking), `AdminInviteService` (dual-provided Auth+Admin modules), `RegisterDto.inviteToken`, `register()` requires token on role path (active + tokens immediately; merchant self-serve without role untouched), `POST/GET/DELETE /admin/invites` + public `GET /auth/invites/validate` |
| 2026-10-13 | Production media storage on Cloudflare R2 | `3bef824` (deploy `6261e2ac`) — `STORAGE_PROVIDER=s3` + `STORAGE_ENDPOINT=https://a846cd1ad03fb3b24935790348aa5d07.r2.cloudflarestorage.com` + `STORAGE_REGION=auto` + `STORAGE_BUCKET=dukadesk` + `CDN_URL=https://pub-7ed3e12a1d58436aa69b237283e39b66.r2.dev` set on Railway prod + local `.env`; `storage.service.ts` `baseUrl` prefers `CDN_URL` in S3 mode (was returning the signed S3 endpoint, which 400s anonymously). Verified: authenticated `POST /api/v1/app/media/upload` → r2.dev URLs; anonymous GET original + small/medium/large variants → 200 `image/webp`; objects listed in bucket. Caveat: pre-R2 DB rows still hold signed-endpoint URLs (fail anonymously) → merchants must re-upload; logo live re-test still partially open. |
| 2026-10-18 | Platform role separation, support tickets, governed policies, report exports | Branch `fix/platform-role-authorization` — `platform_operator` and `operations` are now distinct DB roles (migration `20261018000000_platform_operator_role` backfills global `operations` assignments → `platform_operator`, adds `merchant-apps:review`, grants it to `super_admin` + `operations`); `auth.service`/`admin-invite.service`/`platform-role.guard`/`users.service` no longer collapse the two. New models `SupportTicket`/`SupportTicketEvent`/`PlatformPolicy` (migration `20261018010000_support_tickets_and_policies`) with `GET/POST /api/v1/admin/support-tickets` (+`:id/assign|escalate|resolve|comments`; `support_agent` allowed via method-level guard) and governed `/api/v1/admin/policies` (`draft→in_review→published→archived`, version bump, `super_admin`-only publish/archive). Added `GET /api/v1/admin/reports/:report/export` (allow-listed `subscriptions`/`support-tickets`/`policies`, `super_admin`/`platform_operator`, cap 5000, CSV formula-injection guard, `report.export` audit). All mutations write `auditLog` in a `$transaction`. Backend build 0 issues; jest 188/188. |

## Modules Implemented

| # | Module | Status | Endpoints |
|---|--------|--------|-----------|
| 1 | Auth & IAM | Complete | 14 |
| 2 | Profile & Users | Complete | 12 (split: App + Public) |
| 3 | Merchants | Complete | 11 (split: App + Public) |
| 4 | Templates | Complete | 3 |
| 5 | Builder (SDUI) | Complete | 28 (split: App + Public) |
| 6 | Renderer | Complete | 2 |
| 7 | Commerce | Complete | 46 (split: App + Public) |
| 8 | Media / DAM | Complete | 10 (App) |
| 9 | QR Codes | Complete | 2 |
| 10 | Discovery | Complete | 4 |
| 11 | Admin | Complete | 13 |
| 12 | Notifications | Complete | 21 (split: App + Public) |
| 13 | Publishing | Complete | 6 |
| 14 | Booking & Scheduling | Complete | 40 (split: App + Public) |
| 15 | Forms & Workflow | Complete | 13 (split: App + Public) |
| 16 | Payments | Complete | 12 (split: App + Public) |
| 17 | Theme | Complete | 8 (split: App + Public) |
| 18 | Integrations | Complete | 10 (split: App + Public) |
| 19 | Analytics & BI | Complete | 24 (split: App + Public) |
| 20 | Search & Discovery | Complete | 11 (split: App + Public) |
| 21 | AI Platform | Complete | 13 |
| 22 | Platform Administration | Complete | 27 |
| 23 | Infrastructure & DevOps | Complete | 18 |
| 24 | Security & Compliance | Complete | 11 (split: App + Public) |
| 25 | Developer Platform | Complete | 16 |
| 26 | Marketplace & Plugins | Complete | 13 |
| 27 | Asset Platform Enhanced | Complete | 17 |
| 28 | BFF - Website | Complete | 3 |
| 29 | BFF - Tenant Dashboard | Complete | 3 |
| 30 | BFF - Mobile | Complete | 9 |
| 31 | BFF - Business Dashboard | Complete | 6 |
| 32 | Health | Complete | 1 |
| | **TOTAL** | | **~437** |

## Architecture: Endpoint Model (ADR-016 product language)

| Tier | Path Prefix | Audience | Auth | Purpose |
|------|-------------|----------|------|---------|
| **Website (Platform)** | `/admin/*`, `/auth/*`, `/discovery/*`, `/templates/*`, `/bff/website/*` | Platform operators | JWT / Public | Registration, merchant creation, admin ops |
| **App (Merchant Self-Service)** | `/app/*` | Merchant owners/managers | JWT + `@CurrentUser` | Write + config for own merchant app (auto-resolved via `TenantResolverService` — code name) |
| **Mobile/Consumer** | `/merchants/:merchantId/*` | End users (public) | `@Public()` | Read-only catalog, booking, checkout |
| **Platform Admin BFF** | `/bff/admin/*` | Platform operators | JWT | Aggregated ops views |

**Merchant Resolution:** `TenantResolverService` (code name) finds `TenantUser` where `role IN ['owner','manager']` and `status='active'`, picks first with `owner` priority.

**Controller Pattern:**
- `*AppController` — JWT + `@CurrentUser`, auto-resolves tenantId
- `*PublicController` — `@Public()` with explicit `:merchantId` param

## Blockers

| Issue | Impact | Owner |
|-------|--------|-------|
| — | — | — |

## Client implementation alignment (2026-09-18)

The backend contract is implemented and deployed, but the two clients are at different
integration stages:

- **DukaDesk mobile:** live discovery, published-definition resolution, BFF manifest
  fallback, authenticated `/app/commerce/*` cart/order/tax calls, and guest-mode
  gating are wired. Identity, nearby discovery, order history, and order detail
  now use live endpoint modules rather than repository demo records. The deployed
  BFF may return the published runtime screens under
  `data.config.config.deployed.screens`, `data.config.config.screens`, or the
  older `data.config.screens`; the mobile resolver handles all three shapes.
  Published storefront manifests also support the merchant editor's
  `promotion_list` component; the mobile runtime renders its offer cards
  instead of showing an unsupported-component fallback.
  TypeScript and Jest validation are part of the client quality gate.
- **DUKA-MERCHANT/dukadesk:** dashboard, builder, app configuration, publishing,
  public definition reads, and BFF manifest parity checks are wired. Design/config
  persistence uses `/api/v1/app/merchants/config`; the removed
  `/merchants/:id/publishing/draft` shortcut was not part of the current contract.
- **Publishing pipeline validation:** release history is fetched once per publish,
  preventing version calculation and release persistence from diverging when the
  history provider is transient or mocked. Empty screen collections still receive
  the documented template fallback, while existing screen definitions are preserved.
- **Client validation (2026-09-18):** merchant production build and complete Vitest
  suite pass; DukaDesk Jest suite passes (45 tests) and its TypeScript check passes.
- **Backend-dependent gaps:** saved addresses and payment methods remain blocked
  until their APIs are implemented. The mobile profile screens show an explicit
  unavailable state; live flows must not silently promote demo records.

## Next Up

- Merchants re-publish (B8 pre-condition) — 4 tenants report `status=published` with no published production release
- Merchants re-upload media/logos (pre-R2 signed-endpoint URLs fail anonymous GETs) — precondition for logo anonymous-GET verification
- Live e2e publish/rollback/read-path/media evidence (B8) — anonymous media GET now verified for post-R2 uploads (2026-10-13)
- E2E integration tests for all modules
- Rate limiting and throttling configuration (quota defaults + docs)
- API versioning strategy (v2 planning)
- Performance optimization and query tuning
- Monitoring and alerting setup

## Technology Stack

| Component | Technology |
|-----------|-----------|
| Runtime | Node.js / TypeScript 6.x |
| Framework | NestJS v11.x |
| Database | PostgreSQL 16 |
| ORM | Prisma 6.x |
| Queue | Bull (Redis) |
| Cache | Redis (ioredis) |
| Auth | Passport.js (JWT, Google, Apple) |
| API Docs | Swagger / OpenAPI |
| Logging | Pino |
| Testing | Jest + Supertest |
| Container | Docker + Docker Compose |

## Deployment

- **Platform:** Railway (via `railway.json`)
- **Health check:** `/api/v1/health`
- **Build command:** `npm run build`
- **Start command:** `npm run start:prod`
- **Pre-deploy:** `npm run predeploy` (`prisma migrate deploy && prisma db seed`) — both commands must stay inside one npm script; a raw `&&` string in `preDeployCommand` only executed the first command
- **Media storage:** Cloudflare R2 (S3 API) — bucket `dukadesk`, endpoint `https://a846cd1ad03fb3b24935790348aa5d07.r2.cloudflarestorage.com`, region `auto`, public base `CDN_URL=https://pub-7ed3e12a1d58436aa69b237283e39b66.r2.dev` (live since 2026-10-13; keys in Railway secrets)
