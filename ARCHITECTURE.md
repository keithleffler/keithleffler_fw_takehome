# Architecture

## Project File Structure

The project follows a modular layout inspired by monorepo principles, even though Nx is not currently used. The structure separates test logic, reusable utilities, and test data for clarity and future scalability.

```
.
├── apps/
│   └── fieldwire-tests/
│       ├── tests/                  # Feature-specific test files (e.g., forms, tasks)
│       └── tsconfig.json
├── libs/
│   ├── api/                        # Wrappers for API endpoints
│   ├── helpers/                    # Reusable utilities like login()
│   ├── page-objects/               # Page Object Model abstractions
│   └── test-data/                  # Static JSON fixtures for test scenarios
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions workflow for CI
├── .env                            # Local-only credentials (excluded from git)
├── .eslintrc.js                    # Root ESLint config
├── playwright.config.ts            # Playwright test runner config
├── package.json
├── tsconfig.base.json              # Shared TypeScript config with path aliases
└── ARCHITECTURE.md                 # Design decisions and structure notes
```

## Environment Variables

This project uses a `.env` file to store login credentials and other environment-specific values. The file is loaded automatically at runtime via `dotenv`, and is excluded from source control (`.gitignore`) to avoid exposing secrets.

In CI, these values are injected using a GitHub Actions secret (`FIELDWIRE_ENV`) which contains the same `.env` content. This ensures test credentials are available in both local and CI environments without hardcoding sensitive data.

## libs/api

This folder contains reusable API client logic. It currently includes:

- A base API class for shared HTTP behavior
- This includes methods to load the stored user credentials and extract the access token
- A `ProjectsApi` class that performs a `GET` request to retrieve a user’s projects

This pattern could be extended to support additional endpoints in a modular way.

Unit tests for the `ProjectsApi` class would typically be written in **Jest**, using mocks to simulate API responses and validate behavior in isolation. Due to time constraints, these unit tests are not included in this take-home, but the code is structured to support them.

## Bruno Collection

The `bruno/` folder contains a small [Bruno](https://www.usebruno.com/) API collection used for manual testing of the Fieldwire `/projects` endpoint. This collection allows quick validation of API responses outside of the Playwright framework.

It includes:

- A `GET /projects` request
- Environment variable support for injecting a bearer token
- A convenient way to inspect raw API responses during development

While not part of the automated test flow, this tool supports quick iteration and helps confirm assumptions about backend behavior before writing formal tests.

## Test Data Design

I used static JSON files in `libs/test-data/` to keep things simple and reviewable. For a take-home project, this makes it easy to see exactly what data is being used without extra setup.

In a real-world setup, I'd consider dynamic or API-fetched data to better reflect live workflows, handle permissions, or prep environment-specific scenarios. The current structure leaves room to plug in that kind of logic later if needed.

## GitHub Actions Integration

This project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs Playwright E2E tests on every push and pull request. It installs dependencies, sets up Playwright, loads `.env` credentials from GitHub secrets, and executes tests using `npm run e2e`.

To save time, the framework reuses a saved Playwright login session (`playwright/.auth/user.json`) locally. This doesn't work in CI due to the clean Github environment.

Given the time limit, I prioritized fast local runs and deferred CI login setup. A future improvement would be to use a `globalSetup` script to log in and persist session state before tests.

## Tooling Summary

- Test Runner: Playwright
- Unit Tests (planned): Jest
- CI: GitHub Actions
- Env Management: dotenv
- Linting: ESLint + Prettier

## Note on Nx Monorepo

I considered using Nx, but with just one test app and a few small libraries, it added more complexity than needed for this exercise.

If this were part of a larger monorepo with shared code or growing test coverage, Nx would help manage dependencies, speed up CI, and keep things organized. The current layout keeps things simple but could scale into an Nx setup if needed.
