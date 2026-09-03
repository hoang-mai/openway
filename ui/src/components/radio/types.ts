import { InputHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";

export type RadioSize = "xs" | "sm" | "md" | "lg" | "xl";
export type RadioVariant = "filled" | "outline" | "soft" | "other";
export type RadioColor = "primary" | "secondary" | "error" | "success" | "warning" | "info" | "neutral";
export type RadioLabelPlacement = "right" | "left";
export type RadioGroupOrientation = "horizontal" | "vertical";

/**
 * Cau hinh tap trung cac co trang thai / tinh nang cua Radio
 */
export interface RadioConfig {
  /**
   * Danh dau bat buoc
   * @default false
   */
  isRequired?: boolean;

  /**
   * Trang thai bao loi (vien do)
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Trang thai dang tai (hien thi spinner va vo hieu hoa tuong tac)
   * @default false
   */
  isLoading?: boolean;
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /**
   * Cau hinh tap trung cac co trang thai / tinh nang
   */
  config?: RadioConfig;

  /**
   * Ref chuyen tiep den phan tu HTML input (React 19)
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Kich co cua radio button:
   * - 'xs': box 14px, dot 6px, text 12px
   * - 'sm': box 16px, dot 8px, text 14px
   * - 'md': box 20px, dot 10px, text 14px (mac dinh)
   * - 'lg': box 24px, dot 12px, text 16px
   * - 'xl': box 28px, dot 14px, text 18px
   * @default 'md'
   */
  size?: RadioSize;

  /**
   * Bien the giao dien cua radio khi checked:
   * - 'filled': nen mau dac tuong phan cao (mac dinh)
   * - 'outline': nen trang / trong suot, vien va dot mang mau chu de
   * - 'soft': nen pastel diu nhe theo tone mau chu de
   * - 'other': khong ap dung style mac dinh, tu do tuy bien qua className
   * @default 'filled'
   */
  variant?: RadioVariant;

  /**
   * Chu de mau sac (primary, secondary, error, success, warning, info, neutral)
   * @default 'primary'
   */
  color?: RadioColor;



  /**
   * Nhan van ban hien thi canh o radio
   */
  label?: ReactNode;

  /**
   * Doan van ban huong dan/chu thich ben duoi
   */
  helperText?: ReactNode;

  /**
   * Thong bao loi hien thi ben duoi (khi co errorMessage se tu kich hoat isInvalid)
   */
  errorMessage?: ReactNode;

  /**
   * Vi tri dat nhan so voi o radio:
   * - 'right': O radio ben trai, nhan ben phai (mac dinh)
   * - 'left': Nhan ben trai, o radio ben phai
   * @default 'right'
   */
  labelPlacement?: RadioLabelPlacement;

  /**
   * Icon tuy chinh thay the cho diem tron ben trong khi checked
   */
  dotIcon?: ReactNode;

  /**
   * Tuy bien className cho container boc toan bo (label, radio, error/helper text)
   */
  wrapperClassName?: string;

  /**
   * Tuy bien className cho rieng o radio hinh tron
   */
  boxClassName?: string;

  /**
   * Tuy bien className cho phan tu van ban label
   */
  labelClassName?: string;

  /**
   * Tuy bien className cho helperText hoac errorMessage
   */
  helperClassName?: string;
}

export type RadioSearchMode = "client" | "server";

export interface RadioOptionItem<TData = unknown> {
  /**
   * Gia tri dinh danh duy nhat cua radio option
   */
  value: string;

  /**
   * Nhan van ban hoac node hien thi
   */
  label?: ReactNode;

  /**
   * Doan van ban huong dan/chu thich ben duoi
   */
  description?: ReactNode;

  /**
   * Vo hieu hoa rieng cho option nay
   */
  disabled?: boolean;

  /**
   * Che do chi doc rieng cho option nay
   */
  isReadOnly?: boolean;

  /**
   * Du lieu goc tuy chinh gan kem
   */
  data?: TData;

  /**
   * Ho tro cac truong tuy y khac de phuc vu loc theo searchField
   */
  [key: string]: unknown;
}

/**
 * Cau hinh tap trung cac co trang thai / tinh nang cua RadioGroup
 */
export interface RadioGroupConfig {
  /**
   * Danh dau bat buoc chon
   * @default false
   */
  isRequired?: boolean;

  /**
   * Trang thai bao loi cua nhom
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Trang thai dang tai cua nhom
   * @default false
   */
  isLoading?: boolean;

  /**
   * Che do chi doc cho nhom
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * Bat o tim kiem cho nhom Radio
   * @default false
   */
  searchable?: boolean;

  /**
   * Trang thai dang tai tim kiem (Server mode)
   * @default false
   */
  isSearching?: boolean;

  /**
   * Tu dong bao luu va hien thi muc da chon khi loc tim kiem
   * @default true
   */
  preserveSelected?: boolean;
}

export interface RadioGroupProps<TData = unknown>
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "children"> {
  /**
   * Cau hinh tap trung cac co trang thai / tinh nang
   */
  config?: RadioGroupConfig;

  /**
   * Ref chuyen tiep den container the div cua nhom (React 19)
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Danh sach cac option cua radio group (Data-driven pattern)
   */
  options?: RadioOptionItem<TData>[];

  /**
   * Gia tri dang duoc chon (Controlled mode) - string don hoac null de bo chon
   */
  value?: string | null;

  /**
   * Gia tri mac dinh ban dau (Uncontrolled mode)
   */
  defaultValue?: string | null;

  /**
   * Callback kich hoat khi radio duoc chon thay doi
   */
  onChange?: (value: string | null) => void;



  /**
   * Placeholder cho o input tim kiem
   */
  searchPlaceholder?: string;

  /**
   * Gia tri tim kiem hien tai (Controlled search)
   */
  searchValue?: string;

  /**
   * Callback khi gia tri tim kiem thay doi
   */
  onSearchChange?: (val: string) => void;

  /**
   * Che do tim kiem:
   * - 'client': Loc danh sach bang fuzzy matching qua match-sorter-utils (mac dinh)
   * - 'server': Goi API tim kiem bat dong bo qua onSearch
   * @default 'client'
   */
  searchMode?: RadioSearchMode;

  /**
   * Cac truong du lieu can loc (trong che do client search).
   * Co the la 1 key hoac mang cac keys (vd: ['label', 'description', 'code'])
   * @default 'label'
   */
  searchField?: string | string[];

  /**
   * Custom filter function cho che do client search
   */
  filterFn?: (item: RadioOptionItem<TData>, query: string) => boolean;

  /**
   * Callback tim kiem bat dong bo cho server search mode
   */
  onSearch?: (query: string) => Promise<RadioOptionItem<TData>[]>;
 
  /**
   * Thoi gian debounce khi nguoi dung nhap tu khoa tim kiem (ms)
   * @default 300
   */
  debounceMs?: number;

  /**
   * Thong bao hien thi khi khong tim thay ket qua
   * @default 'Khong tim thay ket qua'
   */
  emptyText?: ReactNode;

  /**
   * Tuy bien className cho khung chua o tim kiem
   */
  searchClassName?: string;



  /**
   * Kich thuoc o input tim kiem
   */
  searchInputSize?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Kich co ap dung chung cho tat ca cac radio con
   * @default 'md'
   */
  size?: RadioSize;

  /**
   * Mau sac ap dung chung cho tat ca cac radio con
   * @default 'primary'
   */
  color?: RadioColor;

  /**
   * Bien the ap dung chung cho tat ca cac radio con
   * @default 'filled'
   */
  variant?: RadioVariant;

  /**
   * Vo hieu hoa toan bo cac radio trong nhom
   * @default false
   */
  disabled?: boolean;


  /**
   * Tieu de / Nhan chung cho ca nhom radio
   */
  label?: ReactNode;

  /**
   * Huong sap xep cac radio:
   * - 'vertical': Sap xep theo chieu doc (mac dinh)
   * - 'horizontal': Sap xep theo chieu ngang
   * @default 'vertical'
   */
  orientation?: RadioGroupOrientation;

  /**
   * Vi tri dat nhan cua cac radio con trong nhom
   * @default 'right'
   */
  labelPlacement?: RadioLabelPlacement;

  /**
   * Doan van ban huong dan/chu thich cho nhom
   */
  helperText?: ReactNode;

  /**
   * Thong bao loi hien thi cho ca nhom (se tu dong kich hoat isInvalid)
   */
  errorMessage?: ReactNode;

  /**
   * Tuy bien className cho container boc ngoai cung cua nhom
   */
  wrapperClassName?: string;

  /**
   * Tuy bien className cho tieu de nhan cua nhom
   */
  labelClassName?: string;

  /**
   * Tuy bien className cho helperText hoac errorMessage cua nhom
   */
  helperClassName?: string;
}
