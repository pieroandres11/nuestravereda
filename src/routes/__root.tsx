import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Nuestra vereda — Crónicas, perfiles y memorias urbanas de Guayaquil' },
      { name: 'description', content: 'Publicación digital independiente dedicada al periodismo narrativo y la literatura de no ficción desde Guayaquil, Ecuador.' },
      { property: 'og:title', content: 'Nuestra vereda' },
      { property: 'og:description', content: 'Crónicas, perfiles, ensayos y memorias urbanas desde las calles de Guayaquil.' },
      { property: 'og:type', content: 'website' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
