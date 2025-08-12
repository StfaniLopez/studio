export interface User {
  id: string;
  email: string;
  name: string;
  major: string;
  completedCredits: number;
  totalCredits: number;
  gpa: number;
  currentTerm: string;
}

export interface Course {
  code: string;
  name: string;
  credits: number;
  prerequisites: string[];
}

export interface CompletedCourse extends Course {
    grade: string;
}

export interface Progress {
  userId: string;
  completedCourses: { [courseId: string]: string }; // courseId: grade
}
