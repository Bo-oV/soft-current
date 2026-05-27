import { useEffect } from "react";
import { X } from "lucide-react";
import useMediaQuery from "../../hooks/useMediaQuery";
import "./CartAddedModal.scss";

const CART_CAT_IMAGE = "/images/cart/cart-cat.svg";

type CartAddedModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCheckout?: () => void;
};

function CartAddedModal({
  isOpen,
  onClose,
  onCheckout,
}: CartAddedModalProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");

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

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
      return;
    }

    console.log("Go to checkout");
    onClose();
  };

  if (isMobile) {
    return (
      <section
        className="cart-added-screen"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-added-screen-title"
      >
        <div className="cart-added-screen__header">
          <button
            className="cart-added-screen__close"
            type="button"
            aria-label="Закрити"
            onClick={onClose}
          >
            <X size={24} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <h2 className="cart-added-screen__title" id="cart-added-screen-title">
          Ваше замовлення додано в кошик
        </h2>

        <img
          className="cart-added-screen__image"
          src={CART_CAT_IMAGE}
          alt=""
          aria-hidden="true"
        />

        <div className="cart-added-screen__actions">
          <button
            className="cart-added-screen__checkout"
            type="button"
            onClick={handleCheckout}
          >
            Оформити замовлення
          </button>
          <button
            className="cart-added-screen__continue"
            type="button"
            onClick={onClose}
          >
            Продовжити покупки
          </button>
        </div>
      </section>
    );
  }

  return (
    <div
      className="cart-added-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="cart-added-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-added-modal-title"
      >
        <button
          className="cart-added-modal__close"
          type="button"
          aria-label="Закрити"
          onClick={onClose}
        >
          <X size={22} strokeWidth={1.5} aria-hidden="true" />
        </button>

        <h2 className="cart-added-modal__title" id="cart-added-modal-title">
          Ваше замовлення додано в кошик
        </h2>

        <img
          className="cart-added-modal__image"
          src={CART_CAT_IMAGE}
          alt=""
          aria-hidden="true"
        />

        <div className="cart-added-modal__actions">
          <button
            className="cart-added-modal__continue"
            type="button"
            onClick={onClose}
          >
            Продовжити покупки
          </button>
          <button
            className="cart-added-modal__checkout"
            type="button"
            onClick={handleCheckout}
          >
            Оформити замовлення
          </button>
        </div>
      </section>
    </div>
  );
}

export default CartAddedModal;
