import { useState } from 'react'
import productsData from '../../data/products.json'
import SectionTitle from '../UI/SectionTitle/SectionTitle'
import ViewAllButton from '../UI/ViewAllButton/ViewAllButton'
import ProductCard from './ProductCard'
import './Products.scss'

function Products({ favoriteProductIds = [], onFavoriteToggle }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const products = productsData.items ?? []
  const availableProducts = products.filter((product) => product.available)
  const popularProducts = availableProducts.filter((product) => product.popular)
  const visibleProducts = isExpanded
    ? availableProducts
    : popularProducts.length > 0
      ? popularProducts
      : availableProducts

  return (
    <section className="products section" id="products">
      <div className="container">
        <SectionTitle className="products__title">
          Популярні вироби
        </SectionTitle>

        <div className="products__grid">
          {visibleProducts.map((product) => (
            <ProductCard
              product={product}
              isFavorite={favoriteProductIds.includes(product.id)}
              onFavoriteToggle={onFavoriteToggle}
              key={product.id}
            />
          ))}
        </div>

        <div className="products__action">
          <ViewAllButton
            isExpanded={isExpanded}
            onClick={() => setIsExpanded((current) => !current)}
          >
            {isExpanded ? 'Згорнути товари' : 'Переглянути всі товари'}
          </ViewAllButton>
        </div>
      </div>
    </section>
  )
}

export default Products
