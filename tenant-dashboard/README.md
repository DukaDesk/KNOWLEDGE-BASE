# Merchant Dashboard

Merchant-facing dashboard for DUKADESK customers. Product term per ADR-016
(`tenant-dashboard/` and backend `bff/tenant` are code names).

## Responsibilities

- Merchant user interface (`DUKA-MERCHANT/dukaDesk` shell + pages + sector pages)
- Business, product, order, customer, and team management for one merchant
- Merchant-specific settings and preferences
- Operational workflows and notifications

## Technology Stack

See `AGENT_CONTEXT.md` for current technology choices.

## Getting Started

```bash
cd ../..  # DD workspace
cd DUKA-MERCHANT/dukaDesk
npm install
npm run dev
```

## Documentation

- [Agent Context](AGENT_CONTEXT.md)
- [Architecture Alignment](ARCHITECTURE_ALIGNMENT.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## License

See LICENSE file.
