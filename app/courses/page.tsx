
import { Suspense } from 'react'
import { Header } from '@/components/header'

import CategoryFilter from '@/components/pages/courses/CategoryFilter'
import LevelFilter from '@/components/pages/courses/LevelFilter'
import SearchFilter from '@/components/pages/courses/SearchFilter'
import { getCourses } from '../actions/course'
import CoursesList from '@/components/pages/courses/CoursesList'

export default async function CoursesPage() {
  const result = await getCourses({})
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-course">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">All Courses</h1>
            <p className="mt-2 text-muted-foreground">
              Discover 10 courses across multiple categories
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-8">
              <h2>Browse by Filter</h2>
              <SearchFilter />
              <CategoryFilter />
              <LevelFilter />
            </div>

            {/* Courses Grid */}
            <div className="lg:col-span-3">
              <Suspense fallback={<h2>Loading</h2>}>
                <CoursesList course={result?.data?.data} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
