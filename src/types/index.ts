export interface User {
  id: string;
  email: string;
  nombre: string;
  carrera: string;
  creditosCompletados: number;
  totalCredits: number;
  gpa: number;
}

export interface Course {
  codigo: string;
  nombre: string;
  creditos: number;
  prerequisitos: string[];
}

export interface CompletedCourse extends Course {
    grade: string;
}

export interface Progress {
  userId: string;
  cursosCompletados: { [courseId: string]: string }; // courseId: grade
}
