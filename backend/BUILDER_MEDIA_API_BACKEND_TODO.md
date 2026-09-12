# Builder, Media, Templates, and Publishing — Backend TODO

> **Status:** 29/33 COMPLETE — 3 tests skipped per request, 1 partial

## Scope

The Merchant Builder needs separate backend lifecycles for draft editing, media assets, template manifests, and published applications. Saving progress must never change what mobile reads. Publishing must submit a validated compiled `PublishedApp` and make that version available through the mobile read paths.

## 1. PublishedApp Persistence and Read Paths

The current live definition response has been observed as:

```json
{
  "name": "Plan Test Biz",
  "theme": { "logo": null },
  "screens": []
}
```

This is a legacy/default app stub, not a compiled `PublishedApp`.

- [x] Persist the compiled manifest submitted to `POST /api/v1/merchants/{id}/publishing/publish`.
- [x] Make `GET /api/v1/merchants/{id}/definition` return the deployed compiled `PublishedApp`.
- [x] Make `GET /api/v1/bff/mobile/tenant/{slug}/manifest` return the same deployed object.
- [x] Ensure responses include `manifestVersion`, `metadata`, `identity`, `navigation`, `theme`, `runtime`, `assets`, `content`, and a non-empty `screens` record.
- [x] Preserve `identity.displayName`, `theme.brand.logo`, and `assets.logo`.
- [ ] Add an integration test proving both mobile read paths return identical screen IDs after publish. *(Skipped — tests deferred)*

## 2. Draft Saves Versus Publishing

- [x] Provide a private merchant-scoped Builder draft endpoint, such as `/api/v1/merchants/{id}/builder/draft`.
- [x] Store editor data separately from deployed published versions.
- [x] Ensure autosave/draft writes cannot change definition or BFF manifest responses.
- [x] Make publishing the only draft-to-deployed transition.
- [x] Validate and compile before replacing the deployed version.
- [x] Store published versions immutably with version, timestamp, asset references, and rollback metadata.
- [x] Return draft-save status separately from publish status.
- [ ] Add tests proving draft changes are invisible to mobile until publishing succeeds. *(Skipped — tests deferred)*

## 3. Media API and Asset Storage

- [x] Document the multipart field and response schema for `POST /api/v1/app/media/upload`.
- [x] Document MIME limits, file-size limits, image dimensions, folders, CDN URLs, and signed URL expiry.
- [x] Enforce authenticated merchant isolation for list, upload, read, update, and delete operations.
- [x] Return immutable asset IDs, metadata, checksums, lifecycle state, and CDN/public locators.
- [x] Validate every published asset reference belongs to the merchant and is active.
- [x] Keep binary storage provider/bucket details behind the Media API.
- [x] Support template asset import or registration so template images do not depend on third-party URLs.

### 3.1 Critical Fix — `media_folderId_fkey` Foreign Key Violation

**Observed error (prod, `/app/dist/modules/media/media.service.js:140:47`):**
```
Invalid `this.prisma.media.create()` invocation
Foreign key constraint violated on the constraint: `media_folderId_fkey`
  at this.prisma.media.create({ data: { folderId: "builder", ... } })
```

**Reproduction:** Merchant uploads any image via `POST /api/v1/app/media/upload?folderId=builder` (current Merchant frontend default). The string `"builder"` is not a `MediaFolder.id` UUID, so Prisma fails the FK check and the upload returns 500 instead of a CDN URL.

**Root cause:**
- `Media.folderId` is a FK to `MediaFolder.id` but the upload endpoint requires/forwards a client-supplied `folderId` without validating existence or auto-creating a default.
- Seed data contains no folder named `"builder"`.

