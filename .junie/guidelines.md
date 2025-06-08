# Fieldwire Take-home Automation Challenge Guidelines

## Project Overview
This project is a Node.js-based automated E2E test framework using Playwright to test basic workflows in the Fieldwire application. It's organized as an NX monorepo with applications stored under `./apps` and libraries under `./libs`.

## Tech Stack
- **Language**: TypeScript
- **Test Framework**: Playwright
- **Unit Testing**: Jest
- **HTTP Client**: Axios
- **Linting**: ESLint, Prettier
- **Other Dependencies**:
  - date-fns: Date manipulation
  - jsonpath-plus: JSON parsing
  - uuid: Generating unique identifiers
  - dotenv: Environment variable management

## Repository Structure
```
.
├── apps/                      # Applications
│   └── fieldwire-tests/       # Playwright test application
│       ├── tests/             # Feature-specific test files (forms, tasks, etc.)
│       ├── setup/             # Authentication and global setup hooks
│       └── tsconfig.json      # TypeScript configuration
├── libs/                      # Reusable libraries
│   ├── api/                   # API client wrappers
│   ├── helpers/               # Utility functions
│   ├── page-objects/          # Page Object Model abstractions
│   └── test-data/             # Test fixtures and data
├── bruno/                     # Bruno API collection
├── playwright/                # Auth storage and session data
├── playwright-report/         # HTML report output (generated)
├── test-results/              # Test logs (generated)
└── docs/                      # Documentation and artifacts
```

## Development Guidelines

### Path Aliases
The project uses TypeScript path aliases for cleaner imports:
- `@fieldwire/api`: API client wrappers
- `@fieldwire/helpers`: Utility functions
- `@fieldwire/page-objects`: Page Object Model classes
- `@fieldwire/test-data`: Test fixtures and data

### Authentication
- Authentication is handled via Playwright's global setup
- Login credentials are stored in a `.env` file (excluded from git)
- Session state is cached in `playwright/.auth/user.json`

### Testing Approach
- **Page Object Model**: UI interactions are abstracted in page objects
- **API Integration**: Tests use API calls for setup when possible
- **Test Data**: Static JSON fixtures are used for test scenarios
- **Viewport Testing**: Tests can be run on different device viewports

### Available Scripts
- `npm run e2e`: Run all Playwright end-to-end tests
- `npm run test:libs:unit`: Run Jest unit tests
- `npm run lint:all`: Lint all code
- Individual lint commands for specific directories

## Design Principles
- **Modularity**: Tests are kept clean by isolating helpers, API wrappers, and page objects
- **Reusability**: Shared libraries reduce duplication across feature tests
- **Maintainability**: The structure supports growth with minimal coupling
- **Transparency**: Bruno collections document API behavior
