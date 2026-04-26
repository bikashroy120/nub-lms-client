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
import { UserPlus, Mail, Phone, MapPin, Lock, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
import { usePostUser } from '@/hooks/useUsers';
import AdminBreadcrumbs from '@/components/shared/AdminBreadcrumbs';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
  role: z.string().min(1, 'Role is required'),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Instructor', value: 'instructor' },
  { label: 'User', value: 'user' },
];

type userFormValues = z.infer<typeof userSchema>;

const CreateUserPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: 'user'
    }
  });

  const { mutate, isPending } = usePostUser()

  const onSubmit = async (data: userFormValues) => {
    mutate(data, {
      onSuccess: () => {
        router.push('/dashboard/admin/user');
      }
    });
  };

  return (
    <div className='max-w-4xl mx-auto  px-4'>
      {/* Header Section */}
      {/* <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100">
          <UserPlus className="text-white" size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Create New User</h1>
          <p className="text-sm text-gray-500 font-medium">Fill in the information to register a new member</p>
        </div>
      </div> */}

      <div className="flex flex-col mb-8">
        {/* New Back Button */}
        <AdminBreadcrumbs title='User Add' />

        <button
          onClick={() => router.back()}
          className="flex items-center cursor-pointer gap-2 text-gray-500 hover:text-blue-600 transition-colors w-fit font-medium text-sm"
        >
          <ArrowLeft size={18} />
          Back to list
        </button>
      </div>

      <Card className='shadow-xl shadow border-none bg-white backdrop-blur-sm overflow-hidden'>
        <CardContent className='px-8 py-5'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>

            {/* Form Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

              <div className="space-y-1">
                <CustomInput
                  label='Full Name'
                  name='name'
                  register={register}
                  errors={errors}
                  placeholder='Bikash Chandra'
                />
              </div>

              <div className="space-y-1">
                <CustomInput
                  label='Email Address'
                  name='email'
                  register={register}
                  errors={errors}
                  placeholder='example@mail.com'
                />
              </div>

              <div className="space-y-1">
                <CustomSelect
                  label='Assign Role'
                  name='role'
                  register={register}
                  errors={errors}
                  options={roleOptions}
                />
              </div>

              <div className="space-y-1">
                <CustomInput
                  label='Phone Number'
                  name='phone'
                  register={register}
                  errors={errors}
                  placeholder='+880 1XXX XXXXXX'
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <CustomInput
                  label='Home Address'
                  name='address'
                  register={register}
                  errors={errors}
                  placeholder='Street, City, Country'
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <CustomInput
                  label='Access Password'
                  name='password'
                  type="password"
                  register={register}
                  errors={errors}
                  placeholder='Create a strong password'
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center justify-end gap-4 pt-6 border-t border-gray-100'>
              <Button
                type='submit'
                disabled={isPending}
                className=' w-full py-6 bg-primary hover:bg-primary text-white font-bold shadow-lg shadow-blue-200 transition-all active:scale-95'
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create User account'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateUserPage;