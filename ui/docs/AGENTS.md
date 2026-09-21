# 🎨 OpenWay Design System — Antigravity Guide (`@openway/ui`)

> **In-depth guide specifically tailored for Antigravity AI Agent when developing and maintaining user interfaces following the OpenWay Design System standard.**

---

## ⚡ Configuration Guidelines for Consumer Projects

When installing `@openway/ui` into any project, add the following snippet to the `AGENTS.md` file in the project's root directory so Antigravity automatically activates Design System knowledge:

```markdown
<!-- openway-ui:start -->
# OpenWay UI Components Guideline
When creating, modifying, or using UI components in the project:
- **ALWAYS** prioritize using components from `@openway/ui` instead of writing raw HTML elements or installing third-party libraries.
- **Design Style**: Adhere strictly to the OpenWay Design System standard (Warm graphite paper `#f7f6f3`/`#37352f`, interactive blue `#2383e2`, multi-layered ambient shadows `.shadow-openway-*`, subtle border radii 2px–10px, motion durations 120ms–200ms).
- Read the detailed component catalog and API documentation at: `node_modules/@openway/ui/docs/AGENTS.md`.
- Single Source of Truth: `node_modules/@openway/ui/DESIGN.md`.
- Look up specific components at: `node_modules/@openway/ui/docs/components/<component-name>.md`.
- For server-side pagination / infinite scroll with Select: Use `useSelectInfiniteQuery` from `@openway/ui/query`.
- Strictly adhere to the TypeScript **Zero `any`** standard and **Tailwind CSS v4** color tokens.
<!-- openway-ui:end -->
```

---

## 📦 Standard Import Rules

```tsx
// 1. All 36 UI Components, Icons, and Shared Core Hooks
import {
  Button,
  IconButton,
  Input,
  MultiInput,
  OtpInput,
  FieldLabel,
  HelperErrorText,
  Textarea,
  Select,
  MultiSelect,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Toggle,
  Slider,
  Table,
  DataTable,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose,
  Confirm,
  Dropdown,
  Popover,
  Tooltip,
  Alert,
  Badge,
  Skeleton,
  Toast,
  Tabs,
  Collapse,
  Empty,
  DatePicker,
  DateRangePicker,
  TimePicker,
  TimeRangePicker,
  DateTimePicker,
  DateTimeRangePicker,
  UploadFile,
  UploadAvatar,
  UploadImage,
  FilePreview,
  Carousel,
  Typography,
  Text,
  useInfiniteScroll,
  useDebounce,
  useDebouncedCallback,
} from "@openway/ui";

