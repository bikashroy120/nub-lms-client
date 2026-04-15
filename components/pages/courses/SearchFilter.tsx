'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useState } from 'react'

const SearchFilter = () => {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <div className="space-y-2">
            <label className="text-sm font-semibold">Search</label>
            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 focus:border-none text-muted-foreground" />
                <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 focus-visible:ring-0 py-5 focus-visible:ring-offset-0"
                />
            </div>
        </div>
    )
}

export default SearchFilter