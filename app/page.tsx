'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLMS } from '@/lib/context/lms-context'
import { ArrowRight, Star, Users, BookOpen, Zap } from 'lucide-react'
import HeroSection from "@/components/pages/homePage/HeroSection"

export default function Home() {
  const { categories, courses } = useLMS()

  const topCourses = courses.slice(0, 3)

  return (
    <>
      <Header />
      <main className="min-h-screen ">
        {/* Hero Section */}
        <HeroSection />

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
