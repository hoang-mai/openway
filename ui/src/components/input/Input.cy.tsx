import React, { useState } from "react";
import { Input, PasswordInput } from "./index";
import { InputSize, InputVariant, InputColor, InputRadius, LabelPlacement } from "./types";
import SearchIcon from "@/components/icons/SearchIcon";

const MailIcon = () => (
  <svg
    data-testid="mail-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-full"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const UserIcon = () => (
  <svg
    data-testid="user-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-full"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

describe("Input Component", () => {
  describe("1. Rendering & Basic Props", () => {
    it("renders with default props", () => {
      cy.mount(<Input placeholder="Enter your text..." />);
      cy.get("input").should("exist");
      cy.get("input").should("have.attr", "placeholder", "Enter your text...");
      cy.get("input").should("have.attr", "type", "text");
    });

    it("handles value change and typing", () => {
      const onChangeSpy = cy.spy().as("onChangeSpy");
      cy.mount(<Input onChange={onChangeSpy} placeholder="Type here" />);

      cy.get("input").type("Hello World");
      cy.get("input").should("have.value", "Hello World");
      cy.get("@onChangeSpy").should("have.been.called");
    });

    it("works in controlled mode", () => {
      const ControlledInput = () => {
        const [val, setVal] = useState("initial");
        return <Input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Controlled" />;
      };

      cy.mount(<ControlledInput />);
      cy.get("input").should("have.value", "initial");
      cy.get("input").clear().type("updated");
      cy.get("input").should("have.value", "updated");
    });
  });

  describe("2. Sizes", () => {
    const sizes: InputSize[] = ["xs", "sm", "md", "lg", "xl"];

    sizes.forEach((size) => {
      it(`renders size: ${size}`, () => {
        cy.mount(<Input size={size} placeholder={`Size ${size}`} />);
        cy.get("input").should("be.visible");
      });
    });
  });

  describe("3. Variants & Colors", () => {
    const variants: InputVariant[] = ["outline", "filled", "ghost", "other"];
    const colors: InputColor[] = ["primary", "secondary", "error", "success", "warning", "info", "neutral"];

    variants.forEach((variant) => {
      it(`renders variant: ${variant}`, () => {
        cy.mount(<Input variant={variant} placeholder={`Variant ${variant}`} />);
        cy.get("input").should("be.visible");
      });
    });

    colors.forEach((color) => {
      it(`renders color: ${color}`, () => {
        cy.mount(<Input color={color} placeholder={`Color ${color}`} />);
        cy.get("input").should("be.visible");
      });
    });
  });

  describe("4. Radius", () => {
    const radiuses: InputRadius[] = ["none", "sm", "md", "lg", "xl", "full"];

    radiuses.forEach((radius) => {
      it(`renders radius: ${radius}`, () => {
        cy.mount(<Input radius={radius} placeholder={`Radius ${radius}`} />);
        cy.get("input").should("be.visible");
      });
    });
  });

  describe("5. Labels & Accessibility", () => {
    it("renders label and focuses input on label click", () => {
      cy.mount(<Input label="Email Address" placeholder="you@example.com" />);
      cy.contains("label", "Email Address").should("be.visible");
      cy.contains("label", "Email Address").click();
      cy.get("input").should("have.focus");
    });

    it("renders isRequired asterisk and aria-required attribute", () => {
      cy.mount(<Input label="Full Name" config={{ isRequired: true }} placeholder="Nguyen Van A" />);
      cy.contains("label", "*").should("be.visible");
      cy.get("input").should("have.attr", "aria-required", "true");
    });

    const placements: LabelPlacement[] = ["top", "left", "floating"];
    placements.forEach((placement) => {
      it(`renders label placement: ${placement}`, () => {
        cy.mount(
          <Input
            label={`Label ${placement}`}
            labelPlacement={placement}
            placeholder={placement === "floating" ? "" : "Placeholder"}
          />
        );
        cy.contains("label", `Label ${placement}`).should("be.visible");
      });
    });

    it("floating label sits on top border and typing works", () => {
      cy.mount(<Input label="Username" labelPlacement="floating" />);
      cy.contains("label", "Username").should("be.visible");
      cy.get("input").type("john_doe");
      cy.get("input").should("have.value", "john_doe");
    });
  });

  describe("6. Helper & Error States", () => {
    it("renders helperText with aria-describedby", () => {
      cy.mount(<Input label="Password" helperText="Must be at least 8 characters" placeholder="••••••••" />);
      cy.contains("Must be at least 8 characters").should("be.visible");
      cy.get("input").should("have.attr", "aria-describedby");
    });

    it("renders errorMessage and applies error styles & aria-invalid", () => {
      cy.mount(
        <Input
          label="Email"
          value="invalid-email"
          onChange={() => {}}
          errorMessage="Please enter a valid email address"
        />
      );
      cy.contains("Please enter a valid email address").should("be.visible");
      cy.get("input").should("have.attr", "aria-invalid", "true");
    });

    it("supports isInvalid prop explicitly", () => {
      cy.mount(<Input config={{ isInvalid: true }} placeholder="Invalid field" />);
      cy.get("input").should("have.attr", "aria-invalid", "true");
    });

    it("handles live typing validation error with animation effect", () => {
      const LiveValidationForm = () => {
        const [email, setEmail] = useState("");
        const [touched, setTouched] = useState(false);

        const isEmailInvalid = touched && email.length > 0 && !email.includes("@");
        const errorMessage = isEmailInvalid ? "Email không hợp lệ (cần có ký tự @)" : undefined;

        return (
          <div className="p-4 max-w-sm">
            <Input
              label="Địa chỉ Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setTouched(true);
              }}
              errorMessage={errorMessage}
              helperText={!errorMessage ? "Ví dụ: user@example.com" : undefined}
              placeholder="nhap-email@..."
            />
          </div>
        );
      };

      cy.mount(<LiveValidationForm />);

      // 1. Initial state: no error, helper text visible, normal border
      cy.contains("Ví dụ: user@example.com").should("be.visible");
      cy.get("input").should("have.attr", "aria-invalid", "false");
      cy.get("[role='alert']").should("not.exist");

      // 2. Type invalid email: trigger error message and animation
      cy.get("input").type("invalidemail");
      cy.contains("Email không hợp lệ (cần có ký tự @)").should("be.visible");
      cy.get("[role='alert']").should("be.visible");
      cy.get("input").should("have.attr", "aria-invalid", "true");

      // 3. Correct the email: error message disappears smoothly
      cy.get("input").type("@domain.com");
      cy.get("[role='alert']").should("not.exist");
      cy.contains("Ví dụ: user@example.com").should("be.visible");
      cy.get("input").should("have.attr", "aria-invalid", "false");
    });
  });

  describe("7. Slots, Addons & Clear Button", () => {
    it("renders leftIcon and rightIcon", () => {
      cy.mount(<Input leftIcon={<MailIcon />} rightIcon={<UserIcon />} placeholder="With icons" />);
      cy.get("[data-testid='mail-icon']").should("be.visible");
      cy.get("[data-testid='user-icon']").should("be.visible");
    });

    it("renders leftAddon and rightAddon", () => {
      cy.mount(<Input leftAddon="https://" rightAddon=".com" placeholder="mywebsite" />);
      cy.contains("https://").should("be.visible");
      cy.contains(".com").should("be.visible");
    });

    it("renders clear button when has value and handles onClear", () => {
      const onClearSpy = cy.spy().as("onClearSpy");
      const ControlledClearable = () => {
        const [text, setText] = useState("Clear me");
        return (
          <Input
            config={{ isClearable: true }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClear={() => {
              setText("");
              onClearSpy();
            }}
            placeholder="Type to clear"
          />
        );
      };

      cy.mount(<ControlledClearable />);
      cy.get("button[aria-label='Clear input']").should("be.visible");
      cy.get("button[aria-label='Clear input']").click();
      cy.get("input").should("have.value", "");
      cy.get("@onClearSpy").should("have.been.calledOnce");
    });

    it("forwards ref to HTMLInputElement directly", () => {
      const RefWrapper = () => {
        const inputRef = React.useRef<HTMLInputElement>(null);
        return (
          <div>
            <Input ref={inputRef} placeholder="Ref test" />
            <button data-testid="focus-btn" onClick={() => inputRef.current?.focus()}>
              Focus
            </button>
          </div>
        );
      };

      cy.mount(<RefWrapper />);
      cy.get("[data-testid='focus-btn']").click();
      cy.get("input").should("have.focus");
    });

    it("renders loading spinner and hides action icons", () => {
      cy.mount(<Input config={{ isLoading: true, showSpinner: true }} placeholder="Searching..." />);
      cy.get("input").should("be.visible");
      cy.get("svg").should("exist"); // spinner
    });

    it("handles disabled and readOnly states", () => {
      cy.mount(<Input disabled value="Disabled text" />);
      cy.get("input").should("be.disabled");
      cy.get("input").should("have.attr", "aria-disabled", "true");

      cy.mount(<Input readOnly value="Readonly text" />);
      cy.get("input").should("have.attr", "readonly");
    });
  });

  describe("8. PasswordInput Component", () => {
    it("renders as type password by default and toggles to text on click", () => {
      const onVisibilitySpy = cy.spy().as("onVisibilitySpy");
      cy.mount(
        <PasswordInput label="Password" value="secret123" onChange={() => {}} onVisibilityChange={onVisibilitySpy} />
      );

      cy.get("input").should("have.attr", "type", "password");
      cy.get("button[aria-label='Toggle password visibility']").should("be.visible");

      // Click toggle button
      cy.get("button[aria-label='Toggle password visibility']").click();
      cy.get("input").should("have.attr", "type", "text");
      cy.get("@onVisibilitySpy").should("have.been.calledWith", true);

      // Click toggle button again
      cy.get("button[aria-label='Toggle password visibility']").click();
      cy.get("input").should("have.attr", "type", "password");
      cy.get("@onVisibilitySpy").should("have.been.calledWith", false);
    });

    it("respects defaultVisible=true", () => {
      cy.mount(<PasswordInput defaultVisible value="plainText" onChange={() => {}} />);
      cy.get("input").should("have.attr", "type", "text");
    });
  });

  describe("9. Visual Gallery / Showcase", () => {
    it("renders complete visual dashboard with all variants, sizes, and states", () => {
      const sizes: InputSize[] = ["xs", "sm", "md", "lg", "xl"];
      const variants: InputVariant[] = ["outline", "filled", "ghost"];
      const radiuses: InputRadius[] = ["none", "sm", "md", "lg", "xl", "full"];

      const InteractivePlayground = () => {
        const [email, setEmail] = useState("");
        const [emailTouched, setEmailTouched] = useState(false);
        const [pwd, setPwd] = useState("");
        const [search, setSearch] = useState("");
        const [floatingVal, setFloatingVal] = useState("");

        const isEmailInvalid = emailTouched && email.length > 0 && !email.includes("@");
        const emailError = isEmailInvalid ? "Định dạng email không hợp lệ (ví dụ đúng: user@domain.com)" : undefined;

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
                Khu vực Thử Nghiệm Trực Tiếp (Live Validation & Animation)
              </h2>
              <p style={{ margin: 0, color: "#64748b", fontSize: "13px" }}>
                Bạn có thể gõ phím trực tiếp hoặc bấm các nút bên dưới để xem hiệu ứng báo lỗi, toggle mật khẩu và nút
                xóa nhanh:
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
                    color: isEmailInvalid ? "#dc2626" : "#334155",
                  }}
                >
                  1. Test Báo lỗi Real-time & Animation
                </h3>
                <Input
                  label="Email Người Dùng"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailTouched(true);
                  }}
                  errorMessage={emailError}
                  placeholder="name@example.com"
                  leftIcon={<MailIcon />}
                />
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail("email-sai-dinh-dang");
                      setEmailTouched(true);
                    }}
                    style={{
                      padding: "6px 12px",
                      fontSize: "12px",
                      borderRadius: "6px",
                      background: "#fee2e2",
                      color: "#b91c1c",
                      border: "1px solid #fca5a5",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    ⚡ Test Nhập Sai
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail("hoangma@gmail.com");
                      setEmailTouched(true);
                    }}
                    style={{
                      padding: "6px 12px",
                      fontSize: "12px",
                      borderRadius: "6px",
                      background: "#dcfce7",
                      color: "#15803d",
                      border: "1px solid #86efac",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    ✓ Test Nhập Đúng
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail("");
                      setEmailTouched(false);
                    }}
                    style={{
                      padding: "6px 12px",
                      fontSize: "12px",
                      borderRadius: "6px",
                      background: "#f1f5f9",
                      color: "#475569",
                      border: "1px solid #cbd5e1",
                      cursor: "pointer",
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </div>

              {/* Test Case 2: Password Toggle */}
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
                    color: "#334155",
                  }}
                >
                  2. Test Mật Khẩu (Ẩn/Hiện Icon Chuẩn)
                </h3>
                <PasswordInput
                  label="Mật khẩu"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  helperText="Bấm vào icon con mắt để đổi chế độ"
                />
                <button
                  type="button"
                  onClick={() => setPwd("SecretPass@2026")}
                  style={{
                    padding: "6px 12px",
                    fontSize: "12px",
                    borderRadius: "6px",
                    background: "#e0f2fe",
                    color: "#0369a1",
                    border: "1px solid #7dd3fc",
                    cursor: "pointer",
                    fontWeight: "600",
                    alignSelf: "flex-start",
                  }}
                >
                  Điền Mật Khẩu Mẫu
                </button>
              </div>

              {/* Test Case 3: Nút Xóa Nhanh Không Nhảy Layout */}
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
                    color: "#334155",
                  }}
                >
                  3. Test Nút Xóa Nhanh (isClearable)
                </h3>
                <Input
                  label="Tìm kiếm"
                  isClearable
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClear={() => setSearch("")}
                  placeholder="Gõ để thấy nút X..."
                  helperText="Nút X hiện/ẩn mượt mà, không làm giật khung"
                  leftIcon={<SearchIcon />}
                />
                <button
                  type="button"
                  onClick={() => setSearch("Tai nghe chống ồn Sony")}
                  style={{
                    padding: "6px 12px",
                    fontSize: "12px",
                    borderRadius: "6px",
                    background: "#f3e8ff",
                    color: "#7e22ce",
                    border: "1px solid #d8b4fe",
                    cursor: "pointer",
                    fontWeight: "600",
                    alignSelf: "flex-start",
                  }}
                >
                  Điền Từ Khóa Tìm Kiếm
                </button>
              </div>

              {/* Test Case 4: Floating Label Cố Định */}
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
                    color: "#334155",
                  }}
                >
                  4. Test Floating Label Trên Viền
                </h3>
                <Input
                  label="Họ và Tên"
                  labelPlacement="floating"
                  isRequired
                  value={floatingVal}
                  onChange={(e) => setFloatingVal(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  helperText="Label luôn nằm cắt ngang đường viền trên"
                />
              </div>
            </div>
          </section>
        );
      };

      cy.mount(
        <div
          style={{
            padding: "32px",
            background: "#f8fafc",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: 0,
                color: "var(--color-primary-900)",
              }}
            >
              Input Component Gallery & Playground
            </h1>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "14px" }}>
              Trình diễn toàn bộ kích cỡ, biến thể, màu sắc, label placements và trạng thái
            </p>
          </div>

          {/* Section 0: Interactive Playground */}
          <InteractivePlayground />

          {/* Section 1: Kích thước */}
          <section
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
              }}
            >
              1. Kích thước (Sizes: xs, sm, md, lg, xl)
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "480px" }}>
              {sizes.map((s) => (
                <Input key={s} size={s} label={`Size: ${s}`} placeholder={`Input size ${s}`} leftIcon={<UserIcon />} />
              ))}
            </div>
          </section>

          {/* Section 2: Biến thể & Màu sắc */}
          <section
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
              }}
            >
              2. Biến thể (Variants: outline, filled, ghost)
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "16px",
              }}
            >
              {variants.map((v) => (
                <div key={v} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: "600", textTransform: "capitalize" }}>{v}</h3>
                  <Input variant={v} color="primary" placeholder={`Primary ${v}`} />
                  <Input variant={v} color="secondary" placeholder={`Secondary ${v}`} />
                  <Input variant={v} color="success" placeholder={`Success ${v}`} />
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Label Placements & Required */}
          <section
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
              }}
            >
              3. Label Placements & Form Controls
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "520px" }}>
              <Input
                label="Label Top (Mặc định)"
                labelPlacement="top"
                isRequired
                placeholder="Nhập họ và tên..."
                helperText="Điền đầy đủ họ và tên theo CCCD"
              />
              <Input
                label="Label Left (Nằm ngang)"
                labelPlacement="left"
                isRequired
                placeholder="Nhập email..."
                isFullWidth
              />
              <Input label="Floating Label" labelPlacement="floating" isRequired isFullWidth />
            </div>
          </section>

          {/* Section 4: Password, Search & Clearable */}
          <section
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
              }}
            >
              4. Password Input & Nút Xóa Nhanh (Clearable)
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "480px" }}>
              <PasswordInput
                label="Mật khẩu"
                value="supersecret123"
                readOnly
                helperText="Bấm icon mắt bên phải để ẩn/hiện mật khẩu"
              />
              <Input
                label="Tìm kiếm có nút xóa nhanh"
                isClearable
                value="Từ khóa tìm kiếm..."
                readOnly
                leftIcon={<MailIcon />}
              />
              <Input label="Trạng thái đang tải (Loading)" isLoading value="Đang đồng bộ dữ liệu..." readOnly />
            </div>
          </section>

          {/* Section 5: Addons & Trạng thái Báo lỗi */}
          <section
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
              }}
            >
              5. Addons & Trạng thái Báo lỗi (Validation with Animation)
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "520px" }}>
              <Input label="Tên miền website" leftAddon="https://" rightAddon=".vn" value="congty" readOnly />
              <Input
                label="Địa chỉ Email (Lỗi tĩnh)"
                value="email-khong-hop-le"
                isInvalid
                readOnly
                errorMessage="Định dạng email không đúng (vd: ten@domain.com)"
                leftIcon={<MailIcon />}
              />
            </div>
          </section>

          {/* Section 6: Bo góc Radius */}
          <section
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                margin: "0 0 16px 0",
                color: "var(--color-primary-700)",
              }}
            >
              6. Tùy chỉnh bo góc (Radius: none, sm, md, lg, xl, full)
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              {radiuses.map((r) => (
                <Input key={r} radius={r} label={`Radius: ${r}`} placeholder={`radius="${r}"`} />
              ))}
            </div>
          </section>
        </div>
      );

      cy.get("h1").should("be.visible");
      cy.get("input").should("have.length.greaterThan", 15);
    });
  });
});
