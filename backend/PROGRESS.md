# Backend Progress

This file tracks the current state of the backend implementation repository.

**KB Version:** 0.3.0
**Last Updated:** 2026-09-14

## Active Work

| Task | Specification | Status | Owner |
|------|---------------|--------|-------|
| Mobile endpoint sync to live OpenAPI 3.0.0 (328 paths) | `GET /api/docs-json` | Complete | Engineering |
| Mobile slug derived from display name | `ManifestResolver.ts` + `DesignStore.js` | Complete | Engineering |
| Demo data unhooked from UI screens | `nearbyStores`, `deskCategories`, `promoAds`, `runtime/tenants/**` | Complete | Engineering |
| `hybridClient.ts` — live-only client replacing mock | `src/services/api/hybridClient.ts` | Complete | Engineering |
| Builder slug field in Splash Screen card | `DesignStore.js` + `SectionPanel.jsx` | Complete | Engineering |
| E2E integration tests for all modules | KB v0.2.0 | Pending | Engineering |
| Rate limiting and throttling configuration | KB v0.2.0 | Pending | Engineering |

## Completed Milestones

| Date | Milestone | Notes |
|------|-----------|-------|
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

## Modules Implemented

| # | Module | Status | Endpoints |
|---|--------|--------|-----------|
| 1 | Auth & IAM | Complete | 14 |
| 2 | Profile & Users | Complete | 10 |
| 3 | Merchants | Complete | 11 (split: App + Public) |
| 4 | Templates | Complete | 3 |
| 5 | Builder (SDUI) | Complete | 28 (split: App + Public) |
| 6 | Renderer | Complete | 2 |
| 7 | Commerce | Complete | 46 (split: App + Public) |
| 8 | Media / DAM | Complete | 10 (App) |
| 9 | QR Codes | Complete | 2 |
| 10 | Discovery | Complete | 4 |
| 11 | Admin | Complete | 10 |
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
| | **TOTAL** | | **~434** |

## Architecture: Three-Tier Endpoint Model

| Tier | Path Prefix | Audience | Auth | Purpose |
|------|-------------|----------|------|---------|
| **Website (Platform)** | `/admin/*`, `/auth/*`, `/discovery/*`, `/templates/*`, `/bff/website/*` | Platform operators | JWT / Public | Registration, tenant creation, admin ops |
| **App (Tenant Self-Service)** | `/app/*` | Tenant owners/managers | JWT + `@CurrentUser` | Write + config for own tenant (auto-resolved via `TenantResolverService`) |
| **Mobile/Consumer** | `/merchants/:merchantId/*` | End users (public) | `@Public()` | Read-only catalog, booking, checkout |

**Tenant Resolution:** `TenantResolverService` finds `TenantUser` where `role IN ['owner','manager']` and `status='active'`, picks first with `owner` priority.

**Controller Pattern:**
- `*AppController` — JWT + `@CurrentUser`, auto-resolves tenantId
- `*PublicController` — `@Public()` with explicit `:merchantId` param

## Blockers

| Issue | Impact | Owner |
|-------|--------|-------|
| — | — | — |

## Next Up

- E2E integration tests for all modules
- Rate limiting and throttling configuration
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
