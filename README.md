# Fieldwire Take-home Automation Challenge

This project implements an automated E2E test framework using Playwright.  
It tests basic workflows in the Fieldwire application, including login, task creation, form interaction, and layout validation across viewports.

The project is organized as a TypeScript monorepo, with reusable code in libraries under `./libs` and tests under `./apps/fieldwire-tests`.

## Setup

Install dependencies:

```bash
npm install
```

Set the following variables in a `.env` file:

```
FIELDWIRE_EMAIL=test@example.com
FIELDWIRE_PASSWORD=test-password
FIELDWIRE_ENV_PROJECT=Takehome
```

> Note: this file is excluded from source control to protect secrets. In CI, its contents are injected using a GitHub secret named `FIELDWIRE_ENV` and written to disk before tests are run.

## Run Tests

```bash
npm run e2e
```

## Run Unit Tests

```bash
npm run test:libs:unit
```

## Lint

```bash
npm run lint:all
```

## Project Layout

```
.
├── apps/
│   └── fieldwire-tests/
│       ├── tests/
│       └── tsconfig.json
├── bruno/                      # Bruno API collection for testing REST endpoints
├── libs/
│   ├── api/
│   ├── helpers/
│   ├── page-objects/
│   └── test-data/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .env                        # Environment credentials (excluded from git)
├── .eslintrc.js
├── playwright.config.ts
├── package.json
├── tsconfig.base.json
└── ARCHITECTURE.md
```

## Available Scripts

The following npm scripts are defined to support testing and linting workflows:

| Script                      | Description                                                  |
|-----------------------------|--------------------------------------------------------------|
| `npm run e2e`               | Runs all Playwright end-to-end tests using `.env` credentials |
| `npm run test:libs:unit`    | Runs all Jest unit tests in the `libs/` directory             |
| `npm run lint:test`         | Lints the E2E test files under `apps/fieldwire-tests/`        |
| `npm run lint:api`          | Lints reusable API client code under `libs/api/`              |
| `npm run lint:helpers`      | Lints utility functions under `libs/helpers/`                 |
| `npm run lint:page-objects` | Lints Page Object Model classes in `libs/page-objects/`    |
| `npm run lint:all`   

## Design Notes

See [ARCHITECTURE.md](./ARCHITECTURE.md) for additional details, including CI limitations, design tradeoffs, and commentary on future improvements.
