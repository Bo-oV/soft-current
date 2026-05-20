import { Heart } from 'lucide-react'

function ProductCard({ product }) {
  const image = product.mainImage || product.gallery?.[0] || '/images/products/cardigan-blue.png'
  const price = `${product.price} ${product.currency}`
  const oldPrice = product.oldPrice ? `${product.oldPrice} ${product.currency}` : ''

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img
          className="product-card__image"
          src={image}
          alt={product.title}
        />
        <button className="product-card__favorite" type="button" aria-label="Додати в обране">
          <Heart size={16} strokeWidth={1.5} />
        </button>
        <div className="product-card__dots" aria-hidden="true">
          <span className="product-card__dot product-card__dot--active" />
          <span className="product-card__dot" />
          <span className="product-card__dot" />
        </div>
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
          <button className="product-card__button" type="button">
            {product.buttonText}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
