'use client';

import AdminNavbar from '@/components/dashboard/common/AdminNavbar';
import AdminProtected from '@/components/dashboard/common/AdminProtected';
import AdminSidebar from '@/components/dashboard/common/AdminSidebar';
import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminProtected>
      {/* h-screen (100vh) নিশ্চিত করে পুরো স্ক্রিন দখল করা, overflow-hidden বাইরের স্ক্রলবার বন্ধ করে */}
      <div className='flex h-screen bg-[#F1F5F9] overflow-hidden'>

        {/* Sidebar - ড্যাশবোর্ডের বাম পাশে ফিক্সড থাকবে */}
        <AdminSidebar />

        {/* Main Wrapper - কলাম ফ্লেক্স ব্যবহার করে নববারকে উপরে রাখা হয়েছে */}
        <div className='flex-1 flex flex-col min-w-0 overflow-hidden'>

          {/* Navbar - এটার হাইট সাধারণত h-16 (64px) হয় */}
          <AdminNavbar />

          {/* Main Content Area - শুধুমাত্র এই অংশটি স্ক্রল হবে */}
          <main className='flex-1 overflow-y-auto px-6 md:px-10 py-8 scroll-smooth custom-scrollbar'>
            {/* কন্টেন্ট বেশি ছড়িয়ে না যাওয়ার জন্য একটি ম্যাক্স উইডথ কন্টেইনার */}
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