import Button from '../UI/Button/Button'
import './CustomOrder.scss'

function CustomOrder() {
  return (
    <section className="custom-order section" id="custom-order">
      <div className="container custom-order__container">
        <div className="custom-order__image">Фото процесу</div>
        <div className="custom-order__content">
          <span className="section__eyebrow">Individual order</span>
          <h2>Індивідуальне замовлення</h2>
          <p>
            Простір для блоку про персональні вироби: розміри, кольори, пряжа,
            терміни та особливі побажання клієнта.
          </p>
          <Button>Обговорити виріб</Button>
        </div>
      </div>
    </section>
  )
}

export default CustomOrder
