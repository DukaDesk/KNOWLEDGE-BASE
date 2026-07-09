# DUKADESK Engineering Knowledge Base

**KB-001 — Part I: Foundation | README**

| Metadata | Value |
|----------|-------|
| KB-ID | KB-001 |
| Title | README |
| Version | 0.1.0 |
| Status | Drafting |
| Owner | Engineering |
| Review Status | Not Reviewed |
| Last Updated | 2026-07-09 |
| Depends On | — |
| Required By | All KB documents, specifications, implementations |

---

## What This Is

This is the **Engineering Knowledge Base** for the DUKADESK platform.

It is the single source of truth for all architectural decisions, engineering standards, platform conventions, and governance processes across the entire DUKADESK ecosystem.

Every engineer, architect, reviewer, technical writer, AI assistant, and contributor **begins here**.

## How to Use This Repository

### Reading Order

| Ref | Document | Part |
|-----|----------|------|
| **KB-001** | **README (this document)** | Foundation |
| KB-002 | Vision & Mission | Foundation |
| KB-003 | Platform Philosophy | Foundation |
| KB-004 | Core Principles | Foundation |
| KB-005 | Platform Terminology & Glossary | Foundation |
| KB-006 | Platform Overview | Platform Architecture |
| KB-007 | System Architecture | Platform Architecture |
| KB-008 | Service Boundaries | Platform Architecture |
| KB-009 | Runtime Overview | Platform Architecture |
| KB-010 | Technology Stack | Platform Architecture |
| KB-011 | Naming Standards | Engineering Standards |
| KB-012 | Coding Standards | Engineering Standards |
| KB-013 | API Standards | Engineering Standards |
| KB-014 | Database Standards | Engineering Standards |
| KB-015 | Event Standards | Engineering Standards |
| KB-016 | Security Standards | Engineering Standards |
| KB-017 | Documentation Standards | Engineering Standards |
| KB-018 | Architecture Decision Records (ADR) | Governance |
| KB-019 | Review & Alignment Process | Governance |
| KB-020 | Progress Registry | Governance |
| KB-021 | AI Context Guide | Governance |

**New engineers** should read KB-001 through KB-021 in order before contributing.

**AI assistants** must read KB-001, KB-004, KB-011–KB-017, KB-019, and KB-021 at minimum before generating any output. Reading the full Knowledge Base is strongly recommended.

**Reviewers** must read KB-001, KB-019, and KB-021 before conducting any alignment review.

**External contributors** should read KB-001 through KB-005 and KB-017 before contributing.

### AI Boot Sequence

Every AI assistant **must** execute the following boot sequence at the start of every session:

```
Step 1:  Read KB-001 (README)
Step 2:  Read KB-020 (Progress Registry)
Step 3:  Read ADR summary (this document, Current Architecture Decisions)
Step 4:  Read relevant standards (KB-011–KB-017)
Step 5:  Read target specification (from specifications/)
Step 6:  Generate response in compliance with the Knowledge Base
```

**Never skip steps. Never assume familiarity.** Every session is a fresh start. The Knowledge Base is the only reliable source of context.

---

## Current Platform Status

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  DUKADESK — Platform Status
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Knowledge Base                Drafting

  Mobile Specification          Implemented
  Backend Specification         Implemented
  Business Dashboard            Planned
  Tenant Dashboard              Planned
  Website                       Planned

  Alignment Reviews             Not Started

  Developer Documentation       Not Started

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Implemented** means a specification has been written and exists in the repository. It does **not** mean it is aligned with the Knowledge Base.

**Verified** means a specification has been reviewed against the Knowledge Base, all findings resolved, and alignment confirmed.

Currently, Mobile and Backend specifications are Implemented but not Verified. They must undergo alignment review once the Knowledge Base reaches its first verified state.

The platform is in **Phase 1** (see Project Phases below). The Knowledge Base is being drafted. No specification will be marked Verified until the Knowledge Base itself is complete.

---

## Current Architecture Decisions

These are the active architectural decisions that shape every specification and implementation. Each decision is documented in an ADR in `/adr/`.

