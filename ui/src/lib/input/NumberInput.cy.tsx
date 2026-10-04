import React, { useState } from "react";
import NumberInput from "./NumberInput";

describe("NumberInput Component", () => {
  describe("1. Number Formatting with Dot (.)", () => {
    it("formats 3 digits, 4 digits, 6 digits and millions automatically and outputs numeric value", () => {
      const FormattedForm = () => {
        const [val, setVal] = useState<number | null>(null);
        return (
          <div className="p-4 max-w-sm">
            <NumberInput
              label="Số tiền thanh toán"
              value={val}
              onChange={(v) => setVal(v)}
              placeholder="Nhập số tiền..."
            />
            <span data-testid="output">{val !== null ? val : "null"}</span>
          </div>
        );
      };

      cy.mount(<FormattedForm />);

      // Type 1000 -> UI displays 1.000, output state is 1000
      cy.get("input").type("1000");
      cy.get("input").should("have.value", "1.000");
      cy.get("[data-testid='output']").should("have.text", "1000");

      // Type 000 -> UI displays 1.000.000, output state is 1000000
      cy.get("input").type("000");
      cy.get("input").should("have.value", "1.000.000");
      cy.get("[data-testid='output']").should("have.text", "1000000");
    });

    it("ignores letters and non-digit characters", () => {
      const CleanNumberForm = () => {
        const [val, setVal] = useState<number | null>(null);
        return (
          <div>
            <NumberInput value={val} onChange={(v) => setVal(v)} placeholder="Chỉ nhận số" />
            <span data-testid="output">{val !== null ? val : "null"}</span>
          </div>
        );
      };

      cy.mount(<CleanNumberForm />);
      cy.get("input").type("abc12xy345z");
      cy.get("input").should("have.value", "12.345");
      cy.get("[data-testid='output']").should("have.text", "12345");
    });
  });

  describe("2. Custom Separators & Decimal Support", () => {
    it("supports decimalSeparator and maxDecimalDigits (VN: 1.000,50)", () => {
      const DecimalForm = () => {
        const [val, setVal] = useState<number | null>(null);
        return (
          <div className="p-4 max-w-sm">
            <NumberInput
              label="Trọng lượng (kg)"
              maxDecimalDigits={2}
              decimalSeparator=","
              thousandSeparator="."
              value={val}
              onChange={(v) => setVal(v)}
              placeholder="0,00"
            />
            <span data-testid="output">{val !== null ? val : "null"}</span>
          </div>
        );
      };

      cy.mount(<DecimalForm />);
      cy.get("input").type("1250,75");
      cy.get("input").should("have.value", "1.250,75");
      cy.get("[data-testid='output']").should("have.text", "1250.75");

      // Type more digits beyond maxDecimalDigits=2 -> stays at 1.250,75 and caret doesn't jump to 0
      cy.get("input").type("9");
      cy.get("input").should("have.value", "1.250,75");
      cy.get("[data-testid='output']").should("have.text", "1250.75");
      // Blur to body or other element
      cy.get("input").blur();
      cy.get("input").should("have.value", "1.250,75");
      cy.get("[data-testid='output']").should("have.text", "1250.75");
    });


    it("correctly formats integer when typed into decimal input (12345 -> 12.345)", () => {
      const WeightForm = () => {
        const [val, setVal] = useState<number | null>(null);
        return (
          <div className="p-4 max-w-sm">
            <NumberInput
              label="Khối lượng sản phẩm"
              maxDecimalDigits={2}
              decimalSeparator=","
              thousandSeparator="."
              value={val}
              onChange={(v) => setVal(v)}
            />
            <span data-testid="output">{val !== null ? val : "null"}</span>
          </div>
        );
      };

      cy.mount(<WeightForm />);
      cy.get("input").type("12345");
      cy.get("input").should("have.value", "12.345");
      cy.get("[data-testid='output']").should("have.text", "12345");
    });

    it("supports US format (1,000,000.99)", () => {
      const USDecimalForm = () => {
        const [val, setVal] = useState<number | null>(null);
        return (
          <div className="p-4 max-w-sm">
            <NumberInput
              label="USD Amount"
              maxDecimalDigits={2}
              decimalSeparator="."
              thousandSeparator=","
              value={val}
              onChange={(v) => setVal(v)}
              placeholder="0.00"
            />
            <span data-testid="output">{val !== null ? val : "null"}</span>
          </div>
        );
      };

      cy.mount(<USDecimalForm />);
      cy.get("input").type("1000000.99");
      cy.get("input").should("have.value", "1,000,000.99");
      cy.get("[data-testid='output']").should("have.text", "1000000.99");
    });
  });

  describe("3. Negative Numbers Support", () => {
    it("handles typing negative integer (-5000 -> -5.000)", () => {
      const NegativeForm = () => {
        const [val, setVal] = useState<number | null>(null);
        return (
          <div className="p-4 max-w-sm">
            <NumberInput label="Nhiệt độ (°C)" value={val} onChange={(v) => setVal(v)} placeholder="-50" />
            <span data-testid="output">{val !== null ? val : "null"}</span>
          </div>
        );
      };

      cy.mount(<NegativeForm />);
      cy.get("input").type("-5000");
      cy.get("input").should("have.value", "-5.000");
      cy.get("[data-testid='output']").should("have.text", "-5000");
    });

    it("handles typing negative decimal (-1250,75)", () => {
      const NegativeDecimalForm = () => {
        const [val, setVal] = useState<number | null>(null);
        return (
          <div className="p-4 max-w-sm">
            <NumberInput
              label="Chênh lệch giá trị"
              maxDecimalDigits={2}
              decimalSeparator=","
              thousandSeparator="."
              value={val}
              onChange={(v) => setVal(v)}
            />
            <span data-testid="output">{val !== null ? val : "null"}</span>
          </div>
        );
      };

      cy.mount(<NegativeDecimalForm />);
      cy.get("input").type("-1250,75");
      cy.get("input").should("have.value", "-1.250,75");
      cy.get("[data-testid='output']").should("have.text", "-1250.75");
    });
  });

  describe("4. Min and Max Clamping", () => {
    it("automatically clamps to max in real-time when typing beyond max", () => {
      const MaxBoundedForm = () => {
        const [val, setVal] = useState<number | null>(null);
        return (
          <div className="p-4 max-w-sm">
            <NumberInput
              label="Số lượng tối đa 1.000"
              max={1000}
              value={val}
              onChange={(v) => setVal(v)}
              placeholder="Max 1.000"
            />
            <span data-testid="output">{val !== null ? val : "null"}</span>
          </div>
        );
      };

      cy.mount(<MaxBoundedForm />);

      // Type 500 -> 500 (under max)
      cy.get("input").type("500");
      cy.get("input").should("have.value", "500");
      cy.get("[data-testid='output']").should("have.text", "500");

      // Type 5000 -> automatically clamped to 1.000
      cy.get("input").type("0");
      cy.get("input").should("have.value", "1.000");
      cy.get("[data-testid='output']").should("have.text", "1000");
    });

    it("allows typing numbers below positive min during input and clamps to min on blur", () => {
      const onBlurSpy = cy.spy().as("onBlurSpy");
      const MinBoundedForm = () => {
        const [val, setVal] = useState<number | null>(null);
        return (
          <div className="p-4 max-w-sm">
            <NumberInput
              label="Số lượng tối thiểu 100"
              min={100}
              value={val}
              onChange={(v) => setVal(v)}
              onBlur={onBlurSpy}
              placeholder="Min 100"
            />
            <span data-testid="output">{val !== null ? val : "null"}</span>
            <button id="other-btn" type="button">
              Focus out
            </button>
          </div>
        );
      };

      cy.mount(<MinBoundedForm />);
      // Type 1 -> 1 (not jumped to 100)
      cy.get("input").type("1");
      cy.get("input").should("have.value", "1");
      cy.get("[data-testid='output']").should("have.text", "1");

      // Type 5 -> 15 (not jumped to 100)
      cy.get("input").type("5");
      cy.get("input").should("have.value", "15");
      cy.get("[data-testid='output']").should("have.text", "15");

      // Blur -> automatically clamped to 100
      cy.get("#other-btn").click();
      cy.get("input").should("have.value", "100");
      cy.get("[data-testid='output']").should("have.text", "100");
      cy.get("@onBlurSpy").should("have.been.calledOnce");
    });

    it("accepts numeric value={1000000} and formats it correctly", () => {
      const NumericValueForm = () => {
        return <NumberInput label="Giá trị số" value={1000000} />;
      };

      cy.mount(<NumericValueForm />);
      cy.get("input").should("have.value", "1.000.000");
    });
  });

  describe("5. Clearable and Slots Support", () => {
    it("supports isClearable and emits null when cleared", () => {
      const ClearableNumber = () => {
        const [val, setVal] = useState<number | null>(500000);
        return (
          <div>
            <NumberInput
              label="Giá tour"
              config={{ isClearable: true }}
              rightAddon="VNĐ"
              value={val}
              onChange={(v) => setVal(v)}
              onClear={() => setVal(null)}
            />
            <span data-testid="output">{val !== null ? val : "null"}</span>
          </div>
        );
      };

      cy.mount(<ClearableNumber />);
      cy.get("input").should("have.value", "500.000");
      cy.contains("VNĐ").should("be.visible");
      cy.get("[data-testid='output']").should("have.text", "500000");

      cy.get("button[aria-label='Clear input']").click();
      cy.get("input").should("have.value", "");
      cy.get("[data-testid='output']").should("have.text", "null");
    });

    it("forwards ref to HTMLInputElement directly", () => {
      const RefWrapper = () => {
        const inputRef = React.useRef<HTMLInputElement>(null);
        return (
          <div>
            <NumberInput ref={inputRef} placeholder="Ref test" />
            <button onClick={() => inputRef.current?.focus()}>Focus</button>
          </div>
        );
      };

      cy.mount(<RefWrapper />);
      cy.get("button").click();
      cy.get("input").should("be.focused");
    });
  });

  describe("6. Interactive Testing Studio / Visual Showcase", () => {
    it("renders complete interactive testing studio with preset buttons and live value inspect", () => {
      const Showcase = () => {
        // 1. VNĐ
        const [vnd, setVnd] = useState<number | null>(1500000);

        // 2. Số Âm
        const [temp, setTemp] = useState<number | null>(-25);

        // 3. Số Thập Phân (kg)
        const [weight, setWeight] = useState<number | null>(12.75);

        // 4. Min / Max
        const [bounded, setBounded] = useState<number | null>(500);

        // 5. Chuẩn Quốc tế US ($)
        const [usd, setUsd] = useState<number | null>(2450.75);

        return (
          <div className="p-8 max-w-4xl mx-auto space-y-8 bg-neutral-100 min-h-screen">
            <div className="bg-neutral-white p-6 rounded-2xl shadow-sm border border-neutral-200">
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">🎮 NumberInput Interactive Testing Studio</h1>
              <p className="text-sm text-neutral-500">
                Khu vực thử nghiệm trực tiếp đầy đủ các tính năng: phân cách dấu chấm 3 số, số âm, số thập phân, ép
                min/max và chuẩn quốc tế. Đầu ra onChange trả về number, khi xóa/clear trả về null (sẵn sàng serialize JSON lên server).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Tiền Việt Nam (VNĐ) */}
              <div className="bg-neutral-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-neutral-800">1. Tiền Việt Nam (VNĐ)</h3>
                  <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full font-medium">
                    Dấu chấm 3 số
                  </span>
                </div>
                <NumberInput
                  label="Số tiền thanh toán"
                  rightAddon="₫"
                  value={vnd}
                  onChange={(v) => setVnd(v)}
                  config={{ isClearable: true }}
                  onClear={() => setVnd(null)}
                  helperText="Tự động thêm dấu chấm mỗi 3 số"
                />
                <div className="text-xs bg-neutral-50 p-2.5 rounded border border-neutral-200 space-y-1">
                  <div>
                    <strong>Numeric Value:</strong> <code className="text-primary-600 font-mono">{String(vnd)}</code>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setVnd(50000)}
                    className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 rounded font-medium cursor-pointer"
                  >
                    50.000 ₫
                  </button>
                  <button
                    type="button"
                    onClick={() => setVnd(1000000)}
                    className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 rounded font-medium cursor-pointer"
                  >
                    1.000.000 ₫
                  </button>
                  <button
                    type="button"
                    onClick={() => setVnd(100000000)}
                    className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 rounded font-medium cursor-pointer"
                  >
                    100.000.000 ₫
                  </button>
                  <button
                    type="button"
                    onClick={() => setVnd(null)}
                    className="px-2.5 py-1 text-xs bg-error-50 text-error-600 hover:bg-error-100 rounded font-medium cursor-pointer"
                  >
                    Xóa (null)
                  </button>
                </div>
              </div>

              {/* Card 2: Nhập Số Âm */}
              <div className="bg-neutral-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-neutral-800">2. Nhập Số Âm</h3>
                  <span className="text-xs px-2 py-0.5 bg-error-100 text-error-700 rounded-full font-medium">
                    Hỗ trợ dấu "-"
                  </span>
                </div>
                <NumberInput
                  label="Nhiệt độ / Chênh lệch tài chính"
                  rightAddon="°C"
                  value={temp}
                  onChange={(v) => setTemp(v)}
                  config={{ isClearable: true }}
                  maxDecimalDigits={2}
                  onClear={() => setTemp(null)}
                  helperText="Có thể gõ dấu trừ (-) ở đầu"
                />
                <div className="text-xs bg-neutral-50 p-2.5 rounded border border-neutral-200 space-y-1">
                  <div>
                    <strong>Numeric Value:</strong> <code className="text-error-600 font-mono">{String(temp)}</code>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setTemp(-50)}
                    className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 rounded font-medium cursor-pointer"
                  >
                    -50 °C
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemp(-1500000)}
                    className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 rounded font-medium cursor-pointer"
                  >
                    -1.500.000
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemp(-25.5)}
                    className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 rounded font-medium cursor-pointer"
                  >
                    -25,5
                  </button>
                </div>
              </div>

              {/* Card 3: Số Thập Phân (Việt Nam) */}
              <div className="bg-neutral-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-neutral-800">3. Số Thập Phân (Việt Nam)</h3>
                  <span className="text-xs px-2 py-0.5 bg-warning-100 text-warning-800 rounded-full font-medium">
                    Dấu phẩy (,) 2 số lẻ
                  </span>
                </div>
                <NumberInput
                  label="Khối lượng sản phẩm"
                  maxDecimalDigits={2}
                  decimalSeparator=","
                  thousandSeparator="."
                  value={weight}
                  onChange={(v) => setWeight(v)}
                  rightAddon="kg"
                  config={{ isClearable: true }}
                  onClear={() => setWeight(null)}
                  helperText="Tối đa 2 chữ số thập phân"
                />
                <div className="text-xs bg-neutral-50 p-2.5 rounded border border-neutral-200 space-y-1">
                  <div>
                    <strong>Numeric Value:</strong> <code className="text-warning-800 font-mono">{String(weight)}</code>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setWeight(0.5)}
                    className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 rounded font-medium cursor-pointer"
                  >
                    0,5 kg
                  </button>
                  <button
                    type="button"
                    onClick={() => setWeight(12.75)}
                    className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 rounded font-medium cursor-pointer"
                  >
                    12,75 kg
                  </button>
                  <button
                    type="button"
                    onClick={() => setWeight(999.99)}
                    className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 rounded font-medium cursor-pointer"
                  >
                    999,99 kg
                  </button>
                </div>
              </div>

              {/* Card 4: Giới Hạn Min & Max */}
              <div className="bg-neutral-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-neutral-800">4. Giới Hạn Min & Max</h3>
                  <span className="text-xs px-2 py-0.5 bg-success-100 text-success-800 rounded-full font-medium">
                    Min -100 / Max 1.000
                  </span>
                </div>
                <NumberInput
                  label="Số lượng (Min -100, Max 1.000)"
                  min={-100}
                  max={1000}
                  value={bounded}
                  onChange={(v) => setBounded(v)}
                  helperText="Gõ quá 1.000 tự động ép về 1.000 ngay"
                />
                <div className="text-xs bg-neutral-50 p-2.5 rounded border border-neutral-200 space-y-1">
                  <div>
                    <strong>Numeric Value:</strong> <code className="text-success-700 font-mono">{String(bounded)}</code>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setBounded(1000)}
                    className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 rounded font-medium cursor-pointer"
                  >
                    Gõ quá 5000 (ép về 1.000)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBounded(-100)}
                    className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 rounded font-medium cursor-pointer"
                  >
                    Gõ âm quá -500 (ép về -100)
                  </button>
                </div>
              </div>

              {/* Card 5: Chuẩn Quốc Tế US Format */}
              <div className="bg-neutral-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4 md:col-span-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-neutral-800">5. Chuẩn Quốc Tế / US Format (1,000,000.99)</h3>
                  <span className="text-xs px-2 py-0.5 bg-info-100 text-info-700 rounded-full font-medium">
                    Thousand ',' / Decimal '.'
                  </span>
                </div>
                <NumberInput
                  label="US Dollar ($)"
                  thousandSeparator=","
                  decimalSeparator="."
                  maxDecimalDigits={2}
                  value={usd}
                  onChange={(v) => setUsd(v)}
                  rightAddon="$"
                  config={{ isClearable: true }}
                  onClear={() => setUsd(null)}
                  helperText="Format quốc tế: phân cách nghìn bằng dấu phẩy (,), thập phân bằng dấu chấm (.)"
                />
                <div className="text-xs bg-neutral-50 p-2.5 rounded border border-neutral-200 space-y-1">
                  <div>
                    <strong>Numeric Value:</strong> <code className="text-info-700 font-mono">{String(usd)}</code>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setUsd(25.5)}
                    className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 rounded font-medium cursor-pointer"
                  >
                    $25.50
                  </button>
                  <button
                    type="button"
                    onClick={() => setUsd(1000000.99)}
                    className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 rounded font-medium cursor-pointer"
                  >
                    $1,000,000.99
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      };

      cy.mount(<Showcase />);
      cy.get("input").should("have.length", 5);
      cy.contains("₫").should("be.visible");
      cy.contains("kg").should("be.visible");
      cy.contains("$").should("be.visible");
    });
  });
});
