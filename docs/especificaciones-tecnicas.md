# THEIA Triathlon Performance — Especificaciones Técnicas

> Documento técnico completo del proyecto. Contiene la arquitectura, stack tecnológico,
> estructura de archivos, flujo de datos, patrones de diseño y guía para desarrolladores.
>
> **Versión:** 1.0 — Mayo 2026
> **Autor:** Generado con IA
> **Proyecto:** Theia Triathlon Performance — Landing Page Escalable

---

## 1. Visión General del Proyecto

### 1.1 ¿Qué es este proyecto?

Es una **landing page profesional y escalable** para el club de triatlón "Theia Triathlon Performance", ubicado en Chile. La página web sirve como presencia digital del club, mostrando información sobre el equipo, competencias, noticias y un formulario de contacto.

### 1.2 ¿Por qué fue diseñado así?

La arquitectura fue pensada para ser **escalable**: hoy funciona como una landing page estática, pero la estructura de carpetas, los tipos TypeScript y el esquema de base de datos están preparados para evolucionar hacia una plataforma con:
- Portal de pagos y suscripciones (Fase 2)
- Blog con CMS (Fase 2)
- Dashboard de administración (Fase 3)

### 1.3 Objetivo del diseño visual

- **Cálido y comunitario** — transmitir energía positiva, no un look frío/corporativo
- **Colores variados** — azul celeste (natación), azul medio (ciclismo), verde esmeralda (running), ámbar (energía/medallas)
- **Fondos claros** — predomina el blanco con tintes sutiles de color
- **Tipografía con personalidad** — Montserrat para headings (deportiva), Nunito para body (cálida)
- **Fotos reales del equipo** — integradas en el hero, nosotros y competencias

---

## 2. Stack Tecnológico

### 2.1 Tabla resumen

| Tecnología | Versión | Rol | ¿Por qué se eligió? |
|---|---|---|---|
| **Next.js** | 16.2.6 | Framework web | SSR/SSG, App Router, optimización de imágenes, API Routes |
| **React** | 19.2.4 | Librería UI | Componentes reactivos, Server Components |
| **TypeScript** | ^5 | Lenguaje | Tipado estático, prevención de errores, mejor DX |
| **Tailwind CSS** | v4 | Estilos | CSS-first configuration, utilidades, design tokens |
| **Prisma** | ^7.8.0 | ORM | Esquema declarativo, migraciones, type-safe queries |
| **PostgreSQL** | — | Base de datos | Relacional, escalable, preparado para Fase 2 |
| **ESLint** | ^9 | Linting | Calidad de código, convenciones de Next.js |
| **Turbopack** | (incluido) | Bundler | Build rápido en desarrollo y producción |

### 2.2 ¿Por qué Next.js y no otro framework?

- **App Router**: Sistema de rutas basado en carpetas (cada carpeta en `app/` = una ruta)
- **Server Components**: Los componentes se renderizan en el servidor por defecto → mejor SEO y performance
- **Optimización de imágenes**: El componente `<Image>` de Next.js comprime, redimensiona y sirve en formato WebP automáticamente
- **API Routes**: Permite crear endpoints backend sin un servidor separado (ej. `/api/contact`)
- **Static Generation (SSG)**: Las páginas se pre-renderizan en build time → carga instantánea

### 2.3 ¿Por qué Tailwind CSS v4?

Tailwind v4 usa **CSS-first configuration** (todo se define en `globals.css` con `@theme`), sin necesidad de un archivo `tailwind.config.ts`. Esto:
- Reduce archivos de configuración
- Permite definir tokens de diseño directamente en CSS
- Las clases de utilidad como `bg-brand-blue` se generan automáticamente desde los tokens

### 2.4 ¿Por qué Prisma?

Prisma es un ORM que genera un cliente TypeScript type-safe a partir del esquema. Ventajas:
- El esquema (`schema.prisma`) es la fuente de verdad de la base de datos
- Las migraciones se crean automáticamente con `npx prisma migrate dev`
- Las queries como `prisma.user.findMany()` tienen autocompletado y verificación de tipos

---

## 3. Estructura de Archivos

