# Layout insertion and plus selection - 2026-09-30

Fixed locally:
- Component browsing retains selected row/carousel/nested-section insertion targets and selected column index.
- Plus icon selects and highlights the same column as clicking its surrounding area.
- Inserting into a later empty column preserves preceding empty columns instead of clamping insertion to column one.
- Selecting another component or section clears stale insertion targets.

Validation: 17 focused hierarchy/store tests and production build passed. Regression covers every multi-column layout preset and clicking the SVG path inside the plus.

TODO:
- [ ] Deploy merchant update and verify column selection in the browser.
Follow-up after the other layouts still failed:
- Both General's component picker and the element gallery now resolve the nearest row/nested-section/carousel parent when an existing child is selected.
- An explicitly selected empty column takes precedence over the inferred parent append position.
- Regression coverage added for both pickers across all four multi-column presets.
- Production build and diff whitespace check passed. Browser verification remains pending.
- Regression testing exposed a further UI gate: Add Element was only rendered for nested_section, hiding it for selected multi-column rows. General now shows the picker whenever a component category is explicitly opened, including rows and carousel containers, while ordinary selection continues to show properties.
