// =============================================================================
// Club de Triatlón Thia — Tipos TypeScript Globales
// =============================================================================
// Define las interfaces y tipos compartidos en toda la aplicación.
// Mantener este archivo actualizado facilita la escalabilidad del proyecto.
// =============================================================================

/**
 * Representa una competencia o carrera de triatlón.
 * Se usa en la sección "Próximas Competencias" y en la página de Competencias.
 */
export interface Race {
  id: string;
  name: string;
  date: string;          // Formato ISO: "2026-07-15"
  location: string;
  type: RaceType;
  distance?: string;     // Ej: "Sprint", "Olímpico", "Ironman 70.3"
  description?: string;
  registrationUrl?: string;
  status: RaceStatus;
}

/** Tipos de competencia disponibles */
export type RaceType = 'triatlon' | 'duatlon' | 'acuatlon' | 'running' | 'ciclismo' | 'natacion';

/** Estado de una competencia */
export type RaceStatus = 'upcoming' | 'registration_open' | 'registration_closed' | 'finished';

/**
 * Testimonio de un miembro del club.
 * Se muestra en el carrusel de testimonios de la página de inicio.
 */
export interface Testimonial {
  id: string;
  name: string;
  role: string;          // Ej: "Miembro desde 2023", "Triatleta Elite"
  quote: string;
  imageUrl?: string;     // URL de la foto del miembro (opcional)
}

/**
 * Perfil de un entrenador del cuerpo técnico.
 * Se muestra en la página "Nosotros".
 */
export interface CoachProfile {
  id: string;
  name: string;
  role: string;          // Ej: "Entrenador de Natación"
  bio: string;
  imageUrl?: string;
  specialties: string[];
}

/**
 * Artículo de noticias/blog del club.
 * Se muestra en la sección de noticias del Home y en la futura página de blog.
 */
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;         // Resumen breve del artículo
  date: string;            // Formato ISO: "2026-05-10"
  category: 'resultados' | 'noticias' | 'entrenamiento' | 'comunidad';
  imagePlaceholder?: string;
}

/**
 * Plan de entrenamiento ofrecido por el club.
 * Se usa en la pagina "Planes" para mostrar precios, modalidad y beneficios.
 */
export interface TrainingPlan {
  id: string;
  category: 'running' | 'triatlon';
  name: string;
  price: string;
  modality: string;
  excerpt: string;
  features: string[];
  imageUrl: string;
  imageAlt: string;
  highlighted?: boolean;
}

/**
 * Datos del formulario de contacto.
 * Corresponde a los campos enviados al API Route /api/contact.
 */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Respuesta genérica de la API.
 * Se usa para tipificar las respuestas de los API Routes.
 */
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

/**
 * Enlace de navegación.
 * Usado en el Navbar y Footer para renderizar los links.
 */
export interface NavLink {
  label: string;
  href: string;
}

/**
 * Enlace de red social.
 * Usado en el Footer para mostrar íconos de redes sociales.
 */
export interface SocialLink {
  platform: 'instagram' | 'whatsapp';
  url: string;
  label: string;
}

// === FASE 2: Tipos E-commerce ===
// export interface SubscriptionPlan { ... }
// export interface PaymentIntent { ... }
