# Specification: Component System

**SPEC-003 — UI | Component System**

| Metadata | Value |
|----------|-------|
| SPEC-ID | SPEC-003 |
| Title | Component System |
| Version | 0.1.0 |
| Status | Implemented |
| Owner | Mobile |
| Review Status | Not Reviewed |
| Last Updated | 2026-07-09 |
| Depends On | KB-007, KB-009 |
| Required By | Mobile implementation |

## Overview

Components are the building blocks of screens, registered by type name and rendered by RegistryRenderer.

## Patterns

- **Section Components**: Self-contained UI sections (CategoryPills, MenuGrid, OrderHistory, InfoList, etc.)
- **Interactive Components**: Trigger actions on user interaction (PrimaryButton, DynamicCard, Notification items)

## Contract

Components receive merged props (node.props + node.actions) and access `dispatchAction` through `useRuntimeContext()`.

## Registration

Components register via `registerComponent(type, component)` in `src/components/register.ts`.
