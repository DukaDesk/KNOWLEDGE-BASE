# KB-017 — Documentation Standards

**Part III — Engineering Standards | Documentation Standards**

| Metadata | Value |
|----------|-------|
| KB-ID | KB-017 |
| Title | Documentation Standards |
| Version | 0.1.0 |
| Status | Drafting |
| Owner | Engineering |
| Review Status | Not Reviewed |
| Last Updated | 2026-07-09 |
| Depends On | KB-001, KB-011 |
| Required By | All KB documents, all specifications |

## 1. Scope

This document defines the mandatory structure, formatting, and metadata conventions for every document in the DUKADESK Knowledge Base and every specification in the `specifications/` directory.

Consistency across all documents ensures that both human readers and AI assistants can navigate, reference, and verify content without ambiguity.

## 2. Document Metadata Header

Every KB document and specification must begin with a metadata header using the following format:

```markdown
# Title

**KB-NNN — Part [Name] | [Document Title]**

| Metadata | Value |
|----------|-------|
| KB-ID | KB-NNN |
| Title | Document Title |
| Version | x.y.z |
| Status | Drafting / Under Review / Verified / Locked / Deprecated |
| Owner | Team or role |
| Review Status | Not Reviewed / In Review / Reviewed |
| Last Updated | YYYY-MM-DD |
| Depends On | KB-XXX, KB-YYY or — |
| Required By | KB-XXX, SPEC-XXX or — |
```

### Field Definitions

| Field | Description |
|-------|-------------|
| KB-ID | Unique document identifier (KB-NNN) |
| Title | Short name of the document |
| Version | Semantic version of the document |
| Status | Current lifecycle stage (see KB-001 Section 8) |
| Owner | Responsible team or role |
| Review Status | Whether alignment review has been performed |
| Last Updated | Date of last content change |
| Depends On | KB documents this document relies on |
| Required By | Documents or specifications that reference this document |

## 3. Document Template

All KB documents must follow this template structure. Sections marked with `*` are mandatory. Additional sections may be added per document type.

```markdown
# Title

**KB-NNN — Part [Name] | [Document Title]**

| Metadata | Value |
|----------|-------|
| KB-ID | KB-NNN |
| Title | Document Title |
| Version | x.y.z |
| Status | Status |
| Owner | Owner |
| Review Status | Review Status |
| Last Updated | YYYY-MM-DD |
| Depends On | — |
| Required By | — |

## 1. Purpose *          — Why this document exists, what it defines.

## 2. Scope *             — What is covered and what is excluded.

## 3. Content *           — The body of the document.

### 3.1 [Section]

### 3.2 [Section]

## 4. Compliance *        — How adherence to this document is verified.

## 5. References *        — Related KB documents, ADRs, and external references.

## 6. Review Checklist    — Items to verify during alignment review.

- [ ] Metadata header complete and accurate
- [ ] Terminology matches KB-005
- [ ] Cross-references use KB-ID format
- [ ] Naming follows KB-011
- [ ] No contradictions with Depends On documents

## 7. Revision History

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 0.1.0 | YYYY-MM-DD | Author | Initial draft |
```

### Specification Template

Specifications in `specifications/` follow the same metadata header but use a different body structure:

```markdown
# [Title]

**SPEC-NNN — [Domain] | [Title]**

| Metadata | Value |
|----------|-------|
| SPEC-ID | SPEC-NNN |
| Title | Specification Title |
| Version | x.y.z |
| Status | Drafting / Under Review / Verified |
| Owner | Owner |
| Review Status | Not Reviewed / In Review / Reviewed |
| Last Updated | YYYY-MM-DD |
| Depends On | KB-XXX, KB-YYY |
| Required By | Implementation |

## 1. Purpose

## 2. Scope

## 3. Requirements

### 3.1 Functional Requirements

### 3.2 Non-Functional Requirements

## 4. Architecture

## 5. API Contracts

## 6. Data Model

## 7. Security Considerations

## 8. Alignment References

| KB Document | How This Specification Satisfies It |
|-------------|-------------------------------------|
| KB-XXX | ... |

## 9. Revision History
```

