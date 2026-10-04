import React, { useState, useRef } from "react";
import OtpInput from "./OtpInput";
import { OtpInputRef } from "./types";

describe("OtpInput Component", () => {
  it("comprehensively verifies all OtpInput functionality in a single mount", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    const onCompleteSpy = cy.spy().as("onCompleteSpy");

    const AllInOneShowcase = () => {
      const [interactiveVal, setInteractiveVal] = useState("");
      const [pasteVal, setPasteVal] = useState("");
      const otpRef = useRef<OtpInputRef>(null);
      const [refVal, setRefVal] = useState("");

      return (
        <div className="p-6 flex flex-col gap-6 max-w-2xl bg-neutral-50 min-h-screen">
          <h1 className="text-xl font-bold text-neutral-800">OtpInput Comprehensive Test Showcase</h1>

          {/* 1. Default 6 slots */}
          <div data-testid="section-default" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">1. Default (6 slots)</h2>
            <OtpInput />
          </div>

          {/* 2. Custom 4 slots with defaultValue */}
          <div data-testid="section-default-val" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">2. Custom 4 slots with defaultValue</h2>
            <OtpInput length={4} defaultValue="1234" />
          </div>

          {/* 3. Interactive Typing, Navigation & Events */}
          <div data-testid="section-interactive" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">3. Interactive Typing & Events</h2>
            <OtpInput
              length={4}
              type="numeric"
              value={interactiveVal}
              onChange={(val) => {
                setInteractiveVal(val);
                onChangeSpy(val);
              }}
              onComplete={onCompleteSpy}
            />
            <span data-testid="interactive-val" className="text-xs text-neutral-500 mt-1 block">
              {interactiveVal}
            </span>
          </div>

          {/* 4. Alphanumeric Mode */}
          <div data-testid="section-alphanumeric" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">4. Alphanumeric Mode</h2>
            <OtpInput length={4} type="alphanumeric" />
          </div>

          {/* 5. Paste Handling */}
          <div data-testid="section-paste" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">5. Paste Handling</h2>
            <OtpInput length={6} onChange={setPasteVal} />
            <span data-testid="paste-output" className="text-xs text-neutral-500 mt-1 block">
              {pasteVal}
            </span>
          </div>

          {/* 6. Ref Methods */}
          <div data-testid="section-ref" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">6. Ref Controls</h2>
            <OtpInput ref={otpRef} length={4} defaultValue="1234" />
            <div className="flex gap-2 mt-2">
              <button
                data-testid="ref-get"
                className="px-2 py-1 bg-neutral-200 text-xs rounded"
                onClick={() => setRefVal(otpRef.current?.getValue() || "")}
              >
                Get
              </button>
              <button
                data-testid="ref-clear"
                className="px-2 py-1 bg-neutral-200 text-xs rounded"
                onClick={() => otpRef.current?.clear()}
              >
                Clear
              </button>
              <button
                data-testid="ref-focus-2"
                className="px-2 py-1 bg-neutral-200 text-xs rounded"
                onClick={() => otpRef.current?.focus(2)}
              >
                Focus 2
              </button>
            </div>
            <span data-testid="ref-val" className="text-xs text-neutral-500 mt-1 block">
              {refVal}
            </span>
          </div>

          {/* 7. Accessibility, Security & Error Alert */}
          <div data-testid="section-a11y" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">7. Accessibility & Error State</h2>
            <OtpInput
              length={4}
              ariaLabel="Security Verification Code"
              label="Mã xác thực"
              helperText="Enter 4-digit code"
              config={{ isInvalid: true }}
              errorMessage="Invalid OTP code."
            />
          </div>

          {/* 8. Grouping & Separators */}
          <div data-testid="section-separator" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">8. Grouping & Separator</h2>
            <OtpInput length={6} groupSize={3} separator="-" />
          </div>

          {/* 9. Disabled & ReadOnly */}
          <div data-testid="section-states" className="p-4 bg-white rounded-lg shadow-sm flex flex-col gap-4">
            <h2 className="text-sm font-semibold">9. Disabled & ReadOnly</h2>
            <div>
              <span className="text-xs text-neutral-400 block mb-1">Disabled:</span>
              <div data-testid="disabled-container">
                <OtpInput length={4} disabled defaultValue="1234" />
              </div>
            </div>
            <div>
              <span className="text-xs text-neutral-400 block mb-1">ReadOnly:</span>
              <div data-testid="readonly-container">
                <OtpInput length={4} readOnly defaultValue="1234" />
              </div>
            </div>
          </div>

          {/* 10. Config Prop & Form Hidden Input */}
          <div data-testid="section-config-form" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">10. Config Prop & Form Integration</h2>
            <OtpInput
              id="custom-otp-id"
              name="otp_code"
              length={4}
              defaultValue="5678"
              config={{
                isRequired: true,
                isInvalid: true,
                isLoading: true,
                showSpinner: true,
              }}
            />
          </div>
        </div>
      );
    };

    // MOUNT ONLY ONCE
    cy.mount(<AllInOneShowcase />);

    // 1. Verify Default (6 slots)
    cy.get("[data-testid='section-default'] input").should("have.length", 6);

    // 2. Verify Custom length & defaultValue
    cy.get("[data-testid='section-default-val'] input").should("have.length", 4);
    cy.get("[data-testid='section-default-val'] input").eq(0).should("have.value", "1");
    cy.get("[data-testid='section-default-val'] input").eq(1).should("have.value", "2");
    cy.get("[data-testid='section-default-val'] input").eq(2).should("have.value", "3");
    cy.get("[data-testid='section-default-val'] input").eq(3).should("have.value", "4");

    // 3. Verify Interactive Typing, Navigation & Events
    cy.get("[data-testid='section-interactive'] input").eq(0).type("a");
    cy.get("[data-testid='section-interactive'] input").eq(0).should("have.value", ""); // Numeric rejects non-digit
    cy.get("[data-testid='section-interactive'] input").eq(0).type("1");
    cy.get("[data-testid='section-interactive'] input").eq(0).should("have.value", "1");
    cy.get("[data-testid='section-interactive'] input").eq(1).should("be.focused");
    cy.get("@onChangeSpy").should("have.been.calledWith", "1");

    cy.get("[data-testid='section-interactive'] input").eq(1).type("2");
    cy.get("[data-testid='section-interactive'] input").eq(2).should("be.focused");
    cy.get("@onChangeSpy").should("have.been.calledWith", "12");

    // Navigation with Arrow keys
    cy.get("[data-testid='section-interactive'] input").eq(2).type("{leftarrow}");
    cy.get("[data-testid='section-interactive'] input").eq(1).should("be.focused");
    cy.get("[data-testid='section-interactive'] input").eq(1).type("{rightarrow}");
    cy.get("[data-testid='section-interactive'] input").eq(2).should("be.focused");

    // Backspace handling
    cy.get("[data-testid='section-interactive'] input").eq(2).type("{backspace}");
    cy.get("[data-testid='section-interactive'] input").eq(1).should("have.value", "");
    cy.get("[data-testid='section-interactive'] input").eq(1).should("be.focused");

    // Continue typing to complete
    cy.get("[data-testid='section-interactive'] input").eq(1).type("2");
    cy.get("[data-testid='section-interactive'] input").eq(2).type("3");
    cy.get("[data-testid='section-interactive'] input").eq(3).type("4");
    cy.get("@onChangeSpy").should("have.been.calledWith", "1234");
    cy.get("@onCompleteSpy").should("have.been.calledOnceWith", "1234");
    cy.get("[data-testid='interactive-val']").should("have.text", "1234");

    // 4. Verify Alphanumeric Mode
    cy.get("[data-testid='section-alphanumeric'] input").eq(0).type("a").should("have.value", "a");
    cy.get("[data-testid='section-alphanumeric'] input").eq(1).type("Z").should("have.value", "Z");
    cy.get("[data-testid='section-alphanumeric'] input").eq(2).type("9").should("have.value", "9");

    // 5. Verify Paste Handling & Sanitization
    cy.get("[data-testid='section-paste'] input")
      .eq(0)
      .trigger("paste", {
        clipboardData: {
          getData: () => "ab6-5 c4 321d", // Should sanitize to 654321
        },
      });
    cy.get("[data-testid='section-paste'] input").eq(0).should("have.value", "6");
    cy.get("[data-testid='section-paste'] input").eq(1).should("have.value", "5");
    cy.get("[data-testid='section-paste'] input").eq(2).should("have.value", "4");
    cy.get("[data-testid='section-paste'] input").eq(3).should("have.value", "3");
    cy.get("[data-testid='section-paste'] input").eq(4).should("have.value", "2");
    cy.get("[data-testid='section-paste'] input").eq(5).should("have.value", "1");
    cy.get("[data-testid='paste-output']").should("have.text", "654321");
    cy.get("[data-testid='section-paste'] input").eq(5).should("be.focused");

    // 6. Verify Ref Methods
    cy.get("[data-testid='ref-get']").click();
    cy.get("[data-testid='ref-val']").should("have.text", "1234");
    cy.get("[data-testid='ref-clear']").click();
    cy.get("[data-testid='section-ref'] input").eq(0).should("have.value", "");
    cy.get("[data-testid='section-ref'] input").eq(0).should("be.focused");
    cy.get("[data-testid='ref-focus-2']").click();
    cy.get("[data-testid='section-ref'] input").eq(2).should("be.focused");

    // 7. Verify Accessibility, Security & Error Alert
    cy.get("[data-testid='section-a11y'] [role='group']")
      .should("have.attr", "aria-label", "Security Verification Code")
      .and("have.attr", "aria-describedby");

    cy.get("[data-testid='section-a11y'] input").eq(0).should("have.attr", "aria-label", "Digit 1 of 4");
    cy.get("[data-testid='section-a11y'] input").eq(1).should("have.attr", "aria-label", "Digit 2 of 4");
    cy.get("[data-testid='section-a11y'] input").eq(0).should("have.attr", "autocomplete", "one-time-code");
    cy.get("[data-testid='section-a11y'] input").eq(0).should("have.attr", "spellcheck", "false");
    cy.get("[data-testid='section-a11y'] input").eq(0).should("have.attr", "data-1p-ignore", "true");
    cy.get("[data-testid='section-a11y'] input").each(($el) => {
      cy.wrap($el).should("have.attr", "aria-invalid", "true");
    });
    cy.get("[data-testid='section-a11y'] [role='alert']").should("contain.text", "Invalid OTP code.");

    // 8. Verify Grouping & Separators
    cy.get("[data-testid='section-separator'] [role='group']").contains("-").should("be.visible");

    // 9. Verify Disabled & ReadOnly States
    cy.get("[data-testid='disabled-container'] input").each(($el) => {
      cy.wrap($el).should("be.disabled");
    });
    cy.get("[data-testid='readonly-container'] input").each(($el) => {
      cy.wrap($el).should("have.attr", "readonly");
    });

    // 10. Verify Config Prop, Custom ID & Form Hidden Input
    cy.get("[data-testid='section-config-form'] input#custom-otp-id-slot-0").should("exist");
    cy.get("[data-testid='section-config-form'] input[type='hidden'][name='otp_code']")
      .should("exist")
      .and("have.value", "5678");
    cy.get("[data-testid='section-config-form'] input#custom-otp-id-slot-0")
      .should("have.attr", "aria-invalid", "true")
      .and("have.attr", "aria-busy", "true")
      .and("have.attr", "aria-required", "true");
    cy.get("[data-testid='section-config-form'] svg").should("exist"); // spinner
  });
});
