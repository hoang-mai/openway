"use client";

import React, { useEffect, useState } from "react";
import type { ResendCountdownProps } from "./types";

export default function ResendCountdown({
  onResend,
  initialSeconds = 60,
  resendInText = "Resend OTP in ",
  dontReceiveText = "Don't receive OTP?",
  resendText = "Resend OTP",
}: ResendCountdownProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  const isRunning = seconds > 0;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleResend = () => {
    setSeconds(initialSeconds);
    onResend();
  };

  return (
    <div className="mt-4 text-center text-sm text-neutral-600">
      {seconds > 0 ? (
        <>
          {resendInText}
          <span className="font-semibold">{seconds}s</span>
        </>
      ) : (
        <div>
          <span>{dontReceiveText}</span>
          <button
            type="button"
            onClick={handleResend}
            className="text-primary-700 hover:underline cursor-pointer ml-1"
          >
            {resendText}
          </button>
        </div>
      )}
    </div>
  );
}
