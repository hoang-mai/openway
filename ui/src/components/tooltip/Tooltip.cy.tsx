import React, { useState } from "react";
import { TooltipSize, TooltipVariant, TooltipColor, TooltipRadius, TooltipPlacement } from "./types";
import { Tooltip } from "./index";
import { Button } from "../button";
import { Modal, ModalContainer, ModalBody } from "../modal";
import { Confirm, ConfirmContainer, ConfirmBody } from "../confirm";

describe("<Tooltip /> Tailwind Component Tests", () => {
  /* ========================================================================
     1. Unit Tests - Basic Hover & Focus Interaction
     ======================================================================== */
  describe("Basic Hover & Focus Interaction", () => {
    it("shows tooltip on trigger hover and hides on mouseleave", () => {
      cy.mount(
        <div style={{ padding: 60 }}>
          <Tooltip content="Tooltip Content Text" delay={0}>
            <button id="trigger-btn">Hover over me</button>
          </Tooltip>
        </div>
      );

      cy.get('[role="tooltip"]').should("not.exist");
      cy.get("#trigger-btn").trigger("mouseenter");
      cy.get('[role="tooltip"]')
        .should("be.visible")
        .and("contain.text", "Tooltip Content Text")
        .then(($tooltip) => {
          cy.get("#trigger-btn").then(($btn) => {
            const btnEl = $btn[0];
            const tooltipEl = $tooltip[0];
            if (btnEl && tooltipEl) {
              const btnRect = btnEl.getBoundingClientRect();
              const tooltipRect = tooltipEl.getBoundingClientRect();
              // Tooltip should be positioned above the button and not stuck at (0,0)
              expect(tooltipRect.top).to.be.greaterThan(0);
              expect(tooltipRect.bottom).to.be.lessThan(btnRect.top + 5);
            }
          });
        });

      cy.get("#trigger-btn").trigger("mouseleave");
      cy.get('[role="tooltip"]').should("not.exist");
    });

    it("shows tooltip on trigger focus and hides on blur (Accessibility)", () => {
      cy.mount(
        <div style={{ padding: 60 }}>
          <Tooltip content="Accessible Focus Hint" delay={0}>
            <button id="focus-btn">Focus me</button>
          </Tooltip>
        </div>
      );

      cy.get('[role="tooltip"]').should("not.exist");
      cy.get("#focus-btn").focus();
      cy.get('[role="tooltip"]').should("be.visible").and("contain.text", "Accessible Focus Hint");

      cy.get("#focus-btn").blur();
      cy.get('[role="tooltip"]').should("not.exist");
    });

    it("does not display tooltip when disabled is true", () => {
      cy.mount(
        <div style={{ padding: 60 }}>
          <Tooltip content="Should not appear" disabled delay={0}>
            <button id="disabled-trigger">Disabled Tooltip</button>
          </Tooltip>
        </div>
      );

      cy.get("#disabled-trigger").trigger("mouseenter");
      cy.get('[role="tooltip"]').should("not.exist");
    });
  });

  /* ========================================================================
     2. Unit Tests - Controlled Mode & DefaultOpen
     ======================================================================== */
  describe("Controlled & DefaultOpen State", () => {
    it("renders initially open with defaultOpen={true}", () => {
      cy.mount(
        <div style={{ padding: 60 }}>
          <Tooltip content="Always open initially" defaultOpen delay={0}>
            <button>Target</button>
          </Tooltip>
        </div>
      );

      cy.get('[role="tooltip"]').should("be.visible").and("contain.text", "Always open initially");
    });

    it("supports fully controlled open state via prop", () => {
      const ControlledWrapper = () => {
        const [open, setOpen] = useState(false);
        return (
          <div style={{ padding: 60 }}>
            <button id="toggle-state" onClick={() => setOpen(!open)}>
              Toggle Tooltip
            </button>
            <Tooltip content="Controlled content" open={open} onOpenChange={setOpen}>
              <span id="target-span">Controlled Target</span>
            </Tooltip>
          </div>
        );
      };

      cy.mount(<ControlledWrapper />);
      cy.get('[role="tooltip"]').should("not.exist");

      cy.get("#toggle-state").click();
      cy.get('[role="tooltip"]').should("be.visible").and("contain.text", "Controlled content");

      cy.get("#toggle-state").click();
      cy.get('[role="tooltip"]').should("not.exist");
    });
  });

  /* ========================================================================
     3. Unit Tests - 5 Sizes (xs, sm, md, lg, xl)
     ======================================================================== */
  describe("Sizes (xs, sm, md, lg, xl)", () => {
    const sizes: TooltipSize[] = ["xs", "sm", "md", "lg", "xl"];

    sizes.forEach((size) => {
      it(`renders size="${size}" with correct styles`, () => {
        cy.mount(
          <div style={{ padding: 60 }}>
            <Tooltip content={`Tooltip Size ${size}`} size={size} defaultOpen delay={0}>
              <button>Button {size}</button>
            </Tooltip>
          </div>
        );

        cy.get('[role="tooltip"]').should("be.visible").and("contain.text", `Tooltip Size ${size}`);
      });
    });
  });

  /* ========================================================================
     4. Unit Tests - 4 Variants & 7 Colors
     ======================================================================== */
  describe("Variants & Colors", () => {
    const variants: TooltipVariant[] = ["filled", "soft", "outline", "other"];
    const colors: TooltipColor[] = ["primary", "secondary", "error", "success", "warning", "info", "neutral"];

    variants.forEach((variant) => {
      it(`renders variant="${variant}" correctly`, () => {
        cy.mount(
          <div style={{ padding: 60 }}>
            <Tooltip
              content={`Variant ${variant}`}
              variant={variant}
              color="primary"
              className={variant === "other" ? "bg-purple-900 text-white" : ""}
              defaultOpen
              delay={0}
            >
              <button>Variant Button</button>
            </Tooltip>
          </div>
        );

        cy.get('[role="tooltip"]').should("be.visible").and("contain.text", `Variant ${variant}`);
      });
    });

    colors.forEach((color) => {
      it(`renders color="${color}" correctly`, () => {
        cy.mount(
          <div style={{ padding: 60 }}>
            <Tooltip content={`Color ${color}`} variant="filled" color={color} defaultOpen delay={0}>
              <button>Color Button</button>
            </Tooltip>
          </div>
        );

        cy.get('[role="tooltip"]').should("be.visible").and("contain.text", `Color ${color}`);
      });
    });
  });

  /* ========================================================================
     5. Unit Tests - Placements & Arrow
     ======================================================================== */
  describe("Placements & Arrow", () => {
    const placements: TooltipPlacement[] = [
      "top",
      "bottom",
      "left",
      "right",
      "top-start",
      "top-end",
      "bottom-start",
      "bottom-end",
    ];

    placements.forEach((placement) => {
      it(`renders placement="${placement}" with data-placement attribute`, () => {
        cy.mount(
          <div
            style={{
              padding: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tooltip content={`Placed ${placement}`} placement={placement} defaultOpen delay={0}>
              <button>Placement Target</button>
            </Tooltip>
          </div>
        );

        cy.get('[role="tooltip"]').should("be.visible").and("have.attr", "data-placement", placement);
      });
    });

    it("renders arrow SVG when hasArrow is true and hides when false", () => {
      cy.mount(
        <div style={{ padding: 60 }}>
          <Tooltip content="With Arrow" hasArrow={true} defaultOpen delay={0}>
            <button>With Arrow</button>
          </Tooltip>
        </div>
      );
      cy.get('[role="tooltip"] svg').should("exist");

      cy.mount(
        <div style={{ padding: 60 }}>
          <Tooltip content="Without Arrow" hasArrow={false} defaultOpen delay={0}>
            <button>Without Arrow</button>
          </Tooltip>
        </div>
      );
      cy.get('[role="tooltip"] svg').should("not.exist");
    });
  });

  /* ========================================================================
     6. Visual Design System Showcase
     ======================================================================== */
  describe("🎨 Tooltip Design System Showcase", () => {
    it("renders comprehensive interactive showcase of all sizes, variants, colors, and placements", () => {
      const sizes: TooltipSize[] = ["xs", "sm", "md", "lg", "xl"];
      const variants: TooltipVariant[] = ["filled", "soft", "outline"];
      const colors: TooltipColor[] = ["neutral", "primary", "secondary", "success", "error", "warning", "info"];
      const radiuses: TooltipRadius[] = ["none", "sm", "md", "lg", "xl", "full"];

      cy.mount(
        <div
          style={{
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "36px",
            fontFamily: "system-ui, -apple-system, sans-serif",
            backgroundColor: "var(--color-neutral-50)",
            minHeight: "100vh",
          }}
        >
          <header>
            <h1
              style={{
                margin: "0 0 8px 0",
                color: "var(--color-neutral-900)",
                fontSize: "24px",
                fontWeight: 700,
              }}
            >
              💬 Tooltip Design System Showcase
            </h1>
            <p
              style={{
                margin: 0,
                color: "var(--color-neutral-500)",
                fontSize: "14px",
              }}
            >
              Floating UI Powered • 5 Sizes (xs, sm, md, lg, xl) • 4 Variants • 7 Colors • 12 Placements
            </p>
          </header>

          {/* Section 1: 5 Sizes */}
          <section
            style={{
              background: "var(--color-neutral-white)",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
                fontWeight: 600,
              }}
            >
              1. 5 Kích thước Tooltip (Sizes: xs, sm, md, lg, xl)
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              {sizes.map((size) => (
                <Tooltip key={size} size={size} content={`Kích thước ${size.toUpperCase()}`} placement="top" delay={0}>
                  <Button size="sm" variant="outline" color="primary">
                    Size {size.toUpperCase()}
                  </Button>
                </Tooltip>
              ))}
            </div>
          </section>

          {/* Section 2: 3 Main Variants across 7 Colors */}
          <section
            style={{
              background: "var(--color-neutral-white)",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
                fontWeight: 600,
              }}
            >
              2. Các biến thể (Filled, Soft, Outline) theo 7 màu chủ đề
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {colors.map((color) => (
                <div
                  key={color}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      width: "90px",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--color-neutral-700)",
                      textTransform: "capitalize",
                    }}
                  >
                    {color}:
                  </span>
                  {variants.map((variant) => (
                    <Tooltip
                      key={variant}
                      variant={variant}
                      color={color}
                      content={`Tooltip ${variant} - ${color}`}
                      placement="top"
                      delay={0}
                    >
                      <Button
                        size="xs"
                        variant={variant === "filled" ? "filled" : "soft"}
                        color={color === "neutral" ? "primary" : color}
                      >
                        {variant.toUpperCase()}
                      </Button>
                    </Tooltip>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Placements */}
          <section
            style={{
              background: "var(--color-neutral-white)",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
                fontWeight: 600,
              }}
            >
              3. Các hướng hiển thị chính (Placements: top, bottom, left, right)
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <Tooltip placement="top" content="Hướng trên (Top)" color="neutral" delay={0}>
                <Button variant="outline">Top</Button>
              </Tooltip>
              <Tooltip placement="bottom" content="Hướng dưới (Bottom)" color="neutral" delay={0}>
                <Button variant="outline">Bottom</Button>
              </Tooltip>
              <Tooltip placement="left" content="Hướng trái (Left)" color="neutral" delay={0}>
                <Button variant="outline">Left</Button>
              </Tooltip>
              <Tooltip placement="right" content="Hướng phải (Right)" color="neutral" delay={0}>
                <Button variant="outline">Right</Button>
              </Tooltip>
            </div>
          </section>

          {/* Section 4: Radius Options */}
          <section
            style={{
              background: "var(--color-neutral-white)",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
                fontWeight: 600,
              }}
            >
              4. Bo góc tùy chỉnh (Radius: none, sm, md, lg, xl, full)
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              {radiuses.map((radius) => (
                <Tooltip key={radius} radius={radius} content={`radius="${radius}"`} delay={0}>
                  <Button size="xs" variant="soft">
                    {radius}
                  </Button>
                </Tooltip>
              ))}
            </div>
          </section>

          {/* Section 5: Variant OTHER (Custom Styling) */}
          <section
            style={{
              background: "var(--color-neutral-white)",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
                fontWeight: 600,
              }}
            >
              5. Variant OTHER (Tự do tùy biến qua className & JSX content)
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <Tooltip
                variant="other"
                className="bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold p-3 shadow-xl rounded-xl"
                hasArrow={false}
                content="✨ Gradient VIP Tooltip"
                delay={0}
              >
                <Button color="secondary">Gradient Tooltip</Button>
              </Tooltip>

              <Tooltip
                variant="other"
                className="bg-slate-900 border border-emerald-400 text-emerald-400 font-mono text-xs p-2 rounded shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                hasArrow={false}
                content="Cyberpunk Terminal 0x88F"
                delay={0}
              >
                <Button color="success">Cyberpunk Neon</Button>
              </Tooltip>
            </div>
          </section>
        </div>
      );

      cy.get("h1").should("be.visible");
      cy.get("button").should("have.length.greaterThan", 10);
    });
  });

  /* ========================================================================
     6. Portal in Modal and Confirm Dialogs
     ======================================================================== */
  describe("Portal in Modal and Confirm Dialogs", () => {
    it("mounts tooltip inside Modal dialog when opened inside Modal", () => {
      cy.mount(
        <ModalContainer open={true} onClose={() => {}}>
          <Modal>
            <ModalBody>
              <Tooltip content="Tooltip inside Modal" delay={0}>
                <button id="modal-tooltip-trigger">Hover Modal Trigger</button>
              </Tooltip>
            </ModalBody>
          </Modal>
        </ModalContainer>
      );

      cy.get("#modal-tooltip-trigger").trigger("mouseenter");
      cy.get('[role="tooltip"]').should("be.visible").and("contain.text", "Tooltip inside Modal");

      // Verify that the tooltip element is inside the <dialog> element (modal portal root)
      cy.get("dialog").find('[role="tooltip"]').should("exist");
    });

    it("mounts tooltip inside Confirm dialog when opened inside Confirm", () => {
      cy.mount(
        <ConfirmContainer open={true} onClose={() => {}}>
          <Confirm>
            <ConfirmBody>
              <Tooltip content="Tooltip inside Confirm" delay={0}>
                <button id="confirm-tooltip-trigger">Hover Confirm Trigger</button>
              </Tooltip>
            </ConfirmBody>
          </Confirm>
        </ConfirmContainer>
      );

      cy.get("#confirm-tooltip-trigger").trigger("mouseenter");
      cy.get('[role="tooltip"]').should("be.visible").and("contain.text", "Tooltip inside Confirm");

      // Verify that the tooltip element is inside the <dialog> element (confirm portal root)
      cy.get("dialog").find('[role="tooltip"]').should("exist");
    });

    it("supports custom portalRoot and portal={false}", () => {
      const CustomContainer = () => {
        const customRootRef = React.useRef<HTMLDivElement>(null);
        return (
          <div>
            <div id="custom-root" ref={customRootRef} />
            <Tooltip content="Custom Portal Root" portalRoot={customRootRef} delay={0}>
              <button id="custom-trigger">Trigger Custom</button>
            </Tooltip>
            <div id="inline-container">
              <Tooltip content="Inline Tooltip" portal={false} delay={0}>
                <button id="inline-trigger">Trigger Inline</button>
              </Tooltip>
            </div>
          </div>
        );
      };

      cy.mount(<CustomContainer />);

      cy.get("#custom-trigger").trigger("mouseenter");
      cy.get("#custom-root").find('[role="tooltip"]').should("be.visible").and("contain.text", "Custom Portal Root");
      cy.get("#custom-trigger").trigger("mouseleave");

      cy.get("#inline-trigger").trigger("mouseenter");
      cy.get("#inline-container").find('[role="tooltip"]').should("be.visible").and("contain.text", "Inline Tooltip");
    });
  });
});
