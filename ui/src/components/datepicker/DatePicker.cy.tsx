import React, { useState } from "react";
import {
  DatePicker,
  Calendar,
  DatePickerSize,
  DatePickerColor,
  DatePickerVariant,
  DatePickerRadius,
} from "./index";
import { LabelPlacement } from "../input/types";

// ============================================================================
// ALL-IN-ONE COMPREHENSIVE SHOWCASE (SINGLE MOUNT FOR VISUAL INSPECTION)
// ============================================================================
interface HarnessProps {
  onDateChange?: (date: string | null) => void;
  onIOChange?: (date: string | null) => void;
  onMonthOnlyChange?: (date: string | null) => void;
}

const DatePickerShowcase = ({ onDateChange, onIOChange, onMonthOnlyChange }: HarnessProps) => {
  const [liveDate, setLiveDate] = useState<string | null>("25/08/2026");
  const [viewTabDate, setViewTabDate] = useState<string | null>("01/08/2026");
  const [monthOnlyDate, setMonthOnlyDate] = useState<string | null>("08/2026");
  const [usDate, setUsDate] = useState<string | null>("08/25/2026");
  const [isoDate, setIsoDate] = useState<string | null>("2026-08-25");
  const [ioDate, setIoDate] = useState<string | null>("2026-08-15");
  const [calendarDate, setCalendarDate] = useState<Date | null>(new Date(2026, 7, 15));
  const [calendarView, setCalendarView] = useState<"days" | "months" | "years">("days");

  const sizes: DatePickerSize[] = ["xs", "sm", "md", "lg", "xl"];
  const colors: DatePickerColor[] = ["primary", "secondary", "neutral", "error", "success", "warning", "info"];
  const variants: DatePickerVariant[] = ["outline", "filled", "ghost"];
  const radii: DatePickerRadius[] = ["none", "sm", "md", "lg", "xl", "full"];
  const labelPlacements: LabelPlacement[] = ["top", "left", "floating"];

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-neutral-50 text-neutral-900 min-h-screen">
      {/* HEADER */}
      <header className="border-b border-neutral-200 pb-5">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          DatePicker Component Showcase
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Toàn bộ các kích thước (Sizes), biến thể (Variants), màu sắc (Colors), bo góc (Radius), trạng thái (States),
          View Tabs (Ngày/Tháng/Năm) và Standalone Calendar trong cùng 1 lần mount.
        </p>
      </header>

      {/* 1. INTERACTIVE LIVE PLAYGROUND */}
      <section id="section-interactive" className="p-5 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-3">
          <h2 className="text-lg font-bold text-neutral-800">1. Interactive Live Playground</h2>
          <div className="text-xs font-mono bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
            <span className="text-neutral-500">Selected Date: </span>
            <span className="font-semibold text-primary-600">{liveDate || "null"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div id="interactive-datepicker">
            <DatePicker
              label="Standard DatePicker"
              value={liveDate}
              onChange={(d) => {
                setLiveDate(d);
                onDateChange?.(d);
              }}
              config={{ isClearable: true, isRequired: true }}
              helperText="Chọn ngày trên lịch hoặc bấm nút xóa"
            />
          </div>

          <div id="interactive-viewtabs-datepicker">
            <DatePicker
              label="DatePicker with View Tabs"
              value={viewTabDate}
              onChange={setViewTabDate}
              defaultView="months"
              config={{ showViewTabs: true, isClearable: true }}
              helperText="Hỗ trợ chọn Ngày, Tháng (MM/YYYY) hoặc Năm (YYYY)"
            />
          </div>

          <div id="interactive-calendar" className="border border-neutral-200 rounded-xl p-3 bg-white">
            <h3 className="text-xs font-semibold text-neutral-500 mb-2 uppercase">Standalone Calendar</h3>
            <Calendar
              value={calendarDate}
              onChange={setCalendarDate}
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
            <DatePicker
              key={`size-${s}`}
              size={s}
              label={`Size: ${s.toUpperCase()}`}
              placeholder={`Size ${s}`}
              defaultValue="25/08/2026"
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
                <DatePicker
                  key={`${v}-${c}`}
                  variant={v}
                  color={c}
                  label={`${c}`}
                  defaultValue="25/08/2026"
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
            <DatePicker
              key={`radius-${r}`}
              radius={r}
              label={`Radius: ${r}`}
              defaultValue="25/08/2026"
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
          <div id="dp-state-required">
            <DatePicker
              label="Required Field"
              config={{ isRequired: true }}
              placeholder="Select date *"
            />
          </div>

          <div id="dp-state-disabled">
            <DatePicker
              label="Disabled State"
              disabled
              defaultValue="25/08/2026"
              helperText="Trường này bị vô hiệu hoá"
            />
          </div>

          <div id="dp-state-readonly">
            <DatePicker
              label="Read-Only State"
              readOnly
              defaultValue="25/08/2026"
              helperText="Chỉ xem, không mở popup"
            />
          </div>

          <div id="dp-state-loading">
            <DatePicker
              label="Loading State (isLoading)"
              config={{ isLoading: true, showSpinner: true }}
              defaultValue="25/08/2026"
              helperText="Hiện Spinner đang tải dữ liệu"
            />
          </div>

          <div id="dp-state-invalid">
            <DatePicker
              label="Invalid with Error Message"
              config={{ isInvalid: true }}
              errorMessage="Ngày đã chọn không hợp lệ hoặc đã qua hạn."
              defaultValue="31/02/2026"
            />
          </div>

          <div id="dp-state-helper">
            <DatePicker
              label="With Helper Text"
              helperText="Định dạng mặc định: DD/MM/YYYY"
              defaultValue="25/08/2026"
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
            <DatePicker
              key={`label-${lp}`}
              label={`Placement: ${lp}`}
              labelPlacement={lp}
              defaultValue="25/08/2026"
            />
          ))}
        </div>
      </section>

      {/* 7. FORMATS & CONFIGURATIONS */}
      <section id="section-formats" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">7. Custom Formats & Locales</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div id="dp-format-us" className="space-y-2">
            <DatePicker
              label="US Format (MM/DD/YYYY)"
              value={usDate}
              format="MM/DD/YYYY"
              config={{ showViewTabs: true }}
              onChange={setUsDate}
            />
            <div className="text-xs font-mono bg-neutral-100 p-2 rounded-md border border-neutral-200">
              <span className="text-neutral-500">Output: </span>
              <span className="font-semibold text-primary-600">{usDate ? `"${usDate}"` : "null"}</span>
            </div>
          </div>

          <div id="dp-format-iso" className="space-y-2">
            <DatePicker
              label="ISO Format (YYYY-MM-DD)"
              value={isoDate}
              format="YYYY-MM-DD"
              config={{ showViewTabs: true }}
              onChange={setIsoDate}
            />
            <div className="text-xs font-mono bg-neutral-100 p-2 rounded-md border border-neutral-200">
              <span className="text-neutral-500">Output: </span>
              <span className="font-semibold text-primary-600">{isoDate ? `"${isoDate}"` : "null"}</span>
            </div>
          </div>

          <div id="dp-format-io" className="space-y-2">
            <DatePicker
              label="Format ISO, Display VN"
              value={ioDate}
              format="YYYY-MM-DD"
              displayFormat="DD/MM/YYYY"
              config={{ showViewTabs: true }}
              onChange={(d) => {
                setIoDate(d);
                onIOChange?.(d);
              }}
              helperText="Format: YYYY-MM-DD | Display: DD/MM/YYYY"
            />
            <div id="dp-format-io-result" className="text-xs font-mono bg-primary-50 p-2 rounded-md border border-primary-200">
              <span className="text-primary-700 font-medium">Output Value: </span>
              <span className="font-bold text-primary-900">{ioDate ? `"${ioDate}"` : "null"}</span>
            </div>
          </div>

          <div id="dp-format-locale-en" className="space-y-2">
            <DatePicker
              label="Default Locale (enUS)"
              defaultValue="25/08/2026"
              config={{ showWeekNumbers: true }}
            />
            <div className="text-xs font-mono bg-neutral-100 p-2 rounded-md border border-neutral-200">
              <span className="text-neutral-500">Locale: </span>
              <span className="font-semibold text-neutral-800">&quot;enUS&quot; (Default via OpenWayProvider)</span>
            </div>
          </div>

          <div id="dp-month-no-tabs" className="space-y-2">
            <DatePicker
              label="Month View Only (No ViewTabs)"
              value={monthOnlyDate}
              defaultView="months"
              format="MM/YYYY"
              config={{ showViewTabs: false, isClearable: true }}
              onChange={(d) => {
                setMonthOnlyDate(d);
                onMonthOnlyChange?.(d);
              }}
              helperText="defaultView='months' | showViewTabs=false | format='MM/YYYY'"
            />
            <div id="dp-month-no-tabs-result" className="text-xs font-mono bg-primary-50 p-2 rounded-md border border-primary-200">
              <span className="text-primary-700 font-medium">Selected Month: </span>
              <span className="font-bold text-primary-900">{monthOnlyDate ? `"${monthOnlyDate}"` : "null"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. STANDALONE CALENDAR 3 VIEWS */}
      <section id="section-standalone-calendar" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">8. Standalone Calendar 3 Views</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-neutral-200 rounded-xl p-4 bg-white">
            <h3 className="text-sm font-semibold mb-2 text-neutral-700">Days View with Week Numbers</h3>
            <Calendar value={new Date(2026, 7, 15)} showWeekNumbers={true} />
          </div>

          <div className="border border-neutral-200 rounded-xl p-4 bg-white">
            <h3 className="text-sm font-semibold mb-2 text-neutral-700">Months View</h3>
            <Calendar value={new Date(2026, 7, 15)} view="months" />
          </div>

          <div className="border border-neutral-200 rounded-xl p-4 bg-white">
            <h3 className="text-sm font-semibold mb-2 text-neutral-700">Years View</h3>
            <Calendar value={new Date(2026, 7, 15)} view="years" />
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// SINGLE MOUNT TEST SUITE FOR VISUAL INSPECTION
// ============================================================================
describe("<DatePicker /> Component Showcase", () => {
  it("renders comprehensive DatePicker showcase in a single mount and performs interactions", () => {
    const onDateChangeSpy = cy.spy().as("onDateChange");
    const onIOChangeSpy = cy.spy().as("onIOChange");
    const onMonthOnlyChangeSpy = cy.spy().as("onMonthOnlyChange");
    cy.mount(
      <DatePickerShowcase
        onDateChange={onDateChangeSpy}
        onIOChange={onIOChangeSpy}
        onMonthOnlyChange={onMonthOnlyChangeSpy}
      />
    );

    // 1. Verify Header & Layout
    cy.get("h1").should("contain.text", "DatePicker Component Showcase");

    // 2. Verify Sizes
    cy.get("#section-sizes input").should("have.length", 5);

    // 3. Verify Variants & Colors Matrix
    cy.get("#section-variants input").should("have.length", 21);

    // 4. Verify Radius
    cy.get("#section-radius input").should("have.length", 6);

    // 5. Verify Form States
    cy.get("#dp-state-required").within(() => {
      cy.contains("label", "Required Field").find("span").should("have.class", "text-error-500");
    });
    cy.get("#dp-state-disabled input").should("be.disabled");
    cy.get("#dp-state-readonly input").should("have.attr", "readonly");
    cy.get("#dp-state-loading").find("svg").should("exist");
    cy.get("#dp-state-invalid").should("contain.text", "Ngày đã chọn không hợp lệ hoặc đã qua hạn.");

    // 6. Verify Formats (Input, Display & Output Formats)
    cy.get("#dp-format-us input").should("have.value", "08/25/2026");
    cy.get("#dp-format-iso input").should("have.value", "2026-08-25");
    // dp-format-io: Input ISO "2026-08-15" -> Display VN "15/08/2026"
    cy.get("#dp-format-io input").should("have.value", "15/08/2026");
    // Select day 28 in dp-format-io: Output emits ISO "2026-08-28" while Input displays "28/08/2026"
    cy.get("#dp-format-io input").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.get('[role="dialog"]').find('button[aria-label="28 Tháng 8 2026"]').click();
    cy.get("#dp-format-io input").should("have.value", "28/08/2026");
    cy.get("@onIOChange").should("have.been.calledWith", "2026-08-28");

    // 7. Verify Standalone Calendars & showWeekNumbers
    cy.get("#section-standalone-calendar").should("be.visible");
    cy.get("#section-standalone-calendar").within(() => {
      // Check week number header '#'
      cy.contains("[role='columnheader']", "#").should("be.visible");
      // Check week numbers labels (W31, W32, etc.)
      cy.contains("div", /^W\d+$/).should("be.visible");
    });

    // 8. Interactive Testing: Open Popover and select date
    cy.get("#interactive-datepicker input").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.get('[role="dialog"]').find('button[aria-label="20 Tháng 8 2026"]').click();
    cy.get("#interactive-datepicker input").should("have.value", "20/08/2026");
    cy.get("@onDateChange").should("have.been.calledWith", "20/08/2026");

    // Clear date using clear button
    cy.get("#interactive-datepicker button[aria-label='Clear date']").click();
    cy.get("#interactive-datepicker input").should("have.value", "");
    cy.get("@onDateChange").should("have.been.calledWith", null);

    // 9. Verify showWeekNumbers in DatePicker popup
    cy.get("#dp-format-locale-en input").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.get('[role="dialog"]').within(() => {
      cy.contains("[role='columnheader']", "#").should("be.visible");
      cy.contains("div", /^W\d+$/).should("be.visible");
    });
    cy.get("body").type("{esc}");

    // 10. ViewTabs Initial State (Month mode from "08/2026")
    cy.get("#interactive-viewtabs-datepicker input").should("have.value", "08/2026");

    // Switch Tab to Ngày and select day
    cy.get("#interactive-viewtabs-datepicker input").click();
    cy.get('[role="dialog"]').contains("button", "Ngày").click();
    cy.get('[role="dialog"]').contains("button", "Ngày").should("have.attr", "aria-selected", "true");
    cy.get('[role="dialog"]').find('button[aria-label="15 Tháng 8 2026"]').click();
    cy.get("#interactive-viewtabs-datepicker input").should("have.value", "15/08/2026");

    // CalendarHeader Drill-down without changing Tab:
    cy.get("#interactive-viewtabs-datepicker input").click();
    cy.get('[role="dialog"]').contains("button", "Ngày").should("have.attr", "aria-selected", "true");
    cy.get('[role="dialog"]').contains("button", /Tháng 8 2026/).click();
    // MonthGrid is now visible, but Tab "Ngày" STILL stays selected!
    cy.get('[role="dialog"]').contains("button", "Thg 5").should("be.visible");
    cy.get('[role="dialog"]').contains("button", "Ngày").should("have.attr", "aria-selected", "true");
    // Click "Thg 5" returns to DayGrid for Tháng 5
    cy.get('[role="dialog"]').contains("button", "Thg 5").click();
    cy.get('[role="dialog"]').contains("button", /^20$/).should("be.visible");
    cy.get('[role="dialog"]').contains("button", "Ngày").should("have.attr", "aria-selected", "true");
    // Click day 20 selects 20/05/2026
    cy.get('[role="dialog"]').find('button[aria-label="20 Tháng 5 2026"]').click();
    cy.get("#interactive-viewtabs-datepicker input").should("have.value", "20/05/2026");

    // 11. ViewTabs Interactive Testing: Explicitly switch Tab to Tháng
    cy.get("#interactive-viewtabs-datepicker input").click();
    cy.get('[role="dialog"]').contains("button", "Tháng").click();
    cy.get('[role="dialog"]').contains("button", "Tháng").should("have.attr", "aria-selected", "true");
    cy.get("#interactive-viewtabs-datepicker input").should("have.value", "05/2026");
    cy.get('[role="dialog"]').contains("button", "Thg 11").click();
    cy.get("#interactive-viewtabs-datepicker input").should("have.value", "11/2026");

    // 12. Month View without ViewTabs Testing (defaultView="months", showViewTabs=false)
    cy.get("#dp-month-no-tabs input").should("have.value", "08/2026");
    cy.get("#dp-month-no-tabs input").click();
    cy.get('[role="dialog"]').should("be.visible");
    // Verify ViewTabs do NOT exist in popover
    cy.get('[role="dialog"] [role="tablist"]').should("not.exist");
    // Verify MonthGrid is directly visible
    cy.get('[role="dialog"]').contains("button", "Thg 11").should("be.visible");
    // Select Month 11
    cy.get('[role="dialog"]').contains("button", "Thg 11").click();
    // Popover auto-closes (closeOnSelect = true) and updates input & callback
    cy.get('[role="dialog"]').should("not.exist");
    cy.get("#dp-month-no-tabs input").should("have.value", "11/2026");
    cy.get("@onMonthOnlyChange").should("have.been.calledWith", "11/2026");
  });
});
