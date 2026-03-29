'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Lock, User, GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleRegister = async () => {
    // await fetch('http://localhost:3001/auth/register', {
    //   method: 'POST',
    //   body: JSON.stringify({ name, email, password }),
    //   headers: { 'Content-Type': 'application/json' },
    // });
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

            {/* Name */}
            <div className='relative'>
              <User className='absolute left-3 top-3 text-gray-400' size={18} />
              <Input
                className='pl-10'
                placeholder='Full Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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

            {/* Register */}
            <Button className='w-full' onClick={handleRegister}>
              Create Account
            </Button>

            <div className='flex items-center gap-2 text-sm text-gray-400'>
              <div className='flex-1 h-px bg-gray-200' />
              OR
              <div className='flex-1 h-px bg-gray-200' />
            </div>

            {/* Social Signup */}
            <div className='grid grid-cols-2 gap-3'>
              <Button variant='outline'>🌐 Google</Button>

              <Button variant='outline'>💻 GitHub</Button>
            </div>

            {/* Footer */}
            <p className='text-center text-sm text-gray-500'>
              Already have an account?{' '}
              <span
                className='text-indigo-600 cursor-pointer'
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
