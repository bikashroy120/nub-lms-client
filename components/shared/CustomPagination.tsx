'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface PaginationProps {
  total: number;
  limit: number;
}

export function CustomPagination({ total, limit }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  const totalPages = Math.ceil(total / limit) || 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showMax = 3;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > showMax + 1) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - showMax) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };
  if (totalPages <= 1) return null;

  return (
    <div className='flex items-center justify-between px-2 pt-4 border-t border-gray-100'>
      <div className='text-sm text-gray-500'>
        Showing <span className='font-medium text-gray-900'>{(currentPage - 1) * limit + 1}</span> to{' '}
        <span className='font-medium text-gray-900'>{Math.min(currentPage * limit, total)}</span> of{' '}
        <span className='font-medium text-gray-900'>{total}</span> results
      </div>

      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>

        <div className='flex items-center gap-1'>
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`dots-${index}`} className='px-2 text-gray-400'>
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
                    : 'text-gray-600 hover:bg-gray-50',
                )}
                onClick={() => handlePageChange(page as number)}
              >
                {page}
              </Button>
            );
          })}
        </div>
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}