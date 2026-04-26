"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface FilterOption {
    label: string;
    value: string;
}

interface CustomFilterProps {
    options: FilterOption[];
    queryKey: string;
    placeholder?: string;
    className?: string;
}

const CustomFilter = ({
    options,
    queryKey,
    placeholder = "Select Filter",
    className = ""
}: CustomFilterProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentValue = searchParams.get(queryKey) || "";

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set(queryKey, value);
        } else {
            params.delete(queryKey);
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <select
            value={currentValue}
            onChange={handleFilterChange}
            className={`px-4 py-2 border rounded-md outline-none bg-white cursor-pointer transition-all ${className}`}
        >
            <option value="">{placeholder}</option>
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
};

export default CustomFilter;