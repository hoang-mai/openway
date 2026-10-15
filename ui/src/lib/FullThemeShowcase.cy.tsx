import React, { useState, useEffect } from "react";
import { Breadcrumb } from "./breadcrumb";
import { Button } from "./button";
import {
  Carousel,
  CarouselContent,
  CarouselSlide,
  CarouselPrevious,
  CarouselNext,
  CarouselPagination,
} from "./carousel";
import { Checkbox } from "./checkbox";
import { Collapse, CollapsePanel } from "./collapse";
import {
  Confirm,
  ConfirmContainer,
  ConfirmHeader,
  ConfirmBody,
  ConfirmFooter,
} from "./confirm";
import { DatePicker, Calendar } from "./datepicker";
import { Input, PasswordInput, NumberInput, MultiInput } from "./input";
import { TextArea } from "./textarea";
import { Radio, RadioGroup } from "./radio";
import {
  Modal,
  ModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose,
} from "./modal";

const SEMANTIC_COLORS = [
  "primary",
  "secondary",
  "neutral",
  "error",
  "success",
  "warning",
  "info",
] as const;

export function FullThemeShowcase() {
  const [isDark, setIsDark] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [radioVal, setRadioVal] = useState("opt1");
  const [multiTags, setMultiTags] = useState(["OpenWay", "DarkTheme", "v2.0"]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [collapseVariantFilter, setCollapseVariantFilter] = useState<string>("all");

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light");
      root.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  const breadcrumbItems = [
    { label: "Trang chủ", href: "#" },
    { label: "Hệ thống", href: "#" },
    { label: "Báo cáo Dark Mode" },
  ];

  return (
    <div
      className={`${
        isDark ? "dark" : ""
      } min-h-screen bg-neutral-white text-neutral-900 transition-colors duration-200`}
    >
      {/* 1. STICKY TOP HEADER WITH THEME SWITCH & QUICK JUMP */}
      <header className="sticky top-0 z-50 px-8 py-3.5 backdrop-blur-md bg-neutral-white/90 border-b border-neutral-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-bold tracking-tight">
              🎨 OpenWay UI — Full Matrix Showcase
            </h1>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                isDark
                  ? "bg-primary-950/80 text-primary-300 border-primary-800/60"
                  : "bg-primary-50 text-primary-700 border-primary-200"
              }`}
            >
              {isDark ? "🌙 Dark Theme" : "☀️ Light Theme"}
            </span>
          </div>
          <nav className="flex items-center gap-2 mt-1 overflow-x-auto text-xs text-neutral-500">
            <a href="#breadcrumb" className="hover:text-primary-500 transition-colors">Breadcrumb</a>
            <span>•</span>
            <a href="#button" className="hover:text-primary-500 transition-colors">Button</a>
            <span>•</span>
            <a href="#carousel" className="hover:text-primary-500 transition-colors">Carousel</a>
            <span>•</span>
            <a href="#checkbox" className="hover:text-primary-500 transition-colors">Checkbox</a>
            <span>•</span>
            <a href="#collapse" className="hover:text-primary-500 transition-colors">Collapse</a>
            <span>•</span>
            <a href="#confirm" className="hover:text-primary-500 transition-colors">Confirm</a>
            <span>•</span>
            <a href="#datepicker" className="hover:text-primary-500 transition-colors">DatePicker</a>
            <span>•</span>
            <a href="#input" className="hover:text-primary-500 transition-colors">Input</a>
            <span>•</span>
            <a href="#textarea" className="hover:text-primary-500 transition-colors">TextArea</a>
            <span>•</span>
            <a href="#radio" className="hover:text-primary-500 transition-colors">Radio</a>
            <span>•</span>
            <a href="#modal" className="hover:text-primary-500 transition-colors">Modal</a>
          </nav>
        </div>

        <button
          data-testid="theme-toggle-btn"
          onClick={() => setIsDark(!isDark)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all shadow-md active:scale-95 border shrink-0 ${
            isDark
              ? "bg-neutral-800 hover:bg-neutral-700 text-neutral-white border-neutral-600 ring-2 ring-primary-500/30"
              : "bg-neutral-white hover:bg-neutral-100 text-neutral-900 border-neutral-300 ring-2 ring-primary-500/20"
          }`}
        >
          {isDark ? (
            <>
              <span className="text-base">☀️</span>
              <span>Chuyển sang <strong>Light Theme</strong></span>
            </>
          ) : (
            <>
              <span className="text-base">🌙</span>
              <span>Chuyển sang <strong>Dark Theme</strong></span>
            </>
          )}
        </button>
      </header>

      {/* MAIN CONTAINER */}
      <main className="p-8 space-y-12 max-w-7xl mx-auto">
        {/* ================= 1. BREADCRUMB ================= */}
        <section id="breadcrumb" className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/40 space-y-6">
          <div className="border-b border-neutral-200/60 pb-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-primary-500">
              1. Breadcrumb (Variants: standard, solid, bordered & Colors)
            </h2>
            <p className="text-xs text-neutral-500">
              Đường dẫn phân cấp rõ ràng trên nền tối, chữ sáng và các khối viền/nền tương thích Dark Mode.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-neutral-500 mb-2">Variant: STANDARD (Mặc định)</p>
              <div className="flex flex-col gap-3">
                {SEMANTIC_COLORS.map((col) => (
                  <Breadcrumb key={col} items={breadcrumbItems} variant="standard" color={col} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-500 mb-2">Variant: SOLID (Pill background)</p>
              <div className="flex flex-col gap-3">
                <Breadcrumb items={breadcrumbItems} variant="solid" color="neutral" />
                <Breadcrumb items={breadcrumbItems} variant="solid" color="primary" />
                <Breadcrumb items={breadcrumbItems} variant="solid" color="success" />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-500 mb-2">Variant: BORDERED (Khung viền mảnh)</p>
              <div className="flex flex-col gap-3">
                <Breadcrumb items={breadcrumbItems} variant="bordered" color="neutral" />
                <Breadcrumb items={breadcrumbItems} variant="bordered" color="primary" />
                <Breadcrumb items={breadcrumbItems} variant="bordered" color="info" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. BUTTON ================= */}
        <section id="button" className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/40 space-y-6">
          <div className="border-b border-neutral-200/60 pb-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-primary-500">
              2. Button (5 Variants × 7 Semantic Colors)
            </h2>
            <p className="text-xs text-neutral-500">
              Các kiểu filled, soft, outline, ghost, text với độ tương phản cao, focus ring và hover mượt mà.
            </p>
          </div>

          {(["filled", "soft", "outline", "ghost", "text"] as const).map((v) => (
            <div key={v} className="space-y-2">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Variant: {v}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {SEMANTIC_COLORS.map((c) => (
                  <Button key={c} variant={v} color={c} size="sm">
                    {c} {v}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ================= 3. CAROUSEL ================= */}
        <section id="carousel" className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/40 space-y-6">
          <div className="border-b border-neutral-200/60 pb-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-primary-500">
              3. Carousel (Nav Variants: glass, filled, outline, ghost & Pagination)
            </h2>
            <p className="text-xs text-neutral-500">
              Khung trượt ảnh/thẻ nội dung với nền tối sâu, nút điều hướng kính mờ và phân trang dot/line.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-neutral-500 mb-2">Nav: GLASS (Kính mờ) + Dots Pagination</p>
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselSlide>
                    <div className="h-44 rounded-xl bg-linear-to-br from-primary-900 to-neutral-900 border border-primary-800/40 p-6 flex flex-col justify-end text-white">
                      <span className="text-xs text-primary-300 font-semibold">Khám phá</span>
                      <h4 className="text-lg font-bold">Slide 1: Giao diện Tối ưu Dark Mode</h4>
                    </div>
                  </CarouselSlide>
                  <CarouselSlide>
                    <div className="h-44 rounded-xl bg-linear-to-br from-secondary-900 to-neutral-900 border border-secondary-800/40 p-6 flex flex-col justify-end text-white">
                      <span className="text-xs text-secondary-300 font-semibold">Trải nghiệm</span>
                      <h4 className="text-lg font-bold">Slide 2: Thiết kế Tương phản Cao</h4>
                    </div>
                  </CarouselSlide>
                  <CarouselSlide>
                    <div className="h-44 rounded-xl bg-linear-to-br from-neutral-800 to-neutral-900 border border-neutral-700/40 p-6 flex flex-col justify-end text-white">
                      <span className="text-xs text-neutral-400 font-semibold">Tốc độ</span>
                      <h4 className="text-lg font-bold">Slide 3: Hiệu năng mượt mà 60 FPS</h4>
                    </div>
                  </CarouselSlide>
                </CarouselContent>
                <CarouselPrevious variant="glass" />
                <CarouselNext variant="glass" />
                <CarouselPagination type="dots" />
              </Carousel>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-500 mb-2">Nav: OUTLINE + Line Pagination</p>
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselSlide>
                    <div className="h-44 rounded-xl bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between">
                      <span className="text-xs text-neutral-500 font-mono">PANEL CARD #1</span>
                      <p className="text-sm text-neutral-700">Tích hợp sẵn các theme tokens Notion UI mượt mà.</p>
                    </div>
                  </CarouselSlide>
                  <CarouselSlide>
                    <div className="h-44 rounded-xl bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between">
                      <span className="text-xs text-neutral-500 font-mono">PANEL CARD #2</span>
                      <p className="text-sm text-neutral-700">Dễ dàng trượt ngang và cảm ứng trên thiết bị di động.</p>
                    </div>
                  </CarouselSlide>
                </CarouselContent>
                <CarouselPrevious variant="outline" />
                <CarouselNext variant="outline" />
                <CarouselPagination type="line" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* ================= 4. CHECKBOX ================= */}
        <section id="checkbox" className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/40 space-y-6">
          <div className="border-b border-neutral-200/60 pb-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-primary-500">
              4. Checkbox (Variants: filled, outline, soft & 7 Colors)
            </h2>
            <p className="text-xs text-neutral-500">
              Các trạng thái Checked, Unchecked, Indeterminate, Disabled trên nền Dark.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-semibold text-neutral-500 mb-3">Variant: FILLED (Mặc định)</p>
              <div className="flex flex-col gap-2.5">
                {SEMANTIC_COLORS.map((c) => (
                  <Checkbox key={c} variant="filled" color={c} defaultChecked label={`Checkbox ${c}`} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-500 mb-3">Variant: OUTLINE</p>
              <div className="flex flex-col gap-2.5">
                {SEMANTIC_COLORS.map((c) => (
                  <Checkbox key={c} variant="outline" color={c} defaultChecked label={`Outline ${c}`} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-500 mb-3">Variant: SOFT & Trạng thái đặc biệt</p>
              <div className="flex flex-col gap-2.5">
                <Checkbox variant="soft" color="primary" defaultChecked label="Soft Primary" />
                <Checkbox variant="soft" color="success" defaultChecked label="Soft Success" />
                <Checkbox variant="filled" color="primary" defaultChecked disabled label="Disabled Checked" />
                <Checkbox variant="filled" color="neutral" disabled label="Disabled Unchecked" />
                <Checkbox variant="filled" color="error" config={{ isInvalid: true }} label="Invalid Checkbox" errorMessage="Trường này là bắt buộc" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= 5. COLLAPSE ================= */}
        <section id="collapse" className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/40 space-y-6">
          <div className="border-b border-neutral-200/60 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold uppercase tracking-wider text-primary-500">
                5. Collapse / Accordion (Tất cả 7 màu: primary, secondary, neutral, error, success, warning, info)
              </h2>
              <p className="text-xs text-neutral-500">
                Hiển thị đầy đủ tất cả 7 bảng màu sắc cho cả 4 biến thể (Outlined, Filled, Separated, Ghost) trong Light và Dark theme.
              </p>
            </div>

            {/* Variant Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setCollapseVariantFilter("all")}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  collapseVariantFilter === "all"
                    ? "bg-primary-600 text-white shadow-xs"
                    : "bg-neutral-100 dark:bg-neutral-200 text-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-300"
                }`}
              >
                Tất cả (28)
              </button>
              {(
                [
                  { key: "outlined", label: "Outlined" },
                  { key: "filled", label: "Filled" },
                  { key: "separated", label: "Separated" },
                  { key: "ghost", label: "Ghost" },
                ] as const
              ).map((v) => (
                <button
                  key={v.key}
                  type="button"
                  onClick={() => setCollapseVariantFilter(v.key)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize transition-all cursor-pointer ${
                    collapseVariantFilter === v.key
                      ? "bg-primary-600 text-white shadow-xs"
                      : "bg-neutral-100 dark:bg-neutral-200 text-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-300"
                  }`}
                >
                  {v.label} (7 màu)
                </button>
              ))}
            </div>
          </div>

          {(
            [
              {
                key: "outlined",
                label: "Outlined",
                desc: "Khung viền ngoài và vạch phân chia mang sắc thái màu chủ đề",
              },
              {
                key: "filled",
                label: "Filled",
                desc: "Nền khối màu nhẹ liền mạch, header nổi bật khi mở rộng",
              },
              {
                key: "separated",
                label: "Separated",
                desc: "Từng panel là một thẻ riêng biệt với viền màu chủ đề",
              },
              {
                key: "ghost",
                label: "Ghost",
                desc: "Trong suốt tối giản, vạch ngăn cách mỏng tinh tế",
              },
            ] as const
          )
            .filter((v) => collapseVariantFilter === "all" || collapseVariantFilter === v.key)
            .map((v) => (
              <div key={v.key} className="space-y-3 pt-3 first:pt-0">
                <div className="flex items-center gap-2 border-b border-neutral-200/60 pb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                    Biến thể: {v.label}
                  </span>
                  <span className="text-xs text-neutral-500">— {v.desc}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {SEMANTIC_COLORS.map((c) => (
                    <div key={`${v.key}-${c}`} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wide text-neutral-800 dark:text-neutral-200">
                          {c}
                        </span>
                        <span className="text-[0.625rem] px-1.5 py-0.5 rounded font-mono bg-neutral-100 dark:bg-neutral-200 text-neutral-600 dark:text-neutral-400">
                          {v.key} • {c}
                        </span>
                      </div>
                      <Collapse
                        variant={v.key}
                        color={c}
                        defaultActiveKey={[`${v.key}-${c}-1`]}
                      >
                        <CollapsePanel
                          value={`${v.key}-${c}-1`}
                          label={`Panel ${c.toUpperCase()}`}
                          description="Trạng thái đang mở"
                        >
                          Nội dung màu {c} với biến thể {v.key} hiển thị rõ nét trên nền Dark/Light theme.
                        </CollapsePanel>
                        <CollapsePanel
                          value={`${v.key}-${c}-2`}
                          label="Panel phụ (Đóng)"
                          description="Nhấp để xem hiệu ứng"
                        >
                          Nội dung chi tiết của panel phụ khi được người dùng click mở rộng.
                        </CollapsePanel>
                      </Collapse>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </section>

        {/* ================= 6. CONFIRM DIALOG ================= */}
        <section id="confirm" className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/40 space-y-6">
          <div className="border-b border-neutral-200/60 pb-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-primary-500">
              6. Confirm Dialog (7 Colors: warning, error, primary, etc.)
            </h2>
            <p className="text-xs text-neutral-500">
              Hộp thoại xác nhận hành động hiển thị sắc nét, icon badge màu nổi và các nút bấm tương phản tốt.
            </p>
          </div>

          {/* Trigger button for interactive overlay test */}
          <div className="flex items-center gap-4">
            <Button
              color="error"
              variant="filled"
              onClick={() => setIsConfirmOpen(true)}
            >
              Mở Confirm Dialog Modal (Xóa dữ liệu)
            </Button>
            <span className="text-xs text-neutral-500">← Bấm để test hiển thị Confirm dạng Overlay Backdrop</span>
          </div>

          {/* Static Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Confirm color="warning" size="md">
              <ConfirmHeader title="Cảnh báo thay đổi cấu hình" />
              <ConfirmBody>
                Hành động này sẽ tạm dừng dịch vụ trong 30 giây để cập nhật index. Bạn có chắc chắn muốn tiếp tục?
              </ConfirmBody>
              <ConfirmFooter confirmText="Xác nhận thay đổi" cancelText="Hủy bỏ" />
            </Confirm>

            <Confirm color="error" size="md">
              <ConfirmHeader title="Xóa cơ sở dữ liệu vĩnh viễn" />
              <ConfirmBody>
                Cơ sở dữ liệu Production-DB sẽ bị xóa hoàn toàn và không thể khôi phục lại. Hãy cẩn trọng!
              </ConfirmBody>
              <ConfirmFooter confirmColor="error" confirmText="Xóa vĩnh viễn" cancelText="Giữ lại" />
            </Confirm>
          </div>

          {/* Interactive Modal Confirm Container */}
          <ConfirmContainer
            open={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            color="error"
            size="md"
          >
            <ConfirmHeader title="Xác nhận xóa tài khoản quản trị" />
            <ConfirmBody>
              Tài khoản này sẽ mất toàn bộ quyền truy cập vào các server database.
            </ConfirmBody>
            <ConfirmFooter
              confirmColor="error"
              confirmText="Xác nhận xóa"
              cancelText="Hủy"
              onConfirm={() => setIsConfirmOpen(false)}
              onCancel={() => setIsConfirmOpen(false)}
            />
          </ConfirmContainer>
        </section>

        {/* ================= 7. DATEPICKER & CALENDAR ================= */}
        <section id="datepicker" className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/40 space-y-6">
          <div className="border-b border-neutral-200/60 pb-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-primary-500">
              7. DatePicker & Calendar (Inline Calendar & Popover Input)
            </h2>
            <p className="text-xs text-neutral-500">
              Lưới lịch xem ngày/tháng/năm hiển thị rõ ràng, ngày hôm nay, ngày đang chọn và hover đều chuẩn tông Dark.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                DatePicker Inputs (Outline & Filled)
              </p>
              <DatePicker
                label="Chọn ngày bắt đầu"
                color="primary"
                variant="outline"
                defaultValue={new Date()}
              />
              <DatePicker
                label="Chọn ngày kết thúc (Filled)"
                color="neutral"
                variant="filled"
                defaultValue={new Date()}
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                Inline Calendar (Hiển thị trực tiếp trên giao diện)
              </p>
              <div className="inline-block p-2 rounded-2xl border border-neutral-200 bg-neutral-50/30">
                <Calendar
                  value={selectedDate}
                  onChange={(d) => setSelectedDate(d)}
                  color="primary"
                  size="md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= 8. INPUT ================= */}
        <section id="input" className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/40 space-y-6">
          <div className="border-b border-neutral-200/60 pb-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-primary-500">
              8. Input (Variants: outline, filled, ghost & Types: text, password, number, multi)
            </h2>
            <p className="text-xs text-neutral-500">
              Nền ô nhập liệu không bị chói lóa, chữ rõ nét, viền mờ tinh tế và hỗ trợ đầy đủ các kiểu input.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Variant: OUTLINE</p>
              <Input variant="outline" color="primary" label="Họ và tên" defaultValue="Nguyễn Văn A" />
              <PasswordInput variant="outline" color="primary" label="Mật khẩu" defaultValue="Secret@1234" />
              <NumberInput variant="outline" color="primary" label="Cổng kết nối (Port)" defaultValue={5432} />
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Variant: FILLED</p>
              <Input variant="filled" color="neutral" label="Email liên hệ" defaultValue="dev@openway.vn" />
              <PasswordInput variant="filled" color="neutral" label="Khóa API bí mật" defaultValue="api-key-999" />
              <Input
                variant="filled"
                color="error"
                label="Mã định danh"
                defaultValue="ERR_SYNTAX"
                config={{ isInvalid: true }}
                errorMessage="Mã không đúng định dạng"
              />
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">MultiInput (Thẻ Tags)</p>
              <MultiInput
                variant="outline"
                color="primary"
                label="Tags nhãn hệ thống"
                value={multiTags}
                onChange={setMultiTags}
              />
              <Input variant="ghost" color="primary" label="Ghost Input (Không viền)" defaultValue="Chế độ tối giản" />
            </div>
          </div>
        </section>

        {/* ================= 9. TEXTAREA ================= */}
        <section id="textarea" className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/40 space-y-6">
          <div className="border-b border-neutral-200/60 pb-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-primary-500">
              9. TextArea (Variants: outline, filled, ghost & AutoResize)
            </h2>
            <p className="text-xs text-neutral-500">
              Khung nhập văn bản nhiều dòng, hỗ trợ đếm ký tự (showCount), tự co giãn và báo lỗi trong Dark Mode.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TextArea
              variant="outline"
              color="primary"
              label="Mô tả dự án (Outline)"
              defaultValue="Dự án OpenWay UI hỗ trợ đầy đủ chế độ sáng tối chuẩn WCAG AAA."
              config={{ showCount: true }}
              maxLength={200}
            />

            <TextArea
              variant="filled"
              color="neutral"
              label="Ghi chú cấu hình (Filled)"
              defaultValue="Các thông số worker pool và timeout đã được áp dụng tự động."
              config={{ showCount: true }}
              maxLength={200}
            />

            <TextArea
              variant="outline"
              color="error"
              label="Báo cáo sự cố (Invalid)"
              defaultValue="Lỗi kết nối timeout khi ping đến gateway."
              config={{ isInvalid: true }}
              errorMessage="Vui lòng mô tả chi tiết ít nhất 20 ký tự."
            />
          </div>
        </section>

        {/* ================= 10. RADIO ================= */}
        <section id="radio" className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/40 space-y-6">
          <div className="border-b border-neutral-200/60 pb-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-primary-500">
              10. Radio & RadioGroup (Variants: filled, outline, soft & 7 Colors)
            </h2>
            <p className="text-xs text-neutral-500">
              Nút chọn một phương án với chấm tròn tương phản rõ nét và nhãn đọc tốt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-semibold text-neutral-500 mb-3">Variant: FILLED (Mặc định)</p>
              <div className="flex flex-col gap-2.5">
                {SEMANTIC_COLORS.map((c) => (
                  <Radio key={c} variant="filled" color={c} checked={radioVal === c} onChange={() => setRadioVal(c)} label={`Radio ${c}`} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-500 mb-3">Variant: OUTLINE</p>
              <div className="flex flex-col gap-2.5">
                {SEMANTIC_COLORS.map((c) => (
                  <Radio key={c} variant="outline" color={c} defaultChecked label={`Outline ${c}`} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-500 mb-3">Variant: SOFT & Trạng thái</p>
              <div className="flex flex-col gap-2.5">
                <Radio variant="soft" color="primary" defaultChecked label="Soft Primary" />
                <Radio variant="soft" color="success" defaultChecked label="Soft Success" />
                <Radio variant="filled" color="primary" defaultChecked disabled label="Disabled Checked" />
                <Radio variant="filled" color="neutral" disabled label="Disabled Unchecked" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= 11. MODAL ================= */}
        <section id="modal" className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/40 space-y-6">
          <div className="border-b border-neutral-200/60 pb-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-primary-500">
              11. Modal (Static Compound Card & Interactive Container Overlay)
            </h2>
            <p className="text-xs text-neutral-500">
              Khung hộp thoại Modal với Header, Body, Footer, nút đóng X và nền mờ overlay chuẩn Dark Theme.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              color="primary"
              variant="filled"
              onClick={() => setIsModalOpen(true)}
            >
              Mở Modal Hộp Thoại (Interactive Overlay)
            </Button>
            <span className="text-xs text-neutral-500">← Bấm để test lớp kính mờ Backdrop Backdrop của Modal</span>
          </div>

          {/* Static Preview Modal Dialog Box */}
          <div className="max-w-xl">
            <p className="text-xs font-semibold text-neutral-500 mb-2">Static Modal Preview (Hiển thị tĩnh)</p>
            <Modal size="md">
              <ModalHeader title="Thông tin người dùng hệ thống">
                <ModalClose />
              </ModalHeader>
              <ModalBody>
                <div className="space-y-3">
                  <p className="text-sm text-neutral-700">
                    Chào mừng bạn đến với bảng điều khiển OpenWay UI. Tất cả các thành phần giao diện đều hỗ trợ Dark Theme tự nhiên.
                  </p>
                  <div className="p-3 rounded-lg border border-neutral-200 bg-neutral-50/60 text-xs text-neutral-600">
                    Môi trường: Production • Phiên bản: v2.4.0 • Node: node-worker-01
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex items-center justify-end gap-2.5">
                  <Button variant="outline" color="secondary" size="sm">
                    Đóng lại
                  </Button>
                  <Button variant="filled" color="primary" size="sm">
                    Lưu thay đổi
                  </Button>
                </div>
              </ModalFooter>
            </Modal>
          </div>

          {/* Interactive Modal Container with backdrop */}
          <ModalContainer
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            size="md"
          >
            <ModalHeader title="Hộp thoại Modal tương tác">
              <ModalClose />
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-neutral-700">
                Đây là hộp thoại Modal với lớp phủ Backdrop (Overlay) làm mờ hậu cảnh trong Dark Mode.
              </p>
            </ModalBody>
            <ModalFooter>
              <div className="flex items-center justify-end gap-2.5">
                <Button variant="outline" color="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
                  Hủy bỏ
                </Button>
                <Button variant="filled" color="primary" size="sm" onClick={() => setIsModalOpen(false)}>
                  Đồng ý
                </Button>
              </div>
            </ModalFooter>
          </ModalContainer>
        </section>
      </main>
    </div>
  );
}

describe("<FullThemeShowcase />", () => {
  beforeEach(() => {
    cy.viewport(1440, 950);
    cy.mount(<FullThemeShowcase />);
  });

  it("Hiển thị đầy đủ 11 components trong Dark Mode và chuyển đổi mượt mà sang Light Mode", () => {
    cy.get("html").should("have.class", "dark");
    cy.contains("OpenWay UI — Full Matrix Showcase").should("be.visible");

    // Click nút chuyển theme -> sang Light
    cy.get("[data-testid='theme-toggle-btn']").click();
    cy.get("html").should("not.have.class", "dark");
    cy.contains("Light Theme Active").should("be.visible");

    // Click lần nữa -> quay lại Dark
    cy.get("[data-testid='theme-toggle-btn']").click();
    cy.get("html").should("have.class", "dark");
    cy.contains("Dark Theme Active").should("be.visible");
  });
});
