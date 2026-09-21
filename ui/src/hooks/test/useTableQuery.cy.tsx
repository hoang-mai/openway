import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTableQuery, TableQueryParams } from "@/components/table/hooks/useTableQuery";

interface UserRow {
  id: number;
  name: string;
}

function TestTableQueryHarness({
  onQuery,
  autoReset = true,
}: {
  onQuery: (params: TableQueryParams) => Promise<{ data: UserRow[]; total: number }>;
  autoReset?: boolean;
}) {
  const {
    queryParams,
    tableProps,
    setPage,
    setPageSize,
    setSorting,
    setColumnFilters,
    resetAll,
  } = useTableQuery<UserRow, { data: UserRow[]; total: number }>({
    queryKey: ["users-table"],
    queryFn: (params) => onQuery(params),
    autoResetPageIndex: autoReset,
    debounceMs: 0,
  });

  return (
    <div className="p-4">
      <div data-testid="page">{queryParams.page}</div>
      <div data-testid="page-size">{queryParams.pageSize}</div>
      <div data-testid="sort-by">{queryParams.sortBy ?? "none"}</div>
      <div data-testid="sort-order">{queryParams.sortOrder ?? "none"}</div>
      <div data-testid="row-count">{tableProps.rowCount}</div>
      <div data-testid="data-count">{tableProps.data.length}</div>

      <button data-testid="btn-page-2" onClick={() => setPage(2)}>
        Page 2
      </button>
      <button data-testid="btn-page-size-25" onClick={() => setPageSize(25)}>
        Size 25
      </button>
      <button
        data-testid="btn-sort-name-desc"
        onClick={() => setSorting([{ id: "name", desc: true }])}
      >
        Sort Name Desc
      </button>
      <button
        data-testid="btn-filter"
        onClick={() => setColumnFilters([{ id: "name", value: "alice" }])}
      >
        Filter Name
      </button>
      <button data-testid="btn-reset" onClick={resetAll}>
        Reset
      </button>
    </div>
  );
}

describe("useTableQuery Hook Unit Tests", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
  });

  it("fetches initial data with default pagination", () => {
    const queryFn = cy.stub().as("queryFn");
    queryFn.resolves({
      data: [{ id: 1, name: "Alice" }],
      total: 10,
    });

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <TestTableQueryHarness onQuery={queryFn} />
      </QueryClientProvider>
    );

    cy.get('[data-testid="page"]').should("have.text", "1");
    cy.get('[data-testid="page-size"]').should("have.text", "10");
    cy.get('[data-testid="row-count"]').should("have.text", "10");
    cy.get('[data-testid="data-count"]').should("have.text", "1");
  });

  it("updates page and page size properly", () => {
    const queryFn = cy.stub().resolves({ data: [], total: 50 });

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <TestTableQueryHarness onQuery={queryFn} />
      </QueryClientProvider>
    );

    cy.get('[data-testid="btn-page-2"]').click();
    cy.get('[data-testid="page"]').should("have.text", "2");

    cy.get('[data-testid="btn-page-size-25"]').click();
    cy.get('[data-testid="page-size"]').should("have.text", "25");
    // Changing pageSize resets page to 1
    cy.get('[data-testid="page"]').should("have.text", "1");
  });

  it("applies sorting and auto-resets page index to 1", () => {
    const queryFn = cy.stub().resolves({ data: [], total: 50 });

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <TestTableQueryHarness onQuery={queryFn} />
      </QueryClientProvider>
    );

    // Navigate to page 2 first
    cy.get('[data-testid="btn-page-2"]').click();
    cy.get('[data-testid="page"]').should("have.text", "2");

    // Change sorting
    cy.get('[data-testid="btn-sort-name-desc"]').click();
    cy.get('[data-testid="sort-by"]').should("have.text", "name");
    cy.get('[data-testid="sort-order"]').should("have.text", "desc");
    // Page automatically resets to 1
    cy.get('[data-testid="page"]').should("have.text", "1");
  });

  it("resets all table state via resetAll()", () => {
    const queryFn = cy.stub().resolves({ data: [], total: 50 });

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <TestTableQueryHarness onQuery={queryFn} />
      </QueryClientProvider>
    );

    cy.get('[data-testid="btn-page-2"]').click();
    cy.get('[data-testid="btn-sort-name-desc"]').click();

    cy.get('[data-testid="btn-reset"]').click();
    cy.get('[data-testid="page"]').should("have.text", "1");
    cy.get('[data-testid="sort-by"]').should("have.text", "none");
    cy.get('[data-testid="sort-order"]').should("have.text", "none");
  });
});
