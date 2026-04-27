import { base_url } from '@/config';
import { getValidAccessToken } from './auth';
import { buildQueryParams } from '@/lib/utils';
import { CourseFormValues } from '../dashboard/admin/course/add/page';

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
  const queryString = buildQueryParams(query);
  const res = await fetch(`${base_url}/course?${queryString}`, {
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

export const getSingleCourses = async (id: string) => {
  const res = await fetch(`${base_url}/course/${id}`, {
    cache: 'no-store',
    headers: {
      'Content-type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to get course');
  }
  return await res.json();
};
