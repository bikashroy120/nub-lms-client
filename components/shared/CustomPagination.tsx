'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface PaginationProps {
  totalPages: number;
}

export function CustomPagination({ totalPages }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // পেজ নাম্বার জেনারেট করার ফাংশন
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showMax = 3; // দুই পাশে কয়টি করে নাম্বার দেখাবে

    if (totalPages <= 7) {
      // যদি টোটাল পেজ কম হয়, সব দেখাও
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // সবসময় প্রথম পেজ দেখাও
      pages.push(1);

      if (currentPage > showMax + 1) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - showMax) {
        pages.push('...');
      }

      // সবসময় শেষ পেজ দেখাও
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className='flex items-center justify-between  px-2 pt-4'>
      <div className='text-sm text-info'>
        Page <span className='font-medium text-title'>{currentPage}</span> of{' '}
        <span className='font-medium text-title'>{totalPages}</span>
      </div>

      <div className='flex items-center space-x-2'>
        {/* Previous Button */}
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8'
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>

        {/* Dynamic Page Numbers */}
        <div className='flex items-center gap-1'>
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span key={`dots-${index}`} className='px-2 text-info'>
                  ...
                </span>
              );
            }
            return (
              <Button
                key={index}
                variant={currentPage === page ? 'default' : 'outline'}
                className={cn(
                  'h-8 w-8 text-sm transition-all',
                  currentPage === page
                    ? 'bg-primary hover:bg-primary/90'
                    : 'text-info hover:bg-gray-50',
                )}
                onClick={() => setCurrentPage(page as number)}
              >
                {page}
              </Button>
            );
          })}
        </div>

        {/* Next Button */}
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8'
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
