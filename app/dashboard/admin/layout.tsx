'use client';

import AdminNavbar from '@/components/dashboard/common/AdminNavbar';
import AdminProtected from '@/components/dashboard/common/AdminProtected';
import AdminSidebar from '@/components/dashboard/common/AdminSidebar';
import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminProtected>
      <div className='flex h-screen bg-[#F1F5F9] overflow-hidden'>
        <AdminSidebar />
        <div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
          <AdminNavbar />
          <main className='flex-1 overflow-y-auto px-6 md:px-10 py-8 scroll-smooth custom-scrollbar'>
            <div className="max-w-[1600px] mx-auto w-full">
              {children}
            </div>
          </main>

        </div>
      </div>
    </AdminProtected>
  );
};

export default AdminLayout;