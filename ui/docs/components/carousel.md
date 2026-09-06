# 🎠 Carousel Component (`@owa/ui`)

Component **Carousel** (băng chuyền / slider) hiện đại, hiệu năng cao, thiết kế chuẩn **Compound Components Pattern** (`<Carousel>`, `<CarouselContent>`, `<CarouselSlide>`, `<CarouselPrevious>`, `<CarouselNext>`, `<CarouselPagination>`), hỗ trợ **Pointer Drag/Touch Gestures**, **Autoplay thông minh**, **Infinite Looping**, **Glassmorphism Design**, **Dynamic Slide Registration**, **Safe Config Fallback** (`getSafeConfig`) và tuân thủ đầy đủ tiêu chuẩn **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Compound Components Pattern chuẩn chỉ**: Tách biệt rõ ràng các thành phần `<Carousel>`, `<CarouselContent>`, `<CarouselSlide>`, `<CarouselPrevious>`, `<CarouselNext>`, `<CarouselPagination>`, mang lại khả năng tùy biến bố cục không giới hạn.
- **Dynamic Slide Registration (`registerSlide` / `unregisterSlide`)**: Tự động đếm và đồng bộ số lượng slide (`totalSlides`) theo thời gian thực dựa trên vòng đời của từng `<CarouselSlide>`, không phụ thuộc vào thứ tự hay cách thức render children.
- **Tương tác kéo vuốt mượt mà (Touch & Pointer Gestures)**: Hỗ trợ kéo vuốt cả chuột và màn hình cảm ứng mượt mà qua Pointer Events (`setPointerCapture`), có hiệu ứng lực cản (drag resistance) khi kéo quá mép đầu/cuối.
- **Autoplay thông minh**: Tự động chuyển slide theo chu kỳ `interval`, tự động tạm dừng khi rê chuột (`pauseOnHover`), khi focus (`pauseOnFocus`), hoặc khi đang kéo chuột/vuốt màn hình.
- **Vòng lặp vô hạn (Infinite Loop)**: Tự động tính toán chuyển động vòng tròn liền mạch giữa slide đầu và slide cuối.
- **Hiển thị nhiều slide cùng lúc (Multi-slides)**: Hỗ trợ `slidesToShow`, `slidesToScroll`, và khoảng cách gap `spacing` linh hoạt (nhận `number` theo px hoặc chuỗi CSS).
- **Thiết kế Kính Mờ (Frosted Glass / Glassmorphism)**: Phong cách nút và thanh phân trang kính mờ hiện đại với `backdrop-blur-md`.
- **Định vị mặc định thông minh**:
  - `CarouselPrevious`: Nút lùi kính mờ đặt sát mép trái (`absolute left-2 top-1/2 -translate-y-1/2`).
  - `CarouselNext`: Nút tiến kính mờ đặt sát mép phải (`absolute right-2 top-1/2 -translate-y-1/2`).
  - `CarouselPagination`: Thanh phân trang đặt tại đáy giữa (`absolute bottom-2.5 left-1/2 -translate-x-1/2`).
  - Dễ dàng ghi đè hoặc đặt vào custom toolbar/slot bằng cách truyền `className`.
- **4 Biến thể nút điều hướng (`variant`)**: `glass` (*mặc định*), `filled`, `outline`, `ghost`.
- **3 Kiểu dáng phân trang (`type`)**: `dots` (*mặc định*), `line` (thanh ngang co giãn), `fraction` (tỉ lệ dạng `1 / 4`).
- **3 Kích thước tiêu chuẩn (`size`)**: `sm`, `md` (*mặc định*), `lg`.
- **6 Kiểu bo góc (`radius`)**: `none`, `sm`, `md` (*mặc định*), `lg`, `xl`, `full`.
- **Chế độ Controlled & Uncontrolled**: Hỗ trợ đầy đủ `currentIndex` + `onIndexChange` (Controlled) và `defaultIndex` (Uncontrolled).
- **Điều hướng bàn phím & Trợ năng (A11y)**: Hỗ trợ `role="region"`, `role="tablist"`, `role="tab"`, `role="group"`, `aria-roledescription="carousel"`, phím `ArrowLeft`, `ArrowRight`, `Home`, `End`.
- **Safe Config Fallback**: Tích hợp `getSafeConfig` từ `@/utils/function` giúp component luôn an toàn, không bị crash kể cả khi truyền prop không hợp lệ.

