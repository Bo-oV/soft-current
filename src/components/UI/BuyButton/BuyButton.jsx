import "./BuyButton.scss";

function BuyButton({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  onClick,
  onKeyDown,
}) {
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
