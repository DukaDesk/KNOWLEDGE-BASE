# App data consent mobile TODO

- [x] Show request after published splash, scoped to signed-in user and app.
- [x] Remember approved/declined choices through backend; no device-only approval cache.
- [x] Recheck required checkout/form actions; resume only after approval is saved.
- [x] Gate direct native checkout submission as well as manifest actions.
- [ ] Device QA: launch/splash timing, sign-in, repeat launch, different user, different app, offline, decline, changed policy, Android back, modal on top of published modal screen.
- [ ] Ship updated mobile build after backend deployment.
- [ ] Add a DukaDesk profile consent-management screen listing apps with a revoke control (POST granted:false already supports revocation).
- [ ] Replace existing local-only native checkout order/payment behavior with verified commerce/payment APIs; remove placeholder payment confirmation and bank details.

See ../ARCHITECTURE/APP_DATA_CONSENT_2026-10-12.md.
