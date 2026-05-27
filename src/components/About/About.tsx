import './About.scss'

function About() {
  return (
    <section className="about section" id="about">
      <div className="container about__container">
        <div className="about__media">
          <img
            className="about__image"
            src="/images/about/about-master.png"
            alt="Майстриня Вероніка у в'язаному кардигані"
          />
        </div>

        <div className="about__content">
          <p className="about__eyebrow">Про майстриню</p>
          <h2 className="about__title">Привіт, я Вероніка</h2>
          <p className="about__text">
            Я створюю в'язані вироби вручну - повільно, уважно і з любов'ю до
            кожної деталі. Мені подобається ручна робота, бо в ній є щось
            особливе: жодна річ не повторюється повністю, кожна має свій
            настрій, фактуру і характер.
          </p>
          <p className="about__text">
            Для мене важливо створювати не просто одяг чи аксесуари, а теплі
            речі, які хочеться носити, берегти і повертати до них знову. У
            кожному виробі - час, турбота, м'якість і частинка моєї любові до
            handmade.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
