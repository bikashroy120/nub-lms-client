'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Lock, GraduationCap, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';
import { handleGoogleLogin, loginFunction } from '@/app/actions/auth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useAuth } from '@/lib/context/auth-context';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(4, 'password must be at last 4 characters'),
});

type loginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { setUserData } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleEmailLogin = async (data: loginValues) => {
    setLoading(true);
    try {
      const result = await loginFunction(data);
      if (result.success) {
        toast.success('login successfully');
        if (result.data.user.role === 'admin') {
          router.push('/dashboard/admin');
          setUserData(result.data.user)
        } else {
          router.push('/');
        }
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('failed to login try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen grid md:grid-cols-2 bg-gray-100'>
      {/* LEFT SIDE (Branding) */}
      <div className='hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-10'>
        <div className='max-w-md space-y-6'>
          <div className='flex items-center gap-3'>
            <GraduationCap size={40} />
            <h1 className='text-3xl font-bold'>LMS Platform</h1>
          </div>

          <p className='text-lg opacity-90'>
            Learn smarter, grow faster. Access courses, track progress, and
            achieve your goals — all in one place.
          </p>

          <ul className='space-y-2 text-sm opacity-80'>
            <li>✔ Track your learning progress</li>
            <li>✔ Interactive quizzes & certificates</li>
            <li>✔ শিক্ষক ও স্টুডেন্ট একসাথে</li>
          </ul>
        </div>
      </div>

      {/* RIGHT SIDE (Login Form) */}
      <div className='flex items-center justify-center p-6'>
        <Card className='w-full max-w-md shadow-2xl rounded-2xl'>
          <CardContent className='p-8 space-y-5'>
            <div className='text-center space-y-1'>
              <h2 className='text-2xl font-bold'>Welcome Back 👋</h2>
              <p className='text-sm text-gray-500'>
                Login to continue your learning journey
              </p>
            </div>

            {/* Email */}
            <form
              onSubmit={handleSubmit(handleEmailLogin)}
              className=' space-y-3'
            >
              <div className='space-y-1.5'>
                <div className='relative'>
                  <Mail
                    className='absolute left-3 top-3 text-gray-400'
                    size={18}
                  />
                  <Input
                    className={`pl-10 py-5 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    placeholder='Email address'
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className='text-xs text-red-500 ml-1'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className=' space-y-1.5'>
                <div className='relative'>
                  <Lock
                    className='absolute left-3 top-3 text-gray-400'
                    size={18}
                  />
                  <Input
                    type='password'
                    className={`pl-10 py-5 ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    placeholder='Password'
                    {...register('password')}
                  />
                </div>
                {errors.password && (
                  <p className='text-xs text-red-500 ml-1'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Login */}
              <Button className='w-full' type='submit' disabled={loading}>
                {loading ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  'Sign In'
                )}
              </Button>

              <div className='flex items-center gap-2 text-sm text-gray-400'>
                <div className='flex-1 h-px bg-gray-200' />
                OR
                <div className='flex-1 h-px bg-gray-200' />
              </div>
            </form>

            {/* Social Buttons */}
            <div className='grid grid-cols-2 gap-3'>
              <form action={handleGoogleLogin}>
                <GoogleLoginButton />
              </form>

              <Button variant='outline'>💻 GitHub</Button>
            </div>

            {/* Footer */}
            <p className='text-center text-sm text-gray-500'>
              Don’t have an account?{' '}
              <span
                onClick={() => router.push('/register')}
                className='text-indigo-600 cursor-pointer'
              >
                Sign up
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
