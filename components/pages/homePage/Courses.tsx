import { getCourses } from '@/app/actions/course'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ICourses } from '@/types/category'
import { Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import CourseCard from './CourseCard'

const Courses = async () => {
    const result = await getCourses({})
    return (
        <section className="max-w-6xl mx-auto px-4 py-20 mt-10 md:mt-20">
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl mb-12">
                Featured Courses
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {result.data.data.map((course: ICourses) => (
                    <CourseCard course={course} key={course.id} />
                ))}
            </div>

            <div className="mt-12 text-center">
                <Link href="/courses">
                    <Button size="lg">View All Courses</Button>
                </Link>
            </div>
        </section>
    )
}

export default Courses