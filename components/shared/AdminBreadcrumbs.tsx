'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home, LayoutGrid } from 'lucide-react';

const AdminBreadcrumbs = ({ title = 'User' }: { title: string }) => {
  const pathname = usePathname();

  const allNodes = pathname.split('/').filter((node) => node !== '');
  const dashboardIndex = allNodes.indexOf('dashboard');
  const pathNodes = dashboardIndex !== -1 ? allNodes.slice(dashboardIndex + 1) : [];

  if (pathNodes.length === 0) return null;

  return (
    <div className='mb-7'>
      {/* Page Title & Status */}
      <div className="flex items-center gap-3 mb-2">
        <h2 className='text-2xl font-black text-gray-900 tracking-tight'>
          {title}
        </h2>
        <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse hidden md:block" />
      </div>

      {/* Breadcrumb Path */}
      <nav
        aria-label='Breadcrumb'
        className='flex items-center space-x-1.5 text-xs font-medium'
      >
        <Link
          href="/dashboard/admin"
          className='flex items-center gap-1.5 text-gray-400 hover:text-indigo-600 transition-all duration-200 group'
        >
          <div className="p-1.5 rounded-lg bg-gray-50 group-hover:bg-indigo-50 transition-colors">
            <Home size={14} />
          </div>
          <span className="hidden sm:block">Dashboard</span>
        </Link>

        {pathNodes.map((node, index) => {
          const href = `/${allNodes.slice(0, dashboardIndex + index + 2).join('/')}`;
          const isLast = index === pathNodes.length - 1;
          const label = node.charAt(0).toUpperCase() + node.slice(1).replace(/-/g, ' ');

          return (
            <React.Fragment key={href}>
              <ChevronRight size={14} className='text-gray-300 mx-0.5' />

              {isLast ? (
                <span className='px-2.5 py-1 rounded-lg bg-indigo-50/50 text-indigo-700 font-bold border border-indigo-100/50'>
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className='text-gray-400 hover:text-indigo-600 transition-colors px-1'
                >
                  {label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminBreadcrumbs;