# Playwright Browser Context & Authentication State Mini Project

## Overview

This project demonstrates how to use **Browser Contexts** and **Authentication State** in **Playwright with JavaScript**. It showcases how to create isolated browser sessions, simulate multiple users, and reuse authenticated sessions to avoid logging in before every test.

These concepts are widely used in enterprise automation frameworks to improve execution speed, enable role-based testing, and support parallel execution.

---

## Objectives

By completing this project, you will learn how to:

* Understand the Playwright **Browser → Context → Page** architecture.
* Create multiple browser contexts.
* Perform Incognito session testing.
* Save authentication state using `storageState()`.
* Reuse authentication state across multiple tests.
* Simulate multiple authenticated users.
* Understand real-world enterprise use cases of Browser Contexts.

---

# Project Structure

```text
Playwright-BrowserContext/
│
├── auth/
│   ├── user.json              # Authentication state for Standard User
│   ├── admin.json             # Authentication state for Admin User
│   └── locked.json            # Authentication state for Locked User
│
├── tests/
│   ├── login.spec.js          # Login and save authentication state
│   ├── authReuse.spec.js      # Reuse saved authentication state
│   ├── multiContext.spec.js   # Browser Context examples
│   └── multiUser.spec.js      # Multiple authenticated users
│
├── playwright.config.js       # Playwright configuration
├── package.json               # Project dependencies
├── package-lock.json          # Dependency lock file
├── node_modules/              # Installed packages
└── README.md                  # Project documentation
```

---

## Prerequisites

* Node.js
* Visual Studio Code
* Playwright

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

# Playwright Architecture

```text
Browser
│
├── Context 1
│   ├── Page 1
│   └── Page 2
│
├── Context 2
│   ├── Page 1
│   └── Page 2
│
└── Context 3
    └── Page 1
```

### Browser

A **Browser** is the browser process (Chromium, Firefox, or WebKit).

### Browser Context

A **Browser Context** is an isolated browser session. Each context has its own:

* Cookies
* Local Storage
* Session Storage
* Cache
* Authentication

It behaves like a new Incognito window.

### Page

A **Page** represents a browser tab inside a Browser Context.

---

# Saving Authentication State

After a successful login, Playwright can save the browser's authentication information.

```javascript
await page.context().storageState({
  path: "auth/user.json"
});
```

This creates the following file:

```text
auth/
└── user.json
```

The file stores:

* Cookies
* Local Storage

This allows future tests to start in an already authenticated state.

---

# Reusing Authentication

Instead of logging in before every test, create a Browser Context using the saved authentication state.

```javascript
const context = await browser.newContext({
  storageState: "auth/user.json"
});

const page = await context.newPage();

await page.goto("https://www.saucedemo.com/inventory.html");
```

The application recognizes the stored session and opens the Inventory page directly without performing the login steps.

---

# Multiple Browser Contexts

Create multiple isolated browser sessions.

```javascript
const context1 = await browser.newContext({
  storageState: "auth/user.json"
});

const context2 = await browser.newContext({
  storageState: "auth/admin.json"
});

const page1 = await context1.newPage();
const page2 = await context2.newPage();
```

Each context has its own:

* Cookies
* Local Storage
* Session Storage
* Cache
* Authentication

Activities performed in one context do not affect the others.

---

# Running the Tests

### Generate Authentication State

```bash
npx playwright test tests/login.spec.js
```

### Reuse Authentication

```bash
npx playwright test tests/authReuse.spec.js
```

### Browser Context Demo

```bash
npx playwright test tests/multiContext.spec.js
```

### Multiple User Demo

```bash
npx playwright test tests/multiUser.spec.js
```

---

# Real-Time Enterprise Use Cases

Browser Contexts and Authentication State are commonly used in:

* ERP applications
* CRM applications
* Banking applications
* Healthcare systems
* E-commerce platforms
* HR Management Systems
* Inventory Management Systems
* Chat applications
* Approval workflows
* Smoke testing
* Regression testing
* Parallel test execution

### Example Workflow

```text
Sales User
    │
Creates Sales Order
    │
Warehouse User
    │
Ships Order
    │
Manager
    │
Approves Shipment
```

Each user operates in a separate Browser Context with an independent authenticated session.

---

# Benefits

* Eliminates repeated login operations.
* Speeds up test execution.
* Reduces flaky authentication failures.
* Supports parallel execution.
* Enables role-based testing.
* Simulates multiple users simultaneously.
* Produces cleaner and more maintainable automation code.

---

# Common Errors

## 1. Redirected to Login Page

### Error

```text
Expected:
/inventory

Received:
https://www.saucedemo.com/
```

### Cause

* Authentication state is missing.
* Authentication state has expired.
* Incorrect storage state path.

### Solution

```bash
npx playwright test tests/login.spec.js
```

---

## 2. Page Opens as `about:blank`

### Error

```text
Expected:
/inventory

Received:
about:blank
```

### Cause

The page was created but navigation was not performed.

### Solution

```javascript
await page.goto("https://www.saucedemo.com/inventory.html");
```

---

## 3. Cannot Read Properties of Undefined

### Incorrect

```javascript
page1.context1.storageState();
```

### Correct

```javascript
page1.context().storageState();
```

or

```javascript
context1.storageState();
```

---

# Key Learnings

* A Browser contains one or more Browser Contexts.
* A Browser Context contains one or more Pages.
* Browser Contexts provide complete session isolation.
* `storageState()` saves authentication information.
* `browser.newContext({ storageState })` restores a previously authenticated session.
* Authentication reuse significantly reduces execution time.
* Browser Contexts are ideal for testing multiple users and role-based workflows.

---

# Technologies Used

* Playwright
* JavaScript
* Node.js
* Visual Studio Code

---

# Author

**Smita Dash**

Automation Test Engineer | Playwright | JavaScript | QA Automation
