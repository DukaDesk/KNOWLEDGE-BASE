# AI-Assisted Builder

| Metadata | Value |
|---|---|
| Title | AI-Assisted Builder Agent Contract |
| Version | 0.1.0 |
| Status | Under Review |
| Owner | Builder Engineering |
| Review Status | Implementation aligned; backend hardening open |
| Last Updated | 2026-10-08 |
| References | KB-022 Builder Studio, KB-030 Validation Engine, ADR-013, KB-C006 AI Laws |

## Purpose

The DukaDesk Builder Agent helps a merchant express a visual app-building goal in natural language and proposes an editable change to the current Desk. It is an assistant inside the existing visual builder, not an unrestricted code generator or a substitute for the Builder, Runtime, or backend.

The current implementation is in `DUKA-MERCHANT/dukaDesk/src/services/builderAgent.js` and `DUKA-MERCHANT/dukaDesk/src/components/section-editor/BuilderAgentPanel.jsx`. It uses the existing server-side AI completion transport; provider credentials never enter the browser.

## Supported Scope

The agent may propose declarative changes to:

- Desk name, tagline, and brand color.
- Existing or new screens.
- Screen sections and visual components registered in the merchant builder's component registry.
- Allowlisted component properties and basic navigation among screens in the proposal.

The agent must refuse or ask for clarification rather than implement requests involving backend/API work, authentication, payments, database schemas, arbitrary code/HTML/scripts, deployment, administrator operations, unimplemented runtime behavior, or unsupported components. It must not invent business facts, contact details, prices, inventory, credentials, APIs, or integrations. Generic sample content must be identified as placeholder content.

## Proposal Contract

Each request is answered as one structured response:

```json
{
  "scope": "in_scope | out_of_scope | needs_clarification",
  "reply": "A concise explanation or one clarification question",
  "proposal": {
    "app": {},
    "screens": [],
    "navigation": {}
  }
}
```

Only an `in_scope` response may include an applicable proposal. Screen trees use the existing merchant authoring shape: screen -> `bodySections` -> `components`, with registered component `type` and allowlisted `props`. Replacements/appends are explicit. Proposals are bounded in size and must target existing or proposed screen IDs.

## Safety and UX Requirements

1. Ground generation in the current app identity, selected screen, bounded recent chat, screen/section/component structure, navigation, and the registered component/property catalog. Do not send customer, order, or product records or existing text values as design context.
2. Treat all model output as untrusted data. Parse structured JSON; reject malformed/out-of-scope proposals, unknown component types, unsupported properties, executable/action fields, external links, and invalid navigation targets.
3. Apply the existing `ValidationEngine` to the proposed full design before offering it to the merchant. Invalid proposals are not applied.
4. Never mutate the canvas automatically. Show a concise change summary and an explicit Apply action. Apply through the existing undo-aware `DesignStore` path so the merchant can inspect, edit, undo, save, and publish using the normal workflow.
5. Render assistant text as text, not HTML. Show loading, error, out-of-scope, clarification, proposal, and validation-warning states.
6. Preserve the visual builder as the source of truth. AI cannot bypass component registration, design serialization, validation, preview, or publication approval.

## Backend Security Follow-Up

The current client uses `POST /api/v1/ai/complete`, which accepts caller-provided system prompts and optional user/tenant IDs. The client omits identity claims, but client-side prompt rules are not a server security boundary. A dedicated endpoint is required before treating policy, tenant attribution, usage limits, or structured output as server-enforced: `DUKA-BACKEND/docs/BUILDER_AGENT_BACKEND_TODO.md`.

The target endpoint must derive user identity from JWT, resolve active merchant membership, own the system instructions server-side, enforce bounded context/output and usage controls, validate output against runtime component compatibility, and record authenticated usage attribution. Until then, the frontend must retain strict local parsing/sanitization/validation and must not send customer records or credentials.

## Traceability

- `KNOWLEDGE-BASE/ARCHITECTURE/builder-studio.md` (KB-022): AI assists; Builder validation remains authoritative; generated artifacts are declarative.
- `KNOWLEDGE-BASE/ADRs/ADR-013-builder-template-gallery-and-section-editor.md`: current template/section editor authoring surface.
- `KNOWLEDGE-BASE/dukadesk-constitution/AI_LAWS.md` (KB-C006): read before acting, never assume, never invent architecture, always verify, preserve traceability.
- `KNOWLEDGE-BASE/CORE_PRINCIPLES.md`: SDUI, data-driven actions, backend-compatible structured data, and architecture consistency.