# 🎠 Carousel Component (`@openway/ui`)

A modern, high-performance **Carousel** (slider) component designed following the **Compound Components Pattern** (`<Carousel>`, `<CarouselContent>`, `<CarouselSlide>`, `<CarouselPrevious>`, `<CarouselNext>`, `<CarouselPagination>`), featuring **Pointer Drag/Touch Gestures**, **Smart Autoplay**, **Infinite Looping**, **Glassmorphism Design**, **Dynamic Slide Registration**, **Safe Config Fallback** (`getSafeConfig`), and full compliance with **WAI-ARIA Accessibility** standards.

---

## 🌟 Key Features

- **Standard Compound Components Pattern**: Clean separation of concerns across `<Carousel>`, `<CarouselContent>`, `<CarouselSlide>`, `<CarouselPrevious>`, `<CarouselNext>`, and `<CarouselPagination>`, enabling limitless layout customization.
- **Dynamic Slide Registration (`registerSlide` / `unregisterSlide`)**: Automatically counts and synchronizes the total slide count (`totalSlides`) in real time based on each `<CarouselSlide>`'s lifecycle, agnostic to child render order or structure.
- **Smooth Pointer & Touch Gestures**: Supports both mouse drag and touch gestures seamlessly via Pointer Events (`setPointerCapture`), featuring drag resistance when pulled past the start/end boundaries.
- **Smart Autoplay**: Automatically cycles slides at set `interval` periods, pausing on mouse hover (`pauseOnHover`), on focus (`pauseOnFocus`), or while actively dragging/swiping.
- **Infinite Loop**: Seamlessly loops between the first and last slides.
- **Multi-slide Display**: Supports `slidesToShow`, `slidesToScroll`, and flexible `spacing` gap (accepts `number` in px or CSS strings).
- **Glassmorphism Design**: Modern frosted glass navigation buttons and pagination indicators powered by `backdrop-blur-md`.
- **Smart Default Positioning**:
  - `CarouselPrevious`: Frosted glass previous button pinned to the left edge (`absolute left-2 top-1/2 -translate-y-1/2`).
  - `CarouselNext`: Frosted glass next button pinned to the right edge (`absolute right-2 top-1/2 -translate-y-1/2`).
  - `CarouselPagination`: Pagination bar centered at the bottom (`absolute bottom-2.5 left-1/2 -translate-x-1/2`).
  - Easily overridden or placed into custom toolbars/slots by passing `className`.
- **4 Navigation Button Variants (`variant`)**: `glass` (*default*), `filled`, `outline`, `ghost`.
- **3 Pagination Types (`type`)**: `dots` (*default*), `line` (expandable horizontal bars), `fraction` (ratio format `1 / 4`).
- **3 Standard Sizes (`size`)**: `sm`, `md` (*default*), `lg`.
- **6 Border Radius Options (`radius`)**: `none`, `sm`, `md` (*default*), `lg`, `xl`, `full`.
- **Controlled & Uncontrolled Modes**: Fully supports `currentIndex` + `onIndexChange` (Controlled) and `defaultIndex` (Uncontrolled).
- **Keyboard Navigation & A11y**: Supports `role="region"`, `role="tablist"`, `role="tab"`, `role="group"`, `aria-roledescription="carousel"`, as well as `ArrowLeft`, `ArrowRight`, `Home`, and `End` keys.
- **Safe Config Fallback**: Integrates `getSafeConfig` from `@/utils/function` to ensure the component remains safe and never crashes even with invalid props.

---

## 🚀 Installation & Import

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselSlide,
  CarouselPrevious,
  CarouselNext,
  CarouselPagination,
  useCarousel,
  CarouselContext,
  useCarouselContext,
  carouselSizeConfig,
  carouselRadiusConfig,
  carouselNavVariantConfig,
  carouselDotStyleConfig,
  carouselGlassPaginationWrapper,
} from "@openway/ui";

import type {
  CarouselProps,
  CarouselContentProps,
  CarouselSlideProps,
  CarouselNavigationProps,
  CarouselPaginationProps,
  CarouselSize,
  CarouselRadius,
  CarouselPaginationType,
  CarouselArrowPosition,
  CarouselNavigationVariant,
  CarouselContextValue,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Usage (Compound Components)

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselSlide,
  CarouselPrevious,
  CarouselNext,
  CarouselPagination,
} from "@openway/ui";

