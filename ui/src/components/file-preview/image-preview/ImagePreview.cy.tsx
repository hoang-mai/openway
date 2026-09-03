import React, { useState } from "react";
import FileContainer from "../FileContainer";
import FilePreview from "../FilePreview";
import ImagePreview from "./ImagePreview";
import Button from "../../button/Button";

const testImage = {
  src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' fill='%233b82f6'><rect width='100%' height='100%'/><text x='50%' y='50%' fill='white' font-size='28' text-anchor='middle'>Nature Landscape 1</text></svg>",
  name: "Nature Landscape 1.jpg",
  alt: "Beautiful nature view 1",
};

describe("<FileContainer /> & <FilePreview /> & <ImagePreview /> Showcase Dashboard", () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
  });

  it("renders all preview patterns, toolbar controls, gestures & tools in a single showcase dashboard mount", () => {
    cy.window().then((win) => {
      cy.stub(win.HTMLAnchorElement.prototype, "click").as("anchorClickStub");
    });

    const FilePreviewShowcaseDashboard = () => {
      const [activeModal, setActiveModal] = useState<string | null>(null);
      const [hideSlider, setHideSlider] = useState(false);

      const closeModal = () => setActiveModal(null);

      return (
        <div className="p-8 bg-neutral-50 min-h-screen text-neutral-900 space-y-6 font-sans">
          <div className="border-b border-neutral-200 pb-4">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              File Preview &amp; Image Preview Showcase
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Bảng điều khiển kiểm thử toàn bộ FileContainer, FilePreview và ImagePreview trong 1 lần mount duy nhất.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-wrap gap-3 items-center">
            <Button id="btn-open-toolbar-test" color="primary" onClick={() => setActiveModal("toolbar")}>
              Mở Toolbar Test
            </Button>
            <Button id="btn-open-drag-test" variant="outline" onClick={() => setActiveModal("drag")}>
              Mở Drag Test
            </Button>
            <Button id="btn-open-download-test" variant="outline" onClick={() => setActiveModal("download")}>
              Mở Download Test
            </Button>
            <Button id="btn-open-doc-preview" variant="outline" onClick={() => setActiveModal("doc")}>
              Mở Document Preview
            </Button>
            <Button id="btn-open-context-preview" variant="outline" onClick={() => setActiveModal("context")}>
              Mở Context Preview
            </Button>
            <Button id="btn-open-compound-preview" variant="outline" onClick={() => setActiveModal("compound")}>
              Mở Compound Preview
            </Button>
            <Button id="btn-open-custom-tools" variant="outline" onClick={() => setActiveModal("custom-tools")}>
              Mở Custom Tools
            </Button>
            <Button id="btn-open-slider-test" color="secondary" onClick={() => setActiveModal("slider")}>
              Mở Slider Test
            </Button>
            <Button id="btn-toggle-slider" variant="soft" onClick={() => setHideSlider((prev) => !prev)}>
              Bật/Tắt Slider ({hideSlider ? "Đang ẩn" : "Đang hiện"})
            </Button>
          </div>

          {/* 1. Toolbar Test */}
          <FileContainer
            open={activeModal === "toolbar"}
            onClose={closeModal}
            file={{ src: testImage.src, name: testImage.name }}
          />

          {/* 2. Drag Test */}
          <FileContainer
            open={activeModal === "drag"}
            onClose={closeModal}
            file={{ src: testImage.src, name: testImage.name }}
          />

          {/* 3. Download Test */}
          <FileContainer
            open={activeModal === "download"}
            onClose={closeModal}
            file={{ src: testImage.src, name: testImage.name }}
          />

          {/* 4. Document / Non-image Fallback Preview */}
          <FileContainer
            open={activeModal === "doc"}
            onClose={closeModal}
            file={{ src: "https://example.com/sample.pdf", name: "sample.pdf" }}
          />

          {/* 5. Context Preview */}
          <FileContainer
            open={activeModal === "context"}
            onClose={closeModal}
            file={{ src: testImage.src, name: testImage.name }}
          >
            <FilePreview imageProps={{ minZoom: 0.5, maxZoom: 3 }} />
          </FileContainer>

          {/* 6. Compound Preview */}
          <FileContainer
            open={activeModal === "compound"}
            onClose={closeModal}
            title="Tác phẩm nghệ thuật"
          >
            <ImagePreview src={testImage.src} name={testImage.name} />
          </FileContainer>

          {/* 7. Custom Tools (Hide rotate & flip) */}
          <FileContainer
            open={activeModal === "custom-tools"}
            onClose={closeModal}
            file={{ src: testImage.src, name: testImage.name }}
          >
            <FilePreview
              imageProps={{
                toolbarProps: {
                  tools: {
                    rotate: false,
                    flip: false,
                  },
                },
              }}
            />
          </FileContainer>

          {/* 8. Slider Test */}
          <FileContainer
            open={activeModal === "slider"}
            onClose={closeModal}
            file={{ src: testImage.src, name: testImage.name }}
          >
            <FilePreview
              imageProps={{
                toolbarProps: {
                  tools: {
                    zoomSlider: !hideSlider,
                  },
                },
              }}
            />
          </FileContainer>
        </div>
      );
    };

    cy.mount(<FilePreviewShowcaseDashboard />);

    // 1. Kiểm tra tất cả nút Toolbar: Phóng to (+), Thu nhỏ (-), Xoay CW, Xoay CCW, Lật, Đặt lại & Đóng
    cy.get("#btn-open-toolbar-test").click();
    cy.get("dialog[open]").should("be.visible");
    cy.contains("Nature Landscape 1.jpg").should("be.visible");

    cy.contains("100%").should("be.visible");
    cy.get('button[aria-label="Phóng to"]').click();
    cy.contains("125%").should("be.visible");
    cy.get('button[aria-label="Phóng to"]').click();
    cy.contains("150%").should("be.visible");

    cy.get('button[aria-label="Thu nhỏ"]').click();
    cy.contains("125%").should("be.visible");

    cy.get('button[aria-label="Xoay theo chiều kim đồng hồ"]').click();
    cy.get("img").should("have.attr", "style").and("include", "rotate(90deg)");
    cy.get('button[aria-label="Xoay theo chiều kim đồng hồ"]').click();
    cy.get("img").should("have.attr", "style").and("include", "rotate(180deg)");

    cy.get('button[aria-label="Xoay ngược chiều kim đồng hồ"]').click();
    cy.get("img").should("have.attr", "style").and("include", "rotate(90deg)");

    cy.get('button[aria-label="Lật ngang"]').click();
    cy.get("img").should("have.class", "scale-x-[-1]");

    cy.get('button[aria-label="Đặt lại kích thước và góc xoay"]').click();
    cy.contains("100%").should("be.visible");
    cy.get("img").should("have.attr", "style").and("include", "rotate(0deg)");
    cy.get("img").should("not.have.class", "scale-x-[-1]");

    cy.get('[data-testid="modal-close-button"]').click();
    cy.get("dialog[open]").should("not.exist");

    // 2. Kiểm tra Kéo thả (Drag-to-pan) trong Cropper
    cy.get("#btn-open-drag-test").click();
    cy.get("dialog[open]").should("be.visible");
    cy.get(".reactEasyCrop_Container")
      .trigger("mousedown", { which: 1, clientX: 200, clientY: 200 })
      .trigger("mousemove", { clientX: 260, clientY: 240 })
      .trigger("mouseup", { force: true });
    cy.get('[data-testid="modal-close-button"]').click();
    cy.get("dialog[open]").should("not.exist");

    // 3. Kiểm tra nút Tải ảnh xuống
    cy.get("#btn-open-download-test").click();
    cy.get("dialog[open]").should("be.visible");
    cy.get('button[aria-label="Tải ảnh xuống"]').should("be.visible").click();
    cy.get("@anchorClickStub").should("have.been.calledOnce");
    cy.get('[data-testid="modal-close-button"]').click();
    cy.get("dialog[open]").should("not.exist");

    // 4. Kiểm tra fallback định dạng file không hỗ trợ (pdf)
    cy.get("#btn-open-doc-preview").click();
    cy.get("dialog[open]").should("be.visible");
    cy.contains("sample.pdf").should("be.visible");
    cy.contains("Định dạng file chưa hỗ trợ xem trực tiếp").should("be.visible");
    cy.contains("Tải xuống file").should("be.visible");
    cy.get('[data-testid="modal-close-button"]').click();
    cy.get("dialog[open]").should("not.exist");

    // 5. Kiểm tra useContext pattern
    cy.get("#btn-open-context-preview").click();
    cy.get("dialog[open]").should("be.visible");
    cy.contains("Nature Landscape 1.jpg").should("be.visible");
    cy.get('button[aria-label="Phóng to"]').should("be.visible").click();
    cy.contains("125%").should("be.visible");
    cy.get('[data-testid="modal-close-button"]').click();
    cy.get("dialog[open]").should("not.exist");

    // 6. Kiểm tra Compound pattern
    cy.get("#btn-open-compound-preview").click();
    cy.get("dialog[open]").should("be.visible");
    cy.contains("Tác phẩm nghệ thuật").should("be.visible");
    cy.get('button[aria-label="Phóng to"]').should("be.visible").click();
    cy.contains("125%").should("be.visible");
    cy.get('[data-testid="modal-close-button"]').click();
    cy.get("dialog[open]").should("not.exist");

    // 7. Kiểm tra custom toolbarProps (ẩn xoay và lật)
    cy.get("#btn-open-custom-tools").click();
    cy.get("dialog[open]").should("be.visible");
    cy.get('button[aria-label="Xoay theo chiều kim đồng hồ"]').should("not.exist");
    cy.get('button[aria-label="Lật ngang"]').should("not.exist");
    cy.get('button[aria-label="Phóng to"]').should("be.visible");
    cy.get('button[aria-label="Tải ảnh xuống"]').should("be.visible");
    cy.get('[data-testid="modal-close-button"]').click();
    cy.get("dialog[open]").should("not.exist");

    // 8. Kiểm tra Zoom Slider và bật/tắt qua zoomSlider tool config
    cy.get("#btn-open-slider-test").click();
    cy.get("dialog[open]").should("be.visible");
    cy.get('[data-testid="image-preview-zoom-slider"]').should("be.visible");
    cy.get('[data-testid="image-preview-zoom-slider"] [role="slider"]').should("exist");
    cy.get('button[aria-label="Phóng to"]').click();
    cy.contains("125%").should("be.visible");
    cy.get('[data-testid="modal-close-button"]').click();
    cy.get("dialog[open]").should("not.exist");

    // Tắt slider và kiểm tra đã bị ẩn
    cy.get("#btn-toggle-slider").click();
    cy.get("#btn-open-slider-test").click();
    cy.get("dialog[open]").should("be.visible");
    cy.get('[data-testid="image-preview-zoom-slider"]').should("not.exist");
    cy.get('button[aria-label="Phóng to"]').should("be.visible");
    cy.get('[data-testid="modal-close-button"]').click();
    cy.get("dialog[open]").should("not.exist");
  });
});
