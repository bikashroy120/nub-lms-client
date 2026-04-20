import React from 'react';
import Image from 'next/image';
import {
    Play,
    Download,
    Users,
    BookOpen,
    Clock,
    GraduationCap,
    Star
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const DetailsTopCard = () => {
    return (
        <div className=' w-full bg-[rgb(219,248,243)] bg-[radial-gradient(circle_at_top_left,rgba(167,243,232,1)_0%,rgba(219,248,243,1)_45%,rgba(196,233,248,1)_100%)] py-20'>
            <Card className="max-w-7xl mx-auto overflow-hidden bg-transparent  border-none shadow-none">
                <CardContent className="grid md:grid-cols-2 gap-8 p-0">

                    {/* Left Column: Media & Actions */}
                    <div className="space-y-4">
                        <div className="relative group rounded-xl overflow-hidden">
                            {/* Main Course Image */}
                            <img
                                src="/9cd72090c321463dbd789e7ca111da72.webp"
                                alt="Mobile App Development"
                                className="w-full h-auto object-cover"
                            />
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                                    <Play className="fill-sky-600 text-sky-600 ml-1" size={32} />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <Button className=" bg-primary w-full py-5.5 cursor-pointer text-white font-semibold">
                                Enroll Now
                            </Button>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="flex flex-col justify-center space-y-5">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Mobile App Development
                        </h1>

                        <p className="text-slate-800 leading-relaxed text-sm md:text-base">
                            সব বিজনেস এখন অ্যাপ বানাতে চায়, কিন্তু মার্কেটে দক্ষ ডেভেলপার কই? এই গ্যাপটিই আপনার সুযোগ!
                            সহজ সিলেবাসে ৪০টি লাইভ ক্লাস ও ১৭+ প্রজেক্ট এর মাধ্যমে মাত্র ৬ মাসে নিজেকে প্রো অ্যাপ ডেভেলপার
                            হিসেবে গড়ে তোলার সুযোগ। সরাসরি মেন্টরশিপ ও অ্যাপ সাবমিশন সাপোর্টসহ ক্যারিয়ারের সেরা
                            ইনভেস্টমেন্ট করতে রেডি তো?
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            <Badge className="bg-purple-600 hover:bg-purple-700 px-4 py-1">Online</Badge>

                            <div className="flex items-center text-amber-500 gap-1 ml-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />
                                ))}
                                <span className="text-slate-900 font-bold ml-1 text-sm">4.8 (38)</span>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-slate-800 text-sm">
                            <div className="flex items-center gap-2">
                                <Users size={18} className="text-slate-800" />
                                <span>85 students joined</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen size={18} className="text-slate-800" />
                                <span>128 total lessons</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <GraduationCap size={18} className="text-slate-800" />
                                <span>2765 learners completed this course</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-slate-800" />
                                <span>200+ hours of lessons</span>
                            </div>
                        </div>

                        <div className="pt-4 flex items-baseline gap-4">
                            <span className="text-slate-900 font-semibold text-lg">Registration Fee</span>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-slate-900">৳ 7000</span>
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
};

export default DetailsTopCard;