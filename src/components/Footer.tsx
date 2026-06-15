export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        {/* Brand */}
        <div>
          <p className="footer-brand__name">Nuestra vereda</p>
          <p className="footer-brand__desc">
            Publicación digital independiente dedicada al periodismo narrativo y la literatura de no ficción desde Guayaquil, Ecuador.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="footer-col__heading">Publicación</p>
          <ul className="footer-links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/sobre-el-proyecto">Sobre el proyecto</a></li>
            <li><a href="/colaboradores">Colaboradores</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>

        {/* Social & legal */}
        <div>
          <p className="footer-col__heading">Síguenos</p>
          <div className="footer-social">
            <a href="#instagram" className="footer-social-link" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="#twitter" className="footer-social-link" aria-label="Twitter / X">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#facebook" className="footer-social-link" aria-label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <p className="footer-col__heading">Género</p>
            <ul className="footer-links" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: '0.35rem' }}>
              {['Crónica', 'Perfil', 'Ensayo', 'Reportaje', 'Memoria urbana', 'Testimonio'].map(g => (
                <li key={g}><a href={`/categoria/${g.toLowerCase().replace(' ', '-')}`}>{g}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copyright">
          © {year} Nuestra vereda. Todos los derechos reservados.
        </span>
        <span className="footer-copyright">
          Diseñado y publicado en Guayaquil, Ecuador
        </span>
      </div>
    </footer>
  )
}
