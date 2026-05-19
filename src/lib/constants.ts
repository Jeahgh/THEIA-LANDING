// =============================================================================
// THEIA Triathlon Performance — Datos Estáticos y Constantes
// =============================================================================

import type { Race, Testimonial, CoachProfile, NavLink, SocialLink, NewsArticle, TrainingPlan } from '@/types';

// ---------------------------------------------------------------------------
// Navegación
// ---------------------------------------------------------------------------
export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Planes', href: '/planes' },
  { label: 'Competencias', href: '/competencias' },
  { label: 'Contacto', href: '/contacto' },
];

// ---------------------------------------------------------------------------
// Redes Sociales
// ---------------------------------------------------------------------------
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'instagram', url: 'https://www.instagram.com/teamtheia/', label: 'Instagram' },
  { platform: 'whatsapp', url: 'https://wa.me/56982147660?text=Hola%21%20me%20gustaria%20inscribirme%2C', label: 'WhatsApp' },
];

// ---------------------------------------------------------------------------
// Slides del Hero Carousel
// ---------------------------------------------------------------------------
export const HERO_SLIDES = [
  {
    id: '1',
    title: 'Supera tus límites con Theia',
    subtitle: 'Nada. Pedalea. Corre. Únete al club de triatlón que te llevará más allá.',
    ctaText: 'Únete al club',
    ctaHref: '/contacto',
    imagePlaceholder: 'Sube tu foto de natación en aguas abiertas aquí',
  },
  {
    id: '2',
    title: 'Entrena con los mejores',
    subtitle: 'Cuerpo técnico profesional y programas para todos los niveles.',
    ctaText: 'Conoce al equipo',
    ctaHref: '/nosotros',
    imagePlaceholder: 'Sube tu foto de ciclismo grupal aquí',
  },
  {
    id: '3',
    title: 'Compite y supérate',
    subtitle: 'Participa en las competencias más importantes de la temporada.',
    ctaText: 'Ver competencias',
    ctaHref: '/competencias',
    imagePlaceholder: 'Sube tu foto de running en competencia aquí',
  },
  {
    id: '4',
    title: 'Comunidad que inspira',
    subtitle: 'Más que un club, somos una familia unida por el triatlón.',
    ctaText: 'Noticias',
    ctaHref: '#noticias',
    imagePlaceholder: 'Sube tu foto del equipo completo aquí',
  },
];

// ---------------------------------------------------------------------------
// Próximas Competencias
// ---------------------------------------------------------------------------
export const RACES: Race[] = [
  {
    id: '1',
    name: 'Triatlón Sprint Viña del Mar',
    date: '2026-07-15',
    location: 'Viña del Mar, Chile',
    type: 'triatlon',
    distance: 'Sprint',
    description: 'Triatlón sprint con salida desde la playa de Reñaca. Recorrido urbano de ciclismo y running por la costanera.',
    status: 'registration_open',
  },
  {
    id: '2',
    name: 'Ironman 70.3 Pucón',
    date: '2026-09-20',
    location: 'Pucón, Chile',
    type: 'triatlon',
    distance: 'Ironman 70.3',
    description: 'Medio Ironman con natación en el Lago Villarrica, ciclismo por la ruta volcánica y running por el centro.',
    status: 'upcoming',
  },
  {
    id: '3',
    name: 'Duatlón Parque Metropolitano',
    date: '2026-08-10',
    location: 'Santiago, Chile',
    type: 'duatlon',
    distance: 'Estándar',
    description: 'Duatlón por los senderos del Parque Metropolitano de Santiago. Running y ciclismo de montaña.',
    status: 'registration_open',
  },
  {
    id: '4',
    name: 'Acuatlón Laguna San Rafael',
    date: '2026-10-05',
    location: 'Aysén, Chile',
    type: 'acuatlon',
    distance: 'Estándar',
    description: 'Acuatlón en las aguas cristalinas de la Laguna San Rafael. Una experiencia única en la Patagonia.',
    status: 'upcoming',
  },
  {
    id: '5',
    name: 'Maratón de Santiago',
    date: '2026-11-02',
    location: 'Santiago, Chile',
    type: 'running',
    distance: '42K / 21K / 10K',
    description: 'Maratón internacional de Santiago. Recorrido por los principales puntos de la capital.',
    status: 'upcoming',
  },
  {
    id: '6',
    name: 'Triatlón Olímpico Valparaíso',
    date: '2026-12-08',
    location: 'Valparaíso, Chile',
    type: 'triatlon',
    distance: 'Olímpico',
    description: 'Triatlón olímpico con inicio en la playa de Torpederas y recorrido por los cerros de Valparaíso.',
    status: 'upcoming',
  },
];

// ---------------------------------------------------------------------------
// Noticias / Blog
// ---------------------------------------------------------------------------
export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: '1',
    title: 'Oro en los Juegos Suramericanos de la Juventud',
    excerpt: 'Nuestro atleta representó a Chile y logró la medalla de oro en triatlón sprint en los Juegos Suramericanos Panamá 2026. Un orgullo para toda la comunidad Theia.',
    date: '2026-05-10',
    category: 'resultados',
    imagePlaceholder: 'Sube foto del atleta con la medalla aquí',
  },
  {
    id: '2',
    title: 'Nuevos horarios de entrenamiento temporada invierno',
    excerpt: 'A partir de junio se actualizan los horarios de natación y running. Consulta los nuevos bloques y planifica tu semana de entrenamiento.',
    date: '2026-05-08',
    category: 'entrenamiento',
    imagePlaceholder: 'Sube foto de entrenamiento en piscina aquí',
  },
  {
    id: '3',
    title: 'Theia presente en Ironman 70.3 Puerto Varas',
    excerpt: 'Un grupo de 12 atletas de Theia participó en el Ironman 70.3 de Puerto Varas con excelentes resultados. Conoce los tiempos y experiencias.',
    date: '2026-04-28',
    category: 'resultados',
    imagePlaceholder: 'Sube foto del equipo en la línea de meta aquí',
  },
  {
    id: '4',
    title: 'Jornada de integración: Bienvenida nuevos miembros',
    excerpt: 'Este sábado recibimos a los nuevos integrantes del club con una jornada de natación, asado y mucha buena onda. ¡Bienvenidos a la familia Theia!',
    date: '2026-04-20',
    category: 'comunidad',
    imagePlaceholder: 'Sube foto de la jornada de integración aquí',
  },
];

