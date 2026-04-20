export interface Category {
  id: number;
  name: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMetaData {
  page: number;
  limit: number;
  total: number;
}

export interface ICourses {
  id: number;
  title: string;
  description: string;
  sortDescription: string;
  category: {
    id: number;
    name: string;
  };
  instructor: {
    id: number;
    name: string;
    email: string;
  };
  learn: string[];
  included: string[];
  allLessons: Record<string, any>[];
  lessonCount: number;
  thumbnail: string;
  price: number;
  isPublished: boolean;
}
