'use client';

import CustomDialog from '@/components/shared/CustomDialog';
import CustomInput from '@/components/shared/CustomInput';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
// Tanstack Query logic use korle hook-ti change hobe (niche example deya holo)
// import { useCreateLesson } from '@/hooks/useLesson'; 

// 1. Zod Schema design
const lessonSchema = z.object({
    title: z.string().min(2, 'Title is required'),
    videoUrl: z.string().url('Invalid video URL').or(z.string().min(1, 'Video URL is required')),
    content: z.string().min(10, 'Content must be at least 10 characters'),
});

type LessonValues = z.infer<typeof lessonSchema>;

const AddLesson = ({ id }: { id: number }) => {
    const [open, setOpen] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LessonValues>({
        resolver: zodResolver(lessonSchema),
    });

    // Tanstack Query ba Custom Hook call
    // const { mutate, isPending } = useCreateLesson();

    const onSubmit = async (data: LessonValues) => {
        console.log("Lesson Data:", data);

        // Mutate logic ekhane hobe:
        /* mutate(data, {
          onSuccess: () => {
            setOpen(false);
            reset(); // Form reset korar jonno
          }
        }) 
        */
    };

    return (
        <CustomDialog
            open={open}
            onOpenChange={setOpen}
            title='Add New Lesson'
            description='Fill in the details for the new lesson.'
            trigger={<Button>Add Lesson</Button>}
        >
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                {/* Lesson Title */}
                <CustomInput
                    label='Lesson Title'
                    name='title'
                    register={register}
                    errors={errors}
                    placeholder='Enter lesson title'
                />

                {/* Video URL */}
                <CustomInput
                    label='Video URL'
                    name='videoUrl'
                    register={register}
                    errors={errors}
                    placeholder='e.g. https://youtube.com/...'
                />

                {/* Content (Textarea hole CustomInput e support thaka dorkar) */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">Content</label>
                    <textarea
                        {...register('content')}
                        className={`flex min-h-[100px] w-full rounded-md border bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.content ? 'border-red-500' : 'border-input'
                            }`}
                        placeholder="Enter lesson description or content"
                    />
                    {errors.content && (
                        <p className="text-xs text-red-500">{errors.content.message}</p>
                    )}
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='outline' type="button">Cancel</Button>
                    </DialogClose>
                    <Button
                        type='submit'
                        className='cursor-pointer'
                    // disabled={isPending}
                    >
                        Add Lesson
                        {/* {isPending ? 'Adding...' : 'Add Lesson'} */}
                    </Button>
                </DialogFooter>
            </form>
        </CustomDialog>
    );
};

export default AddLesson;