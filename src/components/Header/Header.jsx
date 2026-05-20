import { useEffect, useState } from "react";
import { Heart, Handbag } from "lucide-react";
import "./Header.scss";

const navItems = [
  { label: "Головна", href: "#hero", sectionId: "hero" },
  { label: "Каталог", href: "#products", sectionId: "products" },
  { label: "Про майстриню", href: "#about", sectionId: "about" },
  { label: "Догляд", href: "#care", sectionId: "care" },
  { label: "Контакти", href: "#contacts", sectionId: "contacts" },
];

const actionItems = [
  {
    label: "Кошик",
    count: 2,
    Icon: Handbag,
  },
  {
    label: "Обране",
    count: 1,
    Icon: Heart,
  },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.sectionId))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__logo" href="#hero" onClick={closeMenu}>
          <img
            className="header__logo-image"
            src="/images/logo.png"
            alt="Soft Current"
          />
        </a>

        <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
          {navItems.map((item) => (
            <a
              className={`header__link ${
                activeSection === item.sectionId ? "header__link--active" : ""
              }`}
              href={item.href}
              key={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions" aria-label="Дії магазину">
          {actionItems.map((item) => (
            <button
              className="header__icon-button"
              type="button"
              key={item.label}
            >
              <span className="header__icon-wrap">
                <item.Icon
                  className="header__icon"
                  color="currentColor"
                  size={24}
                  strokeWidth={1}
                  aria-hidden="true"
                />
                <span className="header__counter">{item.count}</span>
              </span>
              <span className="header__action-label">{item.label}</span>
            </button>
          ))}
        </div>

        <button
          className={`header__burger ${isMenuOpen ? "header__burger--open" : ""}`}
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
  );
}

export default Header;