---

## 🚀 Cài đặt & Import

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
} from "@owa/ui";

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
} from "@owa/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Sử dụng cơ bản (Compound Components)

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselSlide,
  CarouselPrevious,
  CarouselNext,
  CarouselPagination,
} from "@owa/ui";

export function BasicCarousel() {
  return (
    <Carousel loop className="w-full max-w-lg shadow-lg">
      <CarouselContent>
        <CarouselSlide>
          <div className="h-56 bg-primary-600 text-white flex items-center justify-center text-xl font-bold">
            Slide 1: Khám Phá Công Nghệ
          </div>
        </CarouselSlide>
        <CarouselSlide>
          <div className="h-56 bg-primary-700 text-white flex items-center justify-center text-xl font-bold">
            Slide 2: Trải Nghiệm Tối Ưu
          </div>
        </CarouselSlide>
        <CarouselSlide>
          <div className="h-56 bg-primary-800 text-white flex items-center justify-center text-xl font-bold">
            Slide 3: Thiết Kế Hiện Đại
          </div>
        </CarouselSlide>
      </CarouselContent>

      {/* Nút điều hướng kính mờ tự động đặt sát 2 mép */}
      <CarouselPrevious />
      <CarouselNext />

      {/* Phân trang tự động đặt ở đáy giữa */}
      <CarouselPagination type="dots" />
    </Carousel>
  );
}
```

---

### 2. Tự động chuyển slide (Autoplay) & Vòng lặp vô hạn (Loop)

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

### 3. Hiển thị nhiều slide cùng lúc (Multi-slides Grid)

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

### 4. Các kiểu phân trang (Pagination Types)

Hỗ trợ 3 kiểu phân trang:

```tsx
{/* 1. Dạng chấm tròn tinh gọn (mặc định) */}
<CarouselPagination type="dots" />

{/* 2. Dạng thanh gạch ngang co giãn khi active */}
<CarouselPagination type="line" />

{/* 3. Dạng phân số tỉ lệ (ví dụ: 1 / 4) */}
<CarouselPagination type="fraction" />
```

---

### 5. Biến thể nút điều hướng (Navigation Variants)

Hỗ trợ 4 biến thể giao diện: `glass` (*mặc định*), `filled`, `outline`, `ghost`:

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

### 6. Tùy biến vị trí tự do (Custom Slot / Bottom Toolbar)

Bạn có thể dễ dàng đặt nút điều hướng và phân trang vào trong một thanh công cụ tùy biến dưới đáy bằng cách thêm `className="static"` hoặc class định vị mong muốn:

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

### 7. Chế độ Controlled Mode (Quản lý State chủ động)

```tsx
import { useState } from "react";
import { Carousel, CarouselContent, CarouselSlide, CarouselPrevious, CarouselNext, CarouselPagination } from "@owa/ui";

