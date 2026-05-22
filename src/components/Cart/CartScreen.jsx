import { useEffect } from "react";
import { X } from "lucide-react";
import CartCheckoutContent from "./CartCheckoutContent";
import "./CartScreen.scss";

function CartScreen({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <section
      className="cart-screen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
    >
      <div className="cart-screen__header">
        <button
          className="cart-screen__close"
          type="button"
          aria-label="Закрити"
          onClick={onClose}
        >
          <X size={24} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <div className="cart-screen__body">
        <CartCheckoutContent onClose={onClose} />
      </div>
    </section>
  );
}

export default CartScreen;