```
Theia/
├── public/                          # Archivos estáticos (accesibles directamente por URL)
│   └── images/
│       ├── logo-theia.png           # Logo del club (negro, fondo transparente)
│       ├── equipo-running.jpg       # Foto del equipo en competencia
│       ├── atletas-collage.jpg      # Collage de atletas en acción
│       └── equipo-jersey.png        # Foto original del jersey del equipo
│
├── prisma/
│   └── schema.prisma                # Esquema de la base de datos (modelos, enums)
│
├── src/                             # Todo el código fuente de la aplicación
│   ├── app/                         # ← App Router de Next.js (rutas = carpetas)
│   │   ├── globals.css              # Estilos globales + tokens de diseño Tailwind v4
│   │   ├── layout.tsx               # Layout raíz (Navbar + Footer + fuentes)
│   │   ├── page.tsx                 # Página Home (/)
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts         # API endpoint POST /api/contact
│   │   ├── competencias/
│   │   │   └── page.tsx             # Página /competencias
│   │   ├── contacto/
│   │   │   └── page.tsx             # Página /contacto
│   │   └── nosotros/
│   │       └── page.tsx             # Página /nosotros
│   │
│   ├── components/                  # Todos los componentes React
│   │   ├── ui/                      # Componentes genéricos reutilizables
│   │   │   ├── Button.tsx           # Botón con variantes (primary, secondary, outline, white)
│   │   │   ├── Card.tsx             # Tarjeta con hover y glow
│   │   │   ├── ImagePlaceholder.tsx # Placeholder donde irán las fotos
│   │   │   └── SectionTitle.tsx     # Título de sección con acento decorativo
│   │   │
│   │   ├── layout/                  # Componentes de estructura
│   │   │   ├── Navbar.tsx           # Barra de navegación (glass/transparente)
│   │   │   └── Footer.tsx           # Pie de página con redes sociales
│   │   │
│   │   ├── home/                    # Secciones exclusivas del Home
│   │   │   ├── HeroCarousel.tsx     # Carrusel hero con fotos reales
│   │   │   ├── AboutPreview.tsx     # Resumen "Somos Theia"
│   │   │   ├── UpcomingRaces.tsx    # Próximas competencias (3 cards)
│   │   │   ├── NewsPreview.tsx      # Noticias/Blog del club
│   │   │   └── Testimonials.tsx     # Testimonios de miembros
│   │   │
│   │   ├── competencias/
│   │   │   └── EventCard.tsx        # Card de competencia individual
│   │   │
│   │   └── contact/
│   │       └── ContactForm.tsx      # Formulario de contacto con validación
│   │
│   ├── lib/                         # Utilidades y configuración
│   │   ├── constants.ts             # TODOS los datos estáticos centralizados
│   │   └── prisma.ts                # Cliente Prisma (singleton, comentado)
│   │
│   └── types/
│       └── index.ts                 # Interfaces TypeScript globales
│
├── .env.example                     # Variables de entorno (plantilla)
├── package.json                     # Dependencias y scripts npm
├── tsconfig.json                    # Configuración TypeScript
├── postcss.config.mjs               # Configuración PostCSS para Tailwind
├── next.config.ts                   # Configuración Next.js
├── CLAUDE.md                        # Contexto del proyecto para IA
└── docs/
    └── especificaciones-tecnicas.md # ← ESTE DOCUMENTO
```

---

## 4. ¿Cómo funciona el enrutamiento?

Next.js App Router usa **file-system routing**: cada carpeta dentro de `src/app/` que contenga un `page.tsx` se convierte en una ruta.

```
src/app/page.tsx           →  https://sitio.com/
src/app/nosotros/page.tsx  →  https://sitio.com/nosotros
src/app/competencias/page.tsx → https://sitio.com/competencias
src/app/contacto/page.tsx  →  https://sitio.com/contacto
src/app/api/contact/route.ts → POST https://sitio.com/api/contact
```

### 4.1 Layout raíz (`layout.tsx`)

Este archivo envuelve **todas las páginas**. Define:
- Las fuentes (Montserrat + Nunito) cargadas con `next/font/google`
- La metadata SEO global
- La estructura `<Navbar /> → <main>{children}</main> → <Footer />`

Las fuentes se inyectan como **variables CSS** (`--font-montserrat`, `--font-nunito`) que luego se referencian en `globals.css`.

