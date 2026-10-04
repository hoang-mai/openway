"use client";

import React, { useState } from "react";
import { Button } from "@/lib/button";
import { OtpInput } from "@/lib/input";
import { ModalContainer } from "@/lib/modal";
import CloseIcon from "@/lib/icons/CloseIcon";
import { OtpType } from "@/types/otp";
import ResendCountdown from "./ResendCountdown";
import type { OtpModalProps } from "./types";

export default function OtpModal({
  open,
  onClose,
  onSubmit,
  onResend,
  numInputs = 6,
  title = "OTP Verification",
  phone = "",
  otpType,
  isLoading = false,
  initialCountdownSeconds = 60,
  submitText = "Submit",
  errorDigitsText = "Please enter all digits",
  phonePromptText = "Please enter the OTP sent to",
  closeAriaLabel = "Close",
}: OtpModalProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const [prevOpen, setPrevOpen] = useState(open);
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (!open) {
      setOtp("");
      setError("");
    }
  }

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp);
    if (error && newOtp.length === numInputs) {
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    if (otp.length !== numInputs) {
      setError(errorDigitsText);
      return;
    }
    setError("");
    onSubmit(otp);
  };

  const handleResend = () => {
    setOtp("");
    setError("");
    if (onResend) onResend();
  };

  const canResend =
    Boolean(onResend) &&
    (otpType === undefined || otpType === OtpType.SMS || otpType === OtpType.EMAIL);

  return (
    <ModalContainer
      open={open}
      onClose={onClose}
      isLoading={isLoading}
      closeOnOverlayClick
      closeOnEsc
    >
      <div className="relative z-50 w-full max-w-xl min-h-105 py-12 bg-white rounded-2xl shadow-2xl p-6 flex flex-col justify-center pointer-events-auto">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          aria-label={closeAriaLabel}
          className="absolute top-5 right-5 text-neutral-500 hover:text-neutral-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CloseIcon width={24} height={24} />
        </button>

        <form onSubmit={handleSubmit}>
          <h2 className="text-4xl font-bold text-neutral-900 text-center mb-4">{title}</h2>
          {phone && (
            <p className="text-lg text-neutral-600 text-center mt-1">
              {phonePromptText}
              <span className="font-semibold text-primary-700"> {phone}</span>
            </p>
          )}

          <div className="mt-6 flex justify-center">
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              length={numInputs}
              autoFocus
              size="lg"
            />
          </div>

          {error && <p className="mt-1 text-sm text-center text-error-600">{error}</p>}

          {canResend && (
            <ResendCountdown
              onResend={handleResend}
              initialSeconds={initialCountdownSeconds}
            />
          )}

          <div className="mt-5 flex justify-center">
            <Button
              type="submit"
              isLoading={isLoading}
              showSpinner={isLoading}
              className="px-30 py-3"
            >
              {submitText}
            </Button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}
