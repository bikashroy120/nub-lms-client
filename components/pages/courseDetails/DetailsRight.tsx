import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ICourses } from '@/types/category'
import { GraduationCap, Video } from 'lucide-react'
import Link from 'next/link'

interface DetailsLeftProps {
    course: ICourses
}

const DetailsRight = ({ course }: DetailsLeftProps) => {
    return (
        <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="sticky top-20 p-0">
                <div className="bg-primary/10  p-4 border-b rounded-t-xl border-sky-100/50">
                    <h2 className="text-xl font-bold text-slate-800">Course Overview</h2>
                </div>

                <div className="px-6 space-y-6">
                    {/* Info Items */}
                    <div className="space-y-5">
                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Video className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-slate-900">Platform</p>
                                <p className="text-sm text-slate-500">Google Meet</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10  flex items-center justify-center shrink-0">
                                <GraduationCap className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-slate-900">Certification</p>
                                <p className="text-sm text-slate-500 leading-tight">
                                    Industry-recognized credential
                                </p>
                            </div>
                        </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Pricing Section */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-slate-700">Registration Fee</span>
                            <span className="text-xl font-bold text-slate-900">৳ 3000</span>
                        </div>
                        {/* <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-400">Regular Fee</span>
                            <span className="text-sm text-slate-400 line-through">৳ 5000</span>
                        </div> */}
                    </div>

                    <div className="space-y-3 pt-2 pb-7">
                        <Button className="w-full h-12 bg-primary cursor-pointer hover:bg-emerald-600 text-white font-bold text-base rounded-xl transition-all shadow-md shadow-emerald-200">
                            Enroll Now
                        </Button>

                    </div>
                </div>
            </Card>
        </div>
    )
}

export default DetailsRight