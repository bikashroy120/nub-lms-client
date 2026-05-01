import AdminProtected from '@/components/dashboard/common/AdminProtected'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AdminProtected>{children}</AdminProtected>
    )
}

export default layout