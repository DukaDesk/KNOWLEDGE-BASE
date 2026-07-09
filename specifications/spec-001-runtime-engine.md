# Specification: Runtime Engine

**SPEC-001 — Runtime | Runtime Engine**

| Metadata | Value |
|----------|-------|
| SPEC-ID | SPEC-001 |
| Title | Runtime Engine |
| Version | 0.1.0 |
| Status | Implemented |
| Owner | Mobile |
| Review Status | Not Reviewed |
| Last Updated | 2026-07-09 |
| Depends On | KB-007, KB-009 |
| Required By | Mobile implementation |

## Overview

The Runtime Engine is the core rendering system. It takes tenant data and produces interactive screens.

## Components

### ManifestResolver (`src/runtime/ManifestResolver.ts`)
Entry point for all tenant data. Fetches manifest → theme → navigation → screens via ApiClient.

### ScreenEngine (`src/runtime/ScreenEngine.tsx`)
Renders a single screen based on `screenId`.

### ComponentRegistry (`src/runtime/ComponentRegistry.tsx`)
Maps `type` strings to React Native components.

### LayoutEngine (`src/runtime/layouts/index.ts`)
Renders `LayoutNode` trees with `kind` values: column, row, scroll, stack, grid, section.

### ErrorBoundary (`src/runtime/ErrorBoundary.tsx`)
Catches rendering errors and displays a fallback UI.

## Types

All runtime types defined in `src/runtime/types.ts`: RuntimeNode, LayoutNode, ActionDef, ActionType, ScreenDefinition, NavigationDefinition, ThemeDefinition.
