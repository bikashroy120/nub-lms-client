import { base_url } from '@/config';
import { CourseFormValues } from '../dashboard/admin/course/add/page';
import { getValidAccessToken } from './auth';

export const createCourse = async (data: CourseFormValues) => {
  const token = getValidAccessToken();
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
