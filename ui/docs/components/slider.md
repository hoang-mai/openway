# 🎚️ Slider Component (`@openway/ui`)

Modern, smooth, and comprehensive **Slider** component built on the headless logic of **`@radix-ui/react-slider`**, adhering to the **Design System (`styleCode`)** standards of `@openway/ui`. Features **Safe Config Fallback**, **Floating UI Tooltip**, support for both **Single** and **Range** sliders, and full compliance with **WAI-ARIA Accessibility** standards.

---

## 🌟 Highlights

- **Radix UI Headless Engine**: Handles drag gestures (Pointer Capture, Touch, Multi-touch), value calculation, and keyboard navigation smoothly and accurately, preventing jumps when dragging outside the track.
- **Single & Range Slider Support**:
  - **Single Slider**: Pass a `number` to `value` / `defaultValue`.
  - **Range Slider (Dual Thumbs)**: Pass `[number, number]` to `value` / `defaultValue` to adjust ranges (prices, filters, etc.).
- **Unified Configuration (`config?: SliderConfig`)**: All status flags (`isRequired`, `isInvalid`, `isLoading`, `showSpinner`, `showSteps`, `showValue`, `isFullWidth`) are centrally managed via the `config` object.
- **5 Standard Sizes (`size`)**: `xs`, `sm`, `md` (*default*), `lg`, `xl` with track, thumb, step dots, and font sizes proportionally balanced.
- **4 Visual Variants (`variant`)**:
  - `filled` *(default)*: High-contrast filled theme color bar on a clear track.
  - `soft`: Soft pastel track background tinted with the theme color.
  - `outline`: Outlined track and thumb following theme color.
  - `other`: Bypasses default color classes, allowing complete custom styling via `trackClassName`, `fillerClassName`, and `thumbClassName`.
