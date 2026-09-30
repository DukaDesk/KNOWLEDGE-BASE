# Publishing compatibility fixes - 2026-09-29

## Verified code defects
- Backend runtime contract omitted native components registered in DukaDesk/src/components/register.ts and direct renderer types (nested sections, shapes, and button variants). Add these supported types; keep unknown components rejected.
- Component validation traversed actions/tapAction and could reject action types as components. Exclude action subtrees from the component walk; retain the separate action check.
- Merchant HTTP error handling displayed only errors[0], hiding backend validation details. Display all returned validation errors.

## Other observed responses
- 401 config requests are followed by successful config reads; token refresh is implemented. These logs do not establish a persistent authentication failure.
- Definition 404 can mean NO_PUBLISHED_RELEASE or MERCHANT_NOT_FOUND. Preserve the backend distinction; do not fabricate a published definition from draft config.
- The supplied production response collapsed errors, so these verified defects are not proof of every cause of the specific rejected draft.

## Remaining TODO
- [ ] Deploy backend compatibility fixes after validation.
- [ ] Deploy merchant error display fix.
- [ ] Republish the affected draft and verify release read-back and mobile rendering.
- [ ] Confirm installed mobile versions include the registered native components before rolling out templates that use them.
## Validation
- Backend compatibility suite: 14 tests passed.
- Merchant HTTP client, compiler, and publishing pipeline: 28 tests passed.
- Changes are local; deployment and affected-draft verification remain pending.

## Follow-up: solid paint rejected as a component
Builder DesignStore and staticTemplates attach fills/strokes/effects metadata to nodes. The compatibility walker incorrectly traverses those records, interpreting fill type solid as a runtime component. Exclude these appearance-only subtrees from the component walk; preserve the full manifest and asset traversal. Regression tests cover appearance metadata and continued rejection of a real component named solid. Backend deployment is required.

Follow-up validation: reproduced the exact solid rejection before the fix (15 passed, 1 failed); after excluding appearance metadata, all 16 compatibility tests passed. Used a per-command isolated ts-jest transform with TS6 rootDir/deprecation settings after the standard run stalled; repository test configuration unchanged. Fix remains local pending backend deployment.
