import { useState } from 'react'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header>
      {/* Top accent bar */}
      <div className="top-bar">
        <span>Guayaquil, Ecuador · Periodismo narrativo y literatura de no ficción</span>
        <span>Publicación independiente</span>
      </div>

      {/* Masthead */}
      <div className="masthead">
        <p className="masthead__eyebrow">
          Crónicas · Perfiles · Ensayos · Memorias urbanas
        </p>
        <h1 className="masthead__title">Nuestra vereda</h1>
        <p className="masthead__subtitle">
          Narramos Guayaquil desde sus calles, sus barrios y sus gentes
        </p>
        <div className="masthead__rule" />
      </div>

      {/* Sticky navigation */}
      <nav className="nav-bar">
        <div className="nav-bar__inner">
          <a href="/" className="nav-bar__logo">Nuestra vereda</a>

          {/* Mobile menu toggle */}
          <button
            className="nav-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>

          <ul className={`nav-bar__links${menuOpen ? ' is-open' : ''}`}>
            {[
              { label: 'Inicio', href: '/' },
              { label: 'Sobre nuestro proyecto', href: '/sobre-el-proyecto' },
              { label: 'Colaboradores', href: '/colaboradores' },
              { label: 'Contacto', href: '#contacto' },
            ].map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="nav-bar__link"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
