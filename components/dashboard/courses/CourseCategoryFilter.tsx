"use client"

import React, { useMemo } from 'react'
import CustomFilter from '@/components/shared/CustomFilter'
import { useCategories } from '@/hooks/useCategory'
import { Category } from '@/types/category'
import { Loader2 } from 'lucide-react'

const CourseCategoryFilter = () => {
    const { data, isLoading, isError } = useCategories()
    const categoryOptions = useMemo(() => {
        if (!data?.data) return []

        return data.data.map((item: Category) => ({
            label: item.name,
            value: item.id.toString()
        }))
    }, [data])

    // 3. Loading State
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-w-[150px] h-10 border rounded-md bg-secondary/20">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
            </div>
        )
    }

    if (isError) {
        return null
    }

    return (
        <CustomFilter
            options={categoryOptions}
            queryKey="category" // Changed from 'role' to match the component context
            placeholder="Select Category"
            className="min-w-[150px]"
        />
    )
}

export default CourseCategoryFilter