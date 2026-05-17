import { careItems } from '../../data/careItems'
import './Care.scss'

function Care() {
  return (
    <section className="care section" id="care">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Care</span>
          <h2>Догляд за виробами</h2>
          <p>Правила догляду винесені в дані, щоб легко розширювати список.</p>
        </div>

        <div className="care__grid">
          {careItems.map((item) => (
            <article className="care__item" key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Care
