# 🔤 Input Component Suite (`@owa/ui`)

Bộ component **Input** toàn diện, linh hoạt và tương tác cao, thiết kế chuẩn **Design System**, hỗ trợ **Safe Config Fallback**, **Floating Labels**, **Loading & Spinners**, và tuân thủ đầy đủ tiêu chuẩn **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Đa dạng biến thể Input chuyên dụng**:
  - `<Input>`: Ô nhập liệu văn bản tiêu chuẩn (text, email, url, tel, search...).
  - `<PasswordInput>`: Ô nhập mật khẩu tích hợp nút ẩn/hiện mật khẩu bảo mật.
  - `<NumberInput>`: Ô nhập số hỗ trợ định dạng số, phân tách hàng nghìn, tiền tệ và giới hạn min/max.
  - `<OtpInput>`: Ô nhập mã OTP chia từng ô (slot) hỗ trợ dán tự động (paste) và chuyển focus thông minh.
  - `<MultiInput>`: Ô nhập nhiều giá trị (tags / chip list) hỗ trợ xóa nhanh, badge preview.
- **5 Kích thước tiêu chuẩn (`size`)**: `xs` (24px), `sm` (32px), `md` (40px - *mặc định*), `lg` (48px), `xl` (56px) với font chữ, padding, kích thước icon và label được tính toán theo tỷ lệ chuẩn.
- **3 Biến thể giao diện (`variant`)**:
  - `outline` *(mặc định)*: Viền nét rõ ràng quanh khung nhập liệu, hover/focus đổi màu viền chủ đề.
  - `filled`: Nền pastel nhạt (`bg-{color}-50/60`), viền đồng điệu.
  - `ghost`: Nền trong suốt, tinh giản, chỉ nổi bật khi hover/focus.
  - `other`: Bỏ qua các class màu mặc định, tự do áp dụng custom style qua `inputWrapperClassName`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **6 Mức độ bo góc (`radius`)**: `none`, `sm`, `md` (*mặc định*), `lg`, `xl`, `full`.
- **3 Vị trí đặt nhãn (`labelPlacement`)**:
  - `floating` *(mặc định)*: Nhãn lơ lửng, nằm cố định chính giữa viền trên khung input.
  - `top`: Nhãn nằm phía trên ô input.
  - `left`: Nhãn nằm ngang bên trái ô input.
- **Trạng thái Loading & Xoay Spinner (`isLoading` & `showSpinner`)**:
  - `isLoading={true}`: Tự động vô hiệu hóa tương tác (`disabled`), kích hoạt `aria-busy="true"` và `aria-disabled="true"`.
  - `showSpinner`: Mặc định là `false`. Đặt `showSpinner={true}` khi muốn hiển thị spinner xoay vòng ở bên phải.
- **Slots linh hoạt**: Hỗ trợ `leftIcon`, `rightIcon`, `leftAddon`, `rightAddon` và nút xóa nhanh `isClearable`.
- **Safe Config Fallback**: Tích hợp hàm `getSafeConfig` đảm bảo component hoạt động an toàn, không bị crash kể cả khi truyền prop không hợp lệ.

---

## 🚀 Cài đặt & Import

```tsx
import {
  Input,
  PasswordInput,
  NumberInput,
  OtpInput,
  MultiInput,
  splitTagsFromText,
  isValidOtpChar,
  sanitizeOtpString,
} from "@owa/ui";
import type {
  InputProps,
  InputConfig,
  PasswordInputProps,
  NumberInputProps,
  OtpInputProps,
  OtpInputConfig,
  OtpInputRef,
  OtpInputType,
  MultiInputProps,
  MultiInputConfig,
  InputSize,
  InputVariant,
  InputColor,
  InputRadius,
  InputLabelPlacement,
} from "@owa/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Cách sử dụng cơ bản

```tsx
import { Input } from "@owa/ui";

