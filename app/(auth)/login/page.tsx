'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Lock, GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';
import { handleGoogleLogin } from '@/app/actions/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleEmailLogin = async () => {};

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
            <div className='relative'>
              <Mail className='absolute left-3 top-3 text-gray-400' size={18} />
              <Input
                className='pl-10'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className='relative'>
              <Lock className='absolute left-3 top-3 text-gray-400' size={18} />
              <Input
                type='password'
                className='pl-10'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login */}
            <Button className='w-full' onClick={handleEmailLogin}>
              Sign In
            </Button>

            <div className='flex items-center gap-2 text-sm text-gray-400'>
              <div className='flex-1 h-px bg-gray-200' />
              OR
              <div className='flex-1 h-px bg-gray-200' />
            </div>

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
