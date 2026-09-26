import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useSelectInfiniteQuery,
  SelectQueryParams,
} from "./useSelectInfiniteQuery";

interface OptionResponse {
  data: Array<{ value: string; label: string }>;
  nextPage?: number;
}

function TestSelectInfiniteQueryHarness({
  onFetch,
}: {
  onFetch: (params: SelectQueryParams<number>) => Promise<OptionResponse>;
}) {
  const {
    selectProps,
    search,
    setSearch,
    options,
    reset,
  } = useSelectInfiniteQuery<unknown, OptionResponse, number>({
    queryKey: ["test-select-infinite"],
    queryFn: (params) => onFetch(params),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    debounceMs: 50,
  });

  return (
    <div className="p-4">
      <div data-testid="search-val">{search}</div>
      <div data-testid="options-count">{options.length}</div>
      <div data-testid="options-list">
        {options.map((opt) => (
          <span key={opt.value} data-testid={`option-${opt.value}`}>
            {opt.label}
          </span>
        ))}
      </div>

      <input
        data-testid="search-input"
        value={selectProps.searchValue}
        onChange={(e) => selectProps.onSearchChange(e.target.value)}
      />

      <button data-testid="btn-set-search" onClick={() => setSearch("quick")}>
        Search Quick
      </button>
      <button data-testid="btn-reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

describe("useSelectInfiniteQuery Hook Unit Tests", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
  });

  it("fetches initial page and flattens options correctly", () => {
    const fetchFn = cy.stub().as("fetchFn");
    fetchFn.resolves({
      data: [
        { value: "1", label: "Option One" },
        { value: "2", label: "Option Two" },
      ],
      nextPage: 2,
    });

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <TestSelectInfiniteQueryHarness onFetch={fetchFn} />
      </QueryClientProvider>
    );

    cy.get('[data-testid="options-count"]').should("have.text", "2");
    cy.get('[data-testid="option-1"]').should("have.text", "Option One");
    cy.get('[data-testid="option-2"]').should("have.text", "Option Two");
  });

  it("handles search input change and debounces query correctly", () => {
    const fetchFn = cy.stub().callsFake(async (params: SelectQueryParams<number>) => {
      if (params.filters.search === "quick") {
        return {
          data: [{ value: "99", label: "Quick Result" }],
        };
      }
      return {
        data: [{ value: "1", label: "Default" }],
      };
    });

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <TestSelectInfiniteQueryHarness onFetch={fetchFn} />
      </QueryClientProvider>
    );

    cy.get('[data-testid="options-count"]').should("have.text", "1");

    // Type in search input
    cy.get('[data-testid="search-input"]').type("quick");
    cy.get('[data-testid="search-val"]').should("have.text", "quick");

    // Options update with filtered result after debounce
    cy.get('[data-testid="option-99"]').should("exist").and("have.text", "Quick Result");
  });

  it("resets search back to initial on reset()", () => {
    const fetchFn = cy.stub().resolves({
      data: [{ value: "1", label: "Default" }],
    });

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <TestSelectInfiniteQueryHarness onFetch={fetchFn} />
      </QueryClientProvider>
    );

    cy.get('[data-testid="btn-set-search"]').click();
    cy.get('[data-testid="search-val"]').should("have.text", "quick");

    cy.get('[data-testid="btn-reset"]').click();
    cy.get('[data-testid="search-val"]').should("have.text", "");
  });
});
