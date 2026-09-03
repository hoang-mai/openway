import React, { useState } from "react";
import {
  TimeRangePicker,
  TimeRangePickerSize,
  TimeRangePickerColor,
  TimeRangePickerVariant,
  TimeRangePickerRadius,
} from "./index";
import { LabelPlacement } from "../input/types";

// ==========================================
// ALL-IN-ONE SHOWCASE HARNESS COMPONENT
// ==========================================
interface HarnessProps {
  onRangeChange?: (range: [string, string] | null) => void;
  onIOChange?: (range: [string, string] | null) => void;
}

const TimeRangePickerShowcase = ({ onRangeChange, onIOChange }: HarnessProps) => {
  // Interactive states
  const [liveRange, setLiveRange] = useState<[string, string] | null>(["08:30:00", "17:30:00"]);
  const [, setIoRange] = useState<[string, string] | null>(["09:00:00", "18:00:00"]);
  const [twelveHourRange, setTwelveHourRange] = useState<[string, string] | null>(["09:00 AM", "05:00 PM"]);
  const sizes: TimeRangePickerSize[] = ["xs", "sm", "md", "lg", "xl"];
  const colors: TimeRangePickerColor[] = ["primary", "secondary", "neutral", "error", "success", "warning", "info"];
  const variants: TimeRangePickerVariant[] = ["outline", "filled", "ghost"];
  const radii: TimeRangePickerRadius[] = ["none", "sm", "md", "lg", "xl", "full"];
  const labelPlacements: LabelPlacement[] = ["top", "left", "floating"];

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-neutral-50 text-neutral-900 min-h-screen">
      {/* HEADER */}
      <header className="border-b border-neutral-200 pb-5">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          TimeRangePicker Component Showcase
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Toàn bộ kích thước (Sizes), biến thể (Variants), màu sắc (Colors), bo góc (Radius), 12h/24h AM/PM, giây & bước nhảy, trạng thái Form và 2 Panel song song trong 1 lần mount.
        </p>
      </header>

      {/* 1. INTERACTIVE LIVE PLAYGROUND */}
      <section id="section-interactive" className="p-5 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-3">
          <h2 className="text-lg font-bold text-neutral-800">1. Interactive Live Playground</h2>
          <div className="text-xs font-mono bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
            <span className="text-neutral-500">Selected Range: </span>
            <span className="font-semibold text-primary-600">
              {liveRange ? liveRange.join(" - ") : "null"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div id="interactive-timerangepicker">
            <TimeRangePicker
              label="Standard 24h TimeRangePicker"
              value={liveRange ?? undefined}
              onChange={(formatted) => {
                setLiveRange(formatted);
                onRangeChange?.(formatted);
              }}
              config={{ isClearable: true, isRequired: true }}
              helperText="Chọn giờ bắt đầu và giờ kết thúc song song"
            />
          </div>

          <div id="interactive-12h-timerangepicker">
            <TimeRangePicker
              label="12h AM/PM TimeRangePicker"
              use12Hours={true}
              format="hh:mm A"
              value={twelveHourRange ?? undefined}
              onChange={(formatted) => setTwelveHourRange(formatted)}
              helperText="Có cột chọn AM / PM cho cả 2 bên"
            />
          </div>
        </div>
      </section>

      {/* 2. SIZES SHOWCASE (5 SIZES) */}
      <section id="section-sizes" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">2. Sizes (5 sizes: xs, sm, md, lg, xl)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
          {sizes.map((s) => (
            <TimeRangePicker
              key={`size-${s}`}
              size={s}
              label={`Size: ${s.toUpperCase()}`}
              placeholder={`Range ${s}`}
              defaultValue={["08:00:00", "17:00:00"]}
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
        </div>

        {variants.map((v) => (
          <div key={`variant-group-${v}`} className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-3 py-1 rounded inline-block">
              Variant: {v}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {colors.map((c) => (
                <TimeRangePicker
                  key={`${v}-${c}`}
                  variant={v}
                  color={c}
                  label={`${c}`}
                  defaultValue={["08:00:00", "17:00:00"]}
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
            <TimeRangePicker
              key={`radius-${r}`}
              radius={r}
              label={`Radius: ${r}`}
              defaultValue={["08:00:00", "17:00:00"]}
            />
          ))}
        </div>
      </section>

      {/* 5. FORM STATES & VALIDATIONS */}
      <section id="section-form-states" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">5. Form Field States & Validations</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div id="trp-state-required">
            <TimeRangePicker
              label="Required Field"
              config={{ isRequired: true }}
              placeholder="Select time range *"
            />
          </div>

          <div id="trp-state-disabled">
            <TimeRangePicker
              label="Disabled State"
              disabled
              defaultValue={["08:00:00", "17:00:00"]}
              helperText="Trường này bị vô hiệu hoá"
            />
          </div>

          <div id="trp-state-readonly">
            <TimeRangePicker
              label="Read-Only State"
              readOnly
              defaultValue={["08:00:00", "17:00:00"]}
              helperText="Chỉ xem, không mở popup"
            />
          </div>

          <div id="trp-state-loading">
            <TimeRangePicker
              label="Loading State"
              config={{ isLoading: true, showSpinner: true }}
              defaultValue={["08:00:00", "17:00:00"]}
              helperText="Hiện Spinner đang tải dữ liệu"
            />
          </div>

          <div id="trp-state-invalid">
            <TimeRangePicker
              label="Invalid State"
              config={{ isInvalid: true }}
              errorMessage="Khoảng thời gian không hợp lệ."
              defaultValue={["18:00:00", "08:00:00"]}
            />
          </div>

          <div id="trp-state-helper">
            <TimeRangePicker
              label="With Helper Text"
              helperText="Định dạng mặc định: HH:mm:ss - HH:mm:ss"
              defaultValue={["08:00:00", "17:00:00"]}
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
            <TimeRangePicker
              key={`label-${lp}`}
              label={`Placement: ${lp}`}
              labelPlacement={lp}
              defaultValue={["08:00:00", "17:00:00"]}
            />
          ))}
        </div>
      </section>

      {/* 7. FORMATS & CONFIGURATIONS */}
      <section id="section-formats" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">7. Custom Formats & Steps</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div id="trp-no-seconds">
            <TimeRangePicker
              label="No Seconds (HH:mm)"
              showSeconds={false}
              format="HH:mm"
              helperText="Chỉ chọn Giờ và Phút"
            />
          </div>

          <div id="trp-custom-separator">
            <TimeRangePicker
              label="Custom Separator ( to )"
              separator=" to "
              defaultValue={["08:00:00", "17:00:00"]}
            />
          </div>

          <div id="trp-format-io">
            <TimeRangePicker
              label="Format 24h, Display 12h"
              format="HH:mm:ss"
              displayFormat="hh:mm:ss A"
              onChange={(val) => {
                setIoRange(val);
                onIOChange?.(val);
              }}
              helperText="Format: HH:mm:ss | Display: hh:mm:ss A"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// ==========================================
// SINGLE MOUNT TEST SUITE FOR VISUAL INSPECTION
// ==========================================
describe("<TimeRangePicker /> Component Showcase", () => {
  it("renders comprehensive TimeRangePicker showcase in a single mount and performs interactions", () => {
    const onRangeChangeSpy = cy.spy().as("onRangeChange");
    const onIOChangeSpy = cy.spy().as("onIOChange");
    cy.mount(<TimeRangePickerShowcase onRangeChange={onRangeChangeSpy} onIOChange={onIOChangeSpy} />);

    // 1. Verify Header & Layout
    cy.get("h1").should("contain.text", "TimeRangePicker Component Showcase");

    // 2. Verify Sizes
    cy.get("#section-sizes input").should("have.length", 5);

    // 3. Verify Variants & Colors Matrix
    cy.get("#section-variants input").should("have.length", 21);

    // 4. Verify Radius
    cy.get("#section-radius input").should("have.length", 6);

    // 5. Verify Form States
    cy.get("#trp-state-required").within(() => {
      cy.contains("label", "Required Field").find("span").should("have.class", "text-error-500");
    });
    cy.get("#trp-state-disabled input").should("be.disabled");
    cy.get("#trp-state-readonly input").should("have.attr", "readonly");
    cy.get("#trp-state-loading").find("svg").should("exist");
    cy.get("#trp-state-invalid").should("contain.text", "Khoảng thời gian không hợp lệ.");

    // 6. Verify Formats & Custom Separator
    cy.get("#trp-no-seconds input").should("have.value", "08:00 - 16:30");
    cy.get("#trp-custom-separator input").should("have.value", "08:00:00 to 17:00:00");
    cy.get("#trp-format-io input").should("have.value", "09:00:00 AM - 06:00:00 PM");

    // 7. Interactive Testing: Open Popover and select range
    cy.get("#interactive-timerangepicker input").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.contains("div", "Start time").should("be.visible");
    cy.contains("div", "End time").should("be.visible");

    // Select start and end time
    cy.contains("button", "Start time").should("not.exist");
    cy.get('[role="dialog"]').within(() => {
      cy.contains("li", /^10$/).first().click();
      cy.contains("li", /^18$/).last().click();
    });
    cy.get("@onRangeChange").should("have.been.called");

    // Clear range using clear button
    cy.get("#interactive-timerangepicker button[aria-label='Clear time range']").click();
    cy.get("#interactive-timerangepicker input").should("have.value", "");
  });
});
