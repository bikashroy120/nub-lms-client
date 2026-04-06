import { getCategories } from '@/app/actions/category';
import AdminBreadcrumbs from '@/components/shared/AdminBreadcrumbs';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import React from 'react';

const CategoryPage = async () => {
  const data = await getCategories();

  console.log(data);

  return (
    <div>
      <AdminBreadcrumbs />
    </div>
  );
};

export default CategoryPage;
