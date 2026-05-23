import './About.scss'

function About() {
  return (
    <section className="about section" id="about">
      <div className="about__decor" aria-hidden="true" />
      <div className="container about__container">
        <div className="about__image">Фото майстрині</div>
        <div className="about__content">
          <span className="section__eyebrow">About</span>
          <h2>Про майстриню</h2>
          <p>
            Тут буде історія бренду, підхід до матеріалів, ручної роботи та
            невеликий емоційний вступ до handmade-філософії.
          </p>
          <p>
            Декоративні елементи вже мають місце через absolute-позиціонування,
            щоб пізніше перенести візуальні деталі з дизайну.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
