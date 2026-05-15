# THEIA Triathlon Performance — Contexto del Proyecto

## Sobre el Club
- **Nombre oficial**: THEIA Triathlon Performance (el nombre es "Theia", NO "Thia")
- **Tipo**: Club de triatlón
- **Ubicación**: Chile
- **Branding**: Logo circular azul visible en los jerseys del equipo. El texto "THEIA" se escribe en mayúsculas con tracking amplio
- **Tagline**: "Triathlon Performance"

## Decisiones de Diseño
- **Paleta**: Fondo BLANCO puro, azul celeste/claro como color principal, acentos cálidos. La página debe sentirse luminosa, cálida y acogedora — NO futurista ni minimalista frío
- **Navbar**: Fondo AZUL con gradiente sutil y backdrop-blur. Texto y links en blanco. Botón CTA usa variante "white"
- **Ancho**: Usar TODO el ancho de la página, que no quede espacio desperdiciado
- **Tipografía**: Montserrat (headings, deportiva con carácter) + Nunito (body, redondeada y cálida). NO usar fuentes genéricas
- **Íconos**: NO usar emojis genéricos (🏊🚴🏃). Usar íconos SVG estilizados o simplemente texto descriptivo
- **Colores de texto**: Las letras deben destacar bien sobre fondos claros. Buen contraste. Secciones con fondo azul usan texto blanco
- **Imágenes**: Se usan placeholders `<ImagePlaceholder>` con instrucciones descriptivas para que el cliente inyecte sus propias fotos después
- **Responsive**: Mobile-first design, responsivo para todos los dispositivos
- **Estilo general**: Cálido, comunitario, que transmita energía positiva. NO oscuro, NO minimalista extremo

## Secciones del Home
1. Hero carousel a pantalla completa (1 botón por slide: Únete al club, Conoce al equipo, Ver competencias, Noticias)
2. Próximas competencias (grid, fondo AZUL con texto blanco)
3. **Noticias/Blog** — Sección tipo blog con título, descripción e imagen. Cada noticia es una card editable
4. Testimonios de miembros

**NOTA**: La sección "Somos Theia" fue eliminada del home

## Stack Tecnológico
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Estilos**: Tailwind CSS v4 (CSS-first configuration, sin tailwind.config.ts)
- **ORM**: Prisma con PostgreSQL (schemas creados, DB no conectada aún)
- **Fuentes**: Google Fonts via `next/font` (Montserrat + Nunito)

## Estructura de Páginas
1. **Home** (`/`): Hero, competencias (fondo azul), noticias, testimonios
2. **Nosotros** (`/nosotros`): Historia, misión, visión, cuerpo técnico
3. **Competencias** (`/competencias`): Calendario de eventos agrupados por estado
4. **Contacto** (`/contacto`): Formulario funcional + info de contacto + redes sociales

## Escalabilidad (Fase 2)
- Pasarela de pagos (Webpay/Stripe) para cobro de mensualidades
- Modelos de DB preparados: Plan, Subscription, Payment (comentados en schema.prisma)
- La estructura de carpetas y componentes está diseñada para soportar e-commerce

## Notas Importantes
- El usuario es estudiante de ingeniería y quiere aprender del código → mantener comentarios claros
- Clean code con TypeScript estricto y componentes modulares
- Todos los textos de la interfaz están en español
