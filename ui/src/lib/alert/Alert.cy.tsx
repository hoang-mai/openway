import React, { useState } from "react";
import { Alert } from "./index";
import { AlertColor, AlertRadius, AlertSize, AlertVariant } from "./types";
import { Button } from "../button";

const sizes: AlertSize[] = ["xs", "sm", "md", "lg", "xl"];
const variants: AlertVariant[] = ["soft", "filled", "outline", "accent-left", "ghost", "other"];
const colors: AlertColor[] = ["primary", "secondary", "neutral", "error", "success", "warning", "info"];
const radii: AlertRadius[] = ["none", "sm", "md", "lg", "xl", "full"];

describe("<Alert /> Single-Mount Comprehensive Showcase & Verification", () => {
  it("mounts and verifies all sizes, variants, colors, radius, icons, actions, closable alerts, title-only (no body), prop description and banner mode in a single mount", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    const onActionClickSpy = cy.spy().as("onActionClickSpy");

    const AllInOneAlertShowcase = () => {
      const [dismissed, setDismissed] = useState(false);

      return (
        <div className="p-8 bg-neutral-50 min-h-screen text-neutral-900 space-y-10 max-w-7xl mx-auto font-sans relative">
          {/* Header */}
          <div className="border-b border-neutral-200 pb-5">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Alert Component - Single-Mount Comprehensive Showcase
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Trưng bày trực quan và kiểm thử toàn bộ 5 Sizes, 6 Variants, 7 Colors, Radius, Icons, Actions, Banner
              Mode, Title-Only (No Body), prop description và Closable (tự đóng và có callback).
            </p>
          </div>

          {/* 1. All 5 Sizes */}
          <section className="space-y-4" data-testid="section-sizes">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                {'1. Sizes (size="xs" | "sm" | "md" | "lg" | "xl")'}
              </h2>
              <span className="text-xs text-neutral-400">5 standard sizes</span>
            </div>
            <div className="space-y-3">
              {sizes.map((size) => (
                <div key={size} data-testid={`alert-size-${size}`}>
                  <Alert
                    size={size}
                    color="primary"
                    title={`Size ${size.toUpperCase()}`}
                    description={`Đây là thông báo kích cỡ ${size}.`}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 2. All 6 Variants */}
          <section className="space-y-4" data-testid="section-variants">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                {'2. Variants (variant="soft" | "filled" | "outline" | "accent-left" | "ghost" | "other")'}
              </h2>
              <span className="text-xs text-neutral-400">6 visual variants</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {variants.map((variant) => (
                <div key={variant} data-testid={`alert-variant-${variant}`}>
                  <Alert
                    variant={variant}
                    color="info"
                    className={variant === "other" ? "bg-purple-100 text-purple-900 border-2 border-purple-300" : ""}
                    title={`Variant: ${variant}`}
                    description={`Hiển thị biến thể ${variant}.`}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 3. All 7 Colors (Soft & Filled) */}
          <section className="space-y-4" data-testid="section-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                3. Color Themes (primary, secondary, neutral, error, success, warning, info)
              </h2>
              <span className="text-xs text-neutral-400">7 system colors</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Soft Colors */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-neutral-500 uppercase">Soft Variant (Default)</h3>
                {colors.map((color) => (
                  <div key={`soft-${color}`} data-testid={`alert-color-soft-${color}`}>
                    <Alert
                      variant="soft"
                      color={color}
                      title={`Color: ${color}`}
                      description={`Thông báo với chủ đề màu ${color}.`}
                    />
                  </div>
                ))}
              </div>

              {/* Filled Colors */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-neutral-500 uppercase">Filled Variant</h3>
                {colors.map((color) => (
                  <div key={`filled-${color}`} data-testid={`alert-color-filled-${color}`}>
                    <Alert
                      variant="filled"
                      color={color}
                      title={`Filled: ${color}`}
                      description={`Thông báo nền đậm chủ đề ${color}.`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Radius Options */}
          <section className="space-y-4" data-testid="section-radius">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                {'4. Radius (none | sm | md | lg | xl | full)'}
              </h2>
              <span className="text-xs text-neutral-400">Độ bo góc tùy chỉnh</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {radii.map((radius) => (
                <div key={radius} data-testid={`alert-radius-${radius}`}>
                  <Alert
                    radius={radius}
                    color="secondary"
                    variant="soft"
                    title={`Radius: ${radius}`}
                    description={`Bo góc kiểu ${radius}`}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 5. Custom Icon & Visibility */}
          <section className="space-y-4" data-testid="section-icons">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">5. Icon Variations</h2>
              <span className="text-xs text-neutral-400">Tùy biến hoặc ẩn icon</span>
            </div>
            <div className="space-y-3">
              <div data-testid="alert-icon-auto">
                <Alert color="success" title="Auto Check Icon" description="Icon tự động sinh theo màu success." />
              </div>
              <div data-testid="alert-icon-hidden">
                <Alert icon={false} closable={false} color="warning" title="No Icon" description="Ẩn icon với prop icon={false}." />
              </div>
              <div data-testid="alert-icon-custom">
                <Alert
                  icon={<span data-testid="emoji-icon" className="text-xl leading-none">🚀</span>}
                  color="primary"
                  title="Custom ReactNode Icon"
                  description="Truyền icon tự chọn qua prop icon."
                />
              </div>
            </div>
          </section>

          {/* 6. Action Slot & Children */}
          <section className="space-y-4" data-testid="section-actions">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">6. Action Slot & Custom Children</h2>
              <span className="text-xs text-neutral-400">Tương tác và tùy biến nội dung</span>
            </div>
            <div className="space-y-3">
              <div data-testid="alert-action-slot">
                <Alert
                  color="info"
                  title="Có bản cập nhật mới"
                  description="Vui lòng tải lại trang để trải nghiệm tính năng mới."
                  action={
                    <Button
                      data-testid="alert-action-button"
                      size="xs"
                      variant="filled"
                      color="info"
                      onClick={() => onActionClickSpy()}
                    >
                      Cập nhật ngay
                    </Button>
                  }
                />
              </div>

              <div data-testid="alert-children-body">
                <Alert color="secondary" title="Alert using Children">
                  <div data-testid="custom-children-content" className="flex items-center gap-2 mt-1">
                    <span className="inline-block size-2 rounded-full bg-secondary-500" />
                    <span>Nội dung tuỳ biến dạng JSX truyền qua children.</span>
                  </div>
                </Alert>
              </div>
            </div>
          </section>

          {/* 7. Closable (Self-Dismissing & Callback) */}
          <section className="space-y-4" data-testid="section-closable">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">7. Closable & Self-Dismissing</h2>
              <span className="text-xs text-neutral-400">Tự đóng và gọi callback onClose</span>
            </div>
            <div className="space-y-3">
              {/* Case 1: Tự đóng có callback onClose */}
              <div data-testid="alert-closable-item">
                {!dismissed && (
                  <Alert
                    closable
                    color="warning"
                    title="Thông báo có callback onClose"
                    description="Bấm vào nút x để tắt và gọi callback onClose."
                    onClose={() => {
                      setDismissed(true);
                      onCloseSpy();
                    }}
                  />
                )}
              </div>
              {dismissed && (
                <div data-testid="dismiss-feedback" className="text-xs text-success-600 font-medium">
                  ✓ Alert đã được đóng thành công!
                </div>
              )}

              {/* Case 2: Tự đóng hoàn toàn KHÔNG CẦN onClose */}
              <div data-testid="alert-self-dismiss-container">
                <Alert
                  closable
                  color="info"
                  title="Tự đóng không cần onClose"
                  description="Bấm vào nút x bên phải, Alert tự ẩn khỏi màn hình mà không cần truyền callback."
                />
              </div>
            </div>
          </section>

          {/* 8. Banner Mode */}
          <section className="space-y-4" data-testid="section-banner">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">8. Banner Mode (banner=true)</h2>
              <span className="text-xs text-neutral-400">Toàn màn hình, không bo góc</span>
            </div>
            <div data-testid="alert-banner-container" className="border border-neutral-300 rounded-lg overflow-hidden">
              <Alert
                banner
                color="error"
                title="Bảo trì hệ thống định kỳ"
                description="Hệ thống sẽ tạm ngừng dịch vụ từ 00:00 đến 02:00 sáng mai."
                action={
                  <Button size="xs" variant="outline" color="error">
                    Chi tiết
                  </Button>
                }
              />
            </div>
          </section>

          {/* 9. Title Only (No Body / Single-Line Alert) */}
          <section className="space-y-4" data-testid="section-no-body">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                9. Title Only / Single-Line Alert (Không có Body/Description)
              </h2>
              <span className="text-xs text-neutral-400">items-center, chỉ có 1 dòng duy nhất</span>
            </div>
            <div className="space-y-3">
              <div data-testid="alert-no-body">
                <Alert
                  color="success"
                  title="Thao tác hoàn tất thành công!"
                />
              </div>
            </div>
          </section>
        </div>
      );
    };

    // Mount all in 1 single mount!
    cy.mount(<AllInOneAlertShowcase />);

    // 1. Verify Sizes
    sizes.forEach((size) => {
      cy.get(`[data-testid="alert-size-${size}"]`)
        .should("be.visible")
        .and("contain.text", `Size ${size.toUpperCase()}`);
    });

    // 2. Verify Variants
    variants.forEach((variant) => {
      cy.get(`[data-testid="alert-variant-${variant}"]`)
        .should("be.visible")
        .and("contain.text", `Variant: ${variant}`);
    });

    // 3. Verify Colors (Soft & Filled)
    colors.forEach((color) => {
      cy.get(`[data-testid="alert-color-soft-${color}"]`).should("be.visible").and("contain.text", `Color: ${color}`);
      cy.get(`[data-testid="alert-color-filled-${color}"]`)
        .should("be.visible")
        .and("contain.text", `Filled: ${color}`);
    });

    // 4. Verify Radius
    radii.forEach((radius) => {
      cy.get(`[data-testid="alert-radius-${radius}"]`).should("be.visible").and("contain.text", `Radius: ${radius}`);
    });

    // 5. Verify Icons
    cy.get('[data-testid="alert-icon-auto"] svg').should("exist");
    cy.get('[data-testid="alert-icon-hidden"] svg').should("not.exist");
    cy.get('[data-testid="emoji-icon"]').should("be.visible");

    // 6. Verify Action Slot & Children
    cy.get('[data-testid="alert-action-button"]').should("be.visible").click();
    cy.get("@onActionClickSpy").should("have.been.calledOnce");
    cy.get('[data-testid="custom-children-content"]').should("be.visible");

    // 7. Verify Banner Mode Classes
    cy.get('[data-testid="alert-banner-container"] [role="alert"]')
      .should("have.class", "rounded-none")
      .should("have.class", "border-x-0")
      .should("have.class", "w-full");

    // 8. Verify Closable with onClose callback
    cy.get('[data-testid="alert-closable-item"] button[aria-label="Close alert"]').should("be.visible").click();
    cy.wait(100);
    cy.get("@onCloseSpy").should("have.been.calledOnce");
    cy.get('[data-testid="dismiss-feedback"]').should("be.visible");

    // 9. Verify Self-Dismissing WITHOUT onClose callback
    cy.get('[data-testid="alert-self-dismiss-container"] [role="status"]').should("be.visible");
    cy.get('[data-testid="alert-self-dismiss-container"] button[aria-label="Close alert"]').click();
    cy.get('[data-testid="alert-self-dismiss-container"] [role="status"]').should("not.exist");

    // 10. Verify Title Only / No Body (Single-Line Alert uses items-center)
    cy.get('[data-testid="alert-no-body"] [role="status"]')
      .should("be.visible")
      .and("have.class", "items-center")
      .and("contain.text", "Thao tác hoàn tất thành công!");
  });
});
