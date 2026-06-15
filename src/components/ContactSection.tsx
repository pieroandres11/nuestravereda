import { useState } from 'react'

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&')
}

export function ContactSection() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...fields }),
      })
      setSubmitted(true)
    } catch {
      setSubmitting(false)
    }
  }

  return (
    <section className="contact-section" id="contacto">
      <div className="contact-section__inner">
        {/* Left: contact info */}
        <div>
          <h2 className="contact-info__heading font-display">Escríbenos</h2>
          <p className="contact-info__lead">
            Si tienes una historia que contar sobre Guayaquil, o quieres colaborar con nosotros, nos interesa escucharte.
          </p>

          <div className="contact-info__item">
            <svg className="contact-info__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <polyline points="2,4 12,13 22,4"/>
            </svg>
            <div>
              <span className="contact-info__label">Correo electrónico</span>
              <span className="contact-info__value">contacto@nuestravereda.ec</span>
            </div>
          </div>

          <div className="contact-info__item">
            <svg className="contact-info__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <div>
              <span className="contact-info__label">Ciudad</span>
              <span className="contact-info__value">Guayaquil, Ecuador</span>
            </div>
          </div>

          <div className="contact-info__item">
            <svg className="contact-info__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <div>
              <span className="contact-info__label">Colaboraciones</span>
              <span className="contact-info__value">colabora@nuestravereda.ec</span>
            </div>
          </div>

          <div className="social-links">
            {/* Instagram */}
            <a href="#instagram" className="social-link" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            {/* X / Twitter */}
            <a href="#twitter" className="social-link" aria-label="Twitter / X">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="#facebook" className="social-link" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right: contact form */}
        <div>
          {submitted ? (
            <div className="form-success">
              <p style={{ margin: 0 }}>Gracias por tu mensaje. Te responderemos a la brevedad posible.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="contact" />

              {/* Honeypot anti-spam */}
              <input type="text" name="bot-field" style={{ display: 'none' }} aria-hidden="true" />

              <div className="form-field">
                <label htmlFor="contact-name" className="form-label">Nombre</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={fields.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email" className="form-label">Correo electrónico</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="tu@correo.com"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-message" className="form-label">Mensaje</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={fields.message}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Cuéntanos tu historia o propuesta..."
                  required
                />
              </div>

              <button type="submit" className="form-submit" disabled={submitting}>
                {submitting ? 'Enviando…' : 'Enviar mensaje'}
                {!submitting && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
