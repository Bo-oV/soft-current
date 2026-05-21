import { useEffect } from "react";
import { X } from "lucide-react";
import ProductDetails from "./ProductDetails";
import "./ProductModal.scss";

function ProductModal({ product, onClose }) {
  useEffect(() => {
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
  }, [onClose]);

  if (!product) {
    return null;
  }

  return (
    <div
      className="product-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="product-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-details-title"
      >
        <button
          className="product-modal__close"
          type="button"
          aria-label="Закрити"
          onClick={onClose}
        >
          <X size={24} strokeWidth={1.5} aria-hidden="true" />
        </button>

        <ProductDetails product={product} variant="modal" />
      </section>
    </div>
  );
}

export default ProductModal;
