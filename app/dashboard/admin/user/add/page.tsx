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
import { UserPlus, Mail, Phone, MapPin, Lock, ShieldCheck, Loader2 } from 'lucide-react';

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

  const onSubmit = async (data: userFormValues) => {
    setIsLoading(true);
    try {
      const res = await signUpFunction(data);
      if (res.success) {
        toast.success('User created successfully');
        router.push('/dashboard/admin/user');
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto py-8 px-4'>
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100">
          <UserPlus className="text-white" size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Create New User</h1>
          <p className="text-sm text-gray-500 font-medium">Fill in the information to register a new member</p>
        </div>
      </div>

      <Card className='shadow-xl shadow-blue-50/50 border-none bg-white/80 backdrop-blur-sm overflow-hidden'>
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>

        <CardContent className='p-8'>
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
                type='button'
                variant="ghost"
                onClick={() => router.back()}
                className='px-6 py-6 border text-gray-500 hover:text-gray-700'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={isLoading}
                className='min-w-[160px] py-6 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 transition-all active:scale-95'
              >
                {isLoading ? (
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