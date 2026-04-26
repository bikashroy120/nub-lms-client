import { getUserByAdmin } from '@/app/actions/auth';
import UsersTable from '@/components/dashboard/users/UsersTable';
import AdminBreadcrumbs from '@/components/shared/AdminBreadcrumbs';
import { buildQueryParams } from '@/lib/utils';
import React, { Suspense } from 'react';


interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const query = buildQueryParams(params);


  return (
    <div className=''>
      <AdminBreadcrumbs title='User List' />
      <div>
        {/* <UsersTable users={usersData.data.data} /> */}

        <Suspense fallback={<div>Loading Filters...</div>}>
          <UsersTable initialParams={query} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
