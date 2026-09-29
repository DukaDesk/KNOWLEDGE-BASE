# Merchant terminology and data audit — 2026-09-29

Repository inspected: DUKA-BACKEND. No .env or DATABASE_URL is available in this session. No live database inspection, deletion, migration, or deployment has occurred.

Findings:
- 126 files under src/prisma/scripts/docs contain tenant references.
- Prisma still uses Tenant models, tenantId relations, and mapped tenant tables. These represent real merchant ownership, not necessarily demo data.
- Public leaks include /bff/mobile/tenant/:slug/manifest, /bff/tenant dashboard routes, tenantId request/response fields, Swagger descriptions, and tenant:* permissions.
- Discovery release metadata selects tenantId. Published snapshots also contain legacy identifiers; rewriting a published snapshot changes its checksum.
- predeploy runs prisma db seed. seed.ts can create acme-store and john@acme.com plus related sample business records.

Implemented: sample business seeding now requires SEED_SAMPLE_DATA=true and is always disabled when NODE_ENV=production. Core configuration seeding continues. Existing records are not deleted.

Required clarification: whether the requested cleanup targets terminology, old/demo records, or both.

Migration plan:
1. Inventory live record counts and identify exact stale/demo record IDs through a read-only audit. Never infer demo status from a tenant table name.
2. Establish merchantId and merchant route contracts and coordinate both clients; current clients still consume tenant identifiers.
3. Rename internal Prisma/API names with explicit data-preserving mappings/migrations and migrate permission names plus assignments atomically. Do not drop merchant ownership relationships.
4. For released manifests, create new validated releases with updated checksums and activate them; do not rewrite historical published snapshots in place.
5. Verify authentication, RBAC isolation, discovery, publishing, ownership, and mobile launches before retiring legacy contracts.
6. Only remove exact approved obsolete records after checking ownership and dependent data; use backup and rollback procedures.

## Confirmed scope and first compatible change
User confirmed terminology plus stale/demo cleanup. Added canonical GET /api/v1/bff/mobile/merchants/:slug/manifest; the old reader remains hidden from Swagger for installed clients and forwards the identical immutable payload. Added scripts/audit-merchant-cleanup.js: runs a read-only database transaction, reports merchant status counts and exact acme-store candidate dependencies without deleting records or exposing user details. DATABASE_URL is still unavailable, so the audit has not run against live data.

Automatic approval review rejected a proposed bulk rename across Prisma/source/filesystem due to contract, migration, and release compatibility risks. No bulk rename was executed. The full coordinated rename and retirement of legacy contracts remain pending; existing source/model names and historical manifests still contain tenant identifiers.

Validation: Prisma client regenerated successfully; backend npx tsc --noEmit passed. Read-only audit script passed node --check. No live data changes.
