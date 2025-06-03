# Architecture

Framework layout and design decisions.

### 📌 Test Data Design

I used static JSON files in `libs/test-data/` to keep things simple and reviewable. For a take-home project, this makes it easy to see exactly what data is being used without extra setup.

In a real-world setup, I'd consider dynamic or API-fetched data to better reflect live workflows, handle permissions, or prep environment-specific scenarios. The current structure leaves room to plug in that kind of logic later if needed.

### 🧭 Note on Nx Monorepo

I considered using Nx, but with just one test app and a few small libraries, it felt like overkill for this exercise.

If this were part of a larger monorepo with shared code or growing test coverage, Nx would help manage dependencies, speed up CI, and keep things organized. The current layout keeps things simple but could scale into an Nx setup if needed.
