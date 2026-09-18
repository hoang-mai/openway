# 🎚️ Slider Component (`@openway/ui`)

Component **Slider** hiện đại, mượt mà và toàn diện, được xây dựng trên nền tảng logic headless của **`@radix-ui/react-slider`**, tuân thủ cấu trúc thiết kế chuẩn **Design System (`styleCode`)** của `@openway/ui`, tích hợp **Safe Config Fallback**, **Floating UI Tooltip**, hỗ trợ cả thanh trượt đơn (**Single**) lẫn thanh trượt dải (**Range**) và đáp ứng đầy đủ tiêu chuẩn **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Engine Headless Radix UI**: Quản lý cử chỉ kéo thả (Pointer Capture, Touch, Multi-touch), tính toán giá trị và điều hướng bàn phím mượt mà, chính xác, không bị giật lag khi kéo ra ngoài track.
- **Hỗ trợ Single & Range Slider**:
  - **Single Slider**: Truyền `number` vào `value` / `defaultValue`.
  - **Range Slider (Dual Thumbs)**: Truyền `[number, number]` vào `value` / `defaultValue` để điều chỉnh khoảng giá trị (giá cả, bộ lọc...).
- **Cấu hình tập trung chuẩn (`config?: SliderConfig`)**: Toàn bộ cờ trạng thái (`isRequired`, `isInvalid`, `isLoading`, `showSpinner`, `showSteps`, `showValue`, `isFullWidth`) được quản lý thống nhất qua đối tượng `config`.
- **5 Kích thước tiêu chuẩn (`size`)**: `xs`, `sm`, `md` (*mặc định*), `lg`, `xl` với kích thước track, thumb, nấc bước và font chữ được cân chỉnh theo tỷ lệ chuẩn.
- **4 Biến thể giao diện (`variant`)**:
  - `filled` *(mặc định)*: Nền track rõ nét, thanh fill màu chủ đề tương phản cao.
  - `soft`: Nền track màu pastel dịu mắt theo tone màu chủ đề.
  - `outline`: Track và Thumb dạng viền viền theo màu chủ đề.
  - `other`: Bỏ qua các class màu mặc định, tự do áp dụng custom style qua `trackClassName`, `fillerClassName`, `thumbClassName`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **6 Mức độ bo góc (`radius` & `thumbRadius`)**: `none`, `sm`, `md`, `lg`, `xl`, `full` (*mặc định*). Có thể tùy biến riêng bo góc cho thanh track và nút kéo thumb.
- **Tích hợp Tooltip (@floating-ui/react)**: Hỗ trợ 4 chế độ hiển thị tooltip nổi trên thumb: `"always"`, `"active"` (khi kéo / focus), `"hover"`, và `"none"`.
- **Nấc bước & Đánh dấu (Marks & Step Dots)**:
  - `showSteps`: Tự động hiển thị các chấm tròn tại từng nấc bước trên thanh trượt.
  - `marks`: Hiển thị nhãn mốc giá trị bên dưới hoặc bên cạnh thanh trượt.
- **Tích hợp Form HTML chuẩn**: Tự động render `<input type="hidden" />` khi truyền `name` để hỗ trợ submit form HTML native / FormData.
- **Đạt chuẩn Accessibility (WAI-ARIA)**: Tích hợp đầy đủ `role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`, `aria-invalid`, `aria-required`, `aria-errormessage`, `aria-describedby`.
- **Safe Config Fallback**: Tích hợp hàm `getSafeConfig` đảm bảo component hoạt động an toàn, không bị crash kể cả khi truyền prop không hợp lệ.

---

## 🚀 Cài đặt & Import

```tsx
import {
  Slider,
  SliderThumb,
  SliderMarks,
  SliderStepDots,
  clamp,
  getPercentage,
} from "@openway/ui";
import type {
  SliderProps,
  SliderConfig,
  SliderMark,
  SliderSize,
  SliderVariant,
  SliderColor,
  SliderRadius,
  SliderOrientation,
  SliderTooltipMode,
  SliderTooltipPlacement,
  SliderValue,
} from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Slider đơn cơ bản (Single Value)

```tsx
import { useState } from "react";
import { Slider } from "@openway/ui";

