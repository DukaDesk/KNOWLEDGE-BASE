# Changelog

All notable changes to the backend repository are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased] — 2026-09-24

### Added
- Published app delivery B1–B6 (KB 0.3.8): `ManifestValidator` for PublishedApp 1.0.0 object screens, atomic release activation with `tenant.activeReleaseId` + Idempotency-Key, shared `ActiveReleaseService` for renderer + mobile BFF, owner/manager authz on publish/rollback/history, media `folderId` find-or-create + StorageService URL retention, default non-empty app seed on merchant create, `ApiQuotaGuard`
- Unit test suites: `manifest-validator`, `publishing.service`, `active-release.service`, `media.service`, press-action round-trip (5 suites / 38 tests)
- Additive migration `20260924000000_add_active_release` (written; Railway pre-deploy switched from `db push` to `migrate deploy` so backfill SQL runs)

### Changed
- B1, B2, B3, B5, B6 ticked in `PUBLISHED_APP_DELIVERY_BACKEND_TODO.md`; B4/B7/B8 marked partial with notes
- Media folderId + publish-manifest items ticked in `BUILDER_MEDIA_API_BACKEND_TODO.md` (35/39)
- Progress + agent context bumped to KB 0.3.8
- `railway.json` `preDeployCommand`: `prisma db push --accept-data-loss` → `prisma migrate deploy` (applies migrations + backfill before seed)

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
