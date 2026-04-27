"use client"

import { CustomPagination } from "@/components/shared/CustomPagination"
import { DataTable } from "@/components/shared/DataTable"
import SearchFilter from "@/components/shared/SearchFilter"
import { Button } from "@/components/ui/button"
import { useGetCourses } from "@/hooks/useCourse"
import { ICourses, IMetaData } from "@/types/category"
import Link from "next/link"
import CourseCategoryFilter from "./CourseCategoryFilter"


const CourseTable = ({ query, }: { query: string }) => {
    const { data, isLoading } = useGetCourses(query)
    const columns = [
        {
            header: "ID",
            accessor: 'id' as keyof ICourses,
        },
        {
            header: "Title",
            accessor: (row: ICourses) => (
                <div className=" max-w-[300px] flex text-wrap">
                    <span>{row.title}</span>
                </div>
            ),
        },
        {
            header: "instructor",
            accessor: (row: ICourses) => (
                <div className=" flex flex-col">
                    <span>{row.instructor.name}</span>
                    <span>{row.instructor.email}</span>
                </div>
            ),
        },
        {
            header: "Category",
            accessor: (row: ICourses) => (
                <span>{row.category.name}</span>
            ),
        },
        {
            header: "Price",
            accessor: (row: ICourses) => (
                <span className=" font-bold">${row.price}</span>
            ),
        },
        {
            header: "Lesson",
            accessor: 'lessonCount' as keyof ICourses,
        },
        {
            header: "Published",
            accessor: (row: ICourses) => (
                <span>{row.price}</span>
            ),
        },
        {
            header: 'Actions',
            accessor: (row: ICourses) => (
                <div className=' flex items-center gap-3'>
                    <Link href={`/dashboard/admin/course/${row.id}`}>
                        <Button size={'sm'} variant={'outline'} className=" cursor-pointer">
                            Edit
                        </Button>
                    </Link>
                    <Button
                        size={'sm'}
                        variant={'outline'}
                        className=' bg-red-100 text-red-600 border border-red-200 cursor-pointer hover:bg-red-500 hover:text-white duration-200'
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ]

    return (
        <div className=' bg-card shadow p-5 rounded-md'>
            <div className=' flex items-center gap-2 justify-between'>
                <h2 className=' font-semibold text-lg'>Course List</h2>
                <div className=" flex items-center gap-5">
                    <SearchFilter
                        queryKey="searchTram"
                        placeholder="Course title or category..."
                        className="w-72"
                    />
                    <CourseCategoryFilter />
                    <Button className=' py-5'>
                        <Link href={'/dashboard/admin/course/add'}>Add Course</Link>
                    </Button>
                </div>
            </div>

            <div className=' mt-5'>
                <DataTable data={data?.data as []} columns={columns} isLoading={isLoading} />
                <CustomPagination total={data?.meta?.total || 1} limit={data?.meta?.limit || 10} />
            </div>
        </div>
    )
}

export default CourseTable