export function BasicInputExample() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <Input label="Họ và tên" placeholder="Nguyễn Văn A" />
      <Input label="Email" type="email" placeholder="example@domain.com" />
    </div>
  );
}
```

---

### 2. Vị trí đặt nhãn (`labelPlacement`)

```tsx
// 1. Floating (Mặc định)
<Input label="Nhãn lơ lửng" labelPlacement="floating" placeholder="Nhập văn bản..." />

// 2. Top (Phía trên)
<Input label="Nhãn phía trên" labelPlacement="top" placeholder="Nhập văn bản..." />

// 3. Left (Ngang bên trái)
<Input label="Nhãn bên trái" labelPlacement="left" placeholder="Nhập văn bản..." />
```

---

### 3. Icon & Addons

```tsx
<Input
  label="Website"
  leftAddon="https://"
  rightAddon=".com"
  placeholder="mywebsite"
/>

<Input
  label="Tìm kiếm"
  leftIcon={<SearchIcon />}
  isClearable={true}
  placeholder="Nhập từ khóa tìm kiếm..."
/>
```

---

### 4. Trạng thái Loading & Xóa nhanh

```tsx
<Input
  label="Đang tải dữ liệu"
  isLoading={true}
  showSpinner={true}
  defaultValue="Đang đồng bộ..."
/>
```

---

### 5. Trạng thái Báo lỗi & Hướng dẫn

```tsx
<Input
  label="Mật khẩu"
  isRequired={true}
  errorMessage="Mật khẩu tối thiểu 8 ký tự!"
  isInvalid={true}
/>

<Input
  label="Tên đăng nhập"
  helperText="Chỉ bao gồm chữ cái viết thường và số."
/>
```

---

## 🛠 Bảng thông số Props (`InputProps`)

| Tên Prop | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích cỡ giao diện (font chữ, chiều cao, padding, kích thước icon/label). |
| `variant` | `'outline' \| 'filled' \| 'ghost' \| 'other'` | `'outline'` | Biến thể hiển thị giao diện. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Chủ đề màu sắc theo Design System. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | — | Độ bo góc của khung viền input (mặc định theo từng size). |
| `label` | `ReactNode` | — | Nhãn tiêu đề hiển thị cho ô nhập liệu. |
| `labelPlacement` | `'floating' \| 'top' \| 'left'` | `'floating'` | Vị trí hiển thị của nhãn. |
| `config` | `InputConfig` | — | Cấu hình tập trung các cờ trạng thái / tính năng (`isRequired`, `isInvalid`, `isLoading`, `showSpinner`, `isClearable`, `isFullWidth`). |
| `isRequired` | `boolean` | `false` | Hiển thị dấu sao đỏ `*` và đánh dấu `aria-required="true"`. |
| `helperText` | `ReactNode` | — | Đoạn văn bản hướng dẫn/trợ giúp bên dưới ô. |
| `errorMessage` | `ReactNode` | — | Thông báo lỗi khi nhập sai (tự kích hoạt trạng thái báo lỗi). |
| `isInvalid` | `boolean` | `false` | Bật trạng thái viền đỏ báo lỗi và `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Khóa tương tác, bật `aria-busy="true"` và `aria-disabled="true"`. |
| `showSpinner` | `boolean` | `false` | Hiển thị biểu tượng xoay spinner khi `isLoading={true}`. |
| `leftIcon` | `ReactNode` | — | Icon hiển thị ở đầu ô input. |
| `rightIcon` | `ReactNode` | — | Icon hiển thị ở cuối ô input. |
| `leftAddon` | `ReactNode` | — | Addon / prefix cố định ở đầu ô input (vd: `'https://'`). |
| `rightAddon` | `ReactNode` | — | Addon / suffix cố định ở cuối ô input (vd: `'.com'`). |
| `isClearable` | `boolean` | `false` | Hiển thị nút xóa nhanh nội dung khi có văn bản. |
| `onClear` | `() => void` | — | Callback được gọi khi bấm nút xóa nhanh. |
| `isFullWidth` | `boolean` | `false` | Mở rộng chiếm toàn bộ 100% chiều ngang container cha. |
| `ref` | `Ref<HTMLInputElement>` | — | Ref chuyển tiếp đến thẻ `<input>` HTML bên dưới. |

