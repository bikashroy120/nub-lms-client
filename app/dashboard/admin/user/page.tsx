import { getUserByAdmin } from '@/app/actions/auth';
import UsersTable from '@/components/dashboard/users/UsersTable';
import AdminBreadcrumbs from '@/components/shared/AdminBreadcrumbs';
import React from 'react';

const page = async () => {
  const usersData = await getUserByAdmin();

  return (
    <div>
      <AdminBreadcrumbs />
      <div>
        <UsersTable users={usersData.data.data} />
      </div>
    </div>
  );
};

export default page;
