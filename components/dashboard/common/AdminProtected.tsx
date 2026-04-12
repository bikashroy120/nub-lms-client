'use client';

import { useAuth } from '@/lib/context/auth-context';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AdminProtected = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  console.log(user, loading)

  const router = useRouter();
  useEffect(() => {
    if (!loading && user === null) {
      router.push('/login');
    }
  }, [user, loading]);

  return <>{children}</>;
};

export default AdminProtected;
