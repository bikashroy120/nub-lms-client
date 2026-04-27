'use client';

import { addCategory } from '@/app/actions/category';
import CustomDialog from '@/components/shared/CustomDialog';
import CustomInput from '@/components/shared/CustomInput';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { useCategories, useCreateCategory } from '@/hooks/useCategory';
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryValues>({
    resolver: zodResolver(categorySchema),
  });

  const { mutate, isPending } = useCreateCategory()

  const onSubmit = async (data: CategoryValues) => {
    mutate(data, {
      onSuccess: () => {
        setOpen(false)
      }
    })
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
          <Button type='submit' className=' cursor-pointer' disabled={isPending}>
            {isPending ? 'Adding...' : 'Add Category'}
          </Button>
        </DialogFooter>
      </form>
    </CustomDialog>
  );
};

export default AddCategory;
