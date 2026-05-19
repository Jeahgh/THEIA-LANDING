import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no esta configurada.');
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const plans = [
  {
    slug: 'running-distancia',
    category: 'RUNNING',
    name: 'Plan Running a distancia',
    price: 55000,
    modality: 'Online',
    excerpt: 'Planificacion mensual con objetivos A, B y C, pensada para deportistas que entrenan con autonomia y seguimiento remoto.',
    imageUrl: '/images/atletas-collage.jpg',
    imageAlt: 'Atletas Theia entrenando y compitiendo',
    sortOrder: 1,
    features: ['Macro, meso y microciclos personalizados', 'Carreras objetivo individualizadas', 'Seguimiento semanal por canales digitales', 'Ajustes segun carga, sensaciones y disponibilidad'],
  },
  {
    slug: 'running-presencial',
    category: 'RUNNING',
    name: 'Plan Running presencial',
    price: 75000,
    modality: 'Presencial',
    excerpt: 'Entrenamiento de running con planificacion mensual y sesiones presenciales para mejorar tecnica, ritmo y confianza.',
    imageUrl: '/images/equipo-running.jpg',
    imageAlt: 'Equipo Theia reunido despues de una carrera',
    sortOrder: 2,
    features: ['Planificacion mensual estructurada', 'Sesiones grupales guiadas por entrenador', 'Trabajo de tecnica, series y fondos', 'Feedback presencial en entrenamientos clave'],
  },
  {
    slug: 'running-plus',
    category: 'RUNNING',
    name: 'Plan Running PLUS',
    price: 105000,
    modality: 'Mixto',
    excerpt: 'Acompanamiento mas cercano para runners que preparan carreras exigentes y necesitan control fino de sus semanas.',
    imageUrl: '/images/equipo-jersey.png',
    imageAlt: 'Jersey oficial Theia para entrenamientos y competencias',
    sortOrder: 3,
    features: ['Planificacion personalizada con revision semanal', 'Sesiones presenciales y pauta remota', 'Estrategia de carrera y ritmos objetivo', 'Control de carga y recuperacion'],
  },
  {
    slug: 'running-pro',
    category: 'RUNNING',
    name: 'Plan Running Pro',
    price: 145000,
    modality: 'Alto rendimiento',
    excerpt: 'Plan avanzado para deportistas que buscan rendimiento competitivo con seguimiento detallado del proceso.',
    imageUrl: '/images/atletas-collage.jpg',
    imageAlt: 'Atletas Theia en accion durante entrenamientos y competencias',
    sortOrder: 4,
    features: ['Periodizacion avanzada por objetivos', 'Analisis de metricas y zonas de entrenamiento', 'Ajustes frecuentes segun rendimiento', 'Preparacion integral para competencia'],
  },
  {
    slug: 'triatlon-distancia',
    category: 'TRIATLON',
    name: 'Plan Triatlon a distancia',
    price: 70000,
    modality: 'Online',
    excerpt: 'Planificacion remota de natacion, ciclismo y running para objetivos Sprint, Olimpico o media distancia.',
    imageUrl: '/images/equipo-jersey.png',
    imageAlt: 'Jersey oficial Theia para entrenamiento de triatlon',
    sortOrder: 1,
    features: ['Macro, meso y microciclos por disciplina', 'Distribucion semanal de cargas', 'Carreras objetivo A, B y C', 'Seguimiento remoto del cumplimiento'],
  },
  {
    slug: 'triatlon-presencial',
    category: 'TRIATLON',
    name: 'Plan Triatlon presencial',
    price: 100000,
    modality: 'Presencial',
    excerpt: 'Entrenamiento presencial con planificacion de las tres disciplinas y acompanamiento tecnico en sesiones clave.',
    imageUrl: '/images/equipo-running.jpg',
    imageAlt: 'Equipo Theia participando en una jornada deportiva',
    sortOrder: 2,
    features: ['Plan mensual enfocado en objetivos A, B y C', 'Sesiones presenciales por disciplina', 'Correccion tecnica y trabajo grupal', 'Preparacion especifica para competencia'],
  },
  {
    slug: 'triatlon-plus',
    category: 'TRIATLON',
    name: 'Plan Triatlon PLUS',
    price: 140000,
    modality: 'Mixto',
    excerpt: 'Plan completo para triatletas que necesitan mas seguimiento, mejor coordinacion semanal y foco competitivo.',
    imageUrl: '/images/equipo-jersey.png',
    imageAlt: 'Jersey oficial Theia para entrenamientos de triatlon',
    sortOrder: 3,
    features: ['Planificacion integrada de tres disciplinas', 'Revision semanal de sesiones y cargas', 'Estrategia de transiciones y carrera', 'Soporte para calendario competitivo'],
  },
  {
    slug: 'triatlon-pro',
    category: 'TRIATLON',
    name: 'Plan Triatlon Pro',
    price: 175000,
    modality: 'Alto rendimiento',
    excerpt: 'Acompanamiento avanzado para triatletas con metas exigentes, volumen alto y competencias prioritarias.',
    imageUrl: '/images/atletas-collage.jpg',
    imageAlt: 'Collage de atletas Theia en diferentes disciplinas',
    sortOrder: 4,
    features: ['Periodizacion avanzada de temporada', 'Analisis de rendimiento por disciplina', 'Ajustes recurrentes segun fatiga y progreso', 'Plan de competencia y puesta a punto'],
  },
];

const news = [
  {
    title: 'Oro en los Juegos Suramericanos de la Juventud',
    excerpt: 'Nuestro atleta represento a Chile y logro la medalla de oro en triatlon sprint. Un orgullo para toda la comunidad Theia.',
    date: new Date('2026-05-10T12:00:00'),
    category: 'RESULTADOS',
    imageUrl: '/images/equipo-running.jpg',
    sortOrder: 1,
  },
  {
    title: 'Nuevos horarios de entrenamiento temporada invierno',
    excerpt: 'A partir de junio se actualizan los horarios de natacion y running. Consulta los nuevos bloques y planifica tu semana.',
    date: new Date('2026-05-08T12:00:00'),
    category: 'ENTRENAMIENTO',
    imageUrl: '/images/atletas-collage.jpg',
    sortOrder: 2,
  },
];

for (const plan of plans) {
  const { features, ...planData } = plan;
  const savedPlan = await prisma.plan.upsert({
    where: { slug: plan.slug },
    update: planData,
    create: planData,
  });

  await prisma.planFeature.deleteMany({ where: { planId: savedPlan.id } });
  await prisma.planFeature.createMany({
    data: features.map((text, index) => ({
      planId: savedPlan.id,
      text,
      sortOrder: index + 1,
    })),
  });
}

for (const item of news) {
  await prisma.newsPost.upsert({
    where: { id: `seed-${item.sortOrder}` },
    update: item,
    create: { id: `seed-${item.sortOrder}`, ...item },
  });
}

await prisma.$disconnect();
console.log('Seed completado.');
