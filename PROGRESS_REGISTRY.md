# DUKADESK Progress Registry

**Last Updated:** 2026-07-13

## Status Key

- ✅ **Complete** — Production ready
- 🔧 **In Progress** — Actively being built
- ⏳ **Planned** — Not yet started
- ❌ **Blocked** — Has dependencies not yet met

## Platform Infrastructure

| Component | Status | Notes |
|-----------|--------|-------|
| Runtime Engine | 🔧 In Progress | Screen rendering, component registry, action system working. node-level visibleWhen/children/layout now evaluated in RegistryRenderer |
| Module System | 🔧 In Progress | Module registry working with default screens |
| Manifest Resolver | ✅ Complete | Fetches tenant data, merges module defaults with tenant overrides |
| Network Layer | ✅ Complete | Axios-based, interceptors, offline queue, caching |
| Auth System | ✅ Complete | Login/signup/reset flow, session management |
| State Management | 🔧 In Progress | Zustand stores. CartStore works, form data context implemented |
| Event Bus | ✅ Complete | Pub/sub for cross-component communication |
| Error Boundary | ✅ Complete | Component-level error catching |

## Mobile App (React Native / Expo)

| Component | Status | Notes |
|-----------|--------|-------|
| Explore/Home Screen | ✅ Complete | Store discovery, search |
| Desk Screen | 🔧 In Progress | Tab navigation, screen switching, splash screen working |
| Screen Renderer | ✅ Complete | Layout path works, children path works. node-level `visibleWhen`, `children`, `layout` evaluated |
| Component Registry | 🔧 In Progress | 50+ components registered. Some unused, some incomplete |
| Section Components | 🔧 In Progress | CategoryPills, MenuGrid, InfoList, OrderHistory, EmptyState, ReportAction wired to actions. AddressForm, CartSummary added |
| Action Engine | ✅ Complete | All 21 ActionType values have registered handlers |
| Cart Flow | 🔧 In Progress | Add/remove works. Checkout screen exists |
| Orders | 🔧 In Progress | Order history + order detail screens for both tenants |
| Notifications | 🔧 In Progress | Notification list rendered. Dismiss + markAllRead + tap-to-screen working |
| Booking (MK only) | 🔧 In Progress | Booking screen rendered, confirm API action works. Calendar/slot selection UI present |
| Splash Screen | ✅ Complete | Branded splash with logo image + initials fallback |
| Filter/Category | ✅ Complete | Category pills emit events, MenuGridSection filters items |

## Backend