// ---------------------------------------------------------------------------
// Planes de Entrenamiento
// ---------------------------------------------------------------------------
export const TRAINING_PLANS: TrainingPlan[] = [
  {
    id: 'running-distancia',
    category: 'running',
    name: 'Plan Running a distancia',
    price: '$55.000',
    modality: 'Online',
    excerpt: 'Planificacion mensual con objetivos A, B y C, pensada para deportistas que entrenan con autonomia y seguimiento remoto.',
    features: [
      'Macro, meso y microciclos personalizados',
      'Carreras objetivo individualizadas',
      'Seguimiento semanal por canales digitales',
      'Ajustes segun carga, sensaciones y disponibilidad',
    ],
    imageUrl: '/images/atletas-collage.jpg',
    imageAlt: 'Atletas Theia entrenando y compitiendo',
  },
  {
    id: 'running-presencial',
    category: 'running',
    name: 'Plan Running presencial',
    price: '$75.000',
    modality: 'Presencial',
    excerpt: 'Entrenamiento de running con planificacion mensual y sesiones presenciales para mejorar tecnica, ritmo y confianza.',
    features: [
      'Planificacion mensual estructurada',
      'Sesiones grupales guiadas por entrenador',
      'Trabajo de tecnica, series y fondos',
      'Feedback presencial en entrenamientos clave',
    ],
    imageUrl: '/images/equipo-running.jpg',
    imageAlt: 'Equipo Theia reunido despues de una carrera',
  },
  {
    id: 'running-plus',
    category: 'running',
    name: 'Plan Running PLUS',
    price: '$105.000',
    modality: 'Mixto',
    excerpt: 'Acompanamiento mas cercano para runners que preparan carreras exigentes y necesitan control fino de sus semanas.',
    features: [
      'Planificacion personalizada con revision semanal',
      'Sesiones presenciales y pauta remota',
      'Estrategia de carrera y ritmos objetivo',
      'Control de carga y recuperacion',
    ],
    imageUrl: '/images/equipo-jersey.png',
    imageAlt: 'Jersey oficial Theia para entrenamientos y competencias',
    highlighted: true,
  },
  {
    id: 'running-pro',
    category: 'running',
    name: 'Plan Running Pro',
    price: '$145.000',
    modality: 'Alto rendimiento',
    excerpt: 'Plan avanzado para deportistas que buscan rendimiento competitivo con seguimiento detallado del proceso.',
    features: [
      'Periodizacion avanzada por objetivos',
      'Analisis de metricas y zonas de entrenamiento',
      'Ajustes frecuentes segun rendimiento',
      'Preparacion integral para competencia',
    ],
    imageUrl: '/images/atletas-collage.jpg',
    imageAlt: 'Atletas Theia en accion durante entrenamientos y competencias',
  },
  {
    id: 'triatlon-distancia',
    category: 'triatlon',
    name: 'Plan Triatlon a distancia',
    price: '$70.000',
    modality: 'Online',
    excerpt: 'Planificacion remota de natacion, ciclismo y running para objetivos Sprint, Olimpico o media distancia.',
    features: [
      'Macro, meso y microciclos por disciplina',
      'Distribucion semanal de cargas',
      'Carreras objetivo A, B y C',
      'Seguimiento remoto del cumplimiento',
    ],
    imageUrl: '/images/equipo-jersey.png',
    imageAlt: 'Jersey oficial Theia para entrenamiento de triatlon',
  },
  {
    id: 'triatlon-presencial',
    category: 'triatlon',
    name: 'Plan Triatlon presencial',
    price: '$100.000',
    modality: 'Presencial',
    excerpt: 'Entrenamiento presencial con planificacion de las tres disciplinas y acompanamiento tecnico en sesiones clave.',
    features: [
      'Plan mensual enfocado en objetivos A, B y C',
      'Sesiones presenciales por disciplina',
      'Correccion tecnica y trabajo grupal',
      'Preparacion especifica para competencia',
    ],
    imageUrl: '/images/equipo-running.jpg',
    imageAlt: 'Equipo Theia participando en una jornada deportiva',
  },
  {
    id: 'triatlon-plus',
    category: 'triatlon',
    name: 'Plan Triatlon PLUS',
    price: '$140.000',
    modality: 'Mixto',
    excerpt: 'Plan completo para triatletas que necesitan mas seguimiento, mejor coordinacion semanal y foco competitivo.',
    features: [
      'Planificacion integrada de tres disciplinas',
      'Revision semanal de sesiones y cargas',
      'Estrategia de transiciones y carrera',
      'Soporte para calendario competitivo',
    ],
    imageUrl: '/images/equipo-jersey.png',
    imageAlt: 'Jersey oficial Theia para entrenamientos de triatlon',
    highlighted: true,
  },
  {
    id: 'triatlon-pro',
    category: 'triatlon',
    name: 'Plan Triatlon Pro',
    price: '$175.000',
    modality: 'Alto rendimiento',
    excerpt: 'Acompanamiento avanzado para triatletas con metas exigentes, volumen alto y competencias prioritarias.',
    features: [
      'Periodizacion avanzada de temporada',
      'Analisis de rendimiento por disciplina',
      'Ajustes recurrentes segun fatiga y progreso',
      'Plan de competencia y puesta a punto',
    ],
    imageUrl: '/images/atletas-collage.jpg',
    imageAlt: 'Collage de atletas Theia en diferentes disciplinas',
  },
];

// ---------------------------------------------------------------------------
// Testimonios de Miembros
// ---------------------------------------------------------------------------
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Carolina Reyes',
    role: 'Miembro desde 2023',
    quote: 'Theia me enseñó que el triatlón no se trata solo de velocidad, sino de constancia y comunidad. Cada entrenamiento es una oportunidad de superarme.',
  },
  {
    id: '2',
    name: 'Andrés Molina',
    role: 'Triatleta Sprint',
    quote: 'Llegué sin saber nadar y hoy he completado 3 triatlones. El cuerpo técnico de Theia te acompaña en cada paso del camino.',
  },
  {
    id: '3',
    name: 'Valentina Lagos',
    role: 'Miembro desde 2022',
    quote: 'Lo mejor de Theia es la energía del grupo. Cuando crees que no puedes más, siempre hay alguien que te motiva a seguir adelante.',
  },
  {
    id: '4',
    name: 'Martín Soto',
    role: 'Ironman 70.3 Finisher',
    quote: 'Gracias a la preparación con Theia logré mi primer Ironman 70.3. El plan de entrenamiento y el apoyo del equipo fueron fundamentales.',
  },
];

