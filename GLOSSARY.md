# DUKADESK Platform Glossary

**Last Updated:** 2026-07-09

## Core Concepts

| Term | Definition |
|------|------------|
| Tenant | A business or organization that uses DUKADESK |
| Desk | The primary tenant-facing interface — a branded, screen-driven experience |
| Screen | A distinct view within a Desk, defined by a ScreenDefinition |
| RuntimeNode | The fundamental unit of a screen's component tree (type, key, props, actions) |
| Action System | A data-driven mechanism mapping named actions to handler functions |
| ActionDef | An action definition with type, payload, and label |
| EventBus | A lightweight pub/sub system for cross-component communication |
| Capability | A declared feature a tenant supports (e.g., catalog, cart, checkout) |
| Module | A packaged set of default screens and components for a capability |
| Manifest | The tenant's declaration file containing version, capabilities, theme references |
| Component Registry | A map of component type names to React Native component implementations |
| SDUI | Server-Driven UI — pattern where the server defines UI via JSON |

## Action Types

| Type | Purpose | Status |
|------|---------|--------|
| `navigate` / `push` / `replace` | Expo Router navigation | Active |
| `pop` | Go back | Active |
| `switch_screen` | Switch desk screen by ID | Active |
| `add_to_cart` / `remove_from_cart` | Cart operations | Active |
| `checkout` | Navigate to checkout | Active |
| `api_request` | Make HTTP request | Active |
| `submit_form` | Submit form data | Active |
| `filter` | Emit filter:changed event | Active |
| `open_url` / `open_maps` / `call_phone` / `email` / `share` / `download` | Communication | Active |
| `logout` / `switch_tenant` | Session management | Active |
| `open_modal` / `close_modal` / `authenticate` / `scan_qr` | Planned | Planned |

## Component Types

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
| `calendar_strip` / `slot_grid` / `booking_summary` | Booking UI | Active |
| `cart_summary` / `address_form` | Checkout UI | Active |
| `hero_banner` / `promotion_list` | Marketing UI | Active |

## Architecture Patterns

### Data Flow
`Tenant JSON` → `ManifestResolver` → `ResolvedTenant` → `ScreenRenderer` → `RegistryRenderer` → `Component` → `ActionEngine` → `EventBus / Api / Router`

### Screen Switching
Within a Desk, screens are switched by `screenId` via `setActiveScreen()`. The EventBus action `switch_screen` emits `navigation:switch_screen`.

### Cross-Component Communication
Sibling components communicate via EventBus events, not through React props or state.
