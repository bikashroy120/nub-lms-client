'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  BookOpen,
  BarChart3,
  Star,
} from 'lucide-react'
import { useAuth } from '@/lib/context/auth-context'
import { useGetMyCourse } from '@/hooks/useEnrollment'
import { EnrolledCourse } from '@/types/common'
import DashboardSkeleton from '@/components/skeleton/DashboardSkeleton'

const getAverageProgress = (courses: EnrolledCourse[]): number => {
  if (!courses || courses.length === 0) return 0;
  const totalProgress = courses.reduce((acc, course) => {
    const courseProgress = course.totalLessons > 0
      ? (course.completedLessons / course.totalLessons) * 100
      : 0;

    return acc + courseProgress;
  }, 0);
  return Math.round(totalProgress / courses.length);
};

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('course')
  const { user } = useAuth()

  const { data, isLoading } = useGetMyCourse()


  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-card">
          <div className=" max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Welcome back, {user?.name}!
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Track your learning progress and continue your courses
                </p>
              </div>
            </div>
          </div>
        </div>

        {
          isLoading ? (
            <DashboardSkeleton />
          ) : (
            <div className=" max-w-6xl mx-auto px-4 py-12">
              {/* Stats */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-12">
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Enrolled Courses</p>
                      <p className="text-3xl font-bold">{data?.data?.length || 0}</p>
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
                      <p className="text-3xl font-bold">{getAverageProgress(data?.data)}%</p>
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

              <div className="mb-8 flex gap-4 border-b border-border">
                <button
                  onClick={() => setActiveTab('course')}
                  className={`px-4 py-2 font-medium cursor-pointer transition-colors ${activeTab === 'course'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  My Courses
                </button>
                <button
                  onClick={() => setActiveTab('certificates')}
                  className={`px-4 py-2 font-medium cursor-pointer transition-colors ${activeTab === 'certificates'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  My Certificates
                </button>

              </div>

              {activeTab === 'course' && <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">My Courses</h2>
                {data?.data?.length === 0 ? (
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
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {data?.data?.map((course: EnrolledCourse) => (
                      <Card
                        key={course.courseId}
                        className="overflow-hidden transition-all py-0 hover:shadow-lg"
                      >
                        <div className="aspect-video overflow-hidden bg-muted">
                          <img
                            src={'/9cd72090c321463dbd789e7ca111da72.webp'}
                            alt={course.courseTitle}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <p className="text-xs font-semibold text-primary uppercase">
                            {course.categoryName}
                          </p>
                          <h3 className="mt-2 line-clamp-2 font-semibold text-lg text-foreground">
                            {course.courseTitle}
                          </h3>
                          <p className="mt-2 text-xs text-muted-foreground">
                            By {course.instructor.name}
                          </p>

                          {/* Progress Bar */}
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-muted-foreground">
                                Progress
                              </span>
                              <span className="text-xs font-bold text-primary">
                                0 %
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                                style={{ width: `${0}%` }}
                              />
                            </div>
                          </div>

                          <div className="mt-6 flex gap-2">

                            <Link href={`/courses/${course.courseId}`} className="flex-1">
                              <Button className="w-full">Continue</Button>
                            </Link>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </section>}

            </div>
          )
        }
      </main>
    </>
  )
}
