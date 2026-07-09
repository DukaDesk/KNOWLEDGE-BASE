# KB-006 — Platform Overview

**Part II — Platform Architecture | Platform Overview**

| Metadata | Value |
|----------|-------|
| KB-ID | KB-006 |
| Title | Platform Overview |
| Version | 0.1.0 |
| Status | Drafting |
| Owner | Engineering |
| Review Status | Not Reviewed |
| Last Updated | 2026-07-09 |
| Depends On | KB-001, KB-004 |
| Required By | KB-007, all specifications |

## 1. Platform Description

DUKADESK is a multi-tenant platform that provides branded, screen-driven experiences for businesses. Each tenant (business) gets a customized Desk — a mobile interface presenting capabilities like menus, ordering, notifications, and booking through a unified tab-based layout.

The platform is built on the **Server-Driven UI (SDUI)** pattern: the client renders what the server defines. JSON is the source of truth for screen structure, component composition, and action definitions.

## 2. Repositories Governed

| Repository | Purpose | Status |
|------------|---------|--------|
| `backend` | API services, events, queues, persistence | Active |
| `mobile` | React Native / Expo mobile app | Active |
| `builder` | Visual SDUI builder | Planned |
| `website` | Public website + docs | Planned |
| `business-dashboard` | Business admin dashboard | Planned |
| `tenant-dashboard` | Tenant admin dashboard | Planned |
| `sdk` | Integration SDK | Planned |
| `cli` | CLI tooling | Planned |

## 3. Product Surfaces

| Surface | Technology | Audience | Status |
|---------|------------|----------|--------|
| Mobile App | React Native / Expo | End users (tenants' customers) | Active |
| Backend API | TBD | All surfaces | Planned |
| Builder | TBD | Tenant admins configuring Desks | Planned |
| Business Dashboard | TBD | Business owners | Planned |
| Tenant Dashboard | TBD | Tenant administrators | Planned |
| Website | TBD | Public, documentation | Planned |

## 4. Key Capabilities

- Catalog / Menu display
- Cart & Checkout
- Order management
- Notifications
- Booking / Scheduling
- Promotions & Offers
- Multi-tenant branding
- Offline support
- Capability-based feature gating

---

**Parent:** KB-001 — README
**See also:** KB-004 — Core Principles, KB-007 — System Architecture, KB-008 — Service Boundaries
