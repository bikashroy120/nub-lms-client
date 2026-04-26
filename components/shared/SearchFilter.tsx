"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";

interface SearchFilterProps {
    queryKey: string;
    placeholder?: string;
    className?: string;
    delay?: number;
}

const SearchFilter = ({
    queryKey,
    placeholder = "Search...",
    className = "",
    delay = 500,
}: SearchFilterProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // URL theke initial value set kora
    const [searchTerm, setSearchTerm] = useState(searchParams.get(queryKey) || "");

    // URL update korar function ke memoize kora
    const updateUrl = useCallback(
        (term: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (term) {
                params.set(queryKey, term);
            } else {
                params.delete(queryKey);
            }

            // Pagination thakle search korar somoy page reset kora uchit
            if (params.has("page")) {
                params.set("page", "1");
            }

            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [queryKey, pathname, router, searchParams]
    );

    useEffect(() => {
        // Jodi URL-er value ar local state-er value already same hoy, tobe kichu korar dorkar nai
        if (searchTerm === (searchParams.get(queryKey) || "")) return;

        const handler = setTimeout(() => {
            updateUrl(searchTerm);
        }, delay);

        return () => clearTimeout(handler);
    }, [searchTerm, delay, updateUrl, queryKey, searchParams]);

    return (
        <div className={`relative flex items-center ${className}`}>
            <Search
                size={18}
                className="absolute left-3 text-gray-400 pointer-events-none"
            />
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
            />
        </div>
    );
};

export default SearchFilter;