export function BasicCarousel() {
  return (
    <Carousel loop className="w-full max-w-lg shadow-lg">
      <CarouselContent>
        <CarouselSlide>
          <div className="h-56 bg-primary-600 text-white flex items-center justify-center text-xl font-bold">
            Slide 1: Explore Technology
          </div>
        </CarouselSlide>
        <CarouselSlide>
          <div className="h-56 bg-primary-700 text-white flex items-center justify-center text-xl font-bold">
            Slide 2: Optimal Experience
          </div>
        </CarouselSlide>
        <CarouselSlide>
          <div className="h-56 bg-primary-800 text-white flex items-center justify-center text-xl font-bold">
            Slide 3: Modern Design
          </div>
        </CarouselSlide>
      </CarouselContent>

      {/* Frosted glass navigation buttons automatically positioned at both edges */}
      <CarouselPrevious />
      <CarouselNext />

      {/* Pagination automatically centered at the bottom */}
      <CarouselPagination type="dots" />
    </Carousel>
  );
}
```

---

### 2. Autoplay & Infinite Loop

```tsx
<Carousel
  autoPlay={true}
  interval={3500}
  transitionDuration={650}
  loop={true}
  pauseOnHover={true}
  pauseOnFocus={true}
  className="w-full max-w-xl"
>
  <CarouselContent>
    <CarouselSlide>
      <img src="/banner-1.jpg" alt="Banner 1" className="w-full h-64 object-cover" />
    </CarouselSlide>
    <CarouselSlide>
      <img src="/banner-2.jpg" alt="Banner 2" className="w-full h-64 object-cover" />
    </CarouselSlide>
    <CarouselSlide>
      <img src="/banner-3.jpg" alt="Banner 3" className="w-full h-64 object-cover" />
    </CarouselSlide>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
  <CarouselPagination type="line" />
