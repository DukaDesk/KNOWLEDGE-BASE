# Mobile Progress

This file tracks the current state of the mobile repository.

## Active Work

| Task | Specification | Status | Owner |
|------|---------------|--------|-------|
| — | All 12 runtime packages complete | Done | — |
| — | Bella Italia tenant fully published | Done | — |

## Completed Milestones

| Date | Milestone | Notes |
|------|-----------|-------|
| 2026-07-20 | Package 12 — Runtime Validation & Test Data | 56 files: schemas, validators, integrity checks, runtime/renderer/publish tests, reports |
| 2026-07-20 | Package 11 — Published Tenant Application | 32 files: manifest, routing (41 routes), navigation (5 tabs, 12 modals), security (ECDSA-SHA256), compatibility |
| 2026-07-20 | Package 10 — Master Data & Content | 48 files: 500 products, 100 promos, 1000 images, full localization (~400 keys) |
| 2026-07-19 | Package 09 — Notifications, Settings & Support | 11 screens, 500 notifications, 300 articles, 200 FAQs, 100 tickets |
| 2026-07-17 | Package 08 — Profile, Wallet & Loyalty | 132 JSON files + 110 data files (500 transactions, 1000 loyalty entries) |
| 2026-07-17 | Packages 05, 06, 07 — Cart, Orders, Reservations | Cart/checkout (70 files), orders (63 files, 560 orders), reservations (65 files, 340 reservations) |
| 2026-07-15 | Packages 01–04 — Application, Auth, Home, Menu | 60+ files per package, full screen definitions |
| 2026-07-12 | Guest mode | "Explore App" flow, tab gating, EventBus auth prompt |
| 2026-07-10 | Google OAuth | expo-auth-session with lazy import, client IDs configured |
| 2026-07-09 | Auth screens wired to real API | Sign-in, sign-up, forgot/reset password with loading + validation modal |
| 2026-07-08 | MMKV storage factory | createMMKVStorage(id) with per-instance error handling + Map fallback |
| 2026-07-07 | EAS build runner | run-eas.mjs with EXPO_TOKEN, ProGuard, expo-build-properties |
| 2026-07-06 | Icon & splash | Dukalogo.png, navy #1a1a2e background |
| 2026-07-04 | Categories tab | 20 categories, grid/list toggle, search, QR scanner |
| 2026-07-03 | API endpoint layer | Full typed layer in src/services/api/endpoints/ (57 functions) |
| 2026-07-01 | Project bootstrap | Expo SDK 52, expo-router, TypeScript, Zustand |

## Blockers

| Issue | Impact | Owner |
|-------|--------|-------|
| — | — | — |

## Next Up

- Authentication runtime package directory (screens/ structured, missing package-level manifest)
- Screen-level manifest consolidation for home, menu, cart, notifications, settings, support
- Integration tests for runtime package loading

## Last Updated

2026-07-20
