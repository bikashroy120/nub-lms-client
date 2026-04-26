'use client';

import { CustomPagination } from '@/components/shared/CustomPagination';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { User } from '@/types/auth';
import Link from 'next/link';
import SearchFilter from '@/components/shared/SearchFilter';
import CustomFilter from '@/components/shared/CustomFilter';
import { useUsers } from '@/hooks/useUsers';
import UserUpdate from './UserUpdate';
import UserDelete from './UserDelete';

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
  { label: "Instructor", value: "instructor" },
];

const UsersTable = ({ initialParams }: { initialParams: string }) => {
  const { data, isLoading, } = useUsers(initialParams);
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
          <UserUpdate user={row} />
          <UserDelete id={row.id} name={row.name} />
        </div>
      ),
    },
  ];

  return (
    <div className=' bg-card shadow p-5 rounded-md'>
      <div className=' flex items-center gap-2 justify-between'>
        <h2 className=' font-bold text-lg'>User List</h2>
        <div className=' flex items-center gap-5'>
          <SearchFilter
            queryKey="search"
            placeholder="User name or email..."
            className="w-72"
          />

          {/* Dynamic Role Filter */}
          <CustomFilter
            options={roleOptions}
            queryKey="role"
            placeholder="Filter by Role"
            className="min-w-[150px]"
          />
          <Button className=' py-5'>
            <Link href={'/dashboard/admin/user/add'}>Add User</Link>
          </Button>
        </div>
      </div>

      <div className=' mt-5'>
        <DataTable data={data?.data?.data} columns={columns} isLoading={isLoading} />
        <CustomPagination total={data?.data?.meta.total} limit={data?.data?.meta?.limit || 10} />
      </div>
    </div>
  );
};

export default UsersTable;
