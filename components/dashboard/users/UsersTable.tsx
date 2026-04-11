'use client';

import { CustomPagination } from '@/components/shared/CustomPagination';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { User } from '@/types/auth';
import Link from 'next/link';

const UsersTable = ({ users }: { users: User[] }) => {
  const columns = [
    {
      header: 'ID',
      accessor: 'id' as keyof User,
    },
    {
      header: 'Name',
      accessor: 'name' as keyof User,
    },
    {
      header: 'Email',
      accessor: 'email' as keyof User,
    },
    {
      header: 'Role',
      accessor: 'role' as keyof User,
    },
    {
      header: 'Phone',
      accessor: 'phone' as keyof User,
    },
    {
      header: 'Address',
      accessor: 'address' as keyof User,
    },
    {
      header: 'Actions',
      accessor: (row: User) => (
        <div className=' flex items-center gap-3'>
          <Button size={'sm'} variant={'outline'}>
            Edit
          </Button>
          <Button
            size={'sm'}
            variant={'outline'}
            className=' bg-red-100 text-red-600 border border-red-200 cursor-pointer hover:bg-red-500 hover:text-white duration-200'
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className=' bg-card shadow p-5 rounded-md'>
      <div className=' flex items-center gap-2 justify-between'>
        <h2 className=' font-semibold'>User List</h2>
        <Button className=' py-5'>
          <Link href={'/dashboard/admin/user/add'}>Add User</Link>
        </Button>
        {/* <AddCategory /> */}
      </div>

      <div className=' mt-5'>
        <DataTable data={users} columns={columns} />
        <CustomPagination totalPages={20} />
      </div>
    </div>
  );
};

export default UsersTable;
