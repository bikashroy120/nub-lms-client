import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ICourses } from '@/types/category'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const CourseCard = ({ course }: { course: ICourses }) => {
    return (
        <Link key={course.id} href={`/courses/${course.id}`}>
            <Card className="group overflow-hidden transition-all duration-300 p-3 hover:shadow-xl h-full">
                <div className="aspect-video overflow-hidden rounded-md bg-muted">
                    <Image
                        src={'/9cd72090c321463dbd789e7ca111da72.webp'}
                        width={500}
                        height={500}
                        alt={course.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                </div>
                <div className="p-0">
                    <div className=" flex items-center justify-between">
                        <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide">
                            {course.category.name}
                        </p>
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">4.5</span>
                            <span className="text-xs text-muted-foreground">(200)</span>
                        </div>
                    </div>
                    <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-foreground">
                        {course.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {course.description}
                    </p>

                    <div className="mt-2 flex items-center justify-between ">
                        <div>
                            <p className="text-xs text-muted-foreground">Instructor</p>
                            <p className="font-semibold text-sm">{course.instructor.name}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-primary">${course.price}</p>
                        </div>
                    </div>


                    <div className="mt-3 flex items-center justify-between border-t border-border pt-4">
                        <Button className=' py-5 w-full'>View Details</Button>
                    </div>
                </div>
            </Card>
        </Link>
    )
}

export default CourseCard