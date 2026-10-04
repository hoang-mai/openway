import React, { useState } from "react";
import MultiInput from "./MultiInput";
import { InputSize, InputRadius, InputVariant, InputColor } from "./types";

const sizes: InputSize[] = ["xs", "sm", "md", "lg", "xl"];
const radii: InputRadius[] = ["none", "sm", "md", "lg", "xl", "full"];
const variants: InputVariant[] = ["outline", "filled", "ghost", "other"];
const colors: InputColor[] = ["primary", "secondary", "error", "success", "warning", "info", "neutral"];

describe("MultiInput Component", () => {
  it("comprehensively verifies all MultiInput functionality in a single mount", () => {
    const onControlledChangeSpy = cy.spy().as("onControlledChangeSpy");
    const onInteractiveChangeSpy = cy.spy().as("onInteractiveChangeSpy");
    const onDuplicateSpy = cy.spy().as("onDuplicateSpy");
    const onMaxTagsSpy = cy.spy().as("onMaxTagsSpy");
    const onValidateErrorSpy = cy.spy().as("onValidateErrorSpy");
    const onBlurChangeSpy = cy.spy().as("onBlurChangeSpy");
    const onPasteChangeSpy = cy.spy().as("onPasteChangeSpy");
    const onClearSpy = cy.spy().as("onClearSpy");

    const AllInOneShowcase = () => {
      // Controlled state
      const [controlledTags, setControlledTags] = useState<string[]>(["Controlled1", "Controlled2"]);

      // Interactive state
      const [interactiveTags, setInteractiveTags] = useState<string[]>([]);

      // Paste state
      const [pasteTags, setPasteTags] = useState<string[]>([]);

      // Blur state
      const [blurTags, setBlurTags] = useState<string[]>([]);

      const validateEmail = (tag: string) => (tag.includes("@") ? true : "Invalid email");

      return (
        <div className="p-6 flex flex-col gap-6 max-w-4xl bg-neutral-50 min-h-screen">
          <h1 className="text-xl font-bold text-neutral-800">MultiInput Comprehensive Test Showcase</h1>

          {/* 1. Default Empty */}
          <div data-testid="section-default" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">1. Default Empty with Placeholder</h2>
            <MultiInput placeholder="Enter tags here..." />
          </div>

          {/* 2. Uncontrolled with defaultValue */}
          <div data-testid="section-default-val" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">2. Uncontrolled with Default Value</h2>
            <MultiInput defaultValue={["React", "Vue", "Angular"]} />
          </div>

          {/* 3. Controlled State */}
          <div data-testid="section-controlled" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">3. Controlled State</h2>
            <MultiInput
              value={controlledTags}
              onChange={(newTags) => {
                setControlledTags(newTags);
                onControlledChangeSpy(newTags);
              }}
            />
            <span data-testid="controlled-count" className="text-xs text-neutral-500 mt-1 block">
              {controlledTags.length}
            </span>
          </div>

          {/* 4. Interactive Keyboard & Delimiters */}
          <div data-testid="section-interactive" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">4. Interactive Keyboard, Delimiters & Clear</h2>
            <MultiInput
              config={{ isClearable: true }}
              delimiters={["Enter", ","]}
              value={interactiveTags}
              onChange={(newTags) => {
                setInteractiveTags(newTags);
                onInteractiveChangeSpy(newTags);
              }}
              onClear={onClearSpy}
              placeholder="Type and press Enter or Comma..."
            />
          </div>

          {/* 5. Add Button at the End */}
          <div data-testid="section-add-button" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">5. Add Button at the End</h2>
            <MultiInput showAddButton placeholder="Add with plus icon..." />
          </div>

          {/* 6. Custom Render Add Button */}
          <div data-testid="section-custom-add-btn" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">6. Custom Render Add Button</h2>
            <MultiInput
              showAddButton
              renderAddButton={({ onAdd, disabled }) => (
                <button
                  data-testid="custom-add-btn"
                  onClick={onAdd}
                  disabled={disabled}
                  className="px-2 py-1 bg-primary-600 text-white text-xs rounded disabled:opacity-50"
                >
                  Custom Add
                </button>
              )}
            />
          </div>

          {/* 7. Validation & Duplicates */}
          <div data-testid="section-duplicate" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">7. Duplicate Prevention & allowDuplicates</h2>
            <div data-testid="duplicate-prevented">
              <MultiInput defaultValue={["Apple"]} onDuplicate={onDuplicateSpy} />
            </div>
            <div className="mt-2" data-testid="duplicate-allowed">
              <MultiInput allowDuplicates defaultValue={["Apple"]} />
            </div>
          </div>

          {/* 8. Max Tags Limit */}
          <div data-testid="section-max-tags" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">8. Max Tags Limit</h2>
            <MultiInput maxTags={2} defaultValue={["Tag1"]} onMaxTagsReached={onMaxTagsSpy} />
          </div>

          {/* 9. Custom Validator */}
          <div data-testid="section-validator" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">9. Custom Tag Validator (Email)</h2>
            <MultiInput
              validateTag={validateEmail}
              onValidateError={onValidateErrorSpy}
              placeholder="Enter valid email..."
            />
          </div>

          {/* 10. Max Tag Count (Collapsing) */}
          <div data-testid="section-max-tag-count" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">10. Max Tag Count Collapsing (+N)</h2>
            <MultiInput maxTagCount={2} defaultValue={["Item1", "Item2", "Item3", "Item4"]} />
          </div>

          {/* 11. Blur & Paste Events */}
          <div data-testid="section-blur-paste" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">11. Add On Blur & Paste Handling</h2>
            <div className="mb-2" data-testid="blur-input">
              <MultiInput
                addOnBlur
                value={blurTags}
                onChange={(tags) => {
                  setBlurTags(tags);
                  onBlurChangeSpy(tags);
                }}
              />
            </div>
            <div data-testid="paste-input">
              <MultiInput
                addOnPaste
                value={pasteTags}
                onChange={(tags) => {
                  setPasteTags(tags);
                  onPasteChangeSpy(tags);
                }}
              />
            </div>
          </div>

          {/* 12. Custom renderTag */}
          <div data-testid="section-custom-tag" className="p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-sm font-semibold mb-2">12. Custom renderTag</h2>
            <MultiInput
              defaultValue={["CustomItem"]}
              renderTag={({ value, onRemove }) => (
                <div
                  data-testid="custom-tag-node"
                  className="bg-yellow-200 px-2 py-0.5 rounded text-xs flex items-center gap-1"
                >
                  <span>{value}</span>
                  <button data-testid="custom-remove-btn" onClick={onRemove}>
                    x
                  </button>
                </div>
              )}
            />
          </div>

          {/* 13. Labels (Floating, Top, Left) & Error */}
          <div data-testid="section-labels-error" className="p-4 bg-white rounded-lg shadow-sm flex flex-col gap-4">
            <h2 className="text-sm font-semibold">13. Labels & Error States</h2>
            <div data-testid="floating-label">
              <MultiInput label="Floating Label" labelPlacement="floating" defaultValue={["Tag"]} />
            </div>
            <div data-testid="top-label">
              <MultiInput label="Top Label" labelPlacement="top" defaultValue={["Tag"]} />
            </div>
            <div data-testid="left-label">
              <MultiInput label="Left Label" labelPlacement="left" defaultValue={["Tag"]} />
            </div>
            <div data-testid="error-state">
              <MultiInput
                label="Error Input"
                config={{ isInvalid: true }}
                errorMessage="Trường này bắt buộc nhập"
                defaultValue={["ErrTag"]}
              />
            </div>
          </div>

          {/* 14. Disabled & ReadOnly */}
          <div
            data-testid="section-disabled-readonly"
            className="p-4 bg-white rounded-lg shadow-sm flex flex-col gap-4"
          >
            <h2 className="text-sm font-semibold">14. Disabled & ReadOnly</h2>
            <div data-testid="disabled-input">
              <MultiInput disabled defaultValue={["DisabledTag"]} showAddButton />
            </div>
            <div data-testid="readonly-input">
              <MultiInput readOnly defaultValue={["ReadOnlyTag"]} showAddButton />
            </div>
          </div>

          {/* 15. All Sizes Gallery */}
          <div data-testid="section-sizes" className="p-4 bg-white rounded-lg shadow-sm flex flex-col gap-2">
            <h2 className="text-sm font-semibold mb-2">15. Sizes (xs, sm, md, lg, xl)</h2>
            {sizes.map((s) => (
              <div key={s} data-testid={`size-${s}`}>
                <MultiInput size={s} defaultValue={[`Size-${s}`]} />
              </div>
            ))}
          </div>

          {/* 16. All Radii Gallery */}
          <div data-testid="section-radii" className="p-4 bg-white rounded-lg shadow-sm flex flex-col gap-2">
            <h2 className="text-sm font-semibold mb-2">16. Radii (none, sm, md, lg, xl, full)</h2>
            {radii.map((r) => (
              <div key={r} data-testid={`radius-${r}`}>
                <MultiInput radius={r} defaultValue={[`Radius-${r}`]} />
              </div>
            ))}
          </div>

          {/* 17. Comprehensive Variant & Color Gallery */}
          <div data-testid="section-variant-colors" className="p-4 bg-white rounded-lg shadow-sm flex flex-col gap-4">
            <h2 className="text-sm font-semibold">17. Variant & Color Matrix Tests</h2>

            {/* Outline Variants for all 7 Colors */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold text-neutral-600">Outline Variants</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {colors.map((c) => (
                  <div key={`outline-${c}`} data-testid={`outline-${c}`}>
                    <MultiInput variant="outline" color={c} defaultValue={[`Outline-${c}`]} />
                  </div>
                ))}
              </div>
            </div>

            {/* Filled Variants for all 7 Colors */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold text-neutral-600">Filled Variants</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {colors.map((c) => (
                  <div key={`filled-${c}`} data-testid={`filled-${c}`}>
                    <MultiInput variant="filled" color={c} defaultValue={[`Filled-${c}`]} />
                  </div>
                ))}
              </div>
            </div>

            {/* Ghost Variants for all 7 Colors */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold text-neutral-600">Ghost Variants</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {colors.map((c) => (
                  <div key={`ghost-${c}`} data-testid={`ghost-${c}`}>
                    <MultiInput variant="ghost" color={c} defaultValue={[`Ghost-${c}`]} />
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Tag Variant & Color Overrides */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold text-neutral-600">Tag Custom Overrides</h3>
              <div className="flex flex-wrap gap-2">
                <div data-testid="custom-tag-variant-filled">
                  <MultiInput
                    variant="outline"
                    color="primary"
                    tagVariant="filled"
                    tagColor="warning"
                    defaultValue={["FilledWarningTag"]}
                  />
                </div>
                <div data-testid="custom-tag-variant-outline">
                  <MultiInput
                    variant="filled"
                    color="secondary"
                    tagVariant="outline"
                    tagColor="error"
                    defaultValue={["OutlineErrorTag"]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 18. Full A11y Suite */}
          <div data-testid="section-a11y" className="p-4 bg-white rounded-lg shadow-sm flex flex-col gap-3">
            <h2 className="text-sm font-semibold">18. Accessibility (WAI-ARIA)</h2>
            <MultiInput
              label="Kỹ năng chuyên môn"
              helperText="Nhập các kỹ năng lập trình chính của bạn"
              config={{ isRequired: true, isClearable: true }}
              defaultValue={["JavaScript", "React"]}
              showAddButton
            />
          </div>

          {/* 19. Config Prop & Form Hidden Inputs */}
          <div data-testid="section-config-form" className="p-4 bg-white rounded-lg shadow-sm flex flex-col gap-3">
            <h2 className="text-sm font-semibold">19. Config Prop & Form Integration</h2>
            <MultiInput
              name="skills"
              defaultValue={["TypeScript", "Tailwind"]}
              config={{
                isRequired: true,
                isLoading: true,
                showSpinner: true,
                isFullWidth: true,
              }}
            />
          </div>
        </div>
      );
    };

    // SINGLE MOUNT FOR ENTIRE TEST SUITE

    cy.mount(<AllInOneShowcase />);

    // 1. Verify Default Empty
    cy.get("[data-testid='section-default'] input")
      .should("exist")
      .and("have.attr", "placeholder", "Enter tags here...");

    // 2. Verify Uncontrolled with Default Value
    cy.get("[data-testid='section-default-val']").contains("React").should("be.visible");
    cy.get("[data-testid='section-default-val']").contains("Vue").should("be.visible");
    cy.get("[data-testid='section-default-val']").contains("Angular").should("be.visible");
    cy.get("[data-testid='section-default-val'] input").should("have.attr", "placeholder", "");

    // 3. Verify Controlled State
    cy.get("[data-testid='section-controlled']").contains("Controlled1").should("be.visible");
    cy.get("[data-testid='section-controlled']").contains("Controlled2").should("be.visible");
    cy.get("[data-testid='controlled-count']").should("have.text", "2");
    cy.get("[data-testid='section-controlled'] input").type("Controlled3{enter}");
    cy.get("@onControlledChangeSpy").should("have.been.calledWith", ["Controlled1", "Controlled2", "Controlled3"]);
    cy.get("[data-testid='controlled-count']").should("have.text", "3");

    // 4. Verify Interactive Keyboard, Delimiters & Deletion
    // Type with Enter
    cy.get("[data-testid='section-interactive'] input").type("TagA{enter}");
    cy.get("[data-testid='section-interactive']").contains("TagA").should("be.visible");
    cy.get("@onInteractiveChangeSpy").should("have.been.calledWith", ["TagA"]);

    // Type with Comma
    cy.get("[data-testid='section-interactive'] input").type("TagB,");
    cy.get("[data-testid='section-interactive']").contains("TagB").should("be.visible");
    cy.get("@onInteractiveChangeSpy").should("have.been.calledWith", ["TagA", "TagB"]);

    // Trim whitespace
    cy.get("[data-testid='section-interactive'] input").type("   TagC   {enter}");
    cy.get("[data-testid='section-interactive']").contains("TagC").should("be.visible");
    cy.get("@onInteractiveChangeSpy").should("have.been.calledWith", ["TagA", "TagB", "TagC"]);

    // Delete tag by badge 'x' (TagB at index 1)
    cy.get("[data-testid='section-interactive'] button[aria-label='Xóa tag TagB']").click();
    cy.get("[data-testid='section-interactive'] [role='list']").contains("TagB").should("not.exist");
    cy.get("[data-testid='section-interactive'] [role='list']").contains("TagA").should("be.visible");
    cy.get("[data-testid='section-interactive'] [role='list']").contains("TagC").should("be.visible");

    // Delete last tag via Backspace on empty input
    cy.get("[data-testid='section-interactive'] input").clear().type("{backspace}");
    cy.get("[data-testid='section-interactive'] [role='list']").contains("TagC").should("not.exist");
    cy.get("[data-testid='section-interactive'] [role='list']").contains("TagA").should("be.visible");

    // Clear all button
    cy.get("[data-testid='section-interactive'] button[aria-label='Clear all tags']").click();
    cy.get("[data-testid='section-interactive'] [role='list']").contains("TagA").should("not.exist");
    cy.get("@onClearSpy").should("have.been.called");

    // 5. Verify Add Button at the End
    cy.get("[data-testid='section-add-button'] button[aria-label='Add tag']").should("be.disabled");
    cy.get("[data-testid='section-add-button'] input").type("NewTag");
    cy.get("[data-testid='section-add-button'] button[aria-label='Add tag']").should("not.be.disabled").click();
    cy.get("[data-testid='section-add-button']").contains("NewTag").should("be.visible");

    // 6. Verify Custom Render Add Button
    cy.get("[data-testid='custom-add-btn']").should("be.disabled");
    cy.get("[data-testid='section-custom-add-btn'] input").type("CustomBtnTag");
    cy.get("[data-testid='custom-add-btn']").should("not.be.disabled").click();
    cy.get("[data-testid='section-custom-add-btn']").contains("CustomBtnTag").should("be.visible");

    // 7. Verify Duplicate Prevention & allowDuplicates
    cy.get("[data-testid='duplicate-prevented'] input").type("Apple{enter}");
    cy.get("@onDuplicateSpy").should("have.been.calledWith", "Apple");
    cy.get("[data-testid='duplicate-allowed'] input").type("Apple{enter}");
    cy.get("[data-testid='duplicate-allowed']").contains("Apple").should("be.visible");

    // 8. Verify Max Tags Limit
    cy.get("[data-testid='section-max-tags'] input").type("Tag2{enter}");
    cy.get("[data-testid='section-max-tags']").contains("Tag2").should("be.visible");
    cy.get("[data-testid='section-max-tags'] input").should("not.exist");

    // 9. Verify Custom Validator
    cy.get("[data-testid='section-validator'] input").type("invalid-email{enter}");
    cy.get("@onValidateErrorSpy").should("have.been.calledWith", "invalid-email", "Invalid email");
    cy.get("[data-testid='section-validator'] [role='list']").contains("invalid-email").should("not.exist");
    cy.get("[data-testid='section-validator'] input").clear().type("user@example.com{enter}");
    cy.get("[data-testid='section-validator'] [role='list']").contains("user@example.com").should("be.visible");

    // 10. Verify Max Tag Count Collapsing
    cy.get("[data-testid='section-max-tag-count']").contains("Item1").should("be.visible");
    cy.get("[data-testid='section-max-tag-count']").contains("Item2").should("be.visible");
    cy.get("[data-testid='section-max-tag-count']").contains("Item3").should("not.exist");
    cy.get("[data-testid='section-max-tag-count']").contains("+2").should("be.visible");

    // 11. Verify Blur & Paste Events
    cy.get("[data-testid='blur-input'] input").type("BlurItem");
    cy.get("[data-testid='blur-input'] input").blur();
    cy.get("[data-testid='blur-input']").contains("BlurItem").should("be.visible");
    cy.get("@onBlurChangeSpy").should("have.been.calledWith", ["BlurItem"]);

    cy.get("[data-testid='paste-input'] input").trigger("paste", {
      clipboardData: {
        getData: () => "alpha, beta, gamma",
      },
    });
    cy.get("[data-testid='paste-input']").contains("alpha").should("be.visible");
    cy.get("[data-testid='paste-input']").contains("beta").should("be.visible");
    cy.get("[data-testid='paste-input']").contains("gamma").should("be.visible");
    cy.get("@onPasteChangeSpy").should("have.been.calledWith", ["alpha", "beta", "gamma"]);

    // 12. Verify Custom renderTag
    cy.get("[data-testid='custom-tag-node']").should("contain.text", "CustomItem");
    cy.get("[data-testid='custom-remove-btn']").click();
    cy.get("[data-testid='custom-tag-node']").should("not.exist");

    // 13. Verify Labels & Error States
    cy.get("[data-testid='floating-label']").contains("Floating Label").should("be.visible");
    cy.get("[data-testid='top-label']").contains("Top Label").should("be.visible");
    cy.get("[data-testid='left-label']").contains("Left Label").should("be.visible");
    cy.get("[data-testid='error-state']").contains("Trường này bắt buộc nhập").should("be.visible");

    // 14. Verify Disabled & ReadOnly States
    cy.get("[data-testid='disabled-input'] input").should("be.disabled");
    cy.get("[data-testid='disabled-input'] button[aria-label^='Remove tag']").should("not.exist");
    cy.get("[data-testid='disabled-input'] button[aria-label='Add tag']").should("not.exist");
    cy.get("[data-testid='readonly-input'] input").should("have.attr", "readonly");
    cy.get("[data-testid='readonly-input'] button[aria-label^='Remove tag']").should("not.exist");

    // 15. Verify Sizes
    sizes.forEach((s) => {
      cy.get(`[data-testid='size-${s}']`).contains(`Size-${s}`).should("be.visible");
    });

    // 16. Verify Radii
    radii.forEach((r) => {
      cy.get(`[data-testid='radius-${r}']`).contains(`Radius-${r}`).should("be.visible");
    });

    // 17. Verify Comprehensive Variant & Color Classes
    // Outline border classes
    cy.get("[data-testid='outline-primary'] .group\\/input").should("have.class", "border-primary-400");
    cy.get("[data-testid='outline-secondary'] .group\\/input").should("have.class", "border-secondary-400");
    cy.get("[data-testid='outline-error'] .group\\/input").should("have.class", "border-error-500");
    cy.get("[data-testid='outline-success'] .group\\/input").should("have.class", "border-success-400");
    cy.get("[data-testid='outline-warning'] .group\\/input").should("have.class", "border-warning-400");
    cy.get("[data-testid='outline-info'] .group\\/input").should("have.class", "border-info-400");
    cy.get("[data-testid='outline-neutral'] .group\\/input").should("have.class", "border-neutral-300");

    // Filled background & border classes
    cy.get("[data-testid='filled-primary'] .group\\/input")
      .should("have.class", "bg-primary-50/60")
      .and("have.class", "border-primary-200");
    cy.get("[data-testid='filled-secondary'] .group\\/input")
      .should("have.class", "bg-secondary-50/60")
      .and("have.class", "border-secondary-200");
    cy.get("[data-testid='filled-error'] .group\\/input")
      .should("have.class", "bg-error-50/60")
      .and("have.class", "border-error-500");
    cy.get("[data-testid='filled-success'] .group\\/input")
      .should("have.class", "bg-success-50/60")
      .and("have.class", "border-success-200");
    cy.get("[data-testid='filled-warning'] .group\\/input")
      .should("have.class", "bg-warning-50/60")
      .and("have.class", "border-warning-200");
    cy.get("[data-testid='filled-info'] .group\\/input")
      .should("have.class", "bg-info-50/60")
      .and("have.class", "border-info-200");
    cy.get("[data-testid='filled-neutral'] .group\\/input")
      .should("have.class", "bg-neutral-50/60")
      .and("have.class", "border-neutral-200");

    // Ghost transparent classes
    cy.get("[data-testid='ghost-primary'] .group\\/input")
      .should("have.class", "bg-transparent")
      .and("have.class", "border-transparent");
    cy.get("[data-testid='ghost-error'] .group\\/input")
      .should("have.class", "bg-transparent")
      .and("have.class", "border-error-500");

    // Custom Tag overrides
    cy.get("[data-testid='custom-tag-variant-filled'] span.border-transparent")
      .should("contain.text", "FilledWarningTag")
      .and("have.class", "bg-warning-500");
    cy.get("[data-testid='custom-tag-variant-outline'] span")
      .should("contain.text", "OutlineErrorTag")
      .and("have.class", "border-error-400");

    // 18. Verify Accessibility (A11y) attributes
    cy.get("[data-testid='section-a11y'] [role='group']").should("have.attr", "aria-labelledby").and("not.be.empty");

    cy.get("[data-testid='section-a11y'] button[aria-label='Remove tag JavaScript']").should("exist");
    cy.get("[data-testid='section-a11y'] button[aria-label='Remove tag React']").should("exist");
    cy.get("[data-testid='section-a11y'] button[aria-label='Add tag']").should("exist");
    cy.get("[data-testid='section-a11y'] button[aria-label='Clear all tags']").should("exist");

    cy.get("[data-testid='section-a11y'] input").should("have.attr", "aria-required", "true");
    cy.get("[data-testid='section-a11y'] input").should("have.attr", "aria-autocomplete", "none");
    cy.get("[data-testid='section-a11y'] input")
      .should("have.attr", "aria-describedby")
      .and("not.be.empty");

    // 19. Verify Config Prop & Form Hidden Inputs
    cy.get("[data-testid='section-config-form'] input[type='hidden'][name='skills[]']").should("have.length", 2);
    cy.get("[data-testid='section-config-form'] input[type='hidden'][name='skills[]']").eq(0).should("have.value", "TypeScript");
    cy.get("[data-testid='section-config-form'] input[type='hidden'][name='skills[]']").eq(1).should("have.value", "Tailwind");
    cy.get("[data-testid='section-config-form'] div[role='status']").should("exist"); // spinner
    cy.get("[data-testid='section-config-form'] .group\\/field").should("have.class", "w-full");
  });
});
