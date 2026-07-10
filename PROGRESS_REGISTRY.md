# DUKADESK Progress Registry

**Last Updated:** 2026-07-10

## Status Key
- ✅ Complete — Production ready
- 🔧 In Progress — Actively being built
- ⏳ Planned — Not yet started
- ❌ Blocked — Has dependencies not yet met

## Platform Infrastructure

| Component | Status | Notes |
|-----------|--------|-------|
| Runtime Engine | 🔧 In Progress | Screen rendering, component registry, action system working |
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
| Screen Renderer | ✅ Complete | Layout path + children path working |
| Component Registry | 🔧 In Progress | 50+ components registered. Some unused, some incomplete |
| Section Components | 🔧 In Progress | CategoryPills, MenuGrid, etc. wired to actions. AddressForm, CartSummary added |
| Action Engine | ✅ Complete | All 21 ActionType values have registered handlers |
| Cart Flow | 🔧 In Progress | Add/remove works. Checkout screen exists |
| Orders | 🔧 In Progress | Order history + order detail screens for both tenants |
| Notifications | 🔧 In Progress | List rendered. Dismiss + markAllRead + tap-to-screen working |
| Booking (MK only) | 🔧 In Progress | Calendar/slot selection, confirm API action working |
| Splash Screen | ✅ Complete | Branded splash with logo + initials fallback |
| Filter/Category | ✅ Complete | Category pills emit events, MenuGridSection filters items |

## Backend

| Component | Status | Notes |
|-----------|--------|-------|
| API Design | ⏳ Planned | Not yet implemented |
| Data Model | ⏳ Planned | Not yet implemented |
| Tenant System | ⏳ Planned | Not yet implemented |

## Builder & Dashboards

| Component | Status | Notes |
|-----------|--------|-------|
| Builder Studio Architecture | ✅ Complete | KB-022 — Builder Studio Architecture defined |
| Desk Builder | ✅ Complete | KB-023 — Desk Builder Specification defined |
| Screen & Layout Builder | ✅ Complete | KB-024 — Screen & Layout Builder defined |
| Workflow Builder | ✅ Complete | KB-025 — Workflow Builder defined |
| Form Builder | ✅ Complete | KB-026 — Form Builder Specification defined |
| Theme Builder | ✅ Complete | KB-027 — Theme Builder defined |
| Data Model Builder | ✅ Complete | KB-028 — Data Model Builder defined |
| Preview Runtime | ✅ Complete | KB-029 — Preview Runtime defined |
| Validation Engine | ✅ Complete | KB-030 — Validation Engine defined |
| Publishing Pipeline | ✅ Complete | KB-031 — Publishing Pipeline defined |
| SDUI Authoring | ⏳ Planned | Not yet started |
| Business Dashboard | ⏳ Planned | Not yet started |
| Tenant Dashboard | ⏳ Planned | Not yet started |

## SDUI & Data Layer

| Component | Status | Notes |
|-----------|--------|-------|
| Mock Client | ✅ Complete | JSON-backed mock for all API methods |
| ApiClient Interface | ✅ Complete | getManifest, getTheme, getNavigation, getScreen, getAssetUrl |
| Tenant Data (MK) | ✅ Complete | Mama's Kitchen — menu, orders, offers, info, notifications, booking, checkout |
| Tenant Data (GP) | ✅ Complete | Grace Pharmacy — products, orders, offers, info, notifications, checkout |
| Asset System | ✅ Complete | getAssetUrl returns string \| number. Mock serves local require'd assets |

## Known Gaps
1. MenuGridSection needs per-item RuntimeNodes for action system add_to_cart
2. FormEngine (multi-step forms) not yet wired to FormDataContext
3. No backend exists — all data is mocked
4. Screen & Layout Builder (KB-024) through Publishing Pipeline (KB-031) not yet started
5. No persistence layer for form data across app restarts

## Marketplace

| Component | Status | Notes |
|-----------|--------|-------|
| Marketplace Architecture | ✅ Complete | KB-032 — Marketplace Architecture defined |
| Package & Artifact Specification | ✅ Complete | KB-033 — Package & Artifact Specification defined |
| Extension & Plugin Framework | ⏳ Planned | KB-034 — Not yet started |
| Capability Marketplace | ⏳ Planned | KB-035 — Not yet started |
| Component Marketplace | ⏳ Planned | KB-036 — Not yet started |
| Theme Marketplace | ⏳ Planned | KB-037 — Not yet started |
| Template Marketplace | ⏳ Planned | KB-038 — Not yet started |
| Marketplace Certification & Trust | ⏳ Planned | KB-039 — Not yet started |
| Marketplace Distribution & Lifecycle | ⏳ Planned | KB-040 — Not yet started |

## ADR Registry

| ID | Title | Status | Date |
|----|-------|--------|------|
| ADR-001 | Runtime Engine Architecture | ✅ Accepted | 2026-06-01 |
| ADR-002 | Data-Driven Screen System | ✅ Accepted | 2026-06-05 |
| ADR-003 | Action System Design | ✅ Accepted | 2026-06-10 |
| ADR-004 | Event Bus for Cross-Component Communication | ✅ Accepted | 2026-06-30 |
| ADR-005 | Branded Splash Screen | ✅ Accepted | 2026-07-09 |
| ADR-006 | Knowledge Base Initialization | ✅ Accepted | 2026-07-09 |
