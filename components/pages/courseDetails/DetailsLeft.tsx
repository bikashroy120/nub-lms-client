import { Card } from '@/components/ui/card'
import React from 'react'

const DetailsLeft = () => {
    return (
        <div className="lg:col-span-2 space-y-8">
            <Card className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-6">Instructor</h2>
                <div className="flex items-center gap-4">
                    {course.instructorImage && (
                        <img
                            src={course.instructorImage}
                            alt={course.instructor}
                            className="h-16 w-16 rounded-full object-cover"
                        />
                    )}
                    <div>
                        <p className="font-semibold text-lg">{course.instructor}</p>
                        <p className="text-sm text-muted-foreground">Expert Instructor</p>
                    </div>
                </div>
            </Card>

            {/* Course Content */}
            <Card className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-6">Course Content</h2>
                {course.modules.length === 0 ? (
                    <p className="text-muted-foreground">Course content coming soon!</p>
                ) : (
                    <div className="space-y-3">
                        {course.modules.map((module) => (
                            <div key={module.id} className="border border-border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => toggleModule(module.id)}
                                    className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                                >
                                    <span className="font-semibold text-left">{module.title}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground">
                                            {module.lessons.length} lessons
                                        </span>
                                        {expandedModules.includes(module.id) ? (
                                            <ChevronUp className="h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4" />
                                        )}
                                    </div>
                                </button>
                                {expandedModules.includes(module.id) && (
                                    <div className="border-t border-border bg-muted/30 p-4 space-y-3">
                                        {module.lessons.map((lesson) => (
                                            <div
                                                key={lesson.id}
                                                className="flex items-center justify-between pl-4"
                                            >
                                                <p className="text-sm">{lesson.title}</p>
                                                <span className="text-xs text-muted-foreground">
                                                    {lesson.duration} min
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {/* Instructor */}


            {/* Reviews */}
            {course.reviews.length > 0 && (
                <Card className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
                    <div className="space-y-4">
                        {course.reviews.map((review) => (
                            <div
                                key={review.id}
                                className="border-b border-border pb-4 last:border-0 last:pb-0"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-semibold">{review.author}</p>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < review.rating
                                                    ? 'fill-primary text-primary'
                                                    : 'text-muted-foreground'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                                <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    )
}

export default DetailsLeft