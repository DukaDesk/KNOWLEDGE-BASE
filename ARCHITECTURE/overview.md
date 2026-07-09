# DUKADESK Architecture Overview

**Last Updated:** 2026-07-09

## System Context

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

## Data Flow

```
Tenant JSON → ApiClient.getManifest() → Manifest
  ├→ ApiClient.getTheme() → ThemeDefinition
  ├→ ApiClient.getNavigation() → NavigationDefinition
  └→ ApiClient.getScreen() → ScreenDefinition (per screen)
       ↓
  ManifestResolver → ResolvedTenant
       ↓
  ScreenRenderer(screenId)
    ├─ layout? → LayoutRenderer → RegistryRenderer per node
    └─ children? → View(children.map → RegistryRenderer)
         ↓
    Component.render(props + actions)
         ↓
    User interaction → dispatchAction(actions.someKey)
         ↓
    ActionEngine → handler(action, node)
```

## Module System

Module defaults provide baseline implementations per capability. Tenant screens in the manifest override module defaults. This allows tenant customization without forking.

## State Management
- **Zustand** for global state (cart, session, tenant)
- **useState** for local component state
- **EventBus** for cross-component events
- **Network layer** (Axios) for API communication

## Repositories Governed

| Repository | Purpose | Status |
|------------|---------|--------|
| `backend` | API services, events, queues, persistence | Active |
| `mobile` | React Native / Expo mobile app | Active |
| `builder` | Visual SDUI builder | Planned |
| `website` | Public website + docs | Planned |
| `business-dashboard` | Business admin dashboard | Planned |
| `tenant-dashboard` | Tenant admin dashboard | Planned |
| `sdk` | Integration SDK | Planned |
| `cli` | CLI tooling | Planned |

## Technology Stack

| Surface | Technology | Status |
|---------|------------|--------|
| Mobile | React Native / Expo | Active |
| Backend | TBD | Planned |
| Builder | TBD | Planned |
| Dashboards | TBD | Planned |
| Website | TBD | Planned |
