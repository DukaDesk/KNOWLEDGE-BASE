# KB-012 — Coding Standards

**Part III — Engineering Standards | Coding Standards**

| Metadata | Value |
|----------|-------|
| KB-ID | KB-012 |
| Title | Coding Standards |
| Version | 0.1.0 |
| Status | Drafting |
| Owner | Engineering |
| Review Status | Not Reviewed |
| Last Updated | 2026-07-09 |
| Depends On | KB-001, KB-011 |
| Required By | All implementations |

## 1. Scope

This document defines coding conventions for all DUKADESK implementations. These standards apply to every repository governed by the Knowledge Base.

## 2. General Conventions

- 2-space indentation
- Semicolons required
- Single quotes preferred
- Trailing commas in multiline objects/arrays
- 120 character line limit

## 3. TypeScript Standards

- `strict: true` in tsconfig
- Prefer `type` imports over `interface` for object types
- Use `unknown` instead of `any`
- Use type guards for narrowing
- Use `as const` for literal types
- Use `satisfies` for type validation

## 4. Import Order

Group imports in order, separated by blank lines:
1. React / React Native
2. Third-party libraries (expo, axios, zustand)
3. Internal modules (components, runtime, services, store)
4. Types

## 5. Component Conventions

- Use default exports for components
- Function components only (no class components)
- Props type named `Props` (file-private)
- Destructure props in function signature
- `StyleSheet.create` at bottom of file

## 6. Formatting & Style

Follow Prettier defaults with the following overrides:
- Print width: 120
- Single quotes: true
- Trailing commas: all
- Semicolons: always

## 7. Error Handling

- Use ErrorBoundary at the component level for rendering errors
- Use try/catch for async operations
- Log errors with sufficient context for debugging
- Never swallow errors silently

## 8. Testing

- Component tests: prefer React Native Testing Library
- Store tests: test with Zustand directly
- Action tests: unit test handlers with mock actions
- Screenshot tests: for visual verification

## 9. Commit Messages

Follow Conventional Commits:
```
feat: new feature
fix: bug fix
docs: documentation
refactor: code change without behavior change
perf: performance improvement
chore: maintenance, tooling
```

## 10. Code Review Requirements

- Architecture consistency checked against Knowledge Base
- Terminology validated against Glossary (KB-005)
- No silent architecture drift
- EventBus events named per KB-011
- Action types validated against ActionType enum

---

**Parent:** KB-001 — README
**See also:** KB-011 — Naming Standards, KB-013 — API Standards, KB-016 — Security Standards
