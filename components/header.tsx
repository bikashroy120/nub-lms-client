'use client';

import Link from 'next/link';
import { useLMS } from '@/lib/context/lms-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, GraduationCap } from 'lucide-react';
import { useAuth } from '@/lib/context/auth-context';

export function Header() {
  const { currentUser, setCurrentUser } = useLMS();
  const { user, logout } = useAuth();


  const switchRole = (role: 'admin' | 'teacher' | 'student') => {
    setCurrentUser({
      ...currentUser,
      role,
      name:
        role === 'admin'
          ? 'Admin User'
          : role === 'teacher'
            ? 'Sarah Johnson'
            : 'John Doe',
    });
  };

  const getDashboardLink = () => {
    switch (currentUser.role) {
      case 'admin':
        return '/admin';
      case 'teacher':
        return '/teacher';
      case 'student':
        return '/dashboard/student';
      default:
        return '/';
    }
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link href='/' className='flex items-center gap-2'>
          <GraduationCap className='h-6 w-6 text-primary' />
          <span className='text-xl font-bold text-primary'>LearnHub</span>
        </Link>

        <nav className='hidden gap-6 md:flex'>
          <Link
            href='/'
            className='text-sm font-medium text-foreground hover:text-primary'
          >
            Home
          </Link>
          <Link
            href='/courses'
            className='text-sm font-medium text-foreground hover:text-primary'
          >
            Courses
          </Link>
          <Link
            href='/about'
            className='text-sm font-medium text-foreground hover:text-primary'
          >
            About
          </Link>
        </nav>

        <div className='flex items-center gap-4'>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm'>
                  <User className='mr-2 h-4 w-4' />
                  {user.name.split(' ')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <div className='px-2 py-1.5 text-sm font-semibold'>
                  {user.name}
                </div>
                <div className='px-2 py-1 text-xs text-muted-foreground'>
                  {user.email}
                </div>
                <div className='my-2 border-t border-border' />
                {user.role === 'user' && (
                  <>
                    <DropdownMenuItem onClick={() => switchRole('student')}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => switchRole('student')}>
                      My Courses
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => logout()}>
                      Logout
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href={'/login'}>
                <Button variant='outline' size='sm'>
                  <User className='mr-2 h-4 w-4' /> login
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
