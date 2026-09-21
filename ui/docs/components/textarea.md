# 📝 TextArea Component (`@openway/ui`)

A versatile **TextArea** component supporting **automatic height resizing (AutoResize)** powered by `react-textarea-autosize`, integrated **Safe Config Fallback**, **optimized Ref forwarding** via `@floating-ui/react`, **character counter (`showCount`)**, and full **WAI-ARIA Accessibility** compliance.

---

## 🌟 Features

- **`react-textarea-autosize` Integration**: Smoothly expands and contracts height based on input content without causing layout shifts. Supports `minRows`, `maxRows`, `cacheMeasurements`, and the `onHeightChange` callback.
- **Flexible Resizing Modes**: Easily disable automatic resizing with `autoResize={false}` to fall back to a standard native `<textarea>`.
- **5 Standard Sizes (`size`)**: `xs`, `sm`, `md` (*default*), `lg`, `xl` with proportionally scaled typography, padding, label dimensions, and helper text.
- **3 Visual Variants (`variant`)**:
  - `outline` *(default)*: Crisp border around the editor with interactive hover and focus theme states.
  - `filled`: Subtle pastel background (`bg-{color}-50/60`) with an enclosing border.
  - `ghost`: Transparent background that highlights on hover or focus.
  - `other`: Bypasses default color classes for complete custom styling via `textareaWrapperClassName`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **6 Border Radii (`radius`)**: `none`, `sm`, `md` (*default*), `lg`, `xl`, `full`.
- **3 Label Placements (`labelPlacement`)**:
  - `top` *(default)*: Label positioned above the textarea.
  - `left`: Label aligned horizontally to the left of the textarea (automatically structured as a flex row).
  - `floating`: Floating label overlapping the top border of the textarea container.
- **Loading State & Spinner (`isLoading` & `showSpinner`)**:
  - `isLoading={true}`: Automatically disables the input (`disabled`), triggering `aria-busy="true"` and `aria-disabled="true"`.
  - `showSpinner`: Defaults to `false`. Set `showSpinner={true}` to display a rotating spinner icon in the top-right corner.
- **Quick Clear Button (`isClearable` & `onClear`)**: Displays a clear button in the top-right corner when the textarea contains text.
- **Character Counter (`showCount` & `maxLength`)**:
  - Displays a live character count in the bottom-right corner (e.g., `45/500`).
  - Automatically restricts input beyond the maximum character limit for both typing and pasting.
- **Advanced Ref Management**: Utilizes `useMergeRefs` from `@floating-ui/react` for seamless ref merging and forwarding in React 19.
- **Safe Config Fallback**: Integrated `getSafeConfig` utility guarantees crash-proof runtime stability even when invalid props are passed.

---

## 🚀 Installation & Import

```tsx
import { TextArea } from "@openway/ui";
import type {
  TextAreaProps,
  TextAreaConfig,
  TextAreaSize,
  TextAreaVariant,
  TextAreaColor,
  TextAreaRadius,
  TextAreaLabelPlacement,
  TextAreaResize,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Usage

```tsx
import { TextArea } from "@openway/ui";

export function BasicTextAreaExample() {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <TextArea
        label="Detailed Description"
        placeholder="Enter your product description..."
      />
    </div>
  );
}
```

---

### 2. Auto Height Resizing (AutoResize)

By default, `autoResize={true}` with a minimum line count of `minRows={3}`:

```tsx
// Freely resizes from 3 lines upwards
<TextArea
  label="Feedback"
  autoResize={true}
  minRows={3}
  maxRows={8}
  onHeightChange={(height) => console.log("Current height:", height)}
/>

// Disable autoResize for a fixed height
<TextArea
  label="Fixed Notes"
  autoResize={false}
  rows={4}
  resize="vertical"
/>
```

---

### 3. Label Placement (`labelPlacement`)

```tsx
// 1. Top (Default)
<TextArea label="Top Label" labelPlacement="top" placeholder="Enter text..." />

// 2. Left (Horizontally aligned)
<TextArea label="Left Label" labelPlacement="left" placeholder="Enter text..." />

// 3. Floating (Overlapping border)
<TextArea label="Floating Label" labelPlacement="floating" placeholder="Enter text..." />
```

---

### 4. Character Limit & Counter (`showCount` & `maxLength`)

```tsx
<TextArea
  label="Product Review"
  maxLength={200}
  showCount={true}
  placeholder="Maximum 200 characters (automatically blocked when reaching limit)..."
/>
```

---

### 5. Quick Clear & Loading State

```tsx
<TextArea
  label="Search Content"
  isClearable={true}
  onClear={() => console.log("Cleared content")}
  defaultValue="Initial content"
/>

<TextArea
  label="Synchronizing Data"
  isLoading={true}
  showSpinner={true}
  defaultValue="Please wait..."
/>
```

---

### 6. Error State & Helper Text (`errorMessage` & `helperText`)

```tsx
<TextArea
  label="Shipping Address"
  isRequired={true}
  errorMessage="Address cannot be empty!"
  isInvalid={true}
/>

<TextArea
  label="Biography"
  helperText="Write a brief 1-2 sentence overview of your background."
/>
```

---

## 🛠 Props Reference (`TextAreaProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Component size (typography, padding, label dimensions). |
| `variant` | `'outline' \| 'filled' \| 'ghost' \| 'other'` | `'outline'` | Visual style variant. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Theme color per Design System. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Border radius of the textarea frame. |
| `label` | `ReactNode` | — | Label displayed for the input field. |
| `labelPlacement` | `'top' \| 'left' \| 'floating'` | `'top'` | Placement of the label. |
| `config` | `TextAreaConfig` | — | Consolidated configuration object for status flags and features (`isRequired`, `isInvalid`, `isLoading`, `showSpinner`, `isClearable`, `autoResize`, `showCount`, `isFullWidth`). |
| `isRequired` | `boolean` | `false` | Displays a red asterisk `*` and sets `aria-required="true"`. |
| `helperText` | `ReactNode` | — | Helper or instructional text rendered beneath the field. |
| `errorMessage` | `ReactNode` | — | Error message displayed on validation failure (triggers invalid visual state). |
| `isInvalid` | `boolean` | `false` | Enables the invalid error styling and sets `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Locks interaction and sets `aria-busy="true"` and `aria-disabled="true"`. |
| `showSpinner` | `boolean` | `false` | Displays a spinner icon when `isLoading={true}`. |
| `isClearable` | `boolean` | `false` | Displays a clear button when text is present. |
| `onClear` | `() => void` | — | Callback invoked when the clear button is clicked. |
| `autoResize` | `boolean` | `true` | Automatically adjusts height based on typed content. |
| `minRows` | `number` | `3` | Minimum number of visible text lines when `autoResize` is enabled. |
| `maxRows` | `number` | — | Maximum number of visible text lines before scrollbars appear. |
| `onHeightChange` | `(height: number, meta: { rowHeight: number }) => void` | — | Callback fired when the height changes due to autoResize. |
| `cacheMeasurements` | `boolean` | — | Enables height measurement caching for optimized rendering. |
| `showCount` | `boolean` | `false` | Displays a character count in the bottom-right corner. |
| `maxLength` | `number` | — | Maximum allowed character count (enforces hard stop on typing/pasting). |
| `resize` | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'none'` | Manual resize handle option. |
| `isFullWidth` | `boolean` | `false` | Expands the component to occupy 100% of the parent width. |
| `ref` | `Ref<HTMLTextAreaElement>` | — | Forwarded ref to the underlying native `<textarea>` HTML element. |
