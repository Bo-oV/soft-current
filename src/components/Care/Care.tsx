import { careItems } from "../../data/careItems";
import "./Care.scss";

function Care() {
  return (
    <section className="care section" id="care">
      <div className="container care__container">
        <div className="care__header">
          <h2 className="care__title">Догляд за виробами</h2>
          <img
            className="care__decor"
            src="/images/h1_bottom.svg"
            alt=""
            aria-hidden="true"
          />
        </div>

        <ul className="care__list">
          {careItems.map((item) => (
            <li className="care__item" key={item.id}>
              <img
                className="care__icon"
                src={item.icon}
                alt=""
                aria-hidden="true"
              />
              <div className="care__content">
                <h3 className="care__item-title">{item.title}</h3>
                <p className="care__item-text">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Care;
