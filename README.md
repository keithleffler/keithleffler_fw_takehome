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

## Environment Variables

`.env` is used to store login credentials. It’s excluded from version control. In CI, values are injected via a GitHub secret (`FIELDWIRE_ENV`) that mimics the `.env` content.

---

## CI Integration

GitHub Actions is used to run tests on all branches and pull requests. See `.
github/workflows/ci.yml` for details.  GitHub Actions tests are not fully 
 functional because of problems storing login credentials.  See ARCHITECTURE.
md for details.

---

## 📌 Notes

- Viewport-specific tests are skipped unless the browser context is Chromium.
- Static JSON is used for test data to simplify setup. In production, this could be replaced with dynamic or API-fetched data.
- The test framework avoids full monorepo overhead but uses a modular layout for future scalability.