| Decision | Status | ADR | Description |
|----------|--------|-----|-------------|
| **Cloud Agnostic** | Active | — | Platform must not be locked to any single cloud provider. |
| **SDUI First** | Active | — | Server-Driven UI is the primary pattern for rendering mobile and web surfaces. |
| **Multi Tenant** | Active | — | Platform serves multiple tenants with strict data isolation. |
| **Offline First** | Active | — | Core functionality must work without network connectivity. |
| **Capability Based** | Active | — | Features are gated by capabilities, not roles. |
| **Event Driven** | Active | — | Services communicate primarily through asynchronous events. |
| **API First** | Active | — | Every capability is exposed through a well-defined API before any UI is built. |
| **White Label** | Active | — | Platform supports full white-label customization per tenant. |
| **Third Party Payments** | Active | — | Payment processing is delegated to third-party providers. |

New decisions are added via the ADR process defined in KB-018. Decisions are marked **Superseded** when replaced by a newer ADR.

---

## Project Phases

The DUKADESK project progresses through these phases in order:

```text
Phase 1 ── Knowledge Base
             Define vision, principles, standards, and governance.
             ↓
Phase 2 ── Specification Alignment
             Review existing Mobile and Backend specifications against the Knowledge Base.
             Revise until aligned. Generate alignment reports.
             ↓
Phase 3 ── Developer Documentation
             Generate developer documentation from verified specifications.
             ↓
Phase 4 ── Implementation
             Build platform surfaces from verified specifications.
             ↓
Phase 5 ── QA & Testing
             Verify implementation against specifications and Knowledge Base.
             ↓
Phase 6 ── Release
             Ship to production.
```

**Current phase: Phase 1.** No phase begins until the previous phase is complete and verified.

---

## 1. Introduction

The DUKADESK Engineering Knowledge Base exists to ensure that every line of code, every API endpoint, every database table, every mobile screen, every dashboard widget, and every deployment configuration is built with a **consistent architectural philosophy**.

This repository is not a collection of documentation — it is the **constitution** of the DUKADESK platform. It defines:

- **What** we build
- **Why** we build it that way
- **How** we ensure consistency across every service and surface
- **Who** is responsible for maintaining alignment
- **When** architecture may change and how those changes are governed

Nothing is considered **Verified** until it aligns with this Knowledge Base.

## 2. Goals

### Consistency

Every service, component, and surface across DUKADESK must follow the same architectural patterns, naming conventions, coding standards, and design philosophy. Consistency reduces cognitive load, accelerates onboarding, and eliminates ambiguity.

### Traceability

Every architectural decision, standard, and specification must be traceable to a documented rationale. Decisions are recorded in Architecture Decision Records (ADRs). Standards are linked to their originating principles. Specifications reference the Knowledge Base documents they align with.

### Alignment

No specification is considered complete until it has been reviewed against the Knowledge Base. Alignment reports document how each specification satisfies (or intentionally deviates from) every relevant standard and principle. Misalignment must be resolved before implementation begins.

### Reusability

Patterns, components, libraries, and conventions defined in the Knowledge Base are designed to be reused across the entire platform. When a new service or surface is added, it should leverage existing standards rather than inventing new ones.

### Scalability

The Knowledge Base is designed to grow with the platform. New documents, standards, and governance processes can be added without restructuring the existing foundation. The five-part structure supports indefinite expansion.

### Shared Understanding

Engineers working on mobile, backend, dashboard, website, and builder surfaces all operate from the same foundation. This eliminates fragmentation and ensures that a mobile engineer and a backend engineer can collaborate without architectural friction.

### AI-Assisted Development

The Knowledge Base is structured to be consumed by both humans and AI models. Every document uses consistent formatting, explicit cross-references, and unambiguous terminology. AI assistants are expected to read and comply with the Knowledge Base before generating any output.

## 3. Knowledge Base Philosophy

The Knowledge Base is the **architectural foundation** of DUKADESK. It defines what is always true about the platform.

### Hierarchy

