'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useLMS } from '@/lib/context/lms-context'
import { Star, Users, Clock, BarChart, BookOpen, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'

export default function CourseDetailsPage() {
  const params = useParams()
  const { courses, enrollments, addEnrollment, currentUser } = useLMS()
  const course = courses.find((c) => c.id === params.id)
  const [expandedModules, setExpandedModules] = useState<string[]>([])
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false)

  if (!course) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold">Course not found</h1>
          <Link href="/courses" className="mt-4 inline-block">
            <Button>Back to Courses</Button>
          </Link>
        </main>
      </>
    )
  }

  const isEnrolled = enrollments.some(
    (e) => e.studentId === currentUser.id && e.courseId === course.id,
  )

  const relatedCourses = courses
    .filter((c) => c.category === course.category && c.id !== course.id)
    .slice(0, 3)

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    )
  }

  const handleEnroll = () => {
    if (!isEnrolled) {
      addEnrollment({
        id: `enrollment-${Date.now()}`,
        studentId: currentUser.id,
        courseId: course.id,
        progress: 0,
        enrolledDate: new Date().toISOString().split('T')[0],
      })
      setShowEnrollmentModal(false)
      setIsEnrolling(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative h-80 w-full overflow-hidden bg-muted">
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-24 relative z-10">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Header */}
              <Card className="p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {course.category}
                    </span>
                    <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {course.level}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                    {course.title}
                  </h1>
                  <p className="text-lg text-muted-foreground">{course.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-2xl font-bold text-primary">{course.rating}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-xs text-muted-foreground">Rating</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">{course.students.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Students</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">{course.duration}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Duration</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {course.modules.length}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Modules</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Course Content */}
              <Card className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-6">Course Content</h2>
                {course.modules.length === 0 ? (
                  <p className="text-muted-foreground">Course content coming soon!</p>
                ) : (
                  <div className="space-y-3">
                    {course.modules.map((module) => (
                      <div key={module.id} className="border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleModule(module.id)}
                          className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                        >
                          <span className="font-semibold text-left">{module.title}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {module.lessons.length} lessons
                            </span>
                            {expandedModules.includes(module.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </div>
                        </button>
                        {expandedModules.includes(module.id) && (
                          <div className="border-t border-border bg-muted/30 p-4 space-y-3">
                            {module.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between pl-4"
                              >
                                <p className="text-sm">{lesson.title}</p>
                                <span className="text-xs text-muted-foreground">
                                  {lesson.duration} min
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Instructor */}
              <Card className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-6">Instructor</h2>
                <div className="flex items-center gap-4">
                  {course.instructorImage && (
                    <img
                      src={course.instructorImage}
                      alt={course.instructor}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-lg">{course.instructor}</p>
                    <p className="text-sm text-muted-foreground">Expert Instructor</p>
                  </div>
                </div>
              </Card>

              {/* Reviews */}
              {course.reviews.length > 0 && (
                <Card className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
                  <div className="space-y-4">
                    {course.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-border pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold">{review.author}</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-primary text-primary'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Enrollment Card */}
              <Card className="sticky top-20 p-6">
                <div className="mb-6">
                  <p className="text-4xl font-bold text-primary">${course.price}</p>
                </div>

                {isEnrolled ? (
                  <div className="space-y-4">
                    <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-3 flex gap-2">
                      <AlertCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-green-700 dark:text-green-400">
                        You are enrolled in this course!
                      </p>
                    </div>
                    <Link href="/dashboard/student">
                      <Button className="w-full" variant="outline">
                        Go to My Dashboard
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Dialog open={showEnrollmentModal} onOpenChange={setShowEnrollmentModal}>
                    <DialogTrigger asChild>
                      <Button className="w-full mb-4">Enroll Now</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Enrollment</DialogTitle>
                        <DialogDescription>
                          You are about to enroll in {course.title}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="rounded-lg border border-border p-4">
                          <h3 className="font-semibold mb-2">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">Price</p>
                              <p className="font-semibold">${course.price}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Duration</p>
                              <p className="font-semibold">{course.duration}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Level</p>
                              <p className="font-semibold">{course.level}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Instructor</p>
                              <p className="font-semibold">{course.instructor}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setShowEnrollmentModal(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleEnroll}
                          disabled={isEnrolling}
                          className="flex-1"
                        >
                          {isEnrolling ? 'Enrolling...' : 'Confirm Enrollment'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                <div className="space-y-3 mt-6 pt-6 border-t border-border text-sm">
                  <div className="flex items-center gap-2 text-foreground">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration} total</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                    <span>{course.level} level</span>
                  </div>
                </div>
              </Card>

              {/* Share */}
              <Card className="p-6">
                <p className="font-semibold mb-3">Share this course</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Share
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Related Courses */}
          {relatedCourses.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-bold mb-8">Related Courses</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedCourses.map((relatedCourse) => (
                  <Link key={relatedCourse.id} href={`/courses/${relatedCourse.id}`}>
                    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
                      <div className="aspect-video overflow-hidden bg-muted">
                        <img
                          src={relatedCourse.image}
                          alt={relatedCourse.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs font-semibold text-primary uppercase">
                          {relatedCourse.category}
                        </p>
                        <h3 className="mt-2 line-clamp-2 font-semibold text-foreground">
                          {relatedCourse.title}
                        </h3>
                        <p className="mt-2 line-clamp-1 text-xs text-muted-foreground">
                          By {relatedCourse.instructor}
                        </p>
                        <div className="mt-3 flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm font-medium">{relatedCourse.rating}</span>
                        </div>
                        <p className="mt-3 text-lg font-bold text-primary">${relatedCourse.price}</p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  )
}
