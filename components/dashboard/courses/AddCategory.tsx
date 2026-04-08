'use client';

import { addCategory } from '@/app/actions/category';
import CustomDialog from '@/components/shared/CustomDialog';
import CustomInput from '@/components/shared/CustomInput';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(2, 'Category name is required'),
});

type CategoryValues = z.infer<typeof categorySchema>;

const AddCategory = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryValues>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data: CategoryValues) => {
    setLoading(true);
    try {
      const response = await addCategory(data);
      if (response.success) {
        setOpen(false);
        toast.success('Category added successfully');
      } else {
        console.error('Failed to add category:', response);
        toast.error(response.message || 'Failed to add category');
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }

    console.log(data);
  };

  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      title='Add New Category'
      description='Enter the details of the category you want to add.'
      trigger={<Button>Add Category</Button>}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <CustomInput
            label='Category Name'
            name='name'
            register={register}
            errors={errors}
            placeholder='Enter category name'
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type='submit' className=' cursor-pointer' disabled={loading}>
            {loading ? 'Adding...' : 'Add Category'}
          </Button>
        </DialogFooter>
      </form>
    </CustomDialog>
  );
};

export default AddCategory;