```text
Knowledge Base          Defines architecture, principles, and standards.
      ↓
Specifications         Extend architecture for specific domains and features.
      ↓
Implementation         Produces software that follows specifications.
      ↓
Documentation          Reflects verified specifications.
```

### Core Principles

| # | Principle | Meaning |
|---|-----------|---------|
| 1 | **One concept has one definition.** | Every term has a single, authoritative definition in KB-005. No synonyms. No redefinitions. |
| 2 | **Architecture precedes implementation.** | Architecture decisions are made before code is written. Implementation validates architecture; it does not define it. |
| 3 | **Alignment precedes verification.** | A specification must be reviewed against the Knowledge Base before it can be marked Verified. Review is mandatory, not optional. |
| 4 | **Verified specifications precede implementation.** | Code is written from Verified specifications. Implementation that deviates from a Verified specification is a defect, not a feature. |
| 5 | **The Knowledge Base is the product's memory.** | Specifications describe how the platform is built. Implementations produce the software. If a conflict exists, the conflict is resolved through the Knowledge Base—not through code or conversation. |

### AI Mandate

AI assistants **must** treat the Knowledge Base as the single source of truth. In any conflict between conversation history, general best practices, and the Knowledge Base, the Knowledge Base prevails. If a contradiction is discovered within the Knowledge Base, it must be flagged — not silently resolved.

## 4. Relationship to Specifications

The Knowledge Base and Specifications serve different purposes and live at different layers of abstraction:

```text
Knowledge Base          Defines principles, standards, and governance.
      ↓
Specifications         Describe systems, services, and features.
      ↓
Implementation         Produces software that satisfies specifications.
```

| Dimension | Knowledge Base | Specifications |
|-----------|---------------|----------------|
| **Scope** | Whole platform | Single domain or feature |
| **Purpose** | Declare what is always true | Describe what will be built |
| **Audience** | All engineers and AI | Domain teams |
| **Change rate** | Slow, governed | Faster, iterative |
| **Verification** | Self-referential (aligned internally) | Aligned against Knowledge Base |

A specification that contradicts the Knowledge Base is **misaligned** and must be revised. A Knowledge Base change that invalidates a verified specification requires an ADR and a migration plan.

## 5. Engineering Rules

These rules are **permanent and non-negotiable**. Every engineer, reviewer, and AI assistant must follow them without exception. They exist to prevent architectural drift and ensure consistency across every surface of DUKADESK.

| # | Rule |
|---|------|
| 1 | **One concept has one definition.** Never introduce synonyms or redefined terms. Use KB-005 (Glossary) as the definitive reference. |
| 2 | **One service owns one responsibility.** Services must have clear, bounded domains. Shared ownership is technical debt. |
| 3 | **No specification redefines terminology.** Terminology defined in the Knowledge Base is authoritative. Specifications may extend but must not contradict. |
| 4 | **Breaking architectural changes require ADRs.** Any change that alters contracts, interfaces, or architectural behavior must be documented in an ADR before implementation. |
| 5 | **No document becomes Verified without review.** A document status may not be changed to Verified without a completed alignment review. |
| 6 | **Developer Documentation is generated from verified architecture.** Documentation is not written independently. It is derived from aligned specifications and architecture. |
| 7 | **Implementation follows verified specifications.** Code that deviates from a Verified specification is not a feature — it is a defect. |

## 6. Repository Structure

