# Loan Calculator

An Angular coursework project by Andres Macias. Enter a loan amount, interest rate, and term to calculate monthly payments and total interest. Includes the original About and Contact pages.

[Live demo](https://grimsyntaxcloud.github.io/loan-app/) · [Portfolio case study](https://grimsyntaxcloud.github.io/projects/loan-calculator/)

The calculation runs entirely in the browser. It uses a fixed-rate amortization formula, with a separate zero-interest case. Values are educational estimates, not offers; no financial data is stored or transmitted.

## Run locally

Use Node.js 22 LTS and run `npm ci`, then `npm start`. Run `npm test` for component and calculation/reset regression checks. `npm run build:pages` creates the GitHub Pages build in `dist/loan-app/browser`.

## Security maintenance

Updated from Angular 10 to Angular 21 in October 2026 while retaining the original pages, styling, and calculation flow. CSS replaces the retired Flex Layout dependency. Angular's Vitest runner replaces the obsolete Karma/Protractor/TSLint tooling.

GitHub Actions audits dependencies, runs tests, builds, and publishes to the existing free GitHub Pages address. No backend or database is required. Dependabot alerts and security update pull requests are enabled; updates still require passing checks and review.
