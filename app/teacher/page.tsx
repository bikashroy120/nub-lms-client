'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useLMS } from '@/lib/context/lms-context'
import { BookOpen, Plus, Users, TrendingUp, FileUp, Trash2 } from 'lucide-react'

export default function TeacherDashboard() {
  const { courses, enrollments, addCourse, currentUser } = useLMS()
  const [showAddCourse, setShowAddCourse] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    category: 'Web Development',
    level: 'Beginner',
  })
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const teacherCourses = courses.filter((c) => c.instructor === currentUser.name)

  const totalStudents = enrollments.filter((e) =>
    teacherCourses.some((c) => c.id === e.courseId),
  ).length

  const handleAddCourse = () => {
    if (!formData.title || !formData.description || !formData.price) {
      alert('Please fill in all required fields')
      return
    }

    const newCourse = {
      id: `course-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      instructor: currentUser.name,
      instructorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      price: parseFloat(formData.price),
      rating: 0,
      students: 0,
      duration: formData.duration || '20 hours',
      level: formData.level as 'Beginner' | 'Intermediate' | 'Advanced',
      category: formData.category,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      modules: [],
      reviews: [],
    }

    addCourse(newCourse)
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      category: 'Web Development',
      level: 'Beginner',
    })
    setUploadedFile(null)
    setShowAddCourse(false)
    alert('Course added successfully!')
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file.name)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Teacher Dashboard
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Manage your courses and monitor student progress
                </p>
              </div>
              <Dialog open={showAddCourse} onOpenChange={setShowAddCourse}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Course</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a new course for your students
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4 max-h-96 overflow-y-auto">
                    {/* Course Title */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Course Title *</label>
                      <Input
                        placeholder="e.g., Advanced React Patterns"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Description *</label>
                      <textarea
                        placeholder="Describe your course..."
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        className="w-full rounded border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-24"
                      />
                    </div>

                    {/* Course Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Price ($) *</label>
                        <Input
                          type="number"
                          placeholder="99.99"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Duration</label>
                        <Input
                          placeholder="e.g., 30 hours"
                          value={formData.duration}
                          onChange={(e) =>
                            setFormData({ ...formData, duration: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    {/* Category & Level */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                          }
                          className="w-full rounded border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          <option>Web Development</option>
                          <option>Frontend</option>
                          <option>Backend</option>
                          <option>Data Science</option>
                          <option>Design</option>
                          <option>Mobile</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Level</label>
                        <select
                          value={formData.level}
                          onChange={(e) =>
                            setFormData({ ...formData, level: e.target.value })
                          }
                          className="w-full rounded border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Course Materials (Optional)</label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="flex flex-col items-center gap-2 cursor-pointer"
                        >
                          <FileUp className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm font-medium">
                            {uploadedFile ? uploadedFile : 'Click to upload or drag and drop'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF, video, or course outline files
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddCourse(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddCourse} className="flex-1">
                      Create Course
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-12">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">My Courses</p>
                  <p className="text-3xl font-bold">{teacherCourses.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-secondary/10 p-3">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold">{totalStudents}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-accent/10 p-3">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Rating</p>
                  <p className="text-3xl font-bold">
                    {teacherCourses.length > 0
                      ? (
                        teacherCourses.reduce((sum, c) => sum + c.rating, 0) /
                        teacherCourses.length
                      ).toFixed(1)
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* My Courses */}
          <section>
            <h2 className="text-2xl font-bold mb-6">My Courses</h2>
            {teacherCourses.length === 0 ? (
              <Card className="p-12 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">No courses yet</p>
                <p className="text-muted-foreground mb-6">
                  Create your first course and start teaching
                </p>
                <Dialog open={showAddCourse} onOpenChange={setShowAddCourse}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create First Course
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {teacherCourses.map((course) => {
                  const courseEnrollments = enrollments.filter(
                    (e) => e.courseId === course.id,
                  ).length

                  return (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="aspect-video overflow-hidden bg-muted">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-xs font-semibold text-primary uppercase">
                              {course.category}
                            </p>
                            <h3 className="mt-2 font-semibold text-lg text-foreground">
                              {course.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {course.description}
                        </p>

                        <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-muted rounded-lg text-center">
                          <div>
                            <p className="text-2xl font-bold text-primary">
                              {courseEnrollments}
                            </p>
                            <p className="text-xs text-muted-foreground">Students</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-secondary">
                              {course.rating}
                            </p>
                            <p className="text-xs text-muted-foreground">Rating</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-accent">${course.price}</p>
                            <p className="text-xs text-muted-foreground">Price</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/courses/${course.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              View Course
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  )
}
