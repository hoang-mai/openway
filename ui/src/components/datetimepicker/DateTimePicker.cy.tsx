import { useState } from "react";
import {
  DateTimePicker,
  DateTimePickerSize,
  DateTimePickerColor,
  DateTimePickerVariant,
  DateTimePickerRadius,
} from "./index";
import { LabelPlacement } from "../input/types";

// ============================================================================
// ALL-IN-ONE COMPREHENSIVE SHOWCASE (SINGLE MOUNT FOR VISUAL INSPECTION)
// ============================================================================
const DateTimePickerShowcase = () => {
  const [liveDate, setLiveDate] = useState<string | null>("25/08/2026 14:30:45");

  const sizes: DateTimePickerSize[] = ["xs", "sm", "md", "lg", "xl"];
  const colors: DateTimePickerColor[] = ["primary", "secondary", "neutral", "error", "success", "warning", "info"];
  const variants: DateTimePickerVariant[] = ["outline", "filled", "ghost"];
  const radii: DateTimePickerRadius[] = ["none", "sm", "md", "lg", "xl", "full"];
  const labelPlacements: LabelPlacement[] = ["top", "left", "floating"];

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-neutral-50 text-neutral-900 min-h-screen">
      {/* HEADER */}
      <header className="border-b border-neutral-200 pb-5">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">DateTimePicker Component Showcase</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Toàn bộ các kích thước (Sizes), biến thể (Variants), màu sắc (Colors), bo góc (Radius), trạng thái (States),
          định dạng 12h/24h và bố cục (Layouts) trong cùng 1 màn hình.
        </p>
      </header>

      {/* 1. INTERACTIVE LIVE DEMO BOX */}
      <section className="p-5 bg-neutral-white rounded-xl border border-neutral-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-3">
          <h2 className="text-lg font-bold text-neutral-800">1. Interactive Live Playground</h2>
          <div className="text-xs font-mono bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
            <span className="text-neutral-500">Selected Value: </span>
            <span className="font-semibold text-primary-600">{liveDate || "null"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <DateTimePicker
            id="dtp-live-primary"
            label="Pick Date & Time (Primary - 24h)"
            value={liveDate}
            onChange={(formatted) => setLiveDate(formatted)}
            placeholder="Select date and time..."
            config={{ isClearable: true }}
          />

          <DateTimePicker
            id="dtp-live-secondary"
            label="Pick Date & Time (Secondary - 12h AM/PM)"
            use12Hours
            color="secondary"
            value={liveDate}
            format="DD/MM/YYYY hh:mm:ss A"
            onChange={(formatted) => setLiveDate(formatted)}
            config={{ isClearable: true }}
          />
        </div>
      </section>

      {/* 2. SIZES SHOWCASE (5 SIZES) */}
      <section className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">2. Sizes (5 sizes: xs, sm, md, lg, xl)</h2>
          <p className="text-xs text-neutral-500">
            5 kích cỡ chuẩn hoá: xs (h-6), sm (h-8), md (h-10), lg (h-12), xl (h-14)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
          {sizes.map((s) => (
            <DateTimePicker
              key={`size-${s}`}
              size={s}
              label={`Size: ${s.toUpperCase()}`}
              placeholder={`Size ${s}`}
              defaultValue="25/08/2026 10:30:00"
            />
          ))}
        </div>
      </section>

      {/* 3. VARIANTS & 7 COLORS MATRIX (3 x 7 = 21 PICKERS) */}
      <section className="space-y-8">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">
            3. Variants & Colors Matrix (3 Variants x 7 Colors = 21 Pickers)
          </h2>
          <p className="text-xs text-neutral-500">
            Tất cả biến thể (outline, filled, ghost) kết hợp 7 màu chủ đề với đường viền cố định border-2
          </p>
        </div>

        {variants.map((v) => (
          <div key={`variant-group-${v}`} className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-3 py-1 rounded inline-block">
              Variant: {v}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {colors.map((c) => (
                <DateTimePicker
                  key={`${v}-${c}`}
                  variant={v}
                  color={c}
                  label={`${c}`}
                  defaultValue="25/08/2026 15:45:00"
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 4. RADIUS OPTIONS */}
      <section className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">4. Radius (none, sm, md, lg, xl, full)</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {radii.map((r) => (
            <DateTimePicker
              key={`radius-${r}`}
              radius={r}
              label={`Radius: ${r}`}
              defaultValue="25/08/2026 09:15:00"
            />
          ))}
        </div>
      </section>

      {/* 5. FORM STATES & VALIDATIONS */}
      <section className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">5. Form Field States & Validations</h2>
          <p className="text-xs text-neutral-500">
            Required, Disabled, ReadOnly, Loading (với Spinner & giữ nguyên màu nền), Invalid với ErrorMessage
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <DateTimePicker
            id="dtp-state-required"
            label="Required Field"
            config={{ isRequired: true }}
            placeholder="Select date & time *"
          />

          <DateTimePicker
            id="dtp-state-disabled"
            label="Disabled State"
            disabled
            defaultValue="25/08/2026 08:00:00"
            helperText="Trường này bị vô hiệu hoá"
          />

          <DateTimePicker
            id="dtp-state-readonly"
            label="Read-Only State"
            readOnly
            defaultValue="25/08/2026 12:00:00"
            helperText="Chỉ xem, không mở popup"
          />

          <DateTimePicker
            id="dtp-state-loading"
            label="Loading State (isLoading)"
            config={{ isLoading: true, showSpinner: true, isClearable: true }}
            defaultValue="25/08/2026 14:30:00"
            helperText="Hiện Spinner, màu nền & viền giữ nguyên"
          />

          <DateTimePicker
            id="dtp-state-invalid"
            label="Invalid with Error Message"
            errorMessage="Ngày giờ đã chọn không hợp lệ hoặc đã qua hạn."
            config={{ isInvalid: true }}
            defaultValue="25/08/2026 18:00:00"
          />

          <DateTimePicker
            id="dtp-state-helper"
            label="With Helper Text"
            helperText="Định dạng mặc định: DD/MM/YYYY HH:mm:ss"
            defaultValue="25/08/2026 20:00:00"
          />
        </div>
      </section>

      {/* 6. LABEL PLACEMENTS */}
      <section className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">6. Label Placements (Top, Left, Floating)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {labelPlacements.map((lp) => (
            <DateTimePicker
              key={`label-${lp}`}
              label={`Placement: ${lp}`}
              labelPlacement={lp}
              defaultValue="25/08/2026 16:20:00"
            />
          ))}
        </div>
      </section>

      {/* 7. FORMATS, 12H/24H, SECONDS & STEPS */}
      <section className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">7. Date & Time Formats, 12h/24h & Step Configurations</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <DateTimePicker
            id="dtp-format-24h-seconds"
            label="24h có Giây (HH:mm:ss)"
            defaultValue="25/08/2026 23:45:15"
            format="DD/MM/YYYY HH:mm:ss"
          />

          <DateTimePicker
            id="dtp-format-24h-no-seconds"
            label="24h không Giây (HH:mm)"
            showSeconds={false}
            format="DD/MM/YYYY HH:mm"
            defaultValue="25/08/2026 23:45:00"
          />

          <DateTimePicker
            id="dtp-format-12h"
            label="12-Hour AM/PM"
            use12Hours
            format="DD/MM/YYYY hh:mm:ss A"
            defaultValue="25/08/2026 02:15:30 PM"
          />

          <DateTimePicker
            id="dtp-format-iso"
            label="ISO Format (YYYY-MM-DD)"
            format="YYYY-MM-DD HH:mm:ss"
            defaultValue="2026-08-25 14:15:30"
          />

          <DateTimePicker
            id="dtp-step-15"
            label="Minute Step = 15m, Hour Step = 2h"
            minuteStep={15}
            hourStep={2}
            defaultValue="25/08/2026 10:15:00"
          />

          <DateTimePicker
            id="dtp-close-on-select"
            label="Close On Select = true"
            config={{ closeOnSelect: true }}
            defaultValue="25/08/2026 09:00:00"
          />
        </div>
      </section>

      {/* 8. LAYOUT OPTIONS (SIDE-BY-SIDE VS STACKED) */}
      <section className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">8. Layout Options (Side-by-side vs Stacked)</h2>
          <p className="text-xs text-neutral-500">
            side-by-side (Mặc định) hoặc stacked (Lịch ở trên, Giờ ở dưới cho màn hình hẹp)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DateTimePicker
            id="dtp-layout-side-by-side"
            label="Layout: side-by-side (Default)"
            layout="side-by-side"
            defaultValue="25/08/2026 11:30:00"
          />

          <DateTimePicker
            id="dtp-layout-stacked"
            label="Layout: stacked (Calendar top, TimeView bottom)"
            layout="stacked"
            defaultValue="25/08/2026 11:30:00"
          />
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// COMPONENT TEST SUITE
// ============================================================================
describe("<DateTimePicker /> Component Tests", () => {
  it("renders comprehensive showcase in a single mount", () => {
    cy.mount(<DateTimePickerShowcase />);
  });

  it("handles ISO format (YYYY-MM-DD HH:mm:ss) correctly", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <DateTimePicker
        id="test-iso"
        label="ISO DateTime"
        format="YYYY-MM-DD HH:mm:ss"
        defaultValue="2026-08-25 14:30:00"
        onChange={onChangeSpy}
      />
    );

    // Verify initial input value matches format
    cy.get("#test-iso").should("have.value", "2026-08-25 14:30:00");

    // Open popover by clicking input
    cy.get("#test-iso").click();
    cy.get("#test-iso-popover").should("be.visible");

    // Click on a date (day 26)
    cy.get("#test-iso-popover").contains("button", "26").click();
    cy.get("@onChangeSpy").should("have.been.calledWith", "2026-08-26 14:30:00");
  });

  it("handles 12-hour AM/PM format (DD/MM/YYYY hh:mm:ss A) correctly", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <DateTimePicker
        id="test-12h"
        label="12-Hour DateTime"
        use12Hours
        format="DD/MM/YYYY hh:mm:ss A"
        defaultValue="25/08/2026 02:30:00 PM"
        onChange={onChangeSpy}
      />
    );

    cy.get("#test-12h").should("have.value", "25/08/2026 02:30:00 PM");
  });

  it("handles custom displayFormat differing from data format", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <DateTimePicker
        id="test-custom-display"
        label="Data vs Display"
        format="YYYY-MM-DD HH:mm:ss"
        displayFormat="DD.MM.YYYY - HH:mm"
        defaultValue="2026-08-25 14:30:00"
        onChange={onChangeSpy}
      />
    );

    // Displayed in custom format
    cy.get("#test-custom-display").should("have.value", "25.08.2026 - 14:30");

    // Click to open and pick another day
    cy.get("#test-custom-display").click();
    cy.get("#test-custom-display-popover").contains("button", "28").click();

    // Emitted data format is ISO format
    cy.get("@onChangeSpy").should("have.been.calledWith", "2026-08-28 14:30:00");
    cy.get("#test-custom-display").should("have.value", "28.08.2026 - 14:30");
  });
});

