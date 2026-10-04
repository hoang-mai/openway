import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverClose,
} from "./index";

describe("<Popover /> Component Tests (Single Mount Harness)", () => {
  it("verifies all popover functionalities with a single mount", () => {
    const onSubmit = cy.stub().as("onSubmit");
    const onCancel = cy.stub().as("onCancel");

    // Single mount for the entire test suite
    cy.mount(
      <div style={{ padding: 100 }}>
        <Popover placement="bottom-start" size="md">
          <PopoverTrigger>
            <button id="test-popover-trigger">Open Filter</button>
          </PopoverTrigger>
          <PopoverContent id="test-popover-content" minWidth={280}>
            <PopoverHeader id="test-popover-header">Filter Options</PopoverHeader>
            <PopoverBody id="test-popover-body">
              <label htmlFor="filter-input" className="block text-xs font-medium text-neutral-600 mb-1">
                Keyword
              </label>
              <input
                id="filter-input"
                data-testid="filter-input"
                type="text"
                placeholder="Enter keyword..."
                className="w-full px-2.5 py-1.5 border border-neutral-300 rounded text-sm outline-none focus:border-primary-500"
              />
            </PopoverBody>
            <PopoverFooter id="test-popover-footer" className="flex justify-end gap-2">
              <PopoverClose id="btn-cancel" onClick={onCancel}>
                Cancel
              </PopoverClose>
              <button
                id="btn-apply"
                type="button"
                onClick={onSubmit}
                className="px-3 py-1 bg-primary-500 text-white text-xs rounded hover:bg-primary-600"
              >
                Apply
              </button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </div>
    );

    // 1. Initial State: Trigger exists, content not rendered
    cy.get("#test-popover-trigger")
      .should("be.visible")
      .and("have.attr", "aria-expanded", "false")
      .and("have.attr", "aria-haspopup", "dialog");
    cy.get("#test-popover-content").should("not.exist");

    // 2. Open via click
    cy.get("#test-popover-trigger").click();
    cy.get("#test-popover-trigger").should("have.attr", "aria-expanded", "true");
    cy.get("#test-popover-content").should("be.visible").and("have.attr", "role", "dialog");

    // 3. Verify structure: Header, Body, Footer
    cy.get("#test-popover-header").should("be.visible").and("contain.text", "Filter Options");
    cy.get("#test-popover-body").should("be.visible");
    cy.get("#test-popover-footer").should("be.visible");

    // 4. Interactive typing inside form body (does NOT close popup)
    cy.get("#filter-input").type("Antigravity Design System").should("have.value", "Antigravity Design System");
    cy.get("#test-popover-content").should("be.visible");

    // 5. Click Action Button (Apply) -> triggers callback without unexpected close
    cy.get("#btn-apply").click();
    cy.get("@onSubmit").should("have.been.calledOnce");

    // 6. Click PopoverClose (Cancel) -> calls onCancel & closes popover
    cy.get("#btn-cancel").click();
    cy.get("@onCancel").should("have.been.calledOnce");
    cy.get("#test-popover-content").should("not.exist");
    cy.get("#test-popover-trigger").should("have.attr", "aria-expanded", "false");

    // 7. Reopen and close via Escape key
    cy.get("#test-popover-trigger").click();
    cy.get("#test-popover-content").should("be.visible");
    cy.get("#filter-input").type("{esc}");
    cy.get("#test-popover-content").should("not.exist");
    cy.get("#test-popover-trigger").should("have.attr", "aria-expanded", "false");
  });
});
