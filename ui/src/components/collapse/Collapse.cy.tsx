import { useState } from "react";
import {
  Collapse,
  CollapsePanel,
  CollapseHeader,
  CollapseContent,
  Collapsible,
  CollapseSize,
  CollapseVariant,
  CollapseColor,
  CollapseRadius,
  CollapseExpandIconPosition,
} from "./index";
import { Badge } from "../badge";

describe("<Collapse /> Component Tests", () => {
  /* ========================================================================
     1. Unit Tests - 3 Sizes (sm, md, lg)
     ======================================================================== */
  describe("Sizes (sm, md, lg)", () => {
    const sizes: CollapseSize[] = ["sm", "md", "lg"];

    sizes.forEach((size) => {
      it(`renders size="${size}" correctly`, () => {
        cy.mount(
          <Collapse size={size} defaultActiveKey={["1"]}>
            <CollapsePanel value="1" label="Panel 1: Giới thiệu hệ thống" description="Mô tả ngắn gọn về tổng quan nền tảng">
              <p data-testid="content-1">Nội dung chi tiết của panel 1.</p>
            </CollapsePanel>
            <CollapsePanel value="2" label="Panel 2: Hướng dẫn cài đặt">
              <p data-testid="content-2">Nội dung chi tiết của panel 2.</p>
            </CollapsePanel>
          </Collapse>
        );
        cy.contains("Panel 1: Giới thiệu hệ thống").should("be.visible");
        cy.get('[data-testid="content-1"]').should("be.visible");
      });
    });
  });

  /* ========================================================================
     2. Unit Tests - Variants (outlined, filled, ghost, separated, other)
     ======================================================================== */
  describe("Variants", () => {
    const variants: CollapseVariant[] = ["outlined", "filled", "ghost", "separated", "other"];

    variants.forEach((variant) => {
      it(`renders variant="${variant}" correctly`, () => {
        cy.mount(
          <Collapse
            variant={variant}
            defaultActiveKey={["1"]}
            className={variant === "other" ? "border-2 border-purple-500 rounded-xl" : ""}
          >
            <CollapsePanel value="1" label="Panel 1: Giới thiệu hệ thống">
              <p data-testid="content-1">Nội dung chi tiết của panel 1.</p>
            </CollapsePanel>
            <CollapsePanel value="2" label="Panel 2: Hướng dẫn cài đặt">
              <p data-testid="content-2">Nội dung chi tiết của panel 2.</p>
            </CollapsePanel>
          </Collapse>
        );
        cy.contains("Panel 1: Giới thiệu hệ thống").should("be.visible");
        cy.get('[data-testid="content-1"]').should("be.visible");
      });
    });
  });

  /* ========================================================================
     3. Unit Tests - Radii (none, sm, md, lg, xl, full)
     ======================================================================== */
  describe("Radius Options", () => {
    const radii: CollapseRadius[] = ["none", "sm", "md", "lg", "xl", "full"];

    radii.forEach((radius) => {
      it(`renders radius="${radius}" correctly`, () => {
        cy.mount(
          <Collapse radius={radius}>
            <CollapsePanel value="1" label="Panel 1: Giới thiệu hệ thống">
              <p>Nội dung</p>
            </CollapsePanel>
          </Collapse>
        );
        cy.contains("Panel 1: Giới thiệu hệ thống").should("be.visible");
      });
    });
  });

  /* ========================================================================
     4. Unit Tests - Colors (7 Theme Colors)
     ======================================================================== */
  describe("Colors", () => {
    const colors: CollapseColor[] = ["primary", "secondary", "neutral", "error", "success", "warning", "info"];

    colors.forEach((color) => {
      it(`renders color="${color}" with active styles`, () => {
        cy.mount(
          <Collapse color={color} defaultActiveKey={["1"]}>
            <CollapsePanel value="1" label="Panel 1: Giới thiệu hệ thống">
              <p>Nội dung</p>
            </CollapsePanel>
          </Collapse>
        );
        cy.get('button[aria-expanded="true"]').should("contain.text", "Panel 1");
      });
    });
  });

  /* ========================================================================
     5. Accordion vs Multiple Mode
     ======================================================================== */
  describe("Accordion vs Multiple Mode", () => {
    it("supports multiple open panels by default (accordion=false)", () => {
      cy.mount(
        <Collapse defaultActiveKey={["1"]}>
          <CollapsePanel value="1" label="Panel 1: Giới thiệu hệ thống">
            <p data-testid="content-1">Nội dung chi tiết của panel 1.</p>
          </CollapsePanel>
          <CollapsePanel value="2" label="Panel 2: Hướng dẫn cài đặt">
            <p data-testid="content-2">Nội dung chi tiết của panel 2.</p>
          </CollapsePanel>
          <CollapsePanel value="3" label="Panel 3: Các câu hỏi thường gặp">
            <p data-testid="content-3">Nội dung chi tiết của panel 3.</p>
          </CollapsePanel>
        </Collapse>
      );

      cy.get('[data-testid="content-1"]').should("be.visible");

      // Click panel 2 -> both 1 and 2 should be open
      cy.contains("Panel 2: Hướng dẫn cài đặt").click();
      cy.get('[data-testid="content-1"]').should("be.visible");
      cy.get('[data-testid="content-2"]').should("be.visible");

      // Click panel 1 -> closes 1, 2 stays open
      cy.contains("Panel 1: Giới thiệu hệ thống").click();
      cy.get('[data-state="closed"]').contains("Nội dung chi tiết của panel 1.").should("not.be.visible");
      cy.get('[data-testid="content-2"]').should("be.visible");
    });

    it("supports accordion mode (accordion=true) where only one panel is open at a time", () => {
      cy.mount(
        <Collapse accordion defaultActiveKey="1">
          <CollapsePanel value="1" label="Panel 1: Giới thiệu hệ thống">
            <p data-testid="content-1">Nội dung chi tiết của panel 1.</p>
          </CollapsePanel>
          <CollapsePanel value="2" label="Panel 2: Hướng dẫn cài đặt">
            <p data-testid="content-2">Nội dung chi tiết của panel 2.</p>
          </CollapsePanel>
          <CollapsePanel value="3" label="Panel 3: Các câu hỏi thường gặp">
            <p data-testid="content-3">Nội dung chi tiết của panel 3.</p>
          </CollapsePanel>
        </Collapse>
      );

      cy.get('[data-testid="content-1"]').should("be.visible");

      // Click panel 2 -> panel 2 opens, panel 1 automatically closes
      cy.contains("Panel 2: Hướng dẫn cài đặt").click();
      cy.get('[data-testid="content-2"]').should("be.visible");
      cy.get('button[aria-expanded="false"]').should("contain.text", "Panel 1");

      // Click panel 2 again -> closes panel 2 (all closed)
      cy.contains("Panel 2: Hướng dẫn cài đặt").click();
      cy.get('button[aria-expanded="false"]').should("have.length", 3);
    });
  });

  /* ========================================================================
     6. Controlled Mode
     ======================================================================== */
  describe("Controlled Mode", () => {
    it("handles controlled state with activeKey and onChange", () => {
      function ControlledTest() {
        const [active, setActive] = useState<string | number | (string | number)[]>(["1"]);
        return (
          <div>
            <button data-testid="open-all-btn" onClick={() => setActive(["1", "2"])}>
              Open All
            </button>
            <Collapse activeKey={active} onChange={setActive}>
              <CollapsePanel value="1" label="Item 1">
                <p data-testid="controlled-content-1">Content 1</p>
              </CollapsePanel>
              <CollapsePanel value="2" label="Item 2">
                <p data-testid="controlled-content-2">Content 2</p>
              </CollapsePanel>
            </Collapse>
          </div>
        );
      }

      cy.mount(<ControlledTest />);
      cy.get('[data-testid="controlled-content-1"]').should("be.visible");
      cy.get('[data-testid="controlled-content-2"]').should("not.be.visible");

      cy.get('[data-testid="open-all-btn"]').click();
      cy.get('[data-testid="controlled-content-1"]').should("be.visible");
      cy.get('[data-testid="controlled-content-2"]').should("be.visible");
    });
  });

  /* ========================================================================
     7. Disabled Items & Extra Action Propagation
     ======================================================================== */
  describe("Disabled Items & Extra Slot", () => {
    it("prevents interaction when item is disabled", () => {
      cy.mount(
        <Collapse>
          <CollapsePanel value="1" label="Normal Panel">
            <p>Normal content</p>
          </CollapsePanel>
          <CollapsePanel value="2" label="Disabled Panel" disabled>
            <p data-testid="disabled-content">Disabled content</p>
          </CollapsePanel>
        </Collapse>
      );

      cy.contains("Disabled Panel").should("be.disabled");
      cy.contains("Disabled Panel").click({ force: true });
      cy.get('[data-testid="disabled-content"]').should("not.be.visible");
    });

    it("handles click on extra slot without triggering collapse toggle", () => {
      const extraClickStub = cy.stub().as("extraClick");

      cy.mount(
        <Collapse>
          <CollapsePanel
            value="1"
            label="Panel with Action"
            extra={
              <button
                type="button"
                data-testid="extra-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  extraClickStub();
                }}
              >
                Action Button
              </button>
            }
          >
            <p data-testid="panel-content">Panel Content</p>
          </CollapsePanel>
        </Collapse>
      );
      cy.get('[data-testid="panel-content"]').should("not.be.visible");

      // Click extra button
      cy.get('[data-testid="extra-action-btn"]').click();
      cy.get("@extraClick").should("have.been.calledOnce");
      // Panel should remain closed
      cy.get('[data-testid="panel-content"]').should("not.be.visible");

      // Click header title -> panel opens
      cy.contains("Panel with Action").click();
      cy.get('[data-testid="panel-content"]').should("be.visible");
    });
  });

  /* ========================================================================
     8. Custom Icons, Positions & Slots
     ======================================================================== */
  describe("Icons, Slots & Customization", () => {
    it("renders startIcon and description", () => {
      cy.mount(
        <Collapse defaultActiveKey={["1"]}>
          <CollapsePanel
            value="1"
            label="Icon Panel"
            description="Subtitle explanation text"
            startIcon={<span data-testid="start-icon">📁</span>}
          >
            <p>Content with icon</p>
          </CollapsePanel>
        </Collapse>
      );
      cy.get('[data-testid="start-icon"]').should("be.visible");
      cy.contains("Subtitle explanation text").should("be.visible");
    });

    it("renders expandIconPosition left, right and none", () => {
      const positions: CollapseExpandIconPosition[] = ["left", "right", "none"];

      positions.forEach((pos) => {
        cy.mount(
          <Collapse expandIconPosition={pos}>
            <CollapsePanel value="1" label="Panel 1">
              <p>Content</p>
            </CollapsePanel>
          </Collapse>
        );
        if (pos === "none") {
          cy.get("svg").should("not.exist");
        } else {
          cy.get("svg").should("exist");
        }
      });
    });

    it("supports custom expandIcon function", () => {
      cy.mount(
        <Collapse
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => <span data-testid="custom-chevron">{isActive ? "▲" : "▼"}</span>}
        >
          <CollapsePanel value="1" label="Panel 1">
            <p>Content</p>
          </CollapsePanel>
        </Collapse>
      );

      cy.get('[data-testid="custom-chevron"]').first().should("contain.text", "▲");
    });

    it("supports destroyInactivePanel", () => {
      cy.mount(
        <Collapse>
          <CollapsePanel value="1" label="Destroy Panel" destroyInactivePanel>
            <div data-testid="destroy-target">Destroyed when closed</div>
          </CollapsePanel>
        </Collapse>
      );
      cy.get('[data-testid="destroy-target"]').should("not.exist");

      cy.contains("Destroy Panel").click();
      cy.get('[data-testid="destroy-target"]').should("exist");

      cy.contains("Destroy Panel").click();
      cy.get('[data-testid="destroy-target"]').should("not.exist");
    });
  });

  /* ========================================================================
     9. Granular Subcomponents (<CollapseHeader> & <CollapseContent>)
     ======================================================================== */
  describe("Subcomponents Composition", () => {
    it("renders using explicit <CollapseHeader> and <CollapseContent>", () => {
      cy.mount(
        <Collapse defaultActiveKey={["custom-1"]}>
          <CollapsePanel value="custom-1">
            <CollapseHeader
              startIcon={<span data-testid="sub-icon">⭐</span>}
              extra={<span data-testid="sub-badge">PRO</span>}
            >
              Custom Header Title
            </CollapseHeader>
            <CollapseContent>
              <p data-testid="sub-content">Custom Content Body</p>
            </CollapseContent>
          </CollapsePanel>
        </Collapse>
      );

      cy.get('[data-testid="sub-icon"]').should("be.visible");
      cy.get('[data-testid="sub-badge"]').should("be.visible");
      cy.contains("Custom Header Title").should("be.visible");
      cy.get('[data-testid="sub-content"]').should("be.visible");
    });
  });

  /* ========================================================================
     10. Standalone <Collapsible /> Component
     ======================================================================== */
  describe("Standalone <Collapsible />", () => {
    it("renders standalone collapsible with defaultOpen", () => {
      cy.mount(
        <Collapsible defaultOpen>
          <div data-testid="collapsible-box" className="p-4 bg-primary-100">
            Standalone Content
          </div>
        </Collapsible>
      );
      cy.get('[data-state="open"]').should("exist");
      cy.get('[data-testid="collapsible-box"]').should("be.visible");
    });
  });

  /* ========================================================================
     11. Ref Forwarding & Accessibility
     ======================================================================== */
  describe("Ref Forwarding & Accessibility", () => {
    it("forwards ref to root HTMLDivElement", () => {
      let divElement: HTMLDivElement | null = null;

      function CallbackRefTest() {
        return (
          <Collapse
            ref={(el) => {
              divElement = el;
            }}
          >
            <CollapsePanel value="1" label="Panel 1">
              <p>Content</p>
            </CollapsePanel>
          </Collapse>
        );
      }

      cy.mount(<CallbackRefTest />);
      cy.get("button[aria-controls]")
        .first()
        .then(() => {
          expect(divElement?.tagName).to.equal("DIV");
        });
    });

    it("has correct WAI-ARIA roles and attributes", () => {
      cy.mount(
        <Collapse defaultActiveKey={["1"]}>
          <CollapsePanel value="1" label="Panel 1">
            <p>Content 1</p>
          </CollapsePanel>
          <CollapsePanel value="2" label="Panel 2">
            <p>Content 2</p>
          </CollapsePanel>
        </Collapse>
      );

      cy.get('button[aria-expanded="true"]').should("have.attr", "aria-controls");
      cy.get('[role="region"]').should("have.length", 2);
    });

    it("supports keyboard navigation (Space & Enter)", () => {
      cy.mount(
        <Collapse>
          <CollapsePanel value="1" label="Panel 1">
            <p data-testid="key-content-1">Content 1</p>
          </CollapsePanel>
        </Collapse>
      );

      cy.get('[data-testid="key-content-1"]').should("not.be.visible");

      // Focus on first header and press Enter
      cy.get("button").first().focus().type("{enter}");
      cy.get('[data-testid="key-content-1"]').should("be.visible");

      // Press Space to collapse
      cy.get("button").first().focus().type(" ");
      cy.get('[data-state="closed"]').contains("Content 1").should("not.be.visible");
    });
  });

  /* ========================================================================
     12. All-in-One Comprehensive Showcase Dashboard
     ======================================================================== */
  describe("Comprehensive Showcase Dashboard", () => {
    it("renders full showcase dashboard with all features and live controls", () => {
      function CollapseDashboard() {
        const [activeSize, setActiveSize] = useState<CollapseSize>("md");
        const [activeVariant, setActiveVariant] = useState<CollapseVariant>("outlined");
        const [activeColor] = useState<CollapseColor>("primary");
        const [activeRadius] = useState<CollapseRadius>("md");
        const [isAccordion, setIsAccordion] = useState(false);
        const [extraCount, setExtraCount] = useState(0);
        const [formName, setFormName] = useState("");

        return (
          <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-8 font-sans text-neutral-900">
            <header className="border-b border-neutral-200 pb-5">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-primary-700">
                    📂 Collapse / Accordion Showcase Dashboard
                  </h1>
                  <p className="text-sm text-neutral-600 mt-1">
                    Tổng hợp toàn bộ tính năng: 3 Sizes, 5 Variants, 7 Colors, 6 Radii, Accordion Mode, Slots, Nested &
                    Live Playground
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge size="md" variant="soft" color="primary">
                    Design System v2.0
                  </Badge>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: 3 Sizes */}
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-neutral-200 flex flex-col gap-4">
                <h3 className="font-bold text-primary-700 text-sm uppercase tracking-wider">
                  1. Sizes (3 Kích thước)
                </h3>
                <div className="flex flex-col gap-3">
                  {(["sm", "md", "lg"] as CollapseSize[]).map((s) => (
                    <div key={s} className="space-y-1">
                      <span className="text-xs font-semibold text-neutral-500 uppercase">Size {s}</span>
                      <Collapse size={s} defaultActiveKey={["1"]}>
                        <CollapsePanel value="1" label={`Panel Size ${s.toUpperCase()}`} description={`Kích thước ${s}`}>
                          <p className="text-xs">Nội dung hiển thị theo kích cỡ {s}.</p>
                        </CollapsePanel>
                      </Collapse>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: 4 Variants */}
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-neutral-200 flex flex-col gap-4">
                <h3 className="font-bold text-primary-700 text-sm uppercase tracking-wider">
                  2. Variants (4 Biến thể)
                </h3>
                <div className="flex flex-col gap-3">
                  {(["outlined", "filled", "ghost", "separated"] as CollapseVariant[]).map((v) => (
                    <div key={v} className="space-y-1">
                      <span className="text-xs font-semibold text-neutral-500 capitalize">Variant: {v}</span>
                      <Collapse size="sm" variant={v} defaultActiveKey={["1"]}>
                        <CollapsePanel value="1" label={`Kiểu giao diện: ${v}`}>
                          <p className="text-xs">Panel với biến thể {v}.</p>
                        </CollapsePanel>
                      </Collapse>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Colors */}
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-neutral-200 flex flex-col gap-4">
                <h3 className="font-bold text-primary-700 text-sm uppercase tracking-wider">
                  3. Colors (7 Bảng màu)
                </h3>
                <div className="flex flex-col gap-2.5">
                  {(["primary", "secondary", "success", "error", "warning", "info", "neutral"] as CollapseColor[]).map(
                    (c) => (
                      <Collapse key={c} size="sm" color={c} defaultActiveKey={["1"]}>
                        <CollapsePanel value="1" label={`Màu chủ đề: ${c}`}>
                          <p className="text-xs">Trạng thái active & focus ring theo màu {c}.</p>
                        </CollapsePanel>
                      </Collapse>
                    )
                  )}
                </div>
              </div>

              {/* Card 4: Radii (Bo góc) */}
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-neutral-200 flex flex-col gap-4">
                <h3 className="font-bold text-primary-700 text-sm uppercase tracking-wider">
                  4. Radius (6 Cấp độ bo góc)
                </h3>
                <div className="flex flex-col gap-2.5">
                  {(["none", "sm", "md", "lg", "xl", "full"] as CollapseRadius[]).map((r) => (
                    <Collapse key={r} size="sm" radius={r} defaultActiveKey={["1"]}>
                      <CollapsePanel value="1" label={`radius="${r}"`}>
                        <p className="text-xs">Độ bo góc góc viền: {r}.</p>
                      </CollapsePanel>
                    </Collapse>
                  ))}
                </div>
              </div>

              {/* Card 5: Accordion vs Multi-expand */}
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-neutral-200 flex flex-col gap-4">
                <h3 className="font-bold text-primary-700 text-sm uppercase tracking-wider">
                  5. Accordion vs Multi-Expand
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 block mb-1.5">
                      ✓ Chế độ Accordion (Chỉ mở 1 panel):
                    </span>
                    <Collapse size="sm" accordion defaultActiveKey="acc-1">
                      <CollapsePanel value="acc-1" label="Accordion Item 1">
                        <p className="text-xs">Mở item 2 sẽ tự đóng item 1.</p>
                      </CollapsePanel>
                      <CollapsePanel value="acc-2" label="Accordion Item 2">
                        <p className="text-xs">Nội dung của item 2.</p>
                      </CollapsePanel>
                    </Collapse>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary-600 block mb-1.5">
                      ✓ Chế độ Multi-Expand (Mở nhiều cùng lúc):
                    </span>
                    <Collapse size="sm" defaultActiveKey={["multi-1", "multi-2"]}>
                      <CollapsePanel value="multi-1" label="Multi Item 1">
                        <p className="text-xs">Đang mở đồng thời.</p>
                      </CollapsePanel>
                      <CollapsePanel value="multi-2" label="Multi Item 2">
                        <p className="text-xs">Đang mở đồng thời.</p>
                      </CollapsePanel>
                    </Collapse>
                  </div>
                </div>
              </div>

              {/* Card 6: Slots, Extra, StartIcon & Disabled */}
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-neutral-200 flex flex-col gap-4">
                <h3 className="font-bold text-primary-700 text-sm uppercase tracking-wider">
                  6. Slots & Trạng thái
                </h3>
                <Collapse size="sm" variant="separated" defaultActiveKey={["slot-1"]}>
                  <CollapsePanel
                    value="slot-1"
                    label="StartIcon & Action Extra"
                    description="Có icon đầu dòng và badge"
                    startIcon={<span>⚡</span>}
                    extra={
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExtraCount((c) => c + 1);
                        }}
                        className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-700 rounded-md"
                      >
                        +{extraCount}
                      </button>
                    }
                  >
                    <p className="text-xs">Click nút extra không làm đóng/mở panel.</p>
                  </CollapsePanel>
                  <CollapsePanel
                    value="slot-2"
                    label="Panel bị khóa (Disabled)"
                    description="Không cho phép click mở"
                    startIcon={<span>🔒</span>}
                    disabled
                    extra={
                      <Badge size="sm" color="neutral">
                        Locked
                      </Badge>
                    }
                  >
                    <p className="text-xs">Không thể xem nội dung này.</p>
                  </CollapsePanel>
                </Collapse>
              </div>

              {/* Card 7: Form Controls & Nested Collapse */}
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-neutral-200 flex flex-col gap-4">
                <h3 className="font-bold text-primary-700 text-sm uppercase tracking-wider">
                  7. Form & Nested Collapse
                </h3>
                <Collapse size="sm" defaultActiveKey={["nest-parent"]}>
                  <CollapsePanel value="nest-parent" label="Cấu hình tài khoản (Form + Nested)" startIcon={<span>⚙️</span>}>
                    <div className="space-y-3 pt-1">
                      <input
                        type="text"
                        placeholder="Nhập họ tên..."
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-2.5 py-1 text-xs border rounded-md"
                      />
                      <Collapse size="sm" variant="filled" defaultActiveKey={["sub-1"]}>
                        <CollapsePanel value="sub-1" label="Tùy chọn nâng cao 1">
                          <p className="text-[11px]">Nội dung sub-panel 1.</p>
                        </CollapsePanel>
                        <CollapsePanel value="sub-2" label="Tùy chọn nâng cao 2">
                          <p className="text-[11px]">Nội dung sub-panel 2.</p>
                        </CollapsePanel>
                      </Collapse>
                    </div>
                  </CollapsePanel>
                </Collapse>
              </div>

              {/* Card 8: Standalone Collapsible */}
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-neutral-200 flex flex-col gap-4">
                <h3 className="font-bold text-primary-700 text-sm uppercase tracking-wider">
                  8. Standalone Collapsible
                </h3>
                <div className="space-y-2">
                  <p className="text-xs text-neutral-500">
                    Sử dụng riêng biệt component <code>&lt;Collapsible&gt;</code> cho 1 khối đóng/mở đơn lẻ:
                  </p>
                  <Collapsible defaultOpen>
                    <div className="p-3 bg-primary-50 rounded-xl border border-primary-200 text-xs text-primary-800">
                      ✨ Nội dung của Standalone Collapsible mở mặc định bằng defaultOpen.
                    </div>
                  </Collapsible>
                </div>
              </div>

              {/* Card 9: Live Interactive Controls Playground */}
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-neutral-200 flex flex-col gap-4">
                <h3 className="font-bold text-primary-700 text-sm uppercase tracking-wider">
                  9. Bảng điều khiển (Live Playground)
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-neutral-500 w-14">Size:</span>
                    {(["sm", "md", "lg"] as CollapseSize[]).map((s) => (
                      <button
                        key={s}
                        data-testid={`btn-size-${s}`}
                        onClick={() => setActiveSize(s)}
                        className={`px-2 py-1 rounded border font-semibold ${
                          activeSize === s
                            ? "bg-primary-600 text-white border-primary-600"
                            : "bg-neutral-100"
                        }`}
                      >
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-neutral-500 w-14">Variant:</span>
                    {(["outlined", "filled", "ghost", "separated"] as CollapseVariant[]).map((v) => (
                      <button
                        key={v}
                        data-testid={`btn-variant-${v}`}
                        onClick={() => setActiveVariant(v)}
                        className={`px-2 py-1 rounded border font-semibold ${
                          activeVariant === v
                            ? "bg-primary-600 text-white border-primary-600"
                            : "bg-neutral-100"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>

                  <label className="flex items-center gap-2 pt-1 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      data-testid="toggle-accordion-checkbox"
                      checked={isAccordion}
                      onChange={(e) => setIsAccordion(e.target.checked)}
                      className="rounded text-primary-600 focus:ring-primary-500"
                    />
                    <span>Chế độ Accordion (Single)</span>
                  </label>

                  <div className="pt-2 border-t border-neutral-200">
                    <Collapse
                      size={activeSize}
                      variant={activeVariant}
                      color={activeColor}
                      radius={activeRadius}
                      accordion={isAccordion}
                      defaultActiveKey={["demo-1"]}
                    >
                      <CollapsePanel value="demo-1" label={`Live Demo (${activeSize}, ${activeVariant})`}>
                        <p className="text-xs">Nội dung thay đổi theo lựa chọn của bạn.</p>
                      </CollapsePanel>
                      <CollapsePanel value="demo-2" label="Live Demo Panel 2">
                        <p className="text-xs">Nội dung của panel 2.</p>
                      </CollapsePanel>
                    </Collapse>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      cy.mount(<CollapseDashboard />);
      cy.contains("📂 Collapse / Accordion Showcase Dashboard").should("be.visible");
      cy.contains("1. Sizes (3 Kích thước)").should("be.visible");
      cy.contains("2. Variants (4 Biến thể)").should("be.visible");
      cy.contains("3. Colors (7 Bảng màu)").should("be.visible");
      cy.contains("4. Radius (6 Cấp độ bo góc)").should("be.visible");
      cy.contains("5. Accordion vs Multi-Expand").should("be.visible");
      cy.contains("6. Slots & Trạng thái").should("be.visible");
      cy.contains("7. Form & Nested Collapse").should("be.visible");
      cy.contains("8. Standalone Collapsible").should("be.visible");
      cy.contains("9. Bảng điều khiển (Live Playground)").should("be.visible");

      cy.get('[data-testid="btn-size-sm"]').click();
      cy.get('[data-testid="btn-variant-filled"]').click();
      cy.get('[data-testid="toggle-accordion-checkbox"]').check();
    });
  });
});
