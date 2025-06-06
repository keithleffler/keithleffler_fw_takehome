# Test Plan

This project includes Playwright tests organized by feature. Each spec file targets specific application behavior, with supporting utilities for authentication and setup. Tests are executed against the staging environment at https://staging.fieldwire.com using test credentials.

---

## tasks.spec.ts

Tests related to task creation and input validation.

| Test Description                             | Purpose                                                |
|---------------------------------------------|--------------------------------------------------------|
| `should create a new task`                  | Verifies successful task creation flow                 |
| `should reject negative hour values`        | Validates rejection of invalid negative inputs         |

---

## forms.spec.ts

Tests for form interactions with different input volumes.

| Test Description                                 | Purpose                                                |
|--------------------------------------------------|--------------------------------------------------------|
| `should submit an existing form successfully`    | Validates form completion and submission flow          |

---

## smoke_test.spec.ts

Responsive layout smoke test across devices.

| Test Description                            | Purpose                                             |
|---------------------------------------------|-----------------------------------------------------|
| `should display tasks layout across sizes`  | Ensures UI layout scales appropriately by device    |
