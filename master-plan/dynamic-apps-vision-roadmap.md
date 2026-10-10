# DukaDesk Dynamic Apps — Vision & Roadmap (v2)

**Status:** Direction agreed 2026-10-09 (see §6 Decision log). No ADR yet —
white-label + nav + splash rulings below should be formalized as an ADR before
Phase 0 execution.
**Date:** 2026-10-09
**Source:** Product vision discussion (builder/renderer fidelity → imagination-to-life roadmap → alternatives review).

## 1. Vision

People easily bring **any imagination to life within a short while**.
Incremental delivery: **businesses first**, other categories not far behind.

Cost/time-boxed flexibility target: **~70%** of dedicated-app feel — including,
in future, **user-attached databases and limited backend controls** per
merchant. The remaining ~30% (games, hardware integrations, super-app
novelties) is out of scope by design.

## 2. Agreed scoping answers (2026-10-09)

| Question | Answer |
|---|---|
| Who builds first? | Both in stages — non-technical merchants first, designers/agencies later |
| Where does expressiveness grow first? | Custom data + logic (before more widgets/verticals) |
| Custom code policy? | Only if mobile can handle it after bundling — precompiled/versioned, never runtime-eval'd JS |

## 3. Binding product rulings (2026-10-09)

### 3.1 White-label indistinguishability (DECIDED)

Merchant apps must be indistinguishable from dedicated apps. Merchant brand
front and center everywhere; DukaDesk attribution allowed **only** as a quiet
splash-screen line — never the center of attraction — or not at all.

- Baseline verified 2026-10-09: zero "Powered by" strings in either repo;
  branding (`branding.appName/logo/tagline`, theme brand, identity) is fully
  merchant-owned; splash renders the merchant's own screen.
- Known violations to fix (all platform-painted pixels):
  1. `backButton: 'logo'` renders the **Duka logo** (`navigation.json`,
     `HeroBanner.tsx`, `AppHeader.tsx`) —superseded by §3.2 (back button
     removed entirely).
  2. Platform-voiced surfaces with no merchant theming: `ErrorBoundary`
     fallback, `EmptyStateSection`, `AuthPromptModal`, guest-mode gates,
     `No published release` notice, validation modals, toasts.
- Implication: theming depth (custom fonts, app icon, splash config,
  error/empty-state theming) is **Phase 0 acceptance criteria**, not polish.

### 3.2 No back button (DECIDED)

The back button (`'logo' | 'back'`) is removed from the mobile runtime:
`HeroBanner.tsx:25,83-85`, `AppHeader.tsx:57`, `types.ts:259`, sample JSON
usages (`navigation.json`, mama-kitchen/grace-pharmacy screens). Exit and
in-app navigation move to the **FAB** (registered `fab` type, `ShellControls`
+ `fabPosition` store exist) and the tab bar.

### 3.3 Splash fixed at 2 seconds (DECIDED)

Merchants do not configure splash timing. Constant `2000ms` enforced on both
sides (today: builder `durationMs ?? 500` in `compilePublishedApp.js`, mobile
fallback `?? 0` in `PublishedAppShell.tsx:62`). Splash content stays
merchant-defined (logo + heading).

### 3.4 Merchant-themed flags and errors (DECIDED)

Every platform-painted surface — error fallbacks, empty states, auth/guest
gates, validation modals, toasts, compat-block screens — must render under the
merchant's theme at display time. Render-context rule: **no platform-voiced
pixel without merchant theme applied.**

## 4. Fidelity baseline (researched 2026-10-09)

Closed vocabulary today. 1:1 builder→mobile only inside the shared contract:

- ~66 registry components + 10 inline primitives, 6 layout kinds
  (`scroll/column/row/stack/section/grid`), 25 action types.
- Scale caps: ≤200 screens, ≤2000 components, depth ≤25, ≤500 asset refs.
- Three gates: builder compile (throws) → backend publish compat (422 on bad
  component/capability/limits; warnings on unknown actions) → mobile render
  (unknown component = inline `Unsupported` box; unknown layout = screen-level
  ErrorBoundary; unknown action = silent no-op; incompatible manifest = app block).
- Known gaps: builder offers `divider, video, header_bar, dynamic_card,
  menu_item, switch_toggle, search_bar` with no mobile renderer; `carousel`
  layout has no mobile layout-kind counterpart; per-prop styling beyond theme
  tokens is silently ignored; no custom queries/endpoints/rules/code.
