
import CategoryTable from '@/components/dashboard/courses/CategoryTable';
import AdminBreadcrumbs from '@/components/shared/AdminBreadcrumbs';
import { Suspense } from 'react';

const CategoryPage = async () => {
  return (
    <div>
      <AdminBreadcrumbs title='Category List' />
      <div>
        <Suspense fallback={<div>Loading Filters...</div>}>
          <CategoryTable />
        </Suspense>
      </div>
    </div>
  );
};

export default CategoryPage;
