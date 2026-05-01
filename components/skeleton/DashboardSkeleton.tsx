import { Card } from "../ui/card";

const DashboardSkeleton = () => (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-pulse">
        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-12">
            {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 bg-gray-100 border-none h-28" />
            ))}
        </div>

        {/* Tabs Skeleton */}
        <div className="flex gap-4 mb-8 border-b">
            <div className="h-10 w-24 bg-gray-100 rounded" />
            <div className="h-10 w-24 bg-gray-100 rounded" />
        </div>

        {/* Course Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden border-none shadow-none">
                    <div className="aspect-video bg-gray-100" />
                    <div className="p-6 space-y-4">
                        <div className="h-4 w-1/3 bg-gray-100 rounded" />
                        <div className="h-6 w-full bg-gray-100 rounded" />
                        <div className="h-4 w-2/3 bg-gray-100 rounded" />
                        <div className="h-10 w-full bg-gray-100 rounded mt-4" />
                    </div>
                </Card>
            ))}
        </div>
    </div>
);

export default DashboardSkeleton