### 4.2 Server Components vs Client Components

| Tipo | Marcador | Uso en este proyecto |
|---|---|---|
| **Server Component** | (por defecto) | `page.tsx`, `SectionTitle`, `Card`, `Footer` |
| **Client Component** | `'use client'` al inicio | `Navbar`, `HeroCarousel`, `Testimonials`, `ContactForm` |

Un componente necesita `'use client'` cuando usa:
- `useState`, `useEffect` (estado/lifecycle)
- Event handlers (`onClick`, `onSubmit`)
- APIs del navegador (`window`, `document`)

---

## 5. Sistema de Estilos (globals.css)

### 5.1 Tokens de diseño

Todos los colores se definen una sola vez en `globals.css` dentro de `@theme {}`:

```css
@theme {
  --color-brand-blue: #2E7DD1;     /* Azul principal */
  --color-swim: #0EA5E9;           /* Celeste — natación */
  --color-run: #10B981;            /* Verde — running */
  --color-accent-warm: #F59E0B;    /* Ámbar — energía */
}
```

Tailwind genera automáticamente clases como `bg-brand-blue`, `text-swim`, `border-run`, etc.

### 5.2 Utilidades custom

| Clase CSS | Qué hace |
|---|---|
| `.glass` | Fondo blanco semitransparente con blur (efecto glass) |
| `.text-gradient` | Texto con degradado azul→teal→verde |
| `.accent-line` | Línea decorativa multicolor para titulares |
| `.section-padding` | Padding responsive estándar para secciones |

### 5.3 Animaciones

| Animación | Uso |
|---|---|
| `fade-in` | Aparición suave (opacity 0→1) |
| `slide-up` | Entrada desde abajo (translate + opacity) |

---

## 6. Componentes en Detalle

### 6.1 Componentes UI (`components/ui/`)

#### Button.tsx
- **Props**: `variant`, `size`, `href`, `onClick`, `type`, `disabled`
- **Variantes**: `primary` (azul), `secondary` (ámbar), `outline` (borde azul), `white` (fondo blanco)
- Si recibe `href` → renderiza un `<Link>` de Next.js
- Si no → renderiza un `<button>`

#### Card.tsx
- **Props**: `hover`, `glow`, `className`
- Contenedor blanco con borde sutil y sombra
- `hover={true}` → eleva la tarjeta al pasar el mouse

#### SectionTitle.tsx
- **Props**: `title`, `subtitle`, `align`, `gradient`, `dark`
- Renderiza: línea de acento + h2 + subtítulo

#### ImagePlaceholder.tsx
- **Props**: `text`, `aspectRatio`
- Muestra un recuadro con borde punteado e instrucciones de qué imagen subir

### 6.2 Componentes de Layout

#### Navbar.tsx (`'use client'`)
- **Estado**: `isScrolled` (detecta scroll > 20px), `isMobileMenuOpen`
- **Efecto glass**: Al hacer scroll, la navbar cambia de transparente a glass (blur)
- **Logo**: Usa `next/image` para cargar el logo PNG del club
- **Responsive**: Menú hamburguesa en mobile, links horizontales en desktop

#### Footer.tsx
- Barra de gradiente multicolor en la parte superior (swim→blue→run)
- Grid de 4 columnas: brand, navegación, contacto, redes sociales
- Logo invertido (filtro CSS `brightness-0 invert`) para fondo oscuro

### 6.3 Componentes del Home

#### HeroCarousel.tsx (`'use client'`)
- **Carrusel automático** (intervalo 6s, pausable con hover)
- Usa las fotos reales del equipo como fondo
- **Filtro grayscale** con overlay para look profesional
- Transición de slides con opacity + scale

#### AboutPreview.tsx
- Foto real del equipo con badge ámbar
- Estadísticas con colores por disciplina (swim, warm, run)

#### UpcomingRaces.tsx
- Muestra las primeras 3 competencias de `constants.ts`
- Bloque de fecha con hover interactivo (cambia color)

#### NewsPreview.tsx
- Layout: 1 noticia destacada (grande) + 3 secundarias (horizontales)
- Badges de categoría con colores diferenciados

#### Testimonials.tsx (`'use client'`)
- Carrusel manual con flechas y dots
- Avatar circular con placeholder

