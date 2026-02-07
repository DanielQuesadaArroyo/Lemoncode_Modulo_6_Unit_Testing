import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Base URL used by `cy.visit('/')`
    baseUrl: "http://localhost:5173",
    // Support both modern `cypress/e2e/*.cy.*` and legacy `cypress/integration/*.spec.*`
    specPattern: "cypress/{e2e,integration}/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    // Explicit support file
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
