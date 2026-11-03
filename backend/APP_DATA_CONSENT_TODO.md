# App data consent backend TODO

- [x] Read requested fields and purpose from active published manifest.
- [x] Save authenticated per-user/per-app choice and audit atomically in existing consent tables.
- [x] Reject stale request IDs; invalidate consent when purpose/fields/required actions change.
- [x] Limit merchant profile reads to approved fields and exact active owner/manager membership.
- [x] Enforce checkout and form submission requirements; prevent body user-ID spoofing and form merchant mismatch.
- [ ] Deploy backend and verify endpoints against staging/production (no database migration required).
- [ ] Run two-user/two-merchant end-to-end acceptance checks, including revocation and changed published request.
- [ ] Add explicit data requirements to future booking/payment operations when their contracts are defined.

See ../ARCHITECTURE/APP_DATA_CONSENT_2026-10-12.md.

Backend completion follow-up:
- [x] GET /api/v1/app/data-consent lists only the authenticated user's choices.
- [x] DELETE /api/v1/app/data-consent/:merchantId revokes permission independently of release availability or policy changes.
- [x] Revocation removes approved data scopes and writes an audit record atomically.
- [x] Swagger documents the authenticated consent API and decision body.
- [x] Regression coverage for merchant membership restrictions, authenticated-user scoping and revocation after unpublishing.
`Validation: 23 backend consent/controller/manifest tests passed; TypeScript and git diff whitespace checks passed. No deployment performed.`
