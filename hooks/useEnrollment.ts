import { getValidAccessToken } from '@/app/actions/auth';
import { base_url } from '@/config';
import { CreateEnrollment } from '@/types/common';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const createEnrollment = async (data: CreateEnrollment) => {
  const token = await getValidAccessToken();
  const response = await fetch(`${base_url}/enrollment`, {
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

const getMyCourse = async () => {
  const token = await getValidAccessToken();
  const response = await fetch(`${base_url}/enrollment/my-course`, {
    method: 'GET',
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

export const useCreateEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEnrollment,
    onSuccess: () => {
      toast.success('enrollment successfully');
      queryClient.invalidateQueries({ queryKey: ['enrollment'] });
      queryClient.invalidateQueries({ queryKey: ['my_course'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetMyCourse = () => {
  return useQuery({
    queryKey: ['my_course'],
    queryFn: getMyCourse,
    staleTime: 60 * 5000,
  });
};
