import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Select, MultiSelect } from "./index";
import { useSelectInfiniteQuery } from "../../query";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import {
  SelectOptionItem,
  SelectFilterField,
  SelectSize,
  SelectColor,
  SelectVariant,
  SelectRadius,
  LabelPlacement,
} from "./types";
import { Button } from "@/components/button";
import { ModalContainer, Modal, ModalBody, ModalHeader } from "@/components/modal";

// ==========================================
// MOCK DATA
// ==========================================
const fruitsOptions: SelectOptionItem[] = [
  { value: "apple", label: "Táo (Apple)", description: "Trái cây ngọt giòn giàu chất xơ" },
  { value: "banana", label: "Chuối (Banana)", description: "Giàu kali và năng lượng tự nhiên" },
  { value: "orange", label: "Cam (Orange)", description: "Nhiều vitamin C tăng sức đề kháng" },
  { value: "grape", label: "Nho (Grape)", description: "Vị ngọt thanh dịu mát" },
  { value: "mango", label: "Xoài (Mango)", description: "Thơm ngọt đậm đà hương vị nhiệt đới" },
  { value: "watermelon", label: "Dưa hấu (Watermelon)", description: "Mọng nước giải nhiệt", disabled: true },
  { value: "strawberry", label: "Dâu tây (Strawberry)", description: "Chua ngọt thơm ngon" },
  { value: "avocado", label: "Bơ (Avocado)", description: "Béo ngậy tốt cho tim mạch" },
];

const countryOptions: SelectOptionItem[] = [
  { value: "vn", label: "Việt Nam", description: "Hà Nội (+84)" },
  { value: "us", label: "Hoa Kỳ (United States)", description: "Washington D.C (+1)" },
  { value: "jp", label: "Nhật Bản (Japan)", description: "Tokyo (+81)" },
  { value: "kr", label: "Hàn Quốc (South Korea)", description: "Seoul (+82)" },
  { value: "sg", label: "Singapore", description: "Singapore (+65)" },
  { value: "de", label: "Đức (Germany)", description: "Berlin (+49)" },
  { value: "fr", label: "Pháp (France)", description: "Paris (+33)" },
  { value: "uk", label: "Vương Quốc Anh (United Kingdom)", description: "London (+44)" },
];

interface UserItemData {
  avatar: string;
  role: string;
  email: string;
}

const userOptions: SelectOptionItem<UserItemData>[] = [
  {
    value: "u1",
    label: "Nguyễn Văn An",
    data: { avatar: "👨‍💻", role: "Frontend Lead", email: "an.nguyen@example.com" },
  },
  {
    value: "u2",
    label: "Trần Thị Bích",
    data: { avatar: "👩‍🎨", role: "UI/UX Designer", email: "bich.tran@example.com" },
  },
  {
    value: "u3",
    label: "Lê Hoàng Long",
    data: { avatar: "👨‍🚀", role: "DevOps Engineer", email: "long.le@example.com" },
  },
  {
    value: "u4",
    label: "Phạm Minh Đức",
    data: { avatar: "🕵️‍♂️", role: "QA Engineer", email: "duc.pham@example.com" },
  },
];

interface FruitData {
  category: string;
  origin: string;
  inStock: boolean;
  expiryDate: string;
  harvestDate: string;
}

const now = new Date();
const curYear = now.getFullYear();
const curMonth = String(now.getMonth() + 1).padStart(2, "0");

const filterCatalogOptions: SelectOptionItem<FruitData>[] = [
  {
    value: "1",
    label: "Cam sành Hàm Yên",
    data: { category: "vitamin", origin: "vn", inStock: true, expiryDate: `20/${curMonth}/${curYear}`, harvestDate: `01/${curMonth}/${curYear}` },
  },
  {
    value: "2",
    label: "Táo Envy New Zealand",
    data: { category: "sweet", origin: "import", inStock: true, expiryDate: `25/${curMonth}/${curYear}`, harvestDate: "15/01/2020" },
  },
  {
    value: "3",
    label: "Xoài cát Hòa Lộc",
    data: { category: "sweet", origin: "vn", inStock: true, expiryDate: `10/${curMonth}/${curYear}`, harvestDate: `02/${curMonth}/${curYear}` },
  },
  {
    value: "4",
    label: "Bưởi da xanh Bến Tre",
    data: { category: "vitamin", origin: "vn", inStock: false, expiryDate: "01/01/2030", harvestDate: "20/01/2020" },
  },
  {
    value: "5",
    label: "Nho mẫu đơn Nhật Bản",
    data: { category: "sweet", origin: "import", inStock: true, expiryDate: `15/${curMonth}/${curYear}`, harvestDate: `05/${curMonth}/${curYear}` },
  },
  {
    value: "6",
    label: "Dâu tây Đà Lạt",
    data: { category: "vitamin", origin: "vn", inStock: true, expiryDate: `05/${curMonth}/${curYear}`, harvestDate: `03/${curMonth}/${curYear}` },
  },
];

const menuFiltersConfig: SelectFilterField<unknown>[] = [
  {
    name: "subSearch",
    type: "string",
    label: "Tìm nhanh tên",
    placeholder: "Nhập từ khóa...",
  },
  {
    name: "category",
    type: "checkbox-group",
    label: "Đặc tính",
    options: [
      { label: "Giàu Vitamin", value: "vitamin" },
      { label: "Vị ngọt", value: "sweet" },
    ],
  },
  {
    name: "expiryDate",
    type: "date",
    label: "Hạn sử dụng",
    placeholder: "Chọn ngày hết hạn...",
  },
  {
    name: "harvestStart",
    endName: "harvestEnd",
    type: "date-range",
    label: "Khoảng thu hoạch",
    placeholder: "Chọn khoảng ngày...",
  },
];

// ==========================================
// ALL-IN-ONE SHOWCASE HARNESS COMPONENT
// ==========================================
interface HarnessProps {
  onSingleChange?: (val: string | number | null) => void;
  onMultiChange?: (vals: (string | number)[], items?: SelectOptionItem[]) => void;
}

