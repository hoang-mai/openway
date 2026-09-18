import { useState } from "react";
import { PasswordInputProps } from "./types";
import Input from "./Input";
import { EyeIcon, EyeOffIcon } from "@/components/icons/EyeIcon";

export default function PasswordInput({
  defaultVisible = false,
  toggleAriaLabel = "Toggle password visibility",
  onVisibilityChange,
  rightIcon,
  disabled,
  readOnly,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(defaultVisible);

  const toggleVisibility = () => {
    if (disabled || readOnly) return;
    const nextState = !isVisible;
    setIsVisible(nextState);
    onVisibilityChange?.(nextState);
  };

  const toggleButton = (
    <button
      type="button"
      onClick={toggleVisibility}
      disabled={disabled || readOnly}
      aria-label={toggleAriaLabel}
      className="inline-flex items-center justify-center size-full p-0 text-neutral-400 hover:text-neutral-600 active:scale-95 transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-current rounded"
    >
      {isVisible ? <EyeOffIcon className="size-full" /> : <EyeIcon className="size-full" />}
    </button>
  );

  return (
    <Input
      type={isVisible ? "text" : "password"}
      disabled={disabled}
      readOnly={readOnly}
      rightIcon={rightIcon || toggleButton}
      {...props}
    />
  );
}
