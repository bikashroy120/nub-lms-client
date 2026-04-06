'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathNodes = pathname.split('/').filter((node) => node !== '');

  return (
    <nav
      aria-label='Breadcrumb'
      className='flex items-center space-x-2 text-sm text-gray-600 mb-6'
    >
      <Link
        href='/'
        className='flex items-center hover:text-primary transition-colors'
      >
        <Home size={16} />
      </Link>

      {pathNodes.map((node, index) => {
        const href = `/${pathNodes.slice(0, index + 1).join('/')}`;
        const isLast = index === pathNodes.length - 1;
        const label =
          node.charAt(0).toUpperCase() + node.slice(1).replace(/-/g, ' ');

        return (
          <React.Fragment key={href}>
            <ChevronRight size={14} className='text-gray-400' />

            {isLast ? (
              <span className='font-semibold text-primary'>{label}</span>
            ) : (
              <Link
                href={href}
                className='hover:text-primary transition-colors capitalize'
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

export default Breadcrumbs;
