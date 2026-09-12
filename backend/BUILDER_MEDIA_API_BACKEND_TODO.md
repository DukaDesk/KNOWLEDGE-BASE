# Builder, Media, Templates, and Publishing — Backend TODO

> **Status:** OPEN — required by the DukaDesk Merchant Builder and mobile runtime

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

- [ ] Persist the compiled manifest submitted to `POST /api/v1/merchants/{id}/publishing/publish`.
- [ ] Make `GET /api/v1/merchants/{id}/definition` return the deployed compiled `PublishedApp`.
- [ ] Make `GET /api/v1/bff/mobile/tenant/{slug}/manifest` return the same deployed object.
- [ ] Ensure responses include `manifestVersion`, `metadata`, `identity`, `navigation`, `theme`, `runtime`, `assets`, `content`, and a non-empty `screens` record.
- [ ] Preserve `identity.displayName`, `theme.brand.logo`, and `assets.logo`.
- [ ] Add an integration test proving both mobile read paths return identical screen IDs after publish.

## 2. Draft Saves Versus Publishing

- [ ] Provide a private merchant-scoped Builder draft endpoint, such as `/api/v1/merchants/{id}/builder/draft`.
- [ ] Store editor data separately from deployed published versions.
- [ ] Ensure autosave/draft writes cannot change definition or BFF manifest responses.
- [ ] Make publishing the only draft-to-deployed transition.
- [ ] Validate and compile before replacing the deployed version.
- [ ] Store published versions immutably with version, timestamp, asset references, and rollback metadata.
- [ ] Return draft-save status separately from publish status.
- [ ] Add tests proving draft changes are invisible to mobile until publishing succeeds.

## 3. Media API and Asset Storage

- [ ] Document the multipart field and response schema for `POST /api/v1/app/media/upload`.
- [ ] Document MIME limits, file-size limits, image dimensions, folders, CDN URLs, and signed URL expiry.
- [ ] Enforce authenticated merchant isolation for list, upload, read, update, and delete operations.
- [ ] Return immutable asset IDs, metadata, checksums, lifecycle state, and CDN/public locators.
- [ ] Validate every published asset reference belongs to the merchant and is active.
- [ ] Keep binary storage provider/bucket details behind the Media API.
- [ ] Support template asset import or registration so template images do not depend on third-party URLs.

## 4. Backend-Managed Template Manifests

- [ ] Define and persist the canonical template manifest schema: identity, category, version, theme, navigation, screens, components, data bindings, and asset references.
- [ ] Expose `GET /api/v1/templates` with category filtering, pagination, version, active state, and preview metadata.
- [ ] Expose `GET /api/v1/templates/{id}` returning a complete renderable manifest and screen definitions.
- [ ] Validate template manifests against runtime and component schemas before activation.
- [ ] Ensure every catalog template has non-empty screens and valid component types.
- [ ] Define immutable template versions and compatibility requirements.
- [ ] Define how `POST /api/v1/templates/{id}/use` applies a template without overwriting merchant branding or assets.
- [ ] Return clear errors for missing, inactive, incompatible, or incomplete templates.
- [ ] Add integration tests proving every catalog template can be fetched, rendered, and applied.

## 5. Generated Data Contracts

- [ ] Document preview seed data and runtime binding shapes for commerce products/categories, booking services, orders, events, and vertical-specific records.
- [ ] Define filtering, sorting, pagination, empty states, and current-merchant scope.
- [ ] Ensure generated screens bind to backend data rather than embedding production business records in manifests.

## Acceptance Criteria

- [ ] Draft saves remain private and do not alter mobile responses.
- [ ] A successful publish produces a non-empty, versioned `PublishedApp`.
- [ ] Both mobile read paths return the latest successful published version.
- [ ] Template catalog entries all resolve to complete backend manifests.
- [ ] Asset references resolve through the merchant-scoped Media domain.
- [ ] Swagger/OpenAPI documents all request and response schemas used by Builder, Media, Templates, and Publishing.

## References

- `../ARCHITECTURE/publishedApp-mobile-contract.md`
- `../ARCHITECTURE/application-manifest-specification.md`
- `../ARCHITECTURE/builder-studio.md`
- `../ARCHITECTURE/KB-080-file-object-storage-architecture.md`
- `../ARCHITECTURE/domains/media.md`
- `api-endpoints-reference.md`
