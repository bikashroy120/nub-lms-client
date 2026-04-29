'use client'

import { ILesson } from '@/types/common';
import React from 'react'
import AddCategory from '../courses/AddCategory';
import { useGetLesson } from '@/hooks/useLesson';
import { DataTable } from '@/components/shared/DataTable';
import AddLesson from './AddLesson';
import UpdateLesson from './UpdateLesson';
import DeleteLesson from './DeleteLesson';

const LessonTable = ({ id }: { id: number }) => {

    const { data, isLoading } = useGetLesson(id);

    const columns = [
        { header: 'ID', accessor: 'id' as keyof ILesson },
        { header: 'Title', accessor: 'title' as keyof ILesson },
        { header: 'Description', accessor: 'content' as keyof ILesson },
        {
            header: 'Action',
            accessor: (row: ILesson) => (
                <div className=' flex items-center gap-4'>
                    <UpdateLesson lesson={row} />
                    <DeleteLesson id={row.id} name={row.title} />
                </div>
            ),
        },
    ];

    return (
        <div className=' bg-card shadow p-5 rounded-md'>
            <div className=' flex items-center gap-2 justify-between'>
                <h2 className=' font-semibold'>Lesson List</h2>
                <AddLesson id={id} />
            </div>

            <div className=' mt-5'>
                <DataTable data={data?.data} columns={columns} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default LessonTable