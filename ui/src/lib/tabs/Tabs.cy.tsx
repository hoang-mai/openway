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

const ChartIcon = () => (
  <svg
    data-testid="chart-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-full"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
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
            Comprehensive showcase covering React 19.3 ViewTransition, 3 sizes, 4 variants, 7 colors, 6 radiuses,
            placements, compound components, keyboard & click interactions.
          </p>
        </header>

        {/* Section 0: Rich ViewTransition Dashboard Demo */}
        <section
          data-testid="section-view-transition"
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "14px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            border: "1px solid #e3e8ec",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <h2 style={{ fontSize: "18px", margin: "0 0 4px 0", color: "#17579b", fontWeight: 700 }}>
              ✨ React 19.3 ViewTransition Showcase (Bấm chuyển tab để xem hiệu ứng)
            </h2>
            <p style={{ margin: 0, fontSize: "13px", color: "#5f5e5b" }}>
              Mỗi tab dưới đây chứa bố cục, thẻ thống kê, biểu đồ, danh sách thành viên và chiều cao khác nhau để quan sát rõ hiệu ứng chuyển cảnh mượt mà của <code>&lt;ViewTransition&gt;</code>.
            </p>
          </div>

          <Tabs defaultActiveKey="vt-dashboard" variant="solid" color="primary" size="md">
            <TabList>
              <Tab value="vt-dashboard" startIcon={<HomeIcon />} label="Tổng quan kinh doanh" badge="Live" />
              <Tab value="vt-analytics" startIcon={<ChartIcon />} label="Phân tích lưu lượng" badge={12} />
              <Tab value="vt-team" startIcon={<UserIcon />} label="Đội ngũ & Phân quyền" badge={8} />
              <Tab value="vt-settings" startIcon={<SettingsIcon />} label="Cấu hình hệ thống" />
            </TabList>

            <TabPanels className="mt-4">
              {/* TAB 1: DASHBOARD KPI & RECENT ORDERS */}
              <TabPanel value="vt-dashboard">
                <div
                  data-testid="vt-panel-dashboard"
                  className="p-5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900">Báo cáo doanh thu Quý 4/2026</h3>
                      <p className="text-xs text-neutral-500">Cập nhật tự động theo thời gian thực từ 14 chi nhánh</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-success-100 text-success-800">
                      +28.4% so với cùng kỳ
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-neutral-white border border-neutral-200 shadow-2xs">
                      <div className="text-xs text-neutral-500 font-medium">Tổng doanh thu</div>
                      <div className="text-2xl font-bold text-primary-700 mt-1">4,820,000,000 ₫</div>
                      <div className="text-xs text-success-600 mt-2">▲ Tăng 18.2% tuần này</div>
                    </div>
                    <div className="p-4 rounded-lg bg-neutral-white border border-neutral-200 shadow-2xs">
                      <div className="text-xs text-neutral-500 font-medium">Đơn hàng hoàn tất</div>
                      <div className="text-2xl font-bold text-neutral-900 mt-1">12,450</div>
                      <div className="text-xs text-info-600 mt-2">● Tỷ lệ giao thành công 99.1%</div>
                    </div>
                    <div className="p-4 rounded-lg bg-neutral-white border border-neutral-200 shadow-2xs">
                      <div className="text-xs text-neutral-500 font-medium">Khách hàng mới</div>
                      <div className="text-2xl font-bold text-secondary-700 mt-1">1,892</div>
                      <div className="text-xs text-warning-600 mt-2">★ 412 tài khoản Enterprise</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-neutral-white border border-neutral-200">
                    <div className="text-xs font-semibold text-neutral-700 mb-3">Giao dịch lớn gần đây</div>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex items-center justify-between py-1.5 border-b border-neutral-100">
                        <span className="font-medium text-neutral-800">Công ty Cổ phần Công nghệ OpenWay</span>
                        <span className="text-xs text-neutral-500">Gói Enterprise Cloud (1 năm)</span>
                        <span className="font-semibold text-success-700">+185,000,000 ₫</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-neutral-100">
                        <span className="font-medium text-neutral-800">Tập đoàn Logistics Thái Bình Dương</span>
                        <span className="text-xs text-neutral-500">Nâng cấp 250 seats</span>
                        <span className="font-semibold text-success-700">+92,500,000 ₫</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5">
                        <span className="font-medium text-neutral-800">Ngân hàng Số Á Châu</span>
                        <span className="text-xs text-neutral-500">Tích hợp Design System SDK</span>
                        <span className="font-semibold text-success-700">+310,000,000 ₫</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* TAB 2: ANALYTICS & VISUAL BARS */}
              <TabPanel value="vt-analytics">
                <div
                  data-testid="vt-panel-analytics"
                  className="p-5 rounded-xl bg-info-50/40 border border-info-200 space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-info-950">Phân tích hiệu năng & Chuyển đổi kênh</h3>
                      <p className="text-xs text-info-700">Thống kê lưu lượng truy cập đa nền tảng trong 30 ngày qua</p>
                    </div>
                    <span className="px-3 py-1 rounded-md text-xs font-semibold bg-info-100 text-info-800">
                      99.98% Uptime
                    </span>
                  </div>

                  <div className="space-y-3 bg-neutral-white p-4 rounded-lg border border-info-100">
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span>Tìm kiếm tự nhiên (Organic Search)</span>
                        <span className="font-bold text-primary-700">64% (142,800 lượt)</span>
                      </div>
                      <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-600 rounded-full" style={{ width: "64%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span>Truy cập trực tiếp (Direct Traffic)</span>
                        <span className="font-bold text-secondary-700">48% (98,210 lượt)</span>
                      </div>
                      <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary-600 rounded-full" style={{ width: "48%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span>Chiến dịch giới thiệu (Referral & Partner)</span>
                        <span className="font-bold text-success-700">82% (215,400 lượt)</span>
                      </div>
                      <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-success-600 rounded-full" style={{ width: "82%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span>Ứng dụng di động (iOS & Android SDK)</span>
                        <span className="font-bold text-warning-700">39% (67,900 lượt)</span>
                      </div>
                      <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-warning-500 rounded-full" style={{ width: "39%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* TAB 3: TEAM MEMBERS & PERMISSIONS */}
              <TabPanel value="vt-team">
                <div
                  data-testid="vt-panel-team"
                  className="p-5 rounded-xl bg-secondary-50/30 border border-secondary-200 space-y-4"
                >
                  <div>
                    <h3 className="text-base font-bold text-neutral-900">Danh sách thành viên cốt lõi</h3>
                    <p className="text-xs text-neutral-500">Quản lý quyền truy cập repository và môi trường Production</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Mai Anh Hoàng", role: "Principal Architect", status: "Owner", color: "bg-primary-600" },
                      { name: "Nguyễn Minh Tuấn", role: "Lead UI Engineer", status: "Admin", color: "bg-secondary-600" },
                      { name: "Trần Thu Hà", role: "Product Designer", status: "Editor", color: "bg-success-600" },
                      { name: "Lê Quốc Bảo", role: "DevSecOps Engineer", status: "Maintainer", color: "bg-info-600" },
                    ].map((member) => (
                      <div
                        key={member.name}
                        className="flex items-center gap-3 p-3.5 rounded-lg bg-neutral-white border border-neutral-200 shadow-2xs"
                      >
                        <div
                          className={`size-10 rounded-full ${member.color} text-white flex items-center justify-center font-bold text-sm shrink-0`}
                        >
                          {member.name.slice(0, 1)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-neutral-900 truncate">{member.name}</div>
                          <div className="text-xs text-neutral-500 truncate">{member.role}</div>
                        </div>
                        <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-neutral-100 text-neutral-700">
                          {member.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabPanel>

              {/* TAB 4: SYSTEM SETTINGS */}
              <TabPanel value="vt-settings">
                <div
                  data-testid="vt-panel-settings"
                  className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-4"
                >
                  <div>
                    <h3 className="text-base font-bold text-neutral-900">Thiết lập bảo mật & ViewTransition</h3>
                    <p className="text-xs text-neutral-500">Tùy chỉnh hành vi đồng bộ dữ liệu và hiệu ứng chuyển động</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3.5 rounded-lg bg-neutral-white border border-neutral-200">
                      <div>
                        <div className="text-sm font-semibold text-neutral-900">Kích hoạt React 19.3 ViewTransition</div>
                        <div className="text-xs text-neutral-500">
                          Tự động đồng bộ snapshot cũ và mới khi chuyển đổi giữa các TabPanels
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-success-100 text-success-800">
                        Đang bật
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-lg bg-neutral-white border border-neutral-200">
                      <div>
                        <div className="text-sm font-semibold text-neutral-900">Xác thực hai lớp bắt buộc (2FA)</div>
                        <div className="text-xs text-neutral-500">
                          Yêu cầu khóa bảo mật phần cứng hoặc ứng dụng Authenticator cho mọi thành viên
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-primary-100 text-primary-800">
                        Bắt buộc
                      </span>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </section>

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
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>
            9. Cuộn ngang & Nút Chevron (Scrollable Overflow)
          </h2>
          <div style={{ maxWidth: "320px" }}>
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
          </div>
        </section>
      </div>
    );

    // =========================================================================
    // ASSERTIONS & VERIFICATION SUITE
    // =========================================================================

    // 1. Header & Sections rendering
    cy.contains("Tabs Design System & Testing Showcase").should("be.visible");
    cy.get('[data-testid="section-view-transition"]').should("exist");
    cy.get('[data-testid="section-sizes"]').should("exist");
    cy.get('[data-testid="section-variants"]').should("exist");
    cy.get('[data-testid="section-colors"]').should("exist");
    cy.get('[data-testid="section-radiuses"]').should("exist");
    cy.get('[data-testid="section-placements"]').should("exist");
    cy.get('[data-testid="section-features"]').should("exist");
    cy.get('[data-testid="section-compound"]').should("exist");
    cy.get('[data-testid="section-interactive"]').should("exist");
    cy.get('[data-testid="section-scrollable"]').should("exist");

    // 1b. ViewTransition Rich Dashboard switching verification
    cy.get('[data-testid="vt-panel-dashboard"]').should("be.visible");
    cy.get('[data-testid="section-view-transition"]').contains('[role="tab"]', "Phân tích lưu lượng").click();
    cy.get('[data-testid="vt-panel-analytics"]').should("be.visible");
    cy.get('[data-testid="section-view-transition"]').contains('[role="tab"]', "Đội ngũ & Phân quyền").click();
    cy.get('[data-testid="vt-panel-team"]').should("be.visible");
    cy.get('[data-testid="section-view-transition"]').contains('[role="tab"]', "Tổng quan kinh doanh").click();
    cy.get('[data-testid="vt-panel-dashboard"]').should("be.visible");

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
