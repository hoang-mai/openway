import React from "react";
import { Skeleton } from "./index";
import { SkeletonRadius, SkeletonVariant } from "./types";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const mount = (props: React.ComponentProps<typeof Skeleton> = {}) => {
  cy.mount(<Skeleton data-testid="skeleton" {...props} />);
};

// ─────────────────────────────────────────────
// 1. Render cơ bản
// ─────────────────────────────────────────────
describe("Skeleton — Render cơ bản", () => {
  it("Render được với props mặc định", () => {
    mount();
    cy.get("[data-testid='skeleton']").should("exist");
  });

  it("Có role='status' và aria-label='Loading...'", () => {
    mount();
    cy.get("[data-testid='skeleton']")
      .should("have.attr", "role", "status")
      .and("have.attr", "aria-label", "Loading...");
  });

  it("Có class màu nền bg-neutral-200 mặc định", () => {
    mount();
    cy.get("[data-testid='skeleton']").should("have.class", "bg-neutral-200");
  });
});

// ─────────────────────────────────────────────
// 2. Variant
// ─────────────────────────────────────────────
describe("Skeleton — Variant", () => {
  it("variant='pulse' → class animate-pulse", () => {
    mount({ variant: "pulse" });
    cy.get("[data-testid='skeleton']").should("have.class", "animate-pulse");
  });

  it("variant='wave' → class skeleton-wave", () => {
    mount({ variant: "wave" });
    cy.get("[data-testid='skeleton']").should("have.class", "skeleton-wave");
  });

  it("variant='none' → không có animation class", () => {
    mount({ variant: "none" });
    cy.get("[data-testid='skeleton']").should("not.have.class", "animate-pulse").and("not.have.class", "skeleton-wave");
  });

  it("Tất cả variants render được không lỗi", () => {
    const variants: SkeletonVariant[] = ["pulse", "wave", "none"];
    variants.forEach((variant) => {
      cy.mount(<Skeleton data-testid={`skeleton-${variant}`} variant={variant} />);
      cy.get(`[data-testid='skeleton-${variant}']`).should("exist");
    });
  });
});

// ─────────────────────────────────────────────
// 3. Shape
// ─────────────────────────────────────────────
describe("Skeleton — Shape", () => {
  it("shape='circle' → class rounded-full, bỏ qua radius prop", () => {
    mount({ shape: "circle", radius: "md", width: 40, height: 40 });
    cy.get("[data-testid='skeleton']").should("have.class", "rounded-full");
  });

  it("shape='rectangle' + radius='none' → rounded-none", () => {
    mount({ shape: "rectangle", radius: "none" });
    cy.get("[data-testid='skeleton']").should("have.class", "rounded-none");
  });

  it("shape='rectangle' + radius='xl' → rounded-xl", () => {
    mount({ shape: "rectangle", radius: "xl" });
    cy.get("[data-testid='skeleton']").should("have.class", "rounded-xl");
  });

  it("shape='rectangle' + radius='full' → rounded-full", () => {
    mount({ shape: "rectangle", radius: "full" });
    cy.get("[data-testid='skeleton']").should("have.class", "rounded-full");
  });
});

// ─────────────────────────────────────────────
// 4. Radius config
// ─────────────────────────────────────────────
describe("Skeleton — Radius", () => {
  const cases: Array<{ radius: SkeletonRadius; expected: string }> = [
    { radius: "none", expected: "rounded-none" },
    { radius: "sm", expected: "rounded-sm" },
    { radius: "md", expected: "rounded-md" },
    { radius: "lg", expected: "rounded-lg" },
    { radius: "xl", expected: "rounded-xl" },
    { radius: "full", expected: "rounded-full" },
  ];

  cases.forEach(({ radius, expected }) => {
    it(`radius='${radius}' → class ${expected}`, () => {
      mount({ radius });
      cy.get("[data-testid='skeleton']").should("have.class", expected);
    });
  });
});

// ─────────────────────────────────────────────
// 5. Width & Height (style)
// ─────────────────────────────────────────────
describe("Skeleton — Width & Height", () => {
  it("width=200, height=40 → style đúng (number)", () => {
    mount({ width: 200, height: 40 });
    cy.get("[data-testid='skeleton']").should("have.css", "width", "200px").and("have.css", "height", "40px");
  });

  it("width='100%' → style width đúng (string)", () => {
    cy.mount(
      <div style={{ width: 400 }}>
        <Skeleton data-testid="skeleton" width="100%" height="1rem" />
      </div>
    );
    cy.get("[data-testid='skeleton']").should("have.css", "width", "400px");
  });

  it("height default = 1rem", () => {
    mount();
    cy.get("[data-testid='skeleton']").should("have.css", "height", "16px"); // 1rem = 16px
  });
});

