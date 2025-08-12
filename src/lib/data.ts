import type { User, Course, CompletedCourse } from "@/types";

export const user: User = {
  id: '1',
  email: 'alex.doe@university.edu',
  name: 'Alex Doe',
  major: 'Computer Science',
  completedCredits: 45,
  totalCredits: 120,
  gpa: 3.8,
  currentTerm: 'Fall 2024'
};

export const completedCourses: CompletedCourse[] = [
  { code: 'CS101', name: 'Intro to Programming', credits: 3, grade: 'A', prerequisites: [] },
  { code: 'MATH201', name: 'Calculus I', credits: 4, grade: 'A-', prerequisites: [] },
  { code: 'ENGL101', name: 'Composition', credits: 3, grade: 'B+', prerequisites: [] },
  { code: 'HIST110', name: 'World History', credits: 3, grade: 'A', prerequisites: [] },
];

export const pendingCourses: Course[] = [
  { code: 'CS240', name: 'Data Structures', credits: 3, prerequisites: ['CS101'] },
  { code: 'CS300', name: 'Algorithms', credits: 3, prerequisites: ['CS240'] },
  { code: 'MATH202', name: 'Calculus II', credits: 4, prerequisites: ['MATH201'] },
  { code: 'PHYS211', name: 'University Physics I', credits: 4, prerequisites: ['MATH201'] },
  { code: 'HUMA-ELEC', name: 'Humanities Elective', credits: 3, prerequisites: [] },
];
