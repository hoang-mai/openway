# 📄 Upload File Component Suite (`@openway/ui`)

Bộ component **UploadFile** toàn diện, linh hoạt và hiệu năng cao dành cho việc tải lên, kéo thả (Drag & Drop), quản lý danh sách, xem trước (Preview) và kiểm tra các loại tệp tin tài liệu (PDF, Word, Excel, PowerPoint, ZIP, Media, Code, v.v.).

Component được xây dựng đồng bộ 100% với hệ thống **Design System** của `@openway/ui`, tương đương cấu trúc với `UploadImage`, sử dụng chung kiểu dữ liệu `PreviewFile` và tích hợp sâu với `<FileContainer>` để xem trước tệp tin tức thì.

---

## 🌟 Điểm nổi bật

- **Kiểu dữ liệu đồng nhất toàn hệ sinh thái**:
  - Tái sử dụng trực tiếp kiểu dữ liệu `PreviewFile` (`File | ServerFile | string`) từ `file-preview` tương thích hoàn toàn với `UploadImage` và `FileContainer`.
- **Hệ thống nhận diện `FileIcon` thông minh**:
  - Tự động phân tích phần mở rộng và MIME type để hiển thị icon tài liệu và huy hiệu màu sắc đặc trưng:
    - 🔴 **PDF**: Huy hiệu đỏ (`PDF`)
    - 🔵 **Word / Docs** (`doc`, `docx`): Huy hiệu xanh dương (`DOC`)
    - 🟢 **Excel / Sheets** (`xls`, `xlsx`, `csv`): Huy hiệu xanh lá (`XLS`)
    - 🟠 **PowerPoint** (`ppt`, `pptx`): Huy hiệu cam (`PPT`)
    - 🟡 **Archive / ZIP** (`zip`, `rar`, `7z`, `tar`): Huy hiệu vàng/hổ phách (`ZIP`)
    - 🟣 **Audio**: Huy hiệu tím (`AUD`)
    - 🔷 **Video**: Huy hiệu xanh ngọc (`VID`)
    - ⬛ **Code**: Huy hiệu chàm (`DEV`)
    - ⚪ **Khác**: Huy hiệu trung tính (`FILE`)
- **3 Chế độ hiển thị (`viewMode`)**:
  - `dropzone` *(mặc định)*: Khung viền nét đứt lớn hỗ trợ kéo thả và nhấn chọn tệp. Danh sách các tệp tin đã tải lên luôn hiển thị trực quan ngay bên dưới.
  - `button`: Nút bấm kích hoạt tải tệp gọn gàng kèm icon, thích hợp cho toolbar hoặc khu vực hẹp.
  - `compact`: Khung kéo thả thu gọn dạng thanh ngang 1 dòng tiết kiệm diện tích.
- **2 Kiểu hiển thị danh sách (`listType`)**:
  - `list` *(mặc định)*: Dạng hàng ngang chi tiết với icon, tên file, dung lượng format (`formatBytes`), thanh tiến trình và các nút hành động.
  - `grid`: Bố cục dạng thẻ (card) trên lưới responsive.
- **Theo dõi tiến trình & Trạng thái lỗi**:
  - Hỗ trợ hiển thị thanh tiến trình mini động khi `status: "uploading"` kèm tỷ lệ `%` hoàn thành.
  - Hiển thị thông báo lỗi chi tiết khi `status: "error"` và nút **Thử lại** (`onRetry`).
- **Tích hợp sẵn xem trước & Tải xuống**:
  - Click vào tên tệp hoặc nút Xem trước (`EyeIcon`) tự động kích hoạt modal `<FileContainer>` đa năng.
  - Hỗ trợ tải trực tiếp tệp về máy tính qua `downloadFile` hoặc callback `onDownload`.
