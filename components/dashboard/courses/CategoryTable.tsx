'use client';

import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import AddCategory from './AddCategory';
import { useCategories } from '@/hooks/useCategory';
import UpdateCategory from './UpdateCategory';
import { Category } from '@/types/category';
import DeleteCategory from './DeleteCategory';

const CategoryTable = () => {

  const { data, isLoading } = useCategories()

  const columns = [
    { header: 'ID', accessor: 'id' as keyof Category },
    { header: 'Name', accessor: 'name' as keyof Category },
    {
      header: 'Action',
      accessor: (category: Category) => (
        <div className=' flex items-center gap-4'>
          <UpdateCategory row={category} />
          <DeleteCategory id={category.id} name={category.name} />
        </div>
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
        <DataTable data={data?.data} columns={columns} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default CategoryTable;
