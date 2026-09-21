import React, { useState } from "react";
import { useAnimatedError } from "../useAnimatedError";

function TestAnimatedErrorHarness({
  initialError,
  exitDuration = 250,
}: {
  initialError?: string;
  exitDuration?: number;
}) {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(initialError);

  const { displayedError, isExiting } = useAnimatedError(errorMessage, {
    exitDuration,
  });

  return (
    <div className="p-4">
      <div data-testid="displayed-error">{displayedError ?? "none"}</div>
      <div data-testid="is-exiting">{isExiting ? "true" : "false"}</div>
      <button
        data-testid="btn-clear"
        onClick={() => setErrorMessage(undefined)}
      >
        Clear Error
      </button>
      <button
        data-testid="btn-set-error"
        onClick={() => setErrorMessage("New error occurred")}
      >
        Set Error
      </button>
      <button
        data-testid="btn-update-error"
        onClick={() => setErrorMessage("Updated error text")}
      >
        Update Error
      </button>
    </div>
  );
}

describe("useAnimatedError Hook Unit Tests", () => {
  it("renders initial error and not in exiting state", () => {
    cy.mount(<TestAnimatedErrorHarness initialError="Something went wrong" />);

    cy.get('[data-testid="displayed-error"]').should("have.text", "Something went wrong");
    cy.get('[data-testid="is-exiting"]').should("have.text", "false");
  });

  it("handles exit transition when error is cleared", () => {
    cy.clock();
    cy.mount(
      <TestAnimatedErrorHarness initialError="Error message" exitDuration={300} />
    );

    // Click clear
    cy.get('[data-testid="btn-clear"]').click();

    // Immediately, isExiting is true, but displayedError is preserved for exit animation
    cy.get('[data-testid="is-exiting"]').should("have.text", "true");
    cy.get('[data-testid="displayed-error"]').should("have.text", "Error message");

    // Advance 200ms (not yet finished)
    cy.tick(200);
    cy.get('[data-testid="is-exiting"]').should("have.text", "true");
    cy.get('[data-testid="displayed-error"]').should("have.text", "Error message");

    // Advance remaining 100ms
    cy.tick(100);
    cy.get('[data-testid="is-exiting"]').should("have.text", "false");
    cy.get('[data-testid="displayed-error"]').should("have.text", "none");
  });

  it("updates error message immediately when updated to a new message", () => {
    cy.mount(<TestAnimatedErrorHarness initialError="Old error" />);

    cy.get('[data-testid="btn-update-error"]').click();
    cy.get('[data-testid="displayed-error"]').should("have.text", "Updated error text");
    cy.get('[data-testid="is-exiting"]').should("have.text", "false");
  });

  it("resets exiting state if a new error arrives while exiting", () => {
    cy.clock();
    cy.mount(
      <TestAnimatedErrorHarness initialError="Initial error" exitDuration={300} />
    );

    cy.get('[data-testid="btn-clear"]').click();
    cy.tick(150);
    cy.get('[data-testid="is-exiting"]').should("have.text", "true");

    // Set new error before timeout completes
    cy.get('[data-testid="btn-set-error"]').click();
    cy.get('[data-testid="is-exiting"]').should("have.text", "false");
    cy.get('[data-testid="displayed-error"]').should("have.text", "New error occurred");

    // Advance clock past original exit duration
    cy.tick(300);
    cy.get('[data-testid="displayed-error"]').should("have.text", "New error occurred");
    cy.get('[data-testid="is-exiting"]').should("have.text", "false");
  });
});
