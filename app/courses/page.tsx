'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useLMS } from '@/lib/context/lms-context'
import { Star, Search, Filter } from 'lucide-react'

export default function CoursesPage() {
  const { courses, categories } = useLMS()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  const filteredCourses = useMemo(() => {
    let filtered = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = !selectedCategory || course.category === selectedCategory
      const matchesLevel = !selectedLevel || course.level === selectedLevel

      return matchesSearch && matchesCategory && matchesLevel
    })

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.students - a.students)
    }

    return filtered
  }, [courses, searchTerm, selectedCategory, selectedLevel, sortBy])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">All Courses</h1>
            <p className="mt-2 text-muted-foreground">
              Discover {courses.length} courses across multiple categories
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar Filters */}
            <div className="space-y-6">
              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Categories
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`block w-full text-left rounded px-3 py-2 text-sm transition-colors ${
                      !selectedCategory
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'hover:bg-muted'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left rounded px-3 py-2 text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground font-medium'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Level</label>
                <div className="space-y-2">
                  {['All Levels', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level === 'All Levels' ? '' : level)}
                      className={`block w-full text-left rounded px-3 py-2 text-sm transition-colors ${
                        selectedLevel === (level === 'All Levels' ? '' : level)
                          ? 'bg-primary text-primary-foreground font-medium'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedCategory || selectedLevel) && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('')
                    setSelectedLevel('')
                  }}
                  className="w-full rounded bg-muted px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Courses Grid */}
            <div className="lg:col-span-3">
              {filteredCourses.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border bg-card p-12 text-center">
                  <p className="text-muted-foreground">No courses found matching your criteria.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('')
                      setSelectedLevel('')
                    }}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredCourses.map((course) => (
                    <Link key={course.id} href={`/courses/${course.id}`}>
                      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <div className="aspect-video overflow-hidden bg-muted">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-semibold text-primary uppercase">
                              {course.category}
                            </p>
                            <span className="inline-block rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                              {course.level}
                            </span>
                          </div>
                          <h3 className="mt-2 line-clamp-2 font-semibold text-foreground">
                            {course.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                            By {course.instructor}
                          </p>

                          <div className="mt-3 flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="text-sm font-medium">{course.rating}</span>
                            <span className="text-xs text-muted-foreground">
                              ({course.students.toLocaleString()})
                            </span>
                          </div>

                          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                            <p className="text-xs text-muted-foreground">{course.duration}</p>
                            <p className="text-lg font-bold text-primary">${course.price}</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-8 text-center text-sm text-muted-foreground">
                Showing {filteredCourses.length} of {courses.length} courses
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
