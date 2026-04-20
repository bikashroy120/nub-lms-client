import { getSingleCourses } from '@/app/actions/course';
import EditCourse from '@/components/dashboard/courses/EditCourse';
import React from 'react'

interface Props {
    params: Promise<{
        id: string;
    }>;
}

const page = async ({ params }: Props) => {
    const { id } = await params;
    const result = await getSingleCourses(id)
    return (
        <div>
            <EditCourse course={result.data} />
        </div>
    )
}

export default page