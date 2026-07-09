# Specification: Tenant Model

**SPEC-002 — Data | Tenant Model**

| Metadata | Value |
|----------|-------|
| SPEC-ID | SPEC-002 |
| Title | Tenant Model |
| Version | 0.1.0 |
| Status | Implemented |
| Owner | Mobile |
| Review Status | Not Reviewed |
| Last Updated | 2026-07-09 |
| Depends On | KB-005, KB-007 |
| Required By | Mobile implementation |

## Overview

A Tenant represents a business on the DUKADESK platform. Each tenant has its own branding, navigation, screens, and capabilities.

## Data Structure

- **Manifest**: tenantId, version, capabilities, theme references, navigation, screen paths, assets
- **ThemeDefinition**: Colors, typography, spacing, roundness
- **NavigationDefinition**: initialScreen, tabs with label/icon/screenId
- **ScreenDefinition**: screenId, title, layout (kind + children) or flat children

## Tenant Resolution

1. Module registry provides default screens per capability
2. Manifest declares tenant-specific screens
3. ManifestResolver merges module defaults with tenant overrides
4. Final screens Map is passed to ScreenRenderer
