import type { KeyboardEvent, MouseEvent } from "react";
import { useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { useCart } from "../../context/useCart";
import type { Product } from "../../types/product";
import BuyButton from "../UI/BuyButton/BuyButton";

type ProductCardProps = {
  product: Product;
  isFavorite?: boolean;
  onFavoriteToggle?: (productId: string) => void;
  onOpen?: (product: Product) => void;
  onCartAdd?: (product: Product) => void;
};

function ProductCard({
  product,
  isFavorite = false,
  onFavoriteToggle,
  onOpen,
  onCartAdd,
}: ProductCardProps) {
  const { addToCart, isInCart, removeFromCart } = useCart();
  const images = useMemo(() => {
    const galleryImages = (product.gallery || [])
      .map((galleryItem) =>
        typeof galleryItem === "string" ? galleryItem : galleryItem?.image,
      )
      .filter(Boolean);

    return [product.mainImage, ...galleryImages].filter(Boolean);
  }, [product.gallery, product.mainImage]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = images[activeImageIndex] || images[0];
  const currency = product.currency || "грн";
  const price = `${product.price} ${currency}`;
  const oldPrice = product.oldPrice
    ? `${product.oldPrice} ${currency}`
    : "";
  const productIsInCart = isInCart(product.id);
  const cartButtonText = productIsInCart
    ? "Відмінити"
    : product.buttonText || "Купити";
  const favoriteButtonClassName = [
    "product-card__favorite",
    isFavorite ? "product-card__favorite--active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleFavoriteClick = () => {
    onFavoriteToggle?.(product.id);
  };

  const handleOpen = () => {
    onOpen?.(product);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpen();
    }
  };

  const stopCardKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.stopPropagation();
    }
  };

  const handleCartClick = () => {
    if (productIsInCart) {
      removeFromCart(product.id);
      return;
    }

    addToCart(product);
    onCartAdd?.(product);
  };

  return (
    <article
      className="product-card"
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
    >
      <div className="product-card__media">
        {activeImage ? (
          <img
            className="product-card__image"
            src={activeImage}
            alt={product.title}
          />
        ) : (
          <div className="product-card__image-placeholder">Фото товару</div>
        )}
        <button
          className={favoriteButtonClassName}
          type="button"
          aria-label={isFavorite ? "Прибрати з обраного" : "Додати в обране"}
          aria-pressed={isFavorite}
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            handleFavoriteClick();
          }}
          onKeyDown={stopCardKeyDown}
        >
          <Heart
            size={16}
            strokeWidth={1}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
        {images.length > 1 && (
          <div className="product-card__dots" aria-label="Фото товару">
            {images.map((image, index) => (
              <button
                className={`product-card__dot ${
                  activeImageIndex === index ? "product-card__dot--active" : ""
                }`}
                type="button"
                aria-label={`Показати фото ${index + 1}`}
                aria-pressed={activeImageIndex === index}
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  event.stopPropagation();
                  setActiveImageIndex(index);
                }}
                onKeyDown={stopCardKeyDown}
                key={`${image}-dot-${index}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__description">{product.subtitle}</p>

        <div className="product-card__footer">
          <div className="product-card__prices">
            {oldPrice && (
              <span className="product-card__old-price">{oldPrice}</span>
            )}
            <span className="product-card__price">{price}</span>
          </div>
          <BuyButton
            className="product-card__button"
            variant={productIsInCart ? "text" : "primary"}
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              handleCartClick();
            }}
            onKeyDown={stopCardKeyDown}
          >
            {cartButtonText}
          </BuyButton>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
