import { base_url } from '@/config';

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
