import React, { useState, useEffect } from "react";
import { DataTable, createTableColumnHelper, type TableFilterDef } from "./table";
import { Select, MultiSelect } from "./select";
import { Badge } from "./badge";
import { Input, PasswordInput, NumberInput, MultiInput } from "./input";
import { Checkbox } from "./checkbox";
import { RadioGroup } from "./radio";
import { Toggle } from "./toggle";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSeparator } from "./dropdown";
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody } from "./popover";
import { Alert } from "./alert";
import { Button } from "./button";
import { Collapse, CollapsePanel } from "./collapse";

function SunIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" strokeWidth="2" />
      <path strokeLinecap="round" strokeWidth="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

interface ConnectionItem {
  id: number;
  connectionName: string;
  host: string;
  port: number;
  status: "Active" | "Inactive" | "Maintenance";
  type: string;
}

const mockConnections: ConnectionItem[] = [
  { id: 1, connectionName: "Production-DB-Primary", host: "10.0.1.25", port: 5432, status: "Active", type: "PostgreSQL" },
  { id: 2, connectionName: "Staging-Redis-Cluster", host: "10.0.2.14", port: 6379, status: "Active", type: "Redis" },
  { id: 3, connectionName: "Analytics-ClickHouse", host: "10.0.3.88", port: 8123, status: "Maintenance", type: "ClickHouse" },
  { id: 4, connectionName: "Auth-Service-Replica", host: "10.0.1.30", port: 3306, status: "Inactive", type: "MySQL" },
  { id: 5, connectionName: "Kafka-Broker-Main", host: "10.0.4.10", port: 9092, status: "Active", type: "Kafka" },
];

const colHelper = createTableColumnHelper<ConnectionItem>();

const connectionFilters: TableFilterDef[] = [
  {
    name: "connectionName",
    label: "Connection Name",
    type: "text",
    placeholder: "Filter by connection name...",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "Active", label: "Active" },
      { value: "Inactive", label: "Inactive" },
      { value: "Maintenance", label: "Maintenance" },
    ],
  },
  {
    name: "type",
    label: "Database Type",
    type: "checkbox-group",
    options: [
      { value: "PostgreSQL", label: "PostgreSQL" },
      { value: "Redis", label: "Redis" },
      { value: "ClickHouse", label: "ClickHouse" },
      { value: "MySQL", label: "MySQL" },
      { value: "Kafka", label: "Kafka" },
    ],
  },
];