export function BasicSingleSlider() {
  const [volume, setVolume] = useState<number>(50);

  return (
    <div className="max-w-md space-y-6">
      {/* Uncontrolled Slider */}
      <Slider
        label="Âm lượng mặc định"
        defaultValue={40}
        config={{ showValue: true }}
      />

      {/* Controlled Slider */}
      <Slider
        label="Âm lượng tùy chỉnh"
        value={volume}
        onChange={(val) => setVolume(val as number)}
        formatValue={(val) => `${val}%`}
        config={{ showValue: true }}
      />
    </div>
  );
}
```

---

### 2. Slider khoảng dải (Range Slider - Dual Thumbs)

Chỉ cần truyền một mảng 2 phần tử `[minVal, maxVal]` vào `value` hoặc `defaultValue`:

```tsx
import { useState } from "react";
import { Slider } from "@openway/ui";

export function PriceRangeSlider() {
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 800]);

  return (
    <div className="max-w-md">
      <Slider
        label="Khoảng giá (USD)"
        min={0}
        max={1000}
        step={10}
        value={priceRange}
        onChange={(val) => setPriceRange(val as [number, number])}
        formatValue={(val) => {
          const [min, max] = val as [number, number];
          return `$${min} - $${max}`;
        }}
        config={{ showValue: true }}
      />
    </div>
  );
}
```

---

### 3. Kích thước (`size`)

Hỗ trợ 5 kích thước: `xs`, `sm`, `md` (*mặc định*), `lg`, `xl`:

```tsx
<Slider size="xs" label="Size XS" defaultValue={20} config={{ showValue: true }} />
<Slider size="sm" label="Size SM" defaultValue={40} config={{ showValue: true }} />
<Slider size="md" label="Size MD" defaultValue={60} config={{ showValue: true }} />
<Slider size="lg" label="Size LG" defaultValue={80} config={{ showValue: true }} />
<Slider size="xl" label="Size XL" defaultValue={100} config={{ showValue: true }} />
```

---

### 4. Biến thể (`variant`) & Màu sắc (`color`)

```tsx
// 7 Bảng màu chủ đề
<Slider color="primary" label="Primary" defaultValue={50} />
<Slider color="secondary" label="Secondary" defaultValue={50} />
<Slider color="success" label="Success" defaultValue={50} />
<Slider color="warning" label="Warning" defaultValue={50} />
<Slider color="error" label="Error" defaultValue={50} />
<Slider color="info" label="Info" defaultValue={50} />
<Slider color="neutral" label="Neutral" defaultValue={50} />

// 4 Biến thể hiển thị
<Slider variant="filled" color="primary" label="Filled" defaultValue={60} />
<Slider variant="soft" color="primary" label="Soft" defaultValue={60} />
<Slider variant="outline" color="primary" label="Outline" defaultValue={60} />
<Slider
  variant="other"
  label="Custom Other"
  defaultValue={60}
  trackClassName="bg-purple-200"
  fillerClassName="bg-purple-600"
  thumbClassName="border-purple-600"
/>
```

---

### 5. Bo góc thanh trượt & Nút kéo (`radius` & `thumbRadius`)

```tsx
<Slider radius="none" thumbRadius="none" label="Square" defaultValue={40} />
<Slider radius="md" thumbRadius="md" label="Medium Rounded" defaultValue={50} />
<Slider radius="full" thumbRadius="full" label="Fully Rounded" defaultValue={60} />
```

---

### 6. Tích hợp Tooltip (`showTooltip` & `formatTooltip`)

```tsx
// 1. Luôn hiển thị Tooltip
<Slider
  label="Always Open"
  defaultValue={45}
  showTooltip="always"
  formatTooltip={(val) => `${val}%`}
/>

// 2. Hiển thị khi đang kéo hoặc focus bàn phím
<Slider
  label="Active On Drag/Focus"
  defaultValue={75}
  showTooltip="active"
  color="success"
  formatTooltip={(val) => `${val} kW/h`}