```text
DUKADESK OS/
├── README.md                          ← KB-001 (You are here)
├── knowledge-base/
│   ├── part-i-foundation/
│   │   ├── kb-001-readme.md
│   │   ├── kb-002-vision-mission.md
│   │   ├── kb-003-platform-philosophy.md
│   │   ├── kb-004-core-principles.md
│   │   └── kb-005-terminology-glossary.md
│   ├── part-ii-platform-architecture/
│   │   ├── kb-006-platform-overview.md
│   │   ├── kb-007-system-architecture.md
│   │   ├── kb-008-service-boundaries.md
│   │   ├── kb-009-runtime-overview.md
│   │   └── kb-010-technology-stack.md
│   ├── part-iii-engineering-standards/
│   │   ├── kb-011-naming-standards.md
│   │   ├── kb-012-coding-standards.md
│   │   ├── kb-013-api-standards.md
│   │   ├── kb-014-database-standards.md
│   │   ├── kb-015-event-standards.md
│   │   ├── kb-016-security-standards.md
│   │   └── kb-017-documentation-standards.md
│   ├── part-iv-governance/
│   │   ├── kb-018-architecture-decision-records.md
│   │   ├── kb-019-review-alignment-process.md
│   │   ├── kb-020-progress-registry.md
│   │   └── kb-021-ai-context-guide.md
│   └── part-v-alignment-reports/
│       ├── ar-mobile.md
│       ├── ar-backend.md
│       ├── ar-dashboard.md
│       ├── ar-website.md
│       └── ar-builder.md
├── specifications/                    ← Domain-specific specifications
├── adr/                               ← Architecture Decision Records
├── project-management/                ← Roadmap, RFCs, planning artifacts
│   ├── roadmap/
│   ├── milestones/
│   ├── backlog/
│   ├── rfc/
│   ├── meeting-notes/
│   ├── release-plans/
│   ├── sprint-plans/
│   └── alignment-reports/
└── docs/                              ← Developer documentation (future)
```

### Legend

| Directory | Purpose |
|-----------|---------|
| `part-i-foundation/` | Core identity: vision, philosophy, principles, glossary |
| `part-ii-platform-architecture/` | System design: architecture, services, runtime, tech stack |
| `part-iii-engineering-standards/` | Conventions: naming, coding, APIs, databases, events, security, docs |
| `part-iv-governance/` | Processes: ADRs, reviews, progress tracking, AI behavior |
| `part-v-alignment-reports/` | Generated reports that verify specifications against the Knowledge Base |
| `specifications/` | Detailed specifications for services, features, and components |
| `adr/` | Architecture Decision Records (numbered, immutable) |
| `project-management/` | Roadmap, RFCs, milestones, backlog, sprint plans, meeting notes, release plans |
| `docs/` | Developer documentation (created after alignment) |

## 7. Engineering Workflow

Every engineering artifact follows a defined lifecycle:

```text
Vision
  │  (platform vision and strategic direction)
  ▼
Knowledge Base
  │  (defines principles, standards, and governance)
  ▼
Architecture
  │  (translates principles into system design decisions)
  ▼
Specifications
  │  (describe systems, services, and features)
  ▼
Alignment Review
  │  (reviewed against all relevant KB documents by a Review Agent)
  ▼
Verified Specifications
  │  (officially aligned — status updated in KB-020)
  ▼
Developer Documentation
  │  (generated from verified specifications)
  ▼
Implementation
  │  (follow Coding Standards, KB-012)
  ▼
Testing
  │  (verified against specification)
  ▼
Release
```

### Stage Descriptions

**Vision**: The platform vision and strategic direction. Vision is defined in KB-002 and provides the "why" behind every engineering decision.

**Knowledge Base**: The Knowledge Base defines principles, standards, and governance. It is the constitution — everything below must conform to it.

**Architecture**: The Architecture layer translates platform principles into concrete system design decisions. This includes service boundaries, communication patterns, data flow, and technology choices. Architecture decisions are recorded in ADRs (KB-018). The Architecture layer bridges the gap between abstract principles (Knowledge Base) and concrete specifications.

**Specifications**: Formal specification documents describe systems, services, and features. Each specification must explicitly reference which KB documents it aligns with and how.

**Alignment Review**: A Review Agent (human or AI) evaluates the specification against the Knowledge Base. Findings are documented in the relevant alignment report (`part-v-alignment-reports/`).

**Verified Specifications**: The specification is marked as **Verified** — it is officially aligned with the Knowledge Base. Verification is recorded in KB-020 (Progress Registry).

**Developer Documentation**: Documentation is generated from Verified specifications. It is not written independently. Documentation reflects Verified architecture.

**Implementation**: Engineering teams implement the specification following KB-012 (Coding Standards), KB-013 (API Standards), and all other relevant standards.

