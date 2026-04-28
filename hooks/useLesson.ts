import { base_url } from '@/config';
import { useQuery } from '@tanstack/react-query';

const addLesson = async () => {};

const getLesson = async (id: number) => {
  const response = await fetch(`${base_url}/lesson/all/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || 'Something went wrong';
    throw new Error(errorMessage);
  }
  return response.json();
};

export const useGetLesson = (id: number) => {
  return useQuery({
    queryKey: ['lesson', id],
    queryFn: () => getLesson(id),
    staleTime: 10 * 60 * 1000,
  });
};