const SelectComprehensiveShowcase = ({ onSingleChange, onMultiChange }: HarnessProps) => {
  // Interactive states
  const [singleVal, setSingleVal] = useState<string | number | null>("apple");
  const [singleSearchVal, setSingleSearchVal] = useState<string | number | null>(null);
  const [multiVal, setMultiVal] = useState<(string | number)[]>(["apple", "banana"]);
  const [customRenderVal, setCustomRenderVal] = useState<string | number | null>("u1");

  const [serverOptions, setServerOptions] = useState<SelectOptionItem[]>([
    { value: 1, label: "Emily Johnson" },
    { value: 2, label: "Michael Williams" },
  ]);
  const [serverLoading, setServerLoading] = useState(false);
  const [serverVal, setServerVal] = useState<(string | number)[]>([1]);

  const { debounced: debouncedServerSearch } = useDebouncedCallback((query: string) => {
    if (!query) return;
    setServerLoading(true);
    fetch(`https://dummyjson.com/users/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data: { users?: { id: number; firstName: string; lastName: string }[] }) => {
        const mapped = (data.users || []).map((u) => ({
          value: u.id,
          label: `${u.firstName} ${u.lastName}`,
        }));
        setServerOptions(mapped);
        setServerLoading(false);
      })
      .catch(() => {
        setServerLoading(false);
      });
  }, 100);

  const sizes: SelectSize[] = ["xs", "sm", "md", "lg", "xl"];
  const colors: SelectColor[] = ["primary", "secondary", "success", "warning", "error", "info", "neutral"];
  const variants: SelectVariant[] = ["outline", "filled", "ghost"];
  const radii: SelectRadius[] = ["none", "sm", "md", "lg", "xl", "full"];
  const placements: LabelPlacement[] = ["top", "left", "floating"];

  return (
    <div className="p-8 space-y-12 max-w-6xl mx-auto bg-neutral-50 text-neutral-900 min-h-screen">
      {/* HEADER */}
      <header className="border-b border-neutral-200 pb-5">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Select Component Showcase & Interactive Playground
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Harness tổng hợp đầy đủ mọi kích thước (Sizes), biến thể (Variants), màu sắc (Colors), bo góc (Radius), layout
          và kịch bản tìm kiếm Client/Server.
        </p>
      </header>

      {/* 1. SIZES SHOWCASE (SINGLE & MULTI) */}
      <section className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">1. Kích thước (Sizes: xs, sm, md, lg, xl)</h2>
          <p className="text-xs text-neutral-500">Đầy đủ 5 kích thước hỗ trợ cả Single Select và Multi-Select Badges</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Single Select theo Size</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end">
            {sizes.map((s) => (
              <Select
                key={`single-size-${s}`}
                size={s}
                label={`Size: ${s}`}
                options={fruitsOptions}
                defaultValue="apple"
                config={{ isClearable: true }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Multi Select theo Size</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <MultiSelect
              size="sm"
              label="Size sm (Multi Tags)"
              options={fruitsOptions}
              defaultValue={["apple", "orange"]}
            />
            <MultiSelect
              size="md"
              label="Size md (Multi Tags)"
              options={fruitsOptions}
              defaultValue={["banana", "grape"]}
            />
            <MultiSelect
              size="lg"
              label="Size lg (Multi Tags)"
              options={fruitsOptions}
              defaultValue={["mango", "apple"]}
            />
          </div>
        </div>
      </section>

      {/* 2. VARIANTS & ALL 7 COLORS MATRIX */}
      <section className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">2. Ma trận Biến thể & 7 Màu sắc (Variants x Colors)</h2>
          <p className="text-xs text-neutral-500">
            3 biến thể (outline, filled, ghost) kết hợp cùng 7 theme màu tiêu chuẩn
          </p>
        </div>

        <div className="space-y-6">
          {variants.map((v) => (
            <div
              key={`variant-sec-${v}`}
              className="space-y-3 bg-white p-4 rounded-xl border border-neutral-200 shadow-xs"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary-700">Biến thể: {v}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {colors.map((c) => (
                  <Select
                    key={`${v}-${c}`}
                    size="sm"
                    variant={v}
                    color={c}
                    label={c}
                    options={fruitsOptions}
                    defaultValue="banana"
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Multi Select for all 7 Colors */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-700">
              Multi-Select theo 7 Màu sắc (Màu Badge & Viền Trigger đồng bộ)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {colors.map((c) => (
                <MultiSelect
                  key={`multi-color-${c}`}
                  size="sm"
                  color={c}
                  label={`Color: ${c}`}
                  options={fruitsOptions}
                  defaultValue={["apple", "banana"]}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. RADII SHOWCASE */}
      <section className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">3. Độ bo góc (Radii: none, sm, md, lg, xl, full)</h2>
          <p className="text-xs text-neutral-500">
            Trigger box nhận đầy đủ mọi mức bo góc, popup menu vẫn giữ chuẩn mực vuông vắn
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {radii.map((r) => (
            <Select
              key={`radius-${r}`}
              radius={r}
              label={`Radius: ${r}`}
              options={fruitsOptions}
              defaultValue="orange"
            />
          ))}
        </div>
      </section>

      {/* 4. LABEL PLACEMENTS & FORM LAYOUTS */}
      <section className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">4. Vị trí Nhãn & Form Layouts (Label Placements)</h2>
          <p className="text-xs text-neutral-500">Hỗ trợ 3 vị trí nhãn: top, left (ngang) và floating</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-5 rounded-xl border border-neutral-200">
          {placements.map((p) => (
            <Select
              key={`placement-${p}`}
              labelPlacement={p}
              label={`Nhãn kiểu ${p}`}
              placeholder="Chọn quốc gia..."
              options={countryOptions}
              defaultValue="vn"
              helperText={`Đang áp dụng labelPlacement='${p}'`}
            />
          ))}
        </div>
      </section>

      {/* 5. STATES (Disabled, ReadOnly, Invalid, Loading, Clearable) */}
      <section className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">5. Các trạng thái (States)</h2>
          <p className="text-xs text-neutral-500">Disabled, ReadOnly, Lỗi (Validation Error), Loading indicator</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Trạng thái Disabled"
            options={fruitsOptions}
            defaultValue="apple"
            isDisabled
            helperText="Không thể tương tác"
          />
          <Select
            label="Trạng thái ReadOnly"
            options={fruitsOptions}
            defaultValue="banana"
            readOnly
            helperText="Chỉ xem giá trị"
          />
          <Select
            label="Trạng thái Báo lỗi (Invalid)"
            options={fruitsOptions}
            defaultValue="orange"
            config={{ isInvalid: true }}
            errorMessage="Mục đã chọn không khả dụng"
          />
          <Select
            label="Trạng thái Đang tải (Loading)"
            options={fruitsOptions}
            defaultValue="grape"
            config={{ isLoading: true, showSpinner: true }}
            helperText="Đang đồng bộ dữ liệu..."
          />
        </div>
      </section>

      {/* 6. ICONS & CUSTOM OPTION / HEADER / FOOTER */}
      <section className="space-y-6">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-bold text-neutral-800">6. Tùy biến Icon, Render Option, Header & Footer</h2>
          <p className="text-xs text-neutral-500">
            Tích hợp startContent, endContent, menuHeader, menuFooter và custom item render
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Custom Avatar + Role Render */}
          <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-3">
            <h3 className="text-sm font-bold text-neutral-700">Custom User Option Renderer</h3>
            <Select<UserItemData>
              label="Chọn thành viên dự án"
              placeholder="Chọn nhân sự..."
              options={userOptions}
              value={customRenderVal}
              onChange={(next) => setCustomRenderVal(next as string)}
              renderOption={(opt, { selected }) => {
                const uData = opt.data;
                return (
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      selected ? "bg-primary-50 text-primary-900" : "hover:bg-neutral-100"
                    }`}
                  >
                    <span className="text-2xl">{uData?.avatar}</span>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-sm font-medium">{opt.label}</span>
                      <span className="text-xs text-neutral-500">{uData?.email}</span>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700 font-medium">
                      {uData?.role}
                    </span>
                  </div>
                );
              }}
            />
          </div>

          {/* Menu with Header & Footer */}
          <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-3">
            <h3 className="text-sm font-bold text-neutral-700">Menu với Custom Header & Footer Action</h3>
            <Select
              label="Chọn quốc gia đối tác"
              options={countryOptions}
              defaultValue="vn"
              startContent={<span className="text-base">🌐</span>}
              menuHeader={
                <div className="p-2 bg-neutral-100/70 border-b border-neutral-200 text-xs font-semibold text-neutral-600 flex justify-between items-center">
                  <span>DANH SÁCH QUỐC GIA</span>
                  <span className="text-[10px] text-neutral-400">8 quốc gia</span>
                </div>
              }
              menuFooter={
                <div className="p-2 bg-neutral-50 border-t border-neutral-200 flex justify-between items-center">
                  <Button size="xs" variant="ghost" className="text-xs text-primary-600 hover:text-primary-700">
                    + Thêm quốc gia mới
                  </Button>
                  <span className="text-[10px] text-neutral-400">Hỗ trợ 24/7</span>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE PLAYGROUND SECTIONS (TARGETED BY CYPRESS TESTS) */}
      <section className="space-y-6 pt-4 border-t-2 border-primary-200">
        <h2 className="text-2xl font-black text-primary-800">7. Interactive Testing Workflows</h2>

        {/* 7.1 Single Select Interactive */}
        <div
          id="section-single-select"
          className="p-5 bg-white rounded-xl border-2 border-neutral-200 shadow-sm space-y-3"
        >
          <h3 className="text-base font-bold text-neutral-800">
            7.1 Single Select Interactive (Clearable & Selection)
          </h3>
          <div className="max-w-md">
            <Select
              id="test-single-select"
              label="Chọn hoa quả"
              placeholder="Chọn hoa quả..."
              options={fruitsOptions}
              value={singleVal}
              config={{ isClearable: true }}
              helperText="Nhấn vào icon 'x' để xóa lựa chọn nhanh"
              onChange={(next) => {
                setSingleVal(next);
                onSingleChange?.(next);
              }}
            />
          </div>
        </div>

        {/* 7.2 Single Select with Search (Search 1 Option) */}
        <div
          id="section-single-search"
          className="p-5 bg-white rounded-xl border-2 border-neutral-200 shadow-sm space-y-3"
        >
          <h3 className="text-base font-bold text-neutral-800">7.2 Single Select Tìm kiếm 1 Option (Searchable)</h3>
          <div className="max-w-md">
            <Select
              id="test-single-search"
              searchable
              label="Tìm kiếm và chọn 1 hoa quả"
              placeholder="Gõ 'nho', 'xoai' để tìm..."
              options={fruitsOptions}
              value={singleSearchVal}
              config={{ isClearable: true }}
              helperText="Gõ trực tiếp trên ô chọn để lọc đúng 1 kết quả"
              onChange={(next) => setSingleSearchVal(next)}
            />
          </div>
        </div>

        {/* 7.3 Multi Select Interactive (Badges & Backspace) */}
        <div
          id="section-multi-select"
          className="p-5 bg-white rounded-xl border-2 border-neutral-200 shadow-sm space-y-3"
        >
          <h3 className="text-base font-bold text-neutral-800">
            7.3 Multi Select Interactive (Badges, Radius & Backspace Delete)
          </h3>

          <div className="max-w-lg">
            <MultiSelect
              id="test-multi-select"
              radius="full"
              searchable
              label="Chọn nhiều hoa quả (Pill Badges)"
              options={fruitsOptions}
              value={multiVal}
              maxTagCount={3}
              onChange={(next, items) => {
                setMultiVal(next);
                onMultiChange?.(next, items);
              }}
            />
          </div>
        </div>

        {/* 7.4 Multi Select Color Themes Interactive */}
        <div
          id="section-multi-colors"
          className="p-5 bg-white rounded-xl border-2 border-neutral-200 shadow-sm space-y-3"
        >
          <h3 className="text-base font-bold text-neutral-800">
            7.4 Multi Select Kiểm tra Màu sắc (Success, Error, Warning)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MultiSelect
              color="success"
              label="Success Theme Multi"
              options={fruitsOptions}
              defaultValue={["apple", "avocado"]}
            />
            <MultiSelect
              color="error"
              label="Error Theme Multi"
              options={fruitsOptions}
              defaultValue={["strawberry", "apple"]}
            />
            <MultiSelect
              color="warning"
              label="Warning Theme Multi"
              options={fruitsOptions}
              defaultValue={["banana", "mango"]}
            />
          </div>
        </div>

        {/* 7.3 Client Fuzzy Search & Empty State */}
        <div
          id="section-client-search"
          className="p-5 bg-white rounded-xl border-2 border-neutral-200 shadow-sm space-y-3"
        >
          <h3 className="text-base font-bold text-neutral-800">
            7.3 Client Fuzzy Search (Fuzzy Matching & Empty Component)
          </h3>
          <div className="max-w-md">
            <Select
              id="test-client-search"
              searchable
              searchMode="client"
              label="Tìm kiếm hoa quả (Fuzzy search)"
              placeholder="Gõ 'cam', 'tao' để tìm..."
              options={fruitsOptions}
            />
          </div>
        </div>

        {/* 7.4 Multi-Field Menu Filters */}
        <div
          id="section-menu-filters"
          className="p-5 bg-white rounded-xl border-2 border-neutral-200 shadow-sm space-y-3"
        >
          <h3 className="text-base font-bold text-neutral-800">
            7.4 Multi-Field Menu Filters (SubSearch + Checkbox Group + Reset)
          </h3>
          <div className="max-w-md">
            <Select
              id="test-menu-filters"
              label="Bộ lọc nông sản đa trường"
              placeholder="Mở để xem các trường lọc..."
              options={filterCatalogOptions}
              menuFilters={menuFiltersConfig}
              resetFiltersText="Reset filters"
              menuFilterLayout="vertical"
              filterFn={(opt, query, activeFilters) => {
                const dataObj = opt.data as FruitData | undefined;

                // 1. subSearch text filter
                const sub = (activeFilters.subSearch as string) || "";
                if (sub && !opt.label.toLowerCase().includes(sub.toLowerCase())) {
                  return false;
                }

                // 2. category checkbox group filter
                const cats = (activeFilters.category as string[]) || [];
                if (cats.length > 0 && (!dataObj?.category || !cats.includes(dataObj.category))) {
                  return false;
                }

                // Helper parse date "DD/MM/YYYY" to number YYYYMMDD
                const toNum = (d: unknown) => {
                  if (!d) return 0;
                  if (d instanceof Date) {
                    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
                  }
                  const parts = String(d).split("/");
                  if (parts.length === 3) {
                    return Number(parts[2]) * 10000 + Number(parts[1]) * 100 + Number(parts[0]);
                  }
                  return 0;
                };

                // 3. expiryDate date filter (khớp ngày)
                const exp = activeFilters.expiryDate;
                if (exp && dataObj?.expiryDate) {
                  const filterExpNum = toNum(exp);
                  const itemExpNum = toNum(dataObj.expiryDate);
                  if (filterExpNum > 0 && itemExpNum !== filterExpNum) {
                    return false;
                  }
                }

                // 4. harvestStart / harvestEnd date range filter
                const harvestStart = activeFilters.harvestStart;
                const harvestEnd = activeFilters.harvestEnd;
                if ((harvestStart || harvestEnd) && dataObj?.harvestDate) {
                  const startNum = toNum(harvestStart);
                  const endNum = toNum(harvestEnd);
                  const itemHarvestNum = toNum(dataObj.harvestDate);
                  if (startNum > 0 && itemHarvestNum < startNum) return false;
                  if (endNum > 0 && itemHarvestNum > endNum) return false;
                }

                return true;
              }}
            />
          </div>
        </div>

        {/* 7.5 Server Search & Debounce */}
        <div
          id="section-server-search"
          className="p-5 bg-white rounded-xl border-2 border-neutral-200 shadow-sm space-y-3"
        >
          <h3 className="text-base font-bold text-neutral-800">
            7.5 Server Search with Debounce & Option Cache Preservation
          </h3>
          <div className="max-w-lg">
            <MultiSelect
              id="test-server-search"
              searchable
              searchMode="server"
              isLoading={serverLoading}
              options={serverOptions}
              value={serverVal}
              onChange={(next) => setServerVal(next)}
              onSearchChange={debouncedServerSearch}
              label="Tìm kiếm người dùng từ Server API"
              placeholder="Gõ tên 'Sophia'..."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// ==========================================