- `data-contracts.md` promises a `DataBindingService` that does not exist in
  the backend. `visibleWhen` exists in node schema but has no evaluator.
- BuilderAgent caps: ≤8 screens / ≤10 sections / ≤16 components / ≤5 tabs per
  proposal; handlers/URLs/scripts stripped.

Key files: `dukaDesk/.../compilePublishedApp.js`, `ValidationEngine.js`,
`componentTypes/index.jsx`, `builderAgent.js` | backend
`publishing/manifest-validator*`, `compiler/`, `CompatibilityService` |
mobile `ComponentRegistry.tsx`, `layouts/LayoutRenderer.tsx`,
`actions/ActionEngine.ts`, `compatibility.ts`, `PublishedAppShell.tsx`,
`docs/examplesTemplate.md`.

## 5. Roadmap (direction agreed, execution NOT started)

Principles: contract-first (`examplesTemplate` + compat + B7 preflight);
merchants never see crashes or platform chrome; bundle, don't eval.

- **Phase 0 — Merchant breadth + white-label acceptance:** data-driven
  vertical starters; expand one-click screen builders; fill gap components
  (divider/video/header_bar/dynamic_card/menu_item/switch_toggle/search_bar);
  **remove back button; fix splash to 2s; merchant-theme all error/empty/
  gate surfaces; merchant-logo navigation identity.**
- **Phase 1 — Custom data:** real `DataBindingService`
  (static/context/query/api) **designed with external-DB adapters in mind**
  (per-merchant credentials, allowlisted hosts, read-scoped first); sections
  consume bindings; compat validates them.
- **Phase 2 — Codeless logic:** `visibleWhen` evaluator, action chains, form
  rules via pure expression evaluator (no JS parsing).
- **Phase 3 — Bundled custom components:** registry contribution pipeline
  (builder type + mobile renderer + compat + validator + docs + preflight as
  one unit); reviewed marketplace track (Shopify-style theme-review
  discipline: automated preflight + human review); versioned, OTA/bundled only.
- **Phase 4 — Agency tooling + backend controls:** import/export, theme
  systems, multi-locale, breakpoint layouts; limited merchant backend controls
  (scoped to the 70% target).

Suggested order: Phase 0 (incl. §3 rulings) → Phase 1 spike → ADRs (bindings,
extensions, white-label policy) → implement → Phase 2 → Phase 3.

## 6. Alternatives considered (2026-10-09, rejected)

| Option | Verdict |
|---|---|
| Template-fork native apps (per-merchant RN/Flutter) | Rejected: cost scales per merchant; the thing we disrupt |
| WebView hybrid shell | Rejected: downgrades native feel/offline; native cost already paid |
| Mini-program super-app (JS sandbox) | Closest cousin; ours (declarative JSON, no eval) is safer/cheaper to review — borrow its review pipeline for Phase 3 |
| Headless + theme framework (Shopify-model) | Rejected: scope (booking/sectors/offline/native) outgrew theming; steal its review discipline only |
| PWA-only | Rejected: kills store presence, iOS push, offline, "real app" promise |
| BaaS + third-party builder | Rejected: fights foreign abstractions for isolation/publishing/white-label; vendor bills scale with success |

Standing decision: declarative SDUI + native renderers + versioned compat +
bundled-only extensibility. Flexibility ceiling accepted at ~70–85%
(Phase 1–3); top-end native (games/hardware/super-apps) permanently out of scope.

## 7. Open questions for next discussion

- Exact Phase 0 component shortlist and vertical priority order.
- Binding security model (allowlisted endpoints? per-merchant secrets?).
- Expression language scope for Phase 2 (what operators/functions?).
- Marketplace review bar and versioning policy for Phase 3.
- ADR drafts: white-label policy, data bindings, bundled extensions.

## 8. Decision log

| Date | Decision | By |
|---|---|---|
| 2026-10-09 | Scoping: merchants-first-staged audience; data+logic first; bundled-only custom code | Product |
| 2026-10-09 | White-label indistinguishability; attribution max quiet splash line | Product |
| 2026-10-09 | Back button removed; FAB + tab bar own navigation | Product |
| 2026-10-09 | Splash fixed 2000ms, not merchant-configurable | Product |
| 2026-10-09 | All flags/errors/gates merchant-themed at display time | Product |
| 2026-10-09 | 70% flexibility target incl. future user-attached DBs + limited backend controls | Product |
| 2026-10-09 | Architecture stands (SDUI + bundled extensibility); alternatives rejected per §6 | Product |