- **Chuẩn Design System**:
  - 5 kích thước: `xs`, `sm`, `md`, `lg`, `xl`.
  - 7 bảng màu: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`.
  - 4 biến thể: `outline`, `filled`, `ghost`, `other`.
  - Bo góc: `none`, `sm`, `md`, `lg`, `xl`, `full`.
  - Safe Config Fallback với `getSafeConfig`.
  - Nhãn form hỗ trợ `isRequired` (dấu sao đỏ) và đổi màu khi focus (`group-focus-within/field`).
- **Hỗ trợ tiếp cận (A11y)**:
  - Tương thích bàn phím: <kbd>Tab</kbd>, <kbd>Enter</kbd> / <kbd>Space</kbd> để chọn file, <kbd>Delete</kbd> / <kbd>Backspace</kbd> để xóa tệp.
  - Vùng thông báo động Screen Reader qua `aria-live="polite"`.

---

## 🚀 Cài đặt & Import

```tsx
import {
  UploadFile,
  UploadFileDropzone,
  UploadFileList,
  UploadFileItemRow,
  FileIcon,
  formatBytes,
  getFileCategory,
} from "@openway/ui";

import type {
  UploadFileProps,
  UploadFileConfig,
  UploadFileViewMode,
  UploadFileListType,
  UploadFileSize,
  UploadFileColor,
  UploadFileVariant,
  UploadFileRadius,
  PreviewFile,
  ServerFile,
} from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Chế độ Dropzone mặc định (1 tệp hoặc nhiều tệp)

```tsx
import { useState } from "react";
import { UploadFile, PreviewFile } from "@openway/ui";

export function BasicExample() {
  const [files, setFiles] = useState<PreviewFile[]>([]);

  return (
    <UploadFile
      value={files}
      onChange={setFiles}
      label="Tài liệu đính kèm"
      config={{ isRequired: true }}
      helperText="Hỗ trợ PDF, DOCX, XLSX tối đa 10MB"
      maxSize={10 * 1024 * 1024}
    />
  );
}
```

---

### 2. Bố cục danh sách dạng Grid (`listType="grid"`)

```tsx
<UploadFile
  listType="grid"
  config={{ multiple: true }}
  label="Hồ sơ nghiệm thu dự án"
  defaultValue={[
    { id: "1", name: "bien-ban-nghiem-thu.pdf", size: 1450000 },
    { id: "2", name: "phu-luc-khoi-luong.xlsx", size: 850000 },
  ]}
/>
```

---

### 3. Chế độ Button Trigger

```tsx
<UploadFile
  viewMode="button"
  buttonText="Chọn tài liệu"
  config={{ multiple: true }}
  label="Hồ sơ đính kèm"
  onChange={(items) => console.log("Danh sách tệp:", items)}
/>
```

---

### 4. Chế độ Compact Dropzone (Thanh ngang 1 dòng)

```tsx
<UploadFile
  viewMode="compact"
  label="Bản sao chứng minh thư"
  dropzoneTitle="Kéo thả CMND/CCCD hoặc nhấn để duyệt"
/>
```

---

### 5. Quản lý trạng thái Uploading & Lỗi

```tsx
const fileList: ServerFile[] = [
  {
    id: "1",
    name: "bao-cao-tai-chinh.xlsx",
    size: 2500000,
    status: "uploading",
    progress: 75,
  },
  {
    id: "2",
    name: "ho-so-loi.zip",
    size: 15000000,
    status: "error",
    error: "Dung lượng vượt quá cấu hình máy chủ",
  },
];

<UploadFile
  value={fileList}
  onRetry={(item, index) => {
    console.log("Thử lại tải tệp:", item);
  }}
/>
```

---

### 6. Sử dụng độc lập `FileIcon`

```tsx
import { FileIcon } from "@openway/ui";

<div className="flex items-center gap-3">
  <FileIcon fileName="bao-cao.pdf" size="md" />
  <FileIcon fileName="bang-luong.xlsx" size="md" />
  <FileIcon fileName="du-an.zip" size="md" />
  <FileIcon fileName="source-code.ts" size="md" />
</div>
```

---