// CYPRESS TEST SUITE
// ==========================================
describe("<Select /> Component Tests (Single Mount Harness)", () => {
  it("verifies all Select variants, rich layouts and interactive workflows in a single mount showcase", () => {
    const onSingleChange = cy.stub().as("onSingleChange");
    const onMultiChange = cy.stub().as("onMultiChange");

    // Intercept network call for server search test
    cy.intercept("GET", "https://dummyjson.com/users/search*", {
      statusCode: 200,
      body: {
        users: [{ id: 3, firstName: "Sophia", lastName: "Brown" }],
      },
    }).as("getUsers");

    // Single mount for the whole showcase harness
    cy.mount(<SelectComprehensiveShowcase onSingleChange={onSingleChange} onMultiChange={onMultiChange} />);

    cy.contains("1. Kích thước (Sizes: xs, sm, md, lg, xl)").should("be.visible");
    cy.contains("2. Ma trận Biến thể & 7 Màu sắc (Variants x Colors)").should("be.visible");
    cy.contains("Multi-Select theo 7 Màu sắc (Màu Badge & Viền Trigger đồng bộ)").should("be.visible");
    cy.contains("3. Độ bo góc (Radii: none, sm, md, lg, xl, full)").should("be.visible");
    cy.contains("4. Vị trí Nhãn & Form Layouts (Label Placements)").should("be.visible");
    cy.contains("5. Các trạng thái (States)").should("be.visible");
    cy.contains("6. Tùy biến Icon, Render Option, Header & Footer").should("be.visible");
    cy.contains("Mục đã chọn không khả dụng").should("be.visible");

    // Verify Multi-Select Colors section exists
    cy.get("#section-multi-colors").within(() => {
      cy.contains("Success Theme Multi").should("be.visible");
      cy.contains("Error Theme Multi").should("be.visible");
      cy.contains("Warning Theme Multi").should("be.visible");
    });

    // ==========================================
    // 2. Interactive Single Select Workflow
    // ==========================================
    cy.get("#section-single-select").within(() => {
      cy.contains("Táo (Apple)").should("be.visible");

      // Click clearable button
      cy.get("button[aria-label='Clear selection']").click();
      cy.get("@onSingleChange").should("have.been.calledWith", null);
      cy.contains("Chọn hoa quả...").should("be.visible");

      // Open dropdown
      cy.contains("Chọn hoa quả...").click();
    });

    // Dropdown listbox appears with animation & data-state='open'
    cy.get("[data-state='open']").should("exist");
    cy.get("[role='listbox']").should("be.visible");
    cy.get("[role='listbox']").contains("Chuối (Banana)").click();
    cy.get("@onSingleChange").should("have.been.calledWith", "banana");
    cy.get("#section-single-select").contains("Chuối (Banana)").should("be.visible");

    // ==========================================
    // 2.5. Single Select with Search (Search 1 Option)
    // ==========================================
    cy.get("#section-single-search").within(() => {
      // Type 'nho' in single search input
      cy.get("input[aria-label='Search']").type("nho", { force: true });
    });

    // Dropdown filters to only matching option
    cy.get("[role='listbox']").should("be.visible");
    cy.get("[role='listbox']").contains("Nho (Grape)").should("be.visible");
    cy.get("[role='listbox']").contains("Táo (Apple)").should("not.exist");

    // Click to select the 1 option
    cy.get("[role='listbox']").contains("Nho (Grape)").click();

    // Verify selected option is shown on trigger
    cy.get("#section-single-search").within(() => {
      cy.get("input[aria-label='Search']").should("have.attr", "placeholder", "Nho (Grape)");
    });

    // ==========================================
    // 3. Interactive Multi Select & Badges Workflow

    // ==========================================
    cy.get("#section-multi-select").within(() => {
      // Badges exist with radius full
      cy.contains("Táo (Apple)").should("be.visible");
      cy.contains("Chuối (Banana)").should("be.visible");
      cy.get(".rounded-full").should("exist");

      // Delete tag via close icon on Badge
      cy.contains("Táo (Apple)").closest(".inline-flex").find("button[aria-label='Remove']").click();

      cy.contains("Táo (Apple)").should("not.exist");
      cy.contains("Chuối (Banana)").should("be.visible");

      // Delete tag via Backspace on search input
      cy.get("input[aria-label='Search']").type("{backspace}", { force: true });
      cy.contains("Chuối (Banana)").should("not.exist");
    });

    // ==========================================
    // 4. Client Fuzzy Search & Empty State
    // ==========================================
    cy.get("#section-client-search").within(() => {
      // Type 'cam' fuzzy query
      cy.get("input[aria-label='Search']").type("cam", { force: true });
    });
    cy.get("[role='listbox']").should("be.visible");
    cy.get("[role='listbox']").contains("Cam (Orange)").should("be.visible");
    cy.get("[role='listbox']").contains("Táo (Apple)").should("not.exist");

    // Type non-existing query -> shows Empty component
    cy.get("#section-client-search").within(() => {
      cy.get("input[aria-label='Search']").clear({ force: true }).type("xyz123", { force: true });
    });
    cy.get("[role='listbox']").contains("No data found").should("be.visible");

    // Close menu by clicking title
    cy.contains("7.3 Client Fuzzy Search").click();

    // ==========================================
    // 5. Multi-Field Menu Filters Workflow
    // ==========================================
    cy.get("#section-menu-filters").within(() => {
      cy.contains("Mở để xem các trường lọc...").click();
    });

    cy.get("[role='listbox']").should("be.visible");
    cy.get("[role='listbox']").contains("Cam sành Hàm Yên").should("be.visible");
    cy.get("[role='listbox']").contains("Táo Envy New Zealand").should("be.visible");

    // 5.1 SubSearch Filter
    cy.get("button").contains("Bộ lọc").click({ force: true });
    cy.contains("Tìm nhanh tên").click({ force: true });

    // Type in sub-search input inside menu filter popover
    cy.get("input[placeholder='Nhập từ khóa...']").type("Cam", { force: true });
    cy.get("[role='listbox']").contains("Cam sành Hàm Yên").should("be.visible");
    cy.get("[role='listbox']").contains("Táo Envy New Zealand").should("not.exist");

    // Click Reset filters button
    cy.contains("Reset filters").click({ force: true });
    cy.get("[role='listbox']").contains("Cam sành Hàm Yên").should("be.visible");
    cy.get("[role='listbox']").contains("Táo Envy New Zealand").should("be.visible");

    // 5.2 Date Filter (Hạn sử dụng)
    cy.get("button").contains("Bộ lọc").click({ force: true });
    cy.contains("Hạn sử dụng").click({ force: true });

    // Badge chip for Hạn sử dụng appears
    cy.contains("span", "Hạn sử dụng:").should("be.visible");

    // Calendar is rendered directly inline inside the filter popover (no extra input/dropdown)
    cy.get("[data-select-filter-popover='true']").contains("button", /^15$/).click({ force: true });

    // Badge chip updates with selected date
    cy.contains("span", `15/${curMonth}/${curYear}`).should("be.visible");

    // Options list filtered to only product with expiry date 15/${curMonth}/${curYear} ("Nho mẫu đơn Nhật Bản")
    cy.get("[role='listbox']").contains("Nho mẫu đơn Nhật Bản").should("be.visible");
    cy.get("[role='listbox']").contains("Cam sành Hàm Yên").should("not.exist");
    cy.get("[role='listbox']").contains("Táo Envy New Zealand").should("not.exist");

    // Reset filters
    cy.contains("Reset filters").click({ force: true });
    cy.get("[role='listbox']").contains("Cam sành Hàm Yên").should("be.visible");
    cy.get("[role='listbox']").contains("Nho mẫu đơn Nhật Bản").should("be.visible");

    // 5.3 Date Range Filter (Khoảng thu hoạch)
    cy.get("button").contains("Bộ lọc").click({ force: true });
    cy.contains("Khoảng thu hoạch").click({ force: true });

    // Badge chip for Khoảng thu hoạch appears
    cy.contains("span", "Khoảng thu hoạch:").should("be.visible");

    // Calendar is rendered directly inline inside the filter popover (no extra input/dropdown)
    // Pick start day 1 and end day 5
    cy.get("[data-select-filter-popover='true']").contains("button", /^1$/).click({ force: true });
    cy.get("[data-select-filter-popover='true']").contains("button", /^5$/).click({ force: true });

    // Badge chip shows the date range
    cy.contains("Khoảng thu hoạch:").should("be.visible");
    cy.contains("span", `01/${curMonth}/${curYear} - 05/${curMonth}/${curYear}`).should("be.visible");

    // Items harvested between 01/${curMonth}/${curYear} and 05/${curMonth}/${curYear} are visible
    cy.get("[role='listbox']").contains("Cam sành Hàm Yên").should("be.visible");
    cy.get("[role='listbox']").contains("Xoài cát Hòa Lộc").should("be.visible");
    cy.get("[role='listbox']").contains("Dâu tây Đà Lạt").should("be.visible");
    cy.get("[role='listbox']").contains("Nho mẫu đơn Nhật Bản").should("be.visible");
    cy.get("[role='listbox']").contains("Táo Envy New Zealand").should("not.exist");
    cy.get("[role='listbox']").contains("Bưởi da xanh Bến Tre").should("not.exist");

    // 5.4 Multi-filter Combination (Date Range + Category)
    cy.get("button").contains("Bộ lọc").click({ force: true });
    cy.contains("Đặc tính").click({ force: true });

    // Check "Vị ngọt"
    cy.get("[data-select-filter-popover='true']").contains("Vị ngọt").click({ force: true });

    // Only sweet items within 01/05 - 05/05 remain (Xoài cát, Nho mẫu đơn)
    cy.get("[role='listbox']").contains("Xoài cát Hòa Lộc").should("be.visible");
    cy.get("[role='listbox']").contains("Nho mẫu đơn Nhật Bản").should("be.visible");
    cy.get("[role='listbox']").contains("Cam sành Hàm Yên").should("not.exist");
    cy.get("[role='listbox']").contains("Dâu tây Đà Lạt").should("not.exist");

    // Click Reset filters button to restore all items
    cy.contains("Reset filters").click({ force: true });
    cy.get("[role='listbox']").contains("Cam sành Hàm Yên").should("be.visible");
    cy.get("[role='listbox']").contains("Táo Envy New Zealand").should("be.visible");
    cy.get("[role='listbox']").contains("Xoài cát Hòa Lộc").should("be.visible");
    cy.get("[role='listbox']").contains("Bưởi da xanh Bến Tre").should("be.visible");
    cy.get("[role='listbox']").contains("Nho mẫu đơn Nhật Bản").should("be.visible");
    cy.get("[role='listbox']").contains("Dâu tây Đà Lạt").should("be.visible");

    // Close menu
    cy.contains("7.4 Multi-Field Menu Filters").click();

    // ==========================================
    // 6. Server Search & Option Preservation
    // ==========================================
    cy.get("#section-server-search").within(() => {
      // Initial badge
      cy.contains("Emily Johnson").should("be.visible");

      // Type query for server search
      cy.get("input[aria-label='Search']").type("Sophia", { force: true });
    });

    cy.wait("@getUsers");

    // Server option is in the dropdown
    cy.get("[role='listbox']").contains("Sophia Brown").should("be.visible");

    // CRITICAL: Previously selected option 'Emily Johnson' is STILL rendered as Badge in trigger!
    cy.get("#section-server-search").contains("Emily Johnson").should("be.visible");
  });
});

