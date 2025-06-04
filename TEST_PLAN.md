# Test Plan

This project includes Playwright tests organized by feature. Each spec file targets specific application behavior, with supporting utilities for authentication and setup.

---

## tasks.spec.ts

Tests related to task creation and input validation.

| Test Description                             | Purpose                                                |
|---------------------------------------------|--------------------------------------------------------|
| `should create a new task`                  | Verifies successful task creation flow                 |
| `should reject negative hour values`        | Validates rejection of invalid negative inputs         |
| `should reject very large hour values`      | Checks upper bounds of allowed task duration           |
| `should reject very small hours values`     | Ensures lower bounds or precision limits are enforced  |

---

## forms.spec.ts

Tests for form interactions with different input volumes.

| Test Description                                 | Purpose                                                |
|--------------------------------------------------|--------------------------------------------------------|
| `should submit an existing form successfully`    | Validates form completion and submission flow          |
| `should complete a form with many entries`       | Stress test for forms with large datasets              |

---

## smoke_test.spec.ts

Responsive layout smoke test across devices.

| Test Description                          | Purpose                                                  |
|-------------------------------------------|----------------------------------------------------------|
| `viewport loads projects page`            | Verifies layout integrity at various viewport sizes      |
| `test.skip()`                             | Conditionally skips test when not running in Chromium    |

This test loops over device viewports (desktop, tablet, mobile) and only runs fully under Chromium.

---

## auth.setup.ts

This is a shared helper file used to manage authentication or preconditions for other tests. It does **not** contain standalone tests and should be treated as supporting infrastructure.


# Exploratory Testing Findings

## Tasks

There appears to be no validation on cost or 
## Forms

There is no time validation between date/time columns on a form.  I noticed this on the equipment 
of the Daily Status form and confirmed in the form designer.  Adding time validation between columns would 
add complexity to the form designer but could eliminate reporting errors if reports aggregate total time.

