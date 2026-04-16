"use client";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Form Validation Schema
const formSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Valid phone number is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ConsultationSection() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormValues) => {
        // Simulate API call
        console.log("Form Data:", data);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        alert("Consultation Scheduled!");
    };

    return (
        <section className="max-w-7xl mx-auto my-12 p-4">
            <div className="bg-[#E0F7FA] rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12">

                {/* Left Content */}
                <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                            Get Your Free
                        </h2>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#20808D]">
                            Consultation Today!
                        </h2>
                    </div>

                    <p className="text-gray-600 text-lg max-w-md">
                        Take the first step towards success. Schedule your free consultation today!
                    </p>

                    {/* Social Proof / Avatars */}
                    <div className="flex items-center gap-4 pt-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-300">
                                    <img
                                        src={`https://i.pravatar.cc/100?u=${i}`}
                                        alt="user"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-medium text-gray-700">
                            <span className="font-bold text-gray-900">1500+</span> students got consultation
                        </p>
                    </div>
                </div>

                {/* Right Form Card */}
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Book the call</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">Full Name</label>
                            <input
                                {...register("fullName")}
                                placeholder="Enter your name"
                                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${errors.fullName ? "border-red-500" : "border-gray-200 focus:border-[#1EB589] focus:ring-2 focus:ring-[#1EB589]/20"
                                    }`}
                            />
                            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">Email</label>
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="Enter your email"
                                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${errors.email ? "border-red-500" : "border-gray-200 focus:border-[#1EB589] focus:ring-2 focus:ring-[#1EB589]/20"
                                    }`}
                            />
                            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                            <input
                                {...register("phone")}
                                placeholder="Enter your phone number"
                                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${errors.phone ? "border-red-500" : "border-gray-200 focus:border-[#1EB589] focus:ring-2 focus:ring-[#1EB589]/20"
                                    }`}
                            />
                            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#1EB589] hover:bg-[#189a74] text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-emerald-200 mt-2 disabled:opacity-70"
                        >
                            {isSubmitting ? "Processing..." : "Schedule Now"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}