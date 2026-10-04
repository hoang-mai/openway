import { useState, ComponentProps } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel, TabSize, TabVariant, TabColor, TabRadius } from "./index";

const HomeIcon = () => (
  <svg
    data-testid="home-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-full"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const UserIcon = () => (
  <svg
    data-testid="user-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-full"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    data-testid="settings-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-full"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const SampleTabs = (props: ComponentProps<typeof Tabs>) => (
  <Tabs defaultActiveKey="overview" {...props}>
    <TabList>
      <Tab value="overview" startIcon={<HomeIcon />} label="Tổng quan" />
      <Tab value="profile" startIcon={<UserIcon />} badge={3} label="Hồ sơ" />
      <Tab value="settings" startIcon={<SettingsIcon />} label="Cài đặt" />
    </TabList>
    <TabPanels>
      <TabPanel value="overview">
        <div data-testid="content-overview">Nội dung tab Tổng quan</div>
      </TabPanel>
      <TabPanel value="profile">
        <div data-testid="content-profile">Nội dung tab Hồ sơ</div>
      </TabPanel>
      <TabPanel value="settings">
        <div data-testid="content-settings">Nội dung tab Cài đặt</div>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

describe("<Tabs /> Comprehensive Component Tests", () => {
  it("renders the entire Tabs design system showcase and passes all UI & interaction test assertions", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    const onChangeSpy = cy.spy().as("onChangeSpy");

    const sizes: TabSize[] = ["sm", "md", "lg"];
    const variants: TabVariant[] = ["line", "solid", "bordered", "flat"];
    const colors: TabColor[] = ["primary", "secondary", "neutral", "error", "success", "warning", "info"];
    const radiuses: TabRadius[] = ["none", "sm", "md", "lg", "xl", "full"];

    function InteractiveTabsWrapper() {
      const [activeKey, setActiveKey] = useState<string | number>("tab-1");
      return (
        <div data-testid="interactive-wrapper">
          <Tabs
            activeKey={activeKey}
            onChange={(key) => {
              setActiveKey(key);
              onChangeSpy(key);
            }}
            onClose={onCloseSpy}
          >
            <TabList>
              <Tab value="tab-1" label="Interactive Tab 1" closable />
              <Tab value="tab-2" label="Interactive Tab 2" closable />
              <Tab value="tab-disabled" label="Disabled Tab" disabled />
            </TabList>
            <TabPanels>
              <TabPanel value="tab-1">
                <div data-testid="interactive-content-1">Content 1 Active</div>
              </TabPanel>
              <TabPanel value="tab-2">
                <div data-testid="interactive-content-2">Content 2 Active</div>
              </TabPanel>
              <TabPanel value="tab-disabled">
                <div>Disabled content</div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      );
    }

    cy.mount(
      <div
        style={{
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "36px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          backgroundColor: "#f9fbfb",
          minHeight: "100vh",
        }}
      >
        <header>
          <h1
            style={{
              margin: "0 0 8px 0",
              color: "#122026",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            📑 Tabs Design System & Testing Showcase
          </h1>
          <p style={{ margin: 0, color: "#7d8b90", fontSize: "14px" }}>
            Comprehensive showcase covering 3 sizes, 4 variants, 7 colors, 6 radiuses, placements, compound components,
            keyboard & click interactions.
          </p>
        </header>

        {/* Section 1: Sizes */}
        <section
          data-testid="section-sizes"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>
            1. 3 Kích thước (Sizes: sm, md, lg)
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {sizes.map((size) => (
              <div key={size}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#7d8b90" }}>Size: {size.toUpperCase()}</span>
                <SampleTabs size={size} />
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Variants */}
        <section
          data-testid="section-variants"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>
            2. Biến thể (Variants: line, solid, bordered, flat)
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {variants.map((variant) => (
              <div key={variant}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#7d8b90" }}>
                  Variant: {variant.toUpperCase()}
                </span>
                <SampleTabs variant={variant} />
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Colors */}
        <section
          data-testid="section-colors"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>3. 7 Chủ đề Màu sắc (Colors)</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {colors.map((color) => (
              <div key={color}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#7d8b90" }}>
                  Color: {color.toUpperCase()}
                </span>
                <SampleTabs color={color} variant="solid" />
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Radiuses */}
        <section
          data-testid="section-radiuses"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>
            4. Bo góc (Radius: none, sm, md, lg, xl, full)
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {radiuses.map((radius) => (
              <div key={radius}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#7d8b90" }}>Radius: {radius}</span>
                <SampleTabs radius={radius} variant="bordered" />
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Orientation & Placement */}
        <section
          data-testid="section-placements"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>
            5. Hướng & Vị trí (Orientation & Placements)
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#7d8b90" }}>Vertical Left:</span>
              <SampleTabs orientation="vertical" placement="left" variant="line" />
            </div>
            <div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#7d8b90" }}>Horizontal Bottom:</span>
              <SampleTabs orientation="horizontal" placement="bottom" variant="line" />
            </div>
          </div>
        </section>

        {/* Section 6: Extra Features (FullWidth, Centered, Extra Content) */}
        <section
          data-testid="section-features"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>
            6. Tính năng mở rộng (FullWidth, Centered, Extra Content)
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#7d8b90" }}>Full Width:</span>
              <SampleTabs fullWidth variant="flat" />
            </div>
            <div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#7d8b90" }}>Centered & Extra Content:</span>
              <Tabs defaultActiveKey="overview">
                <TabList
                  centered
                  extra={
                    <button
                      data-testid="btn-extra"
                      type="button"
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        background: "#e9f0f5",
                        color: "#325972",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      + Thêm mới
                    </button>
                  }
                >
                  <Tab value="overview" startIcon={<HomeIcon />} label="Tổng quan" />
                  <Tab value="profile" startIcon={<UserIcon />} badge={3} label="Hồ sơ" />
                  <Tab value="settings" startIcon={<SettingsIcon />} label="Cài đặt" />
                </TabList>
                <TabPanels>
                  <TabPanel value="overview">
                    <div data-testid="content-overview">Nội dung tab Tổng quan</div>
                  </TabPanel>
                  <TabPanel value="profile">
                    <div data-testid="content-profile">Nội dung tab Hồ sơ</div>
                  </TabPanel>
                  <TabPanel value="settings">
                    <div data-testid="content-settings">Nội dung tab Cài đặt</div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Section 7: Compound Components API */}
        <section
          data-testid="section-compound"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>7. Compound Components API</h2>
          <Tabs defaultActiveKey="comp-1" variant="solid" color="primary">
            <TabList>
              <Tab value="comp-1">Tab Compound 1</Tab>
              <Tab value="comp-2">Tab Compound 2</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="comp-1">
                <div data-testid="compound-content-1">Nội dung Compound 1</div>
              </TabPanel>
              <TabPanel value="comp-2">
                <div data-testid="compound-content-2">Nội dung Compound 2</div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </section>

        {/* Section 8: Interactive Unit Test Suite */}
        <section
          data-testid="section-interactive"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>
            8. Interactive Test Suite & WAI-ARIA
          </h2>
          <InteractiveTabsWrapper />
        </section>

        {/* Section 9: Scrollable Overflow Tabs with Chevron Buttons */}
        <section
          data-testid="section-scrollable"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            maxWidth: "320px",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>
            9. Cuộn ngang & Nút Chevron (Scrollable Overflow)
          </h2>
          <Tabs defaultActiveKey="t1">
            <TabList>
              <Tab value="t1" label="Tab 1 rất dài" />
              <Tab value="t2" label="Tab 2 rất dài" />
              <Tab value="t3" label="Tab 3 rất dài" />
              <Tab value="t4" label="Tab 4 rất dài" />
              <Tab value="t5" label="Tab 5 rất dài" />
              <Tab value="t6" label="Tab 6 rất dài" />
            </TabList>
            <TabPanels>
              <TabPanel value="t1">Content 1</TabPanel>
              <TabPanel value="t2">Content 2</TabPanel>
              <TabPanel value="t3">Content 3</TabPanel>
              <TabPanel value="t4">Content 4</TabPanel>
              <TabPanel value="t5">Content 5</TabPanel>
              <TabPanel value="t6">Content 6</TabPanel>
            </TabPanels>
          </Tabs>
        </section>
      </div>
    );

    // =========================================================================
    // ASSERTIONS & VERIFICATION SUITE
    // =========================================================================

    // 1. Header & Sections rendering
    cy.contains("Tabs Design System & Testing Showcase").should("be.visible");
    cy.get('[data-testid="section-sizes"]').should("exist");
    cy.get('[data-testid="section-variants"]').should("exist");
    cy.get('[data-testid="section-colors"]').should("exist");
    cy.get('[data-testid="section-radiuses"]').should("exist");
    cy.get('[data-testid="section-placements"]').should("exist");
    cy.get('[data-testid="section-features"]').should("exist");
    cy.get('[data-testid="section-compound"]').should("exist");
    cy.get('[data-testid="section-interactive"]').should("exist");
    cy.get('[data-testid="section-scrollable"]').should("exist");

    // 2. Extra content rendering
    cy.get('[data-testid="btn-extra"]').should("be.visible").and("contain.text", "+ Thêm mới");

    // 3. Icons, Badges & Sliding Indicators
    cy.get('[data-testid="home-icon"]').should("exist");
    cy.get('[data-testid="user-icon"]').should("exist");
    cy.get('[data-testid="settings-icon"]').should("exist");
    cy.contains("3").should("exist");
    cy.get('[data-testid="tab-indicator"]').should("have.length.greaterThan", 0);

    // 4. Interactive section initial active state
    cy.get('[data-testid="interactive-wrapper"]')
      .find('[role="tab"]')
      .first()
      .should("have.attr", "aria-selected", "true");

    cy.get('[data-testid="interactive-content-1"]').should("be.visible");

    // 5. Switching tabs on Click
    cy.get('[data-testid="interactive-wrapper"]').find('[role="tab"]').eq(1).click();

    cy.get("@onChangeSpy").should("have.been.calledWith", "tab-2");
    cy.get('[data-testid="interactive-content-2"]').should("be.visible");
    cy.get('[data-testid="interactive-wrapper"]')
      .find('[role="tab"]')
      .eq(1)
      .should("have.attr", "aria-selected", "true");

    // 6. Closable Tab action
    cy.get('[data-testid="interactive-wrapper"]').find('[aria-label="Close tab"]').first().click();

    cy.get("@onCloseSpy").should("have.been.calledWith", "tab-1");

    // 7. Disabled Tab behavior
    cy.get('[data-testid="interactive-wrapper"]')
      .find('[role="tab"]')
      .eq(2)
      .should("be.disabled")
      .and("have.attr", "aria-disabled", "true");

    // 8. Keyboard Navigation (Arrow keys & Home/End)
    cy.get('[data-testid="interactive-wrapper"]')
      .find('[role="tab"]')
      .first()
      .focus()
      .trigger("keydown", { key: "ArrowRight" });

    cy.get("@onChangeSpy").should("have.been.calledWith", "tab-2");

    cy.get('[data-testid="interactive-wrapper"]').find('[role="tab"]').eq(1).trigger("keydown", { key: "Home" });

    cy.get("@onChangeSpy").should("have.been.calledWith", "tab-1");

    // 9. Compound Component Rendering
    cy.get('[data-testid="compound-content-1"]').should("be.visible");

    // 10. Scrollable Overflow & Chevron buttons
    cy.get('[data-testid="section-scrollable"]')
      .find('button[aria-label="Scroll tabs right"]')
      .should("be.visible")
      .click();
  });
});
