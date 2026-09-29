# Backend TODO review — 2026-09-29

## Completed locally in this pass

- Terminology §5: merchant lookup and membership errors now use merchant wording with MERCHANT_NOT_FOUND / MERCHANT_MEMBER_NOT_FOUND; resolver returns MERCHANT_ACCESS_REQUIRED. HTTP exception filter preserves machine-readable codes while retaining the errors array.
- Terminology §6: shared token issuance for login/register/refresh/social responses now adds merchants [{id,name,slug,role}], scoped to the authenticated user's active memberships. Pending registration returns an empty merchants list. IDs are merchant IDs, not membership IDs. Login/register/refresh Swagger descriptions document the additive contract.
- Previously added merchant manifest route and production sample-seed guard remain in place.

## Prioritized remaining work

1. API terminology: finish Swagger labels, canonical merchantId parameters with compatibility support, merchant dashboard aliases, typed reader errors, and client adoption. Existing TENANT_TERMINOLOGY_CLEANUP_TODO §7 explicitly excludes internal Prisma renames: prioritize API-facing changes, not a bulk schema rewrite.
2. One-time onboarding: category is absent from merchant create/update DTOs. Requires an additive field/migration, response coverage and frontend gate integration.
3. Builder templates: activation compatibility and catalog fetch/apply integration tests remain incomplete.
4. Feature requests: no feature-requests controller route found; requires model, authenticated create/list, scoped admin triage and frontend wiring.
5. Business verification and dashboard gaps: dedicated workflows/endpoints require further service-level audit; old TODO paths contain /tenants and must be translated to current /merchants or /app contracts before implementation.
6. Published delivery B8 and logo verification: local code work is reported complete through B7 in the existing TODO; actual authenticated publish A-to-B-to-A, rollback, dual-read and anonymous media retrieval evidence remains. Needs configured database and deployment credentials.
7. Live stale/demo cleanup: read-only audit script prepared, but no DATABASE_URL is configured. Do not delete records based on a legacy table name or sample-looking slug alone.

## Stale/duplicate TODO notes

- Merchant cleanup scope is confirmed as both terminology and stale/demo records.
- The draft-first OR alternative in Builder Media is not a mandatory missing endpoint for the accepted client-manifest publication path.
- Earlier broad internal rename plan is superseded by the narrower API-first scope in the existing terminology TODO; review rejection was not bypassed.

No deployment or live database changes performed.
