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
  return d.toLocaleDateString('es-EC', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <section className="posts-section" id="publicaciones">
      <div className="posts-section__inner">
        <header style={{ marginBottom: '2.5rem' }}>
          <h2 className="section-heading font-display">Explorar todas las publicaciones</h2>
          <div className="section-rule" />
          <p style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            color: 'var(--color-muted)',
            fontSize: '1rem',
            maxWidth: '540px',
            lineHeight: 1.65,
          }}>
            Textos de no ficción sobre la ciudad, sus barrios, sus personajes y sus memorias.
          </p>
        </header>

        <div className="posts-grid">
          {posts.map((post, idx) => (
            <div key={post.slug} className="posts-grid__item">
              <Link to={`/posts/${post.slug}`} className="post-card">
                <div className="post-card__image-wrap">
                  <img
                    src={`/${post.image}`}
                    alt={post.title}
                    className="post-card__image"
                    loading="lazy"
                  />
                  {/* Genre tag overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                  }}>
                    <span className={`genre-badge ${getGenreClass(post.genre)}`}>
                      {post.genre}
                    </span>
                  </div>
                </div>

                <div className="post-card__body">
                  <div className="post-card__meta">
                    <span className="post-card__date">{formatDate(post.date)}</span>
                  </div>
                  <h3 className="post-card__title">{post.title}</h3>
                  <p className="post-card__excerpt">{post.summary}</p>
                  <p className="post-card__author">Por {post.author}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Archive CTA */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem' }}>
          <a href="/archivo" className="archive-btn">
            Ver todas las publicaciones
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
