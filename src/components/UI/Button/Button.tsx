import type { MouseEventHandler, ReactNode } from "react";
import "./Button.scss";

type ButtonProps = {
  variant?: "primary" | "secondary";
  children: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  className?: string;
};

function Button({
  variant = "primary",
  children,
  disabled = false,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const buttonClassName = ["button", `button--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClassName}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