export function ControlledDemo() {
  const [index, setIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold">Slide hiện tại: {index + 1}</span>
        <button
          type="button"
          onClick={() => setIndex(2)}
          className="px-3 py-1 bg-primary-600 text-white text-xs rounded-md shadow hover:bg-primary-700"
        >
          Nhảy tới Slide 3
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

## 📊 Bảng thuộc tính Props

### `<Carousel>`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `currentIndex` | `number` | - | Chỉ số slide đang active (sử dụng trong Controlled mode) |
| `defaultIndex` | `number` | `0` | Chỉ số slide mặc định khi khởi tạo (Uncontrolled mode) |
| `onIndexChange` | `(index: number) => void` | - | Callback kích hoạt khi chỉ số slide thay đổi |
| `loop` | `boolean` | `false` | Cho phép cuộn vòng tròn vô hạn |
| `slidesToShow` | `number` | `1` | Số lượng slide hiển thị đồng thời trên một khung nhìn |
| `slidesToScroll` | `number` | `1` | Số lượng slide di chuyển mỗi lần cuộn |
| `spacing` | `number \| string` | `0` | Khoảng cách gap giữa các slide (`16` hoặc `"1rem"`) |
| `autoPlay` | `boolean` | `true` | Tự động chuyển slide định kỳ |
| `interval` | `number` | `3000` | Thời gian chờ giữa mỗi lần tự động chuyển slide (ms) |
| `transitionDuration` | `number` | `650` | Thời gian hiệu ứng chuyển đổi giữa các slide (ms) |
| `pauseOnHover` | `boolean` | `true` | Tạm dừng autoplay khi rê chuột vào carousel |
| `pauseOnFocus` | `boolean` | `true` | Tạm dừng autoplay khi focus vào carousel |
| `draggable` | `boolean` | `true` | Cho phép kéo/vuốt bằng chuột hoặc ngón tay cảm ứng |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Kích thước chung của carousel |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Bo góc của container carousel |
| `children` | `ReactNode` | - | Các component con bên trong Carousel |

---

### `<CarouselContent>`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `ref` | `Ref<HTMLDivElement>` | - | Ref đến dải trượt track |
| `children` | `ReactNode` | - | Danh sách các `<CarouselSlide>` |
| `className` | `string` | `""` | Tùy biến class cho container track |

---

### `<CarouselSlide>`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `ref` | `Ref<HTMLDivElement>` | - | Ref đến phần tử DOM của slide |
| `index` | `number` | - | Chỉ số vị trí của slide |
| `children` | `ReactNode` | - | Nội dung bên trong slide |
| `className` | `string` | `""` | Class tùy biến cho slide |

---

### `<CarouselPrevious>` & `<CarouselNext>`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `ref` | `Ref<HTMLButtonElement>` | - | Ref đến phần tử button |
| `variant` | `"glass" \| "filled" \| "outline" \| "ghost"` | `"glass"` | Biến thể hiển thị giao diện nút |
| `icon` | `ReactNode` | `<ChevronIcon />` | Biểu tượng icon tùy biến |
| `disabled` | `boolean` | - | Trạng thái vô hiệu hóa (tự động tính nếu không truyền) |
| `className` | `string` | `""` | Class tùy biến (có thể dùng `static` để gỡ bỏ định vị absolute) |

---

### `<CarouselPagination>`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `ref` | `Ref<HTMLDivElement>` | - | Ref đến container phân trang |
| `type` | `"dots" \| "line" \| "fraction" \| "none"` | `"dots"` | Kiểu dáng hiển thị phân trang |
| `clickable` | `boolean` | `true` | Cho phép người dùng click vào chấm/thanh để chuyển slide |
| `className` | `string` | `""` | Class tùy biến |

---

## ⌨️ Phím tắt & Trợ năng (Accessibility)

- **`role="region"` & `aria-roledescription="carousel"`**: Báo hiệu với Screen Reader đây là một vùng băng chuyền nội dung.
- **`role="tablist"` & `role="tab"`**: Đánh dấu thanh phân trang và từng slide chỉ số chuẩn ngữ nghĩa.
- **Phím `ArrowLeft` / `ArrowRight`**: Chuyển đổi slide trước / sau.
- **Phím `Home` / `End`**: Nhảy nhanh về slide đầu tiên hoặc slide cuối cùng.
- **Tập trung bàn phím (Focus Ring)**: Có viền sáng `focus-visible:ring-2 focus-visible:ring-primary-500/50` rõ ràng khi dùng phím `Tab`.

---

## 🧪 Kiểm thử Component (Cypress Testing)

Component được kiểm thử 100% bằng **Cypress Component Testing** tại [`Carousel.cy.tsx`](Carousel.cy.tsx):

```bash
pnpm --filter @owa/ui cypress:run --spec "src/components/carousel/Carousel.cy.tsx"
```
