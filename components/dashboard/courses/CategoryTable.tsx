'use client';

import { CustomPagination } from '@/components/shared/CustomPagination';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import React from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
}

const users: User[] = [
  {
    id: '1',
    name: 'Bikash Chandra',
    email: 'bikash@example.com',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Rahul Dev',
    email: 'rahul@example.com',
    status: 'Inactive',
  },
];

const CategoryTable = () => {
  const columns = [
    { header: 'ID', accessor: 'id' as keyof User },
    { header: 'Name', accessor: 'name' as keyof User },
    { header: 'Email', accessor: 'email' as keyof User },
    {
      header: 'Status',
      accessor: (user: User) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
        >
          {user.status}
        </span>
      ),
    },
    {
      header: 'Action',
      accessor: (user: User) => (
        <Button variant='ghost' onClick={() => console.log('Edit', user.id)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className=' bg-card shadow p-5 rounded-md'>
      <div className=' flex items-center gap-2 justify-between'>
        <h2 className=' font-semibold'>Category List</h2>
        <Button variant='default' size='sm' className='py-5 cursor-pointer'>
          Add Category
        </Button>
      </div>

      <div className=' mt-5'>
        <DataTable data={users} columns={columns} />
        <CustomPagination totalPages={20} />
      </div>
    </div>
  );
};

export default CategoryTable;