</Carousel>
```

---

### 3. Multi-slides Grid

```tsx
<Carousel slidesToShow={3} slidesToScroll={1} spacing={16} loop className="w-full max-w-4xl">
  <CarouselContent>
    {products.map((product) => (
      <CarouselSlide key={product.id}>
        <div className="p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-lg" />
          <h3 className="mt-2 font-semibold text-neutral-900">{product.name}</h3>
          <p className="text-primary-600 font-bold">{product.price}</p>
        </div>
      </CarouselSlide>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

---

### 4. Pagination Types

Supports 3 pagination styles:

```tsx
{/* 1. Sleek dots (default) */}
<CarouselPagination type="dots" />

{/* 2. Expanding line bars on active */}
<CarouselPagination type="line" />

{/* 3. Fraction ratio (e.g., 1 / 4) */}
<CarouselPagination type="fraction" />
```

---

### 5. Navigation Button Variants

Supports 4 visual variants: `glass` (*default*), `filled`, `outline`, `ghost`:

```tsx
<Carousel className="w-full max-w-lg shadow">
  <CarouselContent>
    <CarouselSlide><div className="h-44 bg-primary-600 text-white flex items-center justify-center">Filled Buttons</div></CarouselSlide>
    <CarouselSlide><div className="h-44 bg-primary-700 text-white flex items-center justify-center">Filled Buttons</div></CarouselSlide>
  </CarouselContent>
  <CarouselPrevious variant="filled" />
  <CarouselNext variant="filled" />
</Carousel>
```

---

### 6. Custom Placement (Custom Slot / Bottom Toolbar)

You can easily place navigation buttons and pagination into a custom toolbar at the bottom by adding `className="static"` or custom positioning classes:

```tsx
<Carousel defaultIndex={1} className="w-full max-w-md border border-neutral-200 p-2 rounded-xl">
  <CarouselContent>
    <CarouselSlide><div className="h-36 bg-linear-to-r from-primary-600 to-primary-800 text-white rounded-lg flex items-center justify-center font-semibold">Slide 1</div></CarouselSlide>
    <CarouselSlide><div className="h-36 bg-linear-to-r from-primary-700 to-primary-900 text-white rounded-lg flex items-center justify-center font-semibold">Slide 2</div></CarouselSlide>
    <CarouselSlide><div className="h-36 bg-linear-to-r from-primary-800 to-primary-950 text-white rounded-lg flex items-center justify-center font-semibold">Slide 3</div></CarouselSlide>
  </CarouselContent>

  {/* Custom Bottom Toolbar */}
  <div className="flex justify-between items-center mt-3 px-2">
    <CarouselPrevious className="static translate-y-0" variant="glass" />
    <CarouselPagination className="static translate-x-0" type="dots" />
    <CarouselNext className="static translate-y-0" variant="glass" />
  </div>
</Carousel>
```

---

### 7. Controlled Mode (Manual State Management)

```tsx
import { useState } from "react";
import { Carousel, CarouselContent, CarouselSlide, CarouselPrevious, CarouselNext, CarouselPagination } from "@openway/ui";

export function ControlledDemo() {
  const [index, setIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold">Current slide: {index + 1}</span>
        <button
          type="button"
          onClick={() => setIndex(2)}
          className="px-3 py-1 bg-primary-600 text-white text-xs rounded-md shadow hover:bg-primary-700"
        >
          Jump to Slide 3
        </button>
      </div>

      <Carousel
        currentIndex={index}
        onIndexChange={setIndex}
        className="w-full max-w-md shadow"
      >
        <CarouselContent>
          <CarouselSlide><div className="h-36 bg-blue-600 text-white flex items-center justify-center">Slide 1</div></CarouselSlide>
          <CarouselSlide><div className="h-36 bg-indigo-600 text-white flex items-center justify-center">Slide 2</div></CarouselSlide>
          <CarouselSlide><div className="h-36 bg-purple-600 text-white flex items-center justify-center">Slide 3</div></CarouselSlide>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselPagination />
      </Carousel>
    </div>
  );
}
```

---

## 📊 Props Reference

### `<Carousel>`

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `currentIndex` | `number` | - | Active slide index (used in Controlled mode) |
| `defaultIndex` | `number` | `0` | Initial slide index (Uncontrolled mode) |
| `onIndexChange` | `(index: number) => void` | - | Callback triggered when active slide index changes |
| `loop` | `boolean` | `false` | Enables infinite loop scrolling |
| `slidesToShow` | `number` | `1` | Number of slides visible at once in the viewport |
| `slidesToScroll` | `number` | `1` | Number of slides to advance per scroll |
| `spacing` | `number \| string` | `0` | Gap spacing between slides (`16` or `"1rem"`) |
| `autoPlay` | `boolean` | `true` | Automatically cycles through slides periodically |
| `interval` | `number` | `3000` | Delay between automatic transitions in milliseconds (ms) |
| `transitionDuration` | `number` | `650` | Slide transition duration in milliseconds (ms) |
| `pauseOnHover` | `boolean` | `true` | Pauses autoplay when hovering over the carousel |
| `pauseOnFocus` | `boolean` | `true` | Pauses autoplay when the carousel receives focus |
| `draggable` | `boolean` | `true` | Enables dragging/swiping via mouse or touch |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Overall carousel size |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Border radius of the carousel container |
| `children` | `ReactNode` | - | Child components inside the Carousel |

---

### `<CarouselContent>`

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `ref` | `Ref<HTMLDivElement>` | - | Ref to the sliding track element |
| `children` | `ReactNode` | - | List of `<CarouselSlide>` components |
| `className` | `string` | `""` | Custom className for the track container |

---

### `<CarouselSlide>`

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `ref` | `Ref<HTMLDivElement>` | - | Ref to the slide DOM element |
| `index` | `number` | - | Slide position index |
| `children` | `ReactNode` | - | Content inside the slide |
| `className` | `string` | `""` | Custom className for the slide |

---

### `<CarouselPrevious>` & `<CarouselNext>`

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `ref` | `Ref<HTMLButtonElement>` | - | Ref to the button element |
| `variant` | `"glass" \| "filled" \| "outline" \| "ghost"` | `"glass"` | Button visual variant |
| `icon` | `ReactNode` | `<ChevronIcon />` | Custom icon element |
| `disabled` | `boolean` | - | Disabled state (computed automatically if omitted) |
| `className` | `string` | `""` | Custom className (use `static` to remove absolute positioning) |

---

### `<CarouselPagination>`

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `ref` | `Ref<HTMLDivElement>` | - | Ref to the pagination container |
| `type` | `"dots" \| "line" \| "fraction" \| "none"` | `"dots"` | Pagination display style |
| `clickable` | `boolean` | `true` | Allows users to click dots/bars to navigate slides |
| `className` | `string` | `""` | Custom className |

---

## ⌨️ Keyboard Shortcuts & Accessibility

- **`role="region"` & `aria-roledescription="carousel"`**: Identifies the element as a carousel region to screen readers.
- **`role="tablist"` & `role="tab"`**: Provides semantic roles for the pagination bar and individual slide indicators.
- **`ArrowLeft` / `ArrowRight` Keys**: Navigate to previous / next slide.
- **`Home` / `End` Keys**: Jump directly to the first or last slide.
- **Keyboard Focus Ring**: Clear `focus-visible:ring-2 focus-visible:ring-primary-500/50` outline when navigating via `Tab` key.

---

## 🧪 Component Testing (Cypress Testing)

The component has 100% test coverage using **Cypress Component Testing** at [`Carousel.cy.tsx`](Carousel.cy.tsx):

```bash
pnpm --filter @openway/ui cypress:run --spec "src/components/carousel/Carousel.cy.tsx"
```
