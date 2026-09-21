import React, { useState } from "react";
import { useDebounce } from "../useDebounce";

function TestDebounceHarness({
  initialValue,
  delay,
}: {
  initialValue: string;
  delay?: number;
}) {
  const [value, setValue] = useState(initialValue);
  const debounced = useDebounce(value, delay);

  return (
    <div className="p-4">
      <input
        data-testid="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        data-testid="btn-change"
        onClick={() => setValue("programmatic-change")}
      >
        Change
      </button>
      <div data-testid="raw-value">{value}</div>
      <div data-testid="debounced-value">{debounced}</div>
    </div>
  );
}

describe("useDebounce Hook Unit Tests", () => {
  it("initializes with initial value immediately without delay", () => {
    cy.mount(<TestDebounceHarness initialValue="hello-world" delay={300} />);
    cy.get('[data-testid="debounced-value"]').should("have.text", "hello-world");
    cy.get('[data-testid="raw-value"]').should("have.text", "hello-world");
  });

  it("debounces value changes according to specified delay", () => {
    cy.clock();
    cy.mount(<TestDebounceHarness initialValue="start" delay={300} />);
    cy.get('[data-testid="debounced-value"]').should("have.text", "start");

    // Change value
    cy.get('[data-testid="btn-change"]').click();
    cy.get('[data-testid="raw-value"]').should("have.text", "programmatic-change");
    // Not yet updated in debounced value
    cy.get('[data-testid="debounced-value"]').should("have.text", "start");

    // Advance clock halfway (150ms)
    cy.tick(150);
    cy.get('[data-testid="debounced-value"]').should("have.text", "start");

    // Advance clock remaining 150ms
    cy.tick(150);
    cy.get('[data-testid="debounced-value"]').should("have.text", "programmatic-change");
  });

  it("resets timer when value changes rapidly before delay expires", () => {
    cy.clock();
    cy.mount(<TestDebounceHarness initialValue="v0" delay={200} />);

    // Fast successive inputs
    cy.get('[data-testid="input"]').clear().type("v1");
    cy.tick(100);
    cy.get('[data-testid="debounced-value"]').should("have.text", "v0");

    cy.get('[data-testid="input"]').type("2");
    cy.tick(100);
    cy.get('[data-testid="debounced-value"]').should("have.text", "v0");

    // Total 200ms from the second change
    cy.tick(100);
    cy.get('[data-testid="debounced-value"]').should("have.text", "v12");
  });

  it("handles default delay when delay parameter is omitted", () => {
    cy.clock();
    cy.mount(<TestDebounceHarness initialValue="default-delay" />);
    cy.get('[data-testid="debounced-value"]').should("have.text", "default-delay");

    cy.get('[data-testid="btn-change"]').click();
    // Default delay is 300ms
    cy.tick(299);
    cy.get('[data-testid="debounced-value"]').should("have.text", "default-delay");

    cy.tick(1);
    cy.get('[data-testid="debounced-value"]').should("have.text", "programmatic-change");
  });
});
