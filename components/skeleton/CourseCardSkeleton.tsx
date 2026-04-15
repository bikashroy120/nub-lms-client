import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const CourseCardSkeleton = () => {
    return (
        <Card className=' h-40px w-40'>
            <CardContent>
                <Skeleton className=' aspect-video w-full' />
            </CardContent>
        </Card>
    )
}

export default CourseCardSkeleton