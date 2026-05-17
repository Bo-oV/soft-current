import { orderSteps } from '../../data/orderSteps'
import './HowToOrder.scss'

function HowToOrder() {
  return (
    <section className="how-to-order section" id="how-to-order">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">How to order</span>
          <h2>Як замовити</h2>
          <p>Базова структура для чотирьох кроків оформлення замовлення.</p>
        </div>

        <div className="how-to-order__list">
          {orderSteps.map((step) => (
            <article className="how-to-order__item" key={step.id}>
              <div className="how-to-order__icon">{step.id}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowToOrder
