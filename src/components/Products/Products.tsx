import { useState } from 'react'
import { products } from '../../data/products'
import useMediaQuery from '../../hooks/useMediaQuery'
import CartAddedModal from '../Cart/CartAddedModal'
import SectionTitle from '../UI/SectionTitle/SectionTitle'
import ViewAllButton from '../UI/ViewAllButton/ViewAllButton'
import ProductCard from './ProductCard'
import ProductDetailsPage from './ProductDetailsPage'
import ProductModal from './ProductModal'
import type { Product } from '../../types/product'
import './Products.scss'

type ProductsProps = {
  favoriteProductIds?: string[]
  onCartOpen?: () => void
  onFavoriteToggle?: (productId: string) => void
}

function Products({
  favoriteProductIds = [],
  onCartOpen,
  onFavoriteToggle,
}: ProductsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCartAddedOpen, setIsCartAddedOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 767px)')
  const availableProducts = products.filter((product) => product.available)
  const popularProducts = availableProducts.filter((product) => product.popular)
  const visibleProducts = isExpanded
    ? availableProducts
    : popularProducts.length > 0
      ? popularProducts
      : availableProducts

  const handleCartAdd = () => {
    setSelectedProduct(null)
    setIsCartAddedOpen(true)
  }

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
              onCartAdd={handleCartAdd}
              onOpen={setSelectedProduct}
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

      {selectedProduct && isMobile && (
        <ProductDetailsPage
          product={selectedProduct}
          products={availableProducts}
          favoriteProductIds={favoriteProductIds}
          onBack={() => setSelectedProduct(null)}
          onCartAdd={handleCartAdd}
          onFavoriteToggle={onFavoriteToggle}
          onProductSelect={setSelectedProduct}
        />
      )}

      {selectedProduct && !isMobile && (
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
          setIsCartAddedOpen(false)
          onCartOpen?.()
        }}
      />
    </section>
  )
}

export default Products
