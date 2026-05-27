import { useCallback, useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { products } from "../../data/products";
import { useFavorites } from "../../context/useFavorites";
import type { Product } from "../../types/product";
import CartAddedModal from "../Cart/CartAddedModal";
import ProductCard from "../Products/ProductCard";
import ProductModal from "../Products/ProductModal";
import "./FavoritesModal.scss";

type FavoritesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCartOpen?: () => void;
};

function FavoritesModal({ isOpen, onClose, onCartOpen }: FavoritesModalProps) {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartAddedOpen, setIsCartAddedOpen] = useState(false);
  const favoriteProducts = useMemo(
    () => products.filter((product) => favoriteIds.includes(product.id)),
    [favoriteIds],
  );
  const handleClose = useCallback(() => {
    setSelectedProduct(null);
    setIsCartAddedOpen(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleProductsClick = () => {
    handleClose();
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCartAdd = () => {
    setSelectedProduct(null);
    setIsCartAddedOpen(true);
  };

  return (
    <>
      <div
        className="favorites-modal__overlay"
        role="presentation"
        onClick={handleClose}
      >
        <div
          className="favorites-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="favorites-modal-title"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="favorites-modal__header">
            <h2 className="favorites-modal__title" id="favorites-modal-title">
              Обрані товари
            </h2>
            <button
              className="favorites-modal__close"
              type="button"
              aria-label="Закрити"
              onClick={handleClose}
            >
              <X size={24} strokeWidth={1} aria-hidden="true" />
            </button>
          </div>

          {favoriteProducts.length > 0 ? (
            <div
              className={`favorites-modal__grid ${
                favoriteProducts.length === 1
                  ? "favorites-modal__grid--single"
                  : ""
              }`}
            >
              {favoriteProducts.map((product) => (
                <ProductCard
                  product={product}
                  isFavorite={isFavorite(product.id)}
                  onFavoriteToggle={toggleFavorite}
                  onCartAdd={handleCartAdd}
                  onOpen={setSelectedProduct}
                  key={product.id}
                />
              ))}
            </div>
          ) : (
            <div className="favorites-modal__empty">
              <p>У вас поки немає обраних товарів</p>
              <button
                className="favorites-modal__empty-button"
                type="button"
                onClick={handleProductsClick}
              >
                Перейти до товарів
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onCartAdd={handleCartAdd}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <CartAddedModal
        isOpen={isCartAddedOpen}
        onClose={() => setIsCartAddedOpen(false)}
        onCheckout={() => {
          setIsCartAddedOpen(false);
          handleClose();
          onCartOpen?.();
        }}
      />
    </>
  );
}

export default FavoritesModal;
