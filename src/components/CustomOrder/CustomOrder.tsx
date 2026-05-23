import Button from "../UI/Button/Button";
import "./CustomOrder.scss";

function CustomOrder() {
  const handleCustomOrderClick = () => {
    // TODO: open custom order checkout flow
  };

  return (
    <section className="custom-order section" id="custom-order">
      <div className="container custom-order__container">
        <div className="custom-order__media">
          <img
            className="custom-order__image"
            src="/images/custom-order/custom-order.jpg"
            alt="Процес створення в’язаного виробу"
          />
        </div>

        <div className="custom-order__content-wrap">
          <img
            className="custom-order__decor custom-order__decor--leaf"
            src="/images/custom-order/leaf.svg"
            alt=""
            aria-hidden="true"
          />

          <div className="custom-order__content">
            <p className="custom-order__eyebrow">Товар саме для вас</p>
            <h2 className="custom-order__title">
              Індивідуальне замовлення
            </h2>
            <p className="custom-order__text">
              Хочете річ у вашому улюбленому кольорі чи під ваші параметри?
              Я створю виріб спеціально для вас з урахуванням усіх побажань:
              моделі, розміру, пряжі, довжини та деталей.
            </p>
            <Button
              className="custom-order__button"
              type="button"
              onClick={handleCustomOrderClick}
            >
              Замовити індивідуально
            </Button>
          </div>

          <img
            className="custom-order__decor custom-order__decor--flower"
            src="/images/custom-order/flower-line.svg"
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

export default CustomOrder;
