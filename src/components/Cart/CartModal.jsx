import { useEffect } from "react";
import { X } from "lucide-react";
import CartCheckoutContent from "./CartCheckoutContent";
import "./CartModal.scss";

function CartModal({ isOpen, onClose }) {
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
    <div
      className="cart-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="cart-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-modal-title"
      >
        <button
          className="cart-modal__close"
          type="button"
          aria-label="Закрити"
          onClick={onClose}
        >
          <X size={24} strokeWidth={1.5} aria-hidden="true" />
        </button>

        <CartCheckoutContent onClose={onClose} />
      </section>
    </div>
  );
}

export default CartModal;
