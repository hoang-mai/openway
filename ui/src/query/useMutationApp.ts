import { useRef, type ReactNode } from "react";
import {
  useMutation,
  useQueryClient,
  type DefaultError,
  type InvalidateOptions,
  type InvalidateQueryFilters,
  type QueryKey,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { toast } from "../components/toast";
import type { ToastOptions } from "../components/toast/types";
import type { AlertVariant } from "../components/alert/types";
import { useLocale } from "../locale";
import { enUS } from "../locale/enUS";
import type { MutationLocale } from "../locale/types";

/**
 * Mục tiêu invalidate cache: có thể là QueryKey (readonly unknown[]) hoặc InvalidateQueryFilters.
 */
export type InvalidateQueryTarget = QueryKey | InvalidateQueryFilters;

/**
 * Tùy chọn cấu hình Toast cho hook `useMutationApp`.
 */
export interface UseMutationAppToastOptions<TData, TError, TVariables> {
  /**
   * Nội dung thông báo khi đang thực thi mutation (loading spinner, không tự đóng).
   * Có thể là ReactNode hoặc một hàm nhận vào `variables`.
   */
  loading?: ReactNode | ((variables: TVariables) => ReactNode);

  /**
   * Nội dung thông báo khi mutation hoàn tất thành công.
   * Có thể là ReactNode hoặc một hàm nhận vào `(data, variables)`.
   */
  success?: ReactNode | ((data: TData, variables: TVariables) => ReactNode);

  /**
   * Tiêu đề thông báo khi mutation thất bại.
   * - `true`: Hiển thị tiêu đề lỗi mặc định ("Đã xảy ra lỗi").
   * - `false`: Không hiển thị toast lỗi.
   * - `ReactNode`: Tiêu đề lỗi cố định.
   * - `(error, variables) => ReactNode`: Hàm tạo tiêu đề lỗi linh hoạt.
   * @default true
   */
  error?: boolean | ReactNode | ((error: TError, variables: TVariables) => ReactNode);

  /**
   * Nội dung mô tả chi tiết (description) cho thông báo khi đang loading.
   */
  loadingDescription?: ReactNode | ((variables: TVariables) => ReactNode);

  /**
   * Nội dung mô tả chi tiết (description) cho thông báo thành công.
   */
  successDescription?: ReactNode | ((data: TData, variables: TVariables) => ReactNode);

  /**
   * Nội dung mô tả chi tiết (description) cho thông báo lỗi.
   * Nếu không truyền, tự động trích xuất thông điệp từ API/Error qua `extractErrorMessage`.
   */
  errorDescription?: ReactNode | ((error: TError, variables: TVariables) => ReactNode);

  /**
   * Tùy chọn cấu hình bổ sung cho Toast (duration, position, size, radius, closable...).
   */
  options?: ToastOptions;

  /**
   * Kiểu hiển thị Toast: "soft" | "solid" | "outline".
   * @default "soft"
   */
  variant?: AlertVariant;
}

/**
 * Các tùy chọn cấu hình cho hook `useMutationApp`.
 */
export interface UseMutationAppOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> extends Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn"> {
  /**
   * Hàm gọi API hoặc thực hiện tác vụ bất đồng bộ.
   */
  mutationFn?: (variables: TVariables) => Promise<TData>;

  /**
   * Khóa truy vấn hoặc danh sách khóa truy vấn cần tự động làm mới (invalidate) khi mutation thành công.
   * Hỗ trợ:
   * - Một QueryKey đơn: `["teachers"]` hoặc `["users", 1]`
   * - Danh sách nhiều QueryKey: `[["teachers"], ["classes"]]`
   * - Bộ lọc nâng cao InvalidateQueryFilters: `{ queryKey: ["teachers"], exact: true }`
   * - Danh sách bộ lọc: `[{ queryKey: ["teachers"] }, { queryKey: ["classes"] }]`
   * - Hàm trả về động: `(data, variables) => [["teachers"], ["classes", variables.classId]]`
   */
  invalidateQueries?:
    | InvalidateQueryTarget
    | InvalidateQueryTarget[]
    | ((
        data: TData,
        variables: TVariables
      ) =>
        | InvalidateQueryTarget
        | InvalidateQueryTarget[]
        | void
        | null
        | undefined);

  /**
   * Tùy chọn InvalidateOptions bổ sung truyền cho `queryClient.invalidateQueries`
   * (ví dụ: `throwOnError`, `cancelRefetch`).
   */
  invalidateOptions?: InvalidateOptions;

  /**
   * Cấu hình hiển thị thông báo Toast.
   * - `false`: Tắt toàn bộ thông báo Toast.
   * - `true`: Bật Toast với cấu hình mặc định (tự động báo lỗi nếu có).
   * - `object`: Cấu hình chi tiết `loading`, `success`, `error`.
   */
  toast?: boolean | UseMutationAppToastOptions<TData, TError, TVariables>;

  /**
   * Shortcut cấu hình nhanh thông báo thành công.
   */
  successMessage?: ReactNode | ((data: TData, variables: TVariables) => ReactNode);

  /**
   * Shortcut cấu hình nhanh thông báo lỗi.
   */
  errorMessage?: ReactNode | ((error: TError, variables: TVariables) => ReactNode);

  /**
   * Shortcut cấu hình nhanh thông báo loading.
   */
  loadingMessage?: ReactNode | ((variables: TVariables) => ReactNode);
}

