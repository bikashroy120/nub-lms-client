'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomInput from '@/components/shared/CustomInput';
import { CustomSelect } from '@/components/shared/CustomSelect';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import AdminSelect from '@/components/dashboard/courses/AdminSelect';
import CategorySelect from '@/components/dashboard/courses/CategorySelect';
import { createCourse } from '@/app/actions/course';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { AddTags } from '@/components/dashboard/courses/AddTags';
import AdminBreadcrumbs from '@/components/shared/AdminBreadcrumbs';
import { ImageUpload } from '@/components/shared/ImageUpload';


const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  sortDescription: z.string().optional(),
  thumbnail: z.string().optional(),
  instructorId: z.number({ coerce: true }).min(1, 'Select an instructor'),
  categoryId: z.number({ coerce: true }).min(1, 'Select a category'),
  price: z.number({ coerce: true }).default(0),
  isPublished: z.boolean().default(false),
  learn: z.array(z.string()).optional(),
  level: z.string(),
  included: z.array(z.string()).optional(),
});

export type CourseFormValues = z.infer<typeof courseSchema>;

const CreateCoursePage = () => {
  const [loading, setLoading] = useState(false)
  const [include, setInclude] = useState<string[]>([])
  const [learn, setLearn] = useState<string[]>([])
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      price: 0,
      isPublished: false,
    },
  });

  const onSubmit = async (data: CourseFormValues) => {
    setLoading(true)
    try {
      const res = await createCourse({
        ...data,
        learn,
        included: include,
      })

      if (res.success) {
        toast.success("course create Successfully")
        router.push('/dashboard/admin/course')
      } else {
        toast.error(res.message)
      }

    } catch (error) {
      toast.error('failed to create')
    } finally {
      setLoading(false)
    }
  };

  const levelOption = [
    {
      label: "Beginner",
      value: "beginner"
    },
    {
      label: "Intermediate",
      value: "intermediate"
    },
    {
      label: "Advance",
      value: "advance"
    },
  ]

  return (
    <>
      <AdminBreadcrumbs title='Course Add' />
      <div className="flex justify-center items-start py-5">
        <Card className="w-full max-w-3xl shadow-md border-t-4 border-t-primary mx-4">
          <CardHeader className="border-b bg-white">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Create New Course
            </CardTitle>
            <p className="text-sm text-gray-500">Provide all details to set up your course</p>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Title Field */}
              <CustomInput
                label="Course Title"
                name="title"
                register={register}
                errors={errors}
                placeholder="e.g. Full Stack Web Development"
              />

              {/* Description Field */}
              <div className="space-y-2">
                <Label htmlFor="description" className="font-semibold">Description (Optional)</Label>
                <Textarea
                  id="description"
                  {...register('sortDescription')}
                  placeholder="Write a brief course overview..."
                  className="min-h-[120px] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              {/* Instructor & Category Select */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminSelect
                  name="instructorId"
                  register={register}
                  errors={errors} />

                <CategorySelect
                  name="categoryId"
                  register={register}
                  errors={errors} />
              </div>

              {/* Thumbnail URL */}
              <CustomSelect
                label="Level"
                name={'level'}
                register={register}
                errors={errors}
                options={levelOption}
              />

              {/* Price & Published Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <CustomInput
                  label="Course Price ($)"
                  name="price"
                  type="number"
                  register={register}
                  errors={errors}
                />

                <div className="flex items-center space-x-3 p-3 border rounded-md bg-white h-[43px] mt-auto">
                  <input
                    type="checkbox"
                    id="isPublished"
                    {...register('isPublished')}
                    className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                  />
                  <Label htmlFor="isPublished" className="font-medium cursor-pointer">
                    Publish this course now
                  </Label>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-6 bg-primary hover:bg-blue-700 text-white font-bold cursor-pointer"
                >
                  {loading ? 'Creating Course...' : 'Create Course'}
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
        <div className=' space-y-7'>
          <Card className="w-full max-w-md shadow-md border-t-4 border-t-primary px-5 mx-4">
            <h2 className="text-xl font-semibold ">Upload Product Images</h2>
            <ImageUpload onImagesChange={(files) => setImages(files)} />
          </Card>
          <AddTags tags={include} setTags={setInclude} placeholder='Included in this course' />
          <AddTags tags={learn} setTags={setLearn} placeholder='You learn in this course' />
        </div>
      </div>
    </>
  );
};

export default CreateCoursePage;