## 4. Cross-Reference System

Every document must declare its relationships to other documents explicitly in the metadata header.

### Relationship Types

| Relationship | Meaning | Location |
|-------------|---------|----------|
| Depends On | This document relies on the referenced document | Metadata header |
| Required By | The referenced document or implementation depends on this document | Metadata header |
| Related | Related document for additional context | Content section |
| Referenced By | Automatically populated from reverse references | Content section |

### Cross-Reference Format

All cross-references must use the canonical ID format:

- KB documents: `KB-NNN` (e.g., KB-005, KB-017)
- Specifications: `SPEC-NNN` (e.g., SPEC-001)
- ADRs: `ADR-NNN` (e.g., ADR-001)
- Alignment reports: `AR-[domain]` (e.g., AR-mobile)

Cross-references should appear in the References section of each document:

```markdown
## 5. References

| Reference | Relationship |
|-----------|-------------|
| KB-005 | Terminology definitions used throughout |
| KB-011 | Naming conventions applied |
| ADR-003 | Architecture decision that impacts this document |
```

### Knowledge Graph

Over time, all cross-references form a directed graph of the Knowledge Base. This graph enables:

- Impact analysis: "Which documents are affected if KB-007 changes?"
- Dependency validation: "Are all Depends On documents in Verified or Locked status?"
- Navigation: "Where do I find information about the event system?"

## 5. Stable ID System

All platform entities, components, screens, APIs, and events must be assigned stable IDs. These IDs are permanent and must not change once assigned.

### ID Format

```
[DOMAIN]-[TYPE]-[NNN]
```

| Component | Pattern | Examples |
|-----------|---------|----------|
| Screens | `[DOMAIN]-SCR-NNN` | COM-CHK-001 (Checkout Screen), ADM-USR-001 (User Admin Screen) |
| API Endpoints | `[DOMAIN]-API-NNN` | PAY-API-001 (Payment API), USR-API-001 (User API) |
| Events | `[DOMAIN]-EVT-NNN` | ORD-EVT-001 (Order Created), NOT-EVT-001 (Notification Sent) |
| Services | `[DOMAIN]-SRV-NNN` | CAP-SRV-001 (Capability Service), NOT-SRV-001 (Notification Service) |
| Components | `[DOMAIN]-CMP-NNN` | UI-CMP-001 (Button), UI-CMP-002 (Card) |
| Notifications | `NOT-NNN` | NOT-001 (Push Notification Engine), NOT-002 (Email Service) |
| Capabilities | `CAP-NNN` | CAP-001 (Capability Registry), CAP-002 (Feature Flags) |

### ID Registry

Stable IDs must be registered in a central table maintained in the relevant specification or KB document. The registry tracks:

| ID | Name | Type | Owner | Status |
|----|------|------|-------|--------|
| COM-CHK-001 | Checkout Screen | Screen | Mobile | Active |
| PAY-API-001 | Payment Processing API | API | Backend | Active |

### ID Usage

- Stable IDs must be used in all cross-references, code comments, API documentation, and test cases.
- Stable IDs replace descriptive names in formal references. "See COM-CHK-001" is preferred over "See the Checkout Screen".
- AI assistants must reference stable IDs in all generated output.

## 6. Definition of Done

A document is complete only when all items in the following checklist are satisfied:

```
✓ Metadata header complete and accurate
✓ Purpose and Scope sections written
✓ Content sections filled (no placeholders)
✓ All cross-references use canonical IDs
✓ No terminology conflicts with KB-005
✓ Reviewed by domain owner
✓ Aligned against all Depends On documents
✓ ADRs referenced for all architectural decisions
✓ Glossary updated for new terms
✓ Naming standards (KB-011) applied
✓ Progress Registry (KB-020) updated
✓ Ready for alignment review
```

A specification is complete only when:

```
✓ Purpose and Scope clearly defined
✓ All functional requirements stated
✓ All non-functional requirements stated
✓ API contracts defined or referenced
✓ Data model defined or referenced
✓ Security considerations addressed
✓ Alignment references table completed
✓ Depends On KB documents in Verified or Locked status
✓ Reviewed by domain owner
✓ Submitted for alignment review
```

## 7. AI Memory Index

The AI Memory Index is a mapping that connects concepts to their locations in the Knowledge Base, specifications, ADRs, and implementation references. It enables AI assistants to find relevant information without searching the entire repository.

### Index Structure

```markdown
## AI Memory Index

| Concept | KB Document | Specification | ADR | Implementation |
|---------|-------------|---------------|-----|----------------|
| Payment | KB-007 §5 | SPEC-014 §3 | ADR-011 | Backend §8, Mobile §14 |
| Notification | KB-008 §3 | SPEC-007 §2 | ADR-004 | Backend §5, Mobile §9 |
| Capability | KB-006 §4 | SPEC-002 §1 | ADR-003 | Backend §3, Mobile §2, Builder §4 |
```

### Usage

- The AI Memory Index should be maintained in KB-021 (AI Context Guide) and updated as new documents are created.
- AI assistants must consult the AI Memory Index before searching for information across the full repository.
- When a new concept is introduced, an entry must be added to the index.

### AI Query Resolution Flow

```
AI asks: "How do payments work?"

  ↓

AI Memory Index → Payment → KB-007 §5 → ADR-011 → Backend SPEC §3 → Mobile SPEC §14

  ↓

AI reads the referenced sections in the specified order

  ↓

AI answers the question with citations
```

## 8. Formatting Conventions

### General

- Use ATX headers (`#`, `##`, `###`) for all headings.
- Use tables for structured data, lists for unordered items.
- Use fenced code blocks with language identifiers for code examples.
- Use bold for document IDs and metadata field names.
- Use horizontal rules (`---`) to separate major sections.

### File Naming

KB documents: `kb-{nnn}-{kebab-case-title}.md`
Specifications: `spec-{nnn}-{kebab-case-title}.md`
ADRs: `ADR-{nnn}-{kebab-case-title}.md`
Alignment reports: `ar-{domain}.md`

### Line Length

No hard limit, but prefer lines under 120 characters for readability. Tables and code blocks may exceed this limit.

## 9. Developer Documentation

Developer documentation is generated from Verified specifications after alignment review. It must not be written independently.

### Generation Process

1. Specification reaches Verified status
2. Developer documentation is generated from the specification content
3. Generated documentation is stored in `docs/`
4. Documentation is updated when the source specification changes

### Documentation Types

| Type | Source | Audience |
|------|--------|----------|
| API Reference | KB-013, SPEC | Developers integrating with APIs |
| Setup Guide | SPEC, KB-010 | New developers onboarding |
| Architecture Overview | KB-006–KB-010 | All developers |
| User Guides | SPEC | End users |

## 10. Review Checklist Template

Every KB document must include a Review Checklist section. The checklist serves as the alignment review criteria for that document.

```markdown
## Review Checklist

- [ ] Metadata header: KB-ID, Version, Status, Owner, Review Status, Last Updated, Depends On, Required By
- [ ] Purpose section clearly states why this document exists
- [ ] Scope section defines what is and is not covered
- [ ] Content sections contain substantive information (no "To be written")
- [ ] All cross-references use canonical ID format
- [ ] Terminology matches KB-005 exactly
- [ ] Naming follows KB-011 conventions
- [ ] No internal contradictions
- [ ] No contradictions with Depends On documents
- [ ] ADRs cited for all architectural decisions
- [ ] Revision History documents all changes
- [ ] Ready for alignment review
```

---

**Parent:** KB-001 — README
**See also:** KB-001 §6 (Repository Structure), KB-001 §15 (Versioning), KB-005 (Terminology), KB-011 (Naming Standards), KB-018 (ADR), KB-020 (Progress Registry)