/**
 * Kết quả trả về từ hook `useMutationApp`.
 */
export type UseMutationAppReturn<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> = UseMutationResult<TData, TError, TVariables, TContext> & {
  /**
   * Bí danh (alias) của `isPending`, tương thích ngược với thói quen sử dụng `isLoading` của TanStack Query v4.
   */
  isLoading: boolean;
};

/**
 * Hàm hỗ trợ tự động trích xuất thông điệp lỗi (error message) từ nhiều định dạng lỗi phổ biến:
 * - Axios Error response (`error.response?.data?.message`, `error.response?.data?.error`...)
 * - Fetch API response / HTTP status
 * - Standard JS Error (`error.message`)
 * - String error
 */
export function extractErrorMessage(
  error: unknown,
  fallback?: string,
  locale?: MutationLocale
): string {
  const loc = locale ?? enUS.mutation;
  const defaultFallback = fallback ?? loc.defaultError;
  if (!error) return defaultFallback;

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  if (typeof error === "object" && error !== null) {
    const errObj = error as Record<string, unknown>;

    // 1. Axios error structure: error.response?.data
    if (errObj.response && typeof errObj.response === "object" && errObj.response !== null) {
      const resp = errObj.response as Record<string, unknown>;
      const status = typeof resp.status === "number" ? resp.status : undefined;

      if (resp.data && typeof resp.data === "object" && resp.data !== null) {
        const data = resp.data as Record<string, unknown>;

        if (typeof data.message === "string" && data.message.trim()) {
          return data.message;
        }
        if (typeof data.error === "string" && data.error.trim()) {
          return data.error;
        }
        if (typeof data.detail === "string" && data.detail.trim()) {
          return data.detail;
        }
        if (typeof data.title === "string" && data.title.trim()) {
          return data.title;
        }

        // NestJS / class-validator / Laravel array errors: { message: ["Field a is required", ...] }
        if (Array.isArray(data.message) && data.message.length > 0) {
          const first = data.message[0];
          if (typeof first === "string") return first;
        }

        // Standard errors array: { errors: ["...", "..."] } or { errors: [{ message: "..." }] }
        if (Array.isArray(data.errors) && data.errors.length > 0) {
          const first = data.errors[0];
          if (typeof first === "string") return first;
          if (typeof first === "object" && first !== null) {
            const firstRecord = first as Record<string, unknown>;
            if (typeof firstRecord.message === "string" && firstRecord.message.trim()) {
              return firstRecord.message;
            }
          }
        }
      }

      // HTTP Status code fallback nếu body không có message rõ ràng
      if (status) {
        switch (status) {
          case 400:
            return loc.badRequest;
          case 401:
            return loc.unauthorized;
          case 403:
            return loc.forbidden;
          case 404:
            return loc.notFound;
          case 409:
            return loc.conflict;
          case 422:
            return loc.unprocessable;
          case 500:
            return loc.serverError;
          case 502:
          case 503:
          case 504:
            return loc.networkError;
        }
      }
    }

    // 2. Standard JS Error: error.message
    if (typeof errObj.message === "string" && errObj.message.trim()) {
      return errObj.message;
    }

    // 3. Simple fields: error.error, error.detail, error.title
    if (typeof errObj.error === "string" && errObj.error.trim()) {
      return errObj.error;
    }
    if (typeof errObj.detail === "string" && errObj.detail.trim()) {
      return errObj.detail;
    }
  }

  return defaultFallback;
}