/>

// 3. Hiển thị khi hover chuột
<Slider
  label="Hover"
  defaultValue={30}
  showTooltip="hover"
  color="warning"
  formatTooltip={(val) => `$${val}`}
/>
```

---

### 7. Nấc bước & Đánh dấu mốc (`showSteps` & `marks`)

```tsx
<Slider
  label="Nhiệt độ phòng"
  defaultValue={25}
  min={10}
  max={40}
  step={5}
  config={{ showSteps: true }}
  marks={[
    { value: 10, label: "10°C" },
    { value: 20, label: "20°C" },
    { value: 25, label: "25°C" },
    { value: 37, label: "37°C" },
    { value: 40, label: "40°C" },
  ]}
/>
```

---

### 8. Hướng dọc (`orientation="vertical"`)

Rất thích hợp cho bộ chỉnh âm thanh (Equalizer), thanh chỉnh độ sáng:

```tsx
<div className="flex items-center gap-6 h-64">
  <Slider orientation="vertical" defaultValue={40} color="primary" showTooltip="active" />
  <Slider orientation="vertical" defaultValue={75} color="secondary" showTooltip="active" />
  <Slider orientation="vertical" defaultValue={60} color="success" showTooltip="active" />
</div>
```

---

### 9. Trạng thái Loading, Validation & Form Integration

```tsx
// Trạng thái Loading kèm Spinner
<Slider
  label="Đang đồng bộ dữ liệu"
  defaultValue={50}
  helperText="Vui lòng chờ..."
  config={{ isLoading: true, showSpinner: true }}
/>

// Trạng thái Báo lỗi (Invalid)
<Slider
  label="Công suất máy"
  defaultValue={10}
  errorMessage="Giá trị công suất tối thiểu là 20!"
  config={{ isInvalid: true, isRequired: true }}
/>

// Tích hợp Form HTML (FormData)
<form onSubmit={(e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  console.log(data.get("volume")); // Output: giá trị số
}}>
  <Slider name="volume" defaultValue={80} label="Volume" />
  <button type="submit">Submit</button>