## ⚙️ Bảng Props `UploadFileProps`

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `config` | `UploadFileConfig` | `undefined` | Cấu hình tập trung các cờ boolean (`multiple`, `isRequired`, `isInvalid`, `isLoading`, `showFileList`...) |
| `value` | `PreviewFile[] \| PreviewFile \| null` | `undefined` | Danh sách tệp tin (Controlled mode) |
| `defaultValue` | `PreviewFile[] \| PreviewFile \| null` | `undefined` | Giá trị ban đầu (Uncontrolled mode) |
| `onChange` | `(items: PreviewFile[]) => void` | `undefined` | Callback khi danh sách tệp thay đổi |
| `onRemove` | `(item: PreviewFile, index: number) => void` | `undefined` | Callback khi xóa 1 tệp tin |
| `onPreview` | `(item: PreviewFile) => void` | `undefined` | Callback khi bấm xem trước |
| `onDownload` | `(item: PreviewFile) => void` | `undefined` | Callback khi bấm tải xuống |
| `onRetry` | `(item: PreviewFile, index: number) => void` | `undefined` | Callback khi bấm nút thử lại |
| `viewMode` | `'dropzone' \| 'button' \| 'compact'` | `'dropzone'` | Chế độ hiển thị giao diện tải |
| `listType` | `'list' \| 'grid'` | `'list'` | Kiểu bố cục danh sách tệp |
| `shape` | `'rectangle' \| 'square'` | `'rectangle'` | Hình dạng khung Dropzone |
| `maxCount` | `number` | `1` (khi !multiple) | Số lượng tệp tối đa |
| `maxSize` | `number` | `undefined` | Dung lượng tệp tối đa (bytes) |
| `minSize` | `number` | `undefined` | Dung lượng tệp tối thiểu (bytes) |
| `accept` | `string \| Accept` | `undefined` | Định dạng cho phép (ví dụ: `".pdf,.docx"`) |
| `beforeUpload` | `(file: File) => boolean \| string \| Promise<...>` | `undefined` | Hook kiểm tra tệp trước khi nạp |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích thước component |
| `color` | `'primary' \| 'secondary' \| 'neutral' \| ...` | `'primary'` | Bảng màu chủ đề |
| `variant` | `'outline' \| 'filled' \| 'ghost' \| 'other'` | `'outline'` | Biến thể đường viền/nền |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Độ bo góc |
| `label` | `ReactNode` | `undefined` | Tiêu đề nhãn của trường form |
| `labelClassName` | `string` | `""` | Lớp CSS tùy biến cho nhãn |
| `helperText` | `ReactNode` | `undefined` | Văn bản gợi ý |
| `errorMessage`| `ReactNode` | `undefined` | Thông báo lỗi |
| `disabled` | `boolean` | `false` | Vô hiệu hóa tương tác |
| `readOnly` | `boolean` | `false` | Chế độ chỉ đọc |
| `renderItem` | `(item, index, actions) => ReactNode` | `undefined` | Tùy biến render từng mục tệp |

### Cấu trúc `UploadFileConfig`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `multiple` | `boolean` | `false` | Cho phép tải lên nhiều tệp tin cùng lúc |
| `isRequired` | `boolean` | `false` | Đánh dấu trường bắt buộc nhập (dấu * đỏ) |
| `isInvalid` | `boolean` | `false` | Đánh dấu trạng thái lỗi |
| `isLoading` | `boolean` | `false` | Trạng thái đang tải / xử lý |
| `showSpinner` | `boolean` | `false` | Hiển thị biểu tượng xoay spinner khi đang loading |
| `showFileList`| `boolean` | `true` | Hiển thị danh sách tệp bên dưới |
| `showPreviewButton` | `boolean` | `true` | Hiển thị nút xem trước trên từng mục tệp |
| `showDownloadButton`| `boolean` | `true` | Hiển thị nút tải xuống trên từng mục tệp |
| `showRemoveButton` | `boolean` | `true` | Hiển thị nút xóa trên từng mục tệp |

---

## ⌨️ Phím tắt & Trợ năng (Accessibility)

- <kbd>Tab</kbd>: Di chuyển tiêu điểm bàn phím vào vùng Dropzone, nút Tải hoặc từng mục tệp tin.
- <kbd>Enter</kbd> hoặc <kbd>Space</kbd>: Mở hộp thoại chọn tệp của hệ thống hoặc kích hoạt xem trước.
- <kbd>Delete</kbd> hoặc <kbd>Backspace</kbd>: Xóa tệp đang được focus khỏi danh sách (trừ chế độ `readOnly` hoặc `disabled`).
- Tự động phát âm thanh/thông báo trợ năng qua vùng `<div aria-live="polite" className="sr-only">`.
