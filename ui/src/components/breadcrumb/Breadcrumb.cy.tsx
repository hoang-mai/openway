import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./index";
import {
  BreadcrumbSize,
  BreadcrumbVariant,
  BreadcrumbColor,
  BreadcrumbRadius,
  BreadcrumbUnderline,
} from "./types";
import { Badge } from "../badge";

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

const FolderIcon = () => (
  <svg
    data-testid="folder-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-full"
  >
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
);

const CustomDotIcon = () => (
  <span
    data-testid="custom-dot-separator"
    className="size-1.5 rounded-full bg-neutral-400 inline-block mx-1"
  />
);

const sizes: BreadcrumbSize[] = ["sm", "md", "lg"];
const variants: BreadcrumbVariant[] = ["standard", "solid", "bordered"];
const colors: BreadcrumbColor[] = [
  "neutral",
  "primary",
  "secondary",
  "error",
  "success",
  "warning",
  "info",
];
const radii: BreadcrumbRadius[] = ["none", "sm", "md", "lg", "xl", "full"];
const underlines: BreadcrumbUnderline[] = ["none", "hover", "always"];

describe("<Breadcrumb /> Single-Mount Comprehensive Showcase & Verification", () => {
  it("mounts and verifies all features, sizes, variants, colors, separators, dropdown/expand collapsing, external links, disabled states, icons, and badges in a single mount", () => {
    const onButtonClickSpy = cy.spy().as("onButtonClickSpy");
    const onDropdownItemClickSpy = cy.spy().as("onDropdownItemClickSpy");

    const AllInOneBreadcrumbShowcase = () => {
      return (
        <div className="p-8 space-y-10 bg-neutral-50 min-h-screen text-neutral-900 max-w-7xl mx-auto font-sans">
          {/* Header */}
          <div className="border-b border-neutral-200 pb-5">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Breadcrumb Component - Single-Mount Comprehensive Showcase
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Kiểm thử toàn diện và trực quan trong 1 lần mount duy nhất: Compound Components, Data-driven items,
              Sizes, Variants, Colors, Radius, Underlines, Separators, Collapsing (Dropdown & Expand), External Links, Disabled.
            </p>
          </div>

          {/* 1. Compound Components */}
          <section className="space-y-4" data-testid="section-compound">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                1. Compound Components (Breadcrumb, List, Item, Link, Page, Separator)
              </h2>
              <span className="text-xs text-neutral-400">Standard Notion Style</span>
            </div>
            <div className="p-4 bg-white rounded-lg border border-neutral-200">
              <Breadcrumb ariaLabel="Thanh điều hướng chính">
                <BreadcrumbList data-testid="compound-breadcrumb-list">
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/" startIcon={<HomeIcon />}>
                      Trang chủ
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink onClick={onButtonClickSpy} data-testid="button-link">
                      Dự án
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage startIcon={<FolderIcon />} data-testid="active-page">
                      Cài đặt hệ thống
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </section>

          {/* 2. Data-driven items prop */}
          <section className="space-y-4" data-testid="section-data-driven">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                2. Data-driven Mode (items prop)
              </h2>
              <span className="text-xs text-neutral-400">Array of items</span>
            </div>
            <div className="p-4 bg-white rounded-lg border border-neutral-200" data-testid="data-driven-container">
              <Breadcrumb
                items={[
                  { label: "Trang chủ", href: "/home", icon: <HomeIcon /> },
                  { label: "Tài liệu", href: "/docs" },
                  { label: "Lập trình", href: "/docs/coding" },
                  { label: "Hướng dẫn Breadcrumb" },
                ]}
              />
            </div>
          </section>

          {/* 3. Sizes */}
          <section className="space-y-4" data-testid="section-sizes">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                3. Sizes (size="sm" | "md" | "lg")
              </h2>
              <span className="text-xs text-neutral-400">3 standard sizes</span>
            </div>
            <div className="p-4 bg-white rounded-lg border border-neutral-200 space-y-4">
              {sizes.map((size) => (
                <div key={size} data-testid={`breadcrumb-size-${size}`}>
                  <span className="text-xs font-mono text-neutral-400 block mb-1 uppercase">Size {size}:</span>
                  <Breadcrumb
                    size={size}
                    items={[
                      { label: "Trang chủ", href: "/" },
                      { label: "Danh mục", href: "/cat" },
                      { label: `Size ${size.toUpperCase()} Trang hiện tại` },
                    ]}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 4. Variants */}
          <section className="space-y-4" data-testid="section-variants">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                4. Variants (variant="standard" | "solid" | "bordered")
              </h2>
              <span className="text-xs text-neutral-400">3 visual styles</span>
            </div>
            <div className="p-4 bg-white rounded-lg border border-neutral-200 space-y-4">
              {variants.map((variant) => (
                <div key={variant} data-testid={`breadcrumb-variant-${variant}`}>
                  <span className="text-xs font-mono text-neutral-400 block mb-1 uppercase">Variant {variant}:</span>
                  <Breadcrumb
                    variant={variant}
                    items={[
                      { label: "Trang chủ", href: "/" },
                      { label: "Cấu hình", href: "/settings" },
                      { label: `Variant ${variant}` },
                    ]}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 5. Colors */}
          <section className="space-y-4" data-testid="section-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                5. Colors (7 Design System Colors)
              </h2>
              <span className="text-xs text-neutral-400">neutral, primary, secondary, error...</span>
            </div>
            <div className="p-4 bg-white rounded-lg border border-neutral-200 space-y-3">
              {colors.map((color) => (
                <div key={color} data-testid={`breadcrumb-color-${color}`}>
                  <Breadcrumb
                    color={color}
                    items={[
                      { label: "Trang chủ", href: "/" },
                      { label: "Phân hệ", href: "/module" },
                      { label: `Color ${color}` },
                    ]}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 6. Custom Separators */}
          <section className="space-y-4" data-testid="section-separators">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                6. Custom Separators (slash, arrow, custom icon)
              </h2>
              <span className="text-xs text-neutral-400">String or ReactNode</span>
            </div>
            <div className="p-4 bg-white rounded-lg border border-neutral-200 space-y-4">
              <div data-testid="sep-slash">
                <Breadcrumb
                  separator="/"
                  items={[
                    { label: "Kho", href: "/storage" },
                    { label: "Hàng hóa", href: "/items" },
                    { label: "Chi tiết" },
                  ]}
                />
              </div>
              <div data-testid="sep-arrow">
                <Breadcrumb
                  separator=">"
                  items={[
                    { label: "Bảng điều khiển", href: "/dashboard" },
                    { label: "Báo cáo", href: "/reports" },
                    { label: "Tháng 9" },
                  ]}
                />
              </div>
              <div data-testid="sep-custom-dot">
                <Breadcrumb
                  separator={<CustomDotIcon />}
                  items={[
                    { label: "Cài đặt", href: "/settings" },
                    { label: "Bảo mật", href: "/security" },
                    { label: "Mật khẩu" },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* 7. Collapsing with Dropdown Menu */}
          <section className="space-y-4" data-testid="section-collapsing-dropdown">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                7. Collapsing with Dropdown Menu (maxItems=3, collapseMode="dropdown")
              </h2>
              <span className="text-xs text-neutral-400">Clicking ellipsis opens Dropdown</span>
            </div>
            <div className="p-4 bg-white rounded-lg border border-neutral-200" data-testid="dropdown-collapsing-container">
              <Breadcrumb
                maxItems={3}
                itemsBeforeCollapse={1}
                itemsAfterCollapse={1}
                collapseMode="dropdown"
                items={[
                  { label: "Trang chủ", href: "/" },
                  {
                    label: "Sản phẩm ẩn",
                    onClick: (e) => {
                      e?.preventDefault?.();
                      onDropdownItemClickSpy();
                    },
                  },
                  { label: "Thiết bị điện tử ẩn", href: "/products/electronics" },
                  { label: "Điện thoại thông minh ẩn", href: "/products/phones" },
                  { label: "iPhone 16 Pro Max" },
                ]}
              />
            </div>
          </section>

          {/* 8. Collapsing with Expand Mode */}
          <section className="space-y-4" data-testid="section-collapsing-expand">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                8. Collapsing with Expand Mode (maxItems=3, collapseMode="expand")
              </h2>
              <span className="text-xs text-neutral-400">Clicking ellipsis reveals all</span>
            </div>
            <div className="p-4 bg-white rounded-lg border border-neutral-200" data-testid="expand-collapsing-container">
              <Breadcrumb
                maxItems={3}
                collapseMode="expand"
                items={[
                  { label: "Root", href: "/root" },
                  { label: "Folder A", href: "/root/a" },
                  { label: "Folder B", href: "/root/b" },
                  { label: "Folder C", href: "/root/c" },
                  { label: "Current File" },
                ]}
              />
            </div>
          </section>

          {/* 9. External Links & Disabled States */}
          <section className="space-y-4" data-testid="section-external-disabled">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                9. External Links & Disabled States
              </h2>
              <span className="text-xs text-neutral-400">target="_blank" and opacity-50</span>
            </div>
            <div className="p-4 bg-white rounded-lg border border-neutral-200 space-y-4">
              <div data-testid="external-link-container">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="https://notion.so" external data-testid="external-breadcrumb-link">
                        Tài liệu Notion
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem disabled>
                      <BreadcrumbLink href="/locked" data-testid="disabled-breadcrumb-link">
                        Mục bị khóa
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
          </section>

          {/* 10. Badges & Icons */}
          <section className="space-y-4" data-testid="section-badges-icons">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                10. Badges & End Icons
              </h2>
              <span className="text-xs text-neutral-400">With Badge component</span>
            </div>
            <div className="p-4 bg-white rounded-lg border border-neutral-200" data-testid="badges-container">
              <Breadcrumb
                items={[
                  { label: "Hộp thư", href: "/inbox", icon: <HomeIcon /> },
                  {
                    label: "Thông báo",
                    href: "/notifications",
                    badge: <Badge size="xs" color="error" data-testid="sample-badge">5 mới</Badge>,
                  },
                  { label: "Chi tiết thư" },
                ]}
              />
            </div>
          </section>

          {/* 11. Underlines */}
          <section className="space-y-4" data-testid="section-underlines">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                11. Underline Styles (none, hover, always)
              </h2>
              <span className="text-xs text-neutral-400">underline prop</span>
            </div>
            <div className="p-4 bg-white rounded-lg border border-neutral-200 space-y-3">
              {underlines.map((u) => (
                <div key={u} data-testid={`underline-${u}`}>
                  <Breadcrumb
                    underline={u}
                    items={[
                      { label: `Underline ${u}`, href: "/u" },
                      { label: "Trang hiện tại" },
                    ]}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 12. Radii */}
          <section className="space-y-4" data-testid="section-radii">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                12. Radius Customizations
              </h2>
              <span className="text-xs text-neutral-400">none, sm, md, lg, xl, full</span>
            </div>
            <div className="p-4 bg-white rounded-lg border border-neutral-200 space-y-3">
              {radii.map((r) => (
                <div key={r} data-testid={`radius-${r}`}>
                  <Breadcrumb
                    variant="solid"
                    radius={r}
                    items={[
                      { label: `Radius ${r}`, href: "/r" },
                      { label: "Đang xem" },
                    ]}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      );
    };

    // MOUNT TOÀN BỘ TẤT CẢ TRONG 1 LẦN MOUNT DUY NHẤT!
    cy.mount(<AllInOneBreadcrumbShowcase />);

    // 1. Verify Compound Components
    cy.get('[data-testid="section-compound"] nav')
      .should("have.attr", "aria-label", "Thanh điều hướng chính");
    cy.get('[data-testid="compound-breadcrumb-list"]').should("be.visible");
    cy.get('[data-testid="section-compound"]').within(() => {
      cy.contains("Trang chủ").should("be.visible");
      cy.contains("Dự án").should("be.visible");
      cy.contains("Cài đặt hệ thống").should("be.visible");
    });
    cy.get('[data-testid="active-page"]')
      .should("have.attr", "aria-current", "page");
    cy.get('[data-testid="button-link"]').click();
    cy.get("@onButtonClickSpy").should("have.been.calledOnce");

    // 2. Verify Data-driven items
    cy.get('[data-testid="data-driven-container"]').within(() => {
      cy.contains("Trang chủ").should("be.visible");
      cy.contains("Tài liệu").should("be.visible");
      cy.contains("Lập trình").should("be.visible");
      cy.contains("Hướng dẫn Breadcrumb").should("be.visible");
      cy.get('[aria-current="page"]').should("contain", "Hướng dẫn Breadcrumb");
    });

    // 3. Verify Sizes
    sizes.forEach((size) => {
      cy.get(`[data-testid="breadcrumb-size-${size}"]`)
        .should("be.visible")
        .and("contain.text", `Size ${size.toUpperCase()}`);
    });

    // 4. Verify Variants
    variants.forEach((variant) => {
      cy.get(`[data-testid="breadcrumb-variant-${variant}"]`)
        .should("be.visible")
        .and("contain.text", `Variant ${variant}`);
    });

    // 5. Verify Colors
    colors.forEach((color) => {
      cy.get(`[data-testid="breadcrumb-color-${color}"]`)
        .should("be.visible")
        .and("contain.text", `Color ${color}`);
    });

    // 6. Verify Separators
    cy.get('[data-testid="sep-slash"]').contains("/").should("be.visible");
    cy.get('[data-testid="sep-arrow"]').contains(">").should("be.visible");
    cy.get('[data-testid="custom-dot-separator"]').should("have.length", 2);

    // 7. Verify Collapsing with Dropdown Menu
    cy.get('[data-testid="dropdown-collapsing-container"]').within(() => {
      cy.contains("Trang chủ").should("be.visible");
      cy.contains("iPhone 16 Pro Max").should("be.visible");
      cy.contains("Sản phẩm ẩn").should("not.exist");
      cy.get('button[aria-label="Hiển thị thêm đường dẫn"]').should("be.visible").click();
    });
    // Dropdown xuất hiện và có thể click item bên trong
    cy.contains("Sản phẩm ẩn").should("be.visible").click();
    cy.get("@onDropdownItemClickSpy").should("have.been.calledOnce");

    // 8. Verify Collapsing with Expand Mode
    cy.get('[data-testid="expand-collapsing-container"]').within(() => {
      cy.contains("Root").should("be.visible");
      cy.contains("Current File").should("be.visible");
      cy.contains("Folder A").should("not.exist");
      cy.get('button[aria-label="Hiển thị thêm đường dẫn"]').click();
      cy.contains("Folder A").should("be.visible");
      cy.contains("Folder B").should("be.visible");
      cy.contains("Folder C").should("be.visible");
    });

    // 9. Verify External Link & Disabled State
    cy.get('[data-testid="external-breadcrumb-link"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "rel")
      .and("include", "noopener");

    cy.get('[data-testid="disabled-breadcrumb-link"]')
      .should("have.class", "opacity-50");

    // 10. Verify Badges
    cy.get('[data-testid="sample-badge"]')
      .should("be.visible")
      .and("contain.text", "5 mới");

    // 11. Verify Underline & Radius
    underlines.forEach((u) => {
      cy.get(`[data-testid="underline-${u}"]`).should("be.visible");
    });
    radii.forEach((r) => {
      cy.get(`[data-testid="radius-${r}"]`).should("be.visible");
    });
  });
});
