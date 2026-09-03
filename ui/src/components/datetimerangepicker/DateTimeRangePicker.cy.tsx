import { useState } from "react";
import {
  DateTimeRangePicker,
  DateTimeRangePickerSize,
  DateTimeRangePickerColor,
  DateTimeRangePickerVariant,
  DateTimeRangePickerRadius,
} from "./index";
import { LabelPlacement } from "../input/types";

// ============================================================================
// ALL-IN-ONE COMPREHENSIVE SHOWCASE (SINGLE MOUNT FOR VISUAL INSPECTION)
// ============================================================================
interface HarnessProps {
  onRangeChange?: (range: [string, string] | null) => void;
}

const DateTimeRangePickerShowcase = ({ onRangeChange }: HarnessProps) => {
  const [liveRange, setLiveRange] = useState<[string, string] | null>([
    "25/08/2026 08:00:00",
    "28/08/2026 17:30:00",
  ]);

  const sizes: DateTimeRangePickerSize[] = ["xs", "sm", "md", "lg", "xl"];
  const colors: DateTimeRangePickerColor[] = [
    "primary",
    "secondary",
    "neutral",
    "error",
    "success",
    "warning",
    "info",
  ];
  const variants: DateTimeRangePickerVariant[] = ["outline", "filled", "ghost"];
  const radii: DateTimeRangePickerRadius[] = ["none", "sm", "md", "lg", "xl", "full"];
  const labelPlacements: LabelPlacement[] = ["top", "left", "floating"];

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-neutral-50 text-neutral-900 min-h-screen">
      {/* HEADER */}
      <header className="border-b border-neutral-200 pb-5">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          DateTimeRangePicker Component Showcase
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Toàn bộ các kích thước (Sizes), biến thể (Variants), màu sắc (Colors), bo góc (Radius), trạng thái (States),
          bố cục (Layouts), định dạng 12h/24h và cơ chế Stepped Selection trong cùng 1 lần mount.
        </p>
      </header>

      {/* 1. INTERACTIVE LIVE PLAYGROUND */}
      <section id="section-interactive" className="p-5 bg-neutral-white rounded-xl border border-neutral-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-3">
          <h2 className="text-lg font-bold text-neutral-800">1. Interactive Live Playground</h2>
          <div className="text-xs font-mono bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
            <span className="text-neutral-500">Selected Value: </span>
            <span className="font-semibold text-primary-600">
              {liveRange ? `${liveRange[0]}  ➔  ${liveRange[1]}` : "null"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div id="interactive-dtrp-primary">
            <DateTimeRangePicker
              label="Khoảng thời gian (Primary - 24h có Giây)"
              value={liveRange}
              onChange={(newRange) => {
                setLiveRange(newRange);
                onRangeChange?.(newRange);
              }}
              placeholder="DD/MM/YYYY HH:mm:ss - DD/MM/YYYY HH:mm:ss"
              config={{ isClearable: true }}
              helperText="Nhấn để mở popover chọn ngày & giờ với 2 nút chuyển bước bên dưới"
            />
          </div>

          <div id="interactive-dtrp-secondary">
            <DateTimeRangePicker
              label="Khoảng thời gian (Secondary - 12h AM/PM)"
              use12Hours
              color="secondary"
              value={liveRange}
              format="DD/MM/YYYY hh:mm:ss A"
              onChange={(newRange) => {
                setLiveRange(newRange);
                onRangeChange?.(newRange);
              }}
              config={{ isClearable: true }}
              helperText="Chế độ 12 giờ kèm cột AM / PM"
            />
          </div>

          <div id="interactive-dtrp-separator">
            <DateTimeRangePicker
              label="Tùy biến Ký tự Phân cách (' đến ')"
              separator=" đến "
              color="success"
              startLabel="Bắt đầu"
              endLabel="Kết thúc"
              value={liveRange}
              onChange={(newRange) => {
                setLiveRange(newRange);
                onRangeChange?.(newRange);
              }}
              config={{ isClearable: true }}
            />
          </div>

          <div id="interactive-dtrp-stacked">
            <DateTimeRangePicker
              label="Bố cục Popover Stacked (Dọc)"
              layout="stacked"
              color="info"
              value={liveRange}
              onChange={(newRange) => {
                setLiveRange(newRange);
                onRangeChange?.(newRange);
              }}
              config={{ isClearable: true }}
            />
          </div>
        </div>
      </section>

      {/* 2. SIZES SHOWCASE (5 SIZES) */}
      <section id="section-sizes" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">2. Sizes (5 sizes: xs, sm, md, lg, xl)</h2>
          <p className="text-xs text-neutral-500">
            Kích thước chiều rộng tối thiểu được mở rộng (min-w-72 đến min-w-120) chứa trọn vẹn 2 chuỗi ngày giờ:
          </p>
        </div>

        <div className="flex flex-col gap-4 items-start">
          {sizes.map((s) => (
            <DateTimeRangePicker
              key={`size-${s}`}
              id={`dtrp-size-${s}`}
              size={s}
              label={`Size: ${s.toUpperCase()}`}
              placeholder={`Size ${s}`}
              defaultValue={["25/08/2026 08:00:00", "28/08/2026 17:30:00"]}
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
            Tất cả biến thể (outline, filled, ghost) kết hợp 7 màu chủ đề với đường viền cố định border-2 và WCAG AA compliance
          </p>
        </div>

        {variants.map((v) => (
          <div key={`variant-group-${v}`} className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-3 py-1 rounded inline-block">
              Variant: {v}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {colors.map((c) => (
                <DateTimeRangePicker
                  key={`${v}-${c}`}
                  id={`dtrp-variant-${v}-${c}`}
                  variant={v}
                  color={c}
                  label={`Color: ${c}`}
                  defaultValue={["25/08/2026 08:00:00", "28/08/2026 17:30:00"]}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 4. RADIUS OPTIONS (6 RADII) */}
      <section id="section-radius" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">4. Radius (none, sm, md, lg, xl, full)</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {radii.map((r) => (
            <DateTimeRangePicker
              key={`radius-${r}`}
              id={`dtrp-radius-${r}`}
              radius={r}
              label={`Radius: ${r}`}
              defaultValue={["25/08/2026 08:00:00", "28/08/2026 17:30:00"]}
            />
          ))}
        </div>
      </section>

      {/* 5. FORM FIELD STATES & VALIDATIONS */}
      <section id="section-states" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">5. Form Field States & Validations</h2>
          <p className="text-xs text-neutral-500">
            Required, Disabled, ReadOnly, Loading (với Spinner), Invalid với ErrorMessage, HelperText
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DateTimeRangePicker
            id="dtrp-state-required"
            label="Required Field (*)"
            config={{ isRequired: true }}
            placeholder="Select date & time range *"
          />

          <DateTimeRangePicker
            id="dtrp-state-disabled"
            label="Disabled State"
            disabled
            defaultValue={["25/08/2026 08:00:00", "28/08/2026 17:30:00"]}
            helperText="Trường này bị vô hiệu hoá"
          />

          <DateTimeRangePicker
            id="dtrp-state-readonly"
            label="Read-Only State"
            readOnly
            defaultValue={["25/08/2026 08:00:00", "28/08/2026 17:30:00"]}
            helperText="Chỉ xem, không mở popup"
          />

          <DateTimeRangePicker
            id="dtrp-state-loading"
            label="Loading State"
            config={{ isLoading: true, showSpinner: true, isClearable: true }}
            defaultValue={["25/08/2026 08:00:00", "28/08/2026 17:30:00"]}
            helperText="Hiện Spinner đang tải"
          />

          <DateTimeRangePicker
            id="dtrp-state-invalid"
            label="Invalid with Error Message"
            errorMessage="Thời gian bắt đầu không được lớn hơn thời gian kết thúc."
            config={{ isInvalid: true }}
            defaultValue={["25/08/2026 08:00:00", "28/08/2026 17:30:00"]}
          />

          <DateTimeRangePicker
            id="dtrp-state-helper"
            label="With Helper Text"
            helperText="Định dạng mặc định: DD/MM/YYYY HH:mm:ss"
            defaultValue={["25/08/2026 08:00:00", "28/08/2026 17:30:00"]}
          />

          <DateTimeRangePicker
            id="dtrp-state-non-clearable"
            label="Non-Clearable (isClearable = false)"
            config={{ isClearable: false }}
            defaultValue={["25/08/2026 08:00:00", "28/08/2026 17:30:00"]}
          />

          <DateTimeRangePicker
            id="dtrp-state-fullwidth"
            label="Full Width Container (isFullWidth = true)"
            config={{ isFullWidth: true }}
            defaultValue={["25/08/2026 08:00:00", "28/08/2026 17:30:00"]}
          />
        </div>
      </section>

      {/* 6. LABEL PLACEMENTS */}
      <section id="section-labels" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">6. Label Placements (Top, Left, Floating)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {labelPlacements.map((lp) => (
            <DateTimeRangePicker
              key={`label-${lp}`}
              id={`dtrp-label-${lp}`}
              label={`Placement: ${lp}`}
              labelPlacement={lp}
              defaultValue={["25/08/2026 08:00:00", "28/08/2026 17:30:00"]}
            />
          ))}
        </div>
      </section>

      {/* 7. FORMATS, 12H/24H, SECONDS, SEPARATORS & STEPS */}
      <section id="section-formats" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">
            7. Date & Time Formats, Separators, 12h/24h & Step Configurations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DateTimeRangePicker
            id="dtrp-format-24h-seconds"
            label="24h có Giây (HH:mm:ss)"
            defaultValue={["25/08/2026 08:00:00", "28/08/2026 17:30:45"]}
            format="DD/MM/YYYY HH:mm:ss"
          />

          <DateTimeRangePicker
            id="dtrp-format-24h-no-seconds"
            label="24h không Giây (HH:mm)"
            showSeconds={false}
            format="DD/MM/YYYY HH:mm"
            defaultValue={["25/08/2026 08:00", "28/08/2026 17:30"]}
          />

          <DateTimeRangePicker
            id="dtrp-format-12h"
            label="12-Hour AM/PM"
            use12Hours
            format="DD/MM/YYYY hh:mm:ss A"
            defaultValue={["25/08/2026 08:00:00 AM", "28/08/2026 05:30:00 PM"]}
          />

          <DateTimeRangePicker
            id="dtrp-format-iso"
            label="ISO Format (YYYY-MM-DD HH:mm:ss)"
            format="YYYY-MM-DD HH:mm:ss"
            defaultValue={["2026-08-25 08:00:00", "2026-08-28 17:30:00"]}
          />

          <DateTimeRangePicker
            id="dtrp-format-custom-display"
            label="Data vs Display Format"
            format="YYYY-MM-DD HH:mm:ss"
            displayFormat="DD.MM.YYYY HH:mm"
            defaultValue={["2026-08-25 08:00:00", "2026-08-28 17:30:00"]}
          />

          <DateTimeRangePicker
            id="dtrp-custom-separator-arrow"
            label="Custom Separator (' -> ')"
            separator=" -> "
            defaultValue={["25/08/2026 08:00:00", "28/08/2026 17:30:00"]}
          />

          <DateTimeRangePicker
            id="dtrp-custom-labels-hotel"
            label="Custom Labels (Check-in / Check-out)"
            startLabel="Check-in"
            endLabel="Check-out"
            defaultValue={["25/08/2026 14:00:00", "27/08/2026 12:00:00"]}
          />

          <DateTimeRangePicker
            id="dtrp-step-15"
            label="Minute Step = 15m, Hour Step = 2h"
            minuteStep={15}
            hourStep={2}
            defaultValue={["25/08/2026 08:00:00", "28/08/2026 18:30:00"]}
          />

          <DateTimeRangePicker
            id="dtrp-close-on-select"
            label="Close On Select = true"
            config={{ closeOnSelect: true }}
            defaultValue={["25/08/2026 08:00:00", "28/08/2026 17:30:00"]}
          />
        </div>
      </section>

      {/* 8. LAYOUT OPTIONS (SIDE-BY-SIDE VS STACKED) */}
      <section id="section-layouts" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">8. Layout Options (Side-by-side vs Stacked)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DateTimeRangePicker
            id="dtrp-layout-side-by-side"
            label="Layout: side-by-side (Default)"
            layout="side-by-side"
            defaultValue={["25/08/2026 08:00:00", "28/08/2026 17:30:00"]}
          />

          <DateTimeRangePicker
            id="dtrp-layout-stacked"
            label="Layout: stacked (Calendar top, TimeView bottom)"
            layout="stacked"
            defaultValue={["25/08/2026 08:00:00", "28/08/2026 17:30:00"]}
          />
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// SINGLE MOUNT COMPONENT TEST SUITE
// ============================================================================
describe("<DateTimeRangePicker /> Component Showcase", () => {
  it("renders comprehensive showcase in a single mount and validates interactions", () => {
    const onRangeChange = cy.spy().as("onRangeChange");
    cy.mount(<DateTimeRangePickerShowcase onRangeChange={onRangeChange} />);

    // 1. Validate initial value
    cy.get("#interactive-dtrp-primary input").should(
      "have.value",
      "25/08/2026 08:00:00 - 28/08/2026 17:30:00"
    );

    // 2. Open popover by clicking input
    cy.get("#interactive-dtrp-primary input").click();
    cy.get('[role="dialog"]').should("be.visible");

    // 3. Switch to Step 2 (End time) via bottom button
    cy.get('[role="dialog"]').contains("button", "End time →").click();

    // 4. Switch back to Step 1 (Start time) via bottom button
    cy.get('[role="dialog"]').contains("button", "← Start time").click();

    // 5. Close popover via Apply button
    cy.get('[role="dialog"]').contains("button", "Áp dụng").click();
    cy.get('[role="dialog"]').should("not.exist");

    // 6. Test Clear action on primary picker
    cy.get("#interactive-dtrp-primary button[aria-label='Clear date time range']").click();
    cy.get("#interactive-dtrp-primary input").should("have.value", "");
    cy.get("@onRangeChange").should("have.been.calledWith", null);
  });
});