/**
 * Chuẩn hóa các mục tiêu invalidation thành danh sách `{ filters, options }`
 */
function normalizeInvalidateTargets(
  targets: unknown,
  baseOptions?: InvalidateOptions
): Array<{ filters: InvalidateQueryFilters; options?: InvalidateOptions }> {
  if (!targets) return [];

  if (Array.isArray(targets)) {
    if (targets.length === 0) return [];

    // Kiểm tra xem targets là danh sách các target hay bản thân nó là 1 QueryKey
    // Nếu mọi phần tử đều là Array hoặc Object có chứa 'queryKey', thì đó là mảng các target
    // Ví dụ: [ ['teachers'], ['classes'] ] hoặc [ { queryKey: ['teachers'] } ]
    const isArrayOfTargets = targets.every(
      (item) => Array.isArray(item) || (typeof item === "object" && item !== null && "queryKey" in item)
    );

    if (isArrayOfTargets) {
      return targets.map((item) => {
        if (Array.isArray(item)) {
          return { filters: { queryKey: item as QueryKey }, options: baseOptions };
        }
        return { filters: item as InvalidateQueryFilters, options: baseOptions };
      });
    }

    // Trường hợp là 1 QueryKey đơn lẻ dạng mảng: ['teachers'] hoặc ['teachers', 1]
    return [{ filters: { queryKey: targets as QueryKey }, options: baseOptions }];
  }

  // Trường hợp là 1 InvalidateQueryFilters object: { queryKey: ['teachers'], exact: true }
  if (typeof targets === "object" && targets !== null && "queryKey" in targets) {
    return [{ filters: targets as InvalidateQueryFilters, options: baseOptions }];
  }

  return [];
}

/**
 * Hook `useMutationApp` - Tối ưu hóa tác vụ Mutation cho ứng dụng với TanStack Query v5 & `@openway/ui`.
 *
 * Tính năng chính:
 * - **Tự động hóa Toast**: Hiển thị Toast loading khi xử lý, tự động cập nhật Toast success/error mượt mà.
 * - **Tự động bóc tách lỗi**: Bóc tách thông điệp lỗi chính xác từ Axios / API response qua `extractErrorMessage`.
 * - **Tự động Invalidate Cache**: Refresh tự động các query liên quan (như DataTable, Select) khi hoàn tất.
 * - **Bổ sung `isLoading`**: Cung cấp alias `isLoading` cho `isPending`, thuận tiện khi code giao diện.
 * - **Giữ trọn vẹn sức mạnh của TanStack Query**: Hỗ trợ đầy đủ `onMutate`, `onSuccess`, `onError`, `onSettled`.
 */
export function useMutationApp<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationAppOptions<TData, TError, TVariables, TContext>
): UseMutationAppReturn<TData, TError, TVariables, TContext> {
  const mutationLocale = useLocale("mutation");
  const queryClient = useQueryClient();
  const activeToastIdsRef = useRef<Array<string | number>>([]);

  const {
    mutationFn,
    invalidateQueries,
    invalidateOptions,
    toast: toastConfig = true,
    successMessage,
    errorMessage,
    loadingMessage,
    onMutate: userOnMutate,
    onSuccess: userOnSuccess,
    onError: userOnError,
    onSettled: userOnSettled,
    ...mutationOptions
  } = options;

  // Hợp nhất cấu hình toast từ object `toast` và các shortcut message
  const isToastEnabled = toastConfig !== false;
  const toastDetails: UseMutationAppToastOptions<TData, TError, TVariables> =
    typeof toastConfig === "object" && toastConfig !== null ? { ...toastConfig } : {};

  const effectiveLoading = loadingMessage ?? toastDetails.loading;
  const effectiveSuccess = successMessage ?? toastDetails.success;
  const effectiveError = errorMessage ?? toastDetails.error ?? true;
  const effectiveVariant = toastDetails.variant ?? "soft";
  const customToastOptions = toastDetails.options;

  const mutation = useMutation<TData, TError, TVariables, TContext>({
    ...mutationOptions,
    mutationFn,

    onMutate: async (variables, mutationContext) => {
      let toastId: string | number | undefined;

      if (isToastEnabled && effectiveLoading) {
        const loadingTitle =
          typeof effectiveLoading === "function"
            ? effectiveLoading(variables)
            : effectiveLoading;

        const loadingDesc =
          typeof toastDetails.loadingDescription === "function"
            ? toastDetails.loadingDescription(variables)
            : toastDetails.loadingDescription;

        toastId = toast.loading(loadingTitle, loadingDesc, {
          ...customToastOptions,
          variant: effectiveVariant,
        });

        activeToastIdsRef.current.push(toastId);
      }

      try {
        if (userOnMutate) {
          return await userOnMutate(variables, mutationContext);
        }
      } catch (err) {
        if (toastId) {
          toast.dismiss(toastId);
          activeToastIdsRef.current = activeToastIdsRef.current.filter((id) => id !== toastId);
        }
        throw err;
      }

      return undefined as TContext;
    },

    onSuccess: async (data, variables, context, mutationContext) => {
      const toastId = activeToastIdsRef.current.shift();

      // Đóng toast loading nếu có
      if (toastId) {
        toast.dismiss(toastId);
      }

      // Hiển thị toast thành công nếu có cấu hình
      if (isToastEnabled && effectiveSuccess) {
        const successTitle =
          typeof effectiveSuccess === "function"
            ? effectiveSuccess(data, variables)
            : effectiveSuccess;

        const successDesc =
          typeof toastDetails.successDescription === "function"
            ? toastDetails.successDescription(data, variables)
            : toastDetails.successDescription;

        toast.success(successTitle, successDesc, {
          ...customToastOptions,
          variant: effectiveVariant,
        });
      }

      // Tự động invalidate các query được chỉ định
      if (invalidateQueries) {
        const resolvedTargets =
          typeof invalidateQueries === "function"
            ? invalidateQueries(data, variables)
            : invalidateQueries;

        const normalized = normalizeInvalidateTargets(resolvedTargets, invalidateOptions);
        if (normalized.length > 0) {
          await Promise.all(
            normalized.map(({ filters, options: opts }) =>
              queryClient.invalidateQueries(filters, opts)
            )
          );
        }
      }

      // Thực thi callback onSuccess của người dùng
      if (userOnSuccess) {
        await userOnSuccess(data, variables, context, mutationContext);
      }
    },

    onError: async (error, variables, context, mutationContext) => {
      const toastId = activeToastIdsRef.current.shift();

      // Đóng toast loading nếu có
      if (toastId) {
        toast.dismiss(toastId);
      }

      // Hiển thị toast lỗi nếu được bật
      if (isToastEnabled && effectiveError !== false) {
        let errorTitle: ReactNode;

        if (typeof effectiveError === "function") {
          errorTitle = effectiveError(error, variables);
        } else if (effectiveError === true) {
          errorTitle = mutationLocale.errorTitle;
        } else {
          errorTitle = effectiveError;
        }

        const customErrorDesc =
          typeof toastDetails.errorDescription === "function"
            ? toastDetails.errorDescription(error, variables)
            : toastDetails.errorDescription;

        // Details (description): ưu tiên cấu hình riêng, nếu không có thì tự động bóc tách từ API
        const errorDesc =
          customErrorDesc !== undefined
            ? (customErrorDesc || undefined)
            : extractErrorMessage(error, undefined, mutationLocale);

        toast.error(errorTitle, errorDesc, {
          ...customToastOptions,
          variant: effectiveVariant,
        });
      }

      // Thực thi callback onError của người dùng
      if (userOnError) {
        await userOnError(error, variables, context, mutationContext);
      }
    },

    onSettled: async (data, error, variables, context, mutationContext) => {
      if (userOnSettled) {
        await userOnSettled(data, error, variables, context, mutationContext);
      }
    },
  });

  return {
    ...mutation,
    isLoading: mutation.isPending,
  };
}
