import { mount } from "cypress/react";
import "./commands";
import "cypress-axe";
import "@/styles.css";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      checkA11yWCAG: (
        context?: string | Node,
        options?: Record<string, unknown>
      ) => Chainable<void>;
    }
  }
}

Cypress.Commands.add("mount", mount);

Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("ResizeObserver loop")) {
    return false;
  }
});
