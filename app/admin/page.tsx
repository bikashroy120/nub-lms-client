'use client'

import { useState } from 'react'
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
import { Input } from '@/components/ui/input'
import { useLMS } from '@/lib/context/lms-context'
import {
  BarChart3,
  Users,
  BookOpen,
  TrendingUp,
  Plus,
  Trash2,
  Shield,
  Eye,
} from 'lucide-react'

export default function AdminDashboard() {
  const { courses, enrollments, students, teachers, addCourse } = useLMS()
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  const totalRevenue = courses.reduce(
    (sum, course) =>
      sum +
      course.price *
      enrollments.filter((e) => e.courseId === course.id).length,
    0,
  )

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      alert(`Category "${newCategory}" added successfully!`)
      setNewCategory('')
      setShowAddCategory(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage courses, users, and monitor platform analytics
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                  <p className="text-3xl font-bold">{courses.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-secondary/10 p-3">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold">
                    {students.length + teachers.length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-accent/10 p-3">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Enrollments</p>
                  <p className="text-3xl font-bold">{enrollments.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-3">
                  <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex gap-4 border-b border-border">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'courses'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'users'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'categories'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Categories
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Platform Statistics</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Enrollment Trend</h3>
                    <div className="h-32 bg-muted rounded flex items-center justify-center">
                      <p className="text-muted-foreground">Chart visualization</p>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Revenue Breakdown</h3>
                    <div className="h-32 bg-muted rounded flex items-center justify-center">
                      <p className="text-muted-foreground">Chart visualization</p>
                    </div>
                  </Card>
                </div>
              </div>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {enrollments.slice(-5).map((enrollment, idx) => {
                    const course = courses.find((c) => c.id === enrollment.courseId)
                    const student = students.find((s) => s.id === enrollment.studentId)
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between border-b border-border pb-4 last:border-0"
                      >
                        <div>
                          <p className="font-medium">{student?.name || 'Unknown'}</p>
                          <p className="text-sm text-muted-foreground">
                            Enrolled in {course?.title || 'Unknown Course'}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">{enrollment.enrolledDate}</p>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Manage Courses</h2>
              <div className="grid grid-cols-1 gap-6">
                {courses.map((course) => {
                  const enrollmentCount = enrollments.filter(
                    (e) => e.courseId === course.id,
                  ).length

                  return (
                    <Card key={course.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{course.title}</h3>
                            <span className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              {course.category}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {course.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/courses/${course.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                        <div>
                          <p className="text-xs text-muted-foreground">Instructor</p>
                          <p className="font-semibold">{course.instructor}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Students</p>
                          <p className="font-semibold">{enrollmentCount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Rating</p>
                          <p className="font-semibold">{course.rating}/5</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Price</p>
                          <p className="font-semibold">${course.price}</p>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Teachers</h2>
                <div className="grid grid-cols-1 gap-4">
                  {teachers.map((teacher) => {
                    const teacherCourses = courses.filter(
                      (c) => c.instructor === teacher.name,
                    )
                    return (
                      <Card key={teacher.id} className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{teacher.name}</p>
                          <p className="text-sm text-muted-foreground">{teacher.email}</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Courses</p>
                            <p className="font-semibold">{teacherCourses.length}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Students</h2>
                <div className="grid grid-cols-1 gap-4">
                  {students.map((student) => {
                    const studentEnrollments = enrollments.filter(
                      (e) => e.studentId === student.id,
                    )
                    return (
                      <Card key={student.id} className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Enrolled</p>
                            <p className="font-semibold">{studentEnrollments.length}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Course Categories</h2>
                <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Category</DialogTitle>
                      <DialogDescription>
                        Create a new course category for the platform
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Category Name</label>
                        <Input
                          placeholder="e.g., Cloud Computing"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setShowAddCategory(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddCategory} className="flex-1">
                        Add Category
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {['Web Development', 'Frontend', 'Data Science', 'Design', 'Backend', 'Mobile'].map(
                  (category) => {
                    const categoryCount = courses.filter((c) => c.category === category).length
                    return (
                      <Card key={category} className="p-6 flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{category}</p>
                          <p className="text-sm text-muted-foreground">
                            {categoryCount} courses
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </Card>
                    )
                  },
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
