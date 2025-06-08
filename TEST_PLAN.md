# Test Plan

## Overview

This test plan outlines end-to-end validation of the **Tasks** and **Forms** features in the Fieldwire web application. The goal is to ensure users can reliably create and submit forms and tasks, with proper validation and layout rendering across devices.

## Test Scope

The tests cover the following scenarios:

- Creating and submitting tasks with input validation
- Creating and submitting forms with small and large data sets
- Verifying UI responsiveness across desktop, tablet, and phone viewports
- Rejecting invalid inputs (e.g., negative hours, extreme values)

Out of scope:
- Edge cases related to permissions, user roles, or localization

## Test Approach

- Tests are implemented in **Playwright** and executed via `npm run e2e`
- Authentication is handled via a saved login session (`storageState`)
- Tests run locally and in CI (with limitations)
- A custom `auth.setup.ts` script logs in once and stores credentials

## Risks and Assumptions

- Assumes a stable staging environment with consistent behavior
- Assumes login credentials remain valid across sessions
- Does not test user roles, permissions, or localization variations

## Test Environment

- Target environment: `https://staging.fieldwire.com`
- Credentials managed via `.env` file and GitHub Secrets
- CI integration via GitHub Actions (workflow: `.github/workflows/ci.yml`)

For implementation details and supporting setup, see [README.md](./README.md) and [ARCHITECTURE.md](./ARCHITECTURE.md).

## Test Coverage

### tasks.spec.ts

Tests related to task creation and input validation.

| Test Description                             | Purpose                                                |
|---------------------------------------------|--------------------------------------------------------|
| `should create a new task`                  | Verifies successful task creation flow                 |
| `should reject negative hour values`        | Validates rejection of invalid negative inputs         |

---

### forms.spec.ts

Tests for form interactions with different input volumes.

| Test Description                                 | Purpose                                                |
|--------------------------------------------------|--------------------------------------------------------|
| `should submit an existing form successfully`    | Validates form completion and submission flow          |
| `should complete a form with many entries`       | Stress test for forms with large datasets              |

---

### smoke_test.spec.ts

Responsive layout smoke test across devices.

| Test Description                          | Purpose                                                  |
|-------------------------------------------|----------------------------------------------------------|
| `viewport loads projects page`            | Verifies layout integrity at various viewport sizes      |
| `test.skip()`                             | Conditionally skips test when not running in Chromium    |

This test loops over device viewports (desktop, tablet, mobile) and only runs fully under Chromium.

---

### setup/auth.setup.ts

This helper file, located under `./setup/`, manages authentication for the test suite. It performs a one-time login and stores the session to disk so that subsequent tests can reuse the state. It does **not** contain standalone tests.
