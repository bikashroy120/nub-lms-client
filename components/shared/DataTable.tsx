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
import { Loader2 } from 'lucide-react'; // লোডিং আইকনের জন্য

interface DataTableProps<T> {
  columns: {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
  }[];
  data: T[];
  isLoading?: boolean; // নতুন প্রপ
}

export function DataTable<T>({ columns, data, isLoading }: DataTableProps<T>) {
  return (
    <div className='border border-gray-200 overflow-hidden rounded-md relative'>

      {/* Loading Overlay: টেবিলের ওপর ঝাপসা একটি লেয়ার */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Loading data...</span>
          </div>
        </div>
      )}

      <Table>
        <TableHeader className='bg-gray-600'>
          <TableRow className='hover:bg-gray-600/50 transition-colors'>
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className={cn(
                  'text-white px-4 font-semibold uppercase border-r border-r-gray-500 last:border-r-0 text-xs h-12',
                  column.className,
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* যদি ডাটা থাকে এবং লোডিং না হয় */}
          {!isLoading && data && data.length > 0 ? (
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
          ) : !isLoading ? (
            /* Empty State: যখন লোডিং শেষ কিন্তু কোনো ডাটা নেই */
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className='h-40 text-center text-muted-foreground bg-white'
              >
                <div className='flex flex-col items-center justify-center space-y-1'>
                  <span className='font-medium text-lg'>No results found.</span>
                  <span className='text-sm'>
                    Try adjusting your filters or adding some data.
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            /* Loading State Placeholder: লোড হওয়ার সময় টেবিলের বডি খালি রাখা */
            <TableRow>
              <TableCell colSpan={columns.length} className="h-40 bg-white" />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}