# Changelog

All notable changes to the backend repository are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased] — 2026-10-13

### Added
- **Production media storage on Cloudflare R2**: Railway prod + local `.env` now set `STORAGE_PROVIDER=s3`, `STORAGE_ENDPOINT=https://a846cd1ad03fb3b24935790348aa5d07.r2.cloudflarestorage.com`, `STORAGE_REGION=auto`, `STORAGE_BUCKET=dukadesk`, `CDN_URL=https://pub-7ed3e12a1d58436aa69b237283e39b66.r2.dev` — uploads persist in the R2 bucket instead of ephemeral Railway disk
- Verification evidence (2026-10-13): authenticated `POST /api/v1/app/media/upload` returns `r2.dev` URLs for the original + all variant presets; anonymous GET of each → `200 image/webp`; objects confirmed in bucket via S3 ListObjects
- Backend v1.0.1 pulled work logged: two-stage approval backend (`81fb6fd`), invite-only admin signup (`ef05547`), KYC private media, publishing admin approval gate (`b4f8ee2`), product badges/tags/specs, video component support
- **B7 runtime compatibility contract** (2026-09-27): `GET /api/v1/compatibility` (anonymous) serves contract `dukadesk.published-app-runtime` 1.0.0 — supported manifest versions, 35 component types (builder registry + production template/section types + KB fixture + mobile v0.0.7 shell registry), 10 action types, 16 capabilities, asset reference kinds, limits (`maxScreens` 200, `maxNestingDepth` 25, `maxComponents` 2000, `maxAssetReferences` 500) — `src/shared/compatibility/`
- **Merchant preflight** (2026-09-27): `POST /api/v1/merchants/:id/publishing/preflight` (owner/manager) validates a manifest, or compiles the current drafts without persisting (`ManifestCompiler.compile(tenantId, { persist: false })`), and returns `{contract, source, valid, compatible, errors, warnings, counts}` without publishing
- **Activation gate** (2026-09-27): `CompatibilityService.assertCompatible()` runs in both publish paths before version allocation/activation — unknown component, unresolvable or cross-tenant media id, unknown required capability, unsupported manifest version or limit breach → 422 `INCOMPATIBLE_RUNTIME`; unknown action types surface as warnings on the publish receipt
- Discovery now projects the active release identity and lists only activated tenants (`activeReleaseId != null`), returning `release {id, version, checksum, channel, publishedAt}` with name/slug/logo/publishedAt
- Suites: `compatibility.service.spec.ts` (11 cases), `discovery.service.spec.ts` (4 cases), publishing B7 preflight/compatibility cases — 58 tests total
- `docs/B4_MIGRATION_RUNBOOK.md` — production recovery timeline, rollback SQL (`ALTER TABLE "tenants" DROP COLUMN "activeReleaseId"`), evidence table (deployment IDs, backfill count, audit result)
- Read-only audit `scripts/audit-active-release.js` — migration ledger, schema/index, backfill gaps, dangling/cross-tenant pointers, tenant status vs releases, manifest shapes, counts; SELECT-only, retries transient Railway proxy drops (`AUDIT_RETRIES`, default 5)
- `package.json` `predeploy` script: `prisma migrate deploy && prisma db seed`

### Fixed
- **`storage.service.ts` `baseUrl` in S3 mode now prefers `CDN_URL`** (`3bef824`, deploy `6261e2ac`) — previously returned the signed S3 endpoint, whose anonymous GETs fail (`InvalidArgument/Authorization`); public objects are now served from the `r2.dev` CDN base
- `.gitignore` covers `.env.*` exports (Railway env dumps no longer committable); `.env` itself already ignored
- Baseline recovery (2026-09-27): 7 migrations marked applied with `prisma migrate resolve --applied` (schema verified object-by-object first); the duplicate rolled-back row `resolve` left for `seed_admin` deleted so the ledger has no phantom failures
- `railway.json` `preDeployCommand` → `npm run predeploy`: the previous raw `&&` string only executed `migrate deploy`, so `prisma db seed` never ran in production (`permissions`/`plans`/`templates` all 0)
- `Dockerfile` runner stage now copies `tsconfig.json`; without it `prisma db seed` failed with `ERR_UNKNOWN_FILE_EXTENSION` on `prisma/seed.ts` (ts-node fell back to Node's module syntax detection, which cannot load `.ts` as ESM on Node 20)
- `20260924000000_add_active_release` applied on deploy `a00865ae` — backfill updated 0 rows (expected: `releases` empty); index `tenants_activeReleaseId_idx` present; audit 0 errors, health 200
- `scripts/seed-super-admin.js` no longer rewrites `20260827120000_seed_admin/migration.sql` at runtime (would reintroduce the missing `updatedAt` 23502 failure)

### Changed
- **Known caveat:** media rows created before 2026-10-13 store signed-endpoint URLs that fail anonymously — merchants must re-upload affected media/logos (open precondition for the published-logo live re-test)
- B6 live media evidence partially satisfied for new uploads (anonymous GET verified 2026-10-13); B8 publish/rollback e2e remains open
- B4 **and B7** ticked in `PUBLISHED_APP_DELIVERY_BACKEND_TODO.md`; B8 remains the only open release gate
- Progress notes and deployment section updated for the working pre-deploy seed + R2 storage config

## [0.3.8] — 2026-09-24

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