**Testing**: Implementation is verified against the specification. Test plans must also align with the Knowledge Base.

**Release**: The implemented feature is released. Post-release, alignment reports may be updated to reflect implementation reality.

## 8. Knowledge Base Lifecycle

The Knowledge Base itself follows a formal lifecycle — just like software. No document within the Knowledge Base is considered authoritative until it reaches the **Verified** state.

### KB Lifecycle

```text
Drafting
  │  (content is provisional and subject to change)
  ▼
Under Review
  │  (complete and awaiting alignment review)
  ▼
Verified
  │  (reviewed, aligned, and authoritative)
  ▼
Locked
  │  (changes require an ADR)
  ▼
Versioned Release
  │  (published as a numbered baseline)
```

**Version 1.0** represents the first architecture baseline for DUKADESK. It is reached when the entire Knowledge Base is Locked and released together.

### Stage Definitions

| Stage | Meaning | Transition Rules |
|-------|---------|------------------|
| **Drafting** | Content is being written and is provisional. | Any authorized contributor may draft. Status headers must indicate Drafting. |
| **Under Review** | Content is complete and awaiting review. | A review request is submitted. A Review Agent is assigned. Findings are documented. |
| **Verified** | Content has been reviewed and is authoritative. | All review findings must be resolved. Final approval is required. |
| **Locked** | Content is Verified and immutable without governance. | Changes require a formal ADR. No direct edits permitted. |
| **Deprecated** | Content is superseded and no longer applicable. The deprecation notice must point to the replacement. | An ADR must document why the document is deprecated and what replaces it. |

### Individual Document Statuses

Each document within the Knowledge Base uses the same statuses. A document in `Drafting` is not authoritative. A document in `Verified` or `Locked` is authoritative. A document in `Deprecated` must not be referenced by new specifications.

### Transition Rules

- Documents may skip `Planned` when urgent (e.g., security standards).
- Only `Verified` and `Locked` documents are authoritative.
- `Deprecated` documents remain in the repository for historical reference.
- The Knowledge Base as a whole reaches Versioned Release only when all constituent documents are Locked or Verified.

## 9. Alignment Philosophy

Alignment is the **central discipline** of the DUKADESK engineering process.

### What Alignment Means

A specification, component, service, or artifact is aligned when it satisfies every relevant requirement, standard, principle, and convention defined in the Knowledge Base. Alignment is not subjective — it is determined by explicit review against the established documents.

### Key Tenets

1. **No specification is complete until aligned.** A specification that has not undergone alignment review is provisional, regardless of how well-written it is.

2. **Implementation does not imply alignment.** A feature that has been implemented but does not align with the Knowledge Base is technical debt, not delivery.

3. **Alignment is bidirectional.** The Knowledge Base constrains specifications, but specifications may also reveal gaps or contradictions in the Knowledge Base. These must be resolved through the governance process (KB-019).

4. **Partial alignment is not alignment.** If a specification aligns with Engineering Standards but violates Core Principles, it is misaligned. All relevant dimensions must be satisfied.

5. **Intentional deviations require documentation.** If a specification consciously deviates from a standard, the deviation must be documented with rationale and approved through the governance process.

### Alignment Reports

Alignment reports live in `part-v-alignment-reports/`. Each report documents:

- Which specification was reviewed
- Which KB documents were used as reference
- What findings were identified
- How each finding was resolved
- The final alignment verdict

## 10. Architecture Governance

Architecture decisions are not made lightly. Every decision must be justified, documented, and traceable.

### Architecture Decision Records (ADRs)

ADRs are the mechanism for recording significant architectural decisions. Each ADR is:

- **Numbered** sequentially (ADR-001, ADR-002, ...)
- **Immutable** once accepted (errors may be corrected with a superseding ADR)
- **Dated** with the date of acceptance
- **Referenced** in specifications and code that implement the decision

An ADR contains:

- **Title**: A clear, concise name for the decision
- **Status**: Proposed, Accepted, Deprecated, Superseded
- **Context**: Why the decision is needed
- **Decision**: What was decided
- **Consequences**: What the impact of the decision is (positive and negative)
- **Compliance**: How compliance will be verified

