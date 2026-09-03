# Quy ước chuẩn hóa Kích thước (`size`) trong Design System (UI Package)

Tài liệu này quy định chi tiết về 5 cấp độ kích thước tiêu chuẩn (**`xs`**, **`sm`**, **`md`**, **`lg`**, **`xl`**), chiều cao container, kích thước chữ, icon, khoảng đệm (padding) và độ bo góc mặc định (default radius) áp dụng trên toàn bộ hệ sinh thái UI components.

---

## 1. Hệ thống 5 Cấp độ Kích thước Tiêu chuẩn

Design System áp dụng hệ trục 8px đồng bộ với 5 mức size:

|           Size           | Chiều cao (Height) | Cỡ chữ (Typography)  |        Icon Size         | Bo góc mặc định (Default Radius) | Mục đích sử dụng                                                 |
| :----------------------: | :----------------: | :------------------: | :----------------------: | :------------------------------: | :--------------------------------------------------------------- |
|         **`xs`**         |  **24px** (`h-6`)  | `text-[11px]` (11px) |   **12px** (`size-3`)    |     `rounded` / `rounded-sm`     | Bảng biểu dày đặc dữ liệu (Dense tables), inline micro-forms     |
|         **`sm`**         |  **32px** (`h-8`)  |   `text-xs` (12px)   |  **14px** (`size-3.5`)   |           `rounded-md`           | Giao diện quản trị, sidebar filters, compact dialogs             |
| **`md`**<br>_(Mặc định)_ | **40px** (`h-10`)  |   `text-sm` (14px)   | **18px** (`size-[18px]`) |         **`rounded-lg`**         | **Kích thước tiêu chuẩn** cho tất cả các form và giao diện chính |
|         **`lg`**         | **48px** (`h-12`)  |  `text-base` (16px)  |   **20px** (`size-5`)    |           `rounded-xl`           | Form quan trọng (Checkout, Login, Search bar nổi bật)            |
|         **`xl`**         | **56px** (`h-14`)  |   `text-lg` (18px)   |   **24px** (`size-6`)    |          `rounded-2xl`           | Hero search, Landing page, banner inputs                         |

---

## 2. Bảng thông số chi tiết của từng Thành phần theo Size

### 2.1. Form Inputs & Pickers (`Input`, `Select`, `DatePicker`, `TimePicker`, `TextArea`)

| Thuộc tính              | `xs` (24px)         | `sm` (32px)          | `md` (40px - Default) | `lg` (48px)        | `xl` (56px)     |
| :---------------------- | :------------------ | :------------------- | :-------------------- | :----------------- | :-------------- |
| **Container Class**     | `h-6 text-[11px]`   | `h-8 text-xs`        | `h-10 text-sm`        | `h-12 text-base`   | `h-14 text-lg`  |
| **Input Padding**       | `px-2 py-0.5`       | `px-2.5 py-1`        | `px-3.5 py-2`         | `px-4 py-2.5`      | `px-5 py-3`     |
| **Left/Right Icon**     | `size-3` (12px)     | `size-3.5` (14px)    | `size-[18px]` (18px)  | `size-5` (20px)    | `size-6` (24px) |
| **Padding khi có Icon** | `pl-6 pr-6`         | `pl-7.5 pr-7.5`      | `pl-9 pr-9`           | `pl-11 pr-11`      | `pl-13 pr-13`   |
| **Label Font**          | `text-[11px] mb-1`  | `text-xs mb-1`       | `text-sm mb-1.5`      | `text-base mb-1.5` | `text-lg mb-2`  |
| **Helper / Error Text** | `text-[9px] mt-0.5` | `text-[10px] mt-0.5` | `text-[11px] mt-1`    | `text-xs mt-1`     | `text-sm mt-1`  |
| **Floating Label Text** | `text-[10px]`       | `text-[10px]`        | `text-[11px]`         | `text-xs`          | `text-xs`       |

---

### 2.2. Tags & Sub-elements (`MultiInput` & `Badge`)

Khi các component lồng ghép Badge (như `MultiInput`, `Select multiple`):

| Input Size | Badge Size tương ứng |   Tag Padding   | Khoảng cách Tags (`gap`) |
| :--------: | :------------------: | :-------------: | :----------------------: |
|  **`xs`**  |         `xs`         |   `px-1 py-0`   |         `gap-1`          |
|  **`sm`**  |         `xs`         | `px-1.5 py-0.5` |         `gap-1`          |
|  **`md`**  |         `sm`         |  `px-2 py-0.5`  |        `gap-1.5`         |
|  **`lg`**  |         `md`         |  `px-2.5 py-1`  |        `gap-1.5`         |
|  **`xl`**  |         `lg`         |   `px-3 py-1`   |         `gap-2`          |