// ---------------------------------------------------------------------------
// Cuerpo Técnico
// ---------------------------------------------------------------------------
export const COACHES: CoachProfile[] = [
  {
    id: '1',
    name: 'Roberto Espinoza',
    role: 'Director Técnico',
    bio: 'Ex-triatleta profesional con más de 15 años de experiencia en entrenamiento deportivo. Certificado por World Triathlon.',
    specialties: ['Planificación deportiva', 'Triatlón de larga distancia', 'Preparación física'],
  },
  {
    id: '2',
    name: 'María José Fuentes',
    role: 'Entrenadora de Natación',
    bio: 'Nadadora federada y técnica en natación deportiva. Especialista en corrección de técnica y eficiencia en aguas abiertas.',
    specialties: ['Natación técnica', 'Aguas abiertas', 'Corrección biomecánica'],
  },
  {
    id: '3',
    name: 'Felipe Contreras',
    role: 'Entrenador de Ciclismo',
    bio: 'Ciclista profesional retirado, especialista en potencia y entrenamiento con medidor de watts. Coach certificado TrainingPeaks.',
    specialties: ['Ciclismo de ruta', 'Entrenamiento con potencia', 'Biomecánica de la bici'],
  },
  {
    id: '4',
    name: 'Daniela Morales',
    role: 'Entrenadora de Running',
    bio: 'Maratonista y coach de running con experiencia en preparación de atletas desde 5K hasta Ultra Trail.',
    specialties: ['Running de distancia', 'Trail running', 'Prevención de lesiones'],
  },
];

// ---------------------------------------------------------------------------
// Niveles de Entrenamiento (sin emojis)
// ---------------------------------------------------------------------------
export const TRAINING_LEVELS = [
  {
    id: 'beginner',
    name: 'Iniciación',
    description: 'Para quienes dan sus primeros pasos en el triatlón. Aprende las bases de las 3 disciplinas en un ambiente amigable.',
    features: ['3 sesiones semanales', 'Técnica básica', 'Sin experiencia previa'],
  },
  {
    id: 'intermediate',
    name: 'Intermedio',
    description: 'Para deportistas con experiencia que buscan mejorar sus tiempos y prepararse para competencias Sprint y Olímpico.',
    features: ['5 sesiones semanales', 'Plan personalizado', 'Preparación de carreras'],
  },
  {
    id: 'advanced',
    name: 'Avanzado',
    description: 'Para triatletas experimentados que entrenan para Ironman 70.3, Ironman y competencias internacionales.',
    features: ['6+ sesiones semanales', 'Periodización avanzada', 'Análisis de rendimiento'],
  },
];

// ---------------------------------------------------------------------------
// Información del Club
// ---------------------------------------------------------------------------
export const CLUB_INFO = {
  name: 'Theia Triathlon Performance',
  shortName: 'Theia',
  email: 'contacto@theiatri.cl',
  phone: '+56 9 8214 7660',
  address: 'Santiago, Chile',
  foundedYear: 2020,
  motto: 'Supera tus límites',
  description: 'Somos un club de triatlón comprometido con el desarrollo deportivo y personal de nuestros miembros. Desde principiantes hasta atletas de élite, en Theia encontrarás un espacio para crecer, competir y disfrutar del deporte.',
  mission: 'Fomentar la práctica del triatlón como herramienta de desarrollo integral, formando deportistas con valores de disciplina, perseverancia y compañerismo.',
  vision: 'Ser el club de triatlón referente en Chile, reconocido por la formación de atletas integrales y por construir una comunidad deportiva inclusiva y de excelencia.',
  history: 'Theia Triathlon Performance nació con un grupo de amigos apasionados por el deporte multidisciplinario. Lo que comenzó como sesiones de entrenamiento informales se transformó rápidamente en una comunidad organizada con cuerpo técnico profesional, programas de entrenamiento estructurados y participación activa en competencias nacionales e internacionales. Hoy somos una comunidad de triatletas activos, desde principiantes que descubren el deporte hasta atletas que compiten en circuitos internacionales como Ironman.',
};