ADRs are stored in `adr/` at the repository root.

### Change Proposals

Changes to Verified or Locked documents must follow this process:

1. **Proposal**: Write a brief proposal describing the change and its rationale.
2. **Impact Assessment**: Identify which KB documents, specifications, and implementations would be affected.
3. **ADR**: If the change involves an architecture decision, write an ADR.
4. **Review**: Submit the proposal and ADR for review through KB-019 (Review & Alignment Process).
5. **Approval**: Changes to Part I or Part II documents require broader approval than changes to Part III documents.
6. **Update**: Once approved, update the relevant documents and record the change in KB-020 (Progress Registry).

### Breaking Changes

Breaking changes to architecture require:

- An ADR explicitly marked as `[BREAKING]`
- A migration plan for all affected services and surfaces
- A communication period before the change takes effect
- Updates to all alignment reports that reference the affected documents

## 11. AI Usage Guidelines

AI assistants (including coding agents, review agents, and context generators) **must** comply with the following guidelines when working with the DUKADESK Knowledge Base.

### Mandatory Reading

Before generating any output related to DUKADESK, an AI assistant must read:

| Minimum Required | Strongly Recommended |
|------------------|---------------------|
| KB-001 (README) | All KB documents |
| KB-004 (Core Principles) | |
| KB-011–KB-017 (Engineering Standards) | |
| KB-019 (Review & Alignment Process) | |
| KB-021 (AI Context Guide) | |



### Behavioral Rules

1. **Read before writing.** The Knowledge Base must be consulted before generating specifications, code, documentation, or alignment reports. Never assume familiarity with the conventions.

2. **Treat the Knowledge Base as authoritative.** If the Knowledge Base defines a convention, it takes precedence over general best practices, personal preference, or patterns from other projects.

3. **Do not redefine existing concepts.** If a term, pattern, or convention is already defined in the Knowledge Base, use it as defined. Do not introduce synonyms, variations, or alternative definitions.

4. **Extend, do not replace.** When adding new functionality, extend existing patterns and conventions rather than replacing them. If an existing pattern cannot accommodate the new requirement, propose a change through the governance process.

5. **Flag contradictions.** If you discover a contradiction within the Knowledge Base or between the Knowledge Base and a specification, flag it explicitly. Do not silently choose one interpretation.

6. **Follow established terminology.** Use KB-005 (Glossary) as the definitive reference for all platform terminology. Inconsistent terminology is a source of architectural drift.

7. **Respect ADRs.** Architecture Decision Records are immutable once accepted. Implementations must comply with accepted ADRs. If an ADR appears incorrect or outdated, a new ADR must be written to supersede it.

8. **Maintain document status.** Always check the status header of any document before referencing or modifying it. Locked documents must not be edited directly. Deprecated documents must not be referenced by new work.

9. **Cite your sources.** When generating output that references the Knowledge Base, cite the specific KB document numbers and versions. This enables traceability and verification.

10. **Do not guess.** If you are uncertain about a standard, convention, or architectural decision, state the uncertainty rather than inventing an answer. Refer the user to the appropriate KB document.

### Violation Handling

If an AI assistant is found to have generated output that contradicts the Knowledge Base:

1. The violation is documented in KB-020 (Progress Registry).
2. The affected output is flagged for review.
3. The AI assistant's context is corrected with the relevant Knowledge Base references.

Repeated or systematic violations may result in the AI assistant being excluded from the engineering workflow until remediation is verified.

---

## 12. AI Boot Sequence

Every AI assistant **must** execute the following process before generating any work. Skipping these steps increases architectural drift and may produce output that contradicts the Knowledge Base.

### Boot Sequence

```
Step 1: Read README (KB-001)              — understand the constitution
Step 2: Read Progress Registry (KB-020)   — understand current phase and status
Step 3: Read ADR Summary                  — understand active architecture decisions
Step 4: Read Platform Standards           — understand constraints (KB-011–KB-017)
Step 5: Read Relevant Specification       — understand what to build or review
Step 6: Perform Requested Task            — produce output compliant with all of the above
```

