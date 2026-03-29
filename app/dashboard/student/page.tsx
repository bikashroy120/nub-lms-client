'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLMS } from '@/lib/context/lms-context'
import {
  BookOpen,
  BarChart3,
  Clock,
  Star,
  ArrowRight,
  Search,
  Zap,
} from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function StudentDashboard() {
  const { currentUser, courses, enrollments, setCurrentUser } = useLMS()
  const [searchTerm, setSearchTerm] = useState('')

  const enrolledCourses = enrollments
    .filter((e) => e.studentId === currentUser.id)
    .map((e) => {
      const course = courses.find((c) => c.id === e.courseId)
      return course ? { ...course, progress: e.progress, enrolledDate: e.enrolledDate } : null
    })
    .filter(Boolean)

  const recommendedCourses = courses
    .filter(
      (c) => !enrollments.some((e) => e.studentId === currentUser.id && e.courseId === c.id),
    )
    .slice(0, 3)

  const filteredRecommended = recommendedCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalHours = enrolledCourses.reduce((sum, course) => {
    const match = course?.duration.match(/(\d+)/)
    return sum + (match ? parseInt(match[1]) : 0)
  }, 0)

  const averageProgress =
    enrolledCourses.length > 0
      ? Math.round(
        enrolledCourses.reduce((sum, c) => sum + (c?.progress || 0), 0) /
        enrolledCourses.length,
      )
      : 0

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Welcome back, {currentUser.name}!
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Track your learning progress and continue your courses
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-12">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Enrolled Courses</p>
                  <p className="text-3xl font-bold">{enrolledCourses.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-secondary/10 p-3">
                  <BarChart3 className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Progress</p>
                  <p className="text-3xl font-bold">{averageProgress}%</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-accent/10 p-3">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Hours</p>
                  <p className="text-3xl font-bold">{totalHours}h</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-3">
                  <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Certificates</p>
                  <p className="text-3xl font-bold">0</p>
                </div>
              </div>
            </Card>
          </div>

          {/* My Courses */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">My Courses</h2>
            {enrolledCourses.length === 0 ? (
              <Card className="p-12 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">No courses yet</p>
                <p className="text-muted-foreground mb-6">
                  Explore our course catalog and start learning today
                </p>
                <Link href="/courses">
                  <Button>Browse Courses</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {enrolledCourses.map((course) => (
                  <Card
                    key={course?.id}
                    className="overflow-hidden transition-all hover:shadow-lg"
                  >
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={course?.image}
                        alt={course?.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-semibold text-primary uppercase">
                        {course?.category}
                      </p>
                      <h3 className="mt-2 line-clamp-2 font-semibold text-lg text-foreground">
                        {course?.title}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground">
                        By {course?.instructor}
                      </p>

                      {/* Progress Bar */}
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-muted-foreground">
                            Progress
                          </span>
                          <span className="text-xs font-bold text-primary">
                            {course?.progress}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                            style={{ width: `${course?.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-6 flex gap-2">
                        <Link href={`/courses/${course?.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            Resume
                          </Button>
                        </Link>
                        <Link href={`/courses/${course?.id}`} className="flex-1">
                          <Button className="w-full">Continue</Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Recommended Courses */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search recommended courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {filteredRecommended.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No recommended courses found</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredRecommended.map((course) => (
                  <Link key={course.id} href={`/courses/${course.id}`}>
                    <Card className="group overflow-hidden transition-all hover:shadow-lg h-full cursor-pointer">
                      <div className="aspect-video overflow-hidden bg-muted">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs font-semibold text-primary uppercase">
                          {course.category}
                        </p>
                        <h3 className="mt-2 line-clamp-2 font-semibold text-foreground">
                          {course.title}
                        </h3>
                        <p className="mt-2 line-clamp-1 text-xs text-muted-foreground">
                          By {course.instructor}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                          <span className="inline-block rounded-full bg-muted px-2 py-1 text-xs font-medium">
                            {course.level}
                          </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                          <span className="text-xs text-muted-foreground">
                            {course.students.toLocaleString()} students
                          </span>
                          <p className="font-bold text-primary">${course.price}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
            <div className="mt-8 text-center">
              <Link href="/courses">
                <Button variant="outline">
                  View All Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