---

## 💵 NumberInput Component

Component **`NumberInput`** chuyên dụng cho việc nhập số, tiền tệ, khối lượng, tỷ giá với khả năng **tự động phân cách hàng nghìn/thập phân trong thời gian thực**, **giữ vị trí con trỏ chuột không bị nhảy**, **tối ưu bàn phím di động (`inputMode`)**, và **giới hạn min/max thông minh**.

### 🌟 Điểm nổi bật của NumberInput
- **Định dạng số theo thời gian thực**: Tự động chèn dấu phân cách khi gõ (ví dụ `1000000` -> `1.000.000`).
- **Giữ vị trí con trỏ chuẩn xác**: Tính toán vị trí con trỏ chuột khi chèn/xóa dấu phân cách, người dùng thoải mái sửa số ở giữa mà không bị nhảy con trỏ về cuối.
- **Tối ưu Bàn phím Mobile**: Tự động bật bàn phím số `inputMode="numeric"` hoặc `inputMode="decimal"` khi có số thập phân.
- **Hỗ trợ đa định dạng quốc tế**: Dễ dàng tùy biến `thousandSeparator` và `decimalSeparator` (chuẩn VN `.` / `,` hoặc chuẩn US `,` / `.`).
- **Giới hạn Min / Max thông minh**: Clamp `max` tức thì để chặn nhập vượt ngưỡng, đồng thời cho phép gõ từng chữ số với `min` dương và tự động clamp về `min` khi `onBlur`.
- **Hỗ trợ `value` linh hoạt**: Nhận cả số nguyên (`value={1000000}`) hoặc chuỗi (`value="1.000.000"`).

### 📖 Ví dụ sử dụng `NumberInput`

#### 1. Nhập số tiền cơ bản (Chuẩn Việt Nam)
```tsx
import { NumberInput } from "@owa/ui";

export function CurrencyExample() {
  const [amount, setAmount] = useState<string | number>("");

  return (
    <NumberInput
      label="Số tiền thanh toán"
      rightAddon="VNĐ"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      placeholder="0"
    />
  );
}
```

#### 2. Nhập số thập phân (Ví dụ: Khối lượng kg hoặc USD)
```tsx
<NumberInput
  label="Trọng lượng"
  rightAddon="kg"
  maxDecimalDigits={2}
  decimalSeparator=","
  thousandSeparator="."
  placeholder="0,00"
/>

<NumberInput
  label="Số tiền USD"
  leftAddon="$"
  maxDecimalDigits={2}
  decimalSeparator="."
  thousandSeparator=","
  placeholder="0.00"
/>
```

#### 3. Giới hạn Min & Max
```tsx
<NumberInput
  label="Số lượng vé"
  min={1}
  max={10}
  helperText="Tối thiểu 1 vé, tối đa 10 vé mỗi lượt mua."
/>
```

---

### 🛠 Bảng thông số Props (`NumberInputProps`)

| Tên Prop | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `value` | `string \| number \| null` | — | Giá trị số hoặc chuỗi đã format (Controlled mode). |
| `defaultValue` | `string \| number \| null` | — | Giá trị mặc định ban đầu (Uncontrolled mode). |
| `min` | `number` | — | Giá trị nhỏ nhất cho phép (clamp khi onBlur hoặc số âm vượt ngưỡng). |
| `max` | `number` | — | Giá trị lớn nhất cho phép (clamp thời gian thực khi gõ). |
| `thousandSeparator` | `string` | `'.'` | Ký tự phân cách hàng nghìn. |
| `decimalSeparator` | `string` | `','` | Ký tự phân cách phần thập phân. |
| `maxDecimalDigits` | `number` | `0` | Số chữ số thập phân tối đa (`0` là số nguyên). |
| `allowNegative` | `boolean` | — | Cho phép nhập số âm (mặc định `true` nếu `min < 0` hoặc chưa đặt `min`). |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | — | Callback khi giá trị input thay đổi. |
| `onBlur` | `(e: FocusEvent<HTMLInputElement>) => void` | — | Callback khi blur ra ngoài (tự động clamp `min`). |
| `...props` | `InputProps` | — | Thừa hưởng toàn bộ props của component `Input` (`size`, `variant`, `color`, `radius`, `label`, `config`, `leftIcon`, `rightAddon`,...). |

---

## 🔢 OtpInput Component

Component **`OtpInput`** chuyên dụng cho việc nhập mã xác thực OTP (One-Time Password) hoặc mã PIN với từng ô ký tự riêng biệt, hỗ trợ **Mobile SMS Autofill**, **Smart Paste**, **Keyboard Navigation**, **Tự động bôi đen để gõ đè**, và **Tích hợp HTML Form**.

### 🌟 Điểm nổi bật của OtpInput
- **Tự động chuyển Focus**: Tự động chuyển con trỏ sang ô tiếp theo khi gõ, lùi lại ô trước khi bấm `Backspace`.
- **Hỗ trợ Mobile SMS Autofill & Smart Paste**: Bắt cả sự kiện `onPaste` trực tiếp và `onChange` khi iOS/Android tự động điền mã OTP từ tin nhắn SMS.
- **Tự động bôi đen khi Focus (`onFocus select`)**: Cho phép người dùng click vào bất kỳ ô nào và gõ số mới để đè lên số cũ mà không cần xóa thủ công.
- **Điều khiển trực tiếp qua Ref (`OtpInputRef`)**: Hỗ trợ gọi `ref.current.getValue()`, `ref.current.clear()`, và `ref.current.focus(index)`.
- **Tích hợp Form HTML chuẩn**: Tự động render `<input type="hidden" name={name} value={...}>` giúp gửi toàn bộ chuỗi OTP khi submit `<form>` hoặc dùng `FormData`.
- **Phân nhóm linh hoạt**: Hỗ trợ `groupSize` và `separator` (ví dụ chia cụm `3-3`: `123 - 456`).
- **Bảo mật & Che giấu mã**: Hỗ trợ `mask={true}` hoặc `type="password"`.

### 📖 Ví dụ sử dụng `OtpInput`

#### 1. Sử dụng cơ bản & Lắng nghe hoàn thành
```tsx
import { OtpInput } from "@owa/ui";

export function OtpBasicExample() {
  return (
    <OtpInput
      length={6}
      label="Mã xác thực OTP"
      helperText="Nhập 6 chữ số được gửi tới số điện thoại của bạn."
      onChange={(val) => console.log("Đang nhập:", val)}
      onComplete={(val) => console.log("Đã điền đủ 6 số:", val)}
    />
  );
}
```

#### 2. Điều khiển bằng `ref` (`OtpInputRef`)
```tsx
import { useRef } from "react";
import { OtpInput, type OtpInputRef } from "@owa/ui";

export function OtpRefExample() {
  const otpRef = useRef<OtpInputRef>(null);

  const handleResend = () => {
    // Xóa trắng toàn bộ các ô và tự động focus lại ô đầu tiên
    otpRef.current?.clear();
  };

  const handleCheck = () => {
    const code = otpRef.current?.getValue();
    alert(`Mã hiện tại: ${code}`);
  };

  return (
    <div className="flex flex-col gap-3">
      <OtpInput ref={otpRef} length={4} />
      <div className="flex gap-2">
        <button onClick={handleResend}>Gửi lại mã</button>
        <button onClick={handleCheck}>Kiểm tra mã</button>
      </div>
    </div>
  );
}
```

#### 3. Phân nhóm & Che giấu mã (Masked)
```tsx
<OtpInput
  length={6}
  groupSize={3}
  separator="-"
  mask={true}
  label="Mã PIN giao dịch"
/>
```

#### 4. Cấu hình trạng thái qua `config` (`OtpInputConfig`)
```tsx
<OtpInput
  length={6}
  name="otp_token"
  config={{
    isRequired: true,
    isLoading: isSubmitting,
    showSpinner: true,
    isInvalid: hasError,
  }}
  errorMessage={hasError ? "Mã OTP không chính xác hoặc đã hết hạn!" : undefined}
/>
```

---

### 🛠 Bảng thông số Props (`OtpInputProps`)

| Tên Prop | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `length` | `number` | `6` | Số lượng ô ký tự OTP cần nhập. |
| `value` | `string` | — | Giá trị chuỗi OTP (Controlled mode). |
| `defaultValue` | `string` | `""` | Giá trị mặc định ban đầu (Uncontrolled mode). |
| `onChange` | `(value: string) => void` | — | Callback kích hoạt mỗi khi chuỗi OTP thay đổi. |
| `onComplete` | `(value: string) => void` | — | Callback kích hoạt khi người dùng đã điền đủ tất cả các ô. |
| `type` | `'numeric' \| 'alphanumeric' \| 'password'` | `'numeric'` | Kiểu ký tự cho phép nhập. |
| `mask` | `boolean \| string` | `false` | Ẩn ký tự đã nhập (dạng chấm tròn mật khẩu). |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích thước từng ô slot (`xs`: 24px, `sm`: 32px, `md`: 40px, `lg`: 48px, `xl`: 56px). |
| `variant` | `'outline' \| 'filled' \| 'ghost' \| 'other'` | `'outline'` | Biến thể hiển thị giao diện của từng ô slot. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Chủ đề màu sắc viền/nền khi focus. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | — | Độ bo góc của từng ô slot. |
| `config` | `OtpInputConfig` | — | Cấu hình tập trung các cờ trạng thái (`isRequired`, `isInvalid`, `isLoading`, `showSpinner`). |
| `id` | `string` | — | ID tùy biến (tự sinh `${id}-slot-${index}`). |
| `name` | `string` | — | Tên trường form (tự render hidden input chứa toàn bộ chuỗi OTP gộp lại). |
| `autoFocus` | `boolean` | `false` | Tự động focus vào ô trống đầu tiên khi mount. |
| `disabled` | `boolean` | `false` | Vô hiệu hóa tương tác toàn bộ các ô. |
| `readOnly` | `boolean` | `false` | Chế độ chỉ đọc, không cho phép chỉnh sửa. |
| `groupSize` | `number` | — | Số lượng ô trong mỗi nhóm (ví dụ `3` cho cụm `3-3`). |
| `separator` | `ReactNode` | `'-'` | Ký tự hoặc icon phân cách giữa các nhóm. |
| `label` | `ReactNode` | — | Nhãn mô tả cho trường nhập OTP. |
| `labelPlacement` | `'top' \| 'left'` | `'top'` | Vị trí đặt nhãn. |
| `helperText` | `ReactNode` | — | Văn bản hướng dẫn hiển thị bên dưới. |
| `errorMessage` | `ReactNode` | — | Thông báo lỗi (tự chuyển trạng thái sang error). |
| `allowOneTimeCode` | `boolean` | `true` | Cho phép hệ điều hành tự động điền mã OTP từ tin nhắn SMS (`autoComplete="one-time-code"`). |
| `getSlotAriaLabel` | `(index: number, length: number) => string` | — | Tùy biến `aria-label` cho từng ô slot (hỗ trợ đa ngôn ngữ i18n). |
| `ref` | `Ref<OtpInputRef>` | — | Ref cung cấp các phương thức điều khiển: `getValue()`, `clear()`, `focus(index)`. |

---

### ⚙️ Cấu hình `OtpInputConfig`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Hiển thị dấu `*` đỏ và đánh dấu `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Kích hoạt giao diện báo lỗi và `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Khóa tương tác (`aria-busy="true"`). |
| `showSpinner` | `boolean` | `false` | Hiển thị biểu tượng xoay spinner cạnh nhóm ô OTP khi `isLoading = true`. |

---

### 🎛️ Phương thức `OtpInputRef`

| Phương thức | Tham số | Giá trị trả về | Mô tả |
| :--- | :--- | :--- | :--- |
| `getValue()` | — | `string` | Lấy chuỗi OTP hoàn chỉnh hiện tại (ví dụ: `"123456"`). |
| `clear()` | — | `void` | Xóa sạch toàn bộ các ô về rỗng, trigger `onChange("")` và tự động focus về ô đầu tiên. |
| `focus(index?)` | `index?: number` | `void` | Focus vào ô chỉ định (mặc định là ô đầu tiên `index = 0`). |

---

## 🏷️ MultiInput Component

Component **`MultiInput`** chuyên dụng cho việc nhập nhiều giá trị (tags, keywords, chips, danh sách email...) với khả năng **phân tách tự động khi gõ hoặc Paste**, **ngăn chặn trùng lặp**, **giới hạn số lượng tag**, **thu gọn hiển thị `+N`**, và **tích hợp HTML Form Submission dạng mảng (`name[]`)**.

### 🌟 Điểm nổi bật của MultiInput
- **Tạo tag linh hoạt**: Nhấn `Enter`, `Comma (,)`, `Tab`, `Space` (hoặc tùy biến qua prop `delimiters`).
- **Phân tách thông minh khi Paste**: Tự động nhận diện chuỗi copy nhiều giá trị (ví dụ: `"React, Vue; Angular\nSvelte"`) và phân tách thành từng tag độc lập.
- **Quản lý giới hạn & Xác thực**: Hỗ trợ chặn tag trùng (`allowDuplicates={false}`), giới hạn tổng tag (`maxTags`), độ dài tối đa (`maxTagLength`), và hàm validate tùy biến (`validateTag`).
- **Thu gọn tag hiển thị (`+N`)**: Giữ giao diện gọn gàng với `maxTagCount` (ví dụ hiển thị 3 tag đầu, tag còn lại gom thành badge `+5`).
- **Tích hợp Form HTML chuẩn**: Khi có prop `name="tags"`, tự động render các thẻ hidden `<input type="hidden" name="tags[]" value="..." />` tương thích hoàn hảo với `FormData` và backend server.
- **Tùy biến giao diện toàn diện**: Hỗ trợ `leftIcon`, `leftAddon`, `rightAddon`, nút thêm nhanh `showAddButton` (`+`), và tùy biến từng tag qua `renderTag`.

### 📖 Ví dụ sử dụng `MultiInput`

#### 1. Sử dụng cơ bản với phím Enter & Dấu phẩy
```tsx
import { MultiInput } from "@owa/ui";

export function BasicTagsExample() {
  return (
    <MultiInput
      label="Kỹ năng chuyên môn"
      placeholder="Nhập kỹ năng và bấm Enter..."
      delimiters={["Enter", ","]}
      defaultValue={["React", "TypeScript"]}
      onChange={(tags) => console.log("Danh sách tags:", tags)}
    />
  );
}
```

#### 2. Nút Thêm nhanh & Giới hạn số lượng
```tsx
<MultiInput
  label="Từ khóa tìm kiếm"
  showAddButton={true}
  maxTags={5}
  onMaxTagsReached={(tag) => alert(`Đã đạt tối đa 5 tags!`)}
  placeholder="Nhập từ khóa..."
/>
```

#### 3. Thu gọn hiển thị (`maxTagCount`) & Kiểm tra trùng lặp
```tsx
<MultiInput
  label="Danh mục sản phẩm"
  maxTagCount={3}
  allowDuplicates={false}
  onDuplicate={(tag) => alert(`Tag "${tag}" đã tồn tại!`)}
  defaultValue={["Điện tử", "Gia dụng", "Thời trang", "Mỹ phẩm", "Sách"]}
/>
```

#### 4. Cấu hình trạng thái qua `config` (`MultiInputConfig`)
```tsx
<MultiInput
  name="user_skills"
  label="Kỹ năng bắt buộc"
  config={{
    isRequired: true,
    isClearable: true,
    isFullWidth: true,
    isLoading: isSubmitting,
    showSpinner: true,
  }}
/>
```

---

### 🛠 Bảng thông số Props (`MultiInputProps`)

| Tên Prop | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `value` | `string[]` | — | Mảng danh sách tags (Controlled mode). |
| `defaultValue` | `string[]` | `[]` | Danh sách tags mặc định ban đầu (Uncontrolled mode). |
| `onChange` | `(values: string[]) => void` | — | Callback kích hoạt mỗi khi danh sách tags thay đổi. |
| `inputValue` | `string` | — | Giá trị chuỗi text đang gõ dở trong ô input (Controlled). |
| `onInputValueChange` | `(value: string) => void` | — | Callback khi text đang gõ dở thay đổi. |
| `delimiters` | `string[]` | `['Enter']` | Mảng các phím kích hoạt tạo tag (`'Enter'`, `','`, `'Tab'`, `'Space'`). |
| `showAddButton` | `boolean` | `false` | Hiển thị nút (+) ở cuối ô input để click tạo tag. |
| `renderAddButton` | `(props: { onAdd: () => void; disabled?: boolean }) => ReactNode` | — | Tùy biến render nút (+) thêm tag. |
| `addOnBlur` | `boolean` | `false` | Tự động tạo tag từ chuỗi đang gõ dở khi blur ra ngoài. |
| `addOnPaste` | `boolean` | `true` | Tự động phân tách chuỗi khi Paste vào ô input. |
| `pasteSplitRegex` | `RegExp` | `/[\r\n,;\t]+/` | Regex dùng để phân tách chuỗi khi Paste. |
| `trimValues` | `boolean` | `true` | Tự động cắt bỏ khoảng trắng thừa đầu và cuối mỗi tag. |
| `allowDuplicates` | `boolean` | `false` | Cho phép nhập các tag trùng lặp hay không. |
| `onDuplicate` | `(value: string) => void` | — | Callback khi người dùng cố gắng thêm tag đã tồn tại. |
| `maxTags` | `number` | — | Số lượng tag tối đa cho phép thêm vào danh sách. |
| `onMaxTagsReached` | `(value: string) => void` | — | Callback kích hoạt khi đạt giới hạn `maxTags`. |
| `maxTagLength` | `number` | — | Giới hạn số ký tự tối đa của 1 tag. |
| `validateTag` | `(tag: string) => boolean \| string` | — | Hàm kiểm tra hợp lệ của tag (trả về `false` hoặc `string` báo lỗi). |
| `onValidateError` | `(tag: string, error?: string) => void` | — | Callback khi tag không vượt qua kiểm tra validate. |
| `maxTagCount` | `number` | — | Số lượng tag tối đa hiển thị trước khi thu gọn thành `+N`. |
| `renderTag` | `(props: TagRenderProps) => ReactNode` | — | Tùy biến hiển thị badge tag hoàn toàn. |
| `tagVariant` | `BadgeVariant` | `'soft'` | Biến thể hiển thị giao diện của Badge tag. |
| `tagColor` | `BadgeColor` | `'primary'` | Chủ đề màu sắc của Badge tag. |
| `tagRadius` | `BadgeRadius` | — | Độ bo góc của Badge tag (tự đồng bộ theo Input nếu không truyền). |
| `tagSize` | `BadgeSize` | — | Kích thước của Badge tag (tự đồng bộ theo `size` nếu không truyền). |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích cỡ tổng thể của MultiInput. |
| `variant` | `'outline' \| 'filled' \| 'ghost' \| 'other'` | `'outline'` | Biến thể hiển thị giao diện khung input. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Chủ đề màu sắc viền và viền focus. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | — | Độ bo góc của khung input. |
| `label` | `ReactNode` | — | Nhãn tiêu đề của MultiInput. |
| `labelPlacement` | `'floating' \| 'top' \| 'left'` | `'floating'` | Vị trí đặt nhãn. |
| `config` | `MultiInputConfig` | — | Cấu hình tập trung các cờ trạng thái (`isRequired`, `isInvalid`, `isLoading`, `showSpinner`, `isClearable`, `isFullWidth`). |
| `id` | `string` | — | ID tùy biến của thẻ input. |
| `name` | `string` | — | Tên trường form (tự động render danh sách hidden input `name[]` chứa các tag). |
| `placeholder` | `string` | `'Type and press Enter...'` | Placeholder khi danh sách tag rỗng. |
| `disabled` | `boolean` | `false` | Vô hiệu hóa toàn bộ tương tác. |
| `readOnly` | `boolean` | `false` | Chế độ chỉ đọc, không cho thêm/xóa tag. |
| `autoFocus` | `boolean` | `false` | Tự động focus vào ô input khi mount. |
| `leftIcon` | `ReactNode` | — | Icon hiển thị ở đầu khung input. |
| `leftAddon` | `ReactNode` | — | Khung addon cố định ở bên trái. |
| `rightIcon` | `ReactNode` | — | Icon hiển thị ở cuối khung input. |
| `rightAddon` | `ReactNode` | — | Khung addon cố định ở bên phải. |
| `helperText` | `ReactNode` | — | Đoạn văn bản hướng dẫn bên dưới. |
| `errorMessage` | `ReactNode` | — | Thông báo lỗi hiển thị bên dưới. |
| `onClear` | `() => void` | — | Callback khi nhấn nút xóa toàn bộ tags. |
| `ref` | `Ref<HTMLInputElement>` | — | Ref chuyển tiếp đến thẻ `<input>` gõ text bên trong. |

