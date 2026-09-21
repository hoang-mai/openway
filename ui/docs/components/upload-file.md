# 📄 Upload File Component Suite (`@openway/ui`)

A comprehensive, flexible, and high-performance **UploadFile** component suite for file uploading, drag-and-drop interactions, file list management, instant file previewing, and validation across documents and media files (PDF, Word, Excel, PowerPoint, ZIP, Audio, Video, Code, and more).

Built 100% in harmony with the `@openway/ui` **Design System**, structurally parallel to `UploadImage`, sharing the universal `PreviewFile` data structure and deeply integrated with `<FileContainer>` for rich instantaneous previews.

---

## 🌟 Features

- **Unified Ecosystem Data Types**:
  - Directly reuses the `PreviewFile` (`File | ServerFile | string`) data type from `file-preview`, ensuring seamless compatibility with `UploadImage` and `FileContainer`.
- **Intelligent `FileIcon` Identification System**:
  - Automatically analyzes extensions and MIME types to display recognizable document icons and color badges:
    - 🔴 **PDF**: Red badge (`PDF`)
    - 🔵 **Word / Docs** (`doc`, `docx`): Blue badge (`DOC`)
    - 🟢 **Excel / Sheets** (`xls`, `xlsx`, `csv`): Green badge (`XLS`)
    - 🟠 **PowerPoint** (`ppt`, `pptx`): Orange badge (`PPT`)
    - 🟡 **Archive / ZIP** (`zip`, `rar`, `7z`, `tar`): Amber/yellow badge (`ZIP`)
    - 🟣 **Audio**: Purple badge (`AUD`)
    - 🔷 **Video**: Teal badge (`VID`)
    - ⬛ **Code**: Indigo badge (`DEV`)
    - ⚪ **Other**: Neutral badge (`FILE`)
- **3 View Modes (`viewMode`)**:
  - `dropzone` *(default)*: Large dashed-border drop zone supporting drag-and-drop and click-to-upload. The list of uploaded files is cleanly rendered immediately below.
  - `button`: Compact upload trigger button with leading icon, ideal for toolbars or narrow spaces.
  - `compact`: Single-line horizontal drag-and-drop bar saving vertical layout real estate.
- **2 List Layouts (`listType`)**:
  - `list` *(default)*: Detailed horizontal rows displaying file icon, filename, formatted file size (`formatBytes`), progress bar, and action buttons.
  - `grid`: Card-based layout on a responsive grid.
- **Progress Tracking & Error Handling**:
  - Dynamic mini progress bar when `status: "uploading"` displaying percentage completion.
  - Detailed error messages when `status: "error"` along with a **Retry** button (`onRetry`).
- **Integrated Preview & Download**:
  - Clicking filename or preview button (`EyeIcon`) triggers the versatile `<FileContainer>` modal.
  - Direct file downloads to disk via `downloadFile` or custom `onDownload` callback.
- **Design System Standards**:
  - 5 sizes: `xs`, `sm`, `md`, `lg`, `xl`.
  - 7 color palettes: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`.
  - 4 variants: `outline`, `filled`, `ghost`, `other`.
  - Border radii: `none`, `sm`, `md`, `lg`, `xl`, `full`.
  - Safe Config Fallback with `getSafeConfig`.
  - Form label with `isRequired` indicator (red asterisk) and focus color highlights (`group-focus-within/field`).
- **Accessibility (A11y)**:
  - Keyboard support: <kbd>Tab</kbd>, <kbd>Enter</kbd> / <kbd>Space</kbd> to pick files, <kbd>Delete</kbd> / <kbd>Backspace</kbd> to delete files.
  - Screen Reader live regions via `aria-live="polite"`.

---

## 🚀 Installation & Import

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

## 📖 Usage Guide

### 1. Default Dropzone Mode (Single or Multiple Files)

```tsx
import { useState } from "react";
import { UploadFile, PreviewFile } from "@openway/ui";

export function BasicExample() {
  const [files, setFiles] = useState<PreviewFile[]>([]);

  return (
    <UploadFile
      value={files}
      onChange={setFiles}
      label="Attached Documents"
      config={{ isRequired: true }}
      helperText="Supports PDF, DOCX, XLSX up to 10MB"
      maxSize={10 * 1024 * 1024}
    />
  );
}
```

---

### 2. Grid Layout (`listType="grid"`)

```tsx
<UploadFile
  listType="grid"
  config={{ multiple: true }}
  label="Project Acceptance Dossier"
  defaultValue={[
    { id: "1", name: "acceptance-report.pdf", size: 1450000 },
    { id: "2", name: "volume-breakdown.xlsx", size: 850000 },
  ]}
/>
```

---

### 3. Button Trigger Mode

```tsx
<UploadFile
  viewMode="button"
  buttonText="Select Documents"
  config={{ multiple: true }}
  label="Attached Documents"
  onChange={(items) => console.log("File list:", items)}
/>
```

---

### 4. Compact Dropzone Mode (Single-line Bar)

```tsx
<UploadFile
  viewMode="compact"
  label="ID Card Scan"
  dropzoneTitle="Drag and drop ID card scan or click to browse"
