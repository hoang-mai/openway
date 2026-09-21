import React, { useState } from "react";
import { useInfiniteScroll } from "../useInfiniteScroll";

function TestInfiniteScrollHarness({
  onLoadMore,
  hasMore = true,
  isLoading = false,
  disabled = false,
  autoShow = false,
}: {
  onLoadMore: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  autoShow?: boolean;
}) {
  const [showSentinel, setShowSentinel] = useState(autoShow);

  const { sentinelRef, isIntersecting } = useInfiniteScroll({
    onLoadMore,
    hasMore,
    isLoading,
    disabled,
    rootMargin: "0px",
  });

  return (
    <div className="p-4">
      <div data-testid="is-intersecting">{isIntersecting ? "true" : "false"}</div>
      <button
        data-testid="btn-show-sentinel"
        onClick={() => setShowSentinel(true)}
      >
        Show Sentinel
      </button>

      {showSentinel && (
        <div
          ref={sentinelRef}
          data-testid="sentinel"
          style={{ height: "40px", width: "100%", background: "lightcoral" }}
        >
          Sentinel In View
        </div>
      )}
    </div>
  );
}

describe("useInfiniteScroll Hook Unit Tests", () => {
  it("triggers onLoadMore when sentinel mounts into view", () => {
    const loadMoreSpy = cy.spy().as("loadMoreSpy");

    cy.mount(<TestInfiniteScrollHarness onLoadMore={loadMoreSpy} />);

    cy.get("@loadMoreSpy").should("not.have.been.called");

    // Mount sentinel into viewport
    cy.get('[data-testid="btn-show-sentinel"]').click();

    cy.get("@loadMoreSpy", { timeout: 4000 }).should("have.been.called");
    cy.get('[data-testid="is-intersecting"]').should("have.text", "true");
  });

  it("does not trigger onLoadMore when hasMore is false", () => {
    const loadMoreSpy = cy.spy().as("loadMoreSpy");

    cy.mount(
      <TestInfiniteScrollHarness onLoadMore={loadMoreSpy} hasMore={false} />
    );

    cy.get('[data-testid="btn-show-sentinel"]').click();
    cy.get('[data-testid="sentinel"]').should("be.visible");
    cy.get("@loadMoreSpy").should("not.have.been.called");
  });

  it("does not trigger onLoadMore when isLoading is true", () => {
    const loadMoreSpy = cy.spy().as("loadMoreSpy");

    cy.mount(
      <TestInfiniteScrollHarness onLoadMore={loadMoreSpy} isLoading={true} />
    );

    cy.get('[data-testid="btn-show-sentinel"]').click();
    cy.get('[data-testid="sentinel"]').should("be.visible");
    cy.get("@loadMoreSpy").should("not.have.been.called");
  });

  it("does not trigger onLoadMore when disabled is true", () => {
    const loadMoreSpy = cy.spy().as("loadMoreSpy");

    cy.mount(
      <TestInfiniteScrollHarness onLoadMore={loadMoreSpy} disabled={true} />
    );

    cy.get('[data-testid="btn-show-sentinel"]').click();
    cy.get('[data-testid="sentinel"]').should("be.visible");
    cy.get("@loadMoreSpy").should("not.have.been.called");
  });
});
