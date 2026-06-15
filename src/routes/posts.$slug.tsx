import { createFileRoute, Link } from '@tanstack/react-router'
import { marked } from 'marked'
import { allPosts } from 'content-collections'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const post = allPosts.find((p) => p.slug === params.slug)
    if (!post) throw new Error('Entrada no encontrada')
    return post
  },
  component: PostDetail,
})

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

function PostDetail() {
  const post = Route.useLoaderData()

  return (
    <>
      <Header />

      {/* Hero image */}
      <div style={{ position: 'relative', height: '50vh', minHeight: '320px', background: 'var(--color-mangrove)', overflow: 'hidden' }}>
        <img
          src={`/${post.image}`}
          alt={post.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,24,18,0.9) 0%, rgba(15,24,18,0.3) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem 2rem', maxWidth: '860px', margin: '0 auto' }}>
          <span className={`genre-badge ${getGenreClass(post.genre)}`} style={{ background: 'rgba(255,255,255,0.15)', color: '#F8F3EB', border: '1px solid rgba(255,255,255,0.3)' }}>
            {post.genre}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#F8F3EB', margin: '0.6rem 0 0', lineHeight: 1.2 }}>
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article body */}
      <main style={{ background: 'var(--color-cream)', padding: '4rem 2rem 6rem' }}>
        <article style={{ maxWidth: '680px', margin: '0 auto' }}>
          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-muted)', letterSpacing: '0.04em' }}>
              Por <strong style={{ color: 'var(--color-ink-mid)' }}>{post.author}</strong>
            </span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--color-border)' }} />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
              {new Date(post.date).toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          {/* Standfirst */}
          <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--color-ink-mid)', lineHeight: 1.6, marginBottom: '2rem', borderLeft: '3px solid var(--color-ochre)', paddingLeft: '1.25rem' }}>
            {post.summary}
          </p>

          {/* Body */}
          <div
            style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-ink)' }}
            dangerouslySetInnerHTML={{ __html: marked(post.content) }}
          />

          {/* Back link */}
          <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
            <Link
              to="/"
              style={{ fontFamily: 'var(--font-ui)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-teal)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Volver al inicio
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}
