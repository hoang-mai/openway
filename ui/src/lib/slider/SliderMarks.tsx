import React from "react";
import { SliderMark, SliderOrientation, SliderSize } from "./types";
import { sizeConfig } from "./constants";
import { getPercentage } from "./utils";
import { getSafeConfig } from "@/utils/function";

export interface SliderMarksProps {
  marks?: SliderMark[] | boolean;
  min: number;
  max: number;
  step: number;
  orientation: SliderOrientation;
  size: SliderSize;
  markClassName?: string;
}

export function SliderMarks({ marks, min, max, step, orientation, size, markClassName = "" }: SliderMarksProps) {
  if (!marks) return null;

  let markList: SliderMark[] = [];
  if (Array.isArray(marks)) {
    markList = marks;
  } else if (marks === true && step > 0) {
    const totalSteps = Math.floor((max - min) / step);
    if (totalSteps <= 20) {
      for (let i = 0; i <= totalSteps; i++) {
        const val = min + i * step;
        markList.push({ value: val, label: val.toString() });
      }
    }
  }

  if (!markList.length) return null;
  const currentSize = getSafeConfig(size, sizeConfig, "md");

  return (
    <div className={`relative w-full ${orientation === "vertical" ? "h-full" : "mt-2"}`} aria-hidden="true">
      {markList.map((m) => {
        const pct = getPercentage(m.value, min, max);
        return (
          <div
            key={m.value}
            className={`absolute flex items-center justify-center select-none text-neutral-600 ${
              currentSize.markText
            } ${markClassName}`}
            style={
              orientation === "vertical"
                ? {
                    bottom: `${pct}%`,
                    left: "100%",
                    transform: "translateY(50%) translateX(6px)",
                  }
                : { left: `${pct}%`, transform: "translateX(-50%)" }
            }
          >
            {m.label ?? m.value}
          </div>
        );
      })}
    </div>
  );
}

export interface SliderStepDotsProps {
  showSteps?: boolean;
  min: number;
  max: number;
  step: number;
  orientation: SliderOrientation;
  size: SliderSize;
  isRange: boolean;
  currentValues: [number, number];
}

export function SliderStepDots({
  showSteps,
  min,
  max,
  step,
  orientation,
  size,
  isRange,
  currentValues,
}: SliderStepDotsProps) {
  if (!showSteps || step <= 0) return null;
  const totalSteps = Math.floor((max - min) / step);
  if (totalSteps > 100) return null;

  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const dots = [];

  for (let i = 0; i <= totalSteps; i++) {
    const val = min + i * step;
    const pct = getPercentage(val, min, max);
    const isFilled = isRange
      ? val >= (currentValues[0] ?? min) && val <= (currentValues[1] ?? max)
      : val <= (currentValues[0] ?? min);

    dots.push(
      <span
        key={`step-dot-${val}`}
        aria-hidden="true"
        className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-150 ${
          currentSize.stepDot
        } ${isFilled ? "bg-white/80" : "bg-neutral-400/60"}`}
        style={orientation === "vertical" ? { bottom: `${pct}%`, left: "50%" } : { left: `${pct}%`, top: "50%" }}
      />
    );
  }

  return <>{dots}</>;
}
