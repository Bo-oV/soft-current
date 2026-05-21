import { useMemo, useState } from "react";
import BuyButton from "../UI/BuyButton/BuyButton";
import "./ProductDetails.scss";

function normalizeGallery(gallery = []) {
  return gallery
    .map((galleryItem) =>
      typeof galleryItem === "string" ? galleryItem : galleryItem?.image,
    )
    .filter(Boolean);
}

function ProductDetails({ product, variant = "modal" }) {
  const images = useMemo(
    () => [product.mainImage, ...normalizeGallery(product.gallery)].filter(Boolean),
    [product.gallery, product.mainImage],
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = images[activeImageIndex] || images[0];
  const currency = product.currency || "грн";
  const price = `${product.price} ${currency}`;
  const oldPrice =
    product.oldPrice && product.oldPrice > product.price
      ? `${product.oldPrice} ${currency}`
      : "";
  const buttonText = product.available === false
    ? "Недоступно"
    : product.buttonText || "Купити";
  const customOrderText =
    product.customOrderText || "Замовити індивідуально";

  return (
    <div className={`product-details product-details--${variant}`}>
      <div className="product-details__gallery">
        <div className="product-details__main-media">
          {activeImage ? (
            <img
              className="product-details__main-image"
              src={activeImage}
              alt={product.title}
            />
          ) : (
            <div className="product-details__placeholder">Фото товару</div>
          )}
        </div>

        {images.length > 1 && (
          <div className="product-details__thumbs" aria-label="Галерея товару">
            {images.map((image, index) => (
              <button
                className={`product-details__thumb ${
                  activeImageIndex === index
                    ? "product-details__thumb--active"
                    : ""
                }`}
                type="button"
                aria-label={`Показати фото товару ${index + 1}`}
                aria-pressed={activeImageIndex === index}
                onClick={() => setActiveImageIndex(index)}
                key={`${image}-${index}`}
              >
                <img src={image} alt="" aria-hidden="true" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="product-details__info">
        <p className="product-details__category">{product.category}</p>
        <h2 className="product-details__title" id="product-details-title">
          {product.title}
        </h2>
        <p className="product-details__subtitle">{product.subtitle}</p>

        <div className="product-details__meta">
          {product.sizes && (
            <div className="product-details__meta-group">
              <p className="product-details__meta-title">Розміри</p>
              <p className="product-details__meta-text">{product.sizes}</p>
            </div>
          )}

          {product.composition && (
            <div className="product-details__meta-group">
              <p className="product-details__meta-title">Склад</p>
              <p className="product-details__meta-text">{product.composition}</p>
            </div>
          )}

          {variant === "mobile" && product.description && (
            <div className="product-details__meta-group">
              <p className="product-details__meta-title">Опис</p>
              <p className="product-details__meta-text">{product.description}</p>
            </div>
          )}
        </div>

        <div className="product-details__purchase">
          <div className="product-details__prices">
            {oldPrice && (
              <p className="product-details__old-price">{oldPrice}</p>
            )}
            <p className="product-details__price">{price}</p>
          </div>

          <BuyButton
            className="product-details__button"
            disabled={product.available === false}
          >
            {buttonText}
          </BuyButton>
        </div>

        {product.customOrderAvailable && (
          <button className="product-details__custom-button" type="button">
            {customOrderText}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
