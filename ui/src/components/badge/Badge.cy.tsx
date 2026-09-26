import React from "react";
import { BadgeSize, BadgeVariant, BadgeColor, BadgeRadius, BadgeUIColor } from "./types";
import { Badge } from "./index";

const CheckIcon = () => (
  <svg
    data-testid="check-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-full"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SparklesIcon = () => (
  <svg
    data-testid="sparkles-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-full"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

const FlameIcon = () => (
  <svg
    data-testid="flame-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-full"
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    data-testid="shield-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-full"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

describe("<Badge /> Tailwind Component Tests", () => {
  /* ========================================================================
     1. Unit Tests - 5 Sizes
     ======================================================================== */
  describe("Sizes (5 sizes: xs, sm, md, lg, xl)", () => {
    const sizes: { size: BadgeSize; height: number }[] = [
      { size: "xs", height: 20 },
      { size: "sm", height: 24 },
      { size: "md", height: 28 },
      { size: "lg", height: 32 },
      { size: "xl", height: 36 },
    ];

    sizes.forEach(({ size, height }) => {
      it(`renders size="${size}" with correct height ${height}px`, () => {
        cy.mount(<Badge size={size}>Badge {size}</Badge>);
        cy.get("span.inline-flex")
          .first()
          .should("be.visible")
          .then(($el) => {
            expect($el.outerHeight()).to.equal(height);
          });
      });
    });
  });

  /* ========================================================================
     2. Unit Tests - Variants (Soft, Filled, Outline, Ghost, Other)
     ======================================================================== */
  describe("Variants (soft, filled, outline, ghost, other)", () => {
    const variants: BadgeVariant[] = ["soft", "filled", "outline", "ghost", "other"];

    variants.forEach((variant) => {
      it(`renders variant="${variant}" correctly`, () => {
        cy.mount(
          <Badge variant={variant} className={variant === "other" ? "bg-fuchsia-600 text-white" : ""}>
            {variant.toUpperCase()}
          </Badge>
        );
        cy.get("span.inline-flex").first().should("be.visible").and("contain.text", variant.toUpperCase());
      });
    });
  });

  /* ========================================================================
     3. Unit Tests - 7 Colors & Soft / Filled Variants
     ======================================================================== */
  describe("Colors & Filled Variant Tests", () => {
    const colors: BadgeColor[] = ["primary", "secondary", "error", "success", "warning", "info", "neutral"];

    colors.forEach((color) => {
      it(`renders soft variant color="${color}" correctly`, () => {
        cy.mount(<Badge color={color}>{color.toUpperCase()}</Badge>);
        cy.get("span.inline-flex").first().should("be.visible").and("contain.text", color.toUpperCase());
      });

      it(`renders filled variant color="${color}" with correct solid background`, () => {
        cy.mount(
          <Badge variant="filled" color={color}>
            FILLED {color.toUpperCase()}
          </Badge>
        );
        cy.get("span.inline-flex")
          .first()
          .should("be.visible")
          .and("contain.text", `FILLED ${color.toUpperCase()}`)
          .and("have.class", "border-transparent");
      });
    });

    it("renders filled badges with distinct classes for primary, warning, and neutral", () => {
      cy.mount(
        <div>
          <Badge id="badge-filled-primary" variant="filled" color="primary">
            Primary Filled
          </Badge>
          <Badge id="badge-filled-warning" variant="filled" color="warning">
            Warning Filled
          </Badge>
          <Badge id="badge-filled-neutral" variant="filled" color="neutral">
            Neutral Filled
          </Badge>
        </div>
      );

      cy.get("#badge-filled-primary").should("have.class", "bg-primary-600").and("have.class", "text-neutral-white");

      cy.get("#badge-filled-warning").should("have.class", "bg-warning-400").and("have.class", "text-neutral-950");

      cy.get("#badge-filled-neutral").should("have.class", "bg-neutral-800").and("have.class", "text-neutral-white");
    });
  });

  /* ========================================================================
     3b. Unit Tests - 10 UI Colors (BadgeUIColor)
     ======================================================================== */
  describe("10 Notion-style UI Colors (BadgeUIColor)", () => {
    const uiColors: BadgeUIColor[] = [
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

    uiColors.forEach((color) => {
      it(`renders soft variant UI color="${color}" correctly`, () => {
        cy.mount(<Badge color={color}>{color.toUpperCase()}</Badge>);
        cy.get("span.inline-flex")
          .first()
          .should("be.visible")
          .and("contain.text", color.toUpperCase())
          .and("have.class", `bg-ui-bg-${color}`)
          .and("have.class", `text-ui-${color}`);
      });

      it(`renders filled variant UI color="${color}" correctly`, () => {
        cy.mount(
          <Badge variant="filled" color={color}>
            FILLED {color.toUpperCase()}
          </Badge>
        );
        cy.get("span.inline-flex")
          .first()
          .should("be.visible")
          .and("contain.text", `FILLED ${color.toUpperCase()}`)
          .and("have.class", `bg-ui-${color}`);
      });

      it(`renders outline variant UI color="${color}" correctly`, () => {
        cy.mount(
          <Badge variant="outline" color={color}>
            OUTLINE {color.toUpperCase()}
          </Badge>
        );
        cy.get("span.inline-flex")
          .first()
          .should("be.visible")
          .and("contain.text", `OUTLINE ${color.toUpperCase()}`)
          .and("have.class", `text-ui-${color}`);
      });

      it(`renders dot with UI color="${color}" correctly`, () => {
        cy.mount(
          <Badge dot color={color}>
            {color}
          </Badge>
        );
        cy.get(`.bg-ui-${color}`).should("exist");
      });
    });
  });

  /* ========================================================================
     4. Unit Tests - Status Dots & Ping
     ======================================================================== */
  describe("Status Dots & Ping", () => {
    it("renders dot indicator when dot is true", () => {
      cy.mount(
        <Badge dot color="success">
          Online
        </Badge>
      );
      cy.get("span").should("contain.text", "Online");
      cy.get(".bg-success-500").should("exist");
    });

    it("renders dotPing with animated ping class when dotPing is true", () => {
      cy.mount(
        <Badge dot dotPing color="error">
          Live
        </Badge>
      );
      cy.get(".animate-pulse").should("exist");
      cy.get("span").should("contain.text", "Live");
    });

    it("renders neutral dot with correct background color", () => {
      cy.mount(
        <Badge dot color="neutral">
          Offline
        </Badge>
      );
      cy.get(".bg-neutral-500").should("exist");
    });

    it("renders neutral dot with ping animation", () => {
      cy.mount(
        <Badge dot dotPing color="neutral">
          Offline
        </Badge>
      );
      cy.get(".bg-neutral-500").should("exist");
      cy.get(".animate-pulse").should("exist");
    });

    it("renders dot for all colors with correct background", () => {
      const colors: BadgeColor[] = ["primary", "secondary", "error", "success", "warning", "info", "neutral"];

      cy.mount(
        <div>
          {colors.map((color) => (
            <Badge key={color} id={`badge-dot-${color}`} dot color={color}>
              {color}
            </Badge>
          ))}
        </div>
      );

      colors.forEach((color) => {
        const expectedClass = `bg-${color}-500`;
        cy.get(`#badge-dot-${color} .${expectedClass}`).should("exist");
      });
    });
  });

  /* ========================================================================
     5. Unit Tests - Icons & Dismissible onDelete
     ======================================================================== */
  describe("Icons & Dismissible onDelete", () => {
    it("renders leftIcon and rightIcon", () => {
      cy.mount(
        <Badge leftIcon={<SparklesIcon />} rightIcon={<CheckIcon />} color="primary">
          Verified
        </Badge>
      );
      cy.get('[data-testid="sparkles-icon"]').should("be.visible");
      cy.get('[data-testid="check-icon"]').should("be.visible");
      cy.get("span").should("contain.text", "Verified");
    });

    it("calls onDelete callback when dismiss button is clicked", () => {
      const onDeleteSpy = cy.spy().as("onDeleteSpy");
      cy.mount(
        <Badge onDelete={onDeleteSpy} color="primary">
          Removable Tag
        </Badge>
      );
      cy.get("button[aria-label='Remove']").should("be.visible").click();
      cy.get("@onDeleteSpy").should("have.been.calledOnce");
    });
  });

  /* ========================================================================
     6. Unit Tests - Interactive Clickable Badge
     ======================================================================== */
  describe("Interactive Clickable Badge", () => {
    it("triggers onClick callback and has interactive cursor pointer", () => {
      const onClickSpy = cy.spy().as("onClickSpy");
      cy.mount(
        <Badge onClick={onClickSpy} color="info">
          Clickable Filter
        </Badge>
      );
      cy.get("span").first().click();
      cy.get("@onClickSpy").should("have.been.calledOnce");
    });
  });

  /* ========================================================================
     7. Visual Design System Showcase
     ======================================================================== */
  describe("🎨 Badge & Chip Design System Showcase", () => {
    it("renders comprehensive showcase of all sizes, variants, colors, and features", () => {
      const sizes: BadgeSize[] = ["xs", "sm", "md", "lg", "xl"];
      const colors: BadgeColor[] = ["primary", "secondary", "success", "error", "warning", "info", "neutral"];
      const variants: BadgeVariant[] = ["soft", "filled", "outline", "ghost"];
      const radiuses: BadgeRadius[] = ["none", "sm", "md", "lg", "xl", "full"];

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
              }}
            >
              🏷️ Badge & Chip Design System
            </h1>
            <p
              style={{
                margin: 0,
                color: "var(--color-neutral-500)",
                fontSize: "14px",
              }}
            >
              5 Sizes (xs, sm, md, lg, xl), 5 Variants (Soft, Filled, Outline, Ghost, Other), 7 Colors, Status Dots &
              Dismissible Chips
            </p>
          </header>

          {/* Section 1: 5 Sizes */}
          <section
            style={{
              background: "var(--color-neutral-white)",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
              }}
            >
              1. 5 Kích thước (Sizes: xs, sm, md, lg, xl)
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {sizes.map((size) => (
                <Badge key={size} size={size} color="primary" leftIcon={<SparklesIcon />}>
                  Badge ({size})
                </Badge>
              ))}
            </div>
          </section>

          {/* Section 2: 4 Variants for 7 Colors */}
          <section
            style={{
              background: "var(--color-neutral-white)",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
              }}
            >
              2. Các biến thể (Variants: Soft, Filled, Outline, Ghost) theo 7 Màu
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
                    <Badge key={variant} color={color} variant={variant}>
                      {variant.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Variant FILLED - Solid High Contrast */}
          <section
            style={{
              background: "var(--color-neutral-white)",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
              }}
            >
              3. Biến thể FILLED (Nền màu đậm, độ tương phản cao)
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <Badge variant="filled" color="primary" leftIcon={<SparklesIcon />}>
                Primary Filled
              </Badge>
              <Badge variant="filled" color="secondary" leftIcon={<ShieldIcon />}>
                Secondary Filled
              </Badge>
              <Badge variant="filled" color="success" leftIcon={<CheckIcon />}>
                Success Filled
              </Badge>
              <Badge variant="filled" color="error" leftIcon={<FlameIcon />}>
                Error Filled
              </Badge>
              <Badge variant="filled" color="warning">
                Warning Filled
              </Badge>
              <Badge variant="filled" color="info" dot dotPing>
                Info Live Stream
              </Badge>
              <Badge variant="filled" color="neutral">
                Neutral Dark
              </Badge>
              <Badge variant="filled" color="primary" onDelete={() => {}}>
                Filled Removable
              </Badge>
            </div>
          </section>

          {/* Section 4: Status Dots & Live Radar Ping */}
          <section
            style={{
              background: "var(--color-neutral-white)",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
              }}
            >
              4. Chấm trạng thái (Status Dots & Radar Ping)
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <Badge dot color="success" variant="soft">
                Online
              </Badge>
              <Badge dot dotPing color="success" variant="soft">
                Live Server
              </Badge>
              <Badge dot dotPing color="error" variant="soft">
                Alert Live
              </Badge>
              <Badge dot color="warning" variant="soft">
                Pending Review
              </Badge>
              <Badge dot color="info" variant="soft">
                Processing
              </Badge>
              <Badge dot color="neutral" variant="soft">
                Offline
              </Badge>
              <Badge dot dotPing color="primary" variant="filled">
                Active Stream
              </Badge>
            </div>
          </section>

          {/* Section 5: Dismissible Chips (onDelete) & Interactive */}
          <section
            style={{
              background: "var(--color-neutral-white)",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
              }}
            >
              5. Dismissible Chips (Có nút xóa / gỡ bỏ) & Interactive
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <Badge color="primary" leftIcon={<FlameIcon />} onDelete={() => {}}>
                React 19
              </Badge>
              <Badge color="secondary" leftIcon={<ShieldIcon />} onDelete={() => {}}>
                TypeScript
              </Badge>
              <Badge color="success" leftIcon={<CheckIcon />} onDelete={() => {}}>
                Tailwind CSS v4
              </Badge>
              <Badge color="info" variant="outline" onDelete={() => {}}>
                Turborepo
              </Badge>
              <Badge color="primary" variant="filled" onClick={() => {}}>
                Clickable Filter Button
              </Badge>
            </div>
          </section>

          {/* Section 6: Custom Radius */}
          <section
            style={{
              background: "var(--color-neutral-white)",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
              }}
            >
              6. Tùy chỉnh bo góc qua prop `radius` (none, sm, md, lg, xl, full)
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {radiuses.map((radius) => (
                <Badge key={radius} color="primary" radius={radius} variant="soft">
                  {`radius="${radius}"`}
                </Badge>
              ))}
            </div>
          </section>

          {/* Section 7: Variant OTHER (Custom tự do) */}
          <section
            style={{
              background: "var(--color-neutral-white)",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
              }}
            >
              7. Variant OTHER (Tự do custom 100% qua className)
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <Badge
                variant="other"
                className="bg-linear-to-r from-violet-600 via-purple-600 to-pink-500 text-white shadow-sm border-0"
                leftIcon={<SparklesIcon />}
              >
                Gradient VIP
              </Badge>
              <Badge
                variant="other"
                className="bg-slate-900 text-emerald-400 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                leftIcon={<FlameIcon />}
              >
                Cyberpunk Neon
              </Badge>
              <Badge variant="other" className="bg-amber-100 text-amber-900 border border-amber-300 font-bold" dot>
                Special Golden
              </Badge>
            </div>
          </section>
        </div>
      );

      cy.get("h1").should("be.visible");
      cy.get("span").should("have.length.greaterThan", 15);
    });
  });
});
