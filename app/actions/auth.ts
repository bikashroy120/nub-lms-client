'use server';

import { base_url } from '@/config';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
          // যদি ব্যাকএন্ড কুকি থেকে টোকেন চায় তবেই 'Cookie' হেডার দিবেন
          Cookie: `refreshToken=${refreshToken}`,
        },
        body: JSON.stringify({ refreshToken }), // ব্যাকএন্ড যদি বডিতে চায়
      });

      if (res.ok) {
        const data = await res.json();
        // মনে রাখবেন backend response structure অনুযায়ী data.data.accessToken হতে পারে
        const newAccessToken = data.accessToken || data.data?.accessToken;

        if (newAccessToken) {
          cookieStore.set('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
          });
          accessToken = newAccessToken;
        }
      } else {
        // যদি রিফ্রেশ টোকেন ইনভ্যালিড হয়, তবে সেশন ক্লিয়ার করুন
        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');
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
      next: { revalidate: 0 }, // ডাটা ক্যাশ হবে না
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
};
