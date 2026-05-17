function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-card__image">Фото</div>
      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__price">{product.price}</p>
      </div>
    </article>
  )
}

export default ProductCard
