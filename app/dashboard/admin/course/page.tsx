import { getCourses } from '@/app/actions/course'
import CourseTable from '@/components/dashboard/courses/CourseTable';
import AdminBreadcrumbs from '@/components/shared/AdminBreadcrumbs'
import React from 'react'

const Course = async (

) => {
    const result = await getCourses({});
    console.log(result.data)
    return (
        <div>
            <AdminBreadcrumbs title='Course List' />
            <div>
                <CourseTable courses={result.data.data} metaData={result.data.meta} />
            </div>
        </div>
    )
}

export default Course