import type { OtpType } from "@/types/otp";

export interface OtpModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
  onResend?: () => void;
  numInputs?: number;
  title?: string;
  phone?: string;
  otpType?: OtpType | string;
  isLoading?: boolean;
  initialCountdownSeconds?: number;
  submitText?: string;
  errorDigitsText?: string;
  phonePromptText?: string;
  closeAriaLabel?: string;
}

export interface ResendCountdownProps {
  onResend: () => void;
  initialSeconds?: number;
  resendInText?: string;
  dontReceiveText?: string;
  resendText?: string;
}
