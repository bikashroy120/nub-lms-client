import { getCategories } from '@/app/actions/category';
import CategoryTable from '@/components/dashboard/courses/CategoryTable';
import AdminBreadcrumbs from '@/components/shared/AdminBreadcrumbs';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import React from 'react';

const CategoryPage = async () => {
  const data = await getCategories();

  console.log(data);

  return (
    <div>
      <AdminBreadcrumbs />
      <div>
        <CategoryTable />
      </div>
    </div>
  );
};

export default CategoryPage;
