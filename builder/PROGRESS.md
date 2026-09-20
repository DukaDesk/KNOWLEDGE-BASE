# Builder Progress

This file tracks the current state of the builder repository.

## Active Work

| Task | Specification | Status | Owner |
|------|---------------|--------|-------|
| | | | |

## Completed Milestones

| Date | Milestone | Notes |
|------|-----------|-------|
| 2026-07-17 | Template Gallery | 21 templates, search, filter chips, color-block cards, "Create your own" |
| 2026-07-17 | Section Editor Redesign | PageFly-inspired inline editing, floating toolbars, editorTheme design system, 6 files rewritten |

## Blockers

| Issue | Impact | Owner |
|-------|--------|-------|
| | | |

## Next Up

- Item one
- Item two

## Last Updated

2026-07-17

## 2026-09-20 - App sections and navigation authoring
Implemented local builder labels, press/page attachments and editable slug persistence. Details: [implementation](APP_SECTIONS_AND_PRESS_ACTIONS_2026-09-20.md); [separate TODO](APP_SECTIONS_AND_PRESS_ACTIONS_TODO.md).

## 2026-09-20 - Merchant browser prompts replaced
Replaced all four native alert/confirm/prompt calls with shared in-app dialogs: template-save failure, oversized upload, screen deletion, and section rename. Dialogs queue concurrent requests, use native dialog focus containment, restore focus on close, support Escape/cancel, and reject blank rename submissions. Three dialog regression tests and the merchant production build passed. Source scan found no remaining native prompt calls. Existing toast notifications are unchanged.

