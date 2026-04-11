'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomInput from '@/components/shared/CustomInput';
import { CustomSelect } from '@/components/shared/CustomSelect';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { signUpFunction } from '@/app/actions/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const userSchema = z.object({
  name: z.string().min(1, 'Title is required'),
  email: z.string().email().nonempty(),
  password: z.string().min(4, 'Password must be at least 4 characters'),
  role: z.string().nonempty(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Instructor', value: 'instructor' },
  { label: 'User', value: 'user' },
];

type userFormValues = z.infer<typeof userSchema>;

const CreateCoursePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userFormValues>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: userFormValues) => {
    setIsLoading(true);
    try {
      const res = await signUpFunction(data);
      if (res.success) {
        toast.success('signup successfully');
        router.push('/dashboard/admin/user');
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('failed to signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center py-5'>
      <Card className='w-full max-w-3xl shadow-md border-t-4 border-t-blue-600 mx-4'>
        <CardHeader className='border-b bg-white'>
          <CardTitle className='text-2xl font-bold text-gray-800'>
            Create New User
          </CardTitle>
          <p className='text-sm text-gray-500'>
            Provide all details to set up your ne user
          </p>
        </CardHeader>

        <CardContent className='p-6'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            {/* Title Field */}
            <CustomInput
              label='User Name'
              name='name'
              register={register}
              errors={errors}
              placeholder='Enter user name'
            />

            <CustomInput
              label='User Email'
              name='email'
              register={register}
              errors={errors}
              placeholder='Enter user email'
            />

            <CustomSelect
              label='User Role'
              name='role'
              register={register}
              errors={errors}
              options={roleOptions}
            />

            <CustomInput
              label='User Phone'
              name='phone'
              register={register}
              errors={errors}
              placeholder='Enter user phone'
            />

            <CustomInput
              label='User Address'
              name='address'
              register={register}
              errors={errors}
              placeholder='Enter user address'
            />

            <CustomInput
              label='Password'
              name='password'
              register={register}
              errors={errors}
              placeholder='e.g. *********'
            />

            <div className='flex flex-col sm:flex-row gap-3 pt-6 border-t'>
              <Button
                type='submit'
                disabled={isLoading}
                className='flex-1 py-6 bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer'
              >
                {isLoading ? 'Creating Course...' : 'Create Course'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCoursePage;
