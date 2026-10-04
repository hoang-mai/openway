import React, { useState } from "react";
import {
  DateRangePicker,
  DateRangeCalendar,
  DateRangePickerSize,
  DateRangePickerColor,
  DateRangePickerVariant,
  DateRangePickerRadius,
} from "./index";
import { LabelPlacement } from "../input/types";

// ============================================================================
// ALL-IN-ONE COMPREHENSIVE SHOWCASE (SINGLE MOUNT FOR VISUAL INSPECTION)
// ============================================================================
interface HarnessProps {
  onRangeChange?: (range: [string, string] | null) => void;
  onRangeIOChange?: (range: [string, string] | null) => void;
}

const DateRangePickerShowcase = ({ onRangeChange, onRangeIOChange }: HarnessProps) => {
  const [liveRange, setLiveRange] = useState<[string, string] | null>(["05/08/2026", "20/08/2026"]);
  const [viewTabRange, setViewTabRange] = useState<[string, string] | null>(["01/03/2026", "01/08/2026"]);
  const [usRange, setUsRange] = useState<[string, string] | null>(["08/01/2026", "08/15/2026"]);
  const [isoRange, setIsoRange] = useState<[string, string] | null>(["2026-08-01", "2026-08-15"]);
  const [ioRange, setIoRange] = useState<[string, string] | null>(["2026-08-05", "2026-08-18"]);
  const [calendarRange, setCalendarRange] = useState<[Date | null, Date | null]>([
    new Date(2026, 7, 5),
    new Date(2026, 8, 15),
  ]);
  const [calendarView, setCalendarView] = useState<"days" | "months" | "years">("days");

  const sizes: DateRangePickerSize[] = ["xs", "sm", "md", "lg", "xl"];
  const colors: DateRangePickerColor[] = ["primary", "secondary", "neutral", "error", "success", "warning", "info"];
  const variants: DateRangePickerVariant[] = ["outline", "filled", "ghost"];
  const radii: DateRangePickerRadius[] = ["none", "sm", "md", "lg", "xl", "full"];
  const labelPlacements: LabelPlacement[] = ["top", "left", "floating"];

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-neutral-50 text-neutral-900 min-h-screen">
      {/* HEADER */}
      <header className="border-b border-neutral-200 pb-5">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          DateRangePicker Component Showcase
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Toàn bộ các kích thước (Sizes), biến thể (Variants), màu sắc (Colors), bo góc (Radius), trạng thái (States),
          2 tháng liên tiếp song song và Standalone DateRangeCalendar trong cùng 1 lần mount.
        </p>
      </header>

      {/* 1. INTERACTIVE LIVE PLAYGROUND */}
      <section id="section-interactive" className="p-5 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-3">
          <h2 className="text-lg font-bold text-neutral-800">1. Interactive Live Playground</h2>
          <div className="text-xs font-mono bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
            <span className="text-neutral-500">Selected Range: </span>
            <span className="font-semibold text-primary-600">
              {Array.isArray(liveRange) ? liveRange.join(" - ") : "null"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div id="interactive-daterangepicker">
            <DateRangePicker
              label="Standard DateRangePicker"
              value={liveRange ?? undefined}
              onChange={(r) => {
                setLiveRange(r);
                onRangeChange?.(r);
              }}
              config={{ isClearable: true, isRequired: true }}
              helperText="Chọn khoảng ngày trên 2 tháng liên tiếp"
            />
          </div>

          <div id="interactive-viewtabs-daterangepicker">
            <DateRangePicker
              label="DateRangePicker with View Tabs"
              value={viewTabRange ?? undefined}
              onChange={setViewTabRange}
              defaultView="months"
              config={{ showViewTabs: true, isClearable: true }}
              helperText="Hỗ trợ chọn khoảng Tháng hoặc Năm"
            />
          </div>

          <div id="interactive-calendar" className="border border-neutral-200 rounded-xl p-3 bg-white">
            <h3 className="text-xs font-semibold text-neutral-500 mb-2 uppercase">Standalone DateRangeCalendar (2 Months)</h3>
            <DateRangeCalendar
              value={calendarRange}
              onChange={setCalendarRange}
              view={calendarView}
              onViewChange={setCalendarView}
              showViewTabs={true}
              showWeekNumbers={true}
            />
          </div>
        </div>
      </section>

      {/* 2. SIZES SHOWCASE (5 SIZES) */}
      <section id="section-sizes" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">2. Sizes (5 sizes: xs, sm, md, lg, xl)</h2>
          <p className="text-xs text-neutral-500">
            5 kích cỡ chuẩn hoá: xs (h-6), sm (h-8), md (h-10), lg (h-12), xl (h-14)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
          {sizes.map((s) => (
            <DateRangePicker
              key={`size-${s}`}
              size={s}
              label={`Size: ${s.toUpperCase()}`}
              placeholder={`Range ${s}`}
              defaultValue={["01/08/2026", "15/08/2026"]}
            />
          ))}
        </div>
      </section>

      {/* 3. VARIANTS & 7 COLORS MATRIX (3 x 7 = 21 PICKERS) */}
      <section id="section-variants" className="space-y-8">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">
            3. Variants & Colors Matrix (3 Variants x 7 Colors = 21 Pickers)
          </h2>
          <p className="text-xs text-neutral-500">
            Tất cả biến thể (outline, filled, ghost) kết hợp 7 màu chủ đề
          </p>
        </div>

        {variants.map((v) => (
          <div key={`variant-group-${v}`} className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-3 py-1 rounded inline-block">
              Variant: {v}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {colors.map((c) => (
                <DateRangePicker
                  key={`${v}-${c}`}
                  variant={v}
                  color={c}
                  label={`${c}`}
                  defaultValue={["01/08/2026", "15/08/2026"]}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 4. RADIUS OPTIONS */}
      <section id="section-radius" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">4. Radius (none, sm, md, lg, xl, full)</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {radii.map((r) => (
            <DateRangePicker
              key={`radius-${r}`}
              radius={r}
              label={`Radius: ${r}`}
              defaultValue={["01/08/2026", "15/08/2026"]}
            />
          ))}
        </div>
      </section>

      {/* 5. FORM STATES & VALIDATIONS */}
      <section id="section-form-states" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">5. Form Field States & Validations</h2>
          <p className="text-xs text-neutral-500">
            Required, Disabled, ReadOnly, Loading (với Spinner), Invalid với ErrorMessage
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div id="drp-state-required">
            <DateRangePicker
              label="Required Field"
              config={{ isRequired: true }}
              placeholder="Select range *"
            />
          </div>

          <div id="drp-state-disabled">
            <DateRangePicker
              label="Disabled State"
              disabled
              defaultValue={["01/08/2026", "15/08/2026"]}
              helperText="Trường này bị vô hiệu hoá"
            />
          </div>

          <div id="drp-state-readonly">
            <DateRangePicker
              label="Read-Only State"
              readOnly
              defaultValue={["01/08/2026", "15/08/2026"]}
              helperText="Chỉ xem, không mở popup"
            />
          </div>

          <div id="drp-state-loading">
            <DateRangePicker
              label="Loading State (isLoading)"
              config={{ isLoading: true, showSpinner: true }}
              defaultValue={["01/08/2026", "15/08/2026"]}
              helperText="Hiện Spinner đang tải dữ liệu"
            />
          </div>

          <div id="drp-state-invalid">
            <DateRangePicker
              label="Invalid with Error Message"
              config={{ isInvalid: true }}
              errorMessage="Khoảng ngày đã chọn không hợp lệ."
              defaultValue={["15/08/2026", "01/08/2026"]}
            />
          </div>

          <div id="drp-state-helper">
            <DateRangePicker
              label="With Helper Text"
              helperText="Định dạng mặc định: DD/MM/YYYY - DD/MM/YYYY"
              defaultValue={["01/08/2026", "15/08/2026"]}
            />
          </div>
        </div>
      </section>

      {/* 6. LABEL PLACEMENTS */}
      <section id="section-label-placements" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">6. Label Placements (Top, Left, Floating)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {labelPlacements.map((lp) => (
            <DateRangePicker
              key={`label-${lp}`}
              label={`Placement: ${lp}`}
              labelPlacement={lp}
              defaultValue={["01/08/2026", "15/08/2026"]}
            />
          ))}
        </div>
      </section>

      {/* 7. FORMATS & CONFIGURATIONS */}
      <section id="section-formats" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">7. Custom Formats & Separator</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <DateRangePicker
              id="drp-format-us"
              label="US Format (MM/DD/YYYY)"
              format="MM/DD/YYYY"
              config={{ showViewTabs: true }}
              onChange={setUsRange}
            />
            <div className="text-xs font-mono bg-neutral-100 p-2 rounded-md border border-neutral-200">
              <span className="text-neutral-500">Output: </span>
              <span className="font-semibold text-primary-600">
                {usRange ? `["${usRange[0]}", "${usRange[1]}"]` : "null"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <DateRangePicker
              id="drp-format-iso"
              label="ISO Format (YYYY-MM-DD)"
              format="YYYY-MM-DD"
              config={{ showViewTabs: true }}
              onChange={setIsoRange}
            />
            <div className="text-xs font-mono bg-neutral-100 p-2 rounded-md border border-neutral-200">
              <span className="text-neutral-500">Output: </span>
              <span className="font-semibold text-primary-600">
                {isoRange ? `["${isoRange[0]}", "${isoRange[1]}"]` : "null"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <DateRangePicker
              id="drp-format-io"
              label="Format ISO, Display VN"
              format="YYYY-MM-DD"
              displayFormat="DD/MM/YYYY"
              config={{ showViewTabs: true }}
              onChange={(r) => {
                setIoRange(r);
                onRangeIOChange?.(r);
              }}
              helperText="Format: YYYY-MM-DD | Display: DD/MM/YYYY"
            />
            <div id="drp-format-io-result" className="text-xs font-mono bg-primary-50 p-2 rounded-md border border-primary-200">
              <span className="text-primary-700 font-medium">Output Value: </span>
              <span className="font-bold text-primary-900">
                {ioRange ? `["${ioRange[0]}", "${ioRange[1]}"]` : "null"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <DateRangePicker
              id="drp-custom-separator"
              label="Custom Separator ( to )"
              defaultValue={["01/08/2026", "15/08/2026"]}
              separator=" to "
            />
            <div className="text-xs font-mono bg-neutral-100 p-2 rounded-md border border-neutral-200">
              <span className="text-neutral-500">Separator: </span>
              <span className="font-semibold text-neutral-800">&quot; to &quot;</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. STANDALONE 2 MONTHS CALENDAR */}
      <section id="section-standalone-calendar" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">8. Standalone DateRangeCalendar (2 Months Side by Side)</h2>
        </div>

        <div className="border border-neutral-200 rounded-xl p-4 bg-white">
          <DateRangeCalendar
            value={[new Date(2026, 7, 5), new Date(2026, 8, 15)]}
            showWeekNumbers={true}
          />
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// SINGLE MOUNT TEST SUITE FOR VISUAL INSPECTION
// ============================================================================
describe("<DateRangePicker /> Component Showcase", () => {
  it("renders comprehensive DateRangePicker showcase in a single mount and performs interactions", () => {
    const onRangeChangeSpy = cy.spy().as("onRangeChange");
    const onRangeIOChangeSpy = cy.spy().as("onRangeIOChange");
    cy.mount(<DateRangePickerShowcase onRangeChange={onRangeChangeSpy} onRangeIOChange={onRangeIOChangeSpy} />);

    // 1. Verify Header & Layout
    cy.get("h1").should("contain.text", "DateRangePicker Component Showcase");

    // 2. Verify Sizes
    cy.get("#section-sizes input").should("have.length", 5);

    // 3. Verify Variants & Colors Matrix
    cy.get("#section-variants input").should("have.length", 21);

    // 4. Verify Radius
    cy.get("#section-radius input").should("have.length", 6);

    // 5. Verify Form States
    cy.get("#drp-state-required").within(() => {
      cy.contains("label", "Required Field").find("span").should("have.class", "text-error-500");
    });
    cy.get("#drp-state-disabled input").should("be.disabled");
    cy.get("#drp-state-readonly input").should("have.attr", "readonly");
    cy.get("#drp-state-loading").find("svg").should("exist");
    cy.get("#drp-state-invalid").should("contain.text", "Khoảng ngày đã chọn không hợp lệ.");

    // 6. Verify Formats (Input, Display & Output Formats)
    cy.get("#drp-format-us input").should("have.value", "08/01/2026 - 08/15/2026");
    cy.get("#drp-format-iso input").should("have.value", "2026-08-01 - 2026-08-15");
    cy.get("#drp-custom-separator input").should("have.value", "01/08/2026 to 15/08/2026");
    // drp-format-io: Input ISO ["2026-08-05", "2026-08-18"] -> Display VN "05/08/2026 - 18/08/2026"
    cy.get("#drp-format-io input").should("have.value", "05/08/2026 - 18/08/2026");
    // Select days 10 and 25 in drp-format-io: Output emits ISO ["2026-08-10", "2026-08-25"] while Input displays "10/08/2026 - 25/08/2026"
    cy.get("#drp-format-io input").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.contains("button", /^10$/).click();
    cy.contains("button", /^25$/).click();
    cy.get("#drp-format-io input").should("have.value", "10/08/2026 - 25/08/2026");
    cy.get("@onRangeIOChange").should("have.been.calledWith", ["2026-08-10", "2026-08-25"]);

    // 7. Verify Standalone Calendars & showWeekNumbers
    cy.get("#section-standalone-calendar").should("be.visible");
    cy.get("#section-standalone-calendar").within(() => {
      // Check week number header '#'
      cy.contains("[role='columnheader']", "#").should("be.visible");
      // Check week numbers labels (W31, W32, etc.)
      cy.contains("div", /^W\d+$/).should("be.visible");
    });

    // 8. Interactive Testing: Open Popover and select range
    cy.get("#interactive-daterangepicker input").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.contains("button", /^10$/).click();
    cy.contains("button", /^25$/).click();
    cy.get("#interactive-daterangepicker input").should("have.value", "10/08/2026 - 25/08/2026");
    cy.get("@onRangeChange").should("have.been.calledWith", ["10/08/2026", "25/08/2026"]);

    // Clear range using clear button
    cy.get("#interactive-daterangepicker button[aria-label='Clear date range']").click();
    cy.get("#interactive-daterangepicker input").should("have.value", "");
    cy.get("@onRangeChange").should("have.been.calledWith", null);

    // 9. ViewTabs Initial State (Month mode from ["03/2026", "08/2026"])
    cy.get("#interactive-viewtabs-daterangepicker input").should("have.value", "03/2026 - 08/2026");

    // Switch Tab to Ngày and select days
    cy.get("#interactive-viewtabs-daterangepicker input").click();
    cy.contains("button", "Ngày").click();
    cy.contains("button", "Ngày").should("have.attr", "aria-selected", "true");
    cy.contains("button", /^10$/).click();
    cy.contains("button", /^20$/).click();
    cy.get("#interactive-viewtabs-daterangepicker input").should("have.value", "10/03/2026 - 20/03/2026");

    // 10. ViewTabs Interactive Testing: Switch to Tháng & select range
    cy.get("#interactive-viewtabs-daterangepicker input").click();
    cy.contains("button", "Tháng").click();
    cy.contains("button", "Tháng").should("have.attr", "aria-selected", "true");
    cy.contains("button", "Thg 2").click();
    cy.contains("button", "Thg 11").click();
    cy.get("#interactive-viewtabs-daterangepicker input").should("have.value", "02/2026 - 11/2026");
  });
});
