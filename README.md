# Fieldwire E2E Automation Challenge

This project implements an end-to-end (E2E) test framework using [Playwright](https://playwright.dev/) with TypeScript. It's designed for Fieldwire's take-home automation challenge and demonstrates modular test design, CI integration, and environment-aware configuration.

---

## Project Structure

Tests, page objects, helpers, and test data are organized by purpose:

```
.
├── apps/fieldwire-tests/        # Main Playwright test suite
├── libs/helpers/                # Reusable utilities (e.g., login)
├── libs/page-objects/           # Page Object Model abstractions
├── libs/test-data/              # Static JSON test data
├── .github/workflows/ci.yml     # GitHub Actions workflow
```

---

## Running Tests Locally

1. Install dependencies:

```bash
npm install
npx playwright install --with-deps
```

2. Create a `.env` file at the root with your Fieldwire credentials:

```
FIELDWIRE_EMAIL=your-email@example.com
FIELDWIRE_PASSWORD=your-password
```

3. Run the test suite:

```bash
npm run e2e
```

---

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
| `npm run lint:all`          | Runs all lint scripts in sequence                             |

These scripts help enforce code quality and consistency across the different parts of the project.

## CI Integration

GitHub Actions is used to run tests on all branches and pull requests. See `.
github/workflows/ci.yml` for details.  GitHub Actions tests are not fully 
 functional because of problems storing login credentials.  See ARCHITECTURE.
md for details.

---

## Bruno

The /bruno folder contains a small [Bruno](https://www.usebruno.com/) API 
collection used to test the `/projects` endpoint against the Fieldwire API. It serves as a lightweight, scriptable way to manually verify API behavior outside of the Playwright test framework.

The collection includes:
- A `GET /projects` request
- Environment support for injecting tokens
- Easy inspection of raw API responses

This setup is useful for quick manual testing, debugging, or verifying 
assumptions during test development.  A valid token can be obtained by going 
to the https://staging.fieldwire.com website, and then copying the token 
from a successful API call in Chrome developer tools. 

## Notes

- Viewport-specific smoke tests (apps/fieldwire-tests/tests/smoke_test.spec.
  ts) are skipped unless the browser context is 
  Chromium.
- Static JSON is used for test data to simplify setup. In production, this could be replaced with dynamic or API-fetched data.
- The test framework avoids full monorepo overhead but uses a modular layout for future scalability.
