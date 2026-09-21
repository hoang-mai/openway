import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMutationApp, extractErrorMessage } from "../useMutationApp";
import { Toaster } from "@/components/toast";

describe("extractErrorMessage Unit Tests", () => {
  it("extracts string error directly", () => {
    expect(extractErrorMessage("Custom error string")).to.equal("Custom error string");
  });

  it("extracts standard Error message", () => {
    expect(extractErrorMessage(new Error("Standard error message"))).to.equal(
      "Standard error message"
    );
  });

  it("extracts Axios response message", () => {
    const axiosError = {
      response: {
        status: 400,
        data: { message: "Invalid payload provided" },
      },
    };
    expect(extractErrorMessage(axiosError)).to.equal("Invalid payload provided");
  });

  it("extracts array of error messages from response", () => {
    const classValidatorError = {
      response: {
        status: 422,
        data: { message: ["Field 'email' is required", "Field 'name' is required"] },
      },
    };
    expect(extractErrorMessage(classValidatorError)).to.equal("Field 'email' is required");
  });

  it("falls back to HTTP status message when response data has no text", () => {
    const notFoundError = {
      response: {
        status: 404,
        data: {},
      },
    };
    expect(extractErrorMessage(notFoundError)).to.contain("not found");
  });

  it("falls back to default fallback when error is empty or null", () => {
    expect(extractErrorMessage(null, "Default fallback")).to.equal("Default fallback");
  });
});

function TestMutationHarness({
  onMutateAction,
  successMsg,
  invalidateKey,
}: {
  onMutateAction: () => Promise<string>;
  successMsg?: string;
  invalidateKey?: string[];
}) {
  const mutation = useMutationApp({
    mutationFn: onMutateAction,
    successMessage: successMsg,
    invalidateQueries: invalidateKey ? [invalidateKey] : undefined,
  });

  return (
    <div className="p-4">
      <div data-testid="is-loading">{mutation.isLoading ? "true" : "false"}</div>
      <div data-testid="is-success">{mutation.isSuccess ? "true" : "false"}</div>
      <div data-testid="is-error">{mutation.isError ? "true" : "false"}</div>
      <button data-testid="btn-mutate" onClick={() => mutation.mutate()}>
        Mutate
      </button>
    </div>
  );
}

describe("useMutationApp Hook Unit Tests", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
  });

  it("executes mutation successfully and triggers success state", () => {
    const mutateFn = cy.stub().as("mutateFn");
    mutateFn.resolves("Success Data");

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <TestMutationHarness onMutateAction={mutateFn} successMsg="Item created successfully" />
      </QueryClientProvider>
    );

    cy.get('[data-testid="is-loading"]').should("have.text", "false");
    cy.get('[data-testid="is-success"]').should("have.text", "false");

    cy.get('[data-testid="btn-mutate"]').click();

    cy.get("@mutateFn").should("have.been.calledOnce");
    cy.get('[data-testid="is-success"]').should("have.text", "true");
    cy.get('[data-testid="is-loading"]').should("have.text", "false");
  });

  it("handles mutation error and exposes error state", () => {
    const mutateFn = cy.stub().as("mutateFn");
    mutateFn.rejects(new Error("API Failed"));

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <TestMutationHarness onMutateAction={mutateFn} />
      </QueryClientProvider>
    );

    cy.get('[data-testid="btn-mutate"]').click();

    cy.get("@mutateFn").should("have.been.calledOnce");
    cy.get('[data-testid="is-error"]').should("have.text", "true");
    cy.get('[data-testid="is-loading"]').should("have.text", "false");
  });

  it("invalidates specified query cache keys upon success", () => {
    const invalidateSpy = cy.spy(queryClient, "invalidateQueries").as("invalidateSpy");
    const mutateFn = cy.stub().resolves("Done");

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <TestMutationHarness
          onMutateAction={mutateFn}
          invalidateKey={["users", "list"]}
        />
      </QueryClientProvider>
    );

    cy.get('[data-testid="btn-mutate"]').click();

    cy.get("@invalidateSpy").should("have.been.calledWith", {
      queryKey: ["users", "list"],
    });
  });
});