- **7 Theme Colors (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **6 Border Radius Levels (`radius` & `thumbRadius`)**: `none`, `sm`, `md`, `lg`, `xl`, `full` (*default*). Independent corner radius customization for both track and thumb.
- **Tooltip Integration (@floating-ui/react)**: Supports 4 tooltip display modes floating above the thumb: `"always"`, `"active"` (on drag / focus), `"hover"`, and `"none"`.
- **Marks & Step Dots**:
  - `showSteps`: Automatically renders step dots at each increment along the track.
  - `marks`: Displays value marker labels below or beside the slider.
- **Native HTML Form Integration**: Automatically renders `<input type="hidden" />` when `name` is provided to support native HTML form submissions / `FormData`.
- **WAI-ARIA Accessibility**: Full integration of `role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`, `aria-invalid`, `aria-required`, `aria-errormessage`, and `aria-describedby`.
- **Safe Config Fallback**: Uses `getSafeConfig` to ensure graceful operation and prevent runtime errors even with invalid props.

---

## 🚀 Installation & Import

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

## 📖 Usage Guide

### 1. Basic Single Slider (Single Value)

```tsx
import { useState } from "react";
import { Slider } from "@openway/ui";

export function BasicSingleSlider() {
  const [volume, setVolume] = useState<number>(50);

  return (
    <div className="max-w-md space-y-6">
      {/* Uncontrolled Slider */}
      <Slider
        label="Default Volume"
        defaultValue={40}
        config={{ showValue: true }}
      />

      {/* Controlled Slider */}
      <Slider
        label="Custom Volume"
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

### 2. Range Slider (Dual Thumbs)

Pass a 2-element array `[minVal, maxVal]` to `value` or `defaultValue`:

```tsx
import { useState } from "react";
import { Slider } from "@openway/ui";

export function PriceRangeSlider() {
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 800]);

  return (
    <div className="max-w-md">
      <Slider
        label="Price Range (USD)"
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

### 3. Sizing (`size`)

Supports 5 sizes: `xs`, `sm`, `md` (*default*), `lg`, `xl`:

```tsx
<Slider size="xs" label="Size XS" defaultValue={20} config={{ showValue: true }} />
<Slider size="sm" label="Size SM" defaultValue={40} config={{ showValue: true }} />
<Slider size="md" label="Size MD" defaultValue={60} config={{ showValue: true }} />
<Slider size="lg" label="Size LG" defaultValue={80} config={{ showValue: true }} />
<Slider size="xl" label="Size XL" defaultValue={100} config={{ showValue: true }} />
```

---

### 4. Variants (`variant`) & Colors (`color`)

```tsx
// 7 Color Themes
<Slider color="primary" label="Primary" defaultValue={50} />
<Slider color="secondary" label="Secondary" defaultValue={50} />
<Slider color="success" label="Success" defaultValue={50} />
<Slider color="warning" label="Warning" defaultValue={50} />
<Slider color="error" label="Error" defaultValue={50} />
<Slider color="info" label="Info" defaultValue={50} />
<Slider color="neutral" label="Neutral" defaultValue={50} />

// 4 Display Variants
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

### 5. Track & Thumb Border Radius (`radius` & `thumbRadius`)

```tsx
<Slider radius="none" thumbRadius="none" label="Square" defaultValue={40} />
<Slider radius="md" thumbRadius="md" label="Medium Rounded" defaultValue={50} />
<Slider radius="full" thumbRadius="full" label="Fully Rounded" defaultValue={60} />
```

---

### 6. Tooltip Integration (`showTooltip` & `formatTooltip`)

```tsx
// 1. Tooltip Always Visible
<Slider
  label="Always Open"
  defaultValue={45}
  showTooltip="always"
  formatTooltip={(val) => `${val}%`}
/>

// 2. Visible on Drag or Keyboard Focus
<Slider
  label="Active On Drag/Focus"
  defaultValue={75}
  showTooltip="active"
  color="success"
  formatTooltip={(val) => `${val} kW/h`}
/>

// 3. Visible on Hover
<Slider
  label="Hover"
  defaultValue={30}
  showTooltip="hover"
  color="warning"
  formatTooltip={(val) => `$${val}`}
/>
```

---

### 7. Step Dots & Value Marks (`showSteps` & `marks`)

```tsx
<Slider
  label="Room Temperature"
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

### 8. Vertical Orientation (`orientation="vertical"`)

Ideal for audio equalizers and brightness/volume controls:

```tsx
<div className="flex items-center gap-6 h-64">
  <Slider orientation="vertical" defaultValue={40} color="primary" showTooltip="active" />
  <Slider orientation="vertical" defaultValue={75} color="secondary" showTooltip="active" />
  <Slider orientation="vertical" defaultValue={60} color="success" showTooltip="active" />
</div>
```

---

### 9. Loading State, Validation & Form Integration

```tsx
// Loading State with Spinner
<Slider
  label="Synchronizing Data"
  defaultValue={50}
  helperText="Please wait..."
  config={{ isLoading: true, showSpinner: true }}
/>

// Error State (Invalid)
<Slider
  label="Machine Power"
  defaultValue={10}
  errorMessage="Minimum power value is 20!"
  config={{ isInvalid: true, isRequired: true }}
/>

// HTML Form Integration (FormData)
<form onSubmit={(e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  console.log(data.get("volume")); // Output: numeric value
}}>
  <Slider name="volume" defaultValue={80} label="Volume" />
  <button type="submit">Submit</button>
</form>
```

---

## 📋 Props Reference

### `SliderProps`

| Prop | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| **`config`** | `SliderConfig` | `{}` | Object grouping feature and status flags. |
| **`value`** | `number \| [number, number]` | `undefined` | Controlled value of the slider. |
| **`defaultValue`** | `number \| [number, number]` | `undefined` | Initial uncontrolled default value. |
| **`min`** | `number` | `0` | Minimum value. |
| **`max`** | `number` | `100` | Maximum value. |
| **`step`** | `number` | `1` | Step increment between values. |
| **`minStepsBetweenThumbs`** | `number` | `0` | Minimum steps separating 2 thumbs in Range mode. |
| **`inverted`** | `boolean` | `false` | Inverts slider direction. |
| **`size`** | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Component size. |
| **`variant`** | `"filled" \| "soft" \| "outline" \| "other"` | `"filled"` | Visual variant of the slider. |
| **`color`** | `"primary" \| "secondary" \| "error" \| "success" \| "warning" \| "info" \| "neutral"` | `"primary"` | Color theme. |
| **`radius`** | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"full"` | Border radius of the track. |
| **`thumbRadius`** | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"full"` | Border radius of the thumb. |
| **`orientation`** | `"horizontal" \| "vertical"` | `"horizontal"` | Sliding orientation. |
| **`label`** | `ReactNode` | `undefined` | Label text of the slider. |
| **`labelPlacement`** | `"top" \| "left" \| "right"` | `"top"` | Placement position of the label. |
| **`formatValue`** | `(val: SliderValue) => ReactNode` | `undefined` | Custom formatting function for the value next to label. |
| **`showTooltip`** | `"none" \| "hover" \| "active" \| "always"` | `"none"` | Tooltip display mode over the thumb. |
| **`tooltipPlacement`** | `"top" \| "bottom" \| "left" \| "right"` | `undefined` | Placement direction for the tooltip. |
| **`formatTooltip`** | `(val: number) => ReactNode` | `undefined` | Custom formatting function for tooltip content. |
| **`marks`** | `SliderMark[] \| boolean` | `false` | Array of marks or `true` to auto-generate marks per step. |
| **`startContent`** | `ReactNode` | `undefined` | Icon or content before the slider track. |
| **`endContent`** | `ReactNode` | `undefined` | Icon or content after the slider track. |
| **`disabled`** | `boolean` | `false` | Disables user interaction. |
| **`readOnly`** | `boolean` | `false` | Read-only mode (prevents dragging while permitting form submit). |
| **`helperText`** | `ReactNode` | `undefined` | Helper text below the slider. |
| **`errorMessage`** | `ReactNode` | `undefined` | Error message below the slider (automatically enables `hasError`). |
| **`name`** | `string` | `undefined` | Name of hidden input for HTML form submission. |
| **`onChange`** | `(val: SliderValue) => void` | `undefined` | Continuous callback fired as value changes during drag. |
| **`onChangeEnd`** | `(val: SliderValue) => void` | `undefined` | Callback fired only upon releasing drag/finishing change. |
| **`trackClassName`** | `string` | `""` | Custom CSS class for the track. |
| **`fillerClassName`** | `string` | `""` | Custom CSS class for the filled range track. |
| **`thumbClassName`** | `string` | `""` | Custom CSS class for the draggable thumb. |

---

### `SliderConfig`

| Configuration Flag | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| **`isRequired`** | `boolean` | `false` | Marks field as required (renders red `*` next to label). |
| **`isInvalid`** | `boolean` | `false` | Enables error state (turns track, thumb, and label to error theme). |
| **`isLoading`** | `boolean` | `false` | Locks interaction and activates loading state. |
| **`showSpinner`** | `boolean` | `false` | Renders a loading spinner icon inside the thumb when loading. |
| **`showSteps`** | `boolean` | `false` | Displays step dots on the track. |
| **`showValue`** | `boolean` | `false` | Displays current value text beside the label. |
| **`isFullWidth`** | `boolean` | `true` | Stretches slider to 100% width of parent container. |

---

## ♿ Accessibility (Accessibility / WAI-ARIA)

- **WAI-ARIA Slider Pattern Compliance**: Automatically assigns `role="slider"`, `tabIndex={0}`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` to each thumb.
- **Screen Reader Friendly**: Supports `aria-valuetext` to announce custom formatted values (currencies, percentages, temperatures).
- **Full Keyboard Navigation**:
  - `←` / `↓`: Decrements by 1 step (`-step`).
  - `→` / `↑`: Increments by 1 step (`+step`).
  - `Page Down` / `Page Up`: Large decrement/increment ($10\%$).
  - `Home`: Jumps to minimum value (`min`).
  - `End`: Jumps to maximum value (`max`).
- **Error Context Linking**: Automatically binds `aria-invalid`, `aria-errormessage`, and `aria-describedby` pointing to the error message element.
