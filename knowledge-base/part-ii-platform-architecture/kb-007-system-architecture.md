# KB-007 — System Architecture

**Part II — Platform Architecture | System Architecture**

| Metadata | Value |
|----------|-------|
| KB-ID | KB-007 |
| Title | System Architecture |
| Version | 0.1.0 |
| Status | Drafting |
| Owner | Engineering |
| Review Status | Not Reviewed |
| Last Updated | 2026-07-09 |
| Depends On | KB-001, KB-006 |
| Required By | KB-008, KB-009, all specifications |

## 1. System Context

```
┌─────────────────────────────────────────────────┐
│                    Client                        │
│  ┌───────────────────────────────────────────┐  │
│  │         React Native / Expo App            │  │
│  │  ┌─────────┐  ┌──────────┐  ┌─────────┐  │  │
│  │  │ Explore  │  │   Auth   │  │  Desk   │  │  │
│  │  │  Screens │  │  Screens │  │ Screens │  │  │
│  │  └─────────┘  └──────────┘  └─────────┘  │  │
│  │                                           │  │
│  │  ┌─────────────────────────────────────┐  │  │
│  │  │         Runtime Engine              │  │  │
│  │  │  ┌────────────┐  ┌───────────────┐  │  │  │
│  │  │  │  Component │  │    Action     │  │  │  │
│  │  │  │  Registry  │  │    Engine     │  │  │  │
│  │  │  └────────────┘  └───────────────┘  │  │  │
│  │  │  ┌────────────┐  ┌───────────────┐  │  │  │
│  │  │  │   Screen   │  │   Event Bus   │  │  │  │
│  │  │  │   Engine   │  │               │  │  │  │
│  │  │  └────────────┘  └───────────────┘  │  │  │
│  │  └─────────────────────────────────────┘  │  │
│  │                                           │  │
│  │  ┌─────────────────────────────────────┐  │  │
│  │  │          ApiClient Interface        │  │  │
│  │  │  ┌──────────┐  ┌─────────────────┐  │  │  │
│  │  │  │  Mock    │  │  HTTP Client    │  │  │  │
│  │  │  │  Client  │  │  (Future)       │  │  │  │
│  │  │  └──────────┘  └─────────────────┘  │  │  │
│  │  └─────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

## 2. Data Flow

```
Tenant JSON
    │
    ▼
ApiClient.getManifest() → Manifest
    │
    ├── ApiClient.getTheme() → ThemeDefinition
    ├── ApiClient.getNavigation() → NavigationDefinition
    └── ApiClient.getScreen() → ScreenDefinition (per screen)
            │
            ▼
    ManifestResolver
            │
            ▼
    ResolvedTenant { manifest, theme, navigation, screens: Map<screenId, ScreenDefinition> }
            │
            ▼
    ScreenRenderer(screenId)
            │
            ├── Screen has layout?
            │   └→ LayoutRenderer(layout.children) → RegistryRenderer per node
            │
            └── Screen has children?
                └→ View(children.map → RegistryRenderer)
                        │
                        ▼
                Component.render(props + actions)
                        │
                        ▼
                User interaction → dispatchAction(actions.someKey)
                        │
                        ▼
                ActionEngine → handler(action, node)
                        │
                        ├── navigate → router.push()
                        ├── switch_screen → EventBus.emit('navigation:switch_screen')
                        ├── filter → EventBus.emit('filter:changed')
                        ├── api_request → network layer request()
                        ├── add_to_cart → tenantStore.addToCart()
                        └── ...
```

## 3. Module System

```
moduleRegistry.getDefaultScreens(capabilityIds)
    │
    ▼
Map<screenId, ScreenDefinition> (module defaults)
    │
    ▼
Overlay with tenant manifest screens
    │
    ▼
Final Map<screenId, ScreenDefinition>
```

Modules provide baseline implementations. Tenant screens override when provided in the manifest. This allows tenants to customize without forking the codebase.

## 4. State Management

- **Zustand** for global state (cart, session, tenant)
- **useState** for local component state
- **EventBus** for cross-component events
- **Network layer** (Axios) for API communication

## 5. API Client

The ApiClient interface defines the contract for all data access:

- `getManifest(tenantId)` → Manifest
- `getTheme(tenantId)` → ThemeDefinition
- `getNavigation(tenantId)` → NavigationDefinition
- `getScreen(tenantId, screenId)` → ScreenDefinition
- `getAssetUrl(tenantId, assetId)` → string | number

A MockClient implementation provides static JSON data. An HTTP Client implementation will connect to the backend when available.

---

**Parent:** KB-001 — README
**See also:** KB-006 — Platform Overview, KB-008 — Service Boundaries, KB-009 — Runtime Overview
