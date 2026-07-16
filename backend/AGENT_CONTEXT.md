# Backend Agent Context

## Overview

The `backend/` repository contains the core server-side platform for DUKADESK OS. It exposes APIs, manages business logic, handles events, and coordinates data persistence.

## Responsibilities

- Core business logic and domain services
- REST, GraphQL, and gRPC APIs
- Authentication and authorization
- Event publishing and consumption
- Database access and migrations
- Integration with external services

## Non-Responsibilities

- Frontend rendering
- Mobile-specific logic
- CLI user interface
- Infrastructure provisioning

## Technology Stack

- Language: TBD (e.g., TypeScript/Node.js, Python, .NET, Go)
- Framework: TBD
- Database: TBD
- Messaging: TBD
- Testing: TBD

## Repository Structure

```text
backend/
  src/           # Source code
  tests/         # Test suites
  docs/          # Repository documentation
  scripts/       # Automation scripts
  AGENT_CONTEXT.md
  README.md
```

## Build and Test

```bash
scripts/bootstrap
scripts/build
scripts/test
scripts/lint
```

## Engineering Standards

- [Repository Standard](../engineering-governance/repository-governance/REPOSITORY_STANDARD.md)
- [Branching Standard](../engineering-governance/repository-governance/BRANCHING_STANDARD.md)
- [Versioning Standard](../engineering-governance/repository-governance/VERSIONING_STANDARD.md)
- [Pull Request Standard](../engineering-governance/repository-governance/PR_STANDARD.md)
- [Review Standard](../engineering-governance/repository-governance/REVIEW_STANDARD.md)
- [Release Standard](../engineering-governance/repository-governance/RELEASE_STANDARD.md)
- [AI Context Standard](../engineering-governance/repository-governance/AI_CONTEXT_STANDARD.md)
- [Boot Process Standard](../engineering-governance/repository-governance/BOOT_PROCESS_STANDARD.md)

## Specification Traceability

Specifications that target this repository:

| Specification | Title | State |
|---------------|-------|-------|
| | | |

## Agent Conventions

- Reference engineering specifications by ID in commits and pull requests.
- Prefer domain-driven design patterns for new services.
- Validate all inputs and protect secrets.
- Add tests for new behavior and bug fixes.
- Update this context when responsibilities or structure change.

## Common Tasks

- Implement an API specification: create service, controller, tests, and link PR to API-XXXX.
- Add a database migration: follow DB-XXXX and test rollback.
- Consume or publish an event: follow EVT-XXXX and add contract tests.

## Escalation

Stop and ask for human input when:

- A change conflicts with an approved ADR.
- A security-critical decision is required.
- A breaking change affects multiple repositories.