---

### ⚙️ Cấu hình `MultiInputConfig`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Hiển thị dấu `*` đỏ và đánh dấu `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Bật viền đỏ báo lỗi và `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Vô hiệu hóa tương tác và bật `aria-busy="true"`. |
| `showSpinner` | `boolean` | `false` | Hiển thị biểu tượng xoay spinner khi `isLoading = true`. |
| `isClearable` | `boolean` | `false` | Hiển thị nút xóa nhanh toàn bộ tags khi có ít nhất 1 tag hoặc text. |
| `isFullWidth` | `boolean` | `false` | Mở rộng chiếm toàn bộ 100% chiều ngang container cha. |

---

## 🛠️ Các hàm tiện ích (Utility Functions)

Gói thư viện xuất khẩu các hàm helper tiện ích chuyên dụng cho việc xử lý số, OTP, và phân tách tags:

| Tên hàm | Tham số | Giá trị trả về | Mô tả |
| :--- | :--- | :--- | :--- |
| `splitTagsFromText(text, splitRegex?, trim?)` | `text: string, splitRegex?: RegExp, trim?: boolean` | `string[]` | Phân tách chuỗi văn bản (khi gõ hoặc Paste) thành danh sách các tag độc lập theo regex phân cách và cắt bỏ khoảng trắng thừa. |
| `isValidOtpChar(char, type)` | `char: string, type: OtpInputType` | `boolean` | Kiểm tra xem 1 ký tự nhập vào có hợp lệ theo kiểu OTP chỉ định (`numeric`, `alphanumeric`, `alpha`) hay không. |
| `sanitizeOtpString(text, type)` | `text: string, type: OtpInputType` | `string` | Làm sạch toàn bộ chuỗi text, chỉ giữ lại các ký tự hợp lệ theo kiểu OTP chỉ định. |
| `formatNumberString(...)` | `value: string, options?: NumberFormatOptions` | `string` | Định dạng chuỗi số với dấu phân cách hàng nghìn và phần thập phân. |
| `parseRawNumberString(value)` | `value: string` | `string` | Chuyển đổi chuỗi số hiển thị về dạng số thô tiêu chuẩn. |



