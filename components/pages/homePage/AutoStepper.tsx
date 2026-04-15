"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, UserPlus, MousePointerClick, PlayCircle, LayoutDashboard } from "lucide-react";

const steps = [
    {
        id: 0,
        title: "Create an account",
        label: "Step 1",
        icon: <UserPlus className="w-5 h-5" />,
        image: "/loop/step1.webp",
    },
    {
        id: 1,
        title: "Select course/career path",
        label: "Step 2",
        icon: <MousePointerClick className="w-5 h-5" />,
        image: "/loop/step2.webp",
    },
    {
        id: 2,
        title: "Enroll in the course",
        label: "Step 3",
        icon: <PlayCircle className="w-5 h-5" />,
        image: "/loop/step3.webp",
    },
    {
        id: 3,
        title: "Open course dashboard",
        label: "Step 4",
        icon: <LayoutDashboard className="w-5 h-5" />,
        image: "/loop/step4.webp",
    },
];

const AutoStepper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const AUTO_PLAY_INTERVAL = 10000;

    // Handle Automatic Loop
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
        }, AUTO_PLAY_INTERVAL);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl h-[480px] w-full overflow-hidden shadow-2xl bg-gray-100 aspect-video lg:aspect-square">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep}
                        // initial={{ opacity: 0, x: 20 }}
                        // animate={{ opacity: 1, x: 0 }}
                        // exit={{ opacity: 0, x: -20 }}
                        // transition={{ duration: 0.5 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={steps[activeStep].image}
                            alt={steps[activeStep].title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative flex flex-col space-y-4 border p-5 rounded-2xl">
                <div className="absolute left-[40px] top-9 bottom-6 my-6 w-[2px] bg-gray-200 -z-10" />

                {steps.map((step, index) => {
                    const isActive = activeStep === index;

                    return (
                        <div key={step.id} className="flex items-center  group cursor-pointer" onClick={() => setActiveStep(index)}>
                            <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 z-10 
                ${isActive ? "bg-emerald-500 border-emerald-500 text-white" : "bg-white border-gray-200 text-gray-400 group-hover:border-emerald-300"}`}>
                                {index < activeStep ? <Check className="w-5 h-5" /> : <span className="text-sm font-bold">{index + 1}</span>}
                            </div>
                            <div className={`ml-6 flex-1 p-4 rounded-xl transition-all py-7  duration-500 transform 
                ${isActive ? " bg-primary text-white translate-x-2 shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-100"}`}>
                                <div className="flex items-center space-x-4">
                                    <div className={`p-2 rounded-lg ${isActive ? "bg-white/20" : "bg-white shadow-sm text-emerald-500"}`}>
                                        {step.icon}
                                    </div>
                                    <div>
                                        <p className={`text-xs font-medium uppercase tracking-wider ${isActive ? "text-emerald-100" : "text-gray-400"}`}>
                                            {step.label}
                                        </p>
                                        <h3 className="text-lg font-semibold leading-tight">
                                            {step.title}
                                        </h3>
                                    </div>
                                </div>

                                {isActive && (
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: AUTO_PLAY_INTERVAL / 1000, ease: "linear" }}
                                        className="h-1 bg-white/30 absolute bottom-0 left-0"
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AutoStepper;