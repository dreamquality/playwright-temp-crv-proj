<h1 dir="auto"><a class="anchor" aria-hidden="true" href="https://playwright.dev/"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd"></path></svg></a><g-emoji class="g-emoji" alias="performing_arts" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f3ad.png">🎭</g-emoji> Playwright</h1>

# Web Test Automation - Playwright E2E

### General requirements

- Install a git client such as [git bash](https://git-scm.com/downloads)

Download and install

- Latest version of [Node.js](https://nodejs.org/es/download/ or at least 16.17.1)
- Java Development Kit [(JDK)](https://www.oracle.com/java/technologies/downloads/)
   - Make sure you have the environment variable __JAVA_HOME__ set to the path of the respective JDK. __(Required for Allure report generation)__.

### Installation of the testing framework

#### **Clone the repository:**

    git clone https://github.com/charlyautomatiza/starter-playwright.git

#### **Install dependencies.**

    npm install

#### **To run the tests go to the root of the project and run (headless mode)**

    npm run test:dev 

#### **To run the tests go to the root of the project and run (headed mode)**

    npm run test-head:dev

#### **To run the tests only on Firefox**

    npm run firefox:dev

#### **To run the tests only on Chromium**

    npm run chromium:dev

#### **To run the tests only on Webkit**

    npm run webkit:dev

#### **To open Playwright's unified Html report of test results**

    npm run play-report

#### **To create and open the Allure unified report of test results**

    npm run open-report

#### **IMPORTANT**

After each upgrade of **Playwright**, the project must be restarted locally with the command:

    npm run reinstall

To download the latest versions of the Browsers.
