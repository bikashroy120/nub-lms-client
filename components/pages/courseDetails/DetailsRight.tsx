import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertCircle, BarChart, Clock, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const DetailsRight = () => {
    return (
        <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="sticky top-20 p-6">
                <div className="mb-6">
                    <p className="text-4xl font-bold text-primary">${course.price}</p>
                </div>

                {isEnrolled ? (
                    <div className="space-y-4">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-3 flex gap-2">
                            <AlertCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-green-700 dark:text-green-400">
                                You are enrolled in this course!
                            </p>
                        </div>
                        <Link href="/dashboard/student">
                            <Button className="w-full" variant="outline">
                                Go to My Dashboard
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <Dialog open={showEnrollmentModal} onOpenChange={setShowEnrollmentModal}>
                        <DialogTrigger asChild>
                            <Button className="w-full mb-4">Enroll Now</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirm Enrollment</DialogTitle>
                                <DialogDescription>
                                    You are about to enroll in {course.title}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="rounded-lg border border-border p-4">
                                    <h3 className="font-semibold mb-2">{course.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Price</p>
                                            <p className="font-semibold">${course.price}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Duration</p>
                                            <p className="font-semibold">{course.duration}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Level</p>
                                            <p className="font-semibold">{course.level}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Instructor</p>
                                            <p className="font-semibold">{course.instructor}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowEnrollmentModal(false)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleEnroll}
                                    disabled={isEnrolling}
                                    className="flex-1"
                                >
                                    {isEnrolling ? 'Enrolling...' : 'Confirm Enrollment'}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}

                <div className="space-y-3 mt-6 pt-6 border-t border-border text-sm">
                    <div className="flex items-center gap-2 text-foreground">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{course.duration} total</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                        <span>{course.level} level</span>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default DetailsRight