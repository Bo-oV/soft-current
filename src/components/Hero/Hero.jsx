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
      </div>
    </section>
  );
}

export default Hero;
