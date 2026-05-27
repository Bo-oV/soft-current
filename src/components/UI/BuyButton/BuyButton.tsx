import type { KeyboardEventHandler, MouseEventHandler, ReactNode } from "react";
import "./BuyButton.scss";

type BuyButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "text";
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
};

function BuyButton({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  onClick,
  onKeyDown,
}: BuyButtonProps) {
  const buttonClassName = ["buy-button", `buy-button--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClassName}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  );
}

export default BuyButton;
