import React, { useState } from "react";
import { CheckboxGroup } from "./index";
import { CheckboxSize, CheckboxColor, CheckboxVariant } from "./types";

describe("🎨 CheckboxGroup UI Showcase & Design System", () => {
  // 1. Orientation Layouts
  it("UI 1: Orientation Layouts (Vertical vs Horizontal)", () => {
    const OrientationShowcase = () => {
      const [tech, setTech] = useState<string[]>(["react", "tailwind"]);
      const [days, setDays] = useState<string[]>(["mon", "wed", "fri"]);

      return (
        <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-8 font-sans">
          <header>
            <h1 className="text-xl font-bold text-neutral-900">1. Bố cục nhóm (Orientation: Vertical vs Horizontal)</h1>
            <p className="text-sm text-neutral-500">Hỗ trợ xếp theo hàng ngang hoặc cột dọc linh hoạt</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vertical */}
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-4">
              <h2 className="text-sm font-bold text-primary-700 uppercase">Vertical Layout (Mặc định)</h2>
              <CheckboxGroup
                label="Công nghệ sử dụng"
                helperText="Chọn các công nghệ trong dự án của bạn"
                orientation="vertical"
                color="primary"
                value={tech}
                onChange={setTech}
                options={[
                  { value: "react", label: "⚛️ React 19" },
                  { value: "vue", label: "💚 Vue.js 3" },
                  { value: "tailwind", label: "🌊 Tailwind CSS v4" },
                  { value: "typescript", label: "🔷 TypeScript" },
                ]}
              />
              <div className="p-2.5 bg-neutral-100 rounded text-xs text-neutral-700 mt-2">
                Đã chọn: <strong>{tech.join(", ") || "(Chưa chọn)"}</strong>
              </div>
            </div>

            {/* Horizontal */}
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-4">
              <h2 className="text-sm font-bold text-primary-700 uppercase">Horizontal Layout</h2>
              <CheckboxGroup
                label="Ngày làm việc trong tuần"
                helperText="Chọn các ngày bạn có mặt tại văn phòng"
                orientation="horizontal"
                color="success"
                value={days}
                onChange={setDays}
                options={[
                  { value: "mon", label: "Thứ 2" },
                  { value: "tue", label: "Thứ 3" },
                  { value: "wed", label: "Thứ 4" },
                  { value: "thu", label: "Thứ 5" },
                  { value: "fri", label: "Thứ 6" },
                  { value: "sat", label: "Thứ 7" },
                ]}
              />
              <div className="p-2.5 bg-neutral-100 rounded text-xs text-neutral-700 mt-2">
                Đã chọn: <strong>{days.join(", ") || "(Chưa chọn)"}</strong>
              </div>
            </div>
          </div>
        </div>
      );
    };

    cy.mount(<OrientationShowcase />);
    cy.get("h1").should("be.visible");
    cy.get('input[type="checkbox"]').should("have.length", 10);
  });

  // 2. Sizes Cascading
  it("UI 2: Sizes Cascading (xs, sm, md, lg, xl)", () => {
    const SizesShowcase = () => {
      const sizes: CheckboxSize[] = ["xs", "sm", "md", "lg", "xl"];
      const [vals, setVals] = useState<Record<string, string[]>>({
        xs: ["1"],
        sm: ["1"],
        md: ["1"],
        lg: ["1"],
        xl: ["1"],
      });

      return (
        <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-8 font-sans">
          <header>
            <h1 className="text-xl font-bold text-neutral-900">2. Kích thước đồng bộ từ Group (5 Sizes)</h1>
            <p className="text-sm text-neutral-500">
              Prop size từ CheckboxGroup tự động truyền xuống toàn bộ Checkbox con
            </p>
          </header>

          <div className="flex flex-col gap-6">
            {sizes.map((s) => (
              <div key={s} className="p-5 bg-white rounded-xl shadow-sm flex flex-col gap-2">
                <CheckboxGroup
                  size={s}
                  label={`CheckboxGroup size="${s}"`}
                  orientation="horizontal"
                  value={vals[s]}
                  onChange={(next) => setVals((prev) => ({ ...prev, [s]: next }))}
                  options={[
                    { value: "1", label: `Mục 1 (${s.toUpperCase()})` },
                    { value: "2", label: `Mục 2 (${s.toUpperCase()})` },
                    { value: "3", label: `Mục 3 (${s.toUpperCase()})` },
                  ]}
                />
              </div>
            ))}
          </div>
        </div>
      );
    };

    cy.mount(<SizesShowcase />);
    cy.get("h1").should("be.visible");
    cy.get('input[type="checkbox"]').should("have.length", 15);
  });

  // 3. Theme Colors
  it("UI 3: Theme Colors Cascading (7 Colors)", () => {
    const ColorsShowcase = () => {
      const colors: CheckboxColor[] = ["primary", "secondary", "success", "error", "warning", "info", "neutral"];
      const [colorMap, setColorMap] = useState<Record<string, string[]>>({
        primary: ["1", "2"],
        secondary: ["1"],
        success: ["1", "2"],
        error: ["1"],
        warning: ["1", "2"],
        info: ["1"],
        neutral: ["1", "2"],
      });

      return (
        <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-8 font-sans">
          <header>
            <h1 className="text-xl font-bold text-neutral-900">3. Bảng màu chủ đề truyền từ Group (7 Theme Colors)</h1>
            <p className="text-sm text-neutral-500">Mọi Checkbox trong Group đều nhận đồng bộ màu sắc được cấu hình</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colors.map((c) => (
              <div key={c} className="p-5 bg-white rounded-xl shadow-sm flex flex-col gap-3">
                <CheckboxGroup
                  color={c}
                  label={`Group Color: ${c.toUpperCase()}`}
                  orientation="vertical"
                  value={colorMap[c]}
                  onChange={(next) => setColorMap((prev) => ({ ...prev, [c]: next }))}
                  options={[
                    { value: "1", label: `Tùy chọn A (${c})` },
                    { value: "2", label: `Tùy chọn B (${c})` },
                    { value: "3", label: `Tùy chọn C (${c})` },
                  ]}
                />
              </div>
            ))}
          </div>
        </div>
      );
    };

    cy.mount(<ColorsShowcase />);
    cy.get("h1").should("be.visible");
    cy.get('input[type="checkbox"]').should("have.length", 21);
  });

  // 4. Variants
  it("UI 4: Variants Cascading (Filled, Outline, Soft, Other)", () => {
    const VariantsShowcase = () => {
      const variants: CheckboxVariant[] = ["filled", "outline", "soft", "other"];
      const [varMap, setVarMap] = useState<Record<string, string[]>>({
        filled: ["1", "2"],
        outline: ["1", "2"],
        soft: ["1", "2"],
        other: ["1", "2"],
      });

      return (
        <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-8 font-sans">
          <header>
            <h1 className="text-xl font-bold text-neutral-900">
              4. Biến thể giao diện (Variants: Filled, Outline, Soft, Other)
            </h1>
            <p className="text-sm text-neutral-500">Kiểu dáng hiển thị đồng bộ cho toàn bộ danh sách lựa chọn</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {variants.map((v) => (
              <div key={v} className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-3">
                <CheckboxGroup
                  variant={v}
                  color="primary"
                  label={`Group Variant: ${v.toUpperCase()}`}
                  orientation="horizontal"
                  value={varMap[v]}
                  onChange={(next) => setVarMap((prev) => ({ ...prev, [v]: next }))}
                  options={[
                    { value: "1", label: "Tùy chọn 1" },
                    { value: "2", label: "Tùy chọn 2" },
                    { value: "3", label: "Tùy chọn 3" },
                  ]}
                />
              </div>
            ))}
          </div>
        </div>
      );
    };

    cy.mount(<VariantsShowcase />);
    cy.get("h1").should("be.visible");
    cy.get('input[type="checkbox"]').should("have.length", 12);
  });

  // 5. Validation & Helper Text
  it("UI 5: Validation & Animated Error Message", () => {
    const ValidationShowcase = () => {
      const [selected, setSelected] = useState<string[]>([]);
      const hasError = selected.length === 0;

      return (
        <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-8 font-sans">
          <header>
            <h1 className="text-xl font-bold text-neutral-900">
              5. Trạng thái Báo lỗi & Chú thích (Validation & Animation)
            </h1>
            <p className="text-sm text-neutral-500">
              Hiển thị thông báo lỗi mượt mà và cập nhật màu sắc checkbox lập tức khi chọn
            </p>
          </header>

          <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-6 max-w-lg">
            <CheckboxGroup
              label="Sở thích cá nhân (Bắt buộc chọn ít nhất 1)"
              errorMessage={hasError ? "Vui lòng chọn ít nhất một sở thích để tiếp tục" : undefined}
              helperText="Chọn tất cả các chủ đề bạn quan tâm"
              value={selected}
              onChange={setSelected}
              color="primary"
              options={[
                { value: "music", label: "🎵 Âm nhạc & Nghệ thuật" },
                { value: "sport", label: "⚽ Thể thao & Vận động" },
                { value: "travel", label: "✈️ Du lịch & Khám phá" },
                { value: "tech", label: "💻 Công nghệ & Lập trình" },
              ]}
            />

            <div className="p-3 bg-neutral-100 rounded text-xs text-neutral-700">
              Số lượng đã chọn: <strong>{selected.length}</strong> / 4 mục
            </div>
          </div>
        </div>
      );
    };

    cy.mount(<ValidationShowcase />);
    cy.get("h1").should("be.visible");
    cy.get('input[type="checkbox"]').should("have.length", 4);
  });

  // 6. Disabled, ReadOnly & Loading
  it("UI 6: Group States (Disabled, ReadOnly, IsLoading)", () => {
    const GroupStatesShowcase = () => {
      return (
        <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-8 font-sans">
          <header>
            <h1 className="text-xl font-bold text-neutral-900">6. Trạng thái khóa (Disabled, ReadOnly, IsLoading)</h1>
            <p className="text-sm text-neutral-500">Khóa tương tác cho toàn bộ các mục bên trong nhóm</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Disabled Group */}
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-3">
              <h2 className="text-sm font-bold text-neutral-500 uppercase">Disabled Group</h2>
              <CheckboxGroup
                disabled
                defaultValue={["read", "write"]}
                label="Quyền hạn hệ thống (Disabled)"
                helperText="Bạn không có quyền chỉnh sửa mục này"
                options={[
                  { value: "read", label: "Quyền Đọc" },
                  { value: "write", label: "Quyền Ghi" },
                  { value: "delete", label: "Quyền Xóa" },
                ]}
              />
            </div>

            {/* ReadOnly Group */}
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-3">
              <h2 className="text-sm font-bold text-neutral-500 uppercase">ReadOnly Group</h2>
              <CheckboxGroup
                defaultValue={["gold"]}
                label="Gói dịch vụ đã mua (ReadOnly)"
                helperText="Chế độ chỉ xem thông tin gói"
                options={[
                  { value: "silver", label: "Gói Bạc (Silver)" },
                  { value: "gold", label: "Gói Vàng (Gold)" },
                  { value: "diamond", label: "Gói Kim Cương (Diamond)" },
                ]}
              />
            </div>

            {/* IsLoading Group */}
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-3">
              <h2 className="text-sm font-bold text-neutral-500 uppercase">Loading Group</h2>
              <CheckboxGroup
                defaultValue={["push"]}
                label="Đồng bộ dữ liệu (IsLoading)"
                helperText="Đang tải dữ liệu cấu hình..."
                config={{ isLoading: true, showSpinner: true }}
                options={[
                  { value: "email", label: "Email" },
                  { value: "push", label: "Push Notification" },
                  { value: "sms", label: "SMS" },
                ]}
              />
            </div>
          </div>
        </div>
      );
    };

    cy.mount(<GroupStatesShowcase />);
    cy.get("h1").should("be.visible");
    cy.get('input[type="checkbox"]').should("have.length", 9);
  });

  // 7. Label Placement
  it("UI 7: Label Placements (Right vs Left)", () => {
    const PlacementShowcase = () => {
      const [v1, setV1] = useState<string[]>(["apple"]);
      const [v2, setV2] = useState<string[]>(["banana"]);

      return (
        <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-8 font-sans">
          <header>
            <h1 className="text-xl font-bold text-neutral-900">
              7. Vị trí nhãn trong Group (Label Placement: Right vs Left)
            </h1>
            <p className="text-sm text-neutral-500">Căn chỉnh vị trí nhãn sang trái hoặc sang phải theo thiết kế</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-3">
              <CheckboxGroup
                labelPlacement="right"
                label="Label Placement Right (Mặc định)"
                value={v1}
                onChange={setV1}
                options={[
                  { value: "apple", label: "🍎 Táo chín" },
                  { value: "orange", label: "🍊 Cam ngọt" },
                ]}
              />
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-3">
              <CheckboxGroup
                labelPlacement="left"
                label="Label Placement Left (Căn đều 2 bên)"
                value={v2}
                onChange={setV2}
                options={[
                  { value: "banana", label: "🍌 Chuối tiêu" },
                  { value: "grape", label: "🍇 Nho đen" },
                ]}
              />
            </div>
          </div>
        </div>
      );
    };

    cy.mount(<PlacementShowcase />);
    cy.get("h1").should("be.visible");
    cy.get('input[type="checkbox"]').should("have.length", 4);
  });

  // 8. Custom Card Styles inside CheckboxGroup
  it("UI 8: Card Selection Pattern inside CheckboxGroup", () => {
    const CardSelectionShowcase = () => {
      const [selectedPlans, setSelectedPlans] = useState<string[]>(["pro"]);

      const plans = [
        {
          id: "basic",
          name: "Gói Cơ Bản",
          price: "199.000đ/tháng",
          desc: "Dành cho cá nhân và dự án nhỏ",
        },
        {
          id: "pro",
          name: "Gói Chuyên Nghiệp",
          price: "499.000đ/tháng",
          desc: "Đầy đủ tính năng cao cấp & hỗ trợ 24/7",
        },
        {
          id: "enterprise",
          name: "Gói Doanh Nghiệp",
          price: "1.499.000đ/tháng",
          desc: "Tùy biến không giới hạn & bảo mật riêng",
        },
      ];

      return (
        <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-8 font-sans">
          <header>
            <h1 className="text-xl font-bold text-neutral-900">8. Thiết kế dạng thẻ Card (Custom Card Pattern)</h1>
            <p className="text-sm text-neutral-500">
              Kết hợp CheckboxGroup để tạo giao diện chọn nhiều dạng Card trực quan
            </p>
          </header>

          <div className="p-6 bg-white rounded-xl shadow-sm max-w-2xl">
            <CheckboxGroup
              label="Chọn các gói tính năng muốn nâng cấp"
              helperText="Có thể chọn nhiều gói cùng lúc"
              value={selectedPlans}
              onChange={setSelectedPlans}
              options={plans.map((p) => ({
                value: p.id,
                label: p.name,
                description: `${p.price} - ${p.desc}`,
              }))}
            />
          </div>
        </div>
      );
    };

    cy.mount(<CardSelectionShowcase />);
    cy.get("h1").should("be.visible");
    cy.get('input[type="checkbox"]').should("have.length", 3);
  });

  // 9. Comprehensive CheckboxGroup Dashboard
  it("UI 9: Comprehensive CheckboxGroup Showcase Dashboard", () => {
    const FullDashboard = () => {
      const [skills, setSkills] = useState<string[]>(["frontend", "ui"]);
      const [notify, setNotify] = useState<string[]>(["email"]);
      const [security, setSecurity] = useState<string[]>(["2fa", "sms"]);

      return (
        <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-8 font-sans">
          <header>
            <h1 className="text-2xl font-bold text-neutral-900">☑️ CheckboxGroup Comprehensive Showcase Dashboard</h1>
            <p className="text-sm text-neutral-500">
              Tổng hợp tất cả tính năng, kích thước, bảng màu và bố cục của CheckboxGroup
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Horizontal Primary */}
            <div className="p-5 bg-white rounded-xl shadow-sm flex flex-col gap-3">
              <h3 className="text-sm font-bold text-primary-700">1. Horizontal Skills (Primary)</h3>
              <CheckboxGroup
                orientation="horizontal"
                color="primary"
                value={skills}
                onChange={setSkills}
                options={[
                  { value: "frontend", label: "Frontend" },
                  { value: "backend", label: "Backend" },
                  { value: "ui", label: "UI/UX" },
                  { value: "devops", label: "DevOps" },
                ]}
              />
              <div className="text-[11px] text-neutral-500 mt-auto bg-neutral-100 p-2 rounded">
                Đã chọn: {skills.join(", ") || "(Trống)"}
              </div>
            </div>

            {/* Card 2: Vertical Success */}
            <div className="p-5 bg-white rounded-xl shadow-sm flex flex-col gap-3">
              <h3 className="text-sm font-bold text-success-700">2. Vertical Notifications (Success)</h3>
              <CheckboxGroup
                orientation="vertical"
                color="success"
                value={notify}
                onChange={setNotify}
                options={[
                  { value: "email", label: "✉️ Email thông báo" },
                  { value: "browser", label: "🔔 Thông báo trình duyệt" },
                  { value: "app", label: "📱 Thông báo app" },
                ]}
              />
              <div className="text-[11px] text-neutral-500 mt-auto bg-neutral-100 p-2 rounded">
                Đã chọn: {notify.join(", ") || "(Trống)"}
              </div>
            </div>

            {/* Card 3: Soft Variant Security */}
            <div className="p-5 bg-white rounded-xl shadow-sm flex flex-col gap-3">
              <h3 className="text-sm font-bold text-info-700">3. Soft Variant Security (Info)</h3>
              <CheckboxGroup
                variant="soft"
                color="info"
                value={security}
                onChange={setSecurity}
                options={[
                  { value: "2fa", label: "Xác thực 2 yếu tố (2FA)" },
                  { value: "sms", label: "Cảnh báo qua SMS" },
                  { value: "biometric", label: "Đăng nhập sinh trắc học" },
                ]}
              />
              <div className="text-[11px] text-neutral-500 mt-auto bg-neutral-100 p-2 rounded">
                Đã chọn: {security.join(", ") || "(Trống)"}
              </div>
            </div>
          </div>
        </div>
      );
    };

    cy.mount(<FullDashboard />);
    cy.get("h1").should("be.visible");
    cy.get('input[type="checkbox"]').should("have.length.greaterThan", 8);
  });

  /* ========================================================================
     12. Search Showcase & Tests in 1 Mount (Client, Server & Preserve Selected)
     ======================================================================== */
  it("UI 12: Comprehensive Search Showcase in 1 Mount", () => {
    const sampleOptions = [
      { value: "react", label: "React JS", code: "FE-01", description: "Facebook library" },
      { value: "vue", label: "Vue JS", code: "FE-02", description: "Progressive framework" },
      { value: "angular", label: "Angular", code: "FE-03", description: "Google platform" },
      { value: "svelte", label: "Svelte", code: "FE-04", description: "Cybernetically enhanced" },
    ];

    const SearchShowcase = () => {
      const [clientSelected, setClientSelected] = useState<string[]>([]);
      const [customFieldSelected, setCustomFieldSelected] = useState<string[]>([]);
      const [preserveSelectedList, setPreserveSelectedList] = useState<string[]>(["react"]);
      const [serverSelected, setServerSelected] = useState<string[]>([]);
      const [serverOptions, setServerOptions] = useState([
        { value: "init-1", label: "iPhone 9 (Gợi ý ban đầu)", description: "$549 - smartphones" },
        { value: "init-2", label: "iPhone X (Gợi ý ban đầu)", description: "$899 - smartphones" },
      ]);
      const [isServerLoading, setIsServerLoading] = useState(false);

      const handleServerSearch = async (query: string) => {
        setIsServerLoading(true);
        try {
          const res = await fetch(
            `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=4`
          );
          if (!res.ok) return;
          const data = await res.json();
          const items = (data.products || []).map((p: { id: number; title: string; price: number; category: string; }) => ({
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
        <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-8 font-sans">
          <header>
            <h1 className="text-xl font-bold text-neutral-900">
              12. CheckboxGroup Search Showcase (Client & Server Modes)
            </h1>
            <p className="text-sm text-neutral-500">
              Tìm kiếm linh hoạt qua Component Input variant outline, hỗ trợ lọc đa trường, gọi API server và bảo lưu mục đã chọn
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {/* Card 1: Client Search by Label */}
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-4" data-cy="card-client-label">
              <h2 className="text-sm font-bold text-primary-700 uppercase">1. Client Mode: Search by Label</h2>
              <CheckboxGroup
                config={{ searchable: true }}
                searchPlaceholder="Tìm framework..."
                options={sampleOptions}
                value={clientSelected}
                onChange={setClientSelected}
                label="Danh sách Framework"
              />
            </div>

            {/* Card 2: Client Search by Custom Field (Code / Description) */}
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-4" data-cy="card-client-custom">
              <h2 className="text-sm font-bold text-success-700 uppercase">2. Client Mode: Search by Code / Description</h2>
              <CheckboxGroup
                config={{ searchable: true }}
                searchField={["code", "description"]}
                searchPlaceholder="Tìm theo mã FE-01 hoặc mô tả..."
                options={sampleOptions}
                value={customFieldSelected}
                onChange={setCustomFieldSelected}
                color="success"
                label="Tìm theo mã Code"
              />
            </div>

            {/* Card 3: Preserve Selected Items */}
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-4" data-cy="card-preserve">
              <h2 className="text-sm font-bold text-warning-700 uppercase">3. Preserve Selected Items (Bảo lưu mục chọn)</h2>
              <CheckboxGroup
                config={{ searchable: true, preserveSelected: true }}
                options={sampleOptions}
                value={preserveSelectedList}
                onChange={setPreserveSelectedList}
                color="warning"
                label="Bảo lưu mục đã chọn"
              />
              <div className="text-xs text-neutral-500 bg-neutral-100 p-2 rounded">
                Đang chọn: {preserveSelectedList.join(", ") || "(Trống)"}
              </div>
            </div>

            {/* Card 4: Server Search Mode calling real DummyJSON API */}
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-4" data-cy="card-server">
              <h2 className="text-sm font-bold text-info-700 uppercase">4. Server Mode: Real Live API (DummyJSON)</h2>
              <CheckboxGroup
                config={{ searchable: true }}
                searchMode="server"
                isLoading={isServerLoading}
                onSearch={handleServerSearch}
                searchPlaceholder="Tìm sản phẩm thật (ví dụ: phone, laptop)..."
                options={serverOptions}
                value={serverSelected}
                onChange={setServerSelected}
                color="info"
                label="Tìm kiếm sản phẩm từ DummyJSON API"
              />
              <div className="text-xs text-neutral-500 bg-neutral-100 p-2 rounded">
                Đã chọn: {serverSelected.join(", ") || "(Trống)"}
              </div>
            </div>
          </div>
        </div>
      );
    };

    // ĐÚNG 1 LẦN MOUNT DUY NHẤT
    cy.mount(<SearchShowcase />);

    // 1. Kiểm tra Card 1: Client search by label & nút clear của Input
    cy.get('[data-cy="card-client-label"] input[type="text"]').type("vue");
    cy.get('[data-cy="card-client-label"] input[type="checkbox"]').should("have.length", 1);
    cy.get('[data-cy="card-client-label"]').should("contain.text", "Vue JS").and("not.contain.text", "React JS");
    cy.get('[data-cy="card-client-label"] button[aria-label*="Xóa"]').click();
    cy.get('[data-cy="card-client-label"] input[type="checkbox"]').should("have.length", 4);

    // 2. Kiểm tra Card 2: Client search theo custom searchField (code)
    cy.get('[data-cy="card-client-custom"] input[type="text"]').type("FE-03");
    cy.get('[data-cy="card-client-custom"] input[type="checkbox"]').should("have.length", 1);
    cy.get('[data-cy="card-client-custom"]').should("contain.text", "Angular");

    // 3. Kiểm tra Card 3: Bảo lưu mục đã chọn
    cy.get('[data-cy="card-preserve"] input[value="react"]').should("be.checked");
    cy.get('[data-cy="card-preserve"] input[type="text"]').type("angular");
    // Cả "react" (đang chọn) và "angular" (kết quả tìm) đều xuất hiện
    cy.get('[data-cy="card-preserve"] input[type="checkbox"]').should("have.length", 2);
    cy.get('[data-cy="card-preserve"] input[value="react"]').should("be.checked");
    cy.get('[data-cy="card-preserve"] input[value="angular"]').should("not.be.checked");
    // Bỏ chọn "react" -> chỉ còn lại "angular"
    cy.get('[data-cy="card-preserve"] input[value="react"]').parent().click();
    cy.get('[data-cy="card-preserve"] input[type="checkbox"]').should("have.length", 1);
    cy.get('[data-cy="card-preserve"]').should("contain.text", "Angular");

    // 4. Kiểm tra Card 4: Server mode gọi API thật DummyJSON qua internet
    cy.get('[data-cy="card-server"] input[type="text"]').type("phone");
    cy.get('[data-cy="card-server"]', { timeout: 10000 }).should("contain.text", "Apple");
    cy.get('[data-cy="card-server"] input[type="checkbox"]').should("have.length.greaterThan", 0);
  });

  // 13. MaxHeight Scrollable & ListFooter Showcase
  it("UI 13: MaxHeight Scrollable & ListFooter Showcase", () => {
    const manyOptions = Array.from({ length: 20 }, (_, i) => ({
      value: `opt-${i + 1}`,
      label: `Tùy chọn mục ${i + 1}`,
      description: `Mô tả chi tiết cho phần tử thứ ${i + 1}`,
    }));

    const ScrollShowcase = () => {
      const [selected, setSelected] = useState<string[]>(["opt-1"]);

      return (
        <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-6 font-sans">
          <header>
            <h1 className="text-xl font-bold text-neutral-900">
              13. Vùng cuộn MaxHeight & ListFooter
            </h1>
          </header>

          <div className="p-6 bg-white rounded-xl shadow-sm max-w-md" data-cy="card-scrollable">
            <CheckboxGroup
              label="Danh sách dài có thanh cuộn"
              maxHeight={200}
              options={manyOptions}
              value={selected}
              onChange={setSelected}
              listFooter={
                <div data-cy="custom-list-footer" className="p-2 text-center text-xs text-neutral-400 border-t border-neutral-100">
                  Đã cuộn đến đáy danh sách
                </div>
              }
            />
          </div>
        </div>
      );
    };

    cy.mount(<ScrollShowcase />);
    cy.get('[data-cy="card-scrollable"] [role="group"]').should("be.visible");
    cy.get('[data-cy="custom-list-footer"]').should("exist").and("contain.text", "Đã cuộn đến đáy danh sách");
  });

  // 14. Data Loading with Skeleton Placeholder Showcase
  it("UI 14: Data Loading with Skeleton Placeholder Showcase", () => {
    const SkeletonShowcase = () => {
      return (
        <div className="p-8 bg-neutral-50 min-h-screen flex flex-col gap-6 font-sans">
          <header>
            <h1 className="text-xl font-bold text-neutral-900">
              14. Trạng thái tải dữ liệu bằng Skeleton (Data Loading)
            </h1>
          </header>

          <div className="p-6 bg-white rounded-xl shadow-sm max-w-md" data-cy="card-skeleton">
            <CheckboxGroup
              label="Đang tải danh sách vai trò..."
              isLoading={true}
              skeletonCount={4}
              options={[]}
            />
          </div>
        </div>
      );
    };

    cy.mount(<SkeletonShowcase />);
    cy.get('[data-cy="card-skeleton"] [role="group"]').should("be.visible");
    cy.get('[data-cy="card-skeleton"] [role="group"]').should("have.attr", "aria-busy", "true");
    cy.get('[data-cy="card-skeleton"] [role="status"][aria-label="Loading..."]').should("have.length.at.least", 4);
  });
});

