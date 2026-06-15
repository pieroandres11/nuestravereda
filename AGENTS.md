# AGENTS.md — Nuestra vereda

Guía de arquitectura para agentes de IA que trabajen en este proyecto.

## Propósito

Blog literario y periodístico dedicado a textos de no ficción sobre Guayaquil. La plantilla prioriza legibilidad, identidad visual y modularidad. Incluye un tema completo para Blogger en `blogger-theme.xml`.

## Estructura de directorios

```
content/posts/          # Archivos Markdown de entradas del blog
public/                 # Recursos estáticos (imágenes, contact-form.html)
src/
  components/           # Componentes React reutilizables
    Header.tsx          # Masthead + barra de navegación sticky
    HeroCarousel.tsx    # Carrusel de entradas destacadas (featured: true)
    PostGrid.tsx        # Cuadrícula "Explorar todas las publicaciones"
    ContactSection.tsx  # Formulario de contacto con Netlify Forms
    Footer.tsx          # Pie de página con créditos y redes sociales
  routes/
    __root.tsx          # Layout raíz con HTML, meta tags, fuentes
    index.tsx           # Página de inicio — ensambla todos los componentes
    posts.$slug.tsx     # Página de detalle de entrada
  styles.css            # Sistema de diseño completo (CSS vars + clases custom)
content-collections.ts  # Schema y transformación de posts Markdown
```

## Convenciones

### Nombrado
- Componentes: PascalCase
- Utilidades/hooks: camelCase
- Rutas: kebab-case
- Clases CSS custom: BEM-inspired (`.carousel__slide`, `.genre-badge--cronica`)

### Estilos
- El sistema de diseño completo vive en `src/styles.css`
- `@theme` de Tailwind v4 define tokens de color (`--color-cream`, `--color-mangrove`, etc.) y tipografía
- Clases personalizadas para componentes complejos (carousel, cards, nav)
- **Tipografía**: `var(--font-display)` = Playfair Display, `var(--font-body)` = EB Garamond, `var(--font-ui)` = Jost

### Paleta de colores
| Variable | Valor | Uso |
|----------|-------|-----|
| `--color-cream` | `#F4EFE6` | Fondo principal |
| `--color-ink` | `#1A1612` | Texto principal |
| `--color-ochre` | `#C8943A` | Acento, CTA, reglas |
| `--color-mangrove` | `#192B21` | Secciones oscuras (contacto, footer) |
| `--color-teal` | `#2D6A4F` | Acento secundario |
| `--color-muted` | `#6B6058` | Texto secundario/metadatos |

## Sistema de contenido

Los posts en `content/posts/*.md` deben incluir:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `title` | string | sí | Título del texto |
| `summary` | string | sí | Extracto breve |
| `date` | string ISO | sí | Fecha de publicación |
| `genre` | string | sí | Crónica / Perfil / Ensayo / Memoria urbana / Reportaje / Testimonio |
| `author` | string | no | Nombre del autor (default: "La Redacción") |
| `featured` | boolean | no | Si aparece en el carrusel (default: false, máx 5) |
| `image` | string | sí | Nombre del archivo en `/public/` |
| `categories` | string[] | sí | Categorías |

El slug se genera automáticamente desde el título (normalizado, sin acentos, con guiones).

## Carrusel de entradas

`HeroCarousel.tsx` filtra `featured: true`, toma máximo 5, rota cada 6s, se pausa en hover. Transición crossfade CSS en `opacity`.

## Formulario de contacto (Netlify Forms)

Usa la técnica AJAX requerida para TanStack Start (React SPA/SSR): `public/contact-form.html` es el skeleton estático que Netlify escanea en build time. El componente React hace POST a esa URL con `application/x-www-form-urlencoded`. No usar `<form action="/">` — rompe el routing de TanStack.

## Genre badges

Colores codificados en `src/styles.css` como `.genre-badge--{tipo}`. Al agregar un nuevo género, añadir la clase correspondiente y actualizar `getGenreClass()` en los componentes que la usen.

## Botones de navegación

Los enlaces de nav (`/sobre-el-proyecto`, `/colaboradores`) apuntan a rutas que aún no existen — intencional. La plantilla está lista para que se creen esas páginas.

## Compatibilidad Blogger

El archivo `blogger-theme.xml` en la raíz del proyecto es un tema completo listo para importar en Blogger. Mapeo de componentes React → widgets Blogger:

| Componente React | Widget Blogger |
|-----------------|----------------|
| `Header.tsx` | `Header1` (`type='Header'`) — masthead + nav HTML en `<b:includable id='main'>` |
| `HeroCarousel.tsx` | `HTML1` — carousel placeholder; posts cargados por JS desde la feed API de Blogger |
| `PostGrid.tsx` | `Blog1` (`type='Blog'`) — template con `<b:loop values='data:posts'>` |
| `ContactSection.tsx` | `HTML2` — formulario HTML con acción a servicio externo (Formspree) |
| `Footer.tsx` | `HTML2` (mismo widget) — footer a continuación de la sección de contacto |

### Instrucciones de uso en Blogger

1. Ir a **Blogger → Tema → Editar HTML** y pegar el contenido completo de `blogger-theme.xml`.
2. Para el **carrusel destacado**: etiquetar las entradas principales con la etiqueta **`Destacado`**. El JS del tema las carga automáticamente via `/feeds/posts/default/-/Destacado?alt=json`. Si no hay entradas con esa etiqueta, se muestran las 5 más recientes como fallback.
3. Para el **formulario de contacto**: crear cuenta en [Formspree](https://formspree.io/), crear un formulario y reemplazar `https://formspree.io/f/YOUR_FORM_ID` en el atributo `action` del formulario dentro del widget `HTML2`.
4. Crear **páginas estáticas** en Blogger para `Sobre nuestro proyecto` y `Colaboradores`; el tema espera las rutas `/p/sobre-el-proyecto.html` y `/p/colaboradores.html`.
5. Actualizar los **enlaces de redes sociales** (`href='#'`) en el widget `HTML2` con las URLs reales.

### Etiquetas de género (labels en Blogger)

Usar las siguientes etiquetas en cada entrada para activar el color correcto del badge:

| Etiqueta | Clase CSS activada |
|----------|--------------------|
| `Crónica` | `.genre-badge--cronica` |
| `Perfil` | `.genre-badge--perfil` |
| `Ensayo` | `.genre-badge--ensayo` |
| `Memoria urbana` | `.genre-badge--memoria` |
| `Reportaje` | `.genre-badge--reportaje` |
| `Testimonio` | `.genre-badge--testimonio` |

Al agregar un género nuevo, añadir la clase en `<b:skin>` del XML y la entrada en el objeto `GENRE_MAP` del `<script>` al final del tema.

## Comandos de desarrollo

```bash
npm run dev      # Servidor local en puerto 3000
npm run build    # Build de producción
```
