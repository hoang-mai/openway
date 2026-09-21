/// <reference types="cypress" />
import "cypress-axe";

Cypress.Commands.add(
  "checkA11yWCAG",
  (context?: string | Node, options?: Record<string, unknown>) => {
    cy.injectAxe();
    const target = context ?? "[data-cy-root]";
    cy.checkA11y(
      target,
      {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
        },
        rules: {
          "color-contrast": { enabled: true },
          "button-name": { enabled: true },
          ...((options?.rules as Record<string, unknown>) ?? {}),
        },
        ...options,
      },
      (violations) => {
        if (violations.length > 0) {
          const summary = violations
            .map((v, idx) => {
              const nodeDetails = v.nodes
                .map(
                  (n, nIdx) =>
                    `    Node ${nIdx + 1}: ${n.target.join(" ")}\n    HTML: ${n.html}\n    Issue: ${n.failureSummary}`
                )
                .join("\n");
              return `Violation ${idx + 1} [${v.impact?.toUpperCase()}]: ${v.id} - ${v.description}\nHelp: ${v.helpUrl}\n${nodeDetails}`;
            })
            .join("\n\n");
          throw new Error(
            `Accessibility violations detected (${violations.length}):\n\n${summary}\n`
          );
        }
      }
    );
  }
);

export {};
