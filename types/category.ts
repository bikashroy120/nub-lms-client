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
  category: Record<string, any>;
  instructor: {
    name: string;
    email: string;
  };
  lessonCount: number;
  thumbnail: string;
  price: number;
  isPublished: boolean;
}
