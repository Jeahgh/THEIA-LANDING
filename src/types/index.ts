// =============================================================================
// THEIA Triathlon Performance — tipos compartidos
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
 * Artículo de noticias/blog del club.
 * Se muestra en la sección de noticias del Home y en la futura página de blog.
 */
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;         // Resumen breve del artículo
  date: string;            // Formato ISO: "2026-05-10"
  updatedAt?: string;
  category: 'resultados' | 'noticias' | 'entrenamiento' | 'comunidad';
  imageUrl?: string;
  results?: NewsResult[];
}

export interface NewsResult {
  id: string;
  athleteName: string;
  position: string;
  distance: string;
  time: string;
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
  idealFor?: string;
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
