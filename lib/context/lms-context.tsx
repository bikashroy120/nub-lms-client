'use client'

import React, { createContext, useContext, useState } from 'react'

// Types
export interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  duration: number // in minutes
}

export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  instructorImage?: string
  price: number
  rating: number
  students: number
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  image: string
  modules: Module[]
  reviews: Review[]
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'teacher' | 'student'
  avatar?: string
}

export interface Enrollment {
  id: string
  studentId: string
  courseId: string
  progress: number
  enrolledDate: string
}

interface LMSContextType {
  currentUser: User
  setCurrentUser: (user: User) => void
  courses: Course[]
  enrollments: Enrollment[]
  addEnrollment: (enrollment: Enrollment) => void
  addCourse: (course: Course) => void
  categories: string[]
  students: User[]
  teachers: User[]
  admins: User[]
}

const defaultUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'student',
}

const LMSContext = createContext<LMSContextType | undefined>(undefined)

export function LMSProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(defaultUser)
  const [enrollments, setEnrollments] = useState<Enrollment[]>([
    {
      id: '1',
      studentId: '1',
      courseId: 'course-1',
      progress: 65,
      enrolledDate: '2024-01-15',
    },
  ])

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 'course-1',
      title: 'Complete Web Development Bootcamp',
      description:
        'Master full-stack web development with HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects.',
      instructor: 'Sarah Johnson',
      instructorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      price: 99.99,
      rating: 4.8,
      students: 2450,
      duration: '40 hours',
      level: 'Beginner',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      modules: [
        {
          id: 'm1',
          title: 'HTML Fundamentals',
          lessons: [
            { id: 'l1', title: 'Introduction to HTML', duration: 15 },
            { id: 'l2', title: 'HTML Tags and Elements', duration: 20 },
          ],
        },
        {
          id: 'm2',
          title: 'CSS Styling',
          lessons: [
            { id: 'l3', title: 'CSS Basics', duration: 25 },
            { id: 'l4', title: 'Flexbox and Grid', duration: 30 },
          ],
        },
      ],
      reviews: [
        {
          id: 'r1',
          author: 'Mike Chen',
          rating: 5,
          comment: 'Excellent course! Very comprehensive and well-taught.',
          date: '2024-02-10',
        },
        {
          id: 'r2',
          author: 'Emma Davis',
          rating: 4,
          comment: 'Great content, could use more projects.',
          date: '2024-01-20',
        },
      ],
    },
    {
      id: 'course-2',
      title: 'React Advanced Patterns',
      description:
        'Deep dive into advanced React patterns, hooks, performance optimization, and state management solutions.',
      instructor: 'Alex Williams',
      instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      price: 79.99,
      rating: 4.7,
      students: 1820,
      duration: '30 hours',
      level: 'Advanced',
      category: 'Frontend',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
      modules: [
        {
          id: 'm3',
          title: 'React Hooks Mastery',
          lessons: [
            { id: 'l5', title: 'useState and useEffect', duration: 20 },
            { id: 'l6', title: 'Custom Hooks', duration: 25 },
          ],
        },
      ],
      reviews: [
        {
          id: 'r3',
          author: 'Lisa Park',
          rating: 5,
          comment: 'Best React course I have taken!',
          date: '2024-02-05',
        },
      ],
    },
    {
      id: 'course-3',
      title: 'Python for Data Science',
      description:
        'Learn Python programming with focus on data science, machine learning, and data visualization libraries.',
      instructor: 'Dr. James Kumar',
      instructorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      price: 89.99,
      rating: 4.9,
      students: 3200,
      duration: '45 hours',
      level: 'Intermediate',
      category: 'Data Science',
      image: 'https://images.unsplash.com/photo-1526374965328-7f5ae4d5a206?w=500&h=300&fit=crop',
      modules: [
        {
          id: 'm4',
          title: 'Python Basics',
          lessons: [
            { id: 'l7', title: 'Python Syntax', duration: 20 },
            { id: 'l8', title: 'Data Types', duration: 15 },
          ],
        },
      ],
      reviews: [],
    },
    {
      id: 'course-4',
      title: 'UI/UX Design Fundamentals',
      description:
        'Master the principles of user interface and user experience design. Learn design tools, wireframing, and prototyping.',
      instructor: 'Olivia Martinez',
      instructorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      price: 69.99,
      rating: 4.6,
      students: 1540,
      duration: '25 hours',
      level: 'Beginner',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
      modules: [],
      reviews: [
        {
          id: 'r4',
          author: 'James Wilson',
          rating: 4,
          comment: 'Good introduction to UX principles.',
          date: '2024-02-12',
        },
      ],
    },
    {
      id: 'course-5',
      title: 'Node.js Backend Development',
      description:
        'Build scalable backend applications with Node.js, Express, databases, and API design patterns.',
      instructor: 'David Thompson',
      instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      price: 84.99,
      rating: 4.7,
      students: 2100,
      duration: '35 hours',
      level: 'Intermediate',
      category: 'Backend',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      modules: [],
      reviews: [],
    },
    {
      id: 'course-6',
      title: 'Mobile App Development with React Native',
      description:
        'Create cross-platform mobile applications using React Native for iOS and Android development.',
      instructor: 'Sophie Anderson',
      instructorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      price: 94.99,
      rating: 4.8,
      students: 1650,
      duration: '38 hours',
      level: 'Intermediate',
      category: 'Mobile',
      image: 'https://images.unsplash.com/photo-1512941691920-ab78fd199e16?w=500&h=300&fit=crop',
      modules: [],
      reviews: [],
    },
  ])

  const categories = Array.from(new Set(courses.map((c) => c.category)))

  const students: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'student' },
    { id: '2', name: 'Emily Chen', email: 'emily@example.com', role: 'student' },
    { id: '3', name: 'Michael Brown', email: 'michael@example.com', role: 'student' },
  ]

  const teachers: User[] = [
    {
      id: 't1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'teacher',
    },
    {
      id: 't2',
      name: 'Alex Williams',
      email: 'alex@example.com',
      role: 'teacher',
    },
  ]

  const admins: User[] = [
    { id: 'a1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  ]

  const addEnrollment = (enrollment: Enrollment) => {
    setEnrollments((prev) => [...prev, enrollment])
  }

  const addCourse = (course: Course) => {
    setCourses((prev) => [...prev, course])
  }

  return (
    <LMSContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        courses,
        enrollments,
        addEnrollment,
        addCourse,
        categories,
        students,
        teachers,
        admins,
      }}
    >
      {children}
    </LMSContext.Provider>
  )
}

export function useLMS() {
  const context = useContext(LMSContext)
  if (context === undefined) {
    throw new Error('useLMS must be used within LMSProvider')
  }
  return context
}
