import { useEffect } from "react";
import { X } from "lucide-react";
import CartCheckoutContent from "./CartCheckoutContent";
import "./CartScreen.scss";

type CartScreenProps = {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess?: () => void;
};

function CartScreen({ isOpen, onClose, onOrderSuccess }: CartScreenProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
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
        <CartCheckoutContent
          onClose={onClose}
          onOrderSuccess={onOrderSuccess}
        />
      </div>
    </section>
  );
}

export default CartScreen;