| Component | Status | Notes |
|-----------|--------|-------|
| Infrastructure (EventBus, RBAC, Redis, Queue, Logger, Health) | ✅ Complete | EventBus, RBAC, Redis mock/real, Bull queues (5), pino structured logging, correlation IDs, health endpoint |
| IAM / Auth | ✅ Complete | Register/login/refresh/logout, JWT + refresh tokens, OTP (Redis-backed), password policy + history, device management, account recovery, Google + Apple Sign-In |
| Users / Profile | ✅ Complete | Profile CRUD, tenant memberships, consent management with scopes and versioning |
| Tenants | ✅ Complete | CRUD, slug uniqueness, publish workflow, runtime config (languages/currency/timezone), subscription plans (Starter/Business/Enterprise) with feature flags, custom domain model (schema-ready) |
| Builder | ✅ Complete | Page → Section → Component hierarchy, ComponentRegistryService (12 types), ActionBuilderService (10 actions), ConditionalEngine, DataBinding, LivePreview |
| Renderer (SDUI) | ✅ Complete | App definition JSON endpoint with theme, navigation, screens; slug-based tenant resolution |
| Publishing Pipeline | ✅ Complete | Validation engine, manifest compiler, release management, draft tracking, Redis cache invalidation, ReleasePublished/RollbackCompleted events |
| Commerce | ✅ Complete | Products (6 types) with variants, categories, cart engine, checkout, orders lifecycle, coupons, tax rules, fulfillments, inventory reservations |
| Booking & Scheduling | ✅ Complete | Services, staff, resources, schedules (recurring + date-specific), availability engine, booking workflow (7 states), waiting list, cancellations, reminders, locations |
| Forms & Workflow | ✅ Complete | Form CRUD with fields/sections/config, validation engine, submission handling, approval workflow engine |
| Payments | ✅ Complete | Paystack + Flutterwave + Stripe adapters, initialize/verify/refund, webhook processing, settlements, provider health checks |
| Notifications | ✅ Complete | In-app, push (Expo/FCM/APNS), email (SendGrid/Resend/SES/SMTP), SMS (Twilio/Termii/AfricaTalking), templates, campaigns, preferences, device tokens, delivery tracking |
| Media / DAM | ✅ Complete | Upload with Sharp optimization (webp, 5 variant presets), folders, version tracking, hash-based dedup |
| Theme | ✅ Complete | CRUD with versioning, ThemeCompiler for SDUI token bundles (light/dark), restore/reset, Redis caching |
| QR | ✅ Complete | QR metadata generation with deep-link format, slug → tenant resolution |
| Discovery | ✅ Complete | Featured tenants, case-insensitive search, 12 vertical categories, stub nearby |
| Admin | ✅ Complete | Approve/suspend tenants, platform stats, stub admin verification |
| Integrations | ✅ Complete | SendGrid + Google Calendar connectors, OAuth token management, webhook outbox, sync jobs with exponential backoff |
| Analytics & BI | ✅ Complete | Events, dashboards, widgets, saved reports, revenue/user/booking analytics |
| Search & Discovery | ✅ Complete | Search index, synonyms, autocomplete, facets, popular searches |
| AI Platform | ✅ Complete | OpenAI + Anthropic + Mock providers, completions, embeddings, prompt CRUD with variable rendering, usage stats |
| Platform Admin | ✅ Complete | Settings, system announcements, feature flags, plan/subscription management, API quotas, platform stats |
| Security & Compliance | ✅ Complete | Security policies, API key management (SHA-256), security events, consent audits |
| Developer Platform | ✅ Complete | Developer apps, webhook endpoints with delivery/retry, event logs, rate limit status |
| Marketplace & Plugins | ✅ Complete | Plugin listings, install/uninstall/toggle/config, plugin stats |
| Assets Enhanced | ✅ Complete | Collections, shares, storage providers, transformation presets |
| BFF Layer | ✅ Complete | Mobile (manifest, discovery, profile, notifications, catalog), Tenant Dashboard (summary, analytics, integrations), Business Dashboard (overview, tenant list, audit logs), Website (categories, featured tenants, pricing) |
| Gateway | ✅ Complete | Redis-backed sliding window rate limiter |
| Infrastructure (DevOps) | ✅ Complete | Deployments, environments, health checks, backups, cache management |
| CI/CD | ✅ Complete | GitHub Actions (lint → build → test), Docker multi-stage build, Railway deploy config with preDeployCommand + healthcheck |

## Builder

| Component | Status | Notes |
|-----------|--------|-------|
| Visual Builder | ⏳ Planned | Not yet started |
| SDUI Authoring | ⏳ Planned | Not yet started |

## Dashboards

| Component | Status | Notes |
|-----------|--------|-------|
| Business Dashboard | ⏳ Planned | Not yet started |
| Tenant Dashboard | ⏳ Planned | Not yet started |

## SDUI & Data Layer

| Component | Status | Notes |
|-----------|--------|-------|
| Mock Client | ✅ Complete | JSON-backed mock for all API methods |
| ApiClient Interface | ✅ Complete | `getManifest`, `getTheme`, `getNavigation`, `getScreen`, `getAssetUrl` |
| Tenant Data (MK) | ✅ Complete | Mama's Kitchen — menu, orders, offers, info, notifications, booking, checkout |
| Tenant Data (GP) | ✅ Complete | Grace Pharmacy — products, orders, offers, info, notifications, checkout |
| Asset System | ✅ Complete | `getAssetUrl` returns `string | number`. Mock serves local require'd assets |

## Known Gaps

1. `MenuGridSection` needs per-item RuntimeNodes for action system add_to_cart (currently uses internal store call + payload dispatch)
2. `FormEngine` (multi-step forms) not yet wired to FormDataContext — standalone `AddressFormSection` is
3. Builder, dashboards not yet started
4. No persistence layer for form data across app restarts
5. Backend has no `TenantDomain` CRUD service yet — custom domain model is schema-only; DNS verification + SSL auto-provisioning not implemented
