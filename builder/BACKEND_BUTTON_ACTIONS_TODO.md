# Builder backend button actions TODO

Implemented locally:
- General action editor: Submit form (POST), scoped to the signed-in merchant and entered backend Form ID.
- Submit uses /api/v1/merchants/{merchantId}/forms/{formId}/submit and sends { answers: formValues } per FormsPublicController.
- Mobile emits submission success/error; PublishedAppShell shows form errors.
- Backend/mobile action compatibility lists include api_request and submit_form.
- Action editor: 2 tests passed. Merchant production build and mobile TypeScript passed.

Limitations / remaining tasks:
- [ ] Device test with a real merchant form and correctly bound input field names.
- [ ] Show success feedback and retain button loading until the request finishes.
- [ ] Add Load form when returned schema/data can be bound to screen state; not exposed as a preset yet.
- [ ] Add endpoint-specific booking/order/profile action contracts after user chooses operations.
- [ ] Deploy merchant and backend; distribute mobile update.

Automatic approval review rejected generic authenticated write requests to arbitrary paths. The implemented alternative restricts the friendly editor to the existing merchant forms contract; legacy raw JSON actions were not expanded. No live submissions were sent during development.