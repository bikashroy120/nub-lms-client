import { getValidAccessToken } from '@/app/actions/auth';
import { base_url } from '@/config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const getCategory = async () => {
  const response = await fetch(`${base_url}/category`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

const createCategory = async (data: { name: string }) => {
  const token = await getValidAccessToken();
  const response = await fetch(`${base_url}/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('failed to create category');
  }
  return response.json();
};

const updateCategory = async ({
  id,
  data,
}: {
  id: number;
  data: { name: string };
}) => {
  const token = await getValidAccessToken();
  const response = await fetch(`${base_url}/category/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('failed to create category');
  }
  return response.json();
};

const deleteCategory = async (id: number) => {
  const token = await getValidAccessToken();
  const response = await fetch(`${base_url}/category/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('failed to create category');
  }
  return response.json();
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['category'],
    queryFn: getCategory,
    staleTime: 60 * 6000,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] });
      toast.success('category create successfully');
    },
    onError: () => {
      toast.error('failed to create category');
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] });
      toast.success('category update successfully');
    },
    onError: () => {
      toast.error('failed to update category');
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] });
      toast.success('category delete successfully');
    },
    onError: () => {
      toast.error('failed to delete category');
    },
  });
};
