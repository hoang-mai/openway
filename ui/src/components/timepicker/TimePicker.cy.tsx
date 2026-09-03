import React, { useState } from "react";
import {
  TimePicker,
  TimeView,
  TimePickerSize,
  TimePickerColor,
  TimePickerVariant,
  TimePickerRadius,
} from "./index";
import { LabelPlacement } from "../input/types";

// ==========================================
// ALL-IN-ONE SHOWCASE HARNESS COMPONENT
// ==========================================
interface HarnessProps {
  onTimeChange?: (val: string | null) => void;
  onIOChange?: (val: string | null) => void;
  onNoSecondsIOChange?: (val: string | null) => void;
}

const TimePickerShowcase = ({ onTimeChange, onIOChange, onNoSecondsIOChange }: HarnessProps) => {
  // Interactive states
  const [liveTime, setLiveTime] = useState<string | null>("14:30:45");
  const [ioTime, setIoTime] = useState<string | null>("14:30:00");
  const [twelveHourTime, setTwelveHourTime] = useState<string | null>("09:15:00 AM");
  const [noSecondsTime] = useState<string | null>("10:30");
  const [noSecondsIOTime, setNoSecondsIOTime] = useState<string | null>("14:30");
  const [standaloneTime, setStandaloneTime] = useState<Date | null>(new Date(2026, 7, 24, 15, 45, 0));

  const sizes: TimePickerSize[] = ["xs", "sm", "md", "lg", "xl"];
  const colors: TimePickerColor[] = ["primary", "secondary", "neutral", "error", "success", "warning", "info"];
  const variants: TimePickerVariant[] = ["outline", "filled", "ghost"];
  const radii: TimePickerRadius[] = ["none", "sm", "md", "lg", "xl", "full"];
  const labelPlacements: LabelPlacement[] = ["top", "left", "floating"];

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-neutral-50 text-neutral-900 min-h-screen">
      {/* HEADER */}
      <header className="border-b border-neutral-200 pb-5">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          TimePicker Component Showcase
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Toàn bộ kích thước (Sizes), biến thể (Variants), màu sắc (Colors), bo góc (Radius), 12h/24h AM/PM, giây & bước nhảy, trạng thái Form và Standalone TimeView trong 1 lần mount.
        </p>
      </header>

      {/* 1. INTERACTIVE LIVE PLAYGROUND */}
      <section id="section-interactive" className="p-5 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-3">
          <h2 className="text-lg font-bold text-neutral-800">1. Interactive Live Playground</h2>
          <div className="text-xs font-mono bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
            <span className="text-neutral-500">Selected Time: </span>
            <span className="font-semibold text-primary-600">{liveTime || "null"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div id="interactive-timepicker">
            <TimePicker
              label="Standard 24h TimePicker"
              value={liveTime ?? undefined}
              onChange={(val) => {
                setLiveTime(val);
                onTimeChange?.(val);
              }}
              config={{ isClearable: true, isRequired: true }}
              helperText="Định dạng 24h (HH:mm:ss)"
            />
          </div>

          <div id="interactive-12h-timepicker">
            <TimePicker
              label="12h AM/PM TimePicker"
              use12Hours={true}
              format="hh:mm:ss A"
              value={twelveHourTime ?? undefined}
              onChange={(val) => setTwelveHourTime(val)}
              helperText="Có cột chọn AM / PM"
            />
          </div>

          <div id="interactive-standalone-timeview" className="border border-neutral-200 rounded-xl p-3 bg-white">
            <h3 className="text-xs font-semibold text-neutral-500 mb-2 uppercase">Standalone TimeView</h3>
            <TimeView
              value={standaloneTime}
              onChange={(d) => setStandaloneTime(d)}
              showSeconds={true}
              color="primary"
            />
          </div>
        </div>
      </section>

      {/* 2. SIZES SHOWCASE (5 SIZES) */}
      <section id="section-sizes" className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">2. Sizes (5 sizes: xs, sm, md, lg, xl)</h2>
          <p className="text-xs text-neutral-500">5 kích cỡ: xs (h-6), sm (h-8), md (h-10), lg (h-12), xl (h-14)</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
          {sizes.map((s) => (
            <TimePicker
              key={`size-${s}`}
              size={s}
              label={`Size: ${s.toUpperCase()}`}
              placeholder={`Time ${s}`}
              defaultValue="10:15:30"
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
                <TimePicker
                  key={`${v}-${c}`}
                  variant={v}
                  color={c}
                  label={`${c}`}
                  defaultValue="14:30:00"
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
            <TimePicker
              key={`radius-${r}`}
              radius={r}
              label={`Radius: ${r}`}
              defaultValue="14:30:00"
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
          <div id="tp-state-required">
            <TimePicker
              label="Required Field"
              config={{ isRequired: true }}
              placeholder="Select time *"
            />
          </div>

          <div id="tp-state-disabled">
            <TimePicker
              label="Disabled State"
              disabled
              defaultValue="14:30:00"
              helperText="Trường này bị vô hiệu hoá"
            />
          </div>

          <div id="tp-state-readonly">
            <TimePicker
              label="Read-Only State"
              readOnly
              defaultValue="14:30:00"
              helperText="Chỉ xem, không mở popup"
            />
          </div>

          <div id="tp-state-loading">
            <TimePicker
              label="Loading State"
              config={{ isLoading: true, showSpinner: true }}
              defaultValue="14:30:00"
              helperText="Hiện Spinner đang tải dữ liệu"
            />
          </div>

          <div id="tp-state-invalid">
            <TimePicker
              label="Invalid State"
              config={{ isInvalid: true }}
              errorMessage="Thời gian đã chọn không hợp lệ."
              defaultValue="25:00:00"
            />
          </div>

          <div id="tp-state-helper">
            <TimePicker
              label="With Helper Text"
              helperText="Định dạng mặc định: HH:mm:ss"
              defaultValue="14:30:00"
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
            <TimePicker
              key={`label-${lp}`}
              label={`Placement: ${lp}`}
              labelPlacement={lp}
              defaultValue="14:30:00"
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
          <div id="tp-no-seconds">
            <TimePicker
              label="No Seconds (HH:mm)"
              showSeconds={false}
              format="HH:mm"
              value={noSecondsTime}
              helperText="Chỉ chọn Giờ và Phút"
            />
          </div>

          <div id="tp-minute-step">
            <TimePicker
              label="Minute Step 15"
              showSeconds={false}
              minuteStep={15}
              format="HH:mm"
              defaultValue="09:15"
              helperText="Bước nhảy phút: 00, 15, 30, 45"
            />
          </div>

          <div id="tp-format-io">
            <TimePicker
              label="Format 24h, Display 12h"
              value={ioTime}
              format="HH:mm:ss"
              displayFormat="hh:mm:ss A"
              onChange={(val) => {
                setIoTime(val);
                onIOChange?.(val);
              }}
              helperText="Format: HH:mm:ss | Display: hh:mm:ss A"
            />
          </div>

          <div id="tp-format-display-no-seconds">
            <TimePicker
              label="Format HH:mm, Display hh:mm A (No Seconds)"
              value={noSecondsIOTime}
              format="HH:mm"
              displayFormat="hh:mm A"
              showSeconds={false}
              onChange={(val) => {
                setNoSecondsIOTime(val);
                onNoSecondsIOChange?.(val);
              }}
              helperText={`Format: HH:mm (val: "${noSecondsIOTime}") | Display: hh:mm A | No Seconds`}
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
describe("<TimePicker /> Component Showcase", () => {
  it("renders comprehensive TimePicker showcase in a single mount and performs interactions", () => {
    const onTimeChangeSpy = cy.spy().as("onTimeChange");
    const onIOChangeSpy = cy.spy().as("onIOChange");
    const onNoSecondsIOChangeSpy = cy.spy().as("onNoSecondsIOChange");
    cy.mount(
      <TimePickerShowcase
        onTimeChange={onTimeChangeSpy}
        onIOChange={onIOChangeSpy}
        onNoSecondsIOChange={onNoSecondsIOChangeSpy}
      />
    );

    // 1. Verify Header & Layout
    cy.get("h1").should("contain.text", "TimePicker Component Showcase");

    // 2. Verify Sizes
    cy.get("#section-sizes input").should("have.length", 5);

    // 3. Verify Variants & Colors Matrix
    cy.get("#section-variants input").should("have.length", 21);

    // 4. Verify Radius
    cy.get("#section-radius input").should("have.length", 6);

    // 5. Verify Form States
    cy.get("#tp-state-required").within(() => {
      cy.contains("label", "Required Field").find("span").should("have.class", "text-error-500");
    });
    cy.get("#tp-state-disabled input").should("be.disabled");
    cy.get("#tp-state-readonly input").should("have.attr", "readonly");
    cy.get("#tp-state-loading").find("svg").should("exist");
    cy.get("#tp-state-invalid").should("contain.text", "Thời gian đã chọn không hợp lệ.");

    // 6. Verify Formats
    cy.get("#tp-no-seconds input").should("have.value", "10:30");
    cy.get("#tp-format-io input").should("have.value", "02:30:00 PM");
    cy.get("#tp-format-display-no-seconds input").should("have.value", "02:30 PM");

    // 7. Interactive Testing: Open Popover and select time
    cy.get("#interactive-timepicker input").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.contains("li", /^16$/).click();
    cy.contains("li", /^45$/).click();
    cy.get("#interactive-timepicker input").should("have.value", "16:45:45");
    cy.get("@onTimeChange").should("have.been.called");

    // Clear time using clear button
    cy.get("#interactive-timepicker button[aria-label='Clear time']").click();
    cy.get("#interactive-timepicker input").should("have.value", "");

    // 8. 12h AM/PM Selection
    cy.get("#interactive-12h-timepicker input").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.contains("li", /^PM$/).click();
    cy.get("#interactive-12h-timepicker input").should("contain.value", "PM");

    // 9. Format + DisplayFormat + No Seconds Selection
    cy.get("#tp-format-display-no-seconds input").click();
    cy.get('[role="dialog"]').should("be.visible");
    // Verify only 2 columns exist (Hours, Minutes) and NO seconds column
    cy.get('[role="dialog"] ul[aria-label="Hours"]').should("exist");
    cy.get('[role="dialog"] ul[aria-label="Minutes"]').should("exist");
    cy.get('[role="dialog"] ul[aria-label="Seconds"]').should("not.exist");
    // Select 16:45
    cy.get('[role="dialog"] ul[aria-label="Hours"]').contains("li", /^16$/).click();
    cy.get('[role="dialog"] ul[aria-label="Minutes"]').contains("li", /^45$/).click();
    // Display format shows 04:45 PM
    cy.get("#tp-format-display-no-seconds input").should("have.value", "04:45 PM");
    cy.get("@onNoSecondsIOChange").should("have.been.calledWith", "16:45");
  });
});