// ─────────────────────────────────────────────
// 6. Lines (multi-line)
// ─────────────────────────────────────────────
describe("Skeleton — Lines (multi-line)", () => {
  it("lines=1 → render 1 div duy nhất có role='status'", () => {
    mount({ lines: 1 });
    cy.get("[data-testid='skeleton']").should("have.attr", "role", "status");
    // Không có div con (single mode)
    cy.get("[data-testid='skeleton'] > div").should("not.exist");
  });

  it("lines=3 → render wrapper + 3 div con", () => {
    cy.mount(<Skeleton data-testid="skeleton" lines={3} width="200px" height="1rem" />);
    cy.get("[data-testid='skeleton'] > div").should("have.length", 3);
  });

  it("lines=3 → div con cuối cùng có width 60%", () => {
    cy.mount(<Skeleton data-testid="skeleton" lines={3} width="200px" height="1rem" />);
    cy.get("[data-testid='skeleton'] > div")
      .last()
      .should(($el) => {
        const style = $el[0]!.style.width;
        expect(style).to.equal("60%");
      });
  });

  it("lines=3 → wrapper có role='status' và aria-label='Loading...'", () => {
    cy.mount(<Skeleton data-testid="skeleton" lines={3} width="200px" height="1rem" />);
    cy.get("[data-testid='skeleton']")
      .should("have.attr", "role", "status")
      .and("have.attr", "aria-label", "Loading...");
  });

  it("lines=5 → render đúng 5 dòng", () => {
    cy.mount(<Skeleton data-testid="skeleton" lines={5} width="300px" height="0.875rem" />);
    cy.get("[data-testid='skeleton'] > div").should("have.length", 5);
  });

  it("lines=2 → dòng đầu tiên không phải 60%", () => {
    cy.mount(<Skeleton data-testid="skeleton" lines={2} width="200px" height="1rem" />);
    cy.get("[data-testid='skeleton'] > div")
      .first()
      .should(($el) => {
        const style = $el[0]!.style.width;
        expect(style).to.not.equal("60%");
      });
  });
});

// ─────────────────────────────────────────────
// 7. className pass-through
// ─────────────────────────────────────────────
describe("Skeleton — className pass-through", () => {
  it("className tùy thêm được gắn đúng", () => {
    mount({ className: "my-custom-class" });
    cy.get("[data-testid='skeleton']").should("have.class", "my-custom-class");
  });

  it("className tùy thêm không ghi đè class mặc định", () => {
    mount({ className: "my-custom-class" });
    cy.get("[data-testid='skeleton']")
      .should("have.class", "my-custom-class")
      .and("have.class", "bg-neutral-200")
      .and("have.class", "animate-pulse");
  });
});

// ─────────────────────────────────────────────
// 8. Accessibility
// ─────────────────────────────────────────────
describe("Skeleton — Accessibility", () => {
  it("role='status' luôn hiện diện", () => {
    mount();
    cy.get("[data-testid='skeleton']").should("have.attr", "role", "status");
  });

  it("aria-label='Loading...' luôn hiện diện", () => {
    mount();
    cy.get("[data-testid='skeleton']").should("have.attr", "aria-label", "Loading...");
  });

  it("Không focus được (không có tabIndex)", () => {
    mount();
    cy.get("[data-testid='skeleton']").should("not.have.attr", "tabindex");
  });
});

