'use client';

import { CustomPagination } from '@/components/shared/CustomPagination';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import React from 'react';
import AddCategory from './AddCategory';

interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const CategoryTable = ({ category }: { category: Category[] }) => {
  const columns = [
    { header: 'ID', accessor: 'id' as keyof Category },
    { header: 'Name', accessor: 'name' as keyof Category },
    {
      header: 'Action',
      accessor: (category: Category) => (
        <Button
          variant='ghost'
          onClick={() => console.log('Edit', category.id)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className=' bg-card shadow p-5 rounded-md'>
      <div className=' flex items-center gap-2 justify-between'>
        <h2 className=' font-semibold'>Category List</h2>
        <AddCategory />
      </div>

      <div className=' mt-5'>
        <DataTable data={category} columns={columns} />
        <CustomPagination totalPages={20} />
      </div>
    </div>
  );
};

export default CategoryTable;
