# Toolshop E2E – Playwright Test Suite

End-to-end test automation suite for [Practice Software Testing – Toolshop](https://practicesoftwaretesting.com), an Angular-based e-commerce application for construction tools.

Unlike portfolio projects built against self-owned apps, this suite tests a third-party application with no access to its source code. Locator strategies, state management, and test data handling all reflect the constraints of testing an app you don't control.

---

## Application Under Test

Toolshop is a full-featured e-commerce store with:

- Product catalogue with categories, filters, sorting, and search
- User registration and authentication
- Shopping cart and multi-step checkout
- User account management (profile, orders, invoices, favourites)
- Contact form and messaging
- Admin dashboard (user management, product management, reports)
- REST API with Swagger documentation

**Target URL:** `https://practicesoftwaretesting.com`
**API docs:** `https://api.practicesoftwaretesting.com/api/documentation`

---

## Test Strategy

### UI Tests (E2E)

Core user journeys tested through the browser, grouped by feature area:

- **Auth** – Registration, login validation, logout, session persistence
- **Products** – Browsing, category filtering, search, sorting, pagination, product detail view
- **Cart** – Add/remove items, quantity updates, cart persistence
- **Checkout** – Address entry, payment flow, order confirmation
- **Account** – Profile editing, order history, favourites
- **Contact** – Form submission and validation
- **Admin** – Product and user management (admin role)

### API-Assisted Setup

Where possible, tests use the Toolshop REST API to set up preconditions (creating users, seeding cart state) rather than clicking through the UI. This makes tests faster, more reliable, and isolates the UI layer being tested from setup dependencies.

### Smoke Suite

A minimal set of critical-path tests designed to run first. If smoke fails, the full suite is skipped.

---

## Tech Stack

- **Playwright Test** – Test runner, assertions, browser automation
- **Cross-browser** – Chromium, Firefox, WebKit
- **Page Object Model** – Centralised locators and actions
- **API helpers** – Playwright `request` context for test data setup
- **GitHub Actions CI** – Automated cross-browser execution
- **HTML reporting** – Playwright built-in reporter

---

## Project Structure

```
tests/
├── e2e/
│   ├── smoke/            # Critical-path sanity checks
│   ├── auth/             # Registration, login, logout, session
│   ├── products/         # Browse, search, filter, sort, detail
│   ├── cart/             # Add, remove, update quantity
│   ├── checkout/         # Address, payment, confirmation
│   ├── account/          # Profile, orders, favourites
│   ├── contact/          # Contact form
│   └── admin/            # Admin-only functionality
├── fixtures/
│   └── baseTest.js       # Extended test fixtures
├── pages/                # Page Object Models
├── helpers/              # Auth, navigation, API utilities
└── test-data/            # Users, products, test constants
```

---

## Test Accounts

| Role     | Email                                   | Password   |
|----------|-----------------------------------------|------------|
| Admin    | admin@practicesoftwaretesting.com        | welcome01  |
| Customer | customer@practicesoftwaretesting.com     | welcome01  |
| Customer | customer2@practicesoftwaretesting.com    | welcome01  |

---

## Key Differences from Self-Owned App Testing

This project deliberately practices skills that only emerge when testing third-party applications:

- **No `data-testid` attributes** – Locators must use roles, labels, text, and CSS selectors strategically
- **No source code access** – Behaviour must be understood through exploration and API docs
- **Shared environment** – Test data may be modified by other users; tests must be resilient
- **Network dependency** – Tests hit a live server; timeouts and retries matter
- **API-first setup** – Using the REST API for preconditions instead of UI clicks

---

## Running Tests

```bash
npm install
npx playwright install --with-deps

npm test                    # Full suite, all browsers
npm run test:smoke          # Smoke tests only
npm run test:chromium       # Single browser
npm run test:auth           # Auth tests only
npm run test:products       # Product tests only
npm run test:cart           # Cart tests only
npm run test:checkout       # Checkout tests only
```

---

## Continuous Integration

GitHub Actions workflow runs on push and PR:

- Installs dependencies and browsers
- Executes full cross-browser suite
- Uploads HTML report as artifact

---

## Scope & Boundaries

This suite focuses on functional E2E coverage of the primary user journeys. It does not cover:

- Visual regression testing
- Performance or load testing
- Security testing (though the app has a deliberately buggy version for that)
- Mobile-specific viewports (could be added as a project extension)
