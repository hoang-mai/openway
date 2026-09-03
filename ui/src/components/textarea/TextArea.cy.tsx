import React, { useState } from "react";
import TextArea from "./TextArea";
import { TextAreaSize, TextAreaVariant, TextAreaColor, TextAreaRadius } from "./types";

describe("TextArea Component", () => {
  // -------------------------------------------------------------
  // 1. Rendering & Basic Props
  // -------------------------------------------------------------
  describe("1. Rendering & Basic Props", () => {
    it("renders with default props", () => {
      cy.mount(<TextArea placeholder="Enter your text..." />);
      cy.get("textarea:visible").should("exist");
      cy.get("textarea:visible").should("have.attr", "placeholder", "Enter your text...");
    });

    it("handles value change and typing", () => {
      const onChangeSpy = cy.spy().as("onChangeSpy");
      cy.mount(<TextArea onChange={onChangeSpy} placeholder="Type here" />);

      cy.get("textarea:visible").type("Hello World");
      cy.get("textarea:visible").should("have.value", "Hello World");
      cy.get("@onChangeSpy").should("have.been.called");
    });

    it("works in controlled mode", () => {
      const ControlledTextArea = () => {
        const [val, setVal] = useState("initial");
        return (
          <div>
            <TextArea value={val} onChange={(e) => setVal(e.target.value)} placeholder="Controlled" />
            <span data-testid="output">{val}</span>
          </div>
        );
      };

      cy.mount(<ControlledTextArea />);
      cy.get("textarea:visible").should("have.value", "initial");
      cy.get("[data-testid='output']").should("have.text", "initial");

      cy.get("textarea:visible").clear().type("updated text");
      cy.get("textarea:visible").should("have.value", "updated text");
      cy.get("[data-testid='output']").should("have.text", "updated text");
    });
  });

  // -------------------------------------------------------------
  // 2. Sizes (xs, sm, md, lg, xl)
  // -------------------------------------------------------------
  describe("2. Sizes (5 sizes: xs, sm, md, lg, xl)", () => {
    const sizes: TextAreaSize[] = ["xs", "sm", "md", "lg", "xl"];

    sizes.forEach((s) => {
      it(`renders size="${s}" correctly`, () => {
        cy.mount(<TextArea size={s} placeholder={`Size ${s}`} />);
        cy.get("textarea:visible").should("exist");
      });
    });
  });

  // -------------------------------------------------------------
  // 3. Variants (outline, filled, ghost, other)
  // -------------------------------------------------------------
  describe("3. Variants (outline, filled, ghost, other)", () => {
    it("renders variant='outline' (default)", () => {
      cy.mount(<TextArea variant="outline" placeholder="Outline" />);
      cy.get("textarea:visible").closest(".group\\/textarea").should("have.class", "bg-neutral-white");
    });

    it("renders variant='filled'", () => {
      cy.mount(<TextArea variant="filled" placeholder="Filled" />);
      cy.get("textarea:visible").closest(".group\\/textarea").should("have.class", "border");
    });

    it("renders variant='ghost'", () => {
      cy.mount(<TextArea variant="ghost" placeholder="Ghost" />);
      cy.get("textarea:visible").closest(".group\\/textarea").should("have.class", "bg-transparent");
    });

    it("renders variant='other' allowing custom styles", () => {
      cy.mount(
        <TextArea
          variant="other"
          textareaWrapperClassName="border-2 border-dashed border-purple-500 bg-purple-50"
          placeholder="Custom other"
        />
      );
      cy.get("textarea:visible").closest(".group\\/textarea").should("have.class", "border-dashed");
    });
  });

  // -------------------------------------------------------------
  // 4. Colors (primary, secondary, error, success, warning, info, neutral)
  // -------------------------------------------------------------
  describe("4. Colors (7 colors)", () => {
    const colors: TextAreaColor[] = ["primary", "secondary", "error", "success", "warning", "info", "neutral"];

    colors.forEach((c) => {
      it(`renders color="${c}" correctly`, () => {
        cy.mount(<TextArea color={c} placeholder={`Color ${c}`} />);
        cy.get("textarea:visible").should("exist");
      });
    });
  });

  // -------------------------------------------------------------
  // 5. Radius
  // -------------------------------------------------------------
  describe("5. Radius (none, sm, md, lg, xl, full)", () => {
    const radii: TextAreaRadius[] = ["none", "sm", "md", "lg", "xl", "full"];

    radii.forEach((r) => {
      it(`supports radius='${r}'`, () => {
        cy.mount(<TextArea radius={r} placeholder={`Radius ${r}`} />);
        cy.get("textarea:visible").should("exist");
      });
    });
  });

  // -------------------------------------------------------------
  // 6. Labels & Placements
  // -------------------------------------------------------------
  describe("6. Labels & Placements (top, left, floating, isRequired)", () => {
    it("renders label and focuses textarea on label click", () => {
      cy.mount(<TextArea label="Mô tả chi tiết" id="desc-field" />);
      cy.contains("Mô tả chi tiết").should("be.visible");
      cy.contains("Mô tả chi tiết").click();
      cy.get("textarea:visible").should("be.focused");
    });

    it("renders isRequired asterisk and aria-required attribute", () => {
      cy.mount(<TextArea label="Bắt buộc" config={{ isRequired: true }} />);
      cy.contains("*").should("be.visible");
      cy.get("textarea:visible").should("have.attr", "aria-required", "true");
    });

    it("renders label placement: top", () => {
      cy.mount(<TextArea label="Top Label" labelPlacement="top" />);
      cy.contains("Top Label").should("be.visible");
    });

    it("renders label placement: left", () => {
      cy.mount(<TextArea label="Left Label" labelPlacement="left" />);
      cy.contains("Left Label").should("be.visible");
    });

    it("renders label placement: floating on top border", () => {
      cy.mount(
        <div className="p-6">
          <TextArea label="Floating Label" labelPlacement="floating" />
        </div>
      );
      cy.contains("Floating Label").should("be.visible").should("have.class", "-translate-y-1/2");
    });
  });

  // -------------------------------------------------------------
  // 7. Helper & Error States with In/Out Animation
  // -------------------------------------------------------------
  describe("7. Helper & Error States", () => {
    it("renders helperText with aria-describedby", () => {
      cy.mount(<TextArea helperText="Nhập tối thiểu 20 từ" placeholder="Gõ..." />);
      cy.contains("Nhập tối thiểu 20 từ").should("be.visible");
      cy.get("textarea:visible").should("have.attr", "aria-describedby");
    });

    it("renders errorMessage and applies error styles & aria-invalid", () => {
      cy.mount(<TextArea errorMessage="Nội dung không hợp lệ" placeholder="Gõ..." />);
      cy.contains("Nội dung không hợp lệ").should("be.visible");
      cy.get("textarea:visible").should("have.attr", "aria-invalid", "true");
    });

    it("supports isInvalid prop explicitly", () => {
      cy.mount(<TextArea config={{ isInvalid: true }} placeholder="Invalid field" />);
      cy.get("textarea:visible").should("have.attr", "aria-invalid", "true");
    });

    it("handles live typing validation error with animation effect", () => {
      const LiveForm = () => {
        const [text, setText] = useState("");
        const isError = text.length > 0 && text.length < 5;

        return (
          <TextArea
            label="Đánh giá"
            value={text}
            onChange={(e) => setText(e.target.value)}
            errorMessage={isError ? "Tối thiểu 5 ký tự!" : undefined}
            helperText={!isError ? "Hãy chia sẻ cảm nhận" : undefined}
          />
        );
      };

      cy.mount(<LiveForm />);
      cy.contains("Hãy chia sẻ cảm nhận").should("be.visible");

      cy.get("textarea:visible").type("Alo");
      cy.contains("Tối thiểu 5 ký tự!").should("be.visible");
      cy.get("textarea:visible").should("have.attr", "aria-invalid", "true");

      cy.get("textarea:visible").type(" 12345");
      cy.contains("Hãy chia sẻ cảm nhận").should("be.visible");
      cy.get("textarea:visible").should("have.attr", "aria-invalid", "false");
    });
  });

  // -------------------------------------------------------------
  // 8. AutoResize & Counter
  // -------------------------------------------------------------
  describe("8. AutoResize, Character Counter & States", () => {
    it("handles autoResize height expansion", () => {
      const AutoResizeForm = () => {
        const [val, setVal] = useState("");
        return <TextArea config={{ autoResize: true }} minRows={2} value={val} onChange={(e) => setVal(e.target.value)} />;
      };

      cy.mount(<AutoResizeForm />);
      cy.get("textarea:visible").then(($el) => {
        const h1 = $el.height() || 0;
        cy.get("textarea:visible").type("1{enter}2{enter}3{enter}4{enter}5");
        cy.get("textarea:visible").then(($el2) => {
          expect($el2.height() || 0).to.be.greaterThan(h1);
        });
      });
    });

    it("triggers onHeightChange callback when height changes", () => {
      const onHeightChangeSpy = cy.spy().as("onHeightChangeSpy");
      cy.mount(<TextArea minRows={2} onHeightChange={onHeightChangeSpy} />);
      cy.get("textarea:visible").type("1{enter}2{enter}3{enter}4{enter}5");
      cy.get("@onHeightChangeSpy").should("have.been.called");
    });

    it("renders standard native textarea when autoResize={false}", () => {
      cy.mount(<TextArea config={{ autoResize: false }} minRows={4} placeholder="Fixed size" />);
      cy.get("textarea:visible").should("have.attr", "rows", "4");
    });

    it("displays character count at bottom right inside container", () => {
      cy.mount(<TextArea config={{ showCount: true }} maxLength={100} value="Nội dung kiểm thử" />);
      cy.contains("17/100").should("be.visible");
    });

    it("forwards ref to HTMLTextAreaElement directly", () => {
      const RefWrapper = () => {
        const ref = React.useRef<HTMLTextAreaElement>(null);
        return (
          <div>
            <TextArea ref={ref} placeholder="Ref test" />
            <button onClick={() => ref.current?.focus()}>Focus</button>
          </div>
        );
      };

      cy.mount(<RefWrapper />);
      cy.get("button").click();
      cy.get("textarea:visible").should("be.focused");
    });

    it("handles disabled and readOnly states", () => {
      cy.mount(<TextArea disabled placeholder="Disabled" />);
      cy.get("textarea:visible").should("be.disabled");

      cy.mount(<TextArea readOnly value="Read only text" />);
      cy.get("textarea:visible").should("have.attr", "readonly");
    });

    it("handles isLoading state with spinner and disables interaction", () => {
      cy.mount(<TextArea config={{ isLoading: true, showSpinner: true }} value="Loading content..." />);
      cy.get("textarea:visible").should("be.disabled").and("have.attr", "aria-busy", "true");
      cy.get("svg").should("exist");
    });

    it("supports isClearable button and onClear callback", () => {
      const onClearSpy = cy.spy().as("onClearSpy");
      const ClearableWrapper = () => {
        const [val, setVal] = useState("Văn bản cần xóa");
        return (
          <TextArea
            config={{ isClearable: true }}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onClear={() => {
              setVal("");
              onClearSpy();
            }}
          />
        );
      };

      cy.mount(<ClearableWrapper />);
      cy.get("textarea:visible").should("have.value", "Văn bản cần xóa");
      cy.get("button[aria-label='Clear textarea']").click();
      cy.get("@onClearSpy").should("have.been.calledOnce");
      cy.get("textarea:visible").should("have.value", "");
    });
  });

  // -------------------------------------------------------------
  // 9. Complete Visual Gallery / Showcase (Matches Input.cy.tsx exactly)
  // -------------------------------------------------------------
  describe("9. Visual Gallery / Showcase", () => {
    it("renders complete visual dashboard with all variants, sizes, and states", () => {
      const sizes: TextAreaSize[] = ["xs", "sm", "md", "lg", "xl"];
      const variants: TextAreaVariant[] = ["outline", "filled", "ghost"];
      const radiuses: TextAreaRadius[] = ["none", "sm", "md", "lg", "xl", "full"];

      const InteractivePlayground = () => {
        const [feedback, setFeedback] = useState("");
        const [feedbackTouched, setFeedbackTouched] = useState(false);
        const [floatingVal, setFloatingVal] = useState("");
        const [counterVal, setCounterVal] = useState("Văn bản ban đầu có đếm ký tự");

        const isFeedbackInvalid = feedbackTouched && feedback.length > 0 && feedback.length < 15;
        const feedbackError = isFeedbackInvalid ? "Nội dung nhận xét quá ngắn (cần tối thiểu 15 ký tự)" : undefined;

        return (
          <section
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
              border: "2px solid var(--color-primary-500)",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <span
                style={{
                  background: "var(--color-primary-100)",
                  color: "var(--color-primary-800)",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                ★ Interactive Testing Area
              </span>
              <h2
                style={{
                  fontSize: "18px",
                  margin: "8px 0 4px 0",
                  color: "var(--color-primary-900)",
                }}
              >
                Khu vực Thử Nghiệm Trực Tiếp (Live Validation, Animation & AutoResize)
              </h2>
              <p style={{ margin: 0, color: "#64748b", fontSize: "13px" }}>
                Bạn có thể gõ phím trực tiếp hoặc bấm các nút bên dưới để xem hiệu ứng báo lỗi, floating label và bộ đếm
                ký tự:
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {/* Test Case 1: Báo lỗi và hiệu ứng Error */}
              <div
                style={{
                  background: "#f8fafc",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    margin: 0,
                    color: isFeedbackInvalid ? "#dc2626" : "#334155",
                  }}
                >
                  1. Test Báo lỗi Real-time & Animation
                </h3>
                <TextArea
                  label="Đánh giá sản phẩm"
                  value={feedback}
                  onChange={(e) => {
                    setFeedback(e.target.value);
                    setFeedbackTouched(true);
                  }}
                  errorMessage={feedbackError}
                  helperText={!feedbackError ? "Tối thiểu 15 ký tự" : undefined}
                  placeholder="Gõ nhận xét của bạn..."
                  minRows={2}
                />
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setFeedback("Ngắn");
                      setFeedbackTouched(true);
                    }}
                    style={{
                      fontSize: "12px",
                      padding: "4px 8px",
                      background: "#fee2e2",
                      color: "#991b1b",
                      border: "1px solid #fecaca",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Gõ thử sai (&lt;15 ký tự)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFeedback("Sản phẩm sử dụng rất tốt, dịch vụ tuyệt vời!");
                      setFeedbackTouched(true);
                    }}
                    style={{
                      fontSize: "12px",
                      padding: "4px 8px",
                      background: "#dcfce7",
                      color: "#166534",
                      border: "1px solid #bbf7d0",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Gõ thử đúng
                  </button>
                </div>
              </div>

              {/* Test Case 2: Floating Label */}
              <div
                style={{
                  background: "#f8fafc",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  paddingTop: "24px",
                }}
              >
                <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: 0, color: "#334155" }}>
                  2. Floating Label trên Border
                </h3>
                <TextArea
                  label="Ý kiến đóng góp (Floating)"
                  labelPlacement="floating"
                  color="secondary"
                  value={floatingVal}
                  onChange={(e) => setFloatingVal(e.target.value)}
                  placeholder="Nhãn nằm vắt ngang viền trên..."
                  minRows={2}
                />
              </div>

              {/* Test Case 3: Counter & AutoResize */}
              <div
                style={{
                  background: "#f8fafc",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: 0, color: "#334155" }}>
                  3. Bộ đếm Ký tự & Auto-Resize
                </h3>
                <TextArea
                  label="Ghi chú đơn hàng"
                  config={{ showCount: true }}
                  maxLength={150}
                  minRows={2}
                  maxRows={5}
                  value={counterVal}
                  onChange={(e) => setCounterVal(e.target.value)}
                  helperText="Tối đa 150 ký tự, max 5 dòng"
                />
              </div>
            </div>
          </section>
        );
      };

      const Gallery = () => {
        return (
          <div
            style={{
              padding: "32px",
              background: "#f8fafc",
              minHeight: "100vh",
              fontFamily: "sans-serif",
              display: "flex",
              flexDirection: "column",
              gap: "40px",
            }}
          >
            <div>
              <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 8px 0", color: "#0f172a" }}>
                TextArea Component Visual Showcase
              </h1>
              <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
                Tất cả các biến thể, kích cỡ, màu sắc, bo góc và hiệu ứng chuyển cảnh của component TextArea đồng bộ
                100% với Input.
              </p>
            </div>

            {/* 0. INTERACTIVE TESTING PLAYGROUND */}
            <InteractivePlayground />

            {/* 1. SIZES */}
            <section
              style={{
                background: "#ffffff",
                padding: "24px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 16px 0", color: "#334155" }}>
                1. Kích Thước (Sizes: xs, sm, md, lg, xl)
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {sizes.map((size) => (
                  <div key={size} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <span
                      style={{
                        width: "40px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#64748b",
                        textTransform: "uppercase",
                        paddingTop: "8px",
                      }}
                    >
                      {size}
                    </span>
                    <div style={{ flex: 1 }}>
                      <TextArea
                        size={size}
                        label={`TextArea Size: ${size.toUpperCase()}`}
                        placeholder={`Kích thước ${size}...`}
                        helperText={`Helper text for size ${size}`}
                        minRows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. VARIANTS & COLORS */}
            <section
              style={{
                background: "#ffffff",
                padding: "24px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 16px 0", color: "#334155" }}>
                2. Biến Thể & Màu Sắc (Variants & Colors)
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {variants.map((variant) => (
                  <div key={variant}>
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        margin: "0 0 12px 0",
                        color: "#475569",
                        textTransform: "capitalize",
                      }}
                    >
                      Variant: {variant}
                    </h3>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: "16px",
                      }}
                    >
                      {(
                        ["primary", "secondary", "error", "success", "warning", "info", "neutral"] as TextAreaColor[]
                      ).map((color) => (
                        <div key={color}>
                          <TextArea
                            variant={variant}
                            color={color}
                            label={`${color}`}
                            placeholder={`Variant ${variant} / ${color}`}
                            minRows={2}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. LABELS & PLACEMENTS */}
            <section
              style={{
                background: "#ffffff",
                padding: "24px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 16px 0", color: "#334155" }}>
                3. Vị Trí Nhãn (Label Placements)
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "24px",
                  alignItems: "start",
                }}
              >
                <TextArea
                  label="Label Vị Trí Phía Trên (Top)"
                  labelPlacement="top"
                  placeholder="Mặc định..."
                  helperText="Nhãn nằm ở phía trên ô nhập liệu"
                  minRows={2}
                />
                <TextArea
                  label="Label Trái (Left)"
                  labelPlacement="left"
                  placeholder="Nằm bên trái..."
                  helperText="Nhãn nằm thẳng hàng bên trái"
                  minRows={2}
                />
                <div style={{ paddingTop: "12px" }}>
                  <TextArea
                    label="Floating Label (Cố định viền)"
                    labelPlacement="floating"
                    placeholder="Nhãn vắt ngang viền..."
                    helperText="Cố định chính giữa viền trên"
                    minRows={2}
                  />
                </div>
              </div>
            </section>

            {/* 4. RADIUS */}
            <section
              style={{
                background: "#ffffff",
                padding: "24px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 16px 0", color: "#334155" }}>
                4. Bo Góc (Radius: none, sm, md, lg, xl, full)
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "16px",
                }}
              >
                {radiuses.map((radius) => (
                  <div key={radius}>
                    <TextArea
                      radius={radius}
                      label={`Radius: ${radius}`}
                      placeholder={`Bo góc ${radius}...`}
                      minRows={2}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      };

      cy.mount(<Gallery />);
      cy.get("textarea:visible").should("have.length.greaterThan", 10);
      cy.contains("TextArea Component Visual Showcase").should("be.visible");
    });
  });
});
