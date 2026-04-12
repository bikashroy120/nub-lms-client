import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buildQueryParams = (params: Record<string, any>) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value == null) return;

    if (typeof value === 'string' && value.includes(',')) {
      value
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
        .forEach((v) => query.append(key, v));
      return;
    }

    if (Array.isArray(value)) {
      value
        .map((v) => v?.toString().trim())
        .filter(Boolean)
        .forEach((v) => query.append(key, v));
      return;
    }
    const cleanValue = value.toString().trim();
    if (cleanValue) {
      query.append(key, cleanValue);
    }
  });

  return query.toString();
};
