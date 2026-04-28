import LessonTable from '@/components/dashboard/lesson/LessonTable';
import AdminBreadcrumbs from '@/components/shared/AdminBreadcrumbs';
import React, { Suspense } from 'react'

interface Props {
    params: Promise<{
        id: string;
    }>;
}

const page = async ({ params }: Props) => {
    const { id } = await params;
    return (
        <div>
            <AdminBreadcrumbs title='Lesson List' />
            <Suspense fallback={<div>Loading Lesson...</div>}>
                <LessonTable id={Number(id)} />
            </Suspense>
        </div>
    )
}

export default page