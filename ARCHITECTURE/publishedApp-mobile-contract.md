# PublishedApp Mobile Contract

This contract defines the boundary between Merchant Builder drafts, backend publishing, and mobile runtime reads.

## Draft Lifecycle

- Builder autosave is private draft persistence.
- Draft editor data is never returned by mobile definition or BFF manifest endpoints.
- Draft changes do not affect a running mobile application.

## Published Shape

A successful publish must produce a versioned object containing:

- `manifestVersion`, `version`, `publishedAt`, `status`
- `metadata`, `identity`, `capabilities`
- `navigation.root.initialRoute`, `navigation.tabs`, `navigation.routes`, `navigation.guestMode`
- `theme.version`, `theme.brand`, colors, typography, spacing, and roundness
- `runtime`, `permissions`, `localization`, `assets`, and `content`
- `screens` as a non-empty record keyed by screen ID

Each screen must be normalized to:

```json
{
  "screenId": "shop",
  "title": "Shop",
  "layout": {
    "kind": "scroll",
    "gap": 16,
    "padding": 16,
    "children": []
  }
}
```

Editor-only sections, saved-section links, and chrome metadata are resolved by the Builder before publishing and must not be required by mobile.

## Endpoints

- `POST /api/v1/merchants/{id}/publishing/publish` accepts the compiled `PublishedApp` and creates the deployed version.
- `GET /api/v1/merchants/{id}/definition` returns the latest successful deployed version.
- `GET /api/v1/bff/mobile/tenant/{slug}/manifest` returns the same deployed version.

Both read paths must return identical version and screen IDs. They must never return an editor draft or a legacy `{ name, theme, screens: [] }` stub after a successful publish.
