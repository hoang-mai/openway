import React, { useState, useEffect } from "react";
import { Badge } from "./index";
import { BadgeColor, BadgeVariant } from "./types";

const ALL_VARIANTS: BadgeVariant[] = ["soft", "filled", "outline", "ghost"];

const SEMANTIC_COLORS: BadgeColor[] = [
  "primary",
  "secondary",
  "error",
  "success",
  "warning",
  "info",
  "neutral",
];

const NOTION_UI_COLORS: BadgeColor[] = [
  "default",
  "gray",
  "brown",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "red",
];

export function BadgeDarkShowcase() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light");
      root.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className={`${isDark ? "dark" : ""} min-h-screen bg-neutral-white text-neutral-900 transition-colors duration-200`}>
      {/* Sticky Header with Prominent Theme Toggle */}
      <header className="sticky top-0 z-50 px-8 py-4 backdrop-blur-md bg-neutral-white/90 border-b border-neutral-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2.5">
            🏷️ Badge / Tag Theme Inspection
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                isDark
                  ? "bg-primary-950/80 text-primary-300 border-primary-800/60"
                  : "bg-primary-50 text-primary-700 border-primary-200"
              }`}
            >
              {isDark ? "🌙 Dark Theme Active" : "☀️ Light Theme Active"}
            </span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Chuyển đổi qua lại giữa Light và Dark để kiểm tra 4 variants × 17 màu sắc.
          </p>
        </div>

        <button
          data-testid="theme-toggle"
          onClick={() => setIsDark(!isDark)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all shadow-md active:scale-95 border ${
            isDark
              ? "bg-neutral-800 hover:bg-neutral-700 text-neutral-white border-neutral-600 ring-2 ring-primary-500/30"
              : "bg-neutral-white hover:bg-neutral-100 text-neutral-900 border-neutral-300 ring-2 ring-primary-500/20"
          }`}
        >
          {isDark ? (
            <>
              <span className="text-base">☀️</span>
              <span>Chuyển sang <strong>Light Theme</strong></span>
            </>
          ) : (
            <>
              <span className="text-base">🌙</span>
              <span>Chuyển sang <strong>Dark Theme</strong></span>
            </>
          )}
        </button>
      </header>

      {/* MATRIX TABLE OF ALL VARIANTS & COLORS */}
      <div className="p-8 space-y-10">
        {ALL_VARIANTS.map((variant) => (
          <div
            key={variant}
            data-testid={`variant-section-${variant}`}
            className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/40"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-200/60">
              <div>
                <h2 className="text-lg font-bold uppercase tracking-wider text-primary-500">
                  Biến thể: {variant}
                </h2>
                <p className="text-xs text-neutral-500">
                  {variant === "soft" && "Nền pastel nhạt, chữ cùng tông, viền mỏng mờ"}
                  {variant === "filled" && "Nền đậm màu, chữ tương phản cao"}
                  {variant === "outline" && "Nền trong suốt, viền nét 1px, chữ cùng tông"}
                  {variant === "ghost" && "Không viền, nền trong suốt, chỉ có chữ"}
                </p>
              </div>
            </div>

            {/* 1. SEMANTIC COLORS */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                1. Semantic Colors (7 màu hệ thống)
              </h3>
              <div className="flex flex-wrap gap-3 items-center">
                {SEMANTIC_COLORS.map((color) => (
                  <Badge
                    key={color}
                    data-testid={`badge-${variant}-${color}`}
                    variant={variant}
                    color={color}
                    size="md"
                    dot
                  >
                    {color}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 2. NOTION UI 10 COLORS */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                2. Notion UI Colors (10 màu danh mục/nhãn)
              </h3>
              <div className="flex flex-wrap gap-3 items-center">
                {NOTION_UI_COLORS.map((color) => (
                  <Badge
                    key={color}
                    data-testid={`badge-${variant}-${color}`}
                    variant={variant}
                    color={color}
                    size="md"
                    dot
                  >
                    {color}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

describe("<BadgeDarkShowcase />", () => {
  beforeEach(() => {
    cy.viewport(1440, 950);
    cy.mount(<BadgeDarkShowcase />);
  });

  it("1. Hiển thị ở Dark Mode ban đầu", () => {
    cy.get("html").should("have.class", "dark");
    cy.contains("Badge / Tag Dark Mode Matrix Inspection").should("be.visible");
  });

  it("2. Kiểm tra tất cả 17 màu của variant 'soft' trong Dark Mode", () => {
    cy.get("[data-testid='variant-section-soft']").within(() => {
      // Semantic colors
      SEMANTIC_COLORS.forEach((color) => {
        cy.get(`[data-testid='badge-soft-${color}']`).should("be.visible").and("contain.text", color);
      });
      // Notion UI colors
      NOTION_UI_COLORS.forEach((color) => {
        cy.get(`[data-testid='badge-soft-${color}']`).should("be.visible").and("contain.text", color);
      });
    });
  });

  it("3. Kiểm tra tất cả 17 màu của variant 'filled' trong Dark Mode", () => {
    cy.get("[data-testid='variant-section-filled']").within(() => {
      SEMANTIC_COLORS.forEach((color) => {
        cy.get(`[data-testid='badge-filled-${color}']`).should("be.visible").and("contain.text", color);
      });
      NOTION_UI_COLORS.forEach((color) => {
        cy.get(`[data-testid='badge-filled-${color}']`).should("be.visible").and("contain.text", color);
      });
    });
  });

  it("4. Kiểm tra tất cả 17 màu của variant 'outline' trong Dark Mode", () => {
    cy.get("[data-testid='variant-section-outline']").within(() => {
      SEMANTIC_COLORS.forEach((color) => {
        cy.get(`[data-testid='badge-outline-${color}']`).should("be.visible").and("contain.text", color);
      });
      NOTION_UI_COLORS.forEach((color) => {
        cy.get(`[data-testid='badge-outline-${color}']`).should("be.visible").and("contain.text", color);
      });
    });
  });

  it("5. Kiểm tra tất cả 17 màu của variant 'ghost' trong Dark Mode", () => {
    cy.get("[data-testid='variant-section-ghost']").within(() => {
      SEMANTIC_COLORS.forEach((color) => {
        cy.get(`[data-testid='badge-ghost-${color}']`).should("be.visible").and("contain.text", color);
      });
      NOTION_UI_COLORS.forEach((color) => {
        cy.get(`[data-testid='badge-ghost-${color}']`).should("be.visible").and("contain.text", color);
      });
    });
  });
});
