import React, { useState, useRef } from "react";
import { Slider } from "./index";
import { SliderColor, SliderSize, SliderVariant, SliderRadius } from "./types";

describe("<Slider /> Component Tests", () => {
  /* ========================================================================
     ALL-IN-ONE SHOWCASE DASHBOARD TEST CASE
     ======================================================================== */
  it("renders all slider variants, sizes, colors, radii, states, range, tooltips, marks & orientations in a single showcase dashboard", () => {
    function SliderShowcaseDashboard() {
      const sizes: SliderSize[] = ["xs", "sm", "md", "lg", "xl"];
      const colors: SliderColor[] = ["primary", "secondary", "error", "success", "warning", "info", "neutral"];
      const variants: SliderVariant[] = ["filled", "soft", "outline", "other"];
      const radii: SliderRadius[] = ["none", "sm", "md", "lg", "xl", "full"];

      // Interactive States
      const [singleVal, setSingleVal] = useState<number>(45);
      const [rangeVal, setRangeVal] = useState<[number, number]>([25, 75]);
      const [interactiveColor, setInteractiveColor] = useState<SliderColor>("primary");
      const [interactiveSize, setInteractiveSize] = useState<SliderSize>("md");
      const [interactiveVariant, setInteractiveVariant] = useState<SliderVariant>("filled");
      const [interactiveRadius, setInteractiveRadius] = useState<SliderRadius>("full");
      const [showSteps, setShowSteps] = useState<boolean>(true);
      const [showTooltipMode, setShowTooltipMode] = useState<"none" | "always" | "active" | "hover">("always");
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const [isDisabled, setIsDisabled] = useState<boolean>(false);
      const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
      const [hasError, setHasError] = useState<boolean>(false);
      const [logMessage, setLogMessage] = useState<string>("Sẵn sàng tương tác");

      // Ref demo
      const sliderRef = useRef<HTMLDivElement>(null);

      return (
        <div className="p-8 bg-neutral-50 text-neutral-900 min-h-screen font-sans space-y-12 max-w-7xl mx-auto">
          {/* Header */}
          <div className="border-b border-neutral-200 pb-6">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
              Slider Component Showcase Dashboard
            </h1>
            <p className="text-sm text-neutral-500 mt-2">
              Bảng điều khiển trực quan hiển thị toàn bộ biến thể, kích cỡ, màu sắc, chế độ Range & tính năng của
              component Slider.
            </p>
          </div>

          {/* SECTION 1: LIVE INTERACTIVE PLAYGROUND */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-primary-700">
                1. Live Interactive Playground
              </h2>
              <span
                data-testid="interactive-log"
                className="px-3 py-1 bg-neutral-100 text-xs font-mono rounded-md border border-neutral-200"
              >
                {logMessage}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Single Slider Live */}
              <div className="space-y-4 p-5 bg-neutral-50 rounded-xl border border-neutral-200/60">
                <h3 className="font-semibold text-sm text-neutral-700">
                  Single Value Slider (Controlled)
                </h3>
                <Slider
                  ref={sliderRef}
                  value={singleVal}
                  size={interactiveSize}
                  color={interactiveColor}
                  variant={interactiveVariant}
                  radius={interactiveRadius}
                  config={{
                    showSteps,
                    showValue: true,
                    isLoading,
                    showSpinner: isLoading,
                    isInvalid: hasError,
                  }}
                  step={5}
                  min={0}
                  max={100}
                  showTooltip={showTooltipMode}
                  disabled={isDisabled}
                  readOnly={isReadOnly}
                  errorMessage={hasError ? "Giá trị không hợp lệ!" : undefined}
                  helperText="Kéo hoặc dùng phím mũi tên để thay đổi"
                  label="Interactive Single Slider"
                  formatValue={(v) => `${v}%`}
                  onChange={(v) => {
                    setSingleVal(v as number);
                    setLogMessage(`Single Value: ${v}%`);
                  }}
                  onChangeEnd={(v) => {
                    setLogMessage(`Single Committed: ${v}%`);
                  }}
                />
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    type="button"
                    data-testid="btn-set-20"
                    onClick={() => {
                      setSingleVal(20);
                      setLogMessage("Set Single to 20%");
                    }}
                    className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-xs rounded-lg font-medium cursor-pointer transition"
                  >
                    Set 20%
                  </button>
                  <button
                    type="button"
                    data-testid="btn-set-80"
                    onClick={() => {
                      setSingleVal(80);
                      setLogMessage("Set Single to 80%");
                    }}
                    className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-xs rounded-lg font-medium cursor-pointer transition"
                  >
                    Set 80%
                  </button>
                </div>
              </div>

              {/* Range Slider Live */}
              <div className="space-y-4 p-5 bg-neutral-50 rounded-xl border border-neutral-200/60">
                <h3 className="font-semibold text-sm text-neutral-700">
                  Range Slider (Dual Thumbs Controlled)
                </h3>
                <Slider
                  value={rangeVal}
                  size={interactiveSize}
                  color={interactiveColor}
                  variant={interactiveVariant}
                  radius={interactiveRadius}
                  config={{
                    showSteps,
                    showValue: true,
                    isLoading,
                    showSpinner: isLoading,
                    isInvalid: hasError,
                  }}
                  step={5}
                  min={0}
                  max={100}
                  showTooltip={showTooltipMode}
                  disabled={isDisabled}
                  readOnly={isReadOnly}
                  errorMessage={hasError ? "Khoảng giá trị lỗi!" : undefined}
                  label="Interactive Price Range"
                  formatValue={(v) => {
                    const arr = v as [number, number];
                    return `$${arr[0]} - $${arr[1]}`;
                  }}
                  onChange={(v) => {
                    const arr = v as [number, number];
                    setRangeVal(arr);
                    setLogMessage(`Range Value: $${arr[0]} - $${arr[1]}`);
                  }}
                  onChangeEnd={(v) => {
                    const arr = v as [number, number];
                    setLogMessage(`Range Committed: $${arr[0]} - $${arr[1]}`);
                  }}
                />
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    type="button"
                    data-testid="btn-range-10-90"
                    onClick={() => {
                      setRangeVal([10, 90]);
                      setLogMessage("Set Range to [10, 90]");
                    }}
                    className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-xs rounded-lg font-medium cursor-pointer transition"
                  >
                    Range $10 - $90
                  </button>
                  <button
                    type="button"
                    data-testid="btn-range-40-60"
                    onClick={() => {
                      setRangeVal([40, 60]);
                      setLogMessage("Set Range to [40, 60]");
                    }}
                    className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-xs rounded-lg font-medium cursor-pointer transition"
                  >
                    Range $40 - $60
                  </button>
                </div>
              </div>
            </div>

            {/* Playground Controls Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3 pt-3 border-t border-neutral-200 text-xs">
              <div>
                <label className="block text-neutral-500 mb-1 font-medium">Color</label>
                <select
                  data-testid="select-color"
                  value={interactiveColor}
                  onChange={(e) => setInteractiveColor(e.target.value as SliderColor)}
                  className="w-full bg-neutral-100 rounded-lg p-2 border border-neutral-300 font-medium"
                >
                  {colors.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-500 mb-1 font-medium">Size</label>
                <select
                  data-testid="select-size"
                  value={interactiveSize}
                  onChange={(e) => setInteractiveSize(e.target.value as SliderSize)}
                  className="w-full bg-neutral-100 rounded-lg p-2 border border-neutral-300 font-medium"
                >
                  {sizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-500 mb-1 font-medium">Variant</label>
                <select
                  data-testid="select-variant"
                  value={interactiveVariant}
                  onChange={(e) => setInteractiveVariant(e.target.value as SliderVariant)}
                  className="w-full bg-neutral-100 rounded-lg p-2 border border-neutral-300 font-medium"
                >
                  {variants.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-500 mb-1 font-medium">Radius</label>
                <select
                  data-testid="select-radius"
                  value={interactiveRadius}
                  onChange={(e) => setInteractiveRadius(e.target.value as SliderRadius)}
                  className="w-full bg-neutral-100 rounded-lg p-2 border border-neutral-300 font-medium"
                >
                  {radii.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-500 mb-1 font-medium">Tooltip</label>
                <select
                  data-testid="select-tooltip"
                  value={showTooltipMode}
                  onChange={(e) => setShowTooltipMode(e.target.value as any)}
                  className="w-full bg-neutral-100 rounded-lg p-2 border border-neutral-300 font-medium"
                >
                  <option value="always">always</option>
                  <option value="active">active</option>
                  <option value="hover">hover</option>
                  <option value="none">none</option>
                </select>
              </div>

              <div className="flex flex-col justify-end gap-1">
                <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    data-testid="toggle-loading"
                    checked={isLoading}
                    onChange={(e) => setIsLoading(e.target.checked)}
                  />
                  <span>Loading</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    data-testid="toggle-disabled"
                    checked={isDisabled}
                    onChange={(e) => setIsDisabled(e.target.checked)}
                  />
                  <span>Disabled</span>
                </label>
              </div>

              <div className="flex flex-col justify-end gap-1">
                <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    data-testid="toggle-invalid"
                    checked={hasError}
                    onChange={(e) => setHasError(e.target.checked)}
                  />
                  <span>Invalid</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    data-testid="toggle-readonly"
                    checked={isReadOnly}
                    onChange={(e) => setIsReadOnly(e.target.checked)}
                  />
                  <span>ReadOnly</span>
                </label>
              </div>
            </div>
          </div>

          {/* SECTION 2: SIZES (xs, sm, md, lg, xl) */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-neutral-900">
              2. Sizes Hierarchy (xs, sm, md, lg, xl)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sizes.map((size) => (
                <div
                  key={size}
                  className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/50"
                >
                  <Slider
                    size={size}
                    label={`Size: ${size.toUpperCase()}`}
                    defaultValue={
                      size === "xs" ? 20 : size === "sm" ? 40 : size === "md" ? 60 : size === "lg" ? 80 : 100
                    }
                    config={{ showValue: true }}
                    formatValue={(v) => `${v}%`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: 7 COLOR THEMES */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-neutral-900">3. Color Themes (7 Palettes)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {colors.map((color, idx) => (
                <div
                  key={color}
                  className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/50"
                >
                  <Slider color={color} label={`Color: ${color}`} defaultValue={20 + idx * 12} config={{ showValue: true }} />
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: VARIANTS */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-neutral-900">
              4. Variants (filled, soft, outline, other)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {variants.map((v) => (
                <div
                  key={v}
                  className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/50"
                >
                  <Slider
                    variant={v}
                    color="primary"
                    label={`Variant: ${v}`}
                    defaultValue={65}
                    config={{ showValue: true }}
                    trackClassName={v === "other" ? "bg-purple-200" : ""}
                    fillerClassName={v === "other" ? "bg-purple-600" : ""}
                    thumbClassName={v === "other" ? "border-purple-600" : ""}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 5: RADII */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-neutral-900">
              5. Radii & Shapes (none, sm, md, lg, xl, full)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {radii.map((radius) => (
                <div
                  key={radius}
                  className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/50"
                >
                  <Slider radius={radius} thumbRadius={radius} label={`Radius: ${radius}`} defaultValue={50} />
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 6: MARKS & STEP DOTS */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-neutral-900">6. Marks & Step Dots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200/50">
                <Slider
                  label="Temperature Level"
                  defaultValue={25}
                  min={0}
                  max={50}
                  step={5}
                  config={{ showSteps: true }}
                  marks={[
                    { value: 0, label: "0°C" },
                    { value: 20, label: "20°C" },
                    { value: 37, label: "37°C" },
                    { value: 50, label: "50°C" },
                  ]}
                />
              </div>
              <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200/50">
                <Slider
                  label="Subscription Tier"
                  defaultValue={1}
                  min={0}
                  max={3}
                  step={1}
                  config={{ showSteps: true }}
                  color="secondary"
                  marks={[
                    { value: 0, label: "Free" },
                    { value: 1, label: "Pro" },
                    { value: 2, label: "Team" },
                    { value: 3, label: "Enterprise" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* SECTION 7: TOOLTIP INTEGRATION */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-neutral-900">
              7. Tooltip Integration (Floating UI)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/50">
                <Slider
                  label="Tooltip: Always Open"
                  defaultValue={42}
                  showTooltip="always"
                  formatTooltip={(v) => `Value: ${v}`}
                />
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/50">
                <Slider
                  label="Tooltip: Active (On Drag/Focus)"
                  defaultValue={68}
                  showTooltip="active"
                  color="success"
                  formatTooltip={(v) => `${v}% Battery`}
                />
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/50">
                <Slider
                  label="Tooltip: Hover"
                  defaultValue={90}
                  showTooltip="hover"
                  color="warning"
                  formatTooltip={(v) => `$${v} USD`}
                />
              </div>
            </div>
          </div>

          {/* SECTION 8: START & END CONTENT (ICONS) */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-neutral-900">
              8. Start & End Content (Audio & Brightness)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/50">
                <Slider
                  label="Audio Volume"
                  defaultValue={70}
                  startContent={<span className="text-xs font-semibold">🔈 Min</span>}
                  endContent={<span className="text-xs font-semibold">🔊 Max</span>}
                  config={{ showValue: true }}
                  formatValue={(v) => `${v}%`}
                />
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/50">
                <Slider
                  label="Screen Brightness"
                  color="warning"
                  defaultValue={85}
                  startContent={<span className="text-xs font-semibold">🌑 Low</span>}
                  endContent={<span className="text-xs font-semibold">☀️ High</span>}
                  config={{ showValue: true }}
                  formatValue={(v) => `${v}%`}
                />
              </div>
            </div>
          </div>

          {/* SECTION 9: VERTICAL ORIENTATION (EQUALIZER) */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-neutral-900">
              9. Vertical Orientation (Equalizer Showcase)
            </h2>
            <div className="flex items-center justify-around p-6 bg-neutral-50 rounded-xl border border-neutral-200/50 h-64">
              {[
                { freq: "60Hz", val: 30, color: "primary" as const },
                { freq: "150Hz", val: 50, color: "secondary" as const },
                { freq: "400Hz", val: 75, color: "primary" as const },
                { freq: "1kHz", val: 40, color: "secondary" as const },
                { freq: "2.5kHz", val: 90, color: "primary" as const },
                { freq: "6kHz", val: 60, color: "secondary" as const },
                { freq: "15kHz", val: 45, color: "primary" as const },
              ].map((item) => (
                <div key={item.freq} className="flex flex-col items-center gap-2 h-full">
                  <Slider
                    orientation="vertical"
                    defaultValue={item.val}
                    size="md"
                    color={item.color}
                    showTooltip="active"
                  />
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {item.freq}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 10: STATES & VALIDATION */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-neutral-900">
              10. States, Validation & Loading State
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/50">
                <Slider label="Loading State" config={{ isLoading: true, showSpinner: true }} defaultValue={45} helperText="Đang tải dữ liệu..." />
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/50">
                <Slider label="Disabled State" disabled defaultValue={35} helperText="Thanh trượt bị vô hiệu hóa" />
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/50">
                <Slider
                  label="Read-Only State"
                  readOnly
                  defaultValue={60}
                  helperText="Chỉ xem, không thể kéo thay đổi"
                />
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/50">
                <Slider label="Required Field" config={{ isRequired: true }} defaultValue={50} helperText="Trường thông tin bắt buộc" />
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/50">
                <Slider
                  label="Invalid / Error State"
                  config={{ isInvalid: true }}
                  defaultValue={15}
                  errorMessage="Giá trị quá thấp (min 20)"
                />
              </div>
            </div>
          </div>

          {/* SECTION 11: FORM INTEGRATION */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-neutral-900">
              11. HTML Form Submission (Hidden Inputs)
            </h2>
            <form
              data-testid="demo-form"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const entries = Object.fromEntries(formData.entries());
                setLogMessage(`Form Submitted: ${JSON.stringify(entries)}`);
              }}
              className="p-5 bg-neutral-50 rounded-xl border border-neutral-200/50 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Slider name="userVolume" defaultValue={85} label="Single Slider in Form" config={{ showValue: true }} />
                <Slider
                  name="priceBudget"
                  defaultValue={[100, 500]}
                  min={0}
                  max={1000}
                  label="Range Slider in Form"
                  config={{ showValue: true }}
                  formatValue={(v) => {
                    const arr = v as [number, number];
                    return `$${arr[0]} - $${arr[1]}`;
                  }}
                />
              </div>
              <button
                type="submit"
                data-testid="btn-submit-form"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition shadow-sm"
              >
                Submit Form
              </button>
            </form>
          </div>
        </div>
      );
    }

    cy.mount(<SliderShowcaseDashboard />);

    // 1. Verify Dashboard header
    cy.get("h1").should("be.visible").and("contain.text", "Slider Component Showcase Dashboard");

    // 2. Verify large amount of sliders rendered (> 25 sliders)
    cy.get('[role="slider"]').should("have.length.greaterThan", 25);

    // 3. Verify Live Interactive Single Slider & Controls
    cy.get('[data-testid="btn-set-20"]').click();
    cy.get('[data-testid="interactive-log"]').should("contain.text", "20%");

    cy.get('[data-testid="btn-set-80"]').click();
    cy.get('[data-testid="interactive-log"]').should("contain.text", "80%");

    // 4. Verify Live Interactive Range Slider
    cy.get('[data-testid="btn-range-10-90"]').click();
    cy.get('[data-testid="interactive-log"]').should("contain.text", "[10, 90]");

    // 5. Verify Select Controls in Live Playground
    cy.get('[data-testid="select-color"]').select("secondary");
    cy.get('[data-testid="select-size"]').select("lg");
    cy.get('[data-testid="select-variant"]').select("soft");
    cy.get('[data-testid="select-radius"]').select("none");

    // 6. Verify Loading State
    cy.get('[data-testid="toggle-loading"]').check();
    cy.get('[aria-busy="true"]').should("exist");

    // 7. Verify Tooltip rendering in showcase
    cy.contains("Tooltip: Always Open").should("be.visible");
    cy.contains("Value: 42").should("be.visible");

    // 8. Verify Equalizer vertical sliders exist
    cy.get('[aria-orientation="vertical"]').should("have.length.greaterThan", 5);

    // 9. Verify Form Submission
    cy.get('[data-testid="btn-submit-form"]').click();
    cy.get('[data-testid="interactive-log"]').should("contain.text", "Form Submitted");
  });
});
