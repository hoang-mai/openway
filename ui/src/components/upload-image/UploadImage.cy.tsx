import { useState } from "react";
import { UploadImage } from "./index";
import type { PreviewFile, ServerFile } from "@/components/file-preview/types";
import type { UploadImageColor, UploadImageRadius, UploadImageSize, UploadImageVariant } from "./types";

const sizes: UploadImageSize[] = ["xs", "sm", "md", "lg", "xl"];
const radii: UploadImageRadius[] = ["none", "sm", "md", "lg", "xl", "full"];
const variants: UploadImageVariant[] = ["outline", "filled", "ghost"];
const colors: UploadImageColor[] = ["primary", "secondary", "error", "success", "warning", "info", "neutral"];

const mockImage1: ServerFile = {
  id: "img-1",
  name: "nature.png",
  src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300",
};

const mockImage2: ServerFile = {
  id: "img-2",
  name: "building.jpg",
  src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
};

describe("UploadImage Component Showcase & Verification", () => {
  it("comprehensively verifies all UploadImage functionality in a single mount", () => {
    const onDropzoneChangeSpy = cy.spy().as("onDropzoneChangeSpy");
    const onCardGridChangeSpy = cy.spy().as("onCardGridChangeSpy");
    const onButtonChangeSpy = cy.spy().as("onButtonChangeSpy");
    const onRemoveSpy = cy.spy().as("onRemoveSpy");
    const onPreviewSpy = cy.spy().as("onPreviewSpy");

    const AllInOneShowcase = () => {
      // 1. Dropzone Controlled
      const [dropzoneFiles, setDropzoneFiles] = useState<PreviewFile[]>([]);

      // 2. Card-Grid Controlled
      const [cardGridFiles, setCardGridFiles] = useState<PreviewFile[]>([mockImage1, mockImage2]);

      return (
        <div className="p-8 flex flex-col gap-8 max-w-6xl mx-auto bg-neutral-100 min-h-screen text-neutral-900 font-sans">

          <div className="border-b border-neutral-300 pb-4">
            <h1 className="text-2xl font-bold text-neutral-900">UploadImage Comprehensive Single-Mount Showcase</h1>
            <p className="text-sm text-neutral-600">
              Showcase of view modes (Dropzone, Card Grid, Button), 5 Sizes, Variants, Colors, Radius, Validation and
              A11y.
            </p>
          </div>

          {/* Section 1: Dropzone Mode */}
          <div
            data-testid="section-dropzone"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-3"
          >
            <h2 className="text-base font-semibold text-neutral-800">1. Dropzone Mode (Controlled & Interactive)</h2>
            <UploadImage
              value={dropzoneFiles}
              onChange={(files) => {
                setDropzoneFiles(files);
                onDropzoneChangeSpy(files);
              }}
              viewMode="dropzone"
              label="Document Image"
              helperText="Supports PNG, JPG up to 5MB"
              dropzoneTitle="Drag and drop or click to browse"
            />
          </div>

          {/* Section 2: Card Grid / Picture Wall */}
          <div
            data-testid="section-card-grid"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-3"
          >
            <h2 className="text-base font-semibold text-neutral-800">
              2. Card Grid Mode (Picture Wall with maxCount=4)
            </h2>
            <UploadImage
              value={cardGridFiles}
              onChange={(f) => {
                setCardGridFiles(f);
                onCardGridChangeSpy(f);
              }}
              onRemove={onRemoveSpy}
              onPreview={onPreviewSpy}
              viewMode="card-grid"
              multiple
              maxCount={4}
              label="Product Images Gallery"
              helperText="Max 4 images allowed"
            />
          </div>

          {/* Section 3: Button Trigger Mode */}
          <div
            data-testid="section-button"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-3"
          >
            <h2 className="text-base font-semibold text-neutral-800">3. Button Trigger Mode</h2>
            <UploadImage viewMode="button" buttonText="Select Image" onChange={onButtonChangeSpy} label="Attach File" />
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
                  <UploadImage size={sz} dropzoneTitle={`Dropzone ${sz}`} dropzoneDescription={`${sz} description`} />
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
                      <UploadImage variant={v} color={c} size="xs" dropzoneTitle={c} dropzoneDescription="" />
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
                  <UploadImage radius={r} size="sm" dropzoneTitle={r} dropzoneDescription="" />
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
                <UploadImage
                  maxSize={50 * 1024}
                  dropzoneTitle="Max 50KB"
                  helperText="File > 50KB will error"
                  size="sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-neutral-700">PNG only</span>
                <UploadImage
                  accept="image/png"
                  dropzoneTitle="PNG only"
                  helperText="Other formats will error"
                  size="sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-neutral-700">isInvalid = true</span>
                <UploadImage
                  isInvalid={true}
                  errorMessage="Document photo is required"
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
                <UploadImage disabled defaultValue={[mockImage1]} dropzoneTitle="Disabled" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-neutral-700">ReadOnly = true</span>
                <UploadImage
                  readOnly
                  viewMode="card-grid"
                  defaultValue={[mockImage1, mockImage2]}
                  label="Read Only Mode"
                />
              </div>
            </div>
          </div>

          {/* Section 9: Label Configurations (Colors, isRequired, custom class) */}
          <div
            data-testid="section-label-config"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-4"
          >
            <h2 className="text-base font-semibold text-neutral-800">9. Label Configurations & Colors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UploadImage
                label="Primary Label"
                color="primary"
                size="sm"
                dropzoneTitle="Primary Dropzone"
              />
              <UploadImage
                label="Secondary Label"
                color="secondary"
                size="sm"
                dropzoneTitle="Secondary Dropzone"
              />
              <UploadImage
                label="Success Label"
                color="success"
                size="sm"
                dropzoneTitle="Success Dropzone"
              />
              <UploadImage
                label="Error Label"
                isInvalid
                size="sm"
                dropzoneTitle="Error Dropzone"
              />
              <UploadImage
                label="Required Label"
                isRequired
                size="sm"
                dropzoneTitle="Required Dropzone"
              />
              <UploadImage
                label="Custom Class Label"
                labelClassName="font-extrabold uppercase"
                size="sm"
                dropzoneTitle="Custom Class Dropzone"
              />
            </div>
          </div>
        </div>
      );
    };

    // Single Mount
    cy.mount(<AllInOneShowcase />);

    // 1. Verify Dropzone
    cy.get('[data-testid="section-dropzone"]').within(() => {
      cy.contains("Document Image").should("be.visible");
      cy.contains("Drag and drop or click to browse").should("be.visible");
      cy.get('[role="button"]').should("have.attr", "aria-describedby");
    });

    // 2. Verify Card Grid & Count
    cy.get('[data-testid="section-card-grid"]').within(() => {
      cy.get('[data-testid="upload-image-item"]').should("have.length", 2);
      cy.get('button[aria-label="Add image"]').should("be.visible");
    });

    // 3. Verify Button Trigger
    cy.get('[data-testid="section-button"]').within(() => {
      cy.contains("button", "Select Image").should("be.visible");
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
      cy.get('[role="alert"]').should("contain", "Document photo is required");
    });

    // 8. Verify Disabled & ReadOnly
    cy.get('[data-testid="section-disabled-readonly"]').within(() => {
      cy.get('[aria-disabled="true"]').should("exist");
      cy.contains("Read Only Mode")
        .parent()
        .within(() => {
          cy.get('button[aria-label="Add image"]').should("not.exist");
        });
    });

    // 9. Verify Label Configurations (Colors, isRequired, custom class)
    cy.get('[data-testid="section-label-config"]').within(() => {
      // Primary color label
      cy.contains("label", "Primary Label")
        .should("be.visible")
        .and("have.class", "text-neutral-700");

      // Secondary color label
      cy.contains("label", "Secondary Label")
        .should("be.visible")
        .and("have.class", "text-neutral-700");

      // Success color label
      cy.contains("label", "Success Label")
        .should("be.visible")
        .and("have.class", "text-success-500");

      // Error state label
      cy.contains("label", "Error Label")
        .should("be.visible")
        .and("have.class", "text-error-600");

      // isRequired asterisk
      cy.contains("label", "Required Label").within(() => {
        cy.contains("*").should("be.visible").and("have.class", "text-error-500");
      });

      // Custom labelClassName
      cy.contains("label", "Custom Class Label")
        .should("be.visible")
        .and("have.class", "font-extrabold")
        .and("have.class", "uppercase");
    });

    // 10. Interactive Dropzone File Select Test
    cy.get('[data-testid="section-dropzone"]').within(() => {
      cy.get('input[type="file"]').selectFile(
        {
          contents: Cypress.Buffer.from(
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
            "base64"
          ),
          fileName: "uploaded-doc.png",
          mimeType: "image/png",
        },
        { force: true }
      );
      cy.get("@onDropzoneChangeSpy").should("have.been.called");
      cy.get('img[alt="uploaded-doc.png"]')
        .should("be.visible")
        .and("have.class", "object-contain");

      // Verify clicking the dropzone when an image exists opens preview modal
      cy.get('img[alt="uploaded-doc.png"]').click({ force: true });
    });

    cy.get('[data-testid="image-preview-modal"]').should("be.visible");
    cy.get("body").type("{esc}");
    cy.get('[data-testid="image-preview-modal"]').should("not.exist");

    cy.get('[data-testid="section-dropzone"]').within(() => {
      // Verify the 2 top-right action buttons (Replace & Delete)
      cy.get('button[data-testid="dropzone-replace-button"]').should("be.visible");
      cy.get('button[data-testid="dropzone-remove-button"]').should("be.visible");

      // Test remove action from top-right icon
      cy.get('button[data-testid="dropzone-remove-button"]').click({ force: true });
      cy.get('img[alt="uploaded-doc.png"]').should("not.exist");
    });

    // 11. Interactive Card-Grid Preview Lightbox Test (via file-preview & FileContainer)
    cy.get('[data-testid="section-card-grid"]').within(() => {
      cy.get('button[aria-label="Preview image nature.png"]').click({ force: true });
      cy.get("@onPreviewSpy").should("have.been.called");
    });

    // Lightbox modal via FileContainer with image-preview-toolbar should open
    cy.get('[data-testid="image-preview-modal"]').should("be.visible");
    cy.get('[data-testid="image-preview-toolbar"]').should("be.visible");

    // Close with ESC
    cy.get("body").type("{esc}");
    cy.get('[data-testid="image-preview-modal"]').should("not.exist");

    // 12. Interactive Card-Grid Remove Test
    cy.get('[data-testid="section-card-grid"]').within(() => {
      cy.get('button[aria-label="Remove image nature.png"]').click({ force: true });
      cy.get("@onRemoveSpy").should("have.been.called");
      cy.get('[data-testid="upload-image-item"]').should("have.length", 1);
    });
  });

  it("renders label independently and links with input via htmlFor", () => {
    cy.mount(
      <UploadImage
        label="Avatar Upload"
        isRequired
        color="info"
        labelClassName="tracking-wide"
      />
    );

    cy.contains("label", "Avatar Upload")
      .should("be.visible")
      .and("have.class", "text-info-500")
      .and("have.class", "tracking-wide")
      .invoke("attr", "for")
      .then((forId) => {
        expect(forId).to.be.a("string").and.not.be.empty;
        cy.get(`input#${forId}`).should("exist").and("have.attr", "type", "file");
      });

    cy.contains("label", "Avatar Upload").within(() => {
      cy.contains("*").should("be.visible").and("have.class", "text-error-500");
    });
  });
});
