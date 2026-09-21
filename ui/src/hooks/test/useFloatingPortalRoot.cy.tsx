import React, { useState } from "react";
import { useFloatingPortalRoot } from "../useFloatingPortalRoot";
import { PortalRootContext, PortalRoot } from "@/components/portal/PortalRootContext";

function PortalRootConsumer({
  customRoot,
}: {
  customRoot?: PortalRoot;
}) {
  const [refEl, setRefEl] = useState<HTMLButtonElement | null>(null);

  const resolved = useFloatingPortalRoot({
    portalRoot: customRoot,
    reference: refEl,
  });

  let resolvedName = "undefined";
  if (resolved instanceof HTMLElement) {
    resolvedName = resolved.getAttribute("data-testid") || resolved.tagName.toLowerCase();
  }

  return (
    <div>
      <button ref={setRefEl} data-testid="ref-btn">
        Reference Element
      </button>
      <div data-testid="resolved-root">{resolvedName}</div>
    </div>
  );
}

describe("useFloatingPortalRoot Hook Unit Tests", () => {
  it("returns undefined fallback when no root, context or dialog is provided", () => {
    cy.mount(<PortalRootConsumer />);
    cy.get('[data-testid="resolved-root"]').should("have.text", "undefined");
  });

  it("prioritizes portalRoot passed as prop", () => {
    const customDiv = document.createElement("div");
    customDiv.setAttribute("data-testid", "prop-target");
    document.body.appendChild(customDiv);

    cy.mount(<PortalRootConsumer customRoot={customDiv} />);
    cy.get('[data-testid="resolved-root"]').should("have.text", "prop-target");
  });

  it("detects enclosing dialog if trigger element is inside dialog", () => {
    cy.mount(
      <dialog open data-testid="dialog-container">
        <PortalRootConsumer />
      </dialog>
    );
    cy.get('[data-testid="resolved-root"]').should("have.text", "dialog-container");
  });

  it("uses PortalRootContext if no prop or dialog is provided", () => {
    const ContextWrapper = () => {
      const [contextEl, setContextEl] = useState<HTMLDivElement | null>(null);

      return (
        <div ref={setContextEl} data-testid="context-container">
          <PortalRootContext.Provider value={contextEl}>
            <PortalRootConsumer />
          </PortalRootContext.Provider>
        </div>
      );
    };

    cy.mount(<ContextWrapper />);
    cy.get('[data-testid="resolved-root"]').should("have.text", "context-container");
  });
});
