# Specification: Component System

**Last Updated:** 2026-07-09

## Overview
Components are the building blocks of screens. They are registered in the Component Registry by type name and rendered by RegistryRenderer.

## Registration
Components register via `registerComponent(type, component)` in `src/components/register.ts`.

## Contract
Components receive merged props (node.props + node.actions) and access `dispatchAction` through `useRuntimeContext()`.

## Patterns
- **Section Components**: CategoryPillsSection, MenuGridSection, OrderHistorySection, InfoListSection, ReportActionSection, EmptyStateSection, NotificationListSection
- **Interactive Components**: PrimaryButton (dispatches actions.default), DynamicCard (dispatches actions.addItem), Notification items (dispatch actions.tap/dismiss)

## Brand Context
Components use `useBrand()` to access theme colors from BrandThemeProvider.