// ==========================================
// TEST SUITE: Inline Listbox Mode (portal={false})
// ==========================================
describe("Select & MultiSelect Inline Listbox Mode (portal={false})", () => {
  it("renders options statically below trigger without clicking, hides chevron, and stays open on selection", () => {
    const onSingleChange = cy.stub().as("onSingleChange");

    const InlineSelectTest = () => {
      const [val, setVal] = useState<string | number | null>(null);
      return (
        <div className="p-4 max-w-md">
          <Select
            id="inline-select-test"
            label="Inline Select"
            placeholder="Chọn hoa quả inline..."
            options={fruitsOptions}
            value={val}
            onChange={(next) => {
              setVal(next);
              onSingleChange(next);
            }}
            searchable
            portal={false}
          />
        </div>
      );
    };

    cy.mount(<InlineSelectTest />);

    // 1. Menu listbox is visible immediately without clicking trigger
    cy.get("#inline-select-test [role='listbox']").should("be.visible");
    cy.get("#inline-select-test [role='listbox']").contains("Táo (Apple)").should("be.visible");
    cy.get("#inline-select-test [role='listbox']").contains("Chuối (Banana)").should("be.visible");

    // 2. Chevron down icon is hidden
    cy.get("#inline-select-test-trigger").within(() => {
      cy.get("svg").should("not.exist");
    });

    // 3. Search works inline without closing
    cy.get("#inline-select-test-trigger input[aria-label='Search']").type("cam");
    cy.get("#inline-select-test [role='listbox']").contains("Cam (Orange)").should("be.visible");
    cy.get("#inline-select-test [role='listbox']").contains("Táo (Apple)").should("not.exist");

    // 4. Clicking option selects it, updates value, and listbox STAYS visible (does not close)
    cy.get("#inline-select-test [role='listbox']").contains("Cam (Orange)").click();
    cy.get("@onSingleChange").should("have.been.calledWith", "orange");
    cy.get("#inline-select-test [role='listbox']").should("be.visible");
  });

  it("verifies MultiSelect in inline mode (portal={false}) toggles tags and stays visible", () => {
    const onMultiChange = cy.stub().as("onMultiChange");

    const InlineMultiSelectTest = () => {
      const [vals, setVals] = useState<(string | number)[]>(["apple"]);
      return (
        <div className="p-4 max-w-md">
          <MultiSelect
            id="inline-multiselect-test"
            label="Inline MultiSelect"
            placeholder="Chọn nhiều hoa quả..."
            options={fruitsOptions}
            value={vals}
            onChange={(next) => {
              setVals(next);
              onMultiChange(next);
            }}
            portal={false}
          />
        </div>
      );
    };

    cy.mount(<InlineMultiSelectTest />);

    // 1. Listbox is visible immediately
    cy.get("#inline-multiselect-test [role='listbox']").should("be.visible");

    // 2. Initial tag 'Táo (Apple)' is visible
    cy.get("#inline-multiselect-test-trigger").contains("Táo (Apple)").should("be.visible");

    // 3. Chevron down is hidden
    cy.get("#inline-multiselect-test-trigger").within(() => {
      // Only delete icon on badge may exist, no trigger chevron
      cy.get("[aria-label='Clear selection']").should("not.exist");
    });

    // 4. Select another option 'Chuối (Banana)' -> stays open
    cy.get("#inline-multiselect-test [role='listbox']").contains("Chuối (Banana)").click();
    cy.get("@onMultiChange").should("have.been.calledWith", ["apple", "banana"]);
    cy.get("#inline-multiselect-test [role='listbox']").should("be.visible");
    cy.get("#inline-multiselect-test-trigger").contains("Chuối (Banana)").should("be.visible");
  });
});

