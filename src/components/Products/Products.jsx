import { products } from '../../data/products'
import Button from '../UI/Button/Button'
import ProductCard from './ProductCard'
import './Products.scss'

function Products() {
  return (
    <section className="products section" id="products">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Popular products</span>
          <h2>Популярні вироби</h2>
          <p>
            Тимчасова сітка товарів для майбутнього каталогу з картками,
            фільтрами або переходом у повну колекцію.
          </p>
        </div>

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
