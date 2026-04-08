import AdminNavbar from '@/components/dashboard/common/AdminNavbar';
import AdminProtected from '@/components/dashboard/common/AdminProtected';
import AdminSidebar from '@/components/dashboard/common/AdminSidebar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminProtected>
      <div className='flex h-screen bg-[#f8f8f8]'>
        <AdminSidebar />
        <div className=' flex-1 flex flex-col min-w-0'>
          <AdminNavbar />
          <main className='flex-1 p-5 overflow-y-auto'>{children}</main>
        </div>
      </div>
    </AdminProtected>
  );
};

export default layout;