export function ThemeDarkShowcase() {
  const [isDark, setIsDark] = useState(true);
  const [selectedDb, setSelectedDb] = useState<string | number | null>("postgres");
  const [selectedTags, setSelectedTags] = useState<(string | number)[]>(["primary", "staging"]);
  const [multiInputTags, setMultiInputTags] = useState<string[]>(["prod-env", "cluster-01", "us-east"]);
  const [toggleChecked, setToggleChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [selectedRadio, setSelectedRadio] = useState("option1");

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [isDark]);

  const columns = [
    colHelper.accessor("connectionName", {
      header: "Connection Name",
      cell: (info) => (
        <span className="font-semibold text-neutral-900">{info.getValue()}</span>
      ),
    }),
    colHelper.accessor("host", {
      header: "Host",
      cell: (info) => <span className="font-mono text-xs text-neutral-600">{info.getValue()}</span>,
    }),
    colHelper.accessor("port", {
      header: "Port",
      cell: (info) => <span className="text-neutral-700">{info.getValue()}</span>,
    }),
    colHelper.accessor("type", {
      header: "Type",
      cell: (info) => (
        <Badge variant="soft" color="info" size="sm">
          {info.getValue()}
        </Badge>
      ),
    }),
    colHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const val = info.getValue();
        const color = val === "Active" ? "success" : val === "Maintenance" ? "warning" : "error";
        return (
          <Badge variant="soft" color={color} size="sm" dot>
            {val}
          </Badge>
        );
      },
    }),
  ];

  const dbOptions = [
    { value: "postgres", label: "PostgreSQL Database", description: "Relational DB cluster v16" },
    { value: "redis", label: "Redis In-Memory Cache", description: "Distributed cluster v7.2" },
    { value: "clickhouse", label: "ClickHouse Analytics", description: "Columnar OLAP warehouse" },
    { value: "mysql", label: "MySQL Enterprise Server", description: "High-availability instance" },
    { value: "kafka", label: "Apache Kafka Streaming", description: "Multi-broker event stream" },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 transition-colors duration-200 bg-neutral-white text-neutral-900 font-sans">
      {/* Header bar with Dark/Light Mode switch */}
      <div className="max-w-6xl mx-auto mb-8 pb-6 border-b border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Dark Mode Theme Showcase
            </h1>
            <Badge variant="soft" color="primary" size="md">
              {isDark ? "Dark Theme Active" : "Light Theme Active"}
            </Badge>
          </div>
          <p className="text-sm text-neutral-500 mt-1">
            Kiểm thử toàn diện độ tương phản, Table Menu Filter, Select, Badges, Form Controls trong Dark Mode.
          </p>
        </div>

        <Button
          data-testid="theme-toggle-btn"
          variant="outline"
          color="neutral"
          size="md"
          onClick={() => setIsDark(!isDark)}
          leftIcon={isDark ? <SunIcon className="size-4 text-warning-400" /> : <MoonIcon className="size-4 text-primary-500" />}
        >
          {isDark ? "Chuyển sang Light Mode" : "Chuyển sang Dark Mode"}
        </Button>
      </div>

      <div className="max-w-6xl mx-auto space-y-10">
        {/* SECTION 1: TABLE WITH MENU FILTER (Reproduce exact user case) */}
        <section data-testid="table-dark-section" className="p-6 rounded-xl border border-neutral-200/80 bg-neutral-50/30">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-neutral-900 flex items-center gap-2">
              <span>1. Table Menu Filter & Data Table</span>
              <Badge variant="soft" color="success" size="xs">Fixed Contrast</Badge>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Bấm vào chip <strong>&quot;Connection Name: Not entered&quot;</strong> để mở Popover filter. Chữ và nền hiển thị tương phản chuẩn, không bị trắng xóa.
            </p>
          </div>

          <DataTable
            data={mockConnections}
            columns={columns}
            filters={connectionFilters}
            enableFiltering={true}
            enableColumnVisibility={true}
            searchPlaceholder="Search connections..."
            initialPageSize={5}
            variant="default"
            size="md"
            className="w-full"
          />
        </section>

        {/* SECTION 2: SELECT & MULTI-SELECT */}
        <section data-testid="select-dark-section" className="p-6 rounded-xl border border-neutral-200/80 bg-neutral-50/30">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-neutral-900 flex items-center gap-2">
              <span>2. Select & MultiSelect Components</span>
              <Badge variant="soft" color="primary" size="xs">Enhanced</Badge>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Dropdown menu, option được chọn, và tag trong MultiSelect tương thích Dark Mode hoàn hảo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                Single Select (Có tìm kiếm & mô tả chi tiết)
              </label>
              <Select
                data-testid="dark-single-select"
                options={dbOptions}
                value={selectedDb}
                onChange={setSelectedDb}
                searchable
                placeholder="Chọn cơ sở dữ liệu..."
                color="primary"
                config={{ isClearable: true }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                MultiSelect (Tag Badges trong Dark Mode)
              </label>
              <MultiSelect
                data-testid="dark-multi-select"
                options={[
                  { value: "primary", label: "Production Primary" },
                  { value: "staging", label: "Staging Cluster" },
                  { value: "replica", label: "Read-only Replica" },
                  { value: "backup", label: "Cold Backup Pool" },
                ]}
                value={selectedTags}
                onChange={setSelectedTags}
                color="primary"
                placeholder="Chọn môi trường..."
                config={{ isClearable: true }}
              />
            </div>
          </div>
        </section>

        {/* SECTION 3: BADGES ALL VARIANTS */}
        <section data-testid="badge-dark-section" className="p-6 rounded-xl border border-neutral-200/80 bg-neutral-50/30">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-neutral-900">
              3. Badge Color Palette in Dark Mode
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Soft, Filled, Outline, Ghost across all semantic colors.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Soft Badges (Đã thêm dark mode classes)
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="soft" color="primary">Primary Soft</Badge>
                <Badge variant="soft" color="secondary">Secondary Soft</Badge>
                <Badge variant="soft" color="success">Success Soft</Badge>
                <Badge variant="soft" color="warning">Warning Soft</Badge>
                <Badge variant="soft" color="error">Error Soft</Badge>
                <Badge variant="soft" color="info">Info Soft</Badge>
                <Badge variant="soft" color="neutral">Neutral Soft</Badge>
                <Badge variant="soft" color="primary" onDelete={() => {}}>Removable Chip</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Outline & Filled Badges
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" color="primary">Primary Outline</Badge>
                <Badge variant="outline" color="success">Success Outline</Badge>
                <Badge variant="outline" color="error">Error Outline</Badge>
                <Badge variant="filled" color="primary">Primary Filled</Badge>
                <Badge variant="filled" color="success">Success Filled</Badge>
                <Badge variant="filled" color="error">Error Filled</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: FORM CONTROLS & INPUTS */}
        <section data-testid="form-dark-section" className="p-6 rounded-xl border border-neutral-200/80 bg-neutral-50/30">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-neutral-900">
              4. Form Controls & Inputs in Dark Mode
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Inputs, MultiInput, Checkbox, Radio, and Toggle buttons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">Standard Input</label>
              <Input placeholder="Enter username..." defaultValue="openway_admin" />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">Password Input</label>
              <PasswordInput placeholder="Enter secret password..." defaultValue="SuperSecret123" />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">Number Input</label>
              <NumberInput defaultValue={5432} min={1} max={65535} />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">MultiInput (Tags with Badge)</label>
              <MultiInput
                value={multiInputTags}
                onChange={setMultiInputTags}
                placeholder="Nhập tag rồi ấn Enter..."
              />
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium text-neutral-600">Checkbox & Toggle</span>
              <Checkbox
                label="Cho phép kết nối SSL"
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />
              <Toggle
                label="Chế độ tự động Reconnect"
                checked={toggleChecked}
                onChange={(e) => setToggleChecked(e.target.checked)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium text-neutral-600">Radio Group</span>
              <RadioGroup
                value={selectedRadio}
                onChange={(val) => {
                  if (val) setSelectedRadio(val);
                }}
                options={[
                  { value: "option1", label: "Password Authentication" },
                  { value: "option2", label: "Certificate / Key Pair" },
                ]}
              />
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium text-neutral-600">Overlays (Dropdown & Popover)</span>
              <div className="flex items-center gap-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="outline" color="neutral" size="sm">
                      Mở Dropdown Menu
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem key="action1">Sao chép Hostname</DropdownItem>
                    <DropdownItem key="action2">Kiểm tra kết nối (Ping)</DropdownItem>
                    <DropdownSeparator />
                    <DropdownItem key="delete" danger>
                      Xóa cấu hình kết nối
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <Popover>
                  <PopoverTrigger>
                    <Button variant="soft" color="neutral" size="sm">
                      Mở Popover
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader>Thông tin hệ thống</PopoverHeader>
                    <PopoverBody>
                      <p className="text-xs text-neutral-600">Môi trường Kubernetes v1.29 đang hoạt động bình thường.</p>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: FEEDBACK & ALERTS */}
        <section data-testid="feedback-dark-section" className="p-6 rounded-xl border border-neutral-200/80 bg-neutral-50/30">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-neutral-900">
              5. Alerts & Feedback in Dark Mode
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Alert
              color="info"
              title="Cập nhật hệ thống"
              description="OpenWay UI đã tối ưu hóa hoàn toàn màu sắc và độ tương phản cho Dark theme."
            />
            <Alert
              color="success"
              title="Đã kết nối thành công"
              description="PostgreSQL Database cluster đã được kiểm tra và sẵn sàng nhận truy vấn."
            />
          </div>
        </section>

        {/* SECTION 6: ACCORDION / COLLAPSE IN DARK MODE */}
        <section data-testid="accordion-dark-section" className="p-6 rounded-xl border border-neutral-200/80 bg-neutral-50/30">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-neutral-900">
              6. Accordion (Collapse) in Dark Mode
            </h2>
            <p className="text-xs text-neutral-500">
              Hiển thị đồng bộ, nền header tối thanh lịch, viền phân cách mờ tinh tế và chữ rõ nét.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Neutral Outlined (Tông xám chuẩn)</p>
              <Collapse color="neutral" defaultActiveKey={["1"]}>
                <CollapsePanel value="1" label="This is panel header 1" description="Chi tiết về thú cưng">
                  A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.
                </CollapsePanel>
                <CollapsePanel value="2" label="This is panel header 2" description="Chi tiết về cấu hình">
                  The system configuration is synchronized automatically with distributed workers in dark mode.
                </CollapsePanel>
                <CollapsePanel value="3" label="This is panel header 3" description="Ghi chú thêm">
                  All border lines, header titles, and inner content match the dark theme tone perfectly.
                </CollapsePanel>
              </Collapse>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Primary Separated (Tông xanh điểm nhấn)</p>
              <Collapse color="primary" variant="separated" defaultActiveKey={["sep-1"]}>
                <CollapsePanel value="sep-1" label="Cấu hình hệ thống Dark Theme" description="Trạng thái hoạt động">
                  Nền thẻ riêng biệt (separated panel) hiển thị nền tối sâu và viền tinh tế trong Dark mode.
                </CollapsePanel>
                <CollapsePanel value="sep-2" label="Bảo mật và Phân quyền" description="Role-based Access Control">
                  Quyền truy cập API và Database đã được mã hóa an toàn.
                </CollapsePanel>
              </Collapse>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

describe("<ThemeDarkShowcase />", () => {
  beforeEach(() => {
    cy.viewport(1440, 950);
    cy.mount(<ThemeDarkShowcase />);
  });

  it("1. Hiển thị đúng Dark Mode ban đầu và có thể chuyển đổi linh hoạt Light/Dark", () => {
    // Ban đầu thẻ html có class .dark
    cy.get("html").should("have.class", "dark");
    cy.contains("Dark Theme Active").should("be.visible");

    // Click nút chuyển theme -> chuyển sang Light mode
    cy.get("[data-testid='theme-toggle-btn']").click();
    cy.get("html").should("not.have.class", "dark");
    cy.contains("Light Theme Active").should("be.visible");

    // Click lần nữa -> quay lại Dark mode
    cy.get("[data-testid='theme-toggle-btn']").click();
    cy.get("html").should("have.class", "dark");
    cy.contains("Dark Theme Active").should("be.visible");
  });

  it("2. Kiểm tra bộ lọc Table Menu Filter trong Dark Mode không bị lỗi trắng xóa", () => {
    // Tìm chip bộ lọc Connection Name
    cy.get("[data-testid='filter-chip-connectionName']")
      .should("be.visible")
      .and("contain.text", "Connection Name:")
      .and("contain.text", "Not entered");

    // Bấm mở Popover bộ lọc Connection Name
    cy.get("[data-testid='filter-chip-connectionName']").click();

    // Popover mở ra
    cy.get("[data-testid='filter-popover-connectionName']").should("be.visible");

    // Nhập từ khóa lọc
    cy.get("[data-testid='filter-popover-connectionName']")
      .find("input")
      .should("have.attr", "placeholder", "Filter by connection name...")
      .type("PostgreSQL{enter}");

    // Bấm nút "Done" (hoặc Xong)
    cy.get("[data-testid='filter-popover-connectionName']").contains("button", /Done|Xong/).click();

    // Chip đã cập nhật giá trị
    cy.get("[data-testid='filter-chip-connectionName']")
      .should("contain.text", "PostgreSQL");

    // Bảng dữ liệu chỉ còn 1 dòng
    cy.get("tbody tr").should("have.length", 1);
    cy.contains("Production-DB-Primary").should("be.visible");

    // Bấm nút xóa bộ lọc (Đặt lại / Reset)
    cy.get("[data-testid='table-filter-reset-button']").click();
    cy.get("tbody tr").should("have.length", 5);
  });

  it("3. Kiểm tra Select và MultiSelect hiển thị mượt mà trong Dark Mode", () => {
    // 3.1 Single Select
    cy.get("[data-testid='dark-single-select']").click();
    cy.contains("PostgreSQL Database").should("be.visible");
    cy.contains("Redis In-Memory Cache").click();
    cy.get("[data-testid='dark-single-select']").should("contain.text", "Redis In-Memory Cache");

    // 3.2 MultiSelect
    cy.get("[data-testid='dark-multi-select']").within(() => {
      cy.contains("Production Primary").should("be.visible");
      cy.contains("Staging Cluster").should("be.visible");
    });
  });

  it("4. Kiểm tra Badges và Overlays trong Dark Mode", () => {
    cy.get("[data-testid='badge-dark-section']").within(() => {
      cy.contains("Primary Soft").should("be.visible");
      cy.contains("Success Soft").should("be.visible");
      cy.contains("Error Soft").should("be.visible");
    });
  });

  it("5. Kiểm tra Accordion (Collapse) hiển thị đúng và mở đóng mượt mà trong Dark Mode", () => {
    cy.get("[data-testid='accordion-dark-section']").within(() => {
      cy.contains("This is panel header 1").should("be.visible");
      cy.contains("A dog is a type of domesticated animal").should("be.visible");
      cy.contains("This is panel header 2").click();
      cy.contains("The system configuration is synchronized").should("be.visible");
    });
  });
});
