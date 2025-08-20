import type { User, Course, CompletedCourse } from "@/types";

export const user: User = {
  id: '1',
  email: 'alex.doe@lead.ac.cr',
  name: 'Alex Doe',
  major: 'Ingeniería en Ciencia de Datos', // The leading '#' was removed in UserInfoCard for display
  completedCredits: 114,
  totalCredits: 143,      // créditos totales de la carrera
  gpa: 3.7,               // promedio general
  currentTerm: 'Mayo 2025' // cuatrimestre en el que está actualmente
};

// ejemplo: sin cursos completados aún
export const completedCourses: CompletedCourse[] = [
  { code: 'TCNT0001', name: 'Destrezas para la comunicación', credits: 3, grade: 'A' },
  { code: 'TCNT0002', name: 'Introducción a la administración de negocios', credits: 3, grade: 'A' },
  { code: 'TCNT0004', name: 'Metodologías de investigación', credits: 4, grade: 'A' },
  { code: 'TTCT0001', name: 'Introducción a la programación', credits: 3, grade: 'A' },
  { code: 'TTCT0014', name: 'Introducción a la ciencia de datos', credits: 3, grade: 'A' },

  { code: 'TCNT0003', name: 'Filosofía clásica y contemporánea', credits: 3, grade: 'A' },
  { code: 'TTCT0023', name: 'Matemática para Ciencia de Datos', credits: 4, grade: 'A' },
  { code: 'TCNT0005', name: 'Análisis de la realidad nacional e internacional', credits: 3, grade: 'A' },
  { code: 'TCNT0009', name: 'Técnicas de negociación', credits: 3, grade: 'A' },

  { code: 'TTCT0003', name: 'Cálculo para Ciencia de Datos', credits: 4, grade: 'A' },
  { code: 'TCNT0008', name: 'Ética Profesional', credits: 3, grade: 'A' },
  { code: 'TCNT0006', name: 'Innovación y Creatividad', credits: 3, grade: 'A' },
  { code: 'TCNT0007', name: 'Liderazgo y Cambio', credits: 3, grade: 'A' },

  { code: 'TTCT0005', name: 'Álgebra lineal y ecuaciones diferenciales', credits: 4, grade: 'A' },
  { code: 'TTCT0004', name: 'Programación', credits: 3, grade: 'A' },
  { code: 'TTCT0006', name: 'Administración de proyectos', credits: 3, grade: 'A' },
  { code: 'BBCC0001', name: 'Machine Learning Operations', credits: 3, grade: 'A' },

  { code: 'TCNT0011', name: 'Probabilidad y Estadística I', credits: 4, grade: 'A' },
  { code: 'TTCT0007', name: 'Estructura de datos', credits: 4, grade: 'A' },
  { code: 'TTCT0009', name: 'Bases de datos', credits: 4, grade: 'A' },
  { code: 'BBCD0001', name: 'Optativa I Ciencia de Datos', credits: 3, grade: 'A' },

  { code: 'TCNT0012', name: 'Minería de datos I', credits: 4, grade: 'A' },
  { code: 'TTCT0010', name: 'Modelado matemático', credits: 3, grade: 'A' },
  { code: 'TTCT0011', name: 'Paradigmas de programación', credits: 4, grade: 'A' },
  { code: 'TTCT0012', name: 'Programación Web', credits: 3, grade: 'A' },

  { code: 'TCNT0010', name: 'Principios de Economía', credits: 3, grade: 'A' },
  { code: 'TTCT0013', name: 'Estadística multivariada', credits: 3, grade: 'A' },
  { code: 'TTCT0015', name: 'Sistemas operativos', credits: 4, grade: 'A' },
  { code: 'TTCT0016', name: 'Administración de datos', credits: 3, grade: 'A' },
  { code: 'BBCD0002', name: 'Minería de datos avanzada', credits: 4, grade: 'A' },

  { code: 'TTCT0019', name: 'Redes de computadoras', credits: 4, grade: 'A' },
  { code: 'TTCT0018', name: 'Datos masivos (Big Data)', credits: 4, grade: 'A' },
  { code: 'BBCC0007', name: 'Economía para ingenieros', credits: 3, grade: 'A' },
  { code: 'TTCT0020', name: 'Interacción persona-máquina', credits: 3, grade: 'A' },
];

export const pendingCourses: Course[] = [
  { code: 'TTCT0021', name: 'Seguridad de sistemas digitales', credits: 4, prerequisites: [] },
  { code: 'TTCT0017', name: 'Computación paralela y distribuida', credits: 4, prerequisites: [] },
  { code: 'TTCT0022', name: 'Visualización de datos', credits: 4, prerequisites: ['TTCT0014'] },
  { code: 'BBCC0004', name: 'Comercio digital', credits: 3, prerequisites: [] },
  { code: 'TCNT0015', name: 'Práctica Profesional Supervisada', credits: 14, prerequisites: [] },
];