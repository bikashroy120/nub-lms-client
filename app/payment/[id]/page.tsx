import { getSingleCourses } from '@/app/actions/course';
import Footer from '@/components/Footer'
import { Header } from '@/components/header'
import EnrollmentPage from '@/components/pages/homePage/EnrollmentPage'
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
            <Header />
            <EnrollmentPage data={result?.data} />
            <Footer />
        </div>
    )
}

export default page