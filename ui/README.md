# @openway/ui

[![npm version](https://img.shields.io/npm/v/@openway/ui.svg?style=flat&color=2383e2)](https://www.npmjs.com/package/@openway/ui)
[![license](https://img.shields.io/npm/l/@openway/ui.svg?style=flat)](https://github.com/hoang-mai/openway/blob/main/ui/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-yellow?style=flat&logo=buy-me-a-coffee)](https://buymeacoffee.com/maianhhoang)
[![Donate MoMo](https://img.shields.io/badge/Donate-MoMo-ae2070?style=flat&logo=momo&logoColor=white)](https://me.momo.vn/maianhhoang)

> **Enterprise-grade React 19 UI component library (OpenWay Design System)**, precision-engineered for Next.js 15/16+ and Tailwind CSS v4 with built-in internationalization (i18n).

The library embodies a modern, calm aesthetic: **Warm Paper Aesthetics**, **Interactive Blue `#2383e2`**, **Soothing Pastel Status Accents**, **Layered Ambient Shadows**, **Crisp 2px–10px Corner Geometry**, and **Snappy 120ms–200ms Micro-Interactions**.

---

## 🌟 Core Design Philosophy (OpenWay Aesthetics)

1. **Content-First & Document-Centric**: The interface functions like premium paper, removing unnecessary heavy borders and high-saturation noise so users can concentrate fully on data and input workflows.
2. **Warm Paper Aesthetics**: Pure black (`#000000`) is never used in Light Mode; warm graphite charcoal (`#37352f`) pairs with a natural warm paper background (`#f7f6f3`) for prolonged visual comfort.
3. **Layered Ambient Shadows**: Hairline 1px semi-transparent borders combined with 2–3 elevation shadow layers (`.shadow-openway-dropdown`, `.shadow-openway-modal`, `.shadow-openway-card`) softly float content above the surface.
4. **Crisp & Compact Geometry**: Clean geometric corner radii from 2px to 10px (`--radius-2xs: 2px` to `--radius-2xl: 10px`), compact and standardized for enterprise dashboards.
5. **Stable Numerics (Tabular Nums)**: All data tables, OtpInputs, Timers, and DatePickers automatically enforce `font-variant-numeric: tabular-nums` to eliminate jitter during value changes.
6. **Snappy Micro-Interactions**: Instant button and menu response (`120ms - 200ms`), removing blue click outlines while preserving full keyboard focus rings for accessibility.
7. **Global-Ready Localization (i18n)**: Default English (`enUS`) with built-in Vietnamese (`viVN`) and an extensible, zero-dependency `OpenWayProvider` for any language.

> 📖 **Single Source of Truth**: Explore full design guidelines in [DESIGN.md](./DESIGN.md) and localization in [docs/i18n.md](./docs/i18n.md).

---

## 1. Installation

```bash
pnpm add @openway/ui
# or
npm install @openway/ui
# or
yarn add @openway/ui
```

---

## 2. Stylesheet & Theme Setup (Tailwind CSS v4)

### Method 1: Use the OpenWay Default Theme (Recommended)

In your root CSS file (e.g. `app/globals.css`):

```css
@import "tailwindcss";

/* 1. Activate OpenWay Warm Neutrals, Blue, Shadows, and Animations */
@import "@openway/ui/styles.css";

/* 2. Instruct Tailwind v4 to scan classes from the library */
@source "../node_modules/@openway/ui";
```

### Method 2: Customize Brand Palette via `@theme`

If your project requires custom brand colors while preserving OpenWay geometry and ambient shadows:

```css
@import "tailwindcss";
@import "@openway/ui/styles.css";
@source "../node_modules/@openway/ui";

@theme {
  /* Override with your brand colors */
  --color-primary-500: #0284c7; /* Main button, active checkbox */
  --color-primary-600: #0369a1; /* Hover */
  --color-primary-700: #075985; /* Focus ring */

  --color-secondary-500: #8b5cf6;
}
```

---

## 3. Quick Start in Your Project

### In `app/layout.tsx`:
```tsx
import "./globals.css";
import { OpenWayProvider, enUS } from "@openway/ui";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* OpenWayProvider defaults to English (enUS) out of the box */}
        <OpenWayProvider locale={enUS}>
          {children}
        </OpenWayProvider>
      </body>
    </html>
  );
}
```

### Using Components in a Page:
```tsx
import { 
  Button, 
  Input, 
  Select, 
  DatePicker, 
  Table, 
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@openway/ui";

export default function Dashboard() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <h1 className="text-xl font-semibold text-neutral-900">Project Management</h1>
        <Badge variant="soft" color="success">Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Task Title" placeholder="Enter title..." isRequired />
        <DatePicker label="Due Date" placeholder="Select date..." />
      </div>

      <Button color="primary" variant="filled">
        Create Task
      </Button>
    </div>
  );
}
```

---

## 4. Internationalization (i18n)

`@openway/ui` features zero-dependency localization. Components default to **English (`enUS`)**.

### Switch to Vietnamese:
```tsx
import { OpenWayProvider, viVN } from "@openway/ui";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <OpenWayProvider locale={viVN}>
      {children}
    </OpenWayProvider>
  );
}
```

### Component-Level Overrides:
Direct props always take precedence over the provider:
```tsx
<ConfirmFooter confirmText="Proceed" cancelText="Dismiss" />
```

For custom language dictionaries (Japanese, French, etc.) and Next.js App Router integration, see [docs/i18n.md](./docs/i18n.md).

---

## 5. Component Catalog (36 Components)

Every component is built with strict TypeScript type safety (Zero `any`), WAI-ARIA accessibility, and keyboard navigation:

| Category | Components | Description |
| :--- | :--- | :--- |
| **Buttons & Actions** | `<Button>`, `<IconButton>` | 5 sizes, 6 variants, 4px–8px radii, smooth loading spinner. |
| **Form Inputs & Controls** | `<Input>`, `<PasswordInput>`, `<NumberInput>`, `<OtpInput>`, `<MultiInput>`, `<TextArea>`, `<FieldLabel>`, `<HelperErrorText>` | Standard outline `#e3e2e0`, focus ring `#2383e2/25`, autosize textarea. |
| **Selections & Toggles** | `<Select>`, `<Checkbox>`, `<CheckboxGroup>`, `<Radio>`, `<RadioGroup>`, `<Toggle>`, `<Slider>` | Floating menu `.shadow-openway-dropdown`, 3px rounded checkbox, 150ms snappy toggle. |
| **Date & Time Pickers** | `<DatePicker>`, `<DateRangePicker>`, `<TimePicker>`, `<TimeRangePicker>`, `<DateTimePicker>`, `<DateTimeRangePicker>` | Calendar popup `.shadow-openway-dropdown`, continuous date range, `tabular-nums` stability. |
| **Data Display** | `<Table>`, `<DataTable>`, `<Badge>`, `<Empty>`, `<Carousel>`, `<Collapse>` | TanStack Table v9, warm paper header `#f7f6f3`, hairline dividers `#ebeae8`, 6 pastel badge colors. |
| **Modals & Overlays** | `<Modal>`, `<Confirm>`, `<Dropdown>`, `<Popover>`, `<Tooltip>`, `<Toast>` | Ambient dialog shadows `.shadow-openway-modal`, 10px radii, Sonner-powered toasts. |
| **Feedback & Upload** | `<Alert>`, `<Skeleton>`, `<UploadFile>`, `<UploadAvatar>`, `<UploadImage>`, `<FilePreview>` | Design system callout alerts, 1.5s shimmer animation, dashed-border file dropzones with cropper. |

---

## 6. Design Tokens Reference

### Warm Neutrals (Light Mode)
```css
--color-neutral-white: #ffffff;  /* Card Background, Input Surface */
--color-neutral-50:    #f7f6f3;  /* Sidebar, Table Header, Dropzone Background */
--color-neutral-100:   #ebeae8;  /* Divider, Hairline border */
--color-neutral-200:   #e3e2e0;  /* Input Border, Table Outer Border */
--color-neutral-300:   #d3d1cb;  /* Hover Border, Scrollbar Thumb */
--color-neutral-400:   #9b9a97;  /* Placeholder, Muted Icons */
--color-neutral-500:   #787774;  /* Secondary Text */
--color-neutral-700:   #45443f;  /* Form Label, Section Header */
--color-neutral-900:   #37352f;  /* Primary Text */
```

### Status & Badge Palette
- **Success**: Background `#dbeddb` / Text `#1c3829`
- **Warning**: Background `#fdecc8` / Text `#402c1b`
- **Error**: Background `#ffe2dd` / Text `#5d1715`
- **Info**: Background `#e8f4fc` / Text `#0b6e99` (Vibrant Ocean Blue)
- **Secondary**: Background `#e8deee` / Text `#412454`

### Border Radii Scale
- `--radius-2xs: 2px;`
- `--radius-xs: 3px;` (Checkbox, inline code)
- `--radius-sm: 4px;` (Small button, calendar date cell)
- `--radius-md: 5px;` (Standard button, Select, Input, TextArea)
- `--radius-lg: 6px;` (Card, Table frame)
- `--radius-xl: 8px;` (Dropdown menu, Popover, Calendar picker)
- `--radius-2xl: 10px;` (Modal dialog, Confirm dialog)

---

## 7. Documentation & Antigravity AI Guide (`docs/`)

Explore in-depth component specifications and code examples in the [docs/](./docs/) directory:
- **[Documentation Hub](./docs/README.md)**: Full index of all 36 components and hooks.
- **[Internationalization Guide (i18n)](./docs/i18n.md)**: Custom locales, Next.js App Router routing.
- **[Antigravity Agent Guide](./docs/AGENTS.md)**: Specialized prompt and guidelines for Antigravity AI Agents.
- **[Antigravity Skill](./docs/SKILL.md)**: Standalone skill format (`openway-ui`).
- **[Components Directory](./docs/components/)**: Dedicated docs and prop tables for each component.
- **[Hooks Directory](./docs/hooks/)**: Guides for `useTableQuery`, `useSelectInfiniteQuery`, `useMutationApp`, `useInfiniteScroll`.

---

## 8. 💖 Sponsor & Support

If you find `@openway/ui` helpful, please consider supporting the project:
- **Buy Me a Coffee**: [buymeacoffee.com/maianhhoang](https://buymeacoffee.com/maianhhoang)
- **MoMo**: [me.momo.vn/maianhhoang](https://me.momo.vn/maianhhoang) (`0867254603`)

---

## 9. License

Published under the [MIT License](https://github.com/hoang-mai/openway/blob/main/ui/LICENSE).
