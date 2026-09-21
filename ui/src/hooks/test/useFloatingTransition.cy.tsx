import React, { useState } from "react";
import { useFloating, Placement } from "@floating-ui/react";
import { useFloatingTransition } from "../useFloatingTransition";

function TestFloatingTransitionHarness({
  initialOpen = false,
  placement = "bottom" as Placement,
  duration = 200,
  animated = true,
}: {
  initialOpen?: boolean;
  placement?: Placement;
  duration?: number;
  animated?: boolean;
}) {
  const [open, setOpen] = useState(initialOpen);

  const { refs, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
  });

  const { isMounted, styles } = useFloatingTransition(context, {
    duration,
    animated,
    offset: 8,
  });

  return (
    <div className="p-8">
      <button
        ref={refs.setReference}
        data-testid="btn-toggle"
        onClick={() => setOpen((prev) => !prev)}
      >
        Toggle Floating
      </button>

      <div data-testid="is-mounted">{isMounted ? "true" : "false"}</div>

      {isMounted && (
        <div
          ref={refs.setFloating}
          data-testid="floating-element"
          style={styles}
          className="bg-white p-4 shadow rounded"
        >
          Floating Content
        </div>
      )}
    </div>
  );
}

describe("useFloatingTransition Hook Unit Tests", () => {
  it("renders closed initially and mounts when toggled open", () => {
    cy.mount(<TestFloatingTransitionHarness initialOpen={false} />);

    cy.get('[data-testid="is-mounted"]').should("have.text", "false");
    cy.get('[data-testid="floating-element"]').should("not.exist");

    cy.get('[data-testid="btn-toggle"]').click();

    cy.get('[data-testid="is-mounted"]').should("have.text", "true");
    cy.get('[data-testid="floating-element"]')
      .should("be.visible")
      .and("contain.text", "Floating Content");
  });

  it("handles unmounting after close animation completes", () => {
    cy.mount(
      <TestFloatingTransitionHarness initialOpen={true} duration={100} />
    );

    cy.get('[data-testid="is-mounted"]').should("have.text", "true");
    cy.get('[data-testid="floating-element"]').should("be.visible");

    // Close
    cy.get('[data-testid="btn-toggle"]').click();

    // Eventually unmounts
    cy.get('[data-testid="floating-element"]').should("not.exist");
    cy.get('[data-testid="is-mounted"]').should("have.text", "false");
  });

  it("applies instantaneous transition when animated is false", () => {
    cy.mount(
      <TestFloatingTransitionHarness initialOpen={true} animated={false} />
    );

    cy.get('[data-testid="floating-element"]').should("be.visible");
    cy.get('[data-testid="btn-toggle"]').click();
    cy.get('[data-testid="floating-element"]').should("not.exist");
  });
});
