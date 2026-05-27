import { orderSteps } from "../../data/orderSteps";
import "./HowToOrder.scss";

function HowToOrder() {
  return (
    <section className="how-to-order section" id="how-to-order">
      <div className="container how-to-order__container">
        <div className="how-to-order__header">
          <h2 className="how-to-order__title">Як замовити</h2>
          <img
            className="how-to-order__decor"
            src="/images/h1_bottom.svg"
            alt=""
            aria-hidden="true"
          />
        </div>

        <ol className="how-to-order__list">
          {orderSteps.map((step) => (
            <li
              className={`how-to-order__item how-to-order__item--${step.id}`}
              key={step.id}
            >
              <div className="how-to-order__icon-wrap">
                <img
                  className="how-to-order__icon"
                  src={step.icon}
                  alt=""
                  aria-hidden="true"
                />
              </div>

              <div className="how-to-order__content">
                <h3 className="how-to-order__item-title">{step.title}</h3>
                <p className="how-to-order__item-text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowToOrder;
