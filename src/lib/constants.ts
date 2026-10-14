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
    'Acercar a las personas al deporte y acompañarlas en su desarrollo mediante un entrenamiento personalizado, basado en la ciencia y adaptado a su realidad. En THEIA SPORT ayudamos a cada deportista a disfrutar del proceso, mejorar su rendimiento y construir hábitos duraderos, fortaleciendo su confianza y autonomía dentro de una comunidad que comparte el compromiso de superarse.',
  vision:
    'Ser un referente en entrenamiento de resistencia en Chile, reconocido por la calidad de nuestros procesos y la cercanía con nuestros deportistas. Aspiramos a que personas con distintos niveles y objetivos encuentren en THEIA SPORT una comunidad donde crecer, alcanzar nuevos desafíos y hacer del deporte una parte duradera de sus vidas.',
  history: [
    'THEIA SPORT nace de una filosofía que entiende el deporte como una forma de transformar la vida de las personas. Para nuestro fundador, Miguel Ángel Brito, esa transformación es parte de su propia historia.',
    'Después de años entrenando, compitiendo y acompañando a otros deportistas, Miguel Ángel encontró en el deporte herramientas para afrontar desafíos, construir disciplina y descubrir sus capacidades. THEIA nace de su deseo de compartir ese aprendizaje y devolver, como entrenador, parte de lo que el deporte le ha entregado.',
    'Desde el comienzo, ponemos a la persona en el centro. Escuchamos su historia, comprendemos su realidad y acompañamos sus objetivos, integrando la ciencia del entrenamiento con la vida cotidiana. Así hemos construido una comunidad de running y triatlón donde conviven quienes comienzan y quienes buscan nuevos desafíos competitivos.',
    'Nuestra historia sigue escribiéndose en cada entrenamiento, en cada competencia y en la confianza que cada deportista va construyendo. Nos une la alegría de vernos crecer y descubrir, juntos, lo que podemos lograr.',
  ].join('\n\n'),
} as const;
