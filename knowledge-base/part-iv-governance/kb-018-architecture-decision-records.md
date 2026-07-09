# KB-018 — Architecture Decision Records (ADR)

**Part IV — Governance | Architecture Decision Records**

| Metadata | Value |
|----------|-------|
| KB-ID | KB-018 |
| Title | Architecture Decision Records |
| Version | 0.1.0 |
| Status | Drafting |
| Owner | Engineering |
| Review Status | Not Reviewed |
| Last Updated | 2026-07-09 |
| Depends On | KB-001, KB-017 |
| Required By | All ADRs, all specifications |

## 1. Purpose

Architecture Decision Records (ADRs) are the mechanism for recording significant architectural decisions. Every ADR is numbered, immutable once accepted, and traceable to the specifications and implementations that realize the decision.

This document also defines the **RFC (Request for Comments)** process — a lightweight precursor to ADRs that allows ideas to be discussed before committing to an architectural decision.

## 2. Decision Lifecycle

### Full Lifecycle

```
Idea
  │  (a concept or suggestion, not yet formalized)
  ▼
RFC
  │  (Request for Comments — lightweight proposal for discussion)
  ▼
Discussion
  │  (feedback collected, feasibility assessed)
  ▼
Approved / Rejected
  │  (decision to proceed or decline)
  ▼
ADR
  │  (formal architecture decision record)
  ▼
Knowledge Base Update
  │  (KB documents updated to reflect the decision)
  ▼
Implementation
```

### When to Use RFC vs. ADR

| Scenario | Use |
|----------|-----|
| New feature or component idea | RFC |
| Architectural change with clear scope | RFC then ADR |
| Minor clarification or non-breaking addition | ADR directly |
| Bug fix with no architectural impact | No RFC or ADR needed |
| Change to a Verified or Locked document | ADR required |

## 3. RFC Process

An RFC is a lightweight proposal stored in `project-management/rfc/`. It follows a simple template and is used for discussion before any formal decision is made.

### RFC Template

```markdown
# RFC-NNN: [Title]

| Field | Value |
|-------|-------|
| RFC-ID | RFC-NNN |
| Title | Proposal Title |
| Author | Name |
| Date | YYYY-MM-DD |
| Status | Draft / In Discussion / Approved / Rejected / Superseded |
| Related ADR | ADR-NNN (once approved) |

## Problem Statement

What problem does this proposal solve?

## Proposed Solution

What is being proposed?

## Alternatives Considered

What else was considered and why was this approach chosen?

## Impact

Which KB documents, specifications, or implementations would be affected?

## Open Questions

What needs to be resolved during discussion?
```

### RFC Lifecycle

1. **Draft**: Author writes the RFC and stores it in `project-management/rfc/`.
2. **In Discussion**: RFC is shared for feedback. Discussion period is typically 3-7 days.
3. **Approved**: Decision is made to proceed. An ADR should be written if the decision is architectural.
4. **Rejected**: Proposal is declined. The RFC remains in the repository for historical reference.
5. **Superseded**: A newer RFC or ADR replaces this proposal.

RFCs that are Approved but do not warrant a full ADR (e.g., minor additions) may proceed directly to implementation.

## 4. ADR Format

ADRs are stored in `adr/` at the repository root and follow this format:

```markdown
# ADR-NNN: [Title]

| Field | Value |
|-------|-------|
| ADR-ID | ADR-NNN |
| Title | Decision Title |
| Status | Proposed / Accepted / Deprecated / Superseded |
| Date | YYYY-MM-DD |
| Author | Name |
| Supersedes | ADR-MMM (if applicable) |
| Superseded By | ADR-OOO (if applicable) |

## Context

Why is this decision needed? What forces are at play? What constraints exist?

## Decision

What was decided? State the decision in clear, unambiguous terms.

## Consequences

What are the positive and negative consequences of this decision?

### Positive

- ...

### Negative

- ...

## Compliance

How will compliance with this decision be verified?

## Affected Documents

| Document | Impact |
|----------|--------|
| KB-XXX | Updated to reflect decision |
| SPEC-XXX | Must comply with this decision |

## Notes

Any additional context, discussion outcomes, or implementation guidance.
```

### ADR Header Field Definitions

| Field | Description |
|-------|-------------|
| ADR-ID | Sequential unique identifier (ADR-001, ADR-002, ...) |
| Title | Clear, concise name for the decision |
| Status | Proposed / Accepted / Deprecated / Superseded |
| Date | Date the ADR was accepted |
| Author | Person or team that authored the ADR |
| Supersedes | Previous ADR that this one replaces |
| Superseded By | Newer ADR that replaces this one |

## 5. ADR Numbering

- ADRs are numbered sequentially starting from ADR-001.
- Numbers are never reused. A deprecated ADR retains its number.
- The ADR number is assigned when the ADR is first created (Proposed status).
- The ADR register in KB-020 tracks all ADRs and their current status.

## 6. ADR Lifecycle

### States

```
Proposed
  │  (written but not yet accepted)
  ▼
Accepted
  │  (formally approved — specifications must comply)
  ▼
Deprecated
  │  (no longer applicable but retained for history)
  ▼
Superseded
  │  (replaced by a newer ADR)
```

### State Transitions

| Transition | Rule |
|------------|------|
| Proposed → Accepted | The decision is reviewed and approved through the governance process. |
| Proposed → Deprecated | The decision is rejected or abandoned. |
| Accepted → Deprecated | The decision is no longer relevant but has no direct replacement. |
| Accepted → Superseded | A newer ADR explicitly supersedes this one. |

## 7. When to Write an ADR

An ADR is required when:

- A new architectural pattern or paradigm is introduced
- A service boundary or ownership changes
- A technology choice is made (language, framework, database, infrastructure)
- A breaking change to a Verified or Locked document is proposed
- An existing decision is revisited and potentially reversed
- A cross-cutting concern affects multiple services or surfaces

An ADR is not required for:

- Bug fixes
- Internal implementation details that do not affect architecture
- Changes that conform to existing standards and patterns
- Documentation improvements that do not change meaning

## 8. Superseding ADRs

When an ADR is superseded:

1. The new ADR must explicitly list the old ADR in the Supersedes field.
2. The old ADR must be updated to set Superseded By to the new ADR.
3. The old ADR's Status must be changed to Superseded.
4. Both ADRs remain in the repository for historical reference.
5. KB-020 (Progress Registry) must be updated to reflect the change.

## 9. ADR Storage

- ADRs are stored in `adr/` at the repository root: `adr/ADR-NNN-title.md`
- The ADR template is stored at `adr/ADR-000-template.md`
- ADRs are plain Markdown files with the format defined in Section 4.

---

**Parent:** KB-001 — README
**See also:** KB-001 §10 (Architecture Governance), KB-017 (Documentation Standards), KB-019 (Review & Alignment Process), KB-020 (Progress Registry)
