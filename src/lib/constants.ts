import type { NavLink, SocialLink } from '@/types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Planes', href: '/planes' },
  { label: 'Competencias', href: '/competencias' },
  { label: 'Noticias', href: '/noticias' },
  { label: 'Contacto', href: '/contacto' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'instagram',
    url: 'https://www.instagram.com/teamtheia/',
    label: 'Instagram',
  },
  {
    platform: 'whatsapp',
    url: 'https://wa.me/56982147660?text=Hola%21%20me%20gustaria%20inscribirme%2C',
    label: 'WhatsApp',
  },
];

export const CLUB_INFO = {
  name: 'Theia Triathlon Performance',
  shortName: 'Theia',
  email: 'contacto@theiasport.cl',
  financeEmail: 'finanzas@theiasport.cl',
  administrationEmail: 'administracion@theiasport.cl',
  phone: '+56 9 8214 7660',
  address: 'Santiago, Chile',
  foundedYear: 2020,
  motto: 'Supera tus límites',
  description:
    'Somos un club de triatlón comprometido con el desarrollo deportivo y personal de nuestros miembros. Desde principiantes hasta atletas de élite, en Theia encontrarás un espacio para crecer, competir y disfrutar del deporte.',
  mission:
    'Fomentar la práctica del triatlón como herramienta de desarrollo integral, formando deportistas con valores de disciplina, perseverancia y compañerismo.',
  vision:
    'Ser el club de triatlón referente en Chile, reconocido por la formación de atletas integrales y por construir una comunidad deportiva inclusiva y de excelencia.',
  history:
    'Theia Triathlon Performance nació con un grupo de amigos apasionados por el deporte multidisciplinario. Lo que comenzó como sesiones de entrenamiento informales se transformó rápidamente en una comunidad organizada con cuerpo técnico profesional, programas de entrenamiento estructurados y participación activa en competencias nacionales e internacionales. Hoy somos una comunidad de triatletas activos, desde principiantes que descubren el deporte hasta atletas que compiten en circuitos internacionales como Ironman.',
} as const;