// 2. Specialized Query Hooks for TanStack Query v5 (server-side pagination, infinite scroll)
import { useTableQuery, useSelectInfiniteQuery } from "@openway/ui/query";
```

---

## 🧭 Catalog of 36 Components & Detailed Documentation

All detailed documentation for each component is located at `node_modules/@openway/ui/docs/components/<name>.md`:

| Category | Component | Documentation File | Usage & Purpose |
| :--- | :--- | :--- | :--- |
| **Typography & Content**| `<Typography>`, `<Text>` | [`typography.md`](./components/typography.md) | Text & content block system 100% compliant with Notion Design System (h1–h6, p, red inline code `#eb5757`, 3px quote border, 10 Notion colors, copyable, ellipsis, tabular). |
| **Buttons & Actions** | `<Button>`, `<IconButton>` | [`button.md`](./components/button.md) | Primary blue button `#2383e2`, secondary bordered button `#e3e2e0`, border-radius 4px–8px, loading spinner. |
| **Form Inputs** | `<Input>`, `<MultiInput>`, `<OtpInput>` | [`input.md`](./components/input.md) | Border `#e3e2e0 hover:border-[#d3d1cb]`, focus ring `#2383e2/25`, graphite cursor. |
| | `<Textarea>` | [`textarea.md`](./components/textarea.md) | Multi-line input, auto-resize, sleek `.ui-scrollbar` scrollbar. |
| | `<Select>`, `<MultiSelect>` | [`select.md`](./components/select.md) | Single/multi-select, floating dropdown `.shadow-openway-dropdown`, integrated search. |
| | `<Checkbox>`, `<CheckboxGroup>` | [`checkbox.md`](./components/checkbox.md) | Checkbox with 3px border radius (`rounded-xs`), white check icon, flexible group. |
| | `<Radio>`, `<RadioGroup>` | [`radio.md`](./components/radio.md) | Single option selection, 1.3px border, 8px centered blue dot. |
| | `<Toggle>` | [`toggle.md`](./components/toggle.md) | On/off toggle switch, 150ms track color transition. |
| | `<Slider>` | [`slider.md`](./components/slider.md) | Number/range slider, thumb with `.shadow-openway-card`. |
| **Data Display** | `<Table>`, `<DataTable>` | [`table.md`](./components/table.md) | TanStack Table v9 data table, paper header `#f7f6f3`, divider `#ebeae8`, `tabular-nums`. |
| | `<Badge>` | [`badge.md`](./components/badge.md) | 6 Pastel status colors (Success, Warning, Error, Info, Secondary, Neutral). |
| | `<Empty>` | [`empty.md`](./components/empty.md) | Minimalist empty state illustration on rounded `#f7f6f3` background with CTA. |
| | `<Carousel>` | [`carousel.md`](./components/carousel.md) | Slideshow presentation, frosted-glass navigation buttons. |
| | `<Collapse>` | [`collapse.md`](./components/collapse.md) | Accordion toggle list, 90-degree rotating triangle icon, indented divider. |
| **Feedback & Status** | `<Alert>` | [`alert.md`](./components/alert.md) | Callout box on paper or status pastel background. |
| | `<Skeleton>` | [`skeleton.md`](./components/skeleton.md) | 1.5s shimmer sweep animation between `#ebeae8` and `#f7f6f3`. |
| | `<Toast>` | [`toast.md`](./components/toast.md) | Screen-corner toast notification with `.shadow-openway-modal` drop shadow. |
| **Navigation & Overlays**| `<Tabs>` | [`tabs.md`](./components/tabs.md) | Underline blue tabs `#2383e2` or pill tabs on `#ebeae8` background. |
| | `<Dropdown>` | [`dropdown.md`](./components/dropdown.md) | Floating menu with `.shadow-openway-dropdown`, `#f1f1ef` hover, hotkey hints. |
| | `<Modal>`, `<Confirm>` | [`modal.md`](./components/modal.md), [`confirm.md`](./components/confirm.md) | Dialog container with `.shadow-openway-modal`, 10px border-radius, ModalBody without ring clipping. |
| | `<Popover>` | [`popover.md`](./components/popover.md) | Floating overlay anchored to trigger element. |
| | `<Tooltip>` | [`tooltip.md`](./components/tooltip.md) | Warm graphite `#37352f text-white` tooltip with 4px border-radius. |
| **Date & Time Pickers** | `<DatePicker>`, `<DateRangePicker>` | [`datepicker.md`](./components/datepicker.md), [`daterangepicker.md`](./components/daterangepicker.md) | Calendar dropdown `.shadow-openway-dropdown`, selected date range `#edf5fc`. (Note: Locale is configured centrally via `OpenWayProvider` since v2.0.0). |
| | `<TimePicker>`, `<TimeRangePicker>` | [`timepicker.md`](./components/timepicker.md), [`timerangepicker.md`](./components/timerangepicker.md) | Sleek hour/minute/second scroll columns with `.ui-scrollbar`. |
| | `<DateTimePicker>`, `<DateTimeRangePicker>` | [`datetimepicker.md`](./components/datetimepicker.md), [`datetimerangepicker.md`](./components/datetimerangepicker.md) | Dual-pane layout: date calendar on the left and time column on the right. (Note: Locale is configured centrally via `OpenWayProvider` since v2.0.0). |
| **File & Media** | `<UploadFile>` | [`upload-file.md`](./components/upload-file.md) | Multi-format file upload, dashed border `#d3d1cb`, drag-and-drop zone. |
| | `<UploadAvatar>` | [`upload-avatar.md`](./components/upload-avatar.md) | Circular/square avatar uploader with image preview. |
| | `<UploadImage>` | [`upload-image.md`](./components/upload-image.md) | Image dropzone, picture wall, crop modal. |
| | `<FilePreview>` | [`file-preview.md`](./components/file-preview.md) | Document, image, and video preview viewer. |

