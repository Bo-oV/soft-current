import { useEffect } from "react";
import { X } from "lucide-react";
import useMediaQuery from "../../hooks/useMediaQuery";
import "./OrderSuccessModal.scss";

const SUCCESS_IMAGE = "/images/order/order-success.svg";

type OrderSuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function OrderSuccessModal({ isOpen, onClose }: OrderSuccessModalProps) {
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

  const content = (
    <>
      <button
        className="order-success__close"
        type="button"
        aria-label="Закрити"
        onClick={onClose}
      >
        <X size={24} strokeWidth={1.5} aria-hidden="true" />
      </button>

      <h2 className="order-success__title" id="order-success-title">
        Ваше замовлення вже в дорозі до майстрині
      </h2>
      <p className="order-success__subtitle">
        Дякуємо, що обрали виріб ручної роботи
      </p>
      <p className="order-success__text">
        Ми отримали вашу заявку та скоро зв'яжемося з вами, щоб уточнити
        деталі замовлення
      </p>
      <img
        className="order-success__image"
        src={SUCCESS_IMAGE}
        alt=""
        aria-hidden="true"
      />
      <button
        className="order-success__button"
        type="button"
        onClick={onClose}
      >
        Повернутися до покупок
      </button>
    </>
  );

  if (isMobile) {
    return (
      <section
        className="order-success order-success--mobile"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-success-title"
      >
        {content}
      </section>
    );
  }

  return (
    <div
      className="order-success order-success__overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="order-success__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-success-title"
      >
        {content}
      </section>
    </div>
  );
}

export default OrderSuccessModal;
