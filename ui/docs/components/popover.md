# 💬 Popover Component (`@openway/ui`)

Bộ component **Popover** (hộp thoại nổi tương tác) xây dựng theo mô hình **Compound Component** trên nền tảng **`@floating-ui/react`**, hỗ trợ **chuẩn WAI-ARIA Dialog**, **quản lý tiêu điểm thông minh (FloatingFocusManager)**, **tự động căn vị trí thông minh (flip/shift/offset)**, và tương thích hoàn toàn với **React 19 / React Compiler**.

---

## 🌟 Điểm nổi bật

- **Compound Component Pattern**: Cấu trúc module rõ ràng gồm `<Popover>`, `<PopoverTrigger>`, `<PopoverContent>`, `<PopoverHeader>`, `<PopoverBody>`, `<PopoverFooter>`, `<PopoverClose>`.
- **Hỗ trợ React 19 & React Compiler**: Áp dụng mô hình `Slot` component trên cả `PopoverTrigger` và `PopoverClose`, đảm bảo xử lý `ref` sạch sẽ và an toàn tuyệt đối khi render.
- **Quản lý tiêu điểm (Focus Management)**: Tích hợp `FloatingFocusManager`, tự động bẫy/khóa focus bên trong popover khi ở chế độ `modal={true}` và khôi phục focus về trigger khi đóng.
- **Hệ thống z-index đồng bộ**: Sử dụng `DEFAULT_Z_INDEX.POPOVER` (mặc định `50`) từ hệ thống constants của `@openway/ui`.
- **Luôn nổi trên cùng (Floating Portal)**: Nội dung popover luôn được gắn vào `<FloatingPortal>`, không bị ảnh hưởng bởi layout cha hay `overflow: hidden`.
- **Safe Config Fallback**: Tích hợp hàm `getSafeConfig` giúp các subcomponents (`PopoverContent`, `PopoverHeader`, `PopoverBody`, `PopoverFooter`) lấy an toàn cấu hình `sizeConfig` và `radiusConfig`.
- **WAI-ARIA Accessibility**:
  - `role="dialog"` cho popover container.
  - `aria-expanded`, `aria-haspopup="dialog"`.
  - Tự động đóng khi nhấn phím `Escape` (`closeOnEsc`) hoặc click ra ngoài (`closeOnClickOutside`).
- **Tùy biến linh hoạt**:
  - 5 kích cỡ: `xs`, `sm`, `md` (*mặc định*), `lg`, `xl`.
  - 6 cấp độ bo góc: `none`, `sm`, `md` (*mặc định*), `lg`, `xl`, `full`.
  - 2 cơ chế kích hoạt: `click` (*mặc định*) hoặc `hover` (hỗ trợ `safePolygon` giúp di chuột mượt mà sang popover).

---

## 🚀 Cài đặt & Import

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverClose,
} from "@openway/ui";
import type {
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps,
  PopoverHeaderProps,
  PopoverBodyProps,
  PopoverFooterProps,
  PopoverCloseProps,
  PopoverPlacement,
  PopoverTriggerType,
  PopoverSize,
  PopoverRadius,
  PopoverColor,
} from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Popover cơ bản (Form nhập liệu / Bộ lọc)

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverClose,
  Button,
} from "@openway/ui";

