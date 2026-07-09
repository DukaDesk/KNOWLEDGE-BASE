# KB-005 — Platform Terminology & Glossary

**Part I — Foundation | Terminology & Glossary**

| Metadata | Value |
|----------|-------|
| KB-ID | KB-005 |
| Title | Platform Terminology & Glossary |
| Version | 0.1.0 |
| Status | Drafting |
| Owner | Engineering |
| Review Status | Not Reviewed |
| Last Updated | 2026-07-09 |
| Depends On | KB-001 |
| Required By | All KB documents, all specifications |

## 1. Core Concepts

| Term | Definition | Context | Aliases |
|------|------------|---------|---------|
| Tenant | A business or organization that uses DUKADESK | Platform | — |
| Desk | The primary tenant-facing interface — a branded, screen-driven experience | Mobile | — |
| Screen | A distinct view within a Desk, defined by a ScreenDefinition | Runtime | — |
| RuntimeNode | The fundamental unit of a screen's component tree | Runtime | Node |
| Action System | A data-driven mechanism mapping named actions to handler functions | Runtime | — |
| ActionDef | An action definition with type, payload, and label | Runtime | Action |
| EventBus | A lightweight pub/sub system for cross-component communication | Runtime | — |
| Capability | A declared feature a tenant supports | Platform | Feature |
| Module | A packaged set of default screens and components for a capability | Runtime | — |
| Manifest | The tenant's declaration file containing version, capabilities, theme | Data | — |
| Component Registry | A map of component type names to component implementations | Runtime | — |
| SDUI | Server-Driven UI — architectural pattern where the server defines UI via JSON | Architecture | — |

## 2. Action Types

| Type | Purpose | Status |
|------|---------|--------|
| `navigate` | Push Expo Router route | Active |
| `replace` | Replace Expo Router route | Active |
| `push` | Push Expo Router route | Active |
| `pop` | Go back | Active |
| `switch_screen` | Switch desk screen by ID | Active |
| `filter` | Emit filter:changed event | Active |
| `add_to_cart` | Add item to cart | Active |
| `remove_from_cart` | Remove item from cart | Active |
| `checkout` | Navigate to checkout | Active |
| `open_url` | Open URL via Linking | Active |
| `open_maps` | Open Google Maps | Active |
| `call_phone` | Phone call via Linking | Active |
| `email` | Open email client | Active |
| `share` | Share via system | Active |
| `download` | Download/Open URL | Active |
| `api_request` | Make HTTP request | Active |
| `submit_form` | Submit form data | Active |
| `logout` | End session, go to sign-in | Active |
| `switch_tenant` | Switch to different tenant | Active |
| `open_modal` | Open modal | Planned |
| `close_modal` | Close modal | Planned |
| `authenticate` | Trigger auth flow | Planned |
| `scan_qr` | QR scan | Planned |

## 3. Component Types

| Type | Purpose | Status |
|------|---------|--------|
| `category_pills` | Horizontal scrollable category filter | Active |
| `menu_grid` | List of menu/product items | Active |
| `dynamic_card` | Individual menu/product card | Active |
| `info_list` | Contact info rows | Active |
| `order_history` | Past order list | Active |
| `empty_state` | Empty state placeholder | Active |
| `report_action` | Form/report block | Active |
| `notification_list` | Notification items | Active |
| `primary_button` | Primary call-to-action button | Active |
| `calendar_strip` | Date picker strip | Active |
| `slot_grid` | Time slot picker | Active |
| `booking_summary` | Booking confirmation summary | Active |
| `cart_summary` | Cart totals + checkout | Active |
| `address_form` | Address input form | Active |
| `hero_banner` | Image banner | Active |
| `promotion_list` | Offers/promotions carousel | Active |

## 4. Architecture Patterns

### Data Flow

`Tenant JSON (API/Mock)` → `ManifestResolver` → `ResolvedTenant` → `ScreenRenderer` → `LayoutRenderer/RegistryRenderer` → `Component` → `ActionEngine` → `EventBus/Api/Router`

### Screen Switching

Within a Desk, screens are switched by `screenId` via `setActiveScreen()`. The EventBus action `switch_screen` emits `navigation:switch_screen` which the Desk subscribes to.

### Cross-Component Communication

Sibling components communicate via EventBus events, not through React props or state. This keeps the renderer agnostic about component relationships.

---

**Parent:** KB-001 — README
**See also:** KB-004 — Core Principles, KB-011 — Naming Standards
