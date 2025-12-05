import { defineConfig } from "cypress";
const coverageTask = require('@cypress/code-coverage/task');

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      coverageTask(on, config);
      return config;
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    setupNodeEvents(on, config) {
        coverageTask(on, config);
        return config;
    },
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
  },
});