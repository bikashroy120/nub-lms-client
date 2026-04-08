'use server';

import { base_url } from '@/config';
import { IResponse } from '@/types/auth';
import { getValidAccessToken } from './auth';
import { revalidateTag } from 'next/cache';

export const getCategories = async () => {
  try {
    const res = await fetch(`${base_url}/category`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['category'] },
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    return null;
  }
};

export const addCategory = async (data: {
  name: string;
}): Promise<IResponse> => {
  const token = await getValidAccessToken();
  const res = await fetch(`${base_url}/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    revalidateTag('category', 'max');
  }

  return await res.json();
};
