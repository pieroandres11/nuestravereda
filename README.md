# Nuestra vereda

**Nuestra vereda** es una plantilla para un blog literario y periodístico inspirado en Guayaquil, Ecuador. Está diseñada para la publicación de textos de no ficción: crónicas, perfiles, ensayos, testimonios, reportajes y memorias urbanas.

## Tecnologías principales

- **TanStack Start** — Framework React con SSR y routing basado en archivos
- **TanStack Router** — Routing type-safe con file-based routes
- **Content Collections** — Sistema de contenido con archivos Markdown
- **Tailwind CSS v4** — Estilos utilitarios con sistema de diseño personalizado
- **Netlify Forms** — Formulario de contacto serverless
- Google Fonts — Playfair Display, EB Garamond, Jost

## Cómo ejecutar localmente

```bash
npm install
npm run dev
```

El servidor de desarrollo estará disponible en `http://localhost:3000`.

## Agregar contenido

Crea archivos `.md` en `content/posts/` con el siguiente frontmatter:

```yaml
---
date: "2025-06-01"
title: "Título del texto"
summary: "Resumen breve del texto."
genre: "Crónica"          # Crónica | Perfil | Ensayo | Memoria urbana | Reportaje | Testimonio
author: "Nombre del autor"
featured: true             # true = aparece en el carrusel principal
image: "nombre-imagen.png" # Colocar la imagen en /public/
categories:
  - Crónica
---

Contenido del texto en Markdown...
```

## Migración a WordPress

La plantilla está diseñada para facilitar la migración futura a WordPress. La estructura de componentes (Header, Carousel, PostGrid, Footer) mapea directamente a las secciones de una plantilla WordPress. Ver `AGENTS.md` para detalles de arquitectura.
