# Architecture

Framework layout and design decisions.

### 🔐 Environment Variables

This project uses a `.env` file to store login credentials and other environment-specific values. The file is loaded automatically at runtime via `dotenv`, and is excluded from source control (`.gitignore`) to avoid exposing secrets.

In CI, these values are injected using a GitHub Actions secret (`FIELDWIRE_ENV`) which contains the same `.env` content. This ensures test credentials are available in both local and CI environments without hardcoding sensitive data.

### 📌 Test Data Design

I used static JSON files in `libs/test-data/` to keep things simple and reviewable. For a take-home project, this makes it easy to see exactly what data is being used without extra setup.

In a real-world setup, I'd consider dynamic or API-fetched data to better reflect live workflows, handle permissions, or prep environment-specific scenarios. The current structure leaves room to plug in that kind of logic later if needed.

### 🛠️ GitHub Actions Integration

This project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs Playwright E2E tests on every push and pull request. It installs dependencies, sets up Playwright, injects `.env` credentials from GitHub secrets, and runs tests via `npm run e2e`.

The goal is to simulate a lightweight CI pipeline and demonstrate how test automation can be integrated into a production-style workflow.

### 🧭 Note on Nx Monorepo

I considered using Nx, but with just one test app and a few small libraries, it felt like overkill for this exercise.

If this were part of a larger monorepo with shared code or growing test coverage, Nx would help manage dependencies, speed up CI, and keep things organized. The current layout keeps things simple but could scale into an Nx setup if needed.