// ==========================================
// TEST SUITE: useSelectInfiniteQuery Adapter
// ==========================================
// describe("useSelectInfiniteQuery & Infinite Scroll Integration", () => {
//   interface MockProduct {
//     id: number;
//     title: string;
//   }

//   const mockProductsPage1: MockProduct[] = Array.from({ length: 10 }, (_, i) => ({
//     id: i + 1,
//     title: `Sản phẩm A${i + 1}`,
//   }));

//   const mockProductsPage2: MockProduct[] = Array.from({ length: 5 }, (_, i) => ({
//     id: i + 11,
//     title: `Sản phẩm B${i + 11}`,
//   }));

//   const InfiniteSelectTestComponent = () => {
//     const [selectedVal, setSelectedVal] = useState<string | number | null>(null);

//     const { selectProps, query, search } = useSelectInfiniteQuery<
//       MockProduct,
//       { items: MockProduct[]; nextPage?: number },
//       number
//     >({
//       queryKey: ["test-infinite-products"],
//       queryFn: async ({ pageParam, filters }) => {
//         const keyword = (filters as Record<string, unknown> | undefined)?.search as string | undefined;
//         if (keyword) {
//           return {
//             items: [{ id: 99, title: `Kết quả: ${keyword}` }],
//             nextPage: undefined,
//           };
//         }
//         if (pageParam === 1) {
//           return { items: mockProductsPage1, nextPage: 2 };
//         }
//         return { items: mockProductsPage2, nextPage: undefined };
//       },
//       initialPageParam: 1,
//       getNextPageParam: (lastPage) => lastPage.nextPage,
//       mapOption: (item) => {
//         const prod = item as MockProduct;
//         return { value: prod.id, label: prod.title, data: prod };
//       },
//       debounceMs: 50,
//       endMessage: "Đã tải hết sản phẩm",
//     });