### Rules

- **Never skip steps.** Every step builds on the previous one.
- **Never assume familiarity.** Every AI session begins without context.
- **The Knowledge Base is the only reliable source of truth.** Conversation history, general best practices, and prior sessions are secondary.

---

## 13. Review Agents

Review Agents are specialized reviewers that evaluate specifications against the Knowledge Base. Each agent focuses on a specific domain.

### Agent Registry

| Agent | Domain | Primary KB References |
|-------|--------|-----------------------|
| **Architecture Agent** | Cross-cutting architecture decisions | KB-001, KB-004, KB-006–KB-010, KB-018 |
| **Mobile Agent** | Mobile application specifications | KB-006–KB-010, KB-011–KB-017 |
| **Backend Agent** | Backend services, APIs, data | KB-006–KB-010, KB-011–KB-016 |
| **Dashboard Agent** | Dashboard specifications | KB-006–KB-010, KB-011–KB-017 |
| **Website Agent** | Website specifications | KB-006–KB-010, KB-011–KB-017 |
| **API Agent** | API design and contract compliance | KB-011, KB-013 |
| **Security Agent** | Security standards compliance | KB-016 |
| **Naming Agent** | Naming convention compliance | KB-005, KB-011 |
| **Database Agent** | Database schema and migration compliance | KB-011, KB-014 |
| **Documentation Agent** | Documentation standard compliance | KB-017 |

### Responsibilities

- Review Agents **review** specifications — they do not generate them.
- Each agent evaluates specifications against its domain's Knowledge Base references.
- Findings are documented in the relevant alignment report (`part-v-alignment-reports/`).
- Review Agents may be human or AI.

---

## 14. Review Process

Alignment reviews are conducted for every specification before it can be marked as Verified. The review process is defined in detail in KB-019 (Review & Alignment Process).

### Review Domains

| Domain | Review Agent | Knowledge Base References |
|--------|--------------|--------------------------|
| Mobile | Mobile Agent | KB-002–KB-017 |
| Backend | Backend Agent | KB-002–KB-017 |
| Dashboard | Dashboard Agent | KB-002–KB-017 |
| Website | Website Agent | KB-002–KB-017 |
| Builder | Builder Agent | KB-002–KB-017 |

Each domain alignment report in `part-v-alignment-reports/` documents the findings for specifications in that domain.

### Review Artifacts

Every review produces:

1. **Findings list**: Specific items where the specification deviates from the Knowledge Base.
2. **Severity rating**: Each finding is rated as Critical, Major, Minor, or Observation.
3. **Resolution**: How each finding was resolved (specification revised, Knowledge Base updated, deviation approved).
4. **Verdict**: Aligned, Conditionally Aligned, or Not Aligned.

### Escalation

Unresolvable disagreements between a specification author and a Review Agent are escalated through the governance process defined in KB-019.

## 15. Versioning

### Knowledge Base Versioning

The Knowledge Base as a whole is versioned using **semantic versioning** (MAJOR.MINOR.PATCH).

| Version Bump | Criteria |
|-------------|----------|
| MAJOR | Breaking changes to architecture, principles, or standards that affect multiple services. |
| MINOR | New documents, non-breaking additions to existing standards, or clarifications. |
| PATCH | Corrections, typo fixes, formatting improvements, or minor clarifications. |

The current version is recorded at the top of this document and in KB-020 (Progress Registry).

### Individual Document Versioning

Each KB document carries its own version number. Document versions may change independently of the Knowledge Base version when the document is updated without affecting other documents.

### Specification Versioning

Specifications in `specifications/` are versioned independently. Each specification must document which version of the Knowledge Base it was aligned against at the time of verification.

### Alignment Report Versioning

Alignment reports in `part-v-alignment-reports/` are versioned. Each report specifies:

- Which version of the Knowledge Base was used for the review
- Which version of the specification was reviewed
- Its own version number (incremented when findings are revised)

### Developer Documentation Versioning

