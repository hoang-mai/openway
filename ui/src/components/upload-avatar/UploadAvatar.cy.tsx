import { useState } from "react";
import { UploadAvatar } from "./index";
import { UploadAvatarColor, UploadAvatarRadius, UploadAvatarSize, UploadAvatarVariant } from "./types";
import { PreviewFile } from "@/components/file-preview/types";

const sizes: UploadAvatarSize[] = ["xs", "sm", "md", "lg", "xl"];
const radii: UploadAvatarRadius[] = ["none", "sm", "md", "lg", "xl", "full"];
const variants: UploadAvatarVariant[] = ["outline", "filled", "ghost"];
const colors: UploadAvatarColor[] = ["primary", "secondary", "error", "success", "warning", "info", "neutral"];

const mockAvatar: PreviewFile = {
  name: "profile.jpg",
  src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
  type: "image",
};

describe("UploadAvatar Component Showcase & Verification", () => {
  it("comprehensively verifies UploadAvatar functionality in a single mount", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    const onRemoveSpy = cy.spy().as("onRemoveSpy");
    const onPreviewSpy = cy.spy().as("onPreviewSpy");

    const AllInOneShowcase = () => {
      const [avatar, setAvatar] = useState<PreviewFile | null>(mockAvatar);
      const [squareAvatar, setSquareAvatar] = useState<PreviewFile | null>(null);

      return (
        <div className="p-8 flex flex-col gap-8 max-w-5xl mx-auto bg-neutral-100 min-h-screen text-neutral-900 font-sans">

          <div className="border-b border-neutral-300 pb-4">
            <h1 className="text-2xl font-bold text-neutral-900">UploadAvatar Showcase & Testing</h1>
            <p className="text-sm text-neutral-600">
              Testing UploadAvatar with cropping, file-preview, 5 sizes, variants, colors, shapes and validation.
            </p>
          </div>

          {/* Section 1: Interactive Circle & Square */}
          <div
            data-testid="section-interactive"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-4"
          >
            <h2 className="text-base font-semibold text-neutral-800">
              1. Interactive Avatars (Circle with Image & Square Empty)
            </h2>
            <div className="flex items-center gap-12">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-medium text-neutral-600">Circle Avatar (With Image)</span>
                <UploadAvatar
                  value={avatar}
                  onChange={(item) => {
                    setAvatar(item);
                    onChangeSpy(item);
                  }}
                  onRemove={onRemoveSpy}
                  onPreview={onPreviewSpy}
                  crop={true}
                  shape="circle"
                  size="lg"
                  label="Profile Picture"
                  helperText="Hover to view actions"
                />
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-medium text-neutral-600">Square Avatar (Empty Placeholder)</span>
                <UploadAvatar
                  value={squareAvatar}
                  onChange={(item) => {
                    setSquareAvatar(item);
                    onChangeSpy(item);
                  }}
                  shape="square"
                  size="lg"
                  radius="lg"
                  crop={{ cropShape: "rect", aspectRatio: 1 }}
                  label="Company Logo"
                  helperText="Click or drop image"
                />
              </div>
            </div>
          </div>

          {/* Section 2: All 5 Sizes */}
          <div
            data-testid="section-sizes"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-4"
          >
            <h2 className="text-base font-semibold text-neutral-800">2. All 5 Sizes (xs, sm, md, lg, xl)</h2>
            <div className="flex items-center gap-6">
              {sizes.map((sz) => (
                <div key={sz} className="flex flex-col items-center gap-2">
                  <span className="text-xs font-bold uppercase text-primary-700">{sz}</span>
                  <UploadAvatar size={sz} defaultValue={mockAvatar} />
                  <UploadAvatar size={sz} shape="square" />
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Variants & Colors */}
          <div
            data-testid="section-variants-colors"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-4"
          >
            <h2 className="text-base font-semibold text-neutral-800">3. Variants (Outline, Filled, Ghost) & Colors</h2>
            {variants.map((v) => (
              <div key={v} className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase text-neutral-700">{v}</span>
                <div className="flex items-center gap-4">
                  {colors.map((c) => (
                    <div key={c} className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-neutral-500">{c}</span>
                      <UploadAvatar variant={v} color={c} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Section 4: Radii (Square Shape) */}
          <div
            data-testid="section-radii"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-3"
          >
            <h2 className="text-base font-semibold text-neutral-800">4. Corner Radius Options (Square)</h2>
            <div className="flex items-center gap-6">
              {radii.map((r) => (
                <div key={r} className="flex flex-col items-center gap-1">
                  <span className="text-xs font-medium text-neutral-600">{r}</span>
                  <UploadAvatar shape="square" radius={r} size="md" defaultValue={mockAvatar} />
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Validation, Disabled, ReadOnly */}
          <div
            data-testid="section-states"
            className="p-5 bg-white rounded-xl shadow-xs border border-neutral-200 flex flex-col gap-4"
          >
            <h2 className="text-base font-semibold text-neutral-800">5. Error, Disabled and ReadOnly States</h2>
            <div className="flex items-center gap-8">
              <UploadAvatar
                config={{ isInvalid: true, isRequired: true }}
                errorMessage="Avatar is required"
                size="md"
                label="Required Field"
              />
              <UploadAvatar disabled defaultValue={mockAvatar} size="md" label="Disabled Avatar" />
              <UploadAvatar readOnly defaultValue={mockAvatar} size="md" label="Read Only Avatar" />
              <UploadAvatar config={{ isLoading: true, showSpinner: true }} size="md" label="Loading Spinner Avatar" />
            </div>
          </div>
        </div>
      );
    };

    cy.mount(<AllInOneShowcase />);

    // Assertions
    cy.get('[data-testid="section-interactive"]').within(() => {
      cy.get("img").should("have.attr", "src").and("include", "unsplash");
      cy.get('[data-testid="avatar-crop-button"]').should("exist");
      cy.get('[data-testid="avatar-preview-button"]').should("exist");
      cy.get('[data-testid="avatar-remove-button"]').should("exist");
    });

    // Test preview lightbox (FilePreview & FileContainer)
    cy.get('[data-testid="section-interactive"]')
      .find('[data-testid="avatar-preview-button"]')
      .first()
      .click({ force: true });
    cy.get('[data-testid="modal-close-button"]').should("be.visible");
    cy.get('[data-testid="modal-close-button"]').click();

    // Test crop modal
    cy.get('[data-testid="section-interactive"]')
      .find('[data-testid="avatar-crop-button"]')
      .first()
      .click({ force: true });
    cy.get('[data-testid="upload-avatar-crop-modal"]').should("be.visible");
    cy.get('[data-testid="avatar-crop-cancel-button"]').click();
    cy.get('[data-testid="upload-avatar-crop-modal"]').should("not.exist");

    // Test remove
    cy.get('[data-testid="section-interactive"]')
      .find('[data-testid="avatar-remove-button"]')
      .first()
      .click({ force: true });
    cy.get("@onRemoveSpy").should("have.been.called");

    // Test dropzone upload (drag-drop on the square avatar)
    cy.get('[data-testid="section-interactive"]')
      .find('input[type="file"]')
      .last()
      .selectFile(
        {
          contents: Cypress.Buffer.from("fake-avatar-image-content"),
          fileName: "avatar-drop.png",
          mimeType: "image/png",
        },
        { force: true, action: "drag-drop" }
      );
    cy.get("@onChangeSpy").should("have.been.called");

    // Test section-states (error, loading with showSpinner)
    cy.get('[data-testid="section-states"]').within(() => {
      cy.get('[role="status"]').should("exist");
    });
  });
});
