export interface ILesson {
  id: number;
  title: string;
  description: string;
  courseId: number;
  videoUrl: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEnrollment {
  courseId: Number;
  amount: number;
  paymentMethod?: string;
}

interface Instructor {
  id: number;
  name: string;
}

export interface EnrolledCourse {
  courseId: number;
  courseTitle: string;
  courseThumbnail: string | null;
  categoryName: string;
  instructor: Instructor;
  completedLessons: number;
  totalLessons: number;
}
