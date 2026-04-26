"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Filter } from "lucide-react";

const UserFilter = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentRole = searchParams.get("role") || "";

    const handleFilterChange = (e: any) => {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set("role", value);
        } else {
            params.delete("role");
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    const roles = [
        { label: "All Roles", value: "" },
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Instructor", value: "instructor" },
    ];

    return (
        <select
            value={currentRole}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-md focus-visible:ring-0 focus-visible:ring-offset-0  bg-gray-50 cursor-pointer transition-all"
        >
            {roles.map((role) => (
                <option key={role.value} value={role.value}>
                    {role.label}
                </option>
            ))}
        </select>
    );
};

export default UserFilter;