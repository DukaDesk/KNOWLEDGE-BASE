# Merchant dashboard data cleanup - 2026-09-29

Completed locally:
- Removed seeded sample business, products, orders, coupons, subscriptions, billing and integration connections. Previously persisted demo store is no longer read; stored data was not deleted.
- Dashboard analytics summary reads the backend. Revenue/order totals preserve real zero values; unavailable metrics are not synthesized.
- Removed fabricated growth, ratings/review counts, notification badge, sample contact information and opening hours.
- App live status and share link require a verified published app.
- Disconnected features show empty states and reject simulated writes instead of claiming success.

Remaining tasks:
- [ ] Connect products/orders/activity, billing and other previously demo-backed features to verified backend response contracts. Existing disconnected reads currently return empty data.
- [ ] Backend: add revenue time-series, order-status distribution and ranked-product reports; revenue report currently provides totals only.
- [ ] Backend: provide customer/review metrics and subscription fields before displaying these values.
- [ ] Deploy merchant and verify with a new merchant and a merchant with real records.

Production build passed. Dashboard data regression tests verify persisted demo records cannot leak and analytics failures do not turn into fabricated zero totals.
2026-09-30: Fixed shared Empty icon rendering for JSX elements (such as Package), component references, and named icons. This fixes the Products empty-state crash exposed after removing demo data.
