'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomInput from '@/components/shared/CustomInput';
import { CustomSelect } from '@/components/shared/CustomSelect';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';


const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  instructorId: z.number({ coerce: true }).min(1, 'Select an instructor'),
  categoryId: z.number({ coerce: true }).min(1, 'Select a category'),
  price: z.number({ coerce: true }).default(0),
  isPublished: z.boolean().default(false),
});

type CourseFormValues = z.infer<typeof courseSchema>;

// মক ডাটা (পরবর্তীতে API থেকে আসবে)
const instructorOptions = [
  { label: 'Bikash Chandra', value: 1 },
  { label: 'Anisul Islam', value: 2 },
];

const categoryOptions = [
  { label: 'Web Development', value: 101 },
  { label: 'App Development', value: 102 },
  { label: 'UI/UX Design', value: 103 },
];

const CreateCoursePage = () => {
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
    console.log('Final Course Data:', data);
    // এখানে আপনার সার্ভার অ্যাকশন বা API কল হবে
  };

  return (
    <div className="flex justify-center items-center py-5">
      <Card className="w-full max-w-3xl shadow-md border-t-4 border-t-blue-600 mx-4">
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
                {...register('description')}
                placeholder="Write a brief course overview..."
                className="min-h-[120px] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            {/* Instructor & Category Select */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomSelect
                label="Instructor"
                name="instructorId"
                register={register}
                errors={errors}
                options={instructorOptions}
              />
              <CustomSelect
                label="Category"
                name="categoryId"
                register={register}
                errors={errors}
                options={categoryOptions}
              />
            </div>

            {/* Thumbnail URL */}
            <CustomInput
              label="Thumbnail Image URL"
              name="thumbnail"
              register={register}
              errors={errors}
              placeholder="https://example.com/image.jpg"
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
              
              <div className="flex items-center space-x-3 p-4 border rounded-md bg-white h-[54px] mt-auto">
                <input
                  type="checkbox"
                  id="isPublished"
                  {...register('isPublished')}
                  className="w-5 h-5 rounded accent-blue-600 cursor-pointer"
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
                disabled={isSubmitting}
                className="flex-1 py-6 bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
              >
                {isSubmitting ? 'Creating Course...' : 'Create Course'}
              </Button>
              <Button type="button" variant="outline" className="flex-1 py-6">
                Cancel
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCoursePage;