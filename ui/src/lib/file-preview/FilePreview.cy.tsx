import React from "react";
import FileContainer from "./FileContainer";
import FilePreview from "./FilePreview";
import { FileContext } from "./FileContext";

describe("FilePreview & FileContainer Component Tests", () => {
  it("renders non-image file with fallback card and download button", () => {
    const downloadSpy = cy.spy().as("downloadSpy");
    const mockFile = new File(["test pdf content"], "document.pdf", {
      type: "application/pdf",
    });

    cy.mount(
      <FileContext.Provider value={{ file: mockFile, headerTitle: "document.pdf" }}>
        <FilePreview onDownload={downloadSpy} />
      </FileContext.Provider>
    );

    cy.contains("document.pdf").should("be.visible");
    cy.contains("Định dạng file chưa hỗ trợ xem trực tiếp").should("be.visible");
    cy.contains("button", "Tải xuống file").should("be.visible").click();

    cy.get("@downloadSpy").should("have.been.calledWith", mockFile);
  });

  it("renders image file using ImagePreview component", () => {
    const imageFile = new File(["fake-image-bytes"], "avatar.png", {
      type: "image/png",
    });

    cy.mount(
      <FileContext.Provider value={{ file: imageFile, headerTitle: "avatar.png" }}>
        <FilePreview />
      </FileContext.Provider>
    );

    cy.get("img").should("exist");
  });

  it("renders FileContainer modal dialog when open=true", () => {
    const closeSpy = cy.spy().as("closeSpy");
    const mockFile = {
      name: "report.xlsx",
      src: "https://example.com/report.xlsx",
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    };

    cy.mount(
      <FileContainer
        open={true}
        onClose={closeSpy}
        file={mockFile}
        title="Báo Cáo Tài Chính"
      >
        <FilePreview />
      </FileContainer>
    );

    cy.contains("Báo Cáo Tài Chính").should("be.visible");
    cy.contains("Tải xuống file").should("be.visible");

    // Close button
    cy.get("[data-testid='modal-close-button']").click();
    cy.get("@closeSpy").should("have.been.calledOnce");
  });
});
