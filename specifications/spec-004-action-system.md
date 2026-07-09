# Specification: Action System

**SPEC-004 — Runtime | Action System**

| Metadata | Value |
|----------|-------|
| SPEC-ID | SPEC-004 |
| Title | Action System |
| Version | 0.1.0 |
| Status | Implemented |
| Owner | Mobile |
| Review Status | Not Reviewed |
| Last Updated | 2026-07-09 |
| Depends On | KB-007, KB-009, KB-013 |
| Required By | Mobile implementation |

## Overview

Data-driven mechanism for components to trigger behavior. Actions are defined in JSON and dispatched through the ActionEngine.

## Handler Categories

- **Navigation**: navigate, replace, push, pop, switch_screen, switch_tenant
- **Cart**: add_to_cart, remove_from_cart, checkout
- **Communication**: open_url, open_maps, call_phone, email, share
- **Data**: api_request, submit_form, filter
- **Session**: logout, switch_tenant
- **Content**: download

## Event Bus Integration

Action handlers emit EventBus events: switch_screen → navigation:switch_screen, filter → filter:changed, submit_form → form:submit.
