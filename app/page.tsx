'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLMS } from '@/lib/context/lms-context'
import { ArrowRight, Star, Users, BookOpen, Zap } from 'lucide-react'

export default function Home() {
  const { categories, courses } = useLMS()

  const topCourses = courses.slice(0, 3)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center md:py-32">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Learn from the Best Instructors in the World
            </h1>
            <p className="text-pretty text-lg text-muted-foreground md:text-xl">
              Master new skills with our comprehensive courses. From web development to data science, find
              courses that fit your learning goals.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/courses">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl font-bold text-primary">{courses.length}+</div>
              <p className="text-sm text-muted-foreground">Courses Available</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl font-bold text-primary">
                {courses.reduce((sum, c) => sum + c.students, 0).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Active Students</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl font-bold text-primary">500+</div>
              <p className="text-sm text-muted-foreground">Expert Instructors</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl font-bold text-primary">4.8★</div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="border-t border-border bg-card">
          <div className="container mx-auto px-4 py-20">
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl mb-12">
              Explore by Category
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                const categoryColor = {
                  'Web Development': 'bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300',
                  Frontend: 'bg-purple-100 text-purple-900 dark:bg-purple-900/30 dark:text-purple-300',
                  'Data Science': 'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-300',
                  Design: 'bg-pink-100 text-pink-900 dark:bg-pink-900/30 dark:text-pink-300',
                  Backend: 'bg-orange-100 text-orange-900 dark:bg-orange-900/30 dark:text-orange-300',
                  Mobile: 'bg-cyan-100 text-cyan-900 dark:bg-cyan-900/30 dark:text-cyan-300',
                }[category] || 'bg-gray-100 text-gray-900 dark:bg-gray-900/30 dark:text-gray-300'

                const icon = {
                  'Web Development': <BookOpen className="h-8 w-8" />,
                  Frontend: <Zap className="h-8 w-8" />,
                  'Data Science': <Users className="h-8 w-8" />,
                  Design: <Star className="h-8 w-8" />,
                  Backend: <BookOpen className="h-8 w-8" />,
                  Mobile: <Zap className="h-8 w-8" />,
                }[category] || <BookOpen className="h-8 w-8" />

                const coursesInCategory = courses.filter((c) => c.category === category).length

                return (
                  <Link key={category} href={`/courses?category=${category}`}>
                    <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
                      <div className={`flex items-center gap-4 p-6 ${categoryColor}`}>
                        <div className="flex-shrink-0">{icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{category}</h3>
                          <p className="text-sm opacity-75">{coursesInCategory} courses</p>
                        </div>
                        <ArrowRight className="h-5 w-5 opacity-0 transition-all group-hover:opacity-100" />
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl mb-12">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {topCourses.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl h-full">
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                      {course.category}
                    </p>
                    <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-foreground">
                      {course.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {course.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{course.rating}</span>
                        <span className="text-xs text-muted-foreground">({course.students})</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Instructor</p>
                        <p className="font-semibold text-sm">{course.instructor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">${course.price}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/courses">
              <Button size="lg">View All Courses</Button>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-primary py-16 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Ready to Start Learning?</h2>
            <p className="mt-4 text-lg opacity-90">Join thousands of students and transform your future today</p>
            <Link href="/courses" className="mt-8 inline-block">
              <Button size="lg" variant="secondary">
                Browse Courses Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-card">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div>
                <p className="font-semibold">LearnHub</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Empowering learners worldwide with quality education.
                </p>
              </div>
              <div>
                <p className="font-semibold">Company</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="#" className="hover:text-foreground">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Product</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="#" className="hover:text-foreground">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Legal</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="#" className="hover:text-foreground">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 LearnHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
