'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const AdminBreadcrumbs = () => {
  const pathname = usePathname();

  const allNodes = pathname.split('/').filter((node) => node !== '');

  const dashboardIndex = allNodes.indexOf('dashboard');
  const pathNodes =
    dashboardIndex !== -1 ? allNodes.slice(dashboardIndex + 1) : [];
  if (pathNodes.length === 0) return null;

  return (
    <nav
      aria-label='Breadcrumb'
      className='flex items-center space-x-2 text-sm text-gray-600 mb-6'
    >
      <span className='flex items-center hover:text-primary transition-colors'>
        <Home size={16} />
      </span>
      {pathNodes.map((node, index) => {
        const href = `/${allNodes.slice(0, dashboardIndex + index + 2).join('/')}`;
        const isLast = index === pathNodes.length - 1;
        const label =
          node.charAt(0).toUpperCase() + node.slice(1).replace(/-/g, ' ');

        return (
          <React.Fragment key={href}>
            <ChevronRight size={14} className='mx-1 text-gray-400' />

            {isLast ? (
              <span className='font-semibold text-primary'>{label}</span>
            ) : (
              <Link
                href={href}
                className='hover:text-primary transition-colors hover:underline'
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default AdminBreadcrumbs;
