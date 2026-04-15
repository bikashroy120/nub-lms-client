import { ICourses } from '@/types/category'
import React from 'react'
import CourseCard from '../homePage/CourseCard'

const CoursesList = ({ course }: { course: ICourses[] }) => {

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {course.map((course: ICourses) => (
                <CourseCard course={course} key={course.id} />
            ))}
        </div>
    )
}

export default CoursesList