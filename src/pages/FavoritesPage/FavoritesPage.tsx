import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { products } from "../../data/products";
import { useFavorites } from "../../context/useFavorites";
import type { Product } from "../../types/product";
import CartAddedModal from "../../components/Cart/CartAddedModal";
import ProductCard from "../../components/Products/ProductCard";
import ProductDetailsPage from "../../components/Products/ProductDetailsPage";
import "./FavoritesPage.scss";

type FavoritesPageProps = {
  isOpen: boolean;
  onClose: () => void;
  onCartOpen?: () => void;
};

function FavoritesPage({ isOpen, onClose, onCartOpen }: FavoritesPageProps) {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartAddedOpen, setIsCartAddedOpen] = useState(false);
  const favoriteProducts = useMemo(
    () => products.filter((product) => favoriteIds.includes(product.id)),
    [favoriteIds],
  );

  if (!isOpen) {
    return null;
  }

  const handleProductsClick = () => {
    onClose();
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCartAdd = () => {
    setSelectedProduct(null);
    setIsCartAddedOpen(true);
  };

  return (
    <section className="favorites-page" aria-labelledby="favorites-page-title">
      <header className="favorites-page__header">
        <button
          className="favorites-page__close"
          type="button"
          aria-label="Закрити"
          onClick={onClose}
        >
          <X size={24} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </header>

      <div className="favorites-page__body">
        <h2 className="favorites-page__title" id="favorites-page-title">
          Обрані товари
        </h2>

        {favoriteProducts.length > 0 ? (
          <div className="favorites-page__grid">
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
          <div className="favorites-page__empty">
            <p>У вас поки немає обраних товарів</p>
            <button
              className="favorites-page__empty-button"
              type="button"
              onClick={handleProductsClick}
            >
              Перейти до товарів
            </button>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailsPage
          product={selectedProduct}
          products={favoriteProducts}
          favoriteProductIds={favoriteIds}
          onBack={() => setSelectedProduct(null)}
          onCartAdd={handleCartAdd}
          onFavoriteToggle={toggleFavorite}
          onProductSelect={setSelectedProduct}
        />
      )}

      <CartAddedModal
        isOpen={isCartAddedOpen}
        onClose={() => setIsCartAddedOpen(false)}
        onCheckout={() => {
          setIsCartAddedOpen(false);
          onClose();
          onCartOpen?.();
        }}
      />
    </section>
  );
}

export default FavoritesPage;