//     return (
//       <div className="p-8 max-w-md">
//         <div data-testid="search-display">Search: {search}</div>
//         <div data-testid="fetching-next-display">
//           FetchingNext: {query.isFetchingNextPage ? "yes" : "no"}
//         </div>
//         <Select
//           id="infinite-select"
//           label="Sản phẩm Infinite Scroll"
//           placeholder="Chọn sản phẩm..."
//           searchable
//           portal={false}
//           maxMenuHeight={160}
//           value={selectedVal}
//           onChange={(val) => setSelectedVal(val)}
//           {...selectProps}
//         />
//       </div>
//     );
//   };

//   it("loads first page, fetches next page on demand, and searches with debounce", () => {
//     const testClient = new QueryClient({
//       defaultOptions: {
//         queries: {
//           retry: false,
//         },
//       },
//     });

//     cy.mount(
//       <QueryClientProvider client={testClient}>
//         <InfiniteSelectTestComponent />
//       </QueryClientProvider>
//     );

//     // 1. Initial Page 1: first items visible, Page 2 items not yet loaded
//     cy.get("#infinite-select").click();
//     cy.get("#infinite-select [role='listbox']").should("be.visible");
//     cy.get("#infinite-select [role='listbox']").contains("Sản phẩm A1").should("be.visible");
//     cy.get("#infinite-select [role='listbox']").contains("Sản phẩm B11").should("not.exist");

