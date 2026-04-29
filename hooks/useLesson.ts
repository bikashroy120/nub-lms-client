import { getValidAccessToken } from '@/app/actions/auth';
import { LessonValues } from '@/components/dashboard/lesson/AddLesson';
import { base_url } from '@/config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const addLesson = async (data: LessonValues) => {
  const token = await getValidAccessToken();
  const response = await fetch(`${base_url}/lesson`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || 'Something went wrong';
    throw new Error(errorMessage);
  }
  return response.json();
};

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

export const updateLesson = async ({
  id,
  data,
}: {
  id: number;
  data: Partial<LessonValues>;
}) => {
  const token = await getValidAccessToken();
  const response = await fetch(`${base_url}/lesson/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || 'Something went wrong';
    throw new Error(errorMessage);
  }
  return response.json();
};

export const deleteLesson = async (id: number) => {
  const token = await getValidAccessToken();
  const response = await fetch(`${base_url}/lesson/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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

export const useCreateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson'] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Lesson added successfully');
    },
    onError: (error: any) => {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage);
    },
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson'] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Lesson update successfully');
    },
    onError: (error: any) => {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage);
    },
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson'] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Lesson delete successfully');
    },
    onError: (error: any) => {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage);
    },
  });
};
