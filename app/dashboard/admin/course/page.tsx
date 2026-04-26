import { getCourses } from '@/app/actions/course'
import CourseTable from '@/components/dashboard/courses/CourseTable';
import AdminBreadcrumbs from '@/components/shared/AdminBreadcrumbs'
import { buildQueryParams } from '@/lib/utils';
import { Suspense } from 'react';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Course = async ({ searchParams }: PageProps) => {
    const params = await searchParams;
    const query = buildQueryParams(params);
    return (
        <div>
            <AdminBreadcrumbs title='Course List' />
            <div>
                <Suspense fallback={<div>Loading Filters...</div>}>
                    <CourseTable query={query} />
                </Suspense>
            </div>
        </div>
    )
}

export default Course