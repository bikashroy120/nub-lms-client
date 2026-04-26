import { base_url } from '@/config';
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async (query: string) => {
  const response = await fetch(`${base_url}/user?${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const useUsers = (query: string) => {
  return useQuery({
    queryKey: ['users', query],
    queryFn: () => fetchUsers(query),
    staleTime: 60 * 1000,
  });
};
