'use client';

import { useAuth } from '@/lib/context/auth-context';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AdminProtected = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  console.log('AdminProtected user:', user, 'loading:', loading);

  const router = useRouter();
  useEffect(() => {
    if (!loading && user === null) {
      router.push('/login');
    }
  }, [user]);

  return <>{children}</>;
};

export default AdminProtected;
