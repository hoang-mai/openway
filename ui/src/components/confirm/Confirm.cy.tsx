import React, { useState } from "react";
import {
  Confirm,
  ConfirmContainer,
  ConfirmHeader,
  ConfirmBody,
  ConfirmFooter,
  ConfirmClose,
} from "./index";
import { ConfirmColor, ConfirmRadius, ConfirmSize } from "./types";
import { Button } from "../button";

const sizes: ConfirmSize[] = ["xs", "sm", "md", "lg", "xl"];
const colors: ConfirmColor[] = ["warning", "error", "primary", "secondary", "neutral", "success", "info"];
const radii: ConfirmRadius[] = ["none", "sm", "md", "lg", "xl", "full"];

describe("<ConfirmContainer /> Comprehensive Showcase & Verification", () => {
  it("mounts ConfirmContainer with Pure Compound pattern, verifying sizes, colors, radii, top-layer breakout, ESC, backdrop, async loading, and ConfirmClose", () => {
    const onConfirmSpy = cy.spy().as("onConfirmSpy");
    const onCancelSpy = cy.spy().as("onCancelSpy");
    const onCloseSpy = cy.spy().as("onCloseSpy");
    const onAsyncConfirmSpy = cy.spy().as("onAsyncConfirmSpy");

    const ConfirmShowcase = () => {
      const [isOpenStandard, setIsOpenStandard] = useState(false);
      const [isOpenInOverflowAuto, setIsOpenInOverflowAuto] = useState(false);
      const [isOpenInOverflowHidden, setIsOpenInOverflowHidden] = useState(false);
      const [isOpenAsync, setIsOpenAsync] = useState(false);
      const [isOpenCompound, setIsOpenCompound] = useState(false);
      const [isOpenControlled, setIsOpenControlled] = useState(false);
      const [activeSize, setActiveSize] = useState<ConfirmSize>("md");
      const [activeColor, setActiveColor] = useState<ConfirmColor>("warning");
      const [statusMessage, setStatusMessage] = useState("");

      const handleAsyncConfirm = async () => {
        onAsyncConfirmSpy();
        await new Promise((resolve) => setTimeout(resolve, 300));
        setStatusMessage("Async confirmed!");
      };

      return (
        <div className="p-8 bg-neutral-50 min-h-screen text-neutral-900 space-y-8 max-w-7xl mx-auto font-sans">
          {/* Header */}
          <div className="border-b border-neutral-200 pb-5">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Confirm Component &amp; Native &lt;dialog&gt; Top Layer
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Mount trực tiếp ConfirmContainer theo mô hình Pure Compound Pattern, kiểm thử Top-layer breakout từ overflow container, hiệu ứng đóng, phím ESC, và trạng thái async loading.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-wrap gap-4 items-center">
            <Button
              data-testid="btn-open-standard"
              variant="filled"
              color="warning"
              onClick={() => {
                setActiveColor("warning");
                setActiveSize("md");
                setIsOpenStandard(true);
              }}
            >
              ⚠️ Mở Confirm Chuẩn (Warning)
            </Button>

            <Button
              data-testid="btn-open-error"
              variant="filled"
              color="error"
              onClick={() => {
                setActiveColor("error");
                setActiveSize("lg");
                setIsOpenStandard(true);
              }}
            >
              🗑️ Mở Confirm Xóa (Error)
            </Button>

            <Button
              data-testid="btn-open-async"
              variant="filled"
              color="primary"
              onClick={() => setIsOpenAsync(true)}
            >
              ⏳ Mở Confirm Async Loading
            </Button>

            <Button
              data-testid="btn-open-compound"
              variant="outline"
              color="secondary"
              onClick={() => setIsOpenCompound(true)}
            >
              🧩 Mở Compound Custom Confirm
            </Button>

            <Button
              data-testid="btn-open-controlled"
              variant="filled"
              color="success"
              onClick={() => setIsOpenControlled(true)}
            >
              🎯 Mở Controlled ConfirmClose
            </Button>
          </div>

          {statusMessage && (
            <div data-testid="status-message" className="text-sm font-medium text-success-600">
              {statusMessage}
            </div>
          )}

          {/* 1. Standard Interactive Dialog */}
          <ConfirmContainer
            open={isOpenStandard}
            size={activeSize}
            color={activeColor}
            onClose={() => {
              onCloseSpy();
              setIsOpenStandard(false);
            }}
          >
            <Confirm data-testid="interactive-standard-dialog">
              <ConfirmHeader
                title="Xác nhận thực hiện thao tác"
                showCloseButton
                onClose={() => {
                  onCloseSpy();
                  setIsOpenStandard(false);
                }}
              />
              <ConfirmBody>
                <p id="confirm-dialog-description">
                  Bạn có chắc chắn muốn tiếp tục thực hiện hành động này không? Dữ liệu có thể bị thay đổi.
                </p>
              </ConfirmBody>
              <ConfirmFooter
                confirmText="Tiếp tục"
                cancelText="Hủy bỏ"
                onConfirm={() => {
                  onConfirmSpy();
                  setStatusMessage("Confirmed standard!");
                  setIsOpenStandard(false);
                }}
                onCancel={() => {
                  onCancelSpy();
                  setStatusMessage("Cancelled standard!");
                  setIsOpenStandard(false);
                }}
                onClose={() => {
                  onCloseSpy();
                  setIsOpenStandard(false);
                }}
              />
            </Confirm>
          </ConfirmContainer>

          {/* 2. Interactive Async Dialog */}
          <ConfirmContainer
            open={isOpenAsync}
            color="primary"
            onClose={() => setIsOpenAsync(false)}
          >
            <Confirm data-testid="interactive-async-dialog">
              <ConfirmHeader title="Đang đồng bộ hóa dữ liệu" />
              <ConfirmBody>
                Quá trình này có thể mất vài giây. Vui lòng bấm Xác nhận để bắt đầu.
              </ConfirmBody>
              <ConfirmFooter
                confirmText="Bắt đầu đồng bộ"
                cancelText="Để sau"
                onConfirm={async () => {
                  await handleAsyncConfirm();
                  setIsOpenAsync(false);
                }}
                onClose={() => setIsOpenAsync(false)}
              />
            </Confirm>
          </ConfirmContainer>

          {/* 3. Interactive Compound Dialog with Custom Body */}
          <ConfirmContainer
            open={isOpenCompound}
            size="lg"
            color="secondary"
            onClose={() => setIsOpenCompound(false)}
          >
            <Confirm data-testid="interactive-compound-dialog">
              <ConfirmHeader
                title="Tùy biến với Named Sub-Components"
                showCloseButton
                onClose={() => setIsOpenCompound(false)}
              />
              <ConfirmBody>
                <div data-testid="compound-custom-body" className="space-y-2 py-2">
                  <p className="text-sm text-neutral-600">
                    Đây là nội dung tùy biến hoàn toàn thông qua ConfirmBody.
                  </p>
                  <div className="p-3 bg-secondary-50 border border-secondary-200 rounded-lg text-xs text-secondary-800">
                    💡 Bạn có thể chèn bảng, danh sách hoặc form bất kỳ tại đây.
                  </div>
                </div>
              </ConfirmBody>
              <ConfirmFooter
                confirmText="Hoàn tất"
                cancelText="Đóng"
                onConfirm={() => {
                  setStatusMessage("Compound confirmed!");
                  setIsOpenCompound(false);
                }}
                onCancel={() => setIsOpenCompound(false)}
              />
            </Confirm>
          </ConfirmContainer>

          {/* 4. Interactive Controlled with ConfirmClose */}
          <ConfirmContainer
            open={isOpenControlled}
            size="md"
            color="success"
            onClose={() => setIsOpenControlled(false)}
          >
            <Confirm data-testid="interactive-controlled-dialog">
              <ConfirmHeader title="Controlled ConfirmContainer" showCloseButton />
              <ConfirmBody>
                Mount trực tiếp qua ConfirmContainer với Pure Compound pattern và ConfirmClose.
              </ConfirmBody>
              <ConfirmFooter>
                <ConfirmClose>
                  <Button variant="outline" data-testid="btn-controlled-close">Đóng lại</Button>
                </ConfirmClose>
                <Button
                  color="success"
                  data-testid="btn-controlled-confirm"
                  onClick={() => {
                    setStatusMessage("Controlled confirmed!");
                    setIsOpenControlled(false);
                  }}
                >
                  Xác nhận Controlled
                </Button>
              </ConfirmFooter>
            </Confirm>
          </ConfirmContainer>

          {/* 5. CASE TEST: ConfirmContainer nested inside an `overflow-auto` container */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-primary-600">
              Trường hợp 1: ConfirmContainer đặt bên trong thẻ div có `overflow-auto` (kích thước nhỏ 250px x 150px)
            </h2>
            <div
              data-testid="parent-overflow-auto"
              className="w-62.5 h-37.5 overflow-auto border-2 border-dashed border-red-400 bg-red-50/50 p-3 rounded-lg relative"
            >
              <p className="text-xs text-red-600 font-medium mb-2">
                Khung cha nhỏ (250px x 150px), `overflow-auto`.
              </p>
              <Button
                data-testid="btn-trigger-in-overflow-auto"
                size="sm"
                color="secondary"
                onClick={() => setIsOpenInOverflowAuto(true)}
              >
                Mở Confirm từ trong này
              </Button>

              <ConfirmContainer
                open={isOpenInOverflowAuto}
                size="md"
                color="warning"
                onClose={() => setIsOpenInOverflowAuto(false)}
              >
                <Confirm>
                  <ConfirmHeader
                    title="Confirm Thoát Khỏi overflow-auto"
                    showCloseButton
                  />
                  <ConfirmBody>
                    <div data-testid="overflow-auto-content" className="space-y-2">
                      <p className="text-sm text-neutral-700">
                        Kích thước hộp thoại (440px) rộng hơn nhiều so với khung cha (250px) và không bị cắt xén!
                      </p>
                    </div>
                  </ConfirmBody>
                  <ConfirmFooter>
                    <ConfirmClose>
                      <Button
                        variant="outline"
                        data-testid="btn-overflow-auto-close"
                      >
                        Đóng Confirm
                      </Button>
                    </ConfirmClose>
                  </ConfirmFooter>
                </Confirm>
              </ConfirmContainer>
            </div>
          </section>

          {/* 6. CASE TEST: ConfirmContainer nested inside an `overflow-hidden` container */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-primary-600">
              Trường hợp 2: ConfirmContainer đặt bên trong thẻ div có `overflow-hidden` (kích thước 220px x 120px)
            </h2>
            <div
              data-testid="parent-overflow-hidden"
              className="w-55 h-30 overflow-hidden border-2 border-dashed border-purple-400 bg-purple-50/50 p-3 rounded-lg relative"
            >
              <p className="text-xs text-purple-600 font-medium mb-2">
                Khung cha nhỏ (220px x 120px), `overflow-hidden`.
              </p>
              <Button
                data-testid="btn-trigger-in-overflow-hidden"
                size="sm"
                color="secondary"
                onClick={() => setIsOpenInOverflowHidden(true)}
              >
                Mở Confirm
              </Button>

              <ConfirmContainer
                open={isOpenInOverflowHidden}
                size="md"
                color="error"
                onClose={() => setIsOpenInOverflowHidden(false)}
              >
                <Confirm>
                  <ConfirmHeader
                    title="Confirm Thoát Khỏi overflow-hidden"
                    showCloseButton
                  />
                  <ConfirmBody>
                    <p data-testid="overflow-hidden-content" className="text-sm text-neutral-700">
                      Nổi hoàn toàn trên toàn bộ viewport trình duyệt.
                    </p>
                  </ConfirmBody>
                  <ConfirmFooter>
                    <ConfirmClose>
                      <Button
                        variant="outline"
                        data-testid="btn-overflow-hidden-close"
                      >
                        Đóng
                      </Button>
                    </ConfirmClose>
                  </ConfirmFooter>
                </Confirm>
              </ConfirmContainer>
            </div>
          </section>

          {/* 7. Static Visual Preview of Sizes */}
          <section className="space-y-4" data-testid="section-sizes">
            <h2 className="text-base font-semibold text-primary-600">Kiểm tra 5 Kích cỡ (xs, sm, md, lg, xl)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sizes.map((size) => (
                <div
                  key={size}
                  data-testid={`preview-size-${size}`}
                  className="p-3 bg-white rounded-lg border border-neutral-200"
                >
                  <Confirm size={size} color="primary" className="relative shadow-none border">
                    <ConfirmHeader title={`Size ${size.toUpperCase()}`} />
                    <ConfirmBody>
                      {`Kích cỡ ${size} của Confirm dialog.`}
                    </ConfirmBody>
                    <ConfirmFooter confirmText="Đồng ý" cancelText="Hủy" />
                  </Confirm>
                </div>
              ))}
            </div>
          </section>

          {/* 8. Static Visual Preview of 7 Colors */}
          <section className="space-y-4" data-testid="section-colors">
            <h2 className="text-base font-semibold text-primary-600">
              Kiểm tra 7 Colors (warning, error, primary, secondary, neutral, success, info)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {colors.map((color) => (
                <div
                  key={color}
                  data-testid={`preview-color-${color}`}
                  className="p-3 bg-white rounded-lg border border-neutral-200"
                >
                  <Confirm size="sm" color={color} className="relative shadow-none border">
                    <ConfirmHeader title={`Color ${color}`} />
                    <ConfirmBody>
                      {`Chủ đề màu: ${color}.`}
                    </ConfirmBody>
                    <ConfirmFooter confirmText="Xác nhận" cancelText="Bỏ qua" />
                  </Confirm>
                </div>
              ))}
            </div>
          </section>

          {/* 9. Radius Preview */}
          <section className="space-y-4" data-testid="section-radius">
            <h2 className="text-base font-semibold text-primary-600">Kiểm tra Radius Options (none, sm, md, lg, xl, full)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {radii.map((radius) => (
                <div
                  key={radius}
                  data-testid={`preview-radius-${radius}`}
                  className="p-3 bg-white rounded-lg border border-neutral-200"
                >
                  <Confirm size="xs" radius={radius} color="neutral" className="relative shadow-none border">
                    <ConfirmHeader title={`Radius: ${radius}`} />
                    <ConfirmBody>
                      {`Bo góc: ${radius}.`}
                    </ConfirmBody>
                    <ConfirmFooter confirmText="OK" cancelText={false} />
                  </Confirm>
                </div>
              ))}
            </div>
          </section>
        </div>
      );
    };

    cy.mount(<ConfirmShowcase />);

    // 1. Verify Sizes preview render
    sizes.forEach((size) => {
      cy.get(`[data-testid="preview-size-${size}"]`).should("be.visible");
    });

    // 2. Verify Colors preview render
    colors.forEach((color) => {
      cy.get(`[data-testid="preview-color-${color}"]`).should("be.visible");
    });

    // 3. Verify Radius preview render
    radii.forEach((radius) => {
      cy.get(`[data-testid="preview-radius-${radius}"]`).should("be.visible");
    });

    // 4. Test Standard Dialog - Confirm button
    cy.get('[data-testid="btn-open-standard"]').click();
    cy.get('dialog[open]').should("exist").and("be.visible");
    cy.get('[data-testid="interactive-standard-dialog"]').should("be.visible");
    cy.get('[data-testid="interactive-standard-dialog"]').within(() => {
      cy.get("h3").should("contain.text", "Xác nhận thực hiện thao tác");
      cy.get("#confirm-dialog-description").should("contain.text", "Bạn có chắc chắn muốn tiếp tục");
      cy.contains("button", "Tiếp tục").click();
    });
    cy.get("@onConfirmSpy").should("have.been.calledOnce");
    cy.get('[data-testid="status-message"]').should("contain.text", "Confirmed standard!");
    cy.get('dialog[open]').should("not.exist");

    // 5. Test Standard Dialog - Close button (X)
    cy.get('[data-testid="btn-open-error"]').click();
    cy.get('dialog[open]').should("exist").and("be.visible");
    cy.get('[data-testid="confirm-close-button"]').click();
    cy.get("@onCloseSpy").should("have.been.called");
    cy.get('dialog[open]').should("not.exist");

    // 6. Test ESC key closing
    cy.get('[data-testid="btn-open-standard"]').click();
    cy.get('dialog[open]').should("exist").and("be.visible");
    cy.get("body").type("{esc}");
    cy.get('dialog[open]').should("not.exist");

    // 7. Test Async Loading Dialog
    cy.get('[data-testid="btn-open-async"]').click();
    cy.get('dialog[open]').should("exist").and("be.visible");
    cy.get('[data-testid="interactive-async-dialog"]').within(() => {
      cy.contains("button", "Bắt đầu đồng bộ").click();
    });
    cy.get("@onAsyncConfirmSpy").should("have.been.calledOnce");
    cy.wait(500);
    cy.get('[data-testid="status-message"]').should("contain.text", "Async confirmed!");
    cy.get('dialog[open]').should("not.exist");

    // 8. Test Compound Custom Dialog
    cy.get('[data-testid="btn-open-compound"]').click();
    cy.get('dialog[open]').should("exist").and("be.visible");
    cy.get('[data-testid="compound-custom-body"]').should("be.visible");
    cy.get('[data-testid="interactive-compound-dialog"]').within(() => {
      cy.contains("button", "Hoàn tất").click();
    });
    cy.get('[data-testid="status-message"]').should("contain.text", "Compound confirmed!");
    cy.get('dialog[open]').should("not.exist");

    // 9. Test Controlled with ConfirmClose
    cy.get('[data-testid="btn-open-controlled"]').click();
    cy.get('dialog[open]').should("exist").and("be.visible");
    cy.get('[data-testid="interactive-controlled-dialog"]').should("be.visible");
    cy.get('[data-testid="btn-controlled-confirm"]').click();
    cy.get('[data-testid="status-message"]').should("contain.text", "Controlled confirmed!");
    cy.get('dialog[open]').should("not.exist");

    // 10. Test Top Layer Breakout from `overflow-auto`
    cy.get('[data-testid="btn-trigger-in-overflow-auto"]').click();
    cy.get('dialog[open]').should("exist").and("be.visible");
    cy.get('[data-testid="overflow-auto-content"]').should("be.visible");
    cy.get('[data-testid="confirm-dialog"]')
      .filter(":visible")
      .first()
      .then(($dialog) => {
        const rect = $dialog[0]!.getBoundingClientRect();
        expect(rect.width).to.be.greaterThan(250);
      });
    cy.get('[data-testid="btn-overflow-auto-close"]').click();
    cy.get('dialog[open]').should("not.exist");

    // 11. Test Top Layer Breakout from `overflow-hidden`
    cy.get('[data-testid="btn-trigger-in-overflow-hidden"]').click();
    cy.get('dialog[open]').should("exist").and("be.visible");
    cy.get('[data-testid="overflow-hidden-content"]').should("be.visible");
    cy.get('[data-testid="confirm-dialog"]')
      .filter(":visible")
      .first()
      .then(($dialog) => {
        const rect = $dialog[0]!.getBoundingClientRect();
        expect(rect.width).to.be.greaterThan(220);
      });
    cy.get('[data-testid="btn-overflow-hidden-close"]').click();
    cy.get('dialog[open]').should("not.exist");
  });
});
