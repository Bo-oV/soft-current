import { useEffect, useState } from "react";
import { Handbag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import FavoritesButton from "../FavoritesButton/FavoritesButton";
import "./Header.scss";

const navItems = [
  { label: "Головна", href: "#hero", sectionId: "hero" },
  { label: "Каталог", href: "#products", sectionId: "products" },
  { label: "Про майстриню", href: "#about", sectionId: "about" },
  { label: "Догляд", href: "#care", sectionId: "care" },
  { label: "Контакти", href: "#contacts", sectionId: "contacts" },
];

type HeaderProps = {
  cartCount?: number;
  favoritesCount?: number;
  onCartOpen?: () => void;
  onFavoritesOpen?: () => void;
};

type HeaderActionItem = {
  label: string;
  count: number;
  Icon: LucideIcon;
  onClick?: () => void;
};

function Header({
  cartCount = 0,
  favoritesCount = 0,
  onCartOpen,
  onFavoritesOpen,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const actionItems: HeaderActionItem[] = [
    {
      label: "Кошик",
      count: cartCount,
      Icon: Handbag,
      onClick: onCartOpen,
    },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.sectionId))
      .filter((section): section is HTMLElement => Boolean(section));

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
            src="/images/logo.svg"
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
          <address className="header__menu-contacts">
            <div className="header__menu-contact">
              <p className="header__menu-contact-label">E-mail:</p>
              <a className="header__menu-contact-value header__menu-contact-value--accent" href="mailto:softcurrent.shop@gmail.com">
                softcurrent.shop@gmail.com
              </a>
            </div>
            <div className="header__menu-contact">
              <p className="header__menu-contact-label">Telegram:</p>
              <a className="header__menu-contact-value" href="https://t.me/roni9991">
                @roni9991
              </a>
            </div>
          </address>
        </nav>

        <div className="header__actions" aria-label="Дії магазину">
          {actionItems.map((item) => (
            <button
              className="header__icon-button"
              type="button"
              key={item.label}
              onClick={item.onClick}
            >
              <span className="header__icon-wrap">
                <item.Icon
                  className="header__icon"
                  color="currentColor"
                  size={24}
                  strokeWidth={1}
                  aria-hidden="true"
                />
                {item.count > 0 && (
                  <span className="header__counter">{item.count}</span>
                )}
              </span>
              <span className="header__action-label">{item.label}</span>
            </button>
          ))}
          <FavoritesButton count={favoritesCount} onClick={onFavoritesOpen} />
        </div>

        <button
          className={`header__burger ${isMenuOpen ? "header__burger--open" : ""}`}
          type="button"
          aria-label="Відкрити меню"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <img className="header__burger-icon" src="/images/menu.svg" alt="" aria-hidden="true" />
        </button>
      </div>
      {isMenuOpen && (
        <button
          className="header__menu-backdrop"
          type="button"
          aria-label="Закрити меню"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}

export default Header;
