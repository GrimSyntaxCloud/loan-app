# Loan Calculator

An Angular coursework project by Andres Macias. Enter a loan amount, interest rate, and term to calculate monthly payments and total interest. The interface is a navy and glacier financial workbench, with a parameter rail, payment summary, and a remaining-principal chart. About and Contact routes explain the project and link to the portfolio/source.

[Live demo](https://grimsyntaxcloud.github.io/loan-app/) · [Portfolio case study](https://grimsyntaxcloud.github.io/projects/loan-calculator/)

The calculation runs entirely in the browser. It uses a fixed-rate amortization formula, with a separate zero-interest case. Values are educational estimates, not offers; no financial data is stored or transmitted.

## Run locally

Use Node.js 22 LTS and run `npm ci`, then `npm start`. Run `npm test` for component and calculation/reset regression checks. `npm run build:pages` creates the GitHub Pages build in `dist/loan-app/browser`.

The original coursework is by Andres Macias. The 2026 redesign was developed collaboratively by Andres and an AI coding assistant, with the calculation behavior checked against regression tests.

## How it works

Angular reactive forms validate a positive principal, a non-negative annual rate, and a whole-year term. Monthly payments use the fixed-rate amortization formula, including a zero-interest case; displayed payments are rounded to cents. Interest keeps the existing calculation based on the rounded payment. The chart samples the exact unrounded balance at 61 evenly spaced points and uses a numerically stable remaining-term formula.

The interface supports keyboard input and visible focus. Chart motion is brief and disabled when reduced motion is requested. There is no account, database, tracking, or data retention. About/Contact describe this educational project rather than a fictional lending company; no loan applications or contact messages are collected.

## Security maintenance

Updated from Angular 10 to Angular 22 in October 2026 while retaining the original routes and calculation flow. The October 2026 visual redesign uses native CSS and SVG, adds no dependencies, and respects reduced-motion preferences. CSS replaces the retired Flex Layout dependency. Angular's Vitest runner replaces the obsolete Karma/Protractor/TSLint tooling.

GitHub Actions audits dependencies, runs tests, builds, and publishes to the existing free GitHub Pages address. No backend or database is required. Dependabot alerts and security update pull requests are enabled; updates still require passing checks and review.

### Coordinated frontend updates

Use Node.js 22.22.3 or newer in the Node 22 release line. The frontend uses Angular 22 with TypeScript 6.0; Angular, Material/CDK, and (where used) PrimeNG and ngx-cookie-service must stay compatible. Dependabot groups their minor/patch updates. Future framework majors require a reviewed `ng update` migration, and TypeScript 6.1+ is deferred until the Angular compiler supports it. Other compatible updates and security scanning remain enabled.

Before merging an upgrade, require the pull-request workflow to pass dependency audits, existing tests, and the production build. Main-branch deployment also waits for those checks. The calculator stays browser-only on free GitHub Pages; this upgrade adds no backend or paid service.
