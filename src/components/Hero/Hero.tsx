import Button from "../UI/Button/Button";
import "./Hero.scss";

function Hero() {
  const scrollToProducts = () => {
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero" id="hero">
      <div className="container hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
            В’язано з турботою
            <br />
            створено для вас
          </h1>

          <p className="hero__text">
            Ніжні в’язані вироби ручної роботи для тепла й затишку щодня. Кожна
            річ створюється з увагою до деталей, а доставка по Україні —
            безкоштовна.
          </p>

          <Button className="hero__button" onClick={scrollToProducts}>
            Переглянути колекцію
          </Button>
        </div>

        <div className="hero__mark" aria-label="100% ручна робота">
          <img
            className="hero__mark-image"
            src="/images/icon_hero.svg"
            alt=""
            aria-hidden="true"
          />
          <span className="hero__mark-text">
            <strong>100%</strong>
            <span>
              ручна
              <br />
              робота
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
