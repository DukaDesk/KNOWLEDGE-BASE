# Builder Agent Context

## Overview

The merchant-side visual builder lives inside the merchant portal repository
(`DUKA-MERCHANT/dukaDesk`) — there is no standalone `builder/` repo. Merchants
compose their customer-facing merchant app (screens, sections, theme,
navigation) and publish it through the backend publishing pipeline.

**Implementation Repository:** [DUKA-MERCHANT](https://github.com/DukaDesk/DUKA-MERCHANT) (`dukaDesk/`)
**Last Updated:** 2026-10-09

## Responsibilities

- Visual design surfaces: `MiniAppPreview` (`app-builder/`), `TemplateEditor` (`template/`), `CanvasEditor` + section editor (`canvas-editor/`, `section-editor/`, `common/`)
- Template catalog per vertical: `services/TemplateGenerator.js` (Restaurant/Ecommerce/Food Vendor/Grocery/Church/School/Booking), `staticTemplates.js`, `TemplateLoader.js` (`/templates/:id/manifest.json`)
- Draft validation: `services/ValidationEngine.js` (appName/slug, navigation, screens vs `ComponentRegistry` + componentTypes)
- Publish orchestration: `services/PublishingPipeline.js` (`publishProject`, manifest preview, asset materialize, release history, rollback) over `services/publishedDelivery.js` protocol + `services/compilePublishedApp.js` (editor → SDUI manifest)
- Guarded AI proposals: `services/builderAgent.js` (bounded declarative proposals, backend/payment/code/deploy blocked) — see `AI_ASSISTED_BUILDER.md`
- Local-first design cache: `services/designCache.js` (`dukadesk_design:{id}` + pending outbox)
- Live preview runtime: `src/runtime/` (`RuntimeContext`, `ActionEngine`, `ComponentRegistry`, `BrandThemeProvider`, `VerticalContext`)

## Non-Responsibilities

- Runtime rendering of end-user applications (mobile `ScreenEngine` owns that)
- Core business logic (backend modules own that)
- Infrastructure provisioning

## Technology Stack

- Framework: React 18.2 + Vite 8.2 + react-router-dom 7.18 (`dukaDesk/package.json`)
- HTTP: axios `services/httpClient.js` (`VITE_API_URL`, token inject, 401→refresh, `notifier` pub/sub)
- UI: lucide-react, recharts, react-toastify, qrcode
- State: `contexts.jsx` (`AuthContext`), `RuntimeContext`, `VerticalContext`, localStorage (`dd_merchant`, dual `merchantId || tenantId`)
- Testing: Vitest + Testing Library (`npm test` → `vitest run`)

## Repository Structure

```text
DUKA-MERCHANT/dukaDesk/src/
  App.jsx                  # Routes + ProtectedRoute/PublicRoute
  main.jsx, contexts.jsx, theme.js, index.css
  components/
    app-builder/           # MiniAppPreview
    template/              # TemplateEditor
    canvas-editor/         # CanvasEditor
    section-editor/ common/
    auth/                  # Auth, Onboarding
    layout/                # DashboardShell, ErrorBoundary
    pages/                 # Dashboard, Products, Orders, …, DeskDesign, MyApp
    pages/sector/          # Attendance, Giving, Fees, AppointmentsToday, Reservations, Memberships, Tickets, Classes
  config/                  # wizard, verticals, taxonomy, primitives, messages, integrations
  runtime/                 # ActionEngine, ComponentRegistry, EventBus, RuntimeContext, BrandThemeProvider, VerticalContext
  services/                # api, httpClient, PublishingPipeline, publishedDelivery, compilePublishedApp,
                           # ValidationEngine, builderAgent, TemplateGenerator/Loader, staticTemplates,
                           # designCache, notifier, moduleGate (+ *.test.js)
```

## Build and Test

```bash
cd DUKA-MERCHANT/dukaDesk
npm install
npm run dev        # Vite, :3000 (proxy /api → Railway backend)
npm test           # vitest run
npm run lint       # eslint src/
npm run build      # vite build
```

Publish flow (portal side): validate → `compileDesignToPublishedApp` → media
upload (`POST /api/v1/app/media/upload`) → `POST /api/v1/merchants/:id/publishing/publish`
(Idempotency-Key) → verify (`GET .../publishing/submission`, `GET .../definition`,
`GET /api/v1/bff/mobile/merchants/:id/manifest` canonical).

## Specification Traceability

| Specification | Title | State |
|---------------|-------|-------|
| ADR-013 | Builder Template Gallery and Section Editor Redesign | Accepted |
| ADR-014 | Vertical-Adaptive Business Dashboard | Accepted |
| ADR-015 | Reusable Saved Sections and Per-Page Theme Chrome | Accepted |
| ADR-016 | Tenant → Merchant/App Rename | Accepted |
| AI_ASSISTED_BUILDER.md | Builder Agent chat contract | Active |

## Agent Conventions

- Reference engineering specifications by ID in commits and pull requests.
- Keep the canvas performant for large designs.
- Validate serialized output against schemas (`ValidationEngine`).
- Maintain undo/redo and autosave behavior (`designCache` + undo-aware store).
- Update this context when responsibilities or structure change.

## Common Tasks

- Add a builder surface: extend `canvas-editor/` + register in `ComponentRegistry`, cover with `ValidationEngine` rule.
- Add a template: extend `TemplateGenerator.js` category screens + `staticTemplates.js`.
- Change publish protocol: update `publishedDelivery.js` + `PublishingPipeline.js` together with backend `publishing` module.

## Escalation

Stop and ask for human input when:

- A change affects the serialized design format.
- A performance regression is introduced.
- A decision impacts the runtime rendering contract (mobile SDUI).
