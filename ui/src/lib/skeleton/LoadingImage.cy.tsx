import React from "react";
import { LoadingImage } from "./index";
import { SkeletonRadius, SkeletonVariant } from "./types";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const REAL_IMAGE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80";

const BROKEN_IMAGE = "https://this-domain-does-not-exist.invalid/broken.png";

const mount = (props: React.ComponentProps<typeof LoadingImage> = {}) => {
  cy.mount(<LoadingImage {...props} />);
};

// ─────────────────────────────────────────────
// 1. Render cơ bản
// ─────────────────────────────────────────────
describe("LoadingImage — Render cơ bản", () => {
  it("Render được wrapper với props mặc định", () => {
    mount({ width: 200, height: 150 });
    cy.get(".relative.overflow-hidden").should("exist");
  });

  it("Wrapper có class overflow-hidden và inline-block", () => {
    mount({ width: 200, height: 150 });
    cy.get(".relative.overflow-hidden")
      .should("have.class", "overflow-hidden")
      .and("have.class", "inline-block");
  });

  it("Khi không truyền src, không render thẻ img", () => {
    mount({ width: 200, height: 150 });
    cy.get("img").should("not.exist");
  });
});

// ─────────────────────────────────────────────
// 2. Skeleton placeholder
// ─────────────────────────────────────────────
describe("LoadingImage — Skeleton placeholder", () => {
  it("Skeleton hiện ngay khi src đang tải (trước onLoad)", () => {
    // Stub ảnh để nó không bao giờ load
    cy.intercept("GET", "**", { delay: 60000, body: "" }).as("img");
    mount({ src: REAL_IMAGE, width: 200, height: 150, unoptimized: true });
    cy.get("[role='status']").should("exist");
  });

  it("skeletonVariant='pulse' → skeleton có class animate-pulse", () => {
    cy.intercept("GET", "**", { delay: 60000, body: "" });
    mount({
      src: REAL_IMAGE,
      width: 200,
      height: 150,
      skeletonVariant: "pulse",
      unoptimized: true,
    });
    cy.get("[role='status']").should("have.class", "animate-pulse");
  });

  it("skeletonVariant='wave' → skeleton có class skeleton-wave", () => {
    cy.intercept("GET", "**", { delay: 60000, body: "" });
    mount({
      src: REAL_IMAGE,
      width: 200,
      height: 150,
      skeletonVariant: "wave",
      unoptimized: true,
    });
    cy.get("[role='status']").should("have.class", "skeleton-wave");
  });

  it("skeletonVariant='none' → skeleton không có animation class", () => {
    cy.intercept("GET", "**", { delay: 60000, body: "" });
    mount({
      src: REAL_IMAGE,
      width: 200,
      height: 150,
      skeletonVariant: "none",
      unoptimized: true,
    });
    cy.get("[role='status']")
      .should("not.have.class", "animate-pulse")
      .and("not.have.class", "skeleton-wave");
  });
});

// ─────────────────────────────────────────────
// 3. Radius
// ─────────────────────────────────────────────
describe("LoadingImage — Radius", () => {
  const cases: Array<{ radius: SkeletonRadius; expected: string }> = [
    { radius: "none", expected: "rounded-none" },
    { radius: "sm", expected: "rounded-sm" },
    { radius: "md", expected: "rounded-md" },
    { radius: "lg", expected: "rounded-lg" },
    { radius: "xl", expected: "rounded-xl" },
    { radius: "full", expected: "rounded-full" },
  ];

  cases.forEach(({ radius, expected }) => {
    it(`radius='${radius}' → wrapper có class ${expected}`, () => {
      mount({ width: 100, height: 100, radius });
      cy.get(".relative.overflow-hidden").should("have.class", expected);
    });
  });
});

// ─────────────────────────────────────────────
// 4. Width & Height
// ─────────────────────────────────────────────
describe("LoadingImage — Width & Height", () => {
  it("width=200, height=150 → wrapper có style đúng", () => {
    mount({ width: 200, height: 150 });
    cy.get(".relative.overflow-hidden")
      .should("have.css", "width", "200px")
      .and("have.css", "height", "150px");
  });

  it("width='100%' → wrapper nhận đúng width string", () => {
    cy.mount(
      <div style={{ width: 400 }}>
        <LoadingImage width={400} height={100} unoptimized />
      </div>
    );
    cy.get(".relative.overflow-hidden").should("have.css", "width", "400px");
  });

  it("fill=true → render Next.js Image với fill", () => {
    cy.mount(
      <div style={{ width: 300, height: 200, position: "relative" }}>
        <LoadingImage src={REAL_IMAGE} alt="Test fill" fill unoptimized wrapperClassName="w-full h-full" />
      </div>
    );
    cy.get(".relative.overflow-hidden").should("exist");
    cy.get("img").should("exist");
  });
});

