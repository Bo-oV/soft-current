import productsData from '../../data/products.json'
import Button from '../UI/Button/Button'
import SectionTitle from '../UI/SectionTitle/SectionTitle'
import ProductCard from './ProductCard'
import './Products.scss'

function Products() {
  const availableProducts = productsData.items.filter((product) => product.available)
  const popularProducts = availableProducts.filter((product) => product.popular)
  const visibleProducts = popularProducts.length > 0 ? popularProducts : availableProducts

  return (
    <section className="products section" id="products">
      <div className="container">
        <SectionTitle className="products__title">
          Популярні вироби
        </SectionTitle>

        <div className="products__grid">
          {visibleProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>

        <div className="products__action">
          <Button variant="secondary">Переглянути всі товари</Button>
        </div>
      </div>
    </section>
  )
}

export default Products