export function BasicPopover() {
  return (
    <Popover placement="bottom-start" size="md">
      <PopoverTrigger>
        <Button variant="outline">Mở bộ lọc</Button>
      </PopoverTrigger>
      <PopoverContent minWidth={280}>
        <PopoverHeader>Bộ lọc nâng cao</PopoverHeader>
        <PopoverBody>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Từ khóa</label>
              <input
                type="text"
                placeholder="Nhập từ khóa..."
                className="w-full px-2.5 py-1.5 border border-neutral-300 rounded text-sm outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Trạng thái</label>
              <select className="w-full px-2.5 py-1.5 border border-neutral-300 rounded text-sm outline-none focus:border-primary-500">
                <option value="all">Tất cả</option>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Đã tạm dừng</option>
              </select>
            </div>
          </div>
        </PopoverBody>
        <PopoverFooter className="flex justify-end gap-2">
          <PopoverClose asChild>
            <Button variant="ghost" size="sm">Hủy</Button>
          </PopoverClose>
          <Button size="sm">Áp dụng</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
```

---

### 2. Tùy biến Trigger với `asChild`

```tsx
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, IconButton } from "@openway/ui";
import { InfoIcon } from "@/components/icons";

export function InfoPopover() {
  return (
    <Popover trigger="hover" placement="top">
      <PopoverTrigger asChild>
        <IconButton icon={<InfoIcon />} aria-label="Xem giải thích" variant="ghost" size="sm" />
      </PopoverTrigger>
      <PopoverContent maxWidth={320}>
        <PopoverBody>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Dữ liệu này được tự động đồng bộ từ máy chủ mỗi 5 phút một lần.
          </p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
```

---

### 3. Kích hoạt bằng Hover (`trigger="hover"`)

Với chế độ `hover`, Popover tích hợp thuật toán `safePolygon()` của Floating UI, cho phép người dùng di chuyển con trỏ chuột theo đường chéo từ trigger sang khung popover mà không bị tắt đột ngột:

```tsx
<Popover trigger="hover" placement="bottom">
  <PopoverTrigger>
    <Button variant="soft">Rê chuột xem chi tiết</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverBody>
      <p className="text-sm">Nội dung chi tiết được hiển thị khi hover!</p>
    </PopoverBody>
  </PopoverContent>
</Popover>
```

---

### 4. Chế độ Modal Popover (`modal={true}`)

Khi bật `modal={true}`, Popover sẽ khóa toàn bộ tương tác bên ngoài và bẫy phím `Tab` chỉ tuần hoàn bên trong nội dung của Popover:

```tsx
<Popover modal={true} placement="bottom-start">
  <PopoverTrigger>
    <Button color="error">Xóa dữ liệu quan trọng</Button>
  </PopoverTrigger>
  <PopoverContent minWidth={300}>
    <PopoverHeader>Xác nhận xóa</PopoverHeader>
    <PopoverBody>
      <p className="text-sm text-neutral-700">
        Bạn có chắc chắn muốn xóa bản ghi này? Hành động này không thể hoàn tác.
      </p>
    </PopoverBody>
    <PopoverFooter className="flex justify-end gap-2">
      <PopoverClose asChild>
        <Button variant="outline" size="sm">Hủy</Button>
      </PopoverClose>
      <Button color="error" size="sm">Đồng ý xóa</Button>
    </PopoverFooter>
  </PopoverContent>
</Popover>
```

---

## ♿ Khả năng truy cập & Điều hướng bàn phím

| Phím bấm | Hành vi |
| :--- | :--- |
| `Enter` / `Space` | Kích hoạt mở hoặc đóng popover khi đang focus tại trigger. |
| `Tab` | Di chuyển focus tuần tự qua các phần tử tương tác (inputs, buttons) bên trong popover. |
| `Shift + Tab` | Di chuyển ngược lại phần tử tương tác trước đó trong popover. |
| `Escape` | Đóng popover và tự động khôi phục focus về lại trigger element. |

---

## 📋 API Reference

### `<Popover>` (Root Component)

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Các subcomponents (`PopoverTrigger`, `PopoverContent`). |
| `open` | `boolean` | — | Trạng thái mở popover (chế độ Controlled). |
| `defaultOpen` | `boolean` | `false` | Trạng thái mở ban đầu (chế độ Uncontrolled). |
| `onOpenChange` | `(open: boolean) => void` | — | Callback khi trạng thái mở/đóng thay đổi. |
| `trigger` | `'click' \| 'hover'` | `'click'` | Kiểu kích hoạt mở popover. |
| `placement` | `PopoverPlacement` | `'bottom'` | Hướng hiển thị của popover so với trigger. |
| `offset` | `number` | `8` | Khoảng cách (px) giữa trigger và popover. |
| `flip` | `boolean` | `true` | Tự động đảo hướng khi popover bị tràn mép màn hình. |
| `shift` | `boolean` | `true` | Tự động dịch chuyển popover để không bị che khuất. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích thước áp dụng cho padding/font của popover. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Độ bo góc của khung popover. |
| `color` | `PopoverColor` | `'neutral'` | Tông màu chủ đề của popover. |
| `disabled` | `boolean` | `false` | Vô hiệu hóa toàn bộ Popover. |
| `animated` | `boolean` | `true` | Bật/tắt hiệu ứng chuyển động khi mở/đóng. |
| `animationDuration` | `number` | `150` | Thời lượng hiệu ứng (ms). |
| `modal` | `boolean` | `false` | Khóa tiêu điểm bên trong popover và ngăn tương tác nền ngoài. |
| `closeOnEsc` | `boolean` | `true` | Đóng popover khi nhấn phím `Escape`. |
| `closeOnClickOutside` | `boolean` | `true` | Đóng popover khi click ra ngoài. |

---

### `<PopoverTrigger>`

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Phần tử con làm trigger. |
| `asChild` | `boolean` | `false` | Truyền trực tiếp props/events vào phần tử con thay vì bọc button mặc định. |
| `className` | `string` | `""` | Class CSS tùy biến bổ sung. |
| `ref` | `Ref<HTMLElement>` | — | React 19 Ref trực tiếp vào trigger element. |

---

### `<PopoverContent>`

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Nội dung bên trong popover. |
| `minWidth` | `string \| number` | — | Độ rộng tối thiểu của popover. |
| `maxWidth` | `string \| number` | — | Độ rộng tối đa của popover. |
| `zIndex` | `number` | `DEFAULT_Z_INDEX.POPOVER` (50) | Thứ tự z-index của popover nổi. |
| `className` | `string` | `""` | Class CSS tùy biến bổ sung. |
| `style` | `CSSProperties` | — | Style inline tùy biến bổ sung. |
| `ref` | `Ref<HTMLDivElement>` | — | React 19 Ref trực tiếp vào content container. |

---

### `<PopoverHeader>`, `<PopoverBody>`, `<PopoverFooter>`, `<PopoverClose>`

- `<PopoverHeader>`: Tiêu đề của popover (chuẩn WAI-ARIA `<h2>` ngữ nghĩa dialog).
- `<PopoverBody>`: Phần thân chính chứa văn bản, inputs hoặc controls.
- `<PopoverFooter>`: Chân trang chứa các nút hành động (Cancel, Submit).
- `<PopoverClose>`: Nút kích hoạt đóng popover (hỗ trợ `asChild` để gắn vào bất kỳ component Button tùy ý).
