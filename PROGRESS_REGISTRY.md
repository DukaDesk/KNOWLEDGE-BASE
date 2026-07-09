# DUKADESK Progress Registry

**Last Updated:** 2026-07-09

## Status Key

- ✅ **Complete** — Production ready
- 🔧 **In Progress** — Actively being built
- ⏳ **Planned** — Not yet started
- ❌ **Blocked** — Has dependencies not yet met

## Platform Infrastructure

| Component | Status | Notes |
|-----------|--------|-------|
| Runtime Engine | 🔧 In Progress | Screen rendering, component registry, action system working. Layout engine incomplete (node-level layout/children/visibleWhen not evaluated) |
| Module System | 🔧 In Progress | Module registry working with default screens |
| Manifest Resolver | ✅ Complete | Fetches tenant data, merges module defaults with tenant overrides |
| Network Layer | ✅ Complete | Axios-based, interceptors, offline queue, caching |
| Auth System | ✅ Complete | Login/signup/reset flow, session management |
| State Management | 🔧 In Progress | Zustand stores. CartStore works, form state pending |
| Event Bus | ✅ Complete | Pub/sub for cross-component communication |
| Error Boundary | ✅ Complete | Component-level error catching |

## Mobile App (React Native / Expo)

| Component | Status | Notes |
|-----------|--------|-------|
| Explore/Home Screen | ✅ Complete | Store discovery, search |
| Desk Screen | 🔧 In Progress | Tab navigation, screen switching, splash screen working |
| Screen Renderer | 🔧 In Progress | Layout path works, children path works. node-level `visibleWhen`, `children`, `layout` not evaluated |
| Component Registry | 🔧 In Progress | 50+ components registered. Some unused, some incomplete |
| Section Components | 🔧 In Progress | CategoryPills, MenuGrid, InfoList, OrderHistory, EmptyState, ReportAction wired to actions. AddressForm, CartSummary added |
| Action Engine | 🔧 In Progress | 15+ handlers. `submit_form`, `open_modal`, `close_modal`, `authenticate`, `scan_qr` handlers missing/partial |
| Cart Flow | 🔧 In Progress | Add/remove works. Checkout screen exists |
| Orders | 🔧 In Progress | Order history rendered. No order detail screen |
| Notifications | 🔧 In Progress | Notification list rendered. Dismiss + markAllRead + tap-to-screen working |
| Booking (MK only) | 🔧 In Progress | Booking screen rendered, confirm API action works. Calendar/slot selection UI present |
| Splash Screen | ✅ Complete | Branded splash with logo image + initials fallback |
| Filter/Category | ✅ Complete | Category pills emit events, MenuGridSection filters items |

## Backend

| Component | Status | Notes |
|-----------|--------|-------|
| API Design | ⏳ Planned | Not yet implemented |
| Data Model | ⏳ Planned | Not yet implemented |
| Tenant System | ⏳ Planned | Not yet implemented |

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

1. `RuntimeActionHandler` type fixed to 1 arg. All components updated.
2. `MenuGridSection` needs per-item RuntimeNodes for action system add_to_cart (currently uses internal store call + payload dispatch)
3. `submit_form` handler emits event + calls API. No form data context yet.
4. No order detail screen exists for any tenant.
5. node-level `visibleWhen`, `children`, `layout` defined in types but never evaluated by engine.
