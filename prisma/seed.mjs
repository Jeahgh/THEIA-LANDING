import nextEnv from '@next/env';
import prismaClientPkg from '../src/generated/prisma/index.js';
import { PrismaPg } from '@prisma/adapter-pg';

const { loadEnvConfig } = nextEnv;
const { PrismaClient } = prismaClientPkg;

loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no esta configurada.');
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const plans = [
  {
    slug: 'running-distancia',
    category: 'RUNNING',
    name: 'THEIA RUN A DISTANCIA',
    price: 60000,
    modality: 'A distancia',
    excerpt: 'Plan personalizado para corredores que entrenan de forma remota y quieren estructura profesional, ritmos claros y una ruta concreta para progresar.',
    idealFor: 'Corredores autonomos que necesitan estructura profesional y entrenan de forma remota.',
    imageUrl: '/images/atletas-collage.jpg',
    imageAlt: 'Atletas Theia entrenando y compitiendo',
    sortOrder: 1,
    features: ['Planificacion personalizada en TrainingPeaks', 'Proyeccion deportiva a corto plazo', 'Educacion de ritmos y zonas de entrenamiento', 'Fortalecimiento con 2 sesiones semanales'],
  },
  {
    slug: 'running-presencial',
    category: 'RUNNING',
    name: 'THEIA RUN BASE',
    price: 75000,
    modality: 'Base',
    excerpt: 'Acompanamiento para corredores que quieren avanzar con feedback constante, evaluaciones periodicas y la energia del entrenamiento grupal.',
    idealFor: 'Corredores en desarrollo que quieren feedback constante, evaluaciones y equipo.',
    imageUrl: '/images/equipo-running.jpg',
    imageAlt: 'Equipo Theia reunido despues de una carrera',
    sortOrder: 2,
    features: ['Todo lo incluido en RUN A DISTANCIA', 'Planificacion deportiva a corto y mediano plazo', 'Feedback semanal', 'Entrenamientos grupales y estrategia basica de carrera'],
  },
  {
    slug: 'running-plus',
    category: 'RUNNING',
    name: 'THEIA RUN PERFORMANCE',
    price: 100000,
    modality: 'Performance',
    excerpt: 'Orientado a corredores con objetivos competitivos, busqueda de marca personal y necesidad de ajustes finos segun la evolucion del rendimiento.',
    idealFor: 'Corredores que buscan marca personal, plan de temporada y ajustes finos de rendimiento.',
    imageUrl: '/images/equipo-jersey.png',
    imageAlt: 'Jersey oficial Theia para entrenamientos y competencias',
    sortOrder: 3,
    features: ['Todo lo incluido en RUN BASE', 'Proyeccion de temporada y competencias objetivo', 'Entrenamiento grupal en pista y running grupal', 'Evaluacion inicial de lactato y zonas de entrenamiento'],
  },
  {
    slug: 'running-pro',
    category: 'RUNNING',
    name: 'THEIA PRO',
    price: 120000,
    modality: 'Pro',
    excerpt: 'Acompanamiento integral para corredores con objetivos competitivos avanzados, temporada planificada y seguimiento completamente individualizado.',
    idealFor: 'Corredores con objetivos competitivos avanzados y seguimiento completamente individualizado.',
    imageUrl: '/images/atletas-collage.jpg',
    imageAlt: 'Atletas Theia en accion durante entrenamientos y competencias',
    sortOrder: 4,
    features: ['Todo lo incluido en RUN PERFORMANCE', 'Planificacion integral de temporada', 'Monitoreo fisiologico con pruebas de lactato', 'Control de carga, fatiga y recuperacion'],
  },
  {
    slug: 'triatlon-distancia',
    category: 'TRIATLON',
    name: 'THEIA TRI A DISTANCIA',
    price: 75000,
    modality: 'A distancia',
    excerpt: 'Plan remoto para triatletas que buscan ordenar sus tres disciplinas con TrainingPeaks, preparacion fisica y seguimiento profesional.',
    idealFor: 'Triatletas autonomos que quieren ordenar natacion, ciclismo y running con seguimiento profesional.',
    imageUrl: '/images/equipo-jersey.png',
    imageAlt: 'Jersey oficial Theia para entrenamiento de triatlon',
    sortOrder: 1,
    features: ['Planificacion personalizada en TrainingPeaks', 'Proyeccion deportiva a corto plazo', 'Preparacion fisica', 'Educacion de ritmos, zonas e intensidades'],
  },
  {
    slug: 'triatlon-presencial',
    category: 'TRIATLON',
    name: 'THEIA TRI BASE',
    price: 100000,
    modality: 'Base',
    excerpt: 'Para triatletas que quieren mas acompanamiento, integrarse al equipo y trabajar pacing, transiciones y planificacion de natacion.',
    idealFor: 'Triatletas que quieren mas acompanamiento, equipo y trabajo tecnico de carrera.',
    imageUrl: '/images/equipo-running.jpg',
    imageAlt: 'Equipo Theia participando en una jornada deportiva',
    sortOrder: 2,
    features: ['Todo lo incluido en TRI A DISTANCIA', 'Planificacion deportiva a corto y mediano plazo', 'Feedback quincenal y evaluaciones periodicas', 'Entrenamientos grupales y trabajo de transiciones'],
  },
  {
    slug: 'triatlon-plus',
    category: 'TRIATLON',
    name: 'THEIA TRI PERFORMANCE',
    price: 130000,
    modality: 'Performance',
    excerpt: 'Plan para deportistas con objetivos competitivos, proyeccion de temporada y mejora sostenida del rendimiento en las tres disciplinas.',
    idealFor: 'Triatletas con objetivos competitivos que buscan mejorar rendimiento en las tres disciplinas.',
    imageUrl: '/images/equipo-jersey.png',
    imageAlt: 'Jersey oficial Theia para entrenamientos de triatlon',
    sortOrder: 3,
    features: ['Todo lo incluido en TRI BASE', 'Running grupal, pista atletica y ciclismo grupal', 'Evaluacion tecnica de natacion', 'Evaluacion inicial de lactato y ajuste de intensidades'],
  },
  {
    slug: 'triatlon-pro',
    category: 'TRIATLON',
    name: 'THEIA PRO',
    price: 175000,
    modality: 'Pro',
    excerpt: 'Acompanamiento avanzado para triatletas con metas exigentes, estrategia anual de competencias y monitoreo integral del proceso deportivo.',
    idealFor: 'Triatletas con metas exigentes, calendario anual y necesidad de monitoreo integral.',
    imageUrl: '/images/atletas-collage.jpg',
    imageAlt: 'Collage de atletas Theia en diferentes disciplinas',
    sortOrder: 4,
    features: ['Todo lo incluido en TRI PERFORMANCE', 'Supervision integral de las tres disciplinas', 'Monitoreo fisiologico, FTP y analisis avanzado', 'Control de carga, fatiga y recuperacion'],
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
