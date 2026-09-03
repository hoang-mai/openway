import { useState } from "react";
import { UploadFile } from "./index";
import {
  UploadFileColor,
  UploadFileRadius,
  UploadFileSize,
  UploadFileVariant,
} from "./types";
import { PreviewFile, ServerFile } from "@/components/file-preview/types";

const sizes: UploadFileSize[] = ["xs", "sm", "md", "lg", "xl"];
const radii: UploadFileRadius[] = ["none", "sm", "md", "lg", "xl", "full"];
const variants: UploadFileVariant[] = ["outline", "filled", "ghost"];
const colors: UploadFileColor[] = ["primary", "secondary", "error", "success", "warning", "info", "neutral"];

const mockDoc1: ServerFile = {
  id: "doc-1",
  name: "project-proposal.pdf",
  size: 2450000,
  src: "data:application/pdf;base64,JVBERi0xLjQK",
};

const mockDoc2: ServerFile = {
  id: "doc-2",
  name: "financial-report.xlsx",
  size: 1540000,
  src: "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,UEsDB",
};

describe("UploadFile Component Showcase & Verification", () => {
  it("comprehensively verifies all UploadFile functionality in a single mount", () => {
    const onDropzoneChangeSpy = cy.spy().as("onDropzoneChangeSpy");
    const onGridChangeSpy = cy.spy().as("onGridChangeSpy");
    const onButtonChangeSpy = cy.spy().as("onButtonChangeSpy");
    const onRemoveSpy = cy.spy().as("onRemoveSpy");
    const onPreviewSpy = cy.spy().as("onPreviewSpy");

    const AllInOneShowcase = () => {
      // 1. Dropzone Controlled (starts empty for testing interactive selection)
      const [dropzoneFiles, setDropzoneFiles] = useState<PreviewFile[]>([]);

      // 2. Grid List Controlled
      const [gridFiles, setGridFiles] = useState<PreviewFile[]>([mockDoc1, mockDoc2]);

      return (
        <div className="p-8 flex flex-col gap-8 max-w-6xl mx-auto bg-neutral-100 min-h-screen text-neutral-900 font-sans">
          <div className="border-b border-neutral-300 pb-4">
            <h1 className="text-2xl font-bold text-neutral-900">UploadFile Comprehensive Single-Mount Showcase</h1>
            <p className="text-sm text-neutral-600">
              Showcase of view modes (Dropzone, Button, Compact), Grid layout, 5 Sizes, Variants, Colors, Radius, Validation and A11y.
            </p>
          </div>

          {/* Section 1: Dropzone Mode */}
          <div
            data-testid="section-dropzone"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-3"
          >
            <h2 className="text-base font-semibold text-neutral-800">1. Dropzone Mode (Controlled & Interactive)</h2>
            <UploadFile
              value={dropzoneFiles}
              onChange={(files) => {
                setDropzoneFiles(files);
                onDropzoneChangeSpy(files);
              }}
              viewMode="dropzone"
              label="Tài liệu đính kèm"
              helperText="Hỗ trợ PDF, Office lên tới 25MB"
              dropzoneTitle="Kéo thả tài liệu vào đây, hoặc nhấn để duyệt file"
            />
          </div>

          {/* Section 2: Grid List Mode */}
          <div
            data-testid="section-grid-list"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-3"
          >
            <h2 className="text-base font-semibold text-neutral-800">
              2. Grid List Mode (listType="grid")
            </h2>
            <UploadFile
              value={gridFiles}
              onChange={(f) => {
                setGridFiles(f);
                onGridChangeSpy(f);
              }}
              onRemove={onRemoveSpy}
              onPreview={onPreviewSpy}
              listType="grid"
              config={{ multiple: true }}
              label="Danh mục hợp đồng dự án"
              helperText="Hiển thị dạng thẻ trên lưới"
            />
          </div>

          {/* Section 3: Button Trigger Mode */}
          <div
            data-testid="section-button"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-3"
          >
            <h2 className="text-base font-semibold text-neutral-800">3. Button Trigger Mode</h2>
            <UploadFile
              viewMode="button"
              buttonText="Chọn tệp tin"
              onChange={onButtonChangeSpy}
              label="Đính kèm tệp"
            />
          </div>

          {/* Section 4: All 5 Sizes Matrix */}
          <div
            data-testid="section-sizes"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-4"
          >
            <h2 className="text-base font-semibold text-neutral-800">4. All 5 Sizes Matrix (xs, sm, md, lg, xl)</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {sizes.map((sz) => (
                <div key={sz} className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase text-primary-700">Size: {sz}</span>
                  <UploadFile size={sz} dropzoneTitle={`Dropzone ${sz}`} dropzoneDescription={`${sz} description`} />
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Variants & Color Themes */}
          <div
            data-testid="section-variants-colors"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-4"
          >
            <h2 className="text-base font-semibold text-neutral-800">
              5. Variants (Outline, Filled, Ghost) & Color Themes
            </h2>
            {variants.map((v) => (
              <div key={v} className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase text-neutral-700">Variant: {v}</span>
                <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                  {colors.map((c) => (
                    <div key={c} className="flex flex-col gap-1">
                      <span className="text-[10px] text-neutral-500">{c}</span>
                      <UploadFile variant={v} color={c} size="xs" dropzoneTitle={c} dropzoneDescription="" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Section 6: Radius Matrix */}
          <div
            data-testid="section-radii"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-3"
          >
            <h2 className="text-base font-semibold text-neutral-800">6. Radius Matrix (none, sm, md, lg, xl, full)</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {radii.map((r) => (
                <div key={r} className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-neutral-600">radius: {r}</span>
                  <UploadFile radius={r} size="sm" dropzoneTitle={r} dropzoneDescription="" />
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: Validation & Error States */}
          <div
            data-testid="section-validation"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-4"
          >
            <h2 className="text-base font-semibold text-neutral-800">
              7. Validation (maxSize, accept, errorMessage, isInvalid)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-neutral-700">Limit 50KB</span>
                <UploadFile
                  maxSize={50 * 1024}
                  dropzoneTitle="Max 50KB"
                  helperText="File > 50KB will error"
                  size="sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-neutral-700">PDF only</span>
                <UploadFile
                  accept=".pdf"
                  dropzoneTitle="PDF only"
                  helperText="Other formats will error"
                  size="sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-neutral-700">isInvalid = true</span>
                <UploadFile
                  config={{ isInvalid: true }}
                  errorMessage="Document file is required"
                  size="sm"
                  dropzoneTitle="Validation Error"
                />
              </div>
            </div>
          </div>

          {/* Section 8: Disabled & ReadOnly States */}
          <div
            data-testid="section-disabled-readonly"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-4"
          >
            <h2 className="text-base font-semibold text-neutral-800">8. Disabled & ReadOnly States</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-neutral-700">Disabled = true</span>
                <UploadFile disabled defaultValue={[mockDoc1]} dropzoneTitle="Disabled" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-neutral-700">ReadOnly = true</span>
                <UploadFile
                  readOnly
                  listType="grid"
                  defaultValue={[mockDoc1, mockDoc2]}
                  label="Read Only Mode"
                />
              </div>
            </div>
          </div>
        </div>
      );
    };

    // Single Mount
    cy.mount(<AllInOneShowcase />);

    // 1. Verify Dropzone Section
    cy.get('[data-testid="section-dropzone"]').within(() => {
      cy.contains("Tài liệu đính kèm").should("be.visible");
      cy.contains("Kéo thả tài liệu vào đây, hoặc nhấn để duyệt file").should("be.visible");
      cy.get('[role="button"]').should("have.attr", "aria-describedby");
    });

    // 2. Verify Grid List & Count
    cy.get('[data-testid="section-grid-list"]').within(() => {
      cy.get('[data-testid="upload-file-item"]').should("have.length", 2);
    });

    // 3. Verify Button Trigger
    cy.get('[data-testid="section-button"]').within(() => {
      cy.contains("button", "Chọn tệp tin").should("be.visible");
    });

    // 4. Verify All 5 Sizes
    cy.get('[data-testid="section-sizes"]').within(() => {
      sizes.forEach((sz) => {
        cy.contains(`Size: ${sz}`).should("be.visible");
        cy.contains(`Dropzone ${sz}`).should("be.visible");
      });
    });

    // 5. Verify Variants & Colors
    cy.get('[data-testid="section-variants-colors"]').within(() => {
      variants.forEach((v) => {
        cy.contains(`Variant: ${v}`).should("be.visible");
      });
    });

    // 6. Verify Radii
    cy.get('[data-testid="section-radii"]').within(() => {
      radii.forEach((r) => {
        cy.contains(`radius: ${r}`).should("be.visible");
      });
    });

    // 7. Verify Validation Alert
    cy.get('[data-testid="section-validation"]').within(() => {
      cy.get('[role="alert"]').should("contain", "Document file is required");
    });

    // 8. Verify Disabled & ReadOnly
    cy.get('[data-testid="section-disabled-readonly"]').within(() => {
      cy.get('[aria-disabled="true"]').should("exist");
      cy.contains("Read Only Mode").should("be.visible");
    });

    // 9. Interactive Dropzone File Select Test
    cy.get('[data-testid="section-dropzone"]').within(() => {
      cy.get('input[type="file"]').selectFile(
        {
          contents: Cypress.Buffer.from("Sample Document Content"),
          fileName: "sample-contract.pdf",
          mimeType: "application/pdf",
        },
        { force: true }
      );
      cy.get("@onDropzoneChangeSpy").should("have.been.called");
      cy.get('[data-testid="upload-file-item"]').should("have.length", 1);
      cy.contains("sample-contract.pdf").should("be.visible");

      // Verify clicking preview opens preview modal
      cy.get('button[title="Xem trước"]').click({ force: true });
    });

    cy.get('[data-testid="image-preview-modal"]').should("be.visible");
    cy.get("body").type("{esc}");
    cy.get('[data-testid="image-preview-modal"]').should("not.exist");

    cy.get('[data-testid="section-dropzone"]').within(() => {
      // Test remove action from item row
      cy.get('button[title="Xóa tệp"]').click({ force: true });
      cy.get('[data-testid="upload-file-item"]').should("not.exist");
    });

    // 10. Interactive Grid List Preview Lightbox Test (via file-preview & FileContainer)
    cy.get('[data-testid="section-grid-list"]').within(() => {
      cy.get('button[title="Xem trước"]').first().click({ force: true });
      cy.get("@onPreviewSpy").should("have.been.called");
    });

    // Modal should open
    cy.get('[data-testid="image-preview-modal"]').should("be.visible");
    cy.get("body").type("{esc}");
    cy.get('[data-testid="image-preview-modal"]').should("not.exist");

    // 11. Interactive Grid List Remove Test
    cy.get('[data-testid="section-grid-list"]').within(() => {
      cy.get('button[title="Xóa tệp"]').first().click({ force: true });
      cy.get("@onRemoveSpy").should("have.been.called");
      cy.get('[data-testid="upload-file-item"]').should("have.length", 1);
    });
  });
});