// ─────────────────────────────────────────────
// 9. Mount tổng hợp (All-in-one)
// ─────────────────────────────────────────────
describe("Skeleton — Mount tổng hợp", () => {
  it("Render toàn bộ variants, shapes, sizes và multi-line trong 1 mount", () => {
    cy.mount(
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* ── Variants ── */}
        <section data-testid="section-variants">
          <Skeleton data-testid="s-pulse" variant="pulse" width="80%" height="1rem" />
          <Skeleton data-testid="s-wave" variant="wave" width="80%" height="1rem" style={{ marginTop: 8 }} />
          <Skeleton data-testid="s-none" variant="none" width="80%" height="1rem" style={{ marginTop: 8 }} />
        </section>

        {/* ── Shapes ── */}
        <section data-testid="section-shapes">
          {/* Circle avatar */}
          <Skeleton data-testid="s-circle" shape="circle" width={48} height={48} />
          {/* Rectangle với các radius */}
          <Skeleton
            data-testid="s-rect-none"
            shape="rectangle"
            radius="none"
            width={120}
            height={20}
            style={{ marginTop: 8 }}
          />
          <Skeleton
            data-testid="s-rect-sm"
            shape="rectangle"
            radius="sm"
            width={120}
            height={20}
            style={{ marginTop: 8 }}
          />
          <Skeleton
            data-testid="s-rect-md"
            shape="rectangle"
            radius="md"
            width={120}
            height={20}
            style={{ marginTop: 8 }}
          />
          <Skeleton
            data-testid="s-rect-lg"
            shape="rectangle"
            radius="lg"
            width={120}
            height={20}
            style={{ marginTop: 8 }}
          />
          <Skeleton
            data-testid="s-rect-xl"
            shape="rectangle"
            radius="xl"
            width={120}
            height={20}
            style={{ marginTop: 8 }}
          />
          <Skeleton
            data-testid="s-rect-full"
            shape="rectangle"
            radius="full"
            width={120}
            height={20}
            style={{ marginTop: 8 }}
          />
        </section>

        {/* ── Sizes tự do ── */}
        <section data-testid="section-sizes">
          <Skeleton data-testid="s-xs-bar" width="100%" height="0.5rem" />
          <Skeleton data-testid="s-sm-bar" width="100%" height="0.75rem" style={{ marginTop: 8 }} />
          <Skeleton data-testid="s-md-bar" width="100%" height="1rem" style={{ marginTop: 8 }} />
          <Skeleton data-testid="s-lg-bar" width="100%" height="1.25rem" style={{ marginTop: 8 }} />
          <Skeleton data-testid="s-xl-bar" width="100%" height="1.5rem" style={{ marginTop: 8 }} />
        </section>

        {/* ── Multi-line (đoạn văn) ── */}
        <section data-testid="section-lines">
          <Skeleton data-testid="s-lines-2" lines={2} width="100%" height="0.875rem" gap="0.5rem" />
          <Skeleton
            data-testid="s-lines-3"
            lines={3}
            width="100%"
            height="0.875rem"
            gap="0.5rem"
            style={{ marginTop: 16 }}
          />
          <Skeleton
            data-testid="s-lines-5"
            lines={5}
            width="100%"
            height="0.875rem"
            gap="0.5rem"
            style={{ marginTop: 16 }}
          />
        </section>

        {/* ── Card skeleton (kết hợp) ── */}
        <section data-testid="section-card" style={{ display: "flex", gap: 12 }}>
          <Skeleton data-testid="s-card-avatar" shape="circle" width={48} height={48} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <Skeleton data-testid="s-card-title" width="60%" height="1rem" radius="md" />
            <Skeleton data-testid="s-card-sub" width="40%" height="0.75rem" radius="md" />
          </div>
        </section>
      </div>
    );

    // ── Verify variants ──
    cy.get("[data-testid='s-pulse']").should("have.class", "animate-pulse");
    cy.get("[data-testid='s-wave']").should("have.class", "skeleton-wave");
    cy.get("[data-testid='s-none']").should("not.have.class", "animate-pulse").and("not.have.class", "skeleton-wave");

    // ── Verify shapes ──
    cy.get("[data-testid='s-circle']").should("have.class", "rounded-full");
    cy.get("[data-testid='s-rect-none']").should("have.class", "rounded-none");
    cy.get("[data-testid='s-rect-sm']").should("have.class", "rounded-sm");
    cy.get("[data-testid='s-rect-md']").should("have.class", "rounded-md");
    cy.get("[data-testid='s-rect-lg']").should("have.class", "rounded-lg");
    cy.get("[data-testid='s-rect-xl']").should("have.class", "rounded-xl");
    cy.get("[data-testid='s-rect-full']").should("have.class", "rounded-full");

    // ── Verify size bars ──
    cy.get("[data-testid='s-xs-bar']").should("have.css", "height", "8px");
    cy.get("[data-testid='s-md-bar']").should("have.css", "height", "16px");
    cy.get("[data-testid='s-xl-bar']").should("have.css", "height", "24px");

    // ── Verify multi-line ──
    cy.get("[data-testid='s-lines-2'] > div").should("have.length", 2);
    cy.get("[data-testid='s-lines-3'] > div").should("have.length", 3);
    cy.get("[data-testid='s-lines-5'] > div").should("have.length", 5);

    // Dòng cuối cùng của mỗi multi-line = 60%
    cy.get("[data-testid='s-lines-3'] > div")
      .last()
      .should(($el) => {
        expect($el[0]!.style.width).to.equal("60%");
      });

    // ── Verify card skeleton ──
    cy.get("[data-testid='s-card-avatar']").should("exist").and("have.class", "rounded-full");
    cy.get("[data-testid='s-card-title']").should("exist");
    cy.get("[data-testid='s-card-sub']").should("exist");

    // ── Tất cả đều có role=status ──
    cy.get("[role='status']").should("have.length.at.least", 15);
  });
});
