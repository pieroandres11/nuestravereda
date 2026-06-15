import { useState, useEffect, useCallback } from 'react'
import { Link } from '@tanstack/react-router'
import type { Post } from 'content-collections'

function getGenreClass(genre: string) {
  const map: Record<string, string> = {
    'Crónica': 'genre-badge--cronica',
    'Perfil': 'genre-badge--perfil',
    'Ensayo': 'genre-badge--ensayo',
    'Memoria urbana': 'genre-badge--memoria',
    'Reportaje': 'genre-badge--reportaje',
    'Testimonio': 'genre-badge--testimonio',
  }
  return map[genre] ?? 'genre-badge--default'
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function HeroCarousel({ posts }: { posts: Post[] }) {
  const featured = posts.filter((p) => p.featured).slice(0, 5)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setActive((a) => (a + 1) % featured.length)
  }, [featured.length])

  const prev = useCallback(() => {
    setActive((a) => (a - 1 + featured.length) % featured.length)
  }, [featured.length])

  useEffect(() => {
    if (paused || featured.length < 2) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [paused, next, featured.length])

  if (featured.length === 0) return null

  return (
    <section
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Entradas destacadas"
    >
      <div className="carousel__slides">
        {featured.map((post, i) => (
          <div
            key={post.slug}
            className={`carousel__slide${i === active ? ' is-active' : ''}`}
            aria-hidden={i !== active}
          >
            <img
              src={`/${post.image}`}
              alt={post.title}
              className="carousel__image"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div className="carousel__overlay" />

            <div className="carousel__content">
              <span className={`genre-badge genre-badge--light`}>
                {post.genre}
              </span>

              <h2 className="carousel__title">{post.title}</h2>
              <p className="carousel__excerpt">{post.summary}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <Link to={`/posts/${post.slug}`} className="carousel__read-more">
                  Leer más
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
                <span style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.04em'
                }}>
                  {post.author} · {formatDate(post.date)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <div className="carousel__nav carousel__nav--left">
        <button className="carousel__nav-btn" onClick={prev} aria-label="Anterior">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
      </div>
      <div className="carousel__nav carousel__nav--right">
        <button className="carousel__nav-btn" onClick={next} aria-label="Siguiente">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      {/* Dot navigation */}
      <div className="carousel__dots" role="tablist" aria-label="Diapositivas">
        {featured.map((_, i) => (
          <button
            key={i}
            className={`carousel__dot${i === active ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            role="tab"
            aria-selected={i === active}
          />
        ))}
      </div>
    </section>
  )
}
