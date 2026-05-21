import "./BuyButton.scss";

function BuyButton({ children, type = "button", className = "", onClick }) {
  const buttonClassName = ["buy-button", className].filter(Boolean).join(" ");

  return (
    <button className={buttonClassName} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default BuyButton;
