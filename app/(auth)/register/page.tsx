'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Lock, User, GraduationCap, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpFunction } from '@/app/actions/auth';
import { toast } from 'sonner';

// 1. Define the validation schema
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 2. Initialize the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterValues) => {
    setIsLoading(true);
    try {
      const res = await signUpFunction(data);
      if (res.success) {
        toast.success('signup successfully');
        router.push('/login');
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
    <div className='min-h-screen grid md:grid-cols-2 bg-gray-100'>
      {/* LEFT SIDE (Branding) */}
      <div className='hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-10'>
        <div className='max-w-md space-y-6'>
          <div className='flex items-center gap-3'>
            <GraduationCap size={40} />
            <h1 className='text-3xl font-bold'>Join LMS</h1>
          </div>
          <p className='text-lg opacity-90'>
            Start your learning journey today. Create your account and unlock
            unlimited courses and resources.
          </p>
          <ul className='space-y-2 text-sm opacity-80'>
            <li>✔ Learn from expert instructors</li>
            <li>✔ Track your progress easily</li>
            <li>✔ Interactive quizzes & certificates</li>
          </ul>
        </div>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className='flex items-center justify-center p-6'>
        <Card className='w-full max-w-md shadow-2xl rounded-2xl'>
          <CardContent className='p-8 space-y-5'>
            <div className='text-center space-y-1'>
              <h2 className='text-2xl font-bold'>Create Account 🚀</h2>
              <p className='text-sm text-gray-500'>
                Sign up to start learning today
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              {/* Name */}
              <div className='space-y-1'>
                <div className='relative'>
                  <User
                    className='absolute left-3 top-3 text-gray-400'
                    size={18}
                  />
                  <Input
                    {...register('name')}
                    className={`pl-10 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    placeholder='Full Name'
                  />
                </div>
                {errors.name && (
                  <p className='text-xs text-red-500 ml-1'>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className='space-y-1'>
                <div className='relative'>
                  <Mail
                    className='absolute left-3 top-3 text-gray-400'
                    size={18}
                  />
                  <Input
                    {...register('email')}
                    type='email'
                    className={`pl-10 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    placeholder='Email address'
                  />
                </div>
                {errors.email && (
                  <p className='text-xs text-red-500 ml-1'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className='space-y-1'>
                <div className='relative'>
                  <Lock
                    className='absolute left-3 top-3 text-gray-400'
                    size={18}
                  />
                  <Input
                    {...register('password')}
                    type='password'
                    className={`pl-10 ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    placeholder='Password'
                  />
                </div>
                {errors.password && (
                  <p className='text-xs text-red-500 ml-1'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button className='w-full' type='submit' disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className='flex items-center gap-2 text-sm text-gray-400'>
              <div className='flex-1 h-px bg-gray-200' />
              OR
              <div className='flex-1 h-px bg-gray-200' />
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <Button variant='outline' type='button'>
                🌐 Google
              </Button>
              <Button variant='outline' type='button'>
                💻 GitHub
              </Button>
            </div>

            <p className='text-center text-sm text-gray-500'>
              Already have an account?{' '}
              <span
                className='text-indigo-600 cursor-pointer font-medium hover:underline'
                onClick={() => router.push('/login')}
              >
                Sign In
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
