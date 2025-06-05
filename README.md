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

<<<<<<< HEAD
```bash
npm run test:libs:unit
=======
```
FIELDWIRE_EMAIL=your-email@example.com
FIELDWIRE_PASSWORD=your-password
FIREWIRE_TEST_PROJECT="Takehome"

>>>>>>> 66a6b5facc860cc81c4ef5ae613ebbd4fc22e985
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

- The tests use a pre-configured project 'Takehome'.  An API call is used to 
  retrieve the project id value.  In a production test environment, a test 
  suite should either create and delete new projects for each test run to 
  limit the number of projects in the test environment.  This would involve 
  a lot of setup or database seeding.  Because of time constraints, I 
  decided to use a pre-configured project instead of writing the Playwright 
  code to create a project via the UI.
- Viewport-specific smoke tests (apps/fieldwire-tests/tests/smoke_test.spec.
  ts) are skipped unless the browser context is 
  Chromium.
- Static JSON is used for test data to simplify setup. In production, this could be replaced with dynamic or API-fetched data.
- The test framework avoids full monorepo overhead but uses a modular layout for future scalability.
