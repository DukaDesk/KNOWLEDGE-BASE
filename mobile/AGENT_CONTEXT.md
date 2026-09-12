# Mobile Agent Context

## Overview

The `mobile/` repository contains the DUKADESK OS mobile applications for iOS and Android.

## Responsibilities

- Native or cross-platform mobile user interface
- Mobile-specific state management
- Offline support and local storage
- Push notification handling
- Secure authentication flows

## Non-Responsibilities

- Server-side business logic
- Web rendering
- Infrastructure provisioning

## Technology Stack

- Framework: React Native via Expo SDK 52 (v56.0.0 docs)
- Language: TypeScript (strict mode)
- State Management: Zustand (session, action loading, settings) + React Context/useReducer for local state
- Persistence: MMKV (4 separate instances via factory pattern: tenant, session, booking, platform)
- Routing: expo-router (file-based routing, `app/(tabs)/` structure, deep links)
- Networking: axios with unwrap() helper for { success, message, data } envelope
- Google Auth: expo-auth-session (lazy-imported to avoid native module crash)
- Testing: TBD

## Repository Structure (DUKA-MOBILE)

```text
mobile/
  app/                     # expo-router file-based routes
    (tabs)/                # Tab navigator screens
    _layout.tsx            # Root layout
  src/
    components/            # Reusable UI components (HeroBanner, PrimaryButton, DynamicCard, ValidationModal, etc.)
    data/                  # Static data, runtime tenant data
      runtime/tenants/bella-italia/  # All 12 runtime packages
    network/               # API client, constants
    screens/               # Screen-level components
    services/              # API endpoints, auth service
    store/                 # Zustand stores (session, actionLoading, settings, storage)
    utils/                 # Permissions helpers, event bus
  scripts/                 # EAS build scripts
  AGENT_CONTEXT.md
  README.md
```

## Build and Test

```bash
npm install
npm run lint
npm run typecheck
npx expo start
npx eas build --platform android --profile production
scripts/run-eas.mjs          # Android EAS auto-submit
```

## Engineering Standards

- [Repository Standard](../engineering-governance/repository-governance/REPOSITORY_STANDARD.md)
- [Branching Standard](../engineering-governance/repository-governance/BRANCHING_STANDARD.md)
- [Versioning Standard](../engineering-governance/repository-governance/VERSIONING_STANDARD.md)
- [Pull Request Standard](../engineering-governance/repository-governance/PR_STANDARD.md)
- [Review Standard](../engineering-governance/repository-governance/REVIEW_STANDARD.md)
- [Release Standard](../engineering-governance/repository-governance/RELEASE_STANDARD.md)
- [AI Context Standard](../engineering-governance/repository-governance/AI_CONTEXT_STANDARD.md)
- [Boot Process Standard](../engineering-governance/repository-governance/BOOT_PROCESS_STANDARD.md)

## Specification Traceability

Specifications that target this repository:

| Specification | Title | State |
|---------------|-------|-------|
| FEAT-0001 | Email/password authentication | Complete |
| FEAT-0002 | Google OAuth integration | Complete |
| FEAT-0003 | Guest mode ("Explore App") | Complete |
| PKG-01 | Application runtime package (Bella Italia) | Complete |
| PKG-02 | Authentication runtime package | Complete |
| PKG-03 | Home runtime package | Complete |
| PKG-04 | Menu runtime package | Complete |
| PKG-05 | Cart & Checkout runtime package | Complete |
| PKG-06 | Orders runtime package | Complete |
| PKG-07 | Reservations runtime package | Complete |
| PKG-08 | Profile, Wallet & Loyalty runtime package | Complete |
| PKG-09 | Notifications, Settings & Support runtime package | Complete |
| PKG-10 | Master Data & Content runtime package | Complete |
| PKG-11 | Published Tenant Application package | Complete |
| PKG-12 | Runtime Validation & Test Data package | Complete |

## Agent Conventions

- Reference engineering specifications by ID in commits and pull requests.
- Follow platform-specific accessibility guidelines.
- Keep UI components testable and reusable.
- Securely store tokens and credentials.
- Update this context when responsibilities or structure change.

## Common Tasks

- Implement a UI specification: build screens, components, and navigation (expo-router).
- Integrate an API: add endpoint in `src/services/api/endpoints/`, use unwrap() helper.
- Generate runtime tenant data: run node scripts from `C:\Users\Prime\AppData\Local\Temp\opencode\pkg*.js`.
- Handle push notifications: use expo-notifications with lazy permission request.
- Add persisted store: use createMMKVStorage(id) factory from `src/store/storage.ts`.
- Gate guest actions: fire `auth:required` EventBus event, caught by AuthPromptModal.

## Escalation

Stop and ask for human input when:

- A change requires native module changes.
- A security-critical decision is required.
- A platform-specific store policy is involved.
