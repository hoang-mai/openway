import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselSlide,
  CarouselPrevious,
  CarouselNext,
  CarouselPagination,
  CarouselSize,
  CarouselRadius,
  CarouselNavigationVariant,
} from "./index";

describe("<Carousel /> Comprehensive Component Tests", () => {
  it("renders the entire Carousel design system showcase in a single mount and passes all assertions", () => {
    const onIndexChangeSpy = cy.spy().as("onIndexChangeSpy");
    const controlledIndexChangeSpy = cy.spy().as("controlledIndexChangeSpy");

    const sampleSlides = [
      { id: 1, title: "Slide 1: Khám Phá Công Nghệ", gradient: "from-primary-700 to-primary-900" },
      { id: 2, title: "Slide 2: Trải Nghiệm Tối Ưu", gradient: "from-primary-600 to-primary-800" },
      { id: 3, title: "Slide 3: Thiết Kế Hiện Đại", gradient: "from-primary-500 to-primary-700" },
      { id: 4, title: "Slide 4: Kính Mờ Tinh Tế", gradient: "from-primary-800 to-primary-950" },
    ];

    const sizes: CarouselSize[] = ["sm", "md", "lg"];
    const radiuses: CarouselRadius[] = ["none", "sm", "md", "lg", "xl", "full"];
    const navVariants: CarouselNavigationVariant[] = ["glass", "filled", "outline", "ghost"];

    function InteractiveControlledDemo() {
      const [index, setIndex] = useState(0);
      return (
        <div data-testid="controlled-demo-container" className="space-y-3">
          <div className="flex items-center gap-3">
            <span
              data-testid="controlled-active-label"
              className="text-sm font-semibold text-neutral-700 dark:text-neutral-300"
            >
              Current Index: {index}
            </span>
            <button
              data-testid="controlled-btn-jump-2"
              type="button"
              onClick={() => {
                setIndex(2);
                controlledIndexChangeSpy(2);
              }}
              className="px-3 py-1 bg-primary-600 text-white text-xs rounded-md shadow hover:bg-primary-700 transition-colors"
            >
              Jump to Slide 3 (Index 2)
            </button>
          </div>
          <Carousel
            currentIndex={index}
            onIndexChange={(newIdx) => {
              setIndex(newIdx);
              controlledIndexChangeSpy(newIdx);
            }}
            className="w-full max-w-md border border-neutral-200 dark:border-neutral-800"
          >
            <CarouselContent>
              {sampleSlides.map((slide, i) => (
                <CarouselSlide key={slide.id} data-testid={`controlled-slide-${i}`}>
                  <div
                    className={`h-32 flex items-center justify-center text-white font-medium bg-linear-to-r ${slide.gradient}`}
                  >
                    {slide.title}
                  </div>
                </CarouselSlide>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselPagination />
          </Carousel>
        </div>
      );
    }

    cy.mount(
      <div
        style={{
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "36px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          backgroundColor: "#f9fbfb",
          minHeight: "100vh",
        }}
      >
        <header>
          <h1
            style={{
              margin: "0 0 8px 0",
              color: "#122026",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            🎠 Carousel Showcase (Kính Mờ & Nút Sát Mép)
          </h1>
          <p style={{ margin: 0, color: "#7d8b90", fontSize: "14px" }}>
            Trưng bày đầy đủ: Nút điều hướng kính mờ sát mép viền, phân trang glassmorphism, tông màu Primary chuẩn,
            loop, pagination, sizes và controlled mode trong cùng 1 màn hình.
          </p>
        </header>

        {/* Section 1: Main Interactive Showcase with Loop & Frosted Glass */}
        <section
          data-testid="section-main-interactive"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>
            1. Carousel Kính Mờ Sát Mép (Infinite Loop, Frosted Glass Arrows & Dots)
          </h2>
          <Carousel
            data-testid="main-interactive-carousel"
            loop
            onIndexChange={onIndexChangeSpy}
            className="w-full max-w-lg shadow-lg"
          >
            <CarouselContent>
              {sampleSlides.map((slide, i) => (
                <CarouselSlide key={slide.id} data-testid={`interactive-slide-${i}`}>
                  <div
                    className={`h-52 flex flex-col items-center justify-center text-white p-6 bg-linear-to-br ${slide.gradient}`}
                  >
                    <span className="text-xl font-bold">{slide.title}</span>
                    <span className="text-sm opacity-90 mt-1">Nút điều hướng kính mờ đặt sát 2 mép</span>
                  </div>
                </CarouselSlide>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselPagination />
          </Carousel>
        </section>

        {/* Section 2: Standard Declarative Carousel */}
        <section
          data-testid="section-declarative"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>
            2. Standard Declarative Carousel (Compound Components)
          </h2>
          <Carousel
            data-testid="declarative-carousel"
            className="w-full max-w-md shadow"
          >
            <CarouselContent>
              {sampleSlides.map((slide, i) => (
                <CarouselSlide key={slide.id} data-testid={`declarative-slide-${i}`}>
                  <div
                    className={`h-40 flex items-center justify-center text-white font-bold text-lg rounded-md bg-linear-to-br ${slide.gradient} p-4 text-center`}
                  >
                    {slide.title}
                  </div>
                </CarouselSlide>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselPagination />
          </Carousel>
        </section>

        {/* Section 3: Compound Components with Custom Slot Bar */}
        <section
          data-testid="section-compound"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>
            3. Compound Components Pattern (Tùy Biến Vị Trí Nút)
          </h2>
          <Carousel
            data-testid="compound-carousel"
            defaultIndex={1}
            className="w-full max-w-md border border-neutral-200 dark:border-neutral-700 p-2 rounded-xl"
          >
            <CarouselContent>
              {sampleSlides.map((slide, i) => (
                <CarouselSlide key={slide.id} data-testid={`compound-slide-${i}`}>
                  <div
                    className={`h-36 flex items-center justify-center text-white font-semibold rounded-lg bg-linear-to-r ${slide.gradient}`}
                  >
                    {slide.title}
                  </div>
                </CarouselSlide>
              ))}
            </CarouselContent>
            <div className="flex justify-between items-center mt-3 px-2">
              <CarouselPrevious data-testid="custom-slot-prev" className="static translate-y-0" variant="glass" />
              <CarouselPagination data-testid="custom-slot-pagination" className="static translate-x-0" type="dots" />
              <CarouselNext data-testid="custom-slot-next" className="static translate-y-0" variant="glass" />
            </div>
          </Carousel>
        </section>

        {/* Section 4: Pagination Types */}
        <section
          data-testid="section-paginations"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>
            4. Các Kiểu Phân Trang Kính Mờ (Dots, Line, Fraction)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-xs font-semibold text-neutral-500 block mb-2">Dots Indicator</span>
              <Carousel className="w-full shadow">
                <CarouselContent>
                  {sampleSlides.map((slide) => (
                    <CarouselSlide key={slide.id}>
                      <div
                        className={`h-28 flex items-center justify-center text-white bg-linear-to-r ${slide.gradient}`}
                      >
                        {slide.title}
                      </div>
                    </CarouselSlide>
                  ))}
                </CarouselContent>
                <CarouselPagination type="dots" />
              </Carousel>
            </div>

            <div>
              <span className="text-xs font-semibold text-neutral-500 block mb-2">Line Indicator</span>
              <Carousel data-testid="line-carousel" className="w-full shadow">
                <CarouselContent>
                  {sampleSlides.map((slide) => (
                    <CarouselSlide key={slide.id}>
                      <div
                        className={`h-28 flex items-center justify-center text-white bg-linear-to-r ${slide.gradient}`}
                      >
                        {slide.title}
                      </div>
                    </CarouselSlide>
                  ))}
                </CarouselContent>
                <CarouselPagination type="line" />
              </Carousel>
            </div>

            <div>
              <span className="text-xs font-semibold text-neutral-500 block mb-2">Fraction Indicator (1 / 4)</span>
              <Carousel
                data-testid="fraction-carousel"
                className="w-full shadow"
              >
                <CarouselContent>
                  {sampleSlides.map((slide) => (
                    <CarouselSlide key={slide.id}>
                      <div
                        className={`h-28 flex items-center justify-center text-white bg-linear-to-r ${slide.gradient}`}
                      >
                        {slide.title}
                      </div>
                    </CarouselSlide>
                  ))}
                </CarouselContent>
                <CarouselPagination type="fraction" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* Section 5: Multiple Slides Per View */}
        <section
          data-testid="section-multi-slides"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>
            5. Hiển Thị Nhiều Slide (slidesToShow: 2 & 3, spacing)
          </h2>
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-neutral-500 block mb-1">slidesToShow = 2, spacing = 16</span>
              <Carousel
                data-testid="multi-slide-2"
                slidesToShow={2}
                spacing={16}
                className="w-full max-w-xl shadow"
              >
                <CarouselContent>
                  {sampleSlides.map((slide, i) => (
                    <CarouselSlide key={slide.id} data-testid={`multi2-slide-${i}`}>
                      <div
                        className={`h-28 flex items-center justify-center text-white font-medium rounded-lg bg-linear-to-r ${slide.gradient}`}
                      >
                        {slide.title}
                      </div>
                    </CarouselSlide>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            <div>
              <span className="text-xs font-semibold text-neutral-500 block mb-1">slidesToShow = 3, spacing = 12</span>
              <Carousel
                data-testid="multi-slide-3"
                slidesToShow={3}
                spacing={12}
                className="w-full max-w-2xl shadow"
              >
                <CarouselContent>
                  {sampleSlides.map((slide, i) => (
                    <CarouselSlide key={slide.id} data-testid={`multi3-slide-${i}`}>
                      <div
                        className={`h-24 flex items-center justify-center text-white text-xs font-medium rounded-lg bg-linear-to-r ${slide.gradient}`}
                      >
                        {slide.title}
                      </div>
                    </CarouselSlide>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </section>

        {/* Section 6: Sizes */}
        <section
          data-testid="section-sizes"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>
            6. 3 Kích Thước (Sizes: sm, md, lg)
          </h2>
          <div className="space-y-4">
            {sizes.map((sz) => (
              <div key={sz}>
                <span className="text-xs font-semibold text-neutral-500 block mb-1">Size: {sz.toUpperCase()}</span>
                <Carousel size={sz} className="w-full max-w-md shadow">
                  <CarouselContent>
                    {sampleSlides.map((slide) => (
                      <CarouselSlide key={slide.id}>
                        <div
                          className={`h-24 flex items-center justify-center text-white bg-linear-to-r ${slide.gradient}`}
                        >
                          Size {sz} - {slide.title}
                        </div>
                      </CarouselSlide>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselPagination />
                  <CarouselNext />
                </Carousel>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Radiuses */}
        <section
          data-testid="section-radiuses"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>
            7. 6 Kiểu Bo Góc (Radiuses: none, sm, md, lg, xl, full)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {radiuses.map((rad) => (
              <div key={rad}>
                <span className="text-xs font-semibold text-neutral-500 block mb-1">Radius: {rad}</span>
                <Carousel radius={rad} className="w-full shadow">
                  <CarouselContent>
                    <CarouselSlide>
                      <div className="h-20 flex items-center justify-center bg-primary-800 text-white text-xs font-medium">
                        {rad}
                      </div>
                    </CarouselSlide>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Navigation Button Variants */}
        <section
          data-testid="section-nav-variants"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>
            8. Các Biến Thể Nút Điều Hướng (Glass, Filled, Outline, Ghost)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {navVariants.map((v) => (
              <div key={v}>
                <span className="text-xs font-semibold text-neutral-500 block mb-1">Variant: {v}</span>
                <Carousel className="w-full shadow">
                  <CarouselContent>
                    <CarouselSlide>
                      <div className="h-24 flex items-center justify-center bg-primary-700 text-white text-xs font-medium">
                        {v}
                      </div>
                    </CarouselSlide>
                  </CarouselContent>
                  <CarouselPrevious variant={v} />
                  <CarouselNext variant={v} />
                </Carousel>
              </div>
            ))}
          </div>
        </section>

        {/* Section 9: Controlled State */}
        <section
          data-testid="section-controlled"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "16px", margin: "0 0 16px 0", color: "#325972" }}>9. Controlled State Mode</h2>
          <InteractiveControlledDemo />
        </section>
      </div>
    );

    // ==========================================
    // CYPRESS INTERACTION & ASSERTIONS
    // ==========================================

    // 1. Check Section 1: Main Interactive Showcase (Loop, Edge Buttons, Keyboard)
    cy.get('[data-testid="section-main-interactive"]').within(() => {
      // In loop mode: Prev button should NOT be disabled on first slide
      cy.get('button[aria-label="Previous slide"]').should("not.be.disabled");
      cy.get('button[aria-label="Next slide"]').should("not.be.disabled");

      // Click Prev: wraps to last slide (index 3)
      cy.get('button[aria-label="Previous slide"]').click();
      cy.get("@onIndexChangeSpy").should("have.been.calledWith", 3);

      // Click Next: wraps back to slide 0
      cy.get('button[aria-label="Next slide"]').click();
      cy.get("@onIndexChangeSpy").should("have.been.calledWith", 0);
    });

    // Keyboard navigation on main interactive carousel
    cy.get('[data-testid="main-interactive-carousel"]').focus().type("{rightarrow}");
    cy.get("@onIndexChangeSpy").should("have.been.calledWith", 1);

    cy.get('[data-testid="main-interactive-carousel"]').type("{leftarrow}");
    cy.get("@onIndexChangeSpy").should("have.been.calledWith", 0);

    // 2. Check Section 2: Standard Declarative Carousel
    cy.get('[data-testid="section-declarative"]').within(() => {
      cy.get('[data-testid="declarative-slide-0"]').should("be.visible");
      // Without loop, initial prev button is disabled
      cy.get('button[aria-label="Previous slide"]').should("be.disabled");
      cy.get('button[aria-label="Next slide"]').should("not.be.disabled").click();
      cy.get('button[aria-label="Previous slide"]').should("not.be.disabled");
    });

    // 3. Check Section 3: Compound Components pattern
    cy.get('[data-testid="section-compound"]').within(() => {
      cy.get('[data-testid="custom-slot-prev"]').should("exist").click();
      cy.get('[data-testid="custom-slot-next"]').should("exist").click();
    });

    // 4. Check Section 4: Paginations (Dots, Line, Fraction)
    cy.get('[data-testid="section-paginations"]').within(() => {
      // Fraction display check
      cy.get('[data-testid="fraction-carousel"] [role="status"]').should("contain.text", "1 / 4");

      // Line pagination click check
      cy.get('[data-testid="line-carousel"] button[role="tab"]').eq(2).click();
    });

    // 5. Check Section 5: Multiple Slides per view
    cy.get('[data-testid="multi2-slide-0"]').should("exist");
    cy.get('[data-testid="multi2-slide-1"]').should("exist");
    cy.get('[data-testid="multi3-slide-0"]').should("exist");
    cy.get('[data-testid="multi3-slide-1"]').should("exist");
    cy.get('[data-testid="multi3-slide-2"]').should("exist");

    // 6. Check Section 9: Controlled Mode
    cy.get('[data-testid="controlled-active-label"]').should("contain.text", "Current Index: 0");
    cy.get('[data-testid="controlled-btn-jump-2"]').click();
    cy.get('[data-testid="controlled-active-label"]').should("contain.text", "Current Index: 2");
    cy.get("@controlledIndexChangeSpy").should("have.been.calledWith", 2);
  });
});
