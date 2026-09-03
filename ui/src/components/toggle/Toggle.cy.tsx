import React, { useState, createRef, useRef, Component } from "react";
import { ToggleSize, ToggleVariant, ToggleColor, ToggleRadius } from "./types";
import { Toggle } from "./index";

describe("<Toggle /> Component Tests", () => {
  /* ========================================================================
     1. Unit Tests - 5 Sizes
     ======================================================================== */
  describe("Sizes (xs, sm, md, lg, xl)", () => {
    const sizes: ToggleSize[] = ["xs", "sm", "md", "lg", "xl"];

    sizes.forEach((size) => {
      it(`renders size="${size}" with correct track, thumb, and label`, () => {
        cy.mount(<Toggle size={size} label={`Toggle ${size}`} checked />);
        cy.get("label").should("be.visible").and("contain.text", `Toggle ${size}`);
        cy.get('input[type="checkbox"]').should("be.checked");
        cy.get("span[aria-hidden='true']").should("exist");
      });
    });
  });

  /* ========================================================================
     2. Unit Tests - Variants & Colors
     ======================================================================== */
  describe("Variants & Colors", () => {
    const variants: ToggleVariant[] = ["filled", "outline", "soft", "other"];
    const colors: ToggleColor[] = ["primary", "secondary", "error", "success", "warning", "info", "neutral"];

    variants.forEach((variant) => {
      it(`renders variant="${variant}" checked correctly`, () => {
        cy.mount(
          <Toggle
            variant={variant}
            checked
            label={`Variant ${variant}`}
            trackClassName={variant === "other" ? "bg-purple-600 border-purple-600" : ""}
          />
        );
        cy.get('input[type="checkbox"]').should("be.checked");
        cy.get("label").should("contain.text", `Variant ${variant}`);
      });
    });

    colors.forEach((color) => {
      it(`renders color="${color}" correctly`, () => {
        cy.mount(<Toggle color={color} checked label={`Color ${color}`} />);
        cy.get('input[type="checkbox"]').should("be.checked");
      });
    });
  });

  /* ========================================================================
     3. Unit Tests - Radii
     ======================================================================== */
  describe("Radius options", () => {
    const radii: ToggleRadius[] = ["none", "sm", "md", "lg", "xl", "full"];

    radii.forEach((radius) => {
      it(`renders radius="${radius}" correctly`, () => {
        cy.mount(<Toggle radius={radius} thumbRadius={radius} label={`Radius ${radius}`} />);
        cy.get("label").should("contain.text", `Radius ${radius}`);
      });
    });
  });

  /* ========================================================================
     4. Unit Tests - States (Disabled, ReadOnly, Loading, Invalid, Required)
     ======================================================================== */
  describe("States & Feedback", () => {
    it("renders disabled state and prevents click", () => {
      const onChange = cy.stub().as("onChange");
      cy.mount(<Toggle disabled label="Disabled toggle" onChange={onChange} />);

      cy.get('input[type="checkbox"]').should("be.disabled");
      cy.get("label").click({ force: true });
      cy.get("@onChange").should("not.have.been.called");
      cy.get('input[type="checkbox"]').should("not.be.checked");
    });

    it("renders readOnly state and prevents state change", () => {
      const onChange = cy.stub().as("onChange");
      cy.mount(<Toggle readOnly checked label="Read-only toggle" onChange={onChange} />);

      cy.get('input[type="checkbox"]').should("have.attr", "readonly");
      cy.get("label").click({ force: true });
      cy.get("@onChange").should("not.have.been.called");
      cy.get('input[type="checkbox"]').should("be.checked");
    });

    it("renders loading state with spinner and disabled interactions", () => {
      const onChange = cy.stub().as("onChange");
      cy.mount(<Toggle config={{ isLoading: true, showSpinner: true }} label="Loading toggle" onChange={onChange} />);

      cy.get('input[type="checkbox"]').should("have.attr", "aria-busy", "true");
      cy.get("svg").should("exist"); // spinner
      cy.get("label").click({ force: true });
      cy.get("@onChange").should("not.have.been.called");
    });

    it("renders isInvalid state with aria-invalid", () => {
      cy.mount(<Toggle config={{ isInvalid: true }} label="Invalid toggle" />);
      cy.get('input[type="checkbox"]').should("have.attr", "aria-invalid", "true");
    });

    it("renders isRequired with asterisk", () => {
      cy.mount(<Toggle config={{ isRequired: true }} label="Required field" />);
      cy.get('input[type="checkbox"]').should("have.attr", "required");
      cy.get("label").should("contain.text", "*");
    });

    it("supports config prop for isRequired, isInvalid, isLoading, and showSpinner", () => {
      const onChange = cy.stub().as("onChange");
      cy.mount(
        <Toggle
          config={{ isRequired: true, isInvalid: true, isLoading: true, showSpinner: true }}
          label="Config toggle"
          onChange={onChange}
        />
      );
      cy.get('input[type="checkbox"]').should("have.attr", "required");
      cy.get('input[type="checkbox"]').should("have.attr", "aria-invalid", "true");
      cy.get('input[type="checkbox"]').should("have.attr", "aria-busy", "true");
      cy.get("label").should("contain.text", "*");
      cy.get("svg").should("exist"); // spinner
      cy.get("label").click({ force: true });
      cy.get("@onChange").should("not.have.been.called");
    });
  });

  /* ========================================================================
     5. Interaction & Props Controlled Behavior
     ======================================================================== */
  describe("Interactions & Controlled Props", () => {
    it("handles controlled toggle interaction smoothly", () => {
      function ControlledWrapper() {
        const [checked, setChecked] = useState(false);
        return (
          <div>
            <Toggle
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              label={checked ? "Status: ON" : "Status: OFF"}
            />
            <button data-testid="manual-btn" onClick={() => setChecked(!checked)}>
              Toggle External
            </button>
          </div>
        );
      }

      cy.mount(<ControlledWrapper />);
      cy.get('input[type="checkbox"]').should("not.be.checked");
      cy.get("label").should("contain.text", "Status: OFF");

      cy.get("label").click();
      cy.get('input[type="checkbox"]').should("be.checked");
      cy.get("label").should("contain.text", "Status: ON");

      cy.get('[data-testid="manual-btn"]').click();
      cy.get('input[type="checkbox"]').should("not.be.checked");
      cy.get("label").should("contain.text", "Status: OFF");
    });

    it("supports keyboard interactions (Space key) via controlled state", () => {
      function KeyboardWrapper() {
        const [checked, setChecked] = useState(false);
        return <Toggle checked={checked} onChange={(e) => setChecked(e.target.checked)} label="Keyboard toggle" />;
      }

      cy.mount(<KeyboardWrapper />);
      cy.get('input[type="checkbox"]').should("not.be.checked");

      cy.get('input[type="checkbox"]').focus().type(" ");
      cy.get('input[type="checkbox"]').should("be.checked");

      cy.get('input[type="checkbox"]').type(" ");
      cy.get('input[type="checkbox"]').should("not.be.checked");
    });
  });

  /* ========================================================================
     6. Labels & Placement
     ======================================================================== */
  describe("Labels & Placement", () => {
    it("renders label on the right by default", () => {
      cy.mount(<Toggle label="Right label" labelPlacement="right" />);
      cy.get("label").should("have.class", "flex-row");
      cy.get("label").should("contain.text", "Right label");
    });

    it("renders label on the left when labelPlacement='left'", () => {
      cy.mount(<Toggle label="Left label" labelPlacement="left" />);
      cy.get("label").should("have.class", "flex-row-reverse");
      cy.get("label").should("contain.text", "Left label");
    });
  });

  /* ========================================================================
     7. Helper Text & Error Messages
     ======================================================================== */
  describe("Helper Text & Error Messages", () => {
    it("renders helper text when provided", () => {
      cy.mount(<Toggle label="Toggle with helper" helperText="This is a helpful hint" />);
      cy.contains("This is a helpful hint").should("be.visible");
    });

    it("renders error message and automatically sets isInvalid", () => {
      cy.mount(<Toggle label="Toggle with error" errorMessage="This option is required" />);
      cy.get('input[type="checkbox"]').should("have.attr", "aria-invalid", "true");
      cy.contains("This option is required").should("be.visible");
      cy.get('[role="alert"]').should("contain.text", "This option is required");
    });
  });

  /* ========================================================================
     8. Custom Thumb Icon & Start/End Content
     ======================================================================== */
  describe("Thumb Icon & Start/End Content", () => {
    it("renders static thumb icon", () => {
      cy.mount(<Toggle label="Thumb icon" thumbIcon={<span data-testid="custom-icon">★</span>} />);
      cy.get('[data-testid="custom-icon"]').should("be.visible");
    });

    it("renders dynamic thumb icon based on checked state function", () => {
      function DynThumb() {
        const [checked, setChecked] = useState(false);
        return (
          <Toggle
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            label="Dynamic thumb"
            thumbIcon={({ isChecked }) => <span data-testid="dyn-icon">{isChecked ? "ON" : "OFF"}</span>}
          />
        );
      }

      cy.mount(<DynThumb />);
      cy.get('[data-testid="dyn-icon"]').should("contain.text", "OFF");

      cy.get("label").click();
      cy.get('[data-testid="dyn-icon"]').should("contain.text", "ON");
    });

    it("renders startContent and endContent inside the track", () => {
      cy.mount(
        <Toggle
          startContent={<span data-testid="start-c">☀️</span>}
          endContent={<span data-testid="end-c">🌙</span>}
          label="Day/Night"
        />
      );
      cy.get('[data-testid="start-c"]').should("exist");
      cy.get('[data-testid="end-c"]').should("exist");
    });
  });

  /* ========================================================================
     9. Ref Forwarding (React 19)
     ======================================================================== */
  describe("Ref Forwarding", () => {
    it("forwards ref to HTMLInputElement directly via callback ref", () => {
      let inputElement: HTMLInputElement | null = null;
      function CallbackRefTest() {
        return (
          <Toggle
            ref={(el) => {
              inputElement = el;
            }}
            label="Callback ref toggle"
            value="callback-val"
          />
        );
      }
      cy.mount(<CallbackRefTest />);
      cy.get('input[type="checkbox"]')
        .should("exist")
        .then(() => {
          expect(inputElement?.tagName).to.equal("INPUT");
          expect(inputElement?.value).to.equal("callback-val");
        });
    });

    it("forwards ref using useRef hook", () => {
      function UseRefTest() {
        const inputRef = useRef<HTMLInputElement>(null);
        const [val, setVal] = useState("");

        return (
          <div>
            <Toggle ref={inputRef} label="UseRef toggle" value="toggle-value-123" />
            <button data-testid="get-val-btn" onClick={() => setVal(inputRef.current?.value || "")}>
              Get Ref Value
            </button>
            <span data-testid="val-output">{val}</span>
          </div>
        );
      }
      cy.mount(<UseRefTest />);
      cy.get('[data-testid="get-val-btn"]').click();
      cy.get('[data-testid="val-output"]').should("contain.text", "toggle-value-123");
    });

    it("allows programmatic focus via ref", () => {
      function FocusTest() {
        const inputRef = useRef<HTMLInputElement>(null);
        return (
          <div>
            <Toggle ref={inputRef} label="Focusable toggle" />
            <button data-testid="focus-btn" onClick={() => inputRef.current?.focus()}>
              Focus Input
            </button>
          </div>
        );
      }
      cy.mount(<FocusTest />);
      cy.get('[data-testid="focus-btn"]').click();
      cy.get('input[type="checkbox"]').should("be.focused");
    });

    it("allows programmatic click via ref and triggers onChange", () => {
      function ProgrammaticClickTest() {
        const inputRef = useRef<HTMLInputElement>(null);
        const [checked, setChecked] = useState(false);

        return (
          <div>
            <Toggle
              ref={inputRef}
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              label="Programmatic toggle"
            />
            <button data-testid="click-btn" onClick={() => inputRef.current?.click()}>
              Trigger Click
            </button>
          </div>
        );
      }
      cy.mount(<ProgrammaticClickTest />);
      cy.get('input[type="checkbox"]').should("not.be.checked");

      cy.get('[data-testid="click-btn"]').click();
      cy.get('input[type="checkbox"]').should("be.checked");

      cy.get('[data-testid="click-btn"]').click();
      cy.get('input[type="checkbox"]').should("not.be.checked");
    });

    it("allows reading checked state and validity via ref", () => {
      function CheckedAndValidityTest() {
        const inputRef = useRef<HTMLInputElement>(null);
        const [info, setInfo] = useState<{ checked?: boolean; valid?: boolean }>({});

        return (
          <div>
            <Toggle ref={inputRef} checked config={{ isRequired: true }} label="Validation toggle" />
            <button
              data-testid="inspect-btn"
              onClick={() =>
                setInfo({
                  checked: inputRef.current?.checked,
                  valid: inputRef.current?.checkValidity(),
                })
              }
            >
              Inspect
            </button>
            <span data-testid="checked-res">{String(info.checked)}</span>
            <span data-testid="valid-res">{String(info.valid)}</span>
          </div>
        );
      }
      cy.mount(<CheckedAndValidityTest />);
      cy.get('[data-testid="inspect-btn"]').click();
      cy.get('[data-testid="checked-res"]').should("contain.text", "true");
      cy.get('[data-testid="valid-res"]').should("contain.text", "true");
    });

    it("works with React.createRef in class component", () => {
      class ClassRefTest extends Component {
        inputRef = createRef<HTMLInputElement>();
        render() {
          return (
            <div>
              <Toggle ref={this.inputRef} label="Class ref toggle" name="newsletter" />
              <button
                data-testid="get-name-btn"
                onClick={() => {
                  const el = document.getElementById("name-display");
                  if (el) el.textContent = this.inputRef.current?.name || "";
                }}
              >
                Get Name
              </button>
              <span id="name-display"></span>
            </div>
          );
        }
      }
      cy.mount(<ClassRefTest />);
      cy.get('[data-testid="get-name-btn"]').click();
      cy.get("#name-display").should("contain.text", "newsletter");
    });

    it("maintains ref reference across re-renders", () => {
      function ReRenderTest() {
        const inputRef = useRef<HTMLInputElement>(null);
        const [count, setCount] = useState(0);

        return (
          <div>
            <Toggle ref={inputRef} label={`Count: ${count}`} />
            <button data-testid="inc-btn" onClick={() => setCount((c) => c + 1)}>
              Increment
            </button>
            <button
              data-testid="verify-ref-btn"
              onClick={() => {
                const el = document.getElementById("ref-valid");
                if (el) el.textContent = inputRef.current ? "VALID" : "INVALID";
              }}
            >
              Verify Ref
            </button>
            <span id="ref-valid"></span>
          </div>
        );
      }
      cy.mount(<ReRenderTest />);
      cy.get('[data-testid="inc-btn"]').click();
      cy.get('[data-testid="inc-btn"]').click();
      cy.get('[data-testid="verify-ref-btn"]').click();
      cy.get("#ref-valid").should("contain.text", "VALID");
    });
  });

  /* ========================================================================
     10. All-in-One Comprehensive Showcase Dashboard (Màn hình tổng hợp toàn bộ)
     ======================================================================== */
  describe("Comprehensive Showcase Dashboard", () => {
    it("renders all features and interactions on a single interactive screen", () => {
      function ToggleDashboard() {
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

        const [radiusStates, setRadiusStates] = useState<Record<string, boolean>>({
          none: true,
          sm: true,
          md: true,
          lg: true,
          xl: true,
          full: true,
        });

        const [interactiveState, setInteractiveState] = useState(true);
        const [notifications, setNotifications] = useState(true);
        const [agree, setAgree] = useState(false);
        const [loadingDemo, setLoadingDemo] = useState(true);
        const [themeMode, setThemeMode] = useState(true);

        // Ref controls
        const refControlInput = useRef<HTMLInputElement>(null);
        const [refChecked, setRefChecked] = useState(false);
        const [refLog, setRefLog] = useState("Sẵn sàng kiểm thử Ref");

        return (
          <div className="p-8 bg-neutral-50 dark:bg-neutral-900 min-h-screen flex flex-col gap-8 font-sans text-neutral-900 dark:text-neutral-100">
            {/* Header */}
            <header className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-primary-700 dark:text-primary-400">
                    🎚️ Toggle Component Showcase Dashboard
                  </h1>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    Tổng hợp toàn bộ tính năng: 5 Sizes, 7 Colors, 4 Variants, 6 Radii, States, Ref Forwarding &
                    Animations
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-neutral-800 px-4 py-2 rounded-xl shadow-xs border border-neutral-200 dark:border-neutral-700">
                  <span className="text-xs font-semibold">Demo Live Toggle:</span>
                  <Toggle
                    checked={interactiveState}
                    onChange={(e) => setInteractiveState(e.target.checked)}
                    color="success"
                    size="sm"
                    label={interactiveState ? "Đang BẬT" : "Đang TẮT"}
                  />
                </div>
              </div>
            </header>

            {/* Main Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Card 1: 5 Sizes */}
              <div className="p-5 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200/80 dark:border-neutral-700 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-primary-700 dark:text-primary-300 text-sm uppercase tracking-wider">
                    1. Sizes (5 Kích thước)
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-600 font-medium">
                    xs → xl
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {(["xs", "sm", "md", "lg", "xl"] as ToggleSize[]).map((s) => (
                    <Toggle
                      key={s}
                      size={s}
                      checked={sizeStates[s]}
                      onChange={(e) => setSizeStates((prev) => ({ ...prev, [s]: e.target.checked }))}
                      label={`Size ${s.toUpperCase()}`}
                      helperText={s === "md" ? "Mặc định (size md)" : undefined}
                    />
                  ))}
                </div>
              </div>

              {/* Card 2: 7 Colors */}
              <div className="p-5 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200/80 dark:border-neutral-700 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-primary-700 dark:text-primary-300 text-sm uppercase tracking-wider">
                    2. Colors (7 Bảng màu)
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-600 font-medium">
                    Theme Tokens
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {(["primary", "secondary", "success", "error", "warning", "info", "neutral"] as ToggleColor[]).map(
                    (c) => (
                      <Toggle
                        key={c}
                        color={c}
                        checked={colorStates[c]}
                        onChange={(e) => setColorStates((prev) => ({ ...prev, [c]: e.target.checked }))}
                        label={`Màu ${c}`}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Card 3: Variants */}
              <div className="p-5 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200/80 dark:border-neutral-700 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-primary-700 dark:text-primary-300 text-sm uppercase tracking-wider">
                    3. Variants (Biến thể)
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-600 font-medium">
                    4 Styles
                  </span>
                </div>
                <div className="flex flex-col gap-3.5">
                  <Toggle
                    variant="filled"
                    color="primary"
                    checked={variantStates.filled}
                    onChange={(e) => setVariantStates((prev) => ({ ...prev, filled: e.target.checked }))}
                    label="Filled (Nền đặc - Mặc định)"
                  />
                  <Toggle
                    variant="outline"
                    color="primary"
                    checked={variantStates.outline}
                    onChange={(e) => setVariantStates((prev) => ({ ...prev, outline: e.target.checked }))}
                    label="Outline (Viền màu chủ đề)"
                  />
                  <Toggle
                    variant="soft"
                    color="primary"
                    checked={variantStates.soft}
                    onChange={(e) => setVariantStates((prev) => ({ ...prev, soft: e.target.checked }))}
                    label="Soft (Nền dịu pastel)"
                  />
                  <Toggle
                    variant="other"
                    checked={variantStates.other}
                    onChange={(e) => setVariantStates((prev) => ({ ...prev, other: e.target.checked }))}
                    label="Other (Custom Gradient)"
                    trackClassName="bg-gradient-to-r from-purple-600 to-pink-500 border-0"
                    thumbClassName="bg-white text-purple-600 shadow-md"
                  />
                </div>
              </div>

              {/* Card 4: Radii */}
              <div className="p-5 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200/80 dark:border-neutral-700 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-primary-700 dark:text-primary-300 text-sm uppercase tracking-wider">
                    4. Radius (Độ bo góc)
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-600 font-medium">
                    6 Mức bo
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {(["none", "sm", "md", "lg", "xl", "full"] as ToggleRadius[]).map((r) => (
                    <Toggle
                      key={r}
                      radius={r}
                      thumbRadius={r}
                      checked={radiusStates[r]}
                      onChange={(e) => setRadiusStates((prev) => ({ ...prev, [r]: e.target.checked }))}
                      label={`radius="${r}"`}
                    />
                  ))}
                </div>
              </div>

              {/* Card 5: States & Feedback */}
              <div className="p-5 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200/80 dark:border-neutral-700 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-primary-700 dark:text-primary-300 text-sm uppercase tracking-wider">
                    5. Trạng thái & Feedback
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-600 font-medium">
                    Disabled & Error
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <Toggle disabled checked label="Disabled (Checked)" />
                  <Toggle disabled checked={false} label="Disabled (Unchecked)" />
                  <Toggle readOnly checked label="Read Only (Không sửa được)" />
                  <Toggle
                    config={{ isLoading: loadingDemo, showSpinner: true }}
                    checked={loadingDemo}
                    onChange={(e) => setLoadingDemo(e.target.checked)}
                    label="Loading State (Spinner)"
                  />
                  <Toggle
                    config={{ isRequired: true }}
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    label="Bắt buộc đồng ý điều khoản"
                    errorMessage={!agree ? "Bạn phải bật công tắc này" : undefined}
                  />
                </div>
              </div>

              {/* Card 6: Custom Icons & Content */}
              <div className="p-5 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200/80 dark:border-neutral-700 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-primary-700 dark:text-primary-300 text-sm uppercase tracking-wider">
                    6. Icons & In-Track Content
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-600 font-medium">
                    Start/End & Thumb
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <Toggle
                    size="lg"
                    checked={themeMode}
                    onChange={(e) => setThemeMode(e.target.checked)}
                    startContent="☀️"
                    endContent="🌙"
                    label={themeMode ? "Chế độ Ngày (Sun)" : "Chế độ Đêm (Moon)"}
                  />
                  <Toggle
                    size="md"
                    checked={false}
                    thumbIcon={<span className="text-[10px]">🔒</span>}
                    label="Thumb Icon Cố định (Lock)"
                  />
                  <Toggle
                    size="md"
                    checked={true}
                    thumbIcon={({ isChecked }) => (
                      <span className="text-[9px] font-bold">{isChecked ? "ON" : "OFF"}</span>
                    )}
                    label="Dynamic Thumb Icon"
                  />
                </div>
              </div>

              {/* Card 7: Label Placement & Helper */}
              <div className="p-5 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200/80 dark:border-neutral-700 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-primary-700 dark:text-primary-300 text-sm uppercase tracking-wider">
                    7. Placement & Helper Text
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-600 font-medium">
                    Layout
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <Toggle
                    labelPlacement="right"
                    label="Label bên Phải (Mặc định)"
                    helperText="Vị trí nhãn chuẩn bên phải thanh toggle"
                  />
                  <Toggle labelPlacement="left" label="Label bên Trái" helperText="Thanh toggle tự căn sang phải" />
                  <Toggle
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    label="Nhận thông báo qua Email"
                    helperText="Gửi email cập nhật tính năng mới mỗi tuần"
                  />
                </div>
              </div>

              {/* Card 8: Ref Forwarding & Programmatic Actions */}
              <div className="p-5 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200/80 dark:border-neutral-700 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-primary-700 dark:text-primary-300 text-sm uppercase tracking-wider">
                    8. Ref Forwarding & Controls
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-success-50 dark:bg-success-950 text-success-600 font-medium">
                    React 19 Ref
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <Toggle
                    ref={refControlInput}
                    checked={refChecked}
                    onChange={(e) => setRefChecked(e.target.checked)}
                    name="programmaticToggle"
                    value="ref-demo-payload"
                    label="Target Toggle for Ref"
                  />
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      type="button"
                      data-testid="ref-focus-btn"
                      onClick={() => {
                        refControlInput.current?.focus();
                        setRefLog("👉 Đã gọi ref.current.focus()");
                      }}
                      className="px-2.5 py-1.5 bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-lg text-xs font-semibold cursor-pointer border border-primary-200 dark:border-primary-800 transition"
                    >
                      Focus Input
                    </button>
                    <button
                      type="button"
                      data-testid="ref-click-btn"
                      onClick={() => {
                        refControlInput.current?.click();
                        setRefLog("👆 Đã gọi ref.current.click()");
                      }}
                      className="px-2.5 py-1.5 bg-secondary-50 hover:bg-secondary-100 dark:bg-secondary-900/40 text-secondary-700 dark:text-secondary-300 rounded-lg text-xs font-semibold cursor-pointer border border-secondary-200 dark:border-secondary-800 transition"
                    >
                      Trigger Click
                    </button>
                    <button
                      type="button"
                      data-testid="ref-read-btn"
                      onClick={() => {
                        const checked = refControlInput.current?.checked;
                        const val = refControlInput.current?.value;
                        setRefLog(`Checked: ${checked} | Value: ${val}`);
                      }}
                      className="col-span-2 px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg text-xs font-semibold cursor-pointer border border-neutral-300 dark:border-neutral-600 transition"
                    >
                      Đọc Trạng thái từ Ref
                    </button>
                  </div>
                  <div
                    data-testid="ref-log-output"
                    className="p-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg text-[11px] font-mono text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800"
                  >
                    {refLog}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      cy.mount(<ToggleDashboard />);

      // Verify dashboard rendering
      cy.get("h1").should("be.visible").and("contain.text", "Toggle Component Showcase Dashboard");
      cy.get('input[type="checkbox"]').should("have.length.greaterThan", 25);

      // Verify interactive controls inside dashboard
      cy.get('[data-testid="ref-click-btn"]').click();
      cy.get('[data-testid="ref-log-output"]').should("contain.text", "click()");

      cy.get('[data-testid="ref-read-btn"]').click();
      cy.get('[data-testid="ref-log-output"]').should("contain.text", "Checked: true");
    });
  });
});
