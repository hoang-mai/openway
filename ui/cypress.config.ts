import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.ts",
    indexHtmlFile: "cypress/support/component-index.html",
  },
});
