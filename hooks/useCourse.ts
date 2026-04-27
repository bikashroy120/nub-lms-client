import { getValidAccessToken } from '@/app/actions/auth';
import { CourseFormValues } from '@/components/dashboard/courses/EditCourse';
import { base_url } from '@/config';
import { IApiResponse, ICourses } from '@/types/category';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const getCourses = async (query: string) => {
  const response = await fetch(`${base_url}/course?${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  const data: IApiResponse<ICourses[]> = await response.json();
  return data;
};

const postCourses = async (data: CourseFormValues) => {
  const token = await getValidAccessToken();
  const response = await fetch(`${base_url}/course`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create course');
  }
  return response.json();
};

const updateCourses = async ({
  id,
  data,
}: {
  id: number;
  data: CourseFormValues;
}) => {
  const token = await getValidAccessToken();
  const response = await fetch(`${base_url}/course/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update course');
  }
  return response.json();
};

const deleteCourses = async (id: number) => {
  const token = await getValidAccessToken();
  const response = await fetch(`${base_url}/course/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to create course');
  }
  return response.json();
};

export const useGetCourses = (query: string) => {
  return useQuery({
    queryKey: ['courses', query],
    queryFn: () => getCourses(query),
    staleTime: 60 * 5000,
  });
};

export const usePostCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCourses,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Course created successfully');
    },
    onError: () => {
      toast.error('Failed to create course');
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCourses,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Course created successfully');
    },
    onError: () => {
      toast.error('Failed to create course');
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCourses,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Course created successfully');
    },
    onError: () => {
      toast.error('Failed to create course');
    },
  });
};
