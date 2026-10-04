import { createContext, useContext } from "react";
import { ConfirmColor, ConfirmSize } from "./types";

/**
 * Giá trị được chia sẻ từ `<ConfirmContainer>` và `<Confirm>` xuống các sub-component con thông qua Context
 */
export interface ConfirmContextValue {
  /**
   * Callback kích hoạt đóng Confirm kèm hiệu ứng thoát (Exit Animation)
   */
  onClose: () => void;

  /**
   * Trạng thái đang tải / xử lý (Loading).
   * Khi `true`, sẽ chặn đóng hộp thoại và tự động vô hiệu hóa các nút đóng / hủy.
   */
  isLoading?: boolean;

  /**
   * Kích thước chiều rộng của Confirm
   */
  size?: ConfirmSize;

  /**
   * Chủ đề màu sắc của Confirm
   */
  color?: ConfirmColor;
}

/**
 * Context React phục vụ cơ chế liên kết Pure Compound của bộ component Confirm
 */
export const ConfirmContext = createContext<ConfirmContextValue | null>(null);

/**
 * Hook truy xuất context của Confirm từ bên trong `<ConfirmContainer>` hoặc `<Confirm>`
 */
export const useConfirmContext = () => useContext(ConfirmContext);
