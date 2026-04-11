'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface DataTableProps<T> {
  columns: {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
  }[];
  data: T[];
}

export function DataTable<T>({ columns, data }: DataTableProps<T>) {
  return (
    <div className='border  border-gray-200 overflow-hidden'>
      <Table>
        <TableHeader className='bg-[#0858f7]'>
          <TableRow className='hover:bg-[#0858f7]'>
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className={cn(
                  'text-white px-4 font-semibold uppercase border-r border-r-[#2b77e5] last:border-r-0 text-xs h-12',
                  column.className,
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* ডাটা থাকলে ম্যাপ করবে, না থাকলে Empty মেসেজ দেখাবে */}
          {data && data.length > 0 ? (
            data.map((item, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={cn(
                  'border-b border-b-gray-200 h-14 hover:bg-gray-50/50 transition-colors',
                  'even:bg-gray-100 odd:bg-white',
                )}
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={cn(
                      'py-2 px-4 text-info text-base',
                      colIndex !== 0 && 'border-l border-gray-200',
                      column.className,
                    )}
                  >
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : (item[column.accessor] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            /* Empty State: যখন ডাটা নেই */
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className='h-32 text-center text-muted-foreground bg-white'
              >
                <div className='flex flex-col items-center justify-center space-y-1'>
                  <span className='font-medium'>No results found.</span>
                  <span className='text-xs'>
                    Try adding some data to see it here.
                  </span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
