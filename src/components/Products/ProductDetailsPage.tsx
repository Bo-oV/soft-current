import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";
import "./ProductDetailsPage.scss";

type ProductDetailsPageProps = {
  product: Product;
  products?: Product[];
  favoriteProductIds?: string[];
  onBack: () => void;
  onCartAdd?: (product: Product) => void;
  onFavoriteToggle?: (productId: string) => void;
  onProductSelect?: (product: Product) => void;
};

function ProductDetailsPage({
  product,
  products = [],
  favoriteProductIds = [],
  onBack,
  onCartAdd,
  onFavoriteToggle,
  onProductSelect,
}: ProductDetailsPageProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onBack();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onBack]);

  if (!product) {
    return null;
  }

  const otherProducts = products.filter((item) => item.id !== product.id);

  return (
    <section
      className="product-details-page"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-details-title"
    >
      <button
        className="product-details-page__back"
        type="button"
        onClick={onBack}
      >
        <ArrowLeft size={22} strokeWidth={1.5} aria-hidden="true" />
        <span>Назад</span>
      </button>

      <ProductDetails
        product={product}
        variant="mobile"
        onCartAdd={onCartAdd}
        key={product.id}
      />

      {otherProducts.length > 0 && (
        <div className="product-details-page__others">
          <h3 className="product-details-page__others-title">Інші товари</h3>
          <div className="product-details-page__grid">
            {otherProducts.map((item) => (
              <ProductCard
                product={item}
                isFavorite={favoriteProductIds.includes(item.id)}
                onFavoriteToggle={onFavoriteToggle}
                onCartAdd={onCartAdd}
                onOpen={onProductSelect}
                key={item.id}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetailsPage;
