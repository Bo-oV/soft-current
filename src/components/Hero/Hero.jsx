import Button from '../UI/Button/Button'
import './Hero.scss'

function Hero() {
  return (
    <section className="hero section" id="hero">
      <div className="container hero__container">
        <div className="hero__content">
          <span className="section__eyebrow">Handmade knitwear</span>
          <h1 className="hero__title">Теплі речі, створені вручну</h1>
          <p className="hero__text">
            Базовий каркас лендінгу для магазину в'язаних виробів з місцем під
            фото, декор, CTA та майбутню деталізовану верстку.
          </p>
          <Button>Переглянути каталог</Button>
        </div>

        <div className="hero__media">
          <div className="hero__image-placeholder">Фото виробу</div>
          <div className="hero__badge">100% handmade</div>
          <div className="hero__decor" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

export default Hero