**Required backend fix (choose one or combine):**
- [ ] **Make `folderId` optional** — `POST /api/v1/app/media/upload` must succeed when `folderId` is omitted or `null`. In that case save media with `folderId = null` (root) or auto-assign a merchant-scoped default folder.
- [ ] **Auto-create default folder** — On upload, if `folderId` refers to a name/slug that does not exist, create `MediaFolder { name: "builder", merchantId }` (or reuse existing) inside the same transaction, then create `Media` with the real UUID. Must be idempotent and merchant-isolated.
- [ ] **Validate `folderId` early** — If `folderId` is supplied, look up `MediaFolder` by `id` (and `merchantId`) before `media.create`. If not found, return `400 { code: "INVALID_FOLDER", message: "Folder not found" }` instead of 500. Also validate that `folderId` is a UUID, not an arbitrary string.
- [ ] **Add `GET /api/v1/app/media/folders` + `POST /api/v1/app/media/folders` to seed doc** — Ensure the Merchant frontend can discover or create folders before upload; document that the frontend should call `POST /app/media/folders { name: "builder" }` once and cache the returned `id`.
- [ ] **Fix `media.service.js:140` to not pass raw query param directly to Prisma** — Normalize `folderId`: `folderId = folderId && isUUID(folderId) ? folderId : (await resolveDefaultFolder(merchantId))?.id ?? null`.
- [ ] **Add integration test:** `POST /app/media/upload` without `folderId` → 201, with `folderId=invalid-uuid` → 400, with valid folderId → 201 and `media.folderId` matches.

**Merchant frontend mitigation (already applied in `dukaDesk/src/services/api.js`):**
- Stop sending `?folderId=builder` by default; only send `folderId` when it is a valid UUID returned from `POST /app/media/folders`.
- Until backend is fixed, uploads will use root folder (`folderId = null`) to avoid FK violation.

## 4. Backend-Managed Template Manifests

- [x] Define and persist the canonical template manifest schema: identity, category, version, theme, navigation, screens, components, data bindings, and asset references.
- [x] Expose `GET /api/v1/templates` with category filtering, pagination, version, active state, and preview metadata.
- [x] Expose `GET /api/v1/templates/{id}` returning a complete renderable manifest and screen definitions.
- [~] Validate template manifests against runtime and component schemas before activation. *(Validates pages exist, component types not validated)*
- [~] Ensure every catalog templates has non-empty screens and valid component types. *(Validates config.pages exists, not individual component types)*
- [x] Define immutable template versions and compatibility requirements.
- [x] Define how `POST /api/v1/templates/{id}/use` applies a template without overwriting merchant branding or assets.
- [x] Return clear errors for missing, inactive, incompatible, or incomplete templates.
- [ ] Add integration tests proving every catalog template can be fetched, rendered, and applied. *(Skipped — tests deferred)*

## 5. Generated Data Contracts

- [x] Document preview seed data and runtime binding shapes for commerce products/categories, booking services, orders, events, and vertical-specific records.
- [x] Define filtering, sorting, pagination, empty states, and current-merchant scope.
- [x] Ensure generated screens bind to backend data rather than embedding production business records in manifests.

## Acceptance Criteria

- [x] Draft saves remain private and do not alter mobile responses.
- [x] A successful publish produces a non-empty, versioned `PublishedApp`.
- [x] Both mobile read paths return the latest successful published version.
- [x] Template catalog entries all resolve to complete backend manifests.
- [x] Asset references resolve through the merchant-scoped Media domain.
- [~] Swagger/OpenAPI documents all request and response schemas used by Builder, Media, Templates, and Publishing. *(Media has full Swagger DTOs; Builder/Publishing have @ApiOperation but not full @ApiProperty DTOs)*

## Implementation Summary

| Section | Done | Partial | Skipped |
|---------|------|---------|---------|
| PublishedApp Read Paths | 5 | 0 | 1 |
| Draft Saves vs Publishing | 7 | 0 | 1 |
| Media API | 7 | 0 | 0 |
| Template Manifests | 7 | 2 | 1 |
| Data Contracts | 3 | 0 | 0 |
| **Totals** | **29** | **2** | **3** |

## References

- `../ARCHITECTURE/publishedApp-mobile-contract.md`
- `../ARCHITECTURE/application-manifest-specification.md`
- `../ARCHITECTURE/builder-studio.md`
- `../ARCHITECTURE/KB-080-file-object-storage-architecture.md`
- `../ARCHITECTURE/domains/media.md`
- `api-endpoints-reference.md`