</form>
```

---

## 📋 Bảng thuộc tính (Props Reference)

### `SliderProps`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| **`config`** | `SliderConfig` | `{}` | Đối tượng gom nhóm các cờ cấu hình tính năng/trạng thái. |
| **`value`** | `number \| [number, number]` | `undefined` | Giá trị controlled của thanh trượt. |
| **`defaultValue`** | `number \| [number, number]` | `undefined` | Giá trị khởi tạo mặc định (uncontrolled). |
| **`min`** | `number` | `0` | Giá trị tối thiểu. |
| **`max`** | `number` | `100` | Giá trị tối đa. |
| **`step`** | `number` | `1` | Bước nhảy giữa các giá trị. |
| **`minStepsBetweenThumbs`** | `number` | `0` | Số bước nhảy tối thiểu giữa 2 thumbs ở Range mode. |
| **`inverted`** | `boolean` | `false` | Đảo ngược chiều thanh trượt. |
| **`size`** | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Kích thước component. |
| **`variant`** | `"filled" \| "soft" \| "outline" \| "other"` | `"filled"` | Biến thể giao diện của thanh trượt. |
| **`color`** | `"primary" \| "secondary" \| "error" \| "success" \| "warning" \| "info" \| "neutral"` | `"primary"` | Chủ đề màu sắc. |
| **`radius`** | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"full"` | Bo góc của track. |
| **`thumbRadius`** | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"full"` | Bo góc của thumb. |
| **`orientation`** | `"horizontal" \| "vertical"` | `"horizontal"` | Chiều hướng trượt. |
| **`label`** | `ReactNode` | `undefined` | Nhãn tiêu đề của slider. |
| **`labelPlacement`** | `"top" \| "left" \| "right"` | `"top"` | Vị trí đặt nhãn tiêu đề. |
| **`formatValue`** | `(val: SliderValue) => ReactNode` | `undefined` | Hàm format hiển thị giá trị cạnh label. |
| **`showTooltip`** | `"none" \| "hover" \| "active" \| "always"` | `"none"` | Chế độ hiển thị Tooltip nổi trên thumb. |
| **`tooltipPlacement`** | `"top" \| "bottom" \| "left" \| "right"` | `undefined` | Vị trí đặt tooltip. |
| **`formatTooltip`** | `(val: number) => ReactNode` | `undefined` | Hàm format nội dung hiển thị trong tooltip. |
| **`marks`** | `SliderMark[] \| boolean` | `false` | Danh sách mốc đánh dấu hoặc `true` để tự sinh theo step. |
| **`startContent`** | `ReactNode` | `undefined` | Icon hoặc nội dung đầu thanh trượt. |
| **`endContent`** | `ReactNode` | `undefined` | Icon hoặc nội dung cuối thanh trượt. |
| **`disabled`** | `boolean` | `false` | Vô hiệu hóa toàn bộ tương tác. |
| **`readOnly`** | `boolean` | `false` | Chế độ chỉ đọc (không kéo được nhưng vẫn submit form). |
| **`helperText`** | `ReactNode` | `undefined` | Văn bản hướng dẫn phía dưới. |
| **`errorMessage`** | `ReactNode` | `undefined` | Thông báo lỗi phía dưới (tự động bật `hasError`). |
| **`name`** | `string` | `undefined` | Tên input ẩn dùng cho form submit. |
| **`onChange`** | `(val: SliderValue) => void` | `undefined` | Callback gọi liên tục khi đang kéo thay đổi giá trị. |
| **`onChangeEnd`** | `(val: SliderValue) => void` | `undefined` | Callback chỉ gọi khi thả tay/kết thúc kéo. |
| **`trackClassName`** | `string` | `""` | Tùy biến class của thanh track. |
| **`fillerClassName`** | `string` | `""` | Tùy biến class của thanh đã fill. |
| **`thumbClassName`** | `string` | `""` | Tùy biến class của nút kéo thumb. |

---

### `SliderConfig`

| Cờ cấu hình | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| **`isRequired`** | `boolean` | `false` | Đánh dấu trường bắt buộc (hiển thị dấu `*` đỏ cạnh label). |
| **`isInvalid`** | `boolean` | `false` | Bật trạng thái lỗi (chuyển màu track, thumb, label sang tone error). |
| **`isLoading`** | `boolean` | `false` | Khóa tương tác và kích hoạt trạng thái loading. |
| **`showSpinner`** | `boolean` | `false` | Hiển thị biểu tượng xoay Spinner bên trong nút thumb khi đang loading. |
| **`showSteps`** | `boolean` | `false` | Hiển thị các chấm nấc bước (Step Dots) trên track. |
| **`showValue`** | `boolean` | `false` | Hiển thị giá trị dạng text bên cạnh nhãn. |
| **`isFullWidth`** | `boolean` | `true` | Mở rộng 100% chiều rộng khung chứa. |

---

## ♿ Khả năng tiếp cận (Accessibility / WAI-ARIA)

- **Tuân thủ WAI-ARIA Slider Pattern**: Tự động gán `role="slider"`, `tabIndex={0}`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` trên từng thumb.
- **Screen Reader Friendly**: Hỗ trợ `aria-valuetext` để phát âm các định dạng giá trị tùy biến (tiền tệ, phần trăm, độ C).
- **Hỗ trợ đầy đủ bàn phím**:
  - `←` / `↓`: Giảm 1 bước (`-step`).
  - `→` / `↑`: Tăng 1 bước (`+step`).
  - `Page Down` / `Page Up`: Giảm/Tăng một khoảng lớn ($10\%$).
  - `Home`: Về giá trị nhỏ nhất (`min`).
  - `End`: Lên giá trị lớn nhất (`max`).
- **Liên kết ngữ cảnh lỗi**: Tự động gán `aria-invalid`, `aria-errormessage`, `aria-describedby` trỏ tới phần tử thông báo lỗi.