// ─────────────────────────────────────────────
// 5. Error state
// ─────────────────────────────────────────────
describe("LoadingImage — Error state", () => {
  it("Khi src lỗi → hiển thị error fallback", () => {
    mount({ src: BROKEN_IMAGE, width: 200, height: 150 });
    cy.get("[role='img'][aria-label='Image failed to load']", { timeout: 8000 }).should("exist");
  });

  it("Khi src lỗi → skeleton bị ẩn", () => {
    mount({ src: BROKEN_IMAGE, width: 200, height: 150 });
    cy.get("[role='img'][aria-label='Image failed to load']", { timeout: 8000 }).should("exist");
    cy.get("[role='status']").should("not.exist");
  });

  it("Error fallback có role='img' và aria-label đúng", () => {
    mount({ src: BROKEN_IMAGE, width: 200, height: 150 });
    cy.get("[role='img'][aria-label='Image failed to load']", { timeout: 8000 })
      .should("have.attr", "role", "img")
      .and("have.attr", "aria-label", "Image failed to load");
  });

  it("Khi src lỗi → onError callback được gọi", () => {
    const onError = cy.stub().as("onError");
    mount({ src: BROKEN_IMAGE, width: 200, height: 150, onError });
    cy.get("@onError", { timeout: 8000 }).should("have.been.calledOnce");
  });
});

// ─────────────────────────────────────────────
// 6. className & wrapperClassName
// ─────────────────────────────────────────────
describe("LoadingImage — className pass-through", () => {
  it("wrapperClassName được gắn đúng vào wrapper", () => {
    mount({ width: 200, height: 150, wrapperClassName: "my-wrapper-class" });
    cy.get(".relative.overflow-hidden").should("have.class", "my-wrapper-class");
  });

  it("wrapperClassName không ghi đè class mặc định", () => {
    mount({ width: 200, height: 150, wrapperClassName: "my-wrapper-class" });
    cy.get(".relative.overflow-hidden")
      .should("have.class", "my-wrapper-class")
      .and("have.class", "overflow-hidden");
  });
});

// ─────────────────────────────────────────────
// 7. Tất cả variants render không lỗi
// ─────────────────────────────────────────────
describe("LoadingImage — Mount tổng hợp", () => {
  it("Render nhiều LoadingImage với các variant và radius khác nhau", () => {
    const variants: SkeletonVariant[] = ["pulse", "wave", "none"];
    const radii: SkeletonRadius[] = ["none", "sm", "md", "lg", "xl", "full"];

    cy.mount(
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: 16 }}>
        {variants.map((v) =>
          radii.map((r) => (
            <LoadingImage
              key={`${v}-${r}`}
              src={BROKEN_IMAGE}
              width={80}
              height={80}
              skeletonVariant={v}
              radius={r}
            />
          ))
        )}
      </div>
    );

    cy.get(".relative.overflow-hidden").should("have.length", variants.length * radii.length);
  });
});

// ─────────────────────────────────────────────
// 8. Hỗ trợ File và Blob làm src
// ─────────────────────────────────────────────
describe("LoadingImage — Hỗ trợ File và Blob", () => {
  it("Render với src là File hoặc Blob và tạo Object URL", () => {
    const file = new File(["dummy"], "avatar.png", { type: "image/png" });
    mount({ src: file, width: 200, height: 150 });
    cy.get(".relative.overflow-hidden").should("exist");
  });
});

// ─────────────────────────────────────────────
// 9. Object-fit cấu hình
// ─────────────────────────────────────────────
describe("LoadingImage — Object-fit", () => {
  it("objectFit mặc định là 'cover'", () => {
    mount({ src: REAL_IMAGE, width: 200, height: 150 });
    cy.get("img").should("have.class", "object-cover");
  });

  it("objectFit='contain' → class object-contain", () => {
    mount({ src: REAL_IMAGE, width: 200, height: 150, objectFit: "contain" });
    cy.get("img").should("have.class", "object-contain");
  });

  it("objectFit='fill' → class object-fill", () => {
    mount({ src: REAL_IMAGE, width: 200, height: 150, objectFit: "fill" });
    cy.get("img").should("have.class", "object-fill");
  });
});

// ─────────────────────────────────────────────
// 10. Click để mở FilePreview
// ─────────────────────────────────────────────
describe("LoadingImage — Click to preview (FilePreview)", () => {
  it("Click vào ảnh đã tải thành công → mở FilePreview modal", () => {
    mount({ src: REAL_IMAGE, alt: "Phong cảnh", width: 200, height: 150 });
    cy.get("img").should("be.visible");
    cy.get(".relative.overflow-hidden").click();
    cy.get("dialog").should("exist");
  });

  it("preview=false → click vào ảnh không mở preview modal", () => {
    mount({ src: REAL_IMAGE, width: 200, height: 150, preview: false });
    cy.get("img").should("be.visible");
    cy.get(".relative.overflow-hidden").click();
    cy.get("dialog").should("not.exist");
  });

  it("onClick callback được gọi khi click", () => {
    const onClick = cy.stub().as("onClick");
    mount({ src: REAL_IMAGE, width: 200, height: 150, onClick });
    cy.get(".relative.overflow-hidden").click();
    cy.get("@onClick").should("have.been.calledOnce");
  });
});

// ─────────────────────────────────────────────
// 11. Hỗ trợ ServerFile làm src
// ─────────────────────────────────────────────
describe("LoadingImage — Hỗ trợ ServerFile", () => {
  it("Render với src là ServerFile ({ src, name })", () => {
    mount({ src: { src: REAL_IMAGE, name: "Server Avatar" }, width: 200, height: 150 });
    cy.get("img").should("have.attr", "alt", "Server Avatar");
  });

  it("Render với src là ServerFile có url ({ url, name })", () => {
    mount({ src: { url: REAL_IMAGE, name: "URL Avatar" } as any, width: 200, height: 150 });
    cy.get("img").should("have.attr", "alt", "URL Avatar");
  });
});




