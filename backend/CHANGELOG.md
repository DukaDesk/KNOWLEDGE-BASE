# Changelog

All notable changes to the backend repository are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.2.1] — 2026-09-11

### Added
- TASK-0025: Customizable Dashboard endpoint
  - Widget data resolution (`resolveWidgetData`, `resolveDashboardData`)
  - `GET /app/analytics/dashboards/:id/data` — render all widget data
  - `GET /app/analytics/dashboards/:dashboardId/widgets/:widgetId/data` — single widget data
  - `GET /app/analytics/widget-types` — widget type registry (10 metrics)
  - DTOs: CreateDashboardDto, UpdateDashboardDto, CreateWidgetDto, UpdateWidgetDto
- BFF Business Dashboard wired to real service (was returning zeros)
  - `GET /bff/admin/overview` — real platform stats
  - `GET /bff/admin/analytics` — revenue trend, user growth, order volume
  - `GET /bff/admin/revenue` — revenue report with filters
  - `GET /bff/admin/merchants/:merchantId/analytics` — per-merchant analytics

### Changed
- Exported DashboardsService from AnalyticsModule

## [0.2.0] — 2026-09-10

### Added
- Three-tier API architecture (Website / App / Mobile)
- App/Public controller split for all 13 tenant modules
- Shared `TenantResolverService` for tenant resolution from JWT
- TASK-0024: Publish permission fix (allow owner + manager roles)

### Changed
- Renamed all `/merchants/:tenantId/...` paths to `/app/...`
- Removed "tenant" terminology from all endpoint paths

### Fixed
- `@Param('tenantId')` bug in Forms, Payments, Integrations controllers
- Publish permission now allows manager role (was owner only)

## [0.1.0] — 2026-07

### Added
- Initial platform implementation
- 32 feature modules
- 85+ Prisma models
- BFF layer (Mobile, Tenant Dashboard, Business Dashboard, Website)
- Docker + Railway deployment
