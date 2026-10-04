import React, { useState } from "react";
import { CheckboxSize, CheckboxVariant, CheckboxColor, CheckboxRadius } from "./types";
import { Checkbox, CheckboxGroup } from "./index";

describe("<Checkbox /> & <CheckboxGroup /> Component Tests", () => {
  /* ========================================================================
     1. Unit Tests - 5 Sizes
     ======================================================================== */
  describe("Sizes (xs, sm, md, lg, xl)", () => {
    const sizes: CheckboxSize[] = ["xs", "sm", "md", "lg", "xl"];

    sizes.forEach((size) => {
      it(`renders size="${size}" with correct box and label`, () => {
        cy.mount(<Checkbox size={size} label={`Checkbox ${size}`} defaultChecked />);
        cy.get("label").should("be.visible").and("contain.text", `Checkbox ${size}`);
        cy.get('input[type="checkbox"]').should("be.checked");
        cy.get("span[aria-hidden='true']").should("exist");
      });
    });
  });

  /* ========================================================================
     2. Unit Tests - Variants & Colors
     ======================================================================== */
  describe("Variants & Colors", () => {
    const variants: CheckboxVariant[] = ["filled", "outline", "soft", "other"];
    const colors: CheckboxColor[] = ["primary", "secondary", "error", "success", "warning", "info", "neutral"];

    variants.forEach((variant) => {
      it(`renders variant="${variant}" checked correctly`, () => {
        cy.mount(
          <Checkbox
            variant={variant}
            defaultChecked
            label={`Variant ${variant}`}
            boxClassName={variant === "other" ? "bg-purple-600 text-white" : ""}
          />
        );
        cy.get('input[type="checkbox"]').should("be.checked");
        cy.get("label").should("contain.text", `Variant ${variant}`);
      });
    });

    colors.forEach((color) => {
      it(`renders color="${color}" correctly`, () => {
        cy.mount(<Checkbox color={color} defaultChecked label={`Color ${color}`} />);
        cy.get('input[type="checkbox"]').should("be.checked");
      });
    });
  });

  /* ========================================================================
     3. Unit Tests - States (Indeterminate, Disabled, Invalid, Required)
     ======================================================================== */
  describe("States & Feedback", () => {
    it("renders indeterminate state correctly with aria-checked='mixed'", () => {
      cy.mount(<Checkbox config={{ indeterminate: true }} label="Indeterminate Select All" />);
      cy.get('input[type="checkbox"]')
        .should("have.attr", "aria-checked", "mixed");
      // Minus icon is rendered
      cy.get("svg").should("exist");
    });

    it("handles disabled state and prevents click toggle", () => {
      const onChangeSpy = cy.spy().as("onChangeSpy");
      cy.mount(<Checkbox disabled label="Disabled Checkbox" onChange={onChangeSpy} />);
      cy.get('input[type="checkbox"]').should("be.disabled");
      cy.get("label").click({ force: true });
      cy.get("@onChangeSpy").should("not.have.been.called");
      cy.get('input[type="checkbox"]').should("not.be.checked");
    });

    it("handles isReadOnly state and prevents click toggle", () => {
      const onChangeSpy = cy.spy().as("onChangeSpy");
      cy.mount(<Checkbox readOnly defaultChecked label="ReadOnly Checkbox" onChange={onChangeSpy} />);
      cy.get("label").click();
      cy.get("@onChangeSpy").should("not.have.been.called");
      cy.get('input[type="checkbox"]').should("be.checked");
    });

    it("handles isLoading state, displays spinner when showSpinner=true, and disables interaction", () => {
      const onChangeSpy = cy.spy().as("onChangeSpy");
      cy.mount(<Checkbox config={{ isLoading: true, showSpinner: true }} label="Loading Checkbox" onChange={onChangeSpy} />);
      cy.get('input[type="checkbox"]').should("be.disabled").and("have.attr", "aria-busy", "true");
      cy.get("svg").should("exist");
      cy.get("label").click({ force: true });
      cy.get("@onChangeSpy").should("not.have.been.called");
    });

    it("handles isLoading with default showSpinner=false", () => {
      cy.mount(<Checkbox config={{ isLoading: true }} label="Loading without spinner" />);
      cy.get('input[type="checkbox"]').should("be.disabled").and("have.attr", "aria-busy", "true");
      cy.get("svg").should("not.exist");
    });

    it("displays error message and sets aria-invalid", () => {
      cy.mount(<Checkbox errorMessage="Bạn phải đồng ý với điều khoản" label="Điều khoản dịch vụ" />);
      cy.get('input[type="checkbox"]').should("have.attr", "aria-invalid", "true");
      cy.get('[role="alert"]').should("contain.text", "Bạn phải đồng ý với điều khoản");
    });

    it("displays helperText", () => {
      cy.mount(<Checkbox label="Nhận thông báo" helperText="Có thể hủy đăng ký bất kỳ lúc nào" />);
      cy.get("span").should("contain.text", "Nhận thông báo");
      cy.get('[role="status"]').should("contain.text", "Có thể hủy đăng ký bất kỳ lúc nào");
    });

    it("displays required asterisk when isRequired is true", () => {
      cy.mount(<Checkbox config={{ isRequired: true }} label="Bắt buộc chọn" />);
      cy.get("span").should("contain.text", "*");
    });
  });

  /* ========================================================================
     4. Unit Tests - Interactions (Click & Keyboard)
     ======================================================================== */
  describe("Interactive Toggles", () => {
    it("toggles checked state upon clicking", () => {
      const onChangeSpy = cy.spy().as("onChangeSpy");
      cy.mount(<Checkbox label="Click to Toggle" onChange={onChangeSpy} />);

      cy.get('input[type="checkbox"]').should("not.be.checked");
      cy.get("label").click();
      cy.get('input[type="checkbox"]').should("be.checked");
      cy.get("@onChangeSpy").should("have.been.calledOnce");

      cy.get("label").click();
      cy.get('input[type="checkbox"]').should("not.be.checked");
      cy.get("@onChangeSpy").should("have.been.calledTwice");
    });

    it("toggles checked state via Space key when focused", () => {
      cy.mount(<Checkbox label="Keyboard Toggle" />);
      cy.get('input[type="checkbox"]').focus().type(" ");
      cy.get('input[type="checkbox"]').should("be.checked");
      cy.get('input[type="checkbox"]').type(" ");
      cy.get('input[type="checkbox"]').should("not.be.checked");
    });
  });

  /* ========================================================================
     5. Unit Tests - Label Placement & Custom Radius
     ======================================================================== */
  describe("Label Placement & Radius", () => {
    it("supports labelPlacement='left'", () => {
      cy.mount(<Checkbox labelPlacement="left" label="Label Bên Trái" />);
      cy.get("label").should("have.class", "flex-row-reverse");
      cy.get("label").should("contain.text", "Label Bên Trái");
    });

    const radiuses: CheckboxRadius[] = ["none", "sm", "md", "lg", "xl", "full"];
    radiuses.forEach((radius) => {
      it(`renders radius="${radius}" correctly`, () => {
        cy.mount(<Checkbox radius={radius} defaultChecked label={`Radius ${radius}`} />);
        cy.get("label").should("exist");
      });
    });
  });

  /* ========================================================================
     6. Unit Tests - CheckboxGroup Component
     ======================================================================== */
  describe("<CheckboxGroup /> Tests", () => {
    it("manages uncontrolled selection with defaultValue", () => {
      cy.mount(
        <CheckboxGroup
          label="Chọn quyền hạn"
          defaultValue={["read", "write"]}
          options={[
            { value: "read", label: "Read" },
            { value: "write", label: "Write" },
            { value: "admin", label: "Admin" },
          ]}
        />
      );

      cy.get('input[value="read"]').should("be.checked");
      cy.get('input[value="write"]').should("be.checked");
      cy.get('input[value="admin"]').should("not.be.checked");

      cy.contains("Admin").click();
      cy.get('input[value="admin"]').should("be.checked");
    });

    it("supports controlled mode with value and onChange", () => {
      const ControlledWrapper = () => {
        const [selected, setSelected] = useState<string[]>(["apple"]);
        return (
          <div>
            <div data-testid="selected-output">{selected.join(",")}</div>
            <CheckboxGroup
              label="Chọn trái cây"
              value={selected}
              onChange={setSelected}
              options={[
                { value: "apple", label: "Táo" },
                { value: "banana", label: "Chuối" },
                { value: "orange", label: "Cam" },
              ]}
            />
          </div>
        );
      };

      cy.mount(<ControlledWrapper />);
      cy.get('[data-testid="selected-output"]').should("have.text", "apple");

      cy.contains("Chuối").click();
      cy.get('[data-testid="selected-output"]').should("have.text", "apple,banana");

      cy.contains("Táo").click();
      cy.get('[data-testid="selected-output"]').should("have.text", "banana");
    });

    it("inherits size, color, and disabled to child checkboxes", () => {
      cy.mount(
        <CheckboxGroup
          size="lg"
          color="success"
          disabled
          label="Inherited Group"
          options={[
            { value: "item1", label: "Mục 1" },
            { value: "item2", label: "Mục 2" },
          ]}
        />
      );

      cy.get('input[value="item1"]').should("be.disabled");
      cy.get('input[value="item2"]').should("be.disabled");
    });

    it("renders horizontal orientation", () => {
      cy.mount(
        <CheckboxGroup
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

    it("displays group errorMessage and sets aria-invalid", () => {
      cy.mount(
        <CheckboxGroup
          label="Bắt buộc chọn"
          errorMessage="Vui lòng chọn ít nhất một mục"
          options={[
            { value: "1", label: "Mục 1" },
          ]}
        />
      );
      cy.get('[role="alert"]').should("contain.text", "Vui lòng chọn ít nhất một mục");
      cy.get('input[type="checkbox"]').should("have.attr", "aria-invalid", "true");
    });
  });

  /* ========================================================================
     7. Visual Design System Showcase
     ======================================================================== */
  describe("🎨 Checkbox & CheckboxGroup Design System Showcase", () => {
    // 1. Showcase Sizes
    it("UI 1: 5 Sizes (xs, sm, md, lg, xl)", () => {
      const sizes: CheckboxSize[] = ["xs", "sm", "md", "lg", "xl"];
      const SizeShowcase = () => {
        const [states, setStates] = useState<Record<string, boolean>>({
          "xs-1": true,
          "sm-1": true,
          "md-1": true,
          "lg-1": true,
          "xl-1": true,
          "xs-2": false,
          "sm-2": false,
          "md-2": false,
          "lg-2": false,
          "xl-2": false,
          "xs-3": true,
          "sm-3": true,
          "md-3": true,
          "lg-3": true,
          "xl-3": true,
        });

        const toggle = (key: string, checked: boolean) => {
          setStates((prev) => ({ ...prev, [key]: checked }));
        };

        return (
          <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-6 font-sans">
            <h1 className="text-xl font-bold text-neutral-900">1. Kích thước (5 Sizes)</h1>
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-6">
                {sizes.map((s) => (
                  <Checkbox
                    key={`${s}-1`}
                    size={s}
                    label={`Size ${s.toUpperCase()}`}
                    checked={states[`${s}-1`]}
                    onChange={(e) => toggle(`${s}-1`, e.target.checked)}
                  />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-6">
                {sizes.map((s) => (
                  <Checkbox
                    key={`${s}-2`}
                    size={s}
                    label={`Size ${s.toUpperCase()} (un)`}
                    checked={states[`${s}-2`]}
                    onChange={(e) => toggle(`${s}-2`, e.target.checked)}
                  />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-6">
                {sizes.map((s) => (
                  <Checkbox
                    key={`${s}-3`}
                    size={s}
                    config={{ indeterminate: states[`${s}-3`] }}
                    checked={states[`${s}-3`]}
                    label={`Size ${s.toUpperCase()} (mixed)`}
                    onChange={(e) => toggle(`${s}-3`, e.target.checked)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      };

      cy.mount(<SizeShowcase />);
      cy.get("h1").should("be.visible");
      cy.get('input[type="checkbox"]').should("have.length", 15);
    });

    // 2. Showcase 7 Colors
    it("UI 2: 7 Theme Colors (Primary, Secondary, Success, Error, Warning, Info, Neutral)", () => {
      const colors: CheckboxColor[] = ["primary", "secondary", "success", "error", "warning", "info", "neutral"];

      const ColorShowcase = () => {
        const [states, setStates] = useState<Record<string, boolean>>({
          "primary-1": true,
          "secondary-1": true,
          "success-1": true,
          "error-1": true,
          "warning-1": true,
          "info-1": true,
          "neutral-1": true,
          "primary-2": true,
          "secondary-2": true,
          "success-2": true,
          "error-2": true,
          "warning-2": true,
          "info-2": true,
          "neutral-2": true,
          "primary-3": false,
          "secondary-3": false,
          "success-3": false,
          "error-3": false,
          "warning-3": false,
          "info-3": false,
          "neutral-3": false,
        });

        const toggle = (key: string, checked: boolean) => {
          setStates((prev) => ({ ...prev, [key]: checked }));
        };

        return (
          <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-6 font-sans">
            <h1 className="text-xl font-bold text-neutral-900">2. Bảng màu chủ đề (7 Colors)</h1>
            <div className="p-6 bg-white rounded-xl shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6">
              {colors.map((c) => (
                <div key={c} className="flex flex-col gap-2 p-3 bg-neutral-50 rounded-lg">
                  <span className="text-xs font-bold text-neutral-500 uppercase">{c}</span>
                  <Checkbox
                    color={c}
                    checked={states[`${c}-1`]}
                    onChange={(e) => toggle(`${c}-1`, e.target.checked)}
                    label="Đã chọn"
                  />
                  <Checkbox
                    color={c}
                    config={{ indeterminate: states[`${c}-2`] }}
                    checked={states[`${c}-2`]}
                    onChange={(e) => toggle(`${c}-2`, e.target.checked)}
                    label="Trung gian"
                  />
                  <Checkbox
                    color={c}
                    checked={states[`${c}-3`]}
                    onChange={(e) => toggle(`${c}-3`, e.target.checked)}
                    label="Chưa chọn"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      };

      cy.mount(<ColorShowcase />);
      cy.get("h1").should("be.visible");
      cy.get('input[type="checkbox"]').should("have.length", 21);
    });

    // 3. Showcase Variants
    it("UI 3: 4 Variants (Filled, Outline, Soft, Other)", () => {
      const variants: CheckboxVariant[] = ["filled", "outline", "soft", "other"];

      const VariantShowcase = () => {
        const [states, setStates] = useState<Record<string, boolean>>({
          "filled-primary": true,
          "filled-success": true,
          "filled-error": true,
          "filled-warning": true,
          "outline-primary": true,
          "outline-success": true,
          "outline-error": true,
          "outline-warning": true,
          "soft-primary": true,
          "soft-success": true,
          "soft-error": true,
          "soft-warning": true,
          "other-primary": true,
          "other-success": true,
          "other-error": true,
          "other-warning": true,
        });

        const toggle = (key: string, checked: boolean) => {
          setStates((prev) => ({ ...prev, [key]: checked }));
        };

        return (
          <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-6 font-sans">
            <h1 className="text-xl font-bold text-neutral-900">3. Biến thể giao diện (Variants)</h1>
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-6">
              {variants.map((v) => (
                <div key={v} className="flex flex-col gap-2">
                  <h3 className="text-sm font-bold text-neutral-700 capitalize">Variant: {v}</h3>
                  <div className="flex flex-wrap items-center gap-6">
                    <Checkbox
                      variant={v}
                      color="primary"
                      checked={states[`${v}-primary`]}
                      onChange={(e) => toggle(`${v}-primary`, e.target.checked)}
                      label="Primary"
                      boxClassName={
                        v === "other" ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0" : ""
                      }
                    />
                    <Checkbox
                      variant={v}
                      color="success"
                      checked={states[`${v}-success`]}
                      onChange={(e) => toggle(`${v}-success`, e.target.checked)}
                      label="Success"
                      boxClassName={v === "other" ? "bg-emerald-600 text-white border-0 shadow-md" : ""}
                    />
                    <Checkbox
                      variant={v}
                      color="error"
                      checked={states[`${v}-error`]}
                      onChange={(e) => toggle(`${v}-error`, e.target.checked)}
                      label="Error"
                      boxClassName={v === "other" ? "bg-rose-500 text-white border-0" : ""}
                    />
                    <Checkbox
                      variant={v}
                      color="warning"
                      checked={states[`${v}-warning`]}
                      onChange={(e) => toggle(`${v}-warning`, e.target.checked)}
                      label="Warning"
                      boxClassName={v === "other" ? "bg-amber-400 text-neutral-950 border-0" : ""}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      };

      cy.mount(<VariantShowcase />);
      cy.get("h1").should("be.visible");
      cy.get('input[type="checkbox"]').should("have.length", 16);
    });

    // 4. Showcase All Interactive States
    it("UI 4: All Interactive States (Checked, Indeterminate, Loading, Disabled, ReadOnly, Invalid)", () => {
      const StatesShowcase = () => {
        const [c1, setC1] = useState(true);
        const [c2, setC2] = useState(false);
        const [c3, setC3] = useState(true);
        const [c4, setC4] = useState(false);
        const [c5, setC5] = useState(true);
        const [c6, setC6] = useState(false);
        const [c7, setC7] = useState(true);
        const [c8, setC8] = useState(false);

        return (
          <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-6 font-sans">
            <h1 className="text-xl font-bold text-neutral-900">4. Trạng thái tương tác & Feedback</h1>
            <div className="p-6 bg-white rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
              <Checkbox checked={c1} onChange={(e) => setC1(e.target.checked)} label="Checked (Mặc định tích chọn)" />
              <Checkbox checked={c2} onChange={(e) => setC2(e.target.checked)} label="Unchecked (Chưa chọn)" />
              <Checkbox
                checked={c3}
                config={{ indeterminate: true }}
                onChange={(e) => setC3(e.target.checked)}
                label="Indeterminate (Trạng thái trung gian)"
              />
              <Checkbox
                checked={c4}
                config={{ isLoading: true, showSpinner: true }}
                onChange={(e) => setC4(e.target.checked)}
                label="IsLoading (Đang đồng bộ / xử lý...)"
              />
              <Checkbox
                disabled
                checked={c5}
                onChange={(e) => setC5(e.target.checked)}
                label="Disabled Checked (Bị vô hiệu hóa)"
              />
              <Checkbox
                disabled
                checked={c6}
                onChange={(e) => setC6(e.target.checked)}
                label="Disabled Unchecked (Bị vô hiệu hóa)"
              />
              <Checkbox
                readOnly
                checked={c7}
                onChange={(e) => setC7(e.target.checked)}
                label="ReadOnly Checked (Chỉ đọc)"
              />
              <Checkbox
                checked={c8}
                onChange={(e) => setC8(e.target.checked)}
                config={{ isInvalid: !c8 }}
                errorMessage={!c8 ? "Trường này bắt buộc phải chọn để tiếp tục" : undefined}
                label="IsInvalid với Error Message"
              />
            </div>
          </div>
        );
      };

      cy.mount(<StatesShowcase />);
      cy.get("h1").should("be.visible");
      cy.get('input[type="checkbox"]').should("have.length", 8);
    });

    // 5. Showcase Radius Options
    it("UI 5: Bo góc Radius (none, sm, md, lg, xl, full)", () => {
      const radiuses: CheckboxRadius[] = ["none", "sm", "md", "lg", "xl", "full"];

      const RadiusShowcase = () => {
        const [states, setStates] = useState<Record<string, boolean>>({
          none: true,
          sm: true,
          md: true,
          lg: true,
          xl: true,
          full: true,
        });

        return (
          <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-6 font-sans">
            <h1 className="text-xl font-bold text-neutral-900">5. Tùy chỉnh bo góc qua prop radius</h1>
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-wrap items-center gap-6">
              {radiuses.map((r) => (
                <div key={r} className="flex flex-col items-center gap-2 p-3 bg-neutral-50 rounded-lg min-w-25">
                  <span className="text-xs font-bold text-neutral-500">{r}</span>
                  <Checkbox
                    radius={r}
                    size="lg"
                    checked={states[r]}
                    onChange={(e) => setStates((prev) => ({ ...prev, [r]: e.target.checked }))}
                    label={`radius="${r}"`}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      };

      cy.mount(<RadiusShowcase />);
      cy.get("h1").should("be.visible");
      cy.get('input[type="checkbox"]').should("have.length", 6);
    });

    // 6. Showcase Label Placement & Helper Text
    it("UI 6: Label Placements & HelperText", () => {
      const PlacementShowcase = () => {
        const [c1, setC1] = useState(true);
        const [c2, setC2] = useState(true);
        const [c3, setC3] = useState(false);

        return (
          <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-6 font-sans">
            <h1 className="text-xl font-bold text-neutral-900">6. Vị trí nhãn & Đoạn chú thích helperText</h1>
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-6 max-w-lg">
              <Checkbox
                checked={c1}
                onChange={(e) => setC1(e.target.checked)}
                label="Label bên phải (mặc định right)"
                helperText="Đoạn văn bản chú thích phụ bên dưới"
              />
              <Checkbox
                checked={c2}
                onChange={(e) => setC2(e.target.checked)}
                labelPlacement="left"
                label="Label bên trái (labelPlacement='left')"
                helperText="Căn đều 2 bên giữa nhãn và ô chọn"
              />
              <Checkbox
                checked={c3}
                onChange={(e) => setC3(e.target.checked)}
                config={{ isRequired: true }}
                label="Đồng ý điều khoản sử dụng"
                helperText="Bắt buộc tích chọn có gắn dấu * đỏ"
              />
            </div>
          </div>
        );
      };

      cy.mount(<PlacementShowcase />);
      cy.get("h1").should("be.visible");
      cy.get('input[type="checkbox"]').should("have.length", 3);
    });

    // 7. Showcase CheckboxGroup
    it("UI 7: CheckboxGroup (Horizontal & Vertical Layouts)", () => {
      const GroupShowcase = () => {
        const [hVals, setHVals] = useState<string[]>(["vue", "react"]);
        const [vVals, setVVals] = useState<string[]>(["push"]);

        return (
          <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-6 font-sans">
            <h1 className="text-xl font-bold text-neutral-900">7. CheckboxGroup Component</h1>
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-8">
              <CheckboxGroup
                label="Frontend Frameworks (Orientation: Horizontal)"
                helperText="Chọn các framework bạn đang sử dụng"
                orientation="horizontal"
                color="primary"
                value={hVals}
                onChange={setHVals}
                options={[
                  { value: "react", label: "⚛️ React" },
                  { value: "vue", label: "💚 Vue.js" },
                  { value: "svelte", label: "🔥 Svelte" },
                  { value: "angular", label: "🅰️ Angular" },
                ]}
              />

              <CheckboxGroup
                label="Kênh nhận thông báo (Orientation: Vertical)"
                helperText="Tùy chỉnh các phương thức nhận thông báo"
                orientation="vertical"
                color="success"
                value={vVals}
                onChange={setVVals}
                options={[
                  { value: "email", label: "✉️ Email hàng ngày" },
                  { value: "push", label: "🔔 Thông báo đẩy trên trình duyệt" },
                  { value: "sms", label: "📱 Tin nhắn SMS" },
                ]}
              />
            </div>
          </div>
        );
      };

      cy.mount(<GroupShowcase />);
      cy.get("h1").should("be.visible");
      cy.get('input[type="checkbox"]').should("have.length", 7);
    });

    // 8. Showcase Interactive Select All Flow
    it("UI 8: Interactive Select All & Indeterminate Flow", () => {
      const SelectAllShowcase = () => {
        const items = ["dashboard", "analytics", "users", "settings", "billing"];
        const [selected, setSelected] = useState<string[]>(["dashboard", "analytics"]);

        const isAll = selected.length === items.length;
        const isIndet = selected.length > 0 && selected.length < items.length;

        const toggleAll = () => {
          if (isAll) {
            setSelected([]);
          } else {
            setSelected(items);
          }
        };

        return (
          <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-6 font-sans">
            <h1 className="text-xl font-bold text-neutral-900">8. Luồng chọn tất cả (Select All Flow)</h1>
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-4 max-w-md">
              <Checkbox
                label="Chọn tất cả quyền truy cập"
                checked={isAll}
                config={{ indeterminate: isIndet }}
                onChange={toggleAll}
                className="font-bold border-b border-neutral-200 pb-3"
              />
              <div className="pl-6 flex flex-col gap-2.5 pt-1">
                {items.map((it) => (
                  <Checkbox
                    key={it}
                    label={`Quyền quản lý: ${it}`}
                    checked={selected.includes(it)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelected([...selected, it]);
                      } else {
                        setSelected(selected.filter((x) => x !== it));
                      }
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 p-3 bg-neutral-100 rounded text-xs text-neutral-700">
                Đã chọn:{" "}
                <strong>
                  {selected.length} / {items.length}
                </strong>{" "}
                mục
              </div>
            </div>
          </div>
        );
      };

      cy.mount(<SelectAllShowcase />);
      cy.get("h1").should("be.visible");
      cy.get('input[type="checkbox"]').should("have.length", 6);
    });

    // 9. Showcase All-in-One Comprehensive Board
    it("UI 9: Comprehensive Design System Dashboard (All-in-One)", () => {
      const Dashboard = () => {
        const [sizeStates, setSizeStates] = useState<Record<string, boolean>>({
          xs: true,
          sm: true,
          md: true,
          lg: true,
          xl: true,
        });

        const [colorStates, setColorStates] = useState<Record<string, boolean>>({
          primary: true,
          secondary: true,
          success: true,
          error: true,
          warning: true,
          info: true,
          neutral: true,
        });

        const [variantStates, setVariantStates] = useState<Record<string, boolean>>({
          filled: true,
          outline: true,
          soft: true,
          other: true,
        });

        const [fruits, setFruits] = useState<string[]>(["apple", "banana"]);
        const [agree, setAgree] = useState(true);
        const [indetState, setIndetState] = useState(true);
        const [loadingState, setLoadingState] = useState(true);

        return (
          <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-8 font-sans">
            <header>
              <h1 className="text-2xl font-bold text-neutral-900">☑️ Checkbox & CheckboxGroup Design System</h1>
              <p className="text-sm text-neutral-500">
                5 Sizes, 7 Colors, 4 Variants, 6 Radius, Loading, Validation & Groups
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Sizes */}
              <div className="p-5 bg-white rounded-xl shadow-sm flex flex-col gap-3">
                <h3 className="font-bold text-primary-700 text-sm">Sizes (xs, sm, md, lg, xl)</h3>
                {(["xs", "sm", "md", "lg", "xl"] as CheckboxSize[]).map((s) => (
                  <Checkbox
                    key={s}
                    size={s}
                    checked={sizeStates[s]}
                    onChange={(e) => setSizeStates((prev) => ({ ...prev, [s]: e.target.checked }))}
                    label={`Size ${s.toUpperCase()}`}
                  />
                ))}
              </div>

              {/* Card 2: Colors */}
              <div className="p-5 bg-white rounded-xl shadow-sm flex flex-col gap-3">
                <h3 className="font-bold text-primary-700 text-sm">Colors (7 Colors)</h3>
                {(["primary", "secondary", "success", "error", "warning", "info", "neutral"] as CheckboxColor[]).map(
                  (c) => (
                    <Checkbox
                      key={c}
                      color={c}
                      checked={colorStates[c]}
                      onChange={(e) => setColorStates((prev) => ({ ...prev, [c]: e.target.checked }))}
                      label={c.charAt(0).toUpperCase() + c.slice(1)}
                    />
                  )
                )}
              </div>

              {/* Card 3: Variants */}
              <div className="p-5 bg-white rounded-xl shadow-sm flex flex-col gap-3">
                <h3 className="font-bold text-primary-700 text-sm">Variants</h3>
                <Checkbox
                  variant="filled"
                  color="primary"
                  checked={variantStates.filled}
                  onChange={(e) => setVariantStates((prev) => ({ ...prev, filled: e.target.checked }))}
                  label="Filled Primary"
                />
                <Checkbox
                  variant="outline"
                  color="primary"
                  checked={variantStates.outline}
                  onChange={(e) => setVariantStates((prev) => ({ ...prev, outline: e.target.checked }))}
                  label="Outline Primary"
                />
                <Checkbox
                  variant="soft"
                  color="primary"
                  checked={variantStates.soft}
                  onChange={(e) => setVariantStates((prev) => ({ ...prev, soft: e.target.checked }))}
                  label="Soft Primary"
                />
                <Checkbox
                  variant="other"
                  checked={variantStates.other}
                  onChange={(e) => setVariantStates((prev) => ({ ...prev, other: e.target.checked }))}
                  label="Other Gradient"
                  boxClassName="bg-gradient-to-r from-purple-600 to-pink-500 text-white border-0"
                />
              </div>

              {/* Card 4: States */}
              <div className="p-5 bg-white rounded-xl shadow-sm flex flex-col gap-3">
                <h3 className="font-bold text-primary-700 text-sm">Special States</h3>
                <Checkbox
                  config={{ indeterminate: indetState }}
                  checked={indetState}
                  onChange={(e) => setIndetState(e.target.checked)}
                  label="Indeterminate"
                />
                <Checkbox
                  config={{ isLoading: loadingState, showSpinner: loadingState }}
                  checked={loadingState}
                  onChange={(e) => setLoadingState(e.target.checked)}
                  label="Loading State"
                />
                <Checkbox disabled checked label="Disabled Checked" />
                <Checkbox disabled checked={false} label="Disabled Unchecked" />
                <Checkbox
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  config={{ isRequired: true }}
                  label="Required Agreement"
                  errorMessage={!agree ? "Bắt buộc phải đồng ý" : undefined}
                />
              </div>

              {/* Card 5: CheckboxGroup */}
              <div className="p-5 bg-white rounded-xl shadow-sm flex flex-col gap-3 md:col-span-2">
                <h3 className="font-bold text-primary-700 text-sm">CheckboxGroup Live Selection</h3>
                <CheckboxGroup
                  label="Trái cây yêu thích"
                  orientation="horizontal"
                  color="primary"
                  value={fruits}
                  onChange={setFruits}
                  options={[
                    { value: "apple", label: "🍎 Táo" },
                    { value: "banana", label: "🍌 Chuối" },
                    { value: "orange", label: "🍊 Cam" },
                    { value: "grape", label: "🍇 Nho" },
                  ]}
                />
                <div className="p-2 bg-neutral-100 rounded text-xs text-neutral-600 mt-2">
                  Đã chọn: <strong>{fruits.join(", ") || "(Trống)"}</strong>
                </div>
              </div>
            </div>
          </div>
        );
      };

      cy.mount(<Dashboard />);
      cy.get("h1").should("be.visible");
      cy.get('input[type="checkbox"]').should("have.length.greaterThan", 15);
    });
  });
});
