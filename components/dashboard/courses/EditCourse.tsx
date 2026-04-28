'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Loader2,
    BadgeDollarSign,
    ChevronRight,
    ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import CustomInput from '@/components/shared/CustomInput';
import { CustomSelect } from '@/components/shared/CustomSelect';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AdminSelect from '@/components/dashboard/courses/AdminSelect';
import CategorySelect from '@/components/dashboard/courses/CategorySelect';
import AdminBreadcrumbs from '@/components/shared/AdminBreadcrumbs';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { AddTags } from '@/components/dashboard/courses/AddTags';
import { ICourses } from '@/types/category';
import { useUpdateCourse } from '@/hooks/useCourse';


const courseSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    sortDescription: z.string().optional(),
    instructorId: z.number({ coerce: true }).min(1, 'Select an instructor'),
    categoryId: z.number({ coerce: true }).min(1, 'Select a category'),
    price: z.number({ coerce: true }).default(0),
    isPublished: z.boolean().default(false),
    level: z.string().min(1, 'Select a level'),
    learn: z.array(z.string()).optional(),
    included: z.array(z.string()).optional(),
});

export type CourseFormValues = z.infer<typeof courseSchema>;

const EditCourse = ({ course }: { course: ICourses }) => {
    const [loading, setLoading] = useState(false);
    const [include, setInclude] = useState<string[]>([]);
    const [learn, setLearn] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const router = useRouter();

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CourseFormValues>({
        resolver: zodResolver(courseSchema),
        defaultValues: { price: 0, isPublished: false, level: 'beginner' },
    });

    useEffect(() => {
        if (course) {
            setLearn(course.learn || []);
            setInclude(course.included || []);
            setValue('title', course.title);
            setValue('sortDescription', course.sortDescription);
            // setValue('instructorId', course.instructor?.id);
            setValue('categoryId', course.category.id);
            setValue('price', course.price);
            setValue('isPublished', course.isPublished);
        }
    }, [course])

    const isPublished = watch('isPublished');

    const { mutate, isPending } = useUpdateCourse()

    const onSubmit = async (data: CourseFormValues) => {
        const payload = { ...data, learn, included: include }
        mutate({ id: course.id, data: payload }, {
            onSuccess: () => {
                router.push('/dashboard/admin/course');
            }
        });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 md:px-6">
            {/* Header with minimal breadcrumb */}
            <div className="flex flex-col mb-8">
                <AdminBreadcrumbs title='Update Course' />
                <button
                    onClick={() => router.back()}
                    className="flex items-center cursor-pointer gap-2 text-gray-500 hover:text-blue-600 transition-colors w-fit font-medium text-sm"
                >
                    <ArrowLeft size={18} />
                    Back to list
                </button>
            </div>

            <Card className="border-none  bg-white/70  rounded-xl overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="p-0">

                        {/* Top Section: Banner Style Upload */}
                        <div className="bg-gray-50/50 p-8 md:p-12 border-b border-gray-100 flex flex-col items-center">
                            <div className="w-full">
                                <ImageUpload onImagesChange={(files: any) => setImages(files)} maxFiles={1} />
                            </div>
                        </div>

                        <div className="px-8 py-5 md:px-10 space-y-10">

                            {/* Section 1: Core Details */}
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <CustomInput
                                        label="Course Title"
                                        name="title"
                                        register={register}
                                        errors={errors}
                                        placeholder="Enter a catchy title for your course"
                                    />
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-gray-700">Course Sort Description</Label>
                                        <Textarea
                                            {...register('sortDescription')}
                                            placeholder="Write a brief overview of what this course covers..."
                                            className="min-h-[120px] focus-visible:ring-0 py-5.5 focus-visible:ring-offset-0"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <AdminSelect name="instructorId" register={register} errors={errors} setValue={setValue} defaultValue={Number(course?.instructor?.id)} />
                                    <CategorySelect name="categoryId" register={register} errors={errors} setValue={setValue} defaultValue={course.category.id} />
                                    <CustomSelect
                                        label="Course Level"
                                        name="level"
                                        register={register}
                                        errors={errors}
                                        options={[
                                            { label: "Beginner", value: "beginner" },
                                            { label: "Intermediate", value: "intermediate" },
                                            { label: "Advance", value: "advance" },
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-end gap-6 w-full md:w-auto">
                                <div className="w-full">
                                    <Label className="text-sm font-bold text-gray-700 mb-2 block">Price (USD)</Label>
                                    <div className="relative">
                                        <BadgeDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="number"
                                            {...register('price')}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50  rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 border transition-all font-bold text-lg"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4  rounded-2xl border  w-full">
                                    <Switch
                                        id="isPublished"
                                        checked={isPublished}
                                        onCheckedChange={(val) => setValue('isPublished', val)}
                                    />
                                    <div className="leading-tight">
                                        <Label htmlFor="isPublished" className="text-sm font-bold block cursor-pointer">Live Status</Label>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Features & Tags */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <AddTags tags={learn} setTags={setLearn} placeholder="What's included in this course" />
                                </div>
                                <div className="space-y-4">
                                    <AddTags tags={include} setTags={setInclude} placeholder="What will you learn in this course" />
                                </div>
                            </div>

                            {/* Section 3: Pricing & Publish */}
                            <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                                <Button
                                    disabled={isPending}
                                    className=" bg-primary hover:bg-indigo-700 w-full text-white h-12 px-10 rounded-2xl shadow-xl cursor-pointer transition-all active:scale-95 group"
                                >
                                    {isPending ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <>
                                            <span className="font-bold text-base">Create Course</span>
                                            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                        </>
                                    )}
                                </Button>
                            </div>

                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
};

export default EditCourse;