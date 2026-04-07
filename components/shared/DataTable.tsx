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
    <div className=' border-b-gray-200'>
      <Table>
        <TableHeader className=' bg-[#0858f7]'>
          <TableRow className=''>
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className={cn(
                  ' text-white px-4 font-semibold uppercase border-r border-r-[#2b77e5]  text-xs h-12',
                  column.className,
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={cn(
                  'border-b border-b-gray-200 h-14 ',
                  'even:bg-gray-100 odd:bg-white hover:bg-transparent',
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
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