/>
```

---

### 5. Managing Upload Progress & Error States

```tsx
const fileList: ServerFile[] = [
  {
    id: "1",
    name: "financial-report.xlsx",
    size: 2500000,
    status: "uploading",
    progress: 75,
  },
  {
    id: "2",
    name: "corrupted-file.zip",
    size: 15000000,
    status: "error",
    error: "File size exceeds server upload limit",
  },
];

<UploadFile
  value={fileList}
  onRetry={(item, index) => {
    console.log("Retrying upload for:", item);
  }}
/>
```

---

### 6. Standalone `FileIcon` Usage

```tsx
import { FileIcon } from "@openway/ui";

<div className="flex items-center gap-3">
  <FileIcon fileName="report.pdf" size="md" />
  <FileIcon fileName="payroll.xlsx" size="md" />
  <FileIcon fileName="project.zip" size="md" />
  <FileIcon fileName="source-code.ts" size="md" />
</div>
```

---

## ⚙️ Props Reference (`UploadFileProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `config` | `UploadFileConfig` | `undefined` | Consolidated configuration object for boolean flags (`multiple`, `isRequired`, `isInvalid`, `isLoading`, `showFileList`, etc.) |
| `value` | `PreviewFile[] \| PreviewFile \| null` | `undefined` | Current list of files (Controlled mode) |
| `defaultValue` | `PreviewFile[] \| PreviewFile \| null` | `undefined` | Initial file list (Uncontrolled mode) |
| `onChange` | `(items: PreviewFile[]) => void` | `undefined` | Callback invoked when the file list changes |
| `onRemove` | `(item: PreviewFile, index: number) => void` | `undefined` | Callback invoked when removing a file |
| `onPreview` | `(item: PreviewFile) => void` | `undefined` | Callback invoked when clicking preview |
| `onDownload` | `(item: PreviewFile) => void` | `undefined` | Callback invoked when clicking download |
| `onRetry` | `(item: PreviewFile, index: number) => void` | `undefined` | Callback invoked when clicking retry |
| `viewMode` | `'dropzone' \| 'button' \| 'compact'` | `'dropzone'` | Display layout style for upload trigger |
| `listType` | `'list' \| 'grid'` | `'list'` | File listing layout format |
| `shape` | `'rectangle' \| 'square'` | `'rectangle'` | Dropzone frame geometry |
| `maxCount` | `number` | `1` (when !multiple) | Maximum number of allowed files |
| `maxSize` | `number` | `undefined` | Maximum allowed file size in bytes |
| `minSize` | `number` | `undefined` | Minimum allowed file size in bytes |
| `accept` | `string \| Accept` | `undefined` | Allowed file extensions or MIME types (e.g., `".pdf,.docx"`) |
| `beforeUpload` | `(file: File) => boolean \| string \| Promise<...>` | `undefined` | Hook function to validate file prior to loading |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Component size scale |
| `color` | `'primary' \| 'secondary' \| 'neutral' \| ...` | `'primary'` | Theme color palette |
| `variant` | `'outline' \| 'filled' \| 'ghost' \| 'other'` | `'outline'` | Border and background styling variant |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Border radius |
| `label` | `ReactNode` | `undefined` | Form field label |
| `labelClassName` | `string` | `""` | Custom CSS class for label |
| `helperText` | `ReactNode` | `undefined` | Instructional or hint text beneath input |
| `errorMessage`| `ReactNode` | `undefined` | Error message displayed on validation failure |
| `disabled` | `boolean` | `false` | Disables interaction |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `renderItem` | `(item, index, actions) => ReactNode` | `undefined` | Custom item renderer function |

---

### `UploadFileConfig` Reference

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `multiple` | `boolean` | `false` | Allows uploading multiple files concurrently |
| `isRequired` | `boolean` | `false` | Marks field as required (renders red `*`) |
| `isInvalid` | `boolean` | `false` | Enables invalid error visual state |
| `isLoading` | `boolean` | `false` | Indicates loading or processing state |
| `showSpinner` | `boolean` | `false` | Displays spinning indicator during loading |
| `showFileList`| `boolean` | `true` | Renders file list below trigger |
| `showPreviewButton` | `boolean` | `true` | Displays preview button on file rows |
| `showDownloadButton`| `boolean` | `true` | Displays download button on file rows |
| `showRemoveButton` | `boolean` | `true` | Displays remove button on file rows |

---

## ⌨️ Keyboard Shortcuts & Accessibility

- <kbd>Tab</kbd>: Moves keyboard focus to the Dropzone, Upload button, or individual file items.
- <kbd>Enter</kbd> or <kbd>Space</kbd>: Triggers system file selection dialog or activates file preview.
- <kbd>Delete</kbd> or <kbd>Backspace</kbd>: Removes focused file from list (unless in `readOnly` or `disabled` mode).
- Automatic status announcements dispatched via screen reader live region `<div aria-live="polite" className="sr-only">`.
