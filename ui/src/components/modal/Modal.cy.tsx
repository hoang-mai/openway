import React, { useState } from "react";
import { Modal, ModalContainer, ModalHeader, ModalBody, ModalFooter, ModalClose } from "./index";
import { ModalRadius, ModalSize } from "./types";
import { Button } from "../button";

const sizes: ModalSize[] = ["xs", "sm", "md", "lg", "xl", "full"];
const radii: ModalRadius[] = ["none", "sm", "md", "lg", "xl", "full"];

describe("<ModalContainer /> Normal Mount & Top Layer (overflow-auto breakout)", () => {
  it("mounts ModalContainer directly with props and verifies top-layer breakout from overflow-auto", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");

    const NormalMountModalShowcase = () => {
      const [isOpenNormal, setIsOpenNormal] = useState(false);
      const [isOpenInOverflowAuto, setIsOpenInOverflowAuto] = useState(false);
      const [isOpenInOverflowHidden, setIsOpenInOverflowHidden] = useState(false);
      const [isOpenCompound, setIsOpenCompound] = useState(false);

      return (
        <div className="p-8 bg-neutral-50 min-h-screen text-neutral-900 space-y-8 max-w-7xl mx-auto font-sans">
          {/* Header */}
          <div className="border-b border-neutral-200 pb-5">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              ModalContainer Normal Mount &amp; Native &lt;dialog&gt; Top Layer
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Mount trực tiếp ModalContainer bằng props thông thường (không qua global store). Kiểm thử khả năng tự động nổi lên Top Layer khi nằm trong container có `overflow-auto` và `overflow-hidden`.
            </p>
          </div>

          {/* Action buttons */}
          <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-wrap gap-4 items-center">
            <Button
              data-testid="btn-open-normal"
              color="primary"
              onClick={() => setIsOpenNormal(true)}
            >
              Mở Modal (Mount bình thường)
            </Button>

            <Button
              data-testid="btn-open-compound"
              variant="outline"
              onClick={() => setIsOpenCompound(true)}
            >
              Mở Compound ModalContainer
            </Button>
          </div>

          {/* 1. ModalContainer mounted directly in the component tree */}
          <ModalContainer
            open={isOpenNormal}
            onClose={() => {
              onCloseSpy();
              setIsOpenNormal(false);
            }}
          >
            <Modal>
              <ModalHeader
                title="Modal Mount Bình Thường"
                description="ModalContainer được mount và điều khiển trực tiếp qua prop open & onClose."
              />
              <ModalBody>
                <div data-testid="normal-modal-body" className="space-y-3">
                  <p className="text-sm text-neutral-600">
                    Modal sử dụng thẻ native &lt;dialog&gt;, không cần cổng Portal hay Zustand store toàn cục.
                  </p>
                  <input
                    data-testid="normal-modal-input"
                    type="text"
                    placeholder="Nhập dữ liệu..."
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm outline-none focus:border-primary-500"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <ModalClose>
                  <Button
                    variant="outline"
                    data-testid="btn-normal-close"
                  >
                    Đóng
                  </Button>
                </ModalClose>
                <ModalClose>
                  <Button
                    color="primary"
                    data-testid="btn-normal-confirm"
                  >
                    Xác nhận
                  </Button>
                </ModalClose>
              </ModalFooter>
            </Modal>
          </ModalContainer>

          {/* 2. Compound ModalContainer mounted normally */}
          <ModalContainer
            open={isOpenCompound}
            onClose={() => setIsOpenCompound(false)}
          >
            <Modal size="lg">
              <ModalHeader
                title="Compound Modal Header"
                description="Sử dụng ModalHeader, ModalBody, ModalFooter bên trong ModalContainer."
                showCloseButton
              />
              <ModalBody data-testid="compound-modal-body">
                <p className="text-sm text-neutral-700">Nội dung tùy chỉnh linh hoạt trong ModalBody.</p>
              </ModalBody>
              <ModalFooter>
                <ModalClose>
                  <Button
                    variant="outline"
                    data-testid="btn-compound-close"
                  >
                    Hủy bỏ
                  </Button>
                </ModalClose>
              </ModalFooter>
            </Modal>
          </ModalContainer>

          {/* 3. CASE TEST: ModalContainer nested inside an `overflow-auto` container */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-primary-600">
              Trường hợp 1: ModalContainer đặt bên trong thẻ div có `overflow-auto` (kích thước nhỏ 250px x 150px)
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
                Mở Modal từ trong này
              </Button>
              <div className="h-40 text-xs text-neutral-400 mt-2">
                Cuộn thêm nội dung bên dưới...
              </div>

              {/* ModalContainer directly placed inside overflow-auto */}
              <ModalContainer
                open={isOpenInOverflowAuto}
                onClose={() => setIsOpenInOverflowAuto(false)}
              >
                <Modal size="md">
                  <ModalHeader
                    title="Modal Thoát Khỏi overflow-auto"
                    description="Modal được render sâu bên trong thẻ div overflow-auto nhưng vẫn nổi lên Top Layer toàn màn hình."
                  />
                  <ModalBody>
                    <div data-testid="overflow-auto-content" className="space-y-2">
                      <p className="text-sm text-neutral-700">
                        Kích thước hộp thoại (540px) rộng hơn nhiều so với khung cha (250px) và không bị cắt xén!
                      </p>
                      <input
                        data-testid="overflow-auto-input"
                        type="text"
                        placeholder="Gõ thử vào đây..."
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm outline-none"
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <ModalClose>
                      <Button
                        variant="outline"
                        data-testid="btn-overflow-auto-close"
                      >
                        Đóng Modal
                      </Button>
                    </ModalClose>
                  </ModalFooter>
                </Modal>
              </ModalContainer>
            </div>
          </section>

          {/* 4. CASE TEST: ModalContainer nested inside an `overflow-hidden` container */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-primary-600">
              Trường hợp 2: ModalContainer đặt bên trong thẻ div có `overflow-hidden` (kích thước 220px x 120px)
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
                Mở Modal
              </Button>

              {/* ModalContainer directly placed inside overflow-hidden */}
              <ModalContainer
                open={isOpenInOverflowHidden}
                onClose={() => setIsOpenInOverflowHidden(false)}
              >
                <Modal size="md">
                  <ModalHeader
                    title="Modal Thoát Khỏi overflow-hidden"
                    description="Nhờ native dialog, modal không bị giới hạn bởi overflow-hidden của phần tử cha."
                  />
                  <ModalBody>
                    <p data-testid="overflow-hidden-content" className="text-sm text-neutral-700">
                      Nổi hoàn toàn trên toàn bộ viewport trình duyệt.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <ModalClose>
                      <Button
                        variant="outline"
                        data-testid="btn-overflow-hidden-close"
                      >
                        Đóng
                      </Button>
                    </ModalClose>
                  </ModalFooter>
                </Modal>
              </ModalContainer>
            </div>
          </section>

          {/* 5. Static Sizes & Radii */}
          <section className="space-y-4" data-testid="section-sizes">
            <h2 className="text-base font-semibold text-primary-600">Kiểm tra 6 Sizes của Modal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sizes.map((s) => (
                <div
                  key={s}
                  data-testid={`showcase-size-${s}`}
                  className="p-4 bg-neutral-100 rounded-xl flex items-center justify-center min-h-35"
                >
                  <Modal size={s}>
                    <ModalHeader
                      title={`Size ${s.toUpperCase()}`}
                      description={`Modal mô tả kích cỡ ${s}.`}
                      showCloseButton={false}
                    />
                  </Modal>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4" data-testid="section-radii">
            <h2 className="text-base font-semibold text-primary-600">Kiểm tra các tùy chọn Radius</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {radii.map((r) => (
                <div
                  key={r}
                  data-testid={`showcase-radius-${r}`}
                  className="p-4 bg-neutral-100 rounded-xl flex items-center justify-center"
                >
                  <Modal size="sm" radius={r}>
                    <ModalHeader
                      title={`Radius: ${r}`}
                      description={`Bo góc hiển thị mức ${r}.`}
                      showCloseButton={false}
                    />
                  </Modal>
                </div>
              ))}
            </div>
          </section>
        </div>
      );
    };

    cy.mount(<NormalMountModalShowcase />);

    // 1. Kiểm tra showcase kích thước & radius
    sizes.forEach((s) => {
      cy.get(`[data-testid="showcase-size-${s}"]`).should("be.visible");
    });
    radii.forEach((r) => {
      cy.get(`[data-testid="showcase-radius-${r}"]`).should("be.visible");
    });

    // 2. Mở Modal mount trực tiếp bằng props
    cy.get('[data-testid="btn-open-normal"]').click();
    cy.get('dialog[open]').should("exist").and("be.visible");
    cy.get('[data-testid="normal-modal-body"]').should("be.visible");
    cy.get('[data-testid="normal-modal-input"]').type("Test Input Mount Trực Tiếp").should("have.value", "Test Input Mount Trực Tiếp");

    // Đóng bằng nút X
    cy.get('[data-testid="modal-close-button"]').click();
    cy.get("@onCloseSpy").should("have.been.called");
    cy.get('dialog[open]').should("not.exist");

    // Mở lại và đóng bằng phím ESC
    cy.get('[data-testid="btn-open-normal"]').click();
    cy.get('dialog[open]').should("exist").and("be.visible");
    cy.get("body").type("{esc}");
    cy.get('dialog[open]').should("not.exist");

    // 3. KIỂM THỬ THOÁT KHỎI CONTAINER `overflow-auto`:
    cy.get('[data-testid="btn-trigger-in-overflow-auto"]').click();
    cy.get('dialog[open]').should("exist").and("be.visible");
    cy.get('[data-testid="overflow-auto-content"]').should("be.visible");

    // Kiểm tra kích thước modal không bị thu nhỏ/bó hẹp trong khung 250px của cha
    cy.get('[data-testid="modal-dialog"]')
      .filter(":visible")
      .first()
      .then(($modal) => {
        const rect = $modal[0]!.getBoundingClientRect();
        // Modal size md có max-w-[540px], phải rộng hơn nhiều so với khung cha 250px
        expect(rect.width).to.be.greaterThan(250);
        // Modal nằm giữa màn hình (top layer)
        expect(rect.left).to.be.greaterThan(0);
        expect(rect.top).to.be.greaterThan(0);
      });

    // Nhập liệu được bình thường bên trong modal đặt ở overflow-auto
    cy.get('[data-testid="overflow-auto-input"]')
      .type("Đã thoát khỏi overflow-auto thành công!")
      .should("have.value", "Đã thoát khỏi overflow-auto thành công!");

    // Đóng modal overflow-auto
    cy.get('[data-testid="btn-overflow-auto-close"]').click();
    cy.get('dialog[open]').should("not.exist");

    // 4. KIỂM THỬ THOÁT KHỎI CONTAINER `overflow-hidden`:
    cy.get('[data-testid="btn-trigger-in-overflow-hidden"]').click();
    cy.get('dialog[open]').should("exist").and("be.visible");
    cy.get('[data-testid="overflow-hidden-content"]').should("be.visible");

    cy.get('[data-testid="modal-dialog"]')
      .filter(":visible")
      .first()
      .then(($modal) => {
        const rect = $modal[0]!.getBoundingClientRect();
        expect(rect.width).to.be.greaterThan(220);
      });

    cy.get('[data-testid="btn-overflow-hidden-close"]').click();
    cy.get('dialog[open]').should("not.exist");

    // 5. Kiểm thử Compound ModalContainer
    cy.get('[data-testid="btn-open-compound"]').click();
    cy.get('dialog[open]').should("exist").and("be.visible");
    cy.get('[data-testid="compound-modal-body"]').should("be.visible");
    cy.get('[data-testid="btn-compound-close"]').click();
    cy.get('dialog[open]').should("not.exist");
  });

  it("plays exit animation gracefully when closed externally via state (e.g. async API call)", () => {
    const AsyncSaveModalShowcase = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [isSaving, setIsSaving] = useState(false);

      const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 50));
        setIsSaving(false);
        setIsOpen(false);
      };

      return (
        <div className="p-4">
          <Button data-testid="btn-open-async" onClick={() => setIsOpen(true)}>
            Mở Modal Lưu
          </Button>

          <ModalContainer open={isOpen} onClose={() => setIsOpen(false)}>
            <Modal>
              <ModalHeader title="Lưu Dữ Liệu" />
              <ModalBody>
                <p>Nội dung đang chuẩn bị lưu...</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  data-testid="btn-async-save"
                  color="primary"
                  isLoading={isSaving}
                  onClick={handleSave}
                >
                  Lưu
                </Button>
              </ModalFooter>
            </Modal>
          </ModalContainer>
        </div>
      );
    };

    cy.mount(<AsyncSaveModalShowcase />);

    cy.get('[data-testid="btn-open-async"]').click();
    cy.get('dialog[open]').should("exist").and("be.visible");

    // Click Lưu -> gọi API và setIsOpen(false) từ bên ngoài
    cy.get('[data-testid="btn-async-save"]').click();

    // Trong khi exit animation đang diễn ra, dialog có animation exit
    cy.get('dialog[open]').should("have.class", "animate-modal-backdrop-out");

    // Sau khi kết thúc exit animation, dialog unmount hoàn toàn
    cy.get('dialog[open]').should("not.exist");
  });
});
