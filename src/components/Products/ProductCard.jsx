import { useMemo, useState } from "react";
import { Heart } from "lucide-react";
import BuyButton from "../UI/BuyButton/BuyButton";

function ProductCard({ product, isFavorite = false, onFavoriteToggle }) {
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
  const favoriteButtonClassName = [
    "product-card__favorite",
    isFavorite ? "product-card__favorite--active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleFavoriteClick = () => {
    onFavoriteToggle?.(product.id);
  };

  return (
    <article className="product-card">
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
          onClick={handleFavoriteClick}
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
                onClick={() => setActiveImageIndex(index)}
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
          <BuyButton className="product-card__button">
            {product.buttonText}
          </BuyButton>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