//     // 2. Scroll to bottom of listbox to trigger infinite scroll
//     cy.get("#infinite-select .overflow-y-auto").scrollTo("bottom");
//     cy.get("#infinite-select [role='listbox']").contains("Sản phẩm B11").should("exist");
//     cy.get("#infinite-select [role='listbox']").contains("Sản phẩm B15").should("exist");
//     cy.get("#infinite-select [role='listbox']").contains("Đã tải hết sản phẩm").should("exist");

//     // 3. Select an option from Page 2
//     cy.get("#infinite-select [role='listbox']").contains("Sản phẩm B11").click({ force: true });
//     cy.get("#infinite-select").contains("Sản phẩm B11").should("be.visible");

//     // 4. Server Search with debounce
//     cy.get("#infinite-select").click();
//     cy.get("input[aria-label='Search']").type("Laptop", { force: true });
//     cy.get("#infinite-select [role='listbox']").contains("Kết quả: Laptop").should("be.visible");
//     cy.get("#infinite-select [role='listbox']").contains("Sản phẩm A1").should("not.exist");
//   });

//   it("does not refetch API on dropdown close, supports external setSearch and pure filters with backend searchField", () => {
//     const queryFnSpy = cy.stub().as("queryFnSpy");

//     const RefactoredServerSelectHarness = () => {
//       const [selectedVal, setSelectedVal] = useState<string | number | null>(null);

//       const {
//         selectProps,
//         query,
//         search,
//         setSearch,
//         filters,
//         setFilters,
//       } = useSelectInfiniteQuery<
//         MockProduct,
//         { items: MockProduct[]; nextPage?: number },
//         number,
//         { category: string }
//       >({
//         queryKey: ["test-refactored-server-select"],
//         searchField: "q",
//         initialFilters: { category: "electronics" },
//         debounceMs: 50,
//         queryFn: async ({ pageParam, filters: qFilters }) => {
//           queryFnSpy(qFilters);
//           const keyword = (qFilters as Record<string, unknown> | undefined)?.q as string | undefined;
//           if (keyword) {
//             return {
//               items: [{ id: 999, title: `Tìm thấy: ${keyword} [cat:${qFilters.category}]` }],
//               nextPage: undefined,
//             };
//           }
//           return { items: mockProductsPage1, nextPage: undefined };
//         },
//         getNextPageParam: (lastPage) => lastPage.nextPage,
//         mapOption: (item) => {
//           const prod = item as MockProduct;
//           return { value: prod.id, label: prod.title, data: prod };
//         },
//       });

//       return (
//         <div className="p-8 max-w-md">
//           <div data-testid="search-display">Search: {search}</div>
//           <div data-testid="filters-pure">
//             Category: {filters.category} | Has_q: {"q" in filters ? "yes" : "no"}
//           </div>
//           <button
//             data-testid="external-set-search-btn"
//             onClick={() => setSearch("MacBook")}
//           >
//             External Set Search
//           </button>
//           <button
//             data-testid="change-filter-btn"
//             onClick={() => setFilters({ category: "appliances" })}
//           >
//             Change Filter
//           </button>
//           <Select<MockProduct, { category: string }>
//             id="server-refactored-select"
//             label="Sản phẩm Server Mode"
//             searchable
//             portal={false}
//             value={selectedVal}
//             onChange={(val) => setSelectedVal(val)}
//             {...selectProps}
//           />
//         </div>
//       );
//     };

//     const testClient = new QueryClient({
//       defaultOptions: { queries: { retry: false } },
//     });

//     cy.mount(
//       <QueryClientProvider client={testClient}>
//         <RefactoredServerSelectHarness />
//       </QueryClientProvider>
//     );

//     // 1. Initial mount: queryFn called once with qFilters containing category and no q
//     cy.get("@queryFnSpy").should("have.been.calledOnce");
//     cy.get("@queryFnSpy").should("have.been.calledWithMatch", { category: "electronics" });
//     cy.get("[data-testid='filters-pure']").should("contain", "Category: electronics | Has_q: no");

//     // 2. Open dropdown and close without typing: NO refetch on close!
//     cy.get("#server-refactored-select").click();
//     cy.get("#server-refactored-select [role='listbox']").should("be.visible");
//     cy.get("body").click(0, 0);
//     cy.get("#server-refactored-select [role='listbox']").should("not.exist");
//     // Verify queryFn was STILL called only once (NO refetch on close!)
//     cy.get("@queryFnSpy").should("have.been.calledOnce");

//     // 3. Test external setSearch: immediate input sync and debounced query with searchField "q"
//     cy.get("[data-testid='external-set-search-btn']").click();
//     cy.get("[data-testid='search-display']").should("contain", "Search: MacBook");
//     cy.get("#server-refactored-select input[aria-label='Search']").should("have.value", "MacBook");
//     // Wait for debounce and check queryFn called with q: "MacBook"
//     cy.get("@queryFnSpy").should("have.been.calledTwice");
//     cy.get("@queryFnSpy").should("have.been.calledWithMatch", { category: "electronics", q: "MacBook" });
//     // Verify filters state remains pure:
//     cy.get("[data-testid='filters-pure']").should("contain", "Category: electronics | Has_q: no");

//     // Open dropdown to see search results
//     cy.get("#server-refactored-select").click();
//     cy.get("#server-refactored-select [role='listbox']").contains("Tìm thấy: MacBook [cat:electronics]").should("be.visible");

//     // 4. Test changing filter via setFilters: refetches with updated category and current search keyword
//     cy.get("[data-testid='change-filter-btn']").click();
//     cy.get("[data-testid='filters-pure']").should("contain", "Category: appliances | Has_q: no");
//     cy.get("@queryFnSpy").should("have.been.calledThrice");
//     cy.get("@queryFnSpy").should("have.been.calledWithMatch", { category: "appliances", q: "MacBook" });
//     cy.get("#server-refactored-select [role='listbox']").contains("Tìm thấy: MacBook [cat:appliances]").should("be.visible");
//   });

