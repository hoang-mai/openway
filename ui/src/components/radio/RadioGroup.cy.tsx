import React, { useState } from "react";
import { RadioSize, RadioColor, RadioVariant } from "./types";
import { RadioGroup } from "./index";

describe("<RadioGroup /> UI Showcase", () => {
  /* ========================================================================
     UI 1: Orientation Layouts
     ======================================================================== */
  describe("UI 1: Orientation Layouts (Vertical vs Horizontal)", () => {
    it("displays vertical and horizontal layouts with live state", () => {
      const OrientationShowcase = () => {
        const [vertical, setVertical] = useState<string | null>("standard");
        const [horizontal, setHorizontal] = useState<string | null>("xs");
        return (
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>RadioGroup Orientations</h2>

            <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
              <div>
                <h3 style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>vertical (default)</h3>
                <RadioGroup
                  label="Kieu giao hang"
                  orientation="vertical"
                  value={vertical}
                  onChange={setVertical}
                  helperText="Chon kieu giao hang phu hop"
                  options={[
                    { value: "standard", label: "Giao hang tieu chuan (2-3 ngay)" },
                    { value: "express", label: "Giao hang nhanh (1 ngay)" },
                    { value: "same_day", label: "Giao hang trong ngay" },
                  ]}
                />
                <p style={{ marginTop: "8px", fontSize: "12px", color: "#3b82f6" }}>
                  Selected: <strong>{vertical}</strong>
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>horizontal</h3>
                <RadioGroup
                  label="Co ao"
                  orientation="horizontal"
                  value={horizontal}
                  onChange={setHorizontal}
                  options={[
                    { value: "xs", label: "XS" },
                    { value: "sm", label: "SM" },
                    { value: "md", label: "MD" },
                    { value: "lg", label: "LG" },
                    { value: "xl", label: "XL" },
                  ]}
                />
                <p style={{ marginTop: "8px", fontSize: "12px", color: "#3b82f6" }}>
                  Selected: <strong>{horizontal}</strong>
                </p>
              </div>
            </div>
          </div>
        );
      };
      cy.mount(<OrientationShowcase />);
      cy.contains("RadioGroup Orientations").should("be.visible");
      cy.get('[role="radiogroup"]').should("have.length", 2);
    });
  });

  /* ========================================================================
     UI 2: Sizes Cascading
     ======================================================================== */
  describe("UI 2: Sizes Cascading (xs, sm, md, lg, xl)", () => {
    it("displays all sizes cascading from group to radio children", () => {
      const sizes: RadioSize[] = ["xs", "sm", "md", "lg", "xl"];

      const SizesShowcase = () => {
        const [selected, setSelected] = useState<Record<string, string | null>>({});
        return (
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>Sizes Cascading</h2>
            {sizes.map((size) => (
              <div key={size} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "32px", fontSize: "11px", fontWeight: "bold", color: "#64748b" }}>{size}</span>
                <RadioGroup
                  size={size}
                  orientation="horizontal"
                  value={selected[size]}
                  onChange={(val) => setSelected((p) => ({ ...p, [size]: val }))}
                  options={[
                    { value: "a", label: "Option A" },
                    { value: "b", label: "Option B" },
                    { value: "c", label: "Option C" },
                  ]}
                />
              </div>
            ))}
          </div>
        );
      };
      cy.mount(<SizesShowcase />);
      cy.contains("Sizes Cascading").should("be.visible");
    });
  });

  /* ========================================================================
     UI 3: Theme Colors Cascading (7 Colors)
     ======================================================================== */
  describe("UI 3: Theme Colors Cascading (7 Colors)", () => {
    it("displays 7 theme colors propagating to children", () => {
      const colors: RadioColor[] = ["primary", "secondary", "success", "error", "warning", "info", "neutral"];

      const ColorsShowcase = () => {
        const [selected, setSelected] = useState<Record<string, string | null>>({});
        return (
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>Theme Colors Cascading</h2>
            {colors.map((color) => (
              <div key={color} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "80px", fontSize: "11px", fontWeight: "bold", color: "#64748b" }}>{color}</span>
                <RadioGroup
                  color={color}
                  orientation="horizontal"
                  value={selected[color] ?? "a"}
                  onChange={(val) => setSelected((p) => ({ ...p, [color]: val }))}
                  options={[
                    { value: "a", label: "Phuong an A" },
                    { value: "b", label: "Phuong an B" },
                    { value: "c", label: "Phuong an C" },
                  ]}
                />
              </div>
            ))}
          </div>
        );
      };
      cy.mount(<ColorsShowcase />);
      cy.contains("Theme Colors Cascading").should("be.visible");
    });
  });

  /* ========================================================================
     UI 4: Variants Cascading
     ======================================================================== */
  describe("UI 4: Variants Cascading (filled, outline, soft)", () => {
    it("displays all variants cascading to children", () => {
      const variants: RadioVariant[] = ["filled", "outline", "soft"];

      const VariantsShowcase = () => {
        const [selected, setSelected] = useState<Record<string, string | null>>({});
        return (
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>Variants Cascading</h2>
            {variants.map((variant) => (
              <div key={variant}>
                <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "8px", color: "#475569" }}>
                  {variant}
                </h3>
                <RadioGroup
                  variant={variant}
                  orientation="horizontal"
                  value={selected[variant] ?? "a"}
                  onChange={(val) => setSelected((p) => ({ ...p, [variant]: val }))}
                  options={[
                    { value: "a", label: "Option A" },
                    { value: "b", label: "Option B" },
                    { value: "c", label: "Option C" },
                  ]}
                />
              </div>
            ))}
          </div>
        );
      };
      cy.mount(<VariantsShowcase />);
      cy.contains("Variants Cascading").should("be.visible");
    });
  });

  /* ========================================================================
     UI 5: Validation & Animated Error Message
     ======================================================================== */
  describe("UI 5: Validation & Animated Error Message", () => {
    it("displays real-time validation with animated error text and immediate color change", () => {
      const ValidationShowcase = () => {
        const [payment, setPayment] = useState<string | null | undefined>(undefined);
        const [submitted, setSubmitted] = useState(false);

        const paymentError = submitted && !payment ? "Vui long chon phuong thuc thanh toan" : undefined;

        return (
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>Validation & Error Animation</h2>

            <RadioGroup
              label="Phuong thuc thanh toan *"
              value={payment}
              onChange={setPayment}
              errorMessage={paymentError}
              helperText={!paymentError && !submitted ? "Chon phuong thuc ban muon su dung" : undefined}
              config={{ isRequired: true }}
              options={[
                { value: "cash", label: "Tien mat" },
                { value: "card", label: "The tin dung / ghi no" },
                { value: "transfer", label: "Chuyen khoan ngan hang" },
                { value: "wallet", label: "Vi dien tu (Momo, ZaloPay)" },
              ]}
            />

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                style={{
                  padding: "8px 16px",
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Submit (kiem tra loi)
              </button>
              <button
                type="button"
                onClick={() => {
                  setPayment(undefined);
                  setSubmitted(false);
                }}
                style={{
                  padding: "8px 16px",
                  background: "#f1f5f9",
                  color: "#475569",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Reset
              </button>
            </div>

            {payment && (
              <p style={{ color: "#16a34a", fontSize: "13px", margin: 0 }}>
                Da chon: <strong>{payment}</strong>
              </p>
            )}
          </div>
        );
      };
      cy.mount(<ValidationShowcase />);
      cy.contains("Validation & Error Animation").should("be.visible");
      cy.contains("Submit (kiem tra loi)").click();
      cy.contains("Vui long chon phuong thuc thanh toan").should("be.visible");
      cy.get('input[value="card"]').click({ force: true });
      cy.get('input[value="card"]').should("be.checked");
    });
  });

  /* ========================================================================
     UI 6: Group States (Disabled, ReadOnly, IsLoading)
     ======================================================================== */
  describe("UI 6: Group States (Disabled, ReadOnly, IsLoading)", () => {
    it("displays disabled, readOnly, and isLoading group states", () => {
      const StatesShowcase = () => (
        <div style={{ padding: "24px", display: "flex", gap: "32px", flexWrap: "wrap" }}>
          <h2 style={{ width: "100%", fontSize: "18px", fontWeight: "bold", margin: "0 0 8px" }}>Group States</h2>

          <div>
            <h3 style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>disabled</h3>
            <RadioGroup
              label="Disabled Group"
              disabled
              defaultValue="a"
              options={[
                { value: "a", label: "Option A (da chon)" },
                { value: "b", label: "Option B" },
                { value: "c", label: "Option C" },
              ]}
            />
          </div>

          <div>
            <h3 style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>isReadOnly</h3>
            <RadioGroup
              label="ReadOnly Group"
              config={{ isReadOnly: true }}
              defaultValue="b"
              options={[
                { value: "a", label: "Option A" },
                { value: "b", label: "Option B (da chon)" },
                { value: "c", label: "Option C" },
              ]}
            />
          </div>

          <div>
            <h3 style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>isLoading</h3>
            <RadioGroup
              label="Loading Group"
              config={{ isLoading: true }}
              defaultValue="a"
              options={[
                { value: "a", label: "Dang tai..." },
                { value: "b", label: "Dang tai..." },
                { value: "c", label: "Dang tai..." },
              ]}
            />
          </div>
        </div>
      );

      cy.mount(<StatesShowcase />);
      cy.contains("Group States").should("be.visible");
      cy.get('[aria-disabled="true"]').should("have.length.gte", 2);
    });
  });

  /* ========================================================================
     UI 7: Label Placements (Right vs Left)
     ======================================================================== */
  describe("UI 7: Label Placements (Right vs Left)", () => {
    it("displays label on right and left placement", () => {
      const LabelPlacementShowcase = () => {
        const [val1, setVal1] = useState<string | null>("a");
        const [val2, setVal2] = useState<string | null>("a");
        return (
          <div style={{ padding: "24px", display: "flex", gap: "32px", flexWrap: "wrap" }}>
            <h2 style={{ width: "100%", fontSize: "18px", fontWeight: "bold", margin: "0 0 8px" }}>Label Placements</h2>
            <div>
              <h3 style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>
                labelPlacement="right" (default)
              </h3>
              <RadioGroup
                label="Nhan ben phai"
                labelPlacement="right"
                value={val1}
                onChange={setVal1}
                options={[
                  { value: "a", label: "Option A" },
                  { value: "b", label: "Option B" },
                  { value: "c", label: "Option C" },
                ]}
              />
            </div>
            <div>
              <h3 style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>labelPlacement="left"</h3>
              <RadioGroup
                label="Nhan ben trai"
                labelPlacement="left"
                value={val2}
                onChange={setVal2}
                options={[
                  { value: "a", label: "Option A" },
                  { value: "b", label: "Option B" },
                  { value: "c", label: "Option C" },
                ]}
              />
            </div>
          </div>
        );
      };
      cy.mount(<LabelPlacementShowcase />);
      cy.contains("Label Placements").should("be.visible");
    });
  });

  /* ========================================================================
     UI 8: Rich Options Pattern
     ======================================================================== */
  describe("UI 8: Rich Options Pattern", () => {
    it("displays plan selection with descriptions", () => {
      const plans = [
        { value: "free", label: "Mien phi", description: "5GB luu tru, 1 nguoi dung • 0 VND/thang" },
        { value: "pro", label: "Pro", description: "100GB luu tru, 5 nguoi dung • 99,000 VND/thang" },
        {
          value: "enterprise",
          label: "Enterprise",
          description: "Khong gioi han, nhieu nguoi dung • 499,000 VND/thang",
        },
      ];

      const CardPlanShowcase = () => {
        const [plan, setPlan] = useState<string | null>("pro");
        return (
          <div style={{ padding: "24px", maxWidth: "480px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: "0 0 16px" }}>Chon goi dich vu</h2>
            <RadioGroup value={plan} onChange={setPlan} options={plans} />
            <p style={{ marginTop: "12px", fontSize: "13px", color: "#16a34a" }}>
              Goi da chon: <strong>{plan}</strong>
            </p>
          </div>
        );
      };

      cy.mount(<CardPlanShowcase />);
      cy.contains("Chon goi dich vu").should("be.visible");
      cy.contains("Mien phi").click();
      cy.get('input[value="free"]').should("be.checked");
      cy.get('input[value="pro"]').should("not.be.checked");
    });
  });

  /* ========================================================================
     UI 9: Comprehensive Dashboard
     ======================================================================== */
  describe("UI 9: Comprehensive RadioGroup Dashboard", () => {
    it("renders comprehensive showcase with all features", () => {
      const ComprehensiveDashboard = () => {
        const [gender, setGender] = useState<string | null>("male");
        const [size, setSize] = useState<string | null>("md");
        const [color, setColor] = useState<string | null>("primary");
        const [payment, setPayment] = useState<string | null | undefined>(undefined);
        const [submitted, setSubmitted] = useState(false);

        return (
          <div
            style={{
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              fontFamily: "system-ui, sans-serif",
              background: "#f8fafc",
              borderRadius: "12px",
            }}
          >
            <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: 0, color: "#1e293b" }}>
              RadioGroup Comprehensive Dashboard
            </h1>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
              {/* 1. Basic Group */}
              <div style={{ background: "white", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: "0 0 12px", color: "#334155" }}>
                  1. Gioi tinh (Vertical)
                </h3>
                <RadioGroup
                  value={gender}
                  onChange={setGender}
                  helperText="Chon gioi tinh cua ban"
                  options={[
                    { value: "male", label: "Nam" },
                    { value: "female", label: "Nu" },
                    { value: "other", label: "Khac" },
                  ]}
                />
                <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#3b82f6" }}>
                  Selected: <strong>{gender}</strong>
                </p>
              </div>

              {/* 2. Size Selection */}
              <div style={{ background: "white", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: "0 0 12px", color: "#334155" }}>
                  2. Co size (Horizontal)
                </h3>
                <RadioGroup
                  orientation="horizontal"
                  value={size}
                  onChange={setSize}
                  options={["xs", "sm", "md", "lg", "xl"].map((s) => ({ value: s, label: s.toUpperCase() }))}
                />
                <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#3b82f6" }}>
                  Size: <strong>{size}</strong>
                </p>
              </div>

              {/* 3. Color Variants */}
              <div style={{ background: "white", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: "0 0 12px", color: "#334155" }}>
                  3. Chu de mau sac
                </h3>
                <RadioGroup
                  value={color}
                  onChange={setColor}
                  options={(["primary", "secondary", "success", "error"] as RadioColor[]).map((c) => ({
                    value: c,
                    label: c,
                  }))}
                />
              </div>

              {/* 4. Validation */}
              <div style={{ background: "white", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: "0 0 12px", color: "#334155" }}>
                  4. Validation
                </h3>
                <RadioGroup
                  label="Phuong thuc thanh toan"
                  value={payment}
                  onChange={setPayment}
                  errorMessage={submitted && !payment ? "Vui long chon" : undefined}
                  helperText={payment ? `Da chon: ${payment}` : "Chon phuong thuc"}
                  config={{ isRequired: true }}
                  options={[
                    { value: "cash", label: "Tien mat" },
                    { value: "card", label: "The" },
                    { value: "wallet", label: "Vi dien tu" },
                  ]}
                />
                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  style={{
                    marginTop: "8px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </button>
              </div>

              {/* 5. Disabled Group */}
              <div style={{ background: "white", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: "0 0 12px", color: "#334155" }}>
                  5. Disabled Group
                </h3>
                <RadioGroup
                  label="Chuc nang da khoa"
                  disabled
                  defaultValue="b"
                  options={[
                    { value: "a", label: "Option A" },
                    { value: "b", label: "Option B (da chon)" },
                    { value: "c", label: "Option C" },
                  ]}
                />
              </div>

              {/* 6. Loading Group */}
              <div style={{ background: "white", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: "0 0 12px", color: "#334155" }}>
                  6. Loading Group
                </h3>
                <RadioGroup
                  label="Dang tai du lieu..."
                  config={{ isLoading: true }}
                  defaultValue="a"
                  options={[
                    { value: "a", label: "Dang xu ly..." },
                    { value: "b", label: "Dang xu ly..." },
                  ]}
                />
              </div>
            </div>
          </div>
        );
      };

      cy.mount(<ComprehensiveDashboard />);
      cy.contains("RadioGroup Comprehensive Dashboard").should("be.visible");
    });
  });

  /* ========================================================================
     UI 10: Comprehensive Search Showcase in 1 Mount (Client, Server & Preserve Selected)
     ======================================================================== */
  describe("UI 10: Comprehensive Search Showcase in 1 Mount", () => {
    it("tests Client Fuzzy Search, Custom Fields, Preserve Selected, and Live API Search", () => {
      const sampleOptions = [
        { value: "react", label: "React JS", code: "FE-01", description: "Facebook library" },
        { value: "vue", label: "Vue JS", code: "FE-02", description: "Progressive framework" },
        { value: "angular", label: "Angular", code: "FE-03", description: "Google platform" },
        { value: "svelte", label: "Svelte", code: "FE-04", description: "Cybernetically enhanced" },
      ];

      const SearchShowcase = () => {
        const [clientSelected, setClientSelected] = useState<string | null>(null);
        const [customFieldSelected, setCustomFieldSelected] = useState<string | null>(null);
        const [preserveSelectedVal, setPreserveSelectedVal] = useState<string | null>("react");
        const [serverSelected, setServerSelected] = useState<string | null>(null);
        const [serverOptions, setServerOptions] = useState([
          { value: "init-1", label: "iPhone 9 (Goi y ban dau)", description: "$549 - smartphones" },
          { value: "init-2", label: "iPhone X (Goi y ban dau)", description: "$899 - smartphones" },
        ]);
        const [isServerLoading, setIsServerLoading] = useState(false);

        const onSearchServer = async (query: string) => {
          setIsServerLoading(true);
          try {
            const res = await fetch(
              `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=4`
            );
            if (!res.ok) return;
            const data = await res.json();
            const items = (data.products || []).map((p: any) => ({
              value: String(p.id),
              label: p.title,
              description: `$${p.price} - ${p.category}`,
            }));
            setServerOptions(items);
          } catch (err) {
            console.error(err);
          } finally {
            setIsServerLoading(false);
          }
        };

        return (
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px", background: "#f8fafc" }}>
            <header>
              <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: 0, color: "#1e293b" }}>
                10. RadioGroup Search Showcase (Client & Server Modes)
              </h1>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0" }}>
                Tim kiem linh hoat qua Component Input variant outline, ho tro loc da truong, goi API debounce va bao luu muc da chon
              </p>
            </header>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {/* Card 1: Client Search by Label */}
              <div style={{ background: "white", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }} data-cy="card-client-label">
                <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: "0 0 12px", color: "#3b82f6" }}>
                  1. Client Mode: Search by Label
                </h3>
                <RadioGroup
                  config={{ searchable: true }}
                  searchPlaceholder="Tim framework..."
                  options={sampleOptions}
                  value={clientSelected}
                  onChange={setClientSelected}
                  label="Danh sach Framework"
                />
              </div>

              {/* Card 2: Client Search by Custom Field (Code / Description) */}
              <div style={{ background: "white", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }} data-cy="card-client-custom">
                <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: "0 0 12px", color: "#16a34a" }}>
                  2. Client Mode: Search by Code / Description
                </h3>
                <RadioGroup
                  config={{ searchable: true }}
                  searchField={["code", "description"]}
                  searchPlaceholder="Tim theo ma FE-01 hoac mo ta..."
                  options={sampleOptions}
                  value={customFieldSelected}
                  onChange={setCustomFieldSelected}
                  color="success"
                  label="Tim theo ma Code"
                />
              </div>

              {/* Card 3: Preserve Selected Items */}
              <div style={{ background: "white", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }} data-cy="card-preserve">
                <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: "0 0 12px", color: "#d97706" }}>
                  3. Preserve Selected Items (Bao luu muc chon)
                </h3>
                <RadioGroup
                  config={{ searchable: true, preserveSelected: true }}
                  options={sampleOptions}
                  value={preserveSelectedVal}
                  onChange={setPreserveSelectedVal}
                  color="warning"
                  label="Bao luu muc da chon"
                />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#64748b", background: "#f1f5f9", padding: "6px 8px", borderRadius: "4px" }}>
                  Dang chon: {preserveSelectedVal || "(Trong)"}
                </div>
              </div>

              {/* Card 4: Server Search Mode calling real DummyJSON API */}
              <div style={{ background: "white", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }} data-cy="card-server">
                <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: "0 0 12px", color: "#0284c7" }}>
                  4. Server Mode: Real Live API (DummyJSON)
                </h3>
                <RadioGroup
                  config={{ searchable: true }}
                  searchMode="server"
                  isLoading={isServerLoading}
                  onSearch={onSearchServer}
                  searchPlaceholder="Tim san pham that (vi du: phone, laptop)..."
                  options={serverOptions}
                  value={serverSelected}
                  onChange={setServerSelected}
                  color="info"
                  label="Tim kiem san pham tu DummyJSON API"
                />
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#64748b", background: "#f1f5f9", padding: "6px 8px", borderRadius: "4px" }}>
                  Da chon: {serverSelected || "(Trong)"}
                </div>
              </div>
            </div>
          </div>
        );
      };

      // ĐÚNG 1 LẦN MOUNT DUY NHẤT CHO TOÀN BỘ KỊCH BẢN SEARCH
      cy.mount(<SearchShowcase />);

      // 1. Kiểm tra Card 1: Client search by label & nút clear của Input
      cy.get('[data-cy="card-client-label"] input[type="text"]').type("vue");
      cy.get('[data-cy="card-client-label"] input[type="radio"]').should("have.length", 1);
      cy.get('[data-cy="card-client-label"]').should("contain.text", "Vue JS").and("not.contain.text", "React JS");
      cy.get('[data-cy="card-client-label"] button[aria-label*="Xóa"]').click();
      cy.get('[data-cy="card-client-label"] input[type="radio"]').should("have.length", 4);

      // 2. Kiểm tra Card 2: Client search theo custom searchField (code)
      cy.get('[data-cy="card-client-custom"] input[type="text"]').type("FE-03");
      cy.get('[data-cy="card-client-custom"] input[type="radio"]').should("have.length", 1);
      cy.get('[data-cy="card-client-custom"]').should("contain.text", "Angular");

      // 3. Kiểm tra Card 3: Bảo lưu mục đã chọn
      cy.get('[data-cy="card-preserve"] input[value="react"]').should("be.checked");
      cy.get('[data-cy="card-preserve"] input[type="text"]').type("angular");
      // Cả "react" (đang chọn) và "angular" (kết quả tìm) đều xuất hiện
      cy.get('[data-cy="card-preserve"] input[type="radio"]').should("have.length", 2);
      cy.get('[data-cy="card-preserve"] input[value="react"]').should("be.checked");
      cy.get('[data-cy="card-preserve"] input[value="angular"]').should("not.be.checked");

      // 4. Kiểm tra Card 4: Server mode gọi API thật DummyJSON qua internet
      cy.get('[data-cy="card-server"] input[type="text"]').type("phone");
      cy.get('[data-cy="card-server"]', { timeout: 10000 }).should("contain.text", "Apple");
      cy.get('[data-cy="card-server"] input[type="radio"]').should("have.length.greaterThan", 0);
    });
  });

  /* ========================================================================
     UI 11: MaxHeight Scrollable & ListFooter Showcase
     ======================================================================== */
  describe("UI 11: MaxHeight Scrollable & ListFooter Showcase", () => {
    it("renders scrollable container and custom listFooter", () => {
      const manyOptions = Array.from({ length: 20 }, (_, i) => ({
        value: `opt-${i + 1}`,
        label: `Tuy chon muc ${i + 1}`,
        description: `Mo ta chi tiet cho phan tu thu ${i + 1}`,
      }));

      const ScrollShowcase = () => {
        const [selected, setSelected] = useState<string | null>("opt-1");

        return (
          <div style={{ padding: "24px" }} data-cy="card-scrollable">
            <RadioGroup
              label="Danh sach dai co thanh cuon"
              maxHeight={200}
              options={manyOptions}
              value={selected}
              onChange={setSelected}
              listFooter={
                <div data-cy="custom-list-footer" style={{ padding: "8px", textAlign: "center", fontSize: "12px", color: "#94a3b8" }}>
                  Da cuon den day danh sach
                </div>
              }
            />
          </div>
        );
      };

      cy.mount(<ScrollShowcase />);
      cy.get('[data-cy="card-scrollable"] [role="radiogroup"]').should("be.visible");
      cy.get('[data-cy="custom-list-footer"]').should("exist").and("contain.text", "Da cuon den day danh sach");
    });
  });

  /* ========================================================================
     UI 12: Data Loading with Skeleton & Empty Showcase
     ======================================================================== */
  describe("UI 12: Data Loading with Skeleton & Empty Showcase", () => {
    it("displays Skeleton during data loading and Empty component when no options", () => {
      const SkeletonAndEmptyShowcase = () => {
        const [isLoading, setIsLoading] = useState(true);

        return (
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <div data-cy="card-skeleton">
              <RadioGroup
                label="Dang tai danh sach radio..."
                isLoading={isLoading}
                skeletonCount={3}
                options={[]}
              />
            </div>
            <button
              type="button"
              data-cy="btn-toggle-loading"
              onClick={() => setIsLoading(false)}
            >
              Stop Loading
            </button>
          </div>
        );
      };

      cy.mount(<SkeletonAndEmptyShowcase />);
      cy.get('[data-cy="card-skeleton"] [role="radiogroup"]').should("have.attr", "aria-busy", "true");
      cy.get('[data-cy="card-skeleton"] [role="status"][aria-label="Loading..."]').should("have.length.at.least", 3);

      // Stop loading -> Empty state rendered
      cy.get('[data-cy="btn-toggle-loading"]').click();
      cy.get('[data-cy="card-skeleton"] [role="radiogroup"]').should("contain.text", "Không tìm thấy kết quả");
    });
  });
});