---

## 7. Datos Estáticos (`constants.ts`)

Este archivo es **la fuente de verdad** para todo el contenido visible. Contiene:

| Constante | Tipo | Uso |
|---|---|---|
| `NAV_LINKS` | `NavLink[]` | Links de la navbar y footer |
| `SOCIAL_LINKS` | `SocialLink[]` | Iconos de redes sociales |
| `HERO_SLIDES` | array de objetos | Slides del carrusel hero |
| `RACES` | `Race[]` | Calendario de competencias |
| `NEWS_ARTICLES` | `NewsArticle[]` | Noticias del blog |
| `TESTIMONIALS` | `Testimonial[]` | Testimonios de miembros |
| `COACHES` | `CoachProfile[]` | Cuerpo técnico |
| `TRAINING_LEVELS` | array de objetos | (removido del Home, aún disponible) |
| `CLUB_INFO` | objeto | Datos del club (email, teléfono, misión, etc.) |

**Para editar contenido**: Solo necesitas modificar este archivo. No tocar componentes.

---

## 8. Sistema de Tipos (`types/index.ts`)

```typescript
// Tipos principales:
Race         → Competencia (id, name, date, location, type, distance, status)
RaceType     → 'triatlon' | 'duatlon' | 'acuatlon' | 'running' | ...
RaceStatus   → 'upcoming' | 'registration_open' | 'registration_closed' | 'finished'
Testimonial  → Testimonio (id, name, role, quote)
CoachProfile → Entrenador (id, name, role, bio, specialties)
NewsArticle  → Noticia (id, title, excerpt, date, category)
ContactFormData → Datos del formulario (name, email, message)
ApiResponse  → Respuesta API genérica (success, message, data?)
NavLink      → Link de navegación (label, href)
SocialLink   → Red social (platform, url, label)
```

---

## 9. API Route: `/api/contact`

### 9.1 Flujo

```
[Usuario] → llena formulario → click "Enviar"
     ↓
[ContactForm.tsx] → valida en cliente → fetch POST /api/contact
     ↓
[route.ts] → valida en servidor:
  - Campos vacíos? → 400
  - Email inválido? → 400
  - Nombre < 2 chars? → 400
  - Mensaje < 10 chars? → 400
  - Todo OK → 200 + log en consola
     ↓
[ContactForm.tsx] → muestra mensaje de éxito/error
```

### 9.2 Validación doble

| Validación | Cliente (ContactForm) | Servidor (route.ts) |
|---|---|---|
| Campos vacíos | ✅ | ✅ |
| Formato email | ✅ (regex) | ✅ (regex) |
| Longitud nombre | — | ✅ (>= 2) |
| Longitud mensaje | — | ✅ (>= 10) |

### 9.3 Conectar con PostgreSQL

Cuando tengas la DB configurada:
1. Edita `.env`: `DATABASE_URL="postgresql://user:pass@localhost:5432/theia"`
2. Ejecuta: `npx prisma generate`
3. Ejecuta: `npx prisma migrate dev --name init`
4. En `route.ts`: descomenta las líneas de `prisma.contactMessage.create(...)`
5. En `prisma.ts`: descomenta el código del PrismaClient

---

## 10. Base de Datos (Prisma Schema)

### 10.1 Modelos actuales (Fase 1)

```
User
├── id (cuid, PK)
├── email (único)
├── name
├── phone?
├── role (ADMIN | COACH | MEMBER)
├── isActive (default: true)
├── createdAt
└── updatedAt

ContactMessage
├── id (cuid, PK)
├── name
├── email
├── message (TEXT)
├── read (default: false)
└── createdAt
```

### 10.2 Modelos preparados (Fase 2 — comentados)

```
Plan → Planes de suscripción (Mensual, Anual, etc.)
Subscription → Suscripciones activas de los miembros
Payment → Registro de pagos (Webpay/Stripe)
```

---

## 11. Configuración TypeScript (`tsconfig.json`)

| Opción | Valor | Propósito |
|---|---|---|
| `strict: true` | Activado | Máxima seguridad de tipos |
| `paths: { "@/*": ["./src/*"] }` | Alias | Permite imports como `@/components/ui/Button` |
| `moduleResolution: "bundler"` | Bundler mode | Resolución de módulos optimizada para Next.js |
| `jsx: "react-jsx"` | JSX automático | No necesita `import React` en cada archivo |

