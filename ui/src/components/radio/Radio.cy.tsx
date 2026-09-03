import React, { useState } from "react";
import { RadioSize, RadioVariant, RadioColor } from "./types";
import { Radio, RadioGroup } from "./index";

describe("<Radio /> & <RadioGroup /> Component Tests", () => {
  /* ========================================================================
     1. Unit Tests - 5 Sizes
     ======================================================================== */
  describe("Sizes (xs, sm, md, lg, xl)", () => {
    const sizes: RadioSize[] = ["xs", "sm", "md", "lg", "xl"];

    sizes.forEach((size) => {
      it(`renders size="${size}" with correct box and label`, () => {
        cy.mount(<Radio size={size} label={`Radio ${size}`} defaultChecked />);
        cy.get("label").should("be.visible").and("contain.text", `Radio ${size}`);
        cy.get('input[type="radio"]').should("be.checked");
      });
    });
  });

  /* ========================================================================
     2. Unit Tests - Variants & Colors
     ======================================================================== */
  describe("Variants & Colors", () => {
    const variants: RadioVariant[] = ["filled", "outline", "soft", "other"];
    const colors: RadioColor[] = ["primary", "secondary", "error", "success", "warning", "info", "neutral"];

    variants.forEach((variant) => {
      it(`renders variant="${variant}" checked correctly`, () => {
        cy.mount(
          <Radio
            variant={variant}
            defaultChecked
            label={`Variant ${variant}`}
            boxClassName={variant === "other" ? "bg-purple-600 text-white" : ""}
          />
        );
        cy.get('input[type="radio"]').should("be.checked");
        cy.get("label").should("contain.text", `Variant ${variant}`);
      });
    });

    colors.forEach((color) => {
      it(`renders color="${color}" correctly`, () => {
        cy.mount(<Radio color={color} defaultChecked label={`Color ${color}`} />);
        cy.get('input[type="radio"]').should("be.checked");
      });
    });
  });

  /* ========================================================================
     3. Unit Tests - States
     ======================================================================== */
  describe("States & Feedback", () => {
    it("handles disabled state and prevents click toggle", () => {
      const onChangeSpy = cy.spy().as("onChangeSpy");
      cy.mount(<Radio disabled label="Disabled Radio" onChange={onChangeSpy} />);
      cy.get('input[type="radio"]').should("be.disabled");
    });

    it("renders isLoading state with spinner", () => {
      cy.mount(<Radio config={{ isLoading: true }} label="Loading Radio" />);
      cy.get('input[type="radio"]').should("be.disabled");
      cy.get('input[type="radio"]').should("have.attr", "aria-busy", "true");
      cy.get("svg").should("exist");
    });

    it("renders isInvalid state with error border", () => {
      cy.mount(<Radio config={{ isInvalid: true }} label="Invalid Radio" />);
      cy.get("span[aria-hidden='true']").should("have.class", "border-error-500");
    });

    it("renders isRequired with asterisk and aria-required", () => {
      cy.mount(<Radio config={{ isRequired: true }} label="Required Radio" />);
      cy.contains("*").should("be.visible");
      cy.get('input[type="radio"]').should("have.attr", "aria-required", "true");
    });

    it("renders readOnly state and prevents change", () => {
      const onChangeSpy = cy.spy().as("onChangeSpy");
      cy.mount(<Radio readOnly defaultChecked label="ReadOnly Radio" onChange={onChangeSpy} />);
      cy.get('input[type="radio"]').should("have.attr", "readonly");
      cy.get("label").click();
      cy.get("@onChangeSpy").should("not.have.been.called");
    });
  });

  /* ========================================================================
     4. Unit Tests - helperText & errorMessage
     ======================================================================== */
  describe("helperText & errorMessage", () => {
    it("renders helperText with aria-describedby", () => {
      cy.mount(<Radio helperText="Chon mot phuong an" label="Radio" />);
      cy.contains("Chon mot phuong an").should("be.visible");
      cy.get('input[type="radio"]').should("have.attr", "aria-describedby");
    });

    it("renders errorMessage and applies error styles", () => {
      cy.mount(<Radio errorMessage="Vui long chon mot lua chon" label="Radio" />);
      cy.contains("Vui long chon mot lua chon").should("be.visible");
      cy.get("span[aria-hidden='true']").should("have.class", "border-error-500");
    });

    it("handles live errorMessage animation lifecycle", () => {
      const LiveRadio = () => {
        const [checked, setChecked] = useState(false);
        return (
          <Radio
            label="Dong y dieu khoan"
            checked={checked}
            onChange={() => setChecked(!checked)}
            errorMessage={!checked ? "Ban phai dong y de tiep tuc" : undefined}
            helperText={checked ? "Da xac nhan" : undefined}
          />
        );
      };

      cy.mount(<LiveRadio />);
      cy.contains("Ban phai dong y de tiep tuc").should("be.visible");
      cy.get("span[aria-hidden='true']").should("have.class", "border-error-500");

      cy.get("label").click();
      cy.contains("Da xac nhan").should("be.visible");
      cy.get("span[aria-hidden='true']").should("not.have.class", "border-error-500");
    });
  });

  /* ========================================================================
     5. Unit Tests - Label Placement
     ======================================================================== */
  describe("Label Placement", () => {
    it("renders labelPlacement='right' (default)", () => {
      cy.mount(<Radio label="Label Right" />);
      cy.get("label").should("have.class", "flex-row");
    });

    it("renders labelPlacement='left'", () => {
      cy.mount(<Radio label="Label Left" labelPlacement="left" />);
      cy.get("label").should("have.class", "flex-row-reverse");
    });
  });

  /* ========================================================================
     6. Unit Tests - Standalone Controlled & Uncontrolled
     ======================================================================== */
  describe("Standalone Controlled & Uncontrolled", () => {
    it("works as uncontrolled standalone with defaultChecked", () => {
      cy.mount(<Radio defaultChecked label="Uncontrolled Radio" />);
      cy.get('input[type="radio"]').should("be.checked");
    });

    it("works as controlled standalone with checked & onChange", () => {
      const ControlledRadio = () => {
        const [checked, setChecked] = useState(false);
        return (
          <div>
            <Radio checked={checked} onChange={() => setChecked(!checked)} label="Controlled Radio" />
            <span data-testid="state">{checked ? "checked" : "unchecked"}</span>
          </div>
        );
      };

      cy.mount(<ControlledRadio />);
      cy.get("[data-testid='state']").should("have.text", "unchecked");
      cy.get("label").click();
      cy.get("[data-testid='state']").should("have.text", "checked");
    });
  });

  /* ========================================================================
     7. Unit Tests - RadioGroup Basic Behavior
     ======================================================================== */
  describe("RadioGroup - Basic Behavior", () => {
    it("renders group with vertical orientation (default)", () => {
      cy.mount(
        <RadioGroup
          label="Phuong thuc thanh toan"
          options={[
            { value: "cash", label: "Tien mat" },
            { value: "card", label: "The tin dung" },
            { value: "transfer", label: "Chuyen khoan" },
          ]}
        />
      );
      cy.get('[role="radiogroup"]').should("exist");
      cy.contains("Phuong thuc thanh toan").should("be.visible");
    });

    it("only one radio can be selected in uncontrolled group", () => {
      cy.mount(
        <RadioGroup
          label="Kieu giao hang"
          options={[
            { value: "standard", label: "Giao hang tieu chuan" },
            { value: "express", label: "Giao hang nhanh" },
            { value: "same_day", label: "Giao hang trong ngay" },
          ]}
        />
      );

      cy.contains("Giao hang nhanh").click();
      cy.get('input[value="express"]').should("be.checked");
      cy.get('input[value="standard"]').should("not.be.checked");

      cy.contains("Giao hang trong ngay").click();
      cy.get('input[value="same_day"]').should("be.checked");
      cy.get('input[value="express"]').should("not.be.checked");
    });

    it("supports controlled mode with value and onChange", () => {
      const ControlledWrapper = () => {
        const [selected, setSelected] = useState<string | null>("small");
        return (
          <div>
            <div data-testid="selected-output">{selected}</div>
            <RadioGroup
              label="Chon size"
              value={selected}
              onChange={setSelected}
              options={[
                { value: "small", label: "Small" },
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" },
              ]}
            />
          </div>
        );
      };

      cy.mount(<ControlledWrapper />);
      cy.get('[data-testid="selected-output"]').should("have.text", "small");
      cy.get('input[value="small"]').should("be.checked");

      cy.contains("Medium").click();
      cy.get('[data-testid="selected-output"]').should("have.text", "medium");
      cy.get('input[value="medium"]').should("be.checked");
      cy.get('input[value="small"]').should("not.be.checked");
    });

    it("inherits size, color, and disabled to child radios", () => {
      cy.mount(
        <RadioGroup
          size="lg"
          color="success"
          disabled
          label="Inherited Group"
          options={[
            { value: "item1", label: "Muc 1" },
            { value: "item2", label: "Muc 2" },
          ]}
        />
      );

      cy.get('input[value="item1"]').should("be.disabled");
      cy.get('input[value="item2"]').should("be.disabled");
    });

    it("renders horizontal orientation", () => {
      cy.mount(
        <RadioGroup
          orientation="horizontal"
          label="Ngang"
          options={[
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
          ]}
        />
      );
      cy.get(".flex-row.flex-wrap").should("exist");
    });

    it("displays group errorMessage and sets aria-invalid on radiogroup", () => {
      cy.mount(
        <RadioGroup
          label="Bat buoc chon"
          errorMessage="Vui long chon mot phuong an"
          options={[{ value: "1", label: "Muc 1" }]}
        />
      );
      cy.get('[role="alert"]').should("contain.text", "Vui long chon mot phuong an");
      cy.get('[role="radiogroup"]').should("have.attr", "aria-invalid", "true");
    });

    it("all radios in group share same name attribute", () => {
      cy.mount(
        <RadioGroup
          label="Nhom cung ten"
          options={[
            { value: "a", label: "A" },
            { value: "b", label: "B" },
            { value: "c", label: "C" },
          ]}
        />
      );

      cy.get('input[type="radio"]').then(($inputs) => {
        const names = $inputs.toArray().map((el) => el.getAttribute("name"));
        const uniqueNames = new Set(names);
        expect(uniqueNames.size).to.equal(1);
      });
    });
  });

  /* ========================================================================
     8. UI Showcase - Sizes
     ======================================================================== */
  describe("UI 1: Sizes Showcase (xs, sm, md, lg, xl)", () => {
    it("displays all sizes in a visual grid", () => {
      const sizes: RadioSize[] = ["xs", "sm", "md", "lg", "xl"];

      const SizesShowcase = () => {
        const [selected, setSelected] = useState<Record<string, string | null>>({});
        return (
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>RadioButton Sizes</h2>
            {sizes.map((size) => (
              <div key={size} style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <span style={{ width: "30px", fontSize: "12px", color: "#64748b", fontWeight: "bold" }}>{size}</span>
                <RadioGroup
                  size={size}
                  orientation="horizontal"
                  value={selected[size]}
                  onChange={(val) => setSelected((prev) => ({ ...prev, [size]: val }))}
                  options={[
                    { value: "a", label: "Option A" },
                    { value: "b", label: "Option B" },
                    { value: "c", label: "Option C" },
                  ]}
                />
              </div>
            ))}
          </div>
        );
      };

      cy.mount(<SizesShowcase />);
      cy.contains("RadioButton Sizes").should("be.visible");
      sizes.forEach((size) => cy.contains(size).should("be.visible"));
    });
  });

  /* ========================================================================
     9. UI Showcase - Variants & Colors
     ======================================================================== */
  describe("UI 2: Variants & Colors Showcase", () => {
    it("displays all variant x color combinations", () => {
      const variants: RadioVariant[] = ["filled", "outline", "soft"];
      const colors: RadioColor[] = ["primary", "secondary", "success", "error", "warning", "info", "neutral"];

      const VariantsShowcase = () => {
        const [selected, setSelected] = useState<Record<string, string | null>>({});
        return (
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>Variants & Colors</h2>
            {variants.map((variant) => (
              <div key={variant}>
                <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "8px", color: "#475569" }}>
                  {variant}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  {colors.map((color) => (
                    <Radio key={color} variant={variant} color={color} defaultChecked label={color} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      };

      cy.mount(<VariantsShowcase />);
      cy.contains("Variants & Colors").should("be.visible");
    });
  });

  /* ========================================================================
     10. UI Showcase - States
     ======================================================================== */
  describe("UI 3: States Showcase", () => {
    it("displays disabled, readOnly, isLoading, isInvalid, isRequired states", () => {
      const StatesShowcase = () => {
        const [val, setVal] = useState<string | null>("a");
        return (
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>Radio States</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
              <div>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>Normal</p>
                <Radio label="Normal Radio" defaultChecked />
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>Disabled</p>
                <Radio label="Disabled (checked)" defaultChecked disabled />
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>Disabled unchecked</p>
                <Radio label="Disabled (unchecked)" disabled />
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>isLoading</p>
                <Radio label="Loading..." config={{ isLoading: true }} />
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>isInvalid</p>
                <Radio label="Invalid Radio" config={{ isInvalid: true }} errorMessage="Vui long chon" />
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>isRequired</p>
                <Radio label="Required Radio" config={{ isRequired: true }} />
              </div>
            </div>
            <div>
              <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>Controlled Selection</p>
              <RadioGroup
                orientation="horizontal"
                value={val}
                onChange={setVal}
                label="Chon lua chon"
                options={[
                  { value: "a", label: "Option A" },
                  { value: "b", label: "Option B" },
                  { value: "c", label: "Option C" },
                ]}
              />
              <p style={{ marginTop: "8px", fontSize: "12px", color: "#3b82f6" }}>
                Selected: <strong>{val}</strong>
              </p>
            </div>
          </div>
        );
      };

      cy.mount(<StatesShowcase />);
      cy.contains("Radio States").should("be.visible");
    });
  });
});