---

### 2.3. OTP Input Slots (`OtpInput`)

|   Size   |    Kích thước từng ô Slot    |       Cỡ chữ số OTP       | Khoảng cách giữa các ô (`gap`) |
| :------: | :--------------------------: | :-----------------------: | :----------------------------: |
| **`xs`** |  `size-6 min-w-6` (24x24px)  |         `text-xs`         |            `gap-1`             |
| **`sm`** |  `size-8 min-w-8` (32x32px)  |         `text-sm`         |           `gap-1.5`            |
| **`md`** | `size-10 min-w-10` (40x40px) | `text-base font-semibold` |            `gap-2`             |
| **`lg`** | `size-12 min-w-12` (48x48px) |  `text-lg font-semibold`  |           `gap-2.5`            |
| **`xl`** | `size-14 min-w-14` (56x56px) |    `text-xl font-bold`    |            `gap-3`             |

---

### 2.4. Nút bấm (`Button` & `IconButton`)

|   Size   | Chiều cao & Padding Button | Kích thước IconButton |    Cỡ chữ     | Icon Size  |
| :------: | :------------------------: | :-------------------: | :-----------: | :--------: |
| **`xs`** |     `h-6 px-2.5 gap-1`     |     `size-6 p-0`      | `text-[11px]` |  `size-3`  |
| **`sm`** |     `h-8 px-3 gap-1.5`     |     `size-8 p-0`      |   `text-xs`   | `size-3.5` |
| **`md`** |     `h-10 px-4 gap-2`      |     `size-10 p-0`     |   `text-sm`   |  `size-4`  |
| **`lg`** |    `h-12 px-5 gap-2.5`     |     `size-12 p-0`     |  `text-base`  |  `size-5`  |
| **`xl`** |     `h-14 px-6 gap-3`      |     `size-14 p-0`     |   `text-lg`   |  `size-6`  |

---

## 3. Mối quan hệ giữa Size và Radius mặc định

Nếu người dùng không truyền prop `radius`, component sẽ **tự động lấy radius tương ứng theo `size`**:

```ts
const activeRadius = radius ? radiusConfig[radius] : currentSize.rounded;
```

```
Size:   xs (24px)  ──►  rounded      (rounded-sm: 2px - 4px)
Size:   sm (32px)  ──►  rounded-md   (6px)
Size:   md (40px)  ──►  rounded-lg   (8px)
Size:   lg (48px)  ──►  rounded-xl   (12px)
Size:   xl (56px)  ──►  rounded-2xl  (16px)
```

---

## 4. Mẫu triển khai `sizeConfig` trong `constants.ts`

```ts
import { InputSize } from "./types";

export const sizeConfig: Record<
  InputSize,
  {
    wrapper: string;
    input: string;
    icon: string;
    iconPaddingLeft: string;
    iconPaddingRight: string;
    label: string;
    helper: string;
    rounded: string;
  }
> = {
  xs: {
    wrapper: "h-6 text-[11px]",
    input: "px-2 py-0.5 text-[11px] leading-tight",
    icon: "size-3",
    iconPaddingLeft: "pl-6",
    iconPaddingRight: "pr-6",
    label: "text-[11px] mb-1",
    helper: "text-[9px] mt-0.5",
    rounded: "rounded",
  },
  sm: {
    wrapper: "h-8 text-xs",
    input: "px-2.5 py-1 text-xs leading-normal",
    icon: "size-3.5",
    iconPaddingLeft: "pl-7.5",
    iconPaddingRight: "pr-7.5",
    label: "text-xs mb-1",
    helper: "text-[10px] mt-0.5",
    rounded: "rounded-md",
  },
  md: {
    wrapper: "h-10 text-sm",
    input: "px-3.5 py-2 text-sm leading-normal",
    icon: "size-[18px]",
    iconPaddingLeft: "pl-9",
    iconPaddingRight: "pr-9",
    label: "text-sm mb-1.5",
    helper: "text-[11px] mt-1",
    rounded: "rounded-lg",
  },
  lg: {
    wrapper: "h-12 text-base",
    input: "px-4 py-2.5 text-base leading-normal",
    icon: "size-5",
    iconPaddingLeft: "pl-11",
    iconPaddingRight: "pr-11",
    label: "text-base mb-1.5",
    helper: "text-xs mt-1",
    rounded: "rounded-xl",
  },
  xl: {
    wrapper: "h-14 text-lg",
    input: "px-5 py-3 text-lg leading-normal",
    icon: "size-6",
    iconPaddingLeft: "pl-13",
    iconPaddingRight: "pr-13",
    label: "text-lg mb-2",
    helper: "text-sm mt-1",
    rounded: "rounded-2xl",
  },
};
```
