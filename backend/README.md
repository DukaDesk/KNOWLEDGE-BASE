# Backend

Core server-side platform for DUKADESK OS. Multi-tenant Backend-as-a-Platform (BaaP) powering the DUKADESK ecosystem.

## Current State

- **~428 endpoints** across 32 modules
- **85+ Prisma models** (2073 lines)
- **Three-tier architecture:** Website (Platform), App (Tenant Self-Service), Mobile (Consumer)
- **Completion rate:** ~84/100

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | NestJS 11 (Node.js + TypeScript 6, SWC builder) |
| ORM | Prisma 6.19 |
| Database | PostgreSQL 16 |
| Cache | Redis 7 (ioredis, in-memory mock fallback) |
| Auth | JWT, Google OAuth, Apple Sign-In |
| Queue | Bull (5 queues) |
| Validation | class-validator + class-transformer |
| API Docs | Swagger/OpenAPI |
| Logging | nestjs-pino |
| Deployment | Docker + Railway |

## Getting Started

```bash
# Start infrastructure
docker compose up -d

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed
npx prisma db seed

# Start dev server
npm run start:dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build the application |
| `npm run start:dev` | Start in watch mode |
| `npm run start:prod` | Start production build |
| `npm run lint` | Lint + auto-fix |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:seed` | Seed the database |

## Documentation

- [Agent Context](AGENT_CONTEXT.md)
- [API Endpoints Reference](api-endpoints-reference.md)
- [Progress](PROGRESS.md)
- [Architecture Alignment](ARCHITECTURE_ALIGNMENT.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## License

See LICENSE file.
