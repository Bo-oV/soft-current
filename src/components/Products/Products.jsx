import { products } from '../../data/products'
import Button from '../UI/Button/Button'
import SectionTitle from '../UI/SectionTitle/SectionTitle'
import ProductCard from './ProductCard'
import './Products.scss'

function Products() {
  return (
    <section className="products section" id="products">
      <div className="container">
        <SectionTitle className="products__title">
          Популярні вироби
        </SectionTitle>

        <div className="products__grid">
          {products.map((product) => (
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
