# App data requests and DukaDesk identity

DukaDesk owns the consumer profile. Business template loading/generation excludes Profile / Account pages and their tabs. Existing saved projects and live releases are not destructively rewritten; reload a template or remove the old profile page and republish.

## Contract

Merchant builder: App sections > Request data. Select Name, Email, Phone, Profile photo; supply a purpose; optionally require approval for checkout and/or form submission. Draft config is meta.dataRequest; compiler emits top-level dataRequest in the immutable published definition. Invalid enabled requests are rejected by backend publish validation.

Backend reads only the active published release. A SHA-256 policy ID covers normalized purpose, fields and required actions. Release-version-only changes do not invalidate approval. Recipient is the app's merchant ID from the server, never a client-supplied alternate recipient. Approval for one app never grants another app access.

Authenticated consumer endpoints:
- GET /api/v1/app/data-consent/:merchantId -> merchantId, appName, policy, decision.
- POST same path, body { policyId, granted }. User identity comes from JWT. Stale policy -> 409.
- GET /api/v1/app/data-consent/:merchantId/shared-profile/:userId -> approved fields only; requires an active owner/manager membership for that exact merchant. Missing, revoked or stale consent -> 403.

Uses existing Consent, ConsentScope, ConsentAudit tables. Consent unique key is merchant/user; reserved scopes data-policy:<hash> and data:<field>. Choice and audit commit in one transaction. No schema migration is needed. No personal data is copied into manifest or consent scopes.

## Mobile behavior

1. Render the published splash.
2. After splash, authenticated users check backend consent. Guests are checked after sign-in.
3. Show a DukaDesk modal only for an unanswered current request.
4. Allow sharing saves on backend before continuing a pending action. Not now saves decline and leaves browsing available.
5. Accepted and declined choices suppress later startup prompts. A declined required action asks again. Changed purpose/fields/action requirements result in a new request.
6. Checkout and submit_form are checked again on use. Network errors block the protected action, never imply consent. Back/dismiss without a saved decision does not create consent.

Backend checkout verifies cart ownership and approval. Form submission takes the user from verified JWT rather than body.userId, enforces configured consent, and verifies form/merchant ownership. Public forms without required data remain usable anonymously on published apps.

## Deployment

Deploy backend first, then merchant, then release updated mobile shell. Configure Request data and publish each app. No deployment or production-data mutation was performed by this implementation.

## Boundaries

This adds permissioned sharing of existing account fields, not a new merchant user database or arbitrary personal-data questionnaire. Separate apps each request their own consent. A new purpose requires new consent; there is no periodic nag timer.

Native app/checkout.tsx currently uses commerceRepository.submitOrder, which creates a local order and has pre-existing payment placeholder messages. Consent is gated there, but live checkout/payment integration is separate and must not be described as complete.

## Verification

- Merchant: 27 focused template and published-manifest tests passed; production build passed.
- Backend: 19 consent/publish-validator tests passed; TypeScript check passed.
- Mobile: 7 consent policy/modal tests passed, including after-splash timing, decline persistence, waiting for server approval and failed-save blocking.
- Device and deployed end-to-end verification remains pending as listed in the separate stack TODO files.
- Final mobile TypeScript check passed.
