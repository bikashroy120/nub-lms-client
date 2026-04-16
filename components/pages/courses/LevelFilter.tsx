'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react'

const filterOption = [
    {
        label: 'Beginner',
        value: "beginner"
    },
    {
        label: 'Intermediate',
        value: "intermediate"
    },
    {
        label: 'Advance',
        value: "advance"
    },
]

const LevelFilter = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
        const params = searchParams.get('level');
        return params ? params.split(',').map(t => t.toLowerCase()) : [];
    });

    const updateUrl = useCallback((types: string[]) => {
        const params = new URLSearchParams(searchParams.toString());

        if (types.length > 0) {
            params.set('level', types.join(','));
        } else {
            params.delete('level');
        }

        const query = decodeURIComponent(params.toString());
        const url = query ? `${pathname}?${query}` : pathname;

        router.push(url, { scroll: false });
    }, [pathname, router, searchParams]);

    const handleToggle = (id: string) => {
        const nextState = selectedTypes.includes(id)
            ? selectedTypes.filter((item) => item !== id)
            : [...selectedTypes, id];

        setSelectedTypes(nextState);
        updateUrl(nextState);
    };

    return (
        <div className="w-full">
            <h3 className=" font-bold text-xs uppercase tracking-widest mb-4">
                Course Level
            </h3>

            <div className="flex flex-col space-y-3">
                {filterOption && filterOption.map((type) => (
                    <label
                        key={type.value}
                        className="flex items-center group cursor-pointer"
                    >
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                className="peer appearance-none w-5 h-5 border-2 border-primary rounded-md checked:bg-primary checked:border-primary transition-all duration-200 cursor-pointer"
                                checked={selectedTypes.includes(type.value.toString())}
                                onChange={() => handleToggle(type.value.toString())}
                            />
                            <svg
                                className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>

                        <span className="ml-3 text-gray-700 text-sm font-medium group-hover:text-primary transition-colors">
                            {type.label}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    )
}

export default LevelFilter