'use client';

import CustomDialog from '@/components/shared/CustomDialog';
import CustomInput from '@/components/shared/CustomInput';
import { Button } from '@/components/ui/button';
import {
    DialogClose,
    DialogFooter,
} from '@/components/ui/dialog';
import { useUpdateCategory } from '@/hooks/useCategory';
import { Category } from '@/types/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const categorySchema = z.object({
    name: z.string().min(2, 'Category name is required'),
});

type CategoryValues = z.infer<typeof categorySchema>;

const UpdateCategory = ({ row }: { row: Category }) => {
    const [open, setOpen] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CategoryValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: row.name
        }
    });

    const { mutate, isPending } = useUpdateCategory()
    const onSubmit = async (data: CategoryValues) => {
        const id = row.id
        mutate({ id, data }, {
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
            trigger={<Button size="sm" variant="outline" className="flex items-center gap-2 cursor-pointer">
                <Edit size={14} />
            </Button>}
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
                        {isPending ? 'Updating...' : 'Update Category'}
                    </Button>
                </DialogFooter>
            </form>
        </CustomDialog>
    );
};

export default UpdateCategory;
