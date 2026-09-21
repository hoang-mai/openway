import React, { useState } from "react";
import { useDebouncedCallback } from "../useDebouncedCallback";

function TestDebouncedCallbackHarness({
  delay = 200,
  onExecute,
}: {
  delay?: number;
  onExecute: (val: string) => void;
}) {
  const [callCount, setCallCount] = useState(0);
  const [extraState, setExtraState] = useState("initial");

  const { debounced, cancel } = useDebouncedCallback((val: string) => {
    setCallCount((c) => c + 1);
    onExecute(`${val}:${extraState}`);
  }, delay);

  return (
    <div className="p-4">
      <button data-testid="btn-call" onClick={() => debounced("test-val")}>
        Trigger
      </button>
      <button data-testid="btn-cancel" onClick={cancel}>
        Cancel
      </button>
      <button
        data-testid="btn-update-state"
        onClick={() => setExtraState("updated")}
      >
        Update State
      </button>
      <div data-testid="call-count">{callCount}</div>
    </div>
  );
}

describe("useDebouncedCallback Hook Unit Tests", () => {
  it("delays callback execution until delay has elapsed", () => {
    const spy = cy.spy().as("callbackSpy");
    cy.clock();
    cy.mount(<TestDebouncedCallbackHarness delay={300} onExecute={spy} />);

    cy.get('[data-testid="btn-call"]').click();
    cy.get("@callbackSpy").should("not.have.been.called");

    cy.tick(200);
    cy.get("@callbackSpy").should("not.have.been.called");

    cy.tick(100);
    cy.get("@callbackSpy").should("have.been.calledOnceWith", "test-val:initial");
    cy.get('[data-testid="call-count"]').should("have.text", "1");
  });

  it("cancels pending invocation when cancel() is called", () => {
    const spy = cy.spy().as("callbackSpy");
    cy.clock();
    cy.mount(<TestDebouncedCallbackHarness delay={300} onExecute={spy} />);

    cy.get('[data-testid="btn-call"]').click();
    cy.tick(150);

    // Cancel before delay expires
    cy.get('[data-testid="btn-cancel"]').click();

    // Advance clock past delay
    cy.tick(300);
    cy.get("@callbackSpy").should("not.have.been.called");
    cy.get('[data-testid="call-count"]').should("have.text", "0");
  });

  it("resets delay on consecutive rapid calls", () => {
    const spy = cy.spy().as("callbackSpy");
    cy.clock();
    cy.mount(<TestDebouncedCallbackHarness delay={200} onExecute={spy} />);

    cy.get('[data-testid="btn-call"]').click();
    cy.tick(100);
    cy.get('[data-testid="btn-call"]').click();
    cy.tick(100);
    cy.get("@callbackSpy").should("not.have.been.called");

    // Advance remaining 100ms
    cy.tick(100);
    cy.get("@callbackSpy").should("have.been.calledOnce");
  });

  it("always calls the latest callback reference avoiding stale state closures", () => {
    const spy = cy.spy().as("callbackSpy");
    cy.clock();
    cy.mount(<TestDebouncedCallbackHarness delay={300} onExecute={spy} />);

    // Trigger debounced call
    cy.get('[data-testid="btn-call"]').click();

    // Update parent state while timer is running
    cy.get('[data-testid="btn-update-state"]').click();

    // Finish delay
    cy.tick(300);
    cy.get("@callbackSpy").should("have.been.calledWith", "test-val:updated");
  });
});
