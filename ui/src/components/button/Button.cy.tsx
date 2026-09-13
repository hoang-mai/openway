import React from "react";
import { ButtonSize, ButtonVariant, ButtonColor } from "./types";
import { Button, IconButton } from "./index";

const PlusIcon = () => (
  <svg
    data-testid="plus-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    data-testid="arrow-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const HeartIcon = () => (
  <svg
    data-testid="heart-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const TrashIcon = () => (
  <svg
    data-testid="trash-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

describe("<Button /> Tailwind Component Tests", () => {
  /* ========================================================================
     1. Unit Tests - 5 Sizes
     ======================================================================== */
  describe("Sizes (5 sizes: xs, sm, md, lg, xl)", () => {
    const sizes: { size: ButtonSize; height: number }[] = [
      { size: "xs", height: 24 },
      { size: "sm", height: 32 },
      { size: "md", height: 40 },
      { size: "lg", height: 48 },
      { size: "xl", height: 56 },
    ];

    sizes.forEach(({ size, height }) => {
      it(`renders size="${size}" with correct height ${height}px`, () => {
        cy.mount(<Button size={size}>Button {size}</Button>);
        cy.get("button")
          .should("be.visible")
          .then(($btn) => {
            expect($btn.outerHeight()).to.equal(height);
          });
      });
    });
  });

  /* ========================================================================
     2. Unit Tests - Variants (Filled, Soft, Ghost, Text, Outline, Other)
     ======================================================================== */
  describe("Variants (filled, soft, ghost, text, outline, other)", () => {
    const presetVariants: ButtonVariant[] = ["filled", "soft", "ghost", "text", "outline"];

    presetVariants.forEach((variant) => {
      it(`renders variant="${variant}"`, () => {
        cy.mount(<Button variant={variant}>Variant {variant}</Button>);
        cy.get("button").should("be.visible").and("have.text", `Variant ${variant}`);
      });
    });

    it("renders variant='outline' with border", () => {
      cy.mount(
        <Button variant="outline" color="primary">
          Outline
        </Button>
      );
      cy.get("button").should("have.class", "border").and("have.class", "border-primary-300");
    });

    it("renders variant='other' allowing 100% custom styling from outside", () => {
      cy.mount(
        <Button
          variant="other"
          className="bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:opacity-90"
        >
          Custom Gradient Other
        </Button>
      );
      cy.get("button")
        .should("have.class", "bg-gradient-to-r")
        .and("have.class", "from-purple-500")
        .and("have.class", "to-pink-500")
        .and("contain.text", "Custom Gradient Other");
    });
  });

  /* ========================================================================
     3. Unit Tests - 7 Colors: Primary, Secondary, Neutral, Error, Success, Warning, Info
     ======================================================================== */
  describe("Colors (7 colors: primary, secondary, neutral, error, success, warning, info)", () => {
    const colors: ButtonColor[] = ["primary", "secondary", "neutral", "error", "success", "warning", "info"];

    colors.forEach((color) => {
      it(`renders color="${color}" correctly`, () => {
        cy.mount(<Button color={color}>{color.toUpperCase()}</Button>);
        cy.get("button").should("be.visible").and("contain.text", color.toUpperCase());
      });
    });
  });

  /* ========================================================================
     4. Unit Tests - Icons Support & IconButton Component
     ======================================================================== */
  describe("Icons Support & IconButton Component", () => {
    it("renders IconButton component with default rounded-full and aria-label", () => {
      cy.mount(<IconButton color="primary" variant="ghost" icon={<TrashIcon />} aria-label="Delete item" />);
      cy.get('[data-testid="trash-icon"]').should("be.visible");
      cy.get("button").should("have.attr", "aria-label", "Delete item").and("have.class", "rounded-full");
    });

    it("supports radius override on IconButton (e.g. radius='md')", () => {
      cy.mount(
        <IconButton color="secondary" variant="outline" icon={<PlusIcon />} aria-label="Add item" radius="md" />
      );
      cy.get("button").should("have.class", "rounded-md").and("not.have.class", "rounded-full");
    });

    it("renders with leftIcon and rightIcon", () => {
      cy.mount(
        <Button variant="ghost" color="primary" leftIcon={<HeartIcon />} rightIcon={<ArrowRightIcon />}>
          Favorite
        </Button>
      );
      cy.get('[data-testid="heart-icon"]').should("be.visible");
      cy.get('[data-testid="arrow-icon"]').should("be.visible");
      cy.get("button").should("contain.text", "Favorite");
    });
  });

  /* ========================================================================
     5. Unit Tests - States: Disabled, Hover, Focus 700, Loading
     ======================================================================== */
  describe("States: Disabled, Hover, Focus 700, Loading", () => {
    it("handles click events when active without text displacement", () => {
      const onClickSpy = cy.spy().as("onClickSpy");
      cy.mount(<Button onClick={onClickSpy}>Click</Button>);
      cy.get("button").click();
      cy.get("@onClickSpy").should("have.been.calledOnce");
    });

    it("does not trigger click when disabled", () => {
      const onClickSpy = cy.spy().as("onClickSpy");
      cy.mount(
        <Button disabled onClick={onClickSpy}>
          Disabled Button
        </Button>
      );
      cy.get("button").should("be.disabled").and("have.attr", "aria-disabled", "true");
      cy.get("button").click({ force: true });
      cy.get("@onClickSpy").should("not.have.been.called");
    });

    it("handles loading state properly with default showSpinner=false", () => {
      const onClickSpy = cy.spy().as("onClickSpy");
      cy.mount(
        <Button isLoading onClick={onClickSpy}>
          Submit
        </Button>
      );
      cy.get("button").should("be.disabled").and("have.attr", "aria-busy", "true").and("contain.text", "Submit");
      cy.get("button svg").should("not.exist");
      cy.get("button").click({ force: true });
      cy.get("@onClickSpy").should("not.have.been.called");
    });

    it("renders spinner when showSpinner is true and isLoading is true", () => {
      cy.mount(
        <Button isLoading showSpinner>
          Submit
        </Button>
      );
      cy.get("button").should("be.disabled").and("have.attr", "aria-busy", "true").and("contain.text", "Submit");
      cy.get("button svg").should("be.visible");
    });

    it("renders custom loadingText when isLoading is true", () => {
      cy.mount(
        <Button isLoading showSpinner loadingText="Đang xử lý...">
          Submit
        </Button>
      );
      cy.get("button").should("be.disabled").and("contain.text", "Đang xử lý...").and("not.contain.text", "Submit");
      cy.get("button svg").should("be.visible");
    });

    it("supports focus ring shade 700 on primary and secondary buttons", () => {
      cy.mount(
        <div style={{ display: "flex", gap: "16px" }}>
          <Button id="btn-primary" color="primary">
            Primary Focus 700
          </Button>
          <Button id="btn-secondary" color="secondary">
            Secondary Focus 700
          </Button>
        </div>
      );
      cy.get("#btn-primary").focus().should("be.focused").and("have.class", "focus-visible:ring-primary-700");
      cy.get("#btn-secondary").focus().should("be.focused").and("have.class", "focus-visible:ring-secondary-700");
    });

    it("renders fullWidth correctly", () => {
      cy.mount(
        <div style={{ width: "400px" }}>
          <Button isFullWidth>Full Width Button</Button>
        </div>
      );
      cy.get("button").then(($btn) => {
        expect($btn.outerWidth()).to.equal(400);
      });
    });

    it("supports custom radius prop ('none', 'sm', 'md', 'lg', 'xl', 'full')", () => {
      cy.mount(
        <div>
          <Button id="btn-default">Default</Button>
          <Button id="btn-none" radius="none">
            Square
          </Button>
          <Button id="btn-sm" radius="sm">
            Small
          </Button>
          <Button id="btn-md" radius="md">
            Medium
          </Button>
          <Button id="btn-lg" radius="lg">
            Large
          </Button>
          <Button id="btn-xl" radius="xl">
            Extra Large
          </Button>
          <Button id="btn-full" radius="full">
            Full Pill
          </Button>
        </div>
      );
      cy.get("#btn-default").should("have.class", "rounded-lg");
      cy.get("#btn-none").should("have.class", "rounded-none");
      cy.get("#btn-sm").should("have.class", "rounded-sm");
      cy.get("#btn-md").should("have.class", "rounded-md");
      cy.get("#btn-lg").should("have.class", "rounded-lg");
      cy.get("#btn-xl").should("have.class", "rounded-xl");
      cy.get("#btn-full").should("have.class", "rounded-full");
    });
  });

  /* ========================================================================
     6. Visual Showcase / Gallery - Trình diễn toàn bộ trực quan
     ======================================================================== */
  describe("Button Visual Gallery / Showcase", () => {
    it("renders all sizes, variants, 7 colors, and custom other variant", () => {
      const sizes: ButtonSize[] = ["xs", "sm", "md", "lg", "xl"];
      const presetVariants: ButtonVariant[] = ["filled", "soft", "ghost", "text", "outline"];
      const colors: ButtonColor[] = ["primary", "secondary", "neutral", "error", "success", "warning", "info"];

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
              🎨 Button Design System
            </h1>
            <p
              style={{
                margin: 0,
                color: "var(--color-neutral-500)",
                fontSize: "14px",
              }}
            >
              5 sizes, 6 variants (Filled, Soft, Ghost, Text, Outline, Other), 7 Colors (Primary, Secondary, Neutral, Error,
              Success, Warning, Info)
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
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              {sizes.map((size) => (
                <Button key={size} size={size} leftIcon={<PlusIcon />}>
                  Button ({size})
                </Button>
              ))}
            </div>
          </section>

          {/* Section 2: 5 Variants for 7 Colors */}
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
              2. Các biến thể giao diện có sẵn (7 Colors: Primary, Secondary, Neutral, Error, Success, Warning, Info)
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                  {presetVariants.map((variant) => (
                    <Button key={variant} color={color} variant={variant}>
                      {variant.toUpperCase()}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Variant OTHER - Tự do thiết kế bên ngoài */}
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
              3. Variant OTHER (Tự do custom style 100% qua className)
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              {/* Gradient Button */}
              <Button
                variant="other"
                className="bg-linear-to-r from-violet-600 via-purple-600 to-pink-500 text-white shadow-md hover:shadow-lg hover:brightness-110 border-0"
                leftIcon={<HeartIcon />}
              >
                Gradient Custom
              </Button>

              {/* Dark Cyberpunk Button */}
              <Button
                variant="other"
                className="bg-slate-900 text-emerald-400 border border-emerald-500/50 hover:bg-slate-800 hover:border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                rightIcon={<ArrowRightIcon />}
              >
                Cyberpunk Neon
              </Button>

              {/* Minimalist Pill Button */}
              <Button
                variant="other"
                className="bg-amber-100 text-amber-900 border border-amber-300 rounded-full hover:bg-amber-200 px-6"
                leftIcon={<PlusIcon />}
              >
                Pill Custom
              </Button>

              {/* Custom Icon Only */}
              <IconButton
                variant="other"
                icon={<HeartIcon />}
                aria-label="Heart Icon Other"
                className="bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-full border border-rose-200"
              />
            </div>
          </section>

          {/* Section 4: Icon Support */}
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
              4. Icon Support (Icon-Only & Left/Right Icon)
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <IconButton color="primary" variant="filled" icon={<HeartIcon />} aria-label="Primary Filled Heart" />
                <IconButton color="secondary" variant="filled" icon={<PlusIcon />} aria-label="Secondary Filled Plus" />
                <IconButton color="primary" variant="soft" icon={<ArrowRightIcon />} aria-label="Primary Soft Arrow" />
                <IconButton
                  color="secondary"
                  variant="outline"
                  icon={<TrashIcon />}
                  aria-label="Secondary Outline Trash"
                />
                <IconButton color="primary" variant="ghost" icon={<HeartIcon />} aria-label="Primary Ghost Heart" />
              </div>

              {/* Text Button có Icon */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <Button variant="filled" color="primary" leftIcon={<HeartIcon />}>
                  Primary Filled
                </Button>
                <Button variant="soft" color="secondary" leftIcon={<PlusIcon />}>
                  Secondary Soft
                </Button>
                <Button variant="ghost" color="primary" leftIcon={<HeartIcon />} rightIcon={<ArrowRightIcon />}>
                  Primary Ghost Both Icons
                </Button>
                <Button variant="outline" color="secondary" rightIcon={<ArrowRightIcon />}>
                  Secondary Outline
                </Button>
              </div>
            </div>
          </section>

          {/* Section 5: States (Disabled, Loading, FullWidth) */}
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
              5. Trạng thái (Disabled, Loading, FullWidth)
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <Button color="primary" variant="filled">
                  Primary Normal
                </Button>
                <Button color="secondary" variant="filled">
                  Secondary Normal
                </Button>
                <Button color="primary" variant="filled" disabled>
                  Disabled
                </Button>
                <Button color="primary" variant="filled" isLoading>
                  Loading
                </Button>
                <Button color="primary" variant="filled" isLoading loadingText="Đang xử lý...">
                  Submit
                </Button>
                <Button color="secondary" variant="soft" isLoading>
                  Loading Secondary
                </Button>
                <Button color="primary" variant="outline" leftIcon={<HeartIcon />} disabled>
                  Disabled with Icon
                </Button>
              </div>

              <div>
                <Button isFullWidth color="primary" leftIcon={<PlusIcon />} variant="filled">
                  Full Width Primary Button (100% Width)
                </Button>
              </div>
            </div>
          </section>

          {/* Section 6: Custom Radius Options */}
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
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <Button color="primary" variant="filled" radius="none">
                  radius=&quot;none&quot; (0px)
                </Button>
                <Button color="primary" variant="filled" radius="sm">
                  radius=&quot;sm&quot; (2px)
                </Button>
                <Button color="primary" variant="filled" radius="md">
                  radius=&quot;md&quot; (6px)
                </Button>
                <Button color="primary" variant="filled" radius="lg">
                  radius=&quot;lg&quot; (8px)
                </Button>
                <Button color="primary" variant="filled" radius="xl">
                  radius=&quot;xl&quot; (12px)
                </Button>
                <Button color="primary" variant="filled" radius="full">
                  radius=&quot;full&quot; (Pill)
                </Button>
              </div>
            </div>
          </section>
        </div>
      );

      cy.get("h1").should("be.visible");
      cy.get("button").should("have.length.greaterThan", 15);
    });
  });
});
