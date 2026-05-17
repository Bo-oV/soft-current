import { useState } from 'react'
import './Header.scss'

const navItems = [
  { label: 'Головна', href: '#hero' },
  { label: 'Каталог', href: '#products' },
  { label: 'Про майстриню', href: '#about' },
  { label: 'Догляд', href: '#care' },
  { label: 'Контакти', href: '#contacts' },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__logo title-font" href="#hero" onClick={closeMenu}>
          Soft Current
        </a>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          {navItems.map((item) => (
            <a
              className="header__link"
              href={item.href}
              key={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions" aria-label="Дії магазину">
          <span className="header__icon" aria-hidden="true">
            Fav
          </span>
          <span className="header__icon" aria-hidden="true">
            Bag
          </span>
        </div>

        <button
          className={`header__burger ${isMenuOpen ? 'header__burger--open' : ''}`}
          type="button"
          aria-label="Відкрити меню"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export default Header