When developer documentation is created (after alignment), it will follow the versioning conventions defined in KB-017 (Documentation Standards).

## 16. Contribution Guidelines

### Proposing Changes

1. **Check existing documents first.** Your proposed change may already be addressed or may conflict with existing content.
2. **Open an issue or discussion** describing the change and its rationale.
3. **Write a brief proposal** outlining:
   - What you want to change
   - Why the change is needed
   - Which KB documents would be affected
   - Whether the change is additive, clarifying, or breaking
4. **Wait for feedback** before writing the full change.

### Submitting Specifications

1. **Follow the specification template** defined in KB-017 (Documentation Standards).
2. **Explicitly reference** every KB document that applies to your specification.
3. **Submit for alignment review** by opening a review request as defined in KB-019.
4. **Address findings** from the alignment review.
5. **Update the document status** to `Verified` only after all findings are resolved.

### Requesting Reviews

1. Ensure your specification or document is complete (no placeholder sections).
2. Identify the relevant Review Agent (see Section 13 — Review Agents).
3. Submit a review request following the process in KB-019.
4. Respond to findings within the agreed timeline.

### Updating Documentation

1. Never edit a `Locked` document directly. Follow the ADR process.
2. Always update the document status header when changing a document's status.
3. Update KB-020 (Progress Registry) when documents transition between statuses.
4. Cross-reference changes: if KB document A is updated, check whether documents B, C, etc., need corresponding updates.

### Maintaining Consistency

1. **Read the full relevant section** of the Knowledge Base before making changes.
2. **Use the glossary** (KB-005) for all terminology.
3. **Follow naming standards** (KB-011) for all identifiers, filenames, and references.
4. **Format consistently** with the conventions in KB-017.
5. **Run a consistency check** before submitting: verify that your changes do not contradict any existing Verified or Locked document.

## 17. Future Expansion

The Knowledge Base is designed to support growth without structural redesign. The five-part structure and governance framework can accommodate the following future additions:

| Addition | Impact on Knowledge Base |
|----------|-------------------------|
| **SDK Development** | New standards documents in Part III. New alignment reports in Part V. |
| **CLI Tools** | Additions to Part II. New runtime documentation in KB-009. |
| **Desktop Applications** | New platform document in Part II. New alignment report in Part V. |
| **Web Renderer** | Extension of existing architecture documents. New standards in Part III. |
| **AI Agents** | Additions to Part IV. New AI-specific standards in KB-021. |
| **Marketplace Extensions** | New standards in Part III. New governance processes in Part IV. |
| **Additional Documentation** | New KB documents within any existing part. New parts if a sixth category emerges. |

### Expansion Principles

1. **Extend existing parts before creating new ones.** A new standard belongs in Part III, not a new Part VI.
2. **New parts require governance approval.** Creating a new part (e.g., Part VI — Operations) requires an ADR.
3. **Alignment reports scale per domain.** Each new surface or product domain receives its own alignment report in Part V.
4. **The glossary grows organically.** New terms are added to KB-005 as they emerge.
5. **ADRs are forever.** Every significant expansion will produce ADRs that document the rationale and consequences of the expansion.

---

## Appendix A: Quick Reference

### Status Acronyms

| Acronym | Status |
|---------|--------|
| PLN | Planned |
| DFT | Drafting |
| UR | Under Review |
| VER | Verified |
| LCK | Locked |
| DEP | Deprecated |

### File Naming Convention

KB documents use the `kb-` prefix with three-digit numbering:

```text
{part-dir}/kb-{nnn}-{kebab-case-title}.md
```

Examples:
- `part-i-foundation/kb-001-readme.md`
- `part-iv-governance/kb-019-review-alignment-process.md`

### Status Header Template

Every KB document begins with the following metadata header (defined in KB-017):

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
| Depends On | KB-XXX, KB-YYY or — |
| Required By | KB-XXX, SPEC-XXX or — |
```

---

*This is KB-001, the README of the DUKADESK Engineering Knowledge Base. It is the entry point for all engineering work on the DUKADESK platform. Every engineer, architect, reviewer, and AI assistant should begin here.*
