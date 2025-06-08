# Architecture

## Project File Structure

The project follows a modular folder layout inspired by monorepo principles. Test logic, reusable utilities, and test data are organized for clarity and future scalability.

```
.
├── apps/
│   └── fieldwire-tests/
│       ├── tests/                  # Feature-specific test files (e.g., forms, tasks)
│       ├── setup/                  # Authentication and global setup hooks
│       └── tsconfig.json
├── bruno/                          # Bruno API collection for exploring and verifying REST endpoints
├── libs/
│   ├── api/                        # Wrappers for backend API endpoints
│   ├── helpers/                    # Shared utilities (e.g., environment, config)
│   ├── page-objects/               # Page Object Model abstractions
│   └── test-data/                  # Static JSON fixtures for test scenarios
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions workflow for CI
├── .env                            # Local-only credentials (excluded from git)
├── playwright.config.ts            # Playwright test runner config
├── package.json
└── tsconfig.json                   # Shared TypeScript config
```

## Authentication and Session Handling

Playwright's global setup capability is used to cache authentication for the test suite. The `auth.setup.ts` file performs login once and stores the session state (e.g., local storage, cookies) in a file accessible to all tests. This approach provides:

- Faster test execution by avoiding redundant logins
- Token persistence across tests and runs
- Separation of authentication logic from feature tests

This file is referenced in `playwright.config.ts` via the `globalSetup` option, and the `storageState` path is shared through configuration.

## Bruno Collection

The `bruno/` folder contains a structured collection of API requests used to explore and validate backend behavior. Bruno is used during test development to:

- Understand request/response shapes
- Prototype test data inputs
- Validate endpoint behavior independently of UI

While Bruno is not required to run the Playwright tests, it is useful for test data design and regression triage.

## CI Integration

The `.github/workflows/ci.yml` file runs all end-to-end tests on push and pull request events. It includes:

- Environment variable injection via GitHub Secrets
- Dependency installation and linting
- Execution of Playwright tests in headless Chromium
- Upload of test artifacts (e.g., failure screenshots)

## Environment Variables

This project uses a `.env` file to store login credentials and project-specific configuration. It is loaded automatically using `dotenv`, and is excluded from version control.

In CI, secrets are injected from GitHub Actions and written to `.env` before tests are run.

## Design Principles

- **Modularity**: Tests are kept clean by isolating helpers, API wrappers, and page objects.
- **Reusability**: Shared libraries in `libs/` reduce duplication across feature tests.
- **Maintainability**: The structure supports growth across features with minimal coupling.
- **Transparency**: Bruno collections document API behavior and support development diagnostics.


### Notes:

There are remaining lint errors from overusing the 'any' type. The code could 
benefit from definitions of the task and project record format returned from 
the API, as well as a basic structure of the authentication data.
