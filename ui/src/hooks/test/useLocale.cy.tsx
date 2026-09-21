import React from "react";
import { OpenWayProvider, useLocale } from "@/components/common/OpenWayProvider";
import { viVN } from "@/locale/viVN";
import type { OpenWayLocale } from "@/locale/types";

function TestLocaleConsumer({
  overrides,
}: {
  overrides?: Partial<OpenWayLocale["confirm"]>;
}) {
  const confirmLocale = useLocale("confirm", overrides);

  return (
    <div className="p-4">
      <div data-testid="confirm-btn">{confirmLocale.confirmText}</div>
      <div data-testid="cancel-btn">{confirmLocale.cancelText}</div>
    </div>
  );
}

describe("useLocale Hook Unit Tests", () => {
  it("defaults to enUS when rendered outside OpenWayProvider", () => {
    cy.mount(<TestLocaleConsumer />);

    cy.get('[data-testid="confirm-btn"]').should("have.text", "Confirm");
    cy.get('[data-testid="cancel-btn"]').should("have.text", "Cancel");
  });

  it("reads custom locale from OpenWayProvider context (viVN)", () => {
    cy.mount(
      <OpenWayProvider locale={viVN}>
        <TestLocaleConsumer />
      </OpenWayProvider>
    );

    cy.get('[data-testid="confirm-btn"]').should("have.text", "Xác nhận");
    cy.get('[data-testid="cancel-btn"]').should("have.text", "Hủy");
  });

  it("prioritizes component-level overrides over provider context", () => {
    cy.mount(
      <OpenWayProvider locale={viVN}>
        <TestLocaleConsumer overrides={{ confirmText: "Tiến hành" }} />
      </OpenWayProvider>
    );

    // Overridden prop
    cy.get('[data-testid="confirm-btn"]').should("have.text", "Tiến hành");
    // Context fallback for untouched fields
    cy.get('[data-testid="cancel-btn"]').should("have.text", "Hủy");
  });

  it("ignores undefined override values and keeps context defaults", () => {
    cy.mount(
      <OpenWayProvider locale={viVN}>
        <TestLocaleConsumer overrides={{ confirmText: undefined, cancelText: "Quay lại" }} />
      </OpenWayProvider>
    );

    cy.get('[data-testid="confirm-btn"]').should("have.text", "Xác nhận");
    cy.get('[data-testid="cancel-btn"]').should("have.text", "Quay lại");
  });
});
