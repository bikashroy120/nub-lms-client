'use client';

import CustomDialog from '@/components/shared/CustomDialog';
import CustomInput from '@/components/shared/CustomInput';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { useUpdateLesson } from '@/hooks/useLesson';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Edit } from 'lucide-react'; // Optional: for an icon
import { lessonSchema, LessonValues } from './AddLesson';

interface UpdateLessonProps {
    lesson: LessonValues & { id: number };
}

const UpdateLesson = ({ lesson }: UpdateLessonProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LessonValues>({
        resolver: zodResolver(lessonSchema),
        defaultValues: {
            title: lesson.title,
            videoUrl: lesson.videoUrl,
            content: lesson.content,
        },
    });

    const { mutate, isPending } = useUpdateLesson();

    const onSubmit = (data: LessonValues) => {
        mutate(
            { id: lesson.id, data },
            {
                onSuccess: () => {
                    setOpen(false);
                },
            }
        );
    };

    return (
        <CustomDialog
            open={open}
            onOpenChange={setOpen}
            title='Update Lesson'
            description='Edit the details of this lesson.'
            trigger={
                <Button size="sm" variant="outline" className="flex items-center gap-2 cursor-pointer">
                    <Edit size={14} />
                </Button>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <CustomInput
                    label='Lesson Title'
                    name='title'
                    register={register}
                    errors={errors}
                />

                <CustomInput
                    label='Video URL'
                    name='videoUrl'
                    register={register}
                    errors={errors}
                />

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">Content</label>
                    <textarea
                        {...register('content')}
                        className={`flex min-h-[100px] w-full rounded-md border bg-transparent px-3 py-2 text-sm ... ${errors.content ? 'border-red-500' : 'border-input'
                            }`}
                    />
                    {errors.content && (
                        <p className="text-xs text-red-500">{errors.content.message}</p>
                    )}
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='outline' type="button">Cancel</Button>
                    </DialogClose>
                    <Button type='submit' disabled={isPending}>
                        {isPending ? 'Updating...' : 'Save Changes'}
                    </Button>
                </DialogFooter>
            </form>
        </CustomDialog>
    );
};

export default UpdateLesson;