//   // it("renders SelectMenu on top of Modal when Select is placed inside ModalContainer", () => {
//   //   const ModalWithSelect = () => {
//   //     const [val, setVal] = useState<string | null>(null);
//   //     return (
//   //       <ModalContainer open={true} onClose={() => {}}>
//   //         <Modal>
//   //           <ModalHeader title="Modal with Select" />
//   //           <ModalBody>
//   //             <Select
//   //               id="modal-select"
//   //               label="Chọn trái cây"
//   //               options={fruitsOptions}
//   //               value={val}
//   //               onChange={(newVal) => setVal(newVal as string)}
//   //               placeholder="Chọn một loại quả..."
//   //             />
//   //           </ModalBody>
//   //         </Modal>
//   //       </ModalContainer>
//   //     );
//   //   };

//   //   cy.mount(<ModalWithSelect />);

//   //   // Click trigger bên trong modal
//   //   cy.get("#modal-select-trigger").click();

//   //   // Menu phải hiển thị visible trong Top Layer của dialog, không bị che khuất
//   //   cy.get("[role='listbox']").should("be.visible");
//   //   cy.get("[role='listbox']").contains("Táo (Apple)").click({ force: true });
//   //   cy.get("#modal-select-trigger").contains("Táo (Apple)").should("be.visible");
//   // });

//   // it("handles isLoading state and conditionally displays spinner only when showSpinner=true for Select and MultiSelect", () => {
//   //   cy.mount(
//   //     <div className="space-y-4 p-4">
//   //       <Select
//   //         id="select-loading-no-spinner"
//   //         options={fruitsOptions}
//   //         config={{ isLoading: true, showSpinner: false }}
//   //       />
//   //       <Select
//   //         id="select-loading-with-spinner"
//   //         options={fruitsOptions}
//   //         config={{ isLoading: true, showSpinner: true }}
//   //       />
//   //       <MultiSelect
//   //         id="multiselect-loading-no-spinner"
//   //         options={fruitsOptions}
//   //         config={{ isLoading: true, showSpinner: false }}
//   //       />
//   //       <MultiSelect
//   //         id="multiselect-loading-with-spinner"
//   //         options={fruitsOptions}
//   //         config={{ isLoading: true, showSpinner: true }}
//   //       />
//   //     </div>
//   //   );

//   //   cy.get("#select-loading-no-spinner svg.animate-spin").should("not.exist");
//   //   cy.get("#select-loading-with-spinner svg.animate-spin").should("be.visible");
//   //   cy.get("#multiselect-loading-no-spinner svg.animate-spin").should("not.exist");
//   //   cy.get("#multiselect-loading-with-spinner svg.animate-spin").should("be.visible");
//   // });

//   // it("renders Skeleton placeholders when options are empty and isLoading=true in Select and MultiSelect", () => {
//   //   cy.mount(
//   //     <div className="space-y-4 p-4 max-w-xs">
//   //       <Select
//   //         id="select-skeleton-test"
//   //         label="Select Đang tải"
//   //         options={[]}
//   //         isLoading={true}
//   //         skeletonCount={3}
//   //         portal={false}
//   //       />
//   //       <MultiSelect
//   //         id="multiselect-skeleton-test"
//   //         label="MultiSelect Đang tải"
//   //         options={[]}
//   //         isLoading={true}
//   //         skeletonCount={3}
//   //         portal={false}
//   //       />
//   //     </div>
//   //   );

//   //   // Click trigger Select để mở menu
//   //   cy.get("#select-skeleton-test-trigger").click();
//   //   cy.get("#select-skeleton-test [role='listbox']").should("be.visible");
//   //   cy.get("#select-skeleton-test [role='listbox'] .animate-pulse").should("have.length.at.least", 3);

//   //   // Đóng menu Select để tránh che khuất
//   //   cy.get("#select-skeleton-test-trigger").click();

//   //   // Click trigger MultiSelect để mở menu
//   //   cy.get("#multiselect-skeleton-test-trigger").click({ force: true });
//   //   cy.get("#multiselect-skeleton-test [role='listbox']").should("be.visible");
//   //   cy.get("#multiselect-skeleton-test [role='listbox'] .animate-pulse").should("have.length.at.least", 3);
//   // });

//   // it("does not flash raw ID during initial loading and preserves label across asynchronous options updates and server search", () => {
//   //   const AsyncSelectHarness = () => {
//   //     const [isLoading, setIsLoading] = useState(true);
//   //     const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

//   //     return (
//   //       <div className="space-y-6 p-4 max-w-xs">
//   //         <button
//   //           data-testid="btn-load-options"
//   //           onClick={() => {
//   //             setIsLoading(false);
//   //             setOptions([
//   //               { value: "user_99", label: "Nguyễn Văn A" },
//   //               { value: "user_100", label: "Trần Thị B" },
//   //             ]);
//   //           }}
//   //         >
//   //           Load Options
//   //         </button>
//   //         <button
//   //           data-testid="btn-search-replace"
//   //           onClick={() => {
//   //             setOptions([
//   //               { value: "user_200", label: "Lê Văn C" },
//   //             ]);
//   //           }}
//   //         >
//   //           Simulate Server Search
//   //         </button>

//   //         <Select
//   //           id="async-select-test"
//   //           label="Async Select"
//   //           placeholder="Chọn người dùng..."
//   //           value="user_99"
//   //           options={options}
//   //           isLoading={isLoading}
//   //           portal={false}
//   //         />

//   //         <MultiSelect
//   //           id="async-multiselect-test"
//   //           label="Async MultiSelect"
//   //           placeholder="Chọn nhiều người dùng..."
//   //           value={["user_99"]}
//   //           options={options}
//   //           isLoading={isLoading}
//   //           portal={false}
//   //         />
//   //       </div>
//   //     );
//   //   };

//   //   cy.mount(<AsyncSelectHarness />);

//   //   // 1. Initial loading: raw ID "user_99" must NOT be rendered in trigger!
//   //   cy.get("#async-select-test-trigger").should("not.contain", "user_99");
//   //   cy.get("#async-select-test-trigger").should("contain", "Chọn người dùng...");
//   //   cy.get("#async-multiselect-test-trigger").should("not.contain", "user_99");

//   //   // 2. Options loaded: labels rendered correctly
//   //   cy.get("[data-testid='btn-load-options']").click();
//   //   cy.get("#async-select-test-trigger").should("contain", "Nguyễn Văn A");
//   //   cy.get("#async-multiselect-test-trigger").should("contain", "Nguyễn Văn A");

//   //   // 3. Search replaces options: "Nguyễn Văn A" is preserved via historicalOptions!
//   //   cy.get("[data-testid='btn-search-replace']").click();
//   //   cy.get("#async-select-test-trigger").should("contain", "Nguyễn Văn A");
//   //   cy.get("#async-multiselect-test-trigger").should("contain", "Nguyễn Văn A");
//   // });
// });
