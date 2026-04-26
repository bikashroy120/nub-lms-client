import { getValidAccessToken, signUpFunction } from '@/app/actions/auth';
import { base_url } from '@/config';
import { User } from '@/types/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const fetchUsers = async (query: string) => {
  const response = await fetch(`${base_url}/user?${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

const updateUser = async ({
  id,
  data,
}: {
  id: number;
  data: Partial<User>;
}) => {
  const token = await getValidAccessToken();
  const response = await fetch(`${base_url}/user/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
};

const deleteUser = async (id: number) => {
  const token = await getValidAccessToken();
  const response = await fetch(`${base_url}/user/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete user');
  return response.json();
};

export const useUsers = (query: string) => {
  return useQuery({
    queryKey: ['users', query],
    queryFn: () => fetchUsers(query),
    staleTime: 60 * 1000,
  });
};

export const usePostUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUpFunction,
    onSuccess: () => {
      toast.success('User created successfully!');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success('User updated successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => toast.error(error.message),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('User deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong');
    },
  });
};
