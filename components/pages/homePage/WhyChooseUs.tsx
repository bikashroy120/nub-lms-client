import React from 'react';
import Image from 'next/image';

const features = [
    {
        title: "অ্যাফোর্ডেবল প্রাইসে বেস্ট লার্নিং",
        icon: "/icon/1.svg",
    },
    {
        title: "লার্নিং হবে দেশসেরা ইন্ডাস্ট্রি বেস্ট মেন্টর প্যানেলের কাছ থেকেই",
        icon: "/icon/2.svg",
    },
    {
        title: "ইন্ডাস্ট্রি ফোকাসড আউটলাইনে সাজানো প্রতিটি কোর্স/ক্যারিয়ার পাথ",
        icon: "/icon/3.svg",
    },
    {
        title: "ইন্ডাস্ট্রি স্ট্যান্ডার্ড প্রজেক্ট, কুইজ অ্যাসাইনমেন্ট",
        icon: "/icon/4.svg",
    },
    {
        title: "প্রতিটি কোর্সের সাথে পাবেন এক্সক্লুসিভ সাপোর্ট সেশন",
        icon: "/icon/5.svg",
    },
    {
        title: "প্রজেক্ট করতে থাকছে স্পেশাল প্রজেক্ট ডে",
        icon: "/icon/6.svg",
    },
    {
        title: "কোর্স শেষে থাকছে সার্টিফিকেট",
        icon: "/icon/7.svg",
    },
    {
        title: "ফিউচার জব রেডি করতে থাকবে জব প্রিপারেশন সাপোর্ট",
        icon: "/icon/8.svg",
    },
    {
        title: "১১০+ পার্টনার কোম্পানিতে জব প্লেসমেন্টের সুযোগ",
        icon: "/icon/9.svg",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="bg-[#f2faf7] py-16 md:py-28 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        কেন <span className="text-black">Learn hub</span> বেস্ট চয়েস?
                    </h2>
                    <p className="text-gray-600 leading-relaxed max-w-5xl font-serif">
                        Learn hub শুধুমাত্র একটি স্কিল ডেভেলপমেন্ট প্ল্যাটফর্ম নয়; এটি জব প্লেসমেন্ট অপরচুনিটি এবং ফিউচার ক্যারিয়ার শিফট করার কমপ্লিট গেটওয়ে। প্রতিটি কোর্স/ক্যারিয়ার পাথের আউটলাইন এমন ভাবে ডিজাইন করা যাতে প্রতিটি লার্নার ক্যারিয়ার জার্নি শুরু করে জব মার্কেটে প্লেসমেন্ট পর্যন্ত পুরো জার্নিতে এক্সপার্টদের গাইডলাইন এবং যেকোনো প্রবলেমের সলিউশন পাবেন।
                    </p>
                </div>

                {/* Features Grid Card */}
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-4 group">
                                <div className="flex-shrink-0 w-10 h-10 relative">
                                    {/* Icon Placeholder - Replace with your <Image /> component */}
                                    <div className="w-full h-full bg-orange-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-xl">✨</span>
                                    </div>
                                </div>
                                <h3 className="text-[15px] font-serif font-medium text-gray-800 leading-snug">
                                    {feature.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;