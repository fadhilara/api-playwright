# PW_API — Scalable API Test Automation with Playwright

A layered API test automation framework built with **Playwright** and **TypeScript**, demonstrating scalable architecture patterns for real-world QA projects.

---

## 🏗️ Architecture

```
cart.spec.ts          → What to test (scenarios only)
    ↓
CartService.ts        → Assertions + business logic
    ↓
CartClient.ts         → HTTP calls only
    ↓
RequestHandler.ts     → Base HTTP engine (never changes)
    ↓
constants/ + types/   → Endpoints, status codes, type contracts
```

Each layer has **one responsibility**. When an endpoint path changes, only `endpoints.ts` needs updating. When assertion logic changes, only the Service layer changes. The spec file almost never needs to change.

---

## 📁 Folder Structure

```
PW_API/
├── api-client/
│   └── CartClient.ts           # HTTP calls per endpoint, no assertions
│
├── constants/
│   ├── endpoints.ts            # All API paths in one place
│   └── status-codes.ts         # Named HTTP status codes
│
├── helpers/
│   └── createToken.ts          # Auth token helper
│
├── request-objects/            # JSON payloads for POST/PUT requests
│
├── response-schemas/
│   └── cart/
│       └── GET_cart_schema.json # JSON schema for response validation
│
├── services/
│   └── CartService.ts          # Assertions + business logic
│
├── tests/
│   └── cart.spec.ts            # Test scenarios (clean, readable)
│
├── types/
│   └── cart.types.ts           # TypeScript interfaces for API contracts
│
├── utils/
│   ├── cart-assertions.ts      # Reusable cart calculation assertions
│   ├── custom-expect.ts        # Extended Playwright expect matchers
│   ├── data-generator.ts       # Faker-based test data generator
│   ├── fixture.ts              # Playwright fixtures (api, config)
│   ├── logger.ts               # Request/response logger
│   ├── request-handler.ts      # Base HTTP engine with builder pattern
│   └── schema-validator.ts     # JSON schema validation utility
│
├── api-test-config.ts          # Environment config loader
├── playwright.config.ts        # Playwright configuration
└── .env                        # Environment variables (not committed)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/<your-username>/pw-api.git
cd pw-api
npm install
npx playwright install
```

### Environment Setup

Create a `.env` file at the root:

```env
BASE_URL=https://dummyjson.com
USER_EMAIL=your@email.com
USER_PASSWORD=yourpassword
```

---

## ▶️ Running Tests

```bash
# Run all tests
npx playwright test

# Show HTML report after run
npx playwright show-report
```

---

## 🛠️ Tech Stack

- [Playwright](https://playwright.dev/) — test runner & HTTP client
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [@faker-js/faker](https://fakerjs.dev/) — dynamic test data generation
- [Ajv](https://ajv.js.org/) — JSON schema validation
