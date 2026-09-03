import { isValidElement, ReactElement, ReactNode } from "react";
import { toast as sonnerToast } from "sonner";
import Alert from "../alert/Alert";
import { AlertColor, AlertProps, AlertVariant } from "../alert/types";
import { ToastMessageObject, ToastMessageResult, ToastOptions, ToastPromiseOptions } from "./types";
import { DEFAULT_TOAST_DURATION } from "./constants";
import Spinner from "../icons/Spinner";

function showToast(
  title: ReactNode,
  color: AlertColor = "info",
  variant: AlertVariant = "soft",
  description?: ReactNode,
  options: ToastOptions = {},
  customId?: string | number
): string | number {
  const { duration, position, onDismiss, onAutoClose, ...alertProps } = options;

  return sonnerToast.custom(
    (id) => (
      <Alert
        color={color}
        variant={variant}
        title={title}
        description={description}
        closable={alertProps.closable ?? true}
        onClose={() => {
          alertProps.onClose?.();
          sonnerToast.dismiss(id);
        }}
        {...alertProps}
      />
    ),
    {
      id: customId,
      duration: duration ?? DEFAULT_TOAST_DURATION,
      position,
      onDismiss,
      onAutoClose,
    }
  );
}

function isToastMessageObject(value: unknown): value is ToastMessageObject {
  return (
    typeof value === "object" &&
    value !== null &&
    !isValidElement(value) &&
    !Array.isArray(value) &&
    ("title" in value || "description" in value || "color" in value || "variant" in value)
  );
}

function extractMessageDetails(
  result: ToastMessageResult,
  fallbackColor: AlertColor,
  fallbackVariant: AlertVariant
): { title: ReactNode; description?: ReactNode; color: AlertColor; variant: AlertVariant } {
  if (isToastMessageObject(result)) {
    return {
      title: result.title ?? "",
      description: result.description,
      color: result.color ?? fallbackColor,
      variant: result.variant ?? fallbackVariant,
    };
  }

  return {
    title: result,
    description: undefined,
    color: fallbackColor,
    variant: fallbackVariant,
  };
}

/**
 * Interface cho hàm và các phương thức của đối tượng `toast`.
 * Cú pháp chuẩn: `toast.success(title, description?, options?)`
 */
export interface ToastFunction {
  /**
   * Kích hoạt một thông báo Toast mặc định (màu info).
   * @param title Tiêu đề của thông báo
   * @param description Nội dung mô tả chi tiết (tùy chọn)
   * @param options Cấu hình phụ như variant, size, duration,... (tùy chọn)
   */
  (title: ReactNode, description?: ReactNode, options?: ToastOptions): string | number;

  /**
   * Kích hoạt thông báo tùy biến hoàn toàn (dùng hàm render JSX hoặc truyền AlertProps).
   */
  custom: {
    (jsxFn: (id: string | number) => ReactNode, options?: ToastOptions): string | number;
    (alertProps: AlertProps & ToastOptions): string | number;
  };

  /**
   * Kích hoạt thông báo thành công (màu success).
   */
  success: (title: ReactNode, description?: ReactNode, options?: ToastOptions) => string | number;

  /**
   * Kích hoạt thông báo lỗi (màu error).
   */
  error: (title: ReactNode, description?: ReactNode, options?: ToastOptions) => string | number;

  /**
   * Kích hoạt thông báo cảnh báo (màu warning).
   */
  warning: (title: ReactNode, description?: ReactNode, options?: ToastOptions) => string | number;

  /**
   * Kích hoạt thông báo thông tin (màu info).
   */
  info: (title: ReactNode, description?: ReactNode, options?: ToastOptions) => string | number;

  /**
   * Kích hoạt thông báo đang tải dữ liệu (Loading spinner, không tự đóng).
   */
  loading: (title: ReactNode, description?: ReactNode, options?: ToastOptions) => string | number;

  /**
   * Tự động theo dõi Promise và chuyển trạng thái Toast từ Loading sang Success hoặc Error.
   */
  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    options: ToastPromiseOptions<T>
  ) => Promise<T>;

  /**
   * Đóng một Toast cụ thể bằng ID hoặc đóng tất cả Toasts nếu không truyền ID.
   */
  dismiss: (id?: string | number) => string | number | undefined;
}

const baseToast = ((
  title: ReactNode,
  description?: ReactNode,
  options?: ToastOptions
): string | number => {
  const opts = options || {};
  return showToast(title, opts.color || "info", opts.variant || "soft", description, opts);
}) as ToastFunction;

baseToast.custom = (
  arg: ((id: string | number) => ReactNode) | (AlertProps & ToastOptions),
  options: ToastOptions = {}
): string | number => {
  if (typeof arg === "function") {
    return sonnerToast.custom(
      (id) => arg(id) as ReactElement,
      {
        duration: options.duration ?? DEFAULT_TOAST_DURATION,
        position: options.position,
        onDismiss: options.onDismiss,
        onAutoClose: options.onAutoClose,
      }
    );
  }

  const { duration, position, onDismiss, onAutoClose, ...alertProps } = arg;
  return sonnerToast.custom(
    (id) => (
      <Alert
        closable={alertProps.closable ?? true}
        onClose={() => {
          alertProps.onClose?.();
          sonnerToast.dismiss(id);
        }}
        {...alertProps}
      />
    ),
    {
      duration: duration ?? DEFAULT_TOAST_DURATION,
      position,
      onDismiss,
      onAutoClose,
    }
  );
};

baseToast.success = (
  title: ReactNode,
  description?: ReactNode,
  options?: ToastOptions
): string | number => {
  const opts = options || {};
  return showToast(title, opts.color || "success", opts.variant || "soft", description, opts);
};

baseToast.error = (
  title: ReactNode,
  description?: ReactNode,
  options?: ToastOptions
): string | number => {
  const opts = options || {};
  return showToast(title, opts.color || "error", opts.variant || "soft", description, opts);
};

baseToast.warning = (
  title: ReactNode,
  description?: ReactNode,
  options?: ToastOptions
): string | number => {
  const opts = options || {};
  return showToast(title, opts.color || "warning", opts.variant || "soft", description, opts);
};

baseToast.info = (
  title: ReactNode,
  description?: ReactNode,
  options?: ToastOptions
): string | number => {
  const opts = options || {};
  return showToast(title, opts.color || "info", opts.variant || "soft", description, opts);
};

baseToast.loading = (
  title: ReactNode,
  description?: ReactNode,
  options?: ToastOptions
): string | number => {
  const opts = options || {};
  return showToast(title, opts.color || "info", opts.variant || "soft", description, {
    ...opts,
    icon: opts.icon ?? <Spinner className="size-full animate-spin" />,
    duration: opts.duration ?? Infinity,
    closable: opts.closable ?? false,
  });
};

baseToast.promise = async <T,>(
  promiseInput: Promise<T> | (() => Promise<T>),
  options: ToastPromiseOptions<T>
): Promise<T> => {
  const promise = typeof promiseInput === "function" ? promiseInput() : promiseInput;

  const { title: loadingTitle, description: loadingDesc } = extractMessageDetails(
    options.loading,
    "info",
    options.variant || "soft"
  );

  const toastId = baseToast.loading(loadingTitle, loadingDesc, {
    size: options.size,
    variant: options.variant,
    radius: options.radius,
  });

  try {
    const data = await promise;

    const rawSuccess = typeof options.success === "function" ? options.success(data) : options.success;
    const { title: successTitle, description: successDesc, color: successColor, variant: successVariant } =
      extractMessageDetails(rawSuccess, "success", options.variant || "soft");

    showToast(
      successTitle,
      successColor,
      successVariant,
      successDesc,
      {
        duration: options.duration ?? DEFAULT_TOAST_DURATION,
        size: options.size,
        radius: options.radius,
      },
      toastId
    );

    return data;
  } catch (err: unknown) {
    const rawError = typeof options.error === "function" ? options.error(err) : options.error;
    const { title: errorTitle, description: errorDesc, color: errorColor, variant: errorVariant } =
      extractMessageDetails(rawError, "error", options.variant || "soft");

    showToast(
      errorTitle,
      errorColor,
      errorVariant,
      errorDesc,
      {
        duration: options.duration ?? DEFAULT_TOAST_DURATION,
        size: options.size,
        radius: options.radius,
      },
      toastId
    );

    throw err;
  } finally {
    if (options.finally) {
      await options.finally();
    }
  }
};

baseToast.dismiss = (id?: string | number): string | number | undefined => {
  return sonnerToast.dismiss(id);
};

export const toast: ToastFunction = baseToast;
