# 📚 OpenWay UI — Comprehensive Documentation Hub (`@openway/ui`)

> **The official documentation center for OpenWay UI Design System.**

This folder is packaged directly inside `node_modules/@openway/ui/docs/` so developers and **AI Assistants (Antigravity)** can quickly reference and utilize components with high precision.

---

## 🚀 Quick Table of Contents

- [1. Antigravity AI Integration Guide](#1-antigravity-ai-integration-guide)
- [2. Installation & Theme Setup](#2-installation--theme-setup)
- [3. Internationalization (i18n) & OpenWayProvider](#3-internationalization-i18n--openwayprovider)
- [4. Catalog of 36 Components](#4-catalog-of-36-components)
- [5. Hooks Catalog (`@openway/ui` & `@openway/ui/query`)](#5-hooks-catalog)
- [6. Design Tokens & Standards](#6-design-tokens--standards)

---

## 1. Antigravity AI Integration Guide

The library is specifically optimized for **Antigravity AI Agent**. You can leverage 3 core documents right away:

- **[`DESIGN.md`](../DESIGN.md)**: The Single Source of Truth for Warm Neutrals, Interactive Blue `#2383e2`, pastel status palette, corner geometry, layered ambient shadows, and micro-interactions.
- **[`AGENTS.md`](./AGENTS.md)**: Agent behavior guidelines, sitemap, import rules, and checklists.
- **[`SKILL.md`](./SKILL.md)**: Antigravity Skill standard format (`openway-ui`), enabling Antigravity to activate on-demand when creating or modifying UI.

### Configuration for Consumer Projects:
Add the following directive block into the `AGENTS.md` file in the root of your project:

```markdown
<!-- openway-ui:start -->
# OpenWay UI Components
When writing UI interfaces or creating/modifying components:
1. Always prioritize using existing components from `@openway/ui`.
2. Strictly adhere to the OpenWay Design System: Warm graphite `#f7f6f3` / `#37352f`, primary button `#2383e2`, layered ambient shadows `.shadow-openway-*`.
3. Refer to documentation and code examples at: `node_modules/@openway/ui/docs/AGENTS.md` and `node_modules/@openway/ui/DESIGN.md`.
4. Check individual component docs at: `node_modules/@openway/ui/docs/components/<component>.md`.
5. For server pagination / infinite scroll: use hooks from `@openway/ui/query`.
6. Strictly enforce Zero `any` and Tailwind CSS v4 color tokens.
<!-- openway-ui:end -->
```

---

## 2. Installation & Theme Setup

### Install Package

```bash
pnpm add @openway/ui
# or
npm install @openway/ui
```

### Setup in `app/globals.css` (Tailwind CSS v4)

Just 3 lines to activate the entire OpenWay Design System:

```css
@import "tailwindcss";

/* 1. Load all Warm Neutrals, Interactive Blue, Shadows, and Animations tokens */
@import "@openway/ui/styles.css";

/* 2. Scan component classes from the library */
@source "../node_modules/@openway/ui";
```

---

## 3. Internationalization (i18n) & OpenWayProvider

Starting in **v2.0.0**, `@openway/ui` features a unified, zero-dependency localization architecture:

- **Default Language**: English (`enUS`) works out of the box without any setup.
- **Switch to Vietnamese (`viVN`)**: Wrap your application root with `<OpenWayProvider locale={viVN}>`.
- **Extensible**: Fully customizable locale dictionaries via the typed `OpenWayLocale` interface.

```tsx
import "@openway/ui/styles.css";
import { OpenWayProvider, viVN } from "@openway/ui/locale";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <OpenWayProvider locale={viVN}>
          {children}
        </OpenWayProvider>
      </body>
    </html>
  );
}
```

> 📖 **Full i18n Guide**: Refer to [`docs/i18n.md`](./i18n.md) for detailed overriding hierarchies, custom locales, and TypeScript types.

---

## 4. Catalog of 36 Components

All detailed documentation for each component is organized under [`components/`](./components/):

### Typography & Content
- **[`typography.md`](./components/typography.md)**: Complete Typography `<Typography>` and `<Text>` system following Notion Design System specifications (h1–h6, p, callouts, red inline code `#eb5757`, 3px-bordered quotes, 10 Notion colors, copyable, ellipsis, tabular nums).

### Buttons & Actions
- **[`button.md`](./components/button.md)**: Push buttons `<Button>` and icon buttons `<IconButton>`, 5 sizes, 6 variants (`filled`, `soft`, `outline`, `ghost`, `text`, `other`), 4px–8px radii, smooth loading spinner.

### Form Inputs & Controls
- **[`input.md`](./components/input.md)**: Text input field `<Input>`, subtle `#e3e2e0` border, `#2383e2/25` focus ring, password visibility toggle, start/end adornment slots.
- **[`textarea.md`](./components/textarea.md)**: Multi-line text field `<Textarea>`, automatic height expansion (`autosize`), ultra-thin scrollbar `.ui-scrollbar`.
- **[`select.md`](./components/select.md)**: Single select `<Select>` and multi select `<MultiSelect>`, client/server search, filter menus, skeleton infinite scrolling.
- **[`checkbox.md`](./components/checkbox.md)**: Checkbox `<Checkbox>` with 3px radius (`rounded-xs`), group `<CheckboxGroup>`, indeterminate state, flexible layouts.
- **[`radio.md`](./components/radio.md)**: Single-choice `<Radio>` and `<RadioGroup>`, with card-style layout support.
- **[`toggle.md`](./components/toggle.md)**: Switch toggle `<Toggle>`, smooth 150ms transition, supporting on/off icons and descriptive labels.
- **[`slider.md`](./components/slider.md)**: Numeric and range slider `<Slider>` built on Radix UI Slider.

### Data Display
- **[`table.md`](./components/table.md)**: TanStack Table v9 data tables `<Table>` & `<DataTable>`, warm paper header `#f7f6f3`, hairline divider `#ebeae8`, auto `font-variant-numeric: tabular-nums`.
- **[`badge.md`](./components/badge.md)**: Badges `<Badge>` in 6 pastel status shades (Success, Warning, Error, Info, Secondary, Neutral), count badges, and dot indicators.
- **[`empty.md`](./components/empty.md)**: Empty state display `<Empty>` when no data is available with CTA actions.
- **[`carousel.md`](./components/carousel.md)**: Slide carousel `<Carousel>`, button navigation, autoplay, pagination indicator dots.
- **[`collapse.md`](./components/collapse.md)**: Accordion container `<Collapse>`, supporting single or multiple expanded panels.

### Feedback & Status
- **[`alert.md`](./components/alert.md)**: Alert callouts `<Alert>` (success, error, warning, info pastel tints), dismiss button.
- **[`skeleton.md`](./components/skeleton.md)**: Shimmer placeholder `<Skeleton>` with 1.5s wave animation mimicking loaded layouts.
- **[`toast.md`](./components/toast.md)**: Corner notifications `<Toast>` (Sonner), layered ambient shadow `.shadow-openway-modal`.

### Navigation & Overlays
- **[`tabs.md`](./components/tabs.md)**: Tab switcher `<Tabs>`, animated blue `#2383e2` active indicator underline.
- **[`dropdown.md`](./components/dropdown.md)**: Dropdown action menu `<Dropdown>` with `.shadow-openway-dropdown` and 8px corners.
- **[`modal.md`](./components/modal.md)**: Dialog `<Modal>`, `.shadow-openway-modal`, 10px corners, non-clipping ModalBody for focus rings.
- **[`confirm.md`](./components/confirm.md)**: Destructive action confirmation dialog `<Confirm>` (Delete, Cancel) with loading state.
- **[`popover.md`](./components/popover.md)**: Floating anchor panel `<Popover>` (Floating UI).
- **[`tooltip.md`](./components/tooltip.md)**: Quick descriptive tooltip `<Tooltip>` with warm charcoal background `#37352f`.

### Date & Time Pickers
- **[`datepicker.md`](./components/datepicker.md)**: Date picker `<DatePicker>`, quick presets (Today, Yesterday).
- **[`daterangepicker.md`](./components/daterangepicker.md)**: Date range picker `<DateRangePicker>`.
- **[`timepicker.md`](./components/timepicker.md)**: Time picker `<TimePicker>` with intuitive scrollable hour/minute/second columns.
- **[`timerangepicker.md`](./components/timerangepicker.md)**: Time range picker `<TimeRangePicker>`.
- **[`datetimepicker.md`](./components/datetimepicker.md)**: Combined date and time picker `<DateTimePicker>`.
- **[`datetimerangepicker.md`](./components/datetimerangepicker.md)**: Combined date and time range picker `<DateTimeRangePicker>`.

### File & Media Upload
- **[`upload-file.md`](./components/upload-file.md)**: Versatile file uploader `<UploadFile>`, progress bar, drag-and-drop.
- **[`upload-avatar.md`](./components/upload-avatar.md)**: Circular avatar uploader `<UploadAvatar>` with live preview and cropping.
- **[`upload-image.md`](./components/upload-image.md)**: Multi-image uploader `<UploadImage>` (Dropzone / Picture Wall), integrated image crop modal.
- **[`file-preview.md`](./components/file-preview.md)**: File previewer `<FilePreview>` (images, documents, video).

---

## 5. Hooks Catalog

Detailed documentation for hooks is available under [`hooks/`](./hooks/):

### Core Hooks (`@openway/ui`)
- **[`useInfiniteScroll`](./hooks/useInfiniteScroll.md)**: Pure React 19 infinite scroll mechanism via native `IntersectionObserver`, zero scroll event listeners, mutex locked for concurrency safety.
- **[`useDebounce` & `useDebouncedCallback`](./hooks/useDebounce.md)**: Performance optimization and API debounce protection for search values or callback functions.

### TanStack Query v5 Adapters (`@openway/ui/query`)
- **[`useTableQuery`](./hooks/useTableQuery.md)**: TanStack Query v5 adapter for `<Table />`, managing server pagination, sorting, column filtering, and `keepPreviousData`.
- **[`useSelectInfiniteQuery`](./hooks/useSelectInfiniteQuery.md)**: TanStack Query v5 adapter for `<Select />` and `<MultiSelect />`, automated next-page scrolling, debounced keyword search, and skeleton loading.

---

## 6. Design Tokens & Standards

1. **Warm Paper Aesthetics**: Pure black `#000000` is strictly avoided in Light Mode; primary text is graphite charcoal `#37352f`, paper background `#f7f6f3`, borders `#e3e2e0`.
2. **Interactive Blue**: Primary buttons, checked checkboxes, and active tabs use `#2383e2` (hover `#1b6ec2`).
3. **Pastel Status Palette**:
   - Success: Background `#dbeddb` / Text `#1c3829`
   - Warning: Background `#fdecc8` / Text `#402c1b`
   - Error: Background `#ffe2dd` / Text `#5d1715`
   - Info: Background `#e8f4fc` / Text `#0b6e99`
   - Purple (Secondary): Background `#e8deee` / Text `#412454`
4. **Corner Geometry (@theme Geometry)**:
   - `2xs`: 2px
   - `xs`: 3px (Checkbox)
   - `sm`: 4px (Small button, calendar cell)
   - `md`: 5px (Standard button, Input, Select, Textarea)
   - `lg`: 6px (Card, Table)
   - `xl`: 8px (Dropdown, Popover, Calendar container)
   - `2xl`: 10px (Modal, Confirm)
5. **Layered Ambient Shadows**: Always pair `.shadow-openway-dropdown`, `.shadow-openway-modal`, and `.shadow-openway-card` with subtle hairline borders.
6. **Tabular Numbers**: All data tables, numeric inputs, and timers use `.tabular-nums` (`font-variant-numeric: tabular-nums`).
7. **Zero `any`**: 100% of components and hooks are strictly typed in TypeScript.
