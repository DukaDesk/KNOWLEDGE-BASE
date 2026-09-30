# Freeform builder validation - 2026-09-29

The merchant ValidationEngine used the legacy preset widget registry, rejecting text_block and nested_section even though the builder and native renderer implement them.

Implemented:
- Draft validation accepts the builder catalog plus legacy registered widgets.
- Section containers do not require a preset type; compiler emits layout nodes.
- Nested children are validated recursively.
- Regression covers an app with only two buttons, no tabs or shared chrome; compiler preserves both buttons.

Backend compatibility validation remains authoritative for the deployed shell. Arbitrary unknown component implementations still require runtime support. Existing solid-fill backend patch must also be deployed if not already deployed.

TODO:
- [ ] Deploy merchant validation fix.
- [ ] Verify the two-button app on a device against a successful backend publication.