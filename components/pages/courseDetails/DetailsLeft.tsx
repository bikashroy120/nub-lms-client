import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ICourses } from '@/types/category'
import { CheckCircle2, ListVideo, PlayCircle, UserCheck } from 'lucide-react'
import React from 'react'

interface DetailsLeftProps {
    course: ICourses
}

const features = [
    "১০টি লাইভ ক্লাস",
    "ভেরিফাইড পোর্টফোলিও",
    "সার্টিফিকেট",
    "১০০০+ প্রম্পট লাইব্রেরি",
    "লার্নিং ওয়ার্কবুক",
];

const DetailsLeft = ({ course }: DetailsLeftProps) => {
    return (
        <div className="lg:col-span-2 space-y-8">
            <Card className="p-6 sm:p-8 overflow-hidden relative">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-primary" />
                    Instructor
                </h2>

                <div className="flex items-start gap-5">
                    <Avatar className="h-20 w-20 border-2 border-primary/10 shadow-sm">
                        {/* <AvatarImage
                            src={course.instructor?.image}
                            alt={course.instructor?.name}
                            className="object-cover"
                        /> */}
                        <AvatarFallback className="bg-primary/5 text-primary text-xl font-bold">
                            {course.instructor?.name?.split(" ").map((n) => n[0]).join("").toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="space-y-2">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <p className="font-bold text-xl leading-none text-foreground">
                                    {course.instructor?.name}
                                </p>
                                <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-bold">
                                    Verified
                                </Badge>
                            </div>
                            <p className="text-sm font-medium text-primary/80">
                                Senior Course Instructor
                            </p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                            Expert in this field with years of professional experience in teaching and industry projects.
                        </p>
                    </div>
                </div>
            </Card>

            <Card className="p-0 overflow-hidden border-border/60 shadow-sm">
                <div className="p-6 border-b bg-muted/20">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ListVideo className="h-5 w-5 text-primary" />
                        Course Content
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                        Total {course?.allLessons?.length || 0} lessons • 12 hours of video
                    </p>
                </div>

                <div className="p-2">
                    {!course?.allLessons?.length ? (
                        <div className="p-8 text-center">
                            <p className="text-muted-foreground italic">Course content coming soon!</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border/50">
                            {course.allLessons.map((lesson, index) => (
                                <div
                                    key={lesson.id}
                                    className="group flex items-center justify-between p-4 rounded-md hover:bg-primary/[0.03] transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* লেসন নাম্বার বা ইনডেক্স */}
                                        <span className="text-xs font-mono text-muted-foreground/60 w-4">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>

                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                <PlayCircle className="h-4 w-4" />
                                            </div>
                                            <p className="text-sm font-semibold text-foreground/80 group-hover:text-primary transition-colors">
                                                {lesson.title}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className="font-normal text-[10px] py-0 px-2 text-muted-foreground">
                                            {lesson.duration} min
                                        </Badge>
                                        {/* লক আইকন (যদি কোর্স কেনা না থাকে এমন কন্ডিশন দিতে চান) */}
                                        {/* <Lock className="h-3.5 w-3.5 text-muted-foreground/40" /> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Card>

            <Card className="p-0 shadow-sm border-border/60">
                <div className="p-6 border-b bg-muted/20">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ListVideo className="h-5 w-5 text-primary" />
                        এই কোর্সে যা যা থাকছে
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                        Total {course?.allLessons?.length || 0} lessons • 12 hours of video
                    </p>
                </div>

                <div className="grid p-6 grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 group">
                            <div className="flex-shrink-0">
                                <CheckCircle2 className="h-6 w-6 text-emerald-500 transition-transform group-hover:scale-110" />
                            </div>
                            <span className="text-base font-medium  text-muted-foreground group-hover:text-foreground transition-colors">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="p-6 sm:p-7 shadow-sm border-border/60">
                <h2 className="text-xl font-bold mb-2 text-foreground">
                    এই কোর্সে আপনি কী কী শিখবেন?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 group">
                            <div className="flex-shrink-0">
                                <CheckCircle2 className="h-6 w-6 text-emerald-500 transition-transform group-hover:scale-110" />
                            </div>
                            <span className="text-base font-medium  text-muted-foreground group-hover:text-foreground transition-colors">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default DetailsLeft