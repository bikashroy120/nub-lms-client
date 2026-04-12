import { base_url } from '@/config';
import { CourseFormValues } from '../dashboard/admin/course/add/page';
import { getValidAccessToken } from './auth';

export const createCourse = async (data: CourseFormValues) => {
  const token = await getValidAccessToken();
  const res = await fetch(`${base_url}/course`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const getCourses = async (query: Record<string, any>) => {
  const res = await fetch(`${base_url}/course`, {
    next: { revalidate: 120, tags: ['course'] },
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error('Failed to get course');
  }
  return await res.json();
};