---

## 12. Scripts NPM

| Comando | Qué hace |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo (localhost:3000) con hot-reload |
| `npm run build` | Compila para producción (TypeScript check + SSG) |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | Ejecuta ESLint para verificar calidad de código |

---

## 13. Cómo agregar contenido

### 13.1 Agregar una competencia
1. Abrir `src/lib/constants.ts`
2. Agregar un objeto al array `RACES`:
```typescript
{
  id: '7',
  name: 'Triatlón de Concepción',
  date: '2027-01-15',
  location: 'Concepción, Chile',
  type: 'triatlon',
  distance: 'Sprint',
  description: 'Descripción del evento...',
  status: 'registration_open',
}
```

### 13.2 Agregar una noticia
1. Agregar al array `NEWS_ARTICLES` en `constants.ts`
2. Categorías disponibles: `'resultados' | 'noticias' | 'entrenamiento' | 'comunidad'`

### 13.3 Reemplazar un placeholder por una imagen real
1. Guardar la imagen en `public/images/`
2. En el componente, reemplazar:
```tsx
// ANTES:
<ImagePlaceholder text="..." />

// DESPUÉS:
<Image src="/images/mi-foto.jpg" alt="Descripción" width={800} height={600} className="..." />
```
3. Importar: `import Image from 'next/image';`

---

## 14. Despliegue

### 14.1 Vercel (recomendado)

1. Push a GitHub
2. Conectar repositorio en vercel.com
3. Configurar variables de entorno (`DATABASE_URL`)
4. Deploy automático en cada push

### 14.2 Otro hosting

```bash
npm run build     # Genera carpeta .next/
npm run start     # Sirve en puerto 3000
```

Necesitas Node.js 18+ en el servidor.

---

## 15. Imágenes del Proyecto

| Archivo | Contenido | Dónde se usa |
|---|---|---|
| `logo-theia.png` | Logo orbital negro (fondo transparente) | Navbar, Footer |
| `equipo-running.jpg` | Foto grupal del equipo con medallas | Hero slides 1 y 3, AboutPreview, Nosotros |
| `atletas-collage.jpg` | Collage de 5 atletas en acción | Hero slides 2 y 4, Nosotros hero, Competencias hero |
| `equipo-jersey.png` | Foto original del jersey azul del equipo | Referencia de branding (no usada en la web) |

---

## 16. Paleta de Colores

| Token CSS | Color | Hex | Uso |
|---|---|---|---|
| `--color-brand-blue` | Azul principal | `#2E7DD1` | Botones, links activos, acentos |
| `--color-swim` | Celeste agua | `#0EA5E9` | Natación, estadísticas |
| `--color-run` | Verde esmeralda | `#10B981` | Running, badges |
| `--color-accent-warm` | Ámbar | `#F59E0B` | Energía, badges de foto, "Popular" |
| `--color-accent-coral` | Coral | `#F97316` | CTAs de alto impacto |
| `--color-accent-teal` | Teal | `#14B8A6` | Frescura, gradientes |
| `--color-bg-warm` | Blanco azulado | `#FAFCFF` | Fondo body |
| `--color-bg-section` | Azul muy pálido | `#F0F7FF` | Secciones alternadas |
| `--color-text-primary` | Gris oscuro | `#1E293B` | Texto principal |
| `--color-text-secondary` | Gris medio | `#475569` | Texto secundario |

---

## 17. Patrones de Diseño Aplicados

1. **Singleton** (Prisma): Una sola instancia del cliente en desarrollo
2. **Composición de componentes**: `<Card>`, `<SectionTitle>`, `<Button>` se componen entre sí
3. **Data-driven rendering**: Todo el contenido viene de `constants.ts` → `.map()` en los componentes
4. **Separación de responsabilidades**: UI en `components/`, datos en `lib/`, tipos en `types/`
5. **Progressive enhancement**: La DB es opcional; la app funciona sin ella
6. **Mobile-first**: Todos los estilos parten de mobile y escalan con `sm:`, `md:`, `lg:`

---

*Documento generado el 14 de mayo de 2026.*
