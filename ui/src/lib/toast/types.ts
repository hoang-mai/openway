import { ReactNode } from "react";
import { ToasterProps as SonnerToasterProps, ToastT } from "sonner";
import { AlertProps, AlertColor, AlertVariant, AlertSize, AlertRadius } from "../alert/types";

/**
 * Vị trí hiển thị của danh sách thông báo Toast trên màn hình.
 */
export type ToastPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

/**
 * Cấu hình tùy chọn cho từng thông báo Toast đơn lẻ:
 * - Dạng gọi hàm chuẩn: `toast.success(title, description?, options?)`
 */
export interface ToastOptions extends Omit<AlertProps, "title" | "description"> {
  /**
   * Thời gian hiển thị thông báo trước khi tự động đóng (miliseconds). Mặc định 4000ms.
   * @default 4000
   */
  duration?: number;

  /**
   * Vị trí hiển thị riêng cho thông báo này trên màn hình.
   */
  position?: ToastPosition;

  /**
   * Callback được gọi khi thông báo bị đóng/gỡ bỏ khỏi màn hình.
   */
  onDismiss?: (toast: ToastT) => void;

  /**
   * Callback được gọi khi thông báo tự động đóng do hết thời gian duration.
   */
  onAutoClose?: (toast: ToastT) => void;
}

/**
 * Cấu trúc thông báo dạng Object chi tiết cho `toast.promise`.
 */
export interface ToastMessageObject {
  title?: ReactNode;
  description?: ReactNode;
  color?: AlertColor;
  variant?: AlertVariant;
}

/**
 * Kiểu dữ liệu linh hoạt cho nội dung thông báo trả về trong `toast.promise`:
 * - `ReactNode`: Chuỗi text hoặc phần tử JSX thông thường.
 * - `ToastMessageObject`: Object chi tiết gồm `{ title, description, color, variant }`.
 */
export type ToastMessageResult = ReactNode | ToastMessageObject;

/**
 * Hàm tạo nội dung thông báo thành công động dựa theo dữ liệu `data: T` trả về từ Promise.
 */
export type ToastPromiseFunction<T> = (data: T) => ToastMessageResult;

/**
 * Cấu hình các trạng thái cho `toast.promise(promise, options)`.
 */
export interface ToastPromiseOptions<T = unknown> {
  /**
   * Nội dung hiển thị trong lúc Promise đang thực thi (Loading state).
   */
  loading: ToastMessageResult;

  /**
   * Nội dung hiển thị khi Promise thực thi thành công (Resolve state).
   * Có thể truyền trực tiếp nội dung hoặc một hàm nhận `data: T`.
   */
  success: ToastMessageResult | ToastPromiseFunction<T>;

  /**
   * Nội dung hiển thị khi Promise gặp lỗi (Reject state).
   * Có thể truyền trực tiếp nội dung hoặc một hàm nhận `error: unknown`.
   */
  error: ToastMessageResult | ((error: unknown) => ToastMessageResult);

  /**
   * Callback chạy sau khi Promise hoàn tất (cả khi resolve hoặc reject).
   */
  finally?: () => void | Promise<void>;

  /**
   * Thời gian hiển thị thông báo kết quả (ms). Mặc định 4000ms.
   * @default 4000
   */
  duration?: number;

  /**
   * Kích cỡ của Alert hiển thị trong Toast.
   */
  size?: AlertSize;

  /**
   * Biến thể giao diện của Alert hiển thị trong Toast.
   */
  variant?: AlertVariant;

  /**
   * Tùy chỉnh độ bo góc của Alert hiển thị trong Toast.
   */
  radius?: AlertRadius;
}

/**
 * Props cho component `<Toaster />` được mount tại root layout của ứng dụng.
 */
export interface ToasterProps extends SonnerToasterProps {
  /**
   * Vị trí mặc định của toàn bộ danh sách toasts trên màn hình.
   * @default 'top-right'
   */
  position?: ToastPosition;

  /**
   * Số lượng toast tối đa hiển thị cùng lúc trước khi tự động xếp chồng 3D (stack).
   * @default 3
   */
  visibleToasts?: number;

  /**
   * Mở rộng toàn bộ danh sách toasts thay vì gộp lại thành 1 stack 3D.
   * - `false` (mặc định): Tự động gộp thẻ 3D, chỉ bung ra khi hover chuột.
   * - `true`: Luôn luôn mở rộng trải dài toàn bộ danh sách.
   * @default false
   */
  expand?: boolean;

  /**
   * Thời gian hiển thị mặc định của các toasts (miliseconds).
   * @default 4000
   */
  duration?: number;

  /**
   * Cho phép hiển thị nút đóng `(X)` trên các toasts.
   * @default true
   */
  closeButton?: boolean;

  /**
   * Tùy biến className bao ngoài container của Toaster.
   */
  className?: string;
}
