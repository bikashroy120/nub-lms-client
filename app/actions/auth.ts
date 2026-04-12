'use server';

import { base_url } from '@/config';
import { buildQueryParams } from '@/lib/utils';
import { AuthResponse, User } from '@/types/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { json } from 'stream/consumers';

export async function handleGoogleLogin() {
  let authUrl = '';

  const cookieStore = await cookies();

  try {
    const response = await fetch(`${base_url}/auth/login/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ provider: 'google' }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from backend');
    }

    const data = await response.json();

    authUrl = data.data.url;

    cookieStore.set('google_oauth_state', data.data.state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 600000,
    });

    cookieStore.set('google_code_verifier', data.data.codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 600000,
    });
  } catch (error) {
    console.error('Auth Error:', error);
    return;
  }

  if (authUrl) {
    redirect(authUrl);
  }
}

export const handelLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  redirect('/login');
};

export async function getValidAccessToken() {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  // যদি Access Token না থাকে কিন্তু Refresh Token থাকে
  if (!accessToken && refreshToken) {
    try {
      const res = await fetch(`${base_url}/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${refreshToken}`,
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (res.ok) {
        const data = await res.json();
        const newAccessToken = data.accessToken || data.data?.accessToken;
        const refreshToken = data.refreshToken || data.data?.refreshToken;

        if (newAccessToken && refreshToken) {
          cookieStore.set('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });

          cookieStore.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
          accessToken = newAccessToken;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error('Refresh Token Error:', error);
      return null;
    }
  }

  return accessToken;
}

export const getMe = async () => {
  const token = await getValidAccessToken();

  if (!token) return null;

  try {
    const res = await fetch(`${base_url}/auth/get-me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
};

export const signUpFunction = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  try {
    const res = await fetch(`${base_url}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || `Error: ${res.status}`);
    }

    return result;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};

export const loginFunction = async (data: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${base_url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || `Error: ${res.status}`);
    }

    cookieStore.set('accessToken', result.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    cookieStore.set('refreshToken', result.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return result;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};

export const getUserByAdmin = async (queryData: Record<string, any> = {}) => {
  const query = buildQueryParams(queryData);
  const res = await fetch(`${base_url}/user?${query}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return null;
  }
  return await res.json();
};
