# Merchant Dashboard Progress

> Naming per ADR-016: **Merchant Dashboard** (product).

This file tracks the merchant dashboard surface. Implementation lives in
`DUKA-MERCHANT/dukaDesk` (shell + pages + sector pages); aggregation in
`DUKA-BACKEND/src/bff/tenant-dashboard/` (`bff/tenant` code path).

## Active Work

| Task | Specification | Status | Owner |
|------|---------------|--------|-------|
| Sector pages per vertical | ADR-014, VERTICALS.md | Implemented (Attendance, Giving, Fees, AppointmentsToday, Reservations, Memberships, Tickets, Classes) | Merchant |
| Builder surfaces | ADR-013, ADR-015 | Implemented (MiniAppPreview, TemplateEditor, CanvasEditor) | Merchant |
| Builder Agent chat | AI_ASSISTED_BUILDER.md | Implemented locally, backend hardening open | Merchant / Backend |

## Completed Milestones

| Date | Milestone | Notes |
|------|-----------|-------|
| 2026-09 | Vertical-adaptive shell | Preset ∪ added − removed modules via `VerticalContext` + `moduleGate`, persisted to merchant config `app.modules` |
| 2026-09 | Publish pipeline wired | `PublishingPipeline` → `POST /api/v1/merchants/:id/publishing/publish` + verify + rollback |

## Blockers

| Issue | Impact | Owner |
|-------|--------|-------|
| | | |

## Next Up

- Backend-hardened Builder Agent endpoint (`DUKA-BACKEND/docs/BUILDER_AGENT_BACKEND_TODO.md`)
- Commerce drill-down completeness per business-dashboard Next Up

## Last Updated

2026-10-09
