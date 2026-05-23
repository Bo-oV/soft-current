import Button from "../UI/Button/Button";
import "./Hero.scss";

function Hero() {
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
            Повільна мода, натуральні матеріали та речі, які дарують тепло і
            затишок щодня. Кожен виріб створюється вручну невеликими партіями
            однією майстринею.
          </p>

          <Button className="hero__button">Переглянути колекцію</Button>
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
