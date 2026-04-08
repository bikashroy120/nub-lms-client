import { getCategories } from '@/app/actions/category';
import CategoryTable from '@/components/dashboard/courses/CategoryTable';
import AdminBreadcrumbs from '@/components/shared/AdminBreadcrumbs';

const CategoryPage = async () => {
  const data = await getCategories();
  return (
    <div>
      <AdminBreadcrumbs />
      <div>
        <CategoryTable category={data?.data} />
      </div>
    </div>
  );
};

export default CategoryPage;
