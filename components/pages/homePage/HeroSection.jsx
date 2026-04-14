import { Button } from '@/components/ui/button';
import { useLMS } from '@/lib/context/lms-context';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HeroSection = () => {
  const { categories, courses } = useLMS();

  return (
    <div className='bg-header relative pb-20 md:pb-25'>
      <section className='max-w-6xl mx-auto px-4 py-5  flex items-center flex-col md:flex-row gap-10 md:py-7'>
        <div className=' w-full space-y-6'>
          <h1 className='text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl'>
            Upskill for a Better Career
          </h1>
          <p className='text-pretty text-lg text-muted-foreground md:text-xl'>
            Master new skills with our comprehensive courses. From web
            development to data science, find courses that fit your learning
            goals.
          </p>
          <div className='flex flex-col gap-4 sm:flex-row sm:justify-start'>
            <Link href='/courses'>
              <Button size='lg' className='w-full sm:w-auto'>
                Explore Courses
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
            <Button size='lg' variant='outline' className='w-full sm:w-auto'>
              Learn More
            </Button>
          </div>
        </div>

        <div className=' w-full hidden'>
          <Image
            src={'/hero.webp'}
            width={1500}
            height={1000}
            alt='hero'
            className=' w-auto h-auto object-cover '
          />
        </div>

        {/* Stats */}
      </section>

      <div className=' absolute bottom-[-80px]  md:bottom-[-100px]  w-full left-[50%] translate-x-[-50%]  max-w-6xl  '>
        <div className=' grid grid-cols-2 md:gap-8  md:grid-cols-4 md:py-10  bg-white rounded-2xl shadow mx-3'>
          <div className='flex flex-col items-center border-b md:border-b-0 border-r py-3 md:py-7 gap-2'>
            <div className='text-xl md:text-4xl font-bold text-primary'>
              {courses.length}+
            </div>
            <p className='text-sm text-muted-foreground'>Courses Available</p>
          </div>
          <div className='flex flex-col items-center gap-2 border-b md:border-b-0  md:border-r py-3 md:py-7'>
            <div className='text-xl md:text-4xl font-bold text-primary'>
              {courses.reduce((sum, c) => sum + c.students, 0).toLocaleString()}
            </div>
            <p className='text-sm text-muted-foreground'>Active Students</p>
          </div>
          <div className='flex flex-col items-center gap-2 border-r py-3 md:py-7'>
            <div className='text-xl md:text-4xl font-bold text-primary'>500+</div>
            <p className='text-sm text-muted-foreground'>Expert Instructors</p>
          </div>
          <div className='flex flex-col items-center gap-2 py-3 md:py-7'>
            <div className='text-xl md:text-4xl font-bold text-primary'>4.8★</div>
            <p className='text-sm text-muted-foreground'>Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
