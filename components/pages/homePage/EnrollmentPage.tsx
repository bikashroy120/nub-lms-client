"use client"

import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star, ShieldCheck, CreditCard } from "lucide-react";
import { ICourses } from '@/types/category';
import { useAuth } from '@/lib/context/auth-context';
import { useRouter } from 'next/navigation';
import { useCreateEnrollment } from '@/hooks/useEnrollment';



const EnrollmentPage = ({ data }: { data: ICourses }) => {
    const { user } = useAuth()
    const router = useRouter()
    const { mutate, isPending } = useCreateEnrollment()
    const handelClick = async () => {
        if (!user) {
            router.push(`/login?payment=true&id=${data.id}`)
            return;
        }

        const body = {
            courseId: data.id,
            amount: data.price,
            paymentMethod: "sslcommerz"
        }
        mutate(body, {
            onSuccess: () => {
                router.push('/dashboard/student')
            }
        })

    }


    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6">
            {/* Header */}
            <div className="max-w-6xl mx-auto text-center mb-10">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Complete your Enrollment</h1>
                <p className="text-slate-500">You're just a moment away from accessing premium course</p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Side: Order Item */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6 border-border/50 shadow-sm">
                        <p className="text-sm text-slate-500 mb-6 italic">
                            Please review your course details and select your preferred payment gateway to complete your enrollment.
                            All payments are 100% secure via SSLCommerz or Stripe.
                        </p>

                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Course Image Mockup */}
                            <div className="w-full md:w-56 h-32 bg-slate-900 rounded-xl overflow-hidden relative flex-shrink-0 group">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-60" />
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                    <p className="text-white font-bold text-center text-sm">{data.title} <br /></p>
                                </div>
                            </div>

                            {/* Course Info */}
                            <div className="flex flex-col justify-center space-y-3">
                                <h2 className="text-xl font-bold text-slate-900">{data.title}</h2>
                                <div className="flex items-center gap-1 text-orange-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                                    <span className="text-slate-400 text-sm ml-2 font-medium">5 (20)</span>
                                </div>
                                <div className="flex items-center gap-2 text-primary font-medium text-sm">
                                    <BookOpen className="h-4 w-4" />
                                    <span>{data.lessonCount || 0} Lessons</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Side: Order Summary */}
                <div className="space-y-6">
                    <Card className="p-8 border-border/50 shadow-lg relative overflow-hidden">
                        <div className="text-center mb-8">
                            <h3 className="text-lg font-bold text-slate-800">Order Summary</h3>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-medium">Regular Price</span>
                                <span className="text-slate-400 line-through">৳ {data.price}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-medium">Discount (40% OFF)</span>
                                <span className="text-emerald-600 font-bold">-৳ 0,000</span>
                            </div>
                            <hr className="border-dashed" />
                            <div className="flex justify-between items-center">
                                <span className="text-base font-bold text-slate-900">Total</span>
                                <span className="text-2xl font-black text-emerald-600">৳ {data.price}</span>
                            </div>
                        </div>

                        {/* Payment Gateways */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-primary bg-primary/[0.02] transition-all">
                                <div className="h-8 w-8 bg-blue-700 text-white rounded flex items-center justify-center font-bold text-xl mb-2">Z</div>
                                <span className="text-[10px] font-bold text-slate-700">SSL Commerz</span>
                            </button>

                            <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-slate-200  bg-slate-50 hover:border-slate-200 transition-all">
                                <CreditCard className="h-8 w-8 text-indigo-600 mb-2" />
                                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-tighter">Stripe</span>
                            </button>
                        </div>

                        <Button disabled={isPending} onClick={() => handelClick()} className="w-full h-12 bg-primary hover:bg-sky-500 cursor-pointer text-white font-bold rounded-lg shadow-sm mb-4">
                            {isPending ? "Loading" : "Proceed to payment"}
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentPage;