import type { User, Course, CompletedCourse } from "@/types";

export const user: User = {
  id: '1',
  email: 'alex.doe@university.edu',
  nombre: 'Alex Doe',
  carrera: 'Computer Science',
  creditosCompletados: 45,
  totalCredits: 120,
  gpa: 3.8
};

export const completedCourses: CompletedCourse[] = [
  { codigo: 'CS101', nombre: 'Intro to Programming', creditos: 3, grade: 'A' },
  { codigo: 'MATH201', nombre: 'Calculus I', creditos: 4, grade: 'A-' },
  { codigo: 'ENGL101', nombre: 'Composition', creditos: 3, grade: 'B+' },
  { codigo: 'HIST110', nombre: 'World History', creditos: 3, grade: 'A' },
];

export const pendingCourses: Course[] = [
  { codigo: 'CS240', nombre: 'Data Structures', creditos: 3, prerequisitos: ['CS101'] },
  { codigo: 'CS300', nombre: 'Algorithms', creditos: 3, prerequisitos: ['CS240'] },
  { codigo: 'MATH202', nombre: 'Calculus II', creditos: 4, prerequisitos: ['MATH201'] },
  { codigo: 'PHYS211', nombre: 'University Physics I', creditos: 4, prerequisitos: ['MATH201'] },
  { codigo: 'HUMA-ELEC', nombre: 'Humanities Elective', creditos: 3, prerequisitos: [] },
];