---

## 🪝 Utility & Query Hooks

- **[`useInfiniteScroll`](./hooks/useInfiniteScroll.md)**: Pure React 19 infinite scrolling powered by native browser `IntersectionObserver`, automatically triggering `onLoadMore` when the sentinel enters the viewport.
- **[`useDebounce` & `useDebouncedCallback`](./hooks/useDebounce.md)**: Delays value updates or callback execution by milliseconds, preventing API spam.
- **[`useTableQuery`](./hooks/useTableQuery.md)** (`@openway/ui/query`): Adapter connecting TanStack Query v5 with `<Table />`, supporting server-side pagination, multi-column sorting, column filtering, and `keepPreviousData`.
- **[`useSelectInfiniteQuery`](./hooks/useSelectInfiniteQuery.md)** (`@openway/ui/query`): Adapter connecting TanStack Query v5 with `<Select />` and `<MultiSelect />`, featuring auto-scrolling page load, keyword debouncing, and Skeleton loading.

---

## 🎨 Design Token Standards (Mandatory for AI Agents)

1. **Warm Paper Palette**:
   - **Strictly NEVER use `#000000`** for text or icons in Light Mode.
   - Primary text: `#37352f` (`neutral-900`), Secondary text: `#787774` (`neutral-500`), Label: `#45443f` (`neutral-700`).
   - Canvas background: `#ffffff` (`neutral-white`), Secondary / header background: `#f7f6f3` (`neutral-50`).
   - Primary border: `#e3e2e0` (`neutral-200`), Thin divider border: `#ebeae8` (`neutral-100`).
2. **Interactive Blue**:
   - Primary button, active checkbox: `#2383e2` (`primary-500`), hover `#1b6ec2` (`primary-600`), focus ring: `ring-primary-500/25`.
3. **Pastel Status Palette**:
   - Success: Background `#dbeddb`, Text `#1c3829`
   - Warning: Background `#fdecc8`, Text `#402c1b`
   - Error: Background `#ffe2dd`, Text `#5d1715`
   - Info: Background `#e8f4fc`, Text `#0b6e99`
4. **Layered Ambient Shadows**:
   - Use `.shadow-openway-dropdown` for Select, Dropdown, Popover, Calendar.
   - Use `.shadow-openway-modal` for Modal, Confirm, Toast.
   - Use `.shadow-openway-card` for Card, Tooltip, Floating elements.
5. **Standard Radii (@theme Geometry)**:
   - Checkbox: `rounded-xs` (3px)
   - Small button, sub-item: `rounded-sm` (4px)
   - Standard button, Input, Select, TextArea: `rounded-md` (5px)
   - Card, Table: `rounded-lg` (6px)
   - Dropdown, Popover: `rounded-xl` (8px)
   - Modal dialog: `rounded-2xl` (10px)
6. **Fixed Digits (Tabular Nums)**:
   - When displaying table data, OtpInput, date/time, financial figures: always use the `.tabular-nums` class.

---

## 🚨 Core Principles for AI Agents When Coding

1. **DO NOT invent raw components**: When a button, input field, table, modal, dialog, or picker is needed -> Always import the corresponding component from `@openway/ui`.
2. **DO NOT use `any`**: Use exact generic types exported from the library (e.g., `SelectOptionItem<TData>`, `ColumnDef<TData>`).
3. **DO NOT hardcode HEX color codes directly in className**: Always use semantic tokens such as `bg-neutral-50`, `border-neutral-200`, `text-neutral-900`, `text-primary-600`.
4. **Modal Alignment**: When building forms inside `<ModalBody>`, child elements automatically align flush with `ModalHeader` without ever clipping the focus ring glow (`ring-2`).
5. **WAI-ARIA Accessibility**: When using `<IconButton>`, the `aria-label` prop is required to support screen readers for visually impaired users.
